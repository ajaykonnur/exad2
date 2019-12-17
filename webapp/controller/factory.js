sap.ui.define([
	"sap/base/Log",
	"sap/f/Card",
	"sap/f/cards/Header",
	"sap/m/Text"

], function (Log, Card, Header, Text) {
	"use strict";

	return {

		createHintItem: function (sId, oContext) {
			if (oContext === undefined) {
				Log.error("oContext is undefined.", "createHintItem", this);
			}

			var sTitle = oContext.getProperty("title");
			var sText = oContext.getProperty("text");

			var oCard = new Card(sId);
			var oHeader = new Header();
			var oText = new Text();
			oText.addStyleClass("sapUiResponsiveMargin");

			oText.setText(sText);
			oCard.setContent(oText);

			oHeader.setTitle(sTitle);
			oCard.setHeader(oHeader);

			return oCard;
		}
	};

});