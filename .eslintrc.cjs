module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: ["plugin:vue/vue3-recommended", "@vue/typescript/recommended", "plugin:storybook/recommended"],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["warn", 2],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }]
  }
};