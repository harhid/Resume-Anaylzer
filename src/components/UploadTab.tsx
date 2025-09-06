import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import AnalysisResults from './AnalysisResults';
import { uploadResume } from '@/lib/api';
import { toast } from 'sonner';

interface AnalysisData {
  id: string;
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    portfolio?: string;
  };
  content: {
    summary: string;
    workExperience: Array<{
      company: string;
      position: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
    }>;
    certifications: string[];
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  feedback: {
    rating: number;
    improvements: string[];
    suggestedSkills: string[];
  };
}

export default function UploadTab() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);
    setAnalysisData(null);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await uploadResume(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setAnalysisData(result);
        setIsUploading(false);
        setUploadProgress(0);
        toast.success('Resume analyzed successfully!');
      }, 500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume');
      setIsUploading(false);
      setUploadProgress(0);
      toast.error('Failed to analyze resume');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isUploading
  });

  const handleReset = () => {
    setAnalysisData(null);
    setError(null);
  };

  if (analysisData) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Analysis Results</h3>
          <Button onClick={handleReset} variant="outline">
            Analyze Another Resume
          </Button>
        </div>
        <AnalysisResults data={analysisData} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
        <p className="text-gray-600">Upload a PDF file to get AI-powered analysis and feedback</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`text-center cursor-pointer transition-colors ${
              isDragActive ? 'text-blue-600' : 'text-gray-600'
            } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              {isUploading ? (
                <FileText className="w-16 h-16 text-blue-500 animate-pulse" />
              ) : (
                <Upload className="w-16 h-16 text-gray-400" />
              )}
              
              {isUploading ? (
                <div className="w-full max-w-md space-y-2">
                  <p className="text-lg font-medium">Analyzing resume...</p>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-gray-500">
                    {uploadProgress < 30 ? 'Uploading file...' :
                     uploadProgress < 60 ? 'Extracting text...' :
                     uploadProgress < 90 ? 'AI analysis in progress...' :
                     'Finalizing results...'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume here'}
                    </p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
                  </div>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                  <p className="text-xs text-gray-400">
                    Supports PDF files up to 10MB
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}