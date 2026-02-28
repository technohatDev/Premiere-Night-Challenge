import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import type { Movie } from "@/api/types";
import { getPosterUrl } from "@/utils/imageUrl";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const CARD_WIDTH = 150;
const CARD_HEIGHT = CARD_WIDTH * 1.5; // 2:3 aspect ratio

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface MovieCardProps {
	movie: Movie;
}

/** Poster card used in horizontal carousels */
export const MovieCard = memo(function MovieCard({ movie }: MovieCardProps) {
	const router = useRouter();
	const scale = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }]
	}));

	const posterUrl = getPosterUrl(movie.poster_path);

	return (
		<AnimatedPressable
			style={[{ width: CARD_WIDTH }, animatedStyle]}
			onPressIn={() => {
				scale.value = withSpring(0.95);
			}}
			onPressOut={() => {
				scale.value = withSpring(1);
			}}
			onPress={() => {
				router.push(`/movie/${movie.id}`);
			}}>
			<View className="overflow-hidden rounded-xl bg-background-card">
				<View style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
					<Image
						source={posterUrl}
						style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
						contentFit="cover"
						placeholder={{ blurhash: "L6PZfSi_.AyE_3t7t7R**0o#DgR4" }}
						transition={300}
					/>
					{/* Rating badge */}
					<View className="absolute right-1.5 top-1.5 flex-row items-center rounded-md bg-black/70 px-1.5 py-0.5">
						<Ionicons
							name="star"
							size={10}
							color="#FFD700"
						/>
						<Text className="ml-0.5 text-xs font-semibold text-rating">
							{movie.vote_average.toFixed(1)}
						</Text>
					</View>
				</View>
				<Text
					className="px-2 py-2 text-xs text-text"
					numberOfLines={2}>
					{movie.title}
				</Text>
			</View>
		</AnimatedPressable>
	);
});

export { CARD_WIDTH };
