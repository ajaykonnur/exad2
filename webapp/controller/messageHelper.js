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
				var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
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