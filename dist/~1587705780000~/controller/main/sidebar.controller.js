// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-4-24 11:25:05
sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"promos/exad/EXAD2/controller/factory"
], function (baseController, factory) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.sidebar", {

		factory: factory,

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.subscribeEventBus();
		},

		subscribeEventBus: function (oEvent) {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("main", "eventSidebarExpand", this.handleEventBus, this);
		},

		handleEventBus: function (sChannel, sEvent, oData) {
			switch (sEvent) {
			case "eventSidebarExpand":
				var bExpanded = oData.Expanded;
				this.setSidebarExpanded(bExpanded);
				break;
			}
		},

		onSidebarButtonPress: function (oEvent) {
			var sIdButton = oEvent.getSource().getId();
			this.expandSidebarPanelByButton(sIdButton);
		},

		setSidebarExpanded: function (bExpanded) {
			var oExpandedContent = this.byIdView("idSidebarContentExpanded");
			var oNotExpandedContent = this.byIdView("idSidebarContentNotExpanded");

			oExpandedContent.setVisible(bExpanded);
			oNotExpandedContent.setVisible(!bExpanded);

		},

		expandSidebarPanelByButton: function (sIdButton) {

			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("sidebar", "eventSidebarExpand");

			var oPanelToOpen;

			if (sIdButton.endsWith("Search")) {
				oPanelToOpen = this.byIdView("idPanelSearch");
			} else if (sIdButton.endsWith("Hints")) {
				oPanelToOpen = this.byIdView("idPanelHints");
			} else if (sIdButton.endsWith("Notes")) {
				oPanelToOpen = this.byIdView("idPanelNotes");
			} else {
				this.superLogError("Unknown ID for Button in Sidebar: " + sIdButton);
			}
			oPanelToOpen.setExpanded(true);
		}

	});
});