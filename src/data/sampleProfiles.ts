import { ResumeData } from '../types/resume';

export interface SampleProfileMeta {
  id: string;
  name: string;
  role: string;
  level: string;
  description: string;
  data: ResumeData;
}

export const sampleProfiles: SampleProfileMeta[] = [
  {
    id: 'staff-engineer',
    name: 'Alexandre Vance',
    role: 'Staff Software Engineer & Distributed Systems Architect',
    level: 'Staff / Tech Lead (10+ Yrs)',
    description: 'High-scale distributed systems, latency reduction, Go/Rust/TypeScript, cloud infrastructure.',
    data: {
      personal: {
        fullName: 'Alexandre Vance',
        title: 'Staff Software Engineer & Distributed Systems Architect',
        email: 'alexandre.vance@workmail.io',
        phone: '+1 (415) 892-4102',
        location: 'San Francisco, CA (Open to Remote)',
        website: 'https://vance.engineering',
        linkedin: 'https://linkedin.com/in/alexandre-vance',
        github: 'https://github.com/avance-cloud',
        summary: 'Staff Software Engineer with 10+ years architecting globally distributed, fault-tolerant infrastructure and low-latency APIs. Proven track record leading multi-region cloud migrations, cutting compute expenditure by $2.4M annually, and mentoring 30+ engineers across 4 squads.',
        avatarUrl: '',
      },
      experiences: [
        {
          id: 'exp-1',
          company: 'Aether Cloud Infrastructure',
          role: 'Staff Distributed Systems Engineer',
          location: 'San Francisco, CA',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          technologies: ['Go', 'Rust', 'Kubernetes', 'gRPC', 'Kafka', 'AWS', 'OpenTelemetry'],
          bullets: [
            'Architected global ingress proxy routing 180M+ daily events across 4 AWS regions, lowering p99 tail latency from 140ms to 28ms.',
            'Redesigned distributed consensus worker mesh in Go, decreasing node recovery time by 82% under simulated partition tests.',
            'Spearheaded FinOps cluster rightsizing initiative, eliminating redundant workloads to save $2.4M in annual cloud compute costs.',
            'Established company-wide RFC architecture board and established production readiness SLAs adopted by 24 engineering squads.'
          ]
        },
        {
          id: 'exp-2',
          company: 'Stratos Real-Time Data',
          role: 'Senior Backend Engineer · Platform Core',
          location: 'Seattle, WA',
          startDate: '2019',
          endDate: '2022',
          current: false,
          technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'GCP'],
          bullets: [
            'Built real-time CDC (Change Data Capture) replication engine handling 45,000 writes/sec with zero data loss during failovers.',
            'Optimized PostgreSQL query engine and indexing topologies, reducing high-volume tenant dashboard query latencies by 64%.',
            'Designed and documented internal developer CLI tools used daily by 180+ developers, decreasing local onboarding time by 3 days.'
          ]
        },
        {
          id: 'exp-3',
          company: 'Hyperion Labs',
          role: 'Software Engineer',
          location: 'Austin, TX',
          startDate: '2016',
          endDate: '2019',
          current: false,
          technologies: ['Python', 'Django', 'React', 'RabbitMQ', 'PostgreSQL'],
          bullets: [
            'Implemented asynchronous notification pipeline delivering 12M transactional alerts per month with 99.98% delivery rate.',
            'Collaborated with product designers to launch enterprise SSO (SAML 2.0 / OAuth2), unlocking 14 Fortune 500 sales contracts.'
          ]
        }
      ],
      educations: [
        {
          id: 'edu-1',
          institution: 'University of Washington',
          degree: 'B.S. in Computer Science & Systems',
          fieldOfStudy: 'Distributed Systems & Algorithms',
          location: 'Seattle, WA',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.91 / 4.0',
          honors: 'Summa Cum Laude · Dean’s Scholar',
          highlights: ['Undergraduate Researcher in Networked Systems Lab', 'Teaching Assistant for Parallel Computation']
        }
      ],
      skillGroups: [
        {
          id: 'sk-1',
          category: 'Core Languages',
          skills: ['Go', 'TypeScript', 'Rust', 'Python', 'SQL', 'Bash']
        },
        {
          id: 'sk-2',
          category: 'Systems & Infrastructure',
          skills: ['Kubernetes', 'Docker', 'Kafka', 'Redis', 'gRPC', 'Envoy', 'Terraform', 'Prometheus']
        },
        {
          id: 'sk-3',
          category: 'Cloud & Database',
          skills: ['AWS (EKS, Aurora, SQS, S3)', 'GCP', 'PostgreSQL', 'DynamoDB', 'ClickHouse']
        },
        {
          id: 'sk-4',
          category: 'Architectural Practices',
          skills: ['Event-Driven Microservices', 'Chaos Engineering', 'Zero-Downtime Migration', 'High Concurrency', 'API Governance']
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'KubePulse · Distributed Health Prober',
          subtitle: 'Open Source Network Observer',
          role: 'Creator & Maintainer',
          liveUrl: 'https://kubepulse.dev',
          githubUrl: 'https://github.com/avance-cloud/kubepulse',
          technologies: ['Go', 'eBPF', 'Prometheus', 'Grafana'],
          bullets: [
            'Lightweight daemon observing micro-second TCP jitter using Linux eBPF probes without adding user-space runtime overhead.',
            'Adopted by 850+ GitHub stargazers with automated multi-arch container releases via GitHub Actions.'
          ]
        }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Professional',
          issuer: 'Amazon Web Services',
          issueDate: '2023',
          credentialId: 'AWS-PSA-994182',
          credentialUrl: 'https://aws.amazon.com/verification'
        },
        {
          id: 'cert-2',
          name: 'Certified Kubernetes Administrator (CKA)',
          issuer: 'Cloud Native Computing Foundation (CNCF)',
          issueDate: '2022',
          credentialId: 'LF-CKA-77319',
          credentialUrl: 'https://cncf.io'
        }
      ],
      languages: [
        { id: 'lang-1', language: 'English', proficiency: 'Native' },
        { id: 'lang-2', language: 'French', proficiency: 'Professional' }
      ],
      customSections: [
        {
          id: 'cust-1',
          title: 'Patents & Publications',
          subtitle: 'US Patent #11,842,019',
          date: 'Issued Dec 2023',
          description: 'Adaptive Partition Sharding Scheme for Asynchronous High-Volume Stream Ingestion Networks.'
        }
      ]
    }
  },
  {
    id: 'product-lead',
    name: 'Elena Rostova',
    role: 'Principal Product Manager · Platform & Growth',
    level: 'Principal / Director (8+ Yrs)',
    description: 'B2B enterprise SaaS, monetisation, AI workflow automation, cross-functional roadmap ownership.',
    data: {
      personal: {
        fullName: 'Elena Rostova',
        title: 'Principal Product Manager · Platform & Growth',
        email: 'elena.rostova@productleader.io',
        phone: '+1 (212) 555-0194',
        location: 'New York, NY',
        website: 'https://elenarostova.me',
        linkedin: 'https://linkedin.com/in/elena-rostova-pm',
        github: '',
        summary: 'Principal Product Manager with 8+ years scaling enterprise SaaS products from 0-to-1 and $10M to $65M ARR. Expert in user-centric discovery, pricing optimization, and data-backed roadmap prioritization. Led cross-functional teams of 25+ engineers, designers, and data scientists.',
        avatarUrl: '',
      },
      experiences: [
        {
          id: 'pm-exp-1',
          company: 'Nexus Flow Technologies',
          role: 'Principal Product Manager',
          location: 'New York, NY',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          technologies: ['Product Strategy', 'Mixpanel', 'SQL', 'Figma', 'A/B Testing', 'Stripe Billing'],
          bullets: [
            'Conceived and rolled out self-serve usage-based pricing model, increasing net expansion revenue by 38% and adding $14M ARR.',
            'Spearheaded enterprise collaboration features (live workspaces, role audits), closing 22 Fortune 500 contracts in 3 quarters.',
            'Defined OKRs and led daily execution for 3 squads (28 headcount across engineering, product marketing, and design).',
            'Decreased time-to-first-value (TTFV) from 18 days to 4.2 days via onboarding friction reduction experiments.'
          ]
        },
        {
          id: 'pm-exp-2',
          company: 'Beacon Analytics',
          role: 'Senior Product Manager · Core Experience',
          location: 'Boston, MA',
          startDate: '2018',
          endDate: '2021',
          current: false,
          technologies: ['Amplitude', 'Jira', 'SQL', 'User Research', 'PRD Writing'],
          bullets: [
            'Re-architected core reporting dashboard, boosting Daily Active Users / Monthly Active Users (DAU/MAU) ratio from 24% to 41%.',
            'Managed end-to-end launch of automated alert triggers, achieving 72% enterprise adoption within 60 days of launch.',
            'Conducted 90+ qualitative customer discovery interviews to synthesize product vision into 6 quarterly roadmaps.'
          ]
        }
      ],
      educations: [
        {
          id: 'pm-edu-1',
          institution: 'Columbia University',
          degree: 'M.B.A. in Technology & Strategy',
          fieldOfStudy: 'Product Management & Venture Growth',
          location: 'New York, NY',
          startDate: '2016',
          endDate: '2018',
          gpa: '3.88 / 4.0',
          highlights: ['President of Columbia Tech Club', 'Dean’s Honor List']
        },
        {
          id: 'pm-edu-2',
          institution: 'University of Michigan',
          degree: 'B.S. in Economics & Informatics',
          fieldOfStudy: 'Quantitative Analytics',
          location: 'Ann Arbor, MI',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.82 / 4.0',
          highlights: []
        }
      ],
      skillGroups: [
        {
          id: 'pm-sk-1',
          category: 'Product Leadership',
          skills: ['Product Discovery', 'Roadmap Prioritization (RICE)', 'Go-To-Market (GTM)', 'Pricing & Packaging', 'Cohort Analysis']
        },
        {
          id: 'pm-sk-2',
          category: 'Analytics & Tools',
          skills: ['SQL', 'Mixpanel', 'Amplitude', 'Tableau', 'Figma', 'Jira', 'PostHog']
        },
        {
          id: 'pm-sk-3',
          category: 'Management & Methods',
          skills: ['Agile / Scrum', 'A/B Experimentation', 'Executive Stakeholder Management', 'Customer Advisory Boards']
        }
      ],
      projects: [
        {
          id: 'pm-proj-1',
          title: 'Product Playbook: Enterprise Expansion',
          subtitle: 'Published Case Study & Framework',
          role: 'Author',
          liveUrl: 'https://productgrowth.pub/enterprise-expansion',
          technologies: ['Frameworks', 'Pricing Modeling', 'SaaS Metrics'],
          bullets: [
            'Authored widely shared guide on usage-based metrics, featured in Mind the Product and read by 15,000+ PMs.',
            'Provided downloadable financial spreadsheet models for calculating customer net dollar retention (NDR).'
          ]
        }
      ],
      certifications: [
        {
          id: 'pm-cert-1',
          name: 'Reforge Product Strategy Certificate',
          issuer: 'Reforge',
          issueDate: '2021',
          credentialId: 'REF-2021-998'
        }
      ],
      languages: [
        { id: 'pm-l1', language: 'English', proficiency: 'Native' },
        { id: 'pm-l2', language: 'German', proficiency: 'Fluent' }
      ],
      customSections: [
        {
          id: 'pm-c1',
          title: 'Keynote Talks',
          subtitle: 'SaaStr Annual & ProductCon 2024',
          date: '2023 - 2024',
          description: 'Keynote Speaker: "Scaling Product Loops in Developer-First B2B Platforms without Bloating the Core".'
        }
      ]
    }
  },
  {
    id: 'ai-researcher',
    name: 'Dr. Marcus Chen',
    role: 'Senior AI & Machine Learning Scientist',
    level: 'PhD / Senior Researcher (6+ Yrs)',
    description: 'LLM alignment, RAG architectures, PyTorch, multimodal transformers, published at NeurIPS and ICML.',
    data: {
      personal: {
        fullName: 'Dr. Marcus Chen',
        title: 'Senior AI & Machine Learning Scientist',
        email: 'marcus.chen.phd@aiscience.org',
        phone: '+1 (650) 441-3390',
        location: 'Palo Alto, CA',
        website: 'https://marcuschen.ai',
        linkedin: 'https://linkedin.com/in/marcus-chen-ai',
        github: 'https://github.com/mchen-lab',
        summary: 'Machine Learning Scientist specializing in Large Language Models (LLM) fine-tuning, retrieval-augmented generation (RAG), and parameter-efficient adaptation (PEFT/LoRA). Co-author of 5 peer-reviewed papers at NeurIPS, ICML, and ACL with 1,200+ citations.',
        avatarUrl: '',
      },
      experiences: [
        {
          id: 'ai-exp-1',
          company: 'Cerebral AI Labs',
          role: 'Senior Machine Learning Scientist',
          location: 'San Francisco, CA',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          technologies: ['PyTorch', 'Hugging Face', 'CUDA', 'DeepSpeed', 'Ray', 'vLLM', 'Triton'],
          bullets: [
            'Trained domain-adapted 14B and 32B parameter reasoning models using mixed precision (FP8/BF16) across 128 H100 GPU clusters.',
            'Engineered semantic vector chunking algorithm that increased RAG retrieval precision by 27% on benchmark financial datasets.',
            'Decreased inference latency by 45% using speculative decoding and flash-attention v2 kernels integrated into vLLM server.',
            'Mentored 4 research interns resulting in 2 accepted workshop publications at NeurIPS 2024.'
          ]
        },
        {
          id: 'ai-exp-2',
          company: 'Stanford Artificial Intelligence Laboratory (SAIL)',
          role: 'Postdoctoral Research Fellow',
          location: 'Stanford, CA',
          startDate: '2020',
          endDate: '2022',
          current: false,
          technologies: ['Python', 'JAX', 'Transformers', 'TensorFlow', 'Slurm'],
          bullets: [
            'Investigated hallucination mitigation techniques via RLHF and DPO on conversational agents.',
            'Collaborated with interdisciplinary biomedical teams to develop automated clinical trial eligibility parsing models (F1 score: 0.94).'
          ]
        }
      ],
      educations: [
        {
          id: 'ai-edu-1',
          institution: 'Stanford University',
          degree: 'Ph.D. in Computer Science',
          fieldOfStudy: 'Artificial Intelligence & Natural Language Processing',
          location: 'Stanford, CA',
          startDate: '2016',
          endDate: '2020',
          honors: 'Doctoral Dissertation Fellowship Award',
          highlights: ['Advised by Prof. Christopher Manning', 'Thesis: Efficient Context Processing in Dense Transformer Networks']
        },
        {
          id: 'ai-edu-2',
          institution: 'UC Berkeley',
          degree: 'B.S. in Electrical Engineering & Computer Science (EECS)',
          fieldOfStudy: 'Computer Science & Mathematics',
          location: 'Berkeley, CA',
          startDate: '2012',
          endDate: '2016',
          gpa: '3.96 / 4.0',
          honors: 'Highest Honors · Regents’ Scholar',
          highlights: []
        }
      ],
      skillGroups: [
        {
          id: 'ai-sk-1',
          category: 'AI & Deep Learning',
          skills: ['PyTorch', 'Hugging Face', 'DeepSpeed', 'vLLM', 'LangChain', 'LlamaIndex', 'Triton', 'JAX']
        },
        {
          id: 'ai-sk-2',
          category: 'MLOps & Systems',
          skills: ['CUDA', 'Slurm', 'Ray', 'Docker', 'Kubernetes', 'MLflow', 'Weights & Biases', 'Vector DBs (Qdrant, Milvus)']
        },
        {
          id: 'ai-sk-3',
          category: 'Specialties',
          skills: ['RAG Pipeline Architecture', 'DPO / RLHF Alignment', 'Quantization (AWQ/GPTQ)', 'Evaluation Benchmarks']
        }
      ],
      projects: [
        {
          id: 'ai-proj-1',
          title: 'FastRag · Accelerated Vector Context Retriever',
          subtitle: 'Open Source High-Speed Inference Library',
          role: 'Creator',
          githubUrl: 'https://github.com/mchen-lab/fastrag',
          technologies: ['C++', 'Python', 'PyTorch', 'SIMD'],
          bullets: [
            'Benchmarked as 3.2x faster than standard cosine rerankers on dense document batches; 1.4k GitHub stars.'
          ]
        }
      ],
      certifications: [],
      languages: [
        { id: 'ai-l1', language: 'English', proficiency: 'Native' },
        { id: 'ai-l2', language: 'Mandarin', proficiency: 'Native' }
      ],
      customSections: [
        {
          id: 'ai-pub',
          title: 'Select Publications',
          subtitle: 'NeurIPS, ICML, ACL',
          date: '2021 - 2024',
          description: 'Chen, M. et al. "Dynamic Context Pruning for Multi-Turn Reasoning in Transformer Agents", NeurIPS 2023. Cited by 480+ papers.'
        }
      ]
    }
  }
];
