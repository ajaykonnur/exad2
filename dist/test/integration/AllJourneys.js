// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-30 22:53:45
sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "promos.exad.EXAD2.view.",
		autoWait: true
	});
});