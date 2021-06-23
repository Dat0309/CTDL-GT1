/*! © Microsoft. Alle Rechte vorbehalten. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// Diese Funktionen stellen die WinJS-Funktionalität zum Definieren von Namespaces bereit.
/// Darüber hinaus wird VS dem globalen Namespace hinzugefügt.

(function baseInit(global, undefined) {
	"use strict";

	function initializeProperties(target, members) {
		var keys = Object.keys(members);
		var properties;
		var i, len;
		for (i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			var enumerable = key.charCodeAt(0) !== /*_*/95;
			var member = members[key];
			if (member && typeof member === "object") {
				if (member.value !== undefined || typeof member.get === "function" || typeof member.set === "function") {
					if (member.enumerable === undefined) {
						member.enumerable = enumerable;
					}
					properties = properties || {};
					properties[key] = member;
					continue;
				}
			}
			if (!enumerable) {
				properties = properties || {};
				properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true };
				continue;
			}
			target[key] = member;
		}
		if (properties) {
			Object.defineProperties(target, properties);
		}
	};

	(function (VS) {
		VS.Namespace = VS.Namespace || {};

		function defineWithParent(parentNamespace, name, members) {
			/// <summary locid="VS.Namespace.defineWithParent">
			/// Definiert einen neuen Namespace mit dem angegebenen Namen unter dem angegebenen übergeordneten Namespace.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// Der übergeordnete Namespace.
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// Der Name des neuen Namespace.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// Die Member des neuen Namespace.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// Der neudefinierte Namespace.
			/// </returns>
			var currentNamespace = parentNamespace,
				namespaceFragments = name.split(".");

			for (var i = 0, len = namespaceFragments.length; i < len; i++) {
				var namespaceName = namespaceFragments[i];
				if (!currentNamespace[namespaceName]) {
					Object.defineProperty(currentNamespace, namespaceName,
					{ value: {}, writable: false, enumerable: true, configurable: true }
					);
				}
				currentNamespace = currentNamespace[namespaceName];
			}

			if (members) {
				initializeProperties(currentNamespace, members);
			}

			return currentNamespace;
		}

		function define(name, members) {
			/// <summary locid="VS.Namespace.define">
			/// Definiert einen neuen Namespace mit dem angegebenen Namen.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// Der Name des Namespace. Dieser könnte ein durch Punkte getrennter Name für geschachtelte Namespaces sein.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// Die Member des neuen Namespace.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// Der neudefinierte Namespace.
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// Einrichten von Membern des "VS.Namespace"-Namespace
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// Diese Funktionen stellen die WinJS-Funktionalität zum Definieren einer Klasse und zum Ableiten von einer Klasse bereit

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// Fügt Eigenschaftenmetadaten einer Klasse hinzu (sofern diese angegeben wurde). Enthält definierte Metadaten als Basis
		// class first (kann möglicherweise von Metadaten für diese Klasse überschrieben werden).
		//
		// Beispielhafte Metadaten:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// "type" folgt den Regeln für JavaScript-IntelliSense-Kommentare. Sollte immer angegeben werden.
		// "elementType" sollte angegeben werden, wenn "type" gleich "Array" ist.
		// "required" ist standardmäßig "false".

		var classMetadata = {};
		var hasMetadata = false;

		if (baseClass && baseClass._metadata) {
			hasMetadata = true;
			VS.Namespace.initializeProperties(classMetadata, baseClass._metadata);
		}

		if (metadata) {
			hasMetadata = true;
			VS.Namespace.initializeProperties(classMetadata, metadata);
		}
		
		if (hasMetadata) {
			Object.defineProperty(thisClass, "_metadata", { value: classMetadata, enumerable: false });
		}
	}

	function define(constructor, instanceMembers, staticMembers, metadata) {
		/// <summary locid="VS.Class.define">
		/// Definiert eine Klasse unter Verwendung des angegebenen Konstruktors und der angegebenen Instanzmember.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// Eine Konstruktorfunktion zum Instanziieren dieser Klasse.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// Der Satz von Instanzfeldern, -eigenschaften und -methoden, die für die Klasse verfügbar gemacht werden.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// Der Satz von statischen Feldern, Eigenschaften und Methoden, die für die Klasse verfügbar gemacht werden.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// Metadaten zum Beschreiben der Klasseneigenschaften. Diese Metadaten werden zum Überprüfen von JSON-Daten verwendet.
		/// Sie sind daher nur für Typen hilfreich, die als JSON dargestellt werden können. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// Die neudefinierte Klasse.
		/// </returns>
		constructor = constructor || function () { };
		if (instanceMembers) {
			VS.Namespace.initializeProperties(constructor.prototype, instanceMembers);
		}
		if (staticMembers) {
			VS.Namespace.initializeProperties(constructor, staticMembers);
		}
		processMetadata(metadata, constructor);
		return constructor;
	}

	function derive(baseClass, constructor, instanceMembers, staticMembers, metadata) {
		/// <summary locid="VS.Class.derive">
		/// Erstellt eine untergeordnete Klasse auf Basis der übergebenen "baseClass"-Parameter, unter Verwendung von prototypische Vererbung.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// Die Klasse, von der geerbt wird.
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// Eine Konstruktorfunktion zum Instanziieren dieser Klasse.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// Der Satz von Instanzfeldern, -eigenschaften und -methoden, die für die Klasse verfügbar gemacht werden.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// Der Satz von statischen Feldern, Eigenschaften und Methoden, die für die Klasse verfügbar gemacht werden.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// Metadaten zum Beschreiben der Klasseneigenschaften. Diese Metadaten werden zum Überprüfen von JSON-Daten verwendet.
		/// Sie sind daher nur für Typen hilfreich, die als JSON dargestellt werden können. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// Die neudefinierte Klasse.
		/// </returns>
		if (baseClass) {
			constructor = constructor || function () { };
			var basePrototype = baseClass.prototype;
			constructor.prototype = Object.create(basePrototype);
			Object.defineProperty(constructor.prototype, "constructor", { value: constructor, writable: true, configurable: true, enumerable: true });
			if (instanceMembers) {
				VS.Namespace.initializeProperties(constructor.prototype, instanceMembers);
			}
			if (staticMembers) {
				VS.Namespace.initializeProperties(constructor, staticMembers);
			}
			processMetadata(metadata, constructor, baseClass);
			return constructor;
		} else {
			return define(constructor, instanceMembers, staticMembers, metadata);
		}
	}

	function mix(constructor) {
		/// <summary locid="VS.Class.mix">
		/// Definiert eine Klasse unter Verwendung des angegebenen Konstruktors und der Union des Satzes von Instanzmembern.
		/// angegeben von allen "mixin"-Objekten. Die "mixin"-Parameterliste hat eine variable Länge.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// Eine Konstruktorfunktion zum Instanziieren dieser Klasse.
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// Die neudefinierte Klasse.
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// Einrichten von Membern des "VS.Class"-Namespace
	VS.Namespace.define("VS.Class", {
		define: define,
		derive: derive,
		mix: mix

	});
})(_VSGlobal.VS);

//js\Resources.js

/// <reference path="VS.js" />

(function (VS) {
	VS.Namespace.defineWithParent(VS, "Resources",
	{
		getString: function (resourceId) {
			/// <summary locid="VS.Resources.getString">
			/// Ruft die Ressourcenzeichenfolge mit der angegebenen Ressourcen-ID ab.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// Die Ressourcen-ID der abzurufenden Zeichenfolge.
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// Ein Objekt, das diese Eigenschaften enthalten kann:
			/// 
			/// value:
			/// Der Wert der angeforderten Zeichenfolge. Diese Eigenschaft ist immer vorhanden.
			/// 
			/// empty:
			/// Ein Wert zum Angeben, ob die angeforderte Zeichenfolge nicht gefunden wurde.
			/// Falls "true", wurde die Zeichenfolge nicht gefunden. Falls "false" oder "undefined",
			/// wurde die angeforderte Zeichenfolge gefunden.
			/// 
			/// lang:
			/// Die Sprache der Zeichenfolge, sofern angegeben. Diese Eigenschaft ist nur
			/// für mehrsprachige Ressourcen verfügbar.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "Eigenschaft \"{0}\" wurde nicht für {1} erwartet.",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: Gefundener Typ: {2}; Erwarteter Typ: {3}.",
				"VS.Util.JsonPropertyMissing": "Erforderliche Eigenschaft \"{0}.{1}\" fehlt oder ist ungültig.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: Gefundener Typ: {3}; Erwarteter Typ: {4}.",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] fehlt oder ist ungültig.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: Gefundener Typ: {2}; Erwarteter Typ: Zeichenfolge (Auswahl von: {3}).",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: Ungültiger Wert. Gefunden: {2}; Erwartet wurde: {3}.",
				"VS.Util.NoMetadataForType": "Es wurden keine Eigenschaftsmetadaten für den Typ {0} gefunden.",
				"VS.Util.NoTypeMetadataForProperty": "Es wurden keine Typmetadaten angegeben für {0}.{1}.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "Es wurden keine Elementtypmetadaten angegeben für {0}.{1}[].",
				"VS.Resources.MalformedFormatStringInput": "Falsch formatiert, sollte ein Escape für '{0}' erfolgen?",
				"VS.Actions.ActionNotImplemented": "Die Execute-Methode wird durch die benutzerdefinierte Aktion nicht implementiert.",
				"VS.ActionTrees.JsonNotArray": "ActionTrees-JSON-Daten müssen ein Array sein ({0}).",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "Doppelter Aktionsstrukturname \"{0}\" ({1}).",
				"VS.Animations.InvalidRemove": "Rufen Sie keinen Löschvorgang für eine Animationsinstanz auf, die in einer Gruppe enthalten ist.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// Formatiert eine Zeichenfolge durch die Ersetzung von Tokens in Form von "{n}" mit angegebenen Parametern. Beispiel:
			/// 'VS.Resources.formatString("Ich habe {0} Finger.", 10)' gibt "Ich habe 10 Finger" zurück.
			/// </summary>
			/// <param name="string">
			/// Die zu formatierende Zeichenkette.
			/// </param>
			var args = arguments;
			if (args.length > 1) {
				string = string.replace(/({{)|(}})|{(\d+)}|({)|(})/g, function (unused, left, right, index, illegalLeft, illegalRight) {
					if (illegalLeft || illegalRight) {
						throw VS.Resources.formatString(VS.Resources.getString("VS.Resources.MalformedFormatStringInput").value, illegalLeft || illegalRight);
					}
					return (left && "{") || (right && "}") || args[(index | 0) + 1];
				});
			}
			return string;
		}
	});

})(_VSGlobal.VS);

//js\Util.js

/// <reference path="VS.js" />
/// <reference path="Resources.js" />

(function (VS, global) {
	"use strict";

	function formatValue(value) {
		if (value === undefined) {
			return "nicht definiert";
		}
		if (value === null) {
			return "NULL";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// Beispiel: formatMessage(["state: '{0}', ID: {1}", "ON", 23]) gibt "state: 'ON', ID: 23" zurück
	function formatMessage(params) {
		var format = params[0];
		return format.replace(/{(\d+)}/g, function (unused, i) {
			var value = params[parseInt(i) + 1];
			return formatValue(value);
		});
	}

	/// VS.Util namespace provides utility functions for the VS's javascript runtime.
	VS.Namespace.define("VS.Util", {
		_dataKey: "_msBlendDataKey",

		markSupportedForProcessing: {
			value: function (func) {
				/// <summary locid="WinJS.Utilities.markSupportedForProcessing">
				/// Markiert eine Funktion als kompatibel mit deklarativer Verarbeitung, wie beispielsweise "WinJS.UI.processAll"
				/// oder "WinJS.Binding.processAll".
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// Die Funktion, die als kompatibel mit deklarativer Verarbeitung markiert werden soll.
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// Die Eingabefunktion.
				/// </returns>

				func.supportedForProcessing = true;
				return func;
			},
			configurable: false,
			writable: false,
			enumerable: true
		},

		data: function (element) {
			/// <summary locid="VS.Util.data">
			/// Ruft den Datenwert ab, der dem angegebenen Element zugeordnet ist.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// Das Element.
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// Der Wert, der dem Element zugeordnet ist.
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// gibt den Zeichenfolgeninhalt der Datei zurück, deren Pfad im Argument angegeben wurde.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// Der Dateipfad
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// Der Zeichenfolgeninhalt der Datei.
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// Das "XMLHttpRequest"-Objekt von IE wird den Zugriff auf das lokale Dateisystem nicht erlauben, verwenden Sie also stattdessen das ActiveX-Steuerelement
					try {
						req = new ActiveXObject("Msxml2.XMLHTTP");
						req.open("GET", file, false);
					} catch (ex) {
						req = null;
					}
				}
			}

			if (!req) {
				return "";
			}

			if (req.overrideMimeType) {
				req.overrideMimeType("text/plain");
			}

			req.send();
			return req.responseText;
		},

		parseJson: function (configBlock, instance) {
			/// <summary locid="VS.Util.parseJson">
			/// Analysiert den "configBlock", und wenn eine gültige Instanz übergeben wurde, werden die analysierten Werte 
			/// als Eigenschaften der Instanz festgelegt.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// Die "configBlock"-Struktur (JSON).
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// Die Instanz, deren Eigenschaften auf Basis des "configBlock" festgelegt wurden.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Die Instanz, die auf Basis des "configBlock" erstellt wurde.
			/// </returns>
			try {
				var parseResult = JSON.parse(configBlock, VS.Util.jsonReviver);
				if (instance) {
					for (var propertyName in parseResult) {
						if (propertyName !== "type") {
							instance[propertyName] = parseResult[propertyName];
						}
					}
					return instance;
				} else {
					return parseResult;
				}
			}
			catch (e) {
				return parseResult;
			}
		},

		jsonReviver: function (key, value) {
			/// <summary locid="VS.Util.jsonReviver">
			/// Es handelt sich hier um eine Funktion, die während der Analyse der JSON-Datenstrukturen für jeden Schlüssel und Wert auf jeder Ebene des endgültigen Resultats aufgerufen wird. 
			/// Jeder Wert wird durch das Ergebnis der "reviver"-Funktion ersetzt. Dies kann zum Umwandeln von generischen Objekten in Instanzen von Pseudoklassen verwendet werden.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// Der aktuelle Schlüssel, der vom JSON-Parser gerade überprüft wird.
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// Der aktuelle Wert des Schlüssels, der vom JSON-Parser gerade überprüft wird.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Die aktuelle Pseudoklasse, die den Wert des Schlüssels abbildet.
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// Überprüfen, ob Typ ungleich "null" und eine Funktion ist (Konstruktor)
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Meldet einen Fehler (an die Konsole) unter Verwendung der angegebenen Zeichenfolge und
			/// eine Liste mit variabler Länge der Ersetzungen.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Ein eindeutiger Fehlerbezeichner. Format "[namespace].[identifier]". Die Fehler
			/// meldung, die angezeigt wird, enthält diesen Bezeichner und die Zeichenfolge, die bei der Suche in
			/// der Zeichenfolgenressourcentabelle zurückgegeben wurde, sofern eine solche Zeichenfolge vorhanden ist.
			/// </param>

			var errorResource = VS.Resources.getString(error);
			if (!errorResource.empty) {
				var args = Array.prototype.slice.call(arguments, 0);
				args[0] = errorResource.value;
				error += ": " + VS.Resources.formatString.apply(null, args);
			}

			console.error(error);
		},

		reportWarning: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Meldet eine Warnung (an die Konsole) unter Verwendung der angegebenen Zeichenfolge und
			/// eine Liste mit variabler Länge der Ersetzungen.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Ein eindeutiger Fehlerbezeichner. Format "[namespace].[identifier]". Die Fehler
			/// meldung, die angezeigt wird, enthält diesen Bezeichner und die Zeichenfolge, die bei der Suche in
			/// der Zeichenfolgenressourcentabelle zurückgegeben wurde, sofern eine solche Zeichenfolge vorhanden ist.
			/// </param>
			var errorResource = VS.Resources.getString(error);
			if (!errorResource.empty) {
				var args = Array.prototype.slice.call(arguments, 0);
				args[0] = errorResource.value;
				error += ": " + VS.Resources.formatString.apply(null, args);
			}

			console.warn(error);
		},

		outputDebugMessage: function () {
			/// <summary locid="VS.Util.outputDebugMessage">
			/// Meldet eine Warnung (an die Konsole) unter Verwendung der angegebenen Zeichenfolge und
			///eine Liste mit variabler Länge der Ersetzungen, die der .NET-Zeichenformatierung folgen, z. B.
			/// outputDebugMessage("state: '{0}', ID: {1}", "ON", 23]) verfolgt "state: 'ON', ID: 23".
			/// </summary>
			if (arguments.length > 0) {
				var params = arguments;
				while (params.length === 1 && typeof params[0] !== "string" && params[0].length) {
					params = params[0];
				}

				var message = formatMessage(params);
				console.log(message);
			}
		},


		/// <summary locid="VS.Util.isTraceEnabled">
		/// Aktiviert bzw. deaktiviert die Ablaufverfolgung für Aktionen. Für Diagnosezwecke.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// Verfolgt Aktionsinformationen. Argumente folgen der Notation für .NET-Zeichenfolgenformatierungen. Zum Beispiel
			/// VS.Util.trace("Action: '{0}', ID: {1}", "set", 23) verfolgt "Action: 'set', ID: 23".
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// Hilfsfunktion zum Konvertieren eines generischen JavaScript-Objekts in den angegebenen Typ. Überprüft Eigenschaften,
		// wenn der Typ Metadaten bereitstellt.

		var typedObject = new Type();
		var metadata = Type._metadata;

		if (!metadata) {
			VS.Util.reportWarning("VS.Util.NoMetadataForType", getObjectTypeDescription(typedObject));
		}

		for (var propertyName in genericObject) {
			if (propertyName !== "type") {
				var propertyValue = genericObject[propertyName];
				setProperty(typedObject, propertyName, propertyValue, metadata);
			}
		}

		// Überprüfen, ob alle erforderlichen Eigenschaften vorliegen
		if (metadata) {
			for (var requiredPropertyName in metadata) {
				if (metadata[requiredPropertyName].required && !typedObject[requiredPropertyName]) {
					VS.Util.reportError("VS.Util.JsonPropertyMissing", getObjectTypeDescription(typedObject), requiredPropertyName);
					return null;
				}
			}
		}

		return typedObject;
	}

	function setProperty(object, propertyName, propertyValue, metadata) {
		if (!metadata) {
			metadata = object.constructor._metadata;
		}

		var propertyMetadata = metadata ? metadata[propertyName] : null;
		var requiredType = propertyMetadata ? propertyMetadata.type : null;

		if (requiredType) {
			var validatedValue = validatedPropertyValue(object, propertyName, propertyValue, requiredType, propertyMetadata.elementType);
			if (validatedValue) {
				// Typ ist richtig, also festlegen
				object[propertyName] = validatedValue;
			}
		} else {
			// Entweder verfügen wir über keinerlei Metadaten (in diesem Fall haben wir bereits einen Fehler angezeigt,
			// verfügen über Metadaten, die jedoch diese Eigenschaft nicht definieren (in diesem Fall behandeln wir es als eine
			// unerwartete Eigenschaft) oder die Metadaten der Eigenschaft definieren nicht ihren Typ (in diesem Fall
			// betrachten wir die Metadaten als falsch formatiert). Anzeigen von passenden Fehlern in den beiden letzten Szenarien.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// Unabhängig davon setzen wir die Eigenschaft auf einen gerade verfügbaren Wert.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// Überprüft einen Eigenschaftenwert auf den angeforderten Typ. Falls ungültig, sofern möglich konvertieren. Zurückgeben von "null"
		// , falls Konvertieren fehlschlägt.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// Element nach Typ erzwingen, sofern möglich
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// Andernfalls prüfen, ob der Typ über einen Konverter verfügt
				if (requiredPropertyType.converter) {
					var convertedPropertyValue = requiredPropertyType.converter.convertFrom(propertyValue);
					if (convertedPropertyValue) {
						return convertedPropertyValue;
					}
				}

				VS.Util.reportError("VS.Util.JsonTypeMismatch", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), getObjectTypeDescription(requiredPropertyType));
				return null;
			}

			if (requiredPropertyType === Array) {
				if (requiredElementType) {
					for (var i = 0; i < propertyValue.length; i++) {
						var validatedValue = validatedPropertyValue(parent, propertyName, propertyValue[i], requiredElementType);
						if (validatedValue) {
							propertyValue[i] = validatedValue;
						} else {
							if (propertyValue[i]) {
								VS.Util.reportError("VS.Util.JsonArrayTypeMismatch", getObjectTypeDescription(parent), propertyName, i, getObjectTypeDescription(propertyValue[i]), getObjectTypeDescription(requiredElementType));
							} else {
								VS.Util.reportError("VS.Util.JsonArrayElementMissing", getObjectTypeDescription(parent), propertyName, i);
							}
							return null;
						}
					}
				} else {
					VS.Util.reportWarning("VS.Util.NoElementTypeMetadataForArrayProperty", getObjectTypeDescription(parent), propertyName);
				}
			}
			return propertyValue;
		} else if (typeof requiredPropertyType === "object") {
			// Annahme, der erforderliche Typ ist eine Enumeration

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "Zeichenfolge")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("Kein Handletyp " + requiredPropertyType + " bei der Gegenprüfung mit Metadaten");
		}
	}

	function getObjectTypeDescription(object) {
		// Hilfsfunktion zum Anzeigen einer Beschreibung aus dessen Konstruktor (erfordert eine
		// benannte Konstruktorfunktion) - verwendet für Fehlermeldungen.

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// Für eine bessere Lesbarkeit sollte ein "_ctor" am Ende des Namens der Konstruktorfunktion entfernt werden.
			result = result[1];
			var pos = result.length - 5;
			if (result.indexOf("_ctor", pos) !== -1) {
				result = result.substring(0, pos);
			}
		} else {
			result = "(unknown type)";
		}

		return result;
	}
})(_VSGlobal.VS, _VSGlobal);

//js\Actions\ActionBase.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.ActionBase">
		/// Die Basisklasse für alle Aktionen, die von der VS Actions-Laufzeit ausgeführt werden.
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.ActionBase", die eine Aktion definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// Legt die Zieleigenschaft für "AddClassAction" fest oder ruft sie ab.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// Wenn kein targetSelector vorhanden ist, führen einen Roundtrip für targetElements durchführen, andernfalls querySelectorAll(targetSelector).
					/// Diese Methode kann von benutzerdefinierten Aktionen verwendet werden, um die Liste von Zielelementen zu bearbeiten, auf die die Aktion angewendet wird.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Eine Auflistung von Elementen, für die diese Aktion ausgeführt werden soll. Diese Auflistung wird vom
					/// Behavior-Besitzerobjekt erstellt. Dabei werden Verhaltensdetails wie angefügte Elemente und Quellauswahl
					/// berücksichtigt. NICHT berücksichtigt werden aktionsspezifische Details wie die Aktionszielauswahl.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// Führt die Aktion für alle Zielelemente aus.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Eine Auflistung von Elementen, für die diese Aktion ausgeführt werden soll. Diese Auflistung wird vom
					/// Behavior-Besitzerobjekt erstellt. Dabei werden Verhaltensdetails wie angefügte Elemente und Quellauswahl
					/// berücksichtigt. NICHT berücksichtigt werden aktionsspezifische Details wie die Aktionszielauswahl.
					/// Die ExecuteAll-Methode führt die Behavior-Zielelemente mit ihren eigenen Zielen zusammen und
					/// und führt die Aktion für die zusammengeführten Ziele aus.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Optionale von Verhaltensweisen bereitgestellte Informationen. Wird beispielsweise von EventTriggerBehavior zum Übergeben des Ereignisses verwendet.
					/// </param>

					try {
						// Die tatsächliche Liste von Zielelementen abrufen, die sich von der eingehenden Liste unterscheiden kann.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// Führt die Aktion für ein Element aus. Abgeleitete Aktionen müssen dies überschreiben. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Optionale von Verhaltensweisen bereitgestellte Informationen. Wird beispielsweise von EventTriggerBehavior zum Übergeben des Ereignisses verwendet.
					/// </param>
					throw new Error(VS.Resources.getString("VS.Actions.ActionNotImplemented").value);
				},
			}
		)
	});
})(_VSGlobal.VS);

//js\Actions\RemoveElementsAction.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.RemoveElementsAction">
		/// Konkrete Implementierung der "RemoveElementsAction", die alle Elemente entfernt, auf die durch die "elementsToRemove"-Auswahleigenschaft verwiesen wird
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.RemoveElementsAction", die "RemoveElementsAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// Legt die "elementsToRemove"-Eigenschaft für "RemoveElementsAction" fest oder ruft sie ab.
				/// </field>
				elementsToRemove: {
					get: function () {
						return this.targetSelector;
					},
					set: function (value) {
						this.targetSelector = value;
					}
				},

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveElementsAction.execute">
					/// Entfernt das Element aus DOM.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				elementsToRemove: { type: String }
			}
		)
	});
})(VS);

//js\Actions\RemoveChildrenAction.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.RemoveChildrenAction">
		/// Konkrete Implementierung der "RemoveChildrenAction", die alle untergeordneten Elemente der Elemente entfernt, auf die durch die "parentElement"-Auswahleigenschaft verwiesen wird
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.RemoveChildrenAction", die "RemoveChildrenAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// Legt die "parentElement"-Eigenschaft für "RemoveChildrenAction" fest oder ruft sie ab.
				/// </field>
				parentElement: {
					get: function () {
						return this.targetSelector;
					},
					set: function (value) {
						this.targetSelector = value;
					}
				},

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveChildrenAction.execute">
					/// Entfernt alle untergeordneten Elemente aus einem Element.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				parentElement: { type: String }
			}
		)
	});
})(VS);

//js\Actions\ToggleClassAction.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.ToggleClassAction">
		/// Konkrete Implementierung der "ToggleClassAction", die das Klassenattribut des Elements umschaltet, das durch die Elementeigenschaft festgelegt ist.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.ToggleClassAction", die "ToggleClassAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// Legt die "className"-Eigenschaft für "ToggleClassAction" fest oder ruft sie ab.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// Führt die Aktion aus, wenn eine Auslösung für die Aktionsstruktur erfolgt.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// Kann die Klasse nicht gefunden werden, füge Sie hinzu
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// Andernfalls Klasse entfernen.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				className: { type: String },
				targetSelector: { type: String }
			}
		)
	});
})(VS);

//js\Actions\AddClassAction.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.AddClassAction">
		/// Konkrete Implementierung der "AddClassAction", die das Klassenattribut des Elements ändert, das durch die Elementeigenschaft festgelegt ist.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.AddClassAction", die "AddClassAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// Legt die "className"-Eigenschaft für "AddClassAction" fest oder ruft sie ab.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// Führt die Aktion aus, wenn eine Auslösung für die Aktionsstruktur erfolgt.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.AddClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var classToAdd = this.className;

					if (currentClassValue.indexOf(classToAdd) === -1) {
						if ((currentClassValue === null) || (currentClassValue === "")) {
							element.className = classToAdd;
						} else {
							element.className += " " + classToAdd;
						}
					}
					VS.Util.trace("VS.Actions.AddClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.AddClassAction:execute,StopTM");
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				className: { type: String},
				targetSelector: { type: String }
			}
		)
	});
})(VS);

//js\Actions\RemoveClassAction.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.RemoveClassAction">
		/// Konkrete Implementierung der "RemoveClassAction", die das Klassenattribut des Elements ändert, das durch die Elementeigenschaft festgelegt ist.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.RemoveClassAction", die "RemoveClassAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// Legt die "className"-Eigenschaft für "RemoveClassAction" fest oder ruft sie ab.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// Entfernt einen Klassennamen aus den Klassennamen des Elements.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// Abbrechen, wenn kein Klassenattribut vorhanden ist
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// Dieses Element verfügt über die erforderliche Klasse, fügen Sie sie also nicht zu unserer neuen "newClasses"-Auflistung hinzu
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* Verbinden Sie die Arrayinhalte mit einem Leerzeichen als Trennzeichen */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				className: { type: String},
				targetSelector: { type: String }
			}
		)
	});
})(VS);

//js\Actions\SetHTMLAttributeAction.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.SetHTMLAttributeAction">
		/// Konkrete Implementierung der "SetHTMLAttributeAction", die das Attribut auf den Attributwert bei Elementen festlegt, die durch die "targetSelector"-Eigenschaft angegeben sind.
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.SetHTMLAttributeAction", die "SetHTMLAttributeAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// Legt die "attribute"-Eigenschaft für "SetHTMLAttributeAction" fest oder ruft sie ab.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// Legt die "attributeValue"-Eigenschaft für "SetHTMLAttributeAction" fest oder ruft sie ab.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// Legt den Wert des HTML-Attributs fest.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				targetSelector: { type: String },
				attribute: { type: String },
				attributeValue: { type: String }
			}
		)
	});
})(VS);

//js\Actions\SetStyleAction.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.SetStyleAction">
		/// Konkrete Implementierung der "SetStyleAction", die das "styleProperty" auf den "styleValue" bei Elementen festlegt, die durch die "targetSelector"-Eigenschaft angegeben sind.
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.SetStyleAction", die "SetStyleAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// Legt die "styleProperty"-Eigenschaft für "SetStyleAction" fest oder ruft sie ab.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// Legt die "styleValue"-Eigenschaft für "SetStyleAction" fest oder ruft sie ab.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// Legt den CSS-Eigenschaftswert inline fest.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				targetSelector: { type: String },
				styleProperty: { type: String },
				styleValue: { type: String }
			}
		)
	});
})(VS);

//js\Actions\LoadPageAction.js

(function (VS, global) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		/// <summary locid="VS.Actions.LoadPageAction">
		/// Konkrete Implementierung von "LoadPageAction", die die Seite lädt und sie zu dem Element hinzufügt, das durch die "targetSelector"-Eigenschaft angegeben ist.
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// Initialisiert eine neue Instanz von "VS.Actions.LoadPageAction", die "LoadPageAction" definiert.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// Legt die "page"-Eigenschaft für "LoadPageAction" fest oder ruft sie ab.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// Die Liste der Aktionen, die beim Laden der Seite ausgelöst werden
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// Lädt den Inhalt einer Seite in ein Element.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// Ein Element, für das diese Aktion ausgeführt werden soll.
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// Ruft "WinJS.UI.processAll" auf, um das Verhalten der neu geladenen Seite zu verarbeiten.
								WinJS.UI.processAll(originalElement);

								// Die Ausführung für jede Aktion im Array aufrufen und das leere Array von Zielelementen übergeben.
								// Wenn für Aktionen kein targetSelector angegeben ist, werden keine Aktionen ausgeführt. Andernfalls
								// werden Aktionen anhand von targetSelector-Elementen ausgeführt.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// Fehler?
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				targetSelector: { type: String },
				page: { type: String },
				pageLoaded: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(_VSGlobal.VS, _VSGlobal);

//js\ActionTree\ActionTree.js

(function (VS, global) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "ActionTree", {
		actionTrees: null,
	});
})(_VSGlobal.VS, _VSGlobal);

//js\Behaviors\BehaviorBase.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		/// <summary locid="VS.Behaviors.BehaviorBase">
		/// Die Basisklasse für alle Verhalten.
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// Initialisiert eine neue Instanz von "VS.Behaviors.BehaviorBase", die ein Verhalten definiert.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// Erstellt die Objekt-Eigenschaften auf Basis des "configBlock".
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// Anlage des Verhaltens.
				/// </param>

				this._attachedElementsCount = 0;
				this._attachedElementsMap = {};
				if (configBlock) {
					VS.Util.parseJson(configBlock, this);
				}
				if (element) {
					this.attach(element);
				}
			},
			{
				// Zuordnung von angefügten Elementen mit element.uniqueID als Schlüssel.
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// Elemente aus der Zuordnung extrahieren
					var elements = [];
					for (var key in this._attachedElementsMap) {
						elements.push(this._attachedElementsMap[key].element);
					}
					return elements;
				},

				getAttachedElementsCount: function () { 
					return this._attachedElementsCount;
				},

				getAttachedElementInfo: function (element) {
					return (element ? this._attachedElementsMap[element.uniqueID] || null : null);
				},

				isElementAttached: function (element) {
					return (this._attachedElementsMap[element.uniqueID] ? true : false);
				},

				/// <field type="VS.Behaviors.EventTriggerBehavior.triggeredActions">
				/// Liste der Aktionen, die beim Auslösen des Ereignisses ausgelöst werden
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// Verknüpft die Aktion mit dem Element (üblicherweise die Quelle)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// Das Element, an das das Verhalten angefügt wird.
					/// </param>
					if (element && !this.isElementAttached(element)) {
						var elementInfo = { element: element };
						this._attachedElementsMap[element.uniqueID] = elementInfo;
						this._attachedElementsCount++;
						VS.Behaviors.addBehaviorInstance(element, this);
						this.onElementAttached(element);
					}
				},

				detach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.detach">
					/// Löst das Verhalten
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// Das Element, von dem das Verhalten gelöst werden soll.
					/// </param>
					if (element) {
						// Element aus _behaviorInstances von VS.Behaviors entfernen
						var behaviorInstances = VS.Behaviors.getBehaviorInstances(element);
						if (behaviorInstances) {
							var pos = behaviorInstances.indexOf(this);
							if (pos > -1) {
								behaviorInstances.splice(pos, 1);
							}
						}

						var elementInfo = this._attachedElementsMap[element.uniqueID];
						if (elementInfo) {
							this.onElementDetached(element);
							delete this._attachedElementsMap[element.uniqueID];
							this._attachedElementsCount--;
						}
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementAttached">
					/// Wird aufgerufen, wenn ein Element an ein Verhalten angefügt wird. Diese Methode wird NICHT aufgerufen,
					/// wenn das Element bereits an dieses Verhalten angefügt wurde. Abgeleitete Klassen
					/// überschreiben diese Methode, um bestimmte Aufgaben zum Anfügen auszuführen.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// Ein Element, das angefügt wurde.
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// Wird aufgerufen, bevor das Element von einem Verhalten gelöst wird. Diese Methode wird NICHT aufgerufen,
					/// wenn das Element bereits gelöst wurde. Abgeleitete Klassen überschreiben diese Methode, um bestimmte
					/// Aufgaben zum Lösen auszuführen.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// Ein Element, das gelöst werden soll.
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// Führt die Aktion für alle Zielelemente aus.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// Eine Auflistung von Elementen, für die Aktionen ausgeführt werden sollen.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Optionale von Verhaltensweisen bereitgestellte Informationen. Wird beispielsweise von EventTriggerBehavior zum Übergeben des Ereignisses verwendet.
					/// </param>
					if (this.triggeredActions) {
						this.triggeredActions.forEach(function (action) {
							action.executeAll(targetElements, behaviorData);
						});
					}
				}
			}
		)
	});
})(VS);

//js\Behaviors\SelectorSourcedBehavior.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		/// <summary locid="VS.Behaviors.SelectorSourcedBehavior">
		/// Die Basisklasse für alle Verhalten mit Selektoren.
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// Die Quellen initialisieren, bevor der Basisklassenkonstruktor aufgerufen wird.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// Von sourceSelector definierte Elemente.
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// Gibt die sourceSelector-Eigenschaft für die SelectorSourcedBehaviorBase zurück
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">Der Wert der sourceSelector-Eigenschaft.</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// Legt den Wert der sourceSelector-Eigenschaft fest. Dadurch werden alle Elemente mit dem angegebenen sourceSelector gesucht, und das Verhalten wird auf diese Elemente angewendet.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// Der Wert der sourceSelector-Eigenschaft.
						/// </param>
						this._sourceSelector = value || "";

						// Auch wenn der neue Quellauswahlwert mit dem alten identisch ist, werden alle Quellen aktualisiert.
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// Fügt das SelectorSourcedBehavior an das Element an.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// Das Element, an das das Verhalten angefügt wird. Wenn keine Quelle für das Verhalten angegeben ist, wird das verbundene Element als Quelle für das Verhalten verwendet
					/// </param>

					// Wenn keine selectorSource vorhanden ist, muss dieses Element als Quelle verwendet werden.
					if (element) {
						if (this._sourceSelector === "") {
							this._addSource(element);
						} else {
							this._refreshSources();
						}
					}
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached">
					/// Löst das SelectorSourcedBehavior.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// Das Element, von dem das Verhalten gelöst wurde.
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// Die Quellen aktualisieren. Das zu lösende Element wird weiterhin auf die angefügten Elemente angerechnet.
							// Die aktuelle Anzahl angefügter Elemente -1 muss bereitgestellt werden.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// Wird aufgerufen, wenn eine Quelle aus diesem Verhalten entfernt wird. Abgeleitete Klassen können diese Methode überschreiben, um bestimmte Aufgaben auszuführen.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Quellelement.
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// Wird aufgerufen, wenn diesem Verhalten ein neues Quellelement hinzugefügt wird. Abgeleitete Klassen können diese Methode überschreiben, um bestimmte Aufgaben auszuführen.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Quellelement.
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// Gibt das Objekt zurück, das Informationen zum Quellelement enthält. Kann von abgeleiteten Klassen verwendet
					/// werden, um Informationen für einzelne Quellelemente zu speichern.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// Quellelement.
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// Gibt eine Auflistung von Quellelementen zurück.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// Gibt eine Auflistung von Zielelementen zurück, für die Aktionen ausgelöst werden sollen. Wenn es sich beim Quellelement um eines
					/// der angefügten Elemente handelt, ist dies das einzige Element, für das Aktionen ausgelöst werden. Andernfalls sollten
					/// Aktionen für alle angefügten Elemente ausgelöst werden.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// Quellelement.
					/// </param>
					if (this.isElementAttached(eventSourceElement)) {
						return [eventSourceElement];
					} else {
						return this.getAattachedElements();
					}
				},

				_refreshSources: function (attachedElementsCount) {
					this._removeAllSources();
					if (attachedElementsCount === undefined) {
						attachedElementsCount = this.getAttachedElementsCount();
					}

					// Neue Quellen nur für den Fall erstellen, dass mindestens ein angefügtes Element vorhanden ist.
					if (attachedElementsCount > 0) {
						if (this._sourceSelector !== "") {
							this._addAllSources(document.querySelectorAll(this._sourceSelector));
						} else {
							this._addAllSources(this.getAattachedElements());
						}
					}
				},

				_removeAllSources: function () {
					for (var key in this._sources) {
						var sourceInfo = this._sources[key];
						this.onSourceElementRemoved(sourceInfo.element);
					}
					this._sources = {};
				},

				_addAllSources: function (elements) {
					for (var i = 0; i < elements.length; i++) {
						this._addSource(elements[i]);
					}
				},

				_addSource: function (element) {
					var sourceInfo = { element: element };
					this._sources[element.uniqueID] = sourceInfo;
					this.onSourceElementAdded(element);
				},
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				sourceSelector: { type: String }
			}
		)
	});
})(VS);

//js\Behaviors\TimerBehavior.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		/// <summary locid="VS.Behaviors.TimerBehavior">
		/// Konkrete Implementierung von TimerBehavior, die auf den Zeitgebertakt lauscht und ggf. eine Aktion auslöst.
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// Initialisiert eine neue Instanz von VS.Behaviors.TimerBehavior und löst Aktionen aus, wenn der Zeitgeber läuft.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// Fügt das TimerBehavior an das Element an und legt eine Quelle fest, wenn kein _sourceselector set vorliegt
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// Das Element, an das das Verhalten angefügt wird. Wenn keine Quelle für das Verhalten angegeben ist, wird das verbundene Element als Quelle für das Verhalten verwendet
					/// </param>

					// Alle Aktionen an das Element anfügen. Dadurch wird das Ziel für die Aktionen festgelegt, wenn nicht bereits geschehen.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// Löst das TimerBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// Das Element, von dem das Verhalten gelöst wurde.
					/// </param>
					VS.Util.trace("VS.Behaviors.TimerBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
					var elementInfo = this.getAttachedElementInfo(element);
					window.clearInterval(elementInfo._timerId);
				},

				_tickHandler: function (element) {
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						if (elementInfo._count !== Number.POSITIVE_INFINITY &&
							elementInfo._count++ >= this.totalTicks) {
							this.detach(element);
						} else {
							this.executeActions([element]);
						}
					}
				},

			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				totalTicks: { type: Number },
				millisecondsPerTick: { type: Number },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\EventTriggerBehavior.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		/// <summary locid="VS.Behaviors.EventTriggerBehavior">
		/// Konkrete Implementierung von EventTriggerBehavior, das auf ein Ereignis des Quellelements lauscht und ggf. eine Aktion auslöst.
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// Initialisiert eine neue Instanz von VS.Behaviors.EventTriggerBehavior, das ein Ereignis definiert und Aktionen auslöst, wenn das Ereignis auftritt.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// fügt EventTriggerBehavior an das Element an (üblicherweise das Element)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// Quellelement.
					/// </param>

					// Wenn es sich um ein Ladeereignis handelt, lösen Sie es jetzt aus, da die Laufzeit des Verhaltens beim Laden gestartet wird (was bereits ausgelöst wurde)
					if (this.event === "load") {
						// Simulieren Sie die Argumente und übergeben Sie sie an die Aktion, die manuell ausgelöst wird.
						// VS.Behaviors.processAll kann während des Lebenszyklus der Seite mehrere Male aufgerufen werden.
						// Wir wollen "load"-Aktionen aber nur einmal ausführen. Wir verwenden eine spezielle Markierung.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// Einen neuen Listener für ein Element erstellen und diesen beibehalten.
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// Ein Ereignis an ein Element anfügen, wenn ein realer Ereignisname vorhanden ist.
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// Entfernt den Ereignislistener für das Element, wenn dieses entfernt wird.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// Das Element des Verhaltens.
					/// </param>
					if (element) {
						var sourceInfo = this.getSourceElementInfo(element);
						if (sourceInfo && sourceInfo._eventListener) {
							if (this.event !== "") {
								element.removeEventListener(this.event, sourceInfo._eventListener);
							}
							sourceInfo._eventListener = null;
							VS.Util.trace("VS.Behaviors.EventTriggerBehavior: -- <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
						}
					}
				},

				_event: "",
				event: {
					get: function () {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.get">
						/// Gibt die Ereigniseigenschaft des EventTriggerBehavior zurück
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">Der Wert der Ereigniseigenschaft.</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// Legt den Wert der Ereigniseigenschaft fest.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// Der Wert der Ereigniseigenschaft.
						/// </param>
						var oldEvent = this._event || "";
						var newValue = value || "";
						if (oldEvent !== newValue) {
							var sourceElements = this.getSourceElements();
							for (var i = 0; i < sourceElements.length; i++) {
								this.onSourceElementRemoved(sourceElements[i]);
							}
							this._event = newValue;
							for (var i = 0; i < sourceElements.length; i++) {
								this.onSourceElementAdded(sourceElements[i]);
							}
						}
					}
				},

				_executeEventActions: function (sourceElement, event) {
					if (sourceElement) {
						var targetElements = this.getTargetElementsForEventSourceElement(sourceElement);
						var behaviorData = { event: event };
						this.executeActions(targetElements, behaviorData);
					}
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				event: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\RequestAnimationFrameBehavior.js

(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior">
		/// Konkrete Implementierung von RequestAnimationFrameBehavior, die auf den Zeitgebertakt lauscht und ggf. eine Aktion auslöst.
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// Initialisiert eine neue Instanz von VS.Behaviors.RequestAnimationFrameBehavior
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// Fügt das RequestAnimationFrameBehavior an das Element an
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Das Element, an das das Verhalten angefügt wird. Wenn keine Quelle für das Verhalten angegeben ist, wird das verbundene Element als Quelle für das Verhalten verwendet
					/// </param>

					if (element) {
						var elementInfo = this.getAttachedElementInfo(element);
						var that = this;
						elementInfo._callback = function () {
							that._frameCallBack(element);
						};

						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
					}
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached">
					/// Löst das RequestAnimationFrameBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// Das Element, von dem das Verhalten gelöst wurde.
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// Aktionen aufrufen
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// requestAnimationFrame mit Animationsframe pro Sekunde aufrufen.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* Statische Member leer */ },
			{
				// "Meta-data"-Eigenschaft (für JSON-Analyse)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// ActionTree-Laufzeit für VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// Bereits geladene Aktionen.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// Diese Funktion verarbeitet die ActionTree-Struktur und das [data-vs-interactivity]-Attribut
	function loadActionsImpl() {
		/*JSON-Datei mit hartkodierter Aktionsliste*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// Die actionList-Datei muss nicht vorhanden sein, demnach wird hier kein Fehler generiert.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*ActionList-JSON-Standarddatei*/
				actionListFileName = "/js/actionList.json";
			}
			var actionListDef = VS.Util.loadFile(actionListFileName);
			var actionTreeList = JSON.parse(actionListDef, VS.Util.jsonReviver);

			if (!actionTreeList) {
				return [];
			}

			if (!Array.isArray(actionTreeList)) {
				VS.Util.reportError("VS.ActionTrees.JsonNotArray");
				return [];
			}

			return actionTreeList;
		} catch (e) {
			VS.Util.reportError(e.message);
		}

		return null;
	}

	function registerActions(actionTreeList) {
		try {
			if (!actionTreeList) {
				return;
			}

			VS.ActionTree.actionTrees = VS.ActionTree.actionTrees || {};

			for (var i = 0; i < actionTreeList.length; i++) {
				var actionTree = actionTreeList[i];
				if (!actionTree) {
					continue;
				}

				// Beachten Sie, dass Metadaten eine Namenseigenschaft bei der JSON-Analyse erzwingen (Animationen werden
				// nicht erstellt, wenn Sie keinen Namen haben). Bei Duplikaten wird die alte durch die neue
				// Version überschrieben.
				var actionTreeName = actionTree.name;
				// Jede actionTree-Struktur mit dem Namen als Schlüssel zum Wörterbuch hinzufügen.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// Die actionList-Datei muss nicht vorhanden sein, demnach wird hier kein Fehler generiert.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// Aktionen von Elementen lösen
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// Vorhandene Aktionen löschen
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// Die actionList-Datei muss nicht vorhanden sein, demnach wird hier kein Fehler generiert.
		}

	}

	// Dadurch wird sichergestellt, dass die in den Fragmenten definierten Verhalten vor dem Laden des Fragments initialisiert werden.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// Fügt Verhalten und Aktionen für das angegebene Element an
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// Beim Erhalt eines gültigen Verhaltensobjekts, analysieren wir es.
				if (behaviors) {
					var behaviorCollection = behaviors.behaviors;
					for (var behaviorCollectionIndex = 0; behaviorCollectionIndex < behaviorCollection.length; behaviorCollectionIndex++) {
						var behavior = behaviorCollection[behaviorCollectionIndex];
						behavior.attach(element);
					}
					_elementsWithBehaviors.push(element);
				}
			}
		}
		msWriteProfilerMark("VS.Behaviors:attach,StopTM");
	}

	// Lösen des vorhandenen Verhaltens vom Element
	function detach(currentElement) {
		if (_elementsWithBehaviors) {
			var pos = _elementsWithBehaviors.indexOf(currentElement);
			if (pos > -1) {
				var behaviorInstancesForElement = VS.Behaviors.getBehaviorInstances(currentElement);
				var behaviorInstancesForElementCopy = behaviorInstancesForElement.slice();
				if (behaviorInstancesForElementCopy) {
					behaviorInstancesForElementCopy.forEach(function (behavior) {
						behavior.detach(currentElement);
					});
				}
				_elementsWithBehaviors.splice(pos, 1);
			}
		}
	}

	// Tatsächliche Verarbeitung der Implementierung auf Verhalten, erfolgt in den Elementen
	// mit data-vs-interactivity-Attributen und Aufrufen, die für die einzelnen Elemente erstellt werden.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// Aktionen ggf. zuerst laden
		loadActions();

		// Verarbeiten der [data-vs-interactivity]-Attribute.
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// Suche nach Elementen mit den Attributen oben und Anfügen der verbundenen Verhalten.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// Erst werden die vorhandenen Verhalten gelöst
		detach(element);
		// Jetzt werden die neuen Verhalten angefügt
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// Versuchen, neue Aktionen zu laden. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// Wahrscheinlich sind die Aktionen (*.json) ungültig.
			return; 
		}

		// Kopie der zu aktualisierenden Elemente abrufen.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// Die Registrierung der aktuellen Aktionen aufheben und neue registrieren.
		resetImpl();
		registerActions(actionTreeList);

		// Angefügte Verhaltensweisen für bearbeitete Elemente.
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// Einrichten von Membern des "VS.Behaviors"-Namespace
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Wendet deklarative Verhaltensbindung auf alle Elemente an, beginnend mit dem angegebenen Stammelement.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Element, bei dem mit der Verarbeitung des data-vs-interactivity-Attributs begonnen werden soll
			/// Wenn dieser Parameter nicht angegeben wird, wird die Bindung auf das gesamte Dokument angewendet.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Wendet deklarative Verhaltensbindung auf ein Element an.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Element, bei dem mit der Verarbeitung des data-vs-interactivity-Attributs begonnen werden soll
			/// Wenn dieser Parameter nicht angegeben wird, wird die Bindung auf das gesamte Dokument angewendet.
			/// </param>

			// Wenn es sich dabei um das erste zu verarbeitende Element handelt, müssen Aktionen geladen werden.
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// Löst Aktionen von Elementen und entfernt alle geladenen Aktionen.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// Aktualisiert Verhaltensweisen für Elemente, die durch processAll verarbeitet wurden.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// gibt ein Array von behaviorInstances zurück, die an das angegebene Element angefügt sind.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// Das Element, für das die Verhaltensinstanzen abgerufen werden.
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">Das Array von Verhaltensinstanzen, die dem Element angefügt sind.</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// Legt das Array der Verhaltensinstanzen für das Element fest.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// Das Element, für das die Verhaltensinstanz festgelegt wird.
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// Die aktuelle Verhaltensinstanz, die für das angegebene Element hinzugefügt wird
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// Normalerweise wird processAll nach dem Laden des Dokuments angewendet. Wenn dieses Skript jedoch nach dem
	// Laden des Dokuments hinzugefügt wird (z. B. aufgrund einer WinJS-Navigation oder durch ein anderes
	// JS), muss processAll sofort ausgeführt werden.
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// ActionTree-Laufzeit für VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// Überprüfen, ob WinJs vorhanden ist, indem alle zugehörigen Komponenten überprüft werden.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// Das WinJS-Vorlagenrendering instrumentieren.
			var winJsTemplate = WinJS.Binding.Template;
			WinJS.Namespace.define("VS.Behaviors.WinJS", {
				Template: WinJS.Class.derive(winJsTemplate, function (element, options) {
					winJsTemplate.call(this, element, options);
					element.renderItem = this.renderItem.bind(this);
				}, {
					render: function (dataContext, container) {
						return winJsTemplate.prototype.render.call(this, dataContext, container).then(function (element) {
							VS.Behaviors.processAll(element);
							return element;
						});
					},

					renderItem: function (itemPromise, recycled) {
						var result = winJsTemplate.prototype.renderItem.call(this, itemPromise, recycled);
						result = Object.create(result);
						result.renderComplete = result.renderComplete.then(function (element) {
							VS.Behaviors.processAll(element);
							return element;
						});
						return result;
					},
				})
			});
			WinJS.Binding.Template = VS.Behaviors.WinJS.Template;

			// WinJS.UI instrumentieren.
			var winJsUiProcess = WinJS.UI.process;
			var winJsUiProcessAll = WinJS.UI.processAll;
			WinJS.Namespace.define("VS.Behaviors.WinJS.UI", {
				processAll: function (rootElement, skipRoot) {
					return winJsUiProcessAll.call(this, rootElement, skipRoot).then(function (value) {
						VS.Behaviors.processAll(rootElement);
						return value;
					});
				},
				process: function (element) {
					return winJsUiProcess.call(this, element).then(function (value) {
						VS.Behaviors.processAll(element);
						return value;
					});
				},
			});
			WinJS.UI.process = VS.Behaviors.WinJS.UI.process;
			WinJS.UI.processAll = VS.Behaviors.WinJS.UI.processAll;

			// WinJS.UI.Fragments instrumentieren.
			var winJsUiFragmentsRender = WinJS.UI.Fragments.render;
			var winJsUiFragmentsRenderCopy = WinJS.UI.Fragments.renderCopy;
			WinJS.Namespace.define("VS.Behaviors.WinJS.Fragments", {
				render: function (href, target) {
					return winJsUiFragmentsRender.call(this, href, target).then(function (value) {
						VS.Behaviors.processAll(target);
						return value;
					});
				},

				renderCopy: function (href, target) {
					return winJsUiFragmentsRenderCopy.call(this, href, target).then(function (value) {
						VS.Behaviors.processAll(target);
						return value;
					});
				},
			});
			WinJS.UI.Fragments.render = VS.Behaviors.WinJS.Fragments.render;
			WinJS.UI.Fragments.renderCopy = VS.Behaviors.WinJS.Fragments.renderCopy;
		} catch (e) {
		}
	}

	// Normalerweise wird dieses Skript nach WinJS-Skripten platziert. Daher ist "jetzt" ein guter Zeitpunkt zum Instrumentieren von WinJS.
	instrumentWinJsOnDemand();

	// Wenn WinJS nicht instrumentiert wird, kommt dieses Skript vor WinJS, oder WinJS ist nicht vorhanden. Es wird versucht,
	// WinJS beim Laden des Dokuments zu instrumentieren (wenn das Skript nicht erst nach dem Laden hinzugefügt wird).
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


