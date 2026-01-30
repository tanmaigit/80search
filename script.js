document.addEventListener('DOMContentLoaded', function() {
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
