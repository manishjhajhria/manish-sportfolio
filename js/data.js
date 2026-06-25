/* ============================================================
   MOI IDENTITÉ — Bilingual Data Store (EN / FR)
   ============================================================ */

// eslint-disable-next-line no-unused-vars
var PORTFOLIO_DATA = {

  /* ────────────────────────── ENGLISH ────────────────────────── */
  en: {

    /* ── Navigation ── */
    nav: {
      home: 'Home',
      about: 'About',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      certifications: 'Certifications',
      testimonials: 'Testimonials',
      resume: 'Resume',
      contact: 'Contact'
    },

    /* ── Personal ── */
    personal: {
      name: 'Manish Jhajhria',
      title: 'B.Tech CSE Student | Cloud & DevOps Enthusiast',
      taglines: [
        'I build secure cloud infrastructure',
        'I develop smart AI solutions',
        'I compete in CTF challenges'
      ],
      bio: 'I am a driven Computer Science Engineering student obsessed with the intersection of Cloud Computing, DevOps, and Cybersecurity. I love architecting robust, secure infrastructures and breathing life into smart AI/ML solutions. Always eager to explore the bleeding edge of technology, I thrive on turning complex problems into elegant, scalable digital experiences.',
      photo: '',
      location: 'Chandigarh, India',
      email: 'jhajhria0604@gmail.com',
      phone: '+91 9057115805',
      availability: 'Looking for opportunities',
      socials: {
        github: '#',
        linkedin: 'https://linkedin.com/in/manish-jhajhria-480b45289',
        twitter: '#',
        dribbble: '#'
      },
      resumeUrl: '#',
      stats: {
        yearsExperience: 2,
        projectsCompleted: 10,
        happyClients: 0,
        certifications: 3
      }
    },

    /* ── Stats labels ── */
    statsLabels: {
      yearsExperience: 'Years Experience',
      projectsCompleted: 'Projects Completed',
      happyClients: 'Happy Clients',
      certifications: 'Certifications'
    },

    /* ── Education ── */
    education: [
      {
        degree: 'B.Tech Computer Science & Engineering',
        institution: 'Chandigarh University',
        year: '2023 - Present',
        description: 'Currently in 6th Semester. Focused on core computer science concepts, cloud computing, and cybersecurity.',
        gpa: ''
      },
      {
        degree: 'International Exchange Semester',
        institution: 'ESME Paris',
        year: 'Sep 2025 - Jan 2026',
        description: 'Coursework: Business Economics. Collaborated with students from 8 countries across 3 continents.',
        gpa: ''
      }
    ],

    /* ── Experience ── */
    experience: [
      {
        role: 'Co-founder & Event Organizer',
        company: 'International Student Club',
        period: '2022 - Present',
        description: 'Co-founded International Students Club at ESME Paris (8 countries), and organized multiple large-scale events at Chandigarh University.',
        techStack: ['Leadership', 'Event Management', 'Communication'],
        achievements: [
          'Organized large-scale events',
          'Demonstrated cross-cultural coordination',
          'Led diverse student groups'
        ]
      },
      {
        role: 'CTF Competitor',
        company: 'TryHackMe',
        period: '2023 - Present',
        description: 'Actively competes in newly launched CTF hacking contests.',
        techStack: ['Nmap', 'Wireshark', 'Splunk', 'Linux'],
        achievements: [
          'Applied penetration testing skills',
          'Practiced web exploitation',
          'Performed privilege escalation',
          'Conducted SIEM analysis'
        ]
      }
    ],

    /* ── Skills ── */
    skills: [
      // Frontend/Languages
      { name: 'C / C++',      category: 'Frontend',    level: 85, icon: 'file-code' },
      { name: 'Python',       category: 'Frontend',    level: 90, icon: 'terminal' },
      { name: 'TypeScript',   category: 'Frontend',    level: 85, icon: 'file-code' },
      { name: 'Next.js / Vue',category: 'Frontend',    level: 85, icon: 'layers' },
      { name: 'Tailwind CSS', category: 'Frontend',    level: 85, icon: 'palette' },
      // Backend
      { name: 'Django',       category: 'Backend',     level: 85, icon: 'server' },
      { name: 'Node.js',      category: 'Backend',     level: 80, icon: 'database' },
      { name: 'MySQL',        category: 'Backend',     level: 85, icon: 'database' },
      { name: 'PostgreSQL',   category: 'Backend',     level: 80, icon: 'database' },
      // Tools / Cloud
      { name: 'AWS',          category: 'Tools',       level: 85, icon: 'cloud' },
      { name: 'Azure',        category: 'Tools',       level: 75, icon: 'cloud' },
      { name: 'Kubernetes',   category: 'Tools',       level: 75, icon: 'box' },
      { name: 'Linux',        category: 'Tools',       level: 90, icon: 'terminal' },
      { name: 'Splunk / Nmap',category: 'Tools',       level: 80, icon: 'shield' },
      // Soft Skills
      { name: 'Leadership',      category: 'Soft Skills', level: 90, icon: 'users' },
      { name: 'Confidence',      category: 'Soft Skills', level: 98, icon: 'zap' },
      { name: 'Communication',   category: 'Soft Skills', level: 92, icon: 'message-circle' },
      { name: 'Problem Solving', category: 'Soft Skills', level: 95, icon: 'lightbulb' },
      { name: 'French (Fluent)', category: 'Soft Skills', level: 95, icon: 'globe' }
    ],

    /* ── Skill category labels ── */
    skillCategories: {
      all: 'All',
      Frontend: 'Languages & UI',
      Backend: 'Backend',
      Tools: 'Cloud & DevOps',
      'Soft Skills': 'Soft Skills'
    },

    /* ── Projects ── */
    projects: [
      {
        title: 'TC (Temporary Cars)',
        description: 'Monorepo car-sharing platform with scalable full-stack architecture. Features Supabase Auth, Prisma ORM, end-to-end tRPC type-safety, and a modern Tailwind CSS & shadcn/ui interface.',
        category: 'Web App',
        techStack: ['Next.js', 'TypeScript', 'Turborepo', 'Supabase', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'tRPC'],
        liveUrl: 'https://temporarycars.vercel.app',
        githubUrl: 'https://github.com/manishjhajhria/Temporary-Cars',
        featured: true
      },
      {
        title: 'AI-Powered Smart Parking',
        description: 'Built a ticketless AI parking system with smart space-allocation algorithms. Reduced vehicle waiting time by 60% on Chandigarh University campus.',
        category: 'Web App',
        techStack: ['Python', 'AI/ML', 'Computer Vision', 'Django', 'PostgreSQL', 'Linux'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        title: '3D Portfolio',
        description: 'This very portfolio! An immersive 3D/2D personal showcase built with Three.js.',
        category: 'Creative',
        techStack: ['Three.js', 'GSAP', 'HTML/CSS', 'JavaScript'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false
      }
    ],

    /* ── Project filter labels ── */
    projectFilters: {
      all: 'All',
      'Web App': 'Web App',
      Mobile: 'Mobile',
      'E-commerce': 'E-commerce',
      Tool: 'Tool',
      Creative: 'Creative'
    },

    /* ── Section headings ── */
    sectionHeadings: {
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills & Expertise',
      projects: 'Featured Projects',
      certifications: 'Certifications',
      testimonials: 'Testimonials',
      contact: 'Get In Touch'
    },

    /* ── Certifications ── */
    certifications: [
      { name: 'AWS Cloud Technology Consultant Professional', issuer: 'Coursera / AWS', date: 'Nov 2025', credentialUrl: 'https://coursera.org/verify/professional-cert/CQYA4LHEAC2F' },
      { name: 'AWS Certified Cloud Practitioner',    issuer: 'AWS',             date: '2025', credentialUrl: '#' },
      { name: 'AWS Certified Cloud Security',        issuer: 'Udemy',           date: '2025', credentialUrl: '#' },
      { name: 'Cloud Computing Certification',       issuer: 'NPTEL',           date: '2025', credentialUrl: '#' }
    ],

    /* ── Testimonials ── */
    testimonials: [
      {
        quote: 'Manish\'s AI-Powered Smart Parking system was a brilliant showcase of technical execution. Reducing wait times by 60% on our campus using computer vision is no small feat.',
        author: 'Dr. Amit Sharma',
        role: 'Professor',
        company: 'Chandigarh University'
      },
      {
        quote: 'Working with Manish during his exchange was incredible. His ability to lead cross-cultural teams at the International Student Club while maintaining academic excellence is a rare trait.',
        author: 'Chloe Martin',
        role: 'Coordinator',
        company: 'ESME Paris'
      },
      {
        quote: 'The architecture Manish designed for the TC car-sharing platform is phenomenal. Implementing a monorepo with tRPC and Supabase showed a deep understanding of modern web development.',
        author: 'Rahul Gupta',
        role: 'Software Engineer',
        company: 'Collaborator'
      }
    ],

    /* ── Contact ── */
    contact: {
      heading: 'Let\'s Work Together',
      subtitle: 'Have a project in mind? Let\'s discuss how I can help bring your vision to life.',
      formLabels: {
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send Message',
        sending: 'Sending...',
        sent: 'Message Sent!'
      },
      validation: {
        required: 'This field is required',
        emailInvalid: 'Please enter a valid email address',
        messageTooShort: 'Message must be at least 10 characters'
      }
    },

    /* ── Footer ── */
    footer: {
      tagline: 'Crafted with passion & code',
      copyright: '© 2026 Alex Morgan. All rights reserved.'
    },

    /* ── Misc UI ── */
    ui: {
      viewProject: 'View Project',
      viewProjects: 'View Projects',
      viewCode: 'Source Code',
      viewCredential: 'View Credential',
      downloadResume: 'Download Resume',
      scrollDown: 'Scroll Down',
      backToTop: 'Back to Top',
      loading: 'Loading...',
      moreDetails: 'More Details',
      lessDetails: 'Less Details',
      present: 'Present',
      getInTouch: 'Get in Touch',
      greeting: "Hello, I'm",
      knowMe: 'Get to Know',
      me: 'Me',
      aboutSubtitle: 'A glimpse into who I am, what I do, and what drives me.',
      yearsExp: 'Years Experience',
      projectsDone: 'Projects Done',
      happyClients: 'Happy Clients',
      certifications: 'Certifications',
      academic: 'Academic',
      journey: 'Journey',
      educationSubtitle: 'My educational background and academic achievements.',
      work: 'Work',
      experience: 'Experience',
      experienceSubtitle: 'My professional journey and career milestones.',
      my: 'My',
      toolbox: 'Toolbox',
      skillsSubtitle: 'Technologies and tools I work with to bring ideas to life.',
      featured: 'Featured',
      works: 'Works',
      projectsSubtitle: 'Some of my recent projects that showcase my skills and creativity.',
      certified: 'Certified',
      expertise: 'Expertise',
      certsSubtitle: 'Professional certifications that validate my expertise.',
      what: 'What',
      theySay: 'They Say',
      testimonialsSubtitle: 'Words from colleagues and clients I\'ve had the pleasure of working with.',
      resumeSubtitle: 'Download my resume or explore the highlights below.',
      letsWork: "Let's Work",
      together: 'Together',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      availability: 'Availability',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code'
    }
  },

  /* ────────────────────────── FRENCH ────────────────────────── */
  fr: {

    /* ── Navigation ── */
    nav: {
      home: 'Accueil',
      about: 'À propos',
      education: 'Formation',
      experience: 'Expérience',
      skills: 'Compétences',
      projects: 'Projets',
      certifications: 'Certifications',
      testimonials: 'Témoignages',
      resume: 'CV',
      contact: 'Contact'
    },

    /* ── Personal ── */
    personal: {
      name: 'Manish Jhajhria',
      title: 'Étudiant B.Tech CSE | Passionné par le Cloud et DevOps',
      taglines: [
        'Je construis des infrastructures cloud sécurisées',
        'Je développe des solutions d\'IA intelligentes',
        'Je participe à des défis CTF'
      ],
      bio: 'Étudiant passionné en Ingénierie Informatique, je suis fasciné par l\'intersection du Cloud Computing, du DevOps et de la Cybersécurité. J\'aime concevoir des infrastructures robustes et sécurisées et donner vie à des solutions d\'IA intelligentes. Toujours curieux d\'explorer les technologies de pointe, je m\'épanouis en transformant des problèmes complexes en expériences numériques élégantes et évolutives.',
      photo: '',
      location: 'Chandigarh, Inde',
      email: 'jhajhria0604@gmail.com',
      phone: '+91 9057115805',
      availability: 'À la recherche d\'opportunités',
      socials: {
        github: '#',
        linkedin: 'https://linkedin.com/in/manish-jhajhria-480b45289',
        twitter: '#',
        dribbble: '#'
      },
      resumeUrl: '#',
      stats: {
        yearsExperience: 2,
        projectsCompleted: 10,
        happyClients: 0,
        certifications: 3
      }
    },

    /* ── Stats labels ── */
    statsLabels: {
      yearsExperience: 'Années d\'expérience',
      projectsCompleted: 'Projets réalisés',
      happyClients: 'Clients satisfaits',
      certifications: 'Certifications'
    },

    /* ── Education ── */
    education: [
      {
        degree: 'B.Tech Ingénierie Informatique',
        institution: 'Université de Chandigarh',
        year: '2023 - Présent',
        description: 'Actuellement en 6ème Semestre. Spécialisation en concepts informatiques fondamentaux, cloud computing et cybersécurité.',
        gpa: ''
      },
      {
        degree: 'Semestre d\'Échange International',
        institution: 'ESME Paris',
        year: 'Sep 2025 - Jan 2026',
        description: 'Cours : Économie d\'Entreprise. Collaboration avec des étudiants de 8 pays sur 3 continents.',
        gpa: ''
      }
    ],

    /* ── Experience ── */
    experience: [
      {
        role: 'Co-fondateur & Organisateur d\'Événements',
        company: 'Club des Étudiants Internationaux',
        period: '2022 - Présent',
        description: 'Co-fondateur du Club des Étudiants Internationaux à l\'ESME Paris (8 pays), et organisateur de multiples événements à grande échelle à l\'Université de Chandigarh.',
        techStack: ['Leadership', 'Gestion d\'Événements', 'Communication'],
        achievements: [
          'Organisation d\'événements à grande échelle',
          'Démonstration de coordination interculturelle',
          'Direction de groupes d\'étudiants diversifiés'
        ]
      },
      {
        role: 'Compétiteur CTF',
        company: 'TryHackMe',
        period: '2023 - Présent',
        description: 'Participation active à des concours de piratage CTF.',
        techStack: ['Nmap', 'Wireshark', 'Splunk', 'Linux'],
        achievements: [
          'Application de compétences en tests d\'intrusion',
          'Pratique de l\'exploitation web',
          'Réalisation d\'escalade de privilèges',
          'Analyse SIEM'
        ]
      }
    ],

    /* ── Skills ── */
    skills: [
      // Frontend/Languages
      { name: 'C / C++',      category: 'Frontend',    level: 85, icon: 'file-code' },
      { name: 'Python',       category: 'Frontend',    level: 90, icon: 'terminal' },
      { name: 'TypeScript',   category: 'Frontend',    level: 85, icon: 'file-code' },
      { name: 'Next.js / Vue',category: 'Frontend',    level: 85, icon: 'layers' },
      { name: 'Tailwind CSS', category: 'Frontend',    level: 85, icon: 'palette' },
      // Backend
      { name: 'Django',       category: 'Backend',     level: 85, icon: 'server' },
      { name: 'Node.js',      category: 'Backend',     level: 80, icon: 'database' },
      { name: 'MySQL',        category: 'Backend',     level: 85, icon: 'database' },
      { name: 'PostgreSQL',   category: 'Backend',     level: 80, icon: 'database' },
      // Tools / Cloud
      { name: 'AWS',          category: 'Tools',       level: 85, icon: 'cloud' },
      { name: 'Azure',        category: 'Tools',       level: 75, icon: 'cloud' },
      { name: 'Kubernetes',   category: 'Tools',       level: 75, icon: 'box' },
      { name: 'Linux',        category: 'Tools',       level: 90, icon: 'terminal' },
      { name: 'Splunk / Nmap',category: 'Tools',       level: 80, icon: 'shield' },
      // Soft Skills
      { name: 'Leadership',      category: 'Soft Skills', level: 90, icon: 'users' },
      { name: 'Confiance en soi',category: 'Soft Skills', level: 98, icon: 'zap' },
      { name: 'Communication',   category: 'Soft Skills', level: 92, icon: 'message-circle' },
      { name: 'Résolution de problèmes', category: 'Soft Skills', level: 95, icon: 'lightbulb' },
      { name: 'Français (Courant)', category: 'Soft Skills', level: 95, icon: 'globe' }
    ],

    /* ── Skill category labels ── */
    skillCategories: {
      all: 'Tous',
      Frontend: 'Langages & UI',
      Backend: 'Backend',
      Tools: 'Cloud & DevOps',
      'Soft Skills': 'Savoir-être'
    },

    /* ── Projects ── */
    projects: [
      {
        title: 'TC (Temporary Cars)',
        description: 'Plateforme d\'autopartage monorepo avec une architecture full-stack évolutive. Intègre Supabase Auth, Prisma ORM, sécurité de type de bout en bout avec tRPC, et une interface moderne Tailwind CSS & shadcn/ui.',
        category: 'Web App',
        techStack: ['Next.js', 'TypeScript', 'Turborepo', 'Supabase', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'tRPC'],
        liveUrl: 'https://temporarycars.vercel.app',
        githubUrl: 'https://github.com/manishjhajhria/Temporary-Cars',
        featured: true
      },
      {
        title: 'Parking Intelligent par IA',
        description: 'Création d\'un système de parking IA sans ticket avec algorithmes intelligents. Réduction de 60% du temps d\'attente des véhicules sur le campus.',
        category: 'Web App',
        techStack: ['Python', 'AI/ML', 'Computer Vision', 'Django', 'PostgreSQL', 'Linux'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true
      },
      {
        title: 'Portfolio 3D',
        description: 'Ce portfolio même ! Une vitrine personnelle immersive 3D/2D construite avec Three.js.',
        category: 'Creative',
        techStack: ['Three.js', 'GSAP', 'HTML/CSS', 'JavaScript'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false
      }
    ],

    /* ── Project filter labels ── */
    projectFilters: {
      all: 'Tous',
      'Web App': 'App Web',
      Mobile: 'Mobile',
      'E-commerce': 'E-commerce',
      Tool: 'Outil',
      Creative: 'Créatif'
    },

    /* ── Section headings ── */
    sectionHeadings: {
      education: 'Formation',
      experience: 'Expérience',
      skills: 'Compétences & Expertise',
      projects: 'Projets en Vedette',
      certifications: 'Certifications',
      testimonials: 'Témoignages',
      contact: 'Me Contacter'
    },

    /* ── Certifications ── */
    certifications: [
      { name: 'AWS Cloud Technology Consultant Professional', issuer: 'Coursera / AWS', date: 'Nov 2025', credentialUrl: 'https://coursera.org/verify/professional-cert/CQYA4LHEAC2F' },
      { name: 'AWS Certified Cloud Practitioner',    issuer: 'AWS',             date: '2025', credentialUrl: '#' },
      { name: 'AWS Certified Cloud Security',        issuer: 'Udemy',           date: '2025', credentialUrl: '#' },
      { name: 'Certification Cloud Computing',       issuer: 'NPTEL',           date: '2025', credentialUrl: '#' }
    ],

    /* ── Testimonials ── */
    testimonials: [
      {
        quote: 'Le système de parking intelligent développé par Manish est une brillante démonstration d\'exécution technique. Réduire les temps d\'attente de 60% sur le campus grâce à la vision par ordinateur est un exploit remarquable.',
        author: 'Dr. Amit Sharma',
        role: 'Professeur',
        company: 'Université de Chandigarh'
      },
      {
        quote: 'Travailler avec Manish lors de son échange a été incroyable. Sa capacité à diriger des équipes interculturelles tout en maintenant l\'excellence académique est une qualité rare.',
        author: 'Chloe Martin',
        role: 'Coordinatrice',
        company: 'ESME Paris'
      },
      {
        quote: 'L\'architecture conçue par Manish pour la plateforme TC est phénoménale. Implémenter un monorepo avec tRPC et Supabase montre une profonde compréhension du développement web moderne.',
        author: 'Rahul Gupta',
        role: 'Ingénieur Logiciel',
        company: 'Collaborateur'
      }
    ],

    /* ── Contact ── */
    contact: {
      heading: 'Travaillons Ensemble',
      subtitle: 'Vous avez un projet en tête ? Discutons de la façon dont je peux donner vie à votre vision.',
      formLabels: {
        name: 'Votre nom',
        email: 'Votre e-mail',
        subject: 'Sujet',
        message: 'Votre message',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        sent: 'Message envoyé !'
      },
      validation: {
        required: 'Ce champ est requis',
        emailInvalid: 'Veuillez entrer une adresse e-mail valide',
        messageTooShort: 'Le message doit contenir au moins 10 caractères'
      }
    },

    /* ── Footer ── */
    footer: {
      tagline: 'Conçu avec passion & code',
      copyright: '© 2026 Manish Jhajhria. Tous droits réservés.'
    },

    /* ── Misc UI ── */
    ui: {
      viewProject: 'Voir le projet',
      viewProjects: 'Voir les projets',
      viewCode: 'Code source',
      viewCredential: 'Voir le certificat',
      downloadResume: 'Télécharger le CV',
      scrollDown: 'Défiler vers le bas',
      backToTop: 'Retour en haut',
      loading: 'Chargement...',
      moreDetails: 'Plus de détails',
      lessDetails: 'Moins de détails',
      present: 'Présent',
      getInTouch: 'Me contacter',
      greeting: 'Bonjour, je suis',
      knowMe: 'Apprenez à me',
      me: 'connaître',
      aboutSubtitle: 'Un aperçu de qui je suis, ce que je fais et ce qui me motive.',
      yearsExp: "Années d'expérience",
      projectsDone: 'Projets réalisés',
      happyClients: 'Clients satisfaits',
      certifications: 'Certifications',
      academic: 'Parcours',
      journey: 'Académique',
      educationSubtitle: 'Mon parcours éducatif et mes réalisations académiques.',
      work: 'Expérience',
      experience: 'Professionnelle',
      experienceSubtitle: 'Mon parcours professionnel et mes étapes de carrière.',
      my: 'Ma',
      toolbox: 'Boîte à outils',
      skillsSubtitle: 'Technologies et outils que j\'utilise pour donner vie aux idées.',
      featured: 'Projets',
      works: 'en vedette',
      projectsSubtitle: 'Quelques projets récents qui illustrent mes compétences et ma créativité.',
      certified: 'Expertise',
      expertise: 'Certifiée',
      certsSubtitle: 'Certifications professionnelles validant mon expertise.',
      what: 'Ce qu\'ils',
      theySay: 'disent',
      testimonialsSubtitle: 'Mots de collègues et clients avec qui j\'ai eu le plaisir de travailler.',
      resumeSubtitle: 'Téléchargez mon CV ou explorez les points forts ci-dessous.',
      letsWork: 'Travaillons',
      together: 'Ensemble',
      email: 'E-mail',
      phone: 'Téléphone',
      location: 'Localisation',
      availability: 'Disponibilité',
      liveDemo: 'Démo en ligne',
      sourceCode: 'Code source'
    }
  }
};
