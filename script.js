// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = scrollPercentage + '%';
}

// Smooth scrolling for in-page nav links, with automatic mobile-menu close
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        closeMobileMenu();
    });
});

// Intersection Observer for scroll-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Navbar background state on scroll (nav itself always stays visible/accessible)
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}

// --- Mobile menu ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

function openMobileMenu() {
    if (!navLinks || !mobileMenuBtn) return;
    navLinks.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.innerHTML = '<i class="fas fa-xmark"></i>';
}

function closeMobileMenu() {
    if (!navLinks || !mobileMenuBtn) return;
    navLinks.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

function toggleMobileMenu() {
    if (!navLinks) return;
    if (navLinks.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking outside it
document.addEventListener('click', (e) => {
    if (!navLinks || !navLinks.classList.contains('active')) return;
    const clickedInsideMenu = navLinks.contains(e.target) || (mobileMenuBtn && mobileMenuBtn.contains(e.target));
    if (!clickedInsideMenu) closeMobileMenu();
});

// Close mobile menu on resize back up to desktop width
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
});

// Respect the user's motion preference and device input type before running
// any purely-decorative effects (particles, custom cursor).
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
const wantsDecorativeEffects = !prefersReducedMotion && hasFinePointer;

// Particle effect for hero section (skipped on touch devices / reduced motion)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(45, 212, 191, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Custom cursor glow (desktop with a fine pointer only)
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Click ripple effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(45, 212, 191, 0.5);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
        pointer-events: none;
        z-index: 9999;
    `;

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Initialize everything once the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Observe elements for scroll-in animation
    const animatedElements = document.querySelectorAll(
        '.section-title, .about-text, .experience-item, .work-card'
    );
    animatedElements.forEach(el => observer.observe(el));

    // Staggered animation delays
    document.querySelectorAll('.work-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.experience-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Decorative, non-essential effects only on capable devices
    if (wantsDecorativeEffects) {
        createParticles();
        initCursorGlow();
    }
});

// Loading state
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Throttled scroll handling via rAF
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollProgress();
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);