import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RecentlyViewedPage from '../page';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useStore } from '@/hooks/useStore';

vi.mock('@/store/recentlyViewedStore', () => ({
  useRecentlyViewedStore: vi.fn(),
}));

vi.mock('@/hooks/useStore', () => ({
  useStore: vi.fn(),
}));

vi.mock('@/components/MovieGrid', () => ({
  default: ({ movies }: any) => <div data-testid="movie-grid">Movies: {movies.length}</div>,
}));

describe('RecentlyViewedPage', () => {
  const mockClear = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRecentlyViewedStore as any).mockReturnValue({
      clearRecentlyViewed: mockClear,
    });
  });

  it('renders "No recently viewed movies" when empty', () => {
    (useStore as any).mockReturnValue([]);
    
    render(<RecentlyViewedPage />);
    
    expect(screen.getByText(/No recently viewed movies/i)).toBeInTheDocument();
  });

  it('renders movies when store has data', () => {
    (useStore as any).mockReturnValue([{ id: 1, title: 'Movie 1', vote_average: 8, release_date: '2024' }]);
    
    render(<RecentlyViewedPage />);
    
    expect(screen.getByTestId('movie-grid')).toBeInTheDocument();
    expect(screen.getByText(/showing your last/i)).toBeInTheDocument();
  });

  it('calls clearRecentlyViewed when clear button is clicked and confirmed', () => {
    (useStore as any).mockReturnValue([{ id: 1, title: 'Movie 1', vote_average: 8, release_date: '2024' }]);
    window.confirm = vi.fn().mockReturnValue(true);
    
    render(<RecentlyViewedPage />);
    
    const clearButton = screen.getByText(/Clear History/i);
    fireEvent.click(clearButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockClear).toHaveBeenCalled();
  });
});
