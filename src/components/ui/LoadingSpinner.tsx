import { View, ActivityIndicator } from "react-native";
import { COLORS } from "@/constants/theme";

/** Centered loading spinner */
export function LoadingSpinner() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color={COLORS.accent.DEFAULT} />
    </View>
  );
}
