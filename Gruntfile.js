/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
				babel: {
					build: {
						files: {
							'client/js/main.js': ['src/babel/**/*.jsx']
						}
					}
				},
				concat: {
					options: {
						separator: ';',
            stripBanners: true
					},
					scripts: {
						files: {
							"client/js/main.all.js": 
								[
									"src/js/main.js", 
									"src/js/router.js",
									"src/js/component.js",
									"src/js/**/*.js"]
						}
					},
					templates: {
						files: {
							'client/js/templates.js': ['src/compiled-templates/**/*.js']
						}
					},
					libs: { //javascript套件庫
						files: {
							"client/js/libs.js": [
								"libs/jquery/jquery-2.1.4.min.js",
								"libs/jqueryjquery.contextmenu.r2.js",
								"libs/easyui/jquery.easyui.min.js",
								"libs/ember/ember-2.0.0.min.js"
							]
						}
					}
				},
				emberTemplates: {
					build: {
						options: {
							templateBasePath: "src/templates/",
							templateCompilerPath: 'libs/ember/ember-template-compiler-2.0.0.js',
							handlebarsPath: 'libs/ember/handlebars-v3.0.3.js'
						},
						files: {
							"client/js/templates.js": ["src/templates/**/*.hbs"]
						}
					}
				},
				watch: {
//					uglify: {
//						files: ['client/js/templates.js'],
//						tasks: ['uglify:templates']
//					},
					scripts: {
						files: ['src/js/**/*.js'],
						tasks: ['concat:scripts']
					},
					emberTemplate: {
						files: ['src/templates/**/*.hbs', '!templates/chara_view2.hbs'],
						tasks: ['emberTemplates:build']
					}
				},
//				uglify: {
//					templates: {
//						files: {
//							'client/js/templates.min.js': ['client/js/templates.js']
//						}
//					}
//				}
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');
		//grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-ember-templates');
		//grunt.loadNpmTasks('grunt-newer');
		//grunt.loadNpmTasks('grunt-babel');
		grunt.registerTask('concat-lib', ['concat:libs']);
};
