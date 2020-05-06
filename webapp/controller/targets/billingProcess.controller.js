sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"promos/exad/EXAD2/controller/messageHelper",
	"promos/exad/EXAD2/controller/factory",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"promos/exad/EXAD2/control/Utils"
], function (baseController, JSONModel, messageHelper, factory, Filter, FilterOperator, Utils) {
	"use strict";
	
	var _agreementAndMediumRequest = new JSONModel();
	var _billingPeriods = new JSONModel();
	var _mietobjekt = new JSONModel();
	var _mieter = new JSONModel();
	var _grundanteil = new JSONModel();
	var _geraet = new JSONModel();
	var _ablesewertes = new JSONModel();
	var _Versorgungsstruktur = new JSONModel();

	return baseController.extend("promos.exad.EXAD2.controller.targets.billingProcess", {
		
		
		onInit: function () {
			
			this.initializeClientList();
			this.initMetaData();
		},
		
		initMetaData: function(){
			_agreementAndMediumRequest = this.ExadRest ("models/agreementAndMediumRequest", _agreementAndMediumRequest);
		//	_billingPeriods = this.ExadRest ("models/billingPeriods", _billingPeriods);
			_mietobjekt  = this.ExadRest ("models/mietobjekt", _mietobjekt);
			_mieter		 = this.ExadRest ("models/mieter", _mieter);
			_grundanteil = this.ExadRest ("models/grundanteil", _grundanteil);
			_geraet 	 = this.ExadRest ("models/geraet", _geraet);
			_ablesewertes 	 = this.ExadRest ("models/ablesewert", _ablesewertes);
			_Versorgungsstruktur = this.ExadRest("models/versorgungseinheit",_Versorgungsstruktur);
		},
	
		onClientSelected: function(oEvent) {
			this.getProperties(oEvent);
		},
		
		onTenantRowSelectionChange: function(aSelIndices){
			// Prepare request Parameter
			var sParam;
			if(aSelIndices.length === 0){
				sParam = "?mietobjekt=0" ;
			}else if(aSelIndices.length ===1){
				 sParam = "?mietobjekt=" + aSelIndices[0];
			}else{
				sParam = "?";
				for (var i = 0 ; i < aSelIndices.length ; i++){
					 sParam = sParam + "mietobjekt-IN=" + aSelIndices[i] + "&";  // &mietobjekt-IN=102 + aSelIndices[0];	
				}
				sParam = sParam.slice(0, -1);
			}
			
			// Mieter
			var oTable = this.byIdView("Mieter");
			this.getExadRest(_mieter, oTable, sParam);
			
			// Grundanteile
			var oTableGrnd = this.byIdView("Grundanteil");
			this.getExadRest(_grundanteil, oTableGrnd, sParam);
			
			// Endgeräte
			var oTableGrt = this.byIdView("Geraet");
			this.getExadRest(_geraet, oTableGrt);
			
			// Ablesewerte
			var oTableAbw = this.byIdView("Ablesewerte");
			this.getExadRest(_ablesewertes, oTableAbw);
			
		},
		onTabSelcted: function(oEvent){
			var oTable;
			// var oItem = oEvent.getParameter("item");
			// var sObject = oItem.getProperty("text");
			var oItem = oEvent.getParameter("section");
			var sObject = oItem.getProperty("title");
			switch(sObject) {
				  
				  case "Mietstruktur":
				  	oTable = this.byIdView("Mietobjekte");
					this.getExadRest(_mietobjekt, oTable);
					break;
				  
				  case "Versorgungsstruktur":
				  	oTable = this.byIdView("Versorgungseinheiten");
					this.getExadRest(_Versorgungsstruktur, oTable);
					
					// Endgeräte
					var oTableGrt = this.byIdView("Geraet_");
					this.getExadRest(_geraet, oTableGrt);
						
					// Ablesewerte
					var oTableAbw = this.byIdView("Ablesewerte_");
					this.getExadRest(_ablesewertes, oTableAbw);
				 break;
				  
			 	  default:
				   
			 	}
		},
		_saveTableData: function(oObject, oTable, sParameter){
			
			var oParent = oTable.getParent();
			
			this.postExadRest(oObject, oParent, sParameter);
		
			
			
		},
		_search: function(oEvent){
			var sEndpoint = this.prepareSearchCriteria(this);
			var oTable = this.byIdView("accountingInfo");
			this.getData(sEndpoint, oTable);
			oEvent.getSource().setText(messageHelper._getI18nMessage("SearchButton"));
			oEvent.getSource().setType("Default");
		},
		prepareSearchCriteria: function(that){
			var oClient = that.byIdView("ClientSearch");
			var sSelectedClient = oClient.getProperty("selectedKey");
			if (sSelectedClient) {
				var oProperty = that.byIdView("PropertySearch");
				var sSelectedLiegenschaft = oProperty.getProperty("selectedKey");
				if(sSelectedLiegenschaft){
					var sEndpoint = sSelectedLiegenschaft;
					var oDatum	= that.byIdView("DateRangeSearch");
					var sDateRange = oDatum.getProperty("value");
					if (sDateRange){
						sDateRange = factory.DateFormatter(sDateRange);
						var	aDateRange = that.dateRangeSelection(sDateRange);
						sDateRange = "?BETWEEN_DATE=" + "gueltigVon-" + aDateRange[0] + "-gueltigBis-" + aDateRange[1];
						sEndpoint = sEndpoint + sDateRange;
					}
					return sEndpoint;
				}else{
					messageHelper.messageToast("PropertySelectionError");
				}
			}else{
				messageHelper.messageToast("ClientSelectionError");
			}
		},
		getData: function(sEndpoint, oTable){
			var oModel = new JSONModel();
			var aModelData = [];
			sEndpoint = oTable.getProperty("endpoint") + sEndpoint;
			this.getOwnerComponent().ExadRest(sEndpoint)
					.then(function (response) {
						aModelData.RowData = response.data;
						aModelData.ColumnData = _agreementAndMediumRequest.getData();
						oTable._bindColumns(aModelData);
						oTable.setModel(aModelData);
						oTable.setCount(aModelData.RowData.length);
						}).catch(function (error) {
							console.log(error.toJSON());
						});
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
					var oTable1 = this.byIdView("accountingInfo");
					var sEndpoint = oTable1.getProperty("endpoint") + sSelectedLiegenschaft;
					
					var oDatum	= this.byIdView("DateRangeSearch");
					var sDateRange = oDatum.getProperty("value");
					if (sDateRange){
						sDateRange = factory.DateFormatter(sDateRange);
						var	aDateRange = this.dateRangeSelection(sDateRange);
						sDateRange = "?BETWEEN_DATE=" + "gueltigVon-" + aDateRange[0] + "-gueltigBis-" + aDateRange[1];
						
						sEndpoint = sEndpoint + sDateRange;
					}	
						this.getOwnerComponent().ExadRest(sEndpoint)
							.then(function (response) {
								aModelData.RowData = response.data;
								aModelData.ColumnData = _agreementAndMediumRequest.getData();
								oTable1._bindColumns(aModelData);
								oTable1.setModel(aModelData);
								oTable1.setCount(aModelData.RowData.length);
								}).catch(function (error) {
									console.log(error.toJSON());
								});
					// var oTable2 = this.byIdView("accountigStatus");
					// var sEndpoint2 = oTable2.getProperty("endpoint") + sSelectedLiegenschaft;
					// this.getOwnerComponent().ExadRest(sEndpoint2)
					// 		.then(function (response) {
					// 			aModelData.RowData = response.data;
					// 			aModelData.ColumnData = _billingPeriods.getData();
					// 			oTable2._bindColumns(aModelData);
					// 			oTable2.setModel(aModelData);
					// 			oTable2.setCount(aModelData.RowData.length);
					// 			}).catch(function (error) {
					// 				console.log(error.toJSON());
					// 			});
							oEvent.getSource().setText(messageHelper._getI18nMessage("SearchButton"));
							oEvent.getSource().setType("Default");
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
		}
		

	});
});