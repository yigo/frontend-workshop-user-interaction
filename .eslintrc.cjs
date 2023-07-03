module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        bracketSpacing: true,
        endOfLine: "lf",
        jsxBracketSameLine: true,
        jsxSingleQuote: false,
        printWidth: 80,
        quoteProps: "as-needed",
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        singleAttributePerLine: false,
        singleQuote: false,
        useTabs: false,
      },
    ],
  },
};
