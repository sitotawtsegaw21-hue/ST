import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const NordicSplitTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = data;
  const accent = theme.accentColor || '#1e293b';

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-900 font-sans print:p-0">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[1050px]">
        {/* Left Column (35%) */}
        <aside className="md:col-span-4 bg-slate-50 border-r border-slate-200 p-6 sm:p-8 space-y-6 text-xs">
          {/* Contact Coordinates */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-slate-900 text-[11px] pb-1 border-b border-slate-200" style={{ color: accent }}>
              Contact
            </h3>
            <div className="space-y-2 text-slate-600">
              {personal.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <a href={`mailto:${personal.email}`} className="hover:underline break-all">
                    {personal.email}
                  </a>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-start gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline break-all">
                    {personal.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {personal.github && (
                <div className="flex items-start gap-2">
                  <Github className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <a href={personal.github} target="_blank" rel="noreferrer" className="hover:underline">
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Education in sidebar for compact layout */}
          {educations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold uppercase tracking-wider text-slate-900 text-[11px] pb-1 border-b border-slate-200" style={{ color: accent }}>
                Education
              </h3>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    {edu.fieldOfStudy && <div className="text-slate-600">{edu.fieldOfStudy}</div>}
                    <div className="text-slate-500 font-medium">{edu.institution}</div>
                    <div className="text-[11px] font-mono text-slate-400 tabular-nums">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competencies */}
          {skillGroups.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold uppercase tracking-wider text-slate-900 text-[11px] pb-1 border-b border-slate-200" style={{ color: accent }}>
                Skills & Stack
              </h3>
              <div className="space-y-3">
                {skillGroups.map((group) => (
                  <div key={group.id} className="space-y-1">
                    <div className="font-bold text-slate-800 text-[11px]">{group.category}</div>
                    <div className="text-slate-600 leading-relaxed">{group.skills.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold uppercase tracking-wider text-slate-900 text-[11px] pb-1 border-b border-slate-200" style={{ color: accent }}>
                Certifications
              </h3>
              <ul className="space-y-2 text-slate-600">
                {certifications.map((c) => (
                  <li key={c.id}>
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-[11px] text-slate-500">{c.issuer} · {c.issueDate}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-bold uppercase tracking-wider text-slate-900 text-[11px] pb-1 border-b border-slate-200" style={{ color: accent }}>
                Languages
              </h3>
              <div className="space-y-1 text-slate-600">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium text-slate-800">{l.language}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Content Area (65%) */}
        <main className="md:col-span-8 p-6 sm:p-10 space-y-6">
          {/* Header Title */}
          <header className="pb-4 border-b border-slate-200">
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              {personal.fullName}
            </h1>
            <p className="text-base font-semibold text-slate-700 mt-1" style={{ color: accent }}>
              {personal.title}
            </p>
            {personal.summary && (
              <p className="mt-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                {personal.summary}
              </p>
            )}
          </header>

          {/* Work Experience */}
          {experiences.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-1 border-b border-slate-200" style={{ color: accent }}>
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <div className="text-sm font-bold text-slate-900">
                        {exp.role} <span className="font-semibold text-slate-600">· {exp.company}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.technologies?.length > 0 && (
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

          {/* Projects */}
          {projects.length > 0 && (
            <section className="space-y-3 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-1 border-b border-slate-200" style={{ color: accent }}>
                Notable Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {proj.title} <span className="font-normal text-xs text-slate-500">· {proj.role}</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            Demo
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
                        Tools: {proj.technologies.join(', ')}
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
        </main>
      </div>
    </div>
  );
};
