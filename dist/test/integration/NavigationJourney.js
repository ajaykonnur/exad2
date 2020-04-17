// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-4-8 10:23:55
	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/main"
	], function (opaTest) {
		"use strict";

		QUnit.module("Navigation Journey");

		opaTest("Should see the initial page of the app", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			// Assertions
			Then.onTheAppPage.iShouldSeeTheApp();

			//Cleanup
			Then.iTeardownMyApp();
		});
	});