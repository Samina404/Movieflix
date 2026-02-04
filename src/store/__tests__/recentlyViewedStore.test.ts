import { describe, it, expect, beforeEach } from 'vitest';
import { useRecentlyViewedStore } from '../recentlyViewedStore';

describe('recentlyViewedStore', () => {
    beforeEach(() => {
        useRecentlyViewedStore.getState().clearRecentlyViewed();
    });

    it('should add a movie to recently viewed', () => {
        const movie = { id: 1, title: 'Test Movie' } as any;
        useRecentlyViewedStore.getState().addToRecentlyViewed(movie);

        const state = useRecentlyViewedStore.getState();
        expect(state.movies).toHaveLength(1);
        expect(state.movies[0].id).toBe(1);
    });

    it('should move existing movie to the top', () => {
        const movie1 = { id: 1, title: 'Movie 1' } as any;
        const movie2 = { id: 2, title: 'Movie 2' } as any;

        useRecentlyViewedStore.getState().addToRecentlyViewed(movie1);
        useRecentlyViewedStore.getState().addToRecentlyViewed(movie2);
        useRecentlyViewedStore.getState().addToRecentlyViewed(movie1);

        const state = useRecentlyViewedStore.getState();
        expect(state.movies).toHaveLength(2);
        expect(state.movies[0].id).toBe(1);
        expect(state.movies[1].id).toBe(2);
    });

    it('should limit to 20 movies', () => {
        for (let i = 1; i <= 25; i++) {
            useRecentlyViewedStore.getState().addToRecentlyViewed({ id: i, title: `Movie ${i}` } as any);
        }

        const state = useRecentlyViewedStore.getState();
        expect(state.movies).toHaveLength(20);
        expect(state.movies[0].id).toBe(25);
    });
});
