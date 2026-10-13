import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Check, X, Globe, Link2, Sparkles, ArrowRight } from 'lucide-react';

interface GoogleLinkSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetFieldName: string; // e.g. 'Portfolio Website', 'LinkedIn', 'Project Link'
  defaultQuery: string; // e.g. 'Alexandre Vance portfolio website'
  currentUrl: string;
  onApplyLink: (url: string) => void;
}

export const GoogleLinkSearchModal: React.FC<GoogleLinkSearchModalProps> = ({
  isOpen,
  onClose,
  targetFieldName,
  defaultQuery,
  currentUrl,
  onApplyLink
}) => {
  const [searchQuery, setSearchQuery] = useState(defaultQuery);
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [copiedGoogleLink, setCopiedGoogleLink] = useState(false);

  useEffect(() => {
    setSearchQuery(defaultQuery);
    setInputUrl(currentUrl);
  }, [defaultQuery, currentUrl, isOpen]);

  if (!isOpen) return null;

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery.trim())}`;

  const handleOpenGoogle = () => {
    window.open(googleSearchUrl, '_blank', 'noopener,noreferrer');
  };

  const handleApply = (urlToSet?: string) => {
    let finalUrl = (urlToSet !== undefined ? urlToSet : inputUrl).trim();
    if (finalUrl && !/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }
    onApplyLink(finalUrl);
    onClose();
  };

  const handleSetGoogleSearchAsLink = () => {
    handleApply(googleSearchUrl);
  };

  const quickSearchPresets = [
    { label: 'Portfolio Website', query: `${searchQuery.split(' ')[0]} portfolio website` },
    { label: 'LinkedIn Profile', query: `site:linkedin.com/in ${searchQuery.split(' ')[0]}` },
    { label: 'GitHub Profile', query: `site:github.com ${searchQuery.split(' ')[0]}` },
    { label: 'Google Scholar / Papers', query: `${searchQuery.split(' ')[0]} google scholar` }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-xl shadow-2xl border border-neutral-200 max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-neutral-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Search className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Search on Google to Add Link</h3>
              <p className="text-[11px] text-neutral-400">
                Lookup link for <span className="text-white font-medium">{targetFieldName}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Step 1: Query Input */}
          <div className="space-y-1.5">
            <label className="font-semibold text-neutral-800 flex items-center justify-between">
              <span>1. Search Query on Google</span>
              <span className="text-[10px] text-neutral-400 font-mono">Customizable</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-neutral-900 focus:border-neutral-900"
                  placeholder="e.g. John Doe portfolio website"
                />
              </div>
              <button
                type="button"
                onClick={handleOpenGoogle}
                className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
              >
                <span>Search Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-neutral-500 self-center mr-0.5">Presets:</span>
              {quickSearchPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSearchQuery(preset.query)}
                  className="text-[10px] px-2 py-0.5 rounded border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono">
              <span className="bg-white px-2 text-neutral-400">Step 2: Paste or Select Link</span>
            </div>
          </div>

          {/* Step 2: Paste link or Auto-generate */}
          <div className="space-y-2">
            <label className="font-semibold text-neutral-800">
              Paste the Link Found on Google
            </label>
            <div className="relative">
              <Link2 className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-neutral-900 focus:border-neutral-900 font-mono"
                placeholder="https://yourwebsite.com or https://linkedin.com/in/..."
              />
            </div>
          </div>

          {/* Alternative: Use Google Search Link directly */}
          <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-lg flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <div className="font-semibold text-neutral-900 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-neutral-700" />
                Don't have a personal domain yet?
              </div>
              <p className="text-[10px] text-neutral-500">
                You can link directly to your Google Search results so employers can look you up.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSetGoogleSearchAsLink}
              className="px-2.5 py-1 text-[11px] font-semibold text-neutral-900 bg-white border border-neutral-300 hover:border-neutral-900 rounded transition-colors shrink-0"
            >
              Use Google URL
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-neutral-50 px-5 py-3 border-t border-neutral-200 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleApply()}
            disabled={!inputUrl.trim()}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Add Link to CV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
