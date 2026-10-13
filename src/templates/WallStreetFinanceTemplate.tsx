import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const WallStreetFinanceTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = data;
  const accent = theme.accentColor || '#0c1b33';

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-black font-serif p-8 sm:p-12 print:p-0 text-xs leading-normal">
      {/* Wall Street Formal Centered Header */}
      <header className="text-center border-b border-black pb-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-black">
          {personal.fullName}
        </h1>
        {personal.title && (
          <div className="text-xs font-semibold tracking-wide uppercase text-neutral-800 mt-1 font-sans">
            {personal.title}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-xs text-neutral-800 mt-2 font-sans">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && personal.phone && <span>|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.email && <span>|</span>}
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="hover:underline">
              {personal.email}
            </a>
          )}
          {personal.linkedin && <span>|</span>}
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      <div className="space-y-4">
        {/* Education (Placed First - Wall Street Standard) */}
        {educations.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-2 font-sans text-black">
              Education
            </h2>
            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-black text-[13px]">{edu.institution}</strong>
                    <span className="font-sans text-[11px] text-neutral-700">{edu.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic text-neutral-900">
                    <div>
                      <span>{edu.degree}</span>
                      {edu.fieldOfStudy && <span>, {edu.fieldOfStudy}</span>}
                      {edu.gpa && <span className="font-sans not-italic font-semibold text-neutral-800"> (GPA: {edu.gpa})</span>}
                      {edu.honors && <span className="not-italic"> · {edu.honors}</span>}
                    </div>
                    <span className="font-sans text-[11px] text-neutral-700 not-italic tabular-nums">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  {edu.highlights?.length > 0 && (
                    <div className="text-[11px] text-neutral-700 mt-0.5 font-sans">
                      Relevant Coursework: {edu.highlights.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience / Deal History */}
        {experiences.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-2 font-sans text-black">
              Professional Experience
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-black text-[13px]">{exp.company}</strong>
                    <span className="font-sans text-[11px] text-neutral-700">{exp.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic text-neutral-900 mb-1">
                    <span>{exp.role}</span>
                    <span className="font-sans text-[11px] text-neutral-700 not-italic tabular-nums">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-neutral-900 leading-relaxed font-sans">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Leadership & Select Projects */}
        {projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-2 font-sans text-black">
              Selected Transactions & Leadership
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-black">{proj.title}</strong>
                    <span className="font-sans text-[11px] text-neutral-700">{proj.role}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-neutral-900 font-sans">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Skills & Certifications */}
        <section className="break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-black pb-0.5 mb-2 font-sans text-black">
            Additional Information & Skills
          </h2>
          <div className="space-y-1 text-xs font-sans text-neutral-900">
            {skillGroups.map((grp) => (
              <div key={grp.id} className="flex gap-2">
                <strong className="w-32 shrink-0">{grp.category}:</strong>
                <span>{grp.skills.join(', ')}</span>
              </div>
            ))}
            {certifications.length > 0 && (
              <div className="flex gap-2">
                <strong className="w-32 shrink-0">Certifications:</strong>
                <span>{certifications.map(c => `${c.name} (${c.issuer})`).join('; ')}</span>
              </div>
            )}
            {languages.length > 0 && (
              <div className="flex gap-2">
                <strong className="w-32 shrink-0">Languages:</strong>
                <span>{languages.map(l => `${l.language} (${l.proficiency})`).join('; ')}</span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
