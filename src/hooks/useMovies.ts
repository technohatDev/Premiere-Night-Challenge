import {
	getGenres,
	getMovieDetails,
	getNowPlaying,
	getPopular,
	getTopRated,
	getUpcoming,
	searchMovies
} from "@/api/tmdb";
import { QUERY_CONFIG } from "@/constants/app";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useNowPlaying() {
	return useQuery({
		queryKey: ["movies", "now_playing"],
		queryFn: () => getNowPlaying(),
		staleTime: QUERY_CONFIG.STALE_TIME
	});
}

export function usePopular() {
	return useQuery({
		queryKey: ["movies", "popular"],
		queryFn: () => getPopular(),
		staleTime: QUERY_CONFIG.STALE_TIME
	});
}

export function useTopRated() {
	return useQuery({
		queryKey: ["movies", "top_rated"],
		queryFn: () => getTopRated(),
		staleTime: QUERY_CONFIG.STALE_TIME
	});
}

export function useUpcoming() {
	return useQuery({
		queryKey: ["movies", "upcoming"],
		queryFn: () => getUpcoming(),
		staleTime: QUERY_CONFIG.STALE_TIME
	});
}

export function useMovieDetails(id: number) {
	return useQuery({
		queryKey: ["movie", id],
		queryFn: () => getMovieDetails(id),
		staleTime: QUERY_CONFIG.STALE_TIME,
		enabled: id > 0
	});
}

export function useSearchMovies(query: string) {
	return useQuery({
		queryKey: ["search", query],
		queryFn: () => searchMovies(query),
		staleTime: QUERY_CONFIG.STALE_TIME,
		enabled: query.length > 0,
		placeholderData: keepPreviousData
	});
}

export function useGenres() {
	return useQuery({
		queryKey: ["genres"],
		queryFn: () => getGenres(),
		staleTime: QUERY_CONFIG.GENRE_STALE_TIME
	});
}
