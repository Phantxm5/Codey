# CodeLingo Website Structure and UI Design

## Overall Layout

The CodeLingo application will follow a modern, minimalist design with a responsive layout that works well on both desktop and mobile devices. The layout will include:

1. **Header** - Contains the logo, navigation links, and theme toggle
2. **Main Content Area** - Changes based on the current screen (home, language selection, learning, levels, profile)
3. **Footer** - Contains copyright information

## Color Scheme

- **Primary Color**: #4a6ee0 (Blue)
- **Secondary Colors**: 
  - #6c757d (Gray)
  - #28a745 (Green for success)
  - #dc3545 (Red for errors)
  - #ffc107 (Yellow for warnings)
  - #17a2b8 (Teal for info)

- **Light Theme**:
  - Background: #f8f9fa
  - Text: #343a40
  - Cards/Elements: #ffffff
  - Borders: #dee2e6

- **Dark Theme**:
  - Background: #343a40
  - Text: #f8f9fa
  - Cards/Elements: #495057
  - Borders: #6c757d

## Wireframes for Main Pages

### Home Screen
```
+------------------------------------------+
|  LOGO           Home | Profile   [Theme] |
+------------------------------------------+
|                                          |
|  Your Languages                          |
|                                          |
|  +--------+  +--------+  +--------+     |
|  | HTML   |  | CSS    |  | Python |     |
|  | Lvl 3  |  | Lvl 1  |  | Lvl 5  |     |
|  | 250 XP |  | 50 XP  |  | 480 XP |     |
|  +--------+  +--------+  +--------+     |
|                                          |
|  [+ Add New Language]                    |
|                                          |
+------------------------------------------+
|  © 2025 CodeLingo                        |
+------------------------------------------+
```

### Language Selection Screen
```
+------------------------------------------+
|  LOGO           Home | Profile   [Theme] |
+------------------------------------------+
|                                          |
|  Choose a Language                       |
|                                          |
|  +--------+  +--------+  +--------+     |
|  | HTML   |  | CSS    |  | JS     |     |
|  |        |  |        |  |        |     |
|  |        |  |        |  |        |     |
|  +--------+  +--------+  +--------+     |
|                                          |
|  +--------+  +--------+  +--------+     |
|  | Python |  | C#     |  | C/C++  |     |
|  |        |  |        |  |        |     |
|  |        |  |        |  |        |     |
|  +--------+  +--------+  +--------+     |
|                                          |
|  +--------+                              |
|  | Setup  |                              |
|  | Tutorial|                             |
|  |        |                              |
|  +--------+                              |
|                                          |
|  [< Back]                                |
|                                          |
+------------------------------------------+
|  © 2025 CodeLingo                        |
+------------------------------------------+
```

### Levels Screen
```
+------------------------------------------+
|  LOGO           Home | Profile   [Theme] |
+------------------------------------------+
|                                          |
|  Python                                  |
|  [Progress Bar] 480 XP - Level 5         |
|                                          |
|  Beginner Levels (1-10)                  |
|  +---+ +---+ +---+ +---+ +---+          |
|  | 1 | | 2 | | 3 | | 4 | | 5 |          |
|  +---+ +---+ +---+ +---+ +---+          |
|                                          |
|  +---+ +---+ +---+ +---+ +---+          |
|  | 6 | | 7 | | 8 | | 9 | |10*|          |
|  +---+ +---+ +---+ +---+ +---+          |
|                                          |
|  Advanced Levels (11-20)                 |
|  +----+ +----+ +----+ +----+ +----+     |
|  | 11 | | 12 | | 13 | | 14 | | 15 |     |
|  +----+ +----+ +----+ +----+ +----+     |
|                                          |
|  +----+ +----+ +----+ +----+ +----+     |
|  | 16 | | 17 | | 18 | | 19 | |20* |     |
|  +----+ +----+ +----+ +----+ +----+     |
|                                          |
|  Master Levels (21-31)                   |
|  +----+ +----+ +----+ +----+ +----+     |
|  | 21 | | 22 | | 23 | | 24 | | 25 |     |
|  +----+ +----+ +----+ +----+ +----+     |
|                                          |
|  +----+ +----+ +----+ +----+ +----+     |
|  | 26 | | 27 | | 28 | | 29 | |30* |     |
|  +----+ +----+ +----+ +----+ +----+     |
|                                          |
|  +----+                                  |
|  | 31 |                                  |
|  +----+                                  |
|                                          |
|  [< Back to Home]                        |
|                                          |
+------------------------------------------+
|  © 2025 CodeLingo                        |
+------------------------------------------+
```

### Learning Screen (Regular Lesson)
```
+------------------------------------------+
|  LOGO           Home | Profile   [Theme] |
+------------------------------------------+
|                                          |
|  Python                                  |
|  [Progress Bar] 480 XP - Level 5         |
|                                          |
|  Lesson 5.1: Input/Output and Debugging  |
|                                          |
|  +--------------------------------------+|
|  |                                      ||
|  | Lesson content goes here...          ||
|  |                                      ||
|  | This would include explanations,     ||
|  | examples, and interactive elements.  ||
|  |                                      ||
|  +--------------------------------------+|
|                                          |
|  [< Back to Levels]       [Complete >]   |
|                                          |
+------------------------------------------+
|  © 2025 CodeLingo                        |
+------------------------------------------+
```

### Learning Screen (Coding Challenge)
```
+------------------------------------------+
|  LOGO           Home | Profile   [Theme] |
+------------------------------------------+
|                                          |
|  Python                                  |
|  [Progress Bar] 980 XP - Level 10        |
|                                          |
|  Coding Challenge - Level 10             |
|                                          |
|  +--------------------------------------+|
|  | Challenge description goes here...   ||
|  |                                      ||
|  | Requirements:                        ||
|  | - Requirement 1                      ||
|  | - Requirement 2                      ||
|  | - Requirement 3                      ||
|  +--------------------------------------+|
|                                          |
|  +--------------------------------------+|
|  | // Write your code here              ||
|  |                                      ||
|  | function processData(data) {         ||
|  |   // Your implementation             ||
|  |                                      ||
|  |   return result;                     ||
|  | }                                    ||
|  +--------------------------------------+|
|                                          |
|  [Run Code]                              |
|                                          |
|  +--------------------------------------+|
|  | Code output appears here...          ||
|  +--------------------------------------+|
|                                          |
|  [< Back to Levels]       [Complete >]   |
|                                          |
+------------------------------------------+
|  © 2025 CodeLingo                        |
+------------------------------------------+
```

### Profile Screen
```
+------------------------------------------+
|  LOGO           Home | Profile   [Theme] |
+------------------------------------------+
|                                          |
|  Your Profile                            |
|                                          |
|  Username: JohnDoe                       |
|  Account Created: March 15, 2025         |
|  Total XP: 1,250                         |
|                                          |
|  Your Languages                          |
|  +--------------------------------------+|
|  | HTML - Level 3 - 250 XP              ||
|  | CSS - Level 1 - 50 XP                ||
|  | Python - Level 5 - 480 XP            ||
|  | JavaScript - Level 4 - 370 XP        ||
|  | C# - Level 1 - 100 XP                ||
|  +--------------------------------------+|
|                                          |
|  Titles Earned                           |
|  +--------------------------------------+|
|  | 🏆 HTML Master                       ||
|  +--------------------------------------+|
|                                          |
|  [Logout]                                |
|                                          |
+------------------------------------------+
|  © 2025 CodeLingo                        |
+------------------------------------------+
```

### Login/Register Screen
```
+------------------------------------------+
|  LOGO                            [Theme] |
+------------------------------------------+
|                                          |
|  +--------------------------------------+|
|  | [Login] | [Register]                 ||
|  +--------------------------------------+|
|                                          |
|  +--------------------------------------+|
|  | Username:                            ||
|  | [                    ]               ||
|  |                                      ||
|  | Password:                            ||
|  | [                    ]               ||
|  |                                      ||
|  | [Login]                              ||
|  +--------------------------------------+|
|                                          |
+------------------------------------------+
|  © 2025 CodeLingo                        |
+------------------------------------------+
```

## Responsive Design Considerations

- For mobile devices, the navigation will collapse into a hamburger menu
- Language and level cards will stack vertically on smaller screens
- Font sizes will adjust based on screen size
- Touch-friendly buttons and interactive elements
- Simplified layouts for smaller screens

## UI Components

1. **Language Cards**
   - Display language icon, name, level, and XP
   - Visual progress indicator
   - Clickable to access levels

2. **Level Cards**
   - Display level number and title
   - Visual indicators for locked/unlocked status
   - Special styling for milestone levels (10, 20, 30)

3. **Lesson Content**
   - Clear typography for readability
   - Code snippets with syntax highlighting
   - Interactive elements where appropriate

4. **Code Editor**
   - Simple textarea with basic syntax highlighting
   - Run button to simulate code execution
   - Output display area

5. **Navigation**
   - Clear, consistent navigation between screens
   - Breadcrumb-style navigation for deeper screens
   - Back buttons where appropriate

6. **Theme Toggle**
   - Accessible button to switch between light and dark themes
   - Visual indicator of current theme

This design focuses on creating a clean, intuitive interface that guides users through the learning process while maintaining a modern aesthetic that works across different devices.
