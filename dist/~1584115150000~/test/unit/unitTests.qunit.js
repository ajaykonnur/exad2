// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-13 19:59:19
/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"promos/exad/EXAD2/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});