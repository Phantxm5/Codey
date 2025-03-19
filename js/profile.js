// Profile related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize profile event listeners
    initProfileEventListeners();
});

// Initialize profile event listeners
function initProfileEventListeners() {
    // Add logout button functionality if it exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }
}

// Load user profile
function loadUserProfile() {
    if (!currentUser) return;
    
    // Set username
    document.getElementById('profile-username').textContent = currentUser.username;
    
    // Set account creation date
    const createdDate = new Date(currentUser.createdAt);
    document.getElementById('profile-created').textContent = createdDate.toLocaleDateString();
    
    // Set total XP
    let totalXP = 0;
    if (currentUser.languages) {
        currentUser.languages.forEach(language => {
            totalXP += language.xp || 0;
        });
    }
    document.getElementById('profile-xp').textContent = totalXP;
    
    // Load languages
    loadProfileLanguages();
    
    // Load titles
    loadProfileTitles();
}

// Load user languages in profile
function loadProfileLanguages() {
    const languagesContainer = document.getElementById('profile-languages-list');
    languagesContainer.innerHTML = '';
    
    if (!currentUser.languages || currentUser.languages.length === 0) {
        languagesContainer.innerHTML = '<p>You haven\'t selected any languages yet.</p>';
        return;
    }
    
    const languagesList = document.createElement('ul');
    languagesList.className = 'profile-languages-list';
    
    currentUser.languages.forEach(language => {
        const languageItem = document.createElement('li');
        languageItem.className = 'profile-language-item';
        
        const languageIcon = document.createElement('span');
        languageIcon.className = 'language-icon';
        languageIcon.innerHTML = getLanguageIcon(language.id);
        
        const languageName = document.createElement('span');
        languageName.className = 'language-name';
        languageName.textContent = language.name;
        
        const languageLevel = document.createElement('span');
        languageLevel.className = 'language-level';
        languageLevel.textContent = `Level ${language.level || 1}`;
        
        const languageXP = document.createElement('span');
        languageXP.className = 'language-xp';
        languageXP.textContent = `${language.xp || 0} XP`;
        
        languageItem.appendChild(languageIcon);
        languageItem.appendChild(languageName);
        languageItem.appendChild(languageLevel);
        languageItem.appendChild(languageXP);
        
        languagesList.appendChild(languageItem);
    });
    
    languagesContainer.appendChild(languagesList);
}

// Load user titles in profile
function loadProfileTitles() {
    const titlesContainer = document.getElementById('profile-titles-list');
    titlesContainer.innerHTML = '';
    
    if (!currentUser.titles || currentUser.titles.length === 0) {
        titlesContainer.innerHTML = '<p>You haven\'t earned any titles yet. Complete level 30 challenges to earn language mastery titles!</p>';
        return;
    }
    
    const titlesList = document.createElement('ul');
    titlesList.className = 'profile-titles-list';
    
    currentUser.titles.forEach(title => {
        const titleItem = document.createElement('li');
        titleItem.className = 'profile-title-item';
        titleItem.innerHTML = `<i class="fas fa-award"></i> ${title}`;
        
        titlesList.appendChild(titleItem);
    });
    
    titlesContainer.appendChild(titlesList);
}
