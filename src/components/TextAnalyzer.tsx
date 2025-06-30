
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Brain, AlertTriangle, CheckCircle, Activity, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  id: string;
  text: string;
  isBullying: boolean;
  confidence: number;
  models: {
    svm: { prediction: boolean; confidence: number };
    logisticRegression: { prediction: boolean; confidence: number };
    naiveBayes: { prediction: boolean; confidence: number };
  };
  preprocessing: {
    originalTokens: string[];
    filteredTokens: string[];
    stemmedTokens: string[];
    tfidfVector: number[];
  };
  timestamp: Date;
}

const TextAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  // Simulated ML processing functions
  const tokenize = (text: string): string[] => {
    return text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  };

  const removeStopWords = (tokens: string[]): string[] => {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'shall', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
    return tokens.filter(token => !stopWords.includes(token));
  };

  const stemWords = (tokens: string[]): string[] => {
    // Simple stemming simulation
    return tokens.map(token => {
      if (token.endsWith('ing')) return token.slice(0, -3);
      if (token.endsWith('ed')) return token.slice(0, -2);
      if (token.endsWith('s') && token.length > 3) return token.slice(0, -1);
      return token;
    });
  };

  const generateTFIDFVector = (tokens: string[]): number[] => {
    // Simulate TF-IDF vectorization
    const vocabulary = ['hate', 'stupid', 'ugly', 'loser', 'dumb', 'kill', 'die', 'hurt', 'attack', 'threat'];
    return vocabulary.map(word => {
      const tf = tokens.filter(token => token.includes(word)).length / tokens.length;
      const idf = Math.log(100 / (vocabulary.indexOf(word) + 1)); // Simulated IDF
      return tf * idf;
    });
  };

  const detectBullying = (text: string, tfidfVector: number[]) => {
    // Simulate different ML models
    const bullyingKeywords = ['hate', 'stupid', 'ugly', 'loser', 'dumb', 'kill', 'die', 'hurt', 'attack', 'threat', 'worthless', 'pathetic'];
    const negativeScore = bullyingKeywords.reduce((score, keyword) => {
      return score + (text.toLowerCase().includes(keyword) ? 1 : 0);
    }, 0);

    const tfidfScore = tfidfVector.reduce((sum, val) => sum + val, 0);
    
    // SVM simulation
    const svmScore = (negativeScore * 0.4 + tfidfScore * 0.6) / 5;
    const svmPrediction = svmScore > 0.3;
    
    // Logistic Regression simulation
    const lrScore = 1 / (1 + Math.exp(-(negativeScore * 0.5 + tfidfScore * 0.5 - 1)));
    const lrPrediction = lrScore > 0.5;
    
    // Naive Bayes simulation
    const nbScore = (negativeScore + tfidfScore) / 10;
    const nbPrediction = nbScore > 0.25;

    return {
      svm: { prediction: svmPrediction, confidence: Math.min(svmScore, 1) },
      logisticRegression: { prediction: lrPrediction, confidence: lrScore },
      naiveBayes: { prediction: nbPrediction, confidence: Math.min(nbScore, 1) }
    };
  };

  const analyzeText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate processing steps
    const steps = [
      { name: "Tokenization", duration: 500 },
      { name: "Stop word removal", duration: 300 },
      { name: "Stemming", duration: 400 },
      { name: "TF-IDF Vectorization", duration: 600 },
      { name: "Model predictions", duration: 800 }
    ];

    let progress = 0;
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.duration));
      progress += 20;
      setAnalysisProgress(progress);
    }

    // Perform actual analysis
    const originalTokens = tokenize(inputText);
    const filteredTokens = removeStopWords(originalTokens);
    const stemmedTokens = stemWords(filteredTokens);
    const tfidfVector = generateTFIDFVector(stemmedTokens);
    const models = detectBullying(inputText, tfidfVector);

    // Calculate overall result
    const predictions = [models.svm.prediction, models.logisticRegression.prediction, models.naiveBayes.prediction];
    const isBullying = predictions.filter(p => p).length >= 2; // Majority vote
    const confidence = (models.svm.confidence + models.logisticRegression.confidence + models.naiveBayes.confidence) / 3;

    const analysisResult: AnalysisResult = {
      id: Date.now().toString(),
      text: inputText,
      isBullying,
      confidence,
      models,
      preprocessing: {
        originalTokens,
        filteredTokens,
        stemmedTokens,
        tfidfVector
      },
      timestamp: new Date()
    };

    setResult(analysisResult);
    setIsAnalyzing(false);

    // Store in localStorage for history
    const existingResults = JSON.parse(localStorage.getItem('analysisResults') || '[]');
    existingResults.unshift(analysisResult);
    localStorage.setItem('analysisResults', JSON.stringify(existingResults.slice(0, 50)));

    if (isBullying) {
      toast({
        title: "Cyberbullying Detected",
        description: "This message has been flagged for review",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Analysis Complete",
        description: "No cyberbullying detected in this message"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Text Analysis Input
          </CardTitle>
          <CardDescription>
            Enter a social media message or text to analyze for cyberbullying content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type or paste the message you want to analyze..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Characters: {inputText.length}
            </div>
            <Button 
              onClick={analyzeText} 
              disabled={isAnalyzing || !inputText.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Analyze Text
                </>
              )}
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Main Result */}
          <Alert className={result.isBullying ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <div className="flex items-center gap-2">
              {result.isBullying ? (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              <AlertDescription className="text-lg font-semibold">
                {result.isBullying ? "Cyberbullying Detected" : "No Cyberbullying Detected"}
              </AlertDescription>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Confidence:</span>
                <Badge variant={result.confidence > 0.7 ? "destructive" : result.confidence > 0.4 ? "secondary" : "outline"}>
                  {(result.confidence * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
          </Alert>

          {/* Model Predictions */}
          <Card>
            <CardHeader>
              <CardTitle>Model Predictions</CardTitle>
              <CardDescription>
                Results from different machine learning algorithms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Support Vector Machine</h4>
                  <Badge variant={result.models.svm.prediction ? "destructive" : "secondary"}>
                    {result.models.svm.prediction ? "Bullying" : "Safe"}
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    {(result.models.svm.confidence * 100).toFixed(1)}% confidence
                  </div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Logistic Regression</h4>
                  <Badge variant={result.models.logisticRegression.prediction ? "destructive" : "secondary"}>
                    {result.models.logisticRegression.prediction ? "Bullying" : "Safe"}
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    {(result.models.logisticRegression.confidence * 100).toFixed(1)}% confidence
                  </div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Naive Bayes</h4>
                  <Badge variant={result.models.naiveBayes.prediction ? "destructive" : "secondary"}>
                    {result.models.naiveBayes.prediction ? "Bullying" : "Safe"}
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    {(result.models.naiveBayes.confidence * 100).toFixed(1)}% confidence
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preprocessing Details */}
          <Card>
            <CardHeader>
              <CardTitle>Text Preprocessing Details</CardTitle>
              <CardDescription>
                Step-by-step text processing pipeline
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Original Tokens</h4>
                <div className="flex flex-wrap gap-1">
                  {result.preprocessing.originalTokens.map((token, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {token}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">2. After Stop Word Removal</h4>
                <div className="flex flex-wrap gap-1">
                  {result.preprocessing.filteredTokens.map((token, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {token}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">3. After Stemming</h4>
                <div className="flex flex-wrap gap-1">
                  {result.preprocessing.stemmedTokens.map((token, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {token}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">4. TF-IDF Vector (Sample Features)</h4>
                <div className="grid grid-cols-5 gap-2 text-sm">
                  {result.preprocessing.tfidfVector.slice(0, 10).map((value, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-center">
                      <div className="font-mono text-xs">{value.toFixed(3)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TextAnalyzer;
