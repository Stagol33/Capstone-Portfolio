const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Theme toggle: switches light and dark, remembers the choice
function setupThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');

  function sync() {
    toggle.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  }

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
    sync();
  });

  sync();
}

// Mobile menu: expands and collapses the nav below the tablet breakpoint
function setupMenu() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
}

// Project filter: shows one category at a time and announces the count
function setupFilters() {
  const buttons = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  const status = document.querySelector('.filter-status');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let shown = 0;

      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

      projects.forEach((project) => {
        const match = filter === 'all' || project.dataset.category === filter;
        const wasHidden = project.hidden;
        project.hidden = !match;
        if (match) {
          shown += 1;
          if (wasHidden) {
            project.classList.remove('is-entering');
            void project.offsetWidth;
            project.classList.add('is-entering');
          }
        }
      });

      const noun = shown === 1 ? 'project' : 'projects';
      status.textContent = filter === 'all'
        ? `Showing all ${shown} ${noun}`
        : `Showing ${shown} ${button.textContent} ${noun}`;
    });
  });
}

// Level meter: a waveform that sweeps up on load and follows the pointer
function setupMeter() {
  const meter = document.querySelector('.meter');
  const count = window.innerWidth < 768 ? 40 : 72;
  const bars = [];
  const rest = [];

  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    const level = 0.18
      + 0.32 * Math.abs(Math.sin(t * Math.PI * 3.1))
      + 0.22 * Math.abs(Math.sin(t * Math.PI * 11.7 + 1.3))
      + 0.12 * Math.abs(Math.sin(t * Math.PI * 27.3));
    const bar = document.createElement('span');
    bar.className = 'meter__bar';
    bar.style.setProperty('--delay', `${(i / count) * 0.6}s`);
    meter.append(bar);
    bars.push(bar);
    rest.push(level * 1.08);
  }

  function draw(levels) {
    bars.forEach((bar, i) => {
      bar.style.setProperty('--level', levels[i].toFixed(3));
      bar.classList.toggle('is-hot', levels[i] > 0.86);
    });
  }

  if (reduceMotion.matches) {
    draw(rest);
  } else {
    meter.classList.add('is-booting');
    requestAnimationFrame(() => requestAnimationFrame(() => draw(rest)));
    setTimeout(() => meter.classList.remove('is-booting'), 1400);
  }

  meter.addEventListener('pointermove', (event) => {
    const box = meter.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    draw(rest.map((level, i) => {
      const distance = Math.abs(i / count - x) * count;
      const boost = Math.max(0, 1 - distance / 7);
      return Math.min(1, level + boost * 0.55);
    }));
  });

  meter.addEventListener('pointerleave', () => draw(rest));
}

setupThemeToggle();
setupMenu();
setupFilters();
setupMeter();
document.querySelector('.year').textContent = new Date().getFullYear();
