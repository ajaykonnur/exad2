// TEST
// Version: 0.01
// Built on: 2020-3-13 12:57:50
/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"promos/exad/EXAD2/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});