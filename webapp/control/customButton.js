sap.ui.define(["jquery.sap.global", "sap/ui/core/Item",
		'sap/ui/core/Icon', 'sap/tnt/NavigationList', 'sap/ui/core/Renderer', 'sap/ui/core/IconPool', 'sap/tnt/NavigationListItem',
		"sap/m/MessageToast"
	],
	function(jQuery, Item, Icon, NavigationList, Renderer, IconPool, NavigationListItem, MessageToast) {
		"use strict";
		
	var CustomButton = sap.ui.core.Control.extend('promos.exad.EXAD2.control.CustomButton', {
    metadata: {
      properties: {
        icon: {type:'sap.ui.core.Icon'},
        value: {type:'int', defaultValue: 0},
        width: {type: 'sap.ui.core.CSSSize', defaultValue: '40px'},
        color: {type: 'sap.ui.core.CSSColor', defaultValue: '#007cc0'}
      },
      events: {
        pressed: {}
      }
    },
   
    _width : function(minus) {
      var w = parseInt(this.getWidth().replace('px', '')) + minus;
      return w + 'px';
    },
   
    _style : function() {
      var styles = [
         'background-color: ' + this.getColor(),
         'width: ' + this.getWidth()
        ];
      return styles.join(';');
    },
   
    renderer: function(oRm, oControl) {
      oRm.write("<div");
      oRm.writeControlData(oControl);
      oRm.addClass("sap-dennisseah-badge");
      oRm.writeClasses();
      oRm.write(' style="' + oControl._style() + '">');
      oRm.write('<div class="sap-dennisseah-badge-text" style="width:' +
         oControl._width(-40) + '">' + oControl.getIcon() + '</div>');
      oRm.write('<div class="sap-dennisseah-badge-num">' + oControl.getValue() + '</div>');
      oRm.write("</div>");
    },
   
    onAfterRendering: function() {
      var that = this;
      this.$().click(function(e) {
        that.firePressed({icon: that.getIcon(), value: that.getValue()});
      });
    }
  });
	return CustomButton;
	});