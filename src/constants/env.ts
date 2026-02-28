import { z } from "zod";

const envSchema = z.object({
	EXPO_PUBLIC_TMDB_API_KEY: z.string().min(1, "EXPO_PUBLIC_TMDB_API_KEY is required in .env")
});

const parsed = envSchema.safeParse({
	EXPO_PUBLIC_TMDB_API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY
});

if (!parsed.success) {
	const message = parsed.error.issues.map((i) => i.message).join("\n");
	console.error(`Environment validation failed:\n${message}`);
}

export const env = {
	TMDB_API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY ?? ""
};
