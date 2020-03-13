// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-13 19:59:19
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