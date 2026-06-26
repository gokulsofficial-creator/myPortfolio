/**
 * ULTRA-PREMIUM VANIILA ENGINE ORCHESTRATION LAYER
 * High Performance Design Pattern Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    const engine = new PortfolioEngine();
    engine.initialize();
});

class PortfolioEngine {
    constructor() {
        // Core structural selections
        // this.ambientBg = document.getElementById('ambientBg');
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.progressBar = document.getElementById('scrollProgress');
        
        // State variables
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.scroll = { current: 0, target: 0, ease: 0.08 };
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    initialize() {
        // this.setupTheme();
        this.setupEntranceAnimations();
        this.setupIntersectionObservers();
        this.setupTestimonialSlider();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupMagneticInteractions();
        this.setupTiltEffects();
        
    }

    /* ==========================================================================
       1. CORE SYSTEM METHOD LOGIC (THEMING & SCROLL ENGINEERING)
       ========================================================================== */

    // setupTheme() {
    //     const toggle = document.getElementById('themeToggle');
    //     const savedTheme = localStorage.getItem('premium-theme') || 'dark';
    //     document.documentElement.setAttribute('data-theme', savedTheme);

    //     toggle.addEventListener('click', () => {
    //         const currentTheme = document.documentElement.getAttribute('data-theme');
    //         const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    //         document.documentElement.setAttribute('data-theme', targetTheme);
    //         localStorage.setItem('premium-theme', targetTheme);
    //     });
    // }

    setupEntranceAnimations() {
        // Sequenced frame execution ensuring high-end timing synchronization
        setTimeout(() => {
            document.querySelectorAll('.hero-section .reveal-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                    item.style.transform = 'translate3d(0, 0, 0)';
                }, index * 120);
            });
        }, 200);
    }

    setupScrollOrchestration() {
        // High-speed tracking loop processing layout heights calculations 
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (windowHeight > 0) {
                const percentage = (window.scrollY / windowHeight) * 100;
                this.progressBar.style.width = `${percentage}%`;
            }
        }, { passive: true });

        // Smooth anchors routing override
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Soft closure for mobile environments 
                    const menu = document.getElementById('navMenu');
                    const burger = document.getElementById('menuHamburger');
                    if(menu.classList.contains('mobile-active')) {
                        menu.classList.remove('mobile-active');
                        burger.classList.remove('active');
                    }

                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupIntersectionObservers() {
        const options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Execution fire limit rules
                }
            });
        }, options);

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

        // Sync and monitor active tracking configurations inside sticky nodes
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { threshold: 0.4 });

        this.sections.forEach(sec => sectionObserver.observe(sec));
    }

    /* ==========================================================================
       2. REACTION DRIVEN GRAPHICS INTERACTION INTERFACING (60FPS RUNTIME)
       ========================================================================== */

    setupMagneticInteractions() {
        const targets = document.querySelectorAll('.magnetic-target');
        
        targets.forEach(target => {
            target.addEventListener('mousemove', (e) => {
                const rect = target.getBoundingClientRect();
                // Matrix tracking equations defining structural focal depth
                const x = e.clientX - rect.left - (rect.width / 2);
                const y = e.clientY - rect.top - (rect.height / 2);
                
                // Acceleration constraint limits
                target.style.transform = `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
            });

            target.addEventListener('mouseleave', () => {
                target.style.transform = 'translate3d(0, 0, 0)';
            });
        });
    }

    setupTiltEffects() {
        const elements = document.querySelectorAll('.dynamic-tilt');
        
        elements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                
                const tiltX = (yc - y) / 15;
                const tiltY = (x - xc) / 15;
                
                el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    /* ==========================================================================
       3. MODULAR UI COMPONENTS CODE ARCHITECTURE
       ========================================================================== */

    setupTestimonialSlider() {
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('prevTestimonial');
        const nextBtn = document.getElementById('nextTestimonial');
        let index = 0;

        if(!cards.length) return;

        const updateSlider = (newIdx) => {
            cards[index].classList.remove('active');
            index = (newIdx + cards.length) % cards.length;
            cards[index].classList.add('active');
        };

        prevBtn.addEventListener('click', () => updateSlider(index - 1));
        nextBtn.addEventListener('click', () => updateSlider(index + 1));
    }

    setupContactForm() {
        const form = document.getElementById('premiumForm');
        const submitBtn = document.getElementById('formSubmitBtn');

        if(!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (form.checkValidity()) {
                submitBtn.classList.add('submitted');
                form.reset();
                
                // Simulation of micro-interactive feedback sequences
                setTimeout(() => {
                    submitBtn.classList.remove('submitted');
                }, 3000);
            } else {
                // Shake validation error feedback engine routine
                form.classList.add('form-error');
                setTimeout(() => form.classList.remove('form-error'), 500);
            }
        });
    }

    setupMobileMenu() {
        const burger = document.getElementById('menuHamburger');
        const menu = document.getElementById('navMenu');

        if(!burger) return;

        burger.addEventListener('click', () => {
            menu.classList.toggle('mobile-active');
            burger.classList.toggle('active');
            
            // Animation formatting transforms for native burger lines
            if(burger.classList.contains('active')) {
                burger.children[0].style.transform = 'translate3d(0, 7.5px, 0) rotate(45deg)';
                burger.children[1].style.transform = 'translate3d(0, -7.5px, 0) rotate(-45deg)';
            } else {
                burger.children[0].style.transform = 'none';
                burger.children[1].style.transform = 'none';
            }
        });
    }
}

   /* =======================================================
       2. CUSTOM CURSOR
       ======================================================= */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Fast tracking for small dot
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Eased tracking for outer ring (Lerp algorithm)
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover states for cursor
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });
