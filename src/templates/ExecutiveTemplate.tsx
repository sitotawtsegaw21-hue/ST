import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages, customSections } = data;
  const accent = theme.accentColor || '#0f172a';

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-900 font-sans p-8 sm:p-12 print:p-0">
      {/* Top Banner Stripe */}
      <div className="h-2 w-full rounded-full mb-6" style={{ backgroundColor: accent }} />

      {/* Executive Header */}
      <header className="pb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              {personal.fullName}
            </h1>
            <p className="text-base font-semibold tracking-wide text-slate-700 mt-1">
              {personal.title}
            </p>
          </div>

          <div className="text-xs text-slate-600 sm:text-right space-y-0.5 font-medium">
            {personal.location && <div>{personal.location}</div>}
            {personal.email && (
              <div>
                <a href={`mailto:${personal.email}`} className="hover:underline">
                  {personal.email}
                </a>
              </div>
            )}
            {personal.phone && <div>{personal.phone}</div>}
          </div>
        </div>

        {/* Links bar */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline font-medium">
              Portfolio: {personal.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {personal.linkedin && (
            <>
              <span>·</span>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline font-medium">
                LinkedIn
              </a>
            </>
          )}
          {personal.github && (
            <>
              <span>·</span>
              <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline font-medium">
                GitHub
              </a>
            </>
          )}
        </div>

        {/* Executive Overview Box */}
        {personal.summary && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200/80 rounded-lg">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Executive Profile
            </div>
            <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-normal">
              {personal.summary}
            </p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="mt-6 space-y-6">
        {/* Core Competencies Ribbon */}
        {skillGroups.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-1 mb-3">
              Core Competencies & Strategic Domains
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {skillGroups.map((grp) => (
                <div key={grp.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded">
                  <div className="font-bold text-slate-900 mb-0.5">{grp.category}</div>
                  <div className="text-slate-600">{grp.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Leadership & Work Experience */}
        {experiences.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-1 mb-4">
              Professional Experience & Leadership Track Record
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="text-sm font-bold text-slate-900">
                      {exp.role} <span className="font-semibold text-slate-600">| {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} · {exp.location}
                    </span>
                  </div>
                  {exp.technologies?.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Scope: {exp.technologies.join(', ')}
                    </div>
                  )}
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-700 list-disc list-outside ml-4 leading-relaxed">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        {educations.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-1 mb-3">
              Education & Academic Credentials
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="break-inside-avoid flex justify-between items-baseline text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                    <div className="text-xs text-slate-600 font-medium">
                      {edu.institution} · {edu.location} {edu.honors ? `(${edu.honors})` : ''}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections / Honors */}
        {customSections.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-950 border-b-2 border-slate-900 pb-1 mb-3">
              Key Recognitions & Board Appointments
            </h2>
            <div className="space-y-2 text-xs">
              {customSections.map((c) => (
                <div key={c.id}>
                  <div className="font-bold text-slate-900">{c.title} {c.subtitle && <span className="font-normal text-slate-600">— {c.subtitle}</span>}</div>
                  <p className="text-slate-700">{c.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications and Languages */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-xs">
            {certifications.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-1">Certifications</h3>
                <ul className="space-y-1 text-slate-700">
                  {certifications.map((c) => (
                    <li key={c.id}><strong className="text-slate-900">{c.name}</strong> · {c.issuer}</li>
                  ))}
                </ul>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-1">Languages</h3>
                <div className="text-slate-700">
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(' · ')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
