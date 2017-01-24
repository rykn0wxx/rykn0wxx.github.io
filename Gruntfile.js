'use strict';
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    json_server: 'grunt-json-server'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    host: require('./bower.json').host,
    port: require('./bower.json').port,
    live: require('./bower.json').live,
    jserver: require('./bower.json').jserver
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    kill: appConfig,

    // Browser control
    browserSync: {
			bsFiles: {
				src: [
					'<%= kill.app %>/*.html',
					'<%= kill.app %>/styles/*.css',
					'less/*.less'
				]
			},
			options: {
				watchTask: true,
				proxy: '<%= kill.host %>:<%= kill.port %>'
			}
		},

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      less: {
				files: 'less/**/*.less',
				tasks: ['less'],
				options: {
          livereload: '<%= connect.options.livereload %>'
        }
			},
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      js: {
        files: ['<%= kill.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      styles: {
        files: ['<%= kill.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
				options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= kill.app %>/**/*.html',
          '<%= kill.app %>/contents/**/*.html',
          '<%= kill.app %>/contents/**/*.js',
          '<%= kill.app %>/contents/one/**/*.js',
          '<%= kill.app %>/contents/two/**/*.js',
          '<%= kill.app %>/**/*.js',
          '.tmp/styles/{,*/}*.css',
					'less/**/*.less',
          '<%= kill.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Less config
    less: {
      dev: {
        options: {
          compress: false
        },
        files: {
          '<%= kill.app %>/styles/kohana.css' : 'less/kohana.less'
        }
      }
    },

    // Api Server
    json_server: {
			options: {
				port: '<%= kill.jserver %>',
				hostname: '<%= kill.host %>',
				db: 'api/db.json'
			},
			target: {
				watch: ''
			}
		},

    // The actual grunt server settings
    connect: {
      options: {
        port: '<%= kill.port %>',
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '<%= kill.host %>',
        //livereload: 35729
				livereload: 35728
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect, options, middleware) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
							connect().use(
                '/node_modules',
                connect.static('./node_modules')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app),
							connect().use(
								connect.cookieParser()
							)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= kill.dist %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= kill.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= kill.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= kill.dist %>/{,*/}*',
            '!<%= kill.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= kill.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= kill.dist %>/scripts/{,*/}*.js',
          '<%= kill.dist %>/styles/{,*/}*.css',
          '<%= kill.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= kill.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= kill.app %>/index.html',
      options: {
        dest: '<%= kill.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= kill.dist %>/{,*/}*.html'],
      css: ['<%= kill.dist %>/styles/{,*/}*.css'],
      js: ['<%= kill.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= kill.dist %>',
          '<%= kill.dist %>/images',
          '<%= kill.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= kill.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= kill.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= kill.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= kill.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= kill.dist %>',
          src: ['*.html'],
          dest: '<%= kill.dist %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'demoappApp',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= kill.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= kill.app %>',
          dest: '<%= kill.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= kill.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= kill.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      fonts: {
        expand: true,
        cwd: 'bower_components/font-awesome',
        src: 'fonts/*',
        dest: '<%= kill.dist %>'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: {
				task: [
					'copy:styles',
          'copy:fonts'
				],
				options: {
					logConcurrentOutput: true
				}
      },
			jsonwatch: {
				tasks: [
					'json_server',
					'watch'
				],
				options: {
					logConcurrentOutput: true
				}
			},
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    // Git connection
    buildcontrol: {
			options: {
				'dir': 'dist',
				commit: true,
				push: true,
				message: 'Built by rykn0wxx'
			},
			pages: {
				options: {
					remote: '<%= kill.repo.repository.url %>',
					branch: 'gh-pages'
				}
			}
		}


  });

  grunt.registerTask('metallica', 'Preparing to end this start', function methodName () {

    grunt.task.run([
      'clean:server',
  		'wiredep',
  		'less',
  		'concurrent:server',
  		'postcss:server',
  		'connect:livereload',
  		//'browserSync',
      //'concurrent:jsonwatch'
  		'watch'
    ]);

  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
		'copy:data',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'newer:jshint',
    'newer:jscs',
    'build',
		'copy:data',
		'buildcontrol'
  ]);



};
