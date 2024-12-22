import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        transparent: "transparent",
        current: "currentColor",

        black: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#000000",
        },

        // Primary Color
        limedSpruce: {
          50: "#f2f9f9",
          100: "#ddedf0",
          400: "#5ea2b2",
          500: "#438697",
          600: "#3a6e80",
          700: "#345b6a",
          800: "#314d59",
          900: "#2f4550",
          950: "#1a2a32",
        },

        // TBD
        bismark: {
          50: "#f4f6f7",
          100: "#e2e8eb",
          200: "#c9d4d8",
          300: "#a3b4bd",
          400: "#768d9a",
          500: "#586f7c",
          600: "#4e606c",
          700: "#43515b",
          800: "#3c454e",
          900: "#363d43",
          950: "#21262b",
        },

        // Secondary
        jetStream: {
          50: "#f2f9f9",
          100: "#deefee",
          200: "#b8dbd9",
          300: "#96cac8",
          400: "#64acaa",
          500: "#49918f",
          600: "#3f797b",
          700: "#386366",
          800: "#345356",
          900: "#2f474a",
          950: "#1c2e30",
        },

        // Tertiary
        whiteLilac: {
          50: "#f4f4f9",
          100: "#e7e7f2",
          200: "#d5d5e8",
          300: "#b8b9d8",
          400: "#9697c4",
          500: "#807db4",
          600: "#726ba5",
          700: "#695f96",
          800: "#5a517c",
          900: "#4a4464",
          950: "#302d3e",
        },
        meta: {
          1: '#DC3545',
          2: '#EFF2F7',
          3: '#10B981',
          4: '#313D4A',
          5: '#259AE6',
          6: '#FFBA00',
          7: '#FF6766',
          8: '#F0950C',
          9: '#E5E7EB',
          10: '#0FADCF',
        },
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        switcher:
          '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      },
    
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-250px * 14))' },
        },
      },
    },
    safelist: [
      'animate-spin', 
    ],
  },
  
  plugins: [],
  
  
}
export default config
