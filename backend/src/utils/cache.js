class APICache {
    constructor() {
        this.cache = new Map();
        this.TTL = 1000 * 60 * 15; // 15 minutes by default
    }

    set(key, value, ttl = this.TTL) {
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, { value, expiresAt });
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    clear() {
        this.cache.clear();
    }
}

export const appCache = new APICache();
