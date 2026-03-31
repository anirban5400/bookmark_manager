/**
 * IndexedDB Wrapper for Bookmark Manager
 * Provides async/await API for database operations
 */

class BookmarkDB {
  constructor() {
    this.dbName = "BookmarkManagerDB";
    this.dbVersion = 3;
    this.storeName = "bookmarks";
    this.notesStoreName = "notes";
    this.db = null;
  }

  getSortOrderValue(bookmark) {
    return Number.isFinite(bookmark?.sortOrder) ? bookmark.sortOrder : null;
  }

  sortBookmarks(bookmarks) {
    return [...bookmarks].sort((left, right) => {
      const leftOrder = this.getSortOrderValue(left);
      const rightOrder = this.getSortOrderValue(right);

      if (leftOrder !== null && rightOrder !== null && leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }
      if (leftOrder !== null) return -1;
      if (rightOrder !== null) return 1;

      const leftCreatedAt = new Date(left?.createdAt || 0).getTime();
      const rightCreatedAt = new Date(right?.createdAt || 0).getTime();
      if (leftCreatedAt !== rightCreatedAt) {
        return rightCreatedAt - leftCreatedAt;
      }

      return (right?.id || 0) - (left?.id || 0);
    });
  }

  migrateSortOrder(store) {
    const request = store.getAll();

    request.onsuccess = () => {
      const sortedBookmarks = [...request.result].sort((left, right) => {
        const leftCreatedAt = new Date(left?.createdAt || 0).getTime();
        const rightCreatedAt = new Date(right?.createdAt || 0).getTime();
        if (leftCreatedAt !== rightCreatedAt) {
          return rightCreatedAt - leftCreatedAt;
        }

        return (right?.id || 0) - (left?.id || 0);
      });

      sortedBookmarks.forEach((bookmark, index) => {
        if (bookmark.sortOrder === index) return;
        store.put({
          ...bookmark,
          sortOrder: index,
        });
      });
    };
  }

  sortNotes(notes) {
    return [...notes].sort((left, right) => {
      const leftOrder = Number.isFinite(left?.sortOrder) ? left.sortOrder : null;
      const rightOrder = Number.isFinite(right?.sortOrder) ? right.sortOrder : null;

      if (leftOrder !== null && rightOrder !== null && leftOrder !== rightOrder) {
        return leftOrder - rightOrder;
      }
      if (leftOrder !== null) return -1;
      if (rightOrder !== null) return 1;

      const leftUpdatedAt = new Date(left?.updatedAt || left?.createdAt || 0).getTime();
      const rightUpdatedAt = new Date(right?.updatedAt || right?.createdAt || 0).getTime();
      if (leftUpdatedAt !== rightUpdatedAt) {
        return rightUpdatedAt - leftUpdatedAt;
      }

      return String(left?.id || '').localeCompare(String(right?.id || ''));
    });
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
        let store;
        let notesStore;

        // Create bookmarks store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          store = db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
        } else {
          store = event.target.transaction.objectStore(this.storeName);
        }

        // Create indexes for searching
        if (!store.indexNames.contains("title")) {
          store.createIndex("title", "title", { unique: false });
        }
        if (!store.indexNames.contains("url")) {
          store.createIndex("url", "url", { unique: false });
        }
        if (!store.indexNames.contains("createdAt")) {
          store.createIndex("createdAt", "createdAt", { unique: false });
        }
        if (!store.indexNames.contains("sortOrder")) {
          store.createIndex("sortOrder", "sortOrder", { unique: false });
        }

        this.migrateSortOrder(store);

        if (!db.objectStoreNames.contains(this.notesStoreName)) {
          notesStore = db.createObjectStore(this.notesStoreName, {
            keyPath: "id",
          });
        } else {
          notesStore = event.target.transaction.objectStore(this.notesStoreName);
        }

        if (!notesStore.indexNames.contains("createdAt")) {
          notesStore.createIndex("createdAt", "createdAt", { unique: false });
        }
        if (!notesStore.indexNames.contains("updatedAt")) {
          notesStore.createIndex("updatedAt", "updatedAt", { unique: false });
        }
        if (!notesStore.indexNames.contains("sortOrder")) {
          notesStore.createIndex("sortOrder", "sortOrder", { unique: false });
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
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const existingBookmarks = this.sortBookmarks(getAllRequest.result);
        const topOrder = existingBookmarks.reduce((currentMin, existingBookmark) => {
          const sortOrder = this.getSortOrderValue(existingBookmark);
          if (sortOrder === null) return currentMin;
          return Math.min(currentMin, sortOrder);
        }, 0);

        const bookmarkData = {
          ...bookmark,
          createdAt: new Date().toISOString(),
          sortOrder: existingBookmarks.length === 0 ? 0 : topOrder - 1,
        };

        const request = store.add(bookmarkData);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(new Error("Failed to add bookmark"));
        };
      };

      getAllRequest.onerror = () => {
        reject(new Error("Failed to prepare bookmark order"));
      };
    });
  }

  /**
   * Get all bookmarks sorted by manual sort order, then creation date.
   * @returns {Promise<Array>}
   */
  async getAllBookmarks() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const bookmarks = this.sortBookmarks(request.result);
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
   * Persist a full manual bookmark order.
   * @param {number[]} orderedIds
   * @returns {Promise<void>}
   */
  async reorderBookmarks(orderedIds) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(new Error("Failed to reorder bookmarks"));
      };

      request.onsuccess = () => {
        const existingBookmarks = this.sortBookmarks(request.result);
        const orderedPositionMap = new Map(
          orderedIds.map((bookmarkId, index) => [bookmarkId, index]),
        );

        const includedBookmarks = existingBookmarks
          .filter((bookmark) => orderedPositionMap.has(bookmark.id))
          .sort(
            (left, right) =>
              orderedPositionMap.get(left.id) - orderedPositionMap.get(right.id),
          );
        const remainingBookmarks = existingBookmarks.filter(
          (bookmark) => !orderedPositionMap.has(bookmark.id),
        );

        includedBookmarks.concat(remainingBookmarks).forEach((bookmark, index) => {
          store.put({
            ...bookmark,
            sortOrder: index,
          });
        });
      };

      request.onerror = () => {
        reject(new Error("Failed to load bookmarks for reorder"));
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

  /**
   * Get all notes sorted by manual order.
   * @returns {Promise<Array>}
   */
  async getAllNotes() {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.notesStoreName], "readonly");
      const store = transaction.objectStore(this.notesStoreName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(this.sortNotes(request.result));
      };

      request.onerror = () => {
        reject(new Error("Failed to get notes"));
      };
    });
  }

  /**
   * Replace the full notes list while preserving explicit order.
   * @param {Array} notes
   * @returns {Promise<void>}
   */
  async replaceAllNotes(notes) {
    await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.notesStoreName], "readwrite");
      const store = transaction.objectStore(this.notesStoreName);
      const keysRequest = store.getAllKeys();

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(new Error("Failed to save notes"));
      };

      keysRequest.onsuccess = () => {
        const nextNotes = Array.isArray(notes) ? notes : [];
        const nextIds = new Set(nextNotes.map((note) => note.id));

        keysRequest.result.forEach((existingKey) => {
          if (!nextIds.has(existingKey)) {
            store.delete(existingKey);
          }
        });

        nextNotes.forEach((note, index) => {
          store.put({
            ...note,
            sortOrder: index,
          });
        });
      };

      keysRequest.onerror = () => {
        reject(new Error("Failed to prepare note save"));
      };
    });
  }
}

// Export singleton instance
const bookmarkDB = new BookmarkDB();
