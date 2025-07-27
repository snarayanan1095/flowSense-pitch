// FlowSense Investor Pitch Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initTabSwitching();
    initAnimatedCounters();
    initScrollEffects();
    initCTAButtons();
});

// Navigation functionality
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionIndex = parseInt(this.getAttribute('data-section'));
            scrollToSection(sectionIndex);
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100; // Offset for better detection
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                updateActiveNav(index);
            }
        });
    });
}

// Scroll to specific section
function scrollToSection(sectionIndex) {
    const targetSection = document.getElementById(`section-${sectionIndex}`);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update active navigation button
function updateActiveNav(activeIndex) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((button, index) => {
        if (index === activeIndex) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Tab switching for features section - FIXED
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none'; // Explicitly hide
            });
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block'; // Explicitly show
            }
        });
    });
    
    // Initialize first tab as active
    const firstTab = document.querySelector('.tab-btn');
    const firstContent = document.querySelector('.tab-content');
    if (firstTab && firstContent) {
        firstTab.classList.add('active');
        firstContent.classList.add('active');
        firstContent.style.display = 'block';
        
        // Hide other tab contents initially
        const otherContents = document.querySelectorAll('.tab-content:not(.active)');
        otherContents.forEach(content => {
            content.style.display = 'none';
        });
    }
}

// Animated counters for statistics
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate individual counter
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number based on size
        let displayValue;
        if (target >= 1000) {
            displayValue = (current / 1000).toFixed(1) + 'B';
        } else if (target >= 100) {
            displayValue = current.toFixed(0);
        } else {
            displayValue = current.toFixed(1);
        }
        
        element.textContent = displayValue.replace('B', '');
    }, 16);
}

// Scroll effects and animations
function initScrollEffects() {
    const animateElements = document.querySelectorAll('.problem-card, .tech-card, .highlight-card, .benefit-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Call-to-action button functionality
function initCTAButtons() {
    // Hero CTA button
    const heroCTA = document.querySelector('.cta-button');
    if (heroCTA) {
        heroCTA.addEventListener('click', function() {
            scrollToSection(1);
        });
    }
    
    // Investment section buttons
    const scheduleBtn = document.querySelector('.contact-buttons .btn--primary');
    const downloadBtn = document.querySelector('.contact-buttons .btn--outline');
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            // In a real application, this would open a calendar booking system
            alert('Thank you for your interest! Our team will contact you within 24 hours to schedule a meeting.');
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // In a real application, this would trigger a download
            alert('Pitch deck download initiated. Check your downloads folder.');
        });
    }
}

// Smooth hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.problem-card, .tech-card, .highlight-card, .benefit-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to market stats
    const marketStats = document.querySelectorAll('.market-stat');
    
    marketStats.forEach(stat => {
        stat.addEventListener('click', function() {
            // Add a brief highlight effect
            this.style.backgroundColor = 'var(--color-primary)';
            this.style.color = 'var(--color-btn-primary-text)';
            
            setTimeout(() => {
                this.style.backgroundColor = 'var(--color-surface)';
                this.style.color = 'var(--color-text)';
            }, 300);
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const sections = document.querySelectorAll('.section');
    const currentSection = getCurrentSection();
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
    } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(sections.length - 1);
    }
});

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
            return i;
        }
    }
    return 0;
}

// Add loading animation
window.addEventListener('load', function() {
    // Fade in hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            heroSection.style.opacity = '1';
        }, 100);
    }
    
    // Start hero stats counter animation
    const heroCounters = document.querySelectorAll('.hero-stats [data-target]');
    setTimeout(() => {
        heroCounters.forEach(counter => {
            animateCounter(counter);
        });
    }, 500);
});

// Responsive navigation for mobile
function initMobileNavigation() {
    // This would typically include a hamburger menu for mobile
    // For now, we'll just ensure touch events work properly
    
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.backgroundColor = 'var(--color-secondary-hover)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 150);
        });
    });
}

// Initialize mobile navigation
initMobileNavigation();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll event
const throttledScroll = throttle(function() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            updateActiveNav(index);
        }
    });
}, 100);

// Replace the original scroll listener with throttled version
window.removeEventListener('scroll', function() {}); // Remove if exists
window.addEventListener('scroll', throttledScroll);

// Add error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Export functions for potential external use
window.FlowSenseApp = {
    scrollToSection,
    updateActiveNav,
    animateCounter
};