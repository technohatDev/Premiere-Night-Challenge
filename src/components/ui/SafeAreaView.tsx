import type { ReactNode } from "react";
import type { ViewProps } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

interface SafeAreaViewProps extends ViewProps {
	children: ReactNode;
}

/** Safe area wrapper with dark background */
export function SafeAreaView({ children, className, ...props }: SafeAreaViewProps) {
	return (
		<RNSafeAreaView
			className={`flex-1 bg-background ${className ?? ""}`}
			{...props}>
			{children}
		</RNSafeAreaView>
	);
}
