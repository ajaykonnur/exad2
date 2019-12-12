sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller"
], function (baseController) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.main", {
		onInit: function () {
			this.getOwnerComponent().getRouter().navTo("RoutefirstView", {});
		},

		onSidebarToggleButtonPress: function (oEvent) {
			this.toggleSidebarArea();
		},

		onFunctionsToggleButtonPress: function (oEvent) {

		},

		toggleSidebarArea: function () {
			var bActive = this.superGetModelProperty("displayState", "/sidebar/active");
			var oSidebarArea = this.byIdView("idSideBarArea");

			if (bActive) {
				oSidebarArea.getLayoutData().setResizable(false);
				oSidebarArea.getLayoutData().setSize("0%");

				this.superSetModelProperty("displayState", "/sidebar/active", false);
			} else {
				oSidebarArea.getLayoutData().setResizable(true);
				oSidebarArea.getLayoutData().setSize("20%");
				this.superSetModelProperty("displayState", "/sidebar/active", true);
			}

		},

		toggleFunctionsArea: function () {

		}
	});
});