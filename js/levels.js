// Levels related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize levels event listeners
    initLevelsEventListeners();
});

// Initialize levels event listeners
function initLevelsEventListeners() {
    // Back button from levels to home
    document.getElementById('back-to-home-from-levels-btn').addEventListener('click', function() {
        showScreen('home-screen');
    });
}

// Load language levels
function loadLanguageLevels(language) {
    if (!language) return;
    
    // Set language name in header
    document.getElementById('levels-language').textContent = language.name;
    
    // Set progress and level info
    document.getElementById('levels-current-xp').textContent = language.xp || 0;
    document.getElementById('levels-current-level').textContent = language.level || 1;
    document.getElementById('levels-xp-progress').style.width = `${language.progress || 0}%`;
    
    // Load level categories
    loadLevelCategory('beginner-levels', 1, 10, language);
    loadLevelCategory('advanced-levels', 11, 20, language);
    loadLevelCategory('master-levels', 21, 31, language);
}

// Load levels for a specific category
function loadLevelCategory(containerId, startLevel, endLevel, language) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    for (let level = startLevel; level <= endLevel; level++) {
        const levelCard = createLevelCard(level, language);
        container.appendChild(levelCard);
    }
}

// Create a level card element
function createLevelCard(level, language) {
    const card = document.createElement('div');
    card.className = 'level-card';
    
    // Check if level is unlocked
    const isUnlocked = level <= language.level;
    if (!isUnlocked) {
        card.classList.add('locked');
    }
    
    // Check if level is a milestone (coding challenge)
    const isMilestone = level === 10 || level === 20 || level === 30;
    if (isMilestone) {
        card.classList.add('milestone');
    }
    
    // Check if level is completed
    const isCompleted = language.completedLessons && 
                        language.completedLessons.some(lesson => lesson.startsWith(`${level}.`));
    if (isCompleted) {
        card.classList.add('completed');
    }
    
    const levelNumber = document.createElement('div');
    levelNumber.className = 'level-number';
    levelNumber.textContent = level;
    
    const levelTitle = document.createElement('h4');
    levelTitle.className = 'level-title';
    levelTitle.textContent = getLevelTitle(level);
    
    card.appendChild(levelNumber);
    card.appendChild(levelTitle);
    
    // Add lock icon for locked levels
    if (!isUnlocked) {
        const lockIcon = document.createElement('div');
        lockIcon.className = 'level-lock';
        lockIcon.innerHTML = '<i class="fas fa-lock"></i>';
        card.appendChild(lockIcon);
    }
    
    // Add milestone icon for coding challenges
    if (isMilestone) {
        const milestoneIcon = document.createElement('div');
        milestoneIcon.className = 'level-milestone';
        milestoneIcon.innerHTML = '<i class="fas fa-code"></i>';
        card.appendChild(milestoneIcon);
    }
    
    // Add event listener to open level lessons
    if (isUnlocked) {
        card.addEventListener('click', function() {
            currentLevel = level;
            showScreen('learning-screen');
            loadLevelLessons(level, language);
        });
    }
    
    return card;
}

// Get level title based on level number
function getLevelTitle(level) {
    const levelTitles = {
        1: "Basic Syntax, Variables, and Data Types",
        2: "Control Structures",
        3: "Functions and Modular Code",
        4: "Fundamental Data Structures",
        5: "Input/Output and Basic Debugging",
        6: "Libraries and Built-In Functions",
        7: "Code Organization and Style",
        8: "Algorithmic Thinking and Problem Decomposition",
        9: "File Handling and Data Processing",
        10: "Advanced Input/Output and Data Parsing",
        11: "Object-Oriented Programming Fundamentals",
        12: "Advanced Data Structures",
        13: "Core Algorithms",
        14: "Code Organization and Modularization",
        15: "Functional Programming Concepts",
        16: "Exception Handling and Error Management",
        17: "Version Control Fundamentals",
        18: "Web APIs and Networking Concepts",
        19: "Asynchronous and Concurrent Programming",
        20: "Metaprogramming and Reflection",
        21: "Language Internals and Memory Management",
        22: "Advanced Data Structures and Algorithms",
        23: "Performance Optimization and Profiling",
        24: "Software Architecture and Design Patterns",
        25: "Security Principles and Secure Coding",
        26: "Advanced System Design and Scalability",
        27: "Open Source and Community Practices",
        28: "DevOps, CI/CD, and Automation Fundamentals",
        29: "Emerging Technologies and Programming Paradigms",
        30: "Continuous Learning and Advanced Theoretical Concepts",
        31: "Personal Project Planning and Lifelong Learning Strategies"
    };
    
    return levelTitles[level] || `Level ${level}`;
}
