document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.boxShadow = 'var(--shadow-sm)';
                navbar.style.padding = '1rem 0';
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close menu on link click (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20, // offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Testimonial Slider
    const track = document.querySelector('.testimonial-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.slider-next');
        const prevBtn = document.querySelector('.slider-prev');
        let slideIndex = 0;

        function updateSliderPosition() {
            track.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                slideIndex = (slideIndex + 1) % slides.length;
                updateSliderPosition();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                slideIndex = (slideIndex - 1 + slides.length) % slides.length;
                updateSliderPosition();
            });
        }

        // Auto slide every 5 seconds
        setInterval(() => {
            slideIndex = (slideIndex + 1) % slides.length;
            updateSliderPosition();
        }, 5000);
    }

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // 6. Form Validation & Submission Handling
    const commonForm = document.getElementById('contactForm') || document.getElementById('appointmentForm');
    if (commonForm) {
        commonForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Basic generic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });

            if (isValid) {
                // Simulate form submission
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    this.reset();
                    
                    const successMsg = document.getElementById('form-success');
                    if (successMsg) {
                        successMsg.style.display = 'block';
                        setTimeout(() => {
                            successMsg.style.display = 'none';
                        }, 5000);
                    } else {
                        alert('Your request has been submitted successfully! We will contact you soon.');
                    }
                }, 1500);
            }
        });

        // Reset red borders on input
        commonForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                field.style.borderColor = 'var(--border-color)';
            });
        });
    }

    // 7. Table Expansion Toggle
    const expandTableBtn = document.getElementById('expand-table-btn');
    if (expandTableBtn) {
        expandTableBtn.addEventListener('click', () => {
            const hiddenRows = document.querySelectorAll('.hidden-row');
            if (hiddenRows.length > 0) {
                // Expanding
                hiddenRows.forEach(row => {
                    row.classList.remove('hidden-row');
                    row.classList.add('visible-row');
                    row.style.display = 'table-row';
                });
                expandTableBtn.textContent = 'Show Less Details';
            } else {
                // Collapsing
                const visibleRows = document.querySelectorAll('.visible-row');
                visibleRows.forEach(row => {
                    row.classList.add('hidden-row');
                    row.classList.remove('visible-row');
                    row.style.display = 'none';
                });
                expandTableBtn.textContent = 'View Full Details';
            }
        });
    }
});
