import { useState, useEffect } from "react";

/**
 * A custom hook to safely use persisted Zustand stores in Next.js.
 * It ensures the component is mounted on the client before returning the store data
 * to avoid hydration mismatch errors.
 * 
 * @param store The store hook to use (e.g., useWatchLaterStore)
 * @param selector A selector function to pick the part of the state you need
 * @returns The selected state or null if not yet mounted
 */
export function useStore<T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F
) {
    const result = store(callback) as F;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? result : null;
}
