module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'lib/d3.js',
            {pattern: 'src/app/**/growthChart.js', included: true},
            {pattern: 'src/spec/**/*.spec.js', included: true}
        ],
        preprocessors: {
            '**/src/app/*.js': ['coverage']
        },
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],
        reporters: ['progress', 'coverage'],
        port: 9878,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autowatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity,
        coverageReporter: {
            includeAllSources: false,
            dir: 'coverage/',
            reporters: [
                { type: "html", subdir: "html" },
                { type: 'text-summary' }
            ]
        }
    });
};