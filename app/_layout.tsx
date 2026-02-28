// eslint-disable-next-line no-restricted-imports
import "../global.css";
import Toast from "react-native-toast-message";

import { QUERY_CONFIG } from "@/constants/app";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: QUERY_CONFIG.RETRY_COUNT,
			gcTime: QUERY_CONFIG.GC_TIME
		}
	},
	queryCache: new QueryCache({
		onError: (error) => {
			Toast.show({
				type: "error",
				text1: "Something went wrong",
				text2: error.message
			});
		}
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			Toast.show({
				type: "error",
				text1: "Action failed",
				text2: error.message
			});
		}
	})
});

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "#0F0F1A" },
					animation: "slide_from_right"
				}}
			/>
			<Toast
				position="top"
				topOffset={60}
			/>
		</QueryClientProvider>
	);
}
