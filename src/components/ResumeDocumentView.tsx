import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';
import { HarvardClassicTemplate } from '../templates/HarvardClassicTemplate';
import { ModernTechTemplate } from '../templates/ModernTechTemplate';
import { NordicSplitTemplate } from '../templates/NordicSplitTemplate';
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate';
import { CompactOnePageTemplate } from '../templates/CompactOnePageTemplate';
import { EuropassTemplate } from '../templates/EuropassTemplate';
import { CreativeEditorialTemplate } from '../templates/CreativeEditorialTemplate';
import { WallStreetFinanceTemplate } from '../templates/WallStreetFinanceTemplate';
import { TimelineModernTemplate } from '../templates/TimelineModernTemplate';
import { SystemsArchitectTemplate } from '../templates/SystemsArchitectTemplate';

interface ResumeDocumentViewProps {
  data: ResumeData;
  theme: ThemeConfig;
  className?: string;
}

export const ResumeDocumentView: React.FC<ResumeDocumentViewProps> = ({
  data,
  theme,
  className = ''
}) => {
  const renderTemplate = () => {
    switch (theme.templateId) {
      case 'harvard':
        return <HarvardClassicTemplate data={data} theme={theme} />;
      case 'modern-tech':
        return <ModernTechTemplate data={data} theme={theme} />;
      case 'nordic-split':
        return <NordicSplitTemplate data={data} theme={theme} />;
      case 'executive':
        return <ExecutiveTemplate data={data} theme={theme} />;
      case 'compact-onepage':
        return <CompactOnePageTemplate data={data} theme={theme} />;
      case 'europass':
        return <EuropassTemplate data={data} theme={theme} />;
      case 'creative-editorial':
        return <CreativeEditorialTemplate data={data} theme={theme} />;
      case 'wall-street':
        return <WallStreetFinanceTemplate data={data} theme={theme} />;
      case 'timeline-modern':
        return <TimelineModernTemplate data={data} theme={theme} />;
      case 'systems-architect':
        return <SystemsArchitectTemplate data={data} theme={theme} />;
      default:
        return <ModernTechTemplate data={data} theme={theme} />;
    }
  };

  return (
    <div
      id="printable-resume"
      className={`print-only-target bg-white shadow-md sm:border sm:border-neutral-200/80 rounded-sm overflow-hidden transition-all mx-auto ${className}`}
      style={{
        width: '100%',
        maxWidth: '850px',
        minHeight: '1100px'
      }}
    >
      {renderTemplate()}
    </div>
  );
};
