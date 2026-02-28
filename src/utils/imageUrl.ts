import { IMAGE_SIZES, TMDB_IMAGE_BASE_URL } from "@/constants/tmdb";

type PosterSize = keyof typeof IMAGE_SIZES.poster;
type BackdropSize = keyof typeof IMAGE_SIZES.backdrop;

/** Constructs a full TMDb poster image URL */
export function getPosterUrl(path: string | null, size: PosterSize = "medium"): string | null {
	if (!path) return null;
	return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.poster[size]}${path}`;
}

/** Constructs a full TMDb backdrop image URL */
export function getBackdropUrl(path: string | null, size: BackdropSize = "medium"): string | null {
	if (!path) return null;
	return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES.backdrop[size]}${path}`;
}
