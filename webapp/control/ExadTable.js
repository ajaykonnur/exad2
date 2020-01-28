sap.ui.define([
	"sap/ui/core/XMLComposite",
	"sap/base/Log",
	"sap/ui/model/json/JSONModel",
	"promos/exad/EXAD2/controller/messageHelper"
], function (XMLComposite, Log, JSONModel, messageHelper) {
	"use strict";
	return XMLComposite.extend("promos.exad.EXAD2.control.ExadTable", {
		messageHelper: messageHelper,

		metadata: {
			properties: {
				title: {
					type: "string",
					defaultValue: ""
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

		},

		onAddRowPress: function () {
			var oModel = this.getView().getModel();
			oModel.getData().tableDetails.push({
				Typ: " ",
				LINR: " ",
				Adresse: " ",
				Medium: " ",
				"Letzter Abr-Ztr": " "
			}); // Push data to Model
			oModel.refresh();
			//	var rowCount = oModel.oData.tableDetails.length;
			//	rowCount = rowCount + 1;
		},

		onCopyRowPress: function () {
			var oTable = this._getTable();
			var line_ = oTable.getSelectedIndices();
			var line;
			if (line_.length === 0) {
				messageHelper.messageToast("TableSelectedRowError");
			} else {
				var oModel = this.getView().getModel();
				for (var i = 0; i < line_.length; i++) {
					line = oModel.getData().tableDetails[line_[i]];
					oModel.getData().tableDetails.push(line); //Just add to the end of the table
				}
				oModel.refresh();
			}
		},

		onDeleteRowPress: function () {
			var oTable = this._getTable();
			var line = oTable.getSelectedIndices();
			if (line.length === 0) {
				messageHelper.messageToast("TableSelectedRowError");
			} else {
				var oModel = this.getView().getModel();
				for (var i = 0; i < line.length; i++) {
					oModel.getData().tableDetails.splice(line, 1);
				}
				oModel.refresh();
			}
		},

		/* 
		 ****************************************************************
		 ************			table.Table 			****************
		 ****************************************************************
		 */

		bindColumns: function (sPath, sModel) {
			var oTable = this._getTable();

			oTable.bindColumns(sPath, function (index, context) {

				var columnName = context.getProperty().columnName;

				return new sap.ui.table.Column({
					label: columnName,
					template: new sap.ui.commons.TextField({
						value: {
							path: "/tableDetails" + "/" + index.slice(-1) + "/" + columnName
						},
						editable: false
					})

				});
			});

			oTable.bindRows("/tableDetails");
			oTable.setModel(new sap.ui.model.json.JSONModel([{}]), "/tableDetails");
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
		}
	});
});