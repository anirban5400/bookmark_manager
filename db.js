/**
 * IndexedDB Wrapper for Bookmark Manager
 * Provides async/await API for database operations
 */

class BookmarkDB {
  constructor() {
    this.dbName = "BookmarkManagerDB";
    this.dbVersion = 1;
    this.storeName = "bookmarks";
    this.db = null;
  }

  /**
   * Initialize the database connection
   * @returns {Promise<IDBDatabase>}
   */
  async init() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error("Failed to open database"));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create bookmarks store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });

          // Create indexes for searching
          store.createIndex("title", "title", { unique: false });
          store.createIndex("url", "url", { unique: false });
          store.createIndex("createdAt", "createdAt", { unique: false });
        }
      };
    });
  }

  /**
   * Add a new bookmark
   * @param {Object} bookmark - { title, url, favicon }
   * @returns {Promise<number>} - The ID of the new bookmark
   */
  async addBookmark(bookmark) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      const bookmarkData = {
        ...bookmark,
        createdAt: new Date().toISOString(),
      };

      const request = store.add(bookmarkData);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to add bookmark"));
      };
    });
  }

  /**
   * Get all bookmarks sorted by creation date (newest first)
   * @returns {Promise<Array>}
   */
  async getAllBookmarks() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        // Sort by createdAt descending (newest first)
        const bookmarks = request.result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        resolve(bookmarks);
      };

      request.onerror = () => {
        reject(new Error("Failed to get bookmarks"));
      };
    });
  }

  /**
   * Get a single bookmark by ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getBookmark(id) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to get bookmark"));
      };
    });
  }

  /**
   * Delete a bookmark by ID
   * @param {number} id
   * @returns {Promise<void>}
   */
  async deleteBookmark(id) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to delete bookmark"));
      };
    });
  }

  /**
   * Update a bookmark
   * @param {Object} bookmark - Must include id
   * @returns {Promise<void>}
   */
  async updateBookmark(bookmark) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put(bookmark);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to update bookmark"));
      };
    });
  }

  /**
   * Search bookmarks by title or URL
   * @param {string} query
   * @returns {Promise<Array>}
   */
  async searchBookmarks(query) {
    const allBookmarks = await this.getAllBookmarks();
    const lowerQuery = query.toLowerCase();

    return allBookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(lowerQuery) ||
        bookmark.url.toLowerCase().includes(lowerQuery),
    );
  }

  /**
   * Get total count of bookmarks
   * @returns {Promise<number>}
   */
  async getCount() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.count();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to count bookmarks"));
      };
    });
  }

  /**
   * Clear all bookmarks
   * @returns {Promise<void>}
   */
  async clearAll() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to clear bookmarks"));
      };
    });
  }
}

// Export singleton instance
const bookmarkDB = new BookmarkDB();
