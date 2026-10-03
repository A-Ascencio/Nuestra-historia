import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "node:fs";
import path from "node:path";

const ICONS_DIR = path.resolve(process.cwd(), "public/icons");

// Lee el ancho y alto reales de un PNG desde su cabecera
function readPngSize(file) {
  const fd = fs.openSync(file, "r");
  try {
    const buf = Buffer.alloc(24);
    fs.readSync(fd, buf, 0, 24, 0);
    if (buf.readUInt32BE(0) !== 0x89504e47) return null; // no es PNG
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  } finally {
    fs.closeSync(fd);
  }
}

// Recorre public/icons/android, ios y windows y arma la lista del manifest
function collectIcons() {
  if (!fs.existsSync(ICONS_DIR)) return [];
  const icons = [];

  for (const folder of fs.readdirSync(ICONS_DIR)) {
    const dir = path.join(ICONS_DIR, folder);
    if (!fs.statSync(dir).isDirectory()) continue;

    for (const file of fs.readdirSync(dir)) {
      if (!file.toLowerCase().endsWith(".png")) continue;
      const size = readPngSize(path.join(dir, file));
      if (!size) continue;

      icons.push({
        src: `icons/${folder}/${encodeURI(file)}`,
        sizes: `${size.w}x${size.h}`,
        type: "image/png",
        purpose: "any",
      });
    }
  }
  return icons;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",

      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      injectRegister: "auto",

      // Permite precargar también los íconos más grandes
      injectManifest: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },

      includeAssets: ["icons/**/*.png"],

      manifest: {
        name: "Nuestra Historia 💕",
        short_name: "Nuestra Historia",
        description: "Nuestra app de pareja",
        lang: "es",
        id: "/",
        start_url: "/",
        scope: "/",
        theme_color: "#2dbfa3",
        background_color: "#ffffff",
        orientation: "portrait",
        display_override: [
          "fullscreen",
          "minimal-ui",
          "window-control-overlay",
        ],
        display: "standalone",
        screenshots: [
          {
            src: "screenshot-desktop.png",
            sizes: "1848x840",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshot-mobile.png",
            sizes: "397x706",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
        icons: [
          ...collectIcons(),
          // Versiones "maskable" para que Android recorte bien el ícono
          {
            src: "icons/android/launchericon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/android/launchericon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
