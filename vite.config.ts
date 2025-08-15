import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, "src/main.tsx"),
        server: path.resolve(__dirname, "src/entry-server.tsx"),
      },
    },
  },
});
