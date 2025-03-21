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
        
        // Update navigation for logged-in user
        updateNavigation(false);
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
        
        // Update navigation for guest user
        updateNavigation(true);
        
        // Show welcome message for first-time visitors
        showWelcomeMessage();
    }
}

// Update navigation based on user status
function updateNavigation(isGuest) {
    const profileLink = document.getElementById('profile-link');
    
    if (isGuest) {
        // Change profile link to login/register for guests
        profileLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login/Register';
    } else {
        // Show profile link for logged-in users
        profileLink.innerHTML = '<i class="fas fa-user"></i> Profile';
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
        <h2>Welcome to Codey!</h2>
        <div class="welcome-content">
            <p>Codey is an interactive platform designed to help you learn programming languages through a structured, engaging approach.</p>
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
    
    // My Languages link
    document.getElementById('my-languages-link').addEventListener('click', function(e) {
        e.preventDefault();
        showScreen('my-languages-screen');
        loadMyLanguagesPage();
    });
    
    // Logo as home link
    document.getElementById('logo-home-link').addEventListener('click', function() {
        showScreen('home-screen');
    });
    
    // Profile/Login link - behavior changes based on user status
    document.getElementById('profile-link').addEventListener('click', function(e) {
        e.preventDefault();
        if (currentUser && currentUser.id !== 'guest') {
            // Logged in user - show profile
            showScreen('profile-screen');
            loadUserProfile();
        } else {
            // Guest user - show login/register screen
            showScreen('auth-screen');
        }
    });
    
    // Add language button on home screen
    document.getElementById('add-language-btn').addEventListener('click', function() {
        showScreen('language-selection-screen');
        loadAvailableLanguages();
    });
    
    // Add language button on My Languages screen
    document.getElementById('add-language-btn-my-languages').addEventListener('click', function() {
        showScreen('language-selection-screen');
        loadAvailableLanguages();
    });
    
    // Add first language button in empty state
    document.getElementById('add-first-language-btn').addEventListener('click', function() {
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
    
    // Check authentication status when navigating to home screen
    if (screenId === 'home-screen') {
        document.getElementById('home-link').classList.add('active');
        
        // Re-check authentication status when navigating to home
        // This ensures proper handling after logout
        const userData = localStorage.getItem('currentUser');
        if (!userData && currentUser && currentUser.id !== 'guest') {
            // User was logged out but currentUser variable wasn't reset properly
            // Create a fresh guest user
            currentUser = {
                id: 'guest',
                username: 'Guest',
                createdAt: new Date().toISOString(),
                languages: [],
                xp: 0,
                titles: []
            };
            showWelcomeMessage();
            
            // Update navigation for guest user
            updateNavigation(true);
        }
    } else if (screenId === 'profile-screen') {
        document.getElementById('profile-link').classList.add('active');
        
        // Prevent guests from accessing profile screen
        if (currentUser && currentUser.id === 'guest') {
            // Redirect guests to auth screen instead
            document.getElementById('profile-screen').classList.remove('active');
            document.getElementById('auth-screen').classList.add('active');
            return;
        }
    }
}

// Load user languages
function loadUserLanguages() {
    if (!currentUser || !currentUser.languages) return;
    
    // Update My Languages page
    loadMyLanguagesPage();
    
    // For backward compatibility, also update the home screen languages section
    const languagesContainer = document.getElementById('selected-languages');
    if (languagesContainer) {
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
