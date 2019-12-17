sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	'sap/ui/model/json/JSONModel', 
	'sap/ui/table/Table',
	"promos/exad/EXAD2/controller/factory"
], function (baseController, JSONModel, Table, factory) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.firstView", {
		onInit: function () {
				 var oModel = new JSONModel();
				 oModel.setData({
				 	dienst: [
				 		{
				 			title: "Liegenschaft"
				 		},
						{
				 			title: "Mietstruktur"
				 		},
				 		{
				 			title: "Versogungsstruktur"
				 		},
						{
				 			title: "Kosten & Brennstoffe"
				 		},
						{
				 			title: "Abrechnung"
				 		},
				 		{
				 			title: "Ergebnisse"
				 		},
				 		{
				 			title: "Archiv"
				 		}
				 	]
				 });
				 this.getView().setModel(oModel);
// *********************************************************************** //
			 
			var	tableDetails = [
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
				}];
				var	columnData = [
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
					}];
							 
				  var oTable = new Table(); 
				  var aModel = new JSONModel();
				aModel.setData({
						 	rows: tableDetails,
						 	columns: columnData,
				  });
				 
				  oTable.setModel(aModel);
				 
				  //oTable.bindColumns("/columns", function(sId, oContext){
				  //	var columnName = oContext.getObjeck().columnName;
				  //	return new sap.ui.table.Column({
				  //		label: columnName,
				  //		template: columnName
				  //	});
				  //});
				  //oTable.bindRows("/rows");
				  //oTable.placeAt("content");
			},
			
			
			// onItemSelected: function(oEvent) {
			// 	var oItem = oEvent.getSource();
			// 	MessageToast.show(
			// 		'Item ' + oItem.getName() + " was selected"
			// 	);
			// },
			itemCloseHandler: function(oEvent) {
			},
			
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	});
});