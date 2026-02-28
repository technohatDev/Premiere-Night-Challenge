import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Movie } from "@/api/types";
import { STORAGE_KEYS } from "@/constants/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WatchlistStore {
	watchlist: Movie[];
	addToWatchlist: (movie: Movie) => void;
	removeFromWatchlist: (movieId: number) => void;
	isInWatchlist: (movieId: number) => boolean;
	clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistStore>()(
	persist(
		(set, get) => ({
			watchlist: [],

			addToWatchlist: (movie) => {
				const { watchlist } = get();
				if (watchlist.some((m) => m.id === movie.id)) return;
				set({ watchlist: [movie, ...watchlist] });
			},

			removeFromWatchlist: (movieId) => {
				set({ watchlist: get().watchlist.filter((m) => m.id !== movieId) });
			},

			isInWatchlist: (movieId) => {
				return get().watchlist.some((m) => m.id === movieId);
			},

			clearWatchlist: () => set({ watchlist: [] })
		}),
		{
			name: STORAGE_KEYS.WATCHLIST,
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
);
