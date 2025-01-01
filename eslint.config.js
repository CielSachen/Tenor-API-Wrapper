// @ts-check

import cielsachenConfigs from "@cielsachen/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config({ ignores: ["dist/"] }, ...cielsachenConfigs.base, {
  languageOptions: {
    parserOptions: {
      projectService: { allowDefaultProject: ["*.config.js", "*.config.ts"], defaultProject: "tsconfig.json" },
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
