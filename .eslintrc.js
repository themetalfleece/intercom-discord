module.exports = {
    "root": true, // to make sure eslint does not search above here for another eslintrc
    "env": {
        "browser": false,
        "node": true,
        "commonjs": false,
        "mocha": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2017,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "indent": [
            "off",
            4
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "off",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "no-console": [
            "warn"
        ],
        "no-unused-vars": [
            "warn", { "ignoreRestSiblings": true }
        ],
        "no-empty": [
            "warn"
        ]
    }
};