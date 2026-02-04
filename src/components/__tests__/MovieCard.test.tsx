import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MovieCard from '../MovieCard';
import { useWatchLaterStore } from '@/store/watchLaterStore';

// Mock the components/hooks
vi.mock('@/store/watchLaterStore', () => ({
  useWatchLaterStore: vi.fn(),
}));

vi.mock('@/hooks/useStore', () => ({
  useStore: vi.fn((store, cb) => cb({ movies: [] })),
}));

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  vote_average: 8.5,
  release_date: '2024-01-01',
  overview: 'Test overview',
  original_language: 'en',
} as any;

describe('MovieCard', () => {
  it('renders movie title and rating', () => {
    const toggleWatchLater = vi.fn();
    (useWatchLaterStore as any).mockReturnValue({ toggleWatchLater });
    
    render(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('calls toggleWatchLater when button clicked', () => {
    const toggleWatchLater = vi.fn();
    (useWatchLaterStore as any).mockReturnValue({ toggleWatchLater });
    
    render(<MovieCard movie={mockMovie} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(toggleWatchLater).toHaveBeenCalledWith(mockMovie);
  });
});
