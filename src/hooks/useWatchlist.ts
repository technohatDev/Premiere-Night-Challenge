import { useWatchlistStore } from "@/store/watchlistStore";
import type { Movie } from "@/api/types";

/** Convenience hook wrapping the Zustand watchlist store */
export function useWatchlist() {
  const watchlist = useWatchlistStore((s) => s.watchlist);
  const addToWatchlist = useWatchlistStore((s) => s.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist);
  const isInWatchlist = useWatchlistStore((s) => s.isInWatchlist);
  const clearWatchlist = useWatchlistStore((s) => s.clearWatchlist);

  const toggleWatchlist = (movie: Movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
  };
}
