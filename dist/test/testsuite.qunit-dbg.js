// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-3-13 15:20:26
// eslint-disable-next-line sap-no-global-define
window.suite = function () {
	"use strict";
	/* eslint-disable new-cap */
	var oSuite = new parent.jsUnitTestSuite(),
		sContextPath = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);

	oSuite.addTestPage(sContextPath + "unit/unitTests.qunit.html");
	oSuite.addTestPage(sContextPath + "integration/opaTests.qunit.html");

	return oSuite;
};