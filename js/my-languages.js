// Function to handle My Languages page
function loadMyLanguagesPage() {
  const myLanguagesGrid = document.getElementById('my-languages-grid');
  const emptyState = document.getElementById('empty-languages-state');
  
  if (!currentUser || !currentUser.languages) return;
  
  // Clear the container
  myLanguagesGrid.innerHTML = '';
  
  // Show empty state or language cards
  if (currentUser.languages.length === 0) {
    emptyState.style.display = 'block';
    myLanguagesGrid.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    myLanguagesGrid.style.display = 'grid';
    
    // Create language cards for each language
    currentUser.languages.forEach(language => {
      const languageCard = createMyLanguageCard(language);
      myLanguagesGrid.appendChild(languageCard);
    });
  }
}

// Create a modern language card for My Languages page
function createMyLanguageCard(language) {
  const card = document.createElement('div');
  card.className = 'language-card';
  card.dataset.language = language.id;
  
  // Get language icon and image URL
  const iconHtml = getLanguageIcon(language.id);
  const imageUrl = getLanguageImageUrl(language.id);
  
  // Calculate progress percentage
  const progressPercent = language.progress || 0;
  
  // Create card HTML structure
  card.innerHTML = `
    <div class="language-card-header">
      <img src="${imageUrl}" alt="${language.name}">
      <h3>${language.name}</h3>
    </div>
    <div class="language-card-body">
      <div class="language-card-stats">
        <div class="language-card-stat">
          <div class="language-card-stat-value">${language.level || 1}</div>
          <div class="language-card-stat-label">Level</div>
        </div>
        <div class="language-card-stat">
          <div class="language-card-stat-value">${language.xp || 0}</div>
          <div class="language-card-stat-label">XP</div>
        </div>
      </div>
      <div class="language-card-progress">
        <div class="language-card-progress-label">
          <span>Progress</span>
          <span>${progressPercent}%</span>
        </div>
        <div class="language-card-progress-bar">
          <div class="language-card-progress-bar-fill" style="--progress: ${progressPercent}%"></div>
        </div>
      </div>
    </div>
    <div class="language-card-footer">
      <div class="language-card-footer-status">
        <i class="fas fa-clock"></i> Last studied: ${getLastStudiedText(language)}
      </div>
      <button class="language-card-footer-action continue-learning-btn">
        Continue <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `;
  
  // Add event listener to continue learning button
  card.querySelector('.continue-learning-btn').addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent card click event
    currentLanguage = language;
    showScreen('levels-screen');
    loadLanguageLevels(language);
  });
  
  // Add event listener to the entire card
  card.addEventListener('click', function() {
    currentLanguage = language;
    showScreen('levels-screen');
    loadLanguageLevels(language);
  });
  
  return card;
}

// Get language image URL based on language ID
function getLanguageImageUrl(languageId) {
  const imageUrls = {
    'html': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'csharp': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    'cpp': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
  };
  
  return imageUrls[languageId] || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';
}

// Get last studied text
function getLastStudiedText(language) {
  if (!language.lastStudied) {
    return 'Not started yet';
  }
  
  const lastStudied = new Date(language.lastStudied);
  const now = new Date();
  const diffDays = Math.floor((now - lastStudied) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return `${diffDays} days ago`;
  }
}
