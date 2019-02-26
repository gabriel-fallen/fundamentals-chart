module.exports = {
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "commonjs": true,
    "mocha": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "impliedStrict": true
    }
  },
  "globals": {
    "h": false
  },
  "rules": {
    "no-empty": 0,
    "no-console": 0,
    "no-empty-pattern": 0,
    "no-unused-vars": [0, { "varsIgnorePattern": "^h$" }],
    "no-cond-assign": 1,
    "semi": ["error", "always", { "omitLastInOneLineBlock": true}],
    "camelcase": 0,
    "comma-style": 2,
    "comma-dangle": [2, "never"],
    "indent": ["warn", 2, {"SwitchCase": 1, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
    "no-mixed-spaces-and-tabs": [2, "smart-tabs"],
    "no-trailing-spaces": [2, { "skipBlankLines": true }],
    "max-nested-callbacks": [2, 5],
    "no-eval": 2,
    "no-implied-eval": 2,
    "no-new-func": 2,
    "guard-for-in": 2,
    "eqeqeq": 1,
    "no-else-return": 2,
    "no-redeclare": 2,
    "no-dupe-keys": 2,
    "radix": 2,
    "strict": [2, "never"],
    "no-shadow": 0,
    "no-delete-var": 2,
    "no-undef-init": 2,
    "no-shadow-restricted-names": 2,
    "handle-callback-err": 0,
    "no-lonely-if": 2,
    "keyword-spacing": 2,
    "constructor-super": 2,
    "no-this-before-super": 2,
    "no-dupe-class-members": 2,
    "no-const-assign": 2,
    "prefer-spread": 2,
    "no-useless-concat": 2,
    "no-var": 2,
    "object-shorthand": 2,
    "prefer-arrow-callback": "warn"
  }
}
