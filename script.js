document.addEventListener('DOMContentLoaded', () => {
    const year = document.querySelector('#current-year');
    if (year) year.textContent = new Date().getFullYear();

    const navLinks = [...document.querySelectorAll('.site-nav a')];
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const linksById = new Map(navLinks.map((link) => [link.hash.slice(1), link]));
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

            if (!visible[0]) return;

            navLinks.forEach((link) => {
                const isActive = link === linksById.get(visible[0].target.id);
                link.classList.toggle('is-active', isActive);
                if (isActive) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }, { rootMargin: '-20% 0px -68% 0px', threshold: 0 });

        sections.forEach((section) => observer.observe(section));
    }
});
