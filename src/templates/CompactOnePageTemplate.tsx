import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const CompactOnePageTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = data;
  const accent = theme.accentColor || '#1e3a8a';

  return (
    <div className="w-full max-w-[820px] mx-auto bg-white text-slate-900 font-sans p-6 sm:p-8 print:p-0 leading-tight">
      {/* Ultra Compact Header */}
      <header className="border-b border-slate-300 pb-3 mb-3">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            {personal.fullName}
          </h1>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
            {personal.title}
          </span>
        </div>

        {/* 1-Line Contact Coordinates with Separators */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-600 mt-1 font-mono">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && personal.email && <span>·</span>}
          {personal.email && <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>}
          {personal.phone && <span>·</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.website && <span>·</span>}
          {personal.website && <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>}
          {personal.linkedin && <span>·</span>}
          {personal.linkedin && <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>}
          {personal.github && <span>·</span>}
          {personal.github && <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>}
        </div>

        {personal.summary && (
          <p className="text-[11.5px] text-slate-700 leading-snug mt-2 line-clamp-2">
            {personal.summary}
          </p>
        )}
      </header>

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-3.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-0.5 mb-2" style={{ color: accent }}>
            Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-slate-950">{exp.role}</strong>
                    <span className="text-slate-600 font-medium"> — {exp.company}</span>
                    <span className="text-slate-500 text-[11px]"> ({exp.location})</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 tabular-nums shrink-0">
                    {exp.startDate} – {exp.current ? 'Pres.' : exp.endDate}
                  </span>
                </div>
                {exp.technologies?.length > 0 && (
                  <div className="text-[10px] font-mono text-slate-500">
                    Tech: {exp.technologies.join(', ')}
                  </div>
                )}
                <ul className="mt-1 space-y-0.5 text-[11.5px] text-slate-700 list-disc list-outside ml-3.5 leading-snug">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillGroups.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-0.5 mb-1.5" style={{ color: accent }}>
            Skills & Competencies
          </h2>
          <div className="space-y-1 text-[11.5px]">
            {skillGroups.map((grp) => (
              <div key={grp.id} className="flex gap-2">
                <span className="font-bold text-slate-900 w-32 shrink-0">{grp.category}:</span>
                <span className="text-slate-700">{grp.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2-Column Split: Education & Projects/Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Education */}
        {educations.length > 0 && (
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-0.5 mb-1.5" style={{ color: accent }}>
              Education
            </h2>
            <div className="space-y-1.5 text-[11.5px]">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <strong className="text-slate-950">{edu.degree}</strong>
                    <span className="text-[10.5px] font-mono text-slate-500 tabular-nums">{edu.startDate}–{edu.endDate}</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">{edu.institution} · {edu.location}</div>
                  {edu.honors && <div className="text-[10.5px] text-slate-500 italic">{edu.honors}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Certifications */}
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-0.5 mb-1.5" style={{ color: accent }}>
            Projects & Certifications
          </h2>
          <div className="space-y-1.5 text-[11.5px]">
            {projects.slice(0, 2).map((p) => (
              <div key={p.id}>
                <div className="font-bold text-slate-900">{p.title}</div>
                <div className="text-slate-600 text-[11px] line-clamp-1">{p.bullets[0]}</div>
              </div>
            ))}
            {certifications.slice(0, 2).map((c) => (
              <div key={c.id} className="text-[11px] text-slate-700">
                <strong className="text-slate-900">{c.name}</strong> ({c.issuer})
              </div>
            ))}
            {languages.length > 0 && (
              <div className="text-[11px] text-slate-600 pt-0.5">
                Languages: {languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
