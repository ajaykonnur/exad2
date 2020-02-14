sap.ui.define([
	"sap/ui/core/XMLComposite",
	"sap/base/Log",
	"sap/ui/model/json/JSONModel",
	"promos/exad/EXAD2/controller/messageHelper",
	"sap/m/MessageToast",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"promos/exad/EXAD2/control/Utils",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (XMLComposite, Log, JSONModel, messageHelper, MessageToast, Export, ExportTypeCSV, Utils, Filter, FilterOperator) {
	"use strict";
	return XMLComposite.extend("promos.exad.EXAD2.control.ExadTable", {
		messageHelper: messageHelper,

		metadata: {
			properties: {
				title: {
					type: "string",
					defaultValue: ""
				},
				count: {
					type: "float",
					defaultValue: 0
				},
				editable: {
					type: "boolean",
					defaultValue: false
				},
				endpoint: {
					type: "string",
					defaultValue: ""
				}
				// _oModel: {
				// 	type: "object"
				// }
			},
			events: {
				getCount : {
					parameters : {
						count : { type: "float"}
					}
				}
			}
		},

		/* 
		 ****************************************************************
		 ************			Lifecycle			****************
		 ****************************************************************
		 */

		init: function () {
			// this.getOwnerComponent().ExadRest.get(endpoint);
		},

		/*
		 ****************************************************************
		 ************			EVENTHANDLERS			****************
		 ****************************************************************
		 */

		onEditChange: function (oEvent) {
			var oSwitch = oEvent.getSource();
			this.setEditable(oSwitch.getState());
		// setIcon("sap-icon://unlocked")

		},

		onAddRowPress: function () {
			var oTable = this._getTable();
			var aTableVisibleColumns = oTable._getVisibleColumns();
			var sColumnName = "";
			var sNewLine = [];
			
			
			for (var i=0; i<aTableVisibleColumns.length; i++){
				sColumnName = aTableVisibleColumns[i].getLabel().getText();
				sNewLine.push(sColumnName);
				sNewLine.sColumnName = "test";
			}
			
			var oModel = oTable.getModel(); // this.getView().getModel();
			oModel.getData().statusTableDetails.push(sNewLine);
			
			// var aItems = oTable.getItems();
   // 		for (var i = 0; i < aItems.length; i++) {
   //     		aItems[i].getCells()[0].setEditable(aItems[i].getSelected());
   // 		}
			oModel.refresh();

		},

		onCopyRowPress: function (oEvent) {
			var oTable = this._getTable();
			var aSelectedIndices = oTable.getSelectedIndices();
			var oNewRow;
			if (aSelectedIndices.length === 0) {
				messageHelper.messageToast("TableSelectedRowError");
			} else {
				var oModel = oTable.getModel("undefined");
				for (var i = 0; i < aSelectedIndices.length; i++) {
					oNewRow = oModel.getData().statusTableDetails[aSelectedIndices[i]];
					oModel.getData().statusTableDetails.push(oNewRow); //Just add to the end of the table
				}
				oModel.refresh();
			}
		},

		onDeleteRowPress: function () {
			var oTable = this._getTable();
			var aSelectedIndices = oTable.getSelectedIndices();
			if (aSelectedIndices.length === 0) {
				messageHelper.messageToast("TableSelectedRowError");
			} else {
				var oModel = oTable.getModel("undefined");
				for (var i = 0; i < aSelectedIndices.length; i++) {
					oModel.getData().statusTableDetails.splice(aSelectedIndices, 1);
				}
				oModel.refresh();
			}
		},
		onSearch: function (oEvent) {
			// add filter for search
			var oTable = this._getTable();
			var aFilters = [];
		
			
			var sQuery = oEvent.getSource().getValue();
		//	if (sQuery && sQuery.length > 0) {
				var filter = new Filter([
					new Filter("Status", sap.ui.model.FilterOperator.Contains, sQuery),
					new Filter("Bezeicher", sap.ui.model.FilterOperator.Contains, sQuery),
					new Filter("Abr-Ztr", sap.ui.model.FilterOperator.Contains, sQuery),
					new Filter("Medium", sap.ui.model.FilterOperator.Contains, sQuery)
				],false);
		//	}
			aFilters.push(filter);
			
			var oBinding = oTable.getBinding("rows");
			oBinding.filter(aFilters, "Application");
		},
	
		_getVisibleColumns : function() {
			return this._getTable()._getVisibleColumns();
		},

		/* 
		 ****************************************************************
		 ************			table.Table 			****************
		 ****************************************************************
		 */

		bindColumns: function (sModelData) {
			var oTable = this._getTable();
			
			 
		//	 var oModel = new JSONModel(sModelData);
			 oTable.setModel(sModelData);
			 
			 var data=[];
					for(var i=0;i<oTable.getModel().oData.length;i++ ){
						data.push(oTable.getModel().oData[i].Name);
					}
			 
			 oTable.bindColumns("/", function (index, context) {
			 	
			 	
				var columnName = data[i]; // context.getProperty().columnName;

				return new sap.ui.table.Column({
					label: columnName,
					filterProperty: columnName,
					sortProperty: columnName,
					template: columnName
					// template: new sap.ui.commons.TextField({
					// 	value: {
					// 		path: "/TableDetails" + "/" + index.slice(-1) + "/" + columnName
					// 	},
					// 	editable: false
					// })

				});
			});
			
			oTable.bindRows("/");
			
		},
		_bindColumns: function (sModelData) {
			var oTable = this._getTable();
			
			
			var oModel = new JSONModel(sModelData);
			 oTable.setModel(oModel);
			 
			oTable.bindColumns("/statusColumnData", function (index, context) {

				var columnName = context.getProperty().columnName;

				return new sap.ui.table.Column({
					label: columnName,
					filterProperty: columnName,
					sortProperty: columnName,
					template: columnName
					// template: new sap.ui.commons.TextField({
					// 	value: {
					// 		path: "/TableDetails" + "/" + index.slice(-1) + "/" + columnName
					// 	},
					// 	editable: false
					// })

				});
			});

			oTable.bindRows("/statusTableDetails");
		},
		
		
		/* 
		 ****************************************************************
		 ************			HELPERS 			****************
		 ****************************************************************
		 */

		_getTable: function () {
			var oTable = this.getAggregation("_content"); //this only works as long as there is no other content?!
			if (!oTable || Array.isArray(oTable)) {
				Log.error("oTable is undefined or is of type array.", "_getTable", this);
			}
			return oTable;
		},
		clearAllSortings : function(oEvent) {
			var oTable = this._getTable();
			oTable.getBinding("rows").sort(null);
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				aColumns[i].setSorted(false);
				oTable.filter(aColumns[i], null);
			}
		},

		
		getSelectedIndices: function() {
			return this._getTable().getSelectedIndices();
		},
		getSelectedObjectKeys: function(sKey, bEnableAll) {
			var aObjectKey = [];
			
			if (typeof sKey === "boolean") {
				bEnableAll = sKey;
				sKey = "";
			}
			
			if (!sKey) {
				sKey = "ObjectKey";
			}
	
			try {
				var aSelectedIndices = this.getSelectedIndices();
				
				if (aSelectedIndices.length > 0) {
					// @since 1.0.34
					// On the table there should be already the key enableObjectKeyAll = "true" and the function whould be called 
					// with the parameter bEnableAll = "true"
					if (bEnableAll && aSelectedIndices.length === this._getTable().getBinding("rows").getLength() && this._getTable().getBinding("rows").getLength() > 0) {
						aObjectKey.push("ALL");
						return aObjectKey;
					}
					
					for (var i = 0; i < aSelectedIndices.length; i++) {
						var oRowContext = this._getTable().getContextByIndex(aSelectedIndices[i]);
						if (oRowContext) {
							var sObjectKey = oRowContext.getProperty(sKey);
							aObjectKey.push(sObjectKey);
						}
					}
				}
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
	
			return aObjectKey;
		},
		_getBindingPath : function(bWithoutSlash) {
			var sPath = "/";
			var oBinding = this._getTable().getBinding("rows");
			if (oBinding) {
				sPath = oBinding.getPath();
			}
			
			if (bWithoutSlash) {
				if (sPath.length > 1) {
					sPath = sPath.substring(1);
				} else {
					sPath = "";
				}
			}
			
			return sPath;
		},
	
		_formatRowDataToLocale : function(oCsvRow) {
			var oRow = Utils.deepCopy(oCsvRow);
			var sPropName, sPropType, oProp;
			
			for (sPropName in oRow) {
				if (oRow.hasOwnProperty(sPropName)) {
					oProp = sPropName; //this.getPropertyByName(sPropName);
					sPropType = typeof (oProp) ;// this.getTypeProperty(oProp);
					switch (sPropType) {
						case "Edm.Decimal":
							oRow[sPropName] = Utils.getFloatInstance().format(oRow[sPropName]);
							break;
						case "Edm.DateTime":
							if (oRow[sPropName] instanceof Date) {
								oRow[sPropName] = Utils.getDateInstance().format(oRow[sPropName]);
							}
							break;
						case "Edm.Time":
							oRow[sPropName] = Utils.timeToString(oRow[sPropName]);
							break;
						case "Edm.Boolean":
							if (oRow[sPropName]) {
								oRow[sPropName] = "X";
							} else {
								oRow[sPropName] = "";
							}
							break;
						default:
							// nothing
					}
				}
			}
			
			return oRow;
		},
	
		_getSelectedRowsAsModel: function(oModel) {
			var oJsonModel = null;
		
			if (!oModel) {
				return oJsonModel;
			}
			
			var aSelectedObjectKey = this.getSelectedObjectKeys();
			
			var _fnGrep = function(aAllData, sObjectKey) {
				return jQuery.grep(aAllData, function(element) {
					return element.ObjectKey === sObjectKey;
				});
			};
			
			var aCsv = [];
			var sDataPropName = this._getBindingPath(true);
			// Use of Contexts since we want to be able to export filtered data as well.
			// The use of oModel.getData() retrieves all the data, independently of the filtered data
			//var aAllData = oModel.getData();
			var aAllData = [];
			
			var oRowBinding = this._getTable().getBinding("rows");
			
			if (oRowBinding) {
				var aContext = oRowBinding.getContexts();
				aContext.forEach(function(oContext) {
					aAllData.push(oContext.getObject());
				});
			}
			
			if (aAllData.length > 0) {
				// AZ It is not needed anymore since we use the Context and not the Model
				// if (sDataPropName) {
				// 	aAllData = aAllData[sDataPropName];
				// }
					
				if (aSelectedObjectKey && aSelectedObjectKey.length > 0) {
					for(var i = 0; i < aSelectedObjectKey.length; i++) {
						var aCsvModel = _fnGrep(aAllData, aSelectedObjectKey[i]);
						if (aCsvModel && aCsvModel[0]) {
							aCsv.push(this._formatRowDataToLocale(aCsvModel[i]));
						}
					}
				} else {
					for (var k = 0; k < aAllData.length; k++) {
						aCsv.push(this._formatRowDataToLocale(aAllData[k]));
					}
				}
				
				
				if (sDataPropName) {
					var oCsvModel = {};
					oCsvModel[sDataPropName] = aCsv;
					aCsv = oCsvModel;
				}
				
				oJsonModel = new JSONModel(aCsv);
			}
			
			return oJsonModel;
		},
		
		_getDataModel: function() {
			var oModel = null;
			oModel = this.getModel();
			if (!oModel && this._getView()) {
				oModel = this._getView().getModel();
			}
			if (!oModel && this._getView()) {
				oModel = this._getView().getController().getModel();
			}
			
			return oModel;
		},
		_getView: function() {
			try {
				if (!this._oView) {
					var oObj = this.getParent();
					while (oObj) {
						if (oObj instanceof sap.ui.core.mvc.View) {
							this._oView = oObj;
							break;
						}
						oObj = oObj.getParent();
					}
				}
				
				if(!this._oView) {
					jQuery.sap.log.warning("The Parent of the Table is not the View. Use the Public Method setView of the EnhancedUITable please!");
				}
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
	
			return this._oView;
		},
		
			/* 
		 ****************************************************************
		 ************				EXPORT	   		 	 ****************
		 ****************************************************************
		 */
		
		_getExportColumns : function() {
			var aExportColumns = [];
			var aTableColumns = jQuery.grep(this._getTable().getColumns(), function(element) {
				return element.getVisible() === true;
			});
	
			for (var i = 0; i < aTableColumns.length; i++) {
				var oCol = aTableColumns[i];
				var oItem = {};
				oItem.name = oCol.getLabel().getText();
				oItem.template = {
					content: {
						path: oCol.getLabel().getText() // oCol.data("columnName")
					}
				};
	
				aExportColumns.push(oItem);
			}
			
			return aExportColumns;
		},
			
		exportToCSV : function(oEvent) {
		
			var oModel = this._getSelectedRowsAsModel(this._getTable().getModel());
		//	var oTable = this._getTable();
			if (!oModel){
			 	oModel = this._getTable().getModel();
			 }
		//	 oTable.setModel(oModel);
			 

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					// separatorChar : ";"
					separatorChar: ";",
				}),

				// Pass in the model created above
				
				 models : oModel, // this._getTable().getModel(),

				// // binding information for the rows aggregation
			
				 rows : {
				 	path : "/statusTableDetails"
				 },

				// // column definitions with column name and binding info for the content
				
				columns: this._getExportColumns()
				
				// columns : {
				// //	path: "/statusColumnData",
				// 	label: "columnName",
				// 	template: {
				// 		content : "{columnName}"
				// 	}
				// //	path: "/statusColumnData",
				// //	template : {
				// //		content : "{columnName}"
				// //	}
				// }
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		}
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
});