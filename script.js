document.addEventListener('DOMContentLoaded', function() {
    // Random background selection - avoid showing the same image twice in a row
    const backgrounds = [
        'backgrounds/background.png',
        'backgrounds/background2.png',
        'backgrounds/background3.png',
        'backgrounds/background4.png'
    ];
    
    const lastBackground = localStorage.getItem('lastBackground');
    let availableBackgrounds = backgrounds;
    
    // Filter out the last shown background if there's more than one option
    if (lastBackground && backgrounds.length > 1) {
        availableBackgrounds = backgrounds.filter(bg => bg !== lastBackground);
    }
    
    // Select a random background from available options
    const randomBackground = availableBackgrounds[Math.floor(Math.random() * availableBackgrounds.length)];
    
    // Store the selected background
    localStorage.setItem('lastBackground', randomBackground);
    
    // Set the image
    const bgImage = document.getElementById('backgroundImage');
    if (bgImage) {
        bgImage.src = randomBackground;
    }

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const engineSelect = document.getElementById('engineSelect');

    // Load saved search engine preference
    const savedEngine = localStorage.getItem('searchEngine');
    if (savedEngine) {
        engineSelect.value = savedEngine;
    }

    // Save search engine preference when changed
    engineSelect.addEventListener('change', function() {
        localStorage.setItem('searchEngine', engineSelect.value);
    });

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const query = searchInput.value.trim();
        const engine = engineSelect.value;
        
        if (query === '') {
            searchInput.focus();
            return;
        }

        let searchUrl = '';
        
        if (engine === 'yahoo') {
            searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
        } else if (engine === 'google') {
            searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        // Redirect in the same tab
        window.location.href = searchUrl;
    });

    // Focus on search input when page loads
    searchInput.focus();

    // Add keyboard shortcut (Ctrl/Cmd + K) to focus search
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });
});
