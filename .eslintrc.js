module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "airbnb-base",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["prettier", "jest"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "script",
  },
  rules: {
    "func-names": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": "off",
    "node/shebang": "off",
    "jest/expect-expect": "off",
    "jest/no-done-callback": "off",
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "node/no-unpublished-require": "off",
    "no-console": "warn",
    "no-plusplus": "off",
    "no-underscore-dangle": ["warn", { allowAfterThis: true }],
    "prefer-destructuring": [
      "warn",
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        prev: "function",
        next: "function",
      },
      {
        blankLine: "always",
        prev: "function",
        next: "block",
      },
      {
        blankLine: "always",
        prev: "block",
        next: "function",
      },
    ],
  },
};
