/*
 * grunt-jade-usemin
 *
 *
 * Copyright (c) 2013 Gilad Peleg
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'test/compiled']
        },
        // Configuration to be run (and then tested).
        jadeUsemin: {
            options: {
                replacePath: {
                    '#{baseDir}': 'test' //optional - key value to replace in src path
                }
            },
            basic: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify'],
                        css: ['concat', 'cssmin']
                    }
                },
                files: [{
                    dest: 'test/compiled/basic.jade',
                    src: 'test/fixtures/basic.jade'
                }, {
                    src: 'test/fixtures/{multiple,replacePath}.jade'
                }, {
                    src: 'test/fixtures/production.jade',
                    dest: 'test/compiled/production.jade'
                }, {
                    src: 'test/fixtures/solvePath.jade',
                    dest: 'test/compiled/solvePath.jade'
                }]
            },
            advanced: {
                options: {
                    tasks: {
                        js: ['concat', 'uglify', 'filerev'],
                        css: ['concat', 'autoprefixer', 'cssmin']
                    },
                    dirTasks: ['filerev']
                },
                files: [{
                    dest: 'test/compiled/autoprefixer.jade',
                    src: 'test/fixtures/autoprefixer.jade'
                }]
            }
        },
        devUpdate: {
            main: {
                options: {
                    //should task report already updated dependencies
                    reportUpdated: false,
                    //can be 'force'|'report'|'prompt'
                    updateType: 'prompt',
                    semver: false,
                    packages: {
                        //only devDependencies by default
                        devDependencies: true,
                        dependencies: true
                    }
                }
            }
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*.js']
        }
    });
    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', [
        'clean',
        'jadeUsemin:basic',
        'jadeUsemin:advanced',
        'nodeunit'
    ]);
};
