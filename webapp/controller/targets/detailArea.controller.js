sap.ui.define([
	"promos/exad/EXAD2/controller/base.controller",
	"sap/ui/model/json/JSONModel",
	"promos/exad/EXAD2/controller/messageHelper",
	"promos/exad/EXAD2/control/ExadTable"
], function(BaseController, JSONModel, messageHelper, ExadTable) {
	
	"use strict";
	var	_oTable = new ExadTable();
	var _sTableName;
	return BaseController.extend("promos.exad.EXAD2.controller.targets.detailArea", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit : function () {
			this.initFormData();
		},
		
		onBeforeExit : function(){
			console.log("onBeforeExit triggered !! ");
		},
		onAfterRendering : function(){
			console.log("onAfterRendering triggered !! ");
		},
		onBeforeRendering : function(){
			console.log("onBeforeRendering triggered !! ");
		},
		

		initFormData: function(){
			try{	
				_sTableName = this.getHashParameter();
				var oController = sap.ui.getCore().byId("promos.exad.EXAD2---billingProcess").getController();
				_oTable = oController.byIdView(_sTableName);
				this.setDetailInfo(_oTable, _sTableName, 0);
			
				
			}catch(err){
				this._fireInternalErrorOccurred(err);				
			}
			
		},
		setDetailInfo:function(oTable, sTableName, iId){
			var aRowData;
			if( typeof iId === "number"){
				aRowData = oTable.getModel().RowData[iId];	
			}else{
				var oData = oTable.getModel().RowData;
				var iVal;
				for(var i = 0 ; i < oData.length ; i++){
					iVal = oData[i].mietobjektId;
					if(iId === iVal){
					//	iId = oData[i].id;
						aRowData = oData[i];
						break;
					}
				}
			}
			var oMetaData = oTable.getModel().ColumnData;
			var sVar, sVal ;
			for(  i = 0 ; i< oMetaData.length ; i++){
				sVar = oMetaData[i].name;
				sVal = aRowData[sVar];
				oMetaData[i].value = sVal;
			}
			var oModel = new JSONModel();
			oModel.setData(oMetaData);
			this.byIdView("detailForm").setModel(oModel);
			
			var oTitle = this.byIdView("title");
			var sTitle = sTableName + " " + aRowData["mietobjektId"];
			oTitle.setText(sTitle);
		},
		
		handelItemSelction: function(oEvent){
			var oRowContext = oEvent.getParameter("listItem");
			var sId = oRowContext.getProperty("title");
			this.setDetailInfo(_oTable, _sTableName, sId);

			
		}
				
	});
});