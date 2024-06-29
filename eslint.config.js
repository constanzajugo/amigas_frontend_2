import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      // Add your custom rules here
    },
  },
  pluginJs.configs.recommended,
];
