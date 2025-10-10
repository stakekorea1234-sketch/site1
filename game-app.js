// Game App JS - Unique for Site1
document.addEventListener('DOMContentLoaded', function() {
    // Game specific initialization
    initGameFeatures();
    setupGameNavigation();
    handleGameInteractions();
});

// Initialize game features
function initGameFeatures() {
    // Set current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('game-animate-in');
            }
        });
    }, observerOptions);
    
    // Observe game elements
    document.querySelectorAll('.game-feature-item, .game-timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// Setup game navigation
function setupGameNavigation() {
    // Smooth scroll for game links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80;
                    const elementPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Handle game interactions
function handleGameInteractions() {
    // Copy promo code functionality
    const promoElement = document.querySelector('.game-promo-badge');
    if (promoElement) {
        promoElement.style.cursor = 'pointer';
        promoElement.title = '클릭하여 복사';
        
        promoElement.addEventListener('click', function() {
            const code = 'nut123';
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = '복사됨!';
                this.style.background = 'rgba(34, 197, 94, 0.3)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'rgba(255,255,255,0.2)';
                }, 2000);
            });
        });
    }
    
    // Game stats counter animation
    animateGameStats();
}

// Animate game statistics
function animateGameStats() {
    const statValues = document.querySelectorAll('.game-quick-stats .stat-value');
    
    statValues.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('x')) {
            // Animate multiplier values
            const finalValue = parseInt(text.replace(/[^0-9]/g, ''));
            if (finalValue > 100) {
                animateCounter(stat, 0, finalValue, 2000, 'x');
            }
        }
    });
}

// Counter animation helper
function animateCounter(element, start, end, duration, suffix = '') {
    const range = end - start;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * range + start);
        element.textContent = current.toLocaleString() + suffix;
        
        if (progress >= 1) {
            clearInterval(timer);
            element.textContent = end.toLocaleString() + suffix;
        }
    }, 16);
}

// Add scroll to top button for game
const createScrollButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '🎮';
    button.className = 'game-scroll-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
    `;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
};

// Initialize scroll button
createScrollButton();
