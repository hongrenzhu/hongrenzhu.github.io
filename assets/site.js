// Links and project details work without JavaScript. This adds navigation context.
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

// Preserve the section when switching between the English and Chinese pages.
document.querySelectorAll('.language-switch a').forEach(link => {
  link.addEventListener('click', () => {
    const target = new URL(link.href);
    target.hash = window.location.hash;
    link.href = target.href;
  });
});

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.primary-nav a')];
  const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  const visible = new Set();
  const update = () => {
    const current = sections.find(section => visible.has(section.id));
    links.forEach(link => {
      if (current && link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    update();
  }, { rootMargin: '-15% 0px -35% 0px' });
  sections.forEach(section => observer.observe(section));
}
