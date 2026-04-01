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
const bookmarksPage = document.getElementById('bookmarksPage');
const notesPage = document.getElementById('notesPage');
const calculatorsPage = document.getElementById('calculatorsPage');
const notesContainer = document.getElementById('notesContainer');
const notesCount = document.getElementById('notesCount');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesSearchInput = document.getElementById('notesSearchInput');

// Calculator page elements
const percentageRateInput = document.getElementById('percentageRateInput');
const percentageBaseInput = document.getElementById('percentageBaseInput');
const percentageResult = document.getElementById('percentageResult');
const percentageSummary = document.getElementById('percentageSummary');
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
const VALID_PAGES = new Set(['bookmarks', 'notes', 'calculators']);
let cardViewLimit = DEFAULT_CARD_VIEW_LIMIT;
let isSidebarCollapsed = false;
let calculatorCardTogglesBound = false;
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

// Settings state (with defaults)
let settings = {
    showDateTime: true,
    showNetwork: true,
    showMemory: false,
    timezone: 'local',
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
    ollamaSystemPrompt: DEFAULT_AI_SYSTEM_PROMPT
};

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
    setupCalculatorListeners();
    setupCalculatorCardToggles();
    if (taxResetBtn) {
        taxResetBtn.addEventListener('click', resetTaxPlanner);
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
    const rate = Math.max(0, parseCalculatorValue(percentageRateInput));
    const base = Math.max(0, parseCalculatorValue(percentageBaseInput));
    const result = (rate / 100) * base;

    if (percentageResult) {
        percentageResult.textContent = formatCalculatorNumber(result);
    }
    if (percentageSummary) {
        percentageSummary.textContent = `${formatCalculatorNumber(rate)}% of ${formatCalculatorNumber(base)} = ${formatCalculatorNumber(result)}`;
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

function updateTaxCalculator(event) {
    const taxInHandInput = document.getElementById('taxInHandInput');
    if (!taxSalaryInput || !taxBasicSalaryInput || !taxRentPaidInput || !taxCityInput || !taxTargetsList) return;

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
    const oldTaxableIncomeEl = document.getElementById('oldTaxableIncome');
    const oldFinalTaxEl = document.getElementById('oldFinalTax');
    const newRegimeCard = document.getElementById('newRegimeCard');
    const oldRegimeCard = document.getElementById('oldRegimeCard');
    const taxRecommendationBanner = document.getElementById('taxRecommendationBanner');
    const taxRecommendationText = document.getElementById('taxRecommendationText');

    if (!taxComparisonSection) return;
    taxComparisonSection.style.display = 'block';

    // --- NEW REGIME calculation ---
    let newTaxable = Math.max(0, totalSalary - newStdDed - newDeductionNps);
    let newTax = calcNewRegimeTax(newTaxable);
    if (isResident && newTaxable <= 1200000) newTax = 0;
    if (newTax > 0) newTax = newTax * 1.04;

    // --- OLD REGIME calculation ---
    let oldTaxable = Math.max(0, totalSalary - oldTotalDeductions);
    const oldExemption = getOldRegimeExemptionForAgeBand(ageBand);
    let oldTax = calcOldRegimeTaxWithExemption(oldTaxable, oldExemption);
    if (isResident && oldTaxable <= 500000) oldTax = 0;
    if (oldTax > 0) oldTax = oldTax * 1.04;

    // Update DOM
    newTaxableIncomeEl.textContent = "₹" + formatCalculatorNumber(Math.round(newTaxable));
    newFinalTaxEl.textContent = "₹" + formatCalculatorNumber(Math.round(newTax));
    oldTaxableIncomeEl.textContent = "₹" + formatCalculatorNumber(Math.round(oldTaxable));
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
        hiddenCardFields: Array.from(hiddenCardFields)
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

    updateDashboardContext();
}

function applyPageState() {
    const showBookmarks = isBookmarksPageActive();
    const showNotes = isNotesPageActive();
    const showCalculators = isCalculatorsPageActive();

    if (bookmarksPage) {
        bookmarksPage.classList.toggle('hidden', !showBookmarks);
    }
    if (notesPage) {
        notesPage.classList.toggle('hidden', !showNotes);
    }
    if (calculatorsPage) {
        calculatorsPage.classList.toggle('hidden', !showCalculators);
    }

    if (appContainer) {
        appContainer.classList.toggle('notes-active', showNotes);
        appContainer.classList.toggle('calculators-active', showCalculators);
    }

    if (!showNotes && aiRewriteBtn) {
        aiRewriteBtn.classList.add('hidden');
        currentAiTextarea = null;
    }

    if (showNotes) {
        void loadNotes();
    } else if (showCalculators) {
        initCalculators();
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

            if (shouldMigrateAiSystemPrompt(settings.ollamaSystemPrompt)) {
                settings.ollamaSystemPrompt = DEFAULT_AI_SYSTEM_PROMPT;
                migrationSaved = await saveSettings();
            } else if (migratedFromLocalStorage) {
                migrationSaved = await saveSettings();
            }
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }

    if (migratedFromLocalStorage && migrationSaved) {
        localStorage.removeItem(SETTINGS_STORAGE_KEY);
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
    
    // Update AI Assistant controls
    if (ollamaEnabledCheckbox) ollamaEnabledCheckbox.checked = settings.ollamaEnabled;
    if (aiProviderSelect) aiProviderSelect.value = settings.aiProvider;
    if (ollamaUrlInput) ollamaUrlInput.value = settings.ollamaUrl;
    if (ollamaModelInput) ollamaModelInput.value = settings.ollamaModel;
    if (openRouterKeyInput) openRouterKeyInput.value = settings.openRouterKey;
    if (openRouterModelInput) openRouterModelInput.value = settings.openRouterModel;
    if (ollamaSystemPromptInput) ollamaSystemPromptInput.value = settings.ollamaSystemPrompt;
    
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
    settings.showMemory = showMemoryCheckbox?.checked ?? false;
    settings.timezone = timezoneSelect?.value ?? 'local';
    
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
        let rewrittenText = '';
        
        if (settings.aiProvider === 'openrouter') {
            if (!settings.openRouterKey) throw new Error('OpenRouter API Key is missing. Please add it in Settings.');
            
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${settings.openRouterKey}`,
                    'HTTP-Referer': 'chrome-extension://bookmark-notes',
                    'X-Title': 'Bookmark Notes Extension'
                },
                body: JSON.stringify({
                    model: settings.openRouterModel,
                    temperature: 0.2,
                    messages: [
                        { role: 'system', content: settings.ollamaSystemPrompt },
                        { role: 'user', content: rewriteRequest.prompt }
                    ]
                })
            });

            if (!response.ok) throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                rewrittenText = data.choices[0].message.content || '';
            } else {
                throw new Error('OpenRouter returned an empty response.');
            }
        } else {
            // Ollama (default)
            const response = await fetch(`${settings.ollamaUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: settings.ollamaModel,
                    prompt: rewriteRequest.prompt,
                    system: settings.ollamaSystemPrompt,
                    stream: false,
                    options: {
                        temperature: 0.2
                    }
                })
            });

            if (!response.ok) {
                if (response.status === 403) throw new Error('Ollama blocked (403). Set OLLAMA_ORIGINS="*" and restart.');
                throw new Error(`Ollama API error: ${response.status}`);
            }

            const data = await response.json();
            rewrittenText = data.response || '';
        }

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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
