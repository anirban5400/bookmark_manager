/**
 * Bookmark Manager - Main Application Logic
 * Neumorphic UI with IndexedDB storage and auto-fetch metadata
 */

// DOM Elements
const addBookmarkForm = document.getElementById('addBookmarkForm');
const urlInput = document.getElementById('urlInput');
const titleInput = document.getElementById('titleInput');
const descInput = document.getElementById('descInput');
const bookmarkFormLabel = document.getElementById('bookmarkFormLabel');
const bookmarkSubmitIcon = document.getElementById('bookmarkSubmitIcon');
const bookmarkSubmitText = document.getElementById('bookmarkSubmitText');
const cancelBookmarkEditBtn = document.getElementById('cancelBookmarkEditBtn');
const bookmarkModal = document.getElementById('bookmarkModal');
const bookmarkModalClose = document.getElementById('bookmarkModalClose');
const bookmarkModalTitle = document.getElementById('bookmarkModalTitle');
const bookmarksNavBtn = document.getElementById('bookmarksNavBtn');
const searchInput = document.getElementById('searchInput');
const headerSearch = document.querySelector('.header-search');
const bookmarksContainer = document.getElementById('bookmarksContainer');
const bookmarksTableContainer = document.getElementById('bookmarksTableContainer');
const bookmarkTableMount = document.getElementById('bookmarkTableMount');
const bookmarkCount = document.getElementById('bookmarkCount');
const bookmarksHeroCount = document.getElementById('bookmarksHeroCount');
const bookmarksHeroMode = document.getElementById('bookmarksHeroMode');
const bookmarkHeroViewLabel = document.getElementById('bookmarkHeroViewLabel');
const themeToggle = document.getElementById('themeToggle');
const loadingState = document.getElementById('loadingState');
const addToggleBtn = document.getElementById('addToggleBtn');
const fetchStatus = document.getElementById('fetchStatus');
const bookmarkCardsViewBtn = document.getElementById('bookmarkCardsViewBtn');
const bookmarkTableViewBtn = document.getElementById('bookmarkTableViewBtn');
const bookmarkToolbarResetBtn = document.getElementById('bookmarkToolbarResetBtn');
const bookmarkToolbarColumnManager = document.getElementById('bookmarkToolbarColumnManager');
const bookmarkToolbarColumnsBtn = document.getElementById('bookmarkToolbarColumnsBtn');
const bookmarkToolbarColumnsPanel = document.getElementById('bookmarkToolbarColumnsPanel');
const bookmarkToolbarPerPageWrap = document.getElementById('bookmarkToolbarPerPageWrap');
const bookmarkToolbarPerPage = document.getElementById('bookmarkToolbarPerPage');
const appContainer = document.querySelector('.container');
const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
const sidebarToggleIcon = document.getElementById('sidebarToggleIcon');

// Status indicator elements
const dateTimeDisplay = document.getElementById('dateTimeDisplay');
const timeText = document.getElementById('timeText');
const timeIcon = document.getElementById('timeIcon');
const secondaryDateTimeDisplay = document.getElementById('secondaryDateTimeDisplay');
const secondaryTimeText = document.getElementById('secondaryTimeText');
const secondaryTimeIcon = document.getElementById('secondaryTimeIcon');
const networkStatus = document.getElementById('networkStatus');
const networkIcon = document.getElementById('networkIcon');
const memoryStatus = document.getElementById('memoryStatus');
const memoryText = document.getElementById('memoryText');

// Zoom control elements
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomLevelDisplay = document.getElementById('zoomLevelDisplay');

// Settings modal elements
const settingsToggle = document.getElementById('settingsToggle');
const settingsModal = document.getElementById('settingsModal');
const settingsClose = document.getElementById('settingsClose');
const showDateTimeCheckbox = document.getElementById('showDateTime');
const showSecondaryDateTimeCheckbox = document.getElementById('showSecondaryDateTime');
const showNetworkCheckbox = document.getElementById('showNetwork');
const showMemoryCheckbox = document.getElementById('showMemory');
const timezoneSelect = document.getElementById('timezoneSelect');
const secondaryTimezoneSelect = document.getElementById('secondaryTimezoneSelect');
const secondaryTimezoneRow = document.getElementById('secondaryTimezoneRow');
const settingsTabs = Array.from(document.querySelectorAll('[data-settings-tab]'));
const settingsPanels = Array.from(document.querySelectorAll('[data-settings-panel]'));

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

// AI Assistant elements// DOM Elements - Settings Modal (AI)
const ollamaEnabledCheckbox = document.getElementById('ollamaEnabled');
const aiProviderSelect = document.getElementById('aiProvider');
const ollamaSettingsGroup = document.getElementById('ollamaSettingsGroup');
const openrouterSettingsGroup = document.getElementById('openrouterSettingsGroup');
const ollamaUrlInput = document.getElementById('ollamaUrl');
const ollamaModelInput = document.getElementById('ollamaModel');
const openRouterKeyInput = document.getElementById('openRouterKey');
const openRouterModelInput = document.getElementById('openRouterModel');
const ollamaSystemPromptInput = document.getElementById('ollamaSystemPrompt');
const aiRewriteBtn = document.getElementById('aiRewriteBtn');

// Notes page elements
const notesToggleBtn = document.getElementById('notesToggleBtn');
const calculatorsToggleBtn = document.getElementById('calculatorsToggleBtn');
const aiWriterToggleBtn = document.getElementById('aiWriterToggleBtn');
const bookmarksPage = document.getElementById('bookmarksPage');
const notesPage = document.getElementById('notesPage');
const calculatorsPage = document.getElementById('calculatorsPage');
const aiWriterPage = document.getElementById('aiWriterPage');
const notesContainer = document.getElementById('notesContainer');
const notesCount = document.getElementById('notesCount');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesSearchInput = document.getElementById('notesSearchInput');

// Calculator page elements
const percentageRateInput = document.getElementById('percentageRateInput');
const percentageBaseInput = document.getElementById('percentageBaseInput');
const percentageResult = document.getElementById('percentageResult');
const percentageSummary = document.getElementById('percentageSummary');
const percentageModeToggle = document.getElementById('percentageModeToggle');
const percentageValueLabel = document.getElementById('percentageValueLabel');
const percentageResultLabel = document.getElementById('percentageResultLabel');
const discountPriceInput = document.getElementById('discountPriceInput');
const discountRateInput = document.getElementById('discountRateInput');
const discountTaxInput = document.getElementById('discountTaxInput');
const discountSavingsResult = document.getElementById('discountSavingsResult');
const discountFinalResult = document.getElementById('discountFinalResult');
const splitBillInput = document.getElementById('splitBillInput');
const splitPeopleInput = document.getElementById('splitPeopleInput');
const splitTipInput = document.getElementById('splitTipInput');
const splitTipResult = document.getElementById('splitTipResult');
const splitPerPersonResult = document.getElementById('splitPerPersonResult');
const emiPrincipalInput = document.getElementById('emiPrincipalInput');
const emiRateInput = document.getElementById('emiRateInput');
const emiMonthsInput = document.getElementById('emiMonthsInput');
const emiMonthlyResult = document.getElementById('emiMonthlyResult');
const emiTotalResult = document.getElementById('emiTotalResult');
const taxSalaryInput = document.getElementById('taxSalaryInput');
const taxBasicSalaryInput = document.getElementById('taxBasicSalaryInput');
const taxRentPaidInput = document.getElementById('taxRentPaidInput');
const taxFYInput = document.getElementById('taxFYInput');
const taxCityInput = document.getElementById('taxCityInput');
const taxTargetsList = document.getElementById('taxTargetsList');
const taxResidentInput = document.getElementById('taxResidentInput');
const taxAgeBandInput = document.getElementById('taxAgeBandInput');
const taxDaInput = document.getElementById('taxDaInput');
const taxHraReceivedInput = document.getElementById('taxHraReceivedInput');
const taxResetBtn = document.getElementById('taxResetBtn');
// State
let allBookmarks = [];
let isFormVisible = false;
let fetchedMetadata = null;
let weatherRefreshInterval = null;
let activePage = 'bookmarks';
let allNotes = [];
let noteSaveTimeouts = {};
let draggedNoteId = null;
let draggedBookmarkId = null;
let currentBookmarkView = 'cards';
let bookmarkTableApi = null;
let editingBookmarkId = null;
const DEFAULT_CARD_VIEW_LIMIT = 10;
const CARD_FIELD_KEYS = new Set(['favicon', 'url', 'description', 'createdAt']);
const BOOKMARK_TABLE_REORDER_KEY = '__reorder__';
const VALID_PAGES = new Set(['bookmarks', 'notes', 'calculators', 'ai-writer']);
let cardViewLimit = DEFAULT_CARD_VIEW_LIMIT;
let isSidebarCollapsed = false;
let currentZoomLevel = 100;
let calculatorCardTogglesBound = false;
let aiWriterListenersBound = false;
const hiddenCardFields = new Set();
const SETTINGS_STORAGE_KEY = 'bmSettings';
const UI_STATE_STORAGE_KEY = 'bmUiState';
const BOOKMARK_ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);
const calculatorNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});
const PREVIOUS_DEFAULT_AI_SYSTEM_PROMPT = 'You are an expert executive writing assistant. First, analyze the type of text given to you (e.g., an email, a chat message, or a task list). Then, rewrite it to be highly professional, articulate, and polished for business communication. Use sophisticated but clear vocabulary.\n\nRules:\n1. Only return the final rewritten text.\n2. Do not add any greetings, explanations, or quotes around the text.\n3. If the text has no meaning (like just dots or random letters), return it exactly as it is without changes.\n4. IMPORTANT: Always preserve any structural formatting from the original text (such as numbering like "1)" or bullet points).';
const DEFAULT_AI_SYSTEM_PROMPT = 'You are a precise writing assistant. Rewrite the user text so it reads clearly and professionally while preserving its exact meaning.\n\nRules:\n1. Only return the final rewritten text.\n2. Do not add greetings, explanations, markdown fences, or quotes around the answer.\n3. Preserve the original structure, line breaks, numbering, bullets, and indentation.\n4. If the text contains technical content, keep every literal exactly unchanged unless the user explicitly changed it.\n5. Technical content includes API routes, URLs, JSON, code, config, comments, keys, identifiers, and values such as 0, 1, "", true, false, and null.\n6. If the text has no clear meaning, return it exactly as it is.';
const LEGACY_AI_SYSTEM_PROMPT_PREFIXES = [
    'You are an expert editor.',
    'You are a helpful writing assistant.'
];
const AI_WRITER_CARD_META = {
    chat: { variantKey: 'tone', defaultVariant: ['professional'], allowMultipleVariants: true },
    email: { variantKey: 'tone', defaultVariant: ['professional'], allowMultipleVariants: true },
    summary: { variantKey: 'format', defaultVariant: 'both', allowMultipleVariants: false }
};
const AI_WRITER_SYSTEM_PROMPTS = {
    chat: {
        professional: 'You are a chat writing assistant. Write a professional chat reply or new message from the user input.\n\nRules:\n1. Return only the final chat message.\n2. Keep the message clear, direct, and natural.\n3. Preserve important names, numbers, dates, links, and technical details exactly.\n4. Do not add a subject line, commentary, or markdown.',
        friendly: 'You are a chat writing assistant. Write a warm, friendly, and approachable chat reply or new message from the user input.\n\nRules:\n1. Return only the final chat message.\n2. Keep the tone positive, human, and easy to read.\n3. Preserve important names, numbers, dates, links, and technical details exactly.\n4. Do not add commentary or markdown.',
        concise: 'You are a chat writing assistant. Rewrite the user input into a concise chat message.\n\nRules:\n1. Return only the final chat message.\n2. Keep it brief, crisp, and easy to send immediately.\n3. Preserve important names, numbers, dates, links, and technical details exactly.\n4. Do not add commentary or markdown.',
        confident: 'You are a chat writing assistant. Write a confident and polished chat reply or new message from the user input.\n\nRules:\n1. Return only the final chat message.\n2. Sound decisive without being rude.\n3. Preserve important names, numbers, dates, links, and technical details exactly.\n4. Do not add commentary or markdown.'
    },
    email: {
        professional: 'You are an email writing assistant. Draft a professional email from the user input.\n\nRules:\n1. Return only the final email.\n2. Include an appropriate subject line only if the user input clearly asks for one.\n3. Keep the email polished, structured, and business-ready.\n4. Preserve important names, numbers, dates, links, and technical details exactly.\n5. Do not add commentary or markdown.',
        friendly: 'You are an email writing assistant. Draft a friendly and thoughtful email from the user input.\n\nRules:\n1. Return only the final email.\n2. Keep the wording warm, clear, and professional enough to send.\n3. Preserve important names, numbers, dates, links, and technical details exactly.\n4. Do not add commentary or markdown.',
        concise: 'You are an email writing assistant. Draft a concise email from the user input.\n\nRules:\n1. Return only the final email.\n2. Keep the email short, clear, and action-oriented.\n3. Preserve important names, numbers, dates, links, and technical details exactly.\n4. Do not add commentary or markdown.',
        persuasive: 'You are an email writing assistant. Draft a persuasive email from the user input.\n\nRules:\n1. Return only the final email.\n2. Make the message convincing, clear, and respectful.\n3. Preserve important names, numbers, dates, links, and technical details exactly.\n4. Do not add commentary or markdown.'
    },
    summary: {
        paragraph: 'You are a document summarization assistant. Summarize the user text into a concise paragraph.\n\nRules:\n1. Return only the final summary.\n2. Focus on the most important decisions, facts, and outcomes.\n3. Preserve important names, numbers, dates, links, and technical terms exactly.\n4. Do not add commentary or markdown fences.',
        bullet: 'You are a document summarization assistant. Summarize the user text into clear bullet points.\n\nRules:\n1. Return only the final summary.\n2. Use bullet points only.\n3. Focus on the most important decisions, facts, and outcomes.\n4. Preserve important names, numbers, dates, links, and technical terms exactly.\n5. Do not add commentary or markdown fences beyond the bullet list.',
        both: 'You are a document summarization assistant. Summarize the user text in two sections.\n\nRules:\n1. Return only the final summary.\n2. First provide a short paragraph summary.\n3. Then provide bullet points with the main takeaways.\n4. Preserve important names, numbers, dates, links, and technical terms exactly.\n5. Do not add commentary or markdown fences.'
    }
};

function getDefaultModelForProvider(provider, sourceSettings = settings) {
    return provider === 'openrouter'
        ? (sourceSettings.openRouterModel || 'google/gemini-2.5-flash')
        : (sourceSettings.ollamaModel || 'llama3');
}

function normalizeAiWriterVariant(cardKey, variantValue) {
    const meta = AI_WRITER_CARD_META[cardKey];
    if (!meta) return variantValue;

    if (meta.allowMultipleVariants) {
        const variants = Array.isArray(variantValue) ? variantValue : [variantValue];
        const sanitized = variants
            .filter((variant) => typeof variant === 'string' && variant)
            .filter((variant, index, list) => list.indexOf(variant) === index);
        return sanitized.length ? sanitized : [...meta.defaultVariant];
    }

    return typeof variantValue === 'string' && variantValue ? variantValue : meta.defaultVariant;
}

function getDefaultAiWriterSystemPrompt(cardKey, variant) {
    const cardPrompts = AI_WRITER_SYSTEM_PROMPTS[cardKey] || {};
    const meta = AI_WRITER_CARD_META[cardKey];
    const normalizedVariant = normalizeAiWriterVariant(cardKey, variant);

    if (meta?.allowMultipleVariants) {
        const prompts = normalizedVariant
            .map((variantKey) => cardPrompts[variantKey])
            .filter(Boolean);
        return prompts.length ? prompts.join('\n\n---\n\n') : DEFAULT_AI_SYSTEM_PROMPT;
    }

    return cardPrompts[normalizedVariant] || cardPrompts[meta?.defaultVariant] || DEFAULT_AI_SYSTEM_PROMPT;
}

function createDefaultAiWriterCardsConfig(sourceSettings) {
    return {
        chat: {
            provider: 'ollama',
            model: getDefaultModelForProvider('ollama', sourceSettings),
            tone: [...AI_WRITER_CARD_META.chat.defaultVariant],
            systemPrompt: getDefaultAiWriterSystemPrompt('chat', AI_WRITER_CARD_META.chat.defaultVariant)
        },
        email: {
            provider: 'ollama',
            model: getDefaultModelForProvider('ollama', sourceSettings),
            tone: [...AI_WRITER_CARD_META.email.defaultVariant],
            systemPrompt: getDefaultAiWriterSystemPrompt('email', AI_WRITER_CARD_META.email.defaultVariant)
        },
        summary: {
            provider: 'ollama',
            model: getDefaultModelForProvider('ollama', sourceSettings),
            format: AI_WRITER_CARD_META.summary.defaultVariant,
            systemPrompt: getDefaultAiWriterSystemPrompt('summary', AI_WRITER_CARD_META.summary.defaultVariant)
        }
    };
}

function normalizeAiWriterCardsConfig(savedCards, sourceSettings = settings) {
    const defaults = createDefaultAiWriterCardsConfig(sourceSettings);

    return Object.keys(defaults).reduce((normalized, cardKey) => {
        const meta = AI_WRITER_CARD_META[cardKey];
        const savedCard = savedCards?.[cardKey] || {};
        const provider = savedCard.provider === 'openrouter' ? 'openrouter' : 'ollama';
        const variantKey = meta.variantKey;
        const variant = normalizeAiWriterVariant(cardKey, savedCard[variantKey] ?? defaults[cardKey][variantKey]);
        const systemPrompt = typeof savedCard.systemPrompt === 'string' && savedCard.systemPrompt.trim()
            ? savedCard.systemPrompt
            : getDefaultAiWriterSystemPrompt(cardKey, variant);

        normalized[cardKey] = {
            ...defaults[cardKey],
            ...savedCard,
            provider,
            model: typeof savedCard.model === 'string' && savedCard.model.trim()
                ? savedCard.model.trim()
                : getDefaultModelForProvider(provider, sourceSettings),
            [variantKey]: variant,
            systemPrompt
        };

        return normalized;
    }, {});
}

// Settings state (with defaults)
let settings = {
    showDateTime: true,
    showSecondaryDateTime: false,
    showNetwork: true,
    showMemory: false,
    timezone: 'local',
    secondaryTimezone: 'UTC',
    // Weather settings
    weatherEnabled: false,
    weatherApiKey: '',
    weatherCity: '',
    tempUnit: 'C',
    // AI Settings
    ollamaEnabled: false,
    aiProvider: 'ollama', // 'ollama' or 'openrouter'
    ollamaUrl: 'http://localhost:11434',
    ollamaModel: 'llama3',
    openRouterKey: '',
    openRouterModel: 'google/gemini-2.5-flash',
    ollamaSystemPrompt: DEFAULT_AI_SYSTEM_PROMPT,
    aiWriterCards: createDefaultAiWriterCardsConfig({
        ollamaModel: 'llama3',
        openRouterModel: 'google/gemini-2.5-flash'
    })
};
const aiWriterSaveTimeouts = {};

/**
 * Handle note title input (auto-save with debounce)
 */
let titleSaveTimeouts = {};

function isBookmarksPageActive() {
    return activePage === 'bookmarks';
}

function isNotesPageActive() {
    return activePage === 'notes';
}

function isCalculatorsPageActive() {
    return activePage === 'calculators';
}

function isAiWriterPageActive() {
    return activePage === 'ai-writer';
}

function parseCalculatorValue(input, fallback = 0) {
    const parsedValue = parseFloat(input?.value ?? '');
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function formatCalculatorNumber(value) {
    return calculatorNumberFormatter.format(Number.isFinite(value) ? value : 0);
}

function focusCalculatorsWorkspace() {
    const firstInput = calculatorsPage?.querySelector('.calculator-input');
    if (firstInput) {
        firstInput.focus();
        firstInput.select();
    }
}

function focusAiWriterWorkspace() {
    const firstInput = aiWriterPage?.querySelector('.ai-writer-input-text');
    if (firstInput) {
        firstInput.focus();
        firstInput.select();
    }
}

function handleNoteTitleInput(event) {
    const titleInput = event.target.closest('.note-title-input');
    if (!titleInput) return;
    
    const noteId = titleInput.dataset.noteId;
    if (!noteId) return;
    
    const card = titleInput.closest('.note-card');
    const indicator = card?.querySelector('.note-save-indicator');
    if (indicator) {
        indicator.textContent = 'Saving...';
        indicator.className = 'note-save-indicator visible';
    }
    
    if (titleSaveTimeouts[noteId]) clearTimeout(titleSaveTimeouts[noteId]);
    
    titleSaveTimeouts[noteId] = setTimeout(async () => {
        const note = allNotes.find(n => n.id === noteId);
        if (note) {
            note.title = titleInput.value;
            note.updatedAt = new Date().toISOString();
            try {
                await saveNotes();
            } catch (error) {
                console.error('Failed to save note title:', error);
                if (indicator) {
                    indicator.textContent = 'Save failed';
                    indicator.className = 'note-save-indicator visible';
                }
                delete titleSaveTimeouts[noteId];
                return;
            }
            
            const timestampEl = card?.querySelector('.note-timestamp');
            if (timestampEl) timestampEl.textContent = formatNoteDate(note.updatedAt);
            
            if (indicator) {
                indicator.textContent = '✓ Saved';
                indicator.className = 'note-save-indicator visible saved';
                setTimeout(() => { indicator.className = 'note-save-indicator'; }, 1500);
            }
        }
        delete titleSaveTimeouts[noteId];
    }, 500);
}

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
        await loadSettings();

        // Load persisted UI state
        await loadUiState();
        
        // Load bookmarks
        await loadBookmarks();
        
        // Setup event listeners
        setupEventListeners();

        // Initialize calculator workspace
        initCalculators();

        // Apply restored page mode after listeners are ready
        applyPageState();
        applySidebarState();

        // Apply saved zoom level
        applyZoom();
        
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

    if (bookmarkCardsViewBtn) {
        bookmarkCardsViewBtn.addEventListener('click', () => switchBookmarkView('cards'));
    }
    if (bookmarkTableViewBtn) {
        bookmarkTableViewBtn.addEventListener('click', () => switchBookmarkView('table'));
    }
    if (bookmarkToolbarResetBtn) {
        bookmarkToolbarResetBtn.addEventListener('click', () => {
            if (currentBookmarkView === 'table' && bookmarkTableApi) {
                bookmarkTableApi.reset();
                return;
            }

            if (searchInput) {
                searchInput.value = '';
            }
            hiddenCardFields.clear();
            cardViewLimit = DEFAULT_CARD_VIEW_LIMIT;
            if (bookmarkToolbarPerPage) {
                bookmarkToolbarPerPage.value = String(cardViewLimit);
            }
            if (bookmarkToolbarColumnsPanel) {
                bookmarkToolbarColumnsPanel.classList.add('hidden');
            }
            rerenderCurrentCardView();
            void saveUiState();
        });
    }
    if (bookmarkToolbarPerPage) {
        bookmarkToolbarPerPage.addEventListener('change', (event) => {
            const nextLimit = parseInt(event.target.value, 10);
            if (currentBookmarkView === 'table' && bookmarkTableApi) {
                bookmarkTableApi.setPerPage(nextLimit);
                return;
            }

            cardViewLimit = nextLimit;
            rerenderCurrentCardView();
            void saveUiState();
        });
    }
    if (bookmarkToolbarColumnsBtn) {
        bookmarkToolbarColumnsBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            renderBookmarkToolbarColumnsPanel();
            if (bookmarkToolbarColumnsPanel) {
                bookmarkToolbarColumnsPanel.classList.toggle('hidden');
            }
        });
    }
    if (bookmarkToolbarColumnsPanel) {
        bookmarkToolbarColumnsPanel.addEventListener('change', (event) => {
            const checkbox = event.target;
            if (!checkbox.matches('input[type="checkbox"][data-column-key]')) return;

            const columnKey = checkbox.dataset.columnKey;
            if (currentBookmarkView === 'table' && bookmarkTableApi) {
                bookmarkTableApi.setColumnVisibility(columnKey, checkbox.checked);
                renderBookmarkToolbarColumnsPanel();
                return;
            }

            if (checkbox.checked) {
                hiddenCardFields.delete(columnKey);
            } else {
                hiddenCardFields.add(columnKey);
            }
            renderBookmarkToolbarColumnsPanel();
            rerenderCurrentCardView();
            void saveUiState();
        });
    }
    document.addEventListener('click', (event) => {
        if (!bookmarkToolbarColumnManager?.contains(event.target)) {
            bookmarkToolbarColumnsPanel?.classList.add('hidden');
        }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Zoom controls
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => adjustZoom(10));
    }
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => adjustZoom(-10));
    }
    if (zoomLevelDisplay) {
        zoomLevelDisplay.addEventListener('click', () => setZoom(100));
    }
    
    // Add form toggle button
    if (addToggleBtn) {
        addToggleBtn.addEventListener('click', toggleAddForm);
    }
    if (cancelBookmarkEditBtn) {
        cancelBookmarkEditBtn.addEventListener('click', cancelBookmarkEdit);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Settings modal events
    if (settingsToggle) {
        settingsToggle.addEventListener('click', openSettingsModal);
    }
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', toggleSidebar);
    }
    if (settingsClose) {
        settingsClose.addEventListener('click', closeSettingsModal);
    }
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) closeSettingsModal();
        });
    }
    settingsTabs.forEach((tabButton) => {
        tabButton.addEventListener('click', () => {
            switchSettingsTab(tabButton.dataset.settingsTab);
        });
    });
    if (bookmarkModalClose) {
        bookmarkModalClose.addEventListener('click', () => closeBookmarkForm());
    }
    if (bookmarkModal) {
        bookmarkModal.addEventListener('click', (e) => {
            if (e.target === bookmarkModal) closeBookmarkForm();
        });
    }
    
    // Settings change events
    if (showDateTimeCheckbox) {
        showDateTimeCheckbox.addEventListener('change', handleSettingsChange);
    }
    if (showSecondaryDateTimeCheckbox) {
        showSecondaryDateTimeCheckbox.addEventListener('change', handleSettingsChange);
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
    if (secondaryTimezoneSelect) {
        secondaryTimezoneSelect.addEventListener('change', handleSettingsChange);
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
    
    // AI Assistant settings events
    if (ollamaEnabledCheckbox) ollamaEnabledCheckbox.addEventListener('change', handleSettingsChange);
    if (ollamaUrlInput) ollamaUrlInput.addEventListener('change', handleSettingsChange);
    if (ollamaModelInput) ollamaModelInput.addEventListener('change', handleSettingsChange);
    if (ollamaSystemPromptInput) ollamaSystemPromptInput.addEventListener('change', handleSettingsChange);
    if (aiProviderSelect) aiProviderSelect.addEventListener('change', handleAiProviderChange);
    if (openRouterKeyInput) openRouterKeyInput.addEventListener('change', handleSettingsChange);
    if (openRouterModelInput) openRouterModelInput.addEventListener('change', handleSettingsChange);

    if (bookmarksNavBtn) {
        bookmarksNavBtn.addEventListener('click', () => setActivePage('bookmarks'));
    }
    if (notesToggleBtn) {
        notesToggleBtn.addEventListener('click', () => setActivePage('notes'));
    }
    if (calculatorsToggleBtn) {
        calculatorsToggleBtn.addEventListener('click', () => setActivePage('calculators'));
    }
    if (aiWriterToggleBtn) {
        aiWriterToggleBtn.addEventListener('click', () => setActivePage('ai-writer'));
    }
    setupCalculatorListeners();
    setupCalculatorCardToggles();
    setupAiWriterListeners();
    if (taxResetBtn) {
        taxResetBtn.addEventListener('click', resetTaxPlanner);
    }
    if (taxTargetsList) {
        taxTargetsList.addEventListener('change', handleTaxDeductionsListChange);
    }

    // AI Rewrite Selection
    document.addEventListener('selectionchange', () => {
        setTimeout(() => {
            const activeEl = document.activeElement;
            if (activeEl && activeEl.classList.contains('note-textarea')) {
                handleTextSelection({ target: activeEl });
            } else if (aiRewriteBtn && document.activeElement !== aiRewriteBtn) {
                aiRewriteBtn.classList.add('hidden');
            }
        }, 10);
    });
    
    if (aiRewriteBtn) {
        // Prevent losing focus on textarea when clicking button
        aiRewriteBtn.addEventListener('mousedown', (e) => { e.preventDefault(); });
        aiRewriteBtn.addEventListener('click', handleAiRewrite);
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
    // Title input handler on notes container
    if (notesContainer) {
        notesContainer.addEventListener('input', handleNoteTitleInput);
    }
}

function setupCalculatorListeners() {
    const calculatorBindings = [
        { inputs: [percentageRateInput, percentageBaseInput], handler: updatePercentageCalculator },
        { inputs: [discountPriceInput, discountRateInput, discountTaxInput], handler: updateDiscountCalculator },
        { inputs: [splitBillInput, splitPeopleInput, splitTipInput], handler: updateBillSplitCalculator },
        { inputs: [emiPrincipalInput, emiRateInput, emiMonthsInput], handler: updateEmiCalculator },
        { inputs: [taxFYInput, taxSalaryInput, taxBasicSalaryInput, taxRentPaidInput, taxCityInput, taxResidentInput, taxAgeBandInput, taxDaInput, taxHraReceivedInput, document.getElementById('taxInHandInput')], handler: updateTaxCalculator }
    ];

    calculatorBindings.forEach(({ inputs, handler }) => {
        inputs.forEach((input) => {
            if (!input) return;
            input.addEventListener('input', handler);
            // Select elements fire 'change', not 'input'
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', handler);
            }
        });
    });

    if (percentageModeToggle) {
        percentageModeToggle.addEventListener('click', (e) => {
            const btn = e.target.closest('.percentage-mode-btn');
            if (!btn || !percentageModeToggle.contains(btn)) return;
            percentageModeToggle.querySelectorAll('.percentage-mode-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            updatePercentageCalculator();
        });
    }
}

function setupCalculatorCardToggles() {
    if (calculatorCardTogglesBound) return;
    if (!calculatorsPage) return;

    calculatorsPage.addEventListener('click', (event) => {
        const header = event.target.closest('.calculator-card-header');
        if (!header) return;
        const card = header.closest('.calculator-card');
        if (!card) return;
        card.classList.toggle('calculator-card-expanded');
    });

    calculatorCardTogglesBound = true;
}

function getAiWriterCard(cardKey) {
    return aiWriterPage?.querySelector(`[data-ai-card="${cardKey}"]`) || null;
}

function getAiWriterCardElements(cardKey) {
    const card = getAiWriterCard(cardKey);
    if (!card) return null;

    return {
        card,
        provider: card.querySelector('[data-ai-role="provider"]'),
        model: card.querySelector('[data-ai-role="model"]'),
        variant: card.querySelector('[data-ai-role="variant"]'),
        variantInputs: Array.from(card.querySelectorAll('[data-ai-role="variant"]')),
        systemPromptToggle: card.querySelector('[data-ai-role="systemPromptToggle"]'),
        systemPrompt: card.querySelector('[data-ai-role="systemPrompt"]'),
        input: card.querySelector('[data-ai-role="input"]'),
        output: card.querySelector('[data-ai-role="output"]'),
        submit: card.querySelector('[data-ai-role="submit"]'),
        copy: card.querySelector('[data-ai-role="copy"]'),
        status: card.querySelector('[data-ai-role="status"]')
    };
}

function scheduleAiWriterSettingsSave(cardKey) {
    if (aiWriterSaveTimeouts[cardKey]) {
        clearTimeout(aiWriterSaveTimeouts[cardKey]);
    }

    aiWriterSaveTimeouts[cardKey] = setTimeout(() => {
        delete aiWriterSaveTimeouts[cardKey];
        void saveSettings();
    }, 250);
}

function updateAiWriterCardSettings(cardKey, updates, saveMode = 'debounced') {
    const currentCard = settings.aiWriterCards?.[cardKey];
    if (!currentCard) return;

    settings.aiWriterCards[cardKey] = {
        ...currentCard,
        ...updates
    };

    if (saveMode === 'immediate') {
        void saveSettings();
    } else {
        scheduleAiWriterSettingsSave(cardKey);
    }
}

function hydrateAiWriterCard(cardKey) {
    const cardSettings = settings.aiWriterCards?.[cardKey];
    const elements = getAiWriterCardElements(cardKey);
    const meta = AI_WRITER_CARD_META[cardKey];
    if (!cardSettings || !elements || !meta) return;

    if (elements.provider) {
        elements.provider.value = cardSettings.provider;
    }
    if (elements.model) {
        elements.model.value = cardSettings.model;
        elements.model.placeholder = getDefaultModelForProvider(cardSettings.provider);
    }
    if (elements.variant) {
        if (meta.allowMultipleVariants) {
            const selectedVariants = normalizeAiWriterVariant(cardKey, cardSettings[meta.variantKey]);
            elements.variantInputs.forEach((input) => {
                input.checked = selectedVariants.includes(input.value);
            });
        } else {
            elements.variant.value = cardSettings[meta.variantKey];
        }
    }
    if (elements.systemPrompt) {
        elements.systemPrompt.value = cardSettings.systemPrompt;
    }
    if (elements.systemPromptToggle && elements.systemPrompt) {
        elements.systemPromptToggle.setAttribute(
            'aria-expanded',
            elements.systemPrompt.classList.contains('hidden') ? 'false' : 'true'
        );
    }
}

function hydrateAiWriterCards() {
    Object.keys(AI_WRITER_CARD_META).forEach((cardKey) => hydrateAiWriterCard(cardKey));
}

function handleAiWriterConfigChange(event) {
    const field = event.target.closest('[data-ai-role]');
    if (!field) return;

    const card = field.closest('[data-ai-card]');
    if (!card) return;

    const cardKey = card.dataset.aiCard;
    const role = field.dataset.aiRole;
    const meta = AI_WRITER_CARD_META[cardKey];
    if (!cardKey || !meta) return;

    if (role === 'provider') {
        const provider = field.value === 'openrouter' ? 'openrouter' : 'ollama';
        const nextModel = getDefaultModelForProvider(provider);
        updateAiWriterCardSettings(cardKey, { provider, model: nextModel }, 'immediate');
        hydrateAiWriterCard(cardKey);
        return;
    }

    if (role === 'variant') {
        const variantKey = meta.variantKey;
        let nextVariant;

        if (meta.allowMultipleVariants) {
            nextVariant = normalizeAiWriterVariant(
                cardKey,
                elementsFromCard(card)?.variantInputs.filter((input) => input.checked).map((input) => input.value)
            );
        } else {
            nextVariant = field.value || meta.defaultVariant;
        }

        updateAiWriterCardSettings(cardKey, {
            [variantKey]: nextVariant,
            systemPrompt: getDefaultAiWriterSystemPrompt(cardKey, nextVariant)
        }, 'immediate');
        hydrateAiWriterCard(cardKey);
        return;
    }

    if (role === 'model') {
        updateAiWriterCardSettings(cardKey, {
            model: field.value.trim() || getDefaultModelForProvider(settings.aiWriterCards[cardKey].provider)
        });
        return;
    }

    if (role === 'systemPrompt') {
        updateAiWriterCardSettings(cardKey, { systemPrompt: field.value });
    }
}

function elementsFromCard(card) {
    const cardKey = card?.dataset.aiCard;
    return cardKey ? getAiWriterCardElements(cardKey) : null;
}

function toggleAiWriterSystemPrompt(cardKey) {
    const elements = getAiWriterCardElements(cardKey);
    if (!elements?.systemPrompt || !elements?.systemPromptToggle) return;

    const isHidden = elements.systemPrompt.classList.toggle('hidden');
    elements.systemPromptToggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');

    if (!isHidden) {
        elements.systemPrompt.focus();
    }
}

function setupAiWriterListeners() {
    if (aiWriterListenersBound || !aiWriterPage) return;

    aiWriterPage.addEventListener('change', handleAiWriterConfigChange);
    aiWriterPage.addEventListener('input', handleAiWriterConfigChange);
    aiWriterPage.addEventListener('keydown', (event) => {
        const toggle = event.target.closest('[data-ai-role="systemPromptToggle"]');
        if (!toggle) return;
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        const cardKey = toggle.closest('[data-ai-card]')?.dataset.aiCard;
        if (cardKey) {
            toggleAiWriterSystemPrompt(cardKey);
        }
    });
    aiWriterPage.addEventListener('click', (event) => {
        const header = event.target.closest('.calculator-card-header');
        if (header && aiWriterPage.contains(header) && !event.target.closest('[data-ai-role]')) {
            const card = header.closest('.calculator-card');
            if (card) {
                card.classList.toggle('calculator-card-expanded');
            }
            return;
        }

        const actionButton = event.target.closest('[data-ai-role]');
        if (!actionButton) return;

        const card = actionButton.closest('[data-ai-card]');
        const cardKey = card?.dataset.aiCard;
        if (!cardKey) return;

        if (actionButton.dataset.aiRole === 'systemPromptToggle') {
            event.preventDefault();
            toggleAiWriterSystemPrompt(cardKey);
        } else if (actionButton.dataset.aiRole === 'submit') {
            void handleAiWriterSubmit(cardKey);
        } else if (actionButton.dataset.aiRole === 'copy') {
            void handleAiWriterCopy(cardKey);
        }
    });

    aiWriterListenersBound = true;
}

function resetTaxPlanner() {
    const taxInHandInput = document.getElementById('taxInHandInput');

    if (taxSalaryInput) taxSalaryInput.value = '';
    if (taxInHandInput) taxInHandInput.value = '';
    if (taxBasicSalaryInput) taxBasicSalaryInput.value = '';
    if (taxRentPaidInput) taxRentPaidInput.value = '';
    if (taxDaInput) taxDaInput.value = '';
    if (taxHraReceivedInput) taxHraReceivedInput.value = '';
    if (taxFYInput) taxFYInput.value = '2025-26';
    if (taxCityInput) taxCityInput.value = '0.5';
    if (taxResidentInput) taxResidentInput.value = 'resident';
    if (taxAgeBandInput) taxAgeBandInput.value = 'lt60';

    _taxDeductionViewRegime = 'old';
    resetTaxDeductionsState();
    const toggleContainer = document.getElementById('taxRegimeToggle');
    if (toggleContainer) {
        toggleContainer.querySelectorAll('.tax-regime-toggle-btn').forEach(b => b.classList.remove('active'));
        const oldBtn = toggleContainer.querySelector('.tax-regime-toggle-btn[data-regime="old"]');
        if (oldBtn) oldBtn.classList.add('active');
    }

    const comparison = document.getElementById('taxComparisonSection');
    if (comparison) comparison.style.display = 'none';
    const breakdown = document.getElementById('taxSalaryBreakdown');
    if (breakdown) breakdown.style.display = 'none';

    updateTaxCalculator();
}

function initCalculators() {
    updatePercentageCalculator();
    updateDiscountCalculator();
    updateBillSplitCalculator();
    updateEmiCalculator();
    updateTaxCalculator();
}

function updatePercentageCalculator() {
    const mode = percentageModeToggle?.querySelector('.percentage-mode-btn.active')?.dataset.mode || 'forward';
    const rate = Math.max(0, parseCalculatorValue(percentageRateInput));
    const secondVal = Math.max(0, parseCalculatorValue(percentageBaseInput));

    if (percentageValueLabel) {
        percentageValueLabel.textContent = mode === 'reverse' ? 'Part (this %)' : 'Total value';
    }
    if (percentageResultLabel) {
        percentageResultLabel.textContent = mode === 'reverse' ? 'Original (100%)' : 'Result';
    }
    if (percentageBaseInput) {
        percentageBaseInput.placeholder = mode === 'reverse' ? 'e.g. 25' : '2400';
    }

    let result = 0;
    let summary = '';

    if (mode === 'forward') {
        result = (rate / 100) * secondVal;
        summary = `${formatCalculatorNumber(rate)}% of ${formatCalculatorNumber(secondVal)} = ${formatCalculatorNumber(result)}`;
    } else {
        if (rate <= 0) {
            summary = 'Enter a percentage greater than 0 to find the original (100%).';
        } else {
            const rateFraction = rate / 100;
            result = secondVal / rateFraction;
            summary = `If ${formatCalculatorNumber(rate)}% = ${formatCalculatorNumber(secondVal)}, then 100% = ${formatCalculatorNumber(result)} (${formatCalculatorNumber(secondVal)} ÷ ${rateFraction})`;
        }
    }

    if (percentageResult) {
        percentageResult.textContent = rate <= 0 && mode === 'reverse' ? '—' : formatCalculatorNumber(result);
    }
    if (percentageSummary) {
        percentageSummary.textContent = summary;
    }
}

function updateDiscountCalculator() {
    const originalPrice = Math.max(0, parseCalculatorValue(discountPriceInput));
    const discountRate = Math.max(0, parseCalculatorValue(discountRateInput));
    const taxRate = Math.max(0, parseCalculatorValue(discountTaxInput));
    const savings = originalPrice * (discountRate / 100);
    const discountedSubtotal = Math.max(0, originalPrice - savings);
    const finalTotal = discountedSubtotal * (1 + (taxRate / 100));

    if (discountSavingsResult) {
        discountSavingsResult.textContent = formatCalculatorNumber(savings);
    }
    if (discountFinalResult) {
        discountFinalResult.textContent = formatCalculatorNumber(finalTotal);
    }
}

function updateBillSplitCalculator() {
    const billAmount = Math.max(0, parseCalculatorValue(splitBillInput));
    const peopleCount = Math.max(1, Math.round(parseCalculatorValue(splitPeopleInput, 1)));
    const tipRate = Math.max(0, parseCalculatorValue(splitTipInput));
    const tipTotal = billAmount * (tipRate / 100);
    const perPerson = (billAmount + tipTotal) / peopleCount;

    if (splitTipResult) {
        splitTipResult.textContent = formatCalculatorNumber(tipTotal);
    }
    if (splitPerPersonResult) {
        splitPerPersonResult.textContent = formatCalculatorNumber(perPerson);
    }
}

function updateEmiCalculator() {
    const principal = Math.max(0, parseCalculatorValue(emiPrincipalInput));
    const annualRate = Math.max(0, parseCalculatorValue(emiRateInput));
    const months = Math.max(1, Math.round(parseCalculatorValue(emiMonthsInput, 1)));
    const monthlyRate = annualRate / 12 / 100;

    let monthlyPayment = 0;
    if (principal > 0) {
        if (monthlyRate === 0) {
            monthlyPayment = principal / months;
        } else {
            const growthFactor = (1 + monthlyRate) ** months;
            monthlyPayment = principal * monthlyRate * growthFactor / (growthFactor - 1);
        }
    }
    const totalPayment = monthlyPayment * months;

    if (emiMonthlyResult) {
        emiMonthlyResult.textContent = formatCalculatorNumber(monthlyPayment);
    }
    if (emiTotalResult) {
        emiTotalResult.textContent = formatCalculatorNumber(totalPayment);
    }
}

// Track which regime view is selected for the deductions panel
let _taxDeductionViewRegime = 'old';
let _taxAutoFilling = false;
let _taxDeductionsState = {
    old: {
        stdDeduction: { enabled: true },
        hra: { enabled: false, mode: 'auto', manualAmount: 0 },
        sec80c: { enabled: false, amount: 0 },
        sec80d: { enabled: false, amount: 0, selfBand: 'normal', parentsBand: 'none' },
        sec80tta: { enabled: false, amount: 0 },
        homeLoan24b: { enabled: false, amount: 0 }
    },
    new: {
        stdDeduction: { enabled: true },
        employerNps80ccd2: { enabled: false, amount: 0 }
    }
};

function resetTaxDeductionsState() {
    _taxDeductionsState = {
        old: {
            stdDeduction: { enabled: true },
            hra: { enabled: false, mode: 'auto', manualAmount: 0 },
            sec80c: { enabled: false, amount: 0 },
            sec80d: { enabled: false, amount: 0, selfBand: 'normal', parentsBand: 'none' },
            sec80tta: { enabled: false, amount: 0 },
            homeLoan24b: { enabled: false, amount: 0 }
        },
        new: {
            stdDeduction: { enabled: true },
            employerNps80ccd2: { enabled: false, amount: 0 }
        }
    };
}

function clampCurrency(value, min, max) {
    const safe = Number.isFinite(value) ? value : 0;
    return Math.min(max, Math.max(min, safe));
}

function get80dCaps(selfBand, parentsBand) {
    const selfCap = selfBand === 'senior' ? 50000 : 25000;
    let parentsCap = 0;
    if (parentsBand === 'normal') parentsCap = 25000;
    if (parentsBand === 'senior') parentsCap = 50000;
    return { selfCap, parentsCap, totalCap: selfCap + parentsCap };
}

function renderTaxDeductionsList({ viewRegime, hraAutoAmount, employerNpsCap, oldExemption }) {
    if (!taxTargetsList) return;

    taxTargetsList.innerHTML = '';

    const makeRow = ({ key, label, enabled, amount, amountDisabled, capText, extraControlsHtml, note }) => {
        const row = document.createElement('div');
        row.className = 'tax-deduction-row';
        row.dataset.taxKey = key;
        row.innerHTML = `
            <label class="tax-deduction-check">
                <input type="checkbox" class="tax-deduction-checkbox" ${enabled ? 'checked' : ''} ${key === 'stdDeduction' ? 'disabled' : ''}>
                <span class="tax-deduction-label">${label}</span>
            </label>
            <div class="tax-deduction-controls">
                ${extraControlsHtml || ''}
                <input type="number" class="tax-deduction-amount calculator-input" value="${Number.isFinite(amount) ? amount : 0}" min="0" step="100" ${amountDisabled ? 'disabled' : ''}>
                ${capText ? `<span class="tax-deduction-cap">${capText}</span>` : ''}
            </div>
            ${note ? `<div class="tax-deduction-note">${note}</div>` : ''}
        `;
        return row;
    };

    if (viewRegime === 'old') {
        const caps80d = get80dCaps(_taxDeductionsState.old.sec80d.selfBand, _taxDeductionsState.old.sec80d.parentsBand);
        taxTargetsList.appendChild(makeRow({
            key: 'stdDeduction',
            label: 'Standard Deduction (Old Regime)',
            enabled: true,
            amount: 50000,
            amountDisabled: true,
            capText: `Max ₹${formatCalculatorNumber(50000)}`,
            note: oldExemption > 250000 ? `Basic exemption considered: ₹${formatCalculatorNumber(oldExemption)} (age band).` : ''
        }));

        taxTargetsList.appendChild(makeRow({
            key: 'hra',
            label: 'HRA Exemption (Sec 10(13A))',
            enabled: _taxDeductionsState.old.hra.enabled,
            amount: _taxDeductionsState.old.hra.mode === 'manual' ? _taxDeductionsState.old.hra.manualAmount : hraAutoAmount,
            amountDisabled: !_taxDeductionsState.old.hra.enabled || _taxDeductionsState.old.hra.mode !== 'manual',
            capText: _taxDeductionsState.old.hra.mode === 'auto' ? `Auto ₹${formatCalculatorNumber(hraAutoAmount)}` : '',
            extraControlsHtml: `
                <select class="tax-deduction-select tax-hra-mode" ${_taxDeductionsState.old.hra.enabled ? '' : 'disabled'}>
                    <option value="auto" ${_taxDeductionsState.old.hra.mode === 'auto' ? 'selected' : ''}>Auto</option>
                    <option value="manual" ${_taxDeductionsState.old.hra.mode === 'manual' ? 'selected' : ''}>Manual</option>
                </select>
            `
        }));

        taxTargetsList.appendChild(makeRow({
            key: 'sec80c',
            label: '80C (PPF/EPF/ELSS/LIC etc.)',
            enabled: _taxDeductionsState.old.sec80c.enabled,
            amount: _taxDeductionsState.old.sec80c.amount,
            amountDisabled: !_taxDeductionsState.old.sec80c.enabled,
            capText: `Max ₹${formatCalculatorNumber(150000)}`
        }));

        taxTargetsList.appendChild(makeRow({
            key: 'sec80d',
            label: '80D (Health Insurance)',
            enabled: _taxDeductionsState.old.sec80d.enabled,
            amount: _taxDeductionsState.old.sec80d.amount,
            amountDisabled: !_taxDeductionsState.old.sec80d.enabled,
            capText: `Max ₹${formatCalculatorNumber(caps80d.totalCap)}`,
            extraControlsHtml: `
                <select class="tax-deduction-select tax-80d-self" ${_taxDeductionsState.old.sec80d.enabled ? '' : 'disabled'} title="Self/Family cap">
                    <option value="normal" ${_taxDeductionsState.old.sec80d.selfBand === 'normal' ? 'selected' : ''}>Self ₹25k</option>
                    <option value="senior" ${_taxDeductionsState.old.sec80d.selfBand === 'senior' ? 'selected' : ''}>Self ₹50k</option>
                </select>
                <select class="tax-deduction-select tax-80d-parents" ${_taxDeductionsState.old.sec80d.enabled ? '' : 'disabled'} title="Parents cap">
                    <option value="none" ${_taxDeductionsState.old.sec80d.parentsBand === 'none' ? 'selected' : ''}>Parents ₹0</option>
                    <option value="normal" ${_taxDeductionsState.old.sec80d.parentsBand === 'normal' ? 'selected' : ''}>Parents ₹25k</option>
                    <option value="senior" ${_taxDeductionsState.old.sec80d.parentsBand === 'senior' ? 'selected' : ''}>Parents ₹50k</option>
                </select>
            `
        }));

        taxTargetsList.appendChild(makeRow({
            key: 'sec80tta',
            label: '80TTA (Savings Interest)',
            enabled: _taxDeductionsState.old.sec80tta.enabled,
            amount: _taxDeductionsState.old.sec80tta.amount,
            amountDisabled: !_taxDeductionsState.old.sec80tta.enabled,
            capText: `Max ₹${formatCalculatorNumber(10000)}`
        }));

        taxTargetsList.appendChild(makeRow({
            key: 'homeLoan24b',
            label: 'Home Loan Interest (Sec 24(b))',
            enabled: _taxDeductionsState.old.homeLoan24b.enabled,
            amount: _taxDeductionsState.old.homeLoan24b.amount,
            amountDisabled: !_taxDeductionsState.old.homeLoan24b.enabled,
            capText: `Max ₹${formatCalculatorNumber(200000)}`
        }));
        return;
    }

    taxTargetsList.appendChild(makeRow({
        key: 'stdDeduction',
        label: 'Standard Deduction (New Regime)',
        enabled: true,
        amount: 75000,
        amountDisabled: true,
        capText: `Max ₹${formatCalculatorNumber(75000)}`
    }));

    taxTargetsList.appendChild(makeRow({
        key: 'employerNps80ccd2',
        label: 'Employer NPS (80CCD(2))',
        enabled: _taxDeductionsState.new.employerNps80ccd2.enabled,
        amount: _taxDeductionsState.new.employerNps80ccd2.amount,
        amountDisabled: !_taxDeductionsState.new.employerNps80ccd2.enabled,
        capText: `Max ₹${formatCalculatorNumber(Math.round(employerNpsCap))}`,
        note: 'Cap is 14% of (Basic + DA). Aggregate employer cap (₹7.5L across PF/NPS/superannuation) not modeled in this basic mode.'
    }));
}

function handleTaxDeductionsListChange(event) {
    const row = event.target.closest('.tax-deduction-row');
    if (!row) return;
    const key = row.dataset.taxKey;
    if (!key) return;

    const checkbox = row.querySelector('.tax-deduction-checkbox');
    const amountInput = row.querySelector('.tax-deduction-amount');

    const enabled = checkbox ? checkbox.checked : false;
    const amount = amountInput ? parseCalculatorValue(amountInput) : 0;

    if (_taxDeductionViewRegime === 'old') {
        if (key === 'hra') {
            _taxDeductionsState.old.hra.enabled = enabled;
            const modeSelect = row.querySelector('.tax-hra-mode');
            if (modeSelect) {
                _taxDeductionsState.old.hra.mode = modeSelect.value === 'manual' ? 'manual' : 'auto';
            }
            _taxDeductionsState.old.hra.manualAmount = clampCurrency(amount, 0, Number.POSITIVE_INFINITY);
        } else if (key === 'sec80c') {
            _taxDeductionsState.old.sec80c.enabled = enabled;
            _taxDeductionsState.old.sec80c.amount = clampCurrency(amount, 0, 150000);
        } else if (key === 'sec80d') {
            _taxDeductionsState.old.sec80d.enabled = enabled;
            const selfSelect = row.querySelector('.tax-80d-self');
            const parentsSelect = row.querySelector('.tax-80d-parents');
            if (selfSelect) _taxDeductionsState.old.sec80d.selfBand = selfSelect.value;
            if (parentsSelect) _taxDeductionsState.old.sec80d.parentsBand = parentsSelect.value;
            const caps80d = get80dCaps(_taxDeductionsState.old.sec80d.selfBand, _taxDeductionsState.old.sec80d.parentsBand);
            _taxDeductionsState.old.sec80d.amount = clampCurrency(amount, 0, caps80d.totalCap);
        } else if (key === 'sec80tta') {
            _taxDeductionsState.old.sec80tta.enabled = enabled;
            _taxDeductionsState.old.sec80tta.amount = clampCurrency(amount, 0, 10000);
        } else if (key === 'homeLoan24b') {
            _taxDeductionsState.old.homeLoan24b.enabled = enabled;
            _taxDeductionsState.old.homeLoan24b.amount = clampCurrency(amount, 0, 200000);
        }
    } else {
        if (key === 'employerNps80ccd2') {
            _taxDeductionsState.new.employerNps80ccd2.enabled = enabled;
            _taxDeductionsState.new.employerNps80ccd2.amount = clampCurrency(amount, 0, Number.POSITIVE_INFINITY);
        }
    }

    updateTaxCalculator();
}

// --- TAX SLAB FUNCTIONS (top-level for reuse) ---
function calcNewRegimeTax(income) {
    if (income <= 400000) return 0;
    let tax = 0;
    if (income > 400000)  tax += Math.min(400000, income - 400000) * 0.05;
    if (income > 800000)  tax += Math.min(400000, income - 800000) * 0.10;
    if (income > 1200000) tax += Math.min(400000, income - 1200000) * 0.15;
    if (income > 1600000) tax += Math.min(400000, income - 1600000) * 0.20;
    if (income > 2000000) tax += Math.min(400000, income - 2000000) * 0.25;
    if (income > 2400000) tax += (income - 2400000) * 0.30;
    return tax;
}

function calcOldRegimeTax(income) {
    if (income <= 250000) return 0;
    let tax = 0;
    if (income > 250000)  tax += Math.min(250000, income - 250000) * 0.05;
    if (income > 500000)  tax += Math.min(500000, income - 500000) * 0.20;
    if (income > 1000000) tax += (income - 1000000) * 0.30;
    return tax;
}

function getOldRegimeExemptionForAgeBand(ageBand) {
    if (ageBand === '80plus') return 500000;
    if (ageBand === '60to79') return 300000;
    return 250000;
}

function calcOldRegimeTaxWithExemption(income, exemption) {
    if (income <= exemption) return 0;
    let tax = 0;

    const slab5Upper = 500000;
    const slab5Width = Math.max(0, slab5Upper - exemption);
    if (income > exemption && slab5Width > 0) {
        tax += Math.min(slab5Width, income - exemption) * 0.05;
    }
    if (income > 500000) {
        tax += Math.min(500000, income - 500000) * 0.20;
    }
    if (income > 1000000) {
        tax += (income - 1000000) * 0.30;
    }
    return tax;
}

let _taxSanityChecksRun = false;
function runTaxSanityChecks() {
    if (_taxSanityChecksRun) return;
    _taxSanityChecksRun = true;

    const failures = [];
    const approxEqual = (a, b, tolerance = 0.5) => Math.abs(a - b) <= tolerance;

    // New regime slabs (FY 2025-26): up to 4L nil, 4-8L @5%, 8-12L @10%
    if (!approxEqual(calcNewRegimeTax(400000), 0)) failures.push('New: tax(4,00,000) != 0');
    if (!approxEqual(calcNewRegimeTax(800000), 20000)) failures.push('New: tax(8,00,000) != 20,000');
    if (!approxEqual(calcNewRegimeTax(1200000), 60000)) failures.push('New: tax(12,00,000) != 60,000');

    // Old regime (age <60): exemption 2.5L, 2.5-5L @5%
    if (!approxEqual(calcOldRegimeTaxWithExemption(250000, 250000), 0)) failures.push('Old: tax(2,50,000) != 0');
    if (!approxEqual(calcOldRegimeTaxWithExemption(500000, 250000), 12500)) failures.push('Old: tax(5,00,000) != 12,500');

    if (failures.length) {
        console.warn('[TaxSanityChecks] Failed checks:', failures);
    }
}

function updateTaxCalculator(event) {
    const taxInHandInput = document.getElementById('taxInHandInput');
    if (!taxSalaryInput || !taxBasicSalaryInput || !taxRentPaidInput || !taxCityInput || !taxTargetsList) return;

    runTaxSanityChecks();

    const sourceId = event?.target?.id || '';

    // ====================================================
    // SMART AUTO-FILL LOGIC
    // ====================================================
    if (!_taxAutoFilling) {
        _taxAutoFilling = true;

        let ctc = parseCalculatorValue(taxSalaryInput);
        let basic = parseCalculatorValue(taxBasicSalaryInput);
        let inHand = taxInHandInput ? parseCalculatorValue(taxInHandInput) : 0;
        let rent = parseCalculatorValue(taxRentPaidInput);

        if (sourceId === 'taxInHandInput' && inHand > 0) {
            // Reverse-calculate CTC from Monthly In-Hand using iterative convergence
            let estCTC = inHand * 12 / 0.65; // initial guess
            for (let i = 0; i < 8; i++) {
                const estBasic = estCTC * 0.5;
                const pf = Math.round(estBasic * 0.12);
                const gross = estCTC - pf;
                let taxableNew = estCTC - 75000;
                let taxNew = calcNewRegimeTax(taxableNew);
                if (taxableNew <= 1200000) taxNew = 0;
                if (taxNew > 0) taxNew *= 1.04;
                const calcInHand = gross - pf - 2400 - taxNew;
                estCTC += ((inHand * 12) - calcInHand);
            }
            ctc = Math.round(estCTC);
            basic = Math.round(ctc * 0.5);
            taxSalaryInput.value = ctc;
            taxBasicSalaryInput.value = basic;
        } else if (sourceId === 'taxSalaryInput' && ctc > 0) {
            // CTC entered → auto-fill Basic and In-Hand
            if (!basic || sourceId === 'taxSalaryInput') {
                basic = Math.round(ctc * 0.5);
                taxBasicSalaryInput.value = basic;
            }
        } else if (sourceId === 'taxBasicSalaryInput' && basic > 0) {
            // Basic entered → auto-fill CTC if blank
            if (!ctc) {
                ctc = Math.round(basic * 2);
                taxSalaryInput.value = ctc;
            }
        }

        // Final fallback: If CTC exists but basic doesn't
        ctc = parseCalculatorValue(taxSalaryInput);
        basic = parseCalculatorValue(taxBasicSalaryInput);
        if (ctc > 0 && !basic) {
            taxBasicSalaryInput.value = Math.round(ctc * 0.5);
        }
        if (!ctc && basic > 0) {
            taxSalaryInput.value = Math.round(basic * 2);
        }

        _taxAutoFilling = false;
    }

    // Re-read values after auto-fill
    const totalSalary = parseCalculatorValue(taxSalaryInput);
    const basicSalary = parseCalculatorValue(taxBasicSalaryInput);
    const rentPaid = parseCalculatorValue(taxRentPaidInput);
    const daSalary = Math.max(0, parseCalculatorValue(taxDaInput));
    const hraReceivedFromInput = Math.max(0, parseCalculatorValue(taxHraReceivedInput));
    const isResident = (taxResidentInput?.value || 'resident') === 'resident';
    const ageBand = taxAgeBandInput?.value || 'lt60';

    if (!totalSalary) {
        taxTargetsList.innerHTML = '<div style="opacity: 0.6; padding: 1.5rem; text-align: center; border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px;">Enter your Annual CTC or Monthly In-Hand salary to begin</div>';
        const tcs = document.getElementById('taxComparisonSection');
        if(tcs) tcs.style.display = 'none';
        const bks = document.getElementById('taxSalaryBreakdown');
        if(bks) bks.style.display = 'none';
        return;
    }

    const isMetro = taxCityInput.value === "0.5";
    const cityMultiplier = isMetro ? 0.5 : 0.4;
    
    // --- HRA Calculation (Old Regime only) ---
    let hraExemption = 0;
    const basicPlusDa = Math.max(0, basicSalary + daSalary);
    if (basicPlusDa > 0 && rentPaid > 0) {
        let hraReceived = hraReceivedFromInput;
        if (!hraReceived) {
            hraReceived = Math.max(0, totalSalary - basicSalary);
            if (hraReceived === 0) hraReceived = basicSalary * 0.5;
        }
        const rentMinus10PercentSalary = Math.max(0, rentPaid - (0.1 * basicPlusDa));
        const percentageOfSalary = basicPlusDa * cityMultiplier;
        hraExemption = Math.min(hraReceived, rentMinus10PercentSalary, percentageOfSalary);
    }

    // ====================================================
    // BUILD DEDUCTION LISTS FOR EACH REGIME
    // ====================================================
    const caps80d = get80dCaps(_taxDeductionsState.old.sec80d.selfBand, _taxDeductionsState.old.sec80d.parentsBand);
    const oldDeductionStd = 50000;
    const oldDeductionHra = _taxDeductionsState.old.hra.enabled
        ? clampCurrency(_taxDeductionsState.old.hra.mode === 'manual' ? _taxDeductionsState.old.hra.manualAmount : hraExemption, 0, Number.POSITIVE_INFINITY)
        : 0;
    const oldDeduction80c = _taxDeductionsState.old.sec80c.enabled ? clampCurrency(_taxDeductionsState.old.sec80c.amount, 0, 150000) : 0;
    const oldDeduction80d = _taxDeductionsState.old.sec80d.enabled ? clampCurrency(_taxDeductionsState.old.sec80d.amount, 0, caps80d.totalCap) : 0;
    const oldDeduction80tta = _taxDeductionsState.old.sec80tta.enabled ? clampCurrency(_taxDeductionsState.old.sec80tta.amount, 0, 10000) : 0;
    const oldDeductionHomeLoan = _taxDeductionsState.old.homeLoan24b.enabled ? clampCurrency(_taxDeductionsState.old.homeLoan24b.amount, 0, 200000) : 0;
    const oldTotalDeductions = oldDeductionStd + oldDeductionHra + oldDeduction80c + oldDeduction80d + oldDeduction80tta + oldDeductionHomeLoan;

    const employerNpsCap = basicPlusDa * 0.14;
    const newStdDed = 75000;
    const newDeductionNps = _taxDeductionsState.new.employerNps80ccd2.enabled
        ? clampCurrency(_taxDeductionsState.new.employerNps80ccd2.amount, 0, employerNpsCap)
        : 0;

    renderTaxDeductionsList({
        viewRegime: _taxDeductionViewRegime,
        hraAutoAmount: Math.round(hraExemption),
        employerNpsCap,
        oldExemption: getOldRegimeExemptionForAgeBand(ageBand)
    });

    // ====================================================
    // TAX CALCULATION ENGINE
    // ====================================================
    const taxComparisonSection = document.getElementById('taxComparisonSection');
    const newTaxableIncomeEl = document.getElementById('newTaxableIncome');
    const newFinalTaxEl = document.getElementById('newFinalTax');
    const newSlabTaxEl = document.getElementById('newSlabTax');
    const newRebateEl = document.getElementById('newRebate');
    const newCessEl = document.getElementById('newCess');
    const oldTaxableIncomeEl = document.getElementById('oldTaxableIncome');
    const oldFinalTaxEl = document.getElementById('oldFinalTax');
    const oldSlabTaxEl = document.getElementById('oldSlabTax');
    const oldRebateEl = document.getElementById('oldRebate');
    const oldCessEl = document.getElementById('oldCess');
    const newRegimeCard = document.getElementById('newRegimeCard');
    const oldRegimeCard = document.getElementById('oldRegimeCard');
    const taxRecommendationBanner = document.getElementById('taxRecommendationBanner');
    const taxRecommendationText = document.getElementById('taxRecommendationText');

    if (!taxComparisonSection) return;
    taxComparisonSection.style.display = 'block';

    // --- NEW REGIME calculation ---
    let newTaxable = Math.max(0, totalSalary - newStdDed - newDeductionNps);
    let newSlabTax = calcNewRegimeTax(newTaxable);
    let newRebate = 0;
    let newCess = 0;
    let newTax = newSlabTax;
    if (isResident && newTaxable <= 1200000) {
        newRebate = newSlabTax;
        newTax = 0;
    } else if (newSlabTax > 0) {
        newCess = newSlabTax * 0.04;
        newTax = newSlabTax + newCess;
    }

    // --- OLD REGIME calculation ---
    let oldTaxable = Math.max(0, totalSalary - oldTotalDeductions);
    const oldExemption = getOldRegimeExemptionForAgeBand(ageBand);
    let oldSlabTax = calcOldRegimeTaxWithExemption(oldTaxable, oldExemption);
    let oldRebate = 0;
    let oldCess = 0;
    let oldTax = oldSlabTax;
    if (isResident && oldTaxable <= 500000) {
        oldRebate = oldSlabTax;
        oldTax = 0;
    } else if (oldSlabTax > 0) {
        oldCess = oldSlabTax * 0.04;
        oldTax = oldSlabTax + oldCess;
    }

    // Update DOM
    newTaxableIncomeEl.textContent = "₹" + formatCalculatorNumber(Math.round(newTaxable));
    if (newSlabTaxEl) newSlabTaxEl.textContent = "₹" + formatCalculatorNumber(Math.round(newSlabTax));
    if (newRebateEl) newRebateEl.textContent = "₹" + formatCalculatorNumber(Math.round(newRebate));
    if (newCessEl) newCessEl.textContent = "₹" + formatCalculatorNumber(Math.round(newCess));
    newFinalTaxEl.textContent = "₹" + formatCalculatorNumber(Math.round(newTax));
    oldTaxableIncomeEl.textContent = "₹" + formatCalculatorNumber(Math.round(oldTaxable));
    if (oldSlabTaxEl) oldSlabTaxEl.textContent = "₹" + formatCalculatorNumber(Math.round(oldSlabTax));
    if (oldRebateEl) oldRebateEl.textContent = "₹" + formatCalculatorNumber(Math.round(oldRebate));
    if (oldCessEl) oldCessEl.textContent = "₹" + formatCalculatorNumber(Math.round(oldCess));
    oldFinalTaxEl.textContent = "₹" + formatCalculatorNumber(Math.round(oldTax));

    // Highlight winner
    newRegimeCard.className = "tax-regime-card new-regime-card";
    oldRegimeCard.className = "tax-regime-card old-regime-card";
    taxRecommendationBanner.className = "tax-recommendation-banner";

    let diff = Math.abs(newTax - oldTax);
    if (oldTax < newTax) {
        oldRegimeCard.classList.add('winning-regime');
        newRegimeCard.classList.add('losing-regime');
        taxRecommendationText.textContent = `🎉 Old Regime saves you ₹${formatCalculatorNumber(Math.round(diff))}!`;
    } else if (newTax < oldTax) {
        newRegimeCard.classList.add('winning-regime');
        oldRegimeCard.classList.add('losing-regime');
        taxRecommendationText.textContent = `🎉 New Regime saves you ₹${formatCalculatorNumber(Math.round(diff))}!`;
    } else {
        taxRecommendationBanner.classList.add('neutral');
        if (newTax === 0) {
            taxRecommendationText.innerHTML = `⚖️ Both regimes successfully result in <b style="letter-spacing:1px;">ZERO TAX</b>!`;
        } else {
            taxRecommendationText.innerHTML = `⚖️ Both regimes result in the exact same tax liability.`;
        }
    }

    // ====================================================
    // SALARY BREAKDOWN (CTC → In-Hand)
    // ====================================================
    const breakdownSection = document.getElementById('taxSalaryBreakdown');
    if (breakdownSection) {
        breakdownSection.style.display = 'block';

        const employerPF = Math.round(basicSalary * 0.12);
        const employeePF = Math.round(basicSalary * 0.12);
        const grossSalary = totalSalary - employerPF;
        const professionalTax = 2400;
        const bestTax = Math.min(newTax, oldTax);
        const bestRegimeName = newTax <= oldTax ? 'New Regime' : 'Old Regime';
        const annualInHand = grossSalary - employeePF - professionalTax - bestTax;
        const monthlyInHand = Math.round(annualInHand / 12);

        document.getElementById('bkCTC').textContent = '₹' + formatCalculatorNumber(totalSalary);
        document.getElementById('bkEmployerPF').textContent = '− ₹' + formatCalculatorNumber(employerPF);
        document.getElementById('bkGross').textContent = '₹' + formatCalculatorNumber(grossSalary);
        document.getElementById('bkEmployeePF').textContent = '− ₹' + formatCalculatorNumber(employeePF);
        document.getElementById('bkPT').textContent = '− ₹' + formatCalculatorNumber(professionalTax);
        document.getElementById('bkTDS').textContent = '− ₹' + formatCalculatorNumber(Math.round(bestTax));
        document.getElementById('bkAnnualInHand').textContent = '₹' + formatCalculatorNumber(Math.round(annualInHand));
        document.getElementById('bkMonthlyInHand').textContent = '₹' + formatCalculatorNumber(monthlyInHand);
        document.getElementById('breakdownRegimeLabel').textContent = 'Using ' + bestRegimeName;

        // Auto-update the In-Hand input field (only if user wasn't typing in it)
        if (taxInHandInput && sourceId !== 'taxInHandInput') {
            taxInHandInput.value = monthlyInHand > 0 ? monthlyInHand : '';
        }
    }
}

// Wire up the regime toggle buttons
document.addEventListener('DOMContentLoaded', () => {
    const toggleContainer = document.getElementById('taxRegimeToggle');
    if (toggleContainer) {
        toggleContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.tax-regime-toggle-btn');
            if (!btn) return;
            toggleContainer.querySelectorAll('.tax-regime-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            _taxDeductionViewRegime = btn.dataset.regime;
            updateTaxCalculator();
        });
    }
});

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
        if (isNotesPageActive() && notesSearchInput) {
            notesSearchInput.focus();
            notesSearchInput.select();
        } else if (isCalculatorsPageActive()) {
            focusCalculatorsWorkspace();
        } else if (currentBookmarkView === 'table' && bookmarkTableApi) {
            bookmarkTableApi.focusSearch();
        } else if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Ctrl/Cmd + N = Toggle add new bookmark form
    if (isBookmarksPageActive() && modifierKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        toggleAddForm();
        // If form is now visible, focus URL input
        if (isFormVisible) {
            setTimeout(() => urlInput.focus(), 100);
        }
    }

    // Ctrl/Cmd + = / + = Zoom in
    if (modifierKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        adjustZoom(10);
    }

    // Ctrl/Cmd + - = Zoom out
    if (modifierKey && e.key === '-') {
        e.preventDefault();
        adjustZoom(-10);
    }

    // Ctrl/Cmd + 0 = Reset zoom
    if (modifierKey && e.key === '0') {
        e.preventDefault();
        setZoom(100);
    }
    
    // Escape = Close add/edit modal if open
    if (e.key === 'Escape' && isFormVisible) {
        closeBookmarkForm();
    }
}

/**
 * Toggle the add bookmark form visibility
 */
function toggleAddForm() {
    if (!isBookmarksPageActive()) return;

    if (isFormVisible) {
        closeBookmarkForm();
    } else {
        resetBookmarkFormState();
        openBookmarkForm();
        setTimeout(() => urlInput.focus(), 150);
    }
}

function updateBookmarkFormUi() {
    const isEditing = editingBookmarkId !== null;

    if (bookmarkFormLabel) {
        bookmarkFormLabel.textContent = isEditing ? 'Edit Bookmark' : 'Add Bookmark';
    }
    if (bookmarkModalTitle) {
        bookmarkModalTitle.textContent = isEditing ? 'Edit Bookmark' : 'Add Bookmark';
    }
    if (bookmarkSubmitIcon) {
        bookmarkSubmitIcon.textContent = isEditing ? '💾' : '➕';
    }
    if (bookmarkSubmitText) {
        bookmarkSubmitText.textContent = isEditing ? 'Save' : 'Add';
    }
    if (cancelBookmarkEditBtn) {
        cancelBookmarkEditBtn.classList.toggle('hidden', !isEditing || !isFormVisible);
    }
}

function resetBookmarkFormState() {
    if (addBookmarkForm) {
        addBookmarkForm.reset();
    }
    editingBookmarkId = null;
    fetchedMetadata = null;
    setFetchStatus('', '');
    updateBookmarkFormUi();
}

function showBookmarkModal() {
    if (bookmarkModal) {
        bookmarkModal.classList.remove('hidden');
    }
}

function openBookmarkForm() {
    if (!isBookmarksPageActive()) {
        setActivePage('bookmarks');
    }

    isFormVisible = true;
    showBookmarkModal();
    if (addToggleBtn) {
        addToggleBtn.classList.add('active');
    }
    updateBookmarkFormUi();
}

function closeBookmarkForm() {
    isFormVisible = false;
    if (bookmarkModal) {
        bookmarkModal.classList.add('hidden');
    }
    if (addToggleBtn) {
        addToggleBtn.classList.remove('active');
    }
    resetBookmarkFormState();
}

function startBookmarkEdit(bookmark) {
    if (!bookmark) return;

    editingBookmarkId = bookmark.id;
    fetchedMetadata = null;
    setFetchStatus('Editing bookmark', 'success');
    urlInput.value = bookmark.url || '';
    titleInput.value = bookmark.title || '';
    descInput.value = bookmark.description || '';
    openBookmarkForm();
    setTimeout(() => titleInput.focus(), 100);
}

function cancelBookmarkEdit() {
    closeBookmarkForm();
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
        const parsedUrl = new URL(string);
        return BOOKMARK_ALLOWED_PROTOCOLS.has(parsedUrl.protocol);
    } catch {
        return false;
    }
}

function parseSafeBookmarkUrl(rawUrl) {
    try {
        const parsedUrl = new URL(rawUrl);
        return BOOKMARK_ALLOWED_PROTOCOLS.has(parsedUrl.protocol) ? parsedUrl : null;
    } catch {
        return null;
    }
}

function createBookmarkTitleElement(bookmark, safeUrl) {
    const titleElement = document.createElement(safeUrl ? 'a' : 'span');
    titleElement.className = 'bookmark-title';
    titleElement.textContent = bookmark.title;
    titleElement.title = bookmark.title;

    if (safeUrl) {
        titleElement.href = safeUrl.toString();
        titleElement.target = '_blank';
        titleElement.rel = 'noopener noreferrer';
    }

    return titleElement;
}

function getStorageArea() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        return chrome.storage.local;
    }

    return null;
}

async function loadUiState() {
    const storageArea = getStorageArea();
    let savedState = null;

    if (storageArea) {
        try {
            const storedValues = await storageArea.get(UI_STATE_STORAGE_KEY);
            savedState = storedValues?.[UI_STATE_STORAGE_KEY] ?? null;
        } catch (error) {
            console.error('Failed to load UI state:', error);
        }
    } else {
        try {
            savedState = localStorage.getItem(UI_STATE_STORAGE_KEY);
        } catch (error) {
            console.error('Failed to load UI state:', error);
        }
    }

    if (!savedState) return;

    try {
        const parsedState = typeof savedState === 'string' ? JSON.parse(savedState) : savedState;
        if (parsedState?.bookmarkView === 'cards' || parsedState?.bookmarkView === 'table') {
            currentBookmarkView = parsedState.bookmarkView;
        }
        if (VALID_PAGES.has(parsedState?.activePage)) {
            activePage = parsedState.activePage;
        } else if (parsedState?.isNotesPageVisible) {
            activePage = 'notes';
        }
        isSidebarCollapsed = Boolean(parsedState?.isSidebarCollapsed);
        if (Number.isInteger(parsedState?.zoomLevel) && parsedState.zoomLevel >= 50 && parsedState.zoomLevel <= 200) {
            currentZoomLevel = parsedState.zoomLevel;
        }
        if (Number.isInteger(parsedState?.cardViewLimit) && parsedState.cardViewLimit > 0) {
            cardViewLimit = parsedState.cardViewLimit;
        }
        hiddenCardFields.clear();
        if (Array.isArray(parsedState?.hiddenCardFields)) {
            parsedState.hiddenCardFields.forEach((fieldKey) => {
                if (CARD_FIELD_KEYS.has(fieldKey)) {
                    hiddenCardFields.add(fieldKey);
                }
            });
        }
    } catch (error) {
        console.error('Failed to parse UI state:', error);
    }
}

async function saveUiState() {
    const storageArea = getStorageArea();
    const state = {
        bookmarkView: currentBookmarkView,
        activePage,
        isNotesPageVisible: isNotesPageActive(),
        isSidebarCollapsed,
        cardViewLimit,
        hiddenCardFields: Array.from(hiddenCardFields),
        zoomLevel: currentZoomLevel
    };

    try {
        if (storageArea) {
            await storageArea.set({ [UI_STATE_STORAGE_KEY]: state });
            return true;
        }

        localStorage.setItem(UI_STATE_STORAGE_KEY, JSON.stringify(state));
        return true;
    } catch (error) {
        console.error('Failed to save UI state:', error);
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
        if (!parseSafeBookmarkUrl(url)) {
            return null;
        }

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
    const parsedUrl = parseSafeBookmarkUrl(url);

    if (!parsedUrl) {
        showToast('Please enter a valid HTTP/HTTPS URL', 'error');
        return;
    }

    faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${parsedUrl.hostname}`;
    
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
        if (editingBookmarkId !== null) {
            const existingBookmark = allBookmarks.find((bookmark) => bookmark.id === editingBookmarkId);
            if (!existingBookmark) {
                showToast('Bookmark not found', 'error');
                return;
            }

            await bookmarkDB.updateBookmark({
                ...existingBookmark,
                title,
                url,
                description,
                favicon: faviconUrl
            });

            closeBookmarkForm();
            await loadBookmarks();
            showToast('Bookmark updated successfully!', 'success');
            return;
        }

        await bookmarkDB.addBookmark({
            title: title,
            url: url,
            description: description,
            favicon: faviconUrl
        });

        closeBookmarkForm();
        await loadBookmarks();
        showToast('Bookmark added successfully!', 'success');
    } catch (error) {
        console.error('Failed to save bookmark:', error);
        showToast(editingBookmarkId !== null ? 'Failed to update bookmark' : 'Failed to add bookmark', 'error');
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
        if (currentBookmarkView === 'cards') {
            updateCount(Math.min(allBookmarks.length, cardViewLimit), allBookmarks.length);
        }
    } catch (error) {
        console.error('Failed to load bookmarks:', error);
        showToast('Failed to load bookmarks', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Update bookmark view controls and visible containers.
 */
function updateBookmarksHeroMeta() {
    const modeLabel = currentBookmarkView === 'table' ? 'Table' : 'Cards';
    const viewLabel = currentBookmarkView === 'table' ? 'Table view' : 'Card view';

    if (bookmarksHeroMode) {
        bookmarksHeroMode.textContent = modeLabel;
    }
    if (bookmarkHeroViewLabel) {
        bookmarkHeroViewLabel.textContent = viewLabel;
    }
}

function updateBookmarkViewControls() {
    const isTableView = currentBookmarkView === 'table';

    if (bookmarkCardsViewBtn) {
        bookmarkCardsViewBtn.classList.toggle('active', !isTableView);
    }
    if (bookmarkTableViewBtn) {
        bookmarkTableViewBtn.classList.toggle('active', isTableView);
    }
    if (headerSearch) {
        headerSearch.classList.remove('hidden');
    }
    if (bookmarkToolbarResetBtn) {
        bookmarkToolbarResetBtn.classList.remove('hidden');
    }
    if (bookmarkToolbarColumnManager) {
        bookmarkToolbarColumnManager.classList.remove('hidden');
    }
    if (bookmarkToolbarPerPageWrap) {
        bookmarkToolbarPerPageWrap.classList.remove('hidden');
    }
    if (bookmarkToolbarPerPage) {
        bookmarkToolbarPerPage.value = String(
            isTableView && bookmarkTableApi ? bookmarkTableApi.getPerPage() : cardViewLimit
        );
    }
    if (bookmarkToolbarColumnsPanel && !bookmarkToolbarColumnsPanel.classList.contains('hidden')) {
        renderBookmarkToolbarColumnsPanel();
    }
    if (bookmarksContainer) {
        bookmarksContainer.classList.toggle('hidden', isTableView);
    }
    if (bookmarkTableMount) {
        bookmarkTableMount.classList.toggle('hidden', !isTableView);
    }

    updateBookmarksHeroMeta();
    updateDashboardContext();
}

function applyPageState() {
    const showBookmarks = isBookmarksPageActive();
    const showNotes = isNotesPageActive();
    const showCalculators = isCalculatorsPageActive();
    const showAiWriter = isAiWriterPageActive();

    if (bookmarksPage) {
        bookmarksPage.classList.toggle('hidden', !showBookmarks);
    }
    if (notesPage) {
        notesPage.classList.toggle('hidden', !showNotes);
    }
    if (calculatorsPage) {
        calculatorsPage.classList.toggle('hidden', !showCalculators);
    }
    if (aiWriterPage) {
        aiWriterPage.classList.toggle('hidden', !showAiWriter);
    }

    if (appContainer) {
        appContainer.classList.toggle('notes-active', showNotes);
        appContainer.classList.toggle('calculators-active', showCalculators);
        appContainer.classList.toggle('ai-writer-active', showAiWriter);
    }

    if (!showNotes && aiRewriteBtn) {
        aiRewriteBtn.classList.add('hidden');
        currentAiTextarea = null;
    }

    if (showNotes) {
        void loadNotes();
    } else if (showCalculators) {
        initCalculators();
    } else if (showAiWriter) {
        hydrateAiWriterCards();
    } else {
        updateBookmarkViewControls();
    }

    updateDashboardContext();
}

function updateDashboardContext() {
    if (bookmarksNavBtn) {
        bookmarksNavBtn.classList.toggle('active', isBookmarksPageActive());
    }
    if (notesToggleBtn) {
        notesToggleBtn.classList.toggle('active', isNotesPageActive());
    }
    if (calculatorsToggleBtn) {
        calculatorsToggleBtn.classList.toggle('active', isCalculatorsPageActive());
    }
    if (aiWriterToggleBtn) {
        aiWriterToggleBtn.classList.toggle('active', isAiWriterPageActive());
    }
}

function applySidebarState() {
    if (appContainer) {
        appContainer.classList.toggle('sidebar-collapsed', isSidebarCollapsed);
    }

    if (sidebarToggleBtn) {
        const label = isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
        sidebarToggleBtn.setAttribute('aria-label', label);
        sidebarToggleBtn.title = label;
    }

    if (sidebarToggleIcon) {
        sidebarToggleIcon.textContent = isSidebarCollapsed ? '→' : '←';
    }
}

function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
    applySidebarState();
    void saveUiState();
}

function setActivePage(page) {
    if (!VALID_PAGES.has(page) || activePage === page) return;

    if (page !== 'bookmarks' && isFormVisible) {
        closeBookmarkForm();
    }

    activePage = page;
    applyPageState();
    if (page === 'ai-writer') {
        requestAnimationFrame(() => focusAiWriterWorkspace());
    }
    void saveUiState();
}

/**
 * Switch between bookmark card and table views.
 */
function switchBookmarkView(view) {
    if (view !== 'cards' && view !== 'table') return;
    if (!isBookmarksPageActive()) return;

    currentBookmarkView = view;
    renderBookmarks(allBookmarks);

    const currentQuery = searchInput?.value.trim() || '';
    if (view === 'table' && bookmarkTableApi) {
        bookmarkTableApi.setSearchTerm(currentQuery);
    } else if (currentQuery) {
        void handleSearch(currentQuery);
    } else {
        updateCount(
            view === 'cards' ? Math.min(allBookmarks.length, cardViewLimit) : allBookmarks.length,
            allBookmarks.length
        );
    }

    void saveUiState();
}

/**
 * Render bookmarks in the active view while keeping both representations in sync.
 */
function renderBookmarks(bookmarks) {
    renderBookmarkCards(bookmarks);
    renderBookmarkTable(bookmarks);
    updateBookmarkViewControls();
}

function getCardColumnState() {
    return [
        { key: 'favicon', label: 'Icon', checked: !hiddenCardFields.has('favicon') },
        { key: 'url', label: 'Domain', checked: !hiddenCardFields.has('url') },
        { key: 'description', label: 'Description', checked: !hiddenCardFields.has('description') },
        { key: 'createdAt', label: 'Added', checked: !hiddenCardFields.has('createdAt') }
    ];
}

function renderBookmarkToolbarColumnsPanel() {
    if (!bookmarkToolbarColumnsPanel) return;

    const isTableView = currentBookmarkView === 'table';
    const options = isTableView && bookmarkTableApi
        ? bookmarkTableApi.getColumnState()
        : getCardColumnState();

    bookmarkToolbarColumnsPanel.innerHTML = '';

    const title = document.createElement('div');
    title.className = 'bookmark-table-col-title';
    title.textContent = isTableView ? 'Manage Columns' : 'Manage Card Fields';
    bookmarkToolbarColumnsPanel.appendChild(title);

    options.forEach((optionConfig) => {
        const option = document.createElement('label');
        option.className = 'bookmark-table-col-option';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = optionConfig.checked;
        checkbox.dataset.columnKey = optionConfig.key;

        const text = document.createElement('span');
        text.textContent = optionConfig.label;

        option.appendChild(checkbox);
        option.appendChild(text);
        bookmarkToolbarColumnsPanel.appendChild(option);
    });
}

function rerenderCurrentCardView() {
    const query = searchInput?.value.trim() || '';
    if (query) {
        void handleSearch(query);
        return;
    }

    renderBookmarks(allBookmarks);
    updateCount(Math.min(allBookmarks.length, cardViewLimit), allBookmarks.length);
}

function hasBookmarkSearchQuery() {
    return Boolean(searchInput?.value.trim());
}

function canReorderBookmarkCards() {
    return !hasBookmarkSearchQuery();
}

function reorderItemsByPlacement(items, draggedId, targetId, placeAfter) {
    const draggedIndex = items.findIndex((item) => item.id === draggedId);
    const targetIndex = items.findIndex((item) => item.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) {
        return [...items];
    }

    const nextItems = [...items];
    const [draggedItem] = nextItems.splice(draggedIndex, 1);
    const nextTargetIndex = nextItems.findIndex((item) => item.id === targetId);
    const insertIndex = placeAfter ? nextTargetIndex + 1 : nextTargetIndex;

    nextItems.splice(insertIndex, 0, draggedItem);
    return nextItems;
}

function haveSameBookmarkOrder(left, right) {
    if (left.length !== right.length) return false;
    return left.every((bookmark, index) => bookmark.id === right[index]?.id);
}

async function persistBookmarkOrder(nextBookmarks) {
    const previousBookmarks = [...allBookmarks];
    allBookmarks = [...nextBookmarks];

    try {
        await bookmarkDB.reorderBookmarks(allBookmarks.map((bookmark) => bookmark.id));
    } catch (error) {
        allBookmarks = previousBookmarks;
        throw error;
    }
}

/**
 * Render bookmarks to the card UI (XSS-safe with Neumorphic design)
 */
function renderBookmarkCards(bookmarks) {
    if (!bookmarksContainer) return;
    const canReorder = canReorderBookmarkCards();

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
    
    const visibleBookmarks = bookmarks.slice(0, cardViewLimit);

    // Render each bookmark (XSS-safe using textContent)
    visibleBookmarks.forEach((bookmark, index) => {
        const card = document.createElement('div');
        card.className = 'bookmark-card';
        card.dataset.bookmarkId = String(bookmark.id);
        card.style.animationDelay = `${index * 0.05}s`;
        const safeUrl = parseSafeBookmarkUrl(bookmark.url);
        
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
        const link = createBookmarkTitleElement(bookmark, safeUrl);
        
        // URL display
        const urlDisplay = document.createElement('div');
        urlDisplay.className = 'bookmark-url';
        urlDisplay.textContent = safeUrl ? safeUrl.hostname : 'Blocked unsafe URL';
        
        info.appendChild(link);
        if (!hiddenCardFields.has('url')) {
            info.appendChild(urlDisplay);
        }
        
        // Show description if available
        if (bookmark.description && !hiddenCardFields.has('description')) {
            const descDisplay = document.createElement('div');
            descDisplay.className = 'bookmark-desc';
            descDisplay.textContent = bookmark.description;
            info.appendChild(descDisplay);
        }

        if (!hiddenCardFields.has('createdAt')) {
            const addedDisplay = document.createElement('div');
            addedDisplay.className = 'bookmark-added';
            addedDisplay.textContent = `Added ${formatBookmarkTableDate(bookmark.createdAt).primary}`;
            info.appendChild(addedDisplay);
        }
        
        // Delete button (Neumorphic circle)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.dataset.id = bookmark.id; // Use unique ID, not array index!
        deleteBtn.textContent = '✕';
        deleteBtn.title = 'Delete bookmark';

        const controls = document.createElement('div');
        controls.className = 'bookmark-card-controls';

        const dragHandle = document.createElement('button');
        dragHandle.type = 'button';
        dragHandle.className = `bookmark-drag-handle${canReorder ? '' : ' disabled'}`;
        dragHandle.dataset.bookmarkId = String(bookmark.id);
        dragHandle.title = canReorder
            ? 'Drag to reorder'
            : 'Drag to reorder is available only when search is cleared';
        dragHandle.setAttribute('aria-label', dragHandle.title);
        dragHandle.textContent = '⋮⋮';

        dragHandle.addEventListener('mousedown', () => {
            if (canReorder) {
                card.setAttribute('draggable', 'true');
            }
        });
        dragHandle.addEventListener('mouseup', () => card.removeAttribute('draggable'));
        dragHandle.addEventListener('mouseleave', () => card.removeAttribute('draggable'));

        card.addEventListener('dragstart', (event) => {
            if (!canReorder) {
                event.preventDefault();
                return;
            }

            draggedBookmarkId = bookmark.id;
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', String(bookmark.id));
            setTimeout(() => card.classList.add('dragging'), 0);
        });

        card.addEventListener('dragend', () => {
            draggedBookmarkId = null;
            card.classList.remove('dragging');
            card.removeAttribute('draggable');
            document.querySelectorAll('.bookmark-card').forEach((bookmarkCard) => {
                bookmarkCard.classList.remove('drag-over-before', 'drag-over-after');
            });
        });

        card.addEventListener('dragover', (event) => {
            if (!canReorder || !draggedBookmarkId || draggedBookmarkId === bookmark.id) return;

            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';

            const rect = card.getBoundingClientRect();
            const placeAfter = (event.clientY - rect.top) >= (rect.height / 2);
            card.classList.remove('drag-over-before', 'drag-over-after');
            card.classList.add(placeAfter ? 'drag-over-after' : 'drag-over-before');
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over-before', 'drag-over-after');
        });

        card.addEventListener('drop', async (event) => {
            if (!canReorder || !draggedBookmarkId || draggedBookmarkId === bookmark.id) return;

            event.preventDefault();
            card.classList.remove('drag-over-before', 'drag-over-after');

            const rect = card.getBoundingClientRect();
            const placeAfter = (event.clientY - rect.top) >= (rect.height / 2);
            const reorderedVisibleBookmarks = reorderItemsByPlacement(
                visibleBookmarks,
                draggedBookmarkId,
                bookmark.id,
                placeAfter,
            );

            if (haveSameBookmarkOrder(reorderedVisibleBookmarks, visibleBookmarks)) {
                return;
            }

            const nextBookmarks = [...allBookmarks];
            nextBookmarks.splice(0, reorderedVisibleBookmarks.length, ...reorderedVisibleBookmarks);
            const previousBookmarks = [...allBookmarks];

            allBookmarks = nextBookmarks;
            renderBookmarks(allBookmarks);
            updateCount(Math.min(allBookmarks.length, cardViewLimit), allBookmarks.length);

            try {
                await bookmarkDB.reorderBookmarks(allBookmarks.map((item) => item.id));
            } catch (error) {
                console.error('Failed to reorder bookmarks:', error);
                allBookmarks = previousBookmarks;
                renderBookmarks(allBookmarks);
                updateCount(Math.min(allBookmarks.length, cardViewLimit), allBookmarks.length);
                showToast('Failed to reorder bookmarks', 'error');
            }
        });

        controls.appendChild(deleteBtn);

        // Assemble card
        card.appendChild(dragHandle);
        if (!hiddenCardFields.has('favicon')) {
            card.appendChild(faviconWrapper);
        }
        card.appendChild(info);
        card.appendChild(controls);
        
        bookmarksContainer.appendChild(card);
    });
}

/**
 * Open a bookmark in a new tab if it uses a safe URL scheme.
 */
function openBookmarkUrl(rawUrl) {
    const safeUrl = parseSafeBookmarkUrl(rawUrl);
    if (!safeUrl) {
        showToast('Blocked unsafe URL', 'error');
        return;
    }

    window.open(safeUrl.toString(), '_blank', 'noopener,noreferrer');
}

function formatBookmarkTableDate(isoString) {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
        return { primary: 'Unknown', secondary: '' };
    }

    return {
        primary: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }),
        secondary: date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        })
    };
}

function getBookmarkTableColumns() {
    return [
        {
            key: BOOKMARK_TABLE_REORDER_KEY,
            label: '',
            manageable: false,
            resizable: false,
            getSearchValue: () => '',
            renderCell: (cell, bookmark) => {
                cell.classList.add('bookmark-table-reorder-cell');

                const handle = document.createElement('button');
                handle.type = 'button';
                handle.className = 'bookmark-table-drag-handle';
                handle.dataset.bookmarkId = String(bookmark.id);
                handle.title = 'Drag to reorder';
                handle.setAttribute('aria-label', 'Drag to reorder');
                handle.textContent = '⋮⋮';

                cell.appendChild(handle);
            }
        },
        {
            key: 'title',
            label: 'Title',
            sortable: true,
            getSortValue: (bookmark) => (bookmark.title || '').toLowerCase(),
            getSearchValue: (bookmark) => `${bookmark.title || ''} ${bookmark.description || ''}`,
            renderCell: (cell, bookmark) => {
                const safeUrl = parseSafeBookmarkUrl(bookmark.url);
                const titleElement = createBookmarkTitleElement(bookmark, safeUrl);
                titleElement.classList.add('bookmark-table-title-link');

                const main = document.createElement('div');
                main.className = 'bookmark-table-cell-main';
                main.appendChild(titleElement);

                cell.appendChild(main);
            }
        },
        {
            key: 'url',
            label: 'Domain / URL',
            sortable: true,
            getSortValue: (bookmark) => {
                const safeUrl = parseSafeBookmarkUrl(bookmark.url);
                return (safeUrl?.hostname || bookmark.url || '').toLowerCase();
            },
            getSearchValue: (bookmark) => bookmark.url || '',
            renderCell: (cell, bookmark) => {
                const safeUrl = parseSafeBookmarkUrl(bookmark.url);
                const main = document.createElement('div');
                main.className = 'bookmark-table-cell-main';
                main.textContent = safeUrl ? safeUrl.hostname : 'Blocked unsafe URL';

                const sub = document.createElement('div');
                sub.className = 'bookmark-table-cell-sub';
                sub.textContent = bookmark.url || 'Unavailable';

                cell.appendChild(main);
                cell.appendChild(sub);
            }
        },
        {
            key: 'description',
            label: 'Description',
            getSortValue: (bookmark) => (bookmark.description || '').toLowerCase(),
            getSearchValue: (bookmark) => bookmark.description || '',
            renderCell: (cell, bookmark) => {
                const description = document.createElement('div');
                description.className = 'bookmark-table-desc';
                description.textContent = bookmark.description || 'No description';
                cell.appendChild(description);
            }
        },
        {
            key: 'createdAt',
            label: 'Added',
            sortable: true,
            getSortValue: (bookmark) => bookmark.createdAt || '',
            getSearchValue: (bookmark) => bookmark.createdAt || '',
            renderCell: (cell, bookmark) => {
                const { primary, secondary } = formatBookmarkTableDate(bookmark.createdAt);
                const main = document.createElement('div');
                main.className = 'bookmark-table-cell-main';
                main.textContent = primary;

                const sub = document.createElement('div');
                sub.className = 'bookmark-table-cell-sub';
                sub.textContent = secondary;

                cell.appendChild(main);
                if (secondary) {
                    cell.appendChild(sub);
                }
            }
        }
    ];
}

/**
 * Render bookmarks in table view using an extension-local data table implementation.
 */
function renderBookmarkTable(bookmarks) {
    if (!bookmarkTableMount) return;

    if (!bookmarkTableApi) {
        if (currentBookmarkView !== 'table') {
            return;
        }

        bookmarkTableApi = createBookmarkTable(bookmarkTableMount, {
            columns: getBookmarkTableColumns(),
            actions: [
                { key: 'open', label: '↗ Open' },
                { key: 'edit', label: '✎ Edit' },
                { divider: true },
                { key: 'delete', label: '✕ Delete', danger: true }
            ],
            defaultPerPage: 10,
            perPageOptions: [5, 10, 25, 50],
            onAction: async (action, bookmark) => {
                if (action === 'open') {
                    openBookmarkUrl(bookmark.url);
                    return;
                }

                if (action === 'edit') {
                    startBookmarkEdit(bookmark);
                    return;
                }

                if (action === 'delete') {
                    await deleteBookmark(bookmark.id);
                }
            },
            onReorder: async (nextBookmarks) => {
                await persistBookmarkOrder(nextBookmarks);
            }
        });
    }

    bookmarkTableApi.setData(bookmarks);
}

/**
 * Create a bookmark-specific data table with local behavior only.
 */
function createBookmarkTable(container, config) {
    const columns = config.columns || [];
    const actions = config.actions || [];
    const onAction = config.onAction || (() => {});
    const onReorder = config.onReorder || (async () => {});
    const perPageOptions = config.perPageOptions || [5, 10, 25, 50];
    const defaultPerPage = config.defaultPerPage || 10;

    let allData = [];
    let filteredData = [];
    let searchTerm = '';
    let currentPage = 1;
    let perPage = defaultPerPage;
    let sortKey = '';
    let sortDirection = 'asc';
    let draggedRowId = null;
    const hiddenColumns = new Set();
    const columnWidths = new Map();

    const wrapper = document.createElement('div');
    wrapper.className = 'bookmark-table-shell';

    const tableWrap = document.createElement('div');
    tableWrap.className = 'bookmark-table-wrap';

    const table = document.createElement('table');
    table.className = 'bookmark-table-grid';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);

    const footer = document.createElement('div');
    footer.className = 'bookmark-table-footer';

    const info = document.createElement('div');
    info.className = 'bookmark-table-info';

    const pages = document.createElement('div');
    pages.className = 'bookmark-table-pages';

    footer.appendChild(info);
    footer.appendChild(pages);

    wrapper.appendChild(tableWrap);
    wrapper.appendChild(footer);

    container.innerHTML = '';
    container.appendChild(wrapper);

    function normalizeValue(value) {
        if (value == null) return '';
        if (typeof value === 'string' || typeof value === 'number') return String(value);
        if (Array.isArray(value)) return value.map(normalizeValue).join(' ');
        if (typeof value === 'object') return Object.values(value).map(normalizeValue).join(' ');
        return String(value);
    }

    function getVisibleColumns() {
        const visible = columns.filter((column) => !hiddenColumns.has(column.key));
        return visible.length > 0 ? visible : [columns[0]].filter(Boolean);
    }

    function allHeaderCells() {
        return Array.from(thead.querySelectorAll('th'));
    }

    function getSearchableText(bookmark) {
        return columns
            .map((column) => {
                if (typeof column.getSearchValue === 'function') {
                    return normalizeValue(column.getSearchValue(bookmark));
                }
                return normalizeValue(bookmark[column.key]);
            })
            .join(' ')
            .toLowerCase();
    }

    function compareValues(left, right) {
        const normalizedLeft = normalizeValue(left).toLowerCase();
        const normalizedRight = normalizeValue(right).toLowerCase();

        if (normalizedLeft < normalizedRight) return -1;
        if (normalizedLeft > normalizedRight) return 1;
        return 0;
    }

    function canReorderRows() {
        return !searchTerm && !sortKey;
    }

    function sortData(rows) {
        if (!sortKey) return rows;
        const column = columns.find((item) => item.key === sortKey);
        if (!column) return rows;

        rows.sort((left, right) => {
            const leftValue = typeof column.getSortValue === 'function' ? column.getSortValue(left) : left[column.key];
            const rightValue = typeof column.getSortValue === 'function' ? column.getSortValue(right) : right[column.key];
            const comparison = compareValues(leftValue, rightValue);
            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return rows;
    }

    function closeActionMenus() {
        wrapper.querySelectorAll('.bookmark-table-action-menu').forEach((menu) => {
            menu.classList.add('hidden');
        });
    }

    function renderHeader() {
        const visibleColumns = getVisibleColumns();
        thead.innerHTML = '';

        const row = document.createElement('tr');
        visibleColumns.forEach((column) => {
            const cell = document.createElement('th');
            cell.dataset.columnKey = column.key;
            if (column.key === BOOKMARK_TABLE_REORDER_KEY) {
                cell.classList.add('bookmark-table-reorder-header');
            }
            const storedWidth = columnWidths.get(column.key);
            if (storedWidth) {
                cell.style.width = `${storedWidth}px`;
            }
            if (column.sortable) {
                const sortBtn = document.createElement('button');
                sortBtn.type = 'button';
                sortBtn.className = 'bookmark-table-sort-btn';
                sortBtn.dataset.sortKey = column.key;
                if (sortKey === column.key) {
                    sortBtn.dataset.sort = sortDirection;
                }

                const label = document.createElement('span');
                label.textContent = column.label;

                const icon = document.createElement('span');
                icon.className = 'bookmark-table-sort-icon';
                icon.textContent = sortDirection === 'desc' && sortKey === column.key ? '▼' : '▲';

                sortBtn.appendChild(label);
                sortBtn.appendChild(icon);
                cell.appendChild(sortBtn);
            } else {
                cell.textContent = column.label;
            }
            row.appendChild(cell);
        });

        if (actions.length > 0) {
            const actionsHeader = document.createElement('th');
            actionsHeader.textContent = 'Actions';
            row.appendChild(actionsHeader);
        }

        thead.appendChild(row);
        attachResizeHandles();
    }

    function attachResizeHandles() {
        allHeaderCells().forEach((headerCell) => {
            const column = columns.find((item) => item.key === headerCell.dataset.columnKey);
            if (
                !headerCell.dataset.columnKey ||
                !column ||
                column.resizable === false ||
                headerCell.querySelector('.bookmark-table-resize-handle')
            ) {
                return;
            }

            const handle = document.createElement('div');
            handle.className = 'bookmark-table-resize-handle';
            headerCell.appendChild(handle);

            let startX = 0;
            let startWidth = 0;

            handle.addEventListener('mousedown', (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (!table.classList.contains('bookmark-table-grid-resizable')) {
                    allHeaderCells().forEach((cell) => {
                        const width = cell.offsetWidth;
                        cell.style.width = `${width}px`;
                        if (cell.dataset.columnKey) {
                            columnWidths.set(cell.dataset.columnKey, width);
                        }
                    });
                    table.classList.add('bookmark-table-grid-resizable');
                }

                startX = event.pageX;
                startWidth = headerCell.offsetWidth;
                handle.classList.add('active');
                document.body.classList.add('bookmark-table-resizing');

                const onMove = (moveEvent) => {
                    const nextWidth = Math.max(90, startWidth + (moveEvent.pageX - startX));
                    headerCell.style.width = `${nextWidth}px`;
                    columnWidths.set(headerCell.dataset.columnKey, nextWidth);
                };

                const onUp = () => {
                    handle.classList.remove('active');
                    document.body.classList.remove('bookmark-table-resizing');
                    document.removeEventListener('mousemove', onMove);
                    document.removeEventListener('mouseup', onUp);
                };

                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onUp);
            });
        });
    }

    function renderBody() {
        const visibleColumns = getVisibleColumns();
        const totalRows = filteredData.length;
        const totalPages = totalRows === 0 ? 1 : Math.ceil(totalRows / perPage);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const startIndex = (currentPage - 1) * perPage;
        const pageRows = filteredData.slice(startIndex, startIndex + perPage);

        tbody.innerHTML = '';
        if (pageRows.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.className = 'bookmark-table-empty-row';

            const emptyCell = document.createElement('td');
            emptyCell.colSpan = visibleColumns.length + (actions.length > 0 ? 1 : 0);
            emptyCell.textContent = totalRows === 0 ? 'No bookmarks to show.' : 'No bookmarks match the current table search.';

            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
            return;
        }

        pageRows.forEach((bookmark) => {
            const row = document.createElement('tr');
            row.dataset.rowId = String(bookmark.id);

            visibleColumns.forEach((column) => {
                const cell = document.createElement('td');
                column.renderCell(cell, bookmark);
                row.appendChild(cell);
            });

            if (actions.length > 0) {
                const actionCell = document.createElement('td');
                actionCell.className = 'bookmark-table-action-cell';

                const actionBtn = document.createElement('button');
                actionBtn.type = 'button';
                actionBtn.className = 'bookmark-table-action-trigger';
                actionBtn.dataset.actionToggle = String(bookmark.id);
                actionBtn.textContent = '⋮';

                const actionMenu = document.createElement('div');
                actionMenu.className = 'bookmark-table-action-menu hidden';

                actions.forEach((action) => {
                    if (action.divider) {
                        const divider = document.createElement('div');
                        divider.className = 'bookmark-table-action-divider';
                        actionMenu.appendChild(divider);
                        return;
                    }

                    const item = document.createElement('button');
                    item.type = 'button';
                    item.className = `bookmark-table-action-item${action.danger ? ' danger' : ''}`;
                    item.dataset.actionKey = action.key;
                    item.dataset.rowId = String(bookmark.id);
                    item.textContent = action.label;
                    actionMenu.appendChild(item);
                });

                actionCell.appendChild(actionBtn);
                actionCell.appendChild(actionMenu);
                row.appendChild(actionCell);
            }

            const dragHandle = row.querySelector('.bookmark-table-drag-handle');
            if (dragHandle) {
                const reorderEnabled = canReorderRows();
                dragHandle.classList.toggle('disabled', !reorderEnabled);
                dragHandle.title = reorderEnabled
                    ? 'Drag to reorder'
                    : 'Clear search and table sorting to reorder';
                dragHandle.setAttribute('aria-label', dragHandle.title);

                dragHandle.addEventListener('mousedown', () => {
                    if (reorderEnabled) {
                        row.setAttribute('draggable', 'true');
                    }
                });
                dragHandle.addEventListener('mouseup', () => row.removeAttribute('draggable'));
                dragHandle.addEventListener('mouseleave', () => row.removeAttribute('draggable'));
            }

            row.addEventListener('dragstart', (event) => {
                if (!canReorderRows()) {
                    event.preventDefault();
                    return;
                }

                draggedRowId = bookmark.id;
                draggedBookmarkId = bookmark.id;
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', String(bookmark.id));
                setTimeout(() => row.classList.add('dragging'), 0);
            });

            row.addEventListener('dragend', () => {
                draggedRowId = null;
                draggedBookmarkId = null;
                row.classList.remove('dragging');
                row.removeAttribute('draggable');
                tbody.querySelectorAll('tr').forEach((tableRow) => {
                    tableRow.classList.remove('drag-over-before', 'drag-over-after');
                });
            });

            row.addEventListener('dragover', (event) => {
                if (!canReorderRows() || !draggedRowId || draggedRowId === bookmark.id) return;

                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';

                const rect = row.getBoundingClientRect();
                const placeAfter = (event.clientY - rect.top) >= (rect.height / 2);
                row.classList.remove('drag-over-before', 'drag-over-after');
                row.classList.add(placeAfter ? 'drag-over-after' : 'drag-over-before');
            });

            row.addEventListener('dragleave', () => {
                row.classList.remove('drag-over-before', 'drag-over-after');
            });

            row.addEventListener('drop', async (event) => {
                if (!canReorderRows() || !draggedRowId || draggedRowId === bookmark.id) return;

                event.preventDefault();
                row.classList.remove('drag-over-before', 'drag-over-after');

                const rect = row.getBoundingClientRect();
                const placeAfter = (event.clientY - rect.top) >= (rect.height / 2);
                const startIndex = (currentPage - 1) * perPage;
                const visiblePageRows = allData.slice(startIndex, startIndex + perPage);
                const reorderedPageRows = reorderItemsByPlacement(
                    visiblePageRows,
                    draggedRowId,
                    bookmark.id,
                    placeAfter,
                );

                if (haveSameBookmarkOrder(reorderedPageRows, visiblePageRows)) {
                    return;
                }

                const previousData = [...allData];
                allData.splice(startIndex, visiblePageRows.length, ...reorderedPageRows);
                filteredData = [...allData];
                render();

                try {
                    await onReorder([...allData]);
                } catch (error) {
                    console.error('Failed to reorder bookmarks:', error);
                    allData = previousData;
                    filteredData = [...allData];
                    render();
                    showToast('Failed to reorder bookmarks', 'error');
                }
            });

            tbody.appendChild(row);
        });
    }

    function renderFooter() {
        const totalRows = filteredData.length;
        const totalPages = totalRows === 0 ? 1 : Math.ceil(totalRows / perPage);
        const from = totalRows === 0 ? 0 : (currentPage - 1) * perPage + 1;
        const to = totalRows === 0 ? 0 : Math.min(currentPage * perPage, totalRows);

        info.textContent = `Showing ${from}-${to} of ${totalRows} bookmarks`;
        pages.innerHTML = '';

        if (totalPages <= 1) return;

        const pageButtons = ['prev'];
        for (let page = 1; page <= totalPages; page += 1) {
            pageButtons.push(page);
        }
        pageButtons.push('next');

        pageButtons.forEach((page) => {
            if (typeof page === 'number') {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = `bookmark-table-page-btn${page === currentPage ? ' active' : ''}`;
                button.dataset.page = String(page);
                button.textContent = String(page);
                pages.appendChild(button);
                return;
            }

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'bookmark-table-page-btn';
            button.dataset.page = page;
            button.disabled = page === 'prev' ? currentPage === 1 : currentPage === totalPages;
            button.textContent = page === 'prev' ? '‹' : '›';
            pages.appendChild(button);
        });
    }

    function render() {
        wrapper.classList.toggle('bookmark-table-reorder-disabled', !canReorderRows());
        renderHeader();
        renderBody();
        renderFooter();
        closeActionMenus();

        if (bookmarkToolbarPerPage) {
            bookmarkToolbarPerPage.value = String(perPage);
        }
        if (currentBookmarkView === 'table') {
            renderBookmarkToolbarColumnsPanel();
            updateCount(filteredData.length, allData.length);
        }
    }

    function applyFilters() {
        const rows = [...allData];
        filteredData = rows.filter((bookmark) => getSearchableText(bookmark).includes(searchTerm));
        sortData(filteredData);
        render();
    }

    function applySearchTerm(nextSearchTerm) {
        searchTerm = nextSearchTerm.trim().toLowerCase();
        currentPage = 1;
        applyFilters();
    }

    function reset(options = {}) {
        const preserveSearchInput = Boolean(options.preserveSearchInput);
        searchTerm = '';
        sortKey = '';
        sortDirection = 'asc';
        currentPage = 1;
        hiddenColumns.clear();
        perPage = defaultPerPage;
        if (!preserveSearchInput && searchInput) {
            searchInput.value = '';
        }
        applyFilters();
    }

    thead.addEventListener('click', (event) => {
        const sortBtn = event.target.closest('.bookmark-table-sort-btn');
        if (!sortBtn) return;

        const nextSortKey = sortBtn.dataset.sortKey;
        if (sortKey === nextSortKey) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey = nextSortKey;
            sortDirection = 'asc';
        }

        applyFilters();
    });

    wrapper.addEventListener('click', async (event) => {
        const actionToggle = event.target.closest('[data-action-toggle]');
        if (actionToggle) {
            event.stopPropagation();
            const menu = actionToggle.nextElementSibling;
            const shouldOpen = menu?.classList.contains('hidden');
            closeActionMenus();
            if (menu && shouldOpen) {
                menu.classList.remove('hidden');
            }
            return;
        }

        const actionItem = event.target.closest('[data-action-key][data-row-id]');
        if (actionItem) {
            const actionKey = actionItem.dataset.actionKey;
            const rowId = parseInt(actionItem.dataset.rowId, 10);
            const bookmark = allData.find((row) => row.id === rowId);
            closeActionMenus();

            if (bookmark && actionKey) {
                await onAction(actionKey, bookmark);
            }
            return;
        }

        const pageBtn = event.target.closest('[data-page]');
        if (pageBtn) {
            const page = pageBtn.dataset.page;
            const totalPages = filteredData.length === 0 ? 1 : Math.ceil(filteredData.length / perPage);
            if (page === 'prev' && currentPage > 1) {
                currentPage -= 1;
            } else if (page === 'next' && currentPage < totalPages) {
                currentPage += 1;
            } else if (page !== 'prev' && page !== 'next') {
                currentPage = parseInt(page, 10);
            }

            render();
        }
    });

    document.addEventListener('click', (event) => {
        if (!wrapper.contains(event.target)) {
            closeActionMenus();
        }
    });

    return {
        setData(newData) {
            allData = Array.isArray(newData) ? [...newData] : [];
            filteredData = [...allData];
            reset({ preserveSearchInput: true });
            if (searchInput?.value.trim()) {
                applySearchTerm(searchInput.value.trim());
                return;
            }
            if (currentBookmarkView === 'table') {
                updateCount(allData.length);
            }
        },
        refresh() {
            applyFilters();
        },
        focusSearch() {
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        },
        getFilteredData() {
            return [...filteredData];
        },
        reset,
        setSearchTerm(query) {
            applySearchTerm(query);
        },
        setPerPage(nextPerPage) {
            perPage = nextPerPage;
            currentPage = 1;
            render();
        },
        getPerPage() {
            return perPage;
        },
        getColumnState() {
            return columns
                .filter((column) => column.manageable !== false)
                .map((column) => ({
                key: column.key,
                label: column.label,
                checked: !hiddenColumns.has(column.key)
                }));
        },
        setColumnVisibility(columnKey, isVisible) {
            if (!columnKey) return;
            const targetColumn = columns.find((column) => column.key === columnKey);
            if (!targetColumn || targetColumn.manageable === false) return;

            if (isVisible) {
                hiddenColumns.delete(columnKey);
            } else {
                const checkedCount = columns.filter(
                    (column) => column.manageable !== false && !hiddenColumns.has(column.key),
                ).length;
                if (checkedCount <= 1) {
                    return;
                }
                hiddenColumns.add(columnKey);
            }

            render();
        }
    };
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
    if (currentBookmarkView === 'table') {
        if (!bookmarkTableApi) {
            renderBookmarkTable(allBookmarks);
        }
        if (bookmarkTableApi) {
            bookmarkTableApi.setSearchTerm(query);
        }
        return;
    }

    if (!query) {
        renderBookmarks(allBookmarks);
        updateCount(Math.min(allBookmarks.length, cardViewLimit), allBookmarks.length);
        return;
    }
    
    try {
        const filtered = await bookmarkDB.searchBookmarks(query);
        renderBookmarks(filtered);
        updateCount(Math.min(filtered.length, cardViewLimit), filtered.length);
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

    if (bookmarksHeroCount) {
        bookmarksHeroCount.textContent = total ?? count;
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

    // --- Secondary time display ---
    if (secondaryTimeText && settings.showSecondaryDateTime) {
        const now2 = new Date();
        let h2, m2;

        if (settings.secondaryTimezone === 'local') {
            h2 = now2.getHours();
            m2 = now2.getMinutes();
        } else {
            try {
                const fmt2 = new Intl.DateTimeFormat('en-US', {
                    timeZone: settings.secondaryTimezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                });
                const parts2 = fmt2.formatToParts(now2);
                h2 = parseInt(parts2.find(p => p.type === 'hour')?.value || '0');
                m2 = parseInt(parts2.find(p => p.type === 'minute')?.value || '0');
            } catch (_) {
                h2 = now2.getHours();
                m2 = now2.getMinutes();
            }
        }

        const ampm2 = h2 >= 12 ? 'PM' : 'AM';
        const dh2 = h2 % 12 || 12;
        const tzShort = settings.secondaryTimezone === 'local'
            ? 'Local'
            : settings.secondaryTimezone.split('/').pop().replace('_', ' ');
        secondaryTimeText.textContent = `${dh2}:${m2.toString().padStart(2, '0')} ${ampm2} · ${tzShort}`;

        if (secondaryTimeIcon) {
            const clockIcons2 = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'];
            secondaryTimeIcon.textContent = clockIcons2[h2 % 12];
        }

        if (secondaryDateTimeDisplay) {
            secondaryDateTimeDisplay.title = `Secondary time (${tzShort})`;
        }
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
 * Load settings from extension storage
 */
async function loadSettings() {
    const storageArea = getStorageArea();
    let saved = null;
    let migratedFromLocalStorage = false;
    let migrationSaved = false;

    if (storageArea) {
        try {
            const storedValues = await storageArea.get(SETTINGS_STORAGE_KEY);
            saved = storedValues?.[SETTINGS_STORAGE_KEY] ?? null;
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }

    if (!saved) {
        const legacySaved = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (legacySaved) {
            saved = legacySaved;
            migratedFromLocalStorage = Boolean(storageArea);
        }
    }

    if (saved) {
        try {
            const parsedSettings = typeof saved === 'string' ? JSON.parse(saved) : saved;
            settings = { ...settings, ...parsedSettings };
            settings.aiWriterCards = normalizeAiWriterCardsConfig(parsedSettings?.aiWriterCards, settings);

            if (shouldMigrateAiSystemPrompt(settings.ollamaSystemPrompt)) {
                settings.ollamaSystemPrompt = DEFAULT_AI_SYSTEM_PROMPT;
                migrationSaved = await saveSettings();
            } else if (migratedFromLocalStorage) {
                migrationSaved = await saveSettings();
            }
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    } else {
        settings.aiWriterCards = normalizeAiWriterCardsConfig(null, settings);
    }

    if (migratedFromLocalStorage && migrationSaved) {
        localStorage.removeItem(SETTINGS_STORAGE_KEY);
    }
    
    // Apply settings to UI
    applySettings();
    
    // Update form controls to match
    if (showDateTimeCheckbox) showDateTimeCheckbox.checked = settings.showDateTime;
    if (showSecondaryDateTimeCheckbox) showSecondaryDateTimeCheckbox.checked = settings.showSecondaryDateTime;
    if (showNetworkCheckbox) showNetworkCheckbox.checked = settings.showNetwork;
    if (showMemoryCheckbox) showMemoryCheckbox.checked = settings.showMemory;
    if (timezoneSelect) timezoneSelect.value = settings.timezone;
    if (secondaryTimezoneSelect) secondaryTimezoneSelect.value = settings.secondaryTimezone;
    
    // Update weather controls
    if (weatherEnabledCheckbox) weatherEnabledCheckbox.checked = settings.weatherEnabled;
    if (weatherApiKeyInput) weatherApiKeyInput.value = settings.weatherApiKey;
    if (weatherCitySelect) weatherCitySelect.value = settings.weatherCity || '';
    if (tempUnitSelect) tempUnitSelect.value = settings.tempUnit;
    
    // Update AI Assistant controls
    if (ollamaEnabledCheckbox) ollamaEnabledCheckbox.checked = settings.ollamaEnabled;
    if (aiProviderSelect) aiProviderSelect.value = settings.aiProvider;
    if (ollamaUrlInput) ollamaUrlInput.value = settings.ollamaUrl;
    if (ollamaModelInput) ollamaModelInput.value = settings.ollamaModel;
    if (openRouterKeyInput) openRouterKeyInput.value = settings.openRouterKey;
    if (openRouterModelInput) openRouterModelInput.value = settings.openRouterModel;
    if (ollamaSystemPromptInput) ollamaSystemPromptInput.value = settings.ollamaSystemPrompt;
    hydrateAiWriterCards();
    
    // Toggle correct settings group visibility
    updateAiProviderVisibility();
    
    // Initialize weather if enabled
    if (settings.weatherEnabled && settings.weatherApiKey) {
        initWeather();
    }
}

/**
 * Save settings to extension storage
 */
async function saveSettings() {
    try {
        const storageArea = getStorageArea();
        if (storageArea) {
            await storageArea.set({ [SETTINGS_STORAGE_KEY]: settings });
            return true;
        }

        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
        return true;
    } catch (e) {
        console.error('Failed to save settings:', e);
        return false;
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

    // Show/hide secondary date time
    if (secondaryDateTimeDisplay) {
        secondaryDateTimeDisplay.style.display = settings.showSecondaryDateTime ? 'flex' : 'none';
    }
    // Show/hide the secondary timezone selector row in settings
    if (secondaryTimezoneRow) {
        secondaryTimezoneRow.style.display = settings.showSecondaryDateTime ? '' : 'none';
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
    settings.showSecondaryDateTime = showSecondaryDateTimeCheckbox?.checked ?? false;
    settings.showNetwork = showNetworkCheckbox?.checked ?? true;
    settings.showMemory = showMemoryCheckbox?.checked ?? false;
    settings.timezone = timezoneSelect?.value ?? 'local';
    settings.secondaryTimezone = secondaryTimezoneSelect?.value ?? 'UTC';
    
    settings.ollamaEnabled = ollamaEnabledCheckbox?.checked ?? false;
    settings.ollamaUrl = ollamaUrlInput?.value?.trim() || 'http://localhost:11434';
    settings.ollamaModel = ollamaModelInput?.value?.trim() || 'llama3';
    settings.openRouterKey = openRouterKeyInput?.value?.trim() || '';
    settings.openRouterModel = openRouterModelInput?.value?.trim() || 'google/gemini-2.5-flash';
    settings.ollamaSystemPrompt = ollamaSystemPromptInput?.value?.trim() || DEFAULT_AI_SYSTEM_PROMPT;
    
    saveSettings();
    applySettings();
    fetchWeather(); // Refetch weather if API key/city changed
}

/**
 * Handle AI Provider toggle
 */
function handleAiProviderChange() {
    if (aiProviderSelect) {
        settings.aiProvider = aiProviderSelect.value;
        saveSettings();
        updateAiProviderVisibility();
    }
}

/**
 * Update visibility of AI settings based on chosen provider
 */
function updateAiProviderVisibility() {
    if (!aiProviderSelect || !ollamaSettingsGroup || !openrouterSettingsGroup) return;
    
    if (aiProviderSelect.value === 'ollama') {
        ollamaSettingsGroup.style.display = 'block';
        openrouterSettingsGroup.style.display = 'none';
    } else {
        ollamaSettingsGroup.style.display = 'none';
        openrouterSettingsGroup.style.display = 'block';
    }
}

function switchSettingsTab(tab) {
    if (!tab) return;

    settingsTabs.forEach((button) => {
        const isActive = button.dataset.settingsTab === tab;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
    });

    settingsPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.settingsPanel === tab);
    });
}

/**
 * Open settings modal
 */
function openSettingsModal() {
    if (settingsModal) {
        switchSettingsTab('general');
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
    const response = await fetch('https://ipwho.is/');
    if (!response.ok) {
        throw new Error('IP location failed');
    }

    const data = await response.json();
    if (!data.success || typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
        throw new Error('IP location failed');
    }

    return {
        lat: data.latitude,
        lon: data.longitude,
        city: data.city,
        country: data.country
    };
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

const LEGACY_NOTES_STORAGE_KEY = 'bmNotes';
let notesSaveQueue = Promise.resolve();

function cloneNotesSnapshot(notes) {
    return (Array.isArray(notes) ? notes : []).map((note) => ({ ...note }));
}

function parseLegacyNotes(rawValue) {
    if (!rawValue) return [];

    try {
        const parsed = JSON.parse(rawValue);
        if (!Array.isArray(parsed)) return [];

        return parsed
            .filter((note) => note && typeof note === 'object' && note.id)
            .map((note) => ({
                ...note,
                id: String(note.id),
                title: note.title || '',
                content: note.content || '',
                createdAt: note.createdAt || new Date().toISOString(),
                updatedAt: note.updatedAt || note.createdAt || new Date().toISOString(),
            }));
    } catch (error) {
        console.error('Failed to parse legacy notes:', error);
        return [];
    }
}

/**
 * Load notes from IndexedDB, importing localStorage notes once if present.
 */
async function loadNotes() {
    try {
        const storedNotes = await bookmarkDB.getAllNotes();
        if (storedNotes.length > 0) {
            allNotes = storedNotes;
        } else {
            const legacyNotes = parseLegacyNotes(localStorage.getItem(LEGACY_NOTES_STORAGE_KEY));
            if (legacyNotes.length > 0) {
                await bookmarkDB.replaceAllNotes(legacyNotes);
                localStorage.removeItem(LEGACY_NOTES_STORAGE_KEY);
                allNotes = await bookmarkDB.getAllNotes();
            } else {
                allNotes = [];
            }
        }
    } catch (error) {
        console.error('Failed to load notes:', error);
        allNotes = [];
    }
    renderNotes(allNotes);
    updateNotesCount(allNotes.length);
}

/**
 * Save notes to IndexedDB in a serialized queue.
 */
function saveNotes(nextNotes = allNotes) {
    const snapshot = cloneNotesSnapshot(nextNotes);

    notesSaveQueue = notesSaveQueue
        .catch(() => {})
        .then(async () => {
            await bookmarkDB.replaceAllNotes(snapshot);
            localStorage.removeItem(LEGACY_NOTES_STORAGE_KEY);
        });

    return notesSaveQueue;
}

/**
 * Add a new empty note
 */
async function addNote() {
    const note = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        content: '',
        title: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    allNotes.unshift(note);
    try {
        await saveNotes();
    } catch (error) {
        console.error('Failed to create note:', error);
        allNotes.shift();
        showToast('Failed to create note', 'error');
        return;
    }
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
async function deleteNote(noteId) {
    const previousNotes = [...allNotes];
    allNotes = allNotes.filter(n => n.id !== noteId);
    try {
        await saveNotes();
    } catch (error) {
        console.error('Failed to delete note:', error);
        allNotes = previousNotes;
        showToast('Failed to delete note', 'error');
        return;
    }
    renderNotes(allNotes);
    updateNotesCount(allNotes.length);
    showToast('Note deleted', 'success');
}

/**
 * Handle clicks on notes container (event delegation for delete)
 */
async function handleNotesContainerClick(event) {
    const deleteBtn = event.target.closest('.note-delete-btn');
    if (deleteBtn) {
        const noteId = deleteBtn.dataset.noteId;
        if (noteId) {
            await deleteNote(noteId);
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
    

    if (noteSaveTimeouts[noteId]) {
        clearTimeout(noteSaveTimeouts[noteId]);
    }
    
    noteSaveTimeouts[noteId] = setTimeout(async () => {
        const note = allNotes.find(n => n.id === noteId);
        if (note) {
            note.content = textarea.value;
            note.updatedAt = new Date().toISOString();
            try {
                await saveNotes();
            } catch (error) {
                console.error('Failed to save note content:', error);
                if (indicator) {
                    indicator.textContent = 'Save failed';
                    indicator.className = 'note-save-indicator visible';
                }
                delete noteSaveTimeouts[noteId];
                return;
            }
            
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
        note.content.toLowerCase().includes(lowerQuery) ||
        (note.title || '').toLowerCase().includes(lowerQuery)
    );
    renderNotes(filtered);
    updateNotesCount(filtered.length, allNotes.length);
}

/**
 * Create a debounced ResizeObserver callback for a note card.
 * Persists the card's width/height to IndexedDB.
 */
function debounceResize(noteId, card) {
    let timeout = null;
    let initialCall = true; // Skip the initial observation trigger
    
    return function(entries) {
        // Skip the first call which fires when observe() is called
        if (initialCall) {
            initialCall = false;
            return;
        }
        
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            const entry = entries[0];
            if (!entry) return;
            
            const width = Math.round(entry.contentRect.width + 
                parseFloat(getComputedStyle(card).paddingLeft || 0) + 
                parseFloat(getComputedStyle(card).paddingRight || 0));
            const height = Math.round(card.offsetHeight);
            
            // Ignore if the card is hidden or dimensions are 0
            if (width === 0 || height === 0) return;
            
            const note = allNotes.find(n => n.id === noteId);
            if (note) {
                note.cardWidth = width;
                note.cardHeight = height;
                void saveNotes();
            }
        }, 300);
    };
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
        
        // Header with title + meta row
        const header = document.createElement('div');
        header.className = 'note-header';
        
        // Drag handle
        const dragHandle = document.createElement('div');
        dragHandle.className = 'note-drag-handle';
        dragHandle.innerHTML = '⋮⋮';
        dragHandle.title = 'Drag to reorder';
        
        // Title input
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'note-title-input';
        titleInput.dataset.noteId = note.id;
        titleInput.value = note.title || '';
        titleInput.placeholder = 'Untitled Note';
        
        // Meta row (timestamp + save indicator + delete)
        const metaRow = document.createElement('div');
        metaRow.className = 'note-meta-row';
        
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
        
        metaRow.appendChild(timestamp);
        metaRow.appendChild(saveIndicator);
        metaRow.appendChild(deleteBtn);
        
        header.appendChild(dragHandle);
        header.appendChild(titleInput);
        header.appendChild(metaRow);
        
        // Textarea
        const textarea = document.createElement('textarea');
        textarea.className = 'note-textarea';
        textarea.dataset.noteId = note.id;
        textarea.value = note.content;
        textarea.placeholder = 'Start typing your note...';
        
        card.appendChild(header);
        card.appendChild(textarea);
        
        notesContainer.appendChild(card);
        
        // Apply stored dimensions if user previously resized this card
        if (note.cardWidth) card.style.width = note.cardWidth + 'px';
        if (note.cardHeight) card.style.height = note.cardHeight + 'px';
        
        // Observe resize to persist dimensions
        const resizeObserver = new ResizeObserver(debounceResize(note.id, card));
        resizeObserver.observe(card);
        
        // --- Drag and Drop Logic ---
        dragHandle.addEventListener('mousedown', () => {
            // Only allow dragging if we are not actively searching
            if (!notesSearchInput || !notesSearchInput.value.trim()) {
                card.setAttribute('draggable', 'true');
            }
        });
        dragHandle.addEventListener('mouseup', () => card.removeAttribute('draggable'));
        dragHandle.addEventListener('mouseleave', () => card.removeAttribute('draggable'));
        
        card.addEventListener('dragstart', (e) => {
            draggedNoteId = note.id;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', note.id);
            setTimeout(() => card.classList.add('dragging'), 0);
        });
        
        card.addEventListener('dragend', () => {
            draggedNoteId = null;
            card.classList.remove('dragging');
            card.removeAttribute('draggable');
            document.querySelectorAll('.note-card').forEach(c => {
                c.classList.remove('drag-over-before', 'drag-over-after');
            });
        });
        
        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!draggedNoteId || draggedNoteId === note.id) return;
            
            e.dataTransfer.dropEffect = 'move';
            const rect = card.getBoundingClientRect();
            const isBefore = (e.clientX - rect.left) < (rect.width / 2);
            
            card.classList.remove('drag-over-before', 'drag-over-after');
            if (isBefore) {
                card.classList.add('drag-over-before');
            } else {
                card.classList.add('drag-over-after');
            }
        });
        
        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over-before', 'drag-over-after');
        });
        
        card.addEventListener('drop', async (e) => {
            e.preventDefault();
            card.classList.remove('drag-over-before', 'drag-over-after');
            
            if (!draggedNoteId || draggedNoteId === note.id) return;
            
            const rect = card.getBoundingClientRect();
            const isBefore = (e.clientX - rect.left) < (rect.width / 2);
            
            const draggedIndex = allNotes.findIndex(n => n.id === draggedNoteId);
            const targetIndex = allNotes.findIndex(n => n.id === note.id);
            
            if (draggedIndex !== -1 && targetIndex !== -1) {
                const previousNotes = [...allNotes];
                const [draggedNoteObj] = allNotes.splice(draggedIndex, 1);
                
                const newTargetIndex = allNotes.findIndex(n => n.id === note.id);
                const insertIndex = isBefore ? newTargetIndex : newTargetIndex + 1;
                
                allNotes.splice(insertIndex, 0, draggedNoteObj);

                try {
                    await saveNotes();
                    renderNotes(allNotes);
                } catch (error) {
                    console.error('Failed to reorder notes:', error);
                    allNotes = previousNotes;
                    renderNotes(allNotes);
                    showToast('Failed to reorder notes', 'error');
                }
            }
        });
        

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

function shouldMigrateAiSystemPrompt(prompt) {
    if (!prompt) return false;
    if (prompt === PREVIOUS_DEFAULT_AI_SYSTEM_PROMPT) return true;
    return LEGACY_AI_SYSTEM_PROMPT_PREFIXES.some((prefix) => prompt.startsWith(prefix));
}

function shouldPreserveAiLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return false;

    return /^(api\/|\/api\/|https?:\/\/)/i.test(trimmed)
        || /[`{}[\]]/.test(line)
        || /\/\/|\/\*/.test(line)
        || /^["'][^"']+["']\s*:/.test(trimmed)
        || /:\s*(?:["']|[0-9]|true|false|null|\[|\{)/i.test(line);
}

function protectInlineTechnicalTokens(line, reserveToken) {
    return line.replace(
        /`[^`]+`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:true|false|null)\b|\b\d+\b|\b[a-z]+_[a-z0-9_]+\b|\bapi\/[A-Za-z0-9_./-]+\b|\bhttps?:\/\/\S+\b/gi,
        (match) => reserveToken(match)
    );
}

function protectTechnicalContent(text) {
    const placeholders = [];
    const reserveToken = (value) => {
        const token = `[[AI_LOCK_${placeholders.length}]]`;
        placeholders.push({ token, value });
        return token;
    };

    const protectedText = text
        .split('\n')
        .map((line) => shouldPreserveAiLine(line) ? reserveToken(line) : protectInlineTechnicalTokens(line, reserveToken))
        .join('\n');

    return { protectedText, placeholders };
}

function restoreProtectedContent(text, placeholders) {
    return placeholders.reduce((restored, { token, value }) => restored.split(token).join(value), text);
}

function buildAiRewritePrompt(text) {
    const { protectedText, placeholders } = protectTechnicalContent(text);

    return {
        placeholders,
        prompt: [
            'Rewrite the text below for clarity and professionalism.',
            'Any token in the format [[AI_LOCK_N]] is locked content. Keep it exactly unchanged and in the same position.',
            'Return only the rewritten text.',
            '',
            protectedText
        ].join('\n')
    };
}

function ensureAiEnabled() {
    if (!settings.ollamaEnabled) {
        throw new Error('AI Assistant is disabled. Enable it in Settings.');
    }
}

function showOllamaOriginFixAlert() {
    alert([
        'Ollama blocked the Chrome extension request with 403 Forbidden.',
        '',
        'Run these commands in Terminal, in this order:',
        '1. pkill -x ollama',
        '2. launchctl setenv OLLAMA_ORIGINS "*"',
        '3. open -a Ollama',
        '',
        'After Ollama starts again, set the extension Ollama URL to:',
        'http://127.0.0.1:11434'
    ].join('\n'));
}

async function requestAiCompletion({
    provider = settings.aiProvider,
    model,
    systemPrompt,
    prompt,
    temperature = 0.2
}) {
    const resolvedProvider = provider === 'openrouter' ? 'openrouter' : 'ollama';
    const resolvedModel = model?.trim() || getDefaultModelForProvider(resolvedProvider);

    if (resolvedProvider === 'openrouter') {
        if (!settings.openRouterKey) {
            throw new Error('OpenRouter API Key is missing. Please add it in Settings.');
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${settings.openRouterKey}`,
                'HTTP-Referer': 'chrome-extension://bookmark-notes',
                'X-Title': 'Bookmark Notes Extension'
            },
            body: JSON.stringify({
                model: resolvedModel,
                temperature,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const message = data?.choices?.[0]?.message?.content || '';
        if (!message) {
            throw new Error('OpenRouter returned an empty response.');
        }

        return message;
    }

    const response = await fetch(`${settings.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: resolvedModel,
            prompt,
            system: systemPrompt,
            stream: false,
            options: { temperature }
        })
    });

    if (!response.ok) {
        if (response.status === 403) {
            showOllamaOriginFixAlert();
            throw new Error('Ollama blocked (403). Run the shown Terminal commands and restart Ollama.');
        }
        throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || '';
}

function formatAiWriterVariantLabel(value) {
    return String(value)
        .split(/[-_ ]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function buildAiWriterPrompt(cardKey, inputText, variantValue) {
    const headerByCard = {
        chat: 'Write the final chat message based on the text below.',
        email: 'Write the final email based on the text below.',
        summary: 'Summarize the document below based on the selected summary style.'
    };

    const meta = AI_WRITER_CARD_META[cardKey];
    if (meta?.allowMultipleVariants) {
        const variants = normalizeAiWriterVariant(cardKey, variantValue);
        const headings = variants.map((variant) => `[${formatAiWriterVariantLabel(variant)}]`).join(', ');

        return [
            headerByCard[cardKey] || 'Write the final output based on the text below.',
            `Generate one separate version for each selected tone: ${variants.map(formatAiWriterVariantLabel).join(', ')}.`,
            `Use these exact section headings in this order: ${headings}.`,
            'Under each heading, provide only that tone-specific final answer.',
            '',
            inputText
        ].join('\n');
    }

    return [
        headerByCard[cardKey] || 'Write the final output based on the text below.',
        'Return only the final answer.',
        '',
        inputText
    ].join('\n');
}

function setAiWriterStatus(cardKey, message = '', state = '') {
    const elements = getAiWriterCardElements(cardKey);
    if (!elements?.status) return;

    elements.status.textContent = message;
    elements.status.dataset.state = state;
}

function setAiWriterLoading(cardKey, isLoading) {
    const elements = getAiWriterCardElements(cardKey);
    if (!elements) return;

    if (elements.submit) {
        elements.submit.disabled = isLoading;
        elements.submit.classList.toggle('is-loading', isLoading);
    }
    if (elements.copy) {
        elements.copy.disabled = isLoading;
    }
    elements.card.classList.toggle('ai-writer-card-loading', isLoading);
}

async function handleAiWriterSubmit(cardKey) {
    const meta = AI_WRITER_CARD_META[cardKey];
    const elements = getAiWriterCardElements(cardKey);
    if (!meta || !elements) return;

    const provider = elements.provider?.value === 'openrouter' ? 'openrouter' : 'ollama';
    const model = elements.model?.value?.trim() || getDefaultModelForProvider(provider);
    const variantValue = meta.allowMultipleVariants
        ? normalizeAiWriterVariant(cardKey, elements.variantInputs.filter((input) => input.checked).map((input) => input.value))
        : (elements.variant?.value || meta.defaultVariant);
    const systemPrompt = elements.systemPrompt?.value?.trim() || getDefaultAiWriterSystemPrompt(cardKey, variantValue);
    const inputText = elements.input?.value?.trim() || '';

    if (!inputText) {
        setAiWriterStatus(cardKey, 'Enter text before generating.', 'error');
        elements.input?.focus();
        return;
    }

    updateAiWriterCardSettings(cardKey, {
        provider,
        model,
        systemPrompt,
        [meta.variantKey]: variantValue
    }, 'immediate');

    setAiWriterLoading(cardKey, true);
    setAiWriterStatus(cardKey, 'Generating...', 'loading');

    try {
        ensureAiEnabled();
        const output = await requestAiCompletion({
            provider,
            model,
            systemPrompt,
            prompt: buildAiWriterPrompt(cardKey, inputText, variantValue)
        });
        const finalOutput = output.trim();

        if (!finalOutput) {
            throw new Error('The AI model returned an empty response.');
        }

        if (elements.output) {
            elements.output.value = finalOutput;
        }

        setAiWriterStatus(cardKey, 'Ready to copy.', 'success');
    } catch (error) {
        console.error(`AI Writer ${cardKey} error:`, error);
        setAiWriterStatus(cardKey, error.message || 'Generation failed.', 'error');
    } finally {
        setAiWriterLoading(cardKey, false);
    }
}

async function copyTextToClipboard(text) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    tempArea.style.position = 'fixed';
    tempArea.style.opacity = '0';
    document.body.appendChild(tempArea);
    tempArea.focus();
    tempArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempArea);
}

async function handleAiWriterCopy(cardKey) {
    const elements = getAiWriterCardElements(cardKey);
    const outputText = elements?.output?.value?.trim() || '';

    if (!outputText) {
        setAiWriterStatus(cardKey, 'Nothing to copy yet.', 'error');
        return;
    }

    try {
        await copyTextToClipboard(outputText);
        setAiWriterStatus(cardKey, 'Copied to clipboard.', 'success');
        showToast('AI Writer output copied.', 'success');
    } catch (error) {
        console.error('Failed to copy AI Writer output:', error);
        setAiWriterStatus(cardKey, 'Copy failed.', 'error');
    }
}

// ==========================================
// AI REWRITE FUNCTIONS
// ==========================================
let currentAiTextarea = null;

function handleTextSelection(e) {
    if (!settings.ollamaEnabled || !aiRewriteBtn || !isNotesPageActive()) return;
    
    const textarea = e.target;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    
    // Only show button if there is text AND it contains at least one alphanumeric character
    if (!selectedText.trim() || !/[a-zA-Z0-9]/.test(selectedText)) {
        aiRewriteBtn.classList.add('hidden');
        currentAiTextarea = null;
        return;
    }
    
    currentAiTextarea = textarea;
    
    const rect = textarea.getBoundingClientRect();
    // Position floating button nicely above the textarea's center
    aiRewriteBtn.style.top = `${Math.max(10, rect.top - 45)}px`;
    aiRewriteBtn.style.left = `${Math.max(10, rect.left + rect.width / 2)}px`; 
    aiRewriteBtn.classList.remove('hidden');
}

async function handleAiRewrite(e) {
    e.preventDefault();
    if (!currentAiTextarea || !settings.ollamaEnabled) return;
    
    const start = currentAiTextarea.selectionStart;
    const end = currentAiTextarea.selectionEnd;
    const selectedText = currentAiTextarea.value.substring(start, end);
    
    if (!selectedText.trim()) return;

    const rewriteRequest = buildAiRewritePrompt(selectedText);
    
    const originalText = aiRewriteBtn.innerHTML;
    aiRewriteBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Rewriting...</span>';
    aiRewriteBtn.classList.add('is-loading');
    aiRewriteBtn.disabled = true;
    
    try {
        let rewrittenText = await requestAiCompletion({
            provider: settings.aiProvider,
            model: getDefaultModelForProvider(settings.aiProvider),
            systemPrompt: settings.ollamaSystemPrompt,
            prompt: rewriteRequest.prompt
        });

        rewrittenText = restoreProtectedContent(rewrittenText, rewriteRequest.placeholders);
        
        // Strip wrapping quotes if the model added them
        const trimmedRewrite = rewrittenText.trim();
        if (trimmedRewrite.startsWith('"') && trimmedRewrite.endsWith('"')) {
            rewrittenText = trimmedRewrite.substring(1, trimmedRewrite.length - 1);
        }
        
        if (rewrittenText.trim()) {
            // Using execCommand ensures perfect compatibility with Chrome's native Undo/Redo stack
            currentAiTextarea.focus();
            currentAiTextarea.setSelectionRange(start, end);
            document.execCommand('insertText', false, rewrittenText);
            
            showToast('Rewritten successfully!', 'success');
        }
    } catch (error) {
        console.error('AI Rewrite Error:', error);
        showToast(error.message || 'AI rewrite failed. Check your settings.', 'error');
    } finally {
        aiRewriteBtn.innerHTML = originalText;
        aiRewriteBtn.classList.remove('is-loading');
        aiRewriteBtn.disabled = false;
        aiRewriteBtn.classList.add('hidden'); // Hide button after use
        currentAiTextarea.focus();
    }
}

// ============================================
// ZOOM CONTROLS
// ============================================

const ZOOM_MIN = 50;
const ZOOM_MAX = 200;
const ZOOM_STEP = 10;

function adjustZoom(delta) {
    setZoom(currentZoomLevel + delta);
}

function setZoom(level) {
    currentZoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, level));
    applyZoom();
    void saveUiState();
}

function applyZoom() {
    const scale = currentZoomLevel / 100;
    document.documentElement.style.fontSize = (16 * scale) + 'px';
    updateZoomDisplay();
}

function updateZoomDisplay() {
    if (zoomLevelDisplay) {
        zoomLevelDisplay.textContent = currentZoomLevel + '%';
    }
    // Disable buttons at limits
    if (zoomOutBtn) {
        zoomOutBtn.disabled = currentZoomLevel <= ZOOM_MIN;
        zoomOutBtn.style.opacity = currentZoomLevel <= ZOOM_MIN ? '0.35' : '1';
    }
    if (zoomInBtn) {
        zoomInBtn.disabled = currentZoomLevel >= ZOOM_MAX;
        zoomInBtn.style.opacity = currentZoomLevel >= ZOOM_MAX ? '0.35' : '1';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
