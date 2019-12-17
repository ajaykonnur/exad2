sap.ui.define([
	"sap/base/Log"
], function (Log) {
	"use strict";

	return {

		bindColumns: function (oTable, sPath, sModel) {
			if (oTable === undefined) {
				Log.error("oTable is undefined.", "bindColumns", this);
			}

		}
	};

});