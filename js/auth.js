// Authentication related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth event listeners
    initAuthEventListeners();
});

// Initialize authentication event listeners
function initAuthEventListeners() {
    // Tab switching
    document.getElementById('login-tab').addEventListener('click', function() {
        showAuthForm('login');
    });
    
    document.getElementById('register-tab').addEventListener('click', function() {
        showAuthForm('register');
    });
    
    // Login form submission
    document.getElementById('login-btn').addEventListener('click', function() {
        handleLogin();
    });
    
    // Register form submission
    document.getElementById('register-btn').addEventListener('click', function() {
        handleRegister();
    });
}

// Show specific auth form (login or register)
function showAuthForm(formType) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (formType === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
}

// Handle login form submission
function handleLogin() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }
    
    // Check if user exists in local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Set current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        
        // Redirect to home screen
        showScreen('home-screen');
        loadUserLanguages();
    } else {
        alert('Invalid username or password.');
    }
}

// Handle register form submission
function handleRegister() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (!username || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    
    // Check if username already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.username === username)) {
        alert('Username already exists. Please choose another one.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username: username,
        password: password,
        createdAt: new Date().toISOString(),
        languages: [],
        xp: 0,
        titles: []
    };
    
    // Add user to local storage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    currentUser = newUser;
    
    // Redirect to home screen
    showScreen('home-screen');
    loadUserLanguages();
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    showScreen('auth-screen');
}
