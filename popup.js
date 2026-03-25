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

// Weather elements
const weatherCard = document.getElementById('weatherCard');
const weatherLoading = document.getElementById('weatherLoading');
const weatherContent = document.getElementById('weatherContent');
const weatherError = document.getElementById('weatherError');
const weatherErrorText = document.getElementById('weatherErrorText');
const weatherLocation = document.getElementById('weatherLocation');
const weatherUpdated = document.getElementById('weatherUpdated');
const weatherTemp = document.getElementById('weatherTemp');
const weatherCondition = document.getElementById('weatherCondition');
const weatherIcon = document.getElementById('weatherIcon');
const weatherIconWrapper = document.getElementById('weatherIconWrapper');
const weatherHumidity = document.getElementById('weatherHumidity');
const weatherWind = document.getElementById('weatherWind');
const weatherFeelsLike = document.getElementById('weatherFeelsLike');
const weatherForecast = document.getElementById('weatherForecast');
const weatherRefreshBtn = document.getElementById('weatherRefreshBtn');

// Weather settings elements
const weatherEnabledCheckbox = document.getElementById('weatherEnabled');
const weatherApiKeyInput = document.getElementById('weatherApiKey');
const apiKeyToggle = document.getElementById('apiKeyToggle');
const tempUnitSelect = document.getElementById('tempUnit');
const weatherCitySelect = document.getElementById('weatherCity');

// Notes page elements
const notesToggleBtn = document.getElementById('notesToggleBtn');
const bookmarksPage = document.getElementById('bookmarksPage');
const notesPage = document.getElementById('notesPage');
const notesContainer = document.getElementById('notesContainer');
const notesCount = document.getElementById('notesCount');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesSearchInput = document.getElementById('notesSearchInput');

// State
let allBookmarks = [];
let isFormVisible = false;
let fetchedMetadata = null;
let weatherRefreshInterval = null;
let isNotesPageVisible = false;
let allNotes = [];
let noteSaveTimeouts = {};

// Settings state (with defaults)
let settings = {
    showDateTime: true,
    showNetwork: true,
    showMemory: true,
    timezone: 'local',
    // Weather settings
    weatherEnabled: false,
    weatherApiKey: '',
    weatherCity: '',
    tempUnit: 'celsius'
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
    
    // Weather settings events
    if (weatherEnabledCheckbox) {
        weatherEnabledCheckbox.addEventListener('change', handleWeatherSettingsChange);
    }
    if (weatherApiKeyInput) {
        weatherApiKeyInput.addEventListener('change', handleWeatherSettingsChange);
    }
    if (apiKeyToggle) {
        apiKeyToggle.addEventListener('click', toggleApiKeyVisibility);
    }
    if (weatherCitySelect) {
        weatherCitySelect.addEventListener('change', handleWeatherSettingsChange);
    }
    if (tempUnitSelect) {
        tempUnitSelect.addEventListener('change', handleWeatherSettingsChange);
    }
    if (weatherRefreshBtn) {
        weatherRefreshBtn.addEventListener('click', () => {
            if (settings.weatherEnabled && settings.weatherApiKey) {
                fetchWeather();
            }
        });
    }
    
    // Notes page events
    if (notesToggleBtn) {
        notesToggleBtn.addEventListener('click', toggleNotesPage);
    }
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', addNote);
    }
    if (notesContainer) {
        notesContainer.addEventListener('click', handleNotesContainerClick);
        notesContainer.addEventListener('input', handleNoteInput);
    }
    if (notesSearchInput) {
        let notesSearchTimeout;
        notesSearchInput.addEventListener('input', (e) => {
            clearTimeout(notesSearchTimeout);
            notesSearchTimeout = setTimeout(() => {
                handleNotesSearch(e.target.value.trim());
            }, 300);
        });
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
    
    // Update weather controls
    if (weatherEnabledCheckbox) weatherEnabledCheckbox.checked = settings.weatherEnabled;
    if (weatherApiKeyInput) weatherApiKeyInput.value = settings.weatherApiKey;
    if (weatherCitySelect) weatherCitySelect.value = settings.weatherCity || '';
    if (tempUnitSelect) tempUnitSelect.value = settings.tempUnit;
    
    // Initialize weather if enabled
    if (settings.weatherEnabled && settings.weatherApiKey) {
        initWeather();
    }
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

// ==========================================
// WEATHER FUNCTIONS
// ==========================================

const WEATHER_CACHE_KEY = 'weatherCache';
const WEATHER_CACHE_DURATION = 60 * 60 * 1000; // 60 minutes

/**
 * Toggle API key visibility
 */
function toggleApiKeyVisibility() {
    if (!weatherApiKeyInput) return;
    
    const isPassword = weatherApiKeyInput.type === 'password';
    weatherApiKeyInput.type = isPassword ? 'text' : 'password';
    if (apiKeyToggle) {
        apiKeyToggle.textContent = isPassword ? '🙈' : '👁️';
    }
}

/**
 * Handle weather settings change
 */
function handleWeatherSettingsChange() {
    settings.weatherEnabled = weatherEnabledCheckbox?.checked ?? false;
    settings.weatherApiKey = weatherApiKeyInput?.value?.trim() ?? '';
    settings.weatherCity = weatherCitySelect?.value ?? '';
    settings.tempUnit = tempUnitSelect?.value ?? 'celsius';
    
    saveSettings();
    
    // Initialize or hide weather based on settings
    if (settings.weatherEnabled && settings.weatherApiKey) {
        initWeather();
    } else {
        hideWeatherCard();
    }
}

/**
 * Initialize weather widget
 */
function initWeather() {
    if (!settings.weatherEnabled || !settings.weatherApiKey) {
        hideWeatherCard();
        return;
    }
    
    // Clear any existing interval
    if (weatherRefreshInterval) {
        clearInterval(weatherRefreshInterval);
    }
    
    // Show weather card
    if (weatherCard) {
        weatherCard.classList.remove('hidden');
    }
    
    // Try to load from cache first
    const cached = getWeatherCache();
    if (cached) {
        // Handle new cache format with current and forecast
        if (cached.current) {
            renderWeather(cached.current);
            if (cached.forecast) {
                renderForecast(cached.forecast);
            }
        } else {
            // Legacy cache format - just current data
            renderWeather(cached);
        }
    } else {
        fetchWeather();
    }
    
    // Set up 60-minute refresh interval
    weatherRefreshInterval = setInterval(() => {
        fetchWeather();
    }, WEATHER_CACHE_DURATION);
}

/**
 * Hide weather card
 */
function hideWeatherCard() {
    if (weatherCard) {
        weatherCard.classList.add('hidden');
    }
    if (weatherRefreshInterval) {
        clearInterval(weatherRefreshInterval);
        weatherRefreshInterval = null;
    }
}

/**
 * Get weather from cache
 */
function getWeatherCache() {
    try {
        const cached = localStorage.getItem(WEATHER_CACHE_KEY);
        if (!cached) return null;
        
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        // Check if cache is still valid (60 minutes)
        if (age < WEATHER_CACHE_DURATION) {
            return data;
        }
        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Save weather to cache
 */
function setWeatherCache(data) {
    try {
        localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (e) {
        console.error('Failed to cache weather:', e);
    }
}

/**
 * Fetch weather data
 */
async function fetchWeather() {
    showWeatherLoading();
    
    try {
        const units = settings.tempUnit === 'fahrenheit' ? 'imperial' : 'metric';
        let weatherUrl, forecastUrl;
        
        // If city is provided, use city-based API
        if (settings.weatherCity) {
            const cityEncoded = encodeURIComponent(settings.weatherCity);
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded}&units=${units}&appid=${settings.weatherApiKey}`;
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityEncoded}&units=${units}&appid=${settings.weatherApiKey}`;
        } else {
            // Otherwise, use coordinates
            let latitude, longitude;
            
            // Try device geolocation first, fallback to IP-based
            try {
                const position = await getCurrentPosition();
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            } catch (geoError) {
                console.log('Device location failed, trying IP-based:', geoError.message);
                const ipLocation = await getLocationByIP();
                latitude = ipLocation.lat;
                longitude = ipLocation.lon;
            }
            
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${settings.weatherApiKey}`;
            forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${settings.weatherApiKey}`;
        }
        
        // Fetch current weather
        const response = await fetch(weatherUrl);
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key - wait 2hrs after creation');
            } else if (response.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('Weather fetch failed');
            }
        }
        
        const data = await response.json();
        
        // Fetch 5-day forecast
        let forecastData = null;
        try {
            const forecastResponse = await fetch(forecastUrl);
            if (forecastResponse.ok) {
                forecastData = await forecastResponse.json();
            }
        } catch (e) {
            console.log('Forecast fetch failed, continuing without it');
        }
        
        // Cache the result
        setWeatherCache({ current: data, forecast: forecastData });
        
        // Render weather
        renderWeather(data);
        
        // Render forecast if available
        if (forecastData) {
            renderForecast(forecastData);
        }
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        showWeatherError(error.message || 'Unable to load weather');
    }
}

/**
 * Get location by IP (fallback)
 */
async function getLocationByIP() {
    const response = await fetch('http://ip-api.com/json/?fields=lat,lon,city,country');
    if (!response.ok) {
        throw new Error('IP location failed');
    }
    return await response.json();
}

/**
 * Get current position with promise wrapper
 */
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(resolve, (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    reject(new Error('Location permission denied'));
                    break;
                case error.POSITION_UNAVAILABLE:
                    reject(new Error('Location unavailable'));
                    break;
                case error.TIMEOUT:
                    reject(new Error('Location request timed out'));
                    break;
                default:
                    reject(new Error('Location error'));
            }
        }, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 300000 // 5 minutes
        });
    });
}

/**
 * Show weather loading state
 */
function showWeatherLoading() {
    if (weatherLoading) weatherLoading.classList.remove('hidden');
    if (weatherContent) weatherContent.classList.add('hidden');
    if (weatherError) weatherError.classList.add('hidden');
}

/**
 * Show weather error state
 */
function showWeatherError(message) {
    if (weatherLoading) weatherLoading.classList.add('hidden');
    if (weatherContent) weatherContent.classList.add('hidden');
    if (weatherError) weatherError.classList.remove('hidden');
    if (weatherErrorText) weatherErrorText.textContent = message;
}

/**
 * Render weather data
 */
function renderWeather(data) {
    if (weatherLoading) weatherLoading.classList.add('hidden');
    if (weatherError) weatherError.classList.add('hidden');
    if (weatherContent) weatherContent.classList.remove('hidden');
    
    // Location
    if (weatherLocation) {
        weatherLocation.textContent = `${data.name}, ${data.sys?.country || ''}`;
    }
    
    // Temperature
    if (weatherTemp) {
        const temp = Math.round(data.main?.temp || 0);
        const unit = settings.tempUnit === 'fahrenheit' ? '°F' : '°C';
        weatherTemp.textContent = `${temp}${unit}`;
    }
    
    // Condition
    if (weatherCondition && data.weather?.[0]) {
        weatherCondition.textContent = data.weather[0].description;
    }
    
    // Weather icon
    if (weatherIcon && data.weather?.[0]) {
        weatherIcon.textContent = getWeatherEmoji(data.weather[0].main, data.weather[0].icon);
    }
    
    // Humidity
    if (weatherHumidity) {
        weatherHumidity.textContent = `${data.main?.humidity || '--'}%`;
    }
    
    // Wind
    if (weatherWind) {
        const windSpeed = Math.round(data.wind?.speed || 0);
        const unit = settings.tempUnit === 'fahrenheit' ? 'mph' : 'km/h';
        weatherWind.textContent = `${windSpeed} ${unit}`;
    }
    
    // Feels like
    if (weatherFeelsLike) {
        const feelsLike = Math.round(data.main?.feels_like || 0);
        const unit = settings.tempUnit === 'fahrenheit' ? '°F' : '°C';
        weatherFeelsLike.textContent = `${feelsLike}${unit}`;
    }
    
    // Last updated
    if (weatherUpdated) {
        const now = new Date();
        weatherUpdated.textContent = `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Apply weather-based gradient class
    applyWeatherGradient(data.weather?.[0]?.main, data.weather?.[0]?.icon);
}

/**
 * Get weather emoji based on condition
 */
function getWeatherEmoji(condition, icon) {
    const isNight = icon?.includes('n');
    
    const emojiMap = {
        'Clear': isNight ? '🌙' : '☀️',
        'Clouds': isNight ? '☁️' : '⛅',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️',
        'Haze': '🌫️',
        'Smoke': '💨',
        'Dust': '💨',
        'Sand': '💨',
        'Tornado': '🌪️'
    };
    
    return emojiMap[condition] || '🌡️';
}

/**
 * Apply weather gradient class to card
 */
function applyWeatherGradient(condition, icon) {
    if (!weatherCard) return;
    
    // Remove existing weather classes
    weatherCard.classList.remove('weather-clear', 'weather-clouds', 'weather-rain', 'weather-snow', 'weather-thunderstorm', 'weather-night');
    
    const isNight = icon?.includes('n');
    
    if (isNight) {
        weatherCard.classList.add('weather-night');
    } else {
        const conditionClass = {
            'Clear': 'weather-clear',
            'Clouds': 'weather-clouds',
            'Rain': 'weather-rain',
            'Drizzle': 'weather-rain',
            'Thunderstorm': 'weather-thunderstorm',
            'Snow': 'weather-snow'
        };
        
        if (conditionClass[condition]) {
            weatherCard.classList.add(conditionClass[condition]);
        }
    }
}

/**
 * Render 5-day forecast
 */
function renderForecast(data) {
    if (!weatherForecast || !data?.list) return;
    
    // Group forecast by day (the API returns 3-hour intervals)
    const dailyForecasts = {};
    const today = new Date().toDateString();
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toDateString();
        
        // Skip today
        if (dateStr === today) return;
        
        if (!dailyForecasts[dateStr]) {
            dailyForecasts[dateStr] = {
                date: date,
                temps: [],
                conditions: [],
                icons: []
            };
        }
        
        dailyForecasts[dateStr].temps.push(item.main.temp);
        dailyForecasts[dateStr].conditions.push(item.weather[0].main);
        dailyForecasts[dateStr].icons.push(item.weather[0].icon);
    });
    
    // Take first 5 days
    const days = Object.values(dailyForecasts).slice(0, 5);
    
    // Clear existing forecast
    weatherForecast.innerHTML = '';
    
    // Render each day
    days.forEach(day => {
        const maxTemp = Math.round(Math.max(...day.temps));
        const minTemp = Math.round(Math.min(...day.temps));
        const unit = settings.tempUnit === 'fahrenheit' ? '°' : '°';
        
        // Get most common condition
        const conditionCounts = {};
        day.conditions.forEach(c => conditionCounts[c] = (conditionCounts[c] || 0) + 1);
        const mainCondition = Object.entries(conditionCounts).sort((a, b) => b[1] - a[1])[0][0];
        const icon = day.icons.find(i => i.includes('d')) || day.icons[0];
        
        const dayName = day.date.toLocaleDateString('en', { weekday: 'short' });
        const emoji = getWeatherEmoji(mainCondition, icon);
        
        const dayEl = document.createElement('div');
        dayEl.className = 'forecast-day';
        dayEl.innerHTML = `
            <span class="day-name">${dayName}</span>
            <span class="day-icon">${emoji}</span>
            <span class="day-temp">${maxTemp}${unit}</span>
            <span class="day-temp-low">${minTemp}${unit}</span>
        `;
        
        weatherForecast.appendChild(dayEl);
    });
}

// ==========================================
// NOTES FUNCTIONS
// ==========================================

const NOTES_STORAGE_KEY = 'bmNotes';

/**
 * Toggle between Bookmarks page and Notes page
 */
function toggleNotesPage() {
    isNotesPageVisible = !isNotesPageVisible;
    
    if (isNotesPageVisible) {
        // Show notes, hide bookmarks
        if (bookmarksPage) bookmarksPage.classList.add('hidden');
        if (notesPage) notesPage.classList.remove('hidden');
        if (notesToggleBtn) notesToggleBtn.classList.add('active');
        // Hide bookmark-specific header actions
        if (addToggleBtn) addToggleBtn.style.display = 'none';
        // Expand container to full width for notes
        const container = document.querySelector('.container');
        if (container) container.classList.add('notes-active');
        
        // Load and render notes
        loadNotes();
    } else {
        // Show bookmarks, hide notes
        if (bookmarksPage) bookmarksPage.classList.remove('hidden');
        if (notesPage) notesPage.classList.add('hidden');
        if (notesToggleBtn) notesToggleBtn.classList.remove('active');
        // Restore bookmark-specific header actions
        if (addToggleBtn) addToggleBtn.style.display = '';
        // Restore container max-width for bookmarks
        const container = document.querySelector('.container');
        if (container) container.classList.remove('notes-active');
    }
}

/**
 * Load notes from localStorage
 */
function loadNotes() {
    try {
        const saved = localStorage.getItem(NOTES_STORAGE_KEY);
        if (saved) {
            allNotes = JSON.parse(saved);
        } else {
            allNotes = [];
        }
    } catch (e) {
        console.error('Failed to load notes:', e);
        allNotes = [];
    }
    renderNotes(allNotes);
    updateNotesCount(allNotes.length);
}

/**
 * Save notes to localStorage
 */
function saveNotes() {
    try {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(allNotes));
    } catch (e) {
        console.error('Failed to save notes:', e);
    }
}

/**
 * Add a new empty note
 */
function addNote() {
    const note = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    allNotes.unshift(note);
    saveNotes();
    renderNotes(allNotes);
    updateNotesCount(allNotes.length);
    
    // Focus the new note's textarea
    setTimeout(() => {
        const firstTextarea = notesContainer.querySelector('.note-textarea');
        if (firstTextarea) firstTextarea.focus();
    }, 100);
    
    showToast('Note created!', 'success');
}

/**
 * Delete a note by ID
 */
function deleteNote(noteId) {
    allNotes = allNotes.filter(n => n.id !== noteId);
    saveNotes();
    renderNotes(allNotes);
    updateNotesCount(allNotes.length);
    showToast('Note deleted', 'success');
}

/**
 * Handle clicks on notes container (event delegation for delete)
 */
function handleNotesContainerClick(event) {
    const deleteBtn = event.target.closest('.note-delete-btn');
    if (deleteBtn) {
        const noteId = deleteBtn.dataset.noteId;
        if (noteId) {
            deleteNote(noteId);
        }
    }
}

/**
 * Handle note textarea input (auto-save with debounce)
 */
function handleNoteInput(event) {
    const textarea = event.target.closest('.note-textarea');
    if (!textarea) return;
    
    const noteId = textarea.dataset.noteId;
    if (!noteId) return;
    
    // Show saving indicator
    const card = textarea.closest('.note-card');
    const indicator = card?.querySelector('.note-save-indicator');
    if (indicator) {
        indicator.textContent = 'Saving...';
        indicator.className = 'note-save-indicator visible';
    }
    
    // Auto-resize textarea
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(120, textarea.scrollHeight) + 'px';
    
    // Debounce save (500ms)
    if (noteSaveTimeouts[noteId]) {
        clearTimeout(noteSaveTimeouts[noteId]);
    }
    
    noteSaveTimeouts[noteId] = setTimeout(() => {
        const note = allNotes.find(n => n.id === noteId);
        if (note) {
            note.content = textarea.value;
            note.updatedAt = new Date().toISOString();
            saveNotes();
            
            // Update timestamp display
            const timestampEl = card?.querySelector('.note-timestamp');
            if (timestampEl) {
                timestampEl.textContent = formatNoteDate(note.updatedAt);
            }
            
            // Show saved indicator
            if (indicator) {
                indicator.textContent = '✓ Saved';
                indicator.className = 'note-save-indicator visible saved';
                setTimeout(() => {
                    indicator.className = 'note-save-indicator';
                }, 1500);
            }
        }
        delete noteSaveTimeouts[noteId];
    }, 500);
}

/**
 * Handle notes search
 */
function handleNotesSearch(query) {
    if (!query) {
        renderNotes(allNotes);
        updateNotesCount(allNotes.length);
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = allNotes.filter(note => 
        note.content.toLowerCase().includes(lowerQuery)
    );
    renderNotes(filtered);
    updateNotesCount(filtered.length, allNotes.length);
}

/**
 * Render notes to the UI (XSS-safe)
 */
function renderNotes(notes) {
    if (!notesContainer) return;
    notesContainer.innerHTML = '';
    
    if (notes.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'notes-empty-state';
        emptyState.innerHTML = `
            <div class="icon">📝</div>
            <h3>No notes yet</h3>
            <p>Click "New Note" to create your first note!</p>
        `;
        notesContainer.appendChild(emptyState);
        return;
    }
    
    notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        // Textarea
        const textarea = document.createElement('textarea');
        textarea.className = 'note-textarea';
        textarea.dataset.noteId = note.id;
        textarea.value = note.content; // Safe - uses .value
        textarea.placeholder = 'Start typing your note...';
        
        // Footer
        const footer = document.createElement('div');
        footer.className = 'note-footer';
        
        // Timestamp
        const timestamp = document.createElement('span');
        timestamp.className = 'note-timestamp';
        timestamp.textContent = formatNoteDate(note.updatedAt || note.createdAt);
        
        // Save indicator
        const saveIndicator = document.createElement('span');
        saveIndicator.className = 'note-save-indicator';
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'note-delete-btn';
        deleteBtn.dataset.noteId = note.id;
        deleteBtn.textContent = '✕';
        deleteBtn.title = 'Delete note';
        
        footer.appendChild(timestamp);
        footer.appendChild(saveIndicator);
        footer.appendChild(deleteBtn);
        
        card.appendChild(footer);
        card.appendChild(textarea);
        
        notesContainer.appendChild(card);
        
        // Auto-resize on render
        if (note.content) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(120, textarea.scrollHeight) + 'px';
        }
    });
}

/**
 * Update notes count display
 */
function updateNotesCount(count, total = null) {
    if (!notesCount) return;
    if (total !== null && count !== total) {
        notesCount.textContent = `${count} / ${total}`;
    } else {
        notesCount.textContent = count;
    }
}

/**
 * Format date for note display
 */
function formatNoteDate(isoString) {
    try {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString('en', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    } catch {
        return '';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
