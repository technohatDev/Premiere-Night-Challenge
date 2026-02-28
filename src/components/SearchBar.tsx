import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

/** Search input with icon and clear button */
export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="mx-4 mb-3 flex-row items-center rounded-xl bg-background-card px-3 py-2.5">
      <Ionicons name="search" size={20} color={COLORS.text.muted} />
      <TextInput
        className="ml-2 flex-1 text-base text-text"
        placeholder="Search films..."
        placeholderTextColor={COLORS.text.muted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} hitSlop={8}>
          <Ionicons name="close-circle" size={20} color={COLORS.text.muted} />
        </Pressable>
      )}
    </View>
  );
}
