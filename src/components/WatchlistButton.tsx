import { Pressable, Text } from "react-native";

import type { Movie } from "@/api/types";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Ionicons } from "@expo/vector-icons";

interface WatchlistButtonProps {
	movie: Movie;
}

/** Toggle button for adding/removing a movie from the watchlist */
export function WatchlistButton({ movie }: WatchlistButtonProps) {
	const { isInWatchlist, toggleWatchlist } = useWatchlist();
	const isInList = isInWatchlist(movie.id);

	return (
		<Pressable
			onPress={() => {
				toggleWatchlist(movie);
			}}
			className={`mt-6 flex-row items-center justify-center rounded-xl py-4 ${
				isInList ? "bg-accent" : "border border-accent bg-transparent"
			}`}>
			<Ionicons
				name={isInList ? "checkmark-circle" : "add-circle-outline"}
				size={22}
				color={isInList ? "#0F0F1A" : "#E4A853"}
			/>
			<Text className={`ml-2 text-base font-bold ${isInList ? "text-background" : "text-accent"}`}>
				{isInList ? "In Watchlist" : "Add to Watchlist"}
			</Text>
		</Pressable>
	);
}
