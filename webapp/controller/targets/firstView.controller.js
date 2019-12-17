sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageToast',
	'sap/m/TabContainerItem',
	'sap/m/MessageBox'
], function (baseController, JSONModel, MessageToast, TabContainerItem, MessageBox) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.firstView", {
		onInit: function () {
			var oModel = new JSONModel();
			oModel.setData({
				dienst: [{
					title: "Liegenschaft"
				}, {
					title: "Mietstruktur"
				}, {
					title: "Versogungsstruktur"
				}, {
					title: "Kosten & Brennstoffe"
				}, {
					title: "Abrechnung"
				}, {
					title: "Ergebnisse"
				}, {
					title: "Archiv"
				}]
			});
			this.getView().setModel(oModel);

		},
		onItemSelected: function (oEvent) {
			var oItem = oEvent.getSource();
			MessageToast.show(
				'Item ' + oItem.getName() + " was selected"
			);
		},
		itemCloseHandler: function (oEvent) {}
	});
});