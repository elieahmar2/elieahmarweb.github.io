'use strict';

// Sidebar toggle functionality
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {
    elementToggleFunc(sidebar); 
});

// Page navigation functionality
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let i = 0; i < pages.length; i++) {
            if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                pages[i].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove('active');
                navigationLinks[i].classList.remove('active');
            }
        }
    });
}

// Contact form functionality
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    });
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Language proficiency charts
    initLanguageCharts();
    
    // Skills chart
    initSkillsChart();
    
    // Animated counters
    initCounters();
});

// Language Charts Configuration
function initLanguageCharts() {
    const chartConfig = {
        type: 'doughnut',
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    };

    // Arabic Chart (100%)
    const arabicCtx = document.getElementById('arabicChart');
    if (arabicCtx) {
        new Chart(arabicCtx, {
            ...chartConfig,
            data: {
                datasets: [{
                    data: [100, 0],
                    backgroundColor: ['#0D9488', '#1F2937'],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            }
        });
    }

    // English Chart (30%)
    const englishCtx = document.getElementById('englishChart');
    if (englishCtx) {
        new Chart(englishCtx, {
            ...chartConfig,
            data: {
                datasets: [{
                    data: [30, 70],
                    backgroundColor: ['#10B981', '#1F2937'],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            }
        });
    }

    // French Chart (30%)
    const frenchCtx = document.getElementById('frenchChart');
    if (frenchCtx) {
        new Chart(frenchCtx, {
            ...chartConfig,
            data: {
                datasets: [{
                    data: [30, 70],
                    backgroundColor: ['#F97316', '#1F2937'],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            }
        });
    }
}

// Skills Chart Configuration
function initSkillsChart() {
    const skillsCtx = document.getElementById('skillsChart');
    if (!skillsCtx) return;

    new Chart(skillsCtx, {
        type: 'radar',
        data: {
            labels: [
                'Artificial Intelligence',
                'Video Editing',
                'Graphic Design', 
                'Web Development',
                'Digital Marketing',
                'Content Creation',
                'Photography',
                'Business Development'
            ],
            datasets: [{
                label: 'Skill Level',
                data: [95, 90, 85, 80, 88, 82, 75, 85],
                backgroundColor: 'rgba(13, 148, 136, 0.2)',
                borderColor: '#0D9488',
                borderWidth: 3,
                pointBackgroundColor: '#F97316',
                pointBorderColor: '#F97316',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#F97316',
                pointHoverBorderColor: '#FFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1F2937',
                    titleColor: '#F9FAFB',
                    bodyColor: '#F9FAFB',
                    borderColor: '#0D9488',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.r}% Proficiency`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 20,
                        color: '#6B7280',
                        font: {
                            size: 12
                        },
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: '#374151',
                        lineWidth: 1
                    },
                    angleLines: {
                        color: '#374151',
                        lineWidth: 1
                    },
                    pointLabels: {
                        color: '#F9FAFB',
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            interaction: {
                intersect: false,
                mode: 'point'
            }
        }
    });
}

// Animated counters for statistics
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();
                
                const animate = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const current = Math.round(target * easeOutQuart);
                    
                    counter.textContent = current + (counter.textContent.includes('%') ? '%' : '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target + (target === 100 && counter.closest('.stat-item') && counter.closest('.stat-item').querySelector('.stat-label').textContent.includes('Client') ? '%' : counter.textContent.includes('+') ? '+' : '');
                    }
                };
                
                requestAnimationFrame(animate);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced hover effects for service items
const serviceItems = document.querySelectorAll('.service-item, .category-card, .achievement-card');
serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax');
    
    parallax.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const animateElements = document.querySelectorAll('.animate-on-load');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 100);
    });
});

// Enhanced form validation
const formInputsArray = Array.from(formInputs);
formInputsArray.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.classList.add('has-content');
        } else {
            this.classList.remove('has-content');
        }
        
        // Real-time validation
        if (this.checkValidity()) {
            this.classList.remove('invalid');
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
        }
    });
    
    input.addEventListener('focus', function() {
        this.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.classList.remove('focused');
    });
});

// Dynamic year update
const yearElements = document.querySelectorAll('[data-year]');
yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key to close modals or reset focus
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
        }
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-is-tabbing');
});

// Performance optimization: Lazy loading for heavy content
const observerConfig = {
    rootMargin: '50px 0px',
    threshold: 0.01
};

const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('loaded');
            lazyLoadObserver.unobserve(element);
        }
    });
}, observerConfig);

// Apply lazy loading to charts and heavy content
document.querySelectorAll('.lazy-load').forEach(element => {
    lazyLoadObserver.observe(element);
});

console.log('🚀 Elie Al Ahmar - Digital Media & AI Specialist Portfolio Loaded Successfully!');