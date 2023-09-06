define(function () {
    const Storage = {
        exists: (window.localStorage !== undefined),

        get(key) {
            if (!this.exists) return;
            const data = window.localStorage.getItem(key);
            if (!data) return;
            return JSON.parse(data);
        },

        set(key, data) {
            if (!this.exists) return;
            window.localStorage.setItem(key, JSON.stringify(data));
        },

        remove(key) {
            if (!this.exists) return;
            window.localStorage.removeItem(key);
        },

        wipe() {
            if (!this.exists) return;
            window.localStorage.clear();
        },
    }

    return Storage;
})