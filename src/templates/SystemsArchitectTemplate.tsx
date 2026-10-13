import React from 'react';
import { ResumeData, ThemeConfig } from '../types/resume';
import { Terminal, Cpu, Network, Shield, ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const SystemsArchitectTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = data;
  const accent = theme.accentColor || '#0f172a';

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-slate-900 font-sans p-8 sm:p-12 print:p-0 text-xs">
      {/* Top Architect Terminal-Style Strip */}
      <header className="border-b-2 border-slate-900 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">
              Principal Systems Architecture & Engineering
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-mono">
              {personal.fullName}
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {personal.title}
            </p>
          </div>

          <div className="text-xs font-mono text-slate-600 sm:text-right space-y-0.5 shrink-0">
            {personal.location && <div>{personal.location}</div>}
            {personal.email && (
              <div>
                <a href={`mailto:${personal.email}`} className="text-blue-700 hover:underline">
                  {personal.email}
                </a>
              </div>
            )}
            {personal.phone && <div>{personal.phone}</div>}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mt-3 text-xs font-mono text-slate-500">
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
              {personal.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {personal.github && (
            <>
              <span>|</span>
              <a href={personal.github} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                GitHub: {personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </>
          )}
          {personal.linkedin && (
            <>
              <span>|</span>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                LinkedIn
              </a>
            </>
          )}
        </div>

        {/* Executive Tech Summary */}
        {personal.summary && (
          <p className="mt-3.5 text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
            {personal.summary}
          </p>
        )}
      </header>

      {/* Prominent Architectural Skills Matrix (3-Column Layout) */}
      {skillGroups.length > 0 && (
        <section className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-slate-700" />
            Core Architectural Capabilities & Tooling Matrix
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skillGroups.map((grp) => (
              <div key={grp.id} className="space-y-0.5">
                <span className="font-bold text-slate-900 font-mono text-[11px] block">
                  {grp.category}
                </span>
                <span className="text-slate-600 text-[11px] leading-relaxed block">
                  {grp.skills.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Experience */}
      <div className="mt-6 space-y-6">
        {experiences.length > 0 && (
          <section className="space-y-4">
            <div className="border-b border-slate-300 pb-1 flex justify-between items-baseline">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-mono">
                Distributed Systems & Platform Leadership
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Scale & Latency Focus</span>
            </div>

            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-sm font-bold text-slate-950 font-mono">
                      {exp.role} <span className="font-normal font-sans text-slate-600">@ {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} · {exp.location}
                    </span>
                  </div>

                  {exp.technologies?.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500">
                      Technologies: {exp.technologies.join(', ')}
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

        {/* Featured High-Scale Projects */}
        {projects.length > 0 && (
          <section className="space-y-3 pt-2">
            <div className="border-b border-slate-300 pb-1 flex justify-between items-baseline">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-mono">
                Architecture Projects & Open Source
              </h2>
            </div>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 font-mono text-xs">{proj.title}</span>
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-700 font-mono hover:underline flex items-center gap-1">
                        Source <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  {proj.technologies?.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500">
                      Stack: {proj.technologies.join(', ')}
                    </div>
                  )}
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-slate-700">
                    {proj.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education and Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-slate-200">
          {educations.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-[11px] font-mono text-slate-900 mb-2">
                Education
              </h3>
              {educations.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution} · {edu.startDate}–{edu.endDate}</div>
                  {edu.honors && <div className="text-slate-500 italic">{edu.honors}</div>}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h3 className="font-bold uppercase tracking-wider text-[11px] font-mono text-slate-900 mb-2">
                Cloud Architecture Certifications
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {certifications.map((c) => (
                  <li key={c.id}>
                    <strong>{c.name}</strong> — {c.issuer} ({c.issueDate})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
