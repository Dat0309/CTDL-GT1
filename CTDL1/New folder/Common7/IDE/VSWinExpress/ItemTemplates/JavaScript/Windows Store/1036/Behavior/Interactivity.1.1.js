/*! © Microsoft. Tous droits réservés.*/
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// Ces fonctions fournissent la fonctionnalité WinJS de définition de l'espace de noms.
/// Ajoute également VS à l'espace de noms global.

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
			/// Définit un nouvel espace de noms avec le nom spécifié sous l'espace de noms parent spécifié.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// Espace de noms parent.
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// Nom du nouvel espace de noms.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// Membres du nouvel espace de noms.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// Espace de noms nouvellement défini.
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
			/// Définit un nouvel espace de noms avec le nom spécifié.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// Nom de l'espace de noms. Il peut s'agir d'un nom séparé par un point pour les espaces de noms imbriqués.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// Membres du nouvel espace de noms.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// Espace de noms nouvellement défini.
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// Établit les membres de l'espace de noms « VS.Namespace »
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// Ces fonctions fournissent la fonctionnalité WinJS de définition d'une classe et de dérivation d'une classe

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// Ajoute les métadonnées de propriétés à une classe (si elles ont été spécifiées). Inclut d'abord les métadonnées définies par la
		// classe de base (qui peuvent être remplacées par les métadonnées de cette classe).
		//
		// Exemple de métadonnées :
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// « type » suit les règles des commentaires Intellisense JavaScript. Ceci devrait toujours être spécifié.
		// « elementType » doit être spécifié si le « type » est « Array ».
		// La valeur par défaut « requise » est « false ».

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
		/// Définit une classe à l'aide du constructeur donné et des membres d'instance spécifiés.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// Fonction constructeur utilisée pour instancier cette classe.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// Ensemble de champs, de propriétés et de méthodes d'instance mis à disposition sur la classe.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// Ensemble de champs, de propriétés et de méthodes statiques mis à disposition sur la classe.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// Métadonnées décrivant les propriétés de la classe. Ces métadonnées sont utilisées pour valider les données JSON et ne sont donc
		/// utiles que pour les types qui peuvent apparaître au format JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// Classe nouvellement définie.
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
		/// Crée une sous-classe basée sur le paramètre baseClass fourni, à l'aide de l'héritage prototypique.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// Classe de laquelle hériter.
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// Fonction constructeur utilisée pour instancier cette classe.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// Ensemble de champs, de propriétés et de méthodes d'instance à mettre à disposition sur la classe.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// Ensemble de champs, de propriétés et de méthodes d'instance statiques à mettre à disposition sur la classe.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// Métadonnées décrivant les propriétés de la classe. Ces métadonnées sont utilisées pour valider les données JSON et ne sont donc
		/// utiles que pour les types qui peuvent apparaître au format JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// Classe nouvellement définie.
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
		/// Définit une classe à l'aide du constructeur donné et de l'union d'un ensemble de membres d'instance
		/// spécifié par tous les objets mixin. La liste de paramètres mixin est de longueur variable.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// Fonction constructeur utilisée pour instancier cette classe.
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// Classe nouvellement définie.
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// Établit les membres de l'espace de noms « VS.Class »
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
			/// Extrait la chaîne de ressource qui possède l'ID de ressource spécifié.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// ID de ressource de la chaîne à extraire.
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// Objet qui peut contenir ces propriétés :
			/// 
			/// valeur :
			/// Valeur de la chaîne demandée. Cette propriété est toujours présente.
			/// 
			/// vide :
			/// Valeur qui spécifie si la chaîne demandée est introuvable.
			/// Si la valeur est True, la chaîne est introuvable. Si la valeur est false ou non définie,
			/// la chaîne demandée est introuvable.
			/// 
			/// langue :
			/// Langue de la chaîne, si spécifiée. Cette propriété est uniquement présente
			/// pour les ressources multilingues.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "La propriété \« {0}\ » n'est pas attendue pour {1}.",
				"VS.Util.JsonTypeMismatch": "{0}.{1} : type trouvé : {2} ; type attendu : {3}.",
				"VS.Util.JsonPropertyMissing": "La propriété requise \« {0}.{1}\ » est manquante ou non valide.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}] : type trouvé : {3} ; type attendu : {4}.",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] est manquant ou non valide.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1} : type trouvé : {2} ; type attendu : chaîne (choix de : {3}).",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1} : valeur non valide. Trouvée : {2} ; l'une des valeurs suivantes est attendue : {3}.",
				"VS.Util.NoMetadataForType": "Aucune métadonnée de propriété trouvée pour le type {0}.",
				"VS.Util.NoTypeMetadataForProperty": "Aucune métadonnée de type spécifiée pour {0}.{1}.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "Aucune métadonnée de type d'élément spécifiée pour {0}.{1}[].",
				"VS.Resources.MalformedFormatStringInput": "Incorrect, vouliez-vous quitter votre '{0}' ?",
				"VS.Actions.ActionNotImplemented": "L'action personnalisée n'implémente pas la méthode execute.",
				"VS.ActionTrees.JsonNotArray": "Les données JSON des arborescences d'actions doivent être un tableau ({0}).",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "Nom de l'arborescence d'actions en doublon \« {0}\ » ({1}).",
				"VS.Animations.InvalidRemove": "N'appelle pas la suppression d'une instance d'animation contenue dans un groupe.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// Met en forme une chaîne en remplaçant les jetons sous la forme {n} avec les paramètres spécifiés. Par exemple,
			/// 'VS.Resources.formatString(« J'ai {0} doigts. », 10)' retourne « J'ai 10 doigts ».
			/// </summary>
			/// <param name="string">
			/// Chaîne à mettre en forme.
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
			return "non défini";
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// Exemple : formatMessage(["state: '{0}', id: {1}", "ON", 23]) renvoie "state: 'ON', id: 23"
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
				/// Marque une fonction comme étant compatible avec le traitement déclaratif, comme WinJS.UI.processAll
				/// ou WinJS.Binding.processAll.
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// Fonction à marquer comme compatible avec le traitement déclaratif.
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// Fonction d'entrée.
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
			/// Obtient la valeur de données associée à l'élément spécifié.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// Élément.
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// Valeur associée à l'élément.
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// retourne le contenu de la chaîne du fichier dont le chemin d'accès est spécifié dans l'argument.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// Chemin d'accès au fichier
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// Contenu de la chaîne du fichier.
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// L'objet XMLHttpRequest d'IE ne donnera pas accès au système de fichiers local, utilisez donc le contrôle ActiveX à la place
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
			/// Analyse le configBlock et si une instance valide est passée, les valeurs analysées 
			/// sont définies comme propriétés sur l'instance.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// Structure configBlock (JSON).
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// Instance dont les propriétés sont définies en fonction du configBlock.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Instance créée en fonction du config block.
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
			/// Fonction qui sera appelée pour chaque clé et valeur à chaque niveau du résultat final de la méthode JSON.Parse lors de l'analyse de la structure de données JSON. 
			/// Chaque valeur sera remplacée par le résultat de la fonction reviver. Ceci peut être utilisé pour reconstituer les objets génériques en instances de pseudo-classes.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// Clé actuelle en cours d'analyse par l'analyseur JSON.
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// Valeur actuelle de la clé en cours d'analyse par l'analyseur JSON.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Pseudo-classe réelle qui représente la valeur de la clé.
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// Vérifie si le type n'est pas null et qu'il s'agit d'une fonction (constructeur)
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Affiche une erreur (sur la console) à l'aide de la ressource chaîne spécifiée et d'un
			/// liste de longueur variable de substitutions.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Identificateur d'erreur unique. Doit être sous la forme « [namespace].[identifier] ». Le message
			/// d'erreur affiché comprend cet identificateur et la chaîne retournée en regardant dans
			/// la table de ressources de chaînes (si elle existe).
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
			/// Affiche un avertissement (sur la console) à l'aide de la ressource chaîne spécifiée et d'un
			/// liste de longueur variable de substitutions.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Identificateur d'erreur unique. Doit être sous la forme « [namespace].[identifier] ». Le message
			/// d'erreur affiché comprend cet identificateur et la chaîne retournée en regardant dans
			/// la table de ressources de chaînes (si elle existe).
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
			/// Affiche un avertissement (sur la console) à l'aide de la ressource chaîne spécifiée et d'un
			/// liste de longueur variable de substitutions suivant la mise en forme des chaînes .NET, par exemple
			/// outputDebugMessage("state: '{0}', id: {1}", "ON", 23) effectue le suivi de "state: 'ON', id: 23".
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
		/// Active ou désactive le suivi des actions à des fins de diagnostic.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// Effectue le suivi des informations sur les actions. Les arguments suivent la notation de mise en forme des chaînes .NET. Par exemple
			/// VS.Util.trace("Action: '{0}', id: {1}", "set", 23) effectue le suivi de "Action: 'set', id: 23".
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// Fonction d'assistance pour convertir un objet JavaScript générique en type spécifié. Valide les propriétés si
		// le type fournit les métadonnées.

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

		// Vérifiez que nous avons toutes les propriétés requises
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
				// Le type correspond, il suffit donc de le définir
				object[propertyName] = validatedValue;
			}
		} else {
			// Nous n'avons pas les métadonnées du tout (dans ce cas, nous avons déjà affiché une erreur,
			// ou nous les avons, mais elles ne définissent pas cette propriété (dans ce cas, nous la considérons comme une
			// propriété inattendue) ou les métadonnées de la propriété ne définissent pas son type (dans ce cas,
			// nous considérons que le format des métadonnées est incorrect.) Affiche les erreurs appropriées des deux derniers scénarios.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// Dans tous les cas, nous définissons la propriété sur la valeur que nous avons.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// Valide que la valeur de la propriété est du type demandé. Si ce n'est pas le cas, la convertit si possible. Retourne null, si
		// la conversion n'est pas possible.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// Force les valeurs sur le type, si possible
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// Sinon, voyez si le type possède un convertisseur
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
			// Supposez que le type demandé est une énumération

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "chaîne")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("Pas de gestion de type " + requiredPropertyType + " lors de la validation par rapport aux métadonnées");
		}
	}

	function getObjectTypeDescription(object) {
		// Fonction d'assistance pour afficher une description de type convivial de la fonction constructeur (requiert un
		// nom pour la fonction constructeur) : utilisée pour les messages d'erreur.

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// Pour faciliter la lecture, si le nom de la fonction constructeur se termine par « _ctor », supprimez cette terminaison.
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
		/// Classe de base pour toutes les actions réalisées par l'exécution de VS Actions.
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// Initialise une nouvelle instance de VS.Actions.ActionBase qui définit une action.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// Obtient ou définit la propriété cible pour AddClassAction.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// S'il n'y a pas de targetSelector, alors aller-retour targetElements, sinon querySelectorAll(targetSelector).
					/// Les actions personnalisées peuvent utiliser cette méthode pour modifier la liste des éléments cibles sur lesquels appliquer l'action.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Collection d'éléments sur lesquels cette action doit être exécutée. Cette collection est construite
					/// par l'objet Behavior propriétaire. Elle prend en compte des détails sur Behavior tels que les éléments joints et
					/// le sélecteur source. Elle ne prend PAS en compte les détails spécifiques à l'action tels que le sélecteur cible de l'action.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// Exécute l'action pour tous les éléments cibles.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Collection d'éléments sur lesquels cette action doit être exécutée. Cette collection est construite
					/// par l'objet Behavior propriétaire. Elle prend en compte des détails sur Behavior tels que les éléments joints et
					/// le sélecteur source. Elle ne prend PAS en compte les détails spécifiques à l'action tels que le sélecteur cible de l'action.
					/// La méthode ExecuteAll rapproche les éléments cibles de Behavior avec ses propres cibles et elle exécute
					/// l'action sur les cibles rapprochées.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Informations facultatives fournies par les Behaviors. Par exemple, EventTriggerBehavior les utilise pour passer un événement.
					/// </param>

					try {
						// Obtenir la liste réelle d'éléments cibles qui peut différer de la liste entrante.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// Exécute l'action pour un élément. Les actions dérivées doivent substituer cette méthode. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Informations facultatives fournies par les Behaviors. Par exemple, EventTriggerBehavior les utilise pour passer un événement.
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
		/// Implémentation concrète de RemoveElementsAction, qui supprime tous les éléments référencés par la propriété du sélecteur elementsToRemove
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.RemoveElementsAction qui définit RemoveElementsAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// Obtient ou définit la propriété elementsToRemove de RemoveElementsAction.
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
					/// Supprime l'élément du modèle DOM.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de RemoveChildrenAction, qui supprime tous les enfants des éléments référencés par la propriété du sélecteur parentElement
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.RemoveChildrenAction qui définit RemoveChildrenAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// Obtient ou définit la propriété parentElement de RemoveChildrenAction.
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
					/// Supprime tous les enfants d'un élément
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de ToggleClassAction, qui active/désactive l'attribut de classe de l'élément spécifique à la propriété de l'élément.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.ToggleClassAction qui définit ToggleClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// Obtient ou définit la propriété className pour ToggleClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// Exécute l'action lorsque l'arborescence d'actions a la valeur Triggered.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// Si la classe est introuvable, ajoutez-la
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// Sinon, supprimez la classe.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de AddClassAction, qui modifie l'attribut de classe de l'élément spécifique à la propriété de l'élément.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.AddClassAction qui définit AddClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// Obtient ou définit la propriété className pour AddClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// Exécute l'action lorsque l'arborescence d'actions a la valeur Triggered.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
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
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de RemoveClassAction, qui modifie l'attribut de classe de l'élément spécifique à la propriété de l'élément.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.RemoveClassAction qui définit RemoveClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// Obtient ou définit la propriété className pour RemoveClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// Supprime le nom de la classe des noms de classes de l'élément.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// Si aucun attribut de classe n'est retourné
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// Cet élément a la classe demandée, ne l'ajoutez donc pas à la collection newClasses
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* Attachez le contenu du tableau en utilisant un espace comme séparateur */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de SetHTMLAttributeAction, qui définit l'attribut sur la valeur d'attribut des éléments référencés par la propriété targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.SetHTMLAttributeAction qui définit SetHTMLAttributeAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// Obtient ou définit la propriété attribute pour SetHTMLAttributeAction.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// Obtient ou définit la propriété attributeValue pour SetHTMLAttributeAction.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// Définit la valeur de l'attribut HTML.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de SetStyleAction, qui définit la styleProperty sur la styleValue des éléments référencés par la propriété targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.SetStyleAction qui définit SetStyleAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// Obtient ou définit la propriété styleProperty pour SetStyleAction.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// Obtient ou définit la propriété styleValue pour SetStyleAction.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// Définit la valeur de propriété CSS inline.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de LoadPageAction, qui charge la page et l'ajoute à l'élément pointé par la propriété targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// Initialise une nouvelle instance de VS.Actions.LoadPageAction qui définit LoadPageAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// Obtient ou définit la propriété page pour LoadPageAction.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// Liste des actions à déclencher lorsque la page est chargée.
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// Charge le contenu d'une page dans un élément.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// Élément sur lequel cette action doit être exécutée.
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// Appelle WinJS.UI.processAll pour traiter les comportements de la page nouvellement chargée.
								WinJS.UI.processAll(originalElement);

								// Appelle execute sur chaque action dans le tableau et passe  un tableau vide d'éléments cibles.
								// Si les actions ne spécifient pas targetSelector, aucune action n'est exécutée. Autrement,
								// les actions sont exécutées sur les éléments targetSelector.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// Consomme l'erreur
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Classe de base pour tous les comportements.
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// Initialise une nouvelle instance de VS.Behaviors.BehaviorBase qui définit un comportement.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// Construit les propriétés d'objet en fonction du config block.
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// Attachement du comportement.
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
				// Carte d'éléments joints avec element.uniqueID comme clés.
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// Extraire des éléments de la carte
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
				/// Liste des actions à déclencher lorsque l'événement est déclenché
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// Attache l'action à l'élément (en général la source)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// Élément sur lequel le comportement est attaché.
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
					/// Détache le comportement
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// Élément à partir duquel détacher le comportement.
					/// </param>
					if (element) {
						// Supprimer un élément de VS.Behaviors._behaviorInstances
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
					/// Cette méthode est appelée lorsqu'un élément est joint à un comportement. Elle n'est PAS appelée
					/// si l'élément a déjà été joint à ce comportement. Les classes dérivées
					/// substituent cette méthode pour effectuer des tâches de jonction spécifiques.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// Élément qui a été joint.
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// Cette méthode est appelée lorsqu'un élément est sur le point d'être détaché d'un comportement. Elle n'est PAS appelée
					/// si l'élément a déjà été détaché. Les classes dérivées substituent cette méthode pour effectuer
					/// des tâches de détachement spécifiques.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// Élément sur le point d'être détaché.
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// Exécute l'action pour tous les éléments cibles.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// Collection d'éléments sur lesquels des actions doivent être exécutées.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Informations facultatives fournies par les Behaviors. Par exemple, EventTriggerBehavior les utilise pour passer un événement.
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
		/// Classe de base pour tous les comportements avec les sélecteurs.
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// Initialiser les sources avant d'appeler le constructeur de classe de base.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// Éléments définis par sourceSelector.
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// Retourne la propriété sourceSelector sur la SelectorSourcedBehaviorBase
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">Valeur de la propriété sourceSelector.</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// Définit la valeur de la propriété sourceSelector. Tous les éléments seront recherchés avec la valeur de sourceSelector spécifiée et le comportement sera appliqué à ces éléments.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// Valeur de la propriété sourceSelector.
						/// </param>
						this._sourceSelector = value || "";

						// Même si la nouvelle valeur du sélecteur de source est identique à l'ancienne, toutes les sources seront actualisées
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// Joint le SelectorSourcedBehavior à l'élément
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// Élément sur lequel le comportement est attaché. Si aucune source n'est spécifiée sur le comportement, l'élément attaché est la source du comportement
					/// </param>

					// En l'absence de selectorSource, nous devons utiliser cet élément comme source.
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
					/// Détache le SelectorSourcedBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// Élément à partir duquel le comportement a été détaché.
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// Actualiser les sources. L'élément en cours de détachement est tout de même comptabilisé parmi les éléments joints.
							// Nous devons fournir le nombre d'éléments oints actuellement - 1.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// Appelée lorsqu'une source est supprimée de ce comportement. Les classes dérivées peuvent substituer cette méthode pour effectuer des tâches spécifiques.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Élément source.
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// Appelée lorsqu'un nouvel élément source est ajouté à ce comportement. Les classes dérivées peuvent substituer cette méthode pour effectuer des tâches spécifiques.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Élément source.
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// Renvoie l'objet contenant les informations relatives à l'élément source. Les classes dérivées peuvent l'utiliser pour
					/// stocker les informations relatives à l'élément source.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// Élément source.
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// Renvoie une collection d'éléments sources.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// Renvoie une collection d'éléments cibles sur lesquels déclencher des actions. Si l'élément source est l'un des
					/// éléments joints, il s'agit du seul élément sur lequel déclencher des actions. Sinon, les actions
					/// doivent être déclenchées sur tous les éléments joints.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// Élément source.
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

					// Créer de nouvelles sources uniquement s'il y a au moins un élément joint
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
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de TimerBehavior, qui écoute le battement de l'horloge et déclenche des actions si spécifié.
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// Initialise une nouvelle instance de VS.Behaviors.TimerBehavior et déclenche des actions lors du battement de l'horloge.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// Attache le TimerBehavior à l'élément et définit la source si aucun _sourceselector n'est défini
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// Élément sur lequel le comportement est attaché. Si aucune source n'est spécifiée sur le comportement, l'élément attaché est la source du comportement
					/// </param>

					// Joindre toutes les actions à l'élément. Cela définit la cible sur les actions si ce n'est déjà fait.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// Détache le TimerBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// Élément à partir duquel le comportement a été détaché.
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
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de EventTriggerBehavior, qui écoute un événement sur l'élément source et déclenche des actions si spécifié.
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// Initialise une nouvelle instance de VS.Behaviors.EventTriggerBehavior qui définit un événement et déclenche des actions lorsque l'événement est déclenché.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// joint l'EventTriggerBehavior à l'élément (en général l'élément)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// Élément source.
					/// </param>

					// Si l'événement est un événement « load », déclenchez-le maintenant, car nous initialisons nos comportements à l'exécution du chargement (qui a déjà été déclenché)
					if (this.event === "load") {
						// Simulez les arguments et passez-les sur l'action que nous déclenchons manuellement.
						// VS.Behaviors.processAll peut être appelé plusieurs fois durant le cycle de vie de la page.
						// Toutefois, nous souhaitons exécuter les actions de « chargement » une seule fois. Nous allons utiliser un marqueur spécial.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// Créer un écouteur pour un élément et le mémoriser
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// Joindre un événement à un élément s'il y a un nom d'événement réel
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// Supprime le détecteur d'événements de l'élément lorsqu'il s'en va.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// Élément du comportement.
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
						/// Retourne la propriété event sur l'EventTriggerBehavior
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">Valeur de la propriété event.</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// Définit la valeur de la propriété event.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// Valeur de la propriété event.
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
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
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
		/// Implémentation concrète de RequestAnimationFrameBehavior, qui écoute le battement de l'horloge et déclenche des actions si spécifié.
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// Initialise une nouvelle instance de VS.Behaviors.RequestAnimationFrameBehavior
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// Attache le RequestAnimationFrameBehavior à l'élément
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Élément sur lequel le comportement est attaché. Si aucune source n'est spécifiée sur le comportement, l'élément attaché est la source du comportement
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
					/// Détache le RequestAnimationFrameBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// Élément à partir duquel le comportement a été détaché.
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// Appelle les actions
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// Appelle le requestAnimationFrame en image d'animation par seconde.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés (pour l'analyse JSON)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// Exécution de l'arborescence d'actions pour VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// Actions déjà chargées.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// Cette fonction traitera l'arborescence d'actions et l'attribut [data-vs-interactivity]
	function loadActionsImpl() {
		/*fichier json codé en dur de la liste d'actions*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// La présence du fichier de liste d'actions n'est pas requise, vous n'avez donc pas besoin de générer ici une erreur.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*fichier json de liste d'actions par défaut*/
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

				// Notez que les métadonnées applique la présence de la propriété de nom pendant l'analyse JSON (une animation ne
				// sera pas créée si elle n'a pas de nom). Lorsqu'il existe des doublons, la dernière version remplace
				// la version antérieure.
				var actionTreeName = actionTree.name;
				// Ajoute chaque arborescence d'actions au dictionnaire avec le nom comme clé.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// La présence du fichier de liste d'actions n'est pas requise, vous n'avez donc pas besoin de générer ici une erreur.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// Détacher des actions d'éléments
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// Supprimer des actions existantes
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// La présence du fichier de liste d'actions n'est pas requise, vous n'avez donc pas besoin de générer ici une erreur.
		}

	}

	// Ceci vérifie que les comportements définis au sein des fragments sont initialisés avant le chargement du fragment.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// Attachement des comportements et des actions à l'élément donné
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// Si nous obtenons un objet de comportements valide, analysez-le.
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

	// Détache le comportement existant de l'élément
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

	// Traitement réel de toutes les implémentations de comportements, ceci passe par les éléments
	// obtention de l'attribut data-vs-interactivity et appelle la création sur chaque élément.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// Charger des actions en premier, le cas échéant
		loadActions();

		// Traite l'attribut [data-vs-interactivity].
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// Recherche les éléments avec l'attribut ci-dessus et attache le comportement associé.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// Détache d'abord le comportement existant
		detach(element);
		// Attache maintenant le nouveau comportement
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// Essayer de charger de nouvelles actions. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// Le fichier *.json d'actions est probablement non valide.
			return; 
		}

		// Obtenir une copie des éléments à actualiser.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// Annuler l'inscription des actions actuelles et en inscrire de nouvelles.
		resetImpl();
		registerActions(actionTreeList);

		// Comportements joints sur des éléments que nous avons touchés.
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// Établit les membres de l'espace de noms « VS.Behaviors »
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Applique la liaison de comportement déclarative à tous les éléments, en commençant par l'élément racine spécifié.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Élément à partir duquel démarrer le traitement de l'attribut data-vs-interactivity
			/// Si ce paramètre n'est pas spécifié, la liaison est appliquée au document entier.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Applique une liaison de comportement déclaratif à un élément.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// Élément à partir duquel démarrer le traitement de l'attribut data-vs-interactivity
			/// Si ce paramètre n'est pas spécifié, la liaison est appliquée au document entier.
			/// </param>

			// S'il s'agit du premier élément à traiter, nous devons charger des actions
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// Détache des actions des éléments et supprime toutes les actions chargées.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// Actualise les comportements sur les éléments qui ont été traités par processAll.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// retourne un tableau d'instances de comportement attachées à l'élément donné.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// Élément pour lequel les instances de comportement sont obtenues.
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">Tableau d'instances de comportement attachées à l'élément.</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// définit le tableau de l'instance de comportement sur l'élément.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// Élément pour lequel l'instance de comportement est définie.
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// Instance de comportement actuelle à ajouter pour l'élément donné.
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// Normalement, nous traitons avec processAll une fois le document chargé. Toutefois, si ce script est ajouté
	// après le chargement du document (par exemple suite à une navigation WinJS ou à un ajout par
	// un autre JS), nous devons traiter avec processAll immédiatement.
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// Exécution de l'arborescence d'actions pour VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// Vérifier si WinJs est présent en vérifiant tous ses composants.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// Instrumenter le rendu de modèle WinJS.
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

			// Instrumenter WinJS.UI.
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

			// Instrumenter WinJS.UI.Fragments.
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

	// Ce script est généralement placé après les scripts WinJS. Il est donc judicieux d'instrumenter WinJS maintenant.
	instrumentWinJsOnDemand();

	// Si WinJS n'est pas instrumenté, ce script est placé avant WinJS ou il n'y a aucun WinJS. Nous allons essayer
	// d'instrumenter WinJS lors du chargement du document (à moins que ce script soit ajouté après le chargement du document).
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


