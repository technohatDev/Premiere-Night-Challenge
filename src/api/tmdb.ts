import type { Genre, Movie, MovieDetails, TMDbPaginatedResponse } from "./types";

import { env } from "@/constants/env";
import { TMDB_BASE_URL } from "@/constants/tmdb";

async function tmdbFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
	const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
	url.searchParams.set("api_key", env.TMDB_API_KEY);
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.set(key, value);
		});
	}

	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new Error(`TMDb API error: ${response.status} ${response.statusText}`);
	}
	return response.json() as Promise<T>;
}

/** Fetches currently playing movies */
export function getNowPlaying(page = 1) {
	return tmdbFetch<TMDbPaginatedResponse<Movie>>("/movie/now_playing", {
		page: String(page)
	});
}

/** Fetches popular movies */
export function getPopular(page = 1) {
	return tmdbFetch<TMDbPaginatedResponse<Movie>>("/movie/popular", {
		page: String(page)
	});
}

/** Fetches top-rated movies */
export function getTopRated(page = 1) {
	return tmdbFetch<TMDbPaginatedResponse<Movie>>("/movie/top_rated", {
		page: String(page)
	});
}

/** Fetches upcoming movies */
export function getUpcoming(page = 1) {
	return tmdbFetch<TMDbPaginatedResponse<Movie>>("/movie/upcoming", {
		page: String(page)
	});
}

/** Fetches detailed information for a single movie */
export function getMovieDetails(id: number) {
	return tmdbFetch<MovieDetails>(`/movie/${id}`);
}

/** Searches movies by query string */
export function searchMovies(query: string, page = 1) {
	return tmdbFetch<TMDbPaginatedResponse<Movie>>("/search/movie", {
		query,
		page: String(page)
	});
}

/** Fetches the list of movie genres */
export function getGenres() {
	return tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
}
