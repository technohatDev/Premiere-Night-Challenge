import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Movie } from "@/api/types";
import { GenreChips } from "@/components/GenreChips";
import { MovieRow } from "@/components/MovieRow";
import { SearchBar } from "@/components/SearchBar";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useDebounce } from "@/hooks/useDebounce";
import {
	useGenres,
	useNowPlaying,
	usePopular,
	useSearchMovies,
	useTopRated,
	useUpcoming
} from "@/hooks/useMovies";
import { getPosterUrl } from "@/utils/imageUrl";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export default function SpotlightScreen() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
	const debouncedQuery = useDebounce(searchQuery, 300);

	const nowPlaying = useNowPlaying();
	const popular = usePopular();
	const topRated = useTopRated();
	const upcoming = useUpcoming();
	const genres = useGenres();
	const search = useSearchMovies(debouncedQuery);

	const isSearching = debouncedQuery.length > 0;

	const filterByGenre = useCallback(
		(movies: Movie[] | undefined) => {
			if (!movies) return [];
			if (selectedGenreId === null) return movies;
			return movies.filter((m) => m.genre_ids.includes(selectedGenreId));
		},
		[selectedGenreId]
	);

	const searchResults = useMemo(
		() => filterByGenre(search.data?.results),
		[search.data?.results, filterByGenre]
	);

	const isLoading = !isSearching && nowPlaying.isLoading && popular.isLoading;

	const hasError =
		!isSearching && nowPlaying.isError && popular.isError && topRated.isError && upcoming.isError;

	if (isLoading) return <LoadingSpinner />;
	if (hasError) {
		return (
			<ErrorState
				message="Could not load movies"
				onRetry={() => {
					nowPlaying.refetch();
					popular.refetch();
				}}
			/>
		);
	}

	return (
		<View
			className="flex-1 bg-background"
			style={{ paddingTop: insets.top }}>
			{/* Header */}
			<View className="px-4 pb-2 pt-4">
				<Text className="text-2xl font-bold text-accent">Premiere Night</Text>
			</View>

			{/* Search */}
			<SearchBar
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			{/* Genre Chips */}
			{genres.data && (
				<GenreChips
					genres={genres.data.genres}
					selectedGenreId={selectedGenreId}
					onSelect={setSelectedGenreId}
				/>
			)}

			{isSearching ? (
				/* Search Results Grid */
				search.isLoading ? (
					<LoadingSpinner />
				) : searchResults.length === 0 ? (
					<View className="flex-1 items-center justify-center">
						<Ionicons
							name="search-outline"
							size={48}
							color="#6B6B80"
						/>
						<Text className="mt-4 text-text-muted">No results found</Text>
					</View>
				) : (
					<FlatList
						data={searchResults}
						keyExtractor={(item) => String(item.id)}
						numColumns={2}
						contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
						columnWrapperStyle={{ gap: 12 }}
						ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
						renderItem={({ item }) => (
							<Pressable
								onPress={() => {
									router.push(`/movie/${item.id}`);
								}}
								className="flex-1"
								style={{ maxWidth: "48%" }}>
								<View className="overflow-hidden rounded-xl bg-background-card">
									<Image
										source={getPosterUrl(item.poster_path)}
										style={{ width: "100%", aspectRatio: 2 / 3 }}
										contentFit="cover"
										placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
										transition={300}
									/>
									<View className="p-2">
										<Text
											className="text-sm font-medium text-text"
											numberOfLines={2}>
											{item.title}
										</Text>
										<View className="mt-1 flex-row items-center">
											<Ionicons
												name="star"
												size={10}
												color="#FFD700"
											/>
											<Text className="ml-1 text-xs text-rating">{item.vote_average.toFixed(1)}</Text>
										</View>
									</View>
								</View>
							</Pressable>
						)}
					/>
				)
			) : (
				/* Movie Carousels */
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 16 }}>
					{nowPlaying.data && (
						<MovieRow
							title="Now Playing"
							movies={filterByGenre(nowPlaying.data.results)}
						/>
					)}
					{popular.data && (
						<MovieRow
							title="Popular"
							movies={filterByGenre(popular.data.results)}
						/>
					)}
					{topRated.data && (
						<MovieRow
							title="Top Rated"
							movies={filterByGenre(topRated.data.results)}
						/>
					)}
					{upcoming.data && (
						<MovieRow
							title="Upcoming"
							movies={filterByGenre(upcoming.data.results)}
						/>
					)}
				</ScrollView>
			)}
		</View>
	);
}
