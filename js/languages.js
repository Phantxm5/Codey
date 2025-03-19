// Languages related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize languages event listeners
    initLanguagesEventListeners();
});

// Available programming languages data
const availableLanguages = [
    {
        id: 'html',
        name: 'HTML',
        description: 'The standard markup language for creating web pages.'
    },
    {
        id: 'css',
        name: 'CSS',
        description: 'The language used for styling web pages.'
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        description: 'The programming language of the web.'
    },
    {
        id: 'python',
        name: 'Python',
        description: 'A versatile programming language known for its readability.'
    },
    {
        id: 'csharp',
        name: 'C#',
        description: 'A modern, object-oriented programming language by Microsoft.'
    },
    {
        id: 'cpp',
        name: 'C/C++',
        description: 'Powerful programming languages for system-level development.'
    },
    {
        id: 'setup',
        name: 'Setup Tutorial',
        description: 'Learn how to set up your coding environment with VS Code and alternatives.'
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
        
        // Add event listener to select language
        languageCard.addEventListener('click', function() {
            selectLanguage(language);
        });
        
        languagesContainer.appendChild(languageCard);
    });
}

// Select a language to learn
function selectLanguage(language) {
    if (!currentUser) return;
    
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
        
        // Show success message
        alert(`${language.name} has been added to your languages!`);
        
        // Redirect to home screen
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
