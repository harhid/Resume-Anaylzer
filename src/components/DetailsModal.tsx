import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import AnalysisResults from './AnalysisResults';

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

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnalysisData | null;
  loading: boolean;
}

export default function DetailsModal({ isOpen, onClose, data, loading }: DetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Resume Analysis Details</DialogTitle>
          <DialogDescription>
            {data ? `Analysis for ${data.personalDetails.name}` : 'Loading analysis details...'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : data ? (
            <AnalysisResults data={data} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              No data available
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}