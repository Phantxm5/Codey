// Modified languages.js to disable all languages except Python

document.addEventListener('DOMContentLoaded', function() {
    // Initialize languages event listeners
    initLanguagesEventListeners();
});

// Available programming languages data
const availableLanguages = [
    {
        id: 'html',
        name: 'HTML',
        description: 'The standard markup language for creating web pages.',
        disabled: true
    },
    {
        id: 'css',
        name: 'CSS',
        description: 'The language used for styling web pages.',
        disabled: true
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        description: 'The programming language of the web.',
        disabled: true
    },
    {
        id: 'python',
        name: 'Python',
        description: 'A versatile programming language known for its readability.',
        disabled: false
    },
    {
        id: 'csharp',
        name: 'C#',
        description: 'A modern, object-oriented programming language by Microsoft.',
        disabled: true
    },
    {
        id: 'cpp',
        name: 'C/C++',
        description: 'Powerful programming languages for system-level development.',
        disabled: true
    },
    {
        id: 'setup',
        name: 'Setup Tutorial',
        description: 'Learn how to set up your coding environment with VS Code and alternatives.',
        disabled: true
    }
];

// Initialize languages event listeners
function initLanguagesEventListeners() {
    // Back button from language selection to home
    document.getElementById('back-to-home-btn').addEventListener('click', function() {
        showScreen('home-screen');
    });
}

// Load available languages for selection
function loadAvailableLanguages() {
    const languagesContainer = document.getElementById('available-languages');
    languagesContainer.innerHTML = '';
    
    availableLanguages.forEach(language => {
        // Skip languages the user already has
        if (currentUser && currentUser.languages && 
            currentUser.languages.some(l => l.id === language.id)) {
            return;
        }
        
        const languageCard = document.createElement('div');
        languageCard.className = 'language-card';
        languageCard.dataset.language = language.id;
        
        // Add disabled class and coming soon label if language is disabled
        if (language.disabled) {
            languageCard.classList.add('disabled');
            
            // Create and add the Coming Soon label
            const comingSoonLabel = document.createElement('div');
            comingSoonLabel.className = 'coming-soon-label';
            comingSoonLabel.textContent = 'Coming Soon';
            languageCard.appendChild(comingSoonLabel);
            
            // Create and add tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'This language will be available soon!';
            languageCard.appendChild(tooltip);
        }
        
        const icon = document.createElement('div');
        icon.className = 'language-icon';
        icon.innerHTML = getLanguageIcon(language.id);
        
        const name = document.createElement('h3');
        name.textContent = language.name;
        
        const description = document.createElement('p');
        description.textContent = language.description;
        
        languageCard.appendChild(icon);
        languageCard.appendChild(name);
        languageCard.appendChild(description);
        
        // Add event listener to select language only if not disabled
        if (!language.disabled) {
            languageCard.addEventListener('click', function() {
                selectLanguage(language);
            });
        } else {
            // For disabled languages, add a click event that shows a message
            languageCard.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                alert(`${language.name} will be available soon!`);
            });
        }
        
        languagesContainer.appendChild(languageCard);
    });
    
    // Force immediate application of styles
    document.querySelectorAll('.language-card.disabled').forEach(card => {
        card.style.position = 'relative';
        card.style.opacity = '0.7';
        card.style.cursor = 'not-allowed';
        card.style.overflow = 'hidden';
        
        // Make sure Coming Soon label is visible with inline styles
        const label = card.querySelector('.coming-soon-label');
        if (label) {
            label.style.position = 'absolute';
            label.style.top = '10px';
            label.style.right = '10px';
            label.style.backgroundColor = '#ff3b30';
            label.style.color = 'white';
            label.style.padding = '5px 10px';
            label.style.borderRadius = '4px';
            label.style.fontWeight = 'bold';
            label.style.fontSize = '0.8rem';
            label.style.zIndex = '2';
            label.style.transform = 'rotate(5deg)';
            label.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        }
    });
}

// Select a language to learn
function selectLanguage(language) {
    if (!currentUser || language.disabled) return;
    
    // Add language to user's languages if not already added
    if (!currentUser.languages) {
        currentUser.languages = [];
    }
    
    if (!currentUser.languages.some(l => l.id === language.id)) {
        const userLanguage = {
            id: language.id,
            name: language.name,
            level: 1,
            xp: 0,
            progress: 0,
            completedLessons: []
        };
        
        currentUser.languages.push(userLanguage);
        
        // Update user in local storage
        updateCurrentUser();
        
        // Redirect to home screen without showing alert
        showScreen('home-screen');
        loadUserLanguages();
    }
}

// Update current user in local storage
function updateCurrentUser() {
    if (!currentUser) return;
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Also update user in users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}
