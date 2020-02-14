sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/Table",
	"sap/m/MessageToast",
	"promos/exad/EXAD2/controller/factory",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (baseController, JSONModel, Table, MessageToast, factory, Fragment, Filter, FilterOperator) {
	"use strict";

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {

		onInit: function () {
			
			
			// var oTable1 = this.byIdView("accountingInfo");
			// var oModelData = this.getOwnerComponent().getModel("mockdata").getProperty("/statusInfoTableData"); // getProperty("/accountingInfoTableData");
		
			// oTable1._bindColumns(oModelData);
			
			// set model to table
			// var oTable2 = this.byIdView("accountigStatus");
			// var oModelData2 = this.getOwnerComponent().getModel("mockdata").getProperty("/statusInfoTableData") // getProperty("/accountingInfoTableData");
			// oTable2._bindColumns(oModelData2);
			// var oTable2 = this.byIdView("accountigStatus");
			// var oModelData2 = this.getOwnerComponent().getModel("mockdata").getProperty("/statusInfoTableData");
			// var oModel2 = new JSONModel(oModelData2);
			// oTable2.bindColumns("/statusColumnData", oModel2);
			
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
							//	alert("fail to post"); 
							} 
				
			});
			
			this.byIdView("ClientSearch").setModel(oModel);
		
		},

		onClientSelected: function(oEvent) {
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
			this.byIdView("PropertySearch").setModel(oModel);
			}
		},
		Search : function(oEvent){
			// var aFilters = [];
			var	aFilters = this.getFilters();

			var oProperty = this.byIdView("PropertySearch");
			var oSelectedItem = oProperty.getProperty("selectedKey");
			var oModel = new JSONModel();
			var oTable1 = this.byIdView("accountingInfo");
				
				var aData = jQuery.ajax({ 
							type: "GET", 
							contentType: "application/json", 
							url: "https://hyjal.promos-consult.de:9443/JExadCore/rest/dto/agreementAndMediumRequest/" + oSelectedItem,
							dataType: "json",
							success: function(json) {
								oModel.setData(aData.responseJSON);             // fill the received data into the JSONModel      
							//	oTable1._bindColumns(oModel);
							},
							error: function(json) {
								alert("fail to retrieve Abrechnung data"); 
							} 
				});
		
			// set model to table
			// var oTable1 = this.byIdView("accountingInfo");
			// oTable1._bindColumns(oModel);
			var oModelData = this.getOwnerComponent().getModel("mockdata").getProperty("/statusInfoTableData"); // getProperty("/accountingInfoTableData");
			oTable1._bindColumns(oModelData);
		
		},
		getFilters : function (){
			var oFilters = [];
			var oProperty = this.byIdView("PropertySearch");
			var oSelectedItem = oProperty.getProperty("selectedKey");
			if (oSelectedItem){
				oFilters.push(new Filter("liegenschaft", FilterOperator.EQ, oSelectedItem));
			};
			
			var oDateRange = this.byIdView("DateRangeSearch");
			var oMaxDate = oDateRange.oMaxDate;
			var oMinDate = oDateRange.oMinDate;
			if (oMaxDate){
				oFilters.push(new Filter("DateRange", FilterOperator.BT, oMaxDate, oMinDate));
			};
			return oFilters;
		},
		onDetailNavigation : function (oEvent) {
			var sKey = oEvent.getSource().getId();
			var temp = [];
			temp = sKey.split("--");
			sKey = temp[temp.length -1] ;
			if (sKey === undefined) {
				this.superLogError("Route not defined");
			}
			this.superNavTo(sKey + "Route");
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
		
		
	
		
	
		
		

	});
});