import React, { useState, useMemo } from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';
import { 
  generateTailwindHtml, 
  generateReactTsx, 
  generateLatexCode, 
  generateJsonResume, 
  generateMarkdownResume,
  generateVueSfc,
  generateSvelteComponent,
  generateTypstCode,
  generatePlainTextAts,
  generateYamlResume,
  generateHrXmlResume
} from '../generators/codeGenerators';
import { Check, Copy, Download, Code2, FileCode, Layers } from 'lucide-react';

export type CodeFormat = 
  | 'tailwind-html' 
  | 'react-tsx' 
  | 'vue-sfc'
  | 'svelte'
  | 'typst'
  | 'latex' 
  | 'json' 
  | 'yaml'
  | 'markdown'
  | 'plain-text'
  | 'hr-xml';

interface CodeInspectorProps {
  data: ResumeData;
  theme: ThemeConfig;
}

const FORMAT_OPTIONS: Array<{
  id: CodeFormat;
  label: string;
  ext: string;
  desc: string;
  mime: string;
}> = [
  {
    id: 'tailwind-html',
    label: 'HTML + Tailwind',
    ext: '.html',
    desc: 'Self-contained HTML with Tailwind utility classes',
    mime: 'text/html'
  },
  {
    id: 'react-tsx',
    label: 'React TSX',
    ext: '.tsx',
    desc: 'Modular React 19 / TypeScript component with typed props',
    mime: 'text/typescript'
  },
  {
    id: 'vue-sfc',
    label: 'Vue 3 SFC',
    ext: '.vue',
    desc: 'Vue Single-File Component with <script setup lang="ts"> and Tailwind',
    mime: 'text/plain'
  },
  {
    id: 'svelte',
    label: 'Svelte 5',
    ext: '.svelte',
    desc: 'High-performance reactive Svelte 5 component',
    mime: 'text/plain'
  },
  {
    id: 'typst',
    label: 'Typst (.typ)',
    ext: '.typ',
    desc: 'Modern, blazing-fast academic LaTeX successor document',
    mime: 'text/plain'
  },
  {
    id: 'latex',
    label: 'LaTeX (.tex)',
    ext: '.tex',
    desc: 'Academic & ATS Overleaf-compatible LaTeX document',
    mime: 'text/x-tex'
  },
  {
    id: 'plain-text',
    label: 'Plain Text (ASCII)',
    ext: '.txt',
    desc: '100% pure ASCII format for legacy ATS parsers (Taleo, Workday)',
    mime: 'text/plain'
  },
  {
    id: 'json',
    label: 'JSON Resume',
    ext: '.json',
    desc: 'Standard schema.org / jsonresume.org v1.0 data format',
    mime: 'application/json'
  },
  {
    id: 'yaml',
    label: 'YAML Resume',
    ext: '.yaml',
    desc: 'Human-readable structured data format for DevOps & static blogs',
    mime: 'text/yaml'
  },
  {
    id: 'markdown',
    label: 'Markdown (.md)',
    ext: '.md',
    desc: 'Clean GitHub README or plain text submission format',
    mime: 'text/markdown'
  },
  {
    id: 'hr-xml',
    label: 'HR-XML (.xml)',
    ext: '.xml',
    desc: 'Enterprise HR-XML consortium standard resume schema',
    mime: 'application/xml'
  }
];

export const CodeInspector: React.FC<CodeInspectorProps> = ({ data, theme }) => {
  const [selectedFormat, setSelectedFormat] = useState<CodeFormat>('tailwind-html');
  const [copied, setCopied] = useState(false);

  // Generate code dynamically based on current selected format
  const codeString = useMemo(() => {
    switch (selectedFormat) {
      case 'tailwind-html':
        return generateTailwindHtml(data, theme);
      case 'react-tsx':
        return generateReactTsx(data, theme);
      case 'vue-sfc':
        return generateVueSfc(data, theme);
      case 'svelte':
        return generateSvelteComponent(data);
      case 'typst':
        return generateTypstCode(data);
      case 'latex':
        return generateLatexCode(data);
      case 'plain-text':
        return generatePlainTextAts(data);
      case 'json':
        return generateJsonResume(data);
      case 'yaml':
        return generateYamlResume(data);
      case 'markdown':
        return generateMarkdownResume(data);
      case 'hr-xml':
        return generateHrXmlResume(data);
      default:
        return '';
    }
  }, [selectedFormat, data, theme]);

  const activeOption = FORMAT_OPTIONS.find(f => f.id === selectedFormat)!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const filename = `${data.personal.fullName.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'resume'}_cv${activeOption.ext}`;
    const blob = new Blob([codeString], { type: activeOption.mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const lineCount = codeString.split('\n').length;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs flex flex-col h-full max-h-[820px]">
      {/* Top Bar of Code Inspector */}
      <div className="bg-neutral-900 text-neutral-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Code Export Engine
          </span>
          <span className="text-neutral-500 text-xs">·</span>
          <span className="text-xs text-neutral-400 font-mono">
            {lineCount} lines ({Math.round(codeString.length / 1024 * 10) / 10} KB)
          </span>
        </div>

        {/* Action buttons: Copy & Download */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {activeOption.ext}</span>
          </button>
        </div>
      </div>

      {/* Format Selector Pills / Segmented Bar */}
      <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-neutral-500 font-mono text-[11px] mr-1 hidden md:inline">Language:</span>
        {FORMAT_OPTIONS.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFormat(f.id)}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
              selectedFormat === f.id
                ? 'bg-neutral-800 text-white font-semibold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Informational description strip */}
      <div className="bg-neutral-900/90 text-neutral-400 px-4 py-1.5 text-[11px] flex items-center justify-between border-b border-neutral-800">
        <span>{activeOption.desc}</span>
        <span className="font-mono text-neutral-400">{activeOption.ext}</span>
      </div>

      {/* Code Text Viewer */}
      <div className="flex-1 bg-neutral-950 text-neutral-200 p-4 font-mono text-xs overflow-auto select-text leading-relaxed">
        <pre className="overflow-x-auto whitespace-pre font-mono text-[12px] text-neutral-300 selection:bg-neutral-700 selection:text-white">
          <code>{codeString}</code>
        </pre>
      </div>
    </div>
  );
};
