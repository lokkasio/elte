// Karma configuration

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['qunit'],

    files: ['node_modules/qunit-dom/dist/qunit-dom.js', 'dist/test.js'],

    reporters: ['dots'],

    autoWatch: false,

    browsers: ['FirefoxHeadless'],

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },

    singleRun: true,
  })
}
