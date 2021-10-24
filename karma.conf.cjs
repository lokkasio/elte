const { CI } = process.env
const specsGlob = "test/**/*.spec.js"

module.exports = (config) =>
  config.set({
    frameworks: ["qunit"],
    files: [{ pattern: specsGlob, type: "module" }],
    reporters: ["dots"],
    autoWatch: !CI,
    singleRun: CI,
    client: {
      clearContext: CI,
      qunit: {
        showUI: !CI,
      },
    },
    browsers: ["FirefoxHeadless"],
    preprocessors: {
      [specsGlob]: ["esbuild"],
    },
  })
