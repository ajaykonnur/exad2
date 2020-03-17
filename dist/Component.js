// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-17 11:17:33
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"promos/exad/EXAD2/model/models"
], function (UIComponent, Device, models) {
	"use strict";
	jQuery.sap.registerModulePath("axios", "https://unpkg.com/axios/dist/axios.min");
	sap.ui.define("axios");

	return UIComponent.extend("promos.exad.EXAD2.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			this._initModel("displayState");
			this._initModel("mockdata");

			// init axios instance
			this.ExadRest = axios.create({
				baseURL: "/JExadCore/rest",
				timeout: 10000,
				responseType: 'json'
					// headers: {
					// 	'X-Custom-Header': 'foobar'
					// }
			});

		},
		_initModel: function (sModelName) {
			var sPath = jQuery.sap.getModulePath("promos/exad/EXAD2/model/" + sModelName, ".model.json");
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(sPath);
			this.setModel(oModel, sModelName);
		},
		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});