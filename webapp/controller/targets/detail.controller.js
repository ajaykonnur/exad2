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
			
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    		this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
    		
		},
		handleRouteMatched:function() {
			this.setView();
			this.getListData();
			this.getBreadcrumbsItem();
		},
		setView: function(){
			var oController = sap.ui.getCore().byId("promos.exad.EXAD2---main").getController();
			oController.toggleFunctionsArea();
			oController.toggleSidebarArea();
		},
		getListData: function(){
			
			var sTableName = this.getHashParameter();
			
			try {
				// get controller
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
				var oTable = oController.byIdView(sTableName);
				var RowData = oTable.getModel().RowData;
				//var RowData  = oData.RowData;
				var oModel = new JSONModel();
				oModel.setData(RowData);
				
				var oList = this.byIdView("list");
				oList.setModel(oModel);
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
	
		_onMetadataLoaded : function () {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getModel("detailView"),
				oLineItemTable = this.byId("lineItemsList"),
				iOriginalLineItemTableBusyDelay = oLineItemTable.getBusyIndicatorDelay();

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/lineItemTableDelay", 0);

			oLineItemTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for line item table
				oViewModel.setProperty("/lineItemTableDelay", iOriginalLineItemTableBusyDelay);
			});

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},
		onTabSelect : function(oEvent){
			var sSelectedTab = oEvent.getParameter("selectedKey");
			this.getRouter().navTo("object", {
				objectId: this._sObjectId,
				query: {
					tab: sSelectedTab
				}
			}, true);// true without history

		},

		/**
		 * Set the full screen mode to false and navigate to master page
		 */
		onCloseDetailPress: function () {
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
			// No item should be selected on master after detail page is closed
			this.getOwnerComponent().oListSelector.clearMasterListSelection();
			this.getRouter().navTo("master");
		},

		/**
		 * Toggle between full and non full screen mode.
		 */
		toggleFullScreen: function () {
			var bFullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
			if (!bFullScreen) {
				// store current layout and go full screen
				this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
				this.getModel("appView").setProperty("/layout", "MidColumnFullScreen");
			} else {
				// reset to previous layout
				this.getModel("appView").setProperty("/layout",  this.getModel("appView").getProperty("/previousLayout"));
			}

		},
		getBreadcrumbsItem: function(){
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