module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  var version = '0.1.0';
  var dist = 'factory_girl-' + version;

  grunt.initConfig({
    connect: {
      testserver: {
        options: {
          port: 8000,
          hostname: '0.0.0.0',
          base: '.',
          keepalive: true,
          middleware: function(connect, options){
            return [
            connect.favicon('images/favicon.ico'),
            connect.static(options.base),
            connect.directory(options.base)
            ];
          }
        }
      }
    },

    karma: {
      unit: {
        configFile: './test/karma-unit.conf.js'
      }
    },

    clean: {
      build: ['build']
    },

    uglify: {
      build: {
        files: [{
          src: 'lib/*.js',
          dest: 'build/factory_girl.js',
        }]
      }
    },

    compress: {
      build: {
        options: {archive: 'build/' + dist +'.zip', mode: 'zip'},
        src: ['**'], cwd: 'build', expand: true, dot: true, dest: dist + '/'
      }
    }
  });

  grunt.registerTask('test', ['karma:unit']);

  grunt.registerTask('webserver', ['connect:testserver']);
  grunt.registerTask('minify', ['clean', 'uglify']);
  grunt.registerTask('package', ['clean', 'uglify', 'compress']);
  grunt.registerTask('default', ['package']);
};