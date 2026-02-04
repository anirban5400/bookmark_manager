/**
 * Bookmark Manager - Main Application Logic
 * Neumorphic UI with IndexedDB storage and auto-fetch metadata
 */

// DOM Elements
const addBookmarkForm = document.getElementById('addBookmarkForm');
const urlInput = document.getElementById('urlInput');
const titleInput = document.getElementById('titleInput');
const descInput = document.getElementById('descInput');
const searchInput = document.getElementById('searchInput');
const bookmarksContainer = document.getElementById('bookmarksContainer');
const bookmarkCount = document.getElementById('bookmarkCount');
const themeToggle = document.getElementById('themeToggle');
const loadingState = document.getElementById('loadingState');
const addToggleBtn = document.getElementById('addToggleBtn');
const fetchStatus = document.getElementById('fetchStatus');

// Status indicator elements
const dateTimeDisplay = document.getElementById('dateTimeDisplay');
const timeText = document.getElementById('timeText');
const timeIcon = document.getElementById('timeIcon');
const networkStatus = document.getElementById('networkStatus');
const networkIcon = document.getElementById('networkIcon');
const memoryStatus = document.getElementById('memoryStatus');
const memoryText = document.getElementById('memoryText');

// Settings modal elements
const settingsToggle = document.getElementById('settingsToggle');
const settingsModal = document.getElementById('settingsModal');
const settingsClose = document.getElementById('settingsClose');
const showDateTimeCheckbox = document.getElementById('showDateTime');
const showNetworkCheckbox = document.getElementById('showNetwork');
const showMemoryCheckbox = document.getElementById('showMemory');
const timezoneSelect = document.getElementById('timezoneSelect');

// State
let allBookmarks = [];
let isFormVisible = false;
let fetchedMetadata = null;

// Settings state (with defaults)
let settings = {
    showDateTime: true,
    showNetwork: true,
    showMemory: true,
    timezone: 'local'
};

/**
 * Initialize the application
 */
async function init() {
    try {
        // Initialize database
        await bookmarkDB.init();
        
        // Load theme preference
        loadTheme();
        
        // Load settings
        loadSettings();
        
        // Load bookmarks
        await loadBookmarks();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize status indicators
        initStatusIndicators();
    } catch (error) {
        console.error('Failed to initialize:', error);
        showToast('Failed to initialize app', 'error');
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Form submission
    addBookmarkForm.addEventListener('submit', handleAddBookmark);
    
    // URL input - auto-fetch on blur or paste
    urlInput.addEventListener('blur', handleUrlBlur);
    urlInput.addEventListener('paste', handleUrlPaste);
    
    // Search input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e.target.value.trim());
        }, 300);
    });
    
    // Delete button clicks (event delegation)
    bookmarksContainer.addEventListener('click', handleContainerClick);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add form toggle button
    if (addToggleBtn) {
        addToggleBtn.addEventListener('click', toggleAddForm);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Settings modal events
    if (settingsToggle) {
        settingsToggle.addEventListener('click', openSettingsModal);
    }
    if (settingsClose) {
        settingsClose.addEventListener('click', closeSettingsModal);
    }
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) closeSettingsModal();
        });
    }
    
    // Settings change events
    if (showDateTimeCheckbox) {
        showDateTimeCheckbox.addEventListener('change', handleSettingsChange);
    }
    if (showNetworkCheckbox) {
        showNetworkCheckbox.addEventListener('change', handleSettingsChange);
    }
    if (showMemoryCheckbox) {
        showMemoryCheckbox.addEventListener('change', handleSettingsChange);
    }
    if (timezoneSelect) {
        timezoneSelect.addEventListener('change', handleSettingsChange);
    }
}

/**
 * Handle keyboard shortcuts
 * Ctrl/Cmd + K = Focus search
 * Ctrl/Cmd + N = Toggle add new bookmark form
 */
function handleKeyboardShortcuts(e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifierKey = isMac ? e.metaKey : e.ctrlKey;
    
    // Ctrl/Cmd + K = Focus search
    if (modifierKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
    }
    
    // Ctrl/Cmd + N = Toggle add new bookmark form
    if (modifierKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        toggleAddForm();
        // If form is now visible, focus URL input
        if (isFormVisible) {
            setTimeout(() => urlInput.focus(), 100);
        }
    }
    
    // Escape = Close add form if open
    if (e.key === 'Escape' && isFormVisible) {
        toggleAddForm();
    }
}

/**
 * Toggle the add bookmark form visibility
 */
function toggleAddForm() {
    isFormVisible = !isFormVisible;
    
    if (isFormVisible) {
        addBookmarkForm.classList.remove('hidden');
        addToggleBtn.classList.add('active');
        // Focus on URL input after animation
        setTimeout(() => urlInput.focus(), 300);
    } else {
        addBookmarkForm.classList.add('hidden');
        addToggleBtn.classList.remove('active');
        // Reset fetch status
        setFetchStatus('', '');
        fetchedMetadata = null;
    }
}

/**
 * Handle URL blur event - fetch metadata if URL is valid
 */
async function handleUrlBlur() {
    const url = urlInput.value.trim();
    if (url && isValidUrl(url)) {
        await fetchMetadataForUrl(url);
    }
}

/**
 * Handle URL paste event - fetch metadata after a short delay
 */
function handleUrlPaste() {
    setTimeout(async () => {
        const url = urlInput.value.trim();
        if (url && isValidUrl(url)) {
            await fetchMetadataForUrl(url);
        }
    }, 100);
}

/**
 * Check if a string is a valid URL
 */
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}

/**
 * Fetch metadata for a URL using the background service worker (with fallback)
 */
async function fetchMetadataForUrl(url) {
    // Don't fetch if fields are already filled
    if (titleInput.value.trim() && descInput.value.trim()) {
        return;
    }
    
    setFetchStatus('Fetching metadata...', 'loading');
    
    try {
        let metadata = null;
        
        // Try using background service worker first
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
            try {
                const response = await chrome.runtime.sendMessage({
                    action: 'fetchMetadata',
                    url: url
                });
                
                if (response && response.success) {
                    metadata = response.data;
                }
            } catch (bgError) {
                console.log('Background fetch failed, trying direct fetch:', bgError.message);
            }
        }
        
        // Fallback: Try direct fetch (may fail due to CORS, but works for some sites)
        if (!metadata) {
            metadata = await tryDirectFetch(url);
        }
        
        if (metadata) {
            fetchedMetadata = metadata;
            
            // Auto-fill title if empty
            if (!titleInput.value.trim() && metadata.title) {
                titleInput.value = metadata.title;
            }
            
            // Auto-fill description if empty
            if (!descInput.value.trim() && metadata.description) {
                descInput.value = metadata.description;
            }
            
            setFetchStatus('✓ Fetched!', 'success');
            setTimeout(() => setFetchStatus('', ''), 2000);
        } else {
            // Use fallback title from URL
            if (!titleInput.value.trim()) {
                const parsedUrl = new URL(url);
                titleInput.value = parsedUrl.hostname.replace('www.', '');
            }
            setFetchStatus('Using URL as title', 'success');
            setTimeout(() => setFetchStatus('', ''), 2000);
        }
    } catch (error) {
        console.error('Failed to fetch metadata:', error);
        // Still set a fallback title
        if (!titleInput.value.trim()) {
            try {
                const parsedUrl = new URL(url);
                titleInput.value = parsedUrl.hostname.replace('www.', '');
            } catch {}
        }
        setFetchStatus('', '');
    }
}

/**
 * Try to fetch metadata directly (fallback when background script unavailable)
 */
async function tryDirectFetch(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(url, {
            method: 'GET',
            signal: controller.signal,
            headers: {
                'Accept': 'text/html'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            return null;
        }
        
        const html = await response.text();
        return parseHtmlMetadata(html, url);
    } catch (error) {
        // CORS or network error - this is expected for most sites
        console.log('Direct fetch failed (expected for most sites):', error.message);
        return null;
    }
}

/**
 * Parse HTML string to extract title and description
 */
function parseHtmlMetadata(html, url) {
    let title = '';
    let description = '';
    
    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
        title = decodeHtmlEntities(titleMatch[1].trim());
    }
    
    // Try og:title if no title
    if (!title) {
        const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ||
                             html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:title["']/i);
        if (ogTitleMatch && ogTitleMatch[1]) {
            title = decodeHtmlEntities(ogTitleMatch[1].trim());
        }
    }
    
    // Fallback to hostname
    if (!title) {
        try {
            title = new URL(url).hostname.replace('www.', '');
        } catch {
            title = url;
        }
    }
    
    // Extract description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    if (descMatch && descMatch[1]) {
        description = decodeHtmlEntities(descMatch[1].trim());
    }
    
    // Try og:description
    if (!description) {
        const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i) ||
                            html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:description["']/i);
        if (ogDescMatch && ogDescMatch[1]) {
            description = decodeHtmlEntities(ogDescMatch[1].trim());
        }
    }
    
    // Limit description length
    if (description.length > 200) {
        description = description.substring(0, 197) + '...';
    }
    
    return { title, description };
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text) {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
        .replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/**
 * Set the fetch status indicator
 */
function setFetchStatus(message, type) {
    if (fetchStatus) {
        fetchStatus.textContent = message;
        fetchStatus.className = 'fetch-status';
        if (type) {
            fetchStatus.classList.add(type);
        }
    }
}

/**
 * Handle adding a new bookmark
 */
async function handleAddBookmark(event) {
    event.preventDefault();
    
    const url = urlInput.value.trim();
    let title = titleInput.value.trim();
    let description = descInput.value.trim();
    
    // Validate URL
    if (!url) {
        showToast('Please enter a URL', 'error');
        return;
    }
    
    let faviconUrl = 'icon16.png'; // Fallback
    let parsedUrl;
    
    try {
        parsedUrl = new URL(url);
        faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${parsedUrl.hostname}`;
    } catch (e) {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    // Use fetched metadata if fields are empty
    if (!title) {
        if (fetchedMetadata && fetchedMetadata.title) {
            title = fetchedMetadata.title;
        } else {
            // Fallback to hostname
            title = parsedUrl.hostname.replace('www.', '');
        }
    }
    
    if (!description && fetchedMetadata && fetchedMetadata.description) {
        description = fetchedMetadata.description;
    }
    
    try {
        // Add to database
        await bookmarkDB.addBookmark({
            title: title,
            url: url,
            description: description,
            favicon: faviconUrl
        });
        
        // Clear form
        addBookmarkForm.reset();
        fetchedMetadata = null;
        setFetchStatus('', '');
        urlInput.focus();
        
        // Reload bookmarks
        await loadBookmarks();
        
        showToast('Bookmark added successfully!', 'success');
    } catch (error) {
        console.error('Failed to add bookmark:', error);
        showToast('Failed to add bookmark', 'error');
    }
}

/**
 * Load all bookmarks from database
 */
async function loadBookmarks() {
    try {
        showLoading(true);
        allBookmarks = await bookmarkDB.getAllBookmarks();
        renderBookmarks(allBookmarks);
        updateCount(allBookmarks.length);
    } catch (error) {
        console.error('Failed to load bookmarks:', error);
        showToast('Failed to load bookmarks', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Render bookmarks to the UI (XSS-safe with Neumorphic design)
 */
function renderBookmarks(bookmarks) {
    // Clear container
    bookmarksContainer.innerHTML = '';
    
    // Show empty state if no bookmarks
    if (bookmarks.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div class="icon">📚</div>
            <h3>No bookmarks yet</h3>
            <p>Add your first bookmark using the form above!</p>
        `;
        bookmarksContainer.appendChild(emptyState);
        return;
    }
    
    // Render each bookmark (XSS-safe using textContent)
    bookmarks.forEach((bookmark, index) => {
        const card = document.createElement('div');
        card.className = 'bookmark-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        // Favicon wrapper (Neumorphic circle)
        const faviconWrapper = document.createElement('div');
        faviconWrapper.className = 'favicon-wrapper';
        
        // Favicon image (with error fallback)
        const favicon = document.createElement('img');
        favicon.className = 'favicon';
        favicon.src = bookmark.favicon;
        favicon.alt = 'Favicon';
        favicon.onerror = function() {
            this.src = 'icon16.png';
        };
        faviconWrapper.appendChild(favicon);
        
        // Bookmark info container
        const info = document.createElement('div');
        info.className = 'bookmark-info';
        
        // Title link (XSS-safe)
        const link = document.createElement('a');
        link.href = bookmark.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = bookmark.title; // Safe - uses textContent
        link.title = bookmark.title;
        
        // URL display
        const urlDisplay = document.createElement('div');
        urlDisplay.className = 'bookmark-url';
        try {
            urlDisplay.textContent = new URL(bookmark.url).hostname;
        } catch {
            urlDisplay.textContent = bookmark.url;
        }
        
        info.appendChild(link);
        info.appendChild(urlDisplay);
        
        // Show description if available
        if (bookmark.description) {
            const descDisplay = document.createElement('div');
            descDisplay.className = 'bookmark-desc';
            descDisplay.textContent = bookmark.description;
            info.appendChild(descDisplay);
        }
        
        // Delete button (Neumorphic circle)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.dataset.id = bookmark.id; // Use unique ID, not array index!
        deleteBtn.textContent = '✕';
        deleteBtn.title = 'Delete bookmark';
        
        // Assemble card
        card.appendChild(faviconWrapper);
        card.appendChild(info);
        card.appendChild(deleteBtn);
        
        bookmarksContainer.appendChild(card);
    });
}

/**
 * Handle clicks on the container (event delegation)
 */
async function handleContainerClick(event) {
    const deleteBtn = event.target.closest('.delete-btn');
    
    if (deleteBtn) {
        const id = parseInt(deleteBtn.dataset.id, 10);
        await deleteBookmark(id);
    }
}

/**
 * Delete a bookmark by ID
 */
async function deleteBookmark(id) {
    try {
        await bookmarkDB.deleteBookmark(id);
        await loadBookmarks();
        showToast('Bookmark deleted', 'success');
    } catch (error) {
        console.error('Failed to delete bookmark:', error);
        showToast('Failed to delete bookmark', 'error');
    }
}

/**
 * Handle search functionality
 */
async function handleSearch(query) {
    if (!query) {
        renderBookmarks(allBookmarks);
        updateCount(allBookmarks.length);
        return;
    }
    
    try {
        const filtered = await bookmarkDB.searchBookmarks(query);
        renderBookmarks(filtered);
        updateCount(filtered.length, allBookmarks.length);
    } catch (error) {
        console.error('Search failed:', error);
    }
}

/**
 * Update the bookmark count display
 */
function updateCount(count, total = null) {
    if (total !== null && count !== total) {
        bookmarkCount.textContent = `${count} of ${total}`;
    } else {
        bookmarkCount.textContent = count;
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
    
    // Add press animation
    themeToggle.style.boxShadow = 'inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light)';
    setTimeout(() => {
        themeToggle.style.boxShadow = '';
    }, 150);
}

/**
 * Update the theme toggle icon
 */
function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        // Show sun in dark mode (to switch to light), moon in light mode (to switch to dark)
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

/**
 * Load saved theme preference
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

/**
 * Show/hide loading state
 */
function showLoading(show) {
    if (loadingState) {
        loadingState.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Show toast notification (Neumorphic style)
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : '✕';
    toast.textContent = `${icon} ${message}`;
    
    container.appendChild(toast);
    
    // Remove after animation
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Initialize status indicators (time, network, memory)
 */
function initStatusIndicators() {
    // Update time immediately and every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Update network status
    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateNetworkStatus);
    }
    
    // Update memory every 5 seconds
    updateMemory();
    setInterval(updateMemory, 5000);
}

/**
 * Update time display
 */
function updateTime() {
    if (!timeText || !settings.showDateTime) return;
    
    const now = new Date();
    let hours, minutes;
    
    // Handle timezone
    if (settings.timezone === 'local') {
        hours = now.getHours();
        minutes = now.getMinutes();
    } else {
        // Use Intl.DateTimeFormat for timezone conversion
        try {
            const options = { 
                timeZone: settings.timezone, 
                hour: 'numeric', 
                minute: '2-digit', 
                hour12: false 
            };
            const formatter = new Intl.DateTimeFormat('en-US', options);
            const parts = formatter.formatToParts(now);
            hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
            minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
        } catch (e) {
            // Fallback to local time
            hours = now.getHours();
            minutes = now.getMinutes();
        }
    }
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const minutesStr = minutes.toString().padStart(2, '0');
    
    timeText.textContent = `${displayHours}:${minutesStr} ${ampm}`;
    
    // Update clock icon based on hour
    if (timeIcon) {
        const clockIcons = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'];
        timeIcon.textContent = clockIcons[hours % 12];
    }
    
    // Update tooltip with timezone info
    if (dateTimeDisplay) {
        const tzLabel = settings.timezone === 'local' ? 'Local' : settings.timezone.split('/').pop().replace('_', ' ');
        dateTimeDisplay.title = `Time (${tzLabel})`;
    }
}

/**
 * Update network status
 */
function updateNetworkStatus() {
    if (!networkStatus || !networkIcon) return;
    
    const isOnline = navigator.onLine;
    
    if (isOnline) {
        networkStatus.classList.add('online');
        networkStatus.classList.remove('offline');
        
        // Try to get connection info
        if (navigator.connection) {
            const conn = navigator.connection;
            
            // conn.type gives actual connection (wifi, ethernet, cellular)
            // conn.effectiveType gives speed estimation (4g, 3g, 2g)
            const actualType = conn.type || 'unknown';
            const effectiveSpeed = conn.effectiveType || '4g';
            
            // Determine icon and label based on actual type first
            let icon = '📶';
            let label = 'Online';
            
            if (actualType === 'wifi') {
                icon = '📶';
                label = 'WiFi';
            } else if (actualType === 'ethernet') {
                icon = '🔌';
                label = 'Ethernet';
            } else if (actualType === 'cellular') {
                icon = '📱';
                label = effectiveSpeed.toUpperCase();
            } else {
                // Fallback: assume WiFi for desktop browsers
                icon = '📶';
                label = 'WiFi';
            }
            
            networkIcon.textContent = icon;
            networkStatus.title = `${label} (${effectiveSpeed.toUpperCase()} speed)`;
        } else {
            // No connection API, assume online
            networkIcon.textContent = '📶';
            networkStatus.title = 'Online';
        }
    } else {
        networkStatus.classList.remove('online');
        networkStatus.classList.add('offline');
        networkIcon.textContent = '📵';
        networkStatus.title = 'Offline';
    }
}

/**
 * Update memory usage display
 */
function updateMemory() {
    if (!memoryText || !settings.showMemory) return;
    
    // Check if performance.memory is available (Chrome only)
    if (performance.memory) {
        const usedMB = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
        memoryText.textContent = `${usedMB}MB`;
    } else {
        memoryText.textContent = 'N/A';
    }
}

// ==========================================
// SETTINGS FUNCTIONS
// ==========================================

/**
 * Load settings from localStorage
 */
function loadSettings() {
    const saved = localStorage.getItem('bmSettings');
    if (saved) {
        try {
            settings = { ...settings, ...JSON.parse(saved) };
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }
    
    // Apply settings to UI
    applySettings();
    
    // Update form controls to match
    if (showDateTimeCheckbox) showDateTimeCheckbox.checked = settings.showDateTime;
    if (showNetworkCheckbox) showNetworkCheckbox.checked = settings.showNetwork;
    if (showMemoryCheckbox) showMemoryCheckbox.checked = settings.showMemory;
    if (timezoneSelect) timezoneSelect.value = settings.timezone;
}

/**
 * Save settings to localStorage
 */
function saveSettings() {
    try {
        localStorage.setItem('bmSettings', JSON.stringify(settings));
    } catch (e) {
        console.error('Failed to save settings:', e);
    }
}

/**
 * Apply settings (show/hide indicators, timezone)
 */
function applySettings() {
    // Show/hide date time
    if (dateTimeDisplay) {
        dateTimeDisplay.style.display = settings.showDateTime ? 'flex' : 'none';
    }
    
    // Show/hide network
    if (networkStatus) {
        networkStatus.style.display = settings.showNetwork ? 'flex' : 'none';
    }
    
    // Show/hide memory
    if (memoryStatus) {
        memoryStatus.style.display = settings.showMemory ? 'flex' : 'none';
    }
    
    // Refresh all indicators when settings change
    // This ensures values are up-to-date when re-showing hidden indicators
    updateTime();
    updateNetworkStatus();
    updateMemory();
}

/**
 * Handle settings change
 */
function handleSettingsChange() {
    settings.showDateTime = showDateTimeCheckbox?.checked ?? true;
    settings.showNetwork = showNetworkCheckbox?.checked ?? true;
    settings.showMemory = showMemoryCheckbox?.checked ?? true;
    settings.timezone = timezoneSelect?.value ?? 'local';
    
    saveSettings();
    applySettings();
}

/**
 * Open settings modal
 */
function openSettingsModal() {
    if (settingsModal) {
        settingsModal.classList.remove('hidden');
    }
}

/**
 * Close settings modal
 */
function closeSettingsModal() {
    if (settingsModal) {
        settingsModal.classList.add('hidden');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
