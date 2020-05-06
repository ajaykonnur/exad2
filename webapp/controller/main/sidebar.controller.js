sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"promos/exad/EXAD2/controller/factory",
		"sap/ui/model/json/JSONModel"
], function (baseController, factory, JSONModel) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.sidebar", {

		factory: factory,

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.subscribeEventBus();
			this.initNotiz();
			this.initHints();
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
		
		initNotiz: function(){
				var oModel = new JSONModel();
				var sPath =  "entities/anwenderNotiz";
			//	var sPath = "entities/liegenschaft";
				oModel = this.ExadRest(sPath, oModel);
				factory.dateTimeForamt(oModel);
				this.byIdView("notizList").setModel(oModel);
		},
		initHints: function(){
				var oModel = new JSONModel();
			//	var sPath = "entites/anwenderTipp"
				var sPath = "entities/liegenschaft";
				oModel = this.ExadRest(sPath, oModel);
				this.byIdView("hintsContainer").setModel(oModel);
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