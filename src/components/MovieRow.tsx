import { CARD_WIDTH, MovieCard } from "./MovieCard";
import { FlatList, Text, View } from "react-native";

import type { Movie } from "@/api/types";

const ITEM_WIDTH = CARD_WIDTH + 12; // card width + gap

interface MovieRowProps {
	title: string;
	movies: Movie[];
}

/** Horizontal carousel section with a title and scrollable movie cards */
export function MovieRow({ title, movies }: MovieRowProps) {
	return (
		<View className="mb-6">
			<Text className="mb-3 px-4 text-lg font-bold text-text">{title}</Text>
			<FlatList
				data={movies}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => <MovieCard movie={item} />}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 16 }}
				ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
				getItemLayout={(_, index) => ({
					length: ITEM_WIDTH,
					offset: ITEM_WIDTH * index,
					index
				})}
				maxToRenderPerBatch={8}
				windowSize={5}
			/>
		</View>
	);
}
