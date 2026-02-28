import {
	getGenres,
	getMovieDetails,
	getNowPlaying,
	getPopular,
	getTopRated,
	getUpcoming,
	searchMovies
} from "@/api/tmdb";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const MOVIE_LIST_STALE_TIME = 1000 * 60 * 5; // 5 minutes
const GENRE_STALE_TIME = 1000 * 60 * 30; // 30 minutes

export function useNowPlaying() {
	return useQuery({
		queryKey: ["movies", "now_playing"],
		queryFn: () => getNowPlaying(),
		staleTime: MOVIE_LIST_STALE_TIME
	});
}

export function usePopular() {
	return useQuery({
		queryKey: ["movies", "popular"],
		queryFn: () => getPopular(),
		staleTime: MOVIE_LIST_STALE_TIME
	});
}

export function useTopRated() {
	return useQuery({
		queryKey: ["movies", "top_rated"],
		queryFn: () => getTopRated(),
		staleTime: MOVIE_LIST_STALE_TIME
	});
}

export function useUpcoming() {
	return useQuery({
		queryKey: ["movies", "upcoming"],
		queryFn: () => getUpcoming(),
		staleTime: MOVIE_LIST_STALE_TIME
	});
}

export function useMovieDetails(id: number) {
	return useQuery({
		queryKey: ["movie", id],
		queryFn: () => getMovieDetails(id),
		staleTime: MOVIE_LIST_STALE_TIME,
		enabled: id > 0
	});
}

export function useSearchMovies(query: string) {
	return useQuery({
		queryKey: ["search", query],
		queryFn: () => searchMovies(query),
		staleTime: MOVIE_LIST_STALE_TIME,
		enabled: query.length > 0,
		placeholderData: keepPreviousData
	});
}

export function useGenres() {
	return useQuery({
		queryKey: ["genres"],
		queryFn: () => getGenres(),
		staleTime: GENRE_STALE_TIME
	});
}
