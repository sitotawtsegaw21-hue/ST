import React, { useState } from 'react';
import { 
  ResumeData, 
  ExperienceItem, 
  EducationItem, 
  SkillGroup, 
  ProjectItem, 
  CertificationItem, 
  LanguageItem 
} from '../types/resume';
import { sampleProfiles } from '../data/sampleProfiles';
import { enhanceBulletPoint, generateProfessionalSummary } from '../utils/aiEnhancer';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Globe2, 
  Plus, 
  Trash2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  FileCode,
  RotateCcw,
  Search,
  ExternalLink
} from 'lucide-react';
import { GoogleLinkSearchModal } from './GoogleLinkSearchModal';

interface BuilderSidebarProps {
  data: ResumeData;
  onChangeData: (data: ResumeData) => void;
  onLoadProfile: (profileId: string) => void;
}

type SectionKey = 'profiles' | 'personal' | 'experience' | 'skills' | 'education' | 'projects' | 'certifications' | 'languages';

export const BuilderSidebar: React.FC<BuilderSidebarProps> = ({
  data,
  onChangeData,
  onLoadProfile
}) => {
  const [openSection, setOpenSection] = useState<SectionKey>('personal');
  const [aiLoadingKey, setAiLoadingKey] = useState<string | null>(null);

  // Google Link Search Modal State
  const [googleSearchModal, setGoogleSearchModal] = useState<{
    isOpen: boolean;
    targetField: string;
    defaultQuery: string;
    currentUrl: string;
    onApply: (url: string) => void;
  }>({
    isOpen: false,
    targetField: '',
    defaultQuery: '',
    currentUrl: '',
    onApply: () => {}
  });

  const openGoogleSearch = (
    targetField: string,
    defaultQuery: string,
    currentUrl: string,
    onApply: (url: string) => void
  ) => {
    setGoogleSearchModal({
      isOpen: true,
      targetField,
      defaultQuery,
      currentUrl,
      onApply
    });
  };

  const toggleSection = (key: SectionKey) => {
    setOpenSection(openSection === key ? 'personal' : key);
  };

  // Personal updates
  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    onChangeData({
      ...data,
      personal: {
        ...data.personal,
        [field]: value
      }
    });
  };

  // AI Summary Generator
  const handleGenerateSummary = () => {
    setAiLoadingKey('summary');
    setTimeout(() => {
      const allSkills = data.skillGroups.flatMap(g => g.skills);
      const newSummary = generateProfessionalSummary(
        data.personal.fullName,
        data.personal.title,
        allSkills
      );
      updatePersonal('summary', newSummary);
      setAiLoadingKey(null);
    }, 250);
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: 'exp-' + Date.now(),
      company: 'Company Name',
      role: 'Job Title',
      location: 'City, Country',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      technologies: ['TypeScript', 'React'],
      bullets: [
        'Spearheaded key product feature resulting in a 25% improvement in performance.'
      ]
    };
    onChangeData({
      ...data,
      experiences: [newExp, ...data.experiences]
    });
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    onChangeData({
      ...data,
      experiences: data.experiences.map(e => e.id === id ? { ...e, ...updated } : e)
    });
  };

  const removeExperience = (id: string) => {
    onChangeData({
      ...data,
      experiences: data.experiences.filter(e => e.id !== id)
    });
  };

  const addExperienceBullet = (expId: string) => {
    const exp = data.experiences.find(e => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      bullets: [...exp.bullets, 'Engineered new capability increasing system reliability by 18%.']
    });
  };

  const updateExperienceBullet = (expId: string, idx: number, text: string) => {
    const exp = data.experiences.find(e => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets];
    newBullets[idx] = text;
    updateExperience(expId, { bullets: newBullets });
  };

  const removeExperienceBullet = (expId: string, idx: number) => {
    const exp = data.experiences.find(e => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      bullets: exp.bullets.filter((_, i) => i !== idx)
    });
  };

  const handleEnhanceBullet = (expId: string, idx: number, mode: 'xyz' | 'leadership' | 'quantify') => {
    const key = `${expId}-${idx}`;
    setAiLoadingKey(key);
    setTimeout(() => {
      const exp = data.experiences.find(e => e.id === expId);
      if (exp) {
        const enhanced = enhanceBulletPoint(exp.bullets[idx], mode);
        updateExperienceBullet(expId, idx, enhanced);
      }
      setAiLoadingKey(null);
    }, 200);
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: 'edu-' + Date.now(),
      institution: 'University Name',
      degree: 'B.S. in Computer Science',
      fieldOfStudy: 'Software Engineering',
      location: 'City, State',
      startDate: '2018',
      endDate: '2022',
      highlights: ['Dean’s List']
    };
    onChangeData({
      ...data,
      educations: [newEdu, ...data.educations]
    });
  };

  const removeEducation = (id: string) => {
    onChangeData({
      ...data,
      educations: data.educations.filter(e => e.id !== id)
    });
  };

  // Skills handlers
  const addSkillGroup = () => {
    const newGrp: SkillGroup = {
      id: 'sk-' + Date.now(),
      category: 'New Category',
      skills: ['Skill 1', 'Skill 2']
    };
    onChangeData({
      ...data,
      skillGroups: [...data.skillGroups, newGrp]
    });
  };

  const updateSkillGroup = (id: string, category: string, rawSkills: string) => {
    const skills = rawSkills.split(',').map(s => s.trim()).filter(Boolean);
    onChangeData({
      ...data,
      skillGroups: data.skillGroups.map(g => g.id === id ? { ...g, category, skills } : g)
    });
  };

  const removeSkillGroup = (id: string) => {
    onChangeData({
      ...data,
      skillGroups: data.skillGroups.filter(g => g.id !== id)
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: 'Project Name',
      subtitle: 'Open Source Tool',
      role: 'Lead Developer',
      liveUrl: '',
      githubUrl: '',
      technologies: ['React', 'Node.js'],
      bullets: ['Implemented end-to-end architecture serving 10,000+ active users with 99.9% uptime.']
    };
    onChangeData({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const removeProject = (id: string) => {
    onChangeData({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-2xs divide-y divide-neutral-100">
      {/* 1. Quick Load Industry Persona */}
      <div className="p-3.5 bg-neutral-50/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-neutral-500" />
            Preset Industry Profiles
          </span>
          <span className="text-[11px] text-neutral-500 font-medium">1-Click Load</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {sampleProfiles.map((p) => (
            <button
              key={p.id}
              onClick={() => onLoadProfile(p.id)}
              className="text-left px-2.5 py-1.5 rounded-md border border-neutral-200 bg-white hover:border-neutral-900 transition-colors text-xs group"
            >
              <div className="font-semibold text-neutral-900 group-hover:text-black leading-tight">
                {p.name.split(' ')[0]} ({p.level.split(' ')[0]})
              </div>
              <div className="text-[10px] text-neutral-500 truncate mt-0.5">
                {p.role}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Personal Information */}
      <div>
        <button
          onClick={() => toggleSection('personal')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-neutral-500" />
            Personal Details & Executive Summary
          </span>
          {openSection === 'personal' ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {openSection === 'personal' && (
          <div className="p-4 pt-1 space-y-3 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-neutral-600">Full Name</label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                  placeholder="e.g. Alexandre Vance"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-neutral-600">Professional Title / Headline</label>
                <input
                  type="text"
                  value={data.personal.title}
                  onChange={(e) => updatePersonal('title', e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                  placeholder="e.g. Staff Software Engineer"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-neutral-600">Email Address</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                  placeholder="alexandre@example.com"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-neutral-600">Phone</label>
                <input
                  type="text"
                  value={data.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                  placeholder="+1 (555) 019-2831"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-neutral-600">Location</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => updatePersonal('location', e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-neutral-600">Portfolio Website</label>
                  <button
                    type="button"
                    onClick={() => openGoogleSearch('Portfolio Website', `${data.personal.fullName} portfolio website`, data.personal.website, (url) => updatePersonal('website', url))}
                    className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Search className="w-2.5 h-2.5" />
                    <span>Search on Google</span>
                  </button>
                </div>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={data.personal.website}
                    onChange={(e) => updatePersonal('website', e.target.value)}
                    className="w-full pr-7 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                    placeholder="https://mysite.dev"
                  />
                  <button
                    type="button"
                    title="Search on Google to find & add link"
                    onClick={() => openGoogleSearch('Portfolio Website', `${data.personal.fullName} portfolio website`, data.personal.website, (url) => updatePersonal('website', url))}
                    className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-900"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-neutral-600">LinkedIn URL</label>
                  <button
                    type="button"
                    onClick={() => openGoogleSearch('LinkedIn Profile', `site:linkedin.com/in ${data.personal.fullName}`, data.personal.linkedin, (url) => updatePersonal('linkedin', url))}
                    className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Search className="w-2.5 h-2.5" />
                    <span>Search on Google</span>
                  </button>
                </div>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={data.personal.linkedin}
                    onChange={(e) => updatePersonal('linkedin', e.target.value)}
                    className="w-full pr-7 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                    placeholder="https://linkedin.com/in/username"
                  />
                  <button
                    type="button"
                    title="Search on Google to find & add link"
                    onClick={() => openGoogleSearch('LinkedIn Profile', `site:linkedin.com/in ${data.personal.fullName}`, data.personal.linkedin, (url) => updatePersonal('linkedin', url))}
                    className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-900"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-neutral-600">GitHub URL</label>
                  <button
                    type="button"
                    onClick={() => openGoogleSearch('GitHub Profile', `site:github.com ${data.personal.fullName}`, data.personal.github, (url) => updatePersonal('github', url))}
                    className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Search className="w-2.5 h-2.5" />
                    <span>Search on Google</span>
                  </button>
                </div>
                <div className="relative mt-1">
                  <input
                    type="text"
                    value={data.personal.github}
                    onChange={(e) => updatePersonal('github', e.target.value)}
                    className="w-full pr-7 px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900"
                    placeholder="https://github.com/username"
                  />
                  <button
                    type="button"
                    title="Search on Google to find & add link"
                    onClick={() => openGoogleSearch('GitHub Profile', `site:github.com ${data.personal.fullName}`, data.personal.github, (url) => updatePersonal('github', url))}
                    className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-900"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-neutral-600">Executive Summary</label>
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  disabled={aiLoadingKey === 'summary'}
                  className="flex items-center gap-1 text-[11px] font-semibold text-neutral-900 hover:text-black transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{aiLoadingKey === 'summary' ? 'Drafting...' : 'AI Polish Summary'}</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={data.personal.summary}
                onChange={(e) => updatePersonal('summary', e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded border border-neutral-200 focus:outline-neutral-900 leading-relaxed"
                placeholder="Brief summary outlining your value proposition, primary strengths, and domain background..."
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Work Experience */}
      <div>
        <button
          onClick={() => toggleSection('experience')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
            Work Experience ({data.experiences.length})
          </span>
          {openSection === 'experience' ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {openSection === 'experience' && (
          <div className="p-4 pt-1 space-y-4 bg-white">
            <div className="flex justify-end">
              <button
                onClick={addExperience}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-900 border border-neutral-300 rounded hover:bg-neutral-50"
              >
                <Plus className="w-3 h-3" /> Add Position
              </button>
            </div>

            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded-md space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">
                      {exp.role || 'Position'} — {exp.company || 'Company'}
                    </span>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors"
                      title="Remove position"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-neutral-500">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        className="w-full px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-neutral-500">Role Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        className="w-full px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-neutral-500">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        className="w-full px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-neutral-500">Dates (e.g. 2021 – Present)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          className="w-1/2 px-2 py-1 text-xs bg-white border border-neutral-200 rounded font-mono"
                          placeholder="Start"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          className="w-1/2 px-2 py-1 text-xs bg-white border border-neutral-200 rounded font-mono"
                          placeholder="End"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-500">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={exp.technologies?.join(', ') || ''}
                      onChange={(e) => updateExperience(exp.id, {
                        technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      className="w-full px-2 py-1 text-xs bg-white border border-neutral-200 rounded font-mono"
                      placeholder="Go, Kubernetes, AWS, TypeScript"
                    />
                  </div>

                  {/* Bullet points with Google XYZ Enhancer */}
                  <div className="pt-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                        Achievement Bullet Points ({exp.bullets.length})
                      </label>
                      <button
                        onClick={() => addExperienceBullet(exp.id)}
                        className="text-[11px] font-semibold text-neutral-900 hover:underline flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet
                      </button>
                    </div>

                    {exp.bullets.map((bullet, idx) => {
                      const isAiLoading = aiLoadingKey === `${exp.id}-${idx}`;
                      return (
                        <div key={idx} className="space-y-1 bg-white p-2 rounded border border-neutral-200">
                          <div className="flex items-start gap-1.5">
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => updateExperienceBullet(exp.id, idx, e.target.value)}
                              className="flex-1 px-2 py-1 text-xs border border-neutral-200 rounded focus:outline-neutral-900 leading-relaxed"
                            />
                            <button
                              onClick={() => removeExperienceBullet(exp.id, idx)}
                              className="text-neutral-400 hover:text-red-600 p-1"
                              title="Delete bullet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Quick AI Boost Buttons */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[10px]">
                            <span className="text-neutral-400 font-medium">Quick Boost:</span>
                            <button
                              type="button"
                              onClick={() => handleEnhanceBullet(exp.id, idx, 'xyz')}
                              disabled={isAiLoading}
                              className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-medium flex items-center gap-1"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-neutral-600" />
                              <span>XYZ Formula</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEnhanceBullet(exp.id, idx, 'quantify')}
                              disabled={isAiLoading}
                              className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-medium"
                            >
                              + Quantify (%)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEnhanceBullet(exp.id, idx, 'leadership')}
                              disabled={isAiLoading}
                              className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-medium"
                            >
                              Leadership Verb
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Skills Competencies */}
      <div>
        <button
          onClick={() => toggleSection('skills')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-neutral-500" />
            Skills & Keyword Matrices ({data.skillGroups.length})
          </span>
          {openSection === 'skills' ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {openSection === 'skills' && (
          <div className="p-4 pt-1 space-y-3 bg-white">
            <div className="flex justify-end">
              <button
                onClick={addSkillGroup}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-900 border border-neutral-300 rounded hover:bg-neutral-50"
              >
                <Plus className="w-3 h-3" /> Add Category
              </button>
            </div>

            <div className="space-y-2.5">
              {data.skillGroups.map((grp) => (
                <div key={grp.id} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    type="text"
                    value={grp.category}
                    onChange={(e) => updateSkillGroup(grp.id, e.target.value, grp.skills.join(', '))}
                    className="w-full sm:w-36 px-2 py-1 text-xs font-bold bg-white border border-neutral-200 rounded"
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    value={grp.skills.join(', ')}
                    onChange={(e) => updateSkillGroup(grp.id, grp.category, e.target.value)}
                    className="flex-1 px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                    placeholder="Skills separated by commas"
                  />
                  <button
                    onClick={() => removeSkillGroup(grp.id)}
                    className="text-neutral-400 hover:text-red-600 p-1"
                    title="Remove category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Education */}
      <div>
        <button
          onClick={() => toggleSection('education')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
            Education ({data.educations.length})
          </span>
          {openSection === 'education' ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {openSection === 'education' && (
          <div className="p-4 pt-1 space-y-3 bg-white">
            <div className="flex justify-end">
              <button
                onClick={addEducation}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-900 border border-neutral-300 rounded hover:bg-neutral-50"
              >
                <Plus className="w-3 h-3" /> Add Degree
              </button>
            </div>

            {data.educations.map((edu) => (
              <div key={edu.id} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-neutral-900">{edu.degree} · {edu.institution}</span>
                  <button onClick={() => removeEducation(edu.id)} className="text-neutral-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                      onChangeData({
                        ...data,
                        educations: data.educations.map(ed => ed.id === edu.id ? { ...ed, institution: e.target.value } : ed)
                      });
                    }}
                    className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                    placeholder="Institution"
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      onChangeData({
                        ...data,
                        educations: data.educations.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed)
                      });
                    }}
                    className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                    placeholder="Degree"
                  />
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => {
                      onChangeData({
                        ...data,
                        educations: data.educations.map(ed => ed.id === edu.id ? { ...ed, location: e.target.value } : ed)
                      });
                    }}
                    className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                    placeholder="Location"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => {
                        onChangeData({
                          ...data,
                          educations: data.educations.map(ed => ed.id === edu.id ? { ...ed, startDate: e.target.value } : ed)
                        });
                      }}
                      className="w-1/2 px-2 py-1 text-xs bg-white border border-neutral-200 rounded font-mono"
                      placeholder="Start"
                    />
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => {
                        onChangeData({
                          ...data,
                          educations: data.educations.map(ed => ed.id === edu.id ? { ...ed, endDate: e.target.value } : ed)
                        });
                      }}
                      className="w-1/2 px-2 py-1 text-xs bg-white border border-neutral-200 rounded font-mono"
                      placeholder="End"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Projects */}
      <div>
        <button
          onClick={() => toggleSection('projects')}
          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <FolderGit2 className="w-3.5 h-3.5 text-neutral-500" />
            Projects & Highlights ({data.projects.length})
          </span>
          {openSection === 'projects' ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {openSection === 'projects' && (
          <div className="p-4 pt-1 space-y-3 bg-white">
            <div className="flex justify-end">
              <button
                onClick={addProject}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-900 border border-neutral-300 rounded hover:bg-neutral-50"
              >
                <Plus className="w-3 h-3" /> Add Project
              </button>
            </div>

            {data.projects.map((proj) => (
              <div key={proj.id} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-neutral-900">{proj.title}</span>
                  <button onClick={() => removeProject(proj.id)} className="text-neutral-400 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => {
                      onChangeData({
                        ...data,
                        projects: data.projects.map(p => p.id === proj.id ? { ...p, title: e.target.value } : p)
                      });
                    }}
                    className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                    placeholder="Project Title"
                  />
                  <input
                    type="text"
                    value={proj.role}
                    onChange={(e) => {
                      onChangeData({
                        ...data,
                        projects: data.projects.map(p => p.id === proj.id ? { ...p, role: e.target.value } : p)
                      });
                    }}
                    className="px-2 py-1 text-xs bg-white border border-neutral-200 rounded"
                    placeholder="Role"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      value={proj.liveUrl || ''}
                      onChange={(e) => {
                        onChangeData({
                          ...data,
                          projects: data.projects.map(p => p.id === proj.id ? { ...p, liveUrl: e.target.value } : p)
                        });
                      }}
                      className="w-full pr-7 px-2 py-1 text-xs bg-white border border-neutral-200 rounded font-mono"
                      placeholder="Demo URL"
                    />
                    <button
                      type="button"
                      title="Search on Google to find demo link"
                      onClick={() => openGoogleSearch('Project Demo', `${proj.title} project demo`, proj.liveUrl || '', (url) => {
                        onChangeData({
                          ...data,
                          projects: data.projects.map(p => p.id === proj.id ? { ...p, liveUrl: url } : p)
                        });
                      })}
                      className="absolute right-2 top-1.5 text-neutral-400 hover:text-neutral-900"
                    >
                      <Search className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={proj.githubUrl || ''}
                      onChange={(e) => {
                        onChangeData({
                          ...data,
                          projects: data.projects.map(p => p.id === proj.id ? { ...p, githubUrl: e.target.value } : p)
                        });
                      }}
                      className="w-full pr-7 px-2 py-1 text-xs bg-white border border-neutral-200 rounded font-mono"
                      placeholder="GitHub URL"
                    />
                    <button
                      type="button"
                      title="Search on Google to find repo link"
                      onClick={() => openGoogleSearch('GitHub Repository', `${proj.title} github`, proj.githubUrl || '', (url) => {
                        onChangeData({
                          ...data,
                          projects: data.projects.map(p => p.id === proj.id ? { ...p, githubUrl: url } : p)
                        });
                      })}
                      className="absolute right-2 top-1.5 text-neutral-400 hover:text-neutral-900"
                    >
                      <Search className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Google Link Search Modal */}
      <GoogleLinkSearchModal
        isOpen={googleSearchModal.isOpen}
        onClose={() => setGoogleSearchModal(prev => ({ ...prev, isOpen: false }))}
        targetFieldName={googleSearchModal.targetField}
        defaultQuery={googleSearchModal.defaultQuery}
        currentUrl={googleSearchModal.currentUrl}
        onApplyLink={googleSearchModal.onApply}
      />
    </div>
  );
};
