import React from 'react';
import { ThemeConfig, TemplateId, CvFormatType, FontFamilyChoice, SpacingChoice, PaperSizeChoice } from '../types/resume';
import { Palette, Type, LayoutTemplate, MoveVertical, FileText, Layers, Sparkles } from 'lucide-react';

interface StyleControlsProps {
  theme: ThemeConfig;
  onChangeTheme: (updated: Partial<ThemeConfig>) => void;
}

const TEMPLATES: Array<{ id: TemplateId; label: string; desc: string; category: string }> = [
  // ATS & Classical
  { id: 'harvard', label: 'Harvard Classic', desc: 'ATS-standard serif, right-aligned dates', category: 'ATS Classic' },
  { id: 'wall-street', label: 'Wall Street Finance', desc: 'Investment banking, PE & hedge fund rigor', category: 'ATS Classic' },
  { id: 'europass', label: 'Europass EU Standard', desc: 'European Union official academic CV', category: 'ATS Classic' },

  // Tech & Engineering
  { id: 'modern-tech', label: 'Modern Tech Minimalist', desc: 'Silicon Valley clean sans & impact metrics', category: 'Tech & Engineering' },
  { id: 'systems-architect', label: 'Systems Architect', desc: 'Matrix grid for Staff+ engineers & architects', category: 'Tech & Engineering' },
  { id: 'timeline-modern', label: 'Timeline Milestones', desc: 'Chronological milestone track with node dots', category: 'Tech & Engineering' },

  // Executive, Split & Creative
  { id: 'executive', label: 'Executive Leadership', desc: 'C-Suite banner & core competencies ribbon', category: 'Leadership & Creative' },
  { id: 'nordic-split', label: 'Nordic Split Sidebar', desc: 'Scandinavian two-column editorial split', category: 'Leadership & Creative' },
  { id: 'creative-editorial', label: 'Creative Bauhaus', desc: 'Asymmetric typography for design & product', category: 'Leadership & Creative' },
  { id: 'compact-onepage', label: 'Compact 1-Page', desc: 'Engineered strict single-page alignment', category: 'Leadership & Creative' }
];

const CV_FORMATS: Array<{ id: CvFormatType; label: string; desc: string }> = [
  { id: 'chronological', label: 'Reverse Chronological', desc: 'Standard: positions ordered newest to oldest' },
  { id: 'functional', label: 'Functional / Skills-First', desc: 'Focus on core capabilities & domain mastery' },
  { id: 'hybrid', label: 'Hybrid / Combination', desc: 'Executive impact summary + career chronology' }
];

const ACCENT_COLORS = [
  { hex: '#0f172a', name: 'Slate Onyx' },
  { hex: '#1e3a8a', name: 'Navy Cobalt' },
  { hex: '#004494', name: 'Europass Blue' },
  { hex: '#047857', name: 'Forest Emerald' },
  { hex: '#7e22ce', name: 'Royal Amethyst' },
  { hex: '#991b1b', name: 'Crimson Wine' },
  { hex: '#334155', name: 'Graphite' },
];

export const StyleControls: React.FC<StyleControlsProps> = ({ theme, onChangeTheme }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
          <LayoutTemplate className="w-3.5 h-3.5 text-neutral-500" />
          Template Selection & Layout Format
        </span>
        <span className="text-[11px] text-neutral-400 font-mono">10 Templates</span>
      </div>

      {/* Structural Format of CV */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-neutral-500" />
          Structural Format of CV
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          {CV_FORMATS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => onChangeTheme({ cvFormat: fmt.id })}
              className={`text-left p-2 rounded-md border text-xs transition-colors ${
                theme.cvFormat === fmt.id
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs font-medium'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="font-semibold leading-tight text-[11px]">{fmt.label}</div>
              <div className={`text-[10px] mt-0.5 line-clamp-1 ${theme.cvFormat === fmt.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {fmt.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700">Choose Visual Template Design</label>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onChangeTheme({ templateId: tmpl.id })}
              className={`text-left p-2 rounded-md border text-xs transition-colors ${
                theme.templateId === tmpl.id
                  ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs font-medium'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold leading-tight">{tmpl.label}</span>
                <span className={`text-[9px] uppercase font-mono ${theme.templateId === tmpl.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  {tmpl.category}
                </span>
              </div>
              <div className={`text-[10px] mt-0.5 line-clamp-1 ${theme.templateId === tmpl.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {tmpl.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Palette & Spacing row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Accent Color */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1">
            <Palette className="w-3 h-3 text-neutral-500" />
            Accent Palette
          </label>
          <div className="flex items-center gap-1.5">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => onChangeTheme({ accentColor: c.hex })}
                title={c.name}
                className={`w-6 h-6 rounded-full transition-transform ${
                  theme.accentColor === c.hex ? 'scale-115 ring-2 ring-neutral-900 ring-offset-2' : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1">
            <Type className="w-3 h-3 text-neutral-500" />
            Typography
          </label>
          <div className="flex rounded-md border border-neutral-200 p-0.5 bg-neutral-50">
            {(['sans', 'serif', 'mixed'] as FontFamilyChoice[]).map((f) => (
              <button
                key={f}
                onClick={() => onChangeTheme({ fontFamily: f })}
                className={`flex-1 py-1 text-[11px] font-medium capitalize rounded transition-colors ${
                  theme.fontFamily === f ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Spacing / Density */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1">
            <MoveVertical className="w-3 h-3 text-neutral-500" />
            Density
          </label>
          <div className="flex rounded-md border border-neutral-200 p-0.5 bg-neutral-50">
            {(['compact', 'normal', 'relaxed'] as SpacingChoice[]).map((s) => (
              <button
                key={s}
                onClick={() => onChangeTheme({ spacing: s })}
                className={`flex-1 py-1 text-[11px] font-medium capitalize rounded transition-colors ${
                  theme.spacing === s ? 'bg-white text-neutral-900 shadow-xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
