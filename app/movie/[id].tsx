import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { WatchlistButton } from "@/components/WatchlistButton";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMovieDetails } from "@/hooks/useMovies";
import { formatRuntime, getYear } from "@/utils/formatDate";
import { getBackdropUrl, getPosterUrl } from "@/utils/imageUrl";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function MovieDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const movieId = Number(id);

	const { data: movie, isLoading, isError, refetch } = useMovieDetails(movieId);

	if (isLoading) return <LoadingSpinner />;
	if (isError || !movie) {
		return (
			<ErrorState
				message="Could not load movie details"
				onRetry={refetch}
			/>
		);
	}

	const backdropUrl = getBackdropUrl(movie.backdrop_path, "large");
	const posterUrl = getPosterUrl(movie.poster_path, "medium");

	return (
		<View className="flex-1 bg-background">
			<ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
				{/* Backdrop */}
				<View style={{ height: 280 }}>
					{backdropUrl ? (
						<Image
							source={backdropUrl}
							style={{ width: "100%", height: 280 }}
							contentFit="cover"
							transition={400}
						/>
					) : (
						<View className="h-full w-full bg-background-card" />
					)}
					{/* Dark fade overlay */}
					<LinearGradient
						colors={["transparent", "#0F0F1A"]}
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							height: 120
						}}
					/>
					{/* Back button */}
					<Pressable
						onPress={() => {
							router.back();
						}}
						style={{ top: insets.top + 8 }}
						className="absolute left-4 rounded-full bg-black/50 p-2">
						<Ionicons
							name="arrow-back"
							size={22}
							color="white"
						/>
					</Pressable>
				</View>

				{/* Poster + Meta row */}
				<View className="-mt-16 flex-row px-4">
					<Image
						source={posterUrl}
						style={{ width: 120, height: 180, borderRadius: 12 }}
						contentFit="cover"
						placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
					/>
					<View className="ml-4 flex-1 justify-end pb-1">
						<Text className="text-xl font-bold text-text">{movie.title}</Text>
						<View className="mt-2 flex-row flex-wrap items-center gap-3">
							<Text className="text-sm text-text-secondary">{getYear(movie.release_date)}</Text>
							{movie.runtime > 0 && (
								<Text className="text-sm text-text-secondary">{formatRuntime(movie.runtime)}</Text>
							)}
							<View className="flex-row items-center">
								<Ionicons
									name="star"
									size={14}
									color="#FFD700"
								/>
								<Text className="ml-1 text-sm font-semibold text-rating">
									{movie.vote_average.toFixed(1)}
								</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Genre tags */}
				{movie.genres.length > 0 && (
					<View className="mt-4 flex-row flex-wrap gap-2 px-4">
						{movie.genres.map((genre) => (
							<View
								key={genre.id}
								className="rounded-full bg-background-elevated px-3 py-1">
								<Text className="text-xs text-text-secondary">{genre.name}</Text>
							</View>
						))}
					</View>
				)}

				{/* Tagline */}
				{movie.tagline ? (
					<Text className="mt-4 px-4 text-sm italic text-text-muted">"{movie.tagline}"</Text>
				) : null}

				{/* Overview */}
				{movie.overview ? (
					<View className="mt-4 px-4">
						<Text className="mb-2 text-base font-semibold text-text">Synopsis</Text>
						<Text className="text-sm leading-6 text-text-secondary">{movie.overview}</Text>
					</View>
				) : null}

				{/* Watchlist Button */}
				<View className="mt-2 px-4">
					<WatchlistButton movie={movie} />
				</View>
			</ScrollView>
		</View>
	);
}
