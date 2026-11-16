/* Olamide Olaitan — minimal, dependency-free portfolio interactions.
 * Configure public project health endpoints here. Never add credentials. */
'use strict';

const PORTFOLIO = {
  email: 'OlamideOlaitan111@gmail.com', // Public contact email.
  linkedin: 'https://www.linkedin.com/in/olamide-olaitan/', // Public LinkedIn profile.
  projects: {
    supportsense: {
      demo: 'https://supportsense-ml.onrender.com/',
      warm: ['https://supportsense-ml.onrender.com/'],
    },
    ragassist: {
      demo: 'https://ragassist-workbench.darkl19hts.workers.dev/',
      // Verified from ragassist/web/config.js
      warm: ['https://ragassist-lly4.onrender.com/health'],
    },
    modelops: {
      demo: 'https://modelops.streamlit.app/',
      // Public application link; confirm sharing settings if it requires login.
      warm: ['https://modelops.streamlit.app/'],
      // Optional only after confirming actual deployment URL:
      // 'https://modelops-api.onrender.com/health'
    },
  },
};

function setupReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px 30px 0px', threshold: 0.07 });
  nodes.forEach(node => observer.observe(node));
}

// Browser cross-origin responses are opaque (no-cors). A request can trigger a
// free instance to wake, but we cannot infer health/readiness from its result.
const triggered = new Set();
function warmProject(name) {
  const project = PORTFOLIO.projects[name];
  if (!project || triggered.has(name) || navigator.connection?.saveData) return;
  triggered.add(name);
  for (const url of project.warm) {
    if (!url) continue;
    try {
      const controller = new AbortController();
      const kill = setTimeout(() => controller.abort(), 100_000);
      // no-cors makes a simple GET possible even when backends lack portfolio
      // origin in their CORS policy. This DOES NOT prove that the app is ready.
      void fetch(url, {
        method: 'GET', mode: 'no-cors', credentials: 'omit', cache: 'no-store',
        referrerPolicy: 'no-referrer', signal: controller.signal,
      }).catch(() => {}).finally(() => clearTimeout(kill));
    } catch (_) { /* Some visitors block cross-site requests. The link remains usable. */ }
  }
}
function warmAllProjects() {
  if (document.visibilityState !== 'visible') return;
  Object.keys(PORTFOLIO.projects).forEach(warmProject);
}
function scheduleWarmup() {
  // Wait for critical rendering to finish; do not compete with HTML/CSS on load.
  if ('requestIdleCallback' in window) window.requestIdleCallback(warmAllProjects, { timeout: 1800 });
  else setTimeout(warmAllProjects, 850);
}
function wireDemos() {
  document.querySelectorAll('[data-demo]').forEach((node) => {
    const name = node.dataset.demo;
    // Warm again on intention to interact ONLY when not already requested.
    node.addEventListener('pointerenter', () => warmProject(name), { once: true });
    node.addEventListener('focus', () => warmProject(name), { once: true });
    node.addEventListener('touchstart', () => warmProject(name), { once: true, passive: true });
  });
}
function setupOptionalContact() {
  const el = document.getElementById('contact-optional');
  if (!el) return;
  const links = [];
  if (PORTFOLIO.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PORTFOLIO.email)) {
    const a = document.createElement('a'); a.href = `mailto:${PORTFOLIO.email}`;
    a.textContent = 'EMAIL ME ↗'; links.push(a);
  }
  if (PORTFOLIO.linkedin && /^https:\/\/(www\.)?linkedin\.com\//i.test(PORTFOLIO.linkedin)) {
    const a = document.createElement('a'); a.href = PORTFOLIO.linkedin;
    a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = 'LINKEDIN ↗'; links.push(a);
  }
  if (links.length) { links.forEach(a => el.appendChild(a)); el.hidden = false; }
}
function init() {
  setupReveal(); setupOptionalContact(); wireDemos();
  const year = document.getElementById('year'); if (year) year.textContent = String(new Date().getFullYear());
  scheduleWarmup();
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') warmAllProjects(); }, { once: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
