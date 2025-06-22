import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  alias: { three: "three" },
  build: {
    target: "esnext",
    sourcemap: false,
  },
  optimizeDeps: {
    include: ["three"],
  },
  assetsInclude: ["**/*.glb", "**/*.gltf", "**/*.hdr"],
});
