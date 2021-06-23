/*! © Microsoft. Wszystkie prawa zastrzeżone. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// Niniejsze funkcje zapewniają funkcjonalność WinJS definiowania przestrzeni nazw.
/// Dodaje również VS do globalnej przestrzeni nazw.

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
			/// Definiuje nową przestrzeń nazw z nazwą podaną pod podaną nadrzędną przestrzenią nazw.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// Nadrzędna przestrzeń nazw.
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// Nazwa nowej przestrzeni nazw.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// Elementy członkowskie nowej przestrzeni nazw.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// Nowo zdefiniowana przestrzeń nazw.
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
			/// Definiuje nową przestrzeń nazw z podaną nazwą.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// Nazwa przestrzeni nazw. Może nią być oddzielana kropkami nazwa zagnieżdżonych przestrzeni nazw.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// Elementy członkowskie nowej przestrzeni nazw.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// Nowo zdefiniowana przestrzeń nazw.
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// Określ elementy członkowskie przestrzeni nazw „VS.Namespace”
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// Niniejsze funkcje zapewniają funkcjonalność WinJS definiowania klasy i uzyskiwania z klasy

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// Dodaje do klasy metadane właściwości (jeśli klasa została określona). Zawiera metadane zdefiniowane dla bazy
		// klasa jako pierwsza (można to zmienić za pomocą metadanych dla tej klasy).
		//
		// Przykładowe metadane:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// „type” — zgodny z regułami komentarzy intellisense JavaScript. Zawsze należy go określać.
		// „elementType” — należy określić, jeśli dla danej „type” wybrano ustawienie „Array”.
		// "required" — domyślne ustawienie to „false”.

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
		/// Definiuje klasę, korzystając z danego konstruktora i określonych elementów członkowskich wystąpienia.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// Funkcja konstruktora służąca do tworzenia wystąpienia tej klasy.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// Zbiór pól wystąpień, właściwości i metod dostępnych dla klasy.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// Zbiór pól statycznych, właściwości i metod dostępnych dla klasy.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// Metadane opisujące właściwości klasy. Są wykorzystywane przy walidacji danych JSON itd.
		/// przydatne wyłącznie w przypadku typów, które mogą wystąpić w JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// Nowo zdefiniowana klasa.
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
		/// Tworzy podklasę na podstawie podanego parametru baseClass za pomocą dziedziczenia prototypowego.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// Klasa, odnośnie której nastąpi dziedziczenie.
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// Funkcja konstruktora służąca do tworzenia wystąpienia tej klasy.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// Zbiór pól wystąpień, właściwości i metod, który będzie dostępnych dla klasy.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// Zbiór pól statycznych, właściwości i metod, który będzie dostępnych dla klasy.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// Metadane opisujące właściwości klasy. Są wykorzystywane przy walidacji danych JSON itd.
		/// przydatne wyłącznie w przypadku typów, które mogą wystąpić w JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// Nowo zdefiniowana klasa.
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
		/// Definiuje klasę, korzystając z danego konstruktora i unię zbioru elementów członkowskich wystąpienia.
		/// określone przez wszystkie obiekty mixin. Lista parametrów mixin ma zmienną długość.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// Funkcja konstruktora służąca do tworzenia wystąpienia tej klasy.
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// Nowo zdefiniowana klasa.
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// Określ elementy członkowskie przestrzeni nazw „VS.Class”
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
			/// Pobiera ciąg zasobu o określonym identyfikatorze zasobu.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// Identyfikator zasobu ciągu, który ma być pobrany.
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// Obiekt, który może zawierać te właściwość:
			/// 
			/// value:
			/// Wartość zażądanego ciągu. Ta właściwość jest zawsze obecna.
			/// 
			/// empty:
			/// Wartość, która określa, czy zażądany ciąg nie został odnaleziony.
			/// Jeśli ma wartość true, ciąg nie został odnaleziony. Jeśli jej wartość to false lub undefined,
			/// oznacza to, że ciąg został odnaleziony.
			/// 
			/// lang:
			/// Język ciągu (jeśli został określony). Ta właściwość jest obecna
			/// tylko w przypadku zasobów wielojęzykowych.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "Nieoczekiwana właściwość \"{0}\" dla {1}.",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: Znaleziono typ: {2}; oczekiwano typu: {3}.",
				"VS.Util.JsonPropertyMissing": "Wymagana właściwość \"{0}.{1}\" nie została odnaleziona lub jest nieprawidłowa.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: Znaleziono typ: {3}; oczekiwano typu: {4}.",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] nie został odnaleziony lub jest nieprawidłowy.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: Znaleziono typ: {2}; oczekiwano typu: Ciąg (do wyboru: {3}).",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: Nieprawidłowa wartość. Znaleziono: {2}; oczekiwano jedną z: {3}.",
				"VS.Util.NoMetadataForType": "Nie można odnaleźć metadanych właściwości dla typu {0}.",
				"VS.Util.NoTypeMetadataForProperty": "Nie określono metadanych typu dla {0}.{1}.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "Nie określono metadanych typu elementu dla {0}.{1}[].",
				"VS.Resources.MalformedFormatStringInput": "Źle sformułowany. Czy chcesz opuścić „{0}”?",
				"VS.Actions.ActionNotImplemented": "Akcja niestandardowa nie implementuje metody Execute.",
				"VS.ActionTrees.JsonNotArray": "Dane drzew ActionTree JSON muszą mieć postać tablicy ({0}).",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "Duplikuj nazwę drzewa akcji \"{0}\" ({1}).",
				"VS.Animations.InvalidRemove": "Nie wywołuj polecenia remove na wystąpieniu animacji, które jest zawarte w grupie.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// Formatuje ciąg zastępując tokeny w formie {n} określonymi parametrami. Na przykład,
			/// 'VS.Resources.formatString("Mam {0} palców.", 10)' zwróci informację „Mam 10 palców”.
			/// </summary>
			/// <param name="string">
			/// Ciąg przeznaczony do formatowania.
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
			return "niezdefiniowany";
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// Przykład: formatMessage(["stan: '{0}', identyfikator: {1}", "WŁ.", 23]) zwróci wynik "stan: 'WŁ.', identyfikator: 23"
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
				/// Oznacza funkcję jako zgodną z przetwarzaniem deklaratywnym, na przykład WinJS.UI.processAll
				/// lub WinJS.Binding.processAll.
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// Funkcja, która ma zostać oznaczona jako zgodna z przetwarzaniem deklaratywnym.
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// Funkcja wejściowa.
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
			/// Pobiera wartość danych skojarzonych z określonym elementem.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// Element.
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// Wartość skojarzona z elementem.
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// zwraca ciągi zawarte w pliku, którego ścieżka jest określona w argumencie.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// Ścieżka pliku
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// Ciągi zawarte w pliku.
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// Obiekt XMLHttpRequest przeglądarki Internet Explorer nie zezwoli na dostęp do lokalnego systemu pliku, dlatego należy użyć zamiast niego formantu ActiveX
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
			/// Analizuje strukturę configBlock i w przypadku przekazania prawidłowego wystąpienia, przeanalizowane wartości 
			/// są wyznaczane jako wartości wystąpienia.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// Struktura configBlock (JSON).
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// Wystąpienie, którego właściwości konfigurowane są na podstawie struktury configBlock.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Wystąpienie utworzone na podstawie struktury bloku konfiguracji.
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
			/// Jest to funkcja, która będzie wywoływana dla każdego klucza i wartości, na każdym poziomie wyniku końcowego w czasie wykonywania metody JSON.Parse w czasie analizy struktury danych JSON. 
			/// Każda wartość zostanie zastąpiona rezultatem funkcji reviver. Może to posłużyć do zmiany obiektów ogólnych na wystąpienia pseudoklas.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// Bieżący klucz analizowany przez parser JSON.
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// Bieżąca wartość klucza analizowana przez parser JSON.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Bieżąca pseudo klasa reprezentująca wartość klucza.
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// Upewnij się, że wartość type ma inną wartość niż null i że jest funkcją (konstruktorem)
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Zgłasza błąd (w konsoli), korzystając z określonego zasobu ciągu i
			/// listy podstawień o zmiennej długości.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Unikatowy identyfikator błędu. Powinien mieć formę: „[przestrzeń nazw].[identyfikator]”. Wyświetlany komunikat
			/// o błędzie zawiera identyfikator i ciąg zwrócony po wyszukaniu go w
			/// tabeli zasobów ciągu (jeśli taki ciąg istnieje).
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
			/// Zgłasza ostrzeżenie (w konsoli), korzystając z określonego zasobu ciągu i
			/// listy podstawień o zmiennej długości.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Unikatowy identyfikator błędu. Powinien mieć formę: „[przestrzeń nazw].[identyfikator]”. Wyświetlany komunikat
			/// o błędzie zawiera identyfikator i ciąg zwrócony po wyszukaniu go w
			/// tabeli zasobów ciągu (jeśli taki ciąg istnieje).
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
			/// Zgłasza ostrzeżenie (w konsoli), korzystając z określonego zasobu ciągu i
			/// Lista podstawień o zmiennej długości zgodna z formatowaniem ciągów platformy .NET, na przykład
			/// outputDebugMessage("stan: '{0}', identyfikator: {1}", "WŁ.", 23]) będzie śledzić ciąg "stan: 'WŁ.', identyfikator: 23".
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
		/// Włącza lub wyłącza śledzenie akcji. Służy do celów diagnostycznych.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// Śledzi informacje dotyczące akcji. Argumenty są zgodne z notacją formatowania ciągów platformy .NET. Na przykład
			/// VS.Util.trace("Akcja: '{0}', identyfikator: {1}", "set", 23) będzie śledzić akcję "Akcja: 'set', identyfikator: 23".
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// Funkcja pomocnika umożliwiająca konwersję ogólnego obiektu JavaScript do określonego typu. Waliduje właściwości, jeśli
		// typ dostarcza metadane.

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

		// Sprawdza, czy mamy wszystkie wymagane właściwości
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
				// Typ się zgadza, wystarczy go wybrać
				object[propertyName] = validatedValue;
			}
		} else {
			// Całkowity brak metadanych (w takim przypadku błąd już został wyświetlony,
			// w metadanych ta właściwość nie jest określona (w takim przypadku traktujemy ją jako
			// niespodziewaną właściwość) lub metadane właściwości nie określają jej typu (w takim przypadku
			// metadane uznawane są za uszkodzone). Wyświetl błędy powiązane z dwoma ostatnimi scenariuszami.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// Tak czy inaczej ustawimy dla tej właściwości wartość, którą mamy.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// Sprawdza, czy wartość właściwości jest wymaganego typu. Jeśli nie — wykonuje konwersje (jeśli jest taka możliwość). W innym przypadku zwraca
		// wartość null.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// Jeśli to możliwe, zmień element na typ
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// W przeciwnym razie sprawdź, czy typ ma konwerter
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
			// Załóż, że wymagany typ to wyliczenie

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "ciąg")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("Typ nie jest obsługiwany " + requiredPropertyType + " w czasie walidacji na podstawie metadanych");
		}
	}

	function getObjectTypeDescription(object) {
		// Funkcja pomocnika służąca do wyświetlania przyjaznego opisu typu z jego funkcji konstruktora (wymaga
		// nazwania funkcji konstruktora) — używana w przypadku komunikatów o błędach.

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// Ze względów czytelności warto usunąć końcówkę „_ctor” nazwy funkcji konstruktora (jeśli nazwa taką końcówkę zawiera).
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
		/// Klasa podstawowa dla wszystkich akcji wykonywanych przez środowisko uruchomieniowe VS Actions.
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// Inicjuje nowe wywołanie VS.Actions.ActionBase, które definiuje akcję.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// Pobiera lub ustawia właściwość docelową dla AddClassAction.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// W przypadku braku argumentu targetSelector będzie kolejno analizować wartości tablicy targetElements, w przeciwnym razie wykona metodę querySelectorAll(targetSelector).
					/// Akcje niestandardowe mogą używać tej metody w celu modyfikowania listy elementów docelowych, do których ma zostać zastosowana akcja.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Kolekcja elementów, w odniesieniu do których ma zostać wykonana akcja. Ta kolekcja jest tworzona przez
					/// właściciela obiektu Behavior. Są w niej uwzględniane szczegóły obiektu Behavior, takie jak dołączone elementy
					/// i selektor elementów źródłowych. NIE są uwzględniane szczegóły specyficzne dla akcji, takie jak selektor elementów docelowych akcji.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// Wykonuje akcję dla wszystkich elementów docelowych.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Kolekcja elementów, w odniesieniu do których ma zostać wykonana akcja. Ta kolekcja jest tworzona przez
					/// właściciela obiektu Behavior. Są w niej uwzględniane szczegóły obiektu Behavior, takie jak dołączone elementy
					/// i selektor elementów źródłowych. NIE są uwzględniane szczegóły specyficzne dla akcji, takie jak selektor elementów docelowych akcji.
					/// Metoda ExecuteAll będzie porównywać elementy docelowe obiektu Behavior ze swoimi własnymi elementami docelowymi i wykona
					/// akcję w odniesieniu do pasujących do siebie elementów docelowych.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Opcjonalne informacje dostarczane przez obiekty Behavior. Na przykład obiekt EventTriggerBehavior używa ich do przekazywania zdarzeń.
					/// </param>

					try {
						// Pobiera rzeczywistą listę elementów docelowych, która może być inna niż lista przychodząca.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// Wykonuje akcję dla jednego elementu. Pochodne obiekty Actions muszą zastępować ten obiekt. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Opcjonalne informacje dostarczane przez obiekty Behavior. Na przykład obiekt EventTriggerBehavior używa ich do przekazywania zdarzeń.
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
		/// Konkretna implementacja akcji RemoveElementsAction, która usuwa wszystkie elementy, odnośnie których występują odwołania za pomocą selektora właściwości elementsToRemove
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.RemoveElementsAction, która definiuje akcję RemoveElementsAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// Pobiera lub ustawia właściwość elementsToRemove dla akcji RemoveElementsAction.
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
					/// Usuwa element z modelu DOM.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja akcji RemoveChildrenAction, która usuwa wszystkie elementy podrzędne, odnośnie których występują odwołania za pomocą selektora właściwości parentElement
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.RemoveChildrenAction, która definiuje akcję RemoveChildrenAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// Pobiera lub ustawia właściwość parentElement dla akcji RemoveChildrenAction.
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
					/// Usuwa wszystkie elementy podrzędne z elementu.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja akcji ToggleClassAction, która przełącza atrybut klasy konkretnego elementu na właściwość elementu.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.ToggleClassAction, która definiuje akcję ToggleClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// Pobiera lub ustawia właściwość className dla akcji ToggleClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// Wykonuje akcję, gdy drzewo akcji zostaje wyzwolone.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// Jeśli nie można odnaleźć klasy, należy ją dodać
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// W przeciwnym przypadku należy usunąć klasę.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja akcji AddClassAction, która modyfikuje atrybut klasy konkretnego elementu na właściwość elementu.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.AddClassAction, która definiuje akcję AddClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// Pobiera lub ustawia właściwość className dla akcji AddClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// Wykonuje akcję, gdy drzewo akcji zostaje wyzwolone.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
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
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja akcji RemoveClassAction, która modyfikuje atrybut klasy konkretnego elementu na właściwość elementu.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.RemoveClassAction, która definiuje akcję RemoveClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// Pobiera lub ustawia właściwość className dla akcji RemoveClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// Usuwa nazwę klasy z nazw klas elementu.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// Jeśli nie zostaje zwrócony żaden atrybut klasy
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// Ten element ma wymaganą klasę, dlatego nie trzeba dodawać go do kolekcji newClasses
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* Połącz zawartość tablicy, korzystając ze spacji jako separatora */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja akcji SetHTMLAttributeAction, która zmienia atrybut na parę atrybut-wartość w przypadku elementów, do których istnieją odwołania za pomocą właściwości targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.SetHTMLAttributeAction, która definiuje akcję SetHTMLAttributeAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// Pobiera lub ustawia atrybut targetSelector dla akcji SetHTMLAttributeAction.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// Pobiera lub ustawia właściwość attributeValue dla akcji SetHTMLAttributeAction.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// Ustawia wartość atrybutu HTML.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja akcji SetStyleAction, która dla właściwości styleProperty ustawia właściwość styleValue w przypadku elementów, do których istnieją odwołania za pomocą właściwości targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.SetStyleAction, która definiuje akcję SetStyleAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// Pobiera lub ustawia właściwość styleProperty dla akcji SetStyleAction.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// Pobiera lub ustawia właściwość styleValue dla akcji SetStyleAction.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// Ustawia wartość właściwości CSS w tekście.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja akcji LoadPageAction, która powoduje załadowanie strony i dodanie jej do elementów wskazywanych przez właściwość targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// Inicjuje nowe wystąpienie akcji VS.Actions.LoadPageAction, która definiuje akcję LoadPageAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// Pobiera lub ustawia właściwość page dla akcji LoadPageAction.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// Lista akcji, które zostaną wyzwolone po załadowaniu strony.
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// Ładuje zawartość strony do elementu.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// Element, w odniesieniu do którego ma zostać wykonana akcja.
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// Wywołaj WinJS.UI.processAll, aby przetworzyć zachowania nowo załadowanej strony.
								WinJS.UI.processAll(originalElement);

								// Wywołuje metodę Execute dla każdej akcji w tablicy i wykonuje operację przekazywania w pustej tablicy elementów docelowych.
								// Jeśli akcje nie określają parametru targetSelector, nie zostanie wykonana żadna akcja. W przeciwnym razie
								// akcje będą wykonywane w odniesieniu do elementów określonych w parametrze targetSelector.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// Przełknij błąd
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Klasa podstawowa dla wszystkich zachowań.
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// Inicjuje nowe wystąpienie zachowania VS.Behaviors.BehaviorBase, które definiuje zachowanie.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// Utwórz właściwości obiektu na podstawie bloku konfiguracji.
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// Załącznik zachowania.
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
				// Mapuje dołączone elementy, używając wartości element.uniqueID jako kluczy.
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// Wyodrębnia elementy z mapy.
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
				/// Lista akcji, które zostaną uruchomione po wyzwoleniu zdarzenia
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// Łączy akcje z elementem (zazwyczaj: źródłem)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// Element do którego dołączone jest zachowanie.
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
					/// Odłącza zachowanie
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// Element, od którego ma zostać odłączone zachowanie.
					/// </param>
					if (element) {
						// Usuwa element z zachowania VS.Behaviors._behaviorInstances.
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
					/// Wywoływana, gdy element jest dołączony do zachowania. Ta metoda NIE zostanie wywołana,
					/// jeśli element został już dołączony do tego zachowania. Klasy pochodne
					/// będą zastępować tę metodę w celu wykonania określonych zadań dołączania.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// Element, który został dołączony.
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// Wywoływana przed odłączeniem elementu od zachowania. Ta metoda NIE zostanie wywołana,
					/// jeśli element został już odłączony. Klasy pochodne będą zastępować tę metodę w celu wykonania
					/// określonych zadań odłączania.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// Element, który zostanie odłączony.
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// Wykonuje akcję dla wszystkich elementów docelowych.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// Kolekcja elementów, w odniesieniu do których mają zostać wykonane akcje.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Opcjonalne informacje dostarczane przez obiekty Behavior. Na przykład obiekt EventTriggerBehavior używa ich do przekazywania zdarzeń.
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
		/// Klasa podstawowa dla wszystkich zachowań z selektorami.
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// Inicjuje obiekty źródłowe przed wywołaniem konstruktora klasy podstawowej.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// Elementy zdefiniowane przez parametr sourceSelector.
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// Zwraca właściwość sourceSelector na SelectorSourcedBehaviorBase
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">Wartość właściwości sourceSelector.</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// Ustawia wartość właściwości sourceSelector. Spowoduje to wyszukanie wszystkich elementów z określoną właściwością sourceSelector i zastosowanie zachowania na tych elementach.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// Wartość właściwości sourceSelector.
						/// </param>
						this._sourceSelector = value || "";

						// Wszystkie elementy źródłowe zostaną odświeżone nawet wtedy, gdy nowa wartość właściwości selektora elementów źródłowych będzie taka sama jak stara.
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// Dołącza zachowanie SelectorSourcedBehavior do elementu.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// Element do którego dołączone jest zachowanie. Jeśli dla zachowania nie określono elementu źródłowego, elementem dołączonym staje się element źródłowy zachowania
					/// </param>

					// W przypadku braku parametru selectorSource ten element będzie używany jako element źródłowy.
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
					/// Odłącza zachowanie SelectorSourcedBehavior.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// Element, od którego zostało odłączone zachowanie.
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// Odświeża elementy źródłowe. Odłączany element nadal jest zaliczany do dołączonych elementów.
							// Należy podać bieżącą liczbę dołączonych elementów równą -1.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// Wywoływana, gdy element źródłowy jest usuwany z tego zachowania. Klasy pochodne mogą zastępować tę metodę w celu wykonania określonych zadań.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Element źródłowy.
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// Wywoływana, gdy nowy element źródłowy jest dodawany do tego zachowania. Klasy pochodne mogą zastępować tę metodę w celu wykonania określonych zadań.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Element źródłowy.
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// Zwraca obiekt zawierający informacje związane z elementem źródłowym. Klasy pochodne mogą używać tej metody
					/// do przechowywania informacji o poszczególnych elementach źródłowych.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// Element źródłowy.
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// Zwraca kolekcję elementów źródłowych.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// Zwraca kolekcję elementów docelowych, w odniesieniu do których mają zostać wykonane akcje. Jeśli element źródłowy jest jednym
					/// z dołączonych elementów, jest to jedyny element, w odniesieniu do którego zostaną wykonane akcje. W przeciwnym razie
					/// akcje mają zostać wykonane w odniesieniu do wszystkich dołączonych elementów.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// Element źródłowy.
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

					// Utwórz nowe elementy źródłowe tylko wtedy, gdy istnieje co najmniej jeden dołączony element.
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
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja zachowania TimerBehavior, które nasłuchuje tyknięć zegara i uruchamia akcje.
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// Inicjuje nowe wystąpienie zachowania VS.Behaviors.TimerBehavior, które w odpowiednim czasie uruchamia akcje.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// Łączy zachowanie TimerBehavior z elementem i określa źródło, jeśli nie wybrano ustawienia no_sourceselector
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// Element do którego dołączone jest zachowanie. Jeśli dla zachowania nie określono elementu źródłowego, elementem dołączonym staje się element źródłowy zachowania
					/// </param>

					// Dołącz wszystkie akcje do elementu. Jeśli element docelowy nie został jeszcze ustawiony, zostanie ustawiony w akcjach.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// Odłącza zachowanie TimerBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// Element, od którego zostało odłączone zachowanie.
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
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja zachowania EventTriggerBehavior, które nasłuchuje zdarzenia elementu źródła i uruchamia akcje.
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// Inicjuje nowe wystąpienie zachowania VS.Behaviors.EventTriggerBehavior, które definiuje zdarzenie i uruchamia akcje, gdy to zdarzenie zostanie wyzwolone.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// Dołącza zachowanie EventTriggerBehavior do elementu (zazwyczaj element).
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// Element źródłowy.
					/// </param>

					// Jeśli zdarzenie jest zdarzeniem typu „load”, należy uruchomić je teraz ponieważ zachowania uruchomieniowe są inicjowane w czasie ładowania (a ono zostało już rozpoczęte)
					if (this.event === "load") {
						// Wykonaj symulację argumentów i przekaż je do akcji, które są uruchamiane ręcznie.
						// Procedurę VS.Behaviors.processAll można wywołać wielokrotnie podczas cyklu życia strony.
						// Zamierzamy jednak wykonać akcje „load” jedynie raz. Użyjemy specjalnego znacznika.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// Utwórz nowy odbiornik dla elementu i zapamiętaj go.
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// Dołącz zdarzenie do elementu, jeśli jest dostępna nazwa prawdziwego zdarzenia.
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// Usuwa odbiornik zdarzeń dla usuwanego elementu.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// Element zachowania.
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
						/// Zwraca właściwość event na zachowaniu EventTriggerBehavior
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">Wartość właściwości event.</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// Ustawia wartość właściwości event.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// Wartość właściwości event.
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
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
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
		/// Konkretna implementacja zachowania RequestAnimationFrameBehavior, które nasłuchuje tyknięć zegara i uruchamia akcje.
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// Inicjuje nowe wystąpienie zachowania VS.Behaviors.RequestAnimationFrameBehavior
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// Łączy zachowanie RequestAnimationFrameBehavior z elementem
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Element do którego dołączone jest zachowanie. Jeśli dla zachowania nie określono elementu źródłowego, elementem dołączonym staje się element źródłowy zachowania
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
					/// Odłącza zachowanie RequestAnimationFrameBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// Element, od którego zostało odłączone zachowanie.
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// Wywołaj akcje
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// Wywołaj żądanie requestAnimationFrame przy klatkach na sekundę animacji.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Metadane właściwości (dla analiz JSON)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// Środowisko uruchomieniowe ActionTree dla VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// Akcje już załadowane.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// Ta funkcja przetworzy drzewo ActionTree i atrybut [data-vs-interactivity]
	function loadActionsImpl() {
		/*zaprogramowany plik json actionlist*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// Plik actionList nie jest wymagany, dlatego nie zostanie wygenerowany błąd.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*Domyślny plik JSON listy akcji.*/
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

				// Uwaga: metadane wymagają obecności właściwości name w czasie analizy JSON (animacja nie
				// zostanie utworzona, jeśli nie ma nazwy). W przypadku wystąpienia duplikatów, późniejsza wersja zastępuje wcześniejsze
				// wersje.
				var actionTreeName = actionTree.name;
				// Dodaj każde drzewo actionTree do słownika z taką samą nazwą, jak klucz.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// Plik actionList nie jest wymagany, dlatego nie zostanie wygenerowany błąd.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// Odłącz akcje od elementu.
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// Usuń istniejące akcje.
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// Plik actionList nie jest wymagany, dlatego nie zostanie wygenerowany błąd.
		}

	}

	// Dzięki temu można upewnić się, że zachowania zdefiniowane we fragmentach są inicjowane przed ich załadowaniem.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// Dołączanie zachowań i akcji do do danego elementu
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// Jeśli otrzymamy prawidłowy obiekt zachowań, należy go przeanalizować.
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

	// Odłącz istniejące zachowanie od elementu
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

	// Rzeczywista implementacja process all dla zachowań dotyczy elementów
	// z atrybutem data-vs-interactivity i wywołuje instrukcję create na każdym elemencie.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// Najpierw załaduj akcje, jeśli istnieją.
		loadActions();

		// Przetwarzanie atrybutu [data-vs-interactivity].
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// Wyszukaj elementy z powyższym atrybutem i dołącz do powiązanego zachowania.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// Najpierw odłącz istniejące zachowanie
		detach(element);
		// Następnie dołącz nowe zachowanie
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// Spróbuj załadować nowe akcje. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// Najprawdopodobniej akcje *.json są nieprawidłowe.
			return; 
		}

		// Pobierz kopię elementów do odświeżenia.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// Wyrejestruj bieżące akcje i zarejestruj nowe.
		resetImpl();
		registerActions(actionTreeList);

		// Dołączone zachowania w używanych elementach.
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// Określ elementy członkowskie przestrzeni nazw „VS.Behaviors”
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Stosuje powiązanie deklaratywnych zachowań ze wszystkimi elementami, począwszy od elementu podstawowego.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Element, od którego rozpocznie się przetwarzanie atrybutu data-vs-interactivity
			/// Jeśli parametr ten nie jest określony, powiązanie jest stosowane do całego dokumentu.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Stosuje deklaratywne powiązanie zachowania do elementu.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Element, od którego rozpocznie się przetwarzanie atrybutu data-vs-interactivity
			/// Jeśli parametr ten nie jest określony, powiązanie jest stosowane do całego dokumentu.
			/// </param>

			// Jeśli jest to pierwszy element do przetworzenia, należy załadować akcje.
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// Odłącza akcje od elementów i usuwa wszystkie załadowane akcje.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// Odświeża zachowania w elementach, które zostały przetworzone przez metodę processAll.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// zwraca tablicę behaviorInstances dołączoną do danego elementu.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// Element dla którego pozyskiwane są wystąpienia zachowania.
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">Tablica wystąpień zachowania dołączonego do elementu.</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// ustawia tablicę wystąpienia zachowania dla elementu.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// Element dla którego ustawiane jest wystąpienie zachowania.
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// Bieżące wystąpienie zachowania, które ma zostać dołączone do danego elementu
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// Normalnie metoda processAll jest wykonywana po załadowaniu dokumentu. Jeśli jednak po załadowaniu dokumentu
	// zostanie dodany skrypt (na przykład w wyniku nawigacji WinJS lub gdy doda go
	// inny kod JS), należy odpowiednio wykonać metodę processAll.
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// Środowisko uruchomieniowe ActionTree dla VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// Sprawdź, czy jest obecna przestrzeń nazw WinJS, sprawdzając wszystkie jej fragmenty.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// Wykonaj instrumentację renderowania szablonu WinJS.
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

			// Wykonaj instrumentację przestrzeni nazw WinJS.UI.
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

			// Wykonaj instrumentację przestrzeni nazw WinJS.UI.Fragments.
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

	// Zazwyczaj ten skrypt jest umieszczany po skryptach WinJS. Dlatego „teraz” (now) to dobry czas na wykonanie instrumentacji przestrzeni nazw WinJS.
	instrumentWinJsOnDemand();

	// Brak instrumentacji przestrzeni nazw WinJS oznacza, że ten skrypt został umieszczony przed uruchomieniem przestrzeni nazw WinJS lub że przestrzeń nazw WinJS nie jest dostępna. Spróbujemy
	// wykonać instrumentację przestrzeni nazw WinJS, gdy dokument zostanie załadowany (chyba że ten skrypt został dodany po załadowaniu dokumentu).
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


