import { ResumeData } from '../types/resume';

export interface AtsAuditResult {
  score: number; // 0 - 100
  rating: 'Exceptional' | 'Competitive' | 'Needs Improvement' | 'Critical Issues';
  summary: string;
  checks: Array<{
    category: 'Contact' | 'Impact & Metrics' | 'Action Verbs' | 'Structure' | 'Skills';
    title: string;
    passed: boolean;
    recommendation: string;
    details?: string;
  }>;
  actionVerbsFound: string[];
  metricsFoundCount: number;
}

const STRONG_ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'advised', 'allocated', 'analyzed',
  'architected', 'automated', 'boosted', 'built', 'centralized', 'championed',
  'coached', 'consolidated', 'constructed', 'contracted', 'converted', 'cut',
  'decreased', 'delivered', 'deployed', 'designed', 'developed', 'devised',
  'directed', 'doubled', 'eliminated', 'enabled', 'enforced', 'engineered',
  'established', 'evaluated', 'expanded', 'expedited', 'formulated', 'founded',
  'generated', 'guided', 'halved', 'headed', 'identified', 'implemented',
  'improved', 'increased', 'initiated', 'instituted', 'integrated', 'invented',
  'launched', 'led', 'leveraged', 'lowered', 'maximized', 'mentored', 'migrated',
  'modernized', 'negotiated', 'optimized', 'orchestrated', 'overhauled',
  'partnered', 'pioneered', 'produced', 'raised', 'redesigned', 'reduced',
  'refactored', 'reformed', 'restructured', 'revamped', 'scaled', 'slashed',
  'spearheaded', 'standardized', 'streamlined', 'surpassed', 'synthesized',
  'trained', 'transformed', 'tripled', 'unified', 'upgraded', 'yielded'
];

const METRICS_REGEX = /(\b\d+([.,]\d+)?%|\$\d+([.,]\d+)?[kmb]?|\b\d+x\b|\b\d{2,}\b|\b(million|billion|thousand|k|m)\b)/i;

/**
 * Audit the resume for ATS compatibility and measurable impact.
 */
export function auditResumeAts(resume: ResumeData): AtsAuditResult {
  const { personal, experiences, educations, skillGroups } = resume;
  const checks: AtsAuditResult['checks'] = [];
  let score = 0;

  // 1. Contact check
  const hasEmail = Boolean(personal.email && personal.email.includes('@'));
  const hasPhone = Boolean(personal.phone && personal.phone.length > 5);
  const hasLocation = Boolean(personal.location && personal.location.length > 2);
  const hasLink = Boolean(personal.linkedin || personal.github || personal.website);

  const contactComplete = hasEmail && hasPhone && hasLocation;
  checks.push({
    category: 'Contact',
    title: 'Essential Contact Coordinates',
    passed: contactComplete,
    recommendation: contactComplete
      ? 'Clean contact headers are immediately extractable by ATS parsers.'
      : 'Include valid email, phone number, and location (City, State/Country).'
  });
  if (contactComplete) score += 15;
  if (hasLink) score += 5;

  // 2. Summary
  const hasSummary = Boolean(personal.summary && personal.summary.length >= 60);
  checks.push({
    category: 'Structure',
    title: 'Targeted Professional Summary',
    passed: hasSummary,
    recommendation: hasSummary
      ? 'Clear executive summary hooks recruiters in the initial 6-second scan.'
      : 'Provide a 2-3 sentence executive synopsis highlighting your years of experience, core domain, and top win.'
  });
  if (hasSummary) score += 10;

  // 3. Experience check
  const hasExp = experiences.length > 0;
  const totalBullets = experiences.flatMap(e => e.bullets);
  const totalBulletCount = totalBullets.length;

  checks.push({
    category: 'Structure',
    title: 'Experience Depth & Bullet Density',
    passed: totalBulletCount >= 4,
    recommendation: totalBulletCount >= 4
      ? `Found ${totalBulletCount} achievement bullet points across ${experiences.length} positions.`
      : 'Add at least 3-4 bullet points under your primary roles detailing concrete tasks.'
  });
  if (totalBulletCount >= 4) score += 15;

  // 4. Action Verbs analysis
  const actionVerbsFound: string[] = [];
  totalBullets.forEach(bullet => {
    const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    if (firstWord && STRONG_ACTION_VERBS.includes(firstWord)) {
      if (!actionVerbsFound.includes(firstWord)) {
        actionVerbsFound.push(firstWord);
      }
    }
  });

  const actionVerbCount = actionVerbsFound.length;
  const strongActionVerbs = actionVerbCount >= 3;
  checks.push({
    category: 'Action Verbs',
    title: 'High-Impact Action Verbs',
    passed: strongActionVerbs,
    recommendation: strongActionVerbs
      ? `Found ${actionVerbCount} distinct strong power verbs (${actionVerbsFound.slice(0, 4).join(', ')}...).`
      : 'Begin each bullet with a decisive past-tense verb (e.g., "Architected", "Spearheaded", "Reduced") instead of passive terms like "Assisted with" or "Responsible for".',
    details: actionVerbsFound.length > 0 ? `Detected verbs: ${actionVerbsFound.join(', ')}` : undefined
  });
  if (actionVerbCount >= 5) score += 20;
  else if (actionVerbCount >= 2) score += 10;

  // 5. Quantifiable Metrics & XYZ Formula
  let metricsCount = 0;
  totalBullets.forEach(b => {
    if (METRICS_REGEX.test(b)) {
      metricsCount++;
    }
  });

  const goodMetricsRatio = totalBulletCount > 0 && (metricsCount / totalBulletCount >= 0.4);
  checks.push({
    category: 'Impact & Metrics',
    title: 'Quantified Outcomes ($ / % / Volume)',
    passed: goodMetricsRatio || metricsCount >= 3,
    recommendation: (goodMetricsRatio || metricsCount >= 3)
      ? `Found ${metricsCount} bullet points with numerical benchmarks or measurable metrics.`
      : 'Recruiters prioritize results over duties. Ground your accomplishments in real numbers: % saved, $ revenue generated, latency reduced, or users impacted.',
    details: `${metricsCount} of ${totalBulletCount} bullet points contain quantified proof.`
  });
  if (metricsCount >= 3) score += 20;
  else if (metricsCount >= 1) score += 10;

  // 6. Skills & Education
  const totalSkills = skillGroups.flatMap(s => s.skills).length;
  const hasEducation = educations.length > 0;

  checks.push({
    category: 'Skills',
    title: 'Categorized Technical Keywords',
    passed: totalSkills >= 8 && skillGroups.length >= 2,
    recommendation: totalSkills >= 8
      ? `Found ${totalSkills} skills grouped across ${skillGroups.length} categories.`
      : 'Organize technical competencies into clear groupings (e.g. Languages, Cloud, Frameworks) with 8-15 high-demand keywords.'
  });
  if (totalSkills >= 8) score += 10;

  checks.push({
    category: 'Structure',
    title: 'Accredited Education Credential',
    passed: hasEducation,
    recommendation: hasEducation
      ? 'Degree and alma mater clearly documented for educational screening filters.'
      : 'Add your highest degree, university name, and graduation timeframe.'
  });
  if (hasEducation) score += 5;

  // Bound score
  score = Math.min(100, Math.max(10, score));

  let rating: AtsAuditResult['rating'] = 'Needs Improvement';
  let summary = 'Your CV contains foundational points, but adding measurable metrics and stronger action verbs will boost interview call rates.';

  if (score >= 90) {
    rating = 'Exceptional';
    summary = 'Top 5% caliber. Outstanding metric density, clean ATS readability, and authoritative executive power verbs.';
  } else if (score >= 75) {
    rating = 'Competitive';
    summary = 'Strong competitive standard. Passes automated screening filters cleanly; fine-tune remaining bullet points for maximum punch.';
  } else if (score < 50) {
    rating = 'Critical Issues';
    summary = 'Missing essential fields or quantifiable impact. Follow the audit recommendations to avoid ATS keyword auto-rejection.';
  }

  return {
    score,
    rating,
    summary,
    checks,
    actionVerbsFound,
    metricsFoundCount: metricsCount
  };
}

/**
 * Instant Smart Enhancer for bullet points using the Google XYZ Formula:
 * "Accomplished [X] as measured by [Y], by doing [Z]"
 */
export function enhanceBulletPoint(bulletText: string, mode: 'xyz' | 'leadership' | 'tech' | 'quantify'): string {
  const trimmed = bulletText.trim();
  if (!trimmed) return trimmed;

  // Clean trailing period
  const clean = trimmed.replace(/\.+$/, '');

  // If already strong, return with metric boost template
  if (mode === 'xyz') {
    if (/accomplished|architected|spearheaded|engineered/i.test(clean)) {
      return `${clean}, resulting in a 35% decrease in cycle latency and saving 12+ engineering hours weekly.`;
    }
    return `Architected ${clean.replace(/^(worked on|helped with|responsible for|handled)\s+/i, '')}, improving system throughput by 42% while reducing infrastructure costs by $18,000 annually.`;
  }

  if (mode === 'leadership') {
    return `Spearheaded cross-functional delivery of ${clean.replace(/^(worked on|helped with|responsible for|handled|did)\s+/i, '')}, aligning 4 engineering squads to beat delivery milestones by 3 weeks.`;
  }

  if (mode === 'quantify') {
    if (METRICS_REGEX.test(clean)) {
      return `${clean} (delivered across 12,000+ active enterprise accounts with 99.9% uptime).`;
    }
    return `${clean}, scaling system capacity by 3.4x and serving 2.5M+ daily requests with zero service disruptions.`;
  }

  if (mode === 'tech') {
    return `Engineered and deployed ${clean.replace(/^(worked on|helped with|responsible for)\s+/i, '')} leveraging automated CI/CD pipelines, containerized microservices, and observability telemetry.`;
  }

  return clean;
}

/**
 * Generate a concise, high-impact professional summary based on title & skills
 */
export function generateProfessionalSummary(name: string, title: string, topSkills: string[]): string {
  const skillSample = topSkills.slice(0, 4).join(', ');
  return `${title} with proven background driving technical excellence, modern system design, and measurable business outcomes. Specialized in ${skillSample || 'high-impact execution and product scaling'}, with a track record of streamlining workflows, eliminating technical bottlenecks, and mentoring high-velocity teams.`;
}
