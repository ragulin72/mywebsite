module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    'htdocs/www/css/style.css': 'src/scss/style.scss'
                }
            }
        },
        uglify: {
            options: {
                beautify: false,
                mangle: false,
            },
            my_target: {
                files:[{
                    expand: true,
                    cwd: 'src/js',
                    src:['js/*.js'],
                    dest: 'src/js/tmp'
                }]

            },
            combine: {
                files:{
                    'htdocs/www/js/main.min.js': [
                        'src/js/tmp/jquery.js',
                        'src/js/tmp/bootstrap.bundle.js'

                    ],
                    'htdocs/www/js/main.js': [
                        'src/js/*.js'
                    ]
                }
            }
        },
        clean: {
            js:["src/js/tmp/*.js"],
            temp: ["htdocs/temp/cache/**/*.*"]
        },
        "file-creator": {
            "basic": {
                "htdocs/temp/version.txt":function(fs, fd, done) {
                    var d = new Date();
                    fs.writeSync(fd, d.getTime());
                    done();
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('dev', ['sass']);
    grunt.registerTask('js', ['clean', 'uglify', 'file-creator']);
}