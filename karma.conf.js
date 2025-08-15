module.exports = function (config ) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
    ],

    client: {
      jasmine: {
        // Outras configurações úteis do Jasmine
        random: false,
        stopOnSpecFailure: false
      },
      clearContext: false // Essencial para o WebStorm!
    },

    jasmineHtmlReporter: {
      suppressAll: true,
      suppressFailed: true
    },

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/desafio2angular'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};
