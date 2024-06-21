import a11y from "eslint-plugin-vuejs-accessibility";
import pluginVue from "eslint-plugin-vue";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  ...a11y.configs["flat/recommended"],
  {
    "name": "vuejs-accessibility:overrides",
    "rules": Object.keys(a11y.rules).reduce((collection, rule) => {
      collection[`vuejs-accessibility/${rule}`] = "warn";
      return collection;
    }, {}),
  },
  ...pluginVue.configs["flat/strongly-recommended"],
  {
    "name": "vue/overrides",
    "rules": {
      "vue/multi-word-component-names": "off",
      "vue/no-console": "error",
    },
  },
  {
    "name": "custom",
    "rules": {
      "curly": ["error", "multi-line", "consistent"],
      "dot-notation": "error",
      "max-nested-callbacks": ["warn", { "max": 4 }],
      "no-console": "off",
      "no-undefined": "off",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "error",
      "no-inline-comments": "off",
      "no-lonely-if": "error",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "no-undef-init": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "yoda": ["error", "never", { "exceptRange": true }],
    },
  },
);
