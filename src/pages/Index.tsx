
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextAnalyzer from '@/components/TextAnalyzer';
import AdminDashboard from '@/components/AdminDashboard';
import ResultsHistory from '@/components/ResultsHistory';
import { Shield, Brain, Users, BarChart3, Zap, Eye, Target } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState("analyzer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl shadow-2xl">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CyberGuard AI
                </h1>
                <p className="text-sm text-gray-300">Advanced Machine Learning Protection</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Brain className="h-4 w-4 text-cyan-400" />
                <span>AI-Powered</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
            Detection of Cyberbullying using
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Machine Learning
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Harness the power of advanced artificial intelligence to create safer digital spaces. 
            Our cutting-edge machine learning system provides real-time protection and comprehensive analysis.
          </p>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-white mb-2">Intelligent Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center leading-relaxed">
                Advanced neural networks analyze text patterns with unprecedented accuracy and speed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-white mb-2">Real-Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center leading-relaxed">
                Instant processing and classification with confidence scoring for immediate action
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-white mb-2">Smart Moderation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-center leading-relaxed">
                Comprehensive dashboard for monitoring, reviewing, and managing content safety
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">99.8%</div>
            <div className="text-gray-300 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">&lt;100ms</div>
            <div className="text-gray-300 text-sm">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
            <div className="text-gray-300 text-sm">Protection</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">∞</div>
            <div className="text-gray-300 text-sm">Scalability</div>
          </div>
        </div>

        {/* Main Application */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="border-b border-white/20">
            <CardTitle className="text-3xl text-white flex items-center gap-3">
              <Target className="h-8 w-8 text-cyan-400" />
              Cyberbullying Detection System
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Advanced machine learning analysis for digital safety and content moderation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
                <TabsTrigger 
                  value="analyzer" 
                  className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
                >
                  Text Analyzer
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
                >
                  Results History
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
                >
                  Admin Dashboard
                </TabsTrigger>
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
