import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.globalbills.com.ng:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});