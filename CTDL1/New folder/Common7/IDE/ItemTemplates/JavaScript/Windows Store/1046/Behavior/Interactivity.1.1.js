/*! © Microsoft. Todos os direitos reservados. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
///Essas funções fornecem o recurso WinJS de definição de Namespace.
/// Também adiciona VS ao namespace global.

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
			/// Define um novo namespace com o nome especificado abaixo do namespace pai determinado.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// O namespace pai.
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// O nome do novo namespace.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// Os membros do novo namespace.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// O namespace recém-definido.
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
			/// Define um novo namespace com o nome especificado.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// O nome do namespace. Pode ser um nome separado por ponto para namespaces aninhados.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// Os membros do novo namespace.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// O namespace recém-definido.
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// Estabelecer membros do namespace "VS.Namespace"
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// Essas funções fornecem o recurso WinJS de definição e derivação de uma Classe

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// Adiciona metadados de propriedade a uma classe (se especificado). Inclui metadados definidos para base
		// primeiro a classe (que pode ser substituída por metadados para essa classe).
		//
		// Exemplo de metadados:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// "tipo" segue as regras para comentários do JavaScript intellisense. Sempre deve ser especificado.
		// "elementType" deverá ser especificado se o "tipo" for "Matriz".
		// "necessário" assume como padrão "falso".

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
		/// Define uma classe que usa o construtor determinado e os membros de instância especificados.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// Uma função de construtor usada para instanciar essa classe.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// O conjunto de campos de instância, propriedades e métodos disponibilizados na classe.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// O conjunto de campos estáticos, propriedades e métodos disponibilizados na classe.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// Metadados que descrevem as propriedades da classe. Esses metadados são usados para validar dados JSON, portanto, são
		///úteis somente para tipos que possam aparecer no JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// A classe recém-definida.
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
		/// Cria uma subclasse baseada no parâmetro baseClass fornecido, usando a herança de protótipo.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// A classe da qual herdar.
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// Uma função de construtor usada para instanciar essa classe.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// O conjunto de campos de instância, propriedades e métodos a serem disponibilizados na classe.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// O conjunto de campos estáticos, propriedades e métodos a serem disponibilizados na classe.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// Metadados que descrevem as propriedades da classe. Esses metadados são usados para validar dados JSON, portanto, são
		///úteis somente para tipos que possam aparecer no JSON. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// A classe recém-definida.
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
		/// Define uma classe que usa o construtor determinado e a união do conjunto de membros de instância.
		/// especificada por todos os objetos mesclados. A lista de parâmetros mesclados tem tamanho variável.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// Uma função de construtor usada para instanciar essa classe.
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// A classe recém-definida.
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// Estabelecer membros do namespace "VS.Class"
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
			/// Recupera a cadeia de caracteres de recursos que tem a ID de recurso especificada.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// A ID de recurso da cadeia de caracteres a ser recuperada.
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// Um objeto que pode conter estas propriedades:
			/// 
			/// valor:
			/// O valor da cadeia de caracteres solicitada. Esta propriedade está sempre presente.
			/// 
			/// vazio:
			/// Um valor que especifica se a cadeia de caracteres solicitada não foi encontrada.
			/// Se for verdadeiro, a cadeia não foi encontrada. Se for falso ou indefinido,
			/// a cadeia de caracteres solicitada foi encontrada.
			/// 
			/// idioma:
			/// O idioma da cadeia de caracteres, se estiver especificado. Esta propriedade só existe
			/// para recursos multilíngue.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "A propriedade \"{0}\" não é esperada para {1}.",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: Tipo encontrado: {2}; Tipo esperado: {3}.",
				"VS.Util.JsonPropertyMissing": "A propriedade necessária \"{0}.{1}\" está ausente ou é inválida.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: Tipo encontrado: {3}; Tipo esperado: {4}.",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] está ausente ou é inválido.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: Tipo encontrado: {2}; Tipo esperado: Cadeia de caracteres (escolha de: {3}).",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: Valor inválido. Encontrado: {2}; Esperado um de: {3}.",
				"VS.Util.NoMetadataForType": "Nenhum metadado de propriedade encontrado para o tipo {0}.",
				"VS.Util.NoTypeMetadataForProperty": "Nenhum metadado de tipo especificado para {0}.{1}.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "Nenhum metadado de tipo de elemento especificado para {0}.{1}[].",
				"VS.Resources.MalformedFormatStringInput": "Malformado, você pretendia usar escape em seu '{0}'?",
				"VS.Actions.ActionNotImplemented": "A ação personalizada não implementa o método de execução.",
				"VS.ActionTrees.JsonNotArray": "Os dados JSON ActionTrees devem ser uma matriz ({0}).",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "Nome de árvore de ações duplicado \"{0}\" ({1}).",
				"VS.Animations.InvalidRemove": "Não chame remove em uma instância de animação contida em um grupo.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// Formata uma cadeia de caracteres substituindo tokens no formato {n} por parâmetros especificados. Por exemplo,
			/// 'VS.Resources.formatString("Eu tenho {0} dedos.", 10)' retornaria "Eu tenho 10 dedos".
			/// </summary>
			/// <param name="string">
			/// A cadeia de caracteres para formatar.
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
			return "indefinido";
		}
		if (value === null) {
			return "nulo";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// Exemplo: formatMessage(["state: '{0}', id: {1}", "ON", 23]) retornará "state: 'ON', id: 23"
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
				/// Marca uma função como compatível com o processamento declarativo, como WinJS.UI.processAll
				/// ou WinJS.Binding.processAll.
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// A função a ser marcada como compatível com o processamento declarativo.
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// A função de entrada.
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
			/// Obtém o valor de dados associado ao elemento especificado.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// O elemento.
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// O valor associado ao elemento.
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// retorna o conteúdo da cadeia de caracteres do arquivo cujo caminho está especificado no argumento.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// O caminho do arquivo
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// O conteúdo de cadeia de caracteres do arquivo.
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// O objeto XMLHttpRequest do IE não permitirá acesso ao sistema de arquivos local, portanto, em vez disso, use o controle ActiveX
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
			/// Analisa o configBlock e se for transmitida uma instância válida, os valores analisados 
			/// serão definidos como propriedades na instância.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// A estrutura do configBlock (JSON).
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// A instância cujas propriedades são definidas com base no configBlock.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// A instância criada com base no bloco config.
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
			/// Esta é uma função que será chamada para cada chave e valor em cada nível do resultado final durante o método JSON.Parse durante a análise da estrutura de dados JSON. 
			/// Cada valor será substituído pelo resultado da função de recuperação. Isso pode ser usado para transformar objetos genéricos em instâncias de pseudoclasses.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// A chave atual que está sendo analisada pelo analisador JSON.
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// O valor atual da chave que está sendo analisada pelo analisador JSON.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// A pseudoclasse real que representa o valor da chave.
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// Verifique se o tipo não é nulo e se é uma função (construtor)
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Relata um erro (para o console) usando o recurso de cadeia de caracteres especificado e um
			/// lista de substituições de tamanho variável.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Identificador de erro exclusivo. Deve estar no formato "[namespace].[identificador]". A mensagem
			/// de erro exibida inclui esse identificador e a cadeia de caracteres retornada pela pesquisa
			/// na tabela de recursos de cadeia de caracteres (se houver.
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
			/// Relata um aviso (para o console) usando o recurso de cadeia de caracteres especificado e um
			/// lista de substituições de tamanho variável.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Identificador de erro exclusivo. Deve estar no formato "[namespace].[identificador]". A mensagem
			/// de erro exibida inclui esse identificador e a cadeia de caracteres retornada pela pesquisa
			/// na tabela de recursos de cadeia de caracteres (se houver.
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
			/// Relata um aviso (para o console) usando o recurso de cadeia de caracteres especificado e um
			/// lista de comprimento variável de substituições seguindo a formatação de cadeia de caracteres do .NET, ex.:
			/// outputDebugMessage("state: '{0}', id: {1}", "ON", 23) rastreará "state: 'ON', id: 23".
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
		/// Habilita ou desabilita o rastreamento de ações. Para fins de diagnóstico.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// Rastreia informações da ação. Os argumentos seguem a notação de formatação de cadeia de caracteres do .NET. Por exemplo:
			/// VS.Util.trace("Action: '{0}', id: {1}", "set", 23) rastreará "Action: 'set', id: 23".
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// Função auxiliar para converter um objeto JavaScript genérico no tipo especificado. Validará as propriedades se
		// o tipo fornecer metadados.

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

		// Verificar se temos todas as propriedades necessárias
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
				// O tipo coincide, então basta defini-lo
				object[propertyName] = validatedValue;
			}
		} else {
			// Não temos metadados (caso em que já exibimos um erro,
			// temos metadados, mas eles não definem essa propriedade (caso em que tratamos como
			// propriedade inesperada) ou os metadados da propriedade não definem seu tipo (caso em que
			// consideramos os metadados malformados). Exibir erros adequados para os dois últimos cenários.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// De qualquer forma, definimos a propriedade como qualquer valor que tivermos.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// Valida um valor de propriedade do tipo necessário. Se não, converterá se possível. Retornará nulo se não
		// puder converter.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// Forçar item para tipo, se possível
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// Caso contrário, veja se o tipo tem um conversor
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
			// Suponha que o tipo necessário seja uma enumeração

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "cadeia de caracteres")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("Não tratar tipo " + requiredPropertyType + " ao validar em relação aos metadados");
		}
	}

	function getObjectTypeDescription(object) {
		// Função auxiliar para exibir uma descrição de tipo amigável de sua função de construtor (requer que a
		// função de construtor seja nomeada) - usada para mensagens de erro.

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// Para facilitar a leitura, se o nome da função de construtor acabar com '_ctor', remova isso.
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
		/// A classe base de todas as ações executadas pelo tempo de execução de Ações VS.
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// Inicializa uma nova instância de VS.Actions.ActionBase que define uma ação.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// Obtém ou define a propriedade de destino para AddClassAction.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// Se não houver targetSelector, a resposta será targetElements, caso contrário, querySelectorAll(targetSelector).
					/// As ações personalizadas podem usar este método para modificar a lista de elementos de destino para aplicar a ação.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Uma coleção de elementos em que esta ação deve ser executada. Essa coleção é construída
					/// pelo objeto Behavior. Ela leva em conta os detalhes desse Behavior, como elementos anexados e
					/// seletor de origem. NÃO leva em conta detalhes específicos da ação, como o seletor do destino da ação.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// Executa a ação para todos os elementos de origem.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Uma coleção de elementos em que esta ação deve ser executada. Essa coleção é construída
					/// pelo objeto Behavior. Ela leva em conta os detalhes desse Behavior, como elementos anexados e
					/// seletor de origem. NÃO leva em conta detalhes específicos da ação, como o seletor do destino da ação.
					/// O método ExecuteAll reconciliará os elementos Behavior de destino com seus próprios destinos e executará a
					/// ação nos destinos reconciliados.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Informações opcionais fornecidas por Behaviors. Por exemplo, EventTriggerBehavior as usa para passar o evento.
					/// </param>

					try {
						// Obtenha a lista real de elementos de destino, que pode ser diferente da lista recebida.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// Executa a ação para um elemento. As ações derivadas devem substituir isso. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Informações opcionais fornecidas por Behaviors. Por exemplo, EventTriggerBehavior as usa para passar o evento.
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
		/// Implementação concreta de RemoveElementsAction, que remove todos os elementos referidos pela propriedade de seletor elementsToRemove
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.RemoveElementsAction que define RemoveElementsAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// Obtém ou define a propriedade elementsToRemove para RemoveElementsAction.
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
					/// Remove o elemento do DOM.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de RemoveChildrenAction, que remove todos os filhos dos elementos referidos pela propriedade de seletor parentElement
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.RemoveChildrenAction que define RemoveChildrenAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// Obtém ou define a propriedade parentElement para RemoveChildrenAction.
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
					/// Remove todos os filhos de um elemento
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de ToggleClassAction, que alterna o atributo de classe do elemento especificado pela propriedade de elemento.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.ToggleClassAction que define ToggleClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// Obtém ou define a propriedade className para ToggleClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// Executa a ação quando a árvore de ações é acionada.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// Se a classe não for encontrada, adicione-a
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// Caso contrário, remova a classe.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de AddClassAction, que modifica o atributo de classe do elemento especificado pela propriedade de elemento.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.AddClassAction que define AddClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// Obtém ou define a propriedade className para AddClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// Executa a ação quando a árvore de ações é acionada.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
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
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de RemoveClassAction, que modifica o atributo de classe do elemento especificado pela propriedade de elemento.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.RemoveClassAction que define RemoveClassAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// Obtém ou define a propriedade className para RemoveClassAction.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// Remove o nome da classe dos nomes de classe do elemento.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// Se não houver retorno de atributo de classe
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// Esse elemento tem a classe necessária, portanto, não o adicione à nossa coleção newClasses
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* Una o conteúdo da matriz usando o espaço como separador */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de SetHTMLAttributeAction, que define o atributo como o valor de atributo nos elementos referidos pela propriedade targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.SetHTMLAttributeAction que define SetHTMLAttributeAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// Obtém ou define a propriedade de atributo para SetHTMLAttributeAction.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// Obtém ou define a propriedade attributeValue para SetHTMLAttributeAction.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// Define o valor do atributo HTML.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de SetStyleAction, que define a styleProperty como o styleValue nos elementos referidos pela propriedade targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.SetStyleAction que define SetStyleAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// Obtém ou define a propriedade styleProperty para SetStyleAction.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// Obtém ou define a propriedade styleValue para SetStyleAction.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// Define o valor embutido da propriedade CSS.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de LoadPageAction, que carrega a página e a adiciona ao elemento apontado pela propriedade targetSelector.
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// Inicializa uma nova instância de VS.Actions.LoadPageAction que define LoadPageAction.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// Obtém ou define a propriedade de página para LoadPageAction.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// A lista de ações a serem acionadas quando a página é carregada.
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// Carrega o conteúdo de uma página em um elemento.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// Um elemento em que esta ação deve ser executada.
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// Chame WinJS.UI.processAll para processar os comportamentos da página recém-carregada.
								WinJS.UI.processAll(originalElement);

								// Executa a chamada em cada ação da matriz e passa uma matriz vazia de elementos de destino.
								// Se as ações não especificarem o targetSelector, nenhuma ação será executada. Caso contrário,
								// as ações serão executadas de acordo com os elementos targetSelector.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// Consumir o erro
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// A classe base de todos os comportamentos.
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// Inicializa uma nova instância de VS.Behaviors.BehaviorBase que define um comportamento.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// Constrói as propriedades de objeto com base no bloco config.
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// Anexo do comportamento.
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
				// Mapa dos elementos anexados com element.uniqueID como chaves.
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// Extrair elementos do mapa
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
				/// A lista de ações a serem acionadas quando o evento é acionado
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// Anexa a ação com o elemento (em geral, a origem)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// O elemento ao qual o comportamento é anexado.
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
					/// Desanexa o comportamento
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// O elemento do qual desanexar o comportamento.
					/// </param>
					if (element) {
						// Remover elemento de VS.Behaviors._behaviorInstances
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
					/// Chamado quando um elemento é anexado a um comportamento. Esse método NÃO será chamado
					/// se o elemento já estiver anexado a este comportamento. As classes derivadas
					/// substituirão este método para executar tarefas de anexação específicas.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// Um elemento que foi anexado.
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// O elemento chamado anteriormente está prestes a ser desanexado de um comportamento. Este método NÃO será chamado
					/// se o elemento já estiver desanexado. As classes derivadas substituirão este método para executar
					/// tarefas de desanexação específicas.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// Um elemento que está prestes a ser desanexado.
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// Executa a ação para todos os elementos de origem.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// Uma coleção de elementos em que as ações devem ser executadas.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Informações opcionais fornecidas por Behaviors. Por exemplo: EventTriggerBehavior as usa para passar o evento.
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
		/// A classe base de todos os comportamentos com seletores.
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// Inicialize as origens antes de chamar o construtor de classe base.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// Elementos definidos por sourceSelector.
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// Retorna a propriedade sourceSelector na SelectorSourcedBehaviorBase
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">O valor da propriedade sourceSelector.</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// Define o valor da propriedade sourceSelector. Isso localizará todos os elementos com o sourceSelector especificado e aplicará o Comportamento a esses elementos.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// O valor da propriedade sourceSelector.
						/// </param>
						this._sourceSelector = value || "";

						// Mesmo se o novo valor do seletor de origem for igual ao antigo, atualizaremos todas as origens
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// Anexa o SelectorSourcedBehavior ao elemento
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// O elemento ao qual o comportamento é anexado. Se não houver nenhuma origem especificada no comportamento, o elemento anexado será a origem do comportamento
					/// </param>

					// Se não houver selectorSource, precisaremos usar este elemento como origem.
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
					/// Desanexa o SelectorSourcedBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// O elemento do qual o comportamento foi desanexado.
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// Atualiza as origens. O elemento que está sendo desanexado ainda conta a favor dos elementos anexados.
							// Precisamos fornecer a contagem atual de elementos anexados - 1.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// Chamado quando uma origem é removida deste comportamento. As classes derivadas podem substituir este método para executar tarefas específicas.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Elemento de origem.
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// Chamado quando um novo elemento de origem é adicionado a este comportamento. As classes derivadas podem substituir este método para executar tarefas específicas.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Elemento de origem.
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// Retorna o objeto que contém as informações relacionadas ao elemento de origem. As classes derivadas podem usá-lo para
					/// armazenar de acordo com as informações do elemento de origem.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// Elemento de origem.
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// Retorna a coleção de elementos de origem.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// Retorna a coleção de elementos de destino para disparar as ações. Se o elemento de origem for um dos
					/// elementos anexados, ele será o único elemento para disparar ações. Caso contrário, as ações
					/// deverão ser disparadas em todos os elementos anexados.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// Elemento de origem.
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

					// Cria novas origens somente se houver no mínimo um elemento anexado
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
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de TimerBehavior, que ouve escalas de cronômetro e aciona ações, se especificadas.
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// Inicializa uma nova instância de VS.Behaviors.TimerBehavior e aciona ações quando ocorrem escalas de cronômetro.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// Anexa o TimerBehavior com o elemento e definirá a origem se não houver _sourceselector definido
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// O elemento ao qual o comportamento é anexado. Se não houver nenhuma origem especificada no comportamento, o elemento anexado será a origem do comportamento
					/// </param>

					// Anexe todas as ações ao elemento, isso definirá o destino nas ações, se ainda não definido.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// Desanexa o TimerBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// O elemento do qual o comportamento foi desanexado.
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
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de EventTriggerBehavior, que ouve um evento no elemento de origem e aciona ações, se especificadas.
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// Inicializa uma nova instância de VS.Behaviors.EventTriggerBehavior que define um evento e aciona ações quando o evento é acionado.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// anexa o EventTriggerBehavior ao elemento (normalmente, o elemento)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// Elemento de origem.
					/// </param>

					// Se o evento for "carga", acione-o agora, pois inicializamos o tempo de execução de nossos comportamentos na carga (que já foi acionada)
					if (this.event === "load") {
						// Simule os argumentos e transmita-os para a ação que acionamos manualmente.
						// VS.Behaviors.processAll pode ser chamado várias vezes durante o ciclo de vida da página.
						// Ainda queremos executar ações "load" somente uma vez. Usaremos um marcador especial.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// Criar novo ouvinte para um elemento e lembrá-lo
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// Anexar evento a um elemento se houver um nome de evento real
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// Remove o ouvinte do evento para o elemento como se ele desaparecesse.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// O elemento do comportamento.
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
						/// Retorna a propriedade de evento no EventTriggerBehavior
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">O valor da propriedade de evento.</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// Define o valor da propriedade de evento.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// O valor da propriedade de evento.
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
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
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
		/// Implementação concreta de RequestAnimationFrameBehavior, que ouve escalas de cronômetro e aciona ações, se especificadas.
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// Inicializa uma nova instância de VS.Behaviors.RequestAnimationFrameBehavior
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// Anexa o RequestAnimationFrameBehavior com o elemento
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// O elemento ao qual o comportamento é anexado. Se não houver nenhuma origem especificada no comportamento, o elemento anexado será a origem do comportamento
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
					/// Desanexa o RequestAnimationFrameBehavior
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// O elemento do qual o comportamento foi desanexado.
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// Chamar as ações
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// Chame o requestAnimationFrame no quadro de animação por segundo.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados da Propriedade (para análise JSON)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// Tempo de execução de ActionTree para VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// Ações já carregadas.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// Essa função processará a ActionTree e o atributo [data-vs-interactivity]
	function loadActionsImpl() {
		/*arquivo json actionlist codificado*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// Não exigimos que o arquivo actionList esteja presente, portanto, não geramos um erro aqui.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*arquivo json actionlist padrão*/
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

				// Observe que os metadados forçam a presença da propriedade de nome durante a análise JSON (a animação não
				// será criada se não tiver um nome). Quando houver duplicatas, a versão posterior substituirá
				// a versão anterior.
				var actionTreeName = actionTree.name;
				// Adicione cada actionTree ao dicionário com o nome como a chave.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// Não exigimos que o arquivo actionList esteja presente, portanto, não geramos um erro aqui.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// Desanexar ações de elementos
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// Excluir ações existentes
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// Não exigimos que o arquivo actionList esteja presente, portanto, não geramos um erro aqui.
		}

	}

	// Isso garante que os comportamentos definidos nos fragmentos sejam inicializados antes de o fragmento ser carregado.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// Anexando comportamentos e ações para o elemento determinado
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// Se obtivermos um objeto de comportamento válido, analise-o.
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

	// Desanexar o comportamento existente do elemento
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

	// Processa realmente toda a implementação de Comportamentos; isso abrange os elementos
	// que têm o atributo data-vs-interactivity e chama create em cada elemento.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// Carregar ações primeiro, se houver
		loadActions();

		// Processe o atributo [data-vs-interactivity].
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// Localize elementos com o atributo acima e anexe o comportamento associado.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// Primeiro, desanexe o comportamento existente
		detach(element);
		// Agora, anexe o novo comportamento
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// Tentar carregar novas ações. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// O arquivo *.json de ações mais prováveis é inválido.
			return; 
		}

		// Obtenha uma cópia dos elementos para atualizar.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// Cancele o registro das ações atuais e registre novas.
		resetImpl();
		registerActions(actionTreeList);

		// Comportamentos anexados aos elementos que editamos.
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// Estabelecer membros do namespace "VS.Behaviors"
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Aplica a associação de comportamento declarativo a todos os elementos, iniciando no elemento de raiz especificado.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// O elemento no qual iniciar o processamento do atributo data-vs-interactivity
			/// Se esse parâmetro não estiver especificado, a associação será aplicada a todo o documento.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Aplica associação de comportamento declarativo a um elemento.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// O elemento no qual iniciar o processamento do atributo data-vs-interactivity
			/// Se esse parâmetro não estiver especificado, a associação será aplicada a todo o documento.
			/// </param>

			// Se esse for o primeiro elemento a ser processado, precisamos carregar as ações
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// Desanexa as ações dos elementos e remove todas as ações carregadas.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// Atualize os comportamentos em elemento que foram processados por processAll.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// retorna uma matriz de behaviorInstances anexada ao elemento determinado.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// O elemento para o qual as instâncias de comportamento são obtidas.
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">A matriz de instâncias de comportamento anexadas ao elemento.</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// define a matriz de instância de comportamento para o elemento.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// O elemento para o qual as instâncias de comportamento é definida.
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// A instância de comportamento atual a ser adicionada ao elemento determinado
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// Normalmente, executamos processAll depois que o documento é carregado. No entanto, se este script for adicionado
	// depois de o documento ser carregado (por exemplo: em resultado de uma navegação WinJS ou outro
	// JS adicionado), precisaremos executar processAll imediatamente.
	if (document.readyState !== "concluído") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// Tempo de execução de ActionTree para VS

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// Verifique se o WinJs está presente conferindo todas as suas partes.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// Instrumentar renderização de modelo WinJS.
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

			// Instrumentar WinJS.UI.
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

			// Instrumentar WinJS.UI.Fragments.
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

	// Normalmente, este script é colocado após os scripts WinJS. Portanto, "agora" seria um bom momento para instrumentar WinJS.
	instrumentWinJsOnDemand();

	// Se WinJS não for instrumentado, este script virá antes de WinJS ou não haverá WinJS. Tentaremos
	// instrumentar WinJS quando o documento for carregado (a menos que este script seja adicionado depois de o documento ser carregado).
	if (!_isWinJsInstrumented && document.readyState !== "concluído") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


