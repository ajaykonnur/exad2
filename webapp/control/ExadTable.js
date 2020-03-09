sap.ui.define([
	"sap/ui/core/XMLComposite",
	"sap/base/Log",
	"sap/ui/model/json/JSONModel",
	"promos/exad/EXAD2/controller/messageHelper",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"promos/exad/EXAD2/control/Utils",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function (XMLComposite, Log, JSONModel, messageHelper, Export, ExportTypeCSV, Utils, Filter, FilterOperator, Fragment ) {
	"use strict";
	
	var _oJSONModel;
	var _oDataInitial = new sap.ui.base.Object();

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
				},
				selectionMode:{
					type: "string",
					defaultValue: "MultiToggle"
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
		 ***************			Lifecycle			*****************
		 **************************************************************** 
		 */
		 
		/**
		* This file defines behaviour for the control,
		*/	

		init: function () {
			// var oComp = sap.ui.getCore().getComponent( "promos.exad.EXAD2");
			this._getTable().setVisibleRowCount(0);
			
			var oTable = this._getTable();
			if (oTable.getModel()){
				_oDataInitial = new sap.ui.base.Object();
				_oDataInitial.ColumnData = this._getTable().getModel().getData().ColumnData;
				_oJSONModel = new JSONModel(jQuery.extend(true, {}, _oDataInitial));
				_oJSONModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);	
			}
		},
		
		/**
		* Initialises the metadata necessary to create the table
		* 
		* @private
		*/
		_initialiseMetadata: function() {
		try {
			
		}catch (err) {
			
		}
			
		},
		
		/**
		 * Called once the necessary Model metadata is available
		* 
		* @private
		*/
		_onMetadataInitialised: function(aCustomizingField) {
		
		},
		
		/***********************************************************************************/
		/********************             GETTERS / SETTERS         ************************/
		/***********************************************************************************/
	
		/**
		 * Returns the number of visible rows that the user wants to show.
		 * 
		 * @returns {int} number of user specific visible rows
		 * @public
		 */ 
		getUserSpecificVisibleRowCount: function() {
			
			
		},
		/**
		* Sets the number of user specific visible rows.
		* 
		* @param {int} iValue - number of user specific visible rows.
		* @public
		*/ 
		setUserSpecificVisibleRowCount: function(iValue) {
			
		},
		
		/**
		* Returns the name of the Entity that was applied to the Enhanced Table.
		* 
		* @returns {string} The name of the Entity of the table.
		* @public
		*/
		getEntity: function() {
			var sEntity = "";
			try {
				var sEntitySet = this.getEntitySet();
				if (sEntitySet.endsWith("Set")) {
					sEntity = sEntitySet.slice(0, sEntitySet.length - 3);
				}
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
	
			return sEntity;
		},
		
		/**
		* Returns the NoData aggregation
		* 
		* @return {sap.ui.core.Control|string} the NoData aggregation
		* @public
		*/ 
		getNoData: function() {
			return this._oNoData;
		},
		
		_getTable: function () {
			var oTable = this.getAggregation("_content"); //this only works as long as there is no other content?!
			if (!oTable || Array.isArray(oTable)) {
				Log.error("oTable is undefined or is of type array.", "_getTable", this);
			}
			return oTable;
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
		
		
		/**
		 * Sets the Editable property of the table
		 * 
		 * @param {Boolean} bEdit - True or False
		 * @public
		 */ 
		setEditable: function(bEdit) {
		
		},
		
		/**
		* Sets the text on the Toolbar of the Table.
		* Refreshes the number of rows found, if requested.
		* 
		* @param {string} sText - The header text of the table
		* 
		* @public
		*/ 
		setHeader: function(sText) {
			try {
				this.setProperty("header", sText, true);
				if (this.getShowRowCount()) {
					this._refreshHeaderText();
				}
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		/**
		 * Sets the NoData aggregation
		 * 
		 * @param {sap.ui.core.Control} oNoData - instance of the NoData control
		 * @public
		 */ 
		setNoData: function(oNoData) {
			try {
				// overwrite the original aggregation setter, otherwise parent relationship will be destroyed when a control is set to the inner table's
				// noData aggregation
				this._oNoData = oNoData;
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		/**
		* Sets the ShowRowCount property of the table
		* 
		* @param {Boolean} bShow - True or False
		* @public
		*/ 
		setShowRowCount: function(bShow) {
			try {
				this.setProperty("showRowCount", bShow, true);
				this._refreshHeaderText();
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		/**
		 * Sets the UseTablePersonalisation property of the table
		 * 
		 * @param {Boolean} bUseTablePersonalisation - True or False
		 * @public
		 */ 
		setUseTablePersonalisation: function(bUseTablePersonalisation) {
			
		},
		
		
		/***********************************************************************************/
		/********************             OVERWRITE                 ************************/
		/***********************************************************************************/
	
		/**
		 * @overwrite
		 * Binds the model to the rows of the table.
		 * 
		 * @param {string} sPath The path of the model to bind
		 * @public
		 */
		bindRows: function(sPath) {
			
		},
		
		/***********************************************************************************/
		/********************             PUBLIC METHODS            ************************/
		/***********************************************************************************/
		
		/**
		 * Sets the Editable property of each Cell to true, if the cells support the property
		 * 
		 * @remarks Works only for cells that inherit from sap.m.InputBase
		 * 
		 * @public
		 */
		setCellsEditable: function() {
			var oTable = this._getTable();
		//	var aRows = this.getRows();
			var oRows = this._getSelectedRowsAsModel(oTable.getModel());
			for (var i = 0; i < aRows.length; i++) {
				var oRow = aRows[i];
				var aCells = oRow.getCells();
	
				for (var m = 0; m < aCells.length; m++) {
					var oCell = aCells[m];
					if (oCell && oCell.setEditable) {
						oCell.setEditable(true);
					}
				}
	
			}
		},
		
		/**
		 * Exports all the content of the table in a CSV file with filename and separator.
		 * 
		 * @param {string} [fileName=export] - The name of the downloaded file
		 * @param {string} [separator=;] - The CSV separator
		 * 
		 * @public
		 */
		exportToCSV : function(oEvent) {
			
			var oTable = this._getTable();
			var oModel = this._getSelectedRowsAsModel(oTable.getModel());
			if (!oModel){
			 	oModel = this._getTable().getModel();
			 }
			var oExport = new Export({
				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					// separatorChar : ";"
					separatorChar: ";",
				}),
				
				// Pass in the model created above
				models : oModel, // this._getTable().getModel(),

				// binding information for the rows aggregation
				 rows : {
				 	path : "/RowData"
				 },

				// column definitions with column name and binding info for the content
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
				this._fireInternalErrorOccurred(oError);
				//MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		},
		
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
		
		
		/**
		* Returns the name of the binding path on the table.
		* @param {boolean} bWithoutSlash - in case the leading Slash ("/") is not needed
		* @result {string} the name of the binding path
		* @private
		*/ 
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
		
		
		/**
		 * Returns the Property names for each column.
		 * 
		 * @return {string[]} - Array of strings with the Odata Property name of each column.
		 */
		getColumnList: function() {
			var aReturnedColumns = [];
	
			try {
				var aColumns = this.getColumns();
				for (var i = 0; i < aColumns.length; i++) {
					var oCol = aColumns[i];
					var sName = oCol.data("columnName");
					if (!sName) {
						sName = oCol.getName();
					}
					if (!sName) {
						sName = oCol.getId();
						jQuery.sap.log.warning("[WARNING]", "No Column name found for the column: " + sName);
					}
					aReturnedColumns.push(sName);
				}
	
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
	
			return aReturnedColumns;
		},
		
		
		/**
		* Returns the Bound Object of the Selected Row.
		* 
		* @returns {Object} The Object bound to the selected row.
		* 
		* @public
		*/ 
		getSelectedRowObject: function() {
			var oRowObject = null;
			var iSelectedIndex = this.getSelectedIndex();
			if (iSelectedIndex > -1) {
				var oRowContext = this.getContextByIndex(iSelectedIndex);
				oRowObject = oRowContext.getObject();
			}
			
			return oRowObject;
		},
		
		/**
		 * Returns a single ObjectKey for the selected row.
		 * 
		 * @returns {string} Selected ObjectKey
		 * 
		 * @public
		 */
		getSelectedObjectKey: function() {
			
		},
		
		/**
		 * Returns an array of ObjectKey for the selected rows.
		 * 
		 * @returns {string[]} Array of ObjectKeys
		 * 
		 * @public
		 */
		_getSelectedObjectKeys: function() {
			var aObjectKey = [];
	
			var aSelectedIndices = this.getSelectedIndices();
	
			for (var i = 0; i < aSelectedIndices.length; i++) {
				var oRowContext = this.getContextByIndex(aSelectedIndices[i]);
				if (oRowContext) {
					var sObjectKey = oRowContext.getProperty("ObjectKey");
					aObjectKey.push(sObjectKey);
				}
			}
	
			return aObjectKey;
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
		
		getSelectedIndices: function() {
			return this._getTable().getSelectedIndices();
		},
		
		/**
		 * Used to set the View Object on the Table for internal use.
		 * 
		 * Use this method in case the Parent of the Table is not directly the View, but
		 * another Control.
		 * 
		 * @param {sap.ui.core.mvc.View} oView - The View containing this table
		 * 
		 * @public
		 */ 
		setView: function(oView) {
			this._oView = oView;
		},
		
		
		/***********************************************************************************/
		/********************             PRIVATE METHODS           ************************/
		/***********************************************************************************/
		
		/**
		 * Logs an error to the console
		 * 
		 * @param {string|Object} error - The error to log
		 * 
		 * @remarks If the parameter <code>error</code> is an object it will be stringyfied.
		 * 
		 * @private
		 */ 
		_logError: function(error) {
			var sError = error;
			if (typeof error !== "string") {
				sError = JSON.stringify(error);
			}
			
			jQuery.sap.log.error("_logError", sError);
		},
		
		/**
		 * Help Method for the InternalErrorOccurred Event Call.
		 * 
		 * @param {Object} err The error to pass to the event handler
		 */
		_fireInternalErrorOccurred: function(err) {
			this._logError(err);
			this.fireInternalErrorOccurred({
				err: err
			});
		},
		
		/**
		 * Modifies the Editable property of a single cell inside a given row (oRow). The cell
		 * is defined by the name of the column from (sFieldName).
		 * 
		 * @param {object} oRow - A row of the table
		 * @param {boolean} bEditable - Boolean value true or false
		 * @param {string} sFieldName - The name of the column in the row (so the Cell)
		 */
		_setRowEditable: function(oRow, bEditable, sFieldName) {
			try {
				var sODataPropertyName = this.formatter.formatSapPropertyNameToODataPropertyName(sFieldName);
				var aCells = oRow.getCells();
	
				for (var i = 0; i < aCells.length; i++) {
					var oCell = aCells[i];
					var sCellColumnName = oCell.data("columnName");
					if (oCell.setEditable) {
						if (sODataPropertyName === "") {
							/* If there is no field name, then all the cells of the row should be set */
							oCell.setEditable(bEditable);
						} else if (sCellColumnName === sODataPropertyName) {
							/* If there is a field name, set only the cell with that column name */
							oCell.setEditable(bEditable);
							break;
						}
					}
	
				}
	
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		/**
		 * searches for the controls view
		 * 
		 * @returns {sap.ui.core.mvc.View} The found parental View
		 * @private
		 */
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
		
		getView: function() {
			return this.view;
		},
		
		
		getFragmentId: function() {
			var	aId = this.getId().split("--");
			var sFragmentId = this._getView().createId(aId[2]);
			return sFragmentId;
		},
		
		/**
		 * sets the header text
		 * 
		 * @private
		 */
		_refreshHeaderText: function() {
			try {
				if (!this._headerText) {
					this._bUpdateToolbar = true;
					return;
				}
	
				var sText = this.getHeader();
				if (this.getShowRowCount()) {
					sText += " (" + this._getRowCount() + ")";
				}
	
				this._headerText.setText(sText);
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		clearFiltersAndSorters: function(oEvent) {
			var oTable = this._getTable();
			oTable.getBinding("rows").sort(null);
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				aColumns[i].setSorted(false);
				oTable.filter(aColumns[i], null);
			}
		},
		
		/**
		 * gets table's row count
		 * 
		 * @private
		 * @returns {integer} the row count
		 */
		_getRowCount: function() {
			var iRowCount = 0;
	
			try {
				var oRowBinding = this._getRowBinding();
	
				if (!oRowBinding) {
					return 0;
				}
	
				if (oRowBinding.getTotalSize) {
					iRowCount = oRowBinding.getTotalSize();
				} else {
					iRowCount = oRowBinding.getLength();
				}
	
				if (iRowCount < 0 || iRowCount === "0") {
					iRowCount = 0;
				}
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
	
			return iRowCount;
		},
		
		/**
		 * returns the row/items binding of the currently used internal table
		 * 
		 * @private
		 * @returns {sap.ui.model.Binding} the row/items binding
		 */
		_getRowBinding: function() {
			try {
				return this.getBinding(this._sAggregation);
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
	
			return null;
		},
		
		/**
		 * Sets the no data text to the internal table
		 * 
		 * @param {string} sOverwriteText - optional text to set on the table
		 * @private
		 */
		_setNoDataText: function(sOverwriteText) {
			var fSetFunction = this.setNoData;
	
			try {
				if (!fSetFunction) {
					fSetFunction = this.setNoDataText;
				}
	
				if (!fSetFunction) {
					return;
				}
	
				var oNoData = sOverwriteText;
				if (!oNoData) {
					oNoData = this.getNoData();
				}
	
				if (!oNoData) {
					oNoData = sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("SMARTTABLE_NO_RESULTS");
				}
	
				fSetFunction.call(this, oNoData, true);
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		/**
		 * gets the array of visible column path that is used to create the select query
		 * 
		 * @private
		 * @returns {Array|[]} array of column paths
		 */
		_getVisibleColumnPaths: function() {
			var aSelect = [];
	
			try {
				var aColumns = this.getColumns();
				var i;
				var iLen = aColumns ? aColumns.length : 0;
				var oColumn, oColumnData, sPath, sAdditionalPath;
	
				for (i = 0; i < iLen; i++) {
					oColumn = aColumns[i];
					sPath = null;
					if (oColumn.getVisible()) {
						if (oColumn.getLeadingProperty) {
							sPath = oColumn.getLeadingProperty();
						}
	
						oColumnData = oColumn.data("p13nData");
						if (oColumnData) {
							if (!sPath) {
								sPath = oColumnData["leadingProperty"];
							}
							sAdditionalPath = oColumnData["additionalProperty"];
						}
	
						if (sPath && aSelect.indexOf(sPath) < 0) {
							aSelect.push(sPath);
						}
						if (sAdditionalPath && aSelect.indexOf(sAdditionalPath) < 0) {
							aSelect.push(sAdditionalPath);
						}
					}
				}
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
	
			return aSelect;
		},

	
		/*
		 ****************************************************************
		 ************			EVENTHANDLERS			****************
		 ****************************************************************
		 */
		 
	
		onEditChange: function (oEvent) {
			var sFragmentId = this.getFragmentId();
			var addBtn = sap.ui.core.Fragment.byId(sFragmentId, "addBtn"); // works
			var copyBtn = sap.ui.core.Fragment.byId(sFragmentId, "copyBtn");
			var deleteBtn = sap.ui.core.Fragment.byId(sFragmentId, "deleteBtn");

			var oSwitch =  oEvent.getSource().getIcon();
			
			if(oSwitch.includes("unlocked")) {
				addBtn.setEnabled(true);
				copyBtn.setEnabled(true);
				deleteBtn.setEnabled(true);
				oEvent.getSource().setIcon("sap-icon://locked");
				this.setCellsEditable();
			}else{
				addBtn.setEnabled(false);
				copyBtn.setEnabled(false);
				deleteBtn.setEnabled(false);
				oEvent.getSource().setIcon("sap-icon://unlocked");
			}
		},

		onAddRowPress: function (oEvent) {
			var oTable = this._getTable();
			var aTableVisibleColumns = oTable._getVisibleColumns();
			var sColumnName = "";
			var sNewLine = [];
			
			
			// var form = new sap.ui.layout.form.SimpleForm();
			// 	form.setLabelSpanL(4);	form.setLabelSpanM(4);	form.setLabelSpanS(4);
			// 	form.setEmptySpanL(0);	form.setEmptySpanM(0);	form.setEmptySpanS(0);
			// 	form.setMaxContainerCols(2);
			// 	form.setLayout("ResponsiveGridLayout");
				
			// int i = allocationnode.size() - 1;
			// allocationnode.setLeadSelection(i);
			
			for (var i=0; i<aTableVisibleColumns.length; i++){
				sColumnName = aTableVisibleColumns[i].getLabel().getText();
				sNewLine[sColumnName] = "Enter "+sColumnName;
				
				// var lab = new sap.m.Label();
				// lab.setText(sColumnName);
				// form.addContent(lab);
				
				// var inp = new sap.m.Input();
				// inp.setValue("");
				// form.addContent(inp);
				
			}
			
			var oModel = oTable.getModel(); // this.getView().getModel();
			oTable.setEditable(true);
			
			oModel.getData().RowData.push(sNewLine);
			
			var oIndex = oTable.getModel().oData.RowData.length - 1 ;
			var oItem = oTable.getModel().oData.RowData[oIndex];
			 var oFlag = oModel.getProperty("/oIndex");
	          if (oFlag === undefined) {
	            oModel.setProperty("/oIndex", oIndex);
	            this.onPress(oItem, true);
	          } else {
	            var oPreviousItem = oTable.getItems()[oFlag];
	            this.onPress(oPreviousItem, false);
	            var oCurrentItem = oTable.getItems()[oIndex];
	            oModel.setProperty("/oIndex", oIndex);
	            this.onPress(oCurrentItem, true);
	          }
	// var aItems = oTable.getItems();
   // 		for (var i = 0; i < aItems.length; i++) {
   //     		aItems[i].getCells()[0].setEditable(aItems[i].getSelected());
   // 		}
			oModel.refresh();
			this._setVisibleRowCount();
			var sFragmentId = this.getFragmentId();
			var oSaveBtn = sap.ui.core.Fragment.byId(sFragmentId, "SaveBtn");
			oSaveBtn.setType("Emphasized");
			

		},
		 onPress: function(oItem, oFlag) {
          //var oEditableCells = oItem.getCells();
          //$(oEditableCells).each(function(i) {
          //  var oEditableCell = oEditableCells[i];
          //  var oMetaData = oEditableCell.getMetadata();
          //  var oElement = oMetaData.getElementName();
          //  if (oElement == "sap.m.Input") {
          //    oEditableCell.setEditable(oFlag);
          //  }
          //});
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
					oNewRow = oModel.getData().RowData[aSelectedIndices[i]];
					oModel.getData().RowData.push(oNewRow); //Just add to the end of the table
				}
				var aLastIndex = oModel.getData().RowData.lenght - 1;
				oModel.refresh();
				oTable.setSelectedIndex(aLastIndex);
				this._setVisibleRowCount();
				var sFragmentId = this.getFragmentId();
				var oSaveBtn = sap.ui.core.Fragment.byId(sFragmentId, "SaveBtn");
				oSaveBtn.setType("Emphasized");
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
					oModel.getData().RowData.splice(aSelectedIndices, 1);
				}
				oModel.refresh();
				this._setVisibleRowCount();
				var sFragmentId = this.getFragmentId();
				var oSaveBtn = sap.ui.core.Fragment.byId(sFragmentId, "SaveBtn");
				oSaveBtn.setType("Emphasized");
			}
		},
		onSearchLiveChange: function (oEvent) {
			// add filter for search
			var sQuery = oEvent.getSource().getValue();
			var oTable = this._getTable();
			var aFilters = [];
			var aVisibleColumns = oTable._getVisibleColumns();
			var aLabel = [];
			for (var i = 0; i < aVisibleColumns.length; i++) {
				aLabel[i]= 	new Filter(aVisibleColumns[i].getProperty("filterProperty"), sap.ui.model.FilterOperator.Contains, sQuery);
			}

				var filter = new Filter([ aLabel
				],false);
			filter.aFilters = filter.aFilters[0];
			aFilters.push(filter);
			var oBinding = oTable.getBinding("rows");
			oBinding.filter(aFilters, "Application");
		},
		
		onSave: function(){
			
				
		},
		
		onUpdateVisibleRowCount: function(oEvent){
			var iRowCount = 0 ;
			iRowCount = parseInt(oEvent.getParameter("value"));
			this._setVisibleRowCount(iRowCount);
		},
		
		onChangeVisibleColumns: function(oEvent){
			var oTable = this._getTable();
		
			// var oDataInitial = new sap.ui.base.Object();
			
			var Items = [] ;
			var ColumnsItems = [] ;
			for (var i = 0; i < oTable.getModel().getData().ColumnData.length; i++ ){
				var aTemp = oTable.getModel().getData().ColumnData[i];
				Items[i] = [] ;
				Items[i].columnKey = aTemp.name; 
				Items[i].text = aTemp.label; if (aTemp.name === undefined) { Items[i].columnKey = aTemp.columnKey ; 	Items[i].text = aTemp.text ;}
				
				ColumnsItems[i] = [];
				ColumnsItems[i].columnKey = aTemp.name;
				ColumnsItems[i].visible = aTemp["column-visible"];
				ColumnsItems[i].index = aTemp["column-order"];  if (aTemp.name === undefined) { ColumnsItems[i].columnKey = aTemp.columnKey ; ColumnsItems[i].visible = aTemp.visible; ColumnsItems[i].index = aTemp.index; }
			}
			_oDataInitial.Items = Items;
			_oDataInitial.ColumnsItems = ColumnsItems;
		//	_oDataInitial.ColumnData = oTable.getModel().getData().ColumnData;
			_oJSONModel = new JSONModel(jQuery.extend(true, {}, _oDataInitial));
			_oJSONModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);	
		
			var oPersonalizationDialog = sap.ui.xmlfragment("promos.exad.EXAD2.control.Dialog", this);
			_oJSONModel.setProperty("/ShowResetEnabled", this._isChangedColumnsItems());
			oPersonalizationDialog.setModel(_oJSONModel);

			this._getView().addDependent(oPersonalizationDialog);

			this.oDataBeforeOpen = jQuery.extend(true, {}, _oJSONModel.getData());
			oPersonalizationDialog.open();
		},
		_isChangedColumnsItems: function() {
			var fnGetArrayElementByKey = function(sKey, sValue, aArray) {
				var aElements = aArray.filter(function(oElement) {
					return oElement[sKey] !== undefined && oElement[sKey] === sValue;
				});
				return aElements.length ? aElements[0] : null;
			};
			var fnGetUnion = function(aDataBase, aData) {
				if (!aData) {
					return jQuery.extend(true, [], aDataBase);
				}
				var aUnion = jQuery.extend(true, [], aData);
				aDataBase.forEach(function(oMItemBase) {
					var oMItemUnion = fnGetArrayElementByKey("name", oMItemBase.name, aUnion);
					if (!oMItemUnion) {
						aUnion.push(oMItemBase);
						return;
					}
					if (oMItemUnion.visible === undefined && oMItemBase.visible !== undefined) {
						oMItemUnion.visible = oMItemBase.visible;
					}
					if (oMItemUnion.width === undefined && oMItemBase.width !== undefined) {
						oMItemUnion.width = oMItemBase.width;
					}
					if (oMItemUnion.total === undefined && oMItemBase.total !== undefined) {
						oMItemUnion.total = oMItemBase.total;
					}
					if (oMItemUnion.index === undefined && oMItemBase.index !== undefined) {
						oMItemUnion.index = oMItemBase.index;
					}
				});
				return aUnion;
			};
			var fnIsEqual = function(aDataBase, aData) {
				if (!aData) {
					return true;
				}
				if (aDataBase.length !== aData.length) {
					return false;
				}
				var fnSort = function(a, b) {
					if (a.name < b.name) {
						return -1;
					} else if (a.name > b.name) {
						return 1;
					} else {
						return 0;
					}
				};
				aDataBase.sort(fnSort);
				aData.sort(fnSort);
			var aItemsNotEqual = aDataBase.filter(function(oDataBase, iIndex) {
					return oDataBase.columnKey !== aData[iIndex].columnKey || oDataBase.visible !== aData[iIndex].visible || oDataBase.index !== aData[iIndex].index || oDataBase.width !== aData[iIndex].width || oDataBase.total !== aData[iIndex].total;
				});
				return aItemsNotEqual.length === 0;
			};
	
			var aDataRuntime = fnGetUnion(_oDataInitial.ColumnsItems, _oJSONModel.getProperty("/ColumnsItems"));
			return !fnIsEqual(aDataRuntime, _oDataInitial.ColumnsItems);
		},
		onOK: function(oEvent) {
			this.oDataBeforeOpen = {};
			var aModelData = [] ;
			var oSource = oEvent.getSource();
			var oModel = oSource.getModel();
			var oData = oModel.getData();
			
			aModelData.ColumnData = oData.ColumnsItems;
			
			var oTable = this._getTable();
			
			aModelData.RowData = oTable.getModel().getData().RowData;
			
			
			
			this._bindColumns(aModelData);
			oEvent.getSource().close();
            oEvent.getSource().destroy();
		},

		onCancel: function(oEvent) {
			_oJSONModel.setProperty("/", jQuery.extend(true, [], this.oDataBeforeOpen));

			this.oDataBeforeOpen = {};
			oEvent.getSource().close();
            oEvent.getSource().destroy();
		},

		onReset: function() {
			_oJSONModel.setProperty("/", jQuery.extend(true, [], _oDataInitial));
		},
		onChangeColumnsItems: function(oEvent) {
			_oJSONModel.setProperty("/ColumnsItems", oEvent.getParameter("items"));
			_oJSONModel.setProperty("/ShowResetEnabled", this._isChangedColumnsItems());
		},
		/* 
		 ****************************************************************
		 ************			table.Table 			****************
		 ****************************************************************
		 */

		_bindColumns: function (aModelData) {
			var oTable = this._getTable();
			
			
			var oModel = new JSONModel(aModelData);
			 oTable.setModel(oModel);
			 
			oTable.bindColumns("/ColumnData", function (index, context) {
				var columnLabel = context.getProperty().label;
					if (columnLabel === undefined){
					columnLabel = context.getProperty().columnKey;
				}
				var columnName = context.getProperty().name;
				if (columnName === undefined){
					columnName = context.getProperty().columnKey;
				}
				var bVisible = context.getProperty("column-visible");
				if (bVisible === undefined){
					bVisible = context.getProperty().visible;
				}
			//	var bEditabled = context.getProperty("detail-editable");
				return new sap.ui.table.Column({
					label: columnLabel,
					visible: bVisible,
				//	editable: bEditabled,
					filterProperty: columnName,
					sortProperty: columnName,
					template: columnName
				//	template: new sap.ui.commons.TextField({ editable: bEditabled, value: columnName })
					// 	value: columnName,
					// 	// {
					// 	// 	path: "/TableDetails" + "/" + index.slice(-1) + "/" + columnName
					// 	// },
					// 	editable: false
					// })
				});
			});

			oTable.bindRows("/RowData");
			
			this._setVisibleRowCount();
		},
		_getVisibleColumns : function() {
			return this._getTable()._getVisibleColumns();
		},
		
		_setVisibleRowCount: function(iVal) {
			var oTable = this._getTable();
			var iRowCount;
			var aId = [];
			try {
				if (iVal && (typeof iVal === "number")){
					iRowCount = iVal;
				}else if (iVal && (typeof iVal !== "number")){
					iRowCount = parseInt(iVal.getParameter("value"));
				}else {
					iRowCount = oTable.getModel().getData().RowData.length;
					if(iRowCount > 10){
						iRowCount = 10;
					}
				}
				var oView = this._getView().byId("inputChangeVisibleRowCount");
				if (!oView){
					aId = this.getId().split("--");
					var sFragmentId = this._getView().createId(aId[2]);
					var oView = sap.ui.core.Fragment.byId(sFragmentId, "inputChangeVisibleRowCount"); // works
				}
				oTable.setVisibleRowCount(iRowCount);
				oView.setValue(iRowCount);
			} catch (err) {
				this._fireInternalErrorOccurred(err);
			}
		},
		
		/* 
		 ****************************************************************
		 ************			HELPERS 			****************
		 ****************************************************************
		 */

		/** 
		 * Gets the desired Control by its ID.
		 * 
		 * @param {string} id - The id of the control
		 * @returns {Object} - The found Control
		 */
		byId: function(id) {
			var oControl = this._getView().byId(id);
			
			if (!oControl) {
				oControl = sap.ui.getCore().byId(id);
			}
			
			return oControl;
		},
		
		
		onRowSelectionChange: function(oEvent) {
			var oTable = oEvent.getSource();
			var sParentId = oTable.getParent().getId() ;
			if( sParentId.includes("Mietobjekte") ){
					var iRowIndex = oEvent.getParameter("rowIndex");
					if (iRowIndex === -1) {
						return;
					}
					var aSelIndices = oTable.getSelectedIndices();
					if (aSelIndices.length > 0 && jQuery.inArray(iRowIndex, aSelIndices) !== -1) {
						var oRowContext = oEvent.getParameter("rowContext");
						var sId = oRowContext.getProperty("id");
						this._getView().getController().onTenantRowSelectionChange(sId);
					} else if (aSelIndices.length === 0) {
						// throw error
					}
				
				
			}
		}
	
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
});