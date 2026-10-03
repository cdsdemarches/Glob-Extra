/* ============================================
   GLOB'EXTRA — Interactions
   ============================================ */

(function () {
    'use strict';

    /* ---------- Navbar dynamique au scroll ---------- */
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- Reveal au scroll (IntersectionObserver) ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealEls.forEach((el) => observer.observe(el));
    } else {
        // Fallback : tout afficher
        revealEls.forEach((el) => el.classList.add('visible'));
    }

    /* ---------- Smooth scroll pour ancres internes ---------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---------- Fermer le menu mobile au clic sur un lien ---------- */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navCollapse = document.getElementById('navbarNav');

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navCollapse && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
})();
