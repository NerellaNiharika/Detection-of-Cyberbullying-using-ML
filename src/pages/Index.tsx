
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextAnalyzer from '@/components/TextAnalyzer';
import AdminDashboard from '@/components/AdminDashboard';
import ResultsHistory from '@/components/ResultsHistory';
import { Shield, Brain, Users, BarChart3 } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState("analyzer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CyberGuard AI
                </h1>
                <p className="text-sm text-gray-600">Advanced Cyberbullying Detection System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Brain className="h-4 w-4" />
              <span>ML-Powered Analysis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Protect Your Digital Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced machine learning algorithms detect cyberbullying in real-time using NLP, 
            TF-IDF vectorization, and multiple classification models including SVM, Logistic Regression, and Naive Bayes.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-3">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">AI-Powered Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Advanced NLP with tokenization, stemming, and TF-IDF vectorization for accurate classification
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-purple-100 rounded-full w-fit mb-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Multi-Model Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Compare results from SVM, Logistic Regression, and Naive Bayes algorithms
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-indigo-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-indigo-100 rounded-full w-fit mb-3">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">Admin Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Comprehensive dashboard for reviewing flagged content and managing user reports
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Application */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Cyberbullying Detection System</CardTitle>
            <CardDescription>
              Analyze text messages for potential cyberbullying using advanced machine learning techniques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="analyzer">Text Analyzer</TabsTrigger>
                <TabsTrigger value="history">Results History</TabsTrigger>
                <TabsTrigger value="admin">Admin Dashboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analyzer" className="space-y-6">
                <TextAnalyzer />
              </TabsContent>
              
              <TabsContent value="history" className="space-y-6">
                <ResultsHistory />
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-6">
                <AdminDashboard />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
