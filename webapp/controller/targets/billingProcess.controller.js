sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	'sap/ui/model/json/JSONModel', 
	'sap/ui/table/Table',
	"promos/exad/EXAD2/controller/factory"
], function (baseController, JSONModel, Table, factory) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {
		onInit: function () {
				 var oModel = new JSONModel();
				 oModel.setData({
				 	dienst: [
				 		{
				 			title: "Liegenschaft",
				 			view: "promos.exad.EXAD2.view.targets.property"
				 		},
						{
				 			title: "Mietstruktur",
				 			view: "Tenant Structure"
				 		},
				 		{
				 			title: "Versogungsstruktur",
				 			view: "Supply Structure"
				 		},
						{
				 			title: "Kosten & Brennstoffe",
				 			view: "Costs & fuels"
				 		},
						{
				 			title: "Abrechnung",
				 			view: "Accounting"
				 		},
				 		{
				 			title: "Ergebnisse",
				 			view: "Results"
				 		},
				 		{
				 			title: "Archiv",
				 			view: "Archive"
				 		}
				 	],
				 	tableDetails: [
						{
							Typ: "Liegenschaft",
							LINR: "5120013",
							Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
							Medium: "",
							"Letzter Abr-Ztr": "01.01. - 31.12.2017"
						}, 
						{
							Typ: "Abrechnungsvereinbarung",
							LINR: "5120013",
							Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
							Medium: "",
							"Letzter Abr-Ztr": "01.01. - 31.12.2017"
						}, 
						{
							Typ: "Abrechnungsmedium",
							LINR: "5120013",
							Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
							Medium: "H",
							"Letzter Abr-Ztr": "01.01. - 31.12.2017"
						}, 
						{
							Typ: "Abrechnungsmedium",
							LINR: "5120013",
							Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
							Medium: "W",
							"Letzter Abr-Ztr": "01.01. - 31.12.2017"
						}, 
						{
							Typ: "Abrechnungsmedium",
							LINR: "5120013",
							Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
							Medium: "K",
							"Letzter Abr-Ztr": "01.01. - 31.12.2017"
						}
						],
						columnData: [
							{
								columnName:"Typ"
							},
							{
								columnName:"LINR"
							},
							{
								columnName:"Adresse"
							},
							{
								columnName:"Medium"
							},
							{
								columnName:"Letzter Abr-Ztr"
							}
							]
				 });
				 this.getView().setModel(oModel);
		},
				 
			itemCloseHandler: function(oEvent) {
			},
			
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	});
});