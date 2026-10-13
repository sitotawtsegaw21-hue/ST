import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ModernTechTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages, customSections } = data;
  const accent = theme.accentColor || '#0284c7';

  const spacingClass = theme.spacing === 'compact' ? 'space-y-4' : theme.spacing === 'relaxed' ? 'space-y-7' : 'space-y-5';

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-900 font-sans p-8 sm:p-12 print:p-0">
      {/* Header */}
      <header className="pb-5 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              {personal.fullName}
            </h1>
            <p className="text-base font-semibold mt-1" style={{ color: accent }}>
              {personal.title}
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col text-xs text-slate-600 sm:text-right space-y-1 shrink-0 font-medium">
            {personal.location && (
              <div className="flex items-center sm:justify-end gap-1.5">
                {theme.showIcons && <MapPin className="w-3.5 h-3.5 text-slate-400" />}
                <span>{personal.location}</span>
              </div>
            )}
            {personal.email && (
              <div className="flex items-center sm:justify-end gap-1.5">
                {theme.showIcons && <Mail className="w-3.5 h-3.5 text-slate-400" />}
                <a href={`mailto:${personal.email}`} className="hover:text-slate-900 hover:underline">
                  {personal.email}
                </a>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center sm:justify-end gap-1.5">
                {theme.showIcons && <Phone className="w-3.5 h-3.5 text-slate-400" />}
                <span>{personal.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Links bar */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600 font-mono">
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 hover:underline">
              {theme.showIcons && <Globe className="w-3 h-3 text-slate-400" />}
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personal.linkedin && (
            <>
              <span className="text-slate-300">·</span>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 hover:underline">
                {theme.showIcons && <Linkedin className="w-3 h-3 text-slate-400" />}
                <span>LinkedIn</span>
              </a>
            </>
          )}
          {personal.github && (
            <>
              <span className="text-slate-300">·</span>
              <a href={personal.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-slate-900 hover:underline">
                {theme.showIcons && <Github className="w-3 h-3 text-slate-400" />}
                <span>GitHub</span>
              </a>
            </>
          )}
        </div>

        {/* Summary */}
        {personal.summary && (
          <p className="mt-4 text-xs sm:text-[13px] text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
            {personal.summary}
          </p>
        )}
      </header>

      {/* Main Sections */}
      <div className={`mt-5 ${spacingClass}`}>
        {/* Render Skills first if Functional format */}
        {theme.cvFormat === 'functional' && skillGroups.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
              Core Competencies & Tooling
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/70 border border-slate-100 rounded-lg p-3.5">
              {skillGroups.map((group) => (
                <div key={group.id} className="space-y-0.5">
                  <div className="font-bold text-slate-900">{group.category}</div>
                  <div className="text-slate-600 leading-normal">{group.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="text-sm font-bold text-slate-900">
                      {exp.role} <span className="font-semibold text-slate-600">· {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} · {exp.location}
                    </span>
                  </div>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Stack: {exp.technologies.join(', ')}
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

        {/* Skills Grid (When standard chronological or hybrid) */}
        {theme.cvFormat !== 'functional' && skillGroups.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
              Core Competencies & Tooling
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/70 border border-slate-100 rounded-lg p-3.5">
              {skillGroups.map((group) => (
                <div key={group.id} className="space-y-0.5">
                  <div className="font-bold text-slate-900">{group.category}</div>
                  <div className="text-slate-600 leading-normal">{group.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
              Education & Degrees
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-xs sm:text-sm">
                    <div className="font-bold text-slate-900">
                      {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {edu.institution} · {edu.location} {edu.honors ? `(${edu.honors})` : ''}
                  </div>
                  {edu.highlights?.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-xs text-slate-600 list-disc list-outside ml-4">
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

        {/* Featured Projects */}
        {projects.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
              <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
              Engineering Projects & Open Source
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {proj.title} <span className="font-normal text-xs text-slate-500">· {proj.role}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                          Live Demo
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies?.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Tech: {proj.technologies.join(', ')}
                    </div>
                  )}
                  <ul className="mt-1 space-y-1 text-xs text-slate-700 list-disc list-outside ml-4">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Grid for Certifications & Languages */}
        {(certifications.length > 0 || languages.length > 0 || customSections.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-xs">
            {certifications.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-1.5" style={{ color: accent }}>
                  Certifications
                </h3>
                <ul className="space-y-1 text-slate-700">
                  {certifications.map((c) => (
                    <li key={c.id}>
                      <span className="font-semibold text-slate-900">{c.name}</span> · {c.issuer} ({c.issueDate})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-1.5" style={{ color: accent }}>
                  Languages
                </h3>
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
