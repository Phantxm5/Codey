# Codey - Interactive Programming Learning Platform

## Project Overview
Codey is an interactive web application designed to help users learn programming languages through a structured, gamified approach similar to language learning platforms like Duolingo. The application offers multiple programming languages, a comprehensive level system, and interactive coding challenges.

## Live Demo
The application is deployed and accessible at: https://phantxm5.github.io/Codey/

## Features

### Core Features
- **Multiple Programming Languages**: HTML, CSS, JavaScript, Python, C/C++, and C#
- **Structured Learning Path**: Three tiers of learning (Beginner, Advanced, Master)
- **Level System**: 30 levels with progressive difficulty
- **Lesson System**: Multiple lessons per level with detailed explanations
- **Coding Challenges**: Special challenges at milestone levels (10, 20, 30)
- **XP and Progress Tracking**: Track learning progress with experience points
- **User Profiles**: Store languages, progress, and earned titles
- **Light/Dark Theme**: Toggle between light and dark mode (dark mode default)
- **Responsive Design**: Works on both desktop and mobile devices

### User Experience
- No account required for first-time visitors (guest mode)
- Sequential lesson navigation requiring users to read all lessons before completing a level
- Animations for level completion
- Comprehensive explanations focused on beginners
- Real-world project suggestions after milestone levels

## Project Structure

### HTML
- `index.html`: Main application file with all screens and UI components

### CSS
- `css/styles.css`: Main stylesheet with responsive design
- `css/themes.css`: Light and dark theme styles
- `css/components.css`: Reusable component styles

### JavaScript
- `js/app.js`: Core application functionality and initialization
- `js/auth.js`: User authentication and account management
- `js/languages.js`: Programming language selection and management
- `js/levels.js`: Level system implementation
- `js/lessons.js`: Lesson content and navigation
- `js/profile.js`: User profile management
- `js/themes.js`: Theme switching functionality
- `js/code-editor.js`: In-browser code editor for challenges

### Assets
- `assets/`: Contains application assets
- `images/`: Contains image files

## Implementation Details

### Data Storage
The application uses browser local storage to persist user data, including:
- User accounts and authentication
- Selected languages and progress
- Completed lessons and earned XP
- User preferences (theme)

### Level System
- **Levels 1-9**: Regular lessons focusing on knowledge explanation
- **Level 10**: First coding challenge (milestone)
- **Levels 11-19**: Intermediate lessons
- **Level 20**: Second coding challenge (milestone)
- **Levels 21-29**: Advanced lessons
- **Level 30**: Master coding challenge (milestone)

### Lesson Navigation
- Users must read through all lessons in a level before completing it
- "Next Lesson" button guides users through lessons sequentially
- Final lesson in each level has a "Complete Level" button
- Completing all lessons in a level unlocks the next level

## Development History
This project was developed iteratively with multiple rounds of user feedback:
1. Initial implementation with basic functionality
2. First round of improvements:
   - Enhanced lesson content for beginners
   - Implemented lesson pagination
   - Added guest mode
   - Made dark mode default
   - Added completion animations
3. Second round of improvements:
   - Modified lesson navigation to require reading all lessons
   - Fixed level unlocking issues
   - Implemented content for all languages
   - Improved homepage design
   - Removed browser notifications

## For Future Developers
If you're continuing development on this project, here are some areas for potential enhancement:

1. **Backend Integration**: Replace local storage with a proper backend database
2. **More Languages**: Add support for additional programming languages
3. **Enhanced Code Editor**: Improve the code validation and execution
4. **Community Features**: Add forums, comments, or social sharing
5. **Achievement System**: Expand the achievements and titles system
6. **Content Expansion**: Add more lessons and challenges
7. **Interactive Tutorials**: Add more interactive elements to lessons

## Technical Requirements
- Modern web browser with JavaScript enabled
- No server-side requirements (static website)
- No external dependencies or API keys needed

## Contact
This project was developed as part of a collaborative effort. For questions or further development, please contact the repository owner.
