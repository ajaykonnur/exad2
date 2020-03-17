// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-17 11:17:33
sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/core/routing/HashChanger"
], function (baseController, HashChanger) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.main.main", {
		onInit: function () {
			this.handleHash();
			this.subscribeEventBus();
		},

		subscribeEventBus: function (oEvent) {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("sidebar", "eventSidebarExpand", this.handleEventBus, this);
		},

		onSideNavigationItemSelect: function (oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			if (sKey === undefined) {
				this.superLogError("Route not defined");
			}
			this.superNavTo(sKey + "Route");
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

		handleHash: function () {
			var oHashChanger = new HashChanger();
			var sHash = oHashChanger.getHash();

			var oFunctionsBar = this.byIdView("idFunctionsBar");
			if (sHash !== "") {
				oFunctionsBar.setSelectedKey(sHash);
			} else {
				oFunctionsBar.setSelectedKey("billingProcess");
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