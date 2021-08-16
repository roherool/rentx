module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@config": "./src/config",
          "@modules": "./src/modules",
          "@shared": "./src/shared",
          "@container": "./src/shared/container",
          "@errors": "./src/shared/errors",
          "@extensions": "./src/shared/extensions",
          "@infra": "./src/shared/infra",
          "@utils": "./src/utils"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ]
}