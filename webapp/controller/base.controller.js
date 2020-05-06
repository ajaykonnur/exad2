// Version: @@version

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, Log, History, JSONModel) {
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
		
		// getManifestServiceUri: function() {
		// 	var oComponent = this.getOwnerComponent();
		// 	var oMetadata = oComponent.getMetadata();
		// 	var oManifest = oMetadata.getManifest();
		// 	var oManifestApp = oManifest["sap.app"];
		// 	var sUri = oManifestApp.dataSources.hyjalExad.uri;
			
		// 	return sUri;
		// },

		getExadRest: function (oObject, oTable, sParameters) {
			var aModelData = [];
			if (sParameters) {
				this.getOwnerComponent().ExadRest(oTable.getProperty("endpoint") + sParameters)
					.then(function (response) {
						aModelData.RowData = response.data;
						aModelData.ColumnData = oObject.getData();
						oTable._bindColumns(aModelData);
						oTable.setModel(aModelData);
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
						oTable.setModel(aModelData);
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
		
		getProperties: function(oEvent){
			try{	
				var oSelectItemKey = oEvent.getParameter("selectedItem").getKey();
				if (oSelectItemKey) {
					var oModel = new JSONModel();
					var sPath = "/entities/liegenschaft?kunde=" + oSelectItemKey;
					oModel = this.ExadRest(sPath, oModel);
					this.byIdView("PropertySearch").setModel(oModel);
				}	
			} catch (err) {
					this._fireInternalErrorOccurred(err);
				}
		},
		
		initializeClientList: function(){
			try{	
				var oModel = new JSONModel();
				var aPath = "/entities/Kunde";
				oModel = this.ExadRest(aPath, oModel);
				this.byIdView("ClientSearch").setModel(oModel);
			} catch (err) {
					this._fireInternalErrorOccurred(err);
			}
		},
		
/**************************************************************************/

		dateRangeSelection: function(sDateRange){
			var aReturn = [];
			var sDay, sMonth, sYear;
			try {
				if(sDateRange){
					var	aDateRange = sDateRange.split("-");
						aDateRange[0] = aDateRange[0].substr(0,8);
						aDateRange[1] = aDateRange[1].substr(1,8);
					for(var i = 0; i < aDateRange.length; i++){
						aDateRange[i].trim();
						sDay = aDateRange[i].substr(0,2);
						sMonth = aDateRange[i].substr(2,2);
						sYear = aDateRange[i].substr(4,4);
						aReturn[i] = sYear + sMonth + sDay;
					}
				}
				
			} catch (err) {
			}
			
			return aReturn;
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
		
		superNavtoFullScreen: function(sRoute, sEntity){
			var oComp = sap.ui.getCore().getComponent( "promos.exad.EXAD2");
			//oComp.getRouter().navTo(sRoute, {});
			oComp.getRouter().navTo(sRoute, {
				entity: sEntity
			});
		},
		
		superNavTo: function (sRoute) {
			this.getOwnerComponent().getRouter().navTo(sRoute, {});
		},
		onNavBack: function (sEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
			//	window.history.go(-1);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("billingProcessRoute", false);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("billingProcessRoute", true);
			}
			
			// var oRouter = this.getRouter();
			// var aRoutes = this.getModel("routeHistory").getData().routes;
			// var sCurrentRoute = aRoutes.pop().route;	//get rid of current route and save it for later
			// var oPreviousRoute = aRoutes.pop();
			
			// if (oPreviousRoute){
			// 	oRouter.navTo(oPreviousRoute.route, {});	//nav to previsous route

			// } else {
			// 	window.history.go(-1);
			// }
			
		},
		getHashParameter: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var sHash = oRouter.oHashChanger.hash ;
			
			var temp = sHash.split("/");
			sHash = temp[temp.length -1] ;
			return sHash;
		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
			/**
		 * Logs an error to the console
		 * 
		 * @param {string|Object} error - The error to log
		 * 
		 * @remarks If the parameter <code>error</code> is an object it will be stringyfied.
		 * 
		 * @private
		 */ 
		_logError: function(error) {
			var sError = error;
			if (typeof error !== "string") {
				sError = JSON.stringify(error);
			}
			
			jQuery.sap.log.error("_logError", sError);
		},
		
		/**
		 * Help Method for the InternalErrorOccurred Event Call.
		 * 
		 * @param {Object} err The error to pass to the event handler
		 */
		_fireInternalErrorOccurred: function(err) {
			this._logError(err);
			// this.fireInternalErrorOccurred({
			// 	err: err
			// });
		}
	});
});