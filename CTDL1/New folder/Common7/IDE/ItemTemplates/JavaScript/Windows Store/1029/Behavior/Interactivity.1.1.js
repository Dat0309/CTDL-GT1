/*! © Microsoft. Všechna práva vyhrazena. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// Tyto funkce umožňují v knihovně WinJS definovat obor názvů.
/// Přidá také VS do globálního oboru názvů.

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
			/// Definuje nový obor názvů se zadaným názvem v rámci zadaného nadřazeného oboru názvů.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// Nadřazený obor názvů
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// Název nového oboru názvů
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// Členové nového oboru názvů
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// Nově definovaný obor názvů
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
			/// Definuje nový obor názvů se zadaným názvem.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// Název oboru názvů. V případě vnořených oborů názvů se může jednat o název oddělený tečkou.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// Členové nového oboru názvů
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// Nově definovaný obor názvů
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// Určete členy oboru názvů VS.Namespace.
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// Tyto funkce umožňují v knihovně WinJS definovat třídu a odvodit z třídy jinou třídu.

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// Přidá metadata vlastnosti do třídy (pokud byla zadána). Jako první zahrnuje metadata definovaná
		// pro základní třídu (což lze přepsat pomocí metadat pro tuto třídu).
		//
		// Příklad metadat:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// "type" se řídí pravidly pro komentáře Intellisense v jazyce JavaScript. Je nutné ho vždy zadat.
		// Je nutné zadat "elementType", pokud "type" má hodnotu "Array".
		// Výchozí hodnota pro "required" je "false".

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
		/// Definuje třídu s použitím daného konstruktoru a zadaných členů instance.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// Funkce konstruktoru, která slouží k vytvoření instance této třídy
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// Sada polí, vlastností a metod instance zpřístupněných pro tuto třídu
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// Sada statických polí, vlastností a metod zpřístupněných pro tuto třídu
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// Metadata popisující vlastnosti třídy. Pomocí těchto metadat se ověřují data ve formátu JSON,
		/// a proto jsou užitečná jen pro typy, které se vyskytují v datech ve formátu JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// Nově definovaná třída
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
		/// Vytvoří podtřídu na základě zadaného parametru baseClass s použitím dědičnosti prostřednictvím prototypů.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// Třída, ze které se má dědit
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// Funkce konstruktoru, která slouží k vytvoření instance této třídy
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// Sada polí, vlastností a metod instance, které se mají pro třídu zpřístupnit
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// Sada statických polí, vlastností a metod, které se mají pro třídu zpřístupnit
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// Metadata popisující vlastnosti třídy. Pomocí těchto metadat se ověřují data ve formátu JSON,
		/// a proto jsou užitečná jen pro typy, které se vyskytují v datech ve formátu JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// Nově definovaná třída
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
		/// Definuje třídu s použitím daného konstruktoru a sjednocení sady členů instance
		/// určených všemi objekty mixin. Seznam parametrů mixin má proměnnou délku.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// Funkce konstruktoru, která slouží k vytvoření instance této třídy
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// Nově definovaná třída
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// Určete členy oboru názvů VS.Class.
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
			/// Načítá řetězec prostředku se zadaným identifikátorem prostředku.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// Identifikátor prostředku řetězce, který se má načíst
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// Objekt, který může obsahovat tyto vlastnosti:
			/// 
			/// value:
			/// Hodnota požadovaného řetězce. Tato vlastnost je vždy k dispozici.
			/// 
			/// empty:
			/// Hodnota určující, zda nebyl požadovaný řetězec nalezen.
			/// Pokud má hodnotu true, nebyl řetězec nalezen. Pokud má hodnotu false nebo je nedefinovaná,
			/// byl požadovaný řetězec nalezen.
			/// 
			/// lang:
			/// Jazyk řetězce, pokud je zadán. Tato vlastnost je k dispozici jen
			/// pro vícejazyčné prostředky.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "Vlastnost {0} není očekávána pro {1}.",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: Nalezený typ: {2}; Očekávaný typ: {3}",
				"VS.Util.JsonPropertyMissing": "Vyžadovaná vlastnost {0}.{1} chybí nebo je neplatná.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: Nalezený typ: {3}; Očekávaný typ: {4}",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] chybí nebo je neplatné.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: Nalezený typ: {2}; Očekávaný typ: String (volba: {3})",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: Neplatná hodnota. Nalezeno: {2}; Očekávána jedna z následujících hodnot: {3}",
				"VS.Util.NoMetadataForType": "Pro typ {0} nebyla nalezena žádná metadata vlastnosti.",
				"VS.Util.NoTypeMetadataForProperty": "Pro {0}.{1} nebyla zadána žádná metadata typu.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "Pro {0}.{1}[] nebyla zadána žádná metadata typu elementu.",
				"VS.Resources.MalformedFormatStringInput": "Poškozeno. Chtěli jste použít kontrolní znaky pro {0}?",
				"VS.Actions.ActionNotImplemented": "Vlastní akce neimplementuje metodu execute.",
				"VS.ActionTrees.JsonNotArray": "Data stromových struktur akcí ve formátu JSON musejí být pole ({0}).",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "Duplicitní název stromové struktury akcí {0} ({1}).",
				"VS.Animations.InvalidRemove": "Nevolejte metodu remove pro instanci animace, která je součástí skupiny.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// Zformátuje řetězec a nahradí přitom tokeny ve formátu {n} zadanými parametry. Například
			/// 'VS.Resources.formatString("Mám {0} prstů.", 10)' vrátí "Mám 10 prstů.".
			/// </summary>
			/// <param name="string">
			/// Řetězec, který se má zformátovat
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
			return "undefined";
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// Příklad: formatMessage(["Stav: {0}, ID: {1}", "ZAPNUTO", 23]) vrátí "Stav: ZAPNUTO, ID: 23"
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
				/// Označí funkci jako kompatibilní s deklarativním zpracováním, například WinJS.UI.processAll
				/// nebo WinJS.Binding.processAll.
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// Funkce, která se má označit jako kompatibilní s deklarativním zpracováním
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// Vstupní funkce
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
			/// Získá hodnotu dat přidruženou k zadanému elementu.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// Element
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// Hodnota přidružená k elementu
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// vrací (jako řetězec) textový obsah souboru, jehož cesta je zadána v argumentu.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// Cesta k souboru
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// Textový obsah souboru (jako řetězec)
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// Objekt XMLHttpRequest aplikace IE nepovolí přístup k místnímu systému souborů. Namísto toho použijte ovládací prvek ActiveX.
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
			/// Analyzuje strukturu configBlock, a pokud je předána platná instance, 
			/// analyzované hodnoty se nastaví jako vlastnosti instance.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// Struktura configBlock (JSON)
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// Instance, jejíž vlastnosti se nastaví na základě struktury configBlock
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Instance vytvořená na základě konfiguračního bloku
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
			/// Toto je funkce, která bude volána pro každý klíč a hodnotu na všech úrovních konečného výsledku v průběhu metody JSON.Parse při analýze datové struktury ve formátu JSON. 
			/// Každá hodnota se nahradí výsledkem funkce reviver. Tímto způsobem lze změnit generické objekty na instance pseudotříd.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// Aktuální klíč, který zpracovává analyzátor formátu JSON
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// Hodnota aktuálního klíče, který zpracovává analyzátor formátu JSON
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Skutečná pseudotřída představující hodnotu klíče
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// Zkontrolujte, zda typ nemá hodnotu null a zda se jedná o funkci (konstruktor).
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Oznámí chybu (na konzolu) s použitím zadaného prostředku řetězce
			/// a seznamu nahrazení s proměnnou délkou.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Jedinečný identifikátor chyby. Měl by mít následující formát: [obor_názvů].[identifikátor]. Zobrazená
			/// chybová zpráva zahrnuje tento identifikátor a řetězec získaný jeho vyhledáním
			/// v tabulce prostředků řetězců (pokud takový řetězec existuje).
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
			/// Oznámí upozornění (na konzolu) s použitím zadaného prostředku řetězce
			/// a seznamu nahrazení s proměnnou délkou.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Jedinečný identifikátor chyby. Měl by mít následující formát: [obor_názvů].[identifikátor]. Zobrazená
			/// chybová zpráva zahrnuje tento identifikátor a řetězec získaný jeho vyhledáním
			/// v tabulce prostředků řetězců (pokud takový řetězec existuje).
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
			/// Oznámí upozornění (na konzolu) s použitím zadaného prostředku řetězce
			/// a seznam nahrazení s proměnnou délkou s použitím formátování řetězců .NET, např.
			/// outputDebugMessage("Stav: {0}, ID: {1}", "ZAPNUTO", 23]) bude trasovat "Stav: ZAPNUTO, ID: 23".
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
		/// Povolí nebo zakáže trasování akcí. Slouží pro diagnostické účely.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// Trasuje informace o akcích. Argumenty jsou v notaci formátování řetězců .NET. Například
			/// VS.Util.trace("Akce: {0}, ID: {1}", "nastavit", 23) bude trasovat "Akce: nastavit, ID: 23".
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// Pomocná funkce, která převádí generický objekt jazyka JavaScript na zadaný typ. Ověřuje vlastnosti,
		// pokud typ poskytuje metadata.

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

		// Ověřte, zda máme všechny požadované vlastnosti.
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
				// Typ odpovídá, takže stačí ho jenom nastavit
				object[propertyName] = validatedValue;
			}
		} else {
			// Buď vůbec nemáme metadata (v tom případě jsme už zobrazili chybu),
			// máme metadata, která ale nedefinují tuto vlastnost (v tom případě ji budeme považovat za
			// neočekávanou vlastnost), nebo metada vlastnosti nedefinují její typ (v tom případě
			// považujeme metadata za poškozená). Zobrazte příslušné chyby pro poslední dva případy.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// Vlastnost každopádně nastavíme na hodnotu, kterou máme, ať je jakákoli.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// Ověřuje, zda hodnota vlastnosti je požadovaného typu. Jestliže ne, převede ji, pokud je to možné. Vrací hodnotu null,
		// pokud hodnotu nelze převést.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// Převeďte položku na daný typ, pokud je to možné.
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// V opačném případě zjistěte, zda má typ převaděč.
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
			// Předpokládejte, že požadovaný typ je výčet.

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "string")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("Nezpracovává se typ " + requiredPropertyType + " při ověřování podle metadat.");
		}
	}

	function getObjectTypeDescription(object) {
		// Pomocná funkce pro zobrazení uživatelsky přívětivého popisu typu z jeho funkce konstruktoru (vyžaduje,
		// aby byla funkce konstruktoru uvedena) – používá se pro chybové zprávy

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// Pokud název funkce konstruktoru končí příponou '_ctor', pro zlepšení čitelnosti ji odeberte.
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
		/// Základní třída pro všechny akce prováděné modulem runtime VS Actions
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// Inicializuje novou instanci VS.Actions.ActionBase definující akci.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// Získá nebo nastaví vlastnost target pro AddClassAction.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// Pokud neexistuje žádný selektor targetSelector, získat znovu elementy targetElements, jinak volat querySelectorAll(targetSelector)
					/// Vlastní akce mohou pomocí této metody upravit seznam cílových elementů, pro které se má akce použít.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Kolekce elementů, pro které se má tato akce provést. Tuto kolekci vytváří
					/// vlastnící objekt Behavior. Bere v úvahu takové podrobnosti objektu Behavior, jako jsou připojené elementy
					/// a selektor zdroje. NEBERE v úvahu podrobnosti specifické pro akci, jako je například selektor cíle akce.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// Provede akci pro všechny cílové elementy.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Kolekce elementů, pro které se má tato akce provést. Tuto kolekci vytváří
					/// vlastnící objekt Behavior. Bere v úvahu takové podrobnosti objektu Behavior, jako jsou připojené elementy
					/// a selektor zdroje. NEBERE v úvahu podrobnosti specifické pro akci, jako je například selektor cíle akce.
					/// Metoda ExecuteAll sjednotí cílové elementy objektu Behavior se svými vlastními cíli a provede
					/// akci pro všechny sjednocené cíle.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Volitelné informace, které poskytují objekty Behavior. Objekt EventTriggerBehavior například pomocí nich předává události.
					/// </param>

					try {
						// Získá skutečný seznam cílových elementů, který se může lišit od příchozího seznamu.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// Provede akci pro jeden element. Odvozené objekty Action musejí tuto metodu přepsat. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Volitelné informace, které poskytují objekty Behavior. Objekt EventTriggerBehavior například pomocí nich předává události.
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
		/// Konkrétní implementace akce RemoveElementsAction, která odebere všechny elementy, na něž se odkazuje vlastnost selektoru elementsToRemove
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// Inicializuje novou instanci VS.Actions.RemoveElementsAction definující akci RemoveElementsAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// Získá nebo nastaví vlastnost elementsToRemove pro akci RemoveElementsAction.
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
					/// Odebere element z modelu DOM.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace akce RemoveChildrenAction, která odebere všechny podřízené elementy elementů, na něž se odkazuje vlastnost selektoru parentElement
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// Inicializuje novou instanci VS.Actions.RemoveChildrenAction definující akci RemoveChildrenAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// Získá nebo nastaví vlastnost parentElement pro akci RemoveChildrenAction.
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
					/// Odebere všechny podřízené položky z elementu.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace akce ToggleClassAction, která přepíná atribut class konkrétního elementu určeného vlastností element.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// Inicializuje novou instanci VS.Actions.ToggleClassAction definující akci ToggleClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// Získá nebo nastaví vlastnost className pro akci ToggleClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// Provede akci, když je aktivována stromová struktura akcí.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// Pokud není třída nalezena, přidejte ji.
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// V opačném případě třídu odeberte.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace akce AddClassAction, která mění atribut class konkrétního elementu určeného vlastností element.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// Inicializuje novou instanci VS.Actions.AddClassAction definující akci AddClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// Získá nebo nastaví vlastnost className pro akci AddClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// Provede akci, když je aktivována stromová struktura akcí.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// Element, pro který se má tato akce provést
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
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace akce RemoveClassAction, která mění atribut class konkrétního elementu určeného vlastností element.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// Inicializuje novou instanci VS.Actions.RemoveClassAction definující akci RemoveClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// Získá nebo nastaví vlastnost className pro akci RemoveClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// Odebere název třídy z názvů tříd elementu.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// Pokud neexistuje žádný atribut třídy, ukončete provádění.
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// Tento element má požadovanou třídu, a proto ho nepřidávejte do naší kolekce newClasses.
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* Slučte obsah pole s použitím mezery jako oddělovače. */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace akce SetHTMLAttributeAction, která nastaví atribut na hodnotu vlastnosti attribute pro elementy, na něž se odkazuje vlastnost targetSelector
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// Inicializuje novou instanci VS.Actions.SetHTMLAttributeAction definující akci SetHTMLAttributeAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// Získá nebo nastaví vlastnost attribute pro akci SetHTMLAttributeAction.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// Získá nebo nastaví vlastnost attributeValue pro akci SetHTMLAttributeAction.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// Nastaví hodnotu atributu HTML.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace akce SetStyleAction, která nastaví vlastnost styleProperty na hodnotu styleValue pro elementy, na něž se odkazuje vlastnost targetSelector
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// Inicializuje novou instanci VS.Actions.SetStyleAction definující akci SetStyleAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// Získá nebo nastaví vlastnost styleProperty pro akci SetStyleAction.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// Získá nebo nastaví vlastnost styleValue pro akci SetStyleAction.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// Nastaví hodnotu vložené vlastnosti CSS.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace akce LoadPageAction, která načte stránku a přidá ji do elementu, na nějž ukazuje vlastnost targetSelector
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// Inicializuje novou instanci VS.Actions.LoadPageAction definující akci LoadPageAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// Získá nebo nastaví vlastnost page pro akci LoadPageAction.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// Seznam akcí, které se mají vyvolat při načtení stránky
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// Načte obsah stránky do elementu.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// Element, pro který se má tato akce provést
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// Volejte metodu WinJS.UI.processAll, pokud chcete zpracovat chování nově načtené stránky.
								WinJS.UI.processAll(originalElement);

								// Volejte metodu execute pro všechny akce v poli a předejte prázdné pole cílových elementů.
								// Pokud pro akce není zadán selektor targetSelector, neprovedou se žádné akce. Jinak
								// se provedou akce pro elementy určené selektorem targetSelector.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// Potlačte chybu.
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Základní třída pro všechna chování
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// Inicializuje novou instanci VS.Behaviors.BehaviorBase definující chování.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// Vytvořte vlastnosti objektu na základě konfiguračního bloku.
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// Připojení chování
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
				// Mapování připojených elementů, jejichž klíčem je vlastnost element.uniqueID
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// Extrahujte elementy z mapování.
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
				/// Seznam akcí, které se mají vyvolat při aktivaci události
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// Připojí akci k elementu (který je obvykle zdrojem).
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// Element, ke kterému je chování připojeno
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
					/// Odpojí chování.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// Element, od kterého se má odpojit chování.
					/// </param>
					if (element) {
						// Odeberte element z objektu VS.Behaviors._behaviorInstances.
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
					/// Volána při připojení elementu k chování. Tato metoda NEBUDE volána,
					/// pokud již byl element k tomuto chování připojen. Odvozené třídy
					/// přepíšou tuto metodu za účelem provádění určitých úloh při připojení.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// Element, který byl připojen
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// Volána předtím, než se element odpojí od chování. Tato metoda NEBUDE volána,
					/// pokud už byl element odpojen. Odvozené třídy přepíšou tuto metodu za účelem provádění
					/// určitých úloh při odpojení.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// Element, který bude odpojen
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// Provede akci pro všechny cílové elementy.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// Kolekce elementů, pro které se mají akce provést
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Volitelné informace, které poskytují objekty Behavior. Objekt EventTriggerBehavior například pomocí nich předává události.
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
		/// Základní třída pro všechna chování se selektory
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// Před voláním konstruktoru základní třídy inicializujte zdroje.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// Elementy, které definuje selektor sourceSelector
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// Vrátí vlastnost sourceSelector pro SelectorSourcedBehaviorBase.
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">Hodnota vlastnosti sourceSelector</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// Nastaví hodnotu vlastnosti sourceSelector. Vyhledá všechny elementy se zadaným selektorem sourceSelector a použije chování pro tyto elementy.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// Hodnota vlastnosti sourceSelector
						/// </param>
						this._sourceSelector = value || "";

						// Aktualizujeme všechny zdroje, i když se nová hodnota selektoru zdrojů rovná staré hodnotě.
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// Připojí chování SelectorSourcedBehavior k elementu.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// Element, ke kterému je chování připojeno Pokud není pro chování určen žádný zdroj, je připojený element zdrojem chování.
					/// </param>

					// Pokud neexistuje žádný selektor selectorSource, musíme jako zdroj použít tento element.
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
					/// Odpojí chování SelectorSourcedBehavior.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// Element, ze kterého bylo chování odpojeno
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// Aktualizujte zdroje. Odpojovaný element se stále započítává mezi připojené elementy.
							// Musíme zadat aktuální počet připojených elementů - 1.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// Volána při odebrání zdroje z tohoto chování. Odvozené třídy mohou tuto metodu přepsat za účelem provádění určitých úloh.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Zdrojový element
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// Volána při přidání nového zdrojového elementu k tomuto chování. Odvozené třídy mohou tuto metodu přepsat za účelem provádění určitých úloh.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Zdrojový element
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// Vrátí objekt obsahující informace o zdrojovém elementu. Odvozené třídy mohou pomocí této metody
					/// ukládat informace pro jednotlivé zdrojové elementy.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// Zdrojový element
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// Vrátí kolekci zdrojových elementů.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// Vrátí kolekci cílových elementů, pro které se mají vyvolat akce. Pokud zdrojový element patří mezi
					/// připojené elementy, pak je jediným elementem, pro který se mají akce vyvolat. Jinak by se akce měly
					/// vyvolat pro všechny připojené elementy.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// Zdrojový element
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

					// Vytvořte nové zdroje, jen pokud existuje alespoň jeden připojený element.
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
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace chování TimerBehavior, která naslouchá události časovače a vyvolá akce, pokud jsou určeny
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// Inicializuje novou instanci VS.Behaviors.TimerBehavior a vyvolá akce v cyklu časovače.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// Připojí chování TimerBehavior k elementu a nastaví zdroj, pokud není nastaven žádný selektor _sourceselector.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// Element, ke kterému je chování připojeno Pokud není pro chování určen žádný zdroj, je připojený element zdrojem chování.
					/// </param>

					// Připojte všechny akce k elementu. Tím se nastaví cíl pro akce, pokud ještě není nastavený.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// Odpojí chování TimerBehavior.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// Element, ze kterého bylo chování odpojeno
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
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace chování EventTriggerBehavior, která naslouchá události zdrojového elementu a vyvolá akce, pokud jsou určeny
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// Inicializuje novou instanci VS.Behaviors.EventTriggerBehavior, která definuje událost a vyvolá akce, když je událost aktivována.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// Připojí chování EventTriggerBehavior k elementu (obvyklý element).
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// Zdrojový element
					/// </param>

					// Pokud je daná událost událost load, vyvolejte ji nyní, protože inicializujeme chování za běhu při zpracování události load (která už byla aktivována).
					if (this.event === "load") {
						// Simulujte argumenty a předejte je akci, kterou jsme ručně vyvolali.
						// Funkci VS.Behaviors.processAll lze volat vícekrát v průběhu životního cyklu stránky.
						// My ale chceme provést akce načtení jen jedenkrát. Použijeme speciální značku.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// Vytvořte nový naslouchací proces pro element a zapamatujte si ho.
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// Připojte událost k elementu, pokud existuje název skutečné události.
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// Odebere naslouchací proces událostí pro element, protože zaniká.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// Element chování
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
						/// Vrátí vlastnost event pro EventTriggerBehavior.
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">Hodnota vlastnosti event</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// Nastaví hodnotu vlastnosti event.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// Hodnota vlastnosti event
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
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
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
		/// Konkrétní implementace chování RequestAnimationFrameBehavior, která naslouchá události časovače a vyvolá akce, pokud jsou určeny
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// Inicializuje novou instanci VS.Behaviors.RequestAnimationFrameBehavior.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// Připojí chování RequestAnimationFrameBehavior k elementu.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Element, ke kterému je chování připojeno Pokud není pro chování určen žádný zdroj, je připojený element zdrojem chování.
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
					/// Odpojí chování RequestAnimationFrameBehavior.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// Element, ze kterého bylo chování odpojeno
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// Volejte akce.
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// Volejte metodu requestAnimationFrame pro animační snímek za sekundu.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Vlastnost Meta-data (pro analýzu formátu JSON)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// Modul runtime ActionTree pro VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// Akce jsou již načteny.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// Tato funkce zpracuje objekt ActionTree a atribut [data-vs-interactivity].
	function loadActionsImpl() {
		/*soubor ve formátu JSON s pevně daným seznamem akcí*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// Nevyžadujeme, aby existoval soubor se seznamem akcí, a proto zde negenerujeme chybu.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*výchozí soubor ve formátu JSON se seznamem akcí*/
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

				// Metadata vyžadují přítomnost názvu vlastnosti během analýzy formátu JSON (animace nebude
				// vytvořena, pokud nemá název). V případě duplicity přepíše novější verze
				// starší verzi.
				var actionTreeName = actionTree.name;
				// Přidejte jednotlivé stromové struktury actionTree do slovníku a jako klíč použijte název.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// Nevyžadujeme, aby existoval soubor se seznamem akcí, a proto zde negenerujeme chybu.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// Odpojte akce od elementů.
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// Odstraňte stávající akce.
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// Nevyžadujeme, aby existoval soubor se seznamem akcí, a proto zde negenerujeme chybu.
		}

	}

	// Tím je zajištěno, že se chování definovaná v rámci fragmentů inicializují před načtením fragmentu.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// Připojování chování a akcí pro daný element
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// Pokud získáme platný objekt chování, analyzujeme ho.
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

	// Odpojte stávající chování od elementu.
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

	// Vlastní proces implementace chování. Prochází jednotlivé elementy
	// s atributem data-vs-interactivity a volá pro každý element metodu create.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// Načtěte nejprve akce, pokud nějaké existují.
		loadActions();

		// Zpracujte atribut [data-vs-interactivity].
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// Vyhledejte elementy s výše uvedeným atributem a připojte přidružené chování.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// Nejprve odpojte stávající chování.
		detach(element);
		// Nyní připojte nové chování.
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// Zkuste načíst nové akce. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// Soubor *.json akcí je pravděpodobně neplatný.
			return; 
		}

		// Získejte kopii elementů, které se mají aktualizovat.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// Zrušte registraci aktuálních akcí a zaregistrujte nové akce.
		resetImpl();
		registerActions(actionTreeList);

		// Chování připojená k elementům, s nimiž jsme pracovali
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// Určete členy oboru názvů VS.Behaviors.
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Použije deklarativní vytváření vazeb chování pro všechny elementy, počínaje zadaným kořenovým elementem.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Element, ve kterém se má zahájit zpracování atributu data-vs-interactivity
			/// Pokud není tento parametr zadán, vazba se použije pro celý dokument.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Použije deklarativní vazbu chování na element.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Element, ve kterém se má zahájit zpracování atributu data-vs-interactivity
			/// Pokud není tento parametr zadán, vazba se použije pro celý dokument.
			/// </param>

			// Pokud je toto první element, který se má zpracovat, musíme načíst akce.
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// Odpojí akce od elementů a odebere všechny načtené akce.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// Aktualizuje chování pro všechny elementy, který byly zpracovány metodou processAll.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// Vrací pole instancí behaviorInstances připojených k danému elementu.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// Element, pro který jsou získány instance chování
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">Pole instancí chování připojených k elementu</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// Nastaví pole instancí chování pro element.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// Element, pro který je nastavena instance chování
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// Aktuální instance chování, která se má přidat pro daný element
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// Metoda processAll se obvykle volá po načtení dokumentu. Pokud je ale tento skript přidán
	// po načtení dokumentu (například protože ho přidala navigace WinJS nebo jiný kód
	// JS), musíme okamžitě volat metodu processAll.
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// Modul runtime ActionTree pro VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// Zkontrolujte přítomnost knihovny WinJS tak, že zkontrolujete všechny její součásti.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// Instrumentujte vykreslení šablony WinJS.
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

			// Instrumentujte obor názvů WinJS.UI.
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

			// Instrumentujte obor názvů WinJS.UI.Fragments.
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

	// Tento skript je obvykle umístěn za skripty WinJS. Proto je nyní vhodná doba instrumentovat knihovnu WinJS.
	instrumentWinJsOnDemand();

	// Pokud se knihovna WinJS neinstrumentuje, je tento skript umístěn před knihovnou WinJS nebo knihovna WinJS neexistuje. Pokusíme se
	// instrumentovat knihovnu WinJS po načtení dokumentu (pokud nebyl tento skript přidán až po jeho načtení).
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


