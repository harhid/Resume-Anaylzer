import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award,
  Star,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

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

interface AnalysisResultsProps {
  data: AnalysisData;
}

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  const { personalDetails, content, skills, feedback } = data;

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Overall Resume Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-blue-600">
              {feedback.rating}/10
            </div>
            <div className="flex-1">
              <Progress value={feedback.rating * 10} className="h-3" />
              <p className="text-sm text-gray-600 mt-1">
                {feedback.rating >= 8 ? 'Excellent' : 
                 feedback.rating >= 6 ? 'Good' : 
                 feedback.rating >= 4 ? 'Fair' : 'Needs Improvement'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{personalDetails.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{personalDetails.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{personalDetails.phone}</span>
            </div>
            {personalDetails.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-gray-500" />
                <span className="text-blue-600 hover:underline cursor-pointer">
                  LinkedIn Profile
                </span>
              </div>
            )}
            {personalDetails.portfolio && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Portfolio
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {content.summary && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{content.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.workExperience.map((job, index) => (
            <div key={index} className="border-l-2 border-blue-200 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{job.position}</h4>
                  <p className="text-blue-600 font-medium">{job.company}</p>
                </div>
                <Badge variant="outline">{job.duration}</Badge>
              </div>
              <p className="text-gray-600 text-sm">{job.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {content.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <Badge variant="outline">{edu.year}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Soft Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects */}
      {content.projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.projects.map((project, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold">{project.name}</h4>
                <p className="text-gray-600 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {index < content.projects.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* AI Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <TrendingUp className="w-5 h-5" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Lightbulb className="w-5 h-5" />
              Suggested Skills to Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {feedback.suggestedSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}