// Nav scroll effect
const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile nav toggle — slide-in panel with overlay, ESC, focus mgmt
const navMobileToggle = document.getElementById('navMobileToggle');
const navLinks = document.querySelector('.nav-links');

function setMenuOpen(open) {
    if (!navLinks || !navMobileToggle) return;
    navLinks.classList.toggle('active', open);
    navMobileToggle.classList.toggle('active', open);
    navMobileToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
}

if (navMobileToggle && navLinks) {
    navMobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('active');
        setMenuOpen(!isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            setMenuOpen(false);
            navMobileToggle.focus();
        }
    });

    // Close on resize past breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968 && navLinks.classList.contains('active')) {
            setMenuOpen(false);
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in is handled entirely by `.vx-reveal` CSS + the second observer below.
// The previous first observer stacked two IOs on the same cards, which created a
// race condition (staggered delays left card 1 visible while card 3 was still at
// opacity 0 during fast scroll). Removed to keep a single, authoritative observer.

// Console easter egg
console.log('%c⚡ Ryan Bartell — Talent + AI Partner', 'color: #00ff88; font-size: 16px; font-weight: bold;');
console.log('%cIf you\'re reading this, you\'re my kind of person.', 'color: #888; font-size: 12px;');
console.log('%chttps://github.com/BTizzy', 'color: #555; font-size: 10px;');

// ==========================================
// VX VISUAL LAYER — micro-interactions
// (appended 2026-08-08 by feature/visual-assets agent)
// Prefix: vx- (visual experience)
// ==========================================

// --- 1. Work card 3D tilt (max 3deg by default) ---
(function vxInitTilt() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cards = document.querySelectorAll('.vx-tilt');
    if (!cards.length) return;

    cards.forEach(card => {
        const maxDeg = parseFloat(card.dataset.tiltMax) || 3;
        let raf = null;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateY = ((x - cx) / cx) * maxDeg;
            const rotateX = -((y - cy) / cy) * maxDeg;

            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                card.style.transform =
                    `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });
        });

        card.addEventListener('mouseleave', () => {
            if (raf) cancelAnimationFrame(raf);
            card.style.transform = '';
        });
    });
})();

// --- 2. Button ripple effect (CSS animates a span injected at click point) ---
(function vxInitRipple() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.6;
            const ripple = document.createElement('span');
            ripple.className = 'vx-ripple';
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
})();

// --- 3. Section reveal (IntersectionObserver) ---
(function vxInitReveal() {
    const items = document.querySelectorAll('.vx-reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vx-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
})();

// --- 4. Stats counter (animate 0 → final on view) ---
(function vxInitCounters() {
    const counters = document.querySelectorAll('.metric-value');
    if (!counters.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (el) => {
        const original = el.textContent.trim();
        const match = original.match(/^([\d]+(?:\.\d+)?)(.*)$/);
        if (!match) return;
        const target = parseFloat(match[1]);
        const suffix = match[2];
        const isFloat = match[1].includes('.');
        const duration = 1100;
        const start = performance.now();

        if (prefersReduced) {
            el.textContent = original;
            el.classList.add('vx-counter-done');
            setTimeout(() => el.classList.remove('vx-counter-done'), 600);
            return;
        }

        const tick = (now) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = target * eased;
            el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
            if (t < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = original;
                el.classList.add('vx-counter-done');
                setTimeout(() => el.classList.remove('vx-counter-done'), 700);
            }
        };

        el.textContent = (isFloat ? '0.0' : '0') + suffix;
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
})();

// --- 5. Hero parallax (subtle bg shift on mouse move for the visual layer) ---
(function vxInitHeroParallax() {
    if (window.matchMedia('(hover: none)').matches) return;
    const bg = document.querySelector('.vx-hero-bg');
    const hero = document.querySelector('.hero');
    if (!bg || !hero) return;

    let raf = null;
    hero.addEventListener('mousemove', (e) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
            bg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            bg.style.animationPlayState = 'paused';
        });
    });

    hero.addEventListener('mouseleave', () => {
        if (raf) cancelAnimationFrame(raf);
        bg.style.transform = '';
        bg.style.animationPlayState = 'running';
    });
})();

// --- 6. Scroll progress bar (thin green line at top of viewport) ---
(function vxInitScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    let raf = null;
    const update = () => {
        const doc = document.documentElement;
        const scrollTop = window.pageYOffset || doc.scrollTop;
        const scrollHeight = doc.scrollHeight - window.innerHeight;
        const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };

    window.addEventListener('scroll', () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    update();
})();

// --- 7. Back to top button (appears after 600px scroll, smooth scroll to top) ---
(function vxInitBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const SHOW_AFTER = 600;
    let lastVisible = false;

    const update = () => {
        const shouldShow = window.pageYOffset > SHOW_AFTER;
        if (shouldShow !== lastVisible) {
            btn.classList.toggle('visible', shouldShow);
            lastVisible = shouldShow;
        }
    };

    window.addEventListener('scroll', update, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    update();
})();
