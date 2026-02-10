document.addEventListener('DOMContentLoaded', async function() {
    let apiData = null;
    
    // Fetch API data (backgrounds and yahoo_link)
    try {
        const response = await fetch('https://80search-api-gilt.vercel.app/api/backgrounds');
        apiData = await response.json();
        
        // Set random background
        const bgImage = document.getElementById('backgroundImage');
        if (bgImage && apiData.backgrounds && apiData.backgrounds.length > 0) {
            const randomBackground = apiData.backgrounds[Math.floor(Math.random() * apiData.backgrounds.length)];
            bgImage.src = randomBackground.url;
        }
    } catch (error) {
        console.error('Failed to fetch API data:', error);
        // Fallback to a default background if API fails
        const bgImage = document.getElementById('backgroundImage');
        if (bgImage) {
            bgImage.src = 'backgrounds/background.png';
        }
    }

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const engineSelect = document.getElementById('engineSelect');

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
            // Use yahoo_link from API if available, otherwise fallback
            if (apiData && apiData.yahoo_link) {
                searchUrl = apiData.yahoo_link.replace('{query_here}', encodeURIComponent(query));
            } else {
                searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
            }
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
