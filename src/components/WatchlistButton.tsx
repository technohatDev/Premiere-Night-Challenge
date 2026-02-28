import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWatchlist } from "@/hooks/useWatchlist";
import type { Movie } from "@/api/types";

interface WatchlistButtonProps {
  movie: Movie;
}

/** Toggle button for adding/removing a movie from the watchlist */
export function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <Pressable
      onPress={() => toggleWatchlist(movie)}
      className={`mt-6 flex-row items-center justify-center rounded-xl py-4 ${
        inWatchlist ? "bg-accent" : "border border-accent bg-transparent"
      }`}
    >
      <Ionicons
        name={inWatchlist ? "checkmark-circle" : "add-circle-outline"}
        size={22}
        color={inWatchlist ? "#0F0F1A" : "#E4A853"}
      />
      <Text
        className={`ml-2 text-base font-bold ${
          inWatchlist ? "text-background" : "text-accent"
        }`}
      >
        {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </Text>
    </Pressable>
  );
}
