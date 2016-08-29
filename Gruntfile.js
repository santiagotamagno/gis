// Generated on 2015-08-22 using generator-angular-fullstack 2.1.1
'use strict';

module.exports = function(grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch (e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express : 'grunt-express-server',
    useminPrepare : 'grunt-usemin',
    ngtemplates : 'grunt-angular-templates',
    cdnify : 'grunt-google-cdn',
    protractor : 'grunt-protractor-runner'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-ng-constant');

  // Define the configuration for all the tasks
  grunt
      .initConfig({

        // Project settings
        pkg : grunt.file.readJSON('package.json'),
        yeoman : {
          // configurable paths
          client : require('./bower.json').appPath || 'client',
          dist : 'dist'
        },
        express : {
          options : {
            port : process.env.PORT || 9000
          },
          dev : {
            options : {
              script : 'server/app.js',
              debug : true
            }
          },
          prod : {
            options : {
              script : 'dist/server/app.js'
            }
          },
          test : {
            options : {
              script : 'dist/server/app.js'
            }
          }
        },
        open : {
          server : {
            url : 'http://localhost:<%= express.options.port %>'
          }
        },
        watch : {
          injectJS : {
            files : [
                '<%= yeoman.client %>/{app,components}/**/*.js',
                '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
                '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
                '!<%= yeoman.client %>/app/app.js' ],
            tasks : [ 'injector:scripts' ]
          },
          injectCss : {
            files : [ '<%= yeoman.client %>/{app,components}/**/*.css' ],
            tasks : [ 'injector:css' ]
          },
          jsTest : {
            files : [
                '<%= yeoman.client %>/{app,components}/**/*.spec.js',
                '<%= yeoman.client %>/{app,components}/**/*.mock.js' ],
            tasks : [ 'newer:jshint:all', 'wiredep:test', 'karma' ]
          },
          injectLess : {
            files : [ '<%= yeoman.client %>/{app,components}/**/*.less' ],
            tasks : [ 'injector:less' ]
          },
          less : {
            files : [ '<%= yeoman.client %>/{app,components}/**/*.less' ],
            tasks : [ 'less', 'autoprefixer' ]
          },
          babel : {
            files : [
                '<%= yeoman.client %>/{app,components}/**/*.js',
                '!<%= yeoman.client %>/{app,components}/**/*.spec.js' ],
            tasks : [ 'babel' ]
          },
          gruntfile : {
            files : [ 'Gruntfile.js' ]
          },
          livereload : {
            files : [
                '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
                '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',

                '.tmp/{app,components}/**/*.js',

                '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
                '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
                '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
                '<%= yeoman.client %>/i18n/{,*/}*.json'
              ],
            options : {
              livereload : true
            }
          },
          express : {
            files : [ 'server/**/*.{js,json}' ],
            tasks : [ 'express:dev', 'wait' ],
            options : {
              livereload : true,
              nospawn : true
            // Without this option specified express won't be
            // reloaded
            }
          }
        },

        // Make sure code styles are up to par and there are no obvious
        // mistakes
        jshint : {
          options : {
            verbose: true,
            jshintrc : '<%= yeoman.client %>/.jshintrc',
            reporter : require('jshint-stylish')
          },
          all : [
              '<%= yeoman.client %>/{app,components}/**/*.js',
              '<%= yeoman.client %>/{app,components}/**/*.spec.js',
              '!<%= yeoman.client %>/{app,components}/**/*.mock.js' ],
          test : {
            src : [
                '<%= yeoman.client %>/{app,components}/**/*.spec.js',
                '<%= yeoman.client %>/{app,components}/**/*.mock.js' ]
          }
        },

        // Empties folders to start fresh
        clean : {
          dist : {
            files : [ {
              dot : true,
              src : [ '.tmp', '<%= yeoman.dist %>/*',
                  '!<%= yeoman.dist %>/.git*',
                  '!<%= yeoman.dist %>/.openshift',
                  '!<%= yeoman.dist %>/Procfile' ]
            } ]
          },
          server : '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer : {
          options : {
            browsers : [ 'last 1 version' ]
          },
          dist : {
            files : [ {
              expand : true,
              cwd : '.tmp/',
              src : '{,*/}*.css',
              dest : '.tmp/'
            } ]
          }
        },

        // Debugging with node inspector
        'node-inspector' : {
          custom : {
            options : {
              'web-host' : 'localhost'
            }
          }
        },

        //constant to server url
        ngconstant: {
          // Options for all targets
          options: {
            space: '  ',
            wrap: "'use strict';\n// jshint ignore:start\n// jscs:disable\n{%= __ngModule %}\n// jshint ignore:end \n ",
            name: 'GisApp.appConstants',
            dest: '<%= yeoman.client %>/app/constants.js'
          },
          // Environment targets
          local: {
            constants: {
              appConstants: {
                name: 'local',
                serverBackEnd: 'http://localhost:3000/'
              }
            }
          },
          dev: {
            constants: {
              appConstants: {
                name: 'development',
                serverBackEnd: 'https://video-platform-api.herokuapp.com/'
              }
            }
          },
          prod: {
            constants: {
              appConstants: {
                name: 'prod',
                serverBackEnd: 'https://video-platform-api.herokuapp.com/'
              }
            }
          }
        },

        // Automatically inject Bower components into the app
        wiredep : {
          test: {
            src: './karma.conf.js',
            devDependencies: true
          },
          target : {
            src : '<%= yeoman.client %>/index.html',
            ignorePath : '<%= yeoman.client %>/',
            exclude : [
                '/bootstrap-sass-official/',
                '/json3/',
                '/es5-shim/',
                '/bootstrap.css/',
                '/font-awesome.css/',
                '/videogular.css' ]
          }
        },

        // Renames files for browser caching purposes
        rev : {
          dist : {
            files : {
              src : [
                  '<%= yeoman.dist %>/public/{,*/}*.js',
                  '<%= yeoman.dist %>/public/**/*.js',
                  '<%= yeoman.dist %>/public/**/*.js',
                  '<%= yeoman.dist %>/public/{,*/}*.css',
                  // '<%= yeoman.dist
                  // %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                  '<%= yeoman.dist %>/public/assets/fonts/*',
                  '!<%= yeoman.dist %>/public/bower_components/**/*.*' ]
            }
          }
        },

        // Reads HTML for usemin blocks to enable smart builds that
        // automatically
        // concat, minify and revision files. Creates configurations in
        // memory so
        // additional tasks can operate on them
        useminPrepare : {
          html : [ '<%= yeoman.client %>/index.html' ],
          options : {
            dest : '<%= yeoman.dist %>/public'
          }
        },

        // Performs rewrites based on rev and the useminPrepare
        // configuration
        usemin : {
          html : [ '<%= yeoman.dist %>/public/{,*/}*.html' ],
          css : [ '<%= yeoman.dist %>/public/{,*/}*.css' ],
          js : [ '<%= yeoman.dist %>/public/{,*/}*.js' ],
          options : {
            assetsDirs : [ '<%= yeoman.dist %>/public',
                '<%= yeoman.dist %>/public/assets/images' ],
            // This is so we update image references in our
            // ng-templates
            patterns : {
              js : [ [
                  /(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm,
                  'Update the JS to reference our revved images' ] ]
            }
          }
        },

        // The following *-min tasks produce minified files in the dist
        // folder
        imagemin : {
          dist : {
            files : [ {
              expand : true,
              cwd : '<%= yeoman.client %>/assets/images',
              src : '{,*/}*.{png,jpg,jpeg,gif}',
              dest : '<%= yeoman.dist %>/public/assets/images'
            } ]
          }
        },

        svgmin : {
          dist : {
            files : [ {
              expand : true,
              cwd : '<%= yeoman.client %>/assets/images',
              src : '{,*/}*.svg',
              dest : '<%= yeoman.dist %>/public/assets/images'
            } ]
          }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically
        // makes it
        // minsafe compatible so Uglify does not destroy the ng
        // references
        ngAnnotate : {
          dist : {
            files : [ {
              expand : true,
              cwd : '.tmp/concat',
              src : '**/*.js',
              dest : '.tmp/concat'
            } ]
          }
        },

        // Package all the html partials into a single javascript
        // payload
        ngtemplates : {
          options : {
            // This should be the name of your apps angular module
            module : 'GisApp',
            htmlmin : {
              collapseBooleanAttributes : false,
              collapseWhitespace : true,
              removeAttributeQuotes : true,
              removeEmptyAttributes : true,
              removeRedundantAttributes : true,
              removeScriptTypeAttributes : true,
              removeStyleLinkTypeAttributes : true
            },
            usemin : 'app/app.js'
          },
          main : {
            cwd : '<%= yeoman.client %>',
            src : [ '{app,components}/**/*.html' ],
            dest : '.tmp/templates.js'
          },
          tmp : {
            cwd : '.tmp',
            src : [ '{app,components}/**/*.html' ],
            dest : '.tmp/tmp-templates.js'
          }
        },

        // Replace Google CDN references
        cdnify : {
          dist : {
            html : [ '<%= yeoman.dist %>/public/*.html' ]
          }
        },

        // Copies remaining files to places other tasks can use
        copy : {
          dist : {
            files : [
                {
                  expand : true,
                  dot : true,
                  cwd : '<%= yeoman.client %>',
                  dest : '<%= yeoman.dist %>/public',
                  src : [ '*.{ico,png,txt}', '.htaccess',
                      'bower_components/**/*',
                      'assets/images/{,*/}*.*',
                      'assets/fonts/**/*', 'index.html',
                      'i18n/{,*/}*.*'
                    ]
                },
                {
                  expand : true,
                  cwd : '.tmp/images',
                  dest : '<%= yeoman.dist %>/public/assets/images',
                  src : [ 'generated/*' ]
                }, {
                  expand : true,
                  dest : '<%= yeoman.dist %>',
                  src : [ 'package.json', 'server/**/*' ]
                }]
          },
          styles : {
            expand : true,
            cwd : '<%= yeoman.client %>',
            dest : '.tmp/',
            src : [ '{app,components}/**/*.css' ]
          },
          gitHooks: {
                expand: false,
                cwd: '.',
                src: 'hooks/**/*',
                dest: '.git/',
                options:{
                    mode: '777'
                }
          }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent : {
          server : [ 'babel', 'less', ],
          test : [ 'babel', 'less', ],
          debug : {
            tasks : [ 'nodemon', 'node-inspector' ],
            options : {
              logConcurrentOutput : true
            }
          },
          dist : [ 'babel', 'less',
          // 'imagemin',
          'svgmin' ]
        },

        // Test settings
        karma : {
          unit : {
            configFile : 'karma.conf.js',
            singleRun : true
          }
        },

        protractor : {
          options : {
            configFile : 'protractor.conf.js'
          },
          chrome : {
            options : {
              args : {
                browser : 'chrome'
              }
            }
          }
        },

        env : {
          test : {
            NODE_ENV : 'test'
          },
          prod : {
            NODE_ENV : 'production'
          },
          all : localConfig
        },

        // Compiles ES6 to JavaScript using Babel
        babel : {
          options : {
            sourceMap : true
          },
          client: {
            files: [{
              expand: true,
              cwd: '<%= yeoman.client %>',
              src: ['{app,components}/**/!(*.spec).js'],
              dest: '.tmp'
            }]
          },
          server : {
            files : [ {
              expand : true,
              cwd : 'client',
              src : [ '{app,components}/**/*.js',
                  '!{app,components}/**/*.spec.js' ],
              dest : '.tmp'
            } ]
          }
        },

        // Compiles Less to CSS
        less : {
          options : {
            paths : [ '<%= yeoman.client %>/bower_components',
                '<%= yeoman.client %>/app',
                '<%= yeoman.client %>/components' ]
          },
          server : {
            files : {
              '.tmp/app/app.css' : '<%= yeoman.client %>/app/app.less'
            }
          },
        },

        // Checks your JavaScript code style matches the rules in .jscsrc
        jscs: {
            options: {
                config: '<%= yeoman.client %>/.jscsrc'
            },
            all: {
                src: [
                    '<%= yeoman.client %>/{app,components,assets}/**/*.js',
                    '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
                    '!<%= yeoman.client %>/{app,components}/**/*.mock.js'
                ]
            },
            app: {
              src: '<%= yeoman.client %>/app/*.js'
            }
        },

        injector : {
          options : {

          },
          // Inject application script files into index.html (doesn't
          // include bower)
          scripts : {
            options : {
              transform : function(filePath) {
                filePath = filePath.replace('/client/', '');
                filePath = filePath.replace('/.tmp/', '');
                return '<script src="' + filePath
                    + '"></script>';
              },
              starttag : '<!-- injector:js -->',
              endtag : '<!-- endinjector -->'
            },
            files : {
              '<%= yeoman.client %>/index.html' : [ [
                  '.tmp/{app,components}/**/*.module.js',
                  '.tmp/{app,components}/**/*.js',

                  '!{.tmp,<%= yeoman.client %>}/app/app.js',
                  '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.spec.js',
                  '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js' ] ]
            }
          },

          // Inject component less into app.less
          less : {
            options : {
              transform : function(filePath) {
                filePath = filePath.replace('/client/app/', '');
                filePath = filePath.replace(
                    '/client/components/', '');
                return '@import \'' + filePath + '\';';
              },
              starttag : '// injector',
              endtag : '// endinjector'
            },
            files : {
              '<%= yeoman.client %>/app/app.less' : [
                  '<%= yeoman.client %>/{app,components}/**/*.less',
                  '!<%= yeoman.client %>/app/app.less' ]
            }
          },
          // Inject component css into index.html
          css : {
            options : {
              transform : function(filePath) {
                filePath = filePath.replace('/client/', '');
                filePath = filePath.replace('/.tmp/', '');
                return '<link rel="stylesheet" href="'
                    + filePath + '">';
              },
              starttag : '<!-- injector:css -->',
              endtag : '<!-- endinjector -->'
            },
            files : {
              '<%= yeoman.client %>/index.html' : [ '<%= yeoman.client %>/{app,components}/**/*.css' ]
            }
          }
        }
      });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function() {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run([ 'build', 'env:all', 'ngconstant:local', 'env:prod', 'copy:gitHooks',
          'express:prod', 'wait', 'open',
          'express-keepalive' ]);
    }

    if (target === 'debug') {
      return grunt.task.run([ 'clean:server', 'env:all', 'injector:less',
          'concurrent:server', 'injector', 'wiredep', 'autoprefixer',
          'concurrent:debug' ]);
    }

    grunt.task.run([ 'clean:server', 'copy:gitHooks', 'ngconstant:local', 'env:all', 'injector:less',
        'concurrent:server', 'injector', 'wiredep', 'autoprefixer',
        'express:dev', 'wait', 'open', 'watch']);
  });

  grunt
      .registerTask(
          'server',
          function() {
            grunt.log
                .warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
            grunt.task.run([ 'serve' ]);
          });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([ 'env:all', 'env:test' ]);
    }

    else if (target === 'client') {
      return grunt.task.run([ 'clean:server', 'ngconstant:local', 'env:all', 'injector:less',
          'concurrent:test', 'injector', 'autoprefixer', 'wiredep:test', 'karma' ]);
    }
    else
      grunt.task.run(['test:server', 'test:client']);
  });

  grunt.registerTask('build', [ 'clean:dist', 'injector:less',
      'concurrent:dist', 'injector', 'wiredep', 'useminPrepare',
      'autoprefixer', 'ngtemplates', 'concat', 'ngAnnotate', 'copy:dist',
      'cdnify', 'cssmin', 'uglify', 'babel:client', 'rev', 'usemin' ]);

  grunt.registerTask('default', ['newer:jshint', 'test', 'build']);

  grunt.registerTask('lint', ['jscs:all', 'jscs:app', 'jshint:all']);
  grunt.registerTask('deploy-prod', ['clean', 'ngconstant:prod', 'lint', 'test:client', 'build']);
};
