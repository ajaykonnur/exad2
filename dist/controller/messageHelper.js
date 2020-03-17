// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-17 11:17:33
sap.ui.define([
	"sap/base/Log",
	"sap/m/MessageToast"

], function (Log, MessageToast) {
	"use strict";

	return {
		messageToast: function (sMessage) {
			MessageToast.show(this._getI18nMessage(sMessage));
		},

		_getI18nMessage: function (sText) {
			var sReturn = "";
			if (sText && sText !== "") {
				var oComp = sap.ui.getCore().getComponent( "promos.exad.EXAD2");
				var oResourceBundle = oComp.getModel("i18n").getResourceBundle();
				var sMessage = oResourceBundle.getText(sText);
				if (sMessage) {
					sReturn = sMessage;
				} else {
					Log.warning("No entry in i18n found for " + sText, "_getI18nMessage", this);
					sReturn = sText;
				}
			} else {
				Log.error("sText is undefined or empty String", "_getI18nMessage", this);
			}
			return sReturn;
		}
	};

});