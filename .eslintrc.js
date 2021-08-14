module.exports = {
  plugins: ["jest"],
  extends: ["plugin:github/recommended"],
  parserOptions: {
    ecmaVersion: 9,
  },
  rules: {
    "import/no-commonjs": "off",
    "i18n-text/no-en": "off",
    "filenames/match-regex": [2, "^[a-z_.]+$", true],
  },
  env: {
    node: true,
    es6: true,
    "jest/globals": true,
  },
}
