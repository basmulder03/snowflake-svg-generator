import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Set base from env for GitHub Pages ("/<repo>/") or root ("/") for local dev and other environments
    base: process.env.VITE_BASE || '/'
});
