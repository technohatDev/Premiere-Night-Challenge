const COLORS = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	gray: "\x1b[90m"
} as const;

const ICONS = {
	error: "x",
	warn: "!",
	info: "i",
	success: "v",
	debug: "~"
} as const;

function timestamp() {
	return new Date().toLocaleTimeString("en-US", { hour12: false });
}

function format(level: keyof typeof ICONS, color: string, message: string, data?: unknown) {
	const prefix = `${color}[${ICONS[level]}] ${timestamp()}${COLORS.reset}`;
	if (data !== undefined) {
		console.info(`${prefix} ${message}`, data);
	} else {
		console.info(`${prefix} ${message}`);
	}
}

export const logger = {
	error: (message: string, data?: unknown) => {
		format("error", COLORS.red, message, data);
	},
	warn: (message: string, data?: unknown) => {
		format("warn", COLORS.yellow, message, data);
	},
	info: (message: string, data?: unknown) => {
		format("info", COLORS.blue, message, data);
	},
	success: (message: string, data?: unknown) => {
		format("success", COLORS.green, message, data);
	},
	debug: (message: string, data?: unknown) => {
		if (__DEV__) format("debug", COLORS.gray, message, data);
	}
};
