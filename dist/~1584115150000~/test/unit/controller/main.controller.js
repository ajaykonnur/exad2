// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-13 19:59:19
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