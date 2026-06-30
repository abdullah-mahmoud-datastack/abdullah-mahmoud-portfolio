document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Check local storage for theme
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggleBtn.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }

    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Scroll Fade-in Animation
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Add staggered delay to hero elements
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Certificate Modal
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const viewBtns = document.querySelectorAll('.view-cert-btn');

    if (modal && modalImg && closeBtn) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const imgSrc = this.getAttribute('data-img');
                if (imgSrc) {
                    modalImg.src = imgSrc;
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => { modalImg.src = ''; }, 300);
        };

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal-content-wrapper')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
});
