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

if (navMobileToggle && navLinks) {
    // Ensure controlled element has an ID for aria-controls
    if (!navLinks.id) {
        navLinks.id = 'navLinks';
    }
    navMobileToggle.setAttribute('aria-controls', navLinks.id);
    navMobileToggle.setAttribute('aria-expanded', 'false');

    // Create overlay element dynamically (keeps index.html untouched)
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    const isOpen = () => navLinks.classList.contains('active');

    function openMenu() {
        navLinks.classList.add('active');
        navMobileToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
        navMobileToggle.setAttribute('aria-expanded', 'true');
        overlay.setAttribute('aria-hidden', 'false');
        // Focus first link for keyboard/screen-reader users
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
    }

    function closeMenu() {
        if (!isOpen()) return;
        navLinks.classList.remove('active');
        navMobileToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        navMobileToggle.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        // Return focus to the toggle so keyboard users land somewhere sensible
        navMobileToggle.focus({ preventScroll: true });
    }

    function toggleMenu() {
        isOpen() ? closeMenu() : openMenu();
    }

    navMobileToggle.addEventListener('click', toggleMenu);

    // Click overlay → close
    overlay.addEventListener('click', closeMenu);

    // Click any nav link inside the panel → close (event delegation)
    navLinks.addEventListener('click', (e) => {
        if (e.target.closest('a')) closeMenu();
    });

    // ESC → close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) closeMenu();
    });

    // If user resizes to desktop while menu is open, close it to avoid stale state
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968 && isOpen()) closeMenu();
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.work-card, .company-card, .build-card, .bounty-inner').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .work-card.visible,
    .company-card.visible,
    .build-card.visible,
    .bounty-inner.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Stagger animation for grid items
document.querySelectorAll('.work-grid, .build-grid').forEach(grid => {
    const items = grid.querySelectorAll('.work-card, .build-card');
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Console easter egg
console.log('%c⚡ Ryan Bartell — Operator & Builder', 'color: #00ff88; font-size: 16px; font-weight: bold;');
console.log('%cIf you\'re reading this, you\'re my kind of person.', 'color: #888; font-size: 12px;');
console.log('%chttps://github.com/BTizzy', 'color: #555; font-size: 10px;');
