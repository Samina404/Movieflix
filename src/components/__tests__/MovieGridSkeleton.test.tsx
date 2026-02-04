import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MovieGridSkeleton from '../MovieGridSkeleton';

describe('MovieGridSkeleton', () => {
  it('renders fixed number of skeletons', () => {
    const { container } = render(<MovieGridSkeleton count={6} />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    // Assuming MovieCardSkeleton has .animate-pulse
    expect(skeletons.length).toBeGreaterThanOrEqual(6);
  });

  it('renders 12 skeletons by default', () => {
    const { container } = render(<MovieGridSkeleton />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThanOrEqual(12);
  });
});
