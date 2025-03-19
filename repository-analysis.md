# Codey Repository Analysis

## Project Overview
Codey is an interactive web application designed to help users learn programming languages through a structured, gamified approach similar to language learning platforms like Duolingo. The application offers multiple programming languages, a comprehensive level system, and interactive coding challenges.

## Repository Structure
- **HTML**: Single page application with all UI components in index.html
- **CSS**: Multiple stylesheets for different components and themes
- **JavaScript**: Modular JS files handling different application features

### CSS Files
- `styles.css`: Main stylesheet with responsive design
- `themes.css`: Light and dark theme styles
- `components.css`: Reusable component styles
- `enhanced-styles.css`: Additional styling
- `python-lessons.css`: Python-specific lesson styling
- `prism.css`: Code syntax highlighting
- `disabled-languages.css`: Styling for disabled language options

### JavaScript Files
- `app.js`: Core application functionality and initialization
- `auth.js`: User authentication and account management
- `languages.js` & `enhanced-languages.js`: Programming language selection and management
- `levels.js`: Level system implementation
- `lessons.js` & `python-lessons.js`: Lesson content and navigation
- `profile.js`: User profile management
- `themes.js`: Theme switching functionality
- `code-editor.js` & `code-highlighting.js`: In-browser code editor for challenges
- `prism.js`: Code syntax highlighting library

## Key Features
- Multiple programming languages (HTML, CSS, JavaScript, Python, C/C++, C#)
- Three-tier learning path (Beginner, Advanced, Master)
- 30-level progression system with milestone challenges
- XP and progress tracking
- User profiles with local storage
- Light/Dark theme toggle
- Responsive design for desktop and mobile

## Implementation Details
- Browser local storage for data persistence
- No backend requirements (static website)
- Sequential lesson navigation
- Milestone coding challenges at levels 10, 20, and 30
