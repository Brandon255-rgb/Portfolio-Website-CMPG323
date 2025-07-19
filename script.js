// Enhanced scroll progress indicator
function updateScrollProgress() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollIndicator) {
        scrollIndicator.style.width = scrollPercent + '%';
    }
}

// Smooth scrolling with offset for header
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    if (target) {
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Intersection observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.skill-category, .timeline-item, .project-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('fade-in-up');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// Form handling
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('Message sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
                
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'var(--accent-green)';
    } else if (type === 'error') {
        notification.style.background = '#ff4444';
    } else {
        notification.style.background = 'var(--text-muted)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Typing animation for hero text
function setupTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section
function setupParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Lottie animation for profile picture
function setupLottieAnimation() {
    const lottieContainer = document.getElementById('circleAnimation');
    const lottieContainer2 = document.getElementById('circleAnimation2');
    
    if (lottieContainer && typeof lottie !== 'undefined') {
        const animation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/animations/circle-animation.json'
        });
        
        // Pause animation when not in viewport for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animation.play();
                } else {
                    animation.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(lottieContainer);
    }
    
    // Second Lottie animation (rotated 90 degrees)
    if (lottieContainer2 && typeof lottie !== 'undefined') {
        const animation2 = lottie.loadAnimation({
            container: lottieContainer2,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/animations/circle-animation.json'
        });
        
        // Pause animation when not in viewport for performance
        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animation2.play();
                } else {
                    animation2.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer2.observe(lottieContainer2);
    }
}

// Theme toggle functionality (for future use)
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        color: var(--text-primary);
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Animate skill bars on scroll
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    const skillsSection = document.querySelector('.skills-bars');
    
    if (!skillsSection) return;
    
    const rect = skillsSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Trigger animation when skills section is 30% visible
    if (rect.top < windowHeight * 0.7) {
        bars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth && bar.style.width !== targetWidth) {
                bar.style.width = targetWidth;
            }
        });
    }
}

// Custom Cursor
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Highlight on interactive elements
    const hoverSelectors = 'a, button, .nav-link, .submit-btn, .contact-item a';
    document.querySelectorAll(hoverSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

// Timeline animations
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Stop observing after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,  // Trigger when just 10% of item is visible
        rootMargin: '0px 0px -30% 0px'  // Trigger 30% before item reaches center
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Project Modal Functionality
function setupProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Project data
    const projectData = {
        nwumessenger: {
            title: 'NWUMessenger',
            role: 'Project Manager & Developer',
            description: 'A comprehensive mobile application developed using Dart/Flutter, implementing Agile/FAST methodology with UML modeling. Led a team of 7 developers through the full project lifecycle from conception to deployment over 12 months.',
            features: [
                'Team leadership of 7 developers',
                'Agile/FAST methodology implementation',
                'UML modeling with Draw.io',
                'GitHub version control management',
                'Mobile-first responsive design',
                'Real-time messaging capabilities'
            ],
            techStack: ['Dart', 'Flutter', 'GitHub', 'UML', 'Agile'],
            images: [
                'assets/images/Project1/simulator_screenshot_15465A6C-B83F-4FAE-B42F-D5D77D0D3DB3 1.png',
                'assets/images/Project1/simulator_screenshot_DE202E98-3F24-4BA7-8D13-D0C32B0FD73B 1.png',
                'assets/images/Project1/simulator_screenshot_BE5DE010-0F43-40DC-B6C6-E01F18BC10C8 1.png',
                'assets/images/Project1/simulator_screenshot_7C71AC52-6FF1-417C-884E-FE06A896C60E 1.png',
                'assets/images/Project1/simulator_screenshot_E7839CA2-AD2A-4B17-AE89-26BDB92C8175 1.png',
                'assets/images/Project1/simulator_screenshot_AA278FB3-5DD1-4688-A87F-9AD3ABE22409 1.png'
            ]
        },
        invoiceai: {
            title: 'Invoice.AI',
            role: 'Full-Stack Developer & AI Integration',
            description: 'A comprehensive SaaS platform for SMEs to create custom invoice templates with integrated AI capabilities. Features a modern dashboard with real-time analytics and LLM-powered decision-making for business intelligence.',
            features: [
                'Custom invoice template generation',
                'AI/LLM integration for decision-making',
                'Real-time analytics dashboard',
                'Secure authentication system',
                'Real-time data synchronization',
                'Scalable enterprise architecture'
            ],
            techStack: ['Node.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'SQL', 'AI/LLM'],
            images: [
                'assets/images/Project2/Screenshot 2025-07-19 160332.png',
                'assets/images/Project2/Screenshot 2025-07-19 160321.png',
                'assets/images/Project2/Screenshot 2025-07-19 160304.png',
                'assets/images/Project2/Screenshot 2025-07-19 160251.png',
                'assets/images/Project2/Screenshot 2025-07-19 160243.png',
                'assets/images/Project2/Screenshot 2025-07-19 160232.png'
            ]
        },
        nailsalon: {
            title: 'Nail Salon Website',
            role: 'Frontend Developer & UI/UX Designer',
            description: 'A modern, responsive business website template for beauty professionals and nail salons. Designed with conversion optimization in mind, featuring booking systems, service showcases, and customer testimonials.',
            features: [
                'Mobile-first responsive design',
                'Booking system integration',
                'Service showcase gallery',
                'Customer testimonials',
                'Conversion optimization',
                'Smooth animations and transitions'
            ],
            techStack: ['React', 'TypeScript', 'Tailwind', 'Responsive', 'UI/UX'],
            images: [
                'assets/images/Project3/Screenshot 2025-07-19 161744.png',
                'assets/images/Project3/Screenshot 2025-07-19 161734.png',
                'assets/images/Project3/Screenshot 2025-07-19 161726.png',
                'assets/images/Project3/Screenshot 2025-07-19 161714.png',
                'assets/images/Project3/Screenshot 2025-07-19 161650.png',
                'assets/images/Project3/Screenshot 2025-07-19 161642.png'
            ]
        }
    };
    
    // Open modal function
    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalRole').textContent = project.role;
        document.getElementById('modalDescription').textContent = project.description;
        
        // Update features
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        // Update tech stack
        const techStack = document.getElementById('modalTechStack');
        techStack.innerHTML = project.techStack.map(tech => 
            `<span class="tech-tag-modal">${tech}</span>`
        ).join('');
        
        // Update gallery
        const projectGallery = document.getElementById('projectGallery');
        
        if (project.images.length > 0) {
            // Create professional collage layout based on number of images
            if (projectId === 'nwumessenger' && project.images.length >= 3) {
                // Use mobile phone frame layout for NWUMessenger
                projectGallery.innerHTML = `
                    <div class="gallery-mobile">
                        ${project.images.map((img, index) => `
                            <div class="mobile-phone-frame">
                                <div class="mobile-screen">
                                    <img src="${img}" alt="NWUMessenger Screenshot ${index + 1}" />
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (projectId === 'invoiceai' && project.images.length >= 6) {
                // Use 3x2 grid layout for Invoice.AI
                projectGallery.innerHTML = `
                    <div class="gallery-invoice-grid">
                        ${project.images.map((img, index) => `
                            <div class="invoice-grid-item">
                                <img src="${img}" alt="Invoice.AI Screenshot ${index + 1}" />
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (projectId === 'nailsalon' && project.images.length >= 6) {
                // Use 3x2 grid layout for Nail Salon Website
                projectGallery.innerHTML = `
                    <div class="gallery-invoice-grid">
                        ${project.images.map((img, index) => `
                            <div class="invoice-grid-item">
                                <img src="${img}" alt="Nail Salon Screenshot ${index + 1}" />
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (project.images.length >= 3) {
                // Use collage layout for 3+ images
                projectGallery.innerHTML = `
                    <div class="gallery-collage">
                        <div class="main-image">
                            <img src="${project.images[0]}" alt="Main Project Screenshot" />
                        </div>
                        <div class="side-image">
                            <img src="${project.images[1]}" alt="Project Screenshot 2" />
                        </div>
                        <div class="side-image">
                            <img src="${project.images[2]}" alt="Project Screenshot 3" />
                        </div>
                    </div>
                    <div class="gallery-thumbnails">
                        ${project.images.map((img, index) => 
                            `<div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="${img}" alt="Project Screenshot ${index + 1}" />
                            </div>`
                        ).join('')}
                    </div>
                `;
            } else if (project.images.length === 2) {
                // Use grid layout for 2 images
                projectGallery.innerHTML = `
                    <div class="gallery-grid">
                        <div class="grid-item wide">
                            <img src="${project.images[0]}" alt="Main Project Screenshot" />
                        </div>
                        <div class="grid-item tall">
                            <img src="${project.images[1]}" alt="Project Screenshot 2" />
                        </div>
                    </div>
                    <div class="gallery-thumbnails">
                        ${project.images.map((img, index) => 
                            `<div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="${img}" alt="Project Screenshot ${index + 1}" />
                            </div>`
                        ).join('')}
                    </div>
                `;
            } else {
                // Single image layout
                projectGallery.innerHTML = `
                    <div class="gallery-main">
                        <img src="${project.images[0]}" alt="Project Screenshot" />
                    </div>
                `;
            }
            
            // Add thumbnail click handlers for collage/grid layouts
            const thumbnails = projectGallery.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    const index = thumb.dataset.index;
                    
                    // Update main collage/grid images
                    const collageImages = projectGallery.querySelectorAll('.gallery-collage img, .gallery-grid img');
                    if (collageImages.length > 0) {
                        // Rotate through images in collage
                        const newIndex = (parseInt(index) + 1) % project.images.length;
                        collageImages[0].src = project.images[newIndex];
                    }
                    
                    // Update active thumbnail
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });
            
            // Add click handlers to all images for fullscreen
            const allImages = projectGallery.querySelectorAll('img');
            allImages.forEach((img, index) => {
                img.addEventListener('click', () => {
                    window.openFullscreenModal(img.src, project.images, index);
                });
            });
        } else {
            projectGallery.innerHTML = `
                <div class="gallery-main">
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-secondary);">
                        <div style="text-align: center;">
                            <i class="fas fa-images" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                            <p>Project images coming soon...</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            openModal(projectId);
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Fullscreen Modal Functionality
function setupFullscreenModal() {
    const fullscreenModal = document.getElementById('fullscreenModal');
    const fullscreenClose = document.getElementById('fullscreenClose');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenCounter = document.getElementById('fullscreenCounter');
    const fullscreenPrev = document.getElementById('fullscreenPrev');
    const fullscreenNext = document.getElementById('fullscreenNext');
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Open fullscreen modal
    function openFullscreen(imageSrc, images, startIndex = 0) {
        currentImages = images;
        currentIndex = startIndex;
        
        fullscreenImage.src = imageSrc;
        updateFullscreenCounter();
        
        fullscreenModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close fullscreen modal
    function closeFullscreen() {
        fullscreenModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Navigate to previous image
    function showPrevious() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        fullscreenImage.src = currentImages[currentIndex];
        updateFullscreenCounter();
    }
    
    // Navigate to next image
    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        fullscreenImage.src = currentImages[currentIndex];
        updateFullscreenCounter();
    }
    
    // Update counter display
    function updateFullscreenCounter() {
        fullscreenCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }
    
    // Event listeners
    fullscreenClose.addEventListener('click', closeFullscreen);
    fullscreenModal.querySelector('.fullscreen-overlay').addEventListener('click', closeFullscreen);
    fullscreenPrev.addEventListener('click', showPrevious);
    fullscreenNext.addEventListener('click', showNext);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!fullscreenModal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowLeft':
                showPrevious();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });
    
    // Make fullscreen modal globally accessible
    window.openFullscreenModal = openFullscreen;
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    // Setup all features
    setupScrollAnimations();
    setupMobileMenu();
    setupContactForm();
    setupTypingAnimation();
    setupParallax();
    setupLottieAnimation();
    setupThemeToggle();
    setupCustomCursor();
    setupTimelineAnimations();
    setupProjectModals();
    setupFullscreenModal(); // Initialize fullscreen modal
    
    // Setup smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('scroll', animateSkillBars);
    window.addEventListener('DOMContentLoaded', animateSkillBars);
    
    updateScrollProgress();
});