// TEST
// Version: 0.01
// Built on: 2020-3-13 12:57:50
sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "main";
	Opa5.createPageObjects({
		onTheAppPage: {

			actions: {},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						id: "app",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The main view is displayed");
						},
						errorMessage: "Did not find the main view"
					});
				}
			}
		}
	});

});