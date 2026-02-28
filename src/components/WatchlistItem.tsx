import { memo } from "react";
import { Pressable, Text, View } from "react-native";

import type { Movie } from "@/api/types";
import { useWatchlist } from "@/hooks/useWatchlist";
import { getYear } from "@/utils/formatDate";
import { getPosterUrl } from "@/utils/imageUrl";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

interface WatchlistItemProps {
	movie: Movie;
}

/** Row item for the watchlist screen */
export const WatchlistItem = memo(function WatchlistItem({ movie }: WatchlistItemProps) {
	const router = useRouter();
	const { removeFromWatchlist } = useWatchlist();
	const posterUrl = getPosterUrl(movie.poster_path, "small");

	return (
		<Pressable
			onPress={() => {
				router.push(`/movie/${movie.id}`);
			}}
			className="mx-4 mb-3 flex-row items-center overflow-hidden rounded-xl bg-background-card p-3">
			<Image
				source={posterUrl}
				style={{ width: 56, height: 84 }}
				contentFit="cover"
				className="rounded-lg"
				placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
			/>
			<View className="ml-3 flex-1">
				<Text
					className="text-base font-semibold text-text"
					numberOfLines={2}>
					{movie.title}
				</Text>
				<Text className="mt-1 text-sm text-text-secondary">{getYear(movie.release_date)}</Text>
				<View className="mt-1 flex-row items-center">
					<Ionicons
						name="star"
						size={12}
						color="#FFD700"
					/>
					<Text className="ml-1 text-sm text-rating">{movie.vote_average.toFixed(1)}</Text>
				</View>
			</View>
			<Pressable
				onPress={() => {
					removeFromWatchlist(movie.id);
				}}
				hitSlop={12}
				className="ml-2 rounded-full bg-background-elevated p-2">
				<Ionicons
					name="trash-outline"
					size={18}
					color="#E74C3C"
				/>
			</Pressable>
		</Pressable>
	);
});
