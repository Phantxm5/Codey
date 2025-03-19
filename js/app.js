// Main application file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Global variables
let currentUser = null;
let currentLanguage = null;
let currentLevel = null;
let currentLesson = null;

// Initialize the application
function initApp() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize themes
    initThemes();
}

// Check if user is logged in
function checkAuthStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        showScreen('home-screen');
        loadUserLanguages();
    } else {
        // Allow users to browse without an account
        currentUser = {
            id: 'guest',
            username: 'Guest',
            createdAt: new Date().toISOString(),
            languages: [],
            xp: 0,
            titles: []
        };
        showScreen('home-screen');
        // Show welcome message for first-time visitors
        showWelcomeMessage();
    }
}

// Show welcome message for first-time visitors
function showWelcomeMessage() {
    // Check if welcome section already exists
    if (document.querySelector('.welcome-section')) return;
    
    // Add welcome section before the language grid
    const welcomeSection = document.createElement('div');
    welcomeSection.className = 'welcome-section';
    welcomeSection.innerHTML = `
        <h2>Welcome to CodeLingo!</h2>
        <div class="welcome-content">
            <p>CodeLingo is an interactive platform designed to help you learn programming languages through a structured, engaging approach.</p>
            <p>Here's how to get started:</p>
            <ol>
                <li>Click "Add New Language" to choose a programming language to learn</li>
                <li>Progress through levels and complete lessons to earn XP</li>
                <li>Take on coding challenges at milestone levels (10, 20, and 30)</li>
                <li>Earn titles and track your progress</li>
            </ol>
            <p>You're currently browsing as a guest. <a href="#" id="create-account-link">Create an account</a> to save your progress!</p>
        </div>
    `;
    
    // Insert welcome section before the language grid
    const homeScreen = document.getElementById('home-screen');
    const languagesContainer = document.getElementById('selected-languages');
    homeScreen.insertBefore(welcomeSection, languagesContainer);
    
    // Add event listener to the create account link
    document.getElementById('create-account-link').addEventListener('click', function(e) {
        e.preventDefault();
        showScreen('auth-screen');
    });
}

// Initialize event listeners
function initEventListeners() {
    // Navigation links
    document.getElementById('home-link').addEventListener('click', function(e) {
        e.preventDefault();
        showScreen('home-screen');
    });
    
    // Logo as home link
    document.getElementById('logo-home-link').addEventListener('click', function() {
        showScreen('home-screen');
    });
    
    document.getElementById('profile-link').addEventListener('click', function(e) {
        e.preventDefault();
        showScreen('profile-screen');
        loadUserProfile();
    });
    
    // Add language button
    document.getElementById('add-language-btn').addEventListener('click', function() {
        showScreen('language-selection-screen');
        loadAvailableLanguages();
    });
}

// Show a specific screen
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the requested screen
    document.getElementById(screenId).classList.add('active');
    
    // Update active navigation link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (screenId === 'home-screen') {
        document.getElementById('home-link').classList.add('active');
    } else if (screenId === 'profile-screen') {
        document.getElementById('profile-link').classList.add('active');
    }
}

// Load user languages
function loadUserLanguages() {
    if (!currentUser || !currentUser.languages) return;
    
    const languagesContainer = document.getElementById('selected-languages');
    languagesContainer.innerHTML = '';
    
    if (currentUser.languages.length === 0) {
        languagesContainer.innerHTML = '<p>You haven\'t selected any languages yet. Click "Add New Language" to get started.</p>';
        return;
    }
    
    currentUser.languages.forEach(language => {
        const languageCard = createLanguageCard(language);
        languagesContainer.appendChild(languageCard);
    });
}

// Create a language card element
function createLanguageCard(language) {
    const card = document.createElement('div');
    card.className = 'language-card';
    card.dataset.language = language.id;
    
    const icon = document.createElement('div');
    icon.className = 'language-icon';
    icon.innerHTML = getLanguageIcon(language.id);
    
    const name = document.createElement('h3');
    name.textContent = language.name;
    
    const progress = document.createElement('div');
    progress.className = 'progress-container';
    progress.innerHTML = `
        <div class="progress-bar">
            <div class="progress" style="width: ${language.progress || 0}%"></div>
        </div>
        <div class="progress-info">
            <span>${language.xp || 0} XP</span>
            <span>Level ${language.level || 1}</span>
        </div>
    `;
    
    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(progress);
    
    // Add event listener to open language levels
    card.addEventListener('click', function() {
        currentLanguage = language;
        showScreen('levels-screen');
        loadLanguageLevels(language);
    });
    
    return card;
}

// Get language icon based on language ID
function getLanguageIcon(languageId) {
    const icons = {
        'html': '<i class="fab fa-html5" style="color: #e34c26;"></i>',
        'css': '<i class="fab fa-css3-alt" style="color: #264de4;"></i>',
        'javascript': '<i class="fab fa-js-square" style="color: #f0db4f;"></i>',
        'python': '<i class="fab fa-python" style="color: #306998;"></i>',
        'csharp': '<i class="fab fa-microsoft" style="color: #9b4f96;"></i>',
        'cpp': '<i class="fas fa-code" style="color: #00599c;"></i>',
        'setup': '<i class="fas fa-laptop-code" style="color: #6c757d;"></i>'
    };
    
    return icons[languageId] || '<i class="fas fa-code"></i>';
}
