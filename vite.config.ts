import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// Optional: swap in `vite-plugin-inspect` for transform-pipeline debugging
// import Inspect from "vite-plugin-inspect";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    // Inspect(),  // ← uncomment + `pnpm add -D vite-plugin-inspect` to debug transforms
    react(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});