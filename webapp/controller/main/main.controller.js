sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller"
], function (baseController) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.main.main", {
		onInit: function () {
			this.superNavTo("homeRoute");
			this.subscribeEventBus();
		},

		subscribeEventBus: function (oEvent) {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("sidebar", "eventSidebarExpand", this.handleEventBus, this);
		},

		onSideNavigationItemSelect: function (oEvent) {
			var sTarget = oEvent.getSource().data("route");
			if (sTarget === undefined) {
				this.superLogError("Route not defined");
			}
			this.superNavTo(sTarget);
		},

		onSidebarToggleButtonPress: function (oEvent) {
			this.toggleSidebarArea();
		},

		onFunctionsToggleButtonPress: function (oEvent) {
			this.toggleFunctionsArea();
		},

		handleEventBus: function (sChannel, sEvent, oData) {
			switch (sEvent) {
			case "eventSidebarExpand":
				this.setSidebarExpanded(true);
				break;
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
		},

		toggleSidebarArea: function () {
			var sActivePath = "/sidebar/active";
			var bActive = this.superGetModelProperty("displayState", sActivePath);

			this.setSidebarExpanded(!bActive);

		},

		setSidebarExpanded: function (bExpanded) {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("main", "eventSidebarExpand", {
				Expanded: bExpanded
			});

			var sActivePath = "/sidebar/active";
			var oSidebarArea = this.byIdView("idSideBarArea");
			var oToggleButton = this.byIdView("idSidebarToggleButton");
			if (bExpanded) {
				oSidebarArea.getLayoutData().setResizable(true);
				oSidebarArea.getLayoutData().setSize("20%");
				oToggleButton.setPressed(true);

				this.superSetModelProperty("displayState", sActivePath, true);
			} else {
				oSidebarArea.getLayoutData().setResizable(false);
				oSidebarArea.getLayoutData().setSize("5%");
				oToggleButton.setPressed(false);

				this.superSetModelProperty("displayState", sActivePath, false);
			}
		}

	});
});