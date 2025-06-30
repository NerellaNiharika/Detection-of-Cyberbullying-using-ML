
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  BarChart3, 
  TrendingUp,
  Clock,
  Flag,
  UserCheck,
  UserX,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface FlaggedMessage {
  id: string;
  text: string;
  confidence: number;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected';
  reporter?: string;
  moderatedBy?: string;
  moderatedAt?: Date;
}

const AdminDashboard = () => {
  const [flaggedMessages, setFlaggedMessages] = useState<FlaggedMessage[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadFlaggedMessages();
  }, []);

  const loadFlaggedMessages = () => {
    // Generate some mock flagged messages for demonstration
    const mockMessages: FlaggedMessage[] = [
      {
        id: '1',
        text: 'You are so stupid and worthless, nobody likes you',
        confidence: 0.89,
        timestamp: new Date(Date.now() - 3600000),
        status: 'pending',
        reporter: 'user123'
      },
      {
        id: '2',
        text: 'I hate you so much, go kill yourself',
        confidence: 0.95,
        timestamp: new Date(Date.now() - 7200000),
        status: 'pending',
        reporter: 'user456'
      },
      {
        id: '3',
        text: 'You look ugly today',
        confidence: 0.67,
        timestamp: new Date(Date.now() - 10800000),
        status: 'approved',
        reporter: 'user789',
        moderatedBy: 'admin',
        moderatedAt: new Date(Date.now() - 5400000)
      },
      {
        id: '4',
        text: 'This is actually a nice message',
        confidence: 0.23,
        timestamp: new Date(Date.now() - 14400000),
        status: 'rejected',
        reporter: 'user101',
        moderatedBy: 'admin',
        moderatedAt: new Date(Date.now() - 9000000)
      }
    ];

    setFlaggedMessages(mockMessages);
  };

  const moderateMessage = (id: string, action: 'approve' | 'reject') => {
    setFlaggedMessages(prev => prev.map(msg => 
      msg.id === id 
        ? {
            ...msg,
            status: action === 'approve' ? 'approved' : 'rejected',
            moderatedBy: 'admin',
            moderatedAt: new Date()
          }
        : msg
    ));

    toast({
      title: `Message ${action}d`,
      description: `The flagged message has been ${action}d successfully.`,
      variant: action === 'approve' ? "destructive" : "default"
    });
  };

  const getStats = () => {
    const total = flaggedMessages.length;
    const pending = flaggedMessages.filter(m => m.status === 'pending').length;
    const approved = flaggedMessages.filter(m => m.status === 'approved').length;
    const rejected = flaggedMessages.filter(m => m.status === 'rejected').length;
    const avgConfidence = total > 0 
      ? flaggedMessages.reduce((sum, m) => sum + m.confidence, 0) / total 
      : 0;

    return { total, pending, approved, rejected, avgConfidence };
  };

  const stats = getStats();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            Admin Moderation Dashboard
          </h2>
          <p className="text-gray-600">Manage flagged content and system settings</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Admin Panel
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Flag className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <UserCheck className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold text-red-600">{stats.approved}</div>
                <div className="text-sm text-gray-600">Confirmed Bullying</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <UserX className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{stats.rejected}</div>
                <div className="text-sm text-gray-600">False Positives</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">
                  {(stats.avgConfidence * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Avg Confidence</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>{stats.pending} messages awaiting moderation</span>
                      <Button size="sm" onClick={() => setActiveTab('flagged')}>
                        Review Now
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>System accuracy: {((stats.approved / (stats.approved + stats.rejected)) * 100 || 0).toFixed(1)}%</span>
                      <Button size="sm" variant="outline" onClick={() => setActiveTab('analytics')}>
                        View Details
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {flaggedMessages.slice(0, 10).map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium truncate max-w-[300px]">
                          "{message.text}"
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={
                              message.status === 'pending' ? 'secondary' :
                              message.status === 'approved' ? 'destructive' : 'outline'
                            }
                            className="text-xs"
                          >
                            {message.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {(message.confidence * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flagged Messages Tab */}
        <TabsContent value="flagged" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Flagged Messages for Review
              </CardTitle>
              <CardDescription>
                Messages that have been flagged by the AI system for manual review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {flaggedMessages.map((message) => (
                    <Card key={message.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                message.status === 'pending' ? 'secondary' :
                                message.status === 'approved' ? 'destructive' : 'outline'
                              }
                            >
                              {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                            </Badge>
                            <Badge variant="outline">
                              {(message.confidence * 100).toFixed(1)}% confidence
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                        </div>

                        <Alert className="mb-4">
                          <Eye className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Flagged Message:</strong> "{message.text}"
                          </AlertDescription>
                        </Alert>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div>Reported by: {message.reporter}</div>
                          {message.moderatedBy && (
                            <div>
                              Moderated by: {message.moderatedBy} on {formatDate(message.moderatedAt!)}
                            </div>
                          )}
                        </div>

                        {message.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => moderateMessage(message.id, 'approve')}
                              className="flex items-center gap-1"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              Confirm Bullying
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => moderateMessage(message.id, 'reject')}
                              className="flex items-center gap-1"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              Mark as Safe
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Detection Accuracy</span>
                    <span>{((stats.approved / (stats.approved + stats.rejected)) * 100 || 0).toFixed(1)}%</span>
                  </div>
                  <Progress value={((stats.approved / (stats.approved + stats.rejected)) * 100 || 0)} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>False Positive Rate</span>
                    <span>{((stats.rejected / stats.total) * 100 || 0).toFixed(1)}%</span>
                  </div>
                  <Progress value={((stats.rejected / stats.total) * 100 || 0)} className="bg-red-100" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Confidence</span>
                    <span>{(stats.avgConfidence * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.avgConfidence * 100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moderation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Messages Flagged</span>
                    <Badge variant="outline">{stats.total}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confirmed Bullying</span>
                    <Badge variant="destructive">{stats.approved}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">False Positives</span>
                    <Badge variant="secondary">{stats.rejected}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Review</span>
                    <Badge variant="outline">{stats.pending}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Model Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Support Vector Machine</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">87%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Logistic Regression</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">84%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Naive Bayes</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">79%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
