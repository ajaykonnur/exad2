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
			this.toggleFunctionsArea();
		},

		toggleSidebarArea: function () {
			var sActivePath = "/sidebar/active";
			var bActive = this.superGetModelProperty("displayState", sActivePath);
			var oSidebarArea = this.byIdView("idSideBarArea");
			var oToggleButton = this.byIdView("idSidebarToggleButton");

			if (bActive) {
				oSidebarArea.getLayoutData().setResizable(false);
				oSidebarArea.getLayoutData().setSize("0%");
				oToggleButton.setPressed(false);

				this.superSetModelProperty("displayState", sActivePath, false);
			} else {
				oSidebarArea.getLayoutData().setResizable(true);
				oSidebarArea.getLayoutData().setSize("20%");
				oToggleButton.setPressed(true);

				this.superSetModelProperty("displayState", sActivePath, true);
			}

		},

		toggleFunctionsArea: function () {
			var sActivePath = "/functionsbar/active";
			var bActive = this.superGetModelProperty("displayState", sActivePath);
			var oToolPage = this.byIdView("idToolPage");
			var oToggleButton = this.byIdView("idFunctionsToggleButton");

			if (bActive) {
				oToolPage.setSideExpanded(false);
				oToggleButton.setPressed(false);

				this.superSetModelProperty("displayState", sActivePath, false);
			} else {
				oToolPage.setSideExpanded(true);
				oToggleButton.setPressed(true);

				this.superSetModelProperty("displayState", sActivePath, true);
			}
		}
	});
});