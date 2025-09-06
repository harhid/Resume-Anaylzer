# Resume Analyzer MVP - Development Plan

## Project Overview
A web application for uploading and analyzing resumes using AI, with historical viewing capabilities.

## MVP Features to Implement
1. **Frontend (React + Shadcn/UI + Tailwind)**
   - Tab-based interface (Live Analysis, History)
   - PDF upload component
   - Analysis results display
   - Historical table with modal details
   - Error handling and loading states

2. **Backend (Node.js + Express)**
   - PDF upload and parsing
   - Mock Gemini API integration
   - PostgreSQL database operations
   - REST API endpoints

3. **Database (PostgreSQL)**
   - Resume analysis storage
   - Simple schema for MVP

## Files to Create/Modify

### Frontend Files (8 files max)
1. `src/pages/Index.tsx` - Main app with tabs
2. `src/components/UploadTab.tsx` - PDF upload and analysis
3. `src/components/AnalysisResults.tsx` - Display analysis results
4. `src/components/HistoryTab.tsx` - Historical table view
5. `src/components/DetailsModal.tsx` - Analysis details modal
6. `src/lib/api.ts` - API client functions
7. `package.json` - Add required dependencies
8. `index.html` - Update title

### Backend Files (Will be created in separate folder)
- Basic Express server with mock data for MVP
- PostgreSQL schema (simplified)
- API endpoints for upload and history

## Implementation Strategy
- Start with frontend UI components
- Use mock data initially for faster development
- Create backend with mock Gemini integration
- Focus on core functionality over perfection
- Ensure responsive design and error handling

## Dependencies to Add
- `@tanstack/react-query` (already included)
- `lucide-react` for icons
- `react-dropzone` for file upload
- Additional UI components as needed