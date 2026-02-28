import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

/** Error state with optional retry button */
export function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <Ionicons name="alert-circle-outline" size={48} color="#6B6B80" />
      <Text className="mt-4 text-center text-base text-text-muted">{message}</Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="mt-6 rounded-lg bg-accent px-6 py-3"
        >
          <Text className="font-semibold text-background">Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}
