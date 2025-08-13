// Remplis facilement ces données avec les infos de ton CV.
// Tu peux supprimer ou ajouter des éléments librement.

window.__PORTFOLIO_DATA__ = {
  about: {
    name: "Jean-Philippe Loubejac Combalbert",
    title: "Étudiant en informatique – Développement logiciel & systèmes embarqués",
    location: "Toulouse, France",
    summary: "Ingénierie logicielle et embarquée. Intérêt pour les applications web (.NET, Vue.js, Django) et les systèmes STM32/FPGA."
  },
  experiences: [
    {
      role: "Stagiaire développement web",
      company: "Lexlau",
      period: "Juin 2025 — Septembre 2025",
      location: "Bruxelles",
      bullets: [
        "Développement d’un CRM collaboratif pour cabinet d’avocat",
        "Automatisation de tâches juridiques et centralisation des dossiers",
        ".NET pour le backend, Vue.js pour le frontend"
      ],
      skills: [".NET", "C#", "Vue.js", "SQL", "Git"]
    },
    {
      role: "Stagiaire développement embarqué",
      company: "A2S",
      period: "Mai 2021 — Juin 2021",
      location: "Lafrançaise",
      bullets: [
        "Développement d’une platine d’appel en autonomie",
        "Programmation d’un ATtiny85 (buzzer, LED)",
        "Configuration des paramètres via microcontrôleur"
      ],
      skills: ["C", "ATtiny85", "Microcontrôleurs", "Électronique"]
    },
    {
      role: "Tuteur",
      company: "O’talent",
      period: "Février 2024 — Juin 2024",
      location: "Toulouse",
      bullets: [
        "Mise en place de séances de tutorat pour élèves de terminale professionnelle",
        "Projet de caisse à savon pour le festival des 100 tours (INSA Toulouse)"
      ],
      skills: ["Pédagogie", "Gestion de projet", "Travail d’équipe"]
    }
  ],
  educations: [
    {
      degree: "Ingénieur en informatique et réseaux",
      school: "INSA Toulouse",
      period: "2023 — 2026",
      notes: "Projet RAG pour chatbot d’école: conception d’un système de réponse aux questions fréquentes."
    },
    {
      degree: "Classe préparatoire ATS",
      school: "Lycée Louis Rascol, Albi",
      period: "2022 — 2023",
      notes: "Renforcement des compétences scientifiques et méthodes d’apprentissage."
    },
    {
      degree: "BTS Systèmes numériques",
      school: "Lycée Antoine Bourdelle, Montauban",
      period: "2020 — 2022",
      notes: "Projet de site web d’irrigation agricole (Django). Liaison backend ↔ électronique terrain."
    }
  ],
  projects: [
    {
      name: "CRM cabinet d’avocat",
      description: "Application web collaborative pour automatiser des tâches juridiques et centraliser les dossiers.",
      tags: ["web"],
      skills: [".NET", "C#", "Vue.js", "SQL"],
      links: { demo: "#", code: "#" }
    },
    {
      name: "Chatbot RAG école d’ingénieur",
      description: "RAG pour répondre aux FAQ des étudiants (projet d’initiation à la recherche).",
      tags: ["data", "web"],
      skills: ["Python", "RAG", "NLP", "Git"],
      links: { demo: "#", code: "#" }
    },
    {
      name: "Maquette de voilier automatisée",
      description: "Orientation de voile selon le vent, télécommande, gestion batterie, moteur de pivot – STM32.",
      tags: ["embedded"],
      skills: ["C", "STM32", "Électronique"],
      links: { demo: "#", code: "#" }
    },
    {
      name: "Irrigation agricole (Django)",
      description: "Site web de gestion d’irrigation et affichage des données champs. Backend + liaison capteurs.",
      tags: ["web"],
      skills: ["Python", "Django", "PostgreSQL", "API"],
      links: { demo: "#", code: "#" }
    }
  ],
  skills: {
    languages: ["C", "C++", "C#", "HTML", "CSS", "Python", "Java", "JavaScript", "SQL"],
    frameworks: [".NET", "Vue.js", "Django"],
    tools: ["Git", "GitHub", "GitLab", "STM32", "FPGA (Vivado, VHDL)"],
    cloud: []
  },
  extras: {
    soft: ["Autonome", "Rigueur", "Esprit d’équipe"],
    languages: ["Anglais (B2)", "Espagnol (A2)"]
  },
  contact: {
    email: "jeanphilippe@combalbert.fr",
    linkedin: "https://www.linkedin.com/in/jean-philippe-loubejac-combalbert/",
    github: "https://github.com/jploubejac"
  }
};
