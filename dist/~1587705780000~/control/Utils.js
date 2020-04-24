// EXAD2 Frontend
// Version: 0.02
// Built on: 2020-4-24 11:25:05
sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/format/NumberFormat",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/ValueState"
], function(jQuery, NumberFormat, DateFormat, ValueState) {
	"use strict";
	
	var _sComponentName = "Utils";
	// jQuery.sap.require("sap.ui.core.format.DateFormat");
	
	/**
	 * Static class with helper/utility methods
	 * 
	 * @private
     * @author Adrian Zguri adrian.zguri@promos-consult.de
	 * @since 1.0
	 * @version 0.02, built on:2020-4-24
	 * @namcespace prorex.ui5.lib.Utils
	 */ 
	return /** @lends prorex.ui5.lib.Utils */ {
		_oFloatInstance: null,
		_oDateInstance: null,
		
		getText: function(sText) {
			var sTextValue = sText;
			var oResBundle = sap.ui.getCore().getLibraryResourceBundle("prorex.ui5.lib");
			
			if (oResBundle) {
				/* Transform the object in array */
				var aArgs = $.map(arguments, function(value, index) {
				    return [value];
				});
				/* Remove the first element since it is the sText */
				aArgs.splice(0, 1);
				
				if(aArgs.length > 0) {
				sTextValue = oResBundle.getText(sText, aArgs);
				} else {
					sTextValue = oResBundle.getText(sText);
				}
			}
			
			return sTextValue;
		},
		
		/**
		 * Encapsulated only here 
		 * 
		 * @public
		 * @since 1.0.36
		 */ 
		deepCopy: function(oElem1, oElem2) {
			if (oElem1) {
				return jQuery.extend(true, {}, oElem1, oElem2);
			}
			return oElem1;
		},
		
		/**
		 * Encapsulated only here 
		 * 
		 * @public
		 * @since 1.0.36
		 */ 
		deepCopyArray: function(oElem1, oElem2) {
			if (oElem1) {
				return jQuery.extend(true, [], oElem1, oElem2);
			}
			return oElem1;
		},
		
		customTrim: function(sValue) {
			return sValue.replace(/^\s+|\s+$/gm, "");
		},

		replaceAll: function(str, find, replace) {
			return str.replace(new RegExp(find, "g"), replace);
		},
		
		/**
		 * Converts Abap Value State to UI5 Value State
		 * 
		 * @reurns {sap.ui.core.ValueState} The UI5 ValueState
		 */ 
		convertValueState: function(sAbapValueState) {
			var sValueState;
			switch (sAbapValueState) {
				case "error":
					sValueState = ValueState.Error;
					break;
				case "warning":
					sValueState = ValueState.Warning;
					break;
				case "info":
					sValueState = ValueState.None;
					break;
				case "success":
					sValueState = ValueState.Success;
					break;
				default:
					sValueState = sAbapValueState;
			}
			
			return sValueState;
		},
		
		/**
		 * Formats an ISO Datetime into a string.
		 * 
		 * @param {string} sSeparator - Indicates the separator between the Date and the Time
		 * 
		 * @remarks:
		 * <para>
		 *	The ISO DateTime '2017-11-17T14:48:00.000Z' will be converted in '20171117_1448' if
		 * the sSeparator = '_'.
		 * </para>
		 * 
		 * @returns {string} The DateTime in String format, separated by the sSeparator.
		 * @since 1.0.20
		 */ 
		getIsoDateTimeString: function(sSeparator) {
			if (!sSeparator) {
				sSeparator = '_';
			}
			var date = new Date();
			date.setHours(date.getHours() + (-1*date.getTimezoneOffset()/60));
			var sIsoDate = date.toISOString();
			
			// 2011-10-05T14:48:00.000Z
			sIsoDate = this.replaceAll(sIsoDate, "-", "");
			sIsoDate = this.replaceAll(sIsoDate, ":", "");
			// 20111005T144800.000Z
			sIsoDate = sIsoDate.substring(0, 8) + sSeparator + sIsoDate.substring(9, 13);
			
			return sIsoDate;
		},
		
		/**
		 * Formats the sDate either with the default pattern or with an optional given sPattern
		 * @public
		 * @param {string} sDate - The date to format.
		 * @param {string} [sPattern=dd.MM.yyyy] - The pattern of the format.
		 * @returns {string} Formatted string representation of the date
		 */
		date: function(sDate, sPattern) {
			var sReturn = sDate;
			try {
				if (sDate === null) {
					sReturn = "";
				} else {
					var sNewPattern = "dd.MM.yyyy";
					if (sPattern !== undefined && sPattern !== null) {
						sNewPattern = sPattern;
					}
					
					var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
						pattern: sNewPattern
					});
					sReturn = oDateFormat.format(sDate);
				}
			} catch (err) {
				jQuery.sap.log.error("Error in formatter.date", err, _sComponentName);
			}

			return sReturn;
		},
		
		timeToString: function(oTimeObject) {
			var sValue = "";

			try {
				if (oTimeObject && oTimeObject.ms) {
					var oDate = new Date(oTimeObject.ms);
					// sValue += oDate.getUTCDate() - 1 + " ";
					
					var sHours = oDate.getUTCHours().toString();
					var sMinutes = oDate.getUTCMinutes().toString();
					var sSeconds = oDate.getUTCSeconds().toString();
					
					sValue += sHours.length === "1" ? "0" + sHours : sHours;
					sValue += ":";
					sValue += sMinutes.length === "1" ? "0" + sMinutes : sMinutes;
					sValue += ":";
					sValue += sSeconds.length === "1" ? "0" + sSeconds : sSeconds;
					// sValue += oDate.getUTCMilliseconds() + " millis";
				}
			} catch (err) {
				jQuery.sap.log.error("timeToString", err, _sComponentName);
			}

			return sValue;
		},
		
		timeToString2: function(oTimeObject) {
			var sValue = "";

			try {
				if (oTimeObject && oTimeObject.ms) {
					var oDate = new Date(oTimeObject.ms);
					// sValue += oDate.getUTCDate() - 1 + " ";
					
					var sHours = oDate.getUTCHours().toString();
					var sMinutes = oDate.getUTCMinutes().toString();
					var sSeconds = oDate.getUTCSeconds().toString();
					
					sValue += sHours.length === 1 ? "0" + sHours : sHours;
					sValue += sMinutes.length === 1 ? "0" + sMinutes : sMinutes;
					sValue += sSeconds.length === 1 ? "0" + sSeconds : sSeconds;
					// sValue += oDate.getUTCMilliseconds() + " millis";
				}
			} catch (err) {
				jQuery.sap.log.error("timeToString2", err, _sComponentName);
			}

			return sValue;
		},
		
		timeToStringHHmm: function(oTimeObject) {
			var sValue = "";

			try {
				if (oTimeObject && oTimeObject.ms) {
					var oDate = new Date(oTimeObject.ms);
					// sValue += oDate.getUTCDate() - 1 + " ";
					
					var sHours = oDate.getUTCHours().toString();
					var sMinutes = oDate.getUTCMinutes().toString();
					// var sSeconds = oDate.getUTCSeconds().toString();
					
					sValue += sHours.length === 1 ? "0" + sHours : sHours;
					sValue += sMinutes.length === 1 ? "0" + sMinutes : sMinutes;
					// sValue += sSeconds.length === "1" ? "0" + sSeconds : sSeconds;
					// sValue += oDate.getUTCMilliseconds() + " millis";
				}
			} catch (err) {
				jQuery.sap.log.error("timeToString2", err, _sComponentName);
			}

			return sValue;
		},
		
		toString: function(obj) {
			var sResult = "";
			
			switch (typeof obj) {
				case "boolean":
					sResult = obj.toString();
					break;
				default:
					if (obj) {
						sResult = obj.toString();
					}
			}
			
			return sResult;
		},
		
		
		/**
		 * Removes dupplicates in an array
		 * 
		 * @param {Object[]} aItems - The array from which to remove the dupplicates.
		 * 
		 * @return {Object[]} The same array but without dupplicates.
		 * http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
		 */
		removeDupplicates: function(aItems) {
			var seen = {};
			var out = [];
			var len = aItems.length;
			var j = 0;
			for (var i = 0; i < len; i++) {
				var item = aItems[i];
				if (seen[item] !== 1) {
					seen[item] = 1;
					out[j++] = item;
				}
			}
			return out;
		},
		
		/**
		 * Transforms an SAP Icon string into a SAPUI5 Icon string.
		 * 
		 * @param {string} sIcon - The name of the icon that comes from the SAP System.
		 * 
		 * @return {string} The transformed icon name in the SAPUI5 format. 
		 */
		toSapui5Icon: function(sIcon) {
			var sResult = "";
			try {
				if (sIcon) {
					if (!sIcon.startsWith("sap-icon://")) {
						switch (sIcon) {
							case "@AJ@":
								sResult = "sap-icon://Promos/controlling";
								break;
							case "@5Y@":
								sResult = "sap-icon://Promos/mail";
								break;
							default:
								jQuery.sap.log.warning("Value: " + sIcon + " was not managed in the Switch. Default Icon applied!", null, _sComponentName);
								sResult = "sap-icon://Promos/building-striped";
						}
					} else {
						sResult = sIcon;
					}
				}
			} catch (err) {
				jQuery.sap.log.error("Error in formatter.toSapui5Icon", err, _sComponentName);
			}

			return sResult;
		},
		
		formatOdataPropertyNameToSapPropertyName: function(sOdataPropertyName) {
			var sSapPropertyName = "";
			try {
				if (sOdataPropertyName) {
					sSapPropertyName = jQuery.sap.hyphen(sOdataPropertyName);
					if (sSapPropertyName.startsWith("-")) {
						sSapPropertyName = sSapPropertyName.substring(1);
					}
					sSapPropertyName = sSapPropertyName.replace("-", "_").toUpperCase();
				}
			} catch (err) {
				jQuery.sap.log.error("formatOdataPropertyNameToSapPropertyName", err, "Utils");
			}
			return sSapPropertyName;
		},
		
		/**
		 * Transforms an SAP property of the type "ABC_DEF_GEI" into a Camel Case property of the
		 * type "AbcDefGei"
		 * 
		 * @param {string} sSapPropertyName - The name of the property that comes from SAP.
		 * 
		 * @return {string} The Camel case transformed property.
		 */
		formatSapPropertyNameToODataPropertyName: function(sSapPropertyName) {
			var sODataPropertyName = "";

			try {
				if (sSapPropertyName && sSapPropertyName !== "") {
					var aParts = sSapPropertyName.split("_");
					for (var i = 0; i < aParts.length; i++) {
						var sPart = aParts[i].toLowerCase();
						sODataPropertyName += sPart.charAt(0).toUpperCase() + sPart.slice(1);
					}
				}
			} catch (err) {
				jQuery.sap.log.error("formatSapPropertyNameToODataPropertyName", err, "Utils");
			}

			return sODataPropertyName;
		},
		
		/**
		 * Formats a Float String value with Comma Separator, to ABAP Float with Point separator.
		 * @param {string} oValue - The value to be formatted
		 * 
		 * @since 1.0.33
		 */ 
		formatAbapFloat: function(oValue) {
			var sReturn = oValue;
			
			if (!this._oFloatInstance) {
				this._oFloatInstance = sap.ui.core.format.NumberFormat.getFloatInstance();
			}
			
			if (oValue  && typeof oValue === "string") {
				try {
					var fVal = this._oFloatInstance.parse(oValue);
					if (fVal) {
						sReturn = fVal.toString();
					}
					
				} catch(oError) {
					//
				}
			}
			
			return sReturn;
		},
		
		/**
		 * Returns true or false based on the FieldAttributes that come from the SAP System.
		 * 
		 * @param {Object} oFieldAttribute - The Field Attribute that comes from SAP.
		 * @param {string} oFieldAttribute.FieldProperty=false - The type of the property that defines the transformation into boolean.
		 * @param {string} oFieldAttribute.FieldName - The name of the property that needs to be changed. If it is empty, the the change applies to all the fields.
		 * @param {string} oFieldAttribute.StructureName - The name of the Abap Structure.
		 * @param {string} oFieldAttribute.ObjectKey - The ObjectKey of the row or element.
		 * 
		 * @since 1.0.10
		 * @return {boolean} True or False based on the FieldProperty attribute.
		 */
		getEditableFromFieldAttribute: function(oFieldAttribute) {
			var bEditable = false;

			try {
				if (oFieldAttribute.FieldProperty === "A") {
					bEditable = false;
				} else if (oFieldAttribute.FieldProperty === " " || oFieldAttribute.FieldProperty === "") {
					bEditable = true;
				} else if (oFieldAttribute.FieldProperty === "C" || oFieldAttribute.FieldProperty === "P") {
					bEditable = true;
				}
			} catch (err) {
				jQuery.sap.log.error("getEditableFromFieldProperty", err, "Utils");
			}

			return bEditable;
		},
		
		/**
		 * Returns true or false based on the FieldAttributes that come from the SAP System.
		 * 
		 * @param {Object} oFieldAttribute - The Field Attribute that comes from SAP.
		 * @param {string} oFieldAttribute.FieldProperty=false - The type of the property that defines the transformation into boolean.
		 * @param {string} oFieldAttribute.FieldName - The name of the property that needs to be changed. If it is empty, the the change applies to all the fields.
		 * @param {string} oFieldAttribute.StructureName - The name of the Abap Structure.
		 * @param {string} oFieldAttribute.ObjectKey - The ObjectKey of the row or element.
		 * 
		 * @since 1.0.33
		 * @return {boolean} True or False based on the FieldProperty attribute.
		 */
		getRequiredFromFieldAttribute: function(oFieldAttribute) {
			var bRequired = false;

			try {
				if (oFieldAttribute.FieldProperty === "C" || oFieldAttribute.FieldProperty === "P") {
					bRequired = true;
				}
			} catch (err) {
				jQuery.sap.log.error("getRequiredFromFieldAttribute", err, "Utils");
			}

			return bRequired;
		},
		
		/**
		 * Returns true or false based on the FieldAttributes that come from the SAP System.
		 * 
		 * @param {Object} oFieldAttribute - The Field Attribute that comes from SAP.
		 * @param {string} oFieldAttribute.FieldProperty=true - The type of the property that defines the transformation into boolean.
		 * @param {string} oFieldAttribute.FieldName - The name of the property that needs to be changed. If it is empty, the the change applies to all the fields.
		 * @param {string} oFieldAttribute.StructureName - The name of the Abap Structure.
		 * @param {string} oFieldAttribute.ObjectKey - The ObjectKey of the row or element.
		 * 
		 * @since 1.0.33
		 * @return {boolean} True or False based on the FieldProperty attribute.
		 */
		getVisibleFromFieldAttribute: function(oFieldAttribute) {
			var bVisible = true;

			try {
				if (oFieldAttribute.FieldProperty === "B" || oFieldAttribute.FieldProperty === "b") {
					bVisible = false;
				}
			} catch (err) {
				jQuery.sap.log.error("getVisibleFromFieldAttribute", err, "Utils");
			}

			return bVisible;
		},

		getFloatInstance: function() {
			if (!this._oFloatInstance) {
				this._oFloatInstance = NumberFormat.getFloatInstance();
			}
			return this._oFloatInstance;
		},
		
		getDateInstance: function() {
			if (!this._oDateInstance) {
				this._oDateInstance = DateFormat.getDateInstance();
			}
			return this._oDateInstance;
		},
		
		polyfillJS: function() {
			var bCanDefineProperty = Object.defineProperty;
			
			/*! http://mths.be/codepointat v0.1.0 by @mathias */
			if (!String.prototype.codePointAt) {
				(function() {
					var codePointAt = function(position) {
						if (this === null) {
							throw TypeError();
						}
						var string = String(this);
						var size = string.length;
						// `ToInteger`
						var index = position ? Number(position) : 0;
						if (isNaN(index)) { // better `isNaN`
							index = 0;
						}
						// Account for out-of-bounds indices:
						if (index < 0 || index >= size) {
							return undefined;
						}
						// Get the first code unit
						var first = string.charCodeAt(index);
						var second;
						if ( // check if it’s the start of a surrogate pair
							first >= 0xD800 && first <= 0xDBFF && // high surrogate
							size > index + 1 // there is a next code unit
						) {
							second = string.charCodeAt(index + 1);
							if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
								// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
								return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
							}
						}
						return first;
					};
					if (bCanDefineProperty) {
						Object.defineProperty(String.prototype, "codePointAt", {
							"value": codePointAt,
							"configurable": true,
							"writable": true
						});
					} else {
						String.prototype.codePointAt = codePointAt;
					}
				}());
			}
			
			/*! https://mths.be/startswith v0.2.0 by @mathias */
			if (!String.prototype.startsWith) {
				(function() {
					"use strict"; // needed to support `apply`/`call` with `undefined`/`null`
					var defineProperty = (function() {
						// IE 8 only supports `Object.defineProperty` on DOM elements
						try {
							var object = {};
							var $defineProperty = Object.defineProperty;
							var result = $defineProperty(object, object, object) && $defineProperty;
						} catch(error) {
							/**/
						}
						return result;
					}());
					var toString = {}.toString;
					var startsWith = function(search) {
						if (this === null) {
							throw TypeError();
						}
						var string = String(this);
						if (search && toString.call(search) === "[object RegExp]") {
							throw TypeError();
						}
						var stringLength = string.length;
						var searchString = String(search);
						var searchLength = searchString.length;
						var position = arguments.length > 1 ? arguments[1] : undefined;
						// `ToInteger`
						var pos = position ? Number(position) : 0;
						if (isNaN(pos)) { // better `isNaN`
							pos = 0;
						}
						var start = Math.min(Math.max(pos, 0), stringLength);
						// Avoid the `indexOf` call if no match is possible
						if (searchLength + start > stringLength) {
							return false;
						}
						var index = -1;
						while (++index < searchLength) {
							if (string.charCodeAt(start + index) !== searchString.charCodeAt(index)) {
								return false;
							}
						}
						return true;
					};
					if (defineProperty) {
						defineProperty(String.prototype, "startsWith", {
							"value": startsWith,
							"configurable": true,
							"writable": true
						});
					} else {
						String.prototype.startsWith = startsWith;
					}
				}());
			}
			
			/*! https://mths.be/endswith v0.2.0 by @mathias */
			if (!String.prototype.endsWith) {
				(function() {
					"use strict"; // needed to support `apply`/`call` with `undefined`/`null`
					var defineProperty = (function() {
						// IE 8 only supports `Object.defineProperty` on DOM elements
						try {
							var object = {};
							var $defineProperty = Object.defineProperty;
							var result = $defineProperty(object, object, object) && $defineProperty;
						} catch(error) {
							//
						}
						
						return result;
					}());
					var toString = {}.toString;
					var endsWith = function(search) {
						if (this === null) {
							throw TypeError();
						}
						var string = String(this);
						if (search && toString.call(search) === "[object RegExp]") {
							throw TypeError();
						}
						var stringLength = string.length;
						var searchString = String(search);
						var searchLength = searchString.length;
						var pos = stringLength;
						if (arguments.length > 1) {
							var position = arguments[1];
							if (position !== undefined) {
								// `ToInteger`
								pos = position ? Number(position) : 0;
								if (isNaN(pos)) { // better `isNaN`
									pos = 0;
								}
							}
						}
						var end = Math.min(Math.max(pos, 0), stringLength);
						var start = end - searchLength;
						if (start < 0) {
							return false;
						}
						var index = -1;
						while (++index < searchLength) {
							if (string.charCodeAt(start + index) !== searchString.charCodeAt(index)) {
								return false;
							}
						}
						return true;
					};
					if (defineProperty) {
						defineProperty(String.prototype, "endsWith", {
							"value": endsWith,
							"configurable": true,
							"writable": true
						});
					} else {
						String.prototype.endsWith = endsWith;
					}
				}());
			}
			
			/*! https://mths.be/includes v1.0.0 by @mathias */
			if (!String.prototype.includes) {
				(function() {
					"use strict"; // needed to support `apply`/`call` with `undefined`/`null`
					var toString = {}.toString;
					var defineProperty = (function() {
						// IE 8 only supports `Object.defineProperty` on DOM elements
						try {
							var object = {};
							var $defineProperty = Object.defineProperty;
							var result = $defineProperty(object, object, object) && $defineProperty;
						} catch(error) {
							//
						}
						return result;
					}());
					var indexOf = "".indexOf;
					var includes = function(search) {
						if (this === null) {
							throw TypeError();
						}
						var string = String(this);
						if (search && toString.call(search) === "[object RegExp]") {
							throw TypeError();
						}
						var stringLength = string.length;
						var searchString = String(search);
						var searchLength = searchString.length;
						var position = arguments.length > 1 ? arguments[1] : undefined;
						// `ToInteger`
						var pos = position ? Number(position) : 0;
						if (isNaN(pos)) { // better `isNaN`
							pos = 0;
						}
						var start = Math.min(Math.max(pos, 0), stringLength);
						// Avoid the `indexOf` call if no match is possible
						if (searchLength + start > stringLength) {
							return false;
						}
						return indexOf.call(string, searchString, pos) !== -1;
					};
					if (defineProperty) {
						defineProperty(String.prototype, "includes", {
							"value": includes,
							"configurable": true,
							"writable": true
						});
					} else {
						String.prototype.includes = includes;
					}
				}());
			}	
			
			/*! https://tc39.github.io/ecma262/#sec-array.prototype.findIndex */
			if (!Array.prototype.findIndex) {
			  Object.defineProperty(Array.prototype, 'findIndex', {
			    value: function(predicate) {
			     // 1. Let O be ? ToObject(this value).
			      if (this == null) {
			        throw new TypeError('"this" is null or not defined');
			      }
			
			      var o = Object(this);
			
			      // 2. Let len be ? ToLength(? Get(O, "length")).
			      var len = o.length >>> 0;
			
			      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
			      if (typeof predicate !== 'function') {
			        throw new TypeError('predicate must be a function');
			      }
			
			      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
			      var thisArg = arguments[1];
			
			      // 5. Let k be 0.
			      var k = 0;
			
			      // 6. Repeat, while k < len
			      while (k < len) {
			        // a. Let Pk be ! ToString(k).
			        // b. Let kValue be ? Get(O, Pk).
			        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
			        // d. If testResult is true, return k.
			        var kValue = o[k];
			        if (predicate.call(thisArg, kValue, k, o)) {
			          return k;
			        }
			        // e. Increase k by 1.
			        k++;
			      }
			
			      // 7. Return -1.
			      return -1;
			    },
			    configurable: true,
			    writable: true
			  });
			}
		}
		
		
	};
});