// Enhanced languages functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced language features
    initEnhancedLanguages();
});

// Enhanced language data with additional properties
const enhancedLanguages = [
    {
        id: 'html',
        name: 'HTML',
        description: 'The standard markup language for creating web pages.',
        color: '#e34c26',
        colorLight: '#f06529',
        codeSnippet: '<div class="container">\n  <h1>Hello World</h1>\n  <p>Welcome to HTML</p>\n</div>',
        level: 'beginner'
    },
    {
        id: 'css',
        name: 'CSS',
        description: 'The language used for styling web pages.',
        color: '#264de4',
        colorLight: '#2965f1',
        codeSnippet: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
        level: 'beginner'
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        description: 'The programming language of the web.',
        color: '#f0db4f',
        colorLight: '#f7df1e',
        codeSnippet: 'function greeting(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greeting("World"));',
        level: 'intermediate'
    },
    {
        id: 'python',
        name: 'Python',
        description: 'A versatile programming language known for its readability.',
        color: '#306998',
        colorLight: '#4584b6',
        codeSnippet: 'def greeting(name):\n    return f"Hello, {name}!"\n\nprint(greeting("World"))',
        level: 'intermediate'
    },
    {
        id: 'csharp',
        name: 'C#',
        description: 'A modern, object-oriented programming language by Microsoft.',
        color: '#9b4f96',
        colorLight: '#b161ac',
        codeSnippet: 'class Program {\n    static void Main() {\n        Console.WriteLine("Hello World!");\n    }\n}',
        level: 'advanced'
    },
    {
        id: 'cpp',
        name: 'C/C++',
        description: 'Powerful programming languages for system-level development.',
        color: '#00599c',
        colorLight: '#0086d4',
        codeSnippet: '#include <iostream>\n\nint main() {\n    std::cout << "Hello World!";\n    return 0;\n}',
        level: 'advanced'
    },
    {
        id: 'setup',
        name: 'Setup Tutorial',
        description: 'Learn how to set up your coding environment with VS Code and alternatives.',
        color: '#6c757d',
        colorLight: '#868e96',
        codeSnippet: '// Install VS Code\n// Set up extensions\n// Configure settings',
        level: 'beginner'
    }
];

// Initialize enhanced language features
function initEnhancedLanguages() {
    // Remove the conflicting event listener for the Add Language button
    // Let app.js handle the click event and use loadAvailableLanguages
    
    // Load user languages with enhanced styling
    loadEnhancedUserLanguages();
    
    // Add hero section code snippets
    addCodeSnippetsToHero();
    
    // Override the loadAvailableLanguages function to use our enhanced version
    window.originalLoadAvailableLanguages = window.loadAvailableLanguages;
    window.loadAvailableLanguages = loadEnhancedLanguages;
}

// Add code snippets to hero section
function addCodeSnippetsToHero() {
    const homeHero = document.querySelector('.home-hero');
    if (homeHero) {
        // Add code snippet elements
        const snippet1 = document.createElement('div');
        snippet1.className = 'code-snippet';
        snippet1.textContent = 'function learnToCode() { return "Become a developer"; }';
        
        const snippet2 = document.createElement('div');
        snippet2.className = 'code-snippet';
        snippet2.textContent = 'const future = await yourPotential.unlock();';
        
        homeHero.appendChild(snippet1);
        homeHero.appendChild(snippet2);
    }
}

// Load enhanced available languages
function loadEnhancedLanguages() {
    const languagesContainer = document.getElementById('available-languages');
    if (!languagesContainer) return;
    
    languagesContainer.innerHTML = '';
    
    enhancedLanguages.forEach(language => {
        // Skip languages the user already has
        if (currentUser && currentUser.languages && 
            currentUser.languages.some(l => l.id === language.id)) {
            return;
        }
        
        // Check if language is disabled in the original availableLanguages array
        const originalLanguage = availableLanguages.find(l => l.id === language.id);
        const isDisabled = originalLanguage ? originalLanguage.disabled : false;
        
        const languageCard = document.createElement('div');
        languageCard.className = `language-card language-${language.id}`;
        languageCard.dataset.language = language.id;
        
        // Add disabled class if language is disabled
        if (isDisabled) {
            languageCard.classList.add('disabled');
            
            // Create and add the Coming Soon label
            const comingSoonLabel = document.createElement('div');
            comingSoonLabel.className = 'coming-soon-label';
            comingSoonLabel.textContent = 'Coming Soon';
            comingSoonLabel.style.position = 'absolute';
            comingSoonLabel.style.top = '10px';
            comingSoonLabel.style.right = '10px';
            comingSoonLabel.style.backgroundColor = '#ff3b30';
            comingSoonLabel.style.color = 'white';
            comingSoonLabel.style.padding = '5px 10px';
            comingSoonLabel.style.borderRadius = '4px';
            comingSoonLabel.style.fontWeight = 'bold';
            comingSoonLabel.style.fontSize = '0.8rem';
            comingSoonLabel.style.zIndex = '2';
            comingSoonLabel.style.transform = 'rotate(5deg)';
            comingSoonLabel.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            languageCard.appendChild(comingSoonLabel);
        }
        
        const icon = document.createElement('div');
        icon.className = 'language-icon';
        icon.innerHTML = getLanguageIcon(language.id);
        
        const name = document.createElement('h3');
        name.textContent = language.name;
        
        const description = document.createElement('p');
        description.className = 'language-description';
        description.textContent = language.description;
        
        // Add skill level indicator
        const skillLevel = document.createElement('div');
        skillLevel.className = 'skill-level';
        
        const skillLabel = document.createElement('span');
        skillLabel.textContent = 'Difficulty:';
        
        const skillDots = document.createElement('div');
        skillDots.className = 'skill-dots';
        
        // Create difficulty dots based on level
        const difficultyLevel = language.level === 'beginner' ? 1 : 
                               language.level === 'intermediate' ? 2 : 3;
        
        for (let i = 1; i <= 3; i++) {
            const dot = document.createElement('span');
            dot.className = `skill-dot ${i <= difficultyLevel ? 'active' : ''}`;
            skillDots.appendChild(dot);
        }
        
        skillLevel.appendChild(skillLabel);
        skillLevel.appendChild(skillDots);
        
        // Add code preview
        const codePreview = document.createElement('div');
        codePreview.className = 'code-preview';
        
        const languageTag = document.createElement('span');
        languageTag.className = 'language-tag';
        languageTag.textContent = language.name;
        
        const pre = document.createElement('pre');
        pre.textContent = language.codeSnippet;
        
        codePreview.appendChild(languageTag);
        codePreview.appendChild(pre);
        
        // Assemble the card
        languageCard.appendChild(icon);
        languageCard.appendChild(name);
        languageCard.appendChild(description);
        languageCard.appendChild(skillLevel);
        languageCard.appendChild(codePreview);
        
        // Add event listener to select language or show message for disabled languages
        if (isDisabled) {
            languageCard.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                alert(`${language.name} will be available soon!`);
            });
        } else {
            languageCard.addEventListener('click', function() {
                selectLanguage(language);
            });
        }
        
        languagesContainer.appendChild(languageCard);
    });
}

// Load user languages with enhanced styling
function loadEnhancedUserLanguages() {
    if (!currentUser || !currentUser.languages) return;
    
    const languagesContainer = document.getElementById('selected-languages');
    if (!languagesContainer) return;
    
    languagesContainer.innerHTML = '';
    
    // Add section header
    const sectionHeader = document.createElement('div');
    sectionHeader.className = 'section-header';
    const headerTitle = document.createElement('h2');
    headerTitle.textContent = 'Your Languages';
    sectionHeader.appendChild(headerTitle);
    
    // Replace the existing h2 with our enhanced section header
    const existingHeader = document.querySelector('#home-screen h2:not(.home-hero h2)');
    if (existingHeader) {
        existingHeader.parentNode.replaceChild(sectionHeader, existingHeader);
    }
    
    if (currentUser.languages.length === 0) {
        languagesContainer.innerHTML = '<p>You haven\'t selected any languages yet. Click "Add New Language" to get started.</p>';
        return;
    }
    
    currentUser.languages.forEach(language => {
        // Find enhanced language data
        const enhancedData = enhancedLanguages.find(l => l.id === language.id) || {};
        
        const languageCard = document.createElement('div');
        languageCard.className = `language-card language-${language.id}`;
        languageCard.dataset.language = language.id;
        
        const icon = document.createElement('div');
        icon.className = 'language-icon';
        icon.innerHTML = getLanguageIcon(language.id);
        
        const name = document.createElement('h3');
        name.textContent = language.name;
        
        // Add progress container with enhanced styling
        const progress = document.createElement('div');
        progress.className = 'progress-container';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'progress';
        progressIndicator.style.width = `${language.progress || 0}%`;
        
        const progressInfo = document.createElement('div');
        progressInfo.className = 'progress-info';
        
        const xpSpan = document.createElement('span');
        xpSpan.className = 'xp';
        xpSpan.textContent = `${language.xp || 0} XP`;
        
        const levelSpan = document.createElement('span');
        levelSpan.className = 'level';
        levelSpan.textContent = `Level ${language.level || 1}`;
        
        // Add code preview if available
        if (enhancedData.codeSnippet) {
            const codePreview = document.createElement('div');
            codePreview.className = 'code-preview';
            
            const languageTag = document.createElement('span');
            languageTag.className = 'language-tag';
            languageTag.textContent = language.name;
            
            const pre = document.createElement('pre');
            pre.textContent = enhancedData.codeSnippet;
            
            codePreview.appendChild(languageTag);
            codePreview.appendChild(pre);
            languageCard.appendChild(codePreview);
        }
        
        // Assemble the progress elements
        progressBar.appendChild(progressIndicator);
        progressInfo.appendChild(xpSpan);
        progressInfo.appendChild(levelSpan);
        progress.appendChild(progressBar);
        progress.appendChild(progressInfo);
        
        // Assemble the card
        languageCard.appendChild(icon);
        languageCard.appendChild(name);
        languageCard.appendChild(progress);
        
        // Add event listener to open language levels
        languageCard.addEventListener('click', function() {
            currentLanguage = language;
            showScreen('levels-screen');
            loadLanguageLevels(language);
        });
        
        languagesContainer.appendChild(languageCard);
    });
}

// Enhanced language icons with more vibrant styling
function getEnhancedLanguageIcon(languageId) {
    const icons = {
        'html': `<i class="fab fa-html5" style="color: #e34c26; text-shadow: 0 0 10px rgba(227, 76, 38, 0.3);"></i>`,
        'css': `<i class="fab fa-css3-alt" style="color: #264de4; text-shadow: 0 0 10px rgba(38, 77, 228, 0.3);"></i>`,
        'javascript': `<i class="fab fa-js-square" style="color: #f0db4f; text-shadow: 0 0 10px rgba(240, 219, 79, 0.3);"></i>`,
        'python': `<i class="fab fa-python" style="color: #306998; text-shadow: 0 0 10px rgba(48, 105, 152, 0.3);"></i>`,
        'csharp': `<i class="fab fa-microsoft" style="color: #9b4f96; text-shadow: 0 0 10px rgba(155, 79, 150, 0.3);"></i>`,
        'cpp': `<i class="fas fa-code" style="color: #00599c; text-shadow: 0 0 10px rgba(0, 89, 156, 0.3);"></i>`,
        'setup': `<i class="fas fa-laptop-code" style="color: #6c757d; text-shadow: 0 0 10px rgba(108, 117, 125, 0.3);"></i>`
    };
    
    return icons[languageId] || '<i class="fas fa-code"></i>';
}

// Override the original getLanguageIcon function to use our enhanced version
window.originalGetLanguageIcon = window.getLanguageIcon;
window.getLanguageIcon = getEnhancedLanguageIcon;
