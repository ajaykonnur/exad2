sap.ui.define([
	"sap/base/Log"
], function (Log) {
	"use strict";

	return {

		bindColumns: function (oTable, sPath, sModel) {
			if (oTable === undefined) {
				Log.error("oTable is undefined.", "bindColumns", this);
			}else{
				 oTable.bindColumns(sPath, function(index, context) {  
	
				  var columnName = context.getProperty().columnName; 
				  
				  return new sap.ui.table.Column({  
				    label: columnName , 
				    template: new sap.ui.commons.TextField ({value: { path: "/tableDetails" + index + "/" + columnName } })
		
				  });  
				});  
				oTable.bindRows('/tableDetails');
				oTable.setModel(new sap.ui.model.json.JSONModel([{}]) ,'/tableDetails');
			}
		}
	};

});