import { ResumeData, ThemeConfig } from '../types/resume';

/**
 * Generates clean, standalone HTML + Tailwind CSS code for the CV.
 */
export function generateTailwindHtml(resume: ResumeData, theme: ThemeConfig): string {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = resume;
  const accent = theme.accentColor || '#0f172a';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(personal.fullName)} - Curriculum Vitae</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    @media print {
      @page { margin: 12mm; }
      body { background: white !important; }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 py-10 px-4 print:py-0 print:px-0">
  <main class="max-w-[820px] mx-auto bg-white p-10 shadow-sm border border-slate-200 rounded-lg print:border-none print:shadow-none print:p-0">
    <!-- Header -->
    <header class="border-b border-slate-200 pb-6 mb-6">
      <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-950">${escapeHtml(personal.fullName)}</h1>
          <p class="text-base font-medium text-slate-700 mt-1">${escapeHtml(personal.title)}</p>
        </div>
        <div class="text-xs text-slate-600 space-y-1 md:text-right">
          ${personal.location ? `<div>${escapeHtml(personal.location)}</div>` : ''}
          ${personal.email ? `<div><a href="mailto:${escapeHtml(personal.email)}" class="hover:underline">${escapeHtml(personal.email)}</a></div>` : ''}
          ${personal.phone ? `<div>${escapeHtml(personal.phone)}</div>` : ''}
        </div>
      </div>
      
      <!-- Contact links -->
      <div class="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium text-slate-600">
        ${personal.website ? `<a href="${escapeHtml(personal.website)}" target="_blank" class="hover:underline">Portfolio: ${escapeHtml(personal.website.replace(/^https?:\/\//, ''))}</a>` : ''}
        ${personal.linkedin ? `<span>·</span><a href="${escapeHtml(personal.linkedin)}" target="_blank" class="hover:underline">LinkedIn</a>` : ''}
        ${personal.github ? `<span>·</span><a href="${escapeHtml(personal.github)}" target="_blank" class="hover:underline">GitHub</a>` : ''}
      </div>

      ${personal.summary ? `
      <p class="mt-4 text-xs md:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
        ${escapeHtml(personal.summary)}
      </p>` : ''}
    </header>

    <!-- Experience Section -->
    ${experiences.length > 0 ? `
    <section class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1.5 mb-4" style="color: ${accent}">
        Professional Experience
      </h2>
      <div class="space-y-5">
        ${experiences.map(exp => `
        <article class="break-inside-avoid">
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 class="text-sm font-bold text-slate-900">${escapeHtml(exp.role)} <span class="font-normal text-slate-600">at ${escapeHtml(exp.company)}</span></h3>
            <span class="text-xs text-slate-500 font-mono tabular-nums shrink-0">${escapeHtml(exp.startDate)} – ${exp.current ? 'Present' : escapeHtml(exp.endDate)} · ${escapeHtml(exp.location)}</span>
          </div>
          ${exp.technologies && exp.technologies.length > 0 ? `
          <div class="text-[11px] text-slate-500 font-mono mt-0.5">
            Stack: ${exp.technologies.map(t => escapeHtml(t)).join(', ')}
          </div>` : ''}
          <ul class="mt-2 space-y-1.5 text-xs text-slate-700 list-disc list-outside ml-4 leading-relaxed">
            ${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('\n            ')}
          </ul>
        </article>
        `).join('')}
      </div>
    </section>` : ''}

    <!-- Education Section -->
    ${educations.length > 0 ? `
    <section class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1.5 mb-4" style="color: ${accent}">
        Education
      </h2>
      <div class="space-y-4">
        ${educations.map(edu => `
        <article class="break-inside-avoid">
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 class="text-sm font-bold text-slate-900">${escapeHtml(edu.degree)}${edu.fieldOfStudy ? `, ${escapeHtml(edu.fieldOfStudy)}` : ''}</h3>
            <span class="text-xs text-slate-500 font-mono tabular-nums shrink-0">${escapeHtml(edu.startDate)} – ${escapeHtml(edu.endDate)}</span>
          </div>
          <div class="text-xs text-slate-600 font-medium">${escapeHtml(edu.institution)} · ${escapeHtml(edu.location)} ${edu.honors ? `(${escapeHtml(edu.honors)})` : ''}</div>
          ${edu.highlights && edu.highlights.length > 0 ? `
          <ul class="mt-1 space-y-1 text-xs text-slate-700 list-disc list-outside ml-4">
            ${edu.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
          </ul>` : ''}
        </article>
        `).join('')}
      </div>
    </section>` : ''}

    <!-- Skills Section -->
    ${skillGroups.length > 0 ? `
    <section class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1.5 mb-3" style="color: ${accent}">
        Skills & Competencies
      </h2>
      <div class="space-y-2 text-xs">
        ${skillGroups.map(group => `
        <div class="flex flex-col sm:flex-row sm:gap-2">
          <span class="font-bold text-slate-900 sm:w-36 shrink-0">${escapeHtml(group.category)}:</span>
          <span class="text-slate-700">${group.skills.map(s => escapeHtml(s)).join(', ')}</span>
        </div>
        `).join('')}
      </div>
    </section>` : ''}

    <!-- Projects Section -->
    ${projects.length > 0 ? `
    <section class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1.5 mb-4" style="color: ${accent}">
        Featured Projects
      </h2>
      <div class="space-y-4">
        ${projects.map(proj => `
        <article class="break-inside-avoid">
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h3 class="text-sm font-bold text-slate-900">${escapeHtml(proj.title)} <span class="font-normal text-slate-500 text-xs">· ${escapeHtml(proj.role)}</span></h3>
            ${proj.liveUrl || proj.githubUrl ? `
            <div class="text-xs text-slate-600 space-x-2">
              ${proj.liveUrl ? `<a href="${escapeHtml(proj.liveUrl)}" target="_blank" class="hover:underline text-blue-600">Demo</a>` : ''}
              ${proj.githubUrl ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" class="hover:underline text-slate-700">Source</a>` : ''}
            </div>` : ''}
          </div>
          ${proj.technologies && proj.technologies.length > 0 ? `
          <div class="text-[11px] text-slate-500 font-mono mt-0.5">Built with: ${proj.technologies.map(t => escapeHtml(t)).join(', ')}</div>` : ''}
          <ul class="mt-1 space-y-1 text-xs text-slate-700 list-disc list-outside ml-4">
            ${proj.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
          </ul>
        </article>
        `).join('')}
      </div>
    </section>` : ''}

    <!-- Certifications & Languages -->
    ${(certifications.length > 0 || languages.length > 0) ? `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
      ${certifications.length > 0 ? `
      <div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2" style="color: ${accent}">Certifications</h3>
        <ul class="text-xs space-y-1.5 text-slate-700">
          ${certifications.map(c => `<li><strong class="text-slate-900">${escapeHtml(c.name)}</strong> · ${escapeHtml(c.issuer)} (${escapeHtml(c.issueDate)})</li>`).join('')}
        </ul>
      </div>` : ''}
      ${languages.length > 0 ? `
      <div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2" style="color: ${accent}">Languages</h3>
        <p class="text-xs text-slate-700">
          ${languages.map(l => `${escapeHtml(l.language)} (${escapeHtml(l.proficiency)})`).join(' · ')}
        </p>
      </div>` : ''}
    </div>` : ''}
  </main>
</body>
</html>`;
}

/**
 * Generates reusable React + TypeScript component code.
 */
export function generateReactTsx(resume: ResumeData, theme: ThemeConfig): string {
  return `import React from 'react';

export interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
  };
  experiences: Array<{
    id: string;
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    technologies: string[];
    bullets: string[];
  }>;
  educations: Array<{
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    location: string;
    startDate: string;
    endDate: string;
    honors?: string;
  }>;
  skillGroups: Array<{
    id: string;
    category: string;
    skills: string[];
  }>;
  projects: Array<{
    id: string;
    title: string;
    role: string;
    bullets: string[];
    technologies: string[];
  }>;
}

export const initialResumeData: ResumeData = ${JSON.stringify(resume, null, 2)};

export function ResumeView({ data = initialResumeData }: { data?: ResumeData }) {
  const { personal, experiences, educations, skillGroups, projects } = data;

  return (
    <article className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-slate-200 rounded-lg text-slate-900 font-sans">
      {/* Header */}
      <header className="border-b border-slate-200 pb-6 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">{personal.fullName}</h1>
        <p className="text-base font-semibold text-slate-700 mt-0.5">{personal.title}</p>
        
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3 font-mono">
          <span>{personal.location}</span>
          <span>·</span>
          <a href={"mailto:" + personal.email} className="hover:underline">{personal.email}</a>
          <span>·</span>
          <span>{personal.phone}</span>
          {personal.website && (
            <>
              <span>·</span>
              <a href={personal.website} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
            </>
          )}
        </div>

        {personal.summary && (
          <p className="mt-4 text-xs md:text-sm text-slate-700 leading-relaxed">
            {personal.summary}
          </p>
        )}
      </header>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-4">
          Experience
        </h2>
        <div className="space-y-5">
          {experiences.map(exp => (
            <div key={exp.id}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-bold text-slate-900">{exp.role} <span className="font-normal text-slate-600">at {exp.company}</span></span>
                <span className="text-xs text-slate-500 font-mono tabular-nums">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              {exp.technologies?.length > 0 && (
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Tech: {exp.technologies.join(', ')}
                </div>
              )}
              <ul className="mt-2 list-disc ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                {exp.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
          Skills & Technologies
        </h2>
        <div className="space-y-2 text-xs">
          {skillGroups.map(grp => (
            <div key={grp.id} className="flex gap-2">
              <span className="font-bold text-slate-800 w-32 shrink-0">{grp.category}:</span>
              <span className="text-slate-600">{grp.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
          Education
        </h2>
        <div className="space-y-3">
          {educations.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline text-xs">
              <div>
                <strong className="text-slate-900">{edu.degree}</strong> {edu.fieldOfStudy && <span>- {edu.fieldOfStudy}</span>}
                <div className="text-slate-600">{edu.institution} · {edu.location}</div>
              </div>
              <span className="font-mono text-slate-500 tabular-nums">{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

export default ResumeView;
`;
}

/**
 * Generates production-ready academic/professional LaTeX code for Overleaf / TeXLive.
 */
export function generateLatexCode(resume: ResumeData): string {
  const { personal, experiences, educations, skillGroups, projects } = resume;

  return `%----------------------------------------------------------------------------------------
% Professional ATS-Compliant CV Template
% Compiler: pdflatex or xelatex
% Suitable for Overleaf, TeXLive, and ATS scanning systems
%----------------------------------------------------------------------------------------

\\documentclass[letterpaper,10pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${latexEscape(personal.fullName)}} \\\\ \\vspace{2pt}
    \\small ${latexEscape(personal.title)} \\\\ \\vspace{2pt}
    \\small ${latexEscape(personal.phone)} $|$ \\href{mailto:${latexEscape(personal.email)}}{${latexEscape(personal.email)}} $|$ 
    ${personal.location ? `${latexEscape(personal.location)} $|$ ` : ''}
    ${personal.linkedin ? `\\href{${latexEscape(personal.linkedin)}}{LinkedIn} $|$ ` : ''}
    ${personal.github ? `\\href{${latexEscape(personal.github)}}{GitHub}` : ''}
\\end{center}

${personal.summary ? `
%-----------SUMMARY-----------
\\section{Professional Summary}
\\small{${latexEscape(personal.summary)}}
` : ''}

%-----------EXPERIENCE-----------
\\section{Experience}
  \\begin{itemize}[leftmargin=0.15in, label={}]
${experiences.map(exp => `
    \\item
      \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{${latexEscape(exp.role)}} & \\small ${latexEscape(exp.startDate)} -- ${exp.current ? 'Present' : latexEscape(exp.endDate)} \\\\
        \\textit{\\small ${latexEscape(exp.company)}} & \\textit{\\small ${latexEscape(exp.location)}} \\\\
      \\end{tabular*}\\vspace{-6pt}
      \\begin{itemize}[leftmargin=0.2in]
${exp.bullets.map(b => `        \\item \\small{${latexEscape(b)}}`).join('\n')}
      \\end{itemize}
`).join('')}
  \\end{itemize}

%-----------EDUCATION-----------
\\section{Education}
  \\begin{itemize}[leftmargin=0.15in, label={}]
${educations.map(edu => `
    \\item
      \\begin{tabular*}{\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
        \\textbf{${latexEscape(edu.institution)}} & \\small ${latexEscape(edu.location)} \\\\
        \\textit{\\small ${latexEscape(edu.degree)}${edu.fieldOfStudy ? `, ${latexEscape(edu.fieldOfStudy)}` : ''}} & \\textit{\\small ${latexEscape(edu.startDate)} -- ${latexEscape(edu.endDate)}} \\\\
      \\end{tabular*}\\vspace{-6pt}
`).join('')}
  \\end{itemize}

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${skillGroups.map(grp => `     \\textbf{${latexEscape(grp.category)}}: {${grp.skills.map(s => latexEscape(s)).join(', ')}} \\\\`).join('\n')}
    }}
 \\end{itemize}

${projects.length > 0 ? `
%-----------PROJECTS-----------
\\section{Projects}
  \\begin{itemize}[leftmargin=0.15in, label={}]
${projects.map(proj => `
    \\item
      \\textbf{${latexEscape(proj.title)}} $|$ \\textit{\\small ${latexEscape(proj.role)}} \\\\
      \\begin{itemize}[leftmargin=0.2in]
${proj.bullets.map(b => `        \\item \\small{${latexEscape(b)}}`).join('\n')}
      \\end{itemize}
`).join('')}
  \\end{itemize}
` : ''}

\\end{document}
`;
}

/**
 * Standard open JSON Resume format (schema.org / jsonresume.org).
 */
export function generateJsonResume(resume: ResumeData): string {
  const jsonResumeObj = {
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: resume.personal.fullName,
      label: resume.personal.title,
      image: resume.personal.avatarUrl || "",
      email: resume.personal.email,
      phone: resume.personal.phone,
      url: resume.personal.website,
      summary: resume.personal.summary,
      location: {
        address: "",
        postalCode: "",
        city: resume.personal.location,
        countryCode: ""
      },
      profiles: [
        ...(resume.personal.linkedin ? [{ network: "LinkedIn", url: resume.personal.linkedin }] : []),
        ...(resume.personal.github ? [{ network: "GitHub", url: resume.personal.github }] : [])
      ]
    },
    work: resume.experiences.map(exp => ({
      name: exp.company,
      position: exp.role,
      url: "",
      startDate: exp.startDate,
      endDate: exp.current ? "Present" : exp.endDate,
      summary: exp.technologies.length > 0 ? `Stack: ${exp.technologies.join(', ')}` : "",
      highlights: exp.bullets
    })),
    education: resume.educations.map(edu => ({
      institution: edu.institution,
      url: "",
      area: edu.fieldOfStudy,
      studyType: edu.degree,
      startDate: edu.startDate,
      endDate: edu.endDate,
      score: edu.gpa || "",
      courses: edu.highlights
    })),
    skills: resume.skillGroups.map(grp => ({
      name: grp.category,
      level: "Master",
      keywords: grp.skills
    })),
    projects: resume.projects.map(p => ({
      name: p.title,
      description: p.subtitle,
      highlights: p.bullets,
      keywords: p.technologies,
      startDate: "",
      endDate: "",
      url: p.liveUrl || p.githubUrl || ""
    })),
    certificates: resume.certifications.map(c => ({
      name: c.name,
      date: c.issueDate,
      issuer: c.issuer,
      url: c.credentialUrl || ""
    })),
    languages: resume.languages.map(l => ({
      language: l.language,
      fluency: l.proficiency
    }))
  };

  return JSON.stringify(jsonResumeObj, null, 2);
}

/**
 * Clean Markdown CV for GitHub or text-only submissions.
 */
export function generateMarkdownResume(resume: ResumeData): string {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = resume;

  return `# ${personal.fullName}
**${personal.title}**  
📍 ${personal.location} | ✉️ [${personal.email}](mailto:${personal.email}) | 📞 ${personal.phone}  
${personal.website ? `🌐 [Portfolio](${personal.website}) | ` : ''}${personal.linkedin ? `💼 [LinkedIn](${personal.linkedin}) | ` : ''}${personal.github ? `🐙 [GitHub](${personal.github})` : ''}

---

## 📌 Professional Summary
${personal.summary}

---

## 💼 Professional Experience

${experiences.map(exp => `### **${exp.role}** — *${exp.company}*
*${exp.startDate} – ${exp.current ? 'Present' : exp.endDate} | ${exp.location}*  
${exp.technologies.length > 0 ? `**Tech Stack:** \`${exp.technologies.join('`, `')}\`  \n` : ''}
${exp.bullets.map(b => `- ${b}`).join('\n')}
`).join('\n')}

---

## 🎓 Education

${educations.map(edu => `### **${edu.degree}** — *${edu.institution}*
*${edu.startDate} – ${edu.endDate} | ${edu.location}*  
${edu.honors ? `*Honors: ${edu.honors}*  \n` : ''}${edu.highlights.map(h => `- ${h}`).join('\n')}
`).join('\n')}

---

## 🛠️ Skills & Competencies

${skillGroups.map(grp => `- **${grp.category}:** ${grp.skills.join(', ')}`).join('\n')}

${projects.length > 0 ? `
---

## 🚀 Featured Projects

${projects.map(p => `### **${p.title}** (${p.role})
${p.liveUrl ? `[Live Demo](${p.liveUrl}) | ` : ''}${p.githubUrl ? `[GitHub Repository](${p.githubUrl})` : ''}  
${p.technologies.length > 0 ? `**Tools:** ${p.technologies.join(', ')}  \n` : ''}
${p.bullets.map(b => `- ${b}`).join('\n')}
`).join('\n')}
` : ''}

${certifications.length > 0 ? `
---

## 📜 Certifications
${certifications.map(c => `- **${c.name}** — ${c.issuer} (${c.issueDate})`).join('\n')}
` : ''}

${languages.length > 0 ? `
---

## 🌐 Languages
${languages.map(l => `- **${l.language}**: ${l.proficiency}`).join('\n')}
` : ''}
`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function latexEscape(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
}

/**
 * Vue 3 SFC (Single File Component) with TypeScript & Tailwind
 */
export function generateVueSfc(resume: ResumeData, theme: ThemeConfig): string {
  return `<script setup lang="ts">
import { ref } from 'vue'

export interface ResumeData {
  personal: {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    website?: string
    linkedin?: string
    github?: string
    summary: string
  }
  experiences: Array<{
    id: string
    company: string
    role: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    technologies: string[]
    bullets: string[]
  }>
  educations: Array<{
    id: string
    institution: string
    degree: string
    fieldOfStudy?: string
    location: string
    startDate: string
    endDate: string
  }>
  skillGroups: Array<{
    id: string
    category: string
    skills: string[]
  }>
}

const resume = ref(${JSON.stringify(resume, null, 2)})
</script>

<template>
  <main class="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-sm border border-slate-200 rounded-lg text-slate-900 font-sans">
    <header class="border-b border-slate-200 pb-5 mb-5">
      <h1 class="text-3xl font-extrabold text-slate-950 tracking-tight">{{ resume.personal.fullName }}</h1>
      <p class="text-base font-semibold text-slate-700 mt-1">{{ resume.personal.title }}</p>
      
      <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mt-3">
        <span>{{ resume.personal.location }}</span>
        <span>·</span>
        <a :href="'mailto:' + resume.personal.email" class="hover:underline">{{ resume.personal.email }}</a>
        <span>·</span>
        <span>{{ resume.personal.phone }}</span>
        <template v-if="resume.personal.website">
          <span>·</span>
          <a :href="resume.personal.website" target="_blank" class="hover:underline">Portfolio</a>
        </template>
      </div>

      <p v-if="resume.personal.summary" class="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
        {{ resume.personal.summary }}
      </p>
    </header>

    <!-- Experience -->
    <section v-if="resume.experiences.length" class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-4">
        Professional Experience
      </h2>
      <div class="space-y-5">
        <article v-for="exp in resume.experiences" :key="exp.id" class="break-inside-avoid">
          <div class="flex justify-between items-baseline text-xs sm:text-sm">
            <span class="font-bold text-slate-900">{{ exp.role }} <span class="font-normal text-slate-600">at {{ exp.company }}</span></span>
            <span class="text-xs font-mono text-slate-500 tabular-nums">{{ exp.startDate }} – {{ exp.current ? 'Present' : exp.endDate }}</span>
          </div>
          <div v-if="exp.technologies?.length" class="text-[11px] font-mono text-slate-500 mt-0.5">
            Stack: {{ exp.technologies.join(', ') }}
          </div>
          <ul class="mt-2 list-disc list-outside ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
            <li v-for="(b, idx) in exp.bullets" :key="idx">{{ b }}</li>
          </ul>
        </article>
      </div>
    </section>

    <!-- Skills -->
    <section v-if="resume.skillGroups.length" class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-3">
        Skills & Competencies
      </h2>
      <div class="space-y-2 text-xs">
        <div v-for="grp in resume.skillGroups" :key="grp.id" class="flex gap-2">
          <span class="font-bold text-slate-900 w-36 shrink-0">{{ grp.category }}:</span>
          <span class="text-slate-700">{{ grp.skills.join(', ') }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
`;
}

/**
 * Svelte 5 Component (.svelte)
 */
export function generateSvelteComponent(resume: ResumeData): string {
  return `<script lang="ts">
  let resume = $state(${JSON.stringify(resume, null, 2)});
</script>

<main class="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-sm border border-slate-200 rounded-lg text-slate-900 font-sans">
  <header class="border-b border-slate-200 pb-5 mb-5">
    <h1 class="text-3xl font-extrabold text-slate-950 tracking-tight">{resume.personal.fullName}</h1>
    <p class="text-base font-semibold text-slate-700 mt-1">{resume.personal.title}</p>
    
    <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mt-3">
      <span>{resume.personal.location}</span>
      <span>·</span>
      <a href={"mailto:" + resume.personal.email} class="hover:underline">{resume.personal.email}</a>
      <span>·</span>
      <span>{resume.personal.phone}</span>
    </div>

    {#if resume.personal.summary}
      <p class="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
        {resume.personal.summary}
      </p>
    {/if}
  </header>

  {#if resume.experiences.length > 0}
    <section class="mb-6">
      <h2 class="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-4">
        Professional Experience
      </h2>
      <div class="space-y-5">
        {#each resume.experiences as exp (exp.id)}
          <div class="break-inside-avoid">
            <div class="flex justify-between items-baseline text-xs sm:text-sm">
              <span class="font-bold text-slate-900">{exp.role} <span class="font-normal text-slate-600">at {exp.company}</span></span>
              <span class="text-xs font-mono text-slate-500 tabular-nums">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <ul class="mt-2 list-disc list-outside ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
              {#each exp.bullets as bullet}
                <li>{bullet}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</main>
`;
}

/**
 * Modern Typst (.typ) Document
 * Typst is the high-performance modern replacement for LaTeX.
 */
export function generateTypstCode(resume: ResumeData): string {
  const { personal, experiences, educations, skillGroups } = resume;

  return `// Typst Curriculum Vitae
// Compile with: typst compile resume.typ resume.pdf

#set page(
  paper: "a4",
  margin: (x: 1.5cm, y: 1.5cm),
)
#set text(
  font: "Liberation Sans",
  size: 10pt,
  fill: rgb("#111827"),
)
#set par(justify: false, leading: 0.65em)

// Header
#align(center)[
  #text(size: 20pt, weight: "bold")[${personal.fullName}] \\
  #v(2pt)
  #text(size: 11pt, weight: "medium", fill: rgb("#374151"))[${personal.title}] \\
  #v(2pt)
  #text(size: 9pt, fill: rgb("#4b5563"))[
    ${personal.location} | #link("mailto:${personal.email}")[${personal.email}] | ${personal.phone}
    ${personal.website ? `| #link("${personal.website}")[Portfolio]` : ''}
    ${personal.github ? `| #link("${personal.github}")[GitHub]` : ''}
  ]
]

#v(8pt)

${personal.summary ? `
// Summary
#line(length: 100%, stroke: 0.5pt + rgb("#e5e7eb"))
#text(size: 9.5pt, fill: rgb("#374151"))[${personal.summary}]
#v(6pt)
` : ''}

// Experience
#text(size: 11pt, weight: "bold", fill: rgb("#111827"))[WORK EXPERIENCE]
#line(length: 100%, stroke: 1pt + rgb("#111827"))
#v(4pt)

${experiences.map(exp => `
#grid(
  columns: (1fr, auto),
  [*${exp.role}*, _${exp.company}_],
  [#text(size: 9pt, fill: rgb("#6b7280"))[${exp.startDate} -- ${exp.current ? 'Present' : exp.endDate} | ${exp.location}]]
)
${exp.technologies.length > 0 ? `#text(size: 8.5pt, fill: rgb("#6b7280"))[Stack: ${exp.technologies.join(', ')}] \\` : ''}
#list(
${exp.bullets.map(b => `  [#text(size: 9pt)[${b}]]`).join(',\n')}
)
#v(4pt)
`).join('\n')}

// Education
#text(size: 11pt, weight: "bold", fill: rgb("#111827"))[EDUCATION]
#line(length: 100%, stroke: 1pt + rgb("#111827"))
#v(4pt)

${educations.map(edu => `
#grid(
  columns: (1fr, auto),
  [*${edu.degree}* -- ${edu.institution}],
  [#text(size: 9pt, fill: rgb("#6b7280"))[${edu.startDate} -- ${edu.endDate}]]
)
#v(2pt)
`).join('\n')}

// Skills
#text(size: 11pt, weight: "bold", fill: rgb("#111827"))[SKILLS & COMPETENCIES]
#line(length: 100%, stroke: 1pt + rgb("#111827"))
#v(4pt)

${skillGroups.map(grp => `*${grp.category}:* ${grp.skills.join(', ')} \\`).join('\n')}
`;
}

/**
 * 100% Pure Plain Text / ASCII Format for legacy ATS systems (Workday, Taleo)
 */
export function generatePlainTextAts(resume: ResumeData): string {
  const { personal, experiences, educations, skillGroups, projects, certifications, languages } = resume;
  const line = '='.repeat(72);
  const subline = '-'.repeat(72);

  return `${personal.fullName.toUpperCase()}
${personal.title}
Location: ${personal.location}
Email:    ${personal.email}
Phone:    ${personal.phone}
${personal.website ? `Website:  ${personal.website}\n` : ''}${personal.linkedin ? `LinkedIn: ${personal.linkedin}\n` : ''}${personal.github ? `GitHub:   ${personal.github}\n` : ''}
${line}
PROFESSIONAL SUMMARY
${subline}
${personal.summary}

${line}
WORK EXPERIENCE
${subline}
${experiences.map(exp => `
POSITION:   ${exp.role}
COMPANY:    ${exp.company} (${exp.location})
DATES:      ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
${exp.technologies.length > 0 ? `TECH STACK: ${exp.technologies.join(', ')}\n` : ''}RESPONSIBILITIES & ACCOMPLISHMENTS:
${exp.bullets.map(b => `  * ${b}`).join('\n')}
`).join('\n')}
${line}
EDUCATION
${subline}
${educations.map(edu => `
DEGREE:      ${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
INSTITUTION: ${edu.institution} (${edu.location})
DATES:       ${edu.startDate} - ${edu.endDate}${edu.gpa ? `\nGPA:         ${edu.gpa}` : ''}${edu.honors ? `\nHONORS:      ${edu.honors}` : ''}
`).join('\n')}
${line}
CORE COMPETENCIES & TECHNICAL SKILLS
${subline}
${skillGroups.map(grp => `${grp.category.padEnd(24)}: ${grp.skills.join(', ')}`).join('\n')}

${projects.length > 0 ? `
${line}
NOTABLE PROJECTS
${subline}
${projects.map(p => `
PROJECT: ${p.title} (${p.role})
${p.liveUrl ? `DEMO:    ${p.liveUrl}\n` : ''}${p.githubUrl ? `SOURCE:  ${p.githubUrl}\n` : ''}DETAILS:
${p.bullets.map(b => `  * ${b}`).join('\n')}
`).join('\n')}
` : ''}
${certifications.length > 0 ? `
${line}
CERTIFICATIONS
${subline}
${certifications.map(c => `* ${c.name} - ${c.issuer} (${c.issueDate})`).join('\n')}
` : ''}
${languages.length > 0 ? `
${line}
LANGUAGES
${subline}
${languages.map(l => `* ${l.language}: ${l.proficiency}`).join('\n')}
` : ''}
`;
}

/**
 * YAML Structured Resume Format (.yaml)
 */
export function generateYamlResume(resume: ResumeData): string {
  const { personal, experiences, educations, skillGroups } = resume;

  return `# Resume / CV Structured Data (YAML)
personal:
  name: "${personal.fullName}"
  title: "${personal.title}"
  email: "${personal.email}"
  phone: "${personal.phone}"
  location: "${personal.location}"
  website: "${personal.website || ''}"
  linkedin: "${personal.linkedin || ''}"
  github: "${personal.github || ''}"
  summary: >
    ${personal.summary.replace(/\n/g, ' ')}

experiences:
${experiences.map(exp => `  - role: "${exp.role}"
    company: "${exp.company}"
    location: "${exp.location}"
    start_date: "${exp.startDate}"
    end_date: "${exp.current ? 'Present' : exp.endDate}"
    technologies: [${exp.technologies.map(t => `"${t}"`).join(', ')}]
    highlights:
${exp.bullets.map(b => `      - "${b.replace(/"/g, '\\"')}"`).join('\n')}`).join('\n\n')}

educations:
${educations.map(edu => `  - institution: "${edu.institution}"
    degree: "${edu.degree}"
    field_of_study: "${edu.fieldOfStudy}"
    location: "${edu.location}"
    start_date: "${edu.startDate}"
    end_date: "${edu.endDate}"
    gpa: "${edu.gpa || ''}"`).join('\n\n')}

skills:
${skillGroups.map(grp => `  - category: "${grp.category}"
    items: [${grp.skills.map(s => `"${s}"`).join(', ')}]`).join('\n')}
`;
}

/**
 * HR-XML Standard Format (.xml)
 */
export function generateHrXmlResume(resume: ResumeData): string {
  const { personal, experiences, educations, skillGroups } = resume;

  return `<?xml version="1.0" encoding="UTF-8"?>
<Resume xmlns="http://ns.hr-xml.org/2007-04-15" xml:lang="en">
  <ResumeId>${resume.personal.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-cv</ResumeId>
  <StructuredXMLResume>
    <ContactInfo>
      <PersonName>
        <FormattedName>${escapeHtml(personal.fullName)}</FormattedName>
      </PersonName>
      <ContactMethod>
        <InternetEmailAddress>${escapeHtml(personal.email)}</InternetEmailAddress>
        <Telephone>${escapeHtml(personal.phone)}</Telephone>
        <PostalAddress>
          <Municipality>${escapeHtml(personal.location)}</Municipality>
        </PostalAddress>
      </ContactMethod>
    </ContactInfo>
    <ExecutiveSummary>${escapeHtml(personal.summary)}</ExecutiveSummary>
    <EmploymentHistory>
      ${experiences.map(exp => `
      <EmployerOrg>
        <EmployerOrgName>${escapeHtml(exp.company)}</EmployerOrgName>
        <PositionHistory>
          <Title>${escapeHtml(exp.role)}</Title>
          <StartDate>${escapeHtml(exp.startDate)}</StartDate>
          <EndDate>${exp.current ? 'current' : escapeHtml(exp.endDate)}</EndDate>
          <Description>
            ${exp.bullets.map(b => `<BulletPoint>${escapeHtml(b)}</BulletPoint>`).join('\n            ')}
          </Description>
        </PositionHistory>
      </EmployerOrg>`).join('')}
    </EmploymentHistory>
    <EducationHistory>
      ${educations.map(edu => `
      <EducationOrganizationAttendance>
        <SchoolName>${escapeHtml(edu.institution)}</SchoolName>
        <DegreeName>${escapeHtml(edu.degree)}</DegreeName>
        <Major>${escapeHtml(edu.fieldOfStudy)}</Major>
        <DatesOfAttendance>
          <StartDate>${escapeHtml(edu.startDate)}</StartDate>
          <EndDate>${escapeHtml(edu.endDate)}</EndDate>
        </DatesOfAttendance>
      </EducationOrganizationAttendance>`).join('')}
    </EducationHistory>
    <CompetencyList>
      ${skillGroups.map(grp => `
      <Competency name="${escapeHtml(grp.category)}">
        ${grp.skills.map(s => `<SkillName>${escapeHtml(s)}</SkillName>`).join('\n        ')}
      </Competency>`).join('')}
    </CompetencyList>
  </StructuredXMLResume>
</Resume>`;
}
