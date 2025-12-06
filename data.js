window.__PORTFOLIO_DATA__ = {
  about: {
    name: "Jean-Philippe Loubejac Combalbert",
    title: "Étudiant en informatique  Développement logiciel & systèmes embarqués",
    location: "Toulouse, France",
  },
  availability: {
    internship: {
      title: "Stage de fin d'études",
      period: "Février 2026 - Septembre 2026",
      description: "Ouvert aux opportunités de stage de fin d'études"
    }
  },
  experiences: [
    {
      role: "Stagiaire développement web",
      company: "Lexlau",
      period: "Juin 2025  Septembre 2025",
      location: "Bruxelles",
      bullets: [
        "Développement d'un CRM collaboratif pour cabinet d'avocat",
        "Automatisation de tâches juridiques et centralisation des dossiers"
      ],
      skills: [".NET", "C#", "Vue.js", "SQL", "Git"]
    },
    {
      role: "Stagiaire développement embarqué",
      company: "A2S",
      period: "Mai 2021  Juin 2021",
      location: "Lafrançaise",
      bullets: [
        "Développement d'une platine d'appel en autonomie",
        "Programmation d'un ATtiny85 (buzzer, LED)",
        "Configuration des paramètres via microcontrôleur"
      ],
      skills: ["C", "ATtiny85", "Microcontrôleurs", "Électronique"]
    },
    {
      role: "Tuteur",
      company: "O'talent",
      period: "Février 2024  Juin 2024",
      location: "Toulouse",
      bullets: [
        "Mise en place de séances de tutorat pour élèves de terminale professionnelle",
        "Projet de caisse à savon pour le festival des 100 tours (INSA Toulouse)"
      ],
      skills: ["Pédagogie", "Gestion de projet", "Travail d'équipe"]
    }
  ],
  educations: [
    {
      degree: "Ingénieur en informatique et réseaux",
      school: "INSA Toulouse",
      period: "2023  2026",
      notes: "Projet RAG pour chatbot d'école: conception d'un système de réponse aux questions fréquentes."
    },
    {
      degree: "Classe préparatoire ATS",
      school: "Lycée Louis Rascol, Albi",
      period: "2022  2023",
      notes: "Année de renforcement de mes compétences scientifiques et méthodes d'apprentissage."
    },
    {
      degree: "BTS Systèmes numériques",
      school: "Lycée Antoine Bourdelle, Montauban",
      period: "2020  2022",
      notes: "Projet de site web d'irrigation agricole (Django). Liaison backend  électronique terrain."
    }
  ],
  projects: [
    {
      name: "IAN – Chatbot étudiant (INSA Toulouse)",
      description: "Chatbot institutionnel développé après comparaison de trois approches (SLM entraîné from scratch, fine-tuning de modèles préexistants) et finalisé avec un pipeline RAG (FAISS + embeddings MiniLM + Mixtral-8x7B). Comprend un module de web scraping en Java (jsoup, PDFBox).",
      type: "academic",
      tags: ["chatbot", "RAG", "NLP", "LLM", "éducation"],
      skills: ["Java", "Python", "PyTorch", "SQL"],
      links: { demo: "#", code: "#" }
    },
    {
      name: "Maquette de voilier automatisée",
      description: "Orientation de voile selon le vent, télécommande, gestion batterie, moteur de pivot  STM32.",
      type: "academic",
      tags: ["embedded"],
      skills: ["C", "STM32", "Électronique"],
      links: { demo: "#", code: "#" }
    },
    {
      name: "Snake DS",
      description: "Implémentation d’un jeu Snake développé en C++ pour la Nintendo DS. Le projet met en avant la gestion des entrées utilisateur, de l’affichage et des contraintes matérielles limitées de la console.",
      type: "personal",
      tags: ["embedded", "game-dev", "homebrew"],
      skills: ["C++"],
      links: { demo: "#", code: "https://github.com/jploubejac/snake-for-ds" }
    },
    {
      name: "Système informatique complet : compilateur & microprocesseur RISC",
      description: "Projet académique consistant à développer un compilateur en LEX/YACC traduisant un langage proche du C vers un assembleur, ainsi qu’à concevoir un microprocesseur RISC pipeline en VHDL capable d’exécuter ce langage.",
      type: "academic",
      tags: ["compiler", "VHDL", "embedded", "systems"],
      skills: ["LEX", "YACC", "C", "VHDL", "FPGA design", "computer architecture"],
      links: { demo: "#", code: "#" }
    }
  ],
  courses: [
    {
      id: "energy",
      title: "Energy for Connected Objects",
      meta: "Gaël Loubet | CM: 5h | TP: 5h30",
      description: "Optimisation énergétique et protocoles radio.",
      tags: ["GNU Radio", "Waveform"],
      details: {
        context: "Le module « Energy for Connected Objects » s’inscrit dans le domaine « Systèmes communicants pour l’IoT » et aborde les problématiques énergétiques des objets connectés autonomes. Il propose une approche complète pour concevoir des systèmes capables de fonctionner sans fil, sans batterie classique, en exploitant des méthodes innovantes comme la récupération d’énergie ambiante (Energy Harvesting) et le transfert d’énergie sans fil (Wireless Power Transfer). Ce module se compose de 4 séances de cours et 2 séances de travaux pratiques. Il couvre : Les principes de stockage de l’énergie (batteries, supercondensateurs, piles à combustible). Les techniques de récupération d’énergie ambiante (lumière, mouvement, chaleur, ondes électromagnétiques). Les méthodes de transfert d’énergie sans fil (inductif, capacitif, radiatif). La conception d’objets connectés autonomes, incluant la modélisation énergétique et l’optimisation matérielle/logicielle. Les travaux pratiques ont permis d’étudier un système de récupération et de transfert d’énergie électromagnétique pour alimenter une LED. On a caractérisé des redresseurs RF, choisi des antennes adaptées, et conçu une rectenna pour maximiser l’efficacité énergétique.",
        technique: "Utilisation de GNU Radio pour la simulation, étude des formes d'ondes.",
        analyse: "Compréhension des contraintes énergétiques dans l'IoT.",
        competences: "Modélisation énergétique, Simulation radio."
      }
    },
    {
      id: "cloud",
      title: "Cloud and edge computing",
      meta: "Sami Yangui | CM: 5h | TP: 15h",
      description: "Architectures cloud, virtualisation et orchestration.",
      tags: ["Python", "OpenStack", "Docker", "VirtualBox", "Kubernetes"],
      details: {
        context: "Introduction au Cloud et Edge Computing, architectures distribuées.",
        technique: "Déploiement avec Docker et Kubernetes, gestion avec OpenStack.",
        analyse: "Capacité à déployer des services scalables.",
        competences: "Virtualisation, Orchestration de conteneurs, Cloud hybride."
      }
    },
    {
      id: "cours3",
      title: "Cours 3",
      meta: "Prof | CM: h | TP: h",
      description: "Résumé du cours.",
      tags: [],
      details: {
        context: "Description du contexte...",
        technique: "Détails techniques...",
        analyse: "Analyse personnelle...",
        competences: "Compétences acquises..."
      }
    }
  ],
  skills: {
    languages: ["C", "C++", "C#", "HTML", "CSS", "Python", "Java", "JavaScript", "SQL"],
    frameworks: [".NET", "Vue.js", "Django"],
    tools: ["Git", "GitHub", "GitLab", "STM32", "FPGA (Vivado, VHDL)"],
    cloud: []
  },
  extras: {
    soft: ["Autonome", "Rigueur", "Esprit d'équipe"],
    languages: ["Anglais (B2)", "Espagnol (A2)"]
  },
  contact: {
    email: "jeanphilippe@combalbert.fr",
    linkedin: "https://www.linkedin.com/in/jean-philippe-loubejac-combalbert/",
    github: "https://github.com/jploubejac",
    gitlab: "https://gitlab.com/loubejaccombalbert.jeanphilippe"
  }
};
