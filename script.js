/* ============================================
   Wedding Invitation - Thiệp & Hùng
   JavaScript Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Welcome Overlay ---
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const openInvitationBtn = document.getElementById('open-invitation');
    const bgMusic = document.getElementById('bg-music');

    openInvitationBtn.addEventListener('click', () => {
        // Start playing music immediately
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
            musicOn.style.display = 'block';
            musicOff.style.display = 'none';
        }).catch(() => {});

        // Hide welcome overlay
        welcomeOverlay.classList.add('hidden');
        setTimeout(() => welcomeOverlay.remove(), 1000);
    });

    // --- Create Floating Petals ---
    const petalsContainer = document.getElementById('petals-container');
    function createPetals(count = 15) {
        for (let i = 0; i < count; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            const size = Math.random() * 12 + 6;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 12;
            const delay = Math.random() * 15;
            const hue = Math.random() > 0.5 ? 
                `hsl(${350 + Math.random() * 20}, ${60 + Math.random() * 30}%, ${80 + Math.random() * 15}%)` :
                `hsl(${30 + Math.random() * 20}, ${50 + Math.random() * 30}%, ${85 + Math.random() * 10}%)`;

            petal.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(ellipse at center, ${hue} 0%, transparent 70%);
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                opacity: ${0.3 + Math.random() * 0.4};
            `;
            petalsContainer.appendChild(petal);
        }
    }
    createPetals();

    // --- Navigation ---
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Scroll effect for nav
    function handleNavScroll() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navItems.forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // --- Hero Slideshow ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 6000);

    // --- Countdown Timer ---
    const weddingDate = new Date('2026-04-11T08:00:00+07:00');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const diff = weddingDate - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        animateNumber(daysEl, days);
        animateNumber(hoursEl, hours);
        animateNumber(minutesEl, minutes);
        animateNumber(secondsEl, seconds);
    }

    function animateNumber(el, value) {
        const formatted = String(value).padStart(2, '0');
        if (el.textContent !== formatted) {
            el.style.transform = 'translateY(-5px)';
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.textContent = formatted;
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }, 150);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.style.animationDelay || '0s';
                const delayMs = parseFloat(delay) * 1000;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delayMs);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImage = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        galleryImages.push(img.src);

        item.addEventListener('click', () => {
            currentImage = index;
            openLightbox();
        });
    });

    lightboxTotal.textContent = galleryImages.length;

    function openLightbox() {
        lightboxImg.src = galleryImages[currentImage];
        lightboxCurrent.textContent = currentImage + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentImage = (currentImage - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }

    function nextImage() {
        currentImage = (currentImage + 1) % galleryImages.length;
        updateLightboxImage();
    }

    function updateLightboxImage() {
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentImage];
            lightboxCurrent.textContent = currentImage + 1;
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 200);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Touch swipe for lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }, { passive: true });



    // --- Back to Top ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Music Toggle ---
    const musicToggle = document.getElementById('music-toggle');
    const musicOn = document.getElementById('music-on');
    const musicOff = document.getElementById('music-off');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
        } else {
            bgMusic.play().catch(() => {});
            isPlaying = true;
        }
        musicToggle.classList.toggle('playing', isPlaying);
        musicOn.style.display = isPlaying ? 'block' : 'none';
        musicOff.style.display = isPlaying ? 'none' : 'block';
    }

    musicToggle.addEventListener('click', toggleMusic);

    // --- Parallax effect for hero ---
    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        const scrolled = window.scrollY;

        if (scrolled < window.innerHeight) {
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });

    // --- Smooth section transitions ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const header = entry.target.querySelector('.section-header');
                if (header) {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('section').forEach(section => {
        const header = section.querySelector('.section-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(30px)';
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        sectionObserver.observe(section);
    });

    // --- Throttle scroll events for performance ---
    let ticking = false;
    const originalScrollHandler = () => {
        handleNavScroll();
        updateActiveNav();
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                originalScrollHandler();
                ticking = false;
            });
            ticking = true;
        }
    });

    console.log('💒 Wedding Invitation loaded successfully!');
});
