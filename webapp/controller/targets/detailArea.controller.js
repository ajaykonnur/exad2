sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"promos/exad/EXAD2/controller/messageHelper"
], function(BaseController, JSONModel, messageHelper) {
	
	"use strict";

	return BaseController.extend("sap.ui.demo.orderbrowser.controller.Detail", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit : function () {
			this.initFormData();
		},

		initFormData: function(){
			var sTableName = this.getHashParameter();
			var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
			var oTable = oController.byIdView(sTableName);
			var aRowData = oTable.getModel().RowData[0];
			var oMetaData = oTable.getModel().ColumnData;
			var sVar, sVal ;
			for( var i = 0 ; i< oMetaData.length ; i++){
				sVar = oMetaData[i].name;
				sVal = aRowData[sVar];
				oMetaData[i].value = sVal;
			}
			var oModel = new JSONModel();
			oModel.setData(oMetaData);
			this.byIdView("detailForm").setModel(oModel);
		}
				
	});
});