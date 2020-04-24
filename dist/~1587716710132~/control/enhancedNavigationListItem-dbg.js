// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-4-24 11:25:05
// Provides control sap.demo.controls.enhancedNavigationListItem.
sap.ui.define(["jquery.sap.global", "sap/ui/core/Item",
		'sap/ui/core/Icon', 'sap/tnt/NavigationList', 'sap/ui/core/Renderer', 'sap/ui/core/IconPool', 'sap/tnt/NavigationListItem',
		"sap/m/MessageToast"
	],
	function(jQuery, Item, Icon, NavigationList, Renderer, IconPool, NavigationListItem, MessageToast) {
		"use strict";

		var enhancedNavigationListItem = NavigationListItem.extend("promos.exad.EXAD2.control.enhancedNavigationListItem", /** @lends sap.tnt.NavigationListItem.prototype */ {
			metadata: {
				defaultAggregation: "xitems",
				aggregations: {
					xitems: {
						type: "promos.exad.EXAD2.control.enhancedNavigationListItem",
						multiple: true,
						singularName: "item"
					}
				}
			},

		});

		return enhancedNavigationListItem;

	});