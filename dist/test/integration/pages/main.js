// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-13 15:20:26
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