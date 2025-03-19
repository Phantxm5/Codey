// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initThemes();
});

// Initialize themes
function initThemes() {
    // Check if theme preference exists in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Set dark mode as default
        applyTheme('dark');
    }
    
    // Add event listener to theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Update icon based on current theme
        updateThemeIcon();
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains('light-theme')) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

// Apply specific theme
function applyTheme(theme) {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('light-theme', 'dark-theme');
    
    // Add new theme class
    if (theme === 'dark') {
        body.classList.add('dark-theme');
    } else {
        body.classList.add('light-theme');
    }
    
    // Save theme preference to local storage
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    updateThemeIcon();
}

// Update theme toggle icon based on current theme
function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const body = document.body;
    
    // Clear existing icon
    themeToggle.innerHTML = '';
    
    // Add appropriate icon
    if (body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
}
