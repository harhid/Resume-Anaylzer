import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UploadTab from '@/components/UploadTab';
import HistoryTab from '@/components/HistoryTab';
import { FileText, History } from 'lucide-react';

export default function Index() {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Resume Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Upload your resume for AI-powered analysis and feedback
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Resume Analysis Platform</CardTitle>
            <CardDescription>
              Get detailed insights and improvement suggestions for your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Live Analysis
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-6">
                <UploadTab />
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <HistoryTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}