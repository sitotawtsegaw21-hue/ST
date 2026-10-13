import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const HarvardClassicTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages, customSections } = data;
  const accent = theme.accentColor || '#111827';

  const fontClass = theme.fontFamily === 'serif' 
    ? 'font-serif' 
    : theme.fontFamily === 'sans' 
      ? 'font-sans' 
      : 'font-serif';

  const spacingClass = theme.spacing === 'compact' ? 'space-y-3' : theme.spacing === 'relaxed' ? 'space-y-6' : 'space-y-4';

  return (
    <div className={`w-full max-w-[850px] mx-auto bg-white text-neutral-900 ${fontClass} leading-normal p-8 sm:p-12 print:p-0`}>
      {/* Header */}
      <header className="text-center pb-4 border-b border-neutral-800">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-neutral-950">
          {personal.fullName}
        </h1>
        {personal.title && (
          <p className="text-sm font-semibold text-neutral-700 tracking-wide mt-1">
            {personal.title}
          </p>
        )}
        
        {/* Contact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-neutral-700 mt-2">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && personal.email && <span>·</span>}
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="hover:underline">
              {personal.email}
            </a>
          )}
          {personal.phone && <span>·</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.website && <span>·</span>}
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline">
              Portfolio
            </a>
          )}
          {personal.linkedin && <span>·</span>}
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
          {personal.github && <span>·</span>}
          {personal.github && (
            <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
          )}
        </div>

        {/* Executive summary if present */}
        {personal.summary && (
          <p className="text-xs sm:text-[13px] text-neutral-800 text-left mt-3 pt-3 border-t border-neutral-200 leading-relaxed">
            {personal.summary}
          </p>
        )}
      </header>

      <div className={`mt-5 ${spacingClass}`}>
        {/* Render Skills first if Functional format */}
        {theme.cvFormat === 'functional' && skillGroups.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-700 mb-2"
              style={{ color: accent }}
            >
              Skills & Qualifications Matrix
            </h2>
            <div className="space-y-1 text-xs text-neutral-800">
              {skillGroups.map((grp) => (
                <div key={grp.id} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold text-neutral-900 sm:w-40 shrink-0">{grp.category}:</span>
                  <span className="text-neutral-700">{grp.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-700 mb-3"
              style={{ color: accent }}
            >
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-neutral-950">{exp.company}</span>
                      <span className="text-neutral-600 italic ml-2">— {exp.location}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-600 tabular-nums shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-neutral-800 italic mt-0.5">
                    {exp.role}
                  </div>
                  {exp.technologies?.length > 0 && (
                    <div className="text-[11px] text-neutral-600 font-mono mt-0.5">
                      Keywords: {exp.technologies.join(', ')}
                    </div>
                  )}
                  <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-neutral-800 leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-700 mb-3"
              style={{ color: accent }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-neutral-950">{edu.institution}</span>
                      <span className="text-neutral-600 italic ml-2">— {edu.location}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-600 tabular-nums shrink-0">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-800 mt-0.5">
                    <span className="italic">{edu.degree}</span>
                    {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                    {edu.honors && <span className="font-medium text-neutral-700"> · {edu.honors}</span>}
                  </div>
                  {edu.highlights?.length > 0 && (
                    <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-neutral-700">
                      {edu.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills (When not in functional mode) */}
        {theme.cvFormat !== 'functional' && skillGroups.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-700 mb-2"
              style={{ color: accent }}
            >
              Skills & Qualifications
            </h2>
            <div className="space-y-1 text-xs text-neutral-800">
              {skillGroups.map((grp) => (
                <div key={grp.id} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-bold text-neutral-900 sm:w-40 shrink-0">{grp.category}:</span>
                  <span className="text-neutral-700">{grp.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2 
              className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-neutral-700 mb-3"
              style={{ color: accent }}
            >
              Key Projects & Publications
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline text-xs sm:text-sm">
                    <div className="font-bold text-neutral-950">
                      {proj.title} <span className="font-normal italic text-neutral-700">({proj.role})</span>
                    </div>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-700 hover:underline">
                        Live Link
                      </a>
                    )}
                  </div>
                  {proj.technologies?.length > 0 && (
                    <div className="text-[11px] text-neutral-600 font-mono mt-0.5">
                      Built with: {proj.technologies.join(', ')}
                    </div>
                  )}
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-neutral-800">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications, Languages, Custom Sections */}
        {(certifications.length > 0 || languages.length > 0 || customSections.length > 0) && (
          <section className="break-inside-avoid pt-2 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {certifications.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-neutral-900 mb-1.5" style={{ color: accent }}>
                  Certifications
                </h3>
                <ul className="space-y-1 text-neutral-700">
                  {certifications.map((c) => (
                    <li key={c.id}>
                      <span className="font-medium text-neutral-900">{c.name}</span> — {c.issuer} ({c.issueDate})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-neutral-900 mb-1.5" style={{ color: accent }}>
                  Languages
                </h3>
                <p className="text-neutral-700">
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(' · ')}
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
