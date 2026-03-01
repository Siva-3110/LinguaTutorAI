import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
    const [isOnline, setOnline] = useState(
        typeof window !== 'undefined' ? window.navigator.onLine : true
    );

    useEffect(() => {
        const setOnlineStatus = () => setOnline(true);
        const setOfflineStatus = () => setOnline(false);

        window.addEventListener('online', setOnlineStatus);
        window.addEventListener('offline', setOfflineStatus);

        return () => {
            window.removeEventListener('online', setOnlineStatus);
            window.removeEventListener('offline', setOfflineStatus);
        };
    }, []);

    return isOnline;
};
