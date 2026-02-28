import { Platform } from "react-native";

export const TIMING = {
	ONE_SECOND: 1000,
	ONE_MINUTE: 60 * 1000,
	FIVE_MINUTES: 5 * 60 * 1000,
	THIRTY_MINUTES: 30 * 60 * 1000
} as const;

export const STORAGE_KEYS = {
	WATCHLIST: "watchlist-storage"
} as const;

export const PLATFORM = {
	IS_ANDROID: Platform.OS === "android",
	IS_IOS: Platform.OS === "ios"
} as const;

export const QUERY_CONFIG = {
	STALE_TIME: TIMING.FIVE_MINUTES,
	GENRE_STALE_TIME: TIMING.THIRTY_MINUTES,
	GC_TIME: 10 * TIMING.ONE_MINUTE,
	RETRY_COUNT: 2
} as const;
