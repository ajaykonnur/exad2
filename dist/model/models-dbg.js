// EXAD2 Frontend
// Version: 0.02
<<<<<<< HEAD
// Built on: 2020-3-17 11:17:33
=======
// Built on: 2020-4-8 10:23:55
>>>>>>> refs/remotes/origin/CustomControlTest
sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}

	};
});