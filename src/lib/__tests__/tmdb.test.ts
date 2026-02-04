import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

const { mockGet } = vi.hoisted(() => ({
    mockGet: vi.fn(),
}));

vi.mock('axios', () => {
    return {
        default: {
            create: vi.fn(() => ({
                get: mockGet,
            })),
        },
    };
});

// Import after mocking
import { getTopRatedMovies, getGenres } from '../tmdb';

describe('tmdb api', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('getTopRatedMovies calls correct endpoint', async () => {
        mockGet.mockResolvedValue({ data: { results: [], page: 1 } });

        await getTopRatedMovies(2);

        expect(mockGet).toHaveBeenCalledWith('/movie/top_rated', {
            params: { page: 2 },
        });
    });

    it('getGenres calls correct endpoint', async () => {
        mockGet.mockResolvedValue({ data: { genres: [] } });

        await getGenres();

        expect(mockGet).toHaveBeenCalledWith('/genre/movie/list');
    });
});
