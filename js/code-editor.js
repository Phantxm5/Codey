// Code editor functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize code editor
    initCodeEditor();
});

// Initialize code editor
function initCodeEditor() {
    const codeEditor = document.getElementById('code-editor');
    if (!codeEditor) return;
    
    // Add basic syntax highlighting (simplified version)
    codeEditor.addEventListener('input', function() {
        highlightSyntax(codeEditor);
    });
    
    // Add tab key support
    codeEditor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            // Insert tab at cursor position
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
            
            // Move cursor after the inserted tab
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
}

// Simple syntax highlighting (this is a basic implementation)
function highlightSyntax(editor) {
    // In a real application, you would use a library like CodeMirror or Prism.js
    // This is a simplified version for demonstration purposes
    
    // For a complete implementation, consider integrating CodeMirror:
    // https://codemirror.net/
}

// Run code from the editor
function runCodeFromEditor() {
    const codeEditor = document.getElementById('code-editor');
    const codeOutput = document.getElementById('code-output');
    
    if (!codeEditor || !codeOutput) return;
    
    const code = codeEditor.value;
    
    // This is a simplified simulation of code execution
    codeOutput.innerHTML = '<p>Running code...</p>';
    
    // Simulate processing time
    setTimeout(() => {
        try {
            // For demonstration purposes only
            // In a real application, you would need a secure way to execute code
            
            // Simulate output
            codeOutput.innerHTML = '<p class="success">Code executed successfully!</p>';
            codeOutput.innerHTML += '<pre>Program output would appear here in a real environment.</pre>';
        } catch (error) {
            codeOutput.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    }, 1000);
}
