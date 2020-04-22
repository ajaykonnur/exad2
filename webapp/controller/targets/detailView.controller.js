sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"promos/exad/EXAD2/control/ExadTable"
], function (baseController, ExadTable) {
	"use strict";


	return baseController.extend("promos.exad.EXAD2.controller.targets.detailView", {
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    		this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
			
		},
		
		handleRouteMatched:function() {
			this.setView();
			this.getFullScreenTable();
			this.getSearchCriteria();
			this.getBreadcrumbsItem();
		},
	
		setView: function(){
			var oController = sap.ui.getCore().byId("promos.exad.EXAD2---main").getController();
			oController.toggleFunctionsArea();
			oController.toggleSidebarArea();
		},
		
		getFullScreenTable: function(){
			
			var sTableName = this.getHashParameter();
			
			try {
				// get controller
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
				var oTable = oController.byIdView(sTableName);
				var oData = oTable.getModel();
				
				var oTableClone = new ExadTable();
				oTableClone = oTable.clone();
				oTableClone._bindColumns(oData);
				
				oTableClone._setVisibleRowCount(20);
				var oPanel = this.byIdView("fullScreenPanel");
				oPanel.destroyContent();	
				oPanel.addContent(oTableClone);
				
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		getSearchCriteria:function(){
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
			var lItem = [];
			
			var sTableName = this.getHashParameter();
			
			
			var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
			var oTabsView = oController.byIdView("ObjectPageLayout_");
			var sId = oTabsView.getScrollingSectionId();
			
			lItem = sId.split("--");
			lItem.push(sTableName);
			
			var oBreadcrumbs = this.byIdView("detailBreadcrumbs");
			for (var i = 1 ; i < lItem.length ; i++){
				 oBreadcrumbs.setCurrentLocationText(lItem[i]);	
				//oBreadcrumbs.addLink(lItem);
			}
			
		},
		
		getHashParameter: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var sHash = oRouter.oHashChanger.hash ;
			
			var temp = sHash.split("/");
			sHash = temp[temp.length -1] ;
			return sHash;
		}
	});
});