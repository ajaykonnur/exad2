sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/Table",
	"sap/m/MessageToast",
	"promos/exad/EXAD2/controller/factory",
	"sap/ui/core/Fragment"
], function (baseController, JSONModel, Table, MessageToast, factory, Fragment) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {

		onInit: function () {
			
			
			
			var oModel = new JSONModel();
			
			var aData = jQuery.ajax({ 
							type: "GET", 
							contentType: "application/json", 
							url: 'https://hyjal.promos-consult.de:9443/JExadCore/rest/entities/Kunde',
							dataType: "json",
							success: function(json) {
								oModel.setData(aData);             // fill the received data into the JSONModel  
							},
							error: function(json) {
								alert("fail to post"); 
							} 
				
			});
			
			this.byIdView("KundeSearch").setModel(oModel);
		//	this.getView().setModel(oModel);
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onSelectItem: function(oEvent) {
			
			
			var oSelectItemKey = oEvent.getParameter("selectedItem").getKey();
			if (oSelectItemKey) {
				
				var oModel = new JSONModel();
				
				var aData = jQuery.ajax({ 
							type: "GET", 
							contentType: "application/json", 
							url: "https://hyjal.promos-consult.de:9443/JExadCore/rest/entities/liegenschaft?kunde=" + oSelectItemKey,
							dataType: "json",
							success: function(json) {
								oModel.setData(aData);             // fill the received data into the JSONModel        
							},
							error: function(json) {
								alert("fail to retrieve Liengenschaft data"); 
							} 
				});
			// liegenschaft data 
			this.byIdView("LiegenschaftSearch").setModel(oModel);
			}
		},
		
		handleNewKunde: function () {
			this._openDialog("newClient");
		},
		// View Setting Dialog opener
		_openDialog : function (sName, sPage, fInit) {

			// creates dialog list if not yet created
			if (!this._oDialogs) {
				this._oDialogs = {};
			}

			// creates requested dialog if not yet created
			if (!this._oDialogs[sName]) {
				Fragment.load({
					name: "promos.exad.EXAD2.view.targets.billingProcess.fragments." + sName,
					controller: this
				}).then(function(oDialog){
					this._oDialogs[sName] = oDialog;
					this.getView().addDependent(this._oDialogs[sName]);
					if (fInit) {
						fInit(this._oDialogs[sName]);
					}
					// opens the dialog
					this._oDialogs[sName].open(sPage);
				}.bind(this));
			} else {
				// opens the requested dialog
				this._oDialogs[sName].open(sPage);
			}
		}
		

		
	});
});