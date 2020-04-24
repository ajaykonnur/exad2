module.exports = function (grunt) {
	"use strict";
	var sVersion = "0.02";
	var name = 'cacheBuster';
	var info = 'Generates Cache buster files';
	var fs = require('fs');
	var path = require('path');
	var chalk = require('chalk');
	var oDate = new Date();
	var timestamp = oDate.getTime();
	var sBuildDate = oDate.toLocaleDateString();
	var sBuildTime = oDate.toLocaleTimeString();
	var aPrepend = ["EXAD2 Frontend", "Version: " + sVersion, "Built on: " +
		sBuildDate + " " + sBuildTime
	];

	var sVersionReplace = sVersion + ", built on:" + sBuildDate;
	var sTargetDir = "dist";

	var config = {
		replace: {
			dist: {
				src: [sTargetDir + "/**"],
				overwrite: true, // overwrite matched source files
				replacements: [{
					from: "@@version",
					to: sVersionReplace
				}]
			}
		},
		add_comment: {
			dist: {
				options: {
					comments: aPrepend,
					carriageReturn: "\n",
					prepend: true
				},
				files: [{
					expand: true,
					cwd: sTargetDir,
					src: ["**/*.js"],
					dest: sTargetDir
				}]
			}
		}, copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'webapp/WEB-INF/classes/de/promos', // 'Current Working Directory'
                    src: '**', // Read everything inside the cwd
                    dest: 'dist/WEB-INF/classes/de/promos/' // Destination folder
                    }]
                }
            }
	};

	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");
	grunt.loadNpmTasks("grunt-text-replace");
	grunt.loadNpmTasks("grunt-add-comment");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.config.merge(config);
	grunt.config.merge({
		pkg: grunt.file.readJSON('package.json'),
		cacheBuster: {
			src: 'dist'
		}
	});

	grunt.log.writeln("\n### grunt.config() ###\n" + JSON.stringify(grunt.config(), null, 2));

	grunt.registerTask("cachebuster", function () {
		var oConfig = grunt.config.get(name);
		var oCachebusterFile, t, src, dest, dir, prop;

		oCachebusterFile = grunt.file.readJSON(oConfig.src + '/sap-ui-cachebuster-info.json');
		//console.log(oCachebusterFile);
		for (prop in oCachebusterFile) {
			if (oCachebusterFile.hasOwnProperty(prop)) {
				t = oCachebusterFile[prop];
				src = oConfig.src + '/' + prop;
				dest = oConfig.src + '/~' + t + '~/' + prop;
				grunt.verbose.writeln(
					name + ': ' + chalk.cyan(path.basename(src)) + ' to ' +
					chalk.cyan(dest) + '.');
				dir = path.dirname(dest);
				grunt.file.mkdir(dir);
				fs.copyFileSync(src, dest);
			}
		}
	});

	grunt.registerTask("default", [
		"clean",
		"build",
		"add_comment:dist",
		"replace:dist",
		"cachebuster",
		"copy"

	]);

};