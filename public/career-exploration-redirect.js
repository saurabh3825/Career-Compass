/**
 * Career Exploration Interactions - Redirect to AI Careers Page
 * Modified to redirect to home_page_ai_careers.html when categories are selected
 */

class CareerExplorationRedirect {
    constructor() {
        this.init();
    }

    init() {
        console.log('🔄 Career Exploration Redirect: Initializing...');
        this.setupCategorySelection();
        this.setupCareerAssessment();
    }

    setupCategorySelection() {
        console.log('🔗 Setting up category redirects...');

        const categoryCards = document.querySelectorAll('.career-category-card');
        console.log(`📊 Found ${categoryCards.length} category cards`);

        categoryCards.forEach((card, index) => {
            console.log(`🔘 Setting up card ${index + 1}:`, card.dataset.category);

            // Click handler for entire card
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('job-tag') && !e.target.classList.contains('btn-category-select')) {
                    const category = card.dataset.category;
                    console.log('🖱️ Card clicked:', category);
                    this.redirectToAICareers(category);
                }
            });

            // Button click handler
            const button = card.querySelector('.btn-category-select');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const category = card.dataset.category;
                    console.log('🔘 Button clicked:', category);
                    this.redirectToAICareers(category);
                });
            }

            // Add accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Explore ${card.querySelector('h3').textContent} career category`);

            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const category = card.dataset.category;
                    this.redirectToAICareers(category);
                }
            });
        });
    }

    redirectToAICareers(category) {
        console.log('🚀 Redirecting to AI careers page for category:', category);

        // Show loading message
        this.showRedirectMessage(category);

        // Redirect to AI careers page after a short delay
        setTimeout(() => {
            window.location.href = 'home_page_ai_careers.html';
        }, 800);
    }

    showRedirectMessage(category) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'redirect-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                padding: 30px 40px;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                animation: fadeInScale 0.3s ease-out;
            ">
                <div style="font-size: 3rem; margin-bottom: 15px;">🚀</div>
                <h3 style="margin: 0 0 10px 0; font-size: 1.5rem;">Redirecting to AI Career Exploration</h3>
                <p style="margin: 0; opacity: 0.9;">Taking you to our comprehensive AI-focused career guide...</p>
                <div style="margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <div style="
                        width: 20px;
                        height: 20px;
                        border: 2px solid rgba(255,255,255,0.3);
                        border-top: 2px solid white;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    "></div>
                    <span>Loading AI career opportunities...</span>
                </div>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
                z-index: 9999;
            "></div>
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);
        document.body.style.overflow = 'hidden';

        // Track the redirect
        this.trackRedirect(category);
    }

    trackRedirect(category) {
        console.log('📊 Tracking redirect for category:', category);

        // You can add analytics tracking here if needed
        if (window.advancedResumeFeatures) {
            window.advancedResumeFeatures.trackEvent('Career', 'Redirect_To_AI_Careers', category);
        }
    }

    setupCareerAssessment() {
        const assessmentBtn = document.querySelector('.path-finder-content .btn-primary');
        if (assessmentBtn) {
            assessmentBtn.addEventListener('click', () => {
                console.log('🧠 Career assessment button clicked');
                this.redirectToAICareers('assessment');
            });
        }
    }
}

// Global functions for HTML onclick handlers
function selectCareerCategory(category) {
    console.log('🔗 Global selectCareerCategory called with:', category);

    if (window.careerExplorationRedirect) {
        window.careerExplorationRedirect.redirectToAICareers(category);
    } else {
        // Fallback: direct redirect
        console.log('⚠️ Redirect object not found, using direct redirect');
        window.location.href = 'home_page_ai_careers.html';
    }
}

function startCareerAssessment() {
    console.log('🧠 Global startCareerAssessment called');
    selectCareerCategory('assessment');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded - Initializing Career Exploration Redirect...');
    window.careerExplorationRedirect = new CareerExplorationRedirect();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CareerExplorationRedirect;
}
