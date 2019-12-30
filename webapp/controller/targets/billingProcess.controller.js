sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel", 
	"sap/ui/table/Table",
	"sap/m/MessageToast",
	"promos/exad/EXAD2/controller/factory",
	"promos/exad/EXAD2/controller/exadTable"
], function (baseController, JSONModel, Table, MessageToast, factory, exadTable) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {
		
		exadTable : exadTable,
		onInit: function () {
				 var oModel = new JSONModel();
				 oModel.setData({
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
					statusColumnData: [
							{
								columnName:"Status"
							},
							{
								columnName:"Bezeichner"
							},
							{
								columnName:"Abr-Ztr"
							},
							{
								columnName:"Medium"
							}
							],
				 	statusTableDetails: [
						{
							Status: "001",
							Bezeichner: "",
							"Abr-Ztr": "01.01. - 31.12.2017",
							Medium: ""
						}, 
						{
							Status: "512",
							Bezeichner: "",
							"Abr-Ztr": "01.01. - 31.12.2017",
							Medium: "H"
						}, 
						{
							Status: "699",
							Bezeichner: "",
							"Abr-Ztr": "01.01. - 31.12.2017",
							Medium: ""
						}
						],
					dienst: [
				 		{
				 			title: "Liegenschaft",
				 			view: "property"
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
				 	]
				 });
				 this.getView().setModel(oModel);
				 
				var oTable = this.getView().byId("dataTable");
				
				exadTable.bindColumns(oTable, "/columnData", oModel);
		},

			
			getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
	onTableEditButtonPress: function (oEvent) {
		var oSource = oEvent.getSource();
        var bPressed = oSource.getState('state');
    	this.getView().byId("Neu").setEnabled(bPressed);
    	this.getView().byId("Kopieren").setEnabled(bPressed);
    	this.getView().byId("Loeschen").setEnabled(bPressed);
	},
		
	onPressAddRow: function() {
		var oModel = this.getView().getModel();
		oModel.oData.tableDetails.push({Typ: " ", LINR: " ", Adresse: " ", Medium: " ", "Letzter Abr-Ztr":" "}); // Push data to Model
		oModel.refresh();
	//	var rowCount = oModel.oData.tableDetails.length;
	//	rowCount = rowCount + 1;
		},
		
	onPressCopyRow: function() {
		var oTable = this.getView().byId("dataTable");
		var line_ = oTable.getSelectedIndices();
		var line;
		if ( line_.length === 0 ){
			var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			var sTxt = oResourceBundle.getText("TableSelectedRowError");
			MessageToast.show(sTxt);
		}else{
			var oModel = this.getView().getModel();
			for(var i=0;i<line_.length;i++){ 
				line = oModel.oData.tableDetails[line_[i]]; 
				oModel.oData.tableDetails.push(line); //Just add to the end of the table
			}
		oModel.refresh();
		}
	},
	
	onPressDeleteRow: function() {
		var oTable = this.getView().byId("dataTable");
		var line =  oTable.getSelectedIndices();
			if ( line.length === 0 ){
			var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			var sTxt = oResourceBundle.getText("TableSelectedRowError");
			MessageToast.show(sTxt);
		}else{
			var oModel = this.getView().getModel();
			for(var i=0;i<line.length;i++){ 
				oModel.oData.tableDetails.splice(line, 1);
			}
			oModel.refresh();
		}
	}
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
});