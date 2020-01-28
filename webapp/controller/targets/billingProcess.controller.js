sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/Table",
	"sap/m/MessageToast",
	"promos/exad/EXAD2/controller/factory"
], function (baseController, JSONModel, Table, MessageToast, factory) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {

		onInit: function () {

			// set model to table
			var oTable1 = this.byIdView("properties");
			var oModelData = this.getOwnerComponent().getModel("mockdata").getProperty("/accountingInfoTableData");
			var oModel = new JSONModel(oModelData);
			oTable1.bindColumns("/columnData", oModel);

			// set model to table
			var oTable2 = this.byIdView("accountigStatus");
			var oModelData2 = this.getOwnerComponent().getModel("mockdata").getProperty("/statusInfoTableData");
			var oModel2 = new JSONModel(oModelData2);
			oTable2.bindColumns("/columnData", oModel2);

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}

	});
});