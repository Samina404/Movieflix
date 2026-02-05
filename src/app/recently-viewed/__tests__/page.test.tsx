import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RecentlyViewedPage from '../page';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useStore } from '@/hooks/useStore';
import { toast } from 'sonner';

vi.mock('@/store/recentlyViewedStore', () => ({
  useRecentlyViewedStore: vi.fn(),
}));

vi.mock('@/hooks/useStore', () => ({
  useStore: vi.fn(),
}));

vi.mock('@/components/MovieGrid', () => ({
  default: ({ movies }: any) => <div data-testid="movie-grid">Movies: {movies.length}</div>,
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
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

  it('calls clearRecentlyViewed when clear button is clicked and confirmed via toast', () => {
    const movies = [{ id: 1, title: 'Movie 1', vote_average: 8, release_date: '2024' }];
    (useStore as any).mockReturnValue(movies);
    
    render(<RecentlyViewedPage />);
    
    const clearButton = screen.getByText(/Clear History/i);
    fireEvent.click(clearButton);
    
    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Clear viewing history?"), expect.any(Object));
    
    // Simulate toast action click
    const toastCall = (toast.error as any).mock.calls[0];
    const options = toastCall[1];
    options.action.onClick();
    
    expect(mockClear).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Viewing history cleared");
  });
});
