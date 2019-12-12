sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller"
], function (baseController) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.main_sidebar", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
	});
});