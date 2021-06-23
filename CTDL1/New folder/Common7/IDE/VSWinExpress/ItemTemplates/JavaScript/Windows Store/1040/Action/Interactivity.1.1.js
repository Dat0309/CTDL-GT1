/*! © Microsoft. Tutti i diritti sono riservati. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// ordinate.
/// o WinJS.Binding.processAll.

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
			/// Elemento.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// Singleton di spazi dei nomi 
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// della versione meno recente.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			///Tipo non gestito 
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// Spazio dei nomi appena definito.
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
			/// Definisce un nuovo spazio dei nomi con il nome specificato.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// Nome dello spazio dei nomi. Può essere un nome separato da punti per gli spazi dei nomi annidati.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			///Tipo non gestito 
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// Spazio dei nomi appena definito.
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// Specificare i membri dello spazio dei nomi "VS.Namespace"
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// Queste funzioni forniscono la funzionalità WinJS di definizione di una classe e di derivazione da una classe

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// Aggiunge i metadati di proprietà a una classe, se specificata. Include prima i metadati definiti per la classe
		// base, i quali possono essere sottoposti a override dai metadati per questa classe.
		//
		// Metadati di esempio:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// "type" segue le regole per i commenti di JavaScript Intellisense. Deve essere sempre specificato.
		// "elementType" deve essere specificato se "type" è "Array".
		// "required" viene impostato su "false".

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
		/// Definisce una classe utilizzando il costruttore specificato e i membri di istanza specificati.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// Funzione del costruttore utilizzata per creare un'istanza di questa classe.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// Set di campi, proprietà e metodi dell'istanza reso disponibile per la classe.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// Set di campi, proprietà e metodi statici reso disponibile per la classe.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// Metadati che descrivono le proprietà della classe. Questi metadati vengono utilizzati per convalidare i dati JSON. Pertanto,
		/// sono utili solo per i tipi che possono essere presenti in JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// Classe appena definita.
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
		/// Crea una sottoclasse basata sul parametro baseClass fornito utilizzando l'ereditarietà prototipale.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// Classe da cui ereditare.
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// Funzione del costruttore utilizzata per creare un'istanza di questa classe.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// Set di campi, proprietà e metodi dell'istanza da rendere disponibile per la classe.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// Set di campi, proprietà e metodi statici da rendere disponibile per la classe.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// Metadati che descrivono le proprietà della classe. Questi metadati vengono utilizzati per convalidare i dati JSON. Pertanto,
		/// sono utili solo per i tipi che possono essere presenti in JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// Classe appena definita.
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
		/// Definisce una classe utilizzando il costruttore specificato e l'unione del set di membri di istanza
		/// specificati da tutti gli oggetti mixin. L'elenco di parametri mixin è a lunghezza variabile.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// Funzione del costruttore utilizzata per creare un'istanza di questa classe.
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// Classe appena definita.
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// Specificare i membri dello spazio dei nomi "VS.Class"
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
			/// Recupera la stringa di risorsa che contiene l'ID risorsa specificato.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// ID risorsa della stringa da recuperare.
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// Oggetto che può contenere le proprietà seguenti:
			/// 
			/// value:
			/// Valore della stringa richiesta. Questa proprietà è sempre presente.
			/// 
			/// empty:
			/// Valore che specifica se la stringa richiesta non è stata trovata.
			/// Se è true, la stringa non è stata trovata. Se è false o non definito,
			/// la stringa richiesta è stata trovata.
			/// 
			/// lang:
			/// Lingua della stringa, se specificata. Questa proprietà è presente solo
			/// per le risorse multilingue.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "Proprietà \"{0}\" non prevista per {1}.",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: tipo trovato: {2}; tipo previsto: {3}.",
				"VS.Util.JsonPropertyMissing": "Proprietà richiesta \"{0}.{1}\" mancante o non valida.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: tipo trovato: {3}; tipo previsto: {4}.",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] mancante o non valido.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: tipo trovato: {2}; tipo previsto: stringa (scelta di: {3}).",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: valore non valido. Trovato: {2}; previsto uno di: {3}.",
				"VS.Util.NoMetadataForType": "Metadati di proprietà non trovati per il tipo {0}.",
				"VS.Util.NoTypeMetadataForProperty": "Metadati di tipo non specificati per {0}.{1}.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "Metadati di tipo di elemento non specificati per {0}.{1}[].",
				"VS.Resources.MalformedFormatStringInput": "Non valido. Uscire da '{0}'?",
				"VS.Actions.ActionNotImplemented": "L'azione personalizzata non implementa il metodo execute.",
				"VS.ActionTrees.JsonNotArray": "I dati JSON ActionTrees devono essere una matrice ({0}).",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "Nome albero delle azioni duplicato \"{0}\" ({1}).",
				"VS.Animations.InvalidRemove": "Non chiamare remove su un'istanza di animazione contenuta in un gruppo.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// Formatta una stringa sostituendo i token nel formato {n} con i parametri specificati. Ad esempio,
			/// 'VS.Resources.formatString("Ho {0} dita.", 10)' restituisce "Ho 10 dita".
			/// </summary>
			/// <param name="string">
			/// Stringa da formattare.
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
			return "non definito";
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// Esempio: formatMessage(["state: '{0}', id: {1}", "ON", 23]) restituirà "state: 'ON', id: 23"
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
				/// Contrassegna una funzione come compatibile con l'elaborazione dichiarativa, ad esempio WinJS.UI.processAll
				/// o WinJS.Binding.processAll.
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// Funzione da contrassegnare come compatibile con l'elaborazione dichiarativa.
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// Funzione di input.
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
			/// Ottiene il valore dei dati associato all'elemento specificato.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// Elemento.
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// Valore associato all'elemento.
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// restituisce il contenuto di stringa del file il cui percorso è specificato nell'argomento.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// Percorso del file
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// Contenuto di stringa del file.
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// L'oggetto XMLHttpRequest di IE non consentirà l'accesso al file system locale. Utilizzare pertanto il controllo ActiveX
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
			/// Analizza configBlock e se viene passata un'istanza valida i valori analizzati 
			/// vengono impostati come proprietà nell'istanza.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// Struttura configBlock (JSON).
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// Istanza le cui proprietà vengono impostate in base a configBlock.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Istanza creata in base al blocco di configurazione.
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
			/// Si tratta di una funzione che verrà chiamata per ogni chiave e valore a ogni livello del risultato finale durante il metodo JSON.Parse mentre è in corso l'analisi della struttura di dati JSON. 
			/// Ogni valore verrà sostituito dal risultato della funzione reviver. Può essere utilizzato per riformare oggetti generici in istanze di pseudoclassi.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// Chiave corrente analizzata dal parser JSON.
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// Valore corrente della chiave analizzata dal parser JSON.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Pseudoclasse effettiva che rappresenta il valore della chiave.
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// Verificare se il tipo non è null ed è una funzione (costruttore)
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Restituisce un errore alla console utilizzando la risorsa stringa specificata e un
			/// elenco di sostituzioni a lunghezza variabile.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Identificatore di errore univoco. Il formato deve essere "[namespace].[identifier]". Il messaggio
			/// di errore visualizzato include questo identificatore e la stringa restituita cercandola nella
			/// tabella di risorse di stringa, se tale stringa esiste.
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
			/// Restituisce un avviso alla console utilizzando la risorsa stringa specificata e un
			/// elenco di sostituzioni a lunghezza variabile.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Identificatore di errore univoco. Il formato deve essere "[namespace].[identifier]". Il messaggio
			/// di errore visualizzato include questo identificatore e la stringa restituita cercandola nella
			/// tabella di risorse di stringa, se tale stringa esiste.
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
			/// Restituisce un avviso alla console utilizzando la risorsa stringa specificata e un
			/// elenco di sostituzioni a lunghezza variabile che segue la formattazione stringhe .NET, ad esempio
			/// outputDebugMessage("state: '{0}', id: {1}", "ON", 23) eseguirà la traccia di "state: 'ON', id: 23".
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
		/// Abilita o disabilita la traccia delle azioni. Operazione a fini diagnostici.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// Traccia le informazioni delle azioni. Gli argomenti seguono la notazione di formattazione stringhe .NET. Ad esempio
			/// VS.Util.trace("Action: '{0}', id: {1}", "set", 23) eseguirà la traccia di "Action: 'set', id: 23".
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// Funzione di supporto per convertire un oggetto JavaScript generico in un tipo specificato. Convalida le proprietà se
		// il tipo fornisce i metadati.

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

		// Verificare di disporre di tutte le proprietà richieste
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
				// Se il tipo corrisponde, impostarlo
				object[propertyName] = validatedValue;
			}
		} else {
			// Non sono presenti metadati (nel qual caso viene visualizzato un errore),
			// sono presenti metadati ma non definiscono questa proprietà (nel qual caso verranno gestiti come
			// proprietà imprevista) o i metadati della proprietà non ne definiscono il tipo (nel qual caso
			// i metadati verranno considerati non validi). Visualizzare gli errori appropriati per gli ultimi due scenari.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// In ogni caso, la proprietà viene impostata su qualsiasi valore disponibile.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// Verifica se il valore di una proprietà è del tipo richiesto. In caso contrario, lo converte, se possibile. Restituisce null se non è
		// possibile eseguire la conversione.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// Forzare l'impostazione dell'elemento su un tipo, se possibile
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// In caso contrario, verificare se il tipo contiene un convertitore
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
			// Supporre che il tipo richiesto sia un'enumerazione

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "stringa")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("Tipo non gestito " + requiredPropertyType + " durante la convalida rispetto ai metadati");
		}
	}

	function getObjectTypeDescription(object) {
		// Funzione di supporto per visualizzare la descrizione di un tipo dalla relativa funzione del costruttore (richiede che la
		// funzione del costruttore sia denominata), utilizzata per i messaggi di errore.

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// Per motivi di leggibilità, se il nome della funzione del costruttore termina con '_ctor', rimuovere tale nome.
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
		/// Classe base per tutte le azioni eseguite dal runtime di VS Actions.
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// Inizializza una nuova istanza di VS.Actions.ActionBase che definisce un'azione.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// Ottiene o imposta la proprietà di destinazione per AddClassAction.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// Se targetSelector non è presente, eseguire il round trip di targetElements, in caso contrario querySelectorAll(targetSelector).
					/// Le azioni personalizzate possono utilizzare questo metodo per modificare l'elenco degli elementi di destinazione a cui applicare l'azione.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Raccolta di elementi su cui deve essere eseguita questa azione. La raccolta è costruita
					/// dall'oggetto Behavior del proprietario. Tiene in considerazione i dettagli di Behavior quali gli elementi collegati e
					/// il selettore origine. NON tiene in considerazione i dettagli specifici dell'azione quale il selettore destinazione dell'azione.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// Esegue l'azione per tutti gli elementi di destinazione.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Raccolta di elementi su cui deve essere eseguita questa azione. La raccolta è costruita
					/// dall'oggetto Behavior del proprietario. Tiene in considerazione i dettagli di Behavior quali gli elementi collegati e
					/// il selettore origine. NON tiene in considerazione i dettagli specifici dell'azione quale il selettore destinazione dell'azione.
					/// Il metodo ExecuteAll riconcilierà gli elementi di destinazione di Behavior con le relative destinazioni ed eseguirà
					/// l'azione sulle destinazioni riconciliate.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Le informazioni facoltative fornite da Behaviors. Vengono utilizzate ad esempio da EventTriggerBehavior per passare l'evento.
					/// </param>

					try {
						// Ottenere l'elenco effettivo degli elementi di destinazione che potrebbe essere differente dall'elenco in ingresso.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// Esegue l'azione per un elemento. Le azioni derivate devono ignorare l'operazione. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Le informazioni facoltative fornite da Behaviors. Vengono utilizzate ad esempio da EventTriggerBehavior per passare l'evento.
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
		/// Implementazione concreta di RemoveElementsAction, che rimuove tutti gli elementi a cui fa riferimento la proprietà del selettore elementsToRemove
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.RemoveElementsAction che definisce RemoveElementsAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// Ottiene o imposta la proprietà elementsToRemove per RemoveElementsAction.
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
					/// Rimuove l'elemento da DOM.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di RemoveChildrenAction, che rimuove tutti gli elementi figlio degli elementi a cui fa riferimento la proprietà del selettore parentElement
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.RemoveChildrenAction che definisce RemoveChildrenAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// Ottiene o imposta la proprietà parentElement per RemoveChildrenAction.
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
					/// Rimuove tutti gli elementi figlio da un elemento
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di ToggleClassAction, che attiva/disattiva l'attributo di classe dell'elemento specifico per la proprietà dell'elemento.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.ToggleClassAction che definisce ToggleClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// Ottiene o imposta la proprietà className per ToggleClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// Esegue l'azione quando viene attivato l'albero delle azioni.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// Se la classe non viene trovata, aggiungerla
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// In caso contrario, rimuovere la classe.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di AddClassAction, che modifica l'attributo di classe dell'elemento specifico per la proprietà dell'elemento.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.AddClassAction che definisce AddClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// Ottiene o imposta la proprietà className per AddClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// Esegue l'azione quando viene attivato l'albero delle azioni.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
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
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di RemoveClassAction, che modifica l'attributo di classe dell'elemento specifico per la proprietà dell'elemento.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.RemoveClassAction che definisce RemoveClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// Ottiene o imposta la proprietà className per RemoveClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// Rimuove il nome di classe dai nomi di classe dell'elemento.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// Se non viene restituito un attributo di classe
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// Questo elemento contiene la classe richiesta, pertanto non aggiungerlo alla raccolta newClasses
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* Aggiungere il contenuto della matrice utilizzando lo spazio come separatore */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di SetHTMLAttributeAction, che imposta l'attributo sul valore di attributo negli elementi a cui fa riferimento la proprietà targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.SetHTMLAttributeAction che definisce SetHTMLAttributeAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// Ottiene o imposta la proprietà di attributo per SetHTMLAttributeAction.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// Ottiene o imposta la proprietà attributeValue per SetHTMLAttributeAction.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// Imposta il valore dell'attributo HTML.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di SetStyleAction, che imposta styleProperty su styleValue negli elementi a cui fa riferimento la proprietà targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.SetStyleAction che definisce SetStyleAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// Ottiene o imposta la proprietà styleProperty per SetStyleAction.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// Ottiene o imposta la proprietà styleValue per SetStyleAction.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// Imposta il valore della proprietà CSS inline.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di LoadPageAction, che carica la pagina e la aggiunge all'elemento a cui punta la proprietà targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// Inizializza una nuova istanza di VS.Actions.LoadPageAction che definisce LoadPageAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// Ottiene o imposta la proprietà di pagina per LoadPageAction.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// Elenco di azioni da generare quando viene caricata la pagina.
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// Carica il contenuto di una pagina in un elemento.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// Elemento su cui deve essere eseguita questa azione.
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// Chiamare WinJS.UI.processAll per elaborare i comportamenti per la pagina appena caricata.
								WinJS.UI.processAll(originalElement);

								// Chiamare execute per ogni azione nella matrice e passare una matrice vuota di elementi di destinazione.
								// Se le azioni non specificano targetSelector, non verrà eseguita alcuna azione. In caso contrario,
								// le azioni verranno eseguite sugli elementi targetSelector.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// Risolvere l'errore
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Classe di base per tutti i comportamenti.
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// Inizializza una nuova istanza di VS.Behaviors.BehaviorBase che definisce un comportamento.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// Costruire le proprietà dell'oggetto in base al blocco di configurazione.
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// Collegamento del comportamento.
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
				// Mapping degli elementi collegati a element.uniqueID come chiavi.
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// Estrarre gli elementi dal mapping
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
				/// Elenco di azioni da generare quando viene attivato l'evento
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// Collega l'azione all'elemento (in genere l'origine)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// Elemento a cui è collegato il comportamento.
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
					/// Scollega il comportamento
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// L'elemento da cui scollegare il comportamento.
					/// </param>
					if (element) {
						// Rimuovere l'elemento da VS.Behaviors._behaviorInstances
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
					/// Chiamata eseguita quando un elemento è collegato a un comportamento. Questo metodo NON verrà chiamato
					/// se un elemento è già collegato a questo comportamento. Le classi derivate eseguiranno
					/// l'override del metodo per eseguire specifiche attività di collegamento.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// L'elemento che è stato collegato.
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// Chiamata eseguita prima che l'elemento viene scollegato da un comportamento. Questo metodo NON verrà chiamato
					/// se un elemento è già stato scollegato. Le classi derivate eseguiranno l'override del metodo per eseguire
					/// specifiche attività di scollegamento.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// L'elemento che sta per essere scollegato.
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// Esegue l'azione per tutti gli elementi di destinazione.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// Raccolta di elementi su cui devono essere eseguite le azioni.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Informazioni facoltative fornite da Behavior. Vengono utilizzate ad esempio da EventTriggerBehavior per passare l'evento.
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
		/// Classe di base per tutti i comportamenti con i selettori.
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// Inizializzare le origini prima della chiamata al costruttore della classe base.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// Elementi definiti da sourceSelector.
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// Restituisce la proprietà sourceSelector in SelectorSourcedBehaviorBase
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">Valore della proprietà sourceSelector.</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// Imposta il valore della proprietà sourceSelector. Verranno trovati tutti gli elementi con la proprietà sourceSelector specificata e verrà applicato il comportamento a tali elementi.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// Valore della proprietà sourceSelector.
						/// </param>
						this._sourceSelector = value || "";

						// Anche se il valore del nuovo selettore origine è uguale al valore del selettore precedente verranno aggiornate tutte le risorse
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// Collega SelectorSourcedBehavior all'elemento
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// Elemento a cui è collegato il comportamento. Se per il comportamento non è stata specificata un'origine, l'elemento collegato è l'origine del comportamento
					/// </param>

					// Se selectorSource non è presente è necessario utilizzare questo elemento come origine.
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
					/// Scollega SelectorSourcedBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// Elemento da cui viene scollegato il comportamento.
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// Aggiornare le origini. L'elemento che sta per essere scollegato continua a contare gli elementi collegati.
							// È necessario fornire il conteggio corrente degli elementi collegati - 1.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// Chiamata eseguita quando un'origine viene rimossa da questo comportamento. Le classi derivate possono eseguire l'override del metodo per eseguire specifiche attività.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Elemento di origine.
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// Chiamata eseguita quando un nuovo elemento di origine viene aggiunto a questo comportamento. Le classi derivate possono eseguire l'override del metodo per eseguire specifiche attività.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Elemento di origine.
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// Restituisce un oggetto contenente le informazioni correlate all'elemento di origine. Le classi derivate possono utilizzare l'oggetto per
					/// archiviare le informazioni dell'elemento di origine.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// Elemento di origine.
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// Restituisce la raccolta degli elementi di origine.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// Restituisce la raccolta degli elementi di destinazione su cui attivare l'azione. Se l'elemento di origine è uno degli
					/// elementi collegati, tale sarà l'unico elemento su cui verrà attivata l'azione. In caso contrario, le azioni
					/// devono essere attivate su tutti gli elementi collegati.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// Elemento di origine.
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

					// Creare nuove origini solo se è presente almeno un elemento collegato
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
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di TimerBehavior, che ascolta i cicli del timer e genera le azioni se specificate.
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// Inizializza una nuova istanza di VS.Behaviors.TimerBehavior e genera le azioni quando vengono eseguiti i cicli del timer.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// Collega TimerBehavior all'elemento e imposta l'origine se non è stato impostato _sourceselector
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// Elemento a cui è collegato il comportamento. Se per il comportamento non è stata specificata un'origine, l'elemento collegato è l'origine del comportamento
					/// </param>

					// Collegare tutte le azioni all'elemento in modo da impostare la destinazione sulle azioni, se non è già impostata.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// Scollega TimerBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// Elemento da cui viene scollegato il comportamento.
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
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di EventTriggerBehavior, che ascolta un evento nell'elemento di origine e genera le azioni se specificate.
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// Inizializza una nuova istanza di VS.Behaviors.EventTriggerBehavior che definisce un evento e genera le azioni quando viene attivato l'evento.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// collega EventTriggerBehavior all'elemento (in genere l'elemento)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// Elemento di origine.
					/// </param>

					// Se l'evento è "load", generarlo ora perché il runtime dei comportamenti verrà inizializzato al caricamento (il quale è già stato generato)
					if (this.event === "load") {
						// Simulare gli argomenti e passarli all'azione quando viene generata manualmente.
						// VS.Behaviors.processAll può essere chiamato più volte durante il ciclo di vita della pagina.
						// Si desidera escludere le azioni "load" solo una volta. Verrà utilizzato un marcatore speciale.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// Creare un nuovo listener per un elemento e memorizzarlo
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// Collegare l'evento a un elemento se è disponibile un nome di evento reale
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// Rimuove il listener di eventi per l'elemento rimosso.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// L'elemento del comportamento.
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
						/// Restituisce la proprietà di evento in EventTriggerBehavior
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">Valore della proprietà di evento.</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// Imposta il valore della proprietà di evento.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// Valore della proprietà di evento.
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
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
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
		/// Implementazione concreta di RequestAnimationFrameBehavior, che ascolta i cicli del timer e genera le azioni se specificate.
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// Inizializza una nuova istanza di VS.Behaviors.RequestAnimationFrameBehavior
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// Collega RequestAnimationFrameBehavior all'elemento
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Elemento a cui è collegato il comportamento. Se per il comportamento non è stata specificata un'origine, l'elemento collegato è l'origine del comportamento
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
					/// Scollega RequestAnimationFrameBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// Elemento da cui viene scollegato il comportamento.
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// Chiamare le azioni
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// Chiamare requestAnimationFrame nel frame di animazione al secondo.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati di proprietà (per l'analisi JSON)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// Runtime di ActionTree per VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// Le azioni già caricate.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// Questa funzione elaborerà ActionTree e l'attributo [data-vs-interactivity]
	function loadActionsImpl() {
		/*file json nell'elenco azioni hardcoded*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// Non è necessario che il file actionList sia presente. Pertanto non verrà generato alcun errore.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*file json nell'elenco azioni predefinito*/
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

				// Notare che i metadati applicano la proprietà del nome durante l'analisi JSON (non verranno create animazioni
				// se non contengono un nome). In caso di duplicati, la versione più recente esegue l'override
				// della versione meno recente.
				var actionTreeName = actionTree.name;
				// Aggiungere ogni elemento actionTree al dizionario con il nome come chiave.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// Non è necessario che il file actionList sia presente. Pertanto non verrà generato alcun errore.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// Scollegare le azioni dagli elementi
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// Eliminare le azioni esistenti
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// Non è necessario che il file actionList sia presente. Pertanto non verrà generato alcun errore.
		}

	}

	// Verifica che i comportamenti definiti all'interno dei frammenti vengano inizializzati prima del caricamento del frammento.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// Azioni e comportamenti di collegamento per l'elemento specificato
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// Se si ottiene un oggetto comportamenti valido, analizzarlo.
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

	// Scollegare il comportamento esistente dall'elemento
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

	// L'elaborazione dell'implementazione di tutti i comportamenti utilizza gli elementi
	// con attributo data-vs-interactivity e chiama create per ogni elemento.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// Caricare prima le azioni, se presenti
		loadActions();

		// Elaborare l'attributo [data-vs-interactivity].
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// Trovare gli elementi con l'attributo sopra indicato e collegare il comportamento associato.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// Scollegare prima il comportamento esistente
		detach(element);
		// Collegare ora il nuovo comportamento
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// Provare a caricare le nuove azioni. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// Probabilmente le azioni *.json non sono valide.
			return; 
		}

		// Ottenere una copia degli elementi da aggiornare.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// Annullare la registrazione delle azioni correnti e registrare le azioni nuove.
		resetImpl();
		registerActions(actionTreeList);

		// I comportamenti collegati agli elementi interessati.
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// Specificare i membri dello spazio dei nomi "VS.Behaviors"
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Applica l'associazione dichiarativa del comportamento a tutti gli elementi, a partire dall'elemento radice specificato.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Elemento da cui iniziare l'elaborazione dell'attributo data-vs-interactivity
			/// Se questo parametro non viene specificato, l'associazione viene applicata all'intero documento.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Applica l'associazione dichiarativa del comportamento a un elemento.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Elemento da cui iniziare l'elaborazione dell'attributo data-vs-interactivity
			/// Se questo parametro non viene specificato, l'associazione viene applicata all'intero documento.
			/// </param>

			// Se è il primo elemento da elaborare, è necessario caricare le azioni
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// Scollega le azioni dagli elementi e rimuove tutte le azioni caricate.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// Aggiorna i comportamenti sugli elementi elaborati da processAll.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// restituisce una matrice di behaviorInstances collegata all'elemento specificato.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// Elemento per cui vengono ottenute le istanze di comportamento.
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">Matrice delle istanze di comportamento collegate all'elemento.</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// imposta la matrice dell'istanza di comportamento sull'elemento.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// Elemento per cui viene impostata l'istanza di comportamento.
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// Istanza di comportamento corrente da aggiungere per l'elemento specificato
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// Normalmente processAll viene eseguito una volta caricato il documento. Tuttavia se si aggiunge questo script
	// dopo aver caricato il documento (ad esempio come risultato di una navigazione WinJS o altro
	// JS aggiunto) è necessario eseguire processAll immediatamente.
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// Runtime di ActionTree per VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// Controllare se WinJs è presente verificandone tutte le parti.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// Instrumentare il rendering del modello WinJS.
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

			// Instrument WinJS.UI.
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

			// Instrument WinJS.UI.Fragments.
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

	// Di solito questo script si trova dopo gli script WinJS. Pertanto a questo punto è opportuno instrumentare WinJS.
	instrumentWinJsOnDemand();

	// Se WinJS non viene instrumentato, lo script sta prima di WinJS o non c'è alcun WinJS. Si prova
	// a instrumentare WinJS quando il documento viene caricato (a meno che non venga aggiunto questo script dopo aver caricato il documento).
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


