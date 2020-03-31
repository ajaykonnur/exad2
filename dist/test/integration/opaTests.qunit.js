// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-30 22:53:45
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