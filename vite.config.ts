import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://frontend-assessment-630736206587.asia-northeast1.run.app",
        changeOrigin: true,
      },
    },
  },
});
