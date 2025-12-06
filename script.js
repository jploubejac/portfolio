(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const yearEl = document.getElementById('year');

  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)');
  const STORAGE_KEY = 'theme';

  function applyTheme(mode) {
    if (mode === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    updateToggleLabel();
  }
  function currentTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light') return 'light';
    return prefersLight && prefersLight.matches ? 'light' : 'dark';
  }
  function updateToggleLabel() {
    const isLight = root.getAttribute('data-theme') === 'light' || (!root.getAttribute('data-theme') && (prefersLight?.matches));
    const icon = isLight ? '☀️' : '🌙';
    const label = isLight ? 'Basculer en mode sombre' : 'Basculer en mode clair';
    const pressed = isLight ? 'true' : 'false';
    const span = themeToggle?.querySelector('.icon');
    if (span) span.textContent = icon;
    themeToggle?.setAttribute('aria-label', label);
    themeToggle?.setAttribute('aria-pressed', pressed);
    themeToggle?.setAttribute('title', label);
  }
  function toggleTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const isLight = (saved ?? ((prefersLight && prefersLight.matches) ? 'light' : 'dark')) === 'light';
    const next = isLight ? 'dark' : 'light';
    if (next === 'light') localStorage.setItem(STORAGE_KEY, 'light');
    else localStorage.removeItem(STORAGE_KEY);
    applyTheme(next);
  }
  (function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    updateToggleLabel();
  })();
  prefersLight?.addEventListener?.('change', (e) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) applyTheme(e.matches ? 'light' : 'dark');
  });
  themeToggle?.addEventListener('click', toggleTheme);

  // Mobile nav
  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Projects filter
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const projects = Array.from(document.querySelectorAll('.project'));
  function applyFilter(tag) {
    projects.forEach(p => {
      const tags = (p.getAttribute('data-tags') || '').split(',');
      const type = p.getAttribute('data-type') || '';
      const show = tag === 'all' || tags.includes(tag) || type === tag;
      p.style.display = show ? '' : 'none';
    });
  }
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter || 'all');
  }));

  // Current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Render dynamic data from data.js ----
  const data = window.__PORTFOLIO_DATA__;
  if (data) {
    try {
      // Navbar brand + page title
      const brand = document.querySelector('.brand');
      if (brand && data.about?.name) {
        brand.textContent = data.about.name;
        brand.setAttribute('aria-label', `Aller à l’accueil — ${data.about.name}`);
        if (document.title.startsWith('Portfolio')) {
          document.title = `Portfolio – ${data.about.name}`;
        }
      }

      // Hero
      const nameEl = document.querySelector('#hero .hero-text h1');
      const eyebrowEl = document.querySelector('#hero .hero-text .eyebrow');
      const leadEl = document.querySelector('#hero .hero-text .lead');
      if (nameEl && data.about?.name) nameEl.textContent = data.about.name;
      if (eyebrowEl && data.about?.name) eyebrowEl.textContent = 'Bonjour, je suis';
      if (leadEl && (data.about?.title || data.about?.location)) leadEl.textContent = `${data.about.title || ''}${data.about.title && data.about.location ? ' · ' : ''}${data.about.location || ''}`;
     
      if (data.availability) {
        const apprenticeshipTitle = document.getElementById('apprenticeship-title');
        const apprenticeshipPeriod = document.getElementById('apprenticeship-period');
        const apprenticeshipDescription = document.getElementById('apprenticeship-description');
        const internshipTitle = document.getElementById('internship-title');
        const internshipPeriod = document.getElementById('internship-period');
        const internshipDescription = document.getElementById('internship-description');

        if (apprenticeshipTitle && data.availability.apprenticeship?.title) {
          apprenticeshipTitle.textContent = data.availability.apprenticeship.title;
        }
        if (apprenticeshipPeriod && data.availability.apprenticeship?.period) {
          apprenticeshipPeriod.textContent = data.availability.apprenticeship.period;
        }
        if (apprenticeshipDescription && data.availability.apprenticeship?.description) {
          apprenticeshipDescription.textContent = data.availability.apprenticeship.description;
        }

        if (internshipTitle && data.availability.internship?.title) {
          internshipTitle.textContent = data.availability.internship.title;
        }
        if (internshipPeriod && data.availability.internship?.period) {
          internshipPeriod.textContent = data.availability.internship.period;
        }
        if (internshipDescription && data.availability.internship?.description) {
          internshipDescription.textContent = data.availability.internship.description;
        }
      }

      // Experiences
      const expOl = document.querySelector('#experiences .timeline');
      if (expOl && Array.isArray(data.experiences)) {
        expOl.innerHTML = data.experiences.map(exp => `
          <li class="timeline-item">
            <div class="tl-header">
              <h3>${escapeHtml(exp.role || '')} · ${escapeHtml(exp.company || '')}</h3>
              <span class="muted">${escapeHtml(exp.period || '')}${exp.location ? ' · ' + escapeHtml(exp.location) : ''}</span>
            </div>
            ${exp.bullets?.length ? `<ul>${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : exp.description ? `<p>${escapeHtml(exp.description)}</p>` : ''}
            ${renderTags(exp.skills)}
          </li>
        `).join('');
      }

      // Educations
      const eduOl = document.querySelector('#formations .timeline');
      if (eduOl && Array.isArray(data.educations)) {
        eduOl.innerHTML = data.educations.map(edu => `
          <li class="timeline-item">
            <div class="tl-header">
              <h3>${escapeHtml(edu.degree || '')}</h3>
              <span class="muted">${escapeHtml(edu.school || '')}${edu.period ? ' · ' + escapeHtml(edu.period) : ''}</span>
            </div>
            ${edu.notes ? `<p>${escapeHtml(edu.notes)}</p>` : ''}
          </li>
        `).join('');
      }

      // Projects
      const projGrid = document.querySelector('.projects-grid');
      if (projGrid && Array.isArray(data.projects)) {
        projGrid.innerHTML = data.projects.map(p => `
          <article class="card project" data-tags="${(p.tags || []).join(',')}" data-type="${p.type || ''}">
            <div class="project-header">
              <h3>${escapeHtml(p.name || '')}</h3>
              ${p.type ? `<span class="project-type project-type-${p.type}">${p.type === 'academic' ? 'Académique' : 'Personnel'}</span>` : ''}
            </div>
            <p>${escapeHtml(p.description || '')}</p>
            ${renderTags(p.skills)}
            <div class="links">
              ${p.links?.demo ? `<a class="btn sm" href="${encodeURI(p.links.demo)}" target="_blank" rel="noopener">Démo</a>` : ''}
              ${p.links?.code ? `<a class="btn sm" href="${encodeURI(p.links.code)}" target="_blank" rel="noopener">Code</a>` : ''}
            </div>
          </article>
        `).join('');
      }

      // Skills
      const skillsSection = document.querySelector('#competences .skills-grid');
      if (skillsSection && data.skills) {
        const groups = [
          { title: 'Langages', items: data.skills.languages },
          { title: 'Frameworks', items: data.skills.frameworks },
          { title: 'Outils', items: data.skills.tools },
          { title: 'Cloud & Data', items: data.skills.cloud },
        ];
        skillsSection.innerHTML = groups.map(g => `
          <div class="skills-group">
            <h3>${g.title}</h3>
            <ul class="chips">${(g.items || []).map(it => `<li>${escapeHtml(it)}</li>`).join('')}</ul>
          </div>
        `).join('');
      }

      // Contact (icons only)
      const contactList = document.querySelector('#contact .contact-list');
      if (contactList && data.contact) {
        const C = data.contact;
        const items = [];
        const mailSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" fill="currentColor"/></svg>`;
        const liSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 3H3.55A.55.55 0 0 0 3 3.55v16.9c0 .303.247.55.55.55h16.9a.55.55 0 0 0 .55-.55V3.55A.55.55 0 0 0 20.45 3zM8.75 19H5.89V9.71h2.86V19zM7.32 8.47a1.66 1.66 0 1 1 0-3.32 1.66 1.66 0 0 1 0 3.32zM19 19h-2.86v-4.49c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.37V19H10.1V9.71h2.74v1.26h.04c.38-.72 1.3-1.49 2.68-1.49 2.87 0 3.4 1.89 3.4 4.34V19z" fill="currentColor"/></svg>`;
  const ghSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.55v-2.1c-3.22.7-3.9-1.38-3.9-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.57-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.46-2.31 1.2-3.12-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.58.23 2.75.11 3.04.75.81 1.2 1.85 1.2 3.12 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.08.79 2.18v3.24c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .5z" fill="currentColor"/></svg>`;
  const glSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.65 13.4l-2.1-6.47a.76.76 0 0 0-1.43-.1L17.5 11.2h-11l-1.62-4.37a.76.76 0 0 0-1.43.1L1.35 13.4a2.18 2.18 0 0 0 .82 2.43l9.11 6.6c.42.3.97.3 1.39 0l9.11-6.6a2.18 2.18 0 0 0 .82-2.43z" fill="currentColor"/></svg>`;

        const sr = (t) => `<span class="sr-only">${escapeHtml(t)}</span>`;
        const item = (href, label, svg, external = false) => {
          const safeHref = href;
          const attrs = external ? ' target="_blank" rel="noopener"' : '';
          return `<li><a class="icon-link" href="${safeHref}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}"${attrs}>${svg}${sr(label)}</a></li>`;
        };

  if (C.email) items.push(item(`mailto:${encodeURI(C.email)}`, 'Email', mailSvg));
  if (C.linkedin) items.push(item(encodeURI(C.linkedin), 'LinkedIn', liSvg, true));
  if (C.github) items.push(item(encodeURI(C.github), 'GitHub', ghSvg, true));
  if (C.gitlab) items.push(item(encodeURI(C.gitlab), 'GitLab', glSvg, true));

        contactList.innerHTML = items.join('');
      }

      // Extras: soft skills & languages (append under Competences)
      if (data.extras) {
        const skillsGrid = document.querySelector('#competences .skills-grid');
        if (skillsGrid) {
          if (Array.isArray(data.extras.soft) && data.extras.soft.length) {
            skillsGrid.insertAdjacentHTML('beforeend', `
              <div class="skills-group">
                <h3>Soft skills</h3>
                <ul class="chips">${data.extras.soft.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
              </div>
            `);
          }
          if (Array.isArray(data.extras.languages) && data.extras.languages.length) {
            skillsGrid.insertAdjacentHTML('beforeend', `
              <div class="skills-group">
                <h3>Langues</h3>
                <ul class="chips">${data.extras.languages.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
              </div>
            `);
          }
        }
      }

      // Rebind project nodes for filters after rendering
      projects.length = 0; document.querySelectorAll('.project').forEach(p => projects.push(p));
    } catch (e) {
      console.warn('Rendering data failed:', e);
    }
  }

  function renderTags(arr) {
    if (!arr || !arr.length) return '';
    return `<ul class="tags">${arr.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`;
  }
  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  // Course details functionality
  const courseData = {
    'java-algo': {
      title: 'Energy for Connected Objects',
      context: 'Le module « Energy for Connected Objects » s’inscrit dans le domaine « Systèmes communicants pour l’IoT » et aborde les problématiques énergétiques des objets connectés autonomes. Il propose une approche complète pour concevoir des systèmes capables de fonctionner sans fil, sans batterie classique, en exploitant des méthodes innovantes comme la récupération d’énergie ambiante (Energy Harvesting) et le transfert d’énergie sans fil (Wireless Power Transfer). Ce module se compose de 4 séances de cours et 2 séances de travaux pratiques. Il couvre : Les principes de stockage de l’énergie (batteries, supercondensateurs, piles à combustible). Les techniques de récupération d’énergie ambiante (lumière, mouvement, chaleur, ondes électromagnétiques). Les méthodes de transfert d’énergie sans fil (inductif, capacitif, radiatif). La conception d’objets connectés autonomes, incluant la modélisation énergétique et l’optimisation matérielle/logicielle. Les travaux pratiques ont permis d’étudier un système de récupération et de transfert d’énergie électromagnétique pour alimenter une LED. On a caractérisé des redresseurs RF, choisi des antennes adaptées, et conçu une rectenna pour maximiser l’efficacité énergétique.',
      technique: '',
      competences: '',
      analyse: ''
    },
    'web-dev': {
      title: 'Cloud and edge computing',
      context: '',
      technique: '',
      competences: '',
      analyse: ''
    },
    'embedded': {
      title: 'Cours 3',
      context: '',
      technique: '',
      competences: '',
      analyse: ''
    }
  };

  // Modal functionality
  const modal = document.getElementById('courseModal');
  const modalTitle = document.getElementById('modalCourseTitle');
  const modalContext = document.getElementById('modalContext');
  const modalTechnique = document.getElementById('modalTechnique');
  const modalCompetences = document.getElementById('modalCompetences');
  const modalAnalyse = document.getElementById('modalAnalyse');
  const modalClose = document.querySelector('.modal-close');

  function openCourseModal(courseId) {
    const course = courseData[courseId];
    if (!course) return;

    modalTitle.textContent = course.title;
    modalContext.textContent = course.context;
    modalTechnique.textContent = course.technique;
    modalCompetences.textContent = course.competences;
    modalAnalyse.textContent = course.analyse;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    modalClose.focus();
  }

  function closeCourseModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Event listeners for course items
  document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', () => {
      const courseId = item.dataset.courseId;
      openCourseModal(courseId);
    });

    // Keyboard navigation
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const courseId = item.dataset.courseId;
        openCourseModal(courseId);
      }
    });

    // Make focusable
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Voir les détails du cours: ${item.querySelector('h3').textContent}`);
  });

  // Modal close events
  if (modalClose) {
    modalClose.addEventListener('click', closeCourseModal);
  }

  if (modal) {
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCourseModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeCourseModal();
      }
    });
  }
})();
