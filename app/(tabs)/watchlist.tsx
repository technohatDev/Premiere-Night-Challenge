import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { WatchlistItem } from "@/components/WatchlistItem";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function WatchlistScreen() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { watchlist } = useWatchlist();

	return (
		<View
			className="flex-1 bg-background"
			style={{ paddingTop: insets.top }}>
			{/* Header */}
			<View className="flex-row items-center justify-between px-4 pb-4 pt-4">
				<Text className="text-2xl font-bold text-text">My Watchlist</Text>
				{watchlist.length > 0 && (
					<Text className="text-sm text-text-secondary">
						{watchlist.length} {watchlist.length === 1 ? "film" : "films"}
					</Text>
				)}
			</View>

			{watchlist.length === 0 ? (
				/* Empty State */
				<View className="flex-1 items-center justify-center px-8">
					<Ionicons
						name="bookmark-outline"
						size={64}
						color="#6B6B80"
					/>
					<Text className="mt-4 text-center text-lg font-semibold text-text-secondary">
						Your watchlist is empty
					</Text>
					<Text className="mt-2 text-center text-sm text-text-muted">
						Browse the Spotlight tab and save films for your next premiere night.
					</Text>
					<Pressable
						onPress={() => {
							router.navigate("/(tabs)");
						}}
						className="mt-6 rounded-xl bg-accent px-6 py-3">
						<Text className="font-bold text-background">Discover Films</Text>
					</Pressable>
				</View>
			) : (
				<FlatList
					data={watchlist}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => <WatchlistItem movie={item} />}
					contentContainerStyle={{ paddingBottom: 16 }}
				/>
			)}
		</View>
	);
}
