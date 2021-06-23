/*! © Microsoft. All rights reserved. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// 이러한 함수는 네임스페이스를 정의하는 WinJS 기능을 제공합니다.
/// 또한 전역 네임스페이스에 VS를 추가합니다.

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
			/// 지정한 부모 네임스페이스 아래에서 지정된 이름으로 새 네임스페이스를 정의합니다.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// 부모 네임스페이스입니다.
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// 새 네임스페이스의 이름입니다.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// 새 네임스페이스의 멤버입니다.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// 새로 정의된 네임스페이스입니다.
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
			/// 지정한 이름을 가진 새 네임스페이스를 정의합니다.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// 네임스페이스의 이름입니다. 중첩된 네임스페이스를 점으로 구분한 이름이 될 수 있습니다.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// 새 네임스페이스의 멤버입니다.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// 새로 정의된 네임스페이스입니다.
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// "VS.Namespace" 네임스페이스의 멤버를 설정합니다.
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// 이러한 함수는 클래스를 정의하고 클래스에서 파생하는 WinJS 기능을 제공합니다.

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// 클래스에 속성 메타데이터를 추가합니다(지정된 경우). 기본에 대해 정의된 메타데이터를 포함합니다.
		// 클래스 먼저(이 클래스의 메타데이터에 의해 재정의될 수 있음).
		//
		// 메타데이터의 예:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// "type"은 JavaScript intellisense 주석에 대한 규칙을 따릅니다. 항상 지정해야 합니다.
		// "type"이 "Array"인 경우 "elementType"을 지정해야 합니다.
		// "required"의 기본값은 "false"입니다.

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
		/// 지정한 생성자 및 인스턴스 멤버를 사용하여 클래스를 정의합니다.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// 이 클래스를 인스턴스화하는 데 사용되는 생성자 함수입니다.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// 클래스에서 사용할 수 있는 인스턴스 필드, 속성 및 메서드 집합입니다.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// 클래스에서 사용할 수 있는 정적 필드, 속성 및 메서드 집합입니다.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// 클래스의 속성을 설명하는 메타데이터입니다. 이 메타데이터는 JSON 데이터의 유효성을 검사하는데 사용되므로
		/// JSON에 나타날 수 있는 유형에만 사용할 수 있습니다. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// 새로 정의된 클래스입니다.
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
		/// prototypal 상속을 사용하여 제공된 baseClass 매개 변수를 기준으로 하위 클래스를 만듭니다.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// 상속할 원본 클래스입니다.
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// 이 클래스를 인스턴스화하는 데 사용되는 생성자 함수입니다.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// 클래스에서 사용할 수 있는 인스턴스 필드, 속성 및 메서드 집합입니다.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// 클래스에서 사용할 수 있도록 할 정적 필드, 속성 및 메서드 집합입니다.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// 클래스의 속성을 설명하는 메타데이터입니다. 이 메타데이터는 JSON 데이터의 유효성을 검사하는데 사용되므로
		/// JSON에 나타날 수 있는 유형에만 사용할 수 있습니다. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// 새로 정의된 클래스입니다.
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
		/// 지정한 생성자 및 모든 mixin 개체에서 지정한 일련의 인스턴스 멤버 공용 구조체를 사용하여
		/// 클래스를 정의합니다. mixin 매개 변수 목록은 가변 길이 형식입니다.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// 이 클래스를 인스턴스화하는 데 사용되는 생성자 함수입니다.
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// 새로 정의된 클래스입니다.
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// "VS.Class" 네임스페이스의 멤버를 설정합니다.
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
			/// 지정한 리소스 ID가 있는 리소스 문자열을 검색합니다.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// 검색할 문자열의 리소스 ID입니다.
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// 이러한 속성을 포함할 수 있는 개체입니다.
			/// 
			/// 값:
			/// 요청한 문자열의 값입니다. 이 속성은 항상 표시됩니다.
			/// 
			/// 비어 있음:
			/// 요청한 문자열을 찾았는지 여부를 지정하는 값입니다.
			/// true인 경우 문자열을 찾지 못한 것입니다. false 또는 undefined인 경우
			/// 요청한 문자열을 찾은 것입니다.
			/// 
			/// 언어:
			/// 문자열의 언어입니다(지정된 경우). 이 속성은 다중 언어 리소스에
			/// 대해서만 표시됩니다.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "\"{0}\"속성은 {1}에 필요하지 않습니다.",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: 찾은 형식: {2}, 예상 형식: {3}.",
				"VS.Util.JsonPropertyMissing": "필수 속성 \"{0}.{1}\"이(가) 없거나 잘못되었습니다.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: 찾은 형식: {3}, 예상 형식: {4}.",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}]이(가) 없거나 잘못되었습니다.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: 찾은 형식: {2}, 예상 형식: 문자열(선택: {3}).",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: 잘못된 값입니다. 찾은 값: {2}, 예상 값: {3}.",
				"VS.Util.NoMetadataForType": "{0} 형식에 대한 속성 메타데이터를 찾을 수 없습니다.",
				"VS.Util.NoTypeMetadataForProperty": "{0}.{1}에 대한 형식 메타데이터가 지정되지 않았습니다.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "{0}.{1}[]에 대한 요소 형식 메타데이터가 지정되지 않았습니다.",
				"VS.Resources.MalformedFormatStringInput": "형식이 잘못되었습니다. '{0}'을(를) 취소하시겠습니까?",
				"VS.Actions.ActionNotImplemented": "사용자 지정 작업은 실행 메서드를 구현하지 않습니다.",
				"VS.ActionTrees.JsonNotArray": "ActionTrees JSON 데이터는 배열({0})이어야 합니다.",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "중복된 작업 트리 이름 \"{0}\"({1})입니다.",
				"VS.Animations.InvalidRemove": "그룹에 포함된 애니메이션 인스턴스에서 remove를 호출하지 마십시오.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// {n} 형태의 토큰을 지정한 매개 변수로 바꾸도록 문자열 서식을 지정합니다. 예를 들면 다음과 같습니다.
			/// 'VS.Resources.formatString("I have {0} fingers.", 10)'는 "I have 10 fingers."로 반환됩니다.
			/// </summary>
			/// <param name="string">
			/// 서식을 설정할 문자열입니다.
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
			return "정의되지 않음";
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// 예제: formatMessage(["state: '{0}', id: {1}", "ON", 23])는 "상태: 'ON', ID: 23"을 반환합니다.
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
				/// 함수가 선언된 처리와 호환되도록 표시합니다(예: WinJS.UI.processAll
				/// 또는 WinJS.Binding.processAll).
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// 선언된 처리와 호환되도록 표시할 함수입니다.
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// 입력 함수입니다.
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
			/// 지정한 요소와 연결된 데이터 값을 가져옵니다.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// 요소입니다.
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// 이 요소와 연결된 값입니다.
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// 인수에 경로가 지정된 파일의 문자열 콘텐츠를 반환합니다.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// 파일 경로입니다.
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// 파일의 문자열 콘텐츠입니다.
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// IE의 XMLHttpRequest 개체에서 로컬 파일 시스템에 대한 액세스를 허용하지 않으므로 대신 ActiveX 컨트롤을 사용하십시오.
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
			/// configBlock을 구문 분석하고 유효한 인스턴스가 반환된 경우 구문 분석된 값이 
			/// 인스턴스의 속성으로 설정됩니다.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// configBlock(JSON) 구조체입니다.
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// configBlock을 기준으로 속성이 설정된 인스턴스입니다.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// 구성 블록을 기준으로 만든 인스턴스입니다.
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
			/// JSON 데이터 구조체를 구문 분석하는 동안 JSON.Parse 메서드의 최종 결과의 모든 수준에서 모든 키 및 값에 대해 호출될 함수입니다. 
			/// 각 값은 reviver 함수의 결과로 대체됩니다. 일반 개체를 의사 클래스의 인스턴스로 개정하는 데 사용할 수 있습니다.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// JSON 파서에서 구문 분석 중인 현재 키입니다.
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// JSON 파서에서 구문 분석 중인 키의 현재 값입니다.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// 키의 값을 나타내는 실제 의사 클래스입니다.
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// 유형이 null이 아니고 함수(생성자)인지 확인합니다.
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// 지정된 문자열 리소스 및 대체의 가변 길이 목록을 사용하여 콘솔에 대한 오류를
			/// 보고합니다.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// 고유한 오류 식별자입니다. "[namespace].[identifier]" 형태여야 합니다. 표시된 오류
			/// 메시지에는 이 식별자와, 문자열 리소스 테이블(문자열이 있는 경우)에서 조회하여
			/// 반환한 문자열이 포함됩니다.
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
			/// 지정된 문자열 리소스 및 대체의 가변 길이 목록을 사용하여 콘솔에 대한 경고를
			/// 보고합니다.
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// 고유한 오류 식별자입니다. "[namespace].[identifier]" 형태여야 합니다. 표시된 오류
			/// 메시지에는 이 식별자와, 문자열 리소스 테이블(문자열이 있는 경우)에서 조회하여
			/// 반환한 문자열이 포함됩니다.
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
			/// 지정된 문자열 리소스 및 .NET 문자열 형식 지정을 따르는 대체의 가변 길이 목록을
			/// 사용하여 경고를 보고합니다. 예:
			/// outputDebugMessage("state: '{0}', id: {1}", "ON", 23)는 "state: 'ON', id: 23"을 추적합니다.
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
		/// 작업 추적을 사용하거나 사용하지 않습니다. 진단용으로 사용됩니다.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// 작업 정보를 추적합니다. 인수는 .NET 문자열 형식 지정 표기법을 따릅니다. 예를 들면 다음과 같습니다.
			/// VS.Util.trace("Action: '{0}', id: {1}", "set", 23)는 "작업: 'set', ID: 23"을 추적합니다.
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// 일반 JavaScript 개체를 지정한 형식으로 변환하는 도우미 함수입니다. 형식에서 메타데이터를
		// 제공하는지 확인합니다.

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

		// 필수 속성이 모두 있는지 확인합니다.
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
				// 형식이 일치하므로 설정하십시오.
				object[propertyName] = validatedValue;
			}
		} else {
			// 메타데이터가 없거나(이 경우 오류가 이미 표시됨
			// 메타데이터는 있지만 이 속성을 정의하지 않았거나(이 경우 예상치 못한 속성으로
			// 처리함) 속성의 메타데이터가 해당 형식을 정의하지 않습니다(이 경우
			// 메타데이터 형식이 잘못된 것으로 간주함). 뒤의 두 시나리오에 대한 적절한 오류를 표시합니다.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// 어느 쪽이든 상관없이 속성을 가지고 있는 값으로 설정합니다.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// 속성 값이 필수 형식인지 확인합니다. 그렇지 않은 경우 변환합니다(가능한 경우). 변환할 수 없으면
		// null을 반환합니다.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// 가능한 경우 항목을 형식으로 강제 변환합니다.
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// 그렇지 않은 경우 형식에 변환기가 있는지 확인합니다.
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
			// 필수 형식을 열거형으로 간주합니다.

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "문자열")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("메타데이터에 대해 " + requiredPropertyType + " 유효성을 검사할 때는 형식을 처리하지 않습니다.");
		}
	}

	function getObjectTypeDescription(object) {
		// 해당 생성자 함수를 통해 친숙한 형식 설명을 표시하는 도우미 함수입니다(생성자
		// 함수의 이름 필요) - 오류 메시지에 사용됩니다.

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// 가독성을 위해 생성자 함수 이름이 '_ctor'로 끝나면 지우십시오.
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
		/// VS 작업 런타임에서 수행하는 모든 작업에 대한 기본 클래스입니다.
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// 작업을 정의하는 VS.Actions.ActionBase의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// AddClassAction의 대상 속성을 가져오거나 설정합니다.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// targetSelector가 없으면 targetElements를 반올림하고, 그렇지 않으면 querySelectorAll(targetSelector)을 반올림합니다.
					/// 사용자 지정 작업은 이 메서드를 사용해서 작업을 적용할 대상 요소 목록을 수정할 수 있습니다.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// 이 작업을 실행할 요소의 컬렉션입니다. 이 컬렉션은 소유자 동작
					/// 개체로 생성됩니다. 이러한 동작 세부 정보는 연결된 요소 및 원본 선택기로
					/// 고려됩니다. 작업 대상 선택기와 같은 작업별 세부 정보는 고려하지 않습니다.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// 모든 대상 요소에 대한 작업을 실행합니다.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// 이 작업을 실행할 요소의 컬렉션입니다. 이 컬렉션은 소유자 동작
					/// 개체로 생성됩니다. 이러한 동작 세부 정보는 연결된 요소 및 원본 선택기로
					/// 고려됩니다. 작업 대상 선택기와 같은 작업별 세부 정보는 고려하지 않습니다.
					/// ExecuteAll 메서드는 동작 대상 요소를 해당 고유 대상으로 조정하고 조정된 대상에
					/// 대한 작업을 실행합니다.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// 동작에 의해 제공된 선택적 정보입니다. 예를 들어 EventTriggerBehavior는 이를 사용해서 이벤트를 전달합니다.
					/// </param>

					try {
						// 수신 목록과 다를 수 있는 대상 요소의 실제 목록을 가져옵니다.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// 한 요소에 대한 작업을 실행합니다. 파생된 작업은 이를 재정의해야 합니다. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// 동작에 의해 제공된 선택적 정보입니다. 예를 들어 EventTriggerBehavior는 이를 사용해서 이벤트를 전달합니다.
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
		/// elementsToRemove 선택기 속성에서 참조할 모든 요소를 제거하는 RemoveElementsAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// RemoveElementsAction을 정의하는 VS.Actions.RemoveElementsAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// RemoveElementsAction의 elementsToRemove 속성을 가져오거나 설정합니다.
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
					/// DOM에서 요소를 제거합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// parentElement 선택기 속성에서 참조할 모든 요소의 자식을 제거하는 RemoveChildrenAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// RemoveChildrenAction을 정의하는 VS.Actions.RemoveChildrenAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// RemoveChildrenAction의 parentElement 속성을 가져오거나 설정합니다.
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
					/// 요소에서 모든 자식을 제거합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 요소 속성에서 지정한 요소의 클래스 특성을 설정/해제하는 ToggleClassAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// ToggleClassAction을 정의하는 VS.Actions.ToggleClassAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// ToggleClassAction의 className 속성을 가져오거나 설정합니다.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// 작업 트리가 트리거될 때 작업을 실행합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// 클래스가 없으면 추가합니다.
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// 그렇지 않으면 클래스를 제거합니다.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 요소 속성에서 지정한 요소의 클래스 특성을 수정하는 AddClassAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// AddClassAction을 정의하는 VS.Actions.AddClassAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// AddClassAction의 className 속성을 가져오거나 설정합니다.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// 작업 트리가 트리거될 때 작업을 실행합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
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
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 요소 속성에서 지정한 요소의 클래스 특성을 수정하는 RemoveClassAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// RemoveClassAction을 정의하는 VS.Actions.RemoveClassAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// RemoveClassAction의 className 속성을 가져오거나 설정합니다.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// 요소의 클래스 이름에서 클래스 이름을 제거합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// 클래스 특성 반환이 없는 경우
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// 이 요소에는 필수 클래스가 있으므로 newClasses 컬렉션에 추가하지 마십시오.
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* 공백을 구분자로 사용하여 배열 콘텐츠를 조인합니다. */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// attribute를 targetSelector 속성에서 참조하는 요소의 attribute 값으로 설정하는 SetHTMLAttributeAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// SetHTMLAttributeAction을 정의하는 VS.Actions.SetHTMLAttributeAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// SetHTMLAttributeAction의 attribute 속성을 가져오거나 설정합니다.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// SetHTMLAttributeAction의 attributeValue 속성을 가져오거나 설정합니다.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// HTML 특성 값을 설정합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// styleProperty를 targetSelector 속성에서 참조하는 요소의 styleValue 값으로 설정하는 SetStyleAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// SetStyleAction을 정의하는 VS.Actions.SetStyleAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// SetStyleAction의 styleProperty 속성을 가져오거나 설정합니다.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// SetStyleAction의 styleValue 속성을 가져오거나 설정합니다.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// 인라인 CSS 속성 값을 설정합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 페이지를 로드하여 targetSelector 속성에서 지정한 요소에 추가하는 LoadPageAction의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// LoadPageAction을 정의하는 VS.Actions.LoadPageAction의 새 인스턴스를 초기화합니다.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// LoadPageAction의 page 속성을 가져오거나 설정합니다.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// 페이지가 로드될 때 발생시킬 작업 목록입니다.
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// 페이지 내용을 요소에 로드합니다.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// 이 작업을 실행할 요소입니다.
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// 새로 로드한 페이지의 동작을 처리하려면 WinJS.UI.processAll을 호출합니다.
								WinJS.UI.processAll(originalElement);

								// 배열에서 각 작업에 대한 실행을 호출하고 비어 있는 대상 요소 배열에 전달합니다.
								// 작업이 targetSelector를 지정하지 않을 경우 작업이 실행되지 않습니다. 그렇지 않으면
								// targetSelector 요소에 대해 작업이 실행됩니다.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// 오류를 처리합니다.
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 모든 동작의 기본 클래스입니다.
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// 동작을 정의하는 VS.Behaviors.BehaviorBase의 새 인스턴스를 초기화합니다.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// 구성 블록을 기준으로 개체 속성을 만듭니다.
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// 동작의 첨부 파일입니다.
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
				// element.uniqueID가 키로 포함된 연결된 요소의 맵입니다.
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// 맵에서 요소 추출
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
				/// 이벤트가 트리거될 때 발생시킬 작업 목록입니다.
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// 작업(일반적으로 소스)을 요소에 연결합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// 동작이 연결된 요소입니다.
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
					/// 동작을 분리합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// 동작을 분리할 요소입니다.
					/// </param>
					if (element) {
						// VS.Behaviors._behaviorInstances에서 요소 제거
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
					/// 요소가 동작에 연결될 때 호출됩니다. 요소가 이 동작에 이미 연결되어
					/// 있으면 이 메서드가 호출되지 않습니다. 파생된 클래스는
					/// 특정 연결 작업을 수행하기 위해 이 메서드를 재정의합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// 연결된 요소입니다.
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// 요소가 동작에서 분리되기 전에 호출됩니다. 요소가 이미 분리되어 있으면
					/// 이 메서드가 호출되지 않습니다. 파생된 클래스는 특정 분리 작업을 수행하기 위해
					/// 이 메서드를 재정의합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// 분리할 요소입니다.
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// 모든 대상 요소에 대한 작업을 실행합니다.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// 작업을 실행할 요소의 컬렉션입니다.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// 동작에 의해 제공된 선택적 정보입니다. 예를 들어 EventTriggerBehavior는 이를 사용해서 이벤트를 전달합니다.
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
		/// 선택기가 있는 모든 동작의 기본 클래스입니다.
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// 기본 클래스 생성자를 호출하기 전에 원본을 초기화합니다.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// sourceSelector에 의해 정의된 요소입니다.
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// SelectorSourcedBehaviorBase의 sourceSelector 속성을 반환합니다.
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">sourceSelector 속성의 값입니다.</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// sourceSelector 속성의 값을 설정합니다. 지정한 sourceSelector가 있는 모든 요소를 찾아 이러한 요소에 Behavior를 적용합니다.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// sourceSelector 속성의 값입니다.
						/// </param>
						this._sourceSelector = value || "";

						// 새 원본 선택기 값이 이전 값과 동일하더라도 모든 원본을 새로 고칩니다.
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// SelectorSourcedBehavior를 요소에 연결합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// 동작이 연결된 요소입니다. 동작에 지정된 소스가 없으면 연결된 요소가 동작의 소스가 됩니다.
					/// </param>

					// selectorSource가 없으면 이 요소를 원본으로 사용해야 합니다.
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
					/// SelectorSourcedBehavior를 분리합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// 동작이 분리된 요소입니다.
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// 원본을 새로 고칩니다. 분리 중인 요소도 여전히 연결된 요소로 계산됩니다.
							// 현재 연결된 요소 수에서 1을 뺀 값을 제공해야 합니다.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// 이 동작에서 원본을 제거할 때 호출됩니다. 파생된 클래스는 특정 작업을 수행하기 위해 이 메서드를 재정의할 수 있습니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// 원본 요소입니다.
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// 새 원본 요소가 이 동작에 추가될 때 호출됩니다. 파생된 클래스는 특정 작업을 수행하기 위해 이 메서드를 재정의할 수 있습니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// 원본 요소입니다.
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// 원본 요소 관련 정보가 포함된 개체를 반환합니다. 파생된 클래스는 이를 사용해서
					/// 원본별 요소 정보를 저장할 수 있습니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// 원본 요소입니다.
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// 원본 요소의 컬렉션을 반환합니다.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// 작업을 실행할 대상 요소의 컬렉션을 반환합니다. 원본 요소가 연결된 요소 중 하나인
					/// 경우 작업을 실행할 유일한 요소입니다. 그렇지 않으면
					/// 모든 연결된 요소에서 작업을 실행해야 합니다.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// 원본 요소입니다.
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

					// 연결된 요소가 하나 이상 있는 경우에만 새 원본을 만듭니다.
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
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 타이머 틱을 수신하고 지정된 경우 작업을 발생시키는 TimerBehavior의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// VS.Behaviors.TimerBehavior의 새 인스턴스를 초기화하고 타이머 틱에 작업을 발생시킵니다.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// TimerBehavior를 요소와 연결하고 no _sourceselector가 설정된 경우 소스를 설정합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// 동작이 연결된 요소입니다. 동작에 지정된 소스가 없으면 연결된 요소가 동작의 소스가 됩니다.
					/// </param>

					// 모든 작업을 요소에 연결합니다. 그러면 아직 설정되지 않은 경우 작업들에 대상이 설정됩니다.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// TimerBehavior를 분리합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// 동작이 분리된 요소입니다.
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
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 소스 요소의 이벤트를 수신하고 지정된 경우 작업을 발생시키는 EventTriggerBehavior의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// 이벤트를 정의하는 VS.Behaviors.EventTriggerBehavior의 새 인스턴스를 초기화하고 이벤트가 트리거될 때 작업을 발생시킵니다.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// EventTriggerBehavior를 요소(일반적으로 요소)에 연결합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// 원본 요소입니다.
					/// </param>

					// 이벤트가 "load" 이벤트인 경우 로드 시 동작 런타임을 초기화하므로 지금 발생시킵니다(이미 발생됨).
					if (this.event === "load") {
						// 인수를 시뮬레이션하고 수동으로 발생시킨 작업에 전달합니다.
						// VS.Behaviors.processAll은 페이지 수명 주기 동안 여러 번 호출할 수 있습니다.
						// "로드" 작업을 한 번만 실행하는 것이 좋기 때문에 특수 마커를 사용하겠습니다.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// 요소에 대한 새 수신기를 만들고 이를 기억합니다.
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// 실제 이벤트 이름이 있으면 요소에 이벤트를 연결합니다.
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// 요소에 대한 이벤트 수신기가 사라지면 이를 제거합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// 동작의 요소입니다.
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
						/// EventTriggerBehavior의 event 속성을 반환합니다.
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">event 속성의 값입니다.</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// event 속성의 값을 설정합니다.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// event 속성의 값입니다.
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
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
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
		/// 타이머 틱을 수신하고 지정된 경우 작업을 발생시키는 RequestAnimationFrameBehavior의 구체적 구현입니다.
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// VS.Behaviors.RequestAnimationFrameBehavior의 새 인스턴스를 초기화합니다.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// RequestAnimationFrameBehavior를 요소에 연결합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// 동작이 연결된 요소입니다. 동작에 지정된 소스가 없으면 연결된 요소가 동작의 소스가 됩니다.
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
					/// RequestAnimationFrameBehavior를 분리합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// 동작이 분리된 요소입니다.
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// 작업을 호출합니다.
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// 초당 애니메이션 프레임에 requestAnimationFrame을 호출합니다.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 속성 메타데이터(JSON 구문 분석)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// VS용 ActionTree 런타임

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// 이미 로드된 작업입니다.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// 이 함수는 ActionTree 및 [data-vs-interactivity] 특성을 처리합니다.
	function loadActionsImpl() {
		/*하드코딩된 작업 목록 JSON 파일*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// actionList 파일이 표시되지 않아도 되므로 여기서는 오류가 생성되지 않습니다.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*기본 actionlist json 파일*/
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

				// 메타데이터가 JSON 구문 문석 중 name 속성이 강제 표시되게 합니다(이름이 없는 경우
				// 애니메이션이 만들어지지 않음). 중복 항목이 있으면 나중 버전이 이전 버전을
				// 재정의합니다.
				var actionTreeName = actionTree.name;
				// 같은 이름의 키를 가진 딕셔너리에 각 actionTree를 추가합니다.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// actionList 파일이 표시되지 않아도 되므로 여기서는 오류가 생성되지 않습니다.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// 요소에서 작업 분리
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// 기존 작업 삭제
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// actionList 파일이 표시되지 않아도 되므로 여기서는 오류가 생성되지 않습니다.
		}

	}

	// 조각 내에서 정의된 동작이 조각 로드 전에 초기화되도록 합니다.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// 지정된 요소의 동작 및 작업을 연결하는 중입니다.
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// 유효한 동작 개체를 가져오면 구문 분석합니다.
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

	// 요소에서 기존 동작을 분리합니다.
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

	// 동작에 대한 모든 구현을 실제로 처리합니다. 이 경우 data-vs-interactivity 특성을 가진
	// 요소를 검사하고 각 요소에 대해 create를 호출합니다.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// 작업(있는 경우) 먼저 로드
		loadActions();

		// [data-vs-interactivity] 특성을 처리합니다.
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// 위의 특성을 가진 요소를 찾아 관련 동작을 연결합니다.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// 먼저 기존 동작을 분리합니다.
		detach(element);
		// 이제 새 동작을 연결합니다.
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// 새 작업 로드를 시도합니다. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// 대부분의 경우 작업 *.json은 유효하지 않습니다.
			return; 
		}

		// 새로 고칠 요소 복사본을 가져옵니다.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// 현재 작업을 등록 취소하고 새 작업을 등록합니다.
		resetImpl();
		registerActions(actionTreeList);

		// 수정한 요소에 연결된 동작입니다.
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// "VS.Behaviors" 네임스페이스의 멤버를 설정합니다.
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// 지정한 루트 요소부터 모든 요소를 바인딩하는 선언적 동작을 적용합니다.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// data-vs-interactivity 특성 처리를 시작할 요소입니다.
			/// 이 매개 변수를 지정하지 않은 경우 바인딩이 전체 문서에 적용됩니다.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// 선언적 동작 바인딩을 요소에 적용합니다.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// data-vs-interactivity 특성 처리를 시작할 요소입니다.
			/// 이 매개 변수를 지정하지 않은 경우 바인딩이 전체 문서에 적용됩니다.
			/// </param>

			// 처리할 첫 번째 요소인 경우 작업을 로드해야 합니다.
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// 요소에서 작업을 분리하고 로드된 모든 작업을 제거합니다.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// processAll로 처리된 요소에서 동작을 새로 고칩니다.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// 지정한 요소에 연결된 behaviorInstances의 배열을 반환합니다.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// 동작 인스턴스를 가져온 요소입니다.
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">요소에 연결된 동작 인스턴스의 배열입니다.</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// 동작 인스턴스의 배열을 요소로 설정합니다.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// 동작 인스턴스를 설정할 요소입니다.
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// 지정한 요소에 추가할 현재 동작 인스턴스입니다.
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// 일반적으로 문서가 로드된 다음 processAll을 수행합니다. 하지만 문서가 로드된 다음
	// 이 스크립트가 추가되었으면(예: WinJS 탐색 또는 여기에 추가된 기타 JS의 결과)
	// processAll을 즉시 수행해야 합니다.
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// VS용 ActionTree 런타임

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// 해당 조각을 모두 확인하여 WinJs가 있는지 확인합니다.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// WinJS 템플릿 렌더링을 계측합니다.
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

			// WinJS.UI를 계측합니다.
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

			// WinJS.UI.Fragments를 계측합니다.
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

	// 일반적으로 이 스크립트는 WinJS 스크립트 다음에 배치됩니다. 따라서 WinJS를 계측하기에는 "지금"이 가장 적합한 시간입니다.
	instrumentWinJsOnDemand();

	// WinJS가 계측되지 않았으면 이 스크립트가 WinJS 앞에 오거나 WinJS가 없습니다. 여기에서는
	// 문서가 로드될 때(문서가 로드된 다음 이 스크립트가 추가되지 않은 한) WinJS를 계측합니다.
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


