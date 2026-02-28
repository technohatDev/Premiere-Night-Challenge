import globals from "globals";

import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";

export default [
	// Base JavaScript configuration
	js.configs.recommended,

	// Global configuration for all files
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			},
			ecmaVersion: 2020,
			sourceType: "module"
		},
		rules: {
			"prefer-const": "warn",
			"no-unused-vars": "error",
			"array-callback-return": "error",
			"no-restricted-imports": ["error", { patterns: ["../"] }]
		}
	},

	// TypeScript configuration
	{
		files: ["*.ts", "*.tsx", "**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: ["./tsconfig.json"],
				sourceType: "module",
				ecmaVersion: 2020
			}
		},
		plugins: {
			"@typescript-eslint": tseslint
		},
		rules: {
			// Extend recommended TypeScript rules
			...tseslint.configs.recommended.rules,

			// Custom TypeScript rules
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/restrict-plus-operands": "error",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-confusing-void-expression": "error",
			"@typescript-eslint/no-duplicate-enum-values": "warn",
			"@typescript-eslint/no-mixed-enums": "warn",
			"@typescript-eslint/no-unnecessary-condition": "off",
			"@typescript-eslint/prefer-enum-initializers": "warn",
			"no-console": ["error", { allow: ["warn", "error", "info"] }],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "variable",
					types: ["boolean"],
					format: ["PascalCase"],
					prefix: ["is", "are", "has", "does", "can", "should"]
				}
			],

			// Turn off base rule in favor of TypeScript version
			"no-unused-vars": "off"
		}
	},

	// React hooks configuration for all files
	{
		plugins: {
			"react-hooks": reactHooks
		},
		rules: {
			"react-hooks/exhaustive-deps": "off",
			"react/display-name": "off"
		}
	},
	{
		ignores: [".expo/", "node_modules/", "android/", "ios/", "dist/"]
	}
];
