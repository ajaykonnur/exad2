sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"promos/exad/EXAD2/controller/messageHelper",
	"promos/exad/EXAD2/controller/factory",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (baseController, JSONModel, messageHelper, factory, Filter, FilterOperator) {
	"use strict";
	
	var _agreementAndMediumRequest = new JSONModel();

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {
		
		
		onInit: function () {
	
			var oModel = new JSONModel();
			var aPath = "/entities/Kunde";
			oModel = this.ExadRest(aPath, oModel);
			this.byIdView("ClientSearch").setModel(oModel);
			
			_agreementAndMediumRequest = this.ExadRest ("models/agreementAndMediumRequest", _agreementAndMediumRequest);
		},

		onClientSelected: function(oEvent) {
			var oSelectItemKey = oEvent.getParameter("selectedItem").getKey();
			if (oSelectItemKey) {
				var oModel = new JSONModel();
				var aPath = "/entities/liegenschaft?kunde=" + oSelectItemKey;
				oModel = this.ExadRest(aPath, oModel);
				this.byIdView("PropertySearch").setModel(oModel);
			}
		},
		
		Search : function(oEvent){
			
			var oClient = this.byIdView("ClientSearch");
			var sSelectedClient = oClient.getProperty("selectedKey");
			if (sSelectedClient) {
				var oProperty = this.byIdView("PropertySearch");
				var sSelectedLiegenschaft = oProperty.getProperty("selectedKey");
				if(sSelectedLiegenschaft){
					var oModel = new JSONModel();
					var aModelData = [];
				//	var	aFilters = this.getFilters();
					var oTable1 = this.byIdView("accountingInfo");
					
					var oDatum	= this.byIdView("DateRangeSearch");
					var sDateRange = oDatum.getProperty("value");
					if (sDateRange){
						sDateRange = factory.DateFormatter(sDateRange);
						var	aDateRange = sDateRange.split("-");
						sDateRange = "gueltigVon-" + aDateRange[0] + "-gueltigBis-" + aDateRange[1] + ")";
						this.getOwnerComponent().ExadRest(oTable1.getProperty("endpoint")+ sSelectedLiegenschaft + "?BETWEEN_DATE(" + sDateRange )
						.then(function (response) {
							aModelData.statusTableDetails = response.data;
							aModelData.statusColumnData = _agreementAndMediumRequest.getData();
							oTable1._bindColumns(aModelData);
							oTable1.setCount(aModelData.statusTableDetails.length);
							}).catch(function (error) {
											  //  console.log(error.toJSON());
							});
						oEvent.getSource().setText(messageHelper._getI18nMessage("SearchButton"));
						oEvent.getSource().setType("Default");
					}else{
						this.getOwnerComponent().ExadRest(oTable1.getProperty("endpoint")+ sSelectedLiegenschaft)
							.then(function (response) {
								aModelData.statusTableDetails = response.data;
								aModelData.statusColumnData = _agreementAndMediumRequest.getData();
								oTable1._bindColumns(aModelData);
								oTable1.setCount(aModelData.statusTableDetails.length);
								}).catch(function (error) {
												  //  console.log(error.toJSON());
								});
							oEvent.getSource().setText(messageHelper._getI18nMessage("SearchButton"));
							oEvent.getSource().setType("Default");
					}
				}else{
					messageHelper.messageToast("PropertySelectionError");
				}
			}else{
				messageHelper.messageToast("ClientSelectionError");
			}
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
		},
	
		ExadRest: function(sPath, oModel ){
			this.getOwnerComponent().ExadRest(sPath)
				.then(function (response) {
										oModel.setData(response.data); 
						}).catch(function (error) {
										  //  console.log(error.toJSON());
								});
			return oModel;
		}
		
		
	
		

	});
});