/**
 * Career Exploration Interactions - Redirect to AI Careers Page
 * ========================================================
 *
 * FILE PURPOSE:
 * This JavaScript file handles the career category selection on the main home page
 * and redirects users to the AI careers page (home_page_ai_careers.html) when they
 * click on career exploration buttons like "Explore Tech Careers", "Explore Business Careers", etc.
 *
 * MAIN FUNCTIONALITY:
 * - Sets up event listeners for all career category cards and buttons
 * - Shows a beautiful loading animation when redirecting
 * - Redirects users to the AI careers page after a short delay
 * - Provides console logging for debugging
 * - Handles both click and keyboard interactions
 *
 * INTEGRATION:
 * - Used by: home_page.html (main landing page)
 * - Redirects to: home_page_ai_careers.html (AI career exploration page)
 * - Works with: career-exploration-interactions-fixed.js (on destination page)
 *
 * @author Career Compass Team
 * @version 2.0 - Redirect System
 */

class CareerExplorationRedirect {
    /**
     * Constructor - Initialize the redirect system
     * Sets up the foundation for handling career category redirects
     */
    constructor() {
        this.init();
    }

    /**
     * Initialize the redirect system
     * Called automatically when the class is instantiated
     * Sets up all event listeners and functionality
     */
    init() {
        console.log('🔄 Career Exploration Redirect: Initializing...');
        this.setupCategorySelection();
        this.setupCareerAssessment();
    }

    /**
     * Setup category selection event handlers
     * =====================================
     *
     * PURPOSE:
     * This method finds all career category cards on the page and sets up
     * click handlers that will redirect users to the AI careers page.
     *
     * WHAT IT DOES:
     * 1. Finds all elements with class 'career-category-card'
     * 2. Adds click handlers to both the entire card and the button
     * 3. Sets up keyboard accessibility (Enter/Space keys)
     * 4. Logs debugging information to console
     *
     * CAREER CATEGORIES HANDLED:
     * - technology: Tech careers (AI/ML, Web Dev, Cloud, etc.)
     * - business: Business careers (Marketing, Finance, Operations, etc.)
     * - design: Design careers (UI/UX, Graphic Design, etc.)
     * - science: Science careers (Research, Lab Tech, etc.)
     * - healthcare: Healthcare careers (Doctor, Nurse, etc.)
     * - emerging: Emerging fields (Cybersecurity, Sustainability, etc.)
     */
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

    /**
     * Redirect to AI careers page
     * ==========================
     *
     * PURPOSE:
     * This is the core method that handles the redirect from the main page
     * to the AI careers page. It shows a loading animation and then redirects.
     *
     * WHAT IT DOES:
     * 1. Logs the redirect action for debugging
     * 2. Shows a beautiful loading message with animation
     * 3. Waits 800ms for user to see the animation
     * 4. Redirects to home_page_ai_careers.html
     * 5. Tracks the redirect for analytics
     *
     * @param {string} category - The career category being explored (e.g., 'technology', 'business')
     */
    redirectToAICareers(category) {
        console.log('🚀 Redirecting to AI careers page for category:', category);

        // Show loading message
        this.showRedirectMessage(category);

        // Redirect to AI careers page after a short delay
        setTimeout(() => {
            window.location.href = 'home_page_ai_careers.html';
        }, 800);
    }

    /**
     * Show redirect message with loading animation
     * ===========================================
     *
     * PURPOSE:
     * Creates a beautiful loading screen that informs the user they're being
     * redirected to the AI careers page. This provides visual feedback and
     * prevents confusion about what's happening.
     *
     * WHAT IT DOES:
     * 1. Creates a full-screen overlay with backdrop blur
     * 2. Shows a centered loading message with animation
     * 3. Includes a spinning loader and progress text
     * 4. Uses modern CSS animations and gradients
     * 5. Prevents body scrolling while showing
     *
     * VISUAL ELEMENTS:
     * - Gradient background (purple/blue theme)
     * - Large rocket emoji (🚀)
     * - Spinning loading indicator
     * - "Redirecting to AI Career Exploration" message
     * - Backdrop blur effect
     *
     * @param {string} category - The category being explored
     */
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

    /**
     * Track redirect analytics
     * =======================
     *
     * PURPOSE:
     * Records which career categories users are most interested in.
     * This data helps improve the platform and understand user preferences.
     *
     * WHAT IT DOES:
     * 1. Logs the redirect for debugging purposes
     * 2. Sends analytics data if available
     * 3. Can be extended to integrate with analytics services
     *
     * ANALYTICS INTEGRATION:
     * - Works with: advancedResumeFeatures.trackEvent()
     * - Tracks: Career category, redirect action, timestamp
     * - Can be extended for: Google Analytics, Mixpanel, etc.
     *
     * @param {string} category - The career category being tracked
     */
    trackRedirect(category) {
        console.log('📊 Tracking redirect for category:', category);

        // You can add analytics tracking here if needed
        if (window.advancedResumeFeatures) {
            window.advancedResumeFeatures.trackEvent('Career', 'Redirect_To_AI_Careers', category);
        }
    }

    /**
     * Setup career assessment button
     * =============================
     *
     * PURPOSE:
     * Handles the "Find My Career Path" button that appears at the bottom
     * of the career exploration section. This button also redirects to the
     * AI careers page for users who want to take the assessment quiz.
     *
     * WHAT IT DOES:
     * 1. Finds the career assessment button
     * 2. Adds click handler that redirects to AI careers page
     * 3. Logs the interaction for debugging
     *
     * BUTTON LOCATION:
     * - Found in: .path-finder-content .btn-primary
     * - Text: "Find My Career Path"
     * - Icon: Compass icon (🧭)
     */
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

// ============================================================================
// GLOBAL FUNCTIONS
// ============================================================================

/**
 * Global career category selection function
 * ========================================
 *
 * PURPOSE:
 * This function is called directly from HTML onclick attributes on
 * career category buttons. It provides a global entry point for
 * career category selection.
 *
 * HTML USAGE:
 * <button onclick="selectCareerCategory('technology')">Explore Tech Careers</button>
 *
 * WHAT IT DOES:
 * 1. Logs the function call for debugging
 * 2. Uses the CareerExplorationRedirect instance if available
 * 3. Falls back to direct redirect if the class isn't loaded
 * 4. Ensures the redirect always happens even if there are errors
 *
 * @param {string} category - The career category selected by the user
 */
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

/**
 * Global career assessment function
 * ================================
 *
 * PURPOSE:
 * This function is called from the "Find My Career Path" button
 * and provides a global entry point for starting the assessment.
 *
 * HTML USAGE:
 * <button onclick="startCareerAssessment()">Find My Career Path</button>
 *
 * WHAT IT DOES:
 * 1. Logs the function call for debugging
 * 2. Calls selectCareerCategory with 'assessment' parameter
 * 3. Redirects user to AI careers page for the quiz
 */
function startCareerAssessment() {
    console.log('🧠 Global startCareerAssessment called');
    selectCareerCategory('assessment');
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize when DOM is ready
 * ===========================
 *
 * PURPOSE:
 * Ensures the JavaScript only runs after the HTML document is fully loaded.
 * This prevents errors from trying to access elements that don't exist yet.
 *
 * WHAT IT DOES:
 * 1. Checks if the document is already loaded
 * 2. If loading, waits for DOMContentLoaded event
 * 3. If already loaded, initializes immediately
 * 4. Creates global instance for HTML onclick handlers
 *
 * GLOBAL ACCESS:
 * - Creates: window.careerExplorationRedirect
 * - Used by: HTML onclick attributes
 * - Available to: Other scripts on the page
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded - Initializing Career Exploration Redirect...');
    window.careerExplorationRedirect = new CareerExplorationRedirect();
});

// ============================================================================
// MODULE EXPORT
// ============================================================================

/**
 * Export for module use
 * ====================
 *
 * PURPOSE:
 * Allows this script to be used as a module in other JavaScript environments.
 * This enables code reusability and testing capabilities.
 *
 * USAGE:
 * const CareerExplorationRedirect = require('./career-exploration-redirect.js');
 *
 * TESTING:
 * Can be imported in test files for unit testing
 * Can be used in Node.js environments
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CareerExplorationRedirect;
}
