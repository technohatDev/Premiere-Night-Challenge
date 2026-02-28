/** Formats a date string (YYYY-MM-DD) to a readable format */
export function formatDate(dateString: string): string {
	if (!dateString) return "TBA";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}

/** Extracts just the year from a date string */
export function getYear(dateString: string): string {
	if (!dateString) return "TBA";
	return dateString.split("-")[0];
}

/** Formats runtime minutes to "Xh Ym" */
export function formatRuntime(minutes: number): string {
	if (!minutes) return "N/A";
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
