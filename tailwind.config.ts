import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink: '#11100e', bone: '#f2eee7', brass: '#b69a68' }, fontFamily: { sans: ['var(--font-inter)', 'Arial', 'sans-serif'], display: ['var(--font-cormorant)', 'Georgia', 'serif'] } } }, plugins: [] };
export default config;
