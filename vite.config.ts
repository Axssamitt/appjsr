
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ATENÇÃO: Substitua '/NOME-DO-REPO/' pelo nome do seu repositório.
// Por ex: se seu repositório for 'contratos-pizzaria', coloque '/contratos-pizzaria/'.
const GH_PAGES_BASE = '/jphcontract/';

export default defineConfig(({ mode }) => ({
  server: {
    open: true,
    host: "::",
    port: 8080,
  },
  base: process.env.NODE_ENV === "production" ? GH_PAGES_BASE : "/",
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: true,
    sourcemap: true,
  },
}));
