// Code highlighting integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Prism.js after the page loads
    initCodeHighlighting();
});

// Initialize code highlighting
function initCodeHighlighting() {
    // Add Prism.js CSS link to head if not already added
    if (!document.querySelector('link[href="css/prism.css"]')) {
        const prismCssLink = document.createElement('link');
        prismCssLink.rel = 'stylesheet';
        prismCssLink.href = 'css/prism.css';
        document.head.appendChild(prismCssLink);
    }
    
    // Apply syntax highlighting to existing code elements
    highlightCodeElements();
    
    // Override the createLanguageCard function to include syntax highlighting
    overrideLanguageCardCreation();
}

// Apply syntax highlighting to all code elements
function highlightCodeElements() {
    // Find all code preview elements
    const codeElements = document.querySelectorAll('.code-preview pre');
    
    // Add appropriate language class and apply Prism highlighting
    codeElements.forEach(codeElement => {
        const parentCard = codeElement.closest('.language-card');
        if (parentCard) {
            const languageId = parentCard.dataset.language;
            if (languageId) {
                // Map language IDs to Prism language classes
                const languageClass = getLanguageClass(languageId);
                codeElement.className = `language-${languageClass}`;
                
                // Apply Prism highlighting
                Prism.highlightElement(codeElement);
            }
        }
    });
}

// Map Codey language IDs to Prism language classes
function getLanguageClass(languageId) {
    const languageMap = {
        'html': 'markup',
        'css': 'css',
        'javascript': 'javascript',
        'python': 'python',
        'csharp': 'csharp',
        'cpp': 'cpp',
        'setup': 'markup' // Default to markup for setup
    };
    
    return languageMap[languageId] || 'markup';
}

// Override the language card creation functions to include syntax highlighting
function overrideLanguageCardCreation() {
    // Store original functions
    const originalLoadEnhancedLanguages = window.loadEnhancedLanguages;
    const originalLoadEnhancedUserLanguages = window.loadEnhancedUserLanguages;
    
    // Override loadEnhancedLanguages if it exists
    if (typeof originalLoadEnhancedLanguages === 'function') {
        window.loadEnhancedLanguages = function() {
            // Call original function
            originalLoadEnhancedLanguages.apply(this, arguments);
            
            // Apply syntax highlighting to new elements
            setTimeout(highlightCodeElements, 100);
        };
    }
    
    // Override loadEnhancedUserLanguages if it exists
    if (typeof originalLoadEnhancedUserLanguages === 'function') {
        window.loadEnhancedUserLanguages = function() {
            // Call original function
            originalLoadEnhancedUserLanguages.apply(this, arguments);
            
            // Apply syntax highlighting to new elements
            setTimeout(highlightCodeElements, 100);
        };
    }
    
    // Add mutation observer to detect dynamically added code elements
    const observer = new MutationObserver(function(mutations) {
        let shouldHighlight = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && (
                        node.classList.contains('code-preview') || 
                        node.querySelector('.code-preview')
                    )) {
                        shouldHighlight = true;
                    }
                });
            }
        });
        
        if (shouldHighlight) {
            highlightCodeElements();
        }
    });
    
    // Start observing the document body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });
}

// Create a code snippet element with syntax highlighting
function createHighlightedCodeSnippet(code, languageId) {
    const codePreview = document.createElement('div');
    codePreview.className = 'code-preview';
    
    const languageTag = document.createElement('span');
    languageTag.className = 'language-tag';
    languageTag.textContent = getLanguageName(languageId);
    
    const pre = document.createElement('pre');
    const codeElement = document.createElement('code');
    codeElement.className = `language-${getLanguageClass(languageId)}`;
    codeElement.textContent = code;
    
    pre.appendChild(codeElement);
    codePreview.appendChild(languageTag);
    codePreview.appendChild(pre);
    
    // Apply Prism highlighting
    Prism.highlightElement(codeElement);
    
    return codePreview;
}

// Get language name from ID
function getLanguageName(languageId) {
    const languageNames = {
        'html': 'HTML',
        'css': 'CSS',
        'javascript': 'JavaScript',
        'python': 'Python',
        'csharp': 'C#',
        'cpp': 'C/C++',
        'setup': 'Setup'
    };
    
    return languageNames[languageId] || languageId;
}

// Add custom styles for code highlighting
function addCodeHighlightingStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .code-preview {
            position: relative;
            margin-top: 1rem;
            border-radius: 8px;
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .language-card:hover .code-preview {
            max-height: 200px;
            opacity: 1;
            margin-top: 1rem;
        }
        
        .code-preview pre {
            margin: 0;
            padding: 1rem;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            background-color: #2d2d2d;
            color: #ccc;
            border-radius: 8px;
            overflow-x: auto;
        }
        
        .code-preview .language-tag {
            position: absolute;
            top: 0;
            right: 0;
            background-color: var(--language-color, var(--primary-color));
            color: white;
            font-size: 0.7rem;
            padding: 0.2rem 0.5rem;
            border-radius: 0 0 0 8px;
            z-index: 10;
        }
        
        /* Language-specific token colors */
        .language-html .token.tag {
            color: #e34c26;
        }
        
        .language-css .token.property {
            color: #264de4;
        }
        
        .language-javascript .token.keyword {
            color: #f0db4f;
        }
        
        .language-python .token.keyword {
            color: #306998;
        }
        
        .language-csharp .token.keyword {
            color: #9b4f96;
        }
        
        .language-cpp .token.keyword {
            color: #00599c;
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Call the function to add custom styles
addCodeHighlightingStyles();
