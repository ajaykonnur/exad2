sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller"
], function (baseController) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.main_sidebar", {
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
			oEventBus.publish("main_sidebar", "eventSidebarExpand");

			var oPanelToOpen;

			if (sIdButton.endsWith("Search")) {
				oPanelToOpen = this.byIdView("idPanelSearch");
			} else if (sIdButton.endsWith("Tips")) {
				oPanelToOpen = this.byIdView("idPanelTips");
			} else if (sIdButton.endsWith("Notes")) {
				oPanelToOpen = this.byIdView("idPanelNotes");
			} else {
				this.superLogError("Unknown ID for Button in Sidebar: " + sIdButton);
			}
			oPanelToOpen.setExpanded(true);
		}

	});
});