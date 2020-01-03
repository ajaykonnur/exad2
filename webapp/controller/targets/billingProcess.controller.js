sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/Table",
	"sap/m/MessageToast",
	"promos/exad/EXAD2/controller/factory",
], function (baseController, JSONModel, Table, MessageToast, factory) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {

		onInit: function () {
			var oModel = new JSONModel();
			oModel.setData({
				columnData: [{
					columnName: "Typ"
				}, {
					columnName: "LINR"
				}, {
					columnName: "Adresse"
				}, {
					columnName: "Medium"
				}, {
					columnName: "Letzter Abr-Ztr"
				}],
				tableDetails: [{
					Typ: "Liegenschaft",
					LINR: "5120013",
					Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
					Medium: "",
					"Letzter Abr-Ztr": "01.01. - 31.12.2017"
				}, {
					Typ: "Abrechnungsvereinbarung",
					LINR: "5120013",
					Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
					Medium: "",
					"Letzter Abr-Ztr": "01.01. - 31.12.2017"
				}, {
					Typ: "Abrechnungsmedium",
					LINR: "5120013",
					Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
					Medium: "H",
					"Letzter Abr-Ztr": "01.01. - 31.12.2017"
				}, {
					Typ: "Abrechnungsmedium",
					LINR: "5120013",
					Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
					Medium: "W",
					"Letzter Abr-Ztr": "01.01. - 31.12.2017"
				}, {
					Typ: "Abrechnungsmedium",
					LINR: "5120013",
					Adresse: "Dohnanyistr. 24 in 04103 Leipzig",
					Medium: "K",
					"Letzter Abr-Ztr": "01.01. - 31.12.2017"
				}],
				statusColumnData: [{
					columnName: "Status"
				}, {
					columnName: "Bezeichner"
				}, {
					columnName: "Abr-Ztr"
				}, {
					columnName: "Medium"
				}],
				statusTableDetails: [{
					Status: "001",
					Bezeichner: "",
					"Abr-Ztr": "01.01. - 31.12.2017",
					Medium: ""
				}, {
					Status: "512",
					Bezeichner: "",
					"Abr-Ztr": "01.01. - 31.12.2017",
					Medium: "H"
				}, {
					Status: "699",
					Bezeichner: "",
					"Abr-Ztr": "01.01. - 31.12.2017",
					Medium: ""
				}],
				dienst: [{
					title: "Liegenschaft",
					view: "property"
				}, {
					title: "Mietstruktur",
					view: "Tenant Structure"
				}, {
					title: "Versogungsstruktur",
					view: "Supply Structure"
				}, {
					title: "Kosten & Brennstoffe",
					view: "Costs & fuels"
				}, {
					title: "Abrechnung",
					view: "Accounting"
				}, {
					title: "Ergebnisse",
					view: "Results"
				}, {
					title: "Archiv",
					view: "Archive"
				}]
			});
			this.getView().setModel(oModel);

			// var oTable = this.byIdView("dataTable");

			// exadTable.bindColumns(oTable, "/columnData", oModel);

			var oTable2 = this.byIdView("properties");

			oTable2.bindColumns("/columnData", oModel);

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

	});
});