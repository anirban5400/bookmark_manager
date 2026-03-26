/**
 * Background Service Worker
 * Handles fetching URL metadata (title, description) bypassing CORS
 */

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchMetadata') {
        if (!isSafeRemoteUrl(request.url)) {
            sendResponse({ success: false, error: 'Only HTTP(S) URLs are supported.' });
            return false;
        }

        fetchUrlMetadata(request.url)
            .then(metadata => sendResponse({ success: true, data: metadata }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        
        // Return true to indicate async response
        return true;
    }
});

/**
 * Fetch metadata (title, description) from a URL
 * @param {string} url - The URL to fetch metadata from
 * @returns {Promise<{title: string, description: string}>}
 */
async function fetchUrlMetadata(url) {
    try {
        if (!isSafeRemoteUrl(url)) {
            throw new Error('Only HTTP(S) URLs are supported.');
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Mozilla/5.0 (compatible; BookmarkManager/1.0)'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const html = await response.text();
        
        // Parse HTML to extract metadata
        const metadata = parseHtmlMetadata(html, url);
        
        return metadata;
    } catch (error) {
        console.error('Failed to fetch metadata:', error);
        throw error;
    }
}

function isSafeRemoteUrl(rawUrl) {
    try {
        const parsedUrl = new URL(rawUrl);
        return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Parse HTML string to extract title and description
 * @param {string} html - The HTML content
 * @param {string} url - The original URL for fallback
 * @returns {{title: string, description: string}}
 */
function parseHtmlMetadata(html, url) {
    let title = '';
    let description = '';
    
    // Extract title
    // Try <title> tag
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
        title = decodeHtmlEntities(titleMatch[1].trim());
    }
    
    // Try og:title if no title found
    if (!title) {
        const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ||
                             html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:title["']/i);
        if (ogTitleMatch && ogTitleMatch[1]) {
            title = decodeHtmlEntities(ogTitleMatch[1].trim());
        }
    }
    
    // Fallback to domain name
    if (!title) {
        try {
            title = new URL(url).hostname.replace('www.', '');
        } catch {
            title = url;
        }
    }
    
    // Extract description
    // Try meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    if (descMatch && descMatch[1]) {
        description = decodeHtmlEntities(descMatch[1].trim());
    }
    
    // Try og:description if no description found
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
 * Decode HTML entities in a string
 * @param {string} text - Text with HTML entities
 * @returns {string} - Decoded text
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
