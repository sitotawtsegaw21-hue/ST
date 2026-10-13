import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, Briefcase, GraduationCap } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const TimelineModernTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = data;
  const accent = theme.accentColor || '#0284c7';

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-800 font-sans p-8 sm:p-12 print:p-0 text-xs">
      {/* Header */}
      <header className="pb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {personal.fullName}
            </h1>
            <p className="text-base font-semibold mt-1" style={{ color: accent }}>
              {personal.title}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-x-4 gap-y-1 text-xs text-slate-600 sm:text-right font-medium">
            {personal.location && <span>{personal.location}</span>}
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="hover:text-slate-900 hover:underline">
                {personal.email}
              </a>
            )}
            {personal.phone && <span>{personal.phone}</span>}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500 font-mono">
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noreferrer" className="hover:text-slate-900 hover:underline">
              {personal.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {personal.linkedin && (
            <>
              <span>·</span>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-900 hover:underline">
                LinkedIn
              </a>
            </>
          )}
          {personal.github && (
            <>
              <span>·</span>
              <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-slate-900 hover:underline">
                GitHub
              </a>
            </>
          )}
        </div>

        {personal.summary && (
          <p className="mt-4 text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
            {personal.summary}
          </p>
        )}
      </header>

      {/* Main Content */}
      <div className="mt-6 space-y-6">
        {/* Timeline Work Experience */}
        {experiences.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-4" style={{ color: accent }}>
              <Briefcase className="w-3.5 h-3.5" />
              Career Journey & Milestones
            </h2>

            {/* Timeline container */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative break-inside-avoid">
                  {/* Timeline Node Dot */}
                  <div 
                    className="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-white ring-2 ring-slate-300"
                    style={{ backgroundColor: accent }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-sm font-bold text-slate-900">
                      {exp.role} <span className="font-semibold text-slate-600">· {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} · {exp.location}
                    </span>
                  </div>

                  {exp.technologies?.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Stack: {exp.technologies.join(', ')}
                    </div>
                  )}

                  <ul className="mt-2 space-y-1.5 text-xs text-slate-700 list-disc list-outside ml-4 leading-relaxed">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Timeline */}
        {educations.length > 0 && (
          <section className="pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3" style={{ color: accent }}>
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Background
            </h2>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {educations.map((edu) => (
                <div key={edu.id} className="relative break-inside-avoid">
                  <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white ring-2 ring-slate-200" />
                  <div className="flex justify-between items-baseline">
                    <strong className="text-slate-900 text-xs sm:text-sm">{edu.degree}</strong>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <div className="text-slate-600 text-xs">
                    {edu.institution} · {edu.location} {edu.honors ? `(${edu.honors})` : ''}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Competencies Matrix */}
        {skillGroups.length > 0 && (
          <section className="pt-2 border-t border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3" style={{ color: accent }}>
              Competencies & Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillGroups.map((grp) => (
                <div key={grp.id} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-md">
                  <div className="font-bold text-slate-900 mb-0.5">{grp.category}</div>
                  <div className="text-slate-600 text-xs">{grp.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications and Languages */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
            {certifications.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-1" style={{ color: accent }}>
                  Certifications
                </h3>
                <ul className="space-y-1 text-slate-700">
                  {certifications.map((c) => (
                    <li key={c.id}><strong>{c.name}</strong> · {c.issuer}</li>
                  ))}
                </ul>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h3 className="font-bold uppercase tracking-wider text-slate-900 mb-1" style={{ color: accent }}>
                  Languages
                </h3>
                <p className="text-slate-700">
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
