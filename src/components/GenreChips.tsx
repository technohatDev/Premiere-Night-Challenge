import { FlatList, Pressable, Text } from "react-native";

import type { Genre } from "@/api/types";

const ALL_GENRE: Genre = { id: -1, name: "All" };

interface GenreChipsProps {
	genres: Genre[];
	selectedGenreId: number | null;
	onSelect: (genreId: number | null) => void;
}

/** Horizontal scrollable genre filter pills */
export function GenreChips({ genres, selectedGenreId, onSelect }: GenreChipsProps) {
	const data = [ALL_GENRE, ...genres];

	return (
		<FlatList
			data={data}
			keyExtractor={(item) => String(item.id)}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
			ItemSeparatorComponent={() => <Pressable style={{ width: 8 }} />}
			renderItem={({ item }) => {
				const isActive = item.id === -1 ? selectedGenreId === null : selectedGenreId === item.id;

				return (
					<Pressable
						onPress={() => {
							onSelect(item.id === -1 ? null : item.id);
						}}
						className={`items-center justify-center rounded-full px-4 ${
							isActive ? "bg-accent" : "bg-background-elevated"
						}`}
						style={{ height: 36 }}>
						<Text
							className={`font-medium ${isActive ? "text-background" : "text-text-secondary"}`}
							style={{ fontSize: 13, lineHeight: 18 }}>
							{item.name}
						</Text>
					</Pressable>
				);
			}}
		/>
	);
}
