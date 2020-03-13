// TEST
// Version: 0.01
// Built on: 2020-3-13 12:57:50
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