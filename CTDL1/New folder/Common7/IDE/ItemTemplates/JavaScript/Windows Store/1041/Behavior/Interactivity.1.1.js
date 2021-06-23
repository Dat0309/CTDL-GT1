/*! (C) Microsoft.  All rights reserved. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// これらの関数には、名前空間を定義する WinJS 機能が備わっています。
/// グローバル名前空間に VS も追加します。

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
			/// 指定された親の名前空間の下に、指定された名前で新しい名前空間を定義します。
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// 親の名前空間。
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// 新しい名前空間の名前。
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// 新しい名前空間のメンバー。
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// 新しく定義された名前空間。
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
			/// 指定された名前で新しい名前空間を定義します。
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// 名前空間の名前。入れ子になった名前空間の場合はドットで区切られた名前になる可能性があります。
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// 新しい名前空間のメンバー。
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// 新しく定義された名前空間。
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// "VS.Namespace" 名前空間のメンバーを確立します
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// これらの関数には、Class を定義したり、Class から派生したりする WinJS 機能が備わっています

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// クラスにプロパティ メタデータを追加します (指定されている場合)。最初に、基底クラスに対して定義された
		// メタデータを含めます (これは、このクラスのメタデータによってオーバーライドされる可能性があります)。
		//
		// メタデータの例:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// "type" は、JavaScript の Intellisense のコメントに対する規則に従います。これは、常に指定する必要があります。
		// "type" が "Array" の場合は "elementType" を指定する必要があります。
		// "required" の既定値は "false" です。

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
		/// 指定されたコンストラクターと指定されたインスタンス メンバーを使用してクラスを定義します。
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// このクラスのインスタンス化に使用されるコンストラクター関数。
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// クラスで使用できるようになったインスタンス フィールド、プロパティ、およびメソッドのセット。
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// クラスで使用できるようになった静的フィールド、プロパティ、およびメソッドのセット。
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// クラスのプロパティを説明するメタデータ。このメタデータは、JSON データの検証に使用されるため、
		/// JSON で使用できる型にのみ役立ちます。
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// 新しく定義されたクラス。
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
		/// プロトタイプの継承を使用して、指定された baseClass パラメーターに基づいたサブクラスを作成します。
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// 継承元のクラス。
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// このクラスのインスタンス化に使用されるコンストラクター関数。
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// クラスで使用できるようにするインスタンス フィールド、プロパティ、およびメソッドのセット。
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// クラスで使用できるようにする静的フィールド、プロパティ、およびメソッドのセット。
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// クラスのプロパティを説明するメタデータ。このメタデータは、JSON データの検証に使用されるため、
		/// JSON で使用できる型にのみ役立ちます。
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// 新しく定義されたクラス。
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
		/// 指定されたコンストラクター、およびすべての mixin オブジェクトで指定されたインスタンス 
		/// メンバーのセットの和集合を使用してクラスを定義します。mixin パラメーター リストは可変長です。
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// このクラスのインスタンス化に使用されるコンストラクター関数。
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// 新しく定義されたクラス。
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// "VS.Class" 名前空間のメンバーを確立します
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
			/// 指定されたリソース ID を持つリソース文字列を取得します。
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// 取得する文字列のリソース ID。
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// 次のプロパティを含めることができるオブジェクト:
			/// 
			/// value:
			/// 要求された文字列の値。このプロパティは常に存在します。
			/// 
			/// empty:
			/// 要求された文字列が見つからなかったかどうかを示す値。
			/// true の場合、文字列は見つかりませんでした。false または未定義の場合は、
			/// 要求された文字列が見つかりました。
			/// 
			/// lang:
			/// 文字列の言語 (指定されている場合)。このプロパティは、複数の言語の
			/// リソースに対してのみ存在します。
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "プロパティ \"{0}\" が {1} には必要ありません。",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: 見つかった型: {2}、必要な型: {3}。",
				"VS.Util.JsonPropertyMissing": "必要なプロパティ \"{0}.{1}\" がないか、または無効です。",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: 見つかった型: {3}、必要な型: {4}。",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] がないか、または無効です。",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: 見つかった型: {2}、必要な型: String (選択: {3})。",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: 値が無効です。{2} が見つかりましたが、次のいずれかが必要です: {3}。",
				"VS.Util.NoMetadataForType": "型 {0} に対するプロパティ メタデータが見つかりませんでした。",
				"VS.Util.NoTypeMetadataForProperty": "{0}.{1} に対して型メタデータが指定されていません。",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "{0}.{1}[] に対して要素型メタデータが指定されていません。",
				"VS.Resources.MalformedFormatStringInput": "形式が正しくありません。'{0}' をエスケープしますか?",
				"VS.Actions.ActionNotImplemented": "カスタム アクションは実行メソッドを実装しません。",
				"VS.ActionTrees.JsonNotArray": "ActionTrees JSON データは配列 ({0}) である必要があります。",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "アクション ツリー名 \"{0}\" ({1}) が重複しています。",
				"VS.Animations.InvalidRemove": "グループに含まれているアニメーション インスタンスで削除を呼び出さないでください。",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// 指定されたパラメーターで、文字列置換トークンを形式 {n} にします。たとえば、
			/// 'VS.Resources.formatString("{0} 本の指があります。", 10)' の場合は "10 本の指があります。" と返されます。
			/// </summary>
			/// <param name="string">
			/// 形式を指定する文字列。
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
			return "未定義";
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// 例: formatMessage(["state: '{0}', id: {1}", "ON", 23]) では "state: 'ON', id: 23" が返されます
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
				/// WinJS.UI.processAll や WinJS.Binding.processAll など、関数を、宣言による処理との互換性があると
				/// して設定します。
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// 宣言による処理との互換性があるとして設定する関数。
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// Input 関数。
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
			/// 指定された要素に関連付けられたデータ値を取得します。
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// 要素。
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// 要素と関連付けられた値。
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// パスが引数で指定されているファイルの文字列のコンテンツを返します。
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// ファイル パス
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// ファイルの文字列のコンテンツ。
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// IE の XMLHttpRequest オブジェクトは、ローカル ファイル システムへのアクセスを許可しないため、代わりに ActiveX コントロールを使用します
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
			/// configBlock を解析し、有効なインスタンスが渡された場合、解析された値は
			/// インスタンス上にプロパティとして設定されます。
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// configBlock (JSON) 構造体。
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// configBlock に基づいてプロパティが設定されているインスタンス。
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// 構成ブロックに基づいて作成されたインスタンス。
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
			/// これは、JSON データ構造の解析中に JSON.Parse メソッドで最終結果の各レベルで各キーと値に対して呼び出される関数です。
			/// 各値は、reviver 関数の結果に置き換えられます。これを使用すると、汎用オブジェクトを擬似クラスのインスタンスに再形成できます。
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// JSON パーサーで解析されている現在のキー。
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// JSON パーサーで解析されているキーの現在の値。
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// キーの値を表す実際の擬似クラス。
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// 型が null ではなく関数 (コンストラクター) であるかどうかを確認します
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// 指定された文字列リソースと、代入の可変長リストを使用して、エラーを (コンソールに)
			/// 報告します。
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// 一意のエラー ID。"[namespace].[identifier]" 形式にする必要があります。表示された
			/// エラー メッセージには、この ID と、文字列リソース テーブルでこれを検索すると返される
			/// 文字列 (このような文字列が存在する場合) が含まれます。
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
			/// 指定された文字列リソースと、代入の可変長リストを使用して、警告を (コンソールに)
			/// 報告します。
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// 一意のエラー ID。"[namespace].[identifier]" 形式にする必要があります。表示された
			/// エラー メッセージには、この ID と、文字列リソース テーブルでこれを検索すると返される
			/// 文字列 (このような文字列が存在する場合) が含まれます。
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
			/// 指定された文字列リソースと、代入の可変長リストを使用して、警告を (コンソールに)
			/// .NET 文字列の書式設定に従って報告します。たとえば、
			/// outputDebugMessage("state: '{0}', id: {1}", "ON", 23) では "state: 'ON', id: 23" がトレースされます。
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
		/// アクションのトレースを有効または無効にします。診断用です。
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// アクション情報をトレースします。引数は、.NET 文字列の書式設定表記に従います。たとえば、
			/// VS.Util.trace("Action: '{0}', id: {1}", "set", 23) では "Action: 'set', id: 23" がトレースされます。
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// 汎用 JavaScript オブジェクトを指定された型に変換するためのヘルパー関数。型でメタデータを指定
		// する場合にプロパティを検証します。

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

		// 必要なプロパティがすべてあることを確認します
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
				// 種類が一致するため、設定するだけです
				object[propertyName] = validatedValue;
			}
		} else {
			// メタデータがまったくない (この場合は既にエラーが表示されています) か、メタデータは
			// あってもこのプロパティが定義されていない (この場合は予期しないプロパティとして
			// 処理されます) か、プロパティのメタデータでその型が定義されていません (この場合はメタデータ
			// の形式が正しくないと見なされます)。後の 2 つのシナリオでは、適切なエラーを表示します。
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// 状況にかかわらず、プロパティを、何らかの値に設定します。
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// プロパティ値が必要な型であるかどうかを検証します。必要な型でない場合は、可能であれば変換します。変換できない場合は、
		// null を返します。

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// 可能であれば、項目を型に強制的に変換します
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// それ以外の場合、型にコンバーターがあるかどうかを確認します
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
			// 必要な型が列挙型であると仮定します

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
			throw new Error("メタデータに対する検証中は" + requiredPropertyType + " 型を処理しません");
		}
	}

	function getObjectTypeDescription(object) {
		// コンストラクター関数からフレンドリな型の説明を表示するヘルパー関数 (コンストラクター関数に
		// 名前を付ける必要があります) - エラー メッセージに使用されます。

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// 読みやすくするために、コンストラクター関数名が '_ctor' で終わる場合、その部分を削除します。
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
		/// VS Actions ランタイムによって実行されたすべてのアクションの基底クラス。
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// アクションを定義する VS.Actions.ActionBase の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// AddClassAction の対象プロパティを取得または設定します。
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// targetSelector がない場合は targetElement をラウンド トリップします。それ以外の場合は querySelectorAll(targetSelector) をラウンド トリップします。
					/// カスタム アクションでは、このメソッドを使用して、アクションを適用するターゲット要素のリストを変更できます。
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// このアクションが実行される要素のコレクション。このコレクションは、所有者の Behavior オブジェクトによって
					/// 構築されます。このような Behavior の詳細が、アタッチされた要素およびソース セレクターとして
					/// 考慮されます。アクションのターゲット セレクターなど、アクション固有の詳細は考慮されません。
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// すべてのターゲット要素に対するアクションを実行します。
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// このアクションが実行される要素のコレクション。このコレクションは、所有者の Behavior オブジェクトによって
					/// 構築されます。このような Behavior の詳細が、アタッチされた要素およびソース セレクターとして
					/// 考慮されます。アクションのターゲット セレクターなど、アクション固有の詳細は考慮されません。
					/// ExecuteAll メソッドは、Behavior ターゲット要素を、所有するターゲットで調整し、調整された
					/// ターゲットに対してアクションを実行します。
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Behaviors によって提供されるオプション情報。たとえば、EventTriggerBehavior はこれを使用してイベントを渡します。
					/// </param>

					try {
						// 受信リストとは異なる可能性がある、ターゲット要素の実際のリストを取得します。
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// 1 つの要素に対してアクションを実行します。派生したアクションはこれをオーバーライドする必要があります。 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Behaviors によって提供されるオプション情報。たとえば、EventTriggerBehavior はこれを使用してイベントを渡します。
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
		/// RemoveElementsAction の具体的な実装。これにより、elementsToRemove セレクター プロパティで参照されているすべての要素を削除します。
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// RemoveElementsAction を定義する VS.Actions.RemoveElementsAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// RemoveElementsAction の elementsToRemove プロパティを取得または設定します。
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
					/// DOM から要素を削除します。
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// RemoveChildrenAction の具体的な実装。これにより、parentElement セレクター プロパティで参照されている要素の子をすべて削除します。
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// RemoveChildrenAction を定義する VS.Actions.RemoveChildrenAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// RemoveChildrenAction の parentElement プロパティを取得または設定します。
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
					/// 要素からすべての子を削除します
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// ToggleClassAction の具体的な実装。これにより、要素のプロパティに固有の要素のクラス属性を切り替えます。
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// ToggleClassAction を定義する VS.Actions.ToggleClassAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// ToggleClassAction の className プロパティを取得または設定します。
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// アクション ツリーがトリガーされたときにアクションを実行します。
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// クラスが見つからない場合は追加します
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// それ以外の場合はクラスを削除します。
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// AddClassAction の具体的な実装。これにより、要素のプロパティに固有の要素のクラス属性を変更します。
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// AddClassAction を定義する VS.Actions.AddClassAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// AddClassAction の className プロパティを取得または設定します。
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// アクション ツリーがトリガーされたときにアクションを実行します。
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// このアクションが実行される要素。
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
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// RemoveClassAction の具体的な実装。これにより、要素のプロパティに固有の要素のクラス属性を変更します。
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// RemoveClassAction を定義する VS.Actions.RemoveClassAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// RemoveClassAction の className プロパティを取得または設定します。
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// 要素のクラス名からクラス名を削除します。
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// クラス属性の戻り値がない場合
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// この要素には必要なクラスがあるため、それを newClasses コレクションに追加しないでください
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* スペースを区切り記号として使用して、配列の内容を結合します*/
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// SetHTMLAttributeAction の具体的な実装。これにより、targetSelector プロパティで参照されている要素の属性値に属性を設定します。
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// SetHTMLAttributeAction を定義する VS.Actions.SetHTMLAttributeAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// SetHTMLAttributeAction の属性プロパティを取得または設定します。
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// SetHTMLAttributeAction の attributeValue プロパティを取得または設定します。
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// HTML 属性値を設定します。
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// SetStyleAction の具体的な実装。これにより、targetSelector プロパティで参照されている要素で styleProperty を styleValue に設定します。
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// SetStyleAction を定義する VS.Actions.SetStyleAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// SetStyleAction の styleProperty プロパティを取得または設定します。
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// SetStyleAction の styleValue プロパティを取得または設定します。
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// インライン CSS プロパティ値を設定します。
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// LoadPageAction の具体的な実装。これにより、ページを読み込み、targetSelector プロパティで示される要素にそのページを追加します。
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// LoadPageAction を定義する VS.Actions.LoadPageAction の新しいインスタンスを初期化します。
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// LoadPageAction の page プロパティを取得または設定します。
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// ページが読み込まれたときに発生するアクションのリスト。
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// ページのコンテンツを要素に読み込みます。
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// このアクションが実行される要素。
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// WinJS.UI.processAll を呼び出して、新しく読み込まれたページの動作を処理します。
								WinJS.UI.processAll(originalElement);

								// 配列の各アクションに対して実行を呼び出し、ターゲット要素の空の配列を渡します。
								// アクションで targetSelector を指定しない場合、アクションは実行されません。それ以外
								// の場合、アクションは targetSelector 要素に対して実行されます。
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// エラーを発生させます
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// すべての動作の基底クラス。
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// 動作を定義する VS.Behaviors.BehaviorBase の新しいインスタンスを初期化します。
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// 構成ブロックに基づいてオブジェクト プロパティを構築します。
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// 動作のアタッチ。
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
				// element.uniqueID をキーとして含むアタッチされた要素のマップ。
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// マップから要素を抽出します
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
				/// イベントがトリガーされたときに発生するアクションのリスト
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// 要素 (通常はソース) を含むアクションをアタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// 動作がアタッチされる要素。
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
					/// 動作をデタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// 動作をデタッチする要素。
					/// </param>
					if (element) {
						// VS.Behaviors._behaviorInstances から要素を削除します
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
					/// 要素が動作にアタッチされるときに呼び出されます。このメソッドは、要素が既に
					/// この動作にアタッチされている場合は呼び出されません。派生クラスはこの
					/// メソッドをオーバーライドし、特定のアタッチ タスクを実行します。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// アタッチされている要素。
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// 要素が動作からデタッチされる前に呼び出されます。このメソッドは、要素が既にデタッチされている
					/// 場合は呼び出されません。派生クラスは、このメソッドをオーバーライドし、特定のデタッチ
					/// タスクを実行します。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// デタッチされようとしている要素。
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// すべてのターゲット要素に対するアクションを実行します。
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// アクションが実行される要素のコレクション。
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Behaviors によって提供されるオプション情報。たとえば、EventTriggerBehavior はこれを使用してイベントを渡します。
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
		/// セレクターを持つすべての動作の基底クラス。
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// 基底クラスのコンストラクターを呼び出す前にソースを初期化します。
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// sourceSelector で定義された要素。
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// SelectorSourcedBehaviorBase に sourceSelector プロパティを返します
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">sourceSelector プロパティの値。</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// sourceSelector プロパティの値を設定します。これにより、指定された sourceSelector を持つすべての要素が見つかり、それらの要素に動作が適用されます。
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// sourceSelector プロパティの値。
						/// </param>
						this._sourceSelector = value || "";

						// 新しいソース セレクター値が古い値と同じ場合でも、すべてのソースを更新します
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// 要素を含む SelectorSourcedBehavior をアタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// 動作がアタッチされる要素。動作にソースが指定されていない場合、attached-element が動作のソースになります
					/// </param>

					// selectorSource がない場合は、この要素をソースとして使用する必要があります。
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
					/// SelectorSourcedBehavior をデタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// 動作がデタッチされた要素。
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// ソースを更新します。デタッチされている要素は、アタッチされた要素に追加されます。
							// アタッチされた要素の現在の数から 1 を引いた数を指定する必要があります。
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// ソースがこの動作から削除されるときに呼び出されます。派生クラスはこのメソッドをオーバーライドし、特定のタスクを実行できます。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// ソース要素。
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// 新しいソース要素がこの動作に追加されるときに呼び出されます。派生クラスはこのメソッドをオーバーライドし、特定のタスクを実行できます。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// ソース要素。
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// ソース要素に関連した情報を含むオブジェクトを返します。派生クラスはこれを使用して
					/// ソース要素ごとの情報を格納できます。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// ソース要素。
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// ソース要素のコレクションを返します。
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// アクションを発生させるターゲット要素のコレクションを返します。ソース要素が、アタッチされた
					/// 要素の 1 つの場合は、それがアクションを発生させる唯一の要素です。それ以外の場合は、
					/// アタッチされたすべての要素でアクションが発生します。
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// ソース要素。
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

					// アタッチされた要素が 1 つ以上ある場合のみ、新しいソースを作成します
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
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// TimerBehavior の具体的な実装です。これにより、タイマーのティックをリッスンし、アクション (指定されている場合) を発生させます。
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// VS.Behaviors.TimerBehavior の新しいインスタンスを初期化し、タイマーの作動時にアクションを発生させます。
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// 要素を含む TimerBehavior をアタッチし、_sourceselector が設定されていない場合にソースを設定します
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// 動作がアタッチされる要素。動作にソースが指定されていない場合、attached-element が動作のソースになります
					/// </param>

					// element 要素にすべてのアクションをアタッチします。これにより、まだ設定されていない場合はアクションにターゲットが設定されます。
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// TimerBehavior をデタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// 動作がデタッチされた要素。
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
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// EventTriggerBehavior の具体的な実装です。これにより、ソース要素でイベントをリッスンし、アクション (指定されている場合) を発生させます。
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// イベントを定義する VS.Behaviors.EventTriggerBehavior の新しいインスタンスを初期化し、イベントがトリガーされたときにアクションを発生させます。
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// 要素 (通常は element) を含む EventTriggerBehavior をアタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// ソース要素。
					/// </param>

					// イベントが "load" イベントの場合、読み込み時に (既に実行された) 動作のランタイムを初期化するために今すぐ発生させます
					if (this.event === "load") {
						// 引数をシミュレートして、手動で実行するアクションに渡します。
						// VS.Behaviors.processAll は、ページ ライフ サイクル中に複数回呼び出すことができます。
						// まだ "load" アクションを一度だけ実行する必要があります。特殊なマーカーを使用します。
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// 要素のリスナーを作成して記憶します
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// 実際のイベント名がある場合はイベントを要素にアタッチします
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// 要素のイベント リスナーを終了時に削除します。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// 動作の要素。
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
						/// EventTriggerBehavior にイベント プロパティを返します
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">イベント プロパティの値。</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// イベント プロパティの値を設定します。
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// イベント プロパティの値。
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
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
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
		/// RequestAnimationFrameBehavior の具体的な実装です。これにより、タイマーのティックをリッスンし、アクション (指定されている場合) を発生させます。
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// VS.Behaviors.RequestAnimationFrameBehavior の新しいインスタンスを初期化します
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// 要素を含む RequestAnimationFrameBehavior をアタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// 動作がアタッチされる要素。動作にソースが指定されていない場合、attached-element が動作のソースになります
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
					/// RequestAnimationFrameBehavior をデタッチします
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// 動作がデタッチされた要素。
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// アクションを呼び出します
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// 毎秒アニメーション フレームで requestAnimationFrame を呼び出します。
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// プロパティ メタデータ (JSON 解析用)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// VS の ActionTree ランタイム

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// アクションは既に読み込まれました。
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// この関数は ActionTree と [data-vs-interactivity] 属性を処理します
	function loadActionsImpl() {
		/*ハードコードされた actionlist json ファイル*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// actionList ファイルがある必要がないため、ここではエラーを生成しません。
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*既定の actionlist json ファイル*/
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

				// メタデータは JSON 解析中に名前プロパティが存在するよう強制します (アニメーションは、
				// 名前がない場合は作成されません)。重複している場合、より新しいバージョンが優先されます。
				// 以前のバージョン。
				var actionTreeName = actionTree.name;
				// 名前をキーとして使用し、各 actionTree をディクショナリに追加します。
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// actionList ファイルがある必要がないため、ここではエラーを生成しません。
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// アクションを要素からデタッチします
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// 既存のアクションを削除します
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// actionList ファイルがある必要がないため、ここではエラーを生成しません。
		}

	}

	// フラグメント内で定義された動作が初期化されてから、フラグメントが読み込まれるようにします。
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// 指定された要素の動作とアクションをアタッチしています
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// 有効な動作オブジェクトを取得した場合、それを解析します。
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

	// 要素から既存の動作をデタッチします
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

	// 動作のすべての実装を実際に処理します。これにより、すべての要素が処理されます
	// 各要素で data-vs-interactivity 属性と呼び出しが作成されます。
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// アクションが存在する場合は最初に読み込みます
		loadActions();

		// [data-vs-interactivity] 属性を処理します。
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// 上記の属性を持つ要素を検索し、関連付けられた動作をアタッチします。
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// 最初に既存の動作をデタッチします
		detach(element);
		// ここで新しい動作をアタッチします
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// 新しいアクションの読み込みを試みます。 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// アクションの *.json が無効である可能性があります。
			return; 
		}

		// 更新する要素のコピーを取得します。
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// 現在のアクションを登録解除し、新しいアクションを登録します。
		resetImpl();
		registerActions(actionTreeList);

		// タッチした要素で動作をアタッチしました。
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// "VS.Behaviors" 名前空間のメンバーを確立します
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// 指定されたルート要素から開始して、宣言動作のバインドをすべての要素に適用します。
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// data-vs-interactivity 属性の処理を開始する要素
			/// このパラメーターが指定されていない場合、バインドはドキュメント全体に適用されます。
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// 宣言動作のバインドを要素に適用します。
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// data-vs-interactivity 属性の処理を開始する要素
			/// このパラメーターが指定されていない場合、バインドはドキュメント全体に適用されます。
			/// </param>

			// これが最初に処理する要素の場合、アクションを読み込む必要があります
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// アクションを要素からデタッチし、読み込まれたすべてのアクションを削除します。
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// processAll によって処理された要素で動作を更新します。
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// 指定された要素にアタッチされた behaviorInstances の配列を返します。
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// 動作インスタンスの所得対象となる要素。
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">要素にアタッチされた動作インスタンスの配列。</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// 動作インスタンスの配列を要素に設定します。
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// 動作インスタンスが設定される要素。
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// 指定された要素に追加する現在の動作インスタンス
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// 通常、ドキュメントが読み込まれると processAll を実行します。ただし、読み込まれた
	// ドキュメントの後にこのスクリプトが追加される場合 (たとえば、WinJS ナビゲーションまたは
	// その他の JS の結果によってスクリプトが追加された場合)、すぐに processAll を実行する必要があります。
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// VS の ActionTree ランタイム

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// すべての部分を確認して WinJs が存在するかどうかを確認します。
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// WinJS テンプレートのレンダリングをインストルメント化します。
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

			// WinJS.UI をインストルメント化します。
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

			// WinJS.UI.Fragments をインストルメント化します。
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

	// 通常、このスクリプトは WinJS スクリプトの後に配置されます。したがって、WinJS をインストルメント化するには "今" が最適です。
	instrumentWinJsOnDemand();

	// WinJS がインストルメント化されない場合は、このスクリプトが WinJS の前に位置するか、WinJS がありません。
	// ドキュメントが読み込まれるときに WinJS のインストルメント化を試行します (読み込まれたドキュメントの後にこのスクリプトが追加されている場合は除く)。
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


