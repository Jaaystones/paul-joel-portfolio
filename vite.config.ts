import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// const repoName = "paul-joel-portfolio";

export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ This is key
    },
  },
}));
