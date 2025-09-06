// API client functions for Resume Analyzer
// This uses mock data for MVP demonstration

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

interface ResumeHistoryItem {
  id: string;
  name: string;
  email: string;
  fileName: string;
  rating: number;
  analyzedAt: string;
}

// Mock data for demonstration
const mockAnalysisData: AnalysisData[] = [
  {
    id: '1',
    personalDetails: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      linkedin: 'https://linkedin.com/in/johnsmith',
      portfolio: 'https://johnsmith.dev'
    },
    content: {
      summary: 'Experienced full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Passionate about building scalable web applications and leading development teams.',
      workExperience: [
        {
          company: 'Tech Solutions Inc.',
          position: 'Senior Full Stack Developer',
          duration: '2021 - Present',
          description: 'Led development of enterprise web applications using React, Node.js, and AWS. Managed a team of 4 developers and improved system performance by 40%.'
        },
        {
          company: 'StartupXYZ',
          position: 'Frontend Developer',
          duration: '2019 - 2021',
          description: 'Developed responsive web applications using React and TypeScript. Collaborated with UX designers to implement pixel-perfect designs.'
        }
      ],
      education: [
        {
          institution: 'University of Technology',
          degree: 'Bachelor of Science in Computer Science',
          year: '2019'
        }
      ],
      projects: [
        {
          name: 'E-commerce Platform',
          description: 'Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS']
        },
        {
          name: 'Task Management App',
          description: 'Developed a collaborative task management application with real-time updates',
          technologies: ['React', 'Socket.io', 'MongoDB', 'Express']
        }
      ],
      certifications: ['AWS Certified Developer', 'React Professional Certificate']
    },
    skills: {
      technical: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Git'],
      soft: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration', 'Project Management']
    },
    feedback: {
      rating: 8,
      improvements: [
        'Add more quantifiable achievements in work experience',
        'Include more recent certifications',
        'Expand on leadership experience with specific examples',
        'Add a section for volunteer work or open source contributions'
      ],
      suggestedSkills: ['Kubernetes', 'GraphQL', 'Machine Learning', 'DevOps', 'Microservices']
    }
  },
  {
    id: '2',
    personalDetails: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      linkedin: 'https://linkedin.com/in/sarahjohnson'
    },
    content: {
      summary: 'Creative UI/UX designer with 3+ years of experience in designing user-centered digital experiences. Skilled in Figma, Adobe Creative Suite, and front-end development.',
      workExperience: [
        {
          company: 'Design Studio Pro',
          position: 'UI/UX Designer',
          duration: '2022 - Present',
          description: 'Design user interfaces for web and mobile applications. Conduct user research and create wireframes, prototypes, and design systems.'
        },
        {
          company: 'Creative Agency',
          position: 'Junior Designer',
          duration: '2021 - 2022',
          description: 'Assisted in creating visual designs for various clients including branding, web design, and marketing materials.'
        }
      ],
      education: [
        {
          institution: 'Art Institute',
          degree: 'Bachelor of Fine Arts in Graphic Design',
          year: '2021'
        }
      ],
      projects: [
        {
          name: 'Mobile Banking App Redesign',
          description: 'Complete UX/UI redesign of a mobile banking application improving user satisfaction by 35%',
          technologies: ['Figma', 'Principle', 'InVision', 'User Research']
        }
      ],
      certifications: ['Google UX Design Certificate', 'Adobe Certified Expert']
    },
    skills: {
      technical: ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'HTML/CSS', 'JavaScript'],
      soft: ['Creativity', 'User Empathy', 'Communication', 'Attention to Detail', 'Problem Solving']
    },
    feedback: {
      rating: 7,
      improvements: [
        'Add more measurable impact metrics to project descriptions',
        'Include more diverse project types in portfolio',
        'Add technical skills related to front-end development',
        'Expand on user research methodologies used'
      ],
      suggestedSkills: ['React', 'Vue.js', 'Prototyping', 'A/B Testing', 'Analytics']
    }
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export async function uploadResume(file: File): Promise<AnalysisData> {
  await delay(2000); // Simulate processing time
  
  // Generate a new ID and return mock data with file name
  const mockData = mockAnalysisData[Math.floor(Math.random() * mockAnalysisData.length)];
  const newAnalysis = {
    ...mockData,
    id: Date.now().toString(),
    fileName: file.name
  };
  
  // Store in localStorage for history
  const history = JSON.parse(localStorage.getItem('resumeHistory') || '[]');
  const historyItem = {
    id: newAnalysis.id,
    name: newAnalysis.personalDetails.name,
    email: newAnalysis.personalDetails.email,
    fileName: file.name,
    rating: newAnalysis.feedback.rating,
    analyzedAt: new Date().toISOString()
  };
  
  history.unshift(historyItem);
  localStorage.setItem('resumeHistory', JSON.stringify(history));
  localStorage.setItem(`resume_${newAnalysis.id}`, JSON.stringify(newAnalysis));
  
  return newAnalysis;
}

export async function getResumeHistory(): Promise<ResumeHistoryItem[]> {
  await delay(500); // Simulate network delay
  
  const history = JSON.parse(localStorage.getItem('resumeHistory') || '[]');
  return history;
}

export async function getResumeById(id: string): Promise<AnalysisData> {
  await delay(300); // Simulate network delay
  
  const resumeData = localStorage.getItem(`resume_${id}`);
  if (!resumeData) {
    throw new Error('Resume not found');
  }
  
  return JSON.parse(resumeData);
}

// Backend API endpoints (for future implementation)
export const API_ENDPOINTS = {
  UPLOAD: '/api/upload',
  RESUMES: '/api/resumes',
  RESUME_BY_ID: (id: string) => `/api/resumes/${id}`
};