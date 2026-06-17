import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import keystatic from "@keystatic/astro";

export default defineConfig({
  output: "static",
  adapter: node({ mode: "standalone" }),
  integrations: [react(), keystatic()],
  security: {
    allowedDomains: [{ hostname: "changelogs.mittwald.de", protocol: "https" }],
  },
});
