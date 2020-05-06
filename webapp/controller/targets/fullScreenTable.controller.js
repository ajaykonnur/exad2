sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"promos/exad/EXAD2/controller/messageHelper",
	"promos/exad/EXAD2/control/ExadTable",
	"promos/exad/EXAD2/controller/factory",
	"sap/ui/model/json/JSONModel"
], function (baseController, messageHelper, ExadTable, factory, JSONModel) {
	"use strict";

	var 	_Table = new ExadTable();

	return baseController.extend("promos.exad.EXAD2.controller.targets.detailView", {
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    		this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
			
		},
		
		handleRouteMatched:function() {
			this.setView();
			this.getFullScreenTable();
			this.getInitClientList();
			this.getSearchCriteria();
			this.getBreadcrumbsItem();
		},
		
		onClientSelected:function(oEvent){
			this.getProperties(oEvent);                     	
		},
	
		setView: function(){
			try{
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---main").getController();
				oController.toggleFunctionsArea();
				oController.toggleSidebarArea();
				//oController.setSidebarExpanded();
				
				
			}
			catch(err){
				this._fireInternalErrorOccurred(err);
			}
		},
		
		search: function(oEvent){
			var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
			var sEndpoint = oController.prepareSearchCriteria(this);
			if(_Table) {
				try {
					oController.getData(sEndpoint, _Table);	
					_Table._setVisibleRowCount(15);
					} catch (err) {
						this._fireInternalErrorOccurred(err);
						}
			}
		},
		
		getFullScreenTable: function(){
			
			var sTableName = this.getHashParameter();
			
			try {
				// get controller
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
				var oTable = oController.byIdView(sTableName);
				var oData = oTable.getModel();
				
				_Table = oTable.clone();
				_Table._bindColumns(oData);
				_Table._setVisibleRowCount(15);
		
				var oPanel = this.byIdView("fullScreenPanel");
				oPanel.destroyContent();	
				oPanel.addContent(_Table);
		
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		getInitClientList:function(){
			this.initializeClientList();
		},
		
		getSearchCriteria:function(){
			try{
				// get Client data from Master View
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
				var oClientInit = oController.byIdView("ClientSearch");
				var oClientControl = this.byIdView("ClientSearch");
			
				var oSelectedItem = oClientInit.getProperty("selectedKey");
				oClientControl.setSelectedKey(oSelectedItem);
				
				// get Property data from Master View
				var oPropInit = oController.byIdView("PropertySearch");
				var oPropControl = this.byIdView("PropertySearch");
				oPropControl.setModel(oPropInit.getModel()); // = oPropInit.clone();
			
				oSelectedItem = oPropInit.getProperty("selectedKey");
				oPropControl.setSelectedKey(oSelectedItem);
				
				// get DateRange data from Master View
				var oDateRangeInit = oController.byIdView("DateRangeSearch");
				var oDateRangeControl = this.byIdView("DateRangeSearch");
			
				var sSelectedValue = oDateRangeInit.getProperty("value");
				oDateRangeControl.setValue(sSelectedValue);
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		 
		_getInitClientList:function(){
			try {
				// get controller
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
				
				// Client Combobox
				var oClientCombo = oController.byIdView("ClientSearch");
				var oVbox = this.byIdView("ClientSearch");
				// save label for reinitialisation of Box
				var oLabel = oVbox.getAggregation("items")[0];
				var oLableClone = oLabel.clone();
				var oClientComboClone = oClientCombo.clone();
				oVbox.destroyItems();
				oVbox.addItem(oLableClone);
				oVbox.addItem(oClientComboClone);
				
				// Property Combobox
				var oPropertyCombo = oController.byIdView("PropertySearch");
				var oVboxProperty = this.byIdView("PropertySearch");
				oLabel = oVboxProperty.getAggregation("items")[0];
				oLableClone = oLabel.clone();
				var oPropertyComboClone = oPropertyCombo.clone();
				oVboxProperty.destroyItems();
				oVboxProperty.addItem(oLableClone);
				oVboxProperty.addItem(oPropertyComboClone);
				
				// DateRange
				var oDateRange = oController.byIdView("DateRangeSearch");
				var oVboxDateRange = this.byIdView("DateRangeSearch");
				oLabel = oVboxDateRange.getAggregation("items")[0];
				oLableClone = oLabel.clone();
				var oDateRangeClone = oDateRange.clone();
				oVboxDateRange.destroyItems();
				oVboxDateRange.addItem(oLableClone);
				oVboxDateRange.addItem(oDateRangeClone);
				
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
			
		},
		getBreadcrumbsItem: function(){
			try{	
				var aItem = [];
				var sTableName = this.getHashParameter();
				
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
				var oTabsView = oController.byIdView("ObjectPageLayout_");
				var sId = oTabsView.getScrollingSectionId();
				
				aItem = sId.split("---");
				aItem = aItem[1].split("--");
				aItem.push(sTableName);
				for(var i = 0; i < aItem.length ; i++){
					aItem[i].replace(/[^a-zA-Z ]/g, "");
					aItem[i] = messageHelper._getI18nMessage(aItem[i]);
				}
				var oBreadcrumbs = this.byIdView("detailBreadcrumbs");
				var oModel = new JSONModel();
				oModel.setData(aItem);
				oBreadcrumbs.setModel(oModel);
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		onBreadcrumbsPress: function(oEvent){
			var	sText = oEvent.getSource().getText();
			if( sText !== "Abrechnungsinformationen" ){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("billingProcessRoute", true);	
			}
			
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
});