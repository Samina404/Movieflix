# MovieFlix - TMDB Movie Discovery App

A modern, responsive movie browsing application built with Next.js, TypeScript, and Tailwind CSS, powered by The Movie Database (TMDB) API.

## Features

- **Home Page**:
  - Featured Top Rated movie hero section.
  - Interactive genre navigation.
  - Top Rated Movies grid.
  - Category rows showing the top 5 popular movies for each genre.
- **Movie Discovery**:
  - Browse movies by genre with advanced sorting options (Popularity, Release Date, Rating, Title).
  - Search movies by title with real-time results from the URL.
  - Full pagination for large movie lists.
- **Detailed Information**:
  - Comprehensive movie details: Poster, backdrop, overview, rating, runtime, and release date.
  - Full cast list with actor photos.
  - Similar movies recommendations sorted by popularity.
- **User Lists**:
  - **Watch Later**: Toggle movies to your personal watchlist (persisted in localStorage).
  - **Recently Viewed**: Automatically tracks the last 20 movies you've visited.
- **Premium UI/UX**:
  - Glassmorphic navigation and components.
  - Smooth hover animations and transitions.
  - Fully responsive design for mobile, tablet, and desktop.
  - Professional loading states using Skeleton screens.
  - SEO optimized with semantic HTML.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand with Persistence Middleware
- **API**: TMDB v3

## Getting Started

### Prerequisites

- Node.js 18+
- TMDB API Key (v3)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your TMDB API key:
   ```env
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   TMDB_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/`: File-based routing and page components.
- `src/components/`: Reusable UI components.
- `src/lib/`: API client and utility functions.
- `src/store/`: Global state management with Zustand.
- `src/types/`: TypeScript interfaces/types.
- `src/app/globals.css`: Global styles and design system tokens.

## Implementation Details

- **API Security**: The TMDB API key is stored in server-side environment variables and is never exposed to the client-side bundle. All API calls are performed in Next.js Server Components.
- **Persistence**: "Watch Later" and "Recently Viewed" lists are persisted in the browser's `localStorage` using Zustand middleware, ensuring data is retained across sessions.
- **Performance**: Utilizes Next.js `Suspense` and Loading UI for a fast, app-like feel. Images are optimized for performance.
