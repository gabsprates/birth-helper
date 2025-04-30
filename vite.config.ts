/// <reference types="vitest" />

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        solid(),

        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            manifest: {
                theme_color: "#dda15e",
                background_color: "#bc6c25",
                icons: [
                    {
                        purpose: "maskable",
                        sizes: "512x512",
                        src: "icon512_maskable.png",
                        type: "image/png",
                    },
                    {
                        purpose: "any",
                        sizes: "512x512",
                        src: "icon512_rounded.png",
                        type: "image/png",
                    },
                ],
                orientation: "any",
                display: "standalone",
                dir: "ltr",
                lang: "en-US",
                name: "Birth Helper",
                short_name: "Birth Helper",
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
        }),
    ],

    base: "/birth-helper/",

    build: {
        outDir: "docs",
    },

    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./testSetup.ts"],
    },
});
