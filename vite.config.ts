/// <reference types="vitest" />

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
    plugins: [solid()],

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
