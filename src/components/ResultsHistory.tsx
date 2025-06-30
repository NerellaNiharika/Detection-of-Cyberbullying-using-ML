
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, AlertTriangle, CheckCircle, Trash2, Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const ResultsHistory = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<AnalysisResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadResults();
  }, []);

  useEffect(() => {
    filterResults();
  }, [results, searchTerm, filterType]);

  const loadResults = () => {
    const stored = localStorage.getItem('analysisResults');
    if (stored) {
      const parsed = JSON.parse(stored).map((result: any) => ({
        ...result,
        timestamp: new Date(result.timestamp)
      }));
      setResults(parsed);
    }
  };

  const filterResults = () => {
    let filtered = results;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(result =>
        result.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType === 'bullying') {
      filtered = filtered.filter(result => result.isBullying);
    } else if (filterType === 'safe') {
      filtered = filtered.filter(result => !result.isBullying);
    }

    setFilteredResults(filtered);
  };

  const clearHistory = () => {
    localStorage.removeItem('analysisResults');
    setResults([]);
    setFilteredResults([]);
  };

  const deleteResult = (id: string) => {
    const updated = results.filter(result => result.id !== id);
    setResults(updated);
    localStorage.setItem('analysisResults', JSON.stringify(updated));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStats = () => {
    const total = results.length;
    const bullying = results.filter(r => r.isBullying).length;
    const safe = total - bullying;
    const avgConfidence = results.length > 0 
      ? results.reduce((sum, r) => sum + r.confidence, 0) / results.length 
      : 0;

    return { total, bullying, safe, avgConfidence };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Analyzed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.bullying}</div>
            <div className="text-sm text-gray-600">Bullying Detected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.safe}</div>
            <div className="text-sm text-gray-600">Safe Messages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(stats.avgConfidence * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Analysis History
          </CardTitle>
          <CardDescription>
            View and manage all previous text analysis results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search in analyzed text..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="bullying">Bullying Only</SelectItem>
                  <SelectItem value="safe">Safe Only</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={clearHistory}
                disabled={results.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {results.length === 0 ? (
                <div>
                  <History className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>No analysis results yet. Start by analyzing some text!</p>
                </div>
              ) : (
                <p>No results match your search criteria.</p>
              )}
            </div>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {filteredResults.map((result, index) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {result.isBullying ? (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          <Badge 
                            variant={result.isBullying ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {result.isBullying ? "Bullying Detected" : "Safe"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {(result.confidence * 100).toFixed(1)}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {formatDate(result.timestamp)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteResult(result.id)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                          "{result.text}"
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-semibold">SVM</div>
                          <div className={result.models.svm.prediction ? "text-red-600" : "text-green-600"}>
                            {result.models.svm.prediction ? "Bullying" : "Safe"}
                          </div>
                          <div className="text-gray-500">
                            {(result.models.svm.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="font-semibold">Logistic</div>
                          <div className={result.models.logisticRegression.prediction ? "text-red-600" : "text-green-600"}>
                            {result.models.logisticRegression.prediction ? "Bullying" : "Safe"}
                          </div>
                          <div className="text-gray-500">
                            {(result.models.logisticRegression.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-semibold">Naive Bayes</div>
                          <div className={result.models.naiveBayes.prediction ? "text-red-600" : "text-green-600"}>
                            {result.models.naiveBayes.prediction ? "Bullying" : "Safe"}
                          </div>
                          <div className="text-gray-500">
                            {(result.models.naiveBayes.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsHistory;
