import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const EuropassTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = data;
  const accent = theme.accentColor || '#004494'; // Europass classic EU cobalt blue default

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-800 font-sans p-8 sm:p-12 print:p-0 text-xs leading-relaxed">
      {/* Header Banner - Europass Official Style */}
      <header className="pb-6 border-b-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 font-mono">
              Europass Curriculum Vitae
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {personal.fullName}
            </h1>
            <p className="text-sm font-semibold" style={{ color: accent }}>
              {personal.title}
            </p>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-600 sm:text-right shrink-0">
            {personal.location && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.email && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {personal.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {personal.summary && (
          <div className="mt-4 pt-3 border-t border-slate-100 text-slate-700">
            <span className="font-bold text-slate-900 mr-2">Work Objective / Profile:</span>
            {personal.summary}
          </div>
        )}
      </header>

      {/* Main Content with classic Europass 2-column layout (Left: Dates/Context, Right: Details) */}
      <div className="mt-6 space-y-6">
        {/* Work Experience */}
        {experiences.length > 0 && (
          <section className="space-y-4">
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-300"
              style={{ color: accent }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 break-inside-avoid">
                  {/* Left Column: Dates & Location */}
                  <div className="sm:col-span-4 text-slate-500 font-mono text-[11px]">
                    <div className="font-semibold text-slate-700 tabular-nums">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </div>
                    <div>{exp.location}</div>
                  </div>

                  {/* Right Column: Title, Employer & Bullet Details */}
                  <div className="sm:col-span-8 space-y-1">
                    <div className="font-bold text-slate-900 text-[13px]">{exp.role}</div>
                    <div className="font-medium text-slate-700 italic">{exp.company}</div>
                    {exp.technologies?.length > 0 && (
                      <div className="text-[10.5px] text-slate-500 font-mono">
                        Activities & Tools: {exp.technologies.join(', ')}
                      </div>
                    )}
                    <ul className="list-disc list-outside ml-3.5 mt-1 space-y-1 text-slate-700 text-xs">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education and Training */}
        {educations.length > 0 && (
          <section className="space-y-4">
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-300"
              style={{ color: accent }}
            >
              Education and Training
            </h2>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 break-inside-avoid">
                  <div className="sm:col-span-4 text-slate-500 font-mono text-[11px]">
                    <div className="font-semibold text-slate-700 tabular-nums">
                      {edu.startDate} – {edu.endDate}
                    </div>
                    <div>{edu.location}</div>
                  </div>
                  <div className="sm:col-span-8 space-y-0.5">
                    <div className="font-bold text-slate-900 text-[13px]">{edu.degree}</div>
                    {edu.fieldOfStudy && <div className="text-slate-700">{edu.fieldOfStudy}</div>}
                    <div className="font-medium text-slate-600 italic">
                      {edu.institution} {edu.honors ? `(${edu.honors})` : ''}
                    </div>
                    {edu.highlights?.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 text-slate-600 text-[11px] mt-1 space-y-0.5">
                        {edu.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Personal & Technical Skills */}
        {skillGroups.length > 0 && (
          <section className="space-y-3">
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-300"
              style={{ color: accent }}
            >
              Personal Skills & Competencies
            </h2>
            <div className="space-y-2">
              {skillGroups.map((grp) => (
                <div key={grp.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                  <div className="sm:col-span-4 font-bold text-slate-800 text-[11px]">
                    {grp.category}
                  </div>
                  <div className="sm:col-span-8 text-slate-700 text-xs">
                    {grp.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages (CEFR Framework Style) */}
        {languages.length > 0 && (
          <section className="space-y-2">
            <h2 
              className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-300"
              style={{ color: accent }}
            >
              Language Competencies (CEFR)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {languages.map((l) => (
                <div key={l.id} className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between">
                  <span className="font-bold text-slate-900">{l.language}</span>
                  <span className="text-slate-600 font-medium">{l.proficiency} Proficiency</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications and Projects */}
        {(certifications.length > 0 || projects.length > 0) && (
          <section className="space-y-3 pt-2 border-t border-slate-200">
            {certifications.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 uppercase text-[11px] mb-1.5" style={{ color: accent }}>
                  Certifications & Diplomas
                </h3>
                <ul className="space-y-1 text-slate-700">
                  {certifications.map((c) => (
                    <li key={c.id}>
                      <span className="font-bold text-slate-900">{c.name}</span> — {c.issuer} ({c.issueDate})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {projects.length > 0 && (
              <div className="pt-2">
                <h3 className="font-bold text-slate-900 uppercase text-[11px] mb-1.5" style={{ color: accent }}>
                  Projects & Honours
                </h3>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id}>
                      <span className="font-bold text-slate-900">{p.title}</span> ({p.role}): <span className="text-slate-700">{p.bullets[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
