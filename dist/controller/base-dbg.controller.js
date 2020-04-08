// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-4-8 10:23:55
// Version: 0.02, built on:2020-4-8

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log",
	"sap/ui/core/routing/History"
], function (Controller, Log, History) {
	"use strict";

	return Controller.extend("promos.exad.EXAD2.controller.base", {
		byIdView: function (sId) {
			var oView = this.getView();
			return oView.byId(sId);
		},

		getModelView: function (sModelname) {
			var oView = this.getView();
			var oModel = oView.getModel(sModelname);
			if (!oModel) {
				this.superLogError("Model " + sModelname + " was not found!");
			}
			return oModel;
		},
		ExadRest: function(sPath, oModel ){
			this.getOwnerComponent().ExadRest(sPath)
				.then(function (response) {
										oModel.setData(response.data); 
						}).catch(function (error) {
										oModel.setData(null);
								});
			return oModel;
		},

		getExadRest: function (oObject, oTable, sParameters) {
			var aModelData = [];
			if (sParameters) {
				this.getOwnerComponent().ExadRest(oTable.getProperty("endpoint") + sParameters)
					.then(function (response) {
						aModelData.RowData = response.data;
						aModelData.ColumnData = oObject.getData();
						oTable._bindColumns(aModelData);
						oTable.setCount(aModelData.RowData.length);
					}).catch(function (error) {
						  console.log(error.toJSON());
					});
			} else {
				this.getOwnerComponent().ExadRest(oTable.getProperty("endpoint"))
					.then(function (response) {
						aModelData.RowData = response.data;
						aModelData.ColumnData = oObject.getData();
						oTable._bindColumns(aModelData);
						oTable.setCount(aModelData.RowData.length);
					}).catch(function (error) {
						 aModelData.RowData = null ;
						aModelData.ColumnData = oObject.getData();
						oTable._bindColumns(aModelData);
						//oTable.setCount(aModelData.RowData.length);
					});
			}

		},
		postExadRest: function (oObject, oTable, sParameter) {

			this.getOwnerComponent().ExadRest(oTable.getProperty("endpoint") + sParameter, "post")
				.then(function (response) {
					var oRes = response;
				//	console.log(oRes);
				}).catch(function (error) {
				//	console.log(error.toJSON());
				});

		},
		superGetModelProperty: function (sModelname, sPropertypath) {
			var oModel = this.getModelView(sModelname);
			var oProperty = oModel.getProperty(sPropertypath);
			if (oProperty === undefined) {
				this.superLogError("Property " + sPropertypath + " was not found in Model " + sModelname + "!");
			}
			return oProperty;
		},

		superSetModelProperty: function (sModelname, sPropertypath, oValue) {
			var oModel = this.getModelView(sModelname);
			return oModel.setProperty(sPropertypath, oValue);
		},

		superLogError: function (sMessage) {
			Log.error(sMessage, "", this.getView());
		},

		superNavTo: function (sRoute) {
			this.getOwnerComponent().getRouter().navTo(sRoute, {});
		},
		onNavBack: function (sEvent) {
			window.history.go(-1);
		}
	});
});