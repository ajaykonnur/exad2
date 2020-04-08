// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-4-8 10:23:55
/*global QUnit*/

sap.ui.define([
	"promos/exad/EXAD2/controller/main/main.controller"
], function (Controller) {
	"use strict";

	QUnit.module("main Controller");

	QUnit.test("I should test the main controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});