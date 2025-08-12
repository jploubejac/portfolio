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
      const show = tag === 'all' || tags.includes(tag);
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
      const summaryP = document.querySelector('#hero .hero-text p:nth-of-type(2)');
      if (nameEl && data.about?.name) nameEl.textContent = data.about.name;
      if (eyebrowEl && data.about?.name) eyebrowEl.textContent = 'Bonjour, je suis';
      if (leadEl && (data.about?.title || data.about?.location)) leadEl.textContent = `${data.about.title || ''}${data.about.title && data.about.location ? ' · ' : ''}${data.about.location || ''}`;
      if (summaryP && data.about?.summary) summaryP.textContent = data.about.summary;

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
          <article class="card project" data-tags="${(p.tags || []).join(',')}">
            <h3>${escapeHtml(p.name || '')}</h3>
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

      // Contact
      const contactList = document.querySelector('#contact .contact-list');
      if (contactList && data.contact) {
        const items = [];
        if (data.contact.phone) items.push(`<li>Téléphone: <a href="tel:${encodeURI(data.contact.phone.replace(/\s+/g,''))}">${escapeHtml(data.contact.phone)}</a></li>`);
        if (data.contact.address) items.push(`<li>Adresse: ${escapeHtml(data.contact.address)}</li>`);
        if (data.contact.email) items.push(`<li>Email: <a href="mailto:${encodeURI(data.contact.email)}">${escapeHtml(data.contact.email)}</a></li>`);
        if (data.contact.linkedin) items.push(`<li>LinkedIn: <a href="${encodeURI(data.contact.linkedin)}" target="_blank" rel="noopener">${escapeHtml(data.contact.linkedin.replace(/^https?:\/\//,'').replace(/\/$/, ''))}</a></li>`);
        if (data.contact.github) items.push(`<li>GitHub: <a href="${encodeURI(data.contact.github)}" target="_blank" rel="noopener">${escapeHtml(data.contact.github.replace(/^https?:\/\//,'').replace(/\/$/, ''))}</a></li>`);
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
})();
