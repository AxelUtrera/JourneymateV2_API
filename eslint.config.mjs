import eslint from "@eslint/js";
import eslintTs from "typescript-eslint";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import stylisticJs from "@stylistic/eslint-plugin-js";
import perfectionist from "eslint-plugin-perfectionist";
import globals from "globals";

const applyConfig = (configs, files) => configs.map(config => ({ ...config, files }));

export default [
  eslint.configs.recommended,
  ...applyConfig(eslintTs.configs.recommended, ["**/*.ts"]),
  {
    ignores: [
      "**/node_modules/**",
      "**/build/**",
      "**/dist/**",
    ],
  },
  {
    name: "typescript",
    files: [
      "**/*.ts",
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        sourceType: "module",
      },
      globals: { ...globals.node },
    },
    plugins: {
      "@stylistic/ts": stylisticTs,
      "perfectionist": perfectionist,
    },
    rules: {
      "no-console": "error",
      "comma-dangle": "off",
      "require-await": "warn",
      "no-return-await": "warn",
      // "sort-imports": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@/comma-dangle": ["warn", "always-multiline"],
      "@typescript-eslint/unified-signatures": "warn",
      "@stylistic/ts/type-annotation-spacing": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/return-await": ["warn", "always"],
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "no-type-imports",
      }],
      "@typescript-eslint/array-type": ["error", {
        default: "array-simple",
      }],
      "@stylistic/ts/brace-style": ["error",
        "stroustrup",
        {
          allowSingleLine: false,
        }],
      "@stylistic/ts/block-spacing": ["error", "always"],
      "@stylistic/ts/no-extra-semi": "warn",
      "@stylistic/ts/no-extra-parens": "warn",
      "@stylistic/ts/object-curly-spacing": ["error",
        "always",
        {
          arraysInObjects: true,
          objectsInObjects: true,
        }],
      "@stylistic/ts/quote-props": ["error", "consistent-as-needed"],
      "@stylistic/ts/quotes": ["error",
        "double",
        {
          avoidEscape: false,
        }],
      "perfectionist/sort-imports": ["warn", {
        type: "natural",
        groups: [
          "builtin",
          "external",
          ["internal"],
          ["parent", "sibling"],
        ],
        order: "asc",
        "internalPattern": ["@src/*", "@shared/*", "@features/*"],
        "newlinesBetween": "never",
      }],
    },
  },
  {
    files: [
      "**/*.js", "**/*.mjs",
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "no-console": "error",
      "quotes": ["warn", "double"],
      "@stylistic/js/comma-dangle": ["warn", "always-multiline"],
    },
  },
]
