/**
 * Career Exploration Interactions - Fixed Version
 * ==============================================
 *
 * FILE PURPOSE:
 * This JavaScript file handles the AI career exploration functionality on the
 * home_page_ai_careers.html page. It provides interactive features for exploring
 * AI career categories, job tags, career assessment, and template recommendations.
 *
 * MAIN FUNCTIONALITY:
 * - Career category selection with detailed information modals
 * - Interactive job tag system with hover previews
 * - Career assessment quiz with personalized recommendations
 * - Template recommendations based on career choices
 * - Keyboard navigation and accessibility features
 * - Performance optimizations and error handling
 *
 * INTEGRATION:
 * - Used by: home_page_ai_careers.html (AI career exploration page)
 * - Works with: enhanced-resume-builder.js (resume building features)
 * - Integrates with: advanced-resume-features.js (analytics and notifications)
 *
 * @author Career Compass Team
 * @version 2.1 - Fixed and Enhanced
 */

class CareerExplorationFixed {
    /**
     * Constructor - Initialize the career exploration system
     * ===================================================
     *
     * PURPOSE:
     * Sets up the initial state and data for the career exploration system.
     * This includes career data, user selections, and system configuration.
     *
     * WHAT IT DOES:
     * 1. Initializes selectedCategory and selectedJobs arrays
     * 2. Loads comprehensive career data for all AI categories
     * 3. Calls init() method to set up all functionality
     *
     * CAREER DATA INCLUDES:
     * - AI/ML: Machine Learning, AI Research, Computer Vision, etc.
     * - Data Science: Data Analysis, Business Intelligence, etc.
     * - Cloud/DevOps: Cloud Engineering, Infrastructure, etc.
     * - Software Dev: Full Stack, Frontend, Backend development
     * - UX/UI: Design, Product Management, User Research
     * - AI Research: Innovation, Strategy, Ethics
     */
    constructor() {
        this.selectedCategory = null;
        this.selectedJobs = [];

        /**
         * Comprehensive career data for all AI categories
         * =============================================
         *
         * PURPOSE:
         * Contains detailed information for each AI career category including:
         * - Average salaries and growth rates
         * - Top skills required
         * - Recommended resume templates
         * - Color schemes for UI theming
         *
         * DATA STRUCTURE:
         * Each category has: name, description, salary, growth, skills, template, color
         */
        this.careerData = {
            'ai-ml': {
                name: 'Artificial Intelligence & Machine Learning',
                description: 'Core AI development and deployment roles focusing on machine learning algorithms and AI systems',
                averageSalary: '$125,000',
                growthRate: '31%',
                topSkills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP', 'MLOps'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
            },
            'data-science': {
                name: 'Data Science & Analytics',
                description: 'Data-driven roles focusing on extracting insights from large datasets and building predictive models',
                averageSalary: '$118,000',
                growthRate: '28%',
                topSkills: ['Python', 'R', 'SQL', 'Statistics', 'Tableau', 'Power BI', 'Apache Spark', 'Data Visualization'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            },
            'cloud-devops': {
                name: 'Cloud & DevOps Engineering',
                description: 'Infrastructure and deployment roles focusing on scalable cloud solutions and DevOps practices',
                averageSalary: '$122,000',
                growthRate: '27%',
                topSkills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Monitoring'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
            },
            'software-dev': {
                name: 'Full Stack Development',
                description: 'Complete application development roles from frontend to backend systems',
                averageSalary: '$115,000',
                growthRate: '25%',
                topSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'REST APIs'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            },
            'ux-ui': {
                name: 'UX/UI Design & Product',
                description: 'User experience and interface design roles focusing on product development and user research',
                averageSalary: '$108,000',
                growthRate: '23%',
                topSkills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing', 'Product Strategy'],
                recommendedTemplate: 'creative',
                color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
            },
            'ai-research': {
                name: 'AI Research & Innovation',
                description: 'Cutting-edge research roles focusing on AI innovation, ethics, and strategic implementation',
                averageSalary: '$135,000',
                growthRate: '35%',
                topSkills: ['Research Methodology', 'AI Ethics', 'Innovation Strategy', 'Technical Leadership', 'Product Management', 'Team Leadership'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            }
        };

        this.init();
    }

    /**
     * Initialize the career exploration system
     * ======================================
     *
     * PURPOSE:
     * Sets up all the interactive features and functionality of the career exploration system.
     * This is called automatically when the class is instantiated.
     *
     * WHAT IT DOES:
     * 1. Sets up category selection event handlers
     * 2. Initializes job tag interactions
     * 3. Sets up career assessment functionality
     * 4. Adds keyboard navigation support
     * 5. Initializes scroll animations
     * 6. Adds error handling and logging
     */
    init() {
        console.log('🚀 Career Exploration: Initializing...');

        try {
            this.setupCategorySelection();
            this.setupJobTagInteractions();
            this.setupCareerAssessment();
            this.setupKeyboardNavigation();
            this.initializeAnimations();
            console.log('✅ Career Exploration: All systems initialized successfully');
        } catch (error) {
            console.error('❌ Career Exploration: Initialization error:', error);
        }
    }

    /**
     * Setup category selection event handlers
     * =====================================
     *
     * PURPOSE:
     * Handles user interaction with career category cards. When users click on
     * a career category, this method shows detailed information and recommendations.
     *
     * WHAT IT DOES:
     * 1. Finds all career category cards on the page
     * 2. Adds click handlers for both cards and buttons
     * 3. Sets up keyboard accessibility (Enter/Space keys)
     * 4. Shows detailed career information in a modal
     * 5. Updates UI styling for selected category
     * 6. Recommends appropriate resume templates
     *
     * ACCESSIBILITY FEATURES:
     * - ARIA labels for screen readers
     * - Keyboard navigation support
     * - Focus management
     * - Tab indexing
     */
    setupCategorySelection() {
        console.log('🔧 Career Exploration: Setting up category selection...');

        const categoryCards = document.querySelectorAll('.career-category-card');

        categoryCards.forEach(card => {
            // Click handler for entire card
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('job-tag') && !e.target.classList.contains('btn-category-select')) {
                    const category = card.dataset.category;
                    this.selectCategory(category, card);
                }
            });

            // Add accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Explore ${card.querySelector('h3').textContent} career category`);

            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const category = card.dataset.category;
                    this.selectCategory(category, card);
                }
            });
        });
    }

    /**
     * Select and display career category details
     * =========================================
     *
     * PURPOSE:
     * This is the main method that handles when a user selects a career category.
     * It updates the UI, shows detailed information, and provides recommendations.
     *
     * WHAT IT DOES:
     * 1. Validates the selected category exists in careerData
     * 2. Updates UI to show selection (styling, borders, shadows)
     * 3. Shows detailed career information modal
     * 4. Recommends appropriate resume template
     * 5. Tracks user selection for analytics
     * 6. Shows success notification
     *
     * @param {string} category - The career category key (e.g., 'ai-ml', 'data-science')
     * @param {HTMLElement} cardElement - The DOM element of the selected card
     */
    selectCategory(category, cardElement) {
        if (!this.careerData[category]) {
            console.warn('⚠️ Career Exploration: Category not found:', category);
            return;
        }

        this.selectedCategory = category;
        const data = this.careerData[category];

        console.log('🎯 Career Exploration: Selected category:', category, data.name);

        // Remove previous selection
        document.querySelectorAll('.career-category-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to current
        cardElement.classList.add('selected');

        // Update category styling
        this.updateCategoryStyling(category, data);

        // Show category details
        this.showCategoryDetails(data);

        // Recommend template
        this.recommendTemplate(data.recommendedTemplate, category);

        // Track selection
        this.trackCareerSelection(category);

        // Show notification
        this.showSelectionNotification(data.name);
    }

    /**
     * Update category styling for selected state
     * =========================================
     *
     * PURPOSE:
     * Provides visual feedback when a career category is selected by updating
     * the card's appearance with colors, borders, and shadows.
     *
     * WHAT IT DOES:
     * 1. Finds the selected category card
     * 2. Updates the icon background color using the category's theme color
     * 3. Adds selected state styling (border, shadow)
     * 4. Provides visual feedback to the user
     *
     * VISUAL CHANGES:
     * - Icon background changes to category color
     * - Card border becomes blue (#6366f1)
     * - Card shadow becomes more prominent
     * - Smooth transitions for all changes
     *
     * @param {string} category - The selected category key
     * @param {Object} data - The career data object with color information
     */
    updateCategoryStyling(category, data) {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (!card) return;

        // Update icon background
        const icon = card.querySelector('.category-icon');
        if (icon) {
            icon.style.background = data.color;
        }

        // Add selected state styling
        card.style.borderColor = '#6366f1';
        card.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.2)';
    }

    /**
     * Show detailed career information modal
     * =====================================
     *
     * PURPOSE:
     * Displays a comprehensive modal popup with detailed information about
     * the selected career category including salary, growth, skills, and actions.
     *
     * WHAT IT DOES:
     * 1. Creates or updates the details modal
     * 2. Populates modal with career information
     * 3. Shows salary and growth statistics
     * 4. Lists top skills as interactive tags
     * 5. Adds action buttons for job exploration and template selection
     * 6. Sets up modal event handlers (close, actions)
     *
     * MODAL SECTIONS:
     * - Header: Category name and close button
     * - Body: Description, stats, and skills
     * - Footer: Action buttons (Explore Jobs, Choose Template)
     *
     * @param {Object} data - The career data object with all information
     */
    showCategoryDetails(data) {
        // Create or update details modal/popup
        let detailsContainer = document.querySelector('.career-details-popup');

        if (!detailsContainer) {
            detailsContainer = document.createElement('div');
            detailsContainer.className = 'career-details-popup';
            detailsContainer.innerHTML = `
                <div class="details-backdrop"></div>
                <div class="details-content">
                    <div class="details-header">
                        <h3 id="details-title"></h3>
                        <button class="details-close" aria-label="Close details">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="details-body">
                        <p class="details-description"></p>
                        <div class="details-stats">
                            <div class="stat-item">
                                <span class="stat-label">Avg. Salary</span>
                                <span class="stat-value" id="avg-salary"></span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Growth Rate</span>
                                <span class="stat-value" id="growth-rate"></span>
                            </div>
                        </div>
                        <div class="details-skills">
                            <h4>Top Skills</h4>
                            <div class="skills-tags" id="skills-container"></div>
                        </div>
                    </div>
                    <div class="details-footer">
                        <button class="btn-secondary" id="explore-jobs">Explore Jobs</button>
                        <button class="btn-primary" id="choose-template">Choose Template</button>
                    </div>
                </div>
            `;

            // Add styles
            this.addDetailsModalStyles();

            document.body.appendChild(detailsContainer);

            // Setup modal events
            this.setupDetailsModalEvents(detailsContainer);
        }

        // Update content
        const title = detailsContainer.querySelector('#details-title');
        const description = detailsContainer.querySelector('.details-description');
        const avgSalary = detailsContainer.querySelector('#avg-salary');
        const growthRate = detailsContainer.querySelector('#growth-rate');
        const skillsContainer = detailsContainer.querySelector('#skills-container');

        if (title) title.textContent = data.name;
        if (description) description.textContent = data.description;
        if (avgSalary) avgSalary.textContent = data.averageSalary;
        if (growthRate) growthRate.textContent = data.growthRate;

        if (skillsContainer) {
            skillsContainer.innerHTML = data.topSkills.map(skill =>
                `<span class="skill-tag">${skill}</span>`
            ).join('');
        }

        // Show modal
        detailsContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Add CSS styles for the details modal
     * ===================================
     *
     * PURPOSE:
     * Dynamically adds CSS styles for the career details modal popup.
     * This ensures the modal looks professional and functions properly.
     *
     * WHAT IT DOES:
     * 1. Creates a <style> element with comprehensive CSS
     * 2. Adds it to the document head
     * 3. Includes styles for backdrop, content, animations
     * 4. Makes the modal responsive for mobile devices
     * 5. Adds hover effects and transitions
     *
     * STYLES INCLUDED:
     * - Modal positioning and layout
     * - Backdrop blur effect
     * - Animation keyframes (slideIn, fade effects)
     * - Responsive design for mobile
     * - Button hover states
     * - Typography and spacing
     */
    addDetailsModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .career-details-popup {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
            }

            .career-details-popup.active {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .details-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
            }

            .details-content {
                background: white;
                border-radius: 16px;
                box-shadow: 0 25px 50px rgba(0,0,0,0.25);
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow: hidden;
                position: relative;
                z-index: 2;
                animation: modalSlideIn 0.3s ease-out;
            }

            .details-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px 30px 0 30px;
            }

            .details-header h3 {
                margin: 0;
                color: #374151;
                font-size: 1.8rem;
                font-weight: 600;
            }

            .details-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6b7280;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .details-close:hover {
                background: #f3f4f6;
                color: #374151;
            }

            .details-body {
                padding: 20px 30px;
            }

            .details-description {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 25px;
                font-size: 1.1rem;
            }

            .details-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 25px;
            }

            .stat-item {
                text-align: center;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
            }

            .stat-label {
                display: block;
                font-size: 0.9rem;
                color: #6b7280;
                margin-bottom: 5px;
            }

            .stat-value {
                display: block;
                font-size: 1.3rem;
                font-weight: 700;
                color: #6366f1;
            }

            .details-skills h4 {
                margin: 0 0 15px 0;
                color: #374151;
                font-size: 1.2rem;
                font-weight: 600;
            }

            .skills-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .skill-tag {
                background: #6366f1;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 500;
            }

            .details-footer {
                display: flex;
                justify-content: flex-end;
                gap: 15px;
                padding: 20px 30px 30px 30px;
                border-top: 1px solid #e2e8f0;
                background: #f8fafc;
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: scale(0.9) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }

            @media (max-width: 768px) {
                .details-stats {
                    grid-template-columns: 1fr;
                }

                .details-footer {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup modal event handlers
     * =========================
     *
     * PURPOSE:
     * Sets up all the event listeners for the career details modal including
     * close buttons, backdrop clicks, and action buttons.
     *
     * WHAT IT DOES:
     * 1. Sets up close button functionality (X button)
     * 2. Adds backdrop click to close functionality
     * 3. Handles "Explore Jobs" button click
     * 4. Handles "Choose Template" button click
     * 5. Adds keyboard support (Escape key to close)
     * 6. Manages body scroll prevention when modal is open
     *
     * EVENT HANDLERS:
     * - Close button: Closes modal and restores scroll
     * - Backdrop: Closes modal when clicked
     * - Explore Jobs: Opens job search for the category
     * - Choose Template: Recommends resume template
     * - Escape key: Closes modal
     *
     * @param {HTMLElement} modal - The modal container element
     */
    setupDetailsModalEvents(modal) {
        const closeBtn = modal.querySelector('.details-close');
        const backdrop = modal.querySelector('.details-backdrop');
        const exploreBtn = modal.querySelector('#explore-jobs');
        const chooseBtn = modal.querySelector('#choose-template');

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        exploreBtn?.addEventListener('click', () => {
            this.exploreJobs(this.selectedCategory);
            closeModal();
        });

        chooseBtn?.addEventListener('click', () => {
            this.chooseTemplate(this.careerData[this.selectedCategory]?.recommendedTemplate);
            closeModal();
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    /**
     * Setup job tag interactions
     * =========================
     *
     * PURPOSE:
     * Makes job title tags interactive so users can click on them to show
     * interest in specific roles and get more detailed information.
     *
     * WHAT IT DOES:
     * 1. Finds all job tags on the page
     * 2. Adds click handlers to toggle selection
     * 3. Shows hover previews with job information
     * 4. Updates selected jobs array
     * 5. Triggers job recommendations when jobs are selected
     *
     * INTERACTIVE FEATURES:
     * - Click to select/deselect job tags
     * - Visual feedback for selected tags
     * - Hover previews with job descriptions
     * - Automatic cleanup of preview popups
     */
    setupJobTagInteractions() {
        const jobTags = document.querySelectorAll('.job-tag');

        jobTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.stopPropagation();
                const jobTitle = tag.textContent;

                // Toggle selection
                if (tag.classList.contains('selected')) {
                    tag.classList.remove('selected');
                    this.selectedJobs = this.selectedJobs.filter(job => job !== jobTitle);
                } else {
                    tag.classList.add('selected');
                    this.selectedJobs.push(jobTitle);
                }

                // Update job interests
                this.updateJobInterests();
            });

            // Add hover effects
            tag.addEventListener('mouseenter', () => {
                this.showJobPreview(tag.textContent);
            });

            tag.addEventListener('mouseleave', () => {
                this.hideJobPreview();
            });
        });
    }

    /**
     * Update job interests based on user selections
     * ============================================
     *
     * PURPOSE:
     * Handles what happens when users select job tags. This can trigger
     * recommendations, analytics, or other related functionality.
     *
     * WHAT IT DOES:
     * 1. Checks if any jobs are selected
     * 2. Shows job recommendations if jobs are selected
     * 3. Can trigger analytics tracking
     * 4. Updates UI based on selections
     *
     * CURRENT BEHAVIOR:
     * - Shows job recommendations when jobs are selected
     * - Can be extended for more functionality
     */
    updateJobInterests() {
        // Update UI based on selected jobs
        if (this.selectedJobs.length > 0) {
            this.showJobRecommendations();
        }
    }

    /**
     * Show job preview on hover
     * ========================
     *
     * PURPOSE:
     * Shows a quick preview popup when users hover over job tags to give
     * them more information about the role without clicking.
     *
     * WHAT IT DOES:
     * 1. Creates a preview popup with job information
     * 2. Positions it relative to the job tag
     * 3. Shows for 3 seconds or until mouse leaves
     * 4. Automatically cleans up the popup
     *
     * PREVIEW CONTENT:
     * - Job title as heading
     * - Brief description of the role
     * - Call-to-action to click for more info
     *
     * @param {string} jobTitle - The job title being previewed
     */
    showJobPreview(jobTitle) {
        // Show quick preview of job details
        const preview = document.createElement('div');
        preview.className = 'job-preview';
        preview.innerHTML = `
            <div style="padding: 15px; background: white; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid #e2e8f0;">
                <h4 style="margin: 0 0 10px 0; color: #374151;">${jobTitle}</h4>
                <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Click to explore opportunities and see resume tips for this role.</p>
            </div>
        `;

        Object.assign(preview.style, {
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1000',
            marginTop: '10px'
        });

        document.body.appendChild(preview);

        // Position relative to the tag
        const tagRect = event.target.getBoundingClientRect();
        preview.style.left = tagRect.left + tagRect.width / 2 + 'px';
        preview.style.top = tagRect.bottom + 10 + 'px';

        // Remove on next interaction
        setTimeout(() => {
            if (preview.parentNode) {
                preview.parentNode.removeChild(preview);
            }
        }, 3000);
    }

    /**
     * Hide job preview popup
     * =====================
     *
     * PURPOSE:
     * Removes the job preview popup when the user stops hovering over a job tag.
     *
     * WHAT IT DOES:
     * 1. Finds any existing job preview popups
     * 2. Removes them from the DOM
     * 3. Cleans up event listeners
     */
    hideJobPreview() {
        const preview = document.querySelector('.job-preview');
        if (preview) {
            preview.remove();
        }
    }

    /**
     * Setup career assessment functionality
     * ===================================
     *
     * PURPOSE:
     * Handles the "Find My Career Path" button that starts the career assessment quiz.
     * This quiz helps users discover which AI career path is best for them.
     *
     * WHAT IT DOES:
     * 1. Finds the career assessment button
     * 2. Sets up click handler to start the quiz
     * 3. Creates the assessment modal with questions
     * 4. Handles quiz responses and shows results
     *
     * QUIZ FLOW:
     * 1. User clicks "Find My Career Path"
     * 2. Modal opens with career interest question
     * 3. User selects their area of interest
     * 4. Results show recommended career path
     * 5. Option to choose that career category
     */
    setupCareerAssessment() {
        const assessmentBtn = document.querySelector('.path-finder-content .btn-primary');
        if (assessmentBtn) {
            assessmentBtn.addEventListener('click', () => {
                this.startCareerAssessment();
            });
        }
    }

    /**
     * Start the career assessment quiz
     * ===============================
     *
     * PURPOSE:
     * Creates and displays the career assessment modal with the quiz questions.
     * This helps users identify which AI career path matches their interests.
     *
     * WHAT IT DOES:
     * 1. Creates the assessment modal HTML structure
     * 2. Adds comprehensive CSS styling
     * 3. Sets up event handlers for quiz options
     * 4. Prevents body scrolling while modal is open
     * 5. Adds modal to the page
     *
     * QUIZ QUESTION:
     * "What's your primary interest?" with 6 options:
     * - Technology & Innovation (AI/ML)
     * - Business & Strategy (Data Science)
     * - Design & Creativity (UX/UI)
     * - Science & Research (Research)
     * - Healthcare & Helping Others (Healthcare)
     * - Emerging Technologies (Innovation)
     */
    startCareerAssessment() {
        // Create assessment modal
        const modal = document.createElement('div');
        modal.className = 'assessment-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Career Assessment</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="assessment-question" id="question-container">
                        <h3>What's your primary interest?</h3>
                        <div class="assessment-options">
                            <button class="option-btn" data-answer="ai-ml">Technology & Innovation</button>
                            <button class="option-btn" data-answer="data-science">Business & Strategy</button>
                            <button class="option-btn" data-answer="ux-ui">Design & Creativity</button>
                            <button class="option-btn" data-answer="ai-research">Science & Research</button>
                            <button class="option-btn" data-answer="cloud-devops">Healthcare & Helping Others</button>
                            <button class="option-btn" data-answer="software-dev">Emerging Technologies</button>
                        </div>
                    </div>
                    <div class="assessment-result" id="result-container" style="display: none;">
                        <h3>Your Recommended Career Path</h3>
                        <div class="result-content" id="result-content"></div>
                    </div>
                </div>
            </div>
        `;

        // Add assessment styles
        this.addAssessmentModalStyles();

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Setup assessment events
        this.setupAssessmentEvents(modal);
    }

    /**
     * Add CSS styles for the assessment modal
     * ======================================
     *
     * PURPOSE:
     * Dynamically adds comprehensive CSS styles for the career assessment modal.
     * This ensures the quiz looks professional and functions properly across devices.
     *
     * WHAT IT DOES:
     * 1. Creates a <style> element with detailed CSS
     * 2. Adds it to the document head
     * 3. Includes responsive design for mobile
     * 4. Adds hover effects and animations
     * 5. Styles the quiz options and results
     *
     * STYLES INCLUDED:
     * - Modal positioning and backdrop
     * - Option button styling with hover effects
     * - Result display formatting
     * - Responsive grid layout
     * - Typography and spacing
     * - Animation and transitions
     */
    addAssessmentModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .assessment-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .assessment-modal .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
            }

            .assessment-modal .modal-content {
                background: white;
                border-radius: 16px;
                box-shadow: 0 25px 50px rgba(0,0,0,0.25);
                max-width: 600px;
                width: 90%;
                max-height: 90vh;
                overflow: hidden;
                position: relative;
                z-index: 2;
            }

            .assessment-modal .modal-header {
                padding: 30px 30px 0 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .assessment-modal .modal-header h2 {
                margin: 0;
                color: #374151;
                font-size: 1.8rem;
                font-weight: 600;
            }

            .assessment-modal .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                color: #6b7280;
                cursor: pointer;
                padding: 5px;
            }

            .assessment-modal .modal-body {
                padding: 30px;
            }

            .assessment-question h3 {
                margin-bottom: 30px;
                color: #374151;
                font-size: 1.4rem;
                text-align: center;
            }

            .assessment-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
            }

            .option-btn {
                padding: 15px 20px;
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
                font-weight: 500;
                color: #374151;
            }

            .option-btn:hover {
                background: #6366f1;
                color: white;
                border-color: #6366f1;
                transform: translateY(-2px);
            }

            .assessment-result h3 {
                margin-bottom: 20px;
                color: #374151;
                font-size: 1.5rem;
                text-align: center;
            }

            .result-content {
                text-align: center;
                padding: 20px;
                background: #f8fafc;
                border-radius: 12px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Setup assessment event handlers
     * ==============================
     *
     * PURPOSE:
     * Sets up all the event listeners for the career assessment quiz including
     * option selection, modal closing, and result display.
     *
     * WHAT IT DOES:
     * 1. Sets up close button and backdrop click handlers
     * 2. Adds click handlers for all quiz options
     * 3. Handles quiz responses and shows results
     * 4. Manages modal state (open/close)
     * 5. Restores body scroll when modal closes
     *
     * QUIZ FLOW HANDLING:
     * - User selects an option
     * - Question section hides
     * - Result section shows with recommendation
     * - User can choose the recommended career
     *
     * @param {HTMLElement} modal - The assessment modal element
     */
    setupAssessmentEvents(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        const options = modal.querySelectorAll('.option-btn');
        const questionContainer = modal.querySelector('#question-container');
        const resultContainer = modal.querySelector('#result-container');
        const resultContent = modal.querySelector('#result-content');

        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);

        options.forEach(option => {
            option.addEventListener('click', () => {
                const answer = option.dataset.answer;
                this.showAssessmentResult(answer, resultContainer, resultContent);
            });
        });
    }

    /**
     * Show assessment results
     * ======================
     *
     * PURPOSE:
     * Displays the personalized career recommendation based on the user's quiz response.
     * Shows detailed information about the recommended career path.
     *
     * WHAT IT DOES:
     * 1. Gets career data for the selected category
     * 2. Hides the question section
     * 3. Shows the result section
     * 4. Populates result with career information
     * 5. Adds button to choose the recommended career
     *
     * RESULT CONTENT INCLUDES:
     * - Career category name and description
     * - Average salary and growth rate
     * - Top skills needed
     * - Button to choose this career path
     *
