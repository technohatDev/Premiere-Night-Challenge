import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: COLORS.background.card,
					borderTopColor: COLORS.background.elevated,
					borderTopWidth: 1
				},
				tabBarActiveTintColor: COLORS.accent.DEFAULT,
				tabBarInactiveTintColor: COLORS.text.muted
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Spotlight",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="film-outline"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="watchlist"
				options={{
					title: "Watchlist",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="bookmark-outline"
							size={size}
							color={color}
						/>
					)
				}}
			/>
		</Tabs>
	);
}
