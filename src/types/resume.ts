export type TemplateId = 
  | 'harvard' 
  | 'modern-tech' 
  | 'nordic-split' 
  | 'executive' 
  | 'compact-onepage'
  | 'europass'
  | 'creative-editorial'
  | 'wall-street'
  | 'timeline-modern'
  | 'systems-architect';

export type CvFormatType = 'chronological' | 'functional' | 'hybrid';
export type FontFamilyChoice = 'sans' | 'serif' | 'mixed';
export type SpacingChoice = 'compact' | 'normal' | 'relaxed';
export type PaperSizeChoice = 'a4' | 'letter';

export interface ThemeConfig {
  templateId: TemplateId;
  cvFormat: CvFormatType;
  accentColor: string;
  fontFamily: FontFamilyChoice;
  spacing: SpacingChoice;
  paperSize: PaperSizeChoice;
  showPhoto: boolean;
  showIcons: boolean;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  avatarUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  highlights: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  bullets: string[];
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  skillGroups: SkillGroup[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  customSections: CustomSectionItem[];
}
