export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
}

export interface MovieDetails extends Movie {
	genres: Genre[];
	runtime: number;
	tagline: string;
	status: string;
	budget: number;
	revenue: number;
}

export interface Genre {
	id: number;
	name: string;
}

export interface TMDbPaginatedResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}
