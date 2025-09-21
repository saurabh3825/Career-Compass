/**
 * Career Exploration Interactions
 * Handles career category selection, job tag interactions, and career assessment
 */

class CareerExploration {
    constructor() {
        this.selectedCategory = null;
        this.selectedJobs = [];
        this.careerData = {
            ai-ml: {
                name: 'Technology',
                description: 'Innovative field focusing on software, hardware, and digital solutions',
                averageSalary: '$95,000',
                growthRate: '22%',
                topSkills: ['Programming', 'Problem Solving', 'Cloud Computing', 'AI/ML'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
            },
            data-software-dev: {
                name: 'Business',
                description: 'Strategic roles in management, operations, and entrepreneurship',
                averageSalary: '$85,000',
                growthRate: '14%',
                topSkills: ['Leadership', 'Strategy', 'Communication', 'Analytics'],
                recommendedTemplate: 'classic',
                color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
            },
            cloud-devops: {
                name: 'Design',
                description: 'Creative field combining aesthetics, user experience, and innovation',
                averageSalary: '$75,000',
                growthRate: '13%',
                topSkills: ['Creativity', 'User Research', 'Design Tools', 'Prototyping'],
                recommendedTemplate: 'creative',
                color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
            },
            software-dev: {
                name: 'Science',
                description: 'Research and development roles in laboratories and scientific institutions',
                averageSalary: '$88,000',
                growthRate: '17%',
                topSkills: ['Research', 'Data Analysis', 'Lab Techniques', 'Critical Thinking'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
            },
            ux-ui: {
                name: 'Healthcare',
                description: 'Essential services providing medical care and health management',
                averageSalary: '$82,000',
                growthRate: '16%',
                topSkills: ['Patient Care', 'Medical Knowledge', 'Communication', 'Attention to Detail'],
                recommendedTemplate: 'classic',
                color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            },
            ai-research: {
                name: 'Emerging Fields',
                description: 'Cutting-edge industries shaping the future of ai-ml and society',
                averageSalary: '$92,000',
                growthRate: '25%',
                topSkills: ['Adaptability', 'Innovation', 'Technical Skills', 'Problem Solving'],
                recommendedTemplate: 'modern',
                color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            }
        };

        this.init();
    }

    init() {
        this.setupCategorySelection();
        this.setupJobTagInteractions();
        this.setupCareerAssessment();
        this.setupKeyboardNavigation();
        this.initializeAnimations();
    }

    setupCategorySelection() {
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

    selectCategory(category, cardElement) {
        if (!this.careerData[category]) return;

        this.selectedCategory = category;
        const data = this.careerData[category];

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

    updateJobInterests() {
        // Update UI based on selected jobs
        if (this.selectedJobs.length > 0) {
            this.showJobRecommendations();
        }
    }

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

    hideJobPreview() {
        const preview = document.querySelector('.job-preview');
        if (preview) {
            preview.remove();
        }
    }

    setupCareerAssessment() {
        const assessmentBtn = document.querySelector('.path-finder-content .btn-primary');
        if (assessmentBtn) {
            assessmentBtn.addEventListener('click', () => {
                this.startCareerAssessment();
            });
        }
    }

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
                            <button class="option-btn" data-answer="data-software-dev">Business & Strategy</button>
                            <button class="option-btn" data-answer="cloud-devops">Design & Creativity</button>
                            <button class="option-btn" data-answer="software-dev">Science & Research</button>
                            <button class="option-btn" data-answer="ux-ui">Healthcare & Helping Others</button>
                            <button class="option-btn" data-answer="ai-research">Emerging Technologies</button>
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

    showAssessmentResult(category, resultContainer, resultContent) {
        const data = this.careerData[category];
        if (!data) return;

        resultContent.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #6366f1; font-size: 1.3rem; margin-bottom: 10px;">${data.name}</h4>
                <p style="color: #6b7280; margin-bottom: 20px;">${data.description}</p>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-bottom: 20px;">
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: 700; color: #6366f1;">${data.averageSalary}</div>
                    <div style="font-size: 0.8rem; color: #6b7280;">Average Salary</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: 700; color: #6366f1;">${data.growthRate}</div>
                    <div style="font-size: 0.8rem; color: #6b7280;">Growth Rate</div>
                </div>
            </div>
            <div style="margin-bottom: 20px;">
                <h5 style="margin-bottom: 10px; color: #374151;">Top Skills Needed:</h5>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${data.topSkills.map(skill => `<span style="background: #6366f1; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">${skill}</span>`).join('')}
                </div>
            </div>
            <button class="btn-primary" onclick="selectCareerCategory('${category}')" style="margin-top: 10px;">
                Choose ${data.name} Template
            </button>
        `;

        // Hide question, show result
        document.getElementById('question-container').style.display = 'none';
        resultContainer.style.display = 'block';
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Arrow key navigation for career categories
            if (e.key.startsWith('Arrow')) {
                const cards = Array.from(document.querySelectorAll('.career-category-card'));
                const currentIndex = cards.findIndex(card => card === document.activeElement);

                let nextIndex;
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        nextIndex = (currentIndex + 1) % cards.length;
                        cards[nextIndex].focus();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
                        cards[nextIndex].focus();
                        break;
                }
            }
        });
    }

    initializeAnimations() {
        // Add entrance animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                }
            });
        });

        document.querySelectorAll('.career-category-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // Public methods
    recommendTemplate(templateType) {
        if (window.templateInteractions) {
            window.templateInteractions.selectTemplate(templateType);
        }
    }

    exploreJobs(category) {
        // Open job search for the category
        const searchQuery = encodeURIComponent(`${category} jobs`);
        window.open(`https://www.indeed.com/jobs?q=${searchQuery}`, '_blank');
    }

    chooseTemplate(templateType) {
        this.recommendTemplate(templateType);
    }

    trackCareerSelection(category) {
        // Track user selection
        if (window.advancedResumeFeatures) {
            window.advancedResumeFeatures.trackEvent('Career', 'Category_Select', category);
        }
    }

    showSelectionNotification(categoryName) {
        if (window.advancedResumeFeatures) {
            window.advancedResumeFeatures.showNotification(`${categoryName} career path selected!`, 'success');
        }
    }
}

// Global functions for HTML onclick handlers
function selectCareerCategory(category) {
    if (window.careerExploration) {
        const card = document.querySelector(`[data-category="${category}"]`);
        if (card) {
            window.careerExploration.selectCategory(category, card);
        }
    }
}

function startCareerAssessment() {
    if (window.careerExploration) {
        window.careerExploration.startCareerAssessment();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.careerExploration = new CareerExploration();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CareerExploration;
}
