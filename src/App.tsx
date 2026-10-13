import React, { useState, useMemo } from 'react';
import { ResumeData, ThemeConfig } from './types/resume';
import { sampleProfiles } from './data/sampleProfiles';
import { auditResumeAts } from './utils/aiEnhancer';
import { Header, ActiveTab } from './components/Header';
import { StyleControls } from './components/StyleControls';
import { BuilderSidebar } from './components/BuilderSidebar';
import { ResumeDocumentView } from './components/ResumeDocumentView';
import { CodeInspector } from './components/CodeInspector';
import { AtsAuditPanel } from './components/AtsAuditPanel';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Printer, 
  Sparkles, 
  FileCheck, 
  Code2, 
  RotateCcw,
  SlidersHorizontal,
  Eye
} from 'lucide-react';

export default function App() {
  // Load default profile (Alexandre Vance - Staff Software Engineer)
  const [resumeData, setResumeData] = useState<ResumeData>(sampleProfiles[0].data);

  // Theme settings
  const [theme, setTheme] = useState<ThemeConfig>({
    templateId: 'modern-tech',
    cvFormat: 'chronological',
    accentColor: '#0f172a',
    fontFamily: 'sans',
    spacing: 'normal',
    paperSize: 'a4',
    showPhoto: false,
    showIcons: true
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('builder');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Dynamic ATS audit score
  const atsResult = useMemo(() => auditResumeAts(resumeData), [resumeData]);

  const handleUpdateTheme = (updated: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updated }));
  };

  const handleLoadProfile = (profileId: string) => {
    const found = sampleProfiles.find(p => p.id === profileId);
    if (found) {
      setResumeData(JSON.parse(JSON.stringify(found.data)));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetToBlank = () => {
    if (window.confirm('Reset CV to an empty blank template?')) {
      setResumeData({
        personal: {
          fullName: 'Your Name',
          title: 'Professional Headline',
          email: 'name@example.com',
          phone: '+1 (555) 000-0000',
          location: 'City, Country',
          website: '',
          linkedin: '',
          github: '',
          summary: ''
        },
        experiences: [],
        educations: [],
        skillGroups: [
          { id: 'sk-1', category: 'Core Competencies', skills: ['Skill 1', 'Skill 2', 'Skill 3'] }
        ],
        projects: [],
        certifications: [],
        languages: [{ id: 'lang-1', language: 'English', proficiency: 'Fluent' }],
        customSections: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={handlePrint}
        atsScore={atsResult.score}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* VIEW 1: Visual Builder Dual-Pane */}
        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Customizers & Sections Form */}
            <div className="lg:col-span-5 space-y-5">
              <StyleControls
                theme={theme}
                onChangeTheme={handleUpdateTheme}
              />

              <div className="flex items-center justify-between px-1 text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">Content Editor</span>
                <button
                  onClick={handleResetToBlank}
                  className="flex items-center gap-1 hover:text-neutral-900 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear to Blank</span>
                </button>
              </div>

              <BuilderSidebar
                data={resumeData}
                onChangeData={setResumeData}
                onLoadProfile={handleLoadProfile}
              />
            </div>

            {/* Right Column: Live Document Preview Panel */}
            <div className="lg:col-span-7 sticky top-20">
              <div className="bg-white border border-neutral-200 rounded-lg p-3 mb-3 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-neutral-600" />
                    Live Canvas
                  </span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-500 font-mono text-[11px]">
                    {theme.paperSize.toUpperCase()} · {theme.templateId}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom controls */}
                  <div className="flex items-center border border-neutral-200 rounded-md p-0.5 bg-neutral-50 text-[11px] font-mono">
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(60, prev - 10))}
                      className="p-1 hover:bg-neutral-200 rounded transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3 h-3" />
                    </button>
                    <span className="px-1.5">{zoomLevel}%</span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
                      className="p-1 hover:bg-neutral-200 rounded transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveTab('preview')}
                    className="p-1.5 hover:bg-neutral-100 rounded text-neutral-600 hover:text-neutral-900"
                    title="Fullscreen Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white rounded font-medium hover:bg-neutral-800 transition-colors"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Document Container with Dynamic Scale */}
              <div className="overflow-auto max-h-[calc(100vh-140px)] p-4 bg-neutral-200/60 rounded-xl border border-neutral-300/80 flex justify-center">
                <div
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.15s ease'
                  }}
                  className="w-full flex justify-center"
                >
                  <ResumeDocumentView data={resumeData} theme={theme} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Fullscreen Document Preview */}
        {activeTab === 'preview' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="no-print bg-white border border-neutral-200 rounded-lg p-3 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('builder')}
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Return to Builder</span>
                </button>
                <span className="text-neutral-300">|</span>
                <span className="text-xs text-neutral-500 font-mono">
                  ATS Score: <strong className="text-neutral-900">{atsResult.score}/100</strong> ({atsResult.rating})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('code')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-200 hover:bg-neutral-50 rounded"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded hover:bg-neutral-800"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF Document</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center p-4 sm:p-8 bg-neutral-200/50 rounded-2xl border border-neutral-300/80">
              <ResumeDocumentView data={resumeData} theme={theme} />
            </div>
          </div>
        )}

        {/* VIEW 3: Code Export Engine ("Put in code") */}
        {activeTab === 'code' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="bg-white border border-neutral-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-neutral-700" />
                  Exportable Code Generator
                </h2>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Your CV converted into clean, production-ready code. Copy or download in your preferred format.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('builder')}
                  className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded hover:bg-neutral-50"
                >
                  Edit in Visual Builder
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-900 text-white rounded hover:bg-neutral-800 flex items-center gap-1"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print PDF</span>
                </button>
              </div>
            </div>

            <CodeInspector data={resumeData} theme={theme} />
          </div>
        )}

        {/* VIEW 4: ATS Diagnostic & Checklist */}
        {activeTab === 'ats' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="bg-white border border-neutral-200 rounded-lg p-3 flex items-center justify-between shadow-2xs">
              <span className="text-xs font-semibold text-neutral-600">
                Automated Screening Parser Simulation
              </span>
              <button
                onClick={() => setActiveTab('builder')}
                className="px-3 py-1 text-xs font-semibold bg-neutral-900 text-white rounded hover:bg-neutral-800"
              >
                Apply Improvements in Builder
              </button>
            </div>

            <AtsAuditPanel data={resumeData} />
          </div>
        )}
      </main>
    </div>
  );
}
