sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log"
], function (Controller, Log) {
	"use strict";

	return Controller.extend("promos.exad.EXAD2.controller.base", {
		byIdView: function (sId) {
			var oView = this.getView();
			return oView.byId(sId);
		},

		getModelView: function (sModelname) {
			var oView = this.getView();
			var oModel = oView.getModel(sModelname);
			if (!oModel) {
				this.superLogError("Model " + sModelName + " was not found!")
			}
			return oModel;
		},

		superGetModelProperty: function (sModelname, sPropertypath) {
			var oModel = this.getModelView(sModelname);
			var oProperty = oModel.getProperty(sPropertypath);
			if (oProperty === undefined) {
				this.superLogError("Property " + sPropertypath + " was not found in Model " + sModelname + "!")
			}
			return oProperty;
		},

		superSetModelProperty: function (sModelname, sPropertypath, oValue) {
			var oModel = this.getModelView(sModelname);
			return oModel.setProperty(sPropertypath, oValue);
		},

		superLogError: function (sMessage) {
			Log.error(sMessage, "", this.getView());
		}

	});
});