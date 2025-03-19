// Enhanced Python lessons implementation

// This function will be called when loading lessons for Python
function enhancedPythonLessons() {
    // Only apply enhanced styling to Python language
    if (currentLanguage && currentLanguage.id === 'python') {
        // Find all lesson elements and apply Python styling
        const lessonElements = document.querySelectorAll('.lesson');
        lessonElements.forEach((lesson, index) => {
            // Extract lesson number and title
            const lessonTitle = lesson.querySelector('h3').textContent;
            const titleParts = lessonTitle.split(':');
            const lessonNumber = titleParts[0].trim();
            const titleText = titleParts[1] ? titleParts[1].trim() : '';
            
            // Get the lesson content
            const lessonContent = lesson.querySelector('.lesson-content');
            
            // Create new enhanced structure
            lesson.classList.add('python-lesson-container');
            
            // Create header
            const header = document.createElement('div');
            header.className = 'python-lesson-header';
            
            const number = document.createElement('div');
            number.className = 'python-lesson-number';
            number.textContent = lessonNumber;
            
            const title = document.createElement('h3');
            title.className = 'python-lesson-title';
            title.textContent = titleText;
            
            header.appendChild(number);
            header.appendChild(title);
            
            // Replace original content with enhanced structure
            lesson.innerHTML = '';
            lesson.appendChild(header);
            
            // Add enhanced content based on lesson number
            if (lessonNumber.includes('1.1')) {
                lesson.appendChild(createPythonSetupLesson());
            } else if (lessonNumber.includes('1.2')) {
                lesson.appendChild(createPythonSyntaxLesson());
            } else if (lessonNumber.includes('1.3')) {
                lesson.appendChild(createPythonVariablesLesson());
            } else if (lessonNumber.includes('1.4')) {
                lesson.appendChild(createPythonDataTypesLesson());
            } else {
                // For any other lessons, wrap the original content
                const contentSection = document.createElement('div');
                contentSection.className = 'python-content-section';
                contentSection.innerHTML = lessonContent.innerHTML;
                lesson.appendChild(contentSection);
            }
        });
    }
}

// Create enhanced content for Python Setup lesson
function createPythonSetupLesson() {
    const container = document.createElement('div');
    
    // Introduction section
    const introSection = document.createElement('div');
    introSection.className = 'python-content-section';
    introSection.innerHTML = `
        <h4>What is a Python Development Environment?</h4>
        <p>A Python development environment is where you'll write, test, and debug your Python code. It's your digital workshop for creating Python programs!</p>
    `;
    container.appendChild(introSection);
    
    // Visual aid
    const visualAid = document.createElement('div');
    visualAid.className = 'python-visual-aid';
    visualAid.innerHTML = `
        <img src="https://i.imgur.com/ZXWrC2Z.png" alt="Visual Studio Code with Python" />
        <p class="caption">Visual Studio Code with Python extensions - a popular setup for Python development</p>
    `;
    container.appendChild(visualAid);
    
    // Essential tools section
    const toolsSection = document.createElement('div');
    toolsSection.className = 'python-content-section';
    toolsSection.innerHTML = `
        <h4>Getting Started: Essential Python Tools</h4>
        <p>Before you start coding in Python, you'll need to set up your development environment with these essential tools:</p>
    `;
    container.appendChild(toolsSection);
    
    // Python installation
    const installSection = document.createElement('div');
    installSection.className = 'python-content-section';
    installSection.innerHTML = `
        <h4>1. Install Python</h4>
        <p>First, you need to install the Python interpreter - the software that runs your Python code:</p>
        
        <div class="python-code-example">
            <pre><code class="language-bash"># Check if Python is already installed
python --version

# If not installed, download from python.org</code></pre>
        </div>
        
        <div class="python-note">
            <h5>Python Versions</h5>
            <p>Python has two major versions still in use: Python 2 and Python 3. Always use Python 3 for new projects, as Python 2 is no longer supported.</p>
        </div>
    `;
    container.appendChild(installSection);
    
    // Code editor section
    const editorSection = document.createElement('div');
    editorSection.className = 'python-content-section';
    editorSection.innerHTML = `
        <h4>2. Install a Code Editor</h4>
        <p>Visual Studio Code (VS Code) is a free, powerful editor that works well for Python development:</p>
        
        <ul>
            <li>Download from: <a href="https://code.visualstudio.com/" target="_blank">https://code.visualstudio.com/</a></li>
            <li>Install the Python extension for syntax highlighting, code completion, and debugging</li>
            <li>Configure the Python interpreter path in VS Code settings</li>
        </ul>
        
        <div class="python-tip">
            <h5>Editor Alternatives</h5>
            <p>Other popular Python editors include PyCharm, Jupyter Notebooks, and IDLE (comes with Python).</p>
        </div>
    `;
    container.appendChild(editorSection);
    
    // Virtual environments
    const venvSection = document.createElement('div');
    venvSection.className = 'python-content-section';
    venvSection.innerHTML = `
        <h4>3. Learn About Virtual Environments</h4>
        <p>Virtual environments help you manage dependencies for different Python projects:</p>
        
        <div class="python-code-example">
            <pre><code class="language-bash"># Create a virtual environment
python -m venv myenv

# Activate it (Windows)
myenv\\Scripts\\activate

# Activate it (macOS/Linux)
source myenv/bin/activate

# Install packages
pip install package-name</code></pre>
        </div>
    `;
    container.appendChild(venvSection);
    
    // Interactive section
    const interactiveSection = document.createElement('div');
    interactiveSection.className = 'python-interactive';
    interactiveSection.innerHTML = `
        <p>Once you have Python installed, you can test it by running the Python interpreter in interactive mode:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Open a terminal and type:
python

# Now you're in the Python interpreter!
print("Hello, Python world!")
2 + 3
exit()  # To exit the interpreter</code></pre>
        </div>
    `;
    container.appendChild(interactiveSection);
    
    // Final tip
    const tipSection = document.createElement('div');
    tipSection.className = 'python-tip';
    tipSection.innerHTML = `
        <h5>Beginner Tip</h5>
        <p>Don't worry about having the perfect setup right away! Start with Python and a simple editor, then add tools as you learn more about what you need.</p>
    `;
    container.appendChild(tipSection);
    
    return container;
}

// Create enhanced content for Python Syntax lesson
function createPythonSyntaxLesson() {
    const container = document.createElement('div');
    
    // Introduction section
    const introSection = document.createElement('div');
    introSection.className = 'python-content-section';
    introSection.innerHTML = `
        <h4>Python Syntax: Clean and Readable</h4>
        <p>Python is famous for its clean, readable syntax. Unlike many other programming languages, Python uses indentation to define code blocks, making it visually intuitive.</p>
    `;
    container.appendChild(introSection);
    
    // Visual aid
    const visualAid = document.createElement('div');
    visualAid.className = 'python-visual-aid';
    visualAid.innerHTML = `
        <img src="https://i.imgur.com/JYmKVp2.png" alt="Python syntax comparison" />
        <p class="caption">Python syntax compared to other programming languages</p>
    `;
    container.appendChild(visualAid);
    
    // Indentation section
    const indentationSection = document.createElement('div');
    indentationSection.className = 'python-content-section';
    indentationSection.innerHTML = `
        <h4>Indentation: Python's Special Feature</h4>
        <p>In Python, indentation is not just for readability—it's a requirement. Indentation defines code blocks in if statements, loops, functions, and classes.</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Python uses indentation to define blocks
if True:
    print("This is indented")
    print("This is also in the if block")
print("This is outside the if block")</code></pre>
        </div>
        
        <div class="python-note">
            <h5>Indentation Rules</h5>
            <p>Use 4 spaces per indentation level (PEP 8 recommendation). Be consistent with your indentation—mixing tabs and spaces can cause errors.</p>
        </div>
    `;
    container.appendChild(indentationSection);
    
    // Statements section
    const statementsSection = document.createElement('div');
    statementsSection.className = 'python-content-section';
    statementsSection.innerHTML = `
        <h4>Statements and Lines</h4>
        <p>In Python, a statement is typically written on a single line:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># One statement per line
x = 5
y = 10
print(x + y)

# Multiple statements on one line (not recommended for readability)
x = 5; y = 10; print(x + y)</code></pre>
        </div>
    `;
    container.appendChild(statementsSection);
    
    // Comments section
    const commentsSection = document.createElement('div');
    commentsSection.className = 'python-content-section';
    commentsSection.innerHTML = `
        <h4>Comments in Python</h4>
        <p>Comments help explain your code and are ignored by the Python interpreter:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># This is a single-line comment

"""
This is a multi-line comment or docstring.
It can span multiple lines and is often used
for documentation.
"""

x = 5  # You can also put comments at the end of a line</code></pre>
        </div>
    `;
    container.appendChild(commentsSection);
    
    // Keywords section
    const keywordsSection = document.createElement('div');
    keywordsSection.className = 'python-content-section';
    keywordsSection.innerHTML = `
        <h4>Python Keywords</h4>
        <p>Python has a set of reserved keywords that cannot be used as variable names:</p>
        
        <div class="python-comparison">
            <table>
                <tr>
                    <th>Keyword</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>if, elif, else</td>
                    <td>Conditional statements</td>
                </tr>
                <tr>
                    <td>for, while</td>
                    <td>Loops</td>
                </tr>
                <tr>
                    <td>def, return</td>
                    <td>Function definitions</td>
                </tr>
                <tr>
                    <td>class</td>
                    <td>Class definitions</td>
                </tr>
                <tr>
                    <td>import, from</td>
                    <td>Module imports</td>
                </tr>
                <tr>
                    <td>try, except, finally</td>
                    <td>Exception handling</td>
                </tr>
            </table>
        </div>
    `;
    container.appendChild(keywordsSection);
    
    // Interactive section
    const interactiveSection = document.createElement('div');
    interactiveSection.className = 'python-interactive';
    interactiveSection.innerHTML = `
        <p>Try writing your first Python program:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># My first Python program
print("Hello, World!")

# Try a simple calculation
result = 10 + 5
print("10 + 5 =", result)

# Try using a conditional statement
age = 18
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")</code></pre>
        </div>
    `;
    container.appendChild(interactiveSection);
    
    // Final tip
    const tipSection = document.createElement('div');
    tipSection.className = 'python-tip';
    tipSection.innerHTML = `
        <h5>Beginner Tip</h5>
        <p>Python's syntax is designed to be readable and intuitive. If you're coming from another programming language, you might find Python's lack of braces or semicolons unusual at first, but you'll quickly appreciate how clean and readable it makes your code!</p>
    `;
    container.appendChild(tipSection);
    
    return container;
}

// Create enhanced content for Python Variables lesson
function createPythonVariablesLesson() {
    const container = document.createElement('div');
    
    // Introduction section
    const introSection = document.createElement('div');
    introSection.className = 'python-content-section';
    introSection.innerHTML = `
        <h4>Variables: Python's Data Containers</h4>
        <p>Variables in Python are like labeled containers that store data. They allow you to store and manipulate information in your programs.</p>
    `;
    container.appendChild(introSection);
    
    // Visual aid
    const visualAid = document.createElement('div');
    visualAid.className = 'python-visual-aid';
    visualAid.innerHTML = `
        <img src="https://i.imgur.com/DnXgMfh.png" alt="Python variables visualization" />
        <p class="caption">Variables store data values that can be used throughout your program</p>
    `;
    container.appendChild(visualAid);
    
    // Variable declaration section
    const declarationSection = document.createElement('div');
    declarationSection.className = 'python-content-section';
    declarationSection.innerHTML = `
        <h4>Creating Variables in Python</h4>
        <p>Python has no command for declaring variables. A variable is created the moment you first assign a value to it:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Creating variables
name = "Alice"
age = 25
is_student = True

# Python is dynamically typed - no need to declare variable types
x = 10          # x is an integer
x = "hello"     # now x is a string</code></pre>
        </div>
        
        <div class="python-note">
            <h5>Dynamic Typing</h5>
            <p>Python is dynamically typed, meaning you don't need to declare the type of a variable when you create it. The type is determined automatically based on the assigned value.</p>
        </div>
    `;
    container.appendChild(declarationSection);
    
    // Naming rules section
    const namingSection = document.createElement('div');
    namingSection.className = 'python-content-section';
    namingSection.innerHTML = `
        <h4>Variable Naming Rules</h4>
        <p>When naming your variables in Python, follow these rules:</p>
        
        <ul>
            <li>Variable names must start with a letter or underscore</li>
            <li>Variable names can only contain letters, numbers, and underscores (A-z, 0-9, and _)</li>
            <li>Variable names are case-sensitive (age, Age, and AGE are different variables)</li>
            <li>Variable names cannot be Python keywords (like if, for, while, etc.)</li>
        </ul>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Valid variable names
name = "John"
age_2 = 30
_private = "secret"
camelCase = "Python"
snake_case = "Python"

# Invalid variable names
# 2age = 30      # Cannot start with a number
# my-name = "John"  # Cannot use hyphens
# class = "Python"  # Cannot use Python keywords</code></pre>
        </div>
    `;
    container.appendChild(namingSection);
    
    // Naming conventions section
    const conventionsSection = document.createElement('div');
    conventionsSection.className = 'python-content-section';
    conventionsSection.innerHTML = `
        <h4>Python Naming Conventions</h4>
        <p>While not enforced by the language, Python has conventions for naming variables:</p>
        
        <div class="python-comparison">
            <table>
                <tr>
                    <th>Style</th>
                    <th>Use Case</th>
                    <th>Example</th>
                </tr>
                <tr>
                    <td>snake_case</td>
                    <td>Variables, functions</td>
                    <td>user_name, calculate_total</td>
                </tr>
                <tr>
                    <td>UPPER_SNAKE_CASE</td>
                    <td>Constants</td>
                    <td>MAX_VALUE, PI</td>
                </tr>
                <tr>
                    <td>PascalCase</td>
                    <td>Classes</td>
                    <td>Person, BankAccount</td>
                </tr>
                <tr>
                    <td>_single_leading_underscore</td>
                    <td>Private variables/methods</td>
                    <td>_password, _calculate_tax</td>
                </tr>
            </table>
        </div>
    `;
    container.appendChild(conventionsSection);
    
    // Multiple assignment section
    const multipleSection = document.createElement('div');
    multipleSection.className = 'python-content-section';
    multipleSection.innerHTML = `
        <h4>Multiple Assignment</h4>
        <p>Python allows you to assign values to multiple variables in one line:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Assign the same value to multiple variables
x = y = z = 10

# Assign different values to multiple variables
a, b, c = 5, 10, 15

# Swap values (without a temporary variable)
a, b = b, a</code></pre>
        </div>
    `;
    container.appendChild(multipleSection);
    
    // Interactive section
    const interactiveSection = document.createElement('div');
    interactiveSection.className = 'python-interactive';
    interactiveSection.innerHTML = `
        <p>Try working with variables:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Create some variables
name = "Python Learner"
hours_studied = 10
understanding_rate = 0.8

# Use the variables
print("Name:", name)
print("Hours studied:", hours_studied)

# Perform calculations with variables
hours_needed = hours_studied / understanding_rate
print(f"You need approximately {hours_needed:.1f} hours to fully understand this topic.")</code></pre>
        </div>
    `;
    container.appendChild(interactiveSection);
    
    // Final tip
    const tipSection = document.createElement('div');
    tipSection.className = 'python-tip';
    tipSection.innerHTML = `
        <h5>Beginner Tip</h5>
        <p>Choose descriptive variable names that explain what the variable contains. Good variable names make your code self-documenting and easier to understand later!</p>
    `;
    container.appendChild(tipSection);
    
    return container;
}

// Create enhanced content for Python Data Types lesson
function createPythonDataTypesLesson() {
    const container = document.createElement('div');
    
    // Introduction section
    const introSection = document.createElement('div');
    introSection.className = 'python-content-section';
    introSection.innerHTML = `
        <h4>Python Data Types: The Building Blocks</h4>
        <p>Data types define what kind of data a variable can hold. Python has several built-in data types that allow you to work with different kinds of information.</p>
    `;
    container.appendChild(introSection);
    
    // Visual aid
    const visualAid = document.createElement('div');
    visualAid.className = 'python-visual-aid';
    visualAid.innerHTML = `
        <img src="https://i.imgur.com/L8gNtNs.png" alt="Python data types visualization" />
        <p class="caption">Common data types in Python</p>
    `;
    container.appendChild(visualAid);
    
    // Numeric types section
    const numericSection = document.createElement('div');
    numericSection.className = 'python-content-section';
    numericSection.innerHTML = `
        <h4>Numeric Types</h4>
        <p>Python has three numeric types:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Integer (int) - whole numbers
age = 25
temperature = -10

# Float - decimal numbers
height = 1.75
pi = 3.14159

# Complex - numbers with real and imaginary parts
complex_num = 3 + 4j</code></pre>
        </div>
        
        <div class="python-note">
            <h5>Number Operations</h5>
            <p>You can perform various operations on numbers:</p>
            <pre><code class="language-python">a = 10
b = 3

print(a + b)    # Addition: 13
print(a - b)    # Subtraction: 7
print(a * b)    # Multiplication: 30
print(a / b)    # Division: 3.3333...
print(a // b)   # Floor division: 3
print(a % b)    # Modulus (remainder): 1
print(a ** b)   # Exponentiation: 1000</code></pre>
        </div>
    `;
    container.appendChild(numericSection);
    
    // String type section
    const stringSection = document.createElement('div');
    stringSection.className = 'python-content-section';
    stringSection.innerHTML = `
        <h4>String Type (str)</h4>
        <p>Strings are sequences of characters, enclosed in single or double quotes:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Creating strings
name = "Alice"
message = 'Hello, World!'
multiline = """This is a
multiline string"""

# String operations
greeting = "Hello"
target = "World"
full_greeting = greeting + ", " + target + "!"  # Concatenation
print(full_greeting)  # Output: Hello, World!

# String methods
text = "Python Programming"
print(text.upper())        # PYTHON PROGRAMMING
print(text.lower())        # python programming
print(text.replace("P", "J"))  # Jython Jrogramming
print(len(text))           # 19 (length of the string)</code></pre>
        </div>
    `;
    container.appendChild(stringSection);
    
    // Boolean type section
    const booleanSection = document.createElement('div');
    booleanSection.className = 'python-content-section';
    booleanSection.innerHTML = `
        <h4>Boolean Type (bool)</h4>
        <p>Booleans represent one of two values: True or False</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Boolean values
is_student = True
has_license = False

# Boolean operations
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

# Comparison operators return boolean values
x = 10
y = 20
print(x > y)   # False
print(x < y)   # True
print(x == y)  # False
print(x != y)  # True</code></pre>
        </div>
    `;
    container.appendChild(booleanSection);
    
    // Collection types section
    const collectionSection = document.createElement('div');
    collectionSection.className = 'python-content-section';
    collectionSection.innerHTML = `
        <h4>Collection Types</h4>
        <p>Python has several built-in collection types:</p>
        
        <div class="python-comparison">
            <table>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Example</th>
                </tr>
                <tr>
                    <td>List</td>
                    <td>Ordered, changeable collection</td>
                    <td>[1, 2, 3, "apple"]</td>
                </tr>
                <tr>
                    <td>Tuple</td>
                    <td>Ordered, unchangeable collection</td>
                    <td>(1, 2, 3, "apple")</td>
                </tr>
                <tr>
                    <td>Set</td>
                    <td>Unordered collection of unique items</td>
                    <td>{1, 2, 3, "apple"}</td>
                </tr>
                <tr>
                    <td>Dictionary</td>
                    <td>Collection of key-value pairs</td>
                    <td>{"name": "John", "age": 30}</td>
                </tr>
            </table>
        </div>
        
        <div class="python-code-example">
            <pre><code class="language-python"># List example
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
print(fruits[0])  # apple

# Dictionary example
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
print(person["name"])  # John</code></pre>
        </div>
    `;
    container.appendChild(collectionSection);
    
    // Type conversion section
    const conversionSection = document.createElement('div');
    conversionSection.className = 'python-content-section';
    conversionSection.innerHTML = `
        <h4>Type Conversion</h4>
        <p>You can convert between different data types:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Converting between types
num_str = "42"
num = int(num_str)  # Convert string to integer
print(num + 8)      # 50

float_num = float(num_str)  # Convert string to float
print(float_num)    # 42.0

back_to_str = str(num)  # Convert integer to string
print(back_to_str + " is the answer")  # "42 is the answer"

# Boolean conversion
print(bool(0))      # False
print(bool(1))      # True
print(bool(""))     # False
print(bool("Hello"))  # True</code></pre>
        </div>
    `;
    container.appendChild(conversionSection);
    
    // Type checking section
    const checkingSection = document.createElement('div');
    checkingSection.className = 'python-content-section';
    checkingSection.innerHTML = `
        <h4>Checking Data Types</h4>
        <p>You can check the type of a variable using the type() function:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Checking types
x = 10
y = "Hello"
z = [1, 2, 3]

print(type(x))  # <class 'int'>
print(type(y))  # <class 'str'>
print(type(z))  # <class 'list'>

# Check if variable is of a specific type
print(isinstance(x, int))     # True
print(isinstance(y, int))     # False
print(isinstance(y, str))     # True</code></pre>
        </div>
    `;
    container.appendChild(checkingSection);
    
    // Interactive section
    const interactiveSection = document.createElement('div');
    interactiveSection.className = 'python-interactive';
    interactiveSection.innerHTML = `
        <p>Try working with different data types:</p>
        
        <div class="python-code-example">
            <pre><code class="language-python"># Create variables of different types
name = "Python Learner"
score = 85
passing_grade = 70
passed = score > passing_grade
skills = ["Variables", "Data Types", "Operators"]

# Use the variables together
print(f"Student: {name}")
print(f"Score: {score}/100")
print(f"Passing grade: {passing_grade}/100")
print(f"Passed: {passed}")
print(f"Skills learned: {', '.join(skills)}")

if passed:
    print(f"Congratulations {name}! You passed with {score - passing_grade} points above the requirement.")
else:
    print(f"Sorry {name}, you need {passing_grade - score} more points to pass.")</code></pre>
        </div>
    `;
    container.appendChild(interactiveSection);
    
    // Final tip
    const tipSection = document.createElement('div');
    tipSection.className = 'python-tip';
    tipSection.innerHTML = `
        <h5>Beginner Tip</h5>
        <p>Understanding data types is crucial in Python. When you encounter errors, they're often related to using operations on incompatible data types. Always check your variable types if you're getting unexpected results!</p>
    `;
    container.appendChild(tipSection);
    
    return container;
}

// Add event listener to apply Python styling after lessons are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Listen for lesson content loading
    const originalLoadLessonContent = window.loadLessonContent;
    
    if (originalLoadLessonContent) {
        window.loadLessonContent = function(level, language) {
            // Call the original function first
            originalLoadLessonContent(level, language);
            
            // Then apply our enhanced styling for Python
            setTimeout(enhancedPythonLessons, 100);
        };
    }
});
