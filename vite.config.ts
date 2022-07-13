import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SSR = Boolean(process.env.SSR);

export default defineConfig({
  plugins: [react()],
  publicDir: !SSR && "public",
  resolve: { alias: [{ find: "src", replacement: resolve(process.cwd(), "src") }] },
  build: {
    manifest: !SSR,
    ssr: SSR && "server/handler.ts",
    outDir: SSR ? "netlify/functions" : "dist",
    rollupOptions: {
      input: "src/render/render.client.tsx",
    },
  },
});
