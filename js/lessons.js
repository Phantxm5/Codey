// Lessons related functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lessons event listeners
    initLessonsEventListeners();
});

// Initialize lessons event listeners
function initLessonsEventListeners() {
    // Back button from learning screen to levels
    document.getElementById('back-to-levels-btn').addEventListener('click', function() {
        showScreen('levels-screen');
    });
    
    // Complete lesson button - replaced with next lesson button
    document.getElementById('complete-lesson-btn').addEventListener('click', function() {
        navigateToNextLesson();
    });
    
    // Run code button
    document.getElementById('run-code-btn').addEventListener('click', function() {
        runCode();
    });
}

// Load level lessons
function loadLevelLessons(level, language) {
    if (!level || !language) return;
    
    // Set language name in header
    document.getElementById('current-language').textContent = language.name;
    
    // Set progress and level info
    document.getElementById('current-xp').textContent = language.xp || 0;
    document.getElementById('current-level').textContent = language.level || 1;
    document.getElementById('xp-progress').style.width = `${language.progress || 0}%`;
    
    // Check if this is a milestone level (coding challenge)
    const isMilestone = level === 10 || level === 20 || level === 30;
    
    // Show/hide appropriate containers
    const lessonContainer = document.getElementById('lesson-content');
    const challengeContainer = document.getElementById('coding-challenge');
    
    if (isMilestone) {
        lessonContainer.style.display = 'none';
        challengeContainer.style.display = 'block';
        loadCodingChallenge(level, language);
    } else {
        lessonContainer.style.display = 'block';
        challengeContainer.style.display = 'none';
        loadLessonContent(level, language);
    }
}

// Load regular lesson content
function loadLessonContent(level, language) {
    const lessonContainer = document.getElementById('lesson-content');
    lessonContainer.innerHTML = '';
    
    // Get lessons for this level
    const lessons = getLessonsForLevel(level, language.id);
    
    if (!lessons || lessons.length === 0) {
        lessonContainer.innerHTML = '<p>No lessons available for this level yet.</p>';
        return;
    }
    
    // Create lesson elements
    lessons.forEach((lesson, index) => {
        const lessonElement = document.createElement('div');
        lessonElement.className = 'lesson';
        lessonElement.dataset.lesson = `${level}.${index + 1}`;
        
        // Make first lesson active by default
        if (index === 0) {
            lessonElement.classList.add('active');
        }
        
        // Check if lesson is completed
        const isCompleted = currentUser.languages.find(l => l.id === language.id).completedLessons &&
                           currentUser.languages.find(l => l.id === language.id).completedLessons.includes(`${level}.${index + 1}`);
        
        if (isCompleted) {
            lessonElement.classList.add('completed');
        }
        
        const lessonTitle = document.createElement('h3');
        lessonTitle.textContent = `${level}.${index + 1}: ${lesson.title}`;
        
        const lessonContent = document.createElement('div');
        lessonContent.className = 'lesson-content';
        lessonContent.innerHTML = lesson.content;
        
        lessonElement.appendChild(lessonTitle);
        lessonElement.appendChild(lessonContent);
        
        lessonContainer.appendChild(lessonElement);
    });
    
    // Create pagination
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'lesson-pagination';
    
    lessons.forEach((_, index) => {
        const paginationItem = document.createElement('div');
        paginationItem.className = 'lesson-pagination-item';
        if (index === 0) {
            paginationItem.classList.add('active');
        }
        paginationItem.textContent = index + 1;
        
        // Add event listener to switch lessons
        paginationItem.addEventListener('click', function() {
            // Hide all lessons
            const lessonElements = lessonContainer.querySelectorAll('.lesson');
            lessonElements.forEach(el => el.classList.remove('active'));
            
            // Show selected lesson
            lessonElements[index].classList.add('active');
            
            // Update pagination active state
            const paginationItems = paginationContainer.querySelectorAll('.lesson-pagination-item');
            paginationItems.forEach(item => item.classList.remove('active'));
            paginationItem.classList.add('active');
            
            // Update current lesson
            currentLesson = `${level}.${index + 1}`;
            
            // Update button text based on whether this is the last lesson
            updateLessonNavigationButton(index, lessons.length);
        });
        
        paginationContainer.appendChild(paginationItem);
    });
    
    lessonContainer.appendChild(paginationContainer);
    
    // Add navigation buttons
    const navigationContainer = document.createElement('div');
    navigationContainer.className = 'lesson-navigation';
    
    // Update button text based on whether this is the last lesson
    const buttonText = lessons.length > 1 ? 'Next Lesson' : 'Complete Level';
    
    const completeButton = document.createElement('button');
    completeButton.id = 'complete-lesson-btn';
    completeButton.className = 'btn primary-btn';
    completeButton.textContent = buttonText;
    
    navigationContainer.appendChild(completeButton);
    lessonContainer.appendChild(navigationContainer);
    
    // Set current lesson
    currentLesson = `${level}.1`;
    
    // Track visited lessons for this level
    if (!currentUser.visitedLessons) {
        currentUser.visitedLessons = {};
    }
    
    if (!currentUser.visitedLessons[currentLanguage.id]) {
        currentUser.visitedLessons[currentLanguage.id] = {};
    }
    
    if (!currentUser.visitedLessons[currentLanguage.id][level]) {
        currentUser.visitedLessons[currentLanguage.id][level] = [1]; // Mark first lesson as visited
    }
}

// Update lesson navigation button text
function updateLessonNavigationButton(currentIndex, totalLessons) {
    const completeButton = document.getElementById('complete-lesson-btn');
    if (completeButton) {
        if (currentIndex === totalLessons - 1) {
            completeButton.textContent = 'Complete Level';
        } else {
            completeButton.textContent = 'Next Lesson';
        }
    }
}

// Navigate to next lesson or complete level
function navigateToNextLesson() {
    if (!currentUser || !currentLanguage || !currentLesson) return;
    
    // Get current lesson index
    const lessonParts = currentLesson.split('.');
    const currentLevel = parseInt(lessonParts[0]);
    const currentLessonIndex = parseInt(lessonParts[1]);
    
    // Get lessons for this level
    const lessons = getLessonsForLevel(currentLevel, currentLanguage.id);
    
    // Track this lesson as visited
    if (!currentUser.visitedLessons) {
        currentUser.visitedLessons = {};
    }
    
    if (!currentUser.visitedLessons[currentLanguage.id]) {
        currentUser.visitedLessons[currentLanguage.id] = {};
    }
    
    if (!currentUser.visitedLessons[currentLanguage.id][currentLevel]) {
        currentUser.visitedLessons[currentLanguage.id][currentLevel] = [];
    }
    
    if (!currentUser.visitedLessons[currentLanguage.id][currentLevel].includes(currentLessonIndex)) {
        currentUser.visitedLessons[currentLanguage.id][currentLevel].push(currentLessonIndex);
    }
    
    // Check if this is the last lesson
    if (currentLessonIndex >= lessons.length) {
        // This is a coding challenge or the last lesson, complete it
        completeCurrentLesson();
        return;
    }
    
    // Check if we've visited all lessons in this level
    const allLessonsVisited = lessons.every((_, index) => 
        currentUser.visitedLessons[currentLanguage.id][currentLevel].includes(index + 1)
    );
    
    // If this is the last lesson or we've visited all lessons, complete the level
    if (currentLessonIndex === lessons.length || allLessonsVisited) {
        completeCurrentLesson();
    } else {
        // Navigate to the next lesson
        const nextLessonIndex = currentLessonIndex;
        
        // Update pagination to show next lesson
        const paginationItems = document.querySelectorAll('.lesson-pagination-item');
        if (paginationItems && paginationItems.length > nextLessonIndex) {
            paginationItems[nextLessonIndex].click();
        }
    }
    
    // Save visited lessons
    updateCurrentUser();
}

// Load coding challenge for milestone levels
function loadCodingChallenge(level, language) {
    const challengeDescription = document.querySelector('.challenge-description');
    const codeEditor = document.getElementById('code-editor');
    
    // Get challenge for this level and language
    const challenge = getChallengeForLevel(level, language.id);
    
    if (!challenge) {
        challengeDescription.innerHTML = '<p>No coding challenge available for this level yet.</p>';
        codeEditor.value = '';
        return;
    }
    
    // Set challenge description
    challengeDescription.innerHTML = challenge.description;
    
    // Set initial code in editor
    codeEditor.value = challenge.initialCode || '';
    
    // Set current lesson to the challenge
    currentLesson = `${level}.challenge`;
}

// Complete current lesson
function completeCurrentLesson() {
    if (!currentUser || !currentLanguage || !currentLesson) return;
    
    // Find user language
    const userLanguage = currentUser.languages.find(l => l.id === currentLanguage.id);
    if (!userLanguage) return;
    
    // Check if this is a coding challenge
    const isChallengeLesson = currentLesson.endsWith('challenge');
    
    // For regular lessons, check if all lessons have been visited
    if (!isChallengeLesson) {
        const lessonParts = currentLesson.split('.');
        const currentLevel = parseInt(lessonParts[0]);
        
        // Get lessons for this level
        const lessons = getLessonsForLevel(currentLevel, currentLanguage.id);
        
        // Check if we've visited all lessons
        if (!currentUser.visitedLessons || 
            !currentUser.visitedLessons[currentLanguage.id] || 
            !currentUser.visitedLessons[currentLanguage.id][currentLevel]) {
            // No visited lessons tracked, can't complete
            console.log("You need to read through all lessons before completing this level.");
            return;
        }
        
        const allLessonsVisited = lessons.every((_, index) => 
            currentUser.visitedLessons[currentLanguage.id][currentLevel].includes(index + 1)
        );
        
        if (!allLessonsVisited) {
            console.log("You need to read through all lessons before completing this level.");
            return;
        }
    } else if (isChallengeLesson) {
        // For challenges, validate code before completing
        const isValid = validateChallengeCode();
        if (!isValid) {
            console.log('Your code doesn\'t pass the challenge requirements. Please try again.');
            return;
        }
        
        // If this is level 30 challenge, award title
        if (currentLevel === 30) {
            const title = `${currentLanguage.name} Master`;
            if (!currentUser.titles.includes(title)) {
                currentUser.titles.push(title);
                console.log(`Congratulations! You've earned the title: ${title}`);
            }
        }
    }
    
    // Initialize completedLessons array if it doesn't exist
    if (!userLanguage.completedLessons) {
        userLanguage.completedLessons = [];
    }
    
    // Add lesson to completed lessons if not already completed
    if (!userLanguage.completedLessons.includes(currentLesson)) {
        userLanguage.completedLessons.push(currentLesson);
        
        // Award XP
        const xpGained = isChallengeLesson ? 50 : 10;
        userLanguage.xp = (userLanguage.xp || 0) + xpGained;
        
        // Update level if XP threshold is met
        updateLanguageLevel(userLanguage);
        
        // Update progress percentage
        updateLanguageProgress(userLanguage);
        
        // Update user in local storage
        updateCurrentUser();
        
        // Show animation for completed lesson
        const lessonElement = document.querySelector(`.lesson.active`);
        if (lessonElement) {
            lessonElement.classList.add('lesson-complete-animation');
            setTimeout(() => {
                lessonElement.classList.remove('lesson-complete-animation');
            }, 1500);
        }
        
        console.log(`Lesson completed! You earned ${xpGained} XP.`);
        
        // If this was a challenge and not the last level, unlock next level
        if (isChallengeLesson && (currentLevel === 10 || currentLevel === 20)) {
            userLanguage.level = Math.max(userLanguage.level, currentLevel + 1);
            updateCurrentUser();
            console.log(`You've unlocked level ${currentLevel + 1}!`);
        }
        
        // Redirect to levels screen
        showScreen('levels-screen');
        loadLanguageLevels(userLanguage);
    } else {
        // Already completed
        console.log('You\'ve already completed this lesson.');
    }
}

// Update language level based on XP
function updateLanguageLevel(language) {
    if (!language) return;
    
    // Simple level calculation: 1 level per 100 XP
    const newLevel = Math.floor(language.xp / 100) + 1;
    language.level = Math.max(language.level || 1, newLevel);
    
    // Ensure next level is unlocked after completing current level lessons
    if (language.completedLessons && language.completedLessons.length > 0) {
        // Check for completed lessons at each level
        for (let i = 1; i <= 30; i++) {
            const hasCompletedLevel = language.completedLessons.some(lesson => lesson.startsWith(`${i}.`));
            if (hasCompletedLevel && language.level < i + 1) {
                language.level = i + 1;
            }
        }
    }
}

// Update language progress percentage
function updateLanguageProgress(language) {
    if (!language) return;
    
    // Calculate progress within current level (0-100%)
    const currentLevelXP = language.xp % 100;
    language.progress = currentLevelXP;
}

// Run code in the code editor
function runCode() {
    const codeEditor = document.getElementById('code-editor');
    const codeOutput = document.getElementById('code-output');
    
    const code = codeEditor.value;
    
    // This is a simplified simulation of code execution
    // In a real application, you would need a more sophisticated approach
    
    codeOutput.innerHTML = '<p>Running code...</p>';
    
    // Simulate processing time
    setTimeout(() => {
        // Simple validation
        if (code.trim() === '') {
            codeOutput.innerHTML = '<p class="error">Error: Empty code.</p>';
            return;
        }
        
        // Simulate successful execution
        codeOutput.innerHTML = '<p class="success">Code executed successfully!</p>';
        
        // Add simulated output
        codeOutput.innerHTML += '<pre>Program output would appear here in a real environment.</pre>';
    }, 1000);
}

// Validate challenge code
function validateChallengeCode() {
    const codeEditor = document.getElementById('code-editor');
    const code = codeEditor.value;
    
    // This is a simplified validation
    // In a real application, you would need a more sophisticated approach
    
    // Check if code is not empty
    if (code.trim() === '') {
        return false;
    }
    
    // For demo purposes, we'll consider any non-empty code as valid
    // In a real application, you would check for specific requirements
    
    return true;
}

// Get lessons for a specific level and language
function getLessonsForLevel(level, languageId) {
    // This would typically come from a database or API
    // For this demo, we'll return enhanced content
    
    // Basic structure for a lesson
    const createLesson = (title, content) => ({ title, content });
    
    // Example lessons for level 1
    if (level === 1) {
        return [
            createLesson(
                "Set up your programming environment",
                `<div class="lesson-section">
                    <h4>What is a Development Environment?</h4>
                    <p>A development environment is where you'll write, test, and debug your code. Think of it as your digital workshop for creating programs!</p>
                    
                    <div class="lesson-image">
                        <img src="https://i.imgur.com/ZXWrC2Z.png" alt="Visual Studio Code interface" />
                        <p class="caption">Visual Studio Code - a popular code editor</p>
                    </div>
                    
                    <h4>Getting Started: Essential Tools</h4>
                    <p>Before you start coding in ${languageId}, you'll need to set up your development environment:</p>
                    
                    <ol>
                        <li>
                            <strong>Install a Code Editor</strong>
                            <p>Visual Studio Code (VS Code) is a free, powerful editor that works well for beginners and professionals alike. It has features like syntax highlighting, code completion, and debugging tools.</p>
                            <p>Download it from: <a href="https://code.visualstudio.com/" target="_blank">https://code.visualstudio.com/</a></p>
                        </li>
                        
                        <li>
                            <strong>Install Language-Specific Tools</strong>
                            <p>Depending on your programming language, you might need additional software:</p>
                            <ul>
                                <li>For HTML/CSS: Just a browser and code editor</li>
                                <li>For JavaScript: Node.js runtime</li>
                                <li>For Python: Python interpreter</li>
                                <li>For C/C++: Compiler like GCC or Clang</li>
                                <li>For C#: .NET SDK</li>
                            </ul>
                        </li>
                        
                        <li>
                            <strong>Set Up Extensions</strong>
                            <p>VS Code extensions enhance your coding experience. Some useful ones for ${languageId} include:</p>
                            <ul>
                                <li>Language support extensions</li>
                                <li>Linters to check your code for errors</li>
                                <li>Themes to customize your editor's appearance</li>
                                <li>Debugger extensions</li>
                            </ul>
                        </li>
                    </ol>
                    
                    <div class="tip-box">
                        <h5>Beginner Tip</h5>
                        <p>Don't worry about having the perfect setup right away! Start with the basics and add tools as you learn more about what you need.</p>
                    </div>
                </div>`
            ),
            createLesson(
                "Learn the basic syntax rules",
                `<div class="lesson-section">
                    <h4>What is Syntax?</h4>
                    <p>Syntax is like the grammar of a programming language. It's the set of rules that defines how programs written in the language should be structured.</p>
                    
                    <div class="lesson-image">
                        <img src="https://i.imgur.com/JYmKVp2.png" alt="Code syntax example" />
                        <p class="caption">Example of syntax in different programming languages</p>
                    </div>
                    
                    <h4>Key Syntax Elements in ${languageId.toUpperCase()}</h4>
                    
                    <div class="syntax-example">
                        <h5>Statements</h5>
                        <p>Statements are instructions that perform actions. In many languages, they end with a semicolon (;) or newline.</p>
                        <pre><code>// Example statement in JavaScript
console.log("Hello, world!");</code></pre>
                    </div>
                    
                    <div class="syntax-example">
                        <h5>Punctuation and Special Characters</h5>
                        <p>Different languages use various symbols for different purposes:</p>
                        <ul>
                            <li><strong>{ }</strong> - Curly braces often define blocks of code</li>
                            <li><strong>( )</strong> - Parentheses are used for function calls and conditions</li>
                            <li><strong>[ ]</strong> - Square brackets are often used for arrays</li>
                            <li><strong>;</strong> - Semicolons terminate statements in many languages</li>
                            <li><strong>.</strong> - Dots access properties or methods</li>
                        </ul>
                    </div>
                    
                    <div class="syntax-example">
                        <h5>Case Sensitivity</h5>
                        <p>In most programming languages (including ${languageId}), case matters!</p>
                        <pre><code>// These are different variables in case-sensitive languages
let userName = "Alice";
let username = "Bob";</code></pre>
                        <p>Always pay attention to uppercase and lowercase letters in your code.</p>
                    </div>
                    
                    <div class="syntax-example">
                        <h5>Comments</h5>
                        <p>Comments let you add notes to your code that won't be executed:</p>
                        <pre><code>// This is a single-line comment
/* This is a
   multi-line comment */</code></pre>
                    </div>
                    
                    <div class="tip-box">
                        <h5>Beginner Tip</h5>
                        <p>Syntax errors are the most common errors for beginners. If your code doesn't work, first check for missing punctuation, incorrect capitalization, or typos!</p>
                    </div>
                </div>`
            ),
            createLesson(
                "Understand how to declare, initialize, and use variables",
                `<div class="lesson-section">
                    <h4>What are Variables?</h4>
                    <p>Variables are containers for storing data values. Think of them as labeled boxes where you can store information for later use in your program.</p>
                    
                    <div class="lesson-image">
                        <img src="https://i.imgur.com/DnXgMfh.png" alt="Variable concept visualization" />
                        <p class="caption">Variables store data values that can be used throughout your program</p>
                    </div>
                    
                    <h4>Declaring Variables</h4>
                    <p>Declaring a variable means creating it for the first time. Different programming languages have different ways to declare variables:</p>
                    
                    <div class="code-comparison">
                        <div class="code-example">
                            <h5>JavaScript</h5>
                            <pre><code>let age;
const PI = 3.14159;
var name; // older style</code></pre>
                        </div>
                        
                        <div class="code-example">
                            <h5>Python</h5>
                            <pre><code># Python doesn't require declaration
age = 25</code></pre>
                        </div>
                        
                        <div class="code-example">
                            <h5>C/C++</h5>
                            <pre><code>int age;
float price;</code></pre>
                        </div>
                    </div>
                    
                    <h4>Initializing Variables</h4>
                    <p>Initializing means assigning an initial value to a variable:</p>
                    
                    <div class="code-example">
                        <pre><code>// Declaration and initialization in one step
let age = 25;
let name = "Alice";
let isStudent = true;</code></pre>
                    </div>
                    
                    <h4>Variable Naming Rules</h4>
                    <p>Good variable names make your code easier to understand:</p>
                    <ul>
                        <li>Names should be descriptive (<code>userAge</code> is better than <code>x</code>)</li>
                        <li>Most languages allow letters, numbers, and underscores</li>
                        <li>Names usually can't start with a number</li>
                        <li>Names are typically case-sensitive</li>
                        <li>Avoid using reserved words (like <code>if</code>, <code>for</code>, <code>class</code>)</li>
                    </ul>
                    
                    <h4>Using Variables</h4>
                    <p>Once declared, you can use variables in expressions and operations:</p>
                    
                    <div class="code-example">
                        <pre><code>let x = 5;
let y = 10;
let sum = x + y;  // sum will be 15

let name = "Alice";
let greeting = "Hello, " + name;  // greeting will be "Hello, Alice"</code></pre>
                    </div>
                    
                    <div class="tip-box">
                        <h5>Beginner Tip</h5>
                        <p>Always initialize your variables before using them! Using uninitialized variables can cause unexpected behavior in your programs.</p>
                    </div>
                </div>`
            ),
            createLesson(
                "Explore primitive data types",
                `<div class="lesson-section">
                    <h4>What are Data Types?</h4>
                    <p>Data types define what kind of data a variable can hold. Different types of data have different properties and can be used in different ways.</p>
                    
                    <div class="lesson-image">
                        <img src="https://i.imgur.com/L8gNtNs.png" alt="Common data types visualization" />
                        <p class="caption">Common primitive data types in programming languages</p>
                    </div>
                    
                    <h4>Common Primitive Data Types</h4>
                    
                    <div class="data-type-card">
                        <h5>Integers (int)</h5>
                        <p>Whole numbers without decimal points:</p>
                        <pre><code>let age = 25;
let temperature = -10;</code></pre>
                        <p>Used for: Counting, indexing, whole number calculations</p>
                    </div>
                    
                    <div class="data-type-card">
                        <h5>Floating-Point Numbers (float, double)</h5>
                        <p>Numbers with decimal points:</p>
                        <pre><code>let price = 19.99;
let pi = 3.14159;</code></pre>
                        <p>Used for: Measurements, calculations requiring precision</p>
                    </div>
                    
                    <div class="data-type-card">
                        <h5>Strings (str, string)</h5>
                        <p>Text data, enclosed in quotes:</p>
                        <pre><code>let name = "Alice";
let message = 'Hello, world!';</code></pre>
                        <p>Used for: Names, messages, any textual information</p>
                    </div>
                    
                    <div class="data-type-card">
                        <h5>Booleans (bool)</h5>
                        <p>Logical values that can be either true or false:</p>
                        <pre><code>let isLoggedIn = true;
let hasPermission = false;</code></pre>
                        <p>Used for: Conditions, flags, logical operations</p>
                    </div>
                    
                    <h4>Type Conversion</h4>
                    <p>Sometimes you need to convert between data types:</p>
                    
                    <div class="code-example">
                        <pre><code>// Converting string to number
let numStr = "42";
let num = parseInt(numStr);  // num will be 42 as a number

// Converting number to string
let count = 10;
let countStr = count.toString();  // countStr will be "10"</code></pre>
                    </div>
                    
                    <h4>Type Checking</h4>
                    <p>You can check the type of a variable:</p>
                    
                    <div class="code-example">
                        <pre><code>// In JavaScript
let value = 42;
console.log(typeof value);  // Outputs: "number"

value = "Hello";
console.log(typeof value);  // Outputs: "string"</code></pre>
                    </div>
                    
                    <div class="tip-box">
                        <h5>Beginner Tip</h5>
                        <p>Pay attention to data types when performing operations! Mixing types can lead to unexpected results or errors. For example, adding a number and a string might concatenate them instead of performing mathematical addition.</p>
                    </div>
                </div>`
            )
        ];
    }
    
    // For other levels, return placeholder lessons with improved formatting
    return [
        createLesson(
            "Lesson 1",
            `<div class="lesson-section">
                <h4>Introduction to Level ${level}</h4>
                <p>This is an enhanced placeholder for lesson content for level ${level} in ${languageId}.</p>
                <p>In a complete application, this would contain detailed explanations, examples, and interactive elements.</p>
                
                <div class="tip-box">
                    <h5>Learning Tip</h5>
                    <p>As you progress through higher levels, concepts will build upon what you've already learned. Always make sure you understand the fundamentals before moving on.</p>
                </div>
            </div>`
        ),
        createLesson(
            "Lesson 2",
            `<div class="lesson-section">
                <h4>Advanced Concepts for Level ${level}</h4>
                <p>This is another enhanced placeholder for lesson content for level ${level} in ${languageId}.</p>
                <p>Each lesson would focus on a specific concept or skill related to the level's overall topic.</p>
                
                <div class="code-example">
                    <pre><code>// Example code would be shown here
function exampleFunction() {
    console.log("This is level ${level} content");
}</code></pre>
                </div>
                
                <div class="tip-box">
                    <h5>Practice Suggestion</h5>
                    <p>Try to implement what you've learned in small projects. Practical application is the best way to solidify your understanding.</p>
                </div>
            </div>`
        )
    ];
}

// Get challenge for a specific level and language
function getChallengeForLevel(level, languageId) {
    // This would typically come from a database or API
    // For this demo, we'll return placeholder content
    
    // Basic structure for a challenge
    const createChallenge = (description, initialCode) => ({ description, initialCode });
    
    // Example challenges for milestone levels
    if (level === 10) {
        return createChallenge(
            `<h3>Level 10 Coding Challenge: ${languageId.toUpperCase()}</h3>
            <p>This is a coding challenge for level 10 in ${languageId}.</p>
            <p>In this challenge, you'll need to:</p>
            <ul>
                <li>Implement a function that does X</li>
                <li>Handle edge cases</li>
                <li>Optimize for performance</li>
            </ul>
            <p>Complete the code below to pass the challenge:</p>`,
            
            `// Level 10 Challenge for ${languageId}
// Complete the function below

function challenge() {
  // Your code here
  
  return result;
}`
        );
    } else if (level === 20) {
        return createChallenge(
            `<h3>Level 20 Coding Challenge: ${languageId.toUpperCase()}</h3>
            <p>This is a more advanced coding challenge for level 20 in ${languageId}.</p>
            <p>In this challenge, you'll need to:</p>
            <ul>
                <li>Implement a more complex algorithm</li>
                <li>Use advanced language features</li>
                <li>Consider both time and space complexity</li>
            </ul>
            <p>Complete the code below to pass the challenge:</p>`,
            
            `// Level 20 Challenge for ${languageId}
// Complete the function below

function advancedChallenge(input) {
  // Your code here
  
  return result;
}`
        );
    } else if (level === 30) {
        return createChallenge(
            `<h3>Level 30 Master Challenge: ${languageId.toUpperCase()}</h3>
            <p>This is the master-level coding challenge for ${languageId}.</p>
            <p>In this challenge, you'll need to:</p>
            <ul>
                <li>Implement a comprehensive solution</li>
                <li>Demonstrate mastery of language features</li>
                <li>Create efficient, readable, and maintainable code</li>
            </ul>
            <p>Complete the code below to pass the challenge and earn the ${languageId} Master title:</p>`,
            
            `// Level 30 Master Challenge for ${languageId}
// Complete the implementation below

class MasterChallenge {
  constructor() {
    // Initialize your solution
  }
  
  solve(input) {
    // Your code here
    
    return result;
  }
  
  // Add any helper methods you need
}`
        );
    }
    
    return null;
}

// Add this function to the end of the file

// Save user progress after completing a lesson or level
function saveUserProgress(language, level, lesson, xpEarned = 10) {
    if (!currentUser || currentUser.id === 'guest') {
        console.log('Progress not saved: User is not logged in or is a guest.');
        return false;
    }
    
    if (!currentUser.progressSaved) {
        console.log('Progress not saved: Progress saving is disabled for this user.');
        return false;
    }
    
    // Find the language in user's languages
    const userLanguage = currentUser.languages.find(l => l.id === language.id);
    if (!userLanguage) {
        console.log('Progress not saved: Language not found in user\'s languages.');
        return false;
    }
    
    // Add XP
    userLanguage.xp = (userLanguage.xp || 0) + xpEarned;
    
    // Mark lesson as completed if not already
    if (!userLanguage.completedLessons) {
        userLanguage.completedLessons = [];
    }
    
    const lessonKey = `${level}-${lesson}`;
    if (!userLanguage.completedLessons.includes(lessonKey)) {
        userLanguage.completedLessons.push(lessonKey);
    }
    
    // Update level if all lessons in current level are completed
    const levelLessons = getLessonsForLevel(language.id, level);
    const allLessonsCompleted = levelLessons.every(l => 
        userLanguage.completedLessons.includes(`${level}-${l.id}`)
    );
    
    if (allLessonsCompleted && userLanguage.level === level) {
        userLanguage.level = level + 1;
        
        // Add bonus XP for completing a level
        userLanguage.xp += 50;
    }
    
    // Calculate progress percentage (based on completed lessons)
    const totalLessons = 30 * 3; // Assuming 3 lessons per level, 30 levels
    const completedLessons = userLanguage.completedLessons.length;
    userLanguage.progress = Math.min(100, Math.floor((completedLessons / totalLessons) * 100));
    
    // Update user in local storage
    updateCurrentUser();
    
    console.log(`Progress saved: ${xpEarned} XP earned, total: ${userLanguage.xp} XP, level: ${userLanguage.level}, progress: ${userLanguage.progress}%`);
    return true;
}

// Function to get lessons for a specific level (placeholder - would need to be implemented)
function getLessonsForLevel(languageId, level) {
    // This would normally fetch lessons from a data source
    // For now, return a placeholder array of 3 lessons per level
    return [
        { id: 1, title: `Lesson ${level}.1` },
        { id: 2, title: `Lesson ${level}.2` },
        { id: 3, title: `Lesson ${level}.3` }
    ];
}
