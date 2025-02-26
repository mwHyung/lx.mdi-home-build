/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/layout/**/*.{ts,tsx}",
    "./src/utils/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "2xl": "1.8rem",
        xl: "1.76rem",
        lg: "1.6rem",
        base: "1.4rem",
        sm: "1.28rem",
        xs: "1.16rem",
        "2xs": "1.4rem",
        "3xs": "0.92rem",
      },
      colors: {
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        focus: "hsl(var(--focus))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        main: {
          black: "hsl(var(--main-black))",
          gray: "hsl(var(--main-gray))",
          white: "hsl(var(--main-white))",
        },
        snow: {
          white: "hsl(var(--snow-white))",
        },
        gray: {
          ash: "hsl(var(--gray-ash))",
          charcoal: "hsl(var(--gray-charcoal))",
        },
        bsg: {
          navy: {
            DEFAULT: "hsl(var(--bsg-navy))",
            foreground: "hsl(var(--bsg-navy-foreground))",
          },
          blue: "hsl(var(--bsg-blue))",
          yellow: "hsl(var(--bsg-yellow))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          background: "hsl(var(--success-background))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          background: "hsl(var(--info-background))",
          foreground: "hsl(var(--info-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          background: "hsl(var(--warning-background))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          background: "hsl(var(--error-background))",
          foreground: "hsl(var(--error-foreground))",
          light: "hsl(var(--error-light))",
        },
        severity: {
          critical: "hsl(var(--severity-critical))",
          warning: "hsl(var(--severity-warning))",
          normal: "hsl(var(--severity-normal))",
          low: "hsl(var(--severity-low))",
        },
        tooltip: "#333",
        pub: {
          brown: "var(--p-brown)",
          darkB: "var(--p-darkB)",
          dark: "var(--p-dark)",
          red: "var(--p-red)",
          redD: "var(--p-redD)",
          redB: "var(--p-redB)",
          lightG: "var(--p-lightG)",
          lightE: "var(--p-lightE)",
          gray9: "var(--p-gray9)",
          gray6: "var(--p-gray6)",
          gray4: "var(--p-gray4)",
          grayB: "var(--p-grayB)",
          grayD: "var(--p-grayD)",
          grayA: "var(--p-grayA)",
          grayC: "var(--p-grayC)",
          bg: "var(--p-bg)",
          bgA: "var(--p-bgA)",
          nav: "var(--p-pc-nav)",
          "b-button": "var(--p-button-border)",
        },
      },
      gradientColorStops: {
        red: "var(--p-gradation-f)",
        black: "var(--p-gradation-t)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "toast-in": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "toast-out": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "alert-in": {
          "0%": { transform: "translateY(30%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "toast-in": "toast-in 0.1s ease-out",
        "toast-out": "toast-out 0.1s ease-out forwards",
        "alert-in": "alert-in 0.1s ease-out",
      },
      boxShadow: {
        pb: "0px 2px 8px 0px rgba(0, 0, 0, 0.06)",
        pc: "var(--p-pc-shadow)",
        pc2: "var(--p-pc-shadow2)",
        pc3: "var(--p-pc-shadow3)",
        pc4: "var(--p-pc-shadow4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
