
import type { Config } from "tailwindcss";

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#6366f1", // Indigo
					foreground: "#ffffff",
					light: "#818cf8",
					dark: "#4f46e5"
				},
				secondary: {
					DEFAULT: "#0ea5e9", // Sky blue
					foreground: "#ffffff",
					light: "#38bdf8",
					dark: "#0284c7"
				},
				success: {
					DEFAULT: "#10b981", // Emerald
					foreground: "#ffffff"
				},
				warning: {
					DEFAULT: "#f59e0b", // Amber
					foreground: "#ffffff"
				},
				danger: {
					DEFAULT: "#ef4444", // Red
					foreground: "#ffffff"
				},
				info: {
					DEFAULT: "#3b82f6", // Blue
					foreground: "#ffffff"
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
