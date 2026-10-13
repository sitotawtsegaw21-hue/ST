import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const CreativeEditorialTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = data;
  const accent = theme.accentColor || '#18181b';

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-neutral-900 font-sans p-8 sm:p-14 print:p-0">
      {/* Editorial Bauhaus Top Bar */}
      <div className="flex justify-between items-end border-b-4 border-neutral-950 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
            Curriculum Vitae / Edition 2026
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-neutral-950 uppercase leading-none">
            {personal.fullName}
          </h1>
          <p className="text-base font-medium tracking-tight text-neutral-600 mt-2">
            {personal.title}
          </p>
        </div>

        <div className="text-right text-xs space-y-1 font-mono text-neutral-600 shrink-0 hidden sm:block">
          {personal.location && <div>{personal.location}</div>}
          {personal.email && (
            <div>
              <a href={`mailto:${personal.email}`} className="hover:text-black hover:underline font-semibold">
                {personal.email}
              </a>
            </div>
          )}
          {personal.phone && <div>{personal.phone}</div>}
        </div>
      </div>

      {/* Mobile contact strip */}
      <div className="sm:hidden flex flex-wrap gap-2 text-xs font-mono text-neutral-600 py-2 border-b border-neutral-200">
        {personal.location && <span>{personal.location} ·</span>}
        {personal.email && <a href={`mailto:${personal.email}`}>{personal.email}</a>}
        {personal.phone && <span>· {personal.phone}</span>}
      </div>

      {/* Narrative Lead Statement */}
      {personal.summary && (
        <div className="py-6 border-b border-neutral-200">
          <p className="text-sm sm:text-base text-neutral-800 font-serif leading-relaxed italic max-w-2xl">
            "{personal.summary}"
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 mt-3">
            {personal.website && (
              <a href={personal.website} target="_blank" rel="noreferrer" className="hover:text-black underline underline-offset-2">
                Portfolio ↗
              </a>
            )}
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-black underline underline-offset-2">
                LinkedIn ↗
              </a>
            )}
            {personal.github && (
              <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-black underline underline-offset-2">
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Work History (7 cols) */}
        <div className="md:col-span-8 space-y-6">
          <section className="space-y-5">
            <div className="flex items-baseline justify-between border-b-2 border-neutral-900 pb-1">
              <h2 className="text-xs font-black uppercase tracking-widest text-neutral-950">
                Practice & Track Record
              </h2>
              <span className="text-[10px] font-mono text-neutral-400">01 / Experience</span>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2 break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-neutral-950">
                      {exp.role} <span className="font-normal text-neutral-500">at {exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-neutral-500 tabular-nums">
                      {exp.startDate} – {exp.current ? 'Now' : exp.endDate}
                    </span>
                  </div>

                  {exp.technologies?.length > 0 && (
                    <div className="text-[11px] font-mono text-neutral-500">
                      Medium & Tools: {exp.technologies.join(' · ')}
                    </div>
                  )}

                  <ul className="space-y-1.5 text-xs text-neutral-700 list-disc list-outside ml-4 leading-relaxed">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Works / Projects */}
          {projects.length > 0 && (
            <section className="space-y-4 pt-2">
              <div className="flex items-baseline justify-between border-b-2 border-neutral-900 pb-1">
                <h2 className="text-xs font-black uppercase tracking-widest text-neutral-950">
                  Select Projects & Works
                </h2>
                <span className="text-[10px] font-mono text-neutral-400">02 / Works</span>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="break-inside-avoid space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-neutral-900">{proj.title}</span>
                      <span className="text-[11px] font-mono text-neutral-400">{proj.role}</span>
                    </div>
                    <p className="text-xs text-neutral-600">{proj.bullets[0]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Disciplines, Education & Metadata (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          {/* Disciplines / Skills */}
          {skillGroups.length > 0 && (
            <section className="space-y-3">
              <div className="border-b-2 border-neutral-900 pb-1">
                <h2 className="text-xs font-black uppercase tracking-widest text-neutral-950">
                  Disciplines
                </h2>
              </div>
              <div className="space-y-3 text-xs">
                {skillGroups.map((grp) => (
                  <div key={grp.id} className="space-y-1">
                    <span className="font-bold text-neutral-900 block font-mono text-[11px]">
                      {grp.category}
                    </span>
                    <span className="text-neutral-600 leading-normal block">
                      {grp.skills.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <section className="space-y-3">
              <div className="border-b-2 border-neutral-900 pb-1">
                <h2 className="text-xs font-black uppercase tracking-widest text-neutral-950">
                  Academia
                </h2>
              </div>
              <div className="space-y-3 text-xs">
                {educations.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <strong className="text-neutral-950 block">{edu.degree}</strong>
                    <div className="text-neutral-600">{edu.institution}</div>
                    <div className="text-[11px] font-mono text-neutral-400 tabular-nums">
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages & Accreditations */}
          {(languages.length > 0 || certifications.length > 0) && (
            <section className="space-y-3 pt-2 border-t border-neutral-200 text-xs">
              {languages.length > 0 && (
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-neutral-950 block mb-1">
                    Languages
                  </span>
                  <div className="space-y-0.5 text-neutral-600 font-mono text-[11px]">
                    {languages.map((l) => (
                      <div key={l.id}>{l.language} — {l.proficiency}</div>
                    ))}
                  </div>
                </div>
              )}
              {certifications.length > 0 && (
                <div className="pt-2">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-neutral-950 block mb-1">
                    Accreditations
                  </span>
                  <div className="space-y-1 text-neutral-600 text-[11px]">
                    {certifications.map((c) => (
                      <div key={c.id}><strong>{c.name}</strong>, {c.issuer}</div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
