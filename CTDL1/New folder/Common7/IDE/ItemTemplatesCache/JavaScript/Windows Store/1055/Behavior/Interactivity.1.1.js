/*! © Microsoft. Tüm hakları saklıdır. */
//js\RuntimeInit.js
(function (global) {
	global.VS = global.VS || { };
	global._VSGlobal = global;
})(this);


//js\Blend.js
/// Bu işlevler, Ad Alanı tanımlama WinJS işlevini sağlar.
/// Genel ad alanına VS de ekler.

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
			/// Belirtilen üst ad alanı altında belirtilen ad ile yeni bir ad alanı tanımlar.
			/// </summary>
			/// <param name="parentNamespace" type="Object" locid="VS.Namespace.defineWithParent_p:parentNamespace">
			/// Üst ad alanı.
			/// </param>
			/// <param name="name" type="String" locid="VS.Namespace.defineWithParent_p:name">
			/// Yeni ad alanının adı.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.defineWithParent_p:members">
			/// Yeni ad alanının üyeleri.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.defineWithParent_returnValue">
			/// Yeni tanımlanan ad alanı.
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
			/// Belirtilen ad ile yeni bir ad alanı tanımlar.
			/// </summary>
			/// <param name="name" type="String" locid="VS.Namespace.define_p:name">
			/// Ad alanının adı. Bu, iç içe geçmiş ad alanları için noktayla ayrılan bir ad olabilir.
			/// </param>
			/// <param name="members" type="Object" locid="VS.Namespace.define_p:members">
			/// Yeni ad alanının üyeleri.
			/// </param>
			/// <returns type="Object" locid="VS.Namespace.define_returnValue">
			/// Yeni tanımlanan ad alanı.
			/// </returns>

			return defineWithParent(global, name, members);
		}

		// "VS.Namespace" ad alanının üyelerini oluştur
		Object.defineProperties(VS.Namespace, {
			defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

			define: { value: define, writable: true, enumerable: true, configurable: true },

			initializeProperties: { value: initializeProperties, writable: true, enumerable: true, configurable: true },
		});
	})(global.VS);
})(_VSGlobal);

//js\Class.js
/// Bu işlevler, Sınıf tanımlama ve Sınıftan türetme WinJS işlevini sağlar

/// <reference path="VS.js" />
/// <reference path="Util.js" />
(function (VS) {
	"use strict";

	function processMetadata(metadata, thisClass, baseClass) {
		// Sınıfa özellik meta verilerini ekler (belirtilmemişse). Taban için tanımlanmış meta verilerini dahil eder
		// önce sınıf (bu sınıf için meta verileri tarafından geçersiz kılınmış olabilir).
		//
		// Örnek meta veriler:
		//
		// 	{
		// 		name: { type: String, required: true },
		// 		animations: { type: Array, elementType: Animations.SelectorAnimation }
		// 	}
		//
		// "tür" JavaScript intellisense açıklamaları için kuralları uygular. Her zaman belirtilmelidir.
		// "Tür" "Dizi" ise, "elementType" belirtilmelidir.
		// "gerekli" varsayılan olarak "false" değerindedir.

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
		/// Verilen oluşturucuyu ve belirtilen örnek üyelerini kullanarak bir sınıf tanımlar.
		/// </summary>
		/// <param name="constructor" type="Function" locid="VS.Class.define_p:constructor">
		/// Bu sınıfı oluşturmak için kullanılan oluşturucu işlevi.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.define_p:instanceMembers">
		/// Bu sınıfta sunulan örnek alanlarının, özelliklerin ve yöntemlerin kümesi.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.define_p:staticMembers">
		/// Bu sınıfta sunulan statik alanların, özelliklerin ve yöntemlerin kümesi.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.define_p:metadata">
		/// Sınıfın özelliklerini açıklayan meta veriler. Bu meta veriler JSON verilerini doğrulamak için kullanılır
		/// ve yalnızca JSON'da görünebilen türler için kullanışlıdır. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.define_returnValue">
		/// Yeni tanımlanan sınıf.
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
		/// Prototip devralma kullanarak sağlanan baseClass parametresine göre bir alt sınıf oluşturur.
		/// </summary>
		/// <param name="baseClass" type="Function" locid="VS.Class.derive_p:baseClass">
		/// Devralınacak sınıf.
		/// </param>
		/// <param name="constructor" type="Function" locid="VS.Class.derive_p:constructor">
		/// Bu sınıfı oluşturmak için kullanılan oluşturucu işlevi.
		/// </param>
		/// <param name="instanceMembers" type="Object" locid="VS.Class.derive_p:instanceMembers">
		/// Bu sınıfta sunulacak örnek alanlarının, özelliklerin ve yöntemlerin kümesi.
		/// </param>
		/// <param name="staticMembers" type="Object" locid="VS.Class.derive_p:staticMembers">
		/// Bu sınıfta sunulacak statik alanların, özelliklerin ve yöntemlerin kümesi.
		/// </param>
		/// <param name="metadata" type="Object" locid="VS.Class.derive_p:metadata">
		/// Sınıfın özelliklerini açıklayan meta veriler. Bu meta veriler JSON verilerini doğrulamak için kullanılır
		/// ve yalnızca JSON'da görünebilen türler için kullanışlıdır. 
		/// </param>
		/// <returns type="Function" locid="VS.Class.derive_returnValue">
		/// Yeni tanımlanan sınıf.
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
		/// Verilen oluşturucuyu ve örnek üyeleri kümesinin birleşimini kullanarak bir sınıf tanımlar
		/// tüm mixin nesneleri tarafından belirtilir. Mixin parametre listesi değişken uzunluktadır.
		/// </summary>
		/// <param name="constructor" locid="VS.Class.mix_p:constructor">
		/// Bu sınıfı oluşturmak için kullanılan oluşturucu işlevi.
		/// </param>
		/// <returns type="Function" locid="VS.Class.mix_returnValue">
		/// Yeni tanımlanan sınıf.
		/// </returns>

		constructor = constructor || function () { };
		var i, len;
		for (i = 1, len = arguments.length; i < len; i++) {
			VS.Namespace.initializeProperties(constructor.prototype, arguments[i]);
		}
		return constructor;
	}

	// "VS.Class" ad alanının üyelerini oluştur
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
			/// Belirtilen kaynak kimliğine sahip kaynak dizesini alır.
			/// </summary>
			/// <param name="resourceId" type="Number" locid="VS.Resources.getString._p:resourceId">
			/// Alınacak dizenin kaynak kimliği.
			/// </param>
			/// <returns type="Object" locid="VS.Resources.getString_returnValue">
			/// Bu özellikleri alabilen bir nesne:
			/// 
			/// değer:
			/// İstenen dizenin değeri. Bu özellik her zaman mevcuttur.
			/// 
			/// boş:
			/// İstenen dizenin bulunup bulunmadığını belirten bir değer.
			/// Doğruysa, dize bulunamadı. Yanlış veya tanımlanmamışsa,
			/// istenen dize bulundu.
			/// 
			/// dil:
			/// Belirtilmişse dizenin dili. Bu özellik yalnızca çok
			/// dilli kaynaklar için mevcuttur.
			/// 
			/// </returns>

			var strings =
			{
				"VS.Util.JsonUnexpectedProperty": "\"{0}\" özelliği {1} için beklenmiyor.",
				"VS.Util.JsonTypeMismatch": "{0}.{1}: Bulunan tür: {2}; Beklenen tür: {3}.",
				"VS.Util.JsonPropertyMissing": "Gerekli \"{0}.{1}\" özelliği eksik veya geçersiz.",
				"VS.Util.JsonArrayTypeMismatch": "{0}.{1}[{2}]: Bulunan tür: {3}; Beklenen tür: {4}.",
				"VS.Util.JsonArrayElementMissing": "{0}.{1}[{2}] eksik veya geçersiz.",
				"VS.Util.JsonEnumValueNotString": "{0}.{1}: Bulunan tür: {2}; Beklenen tür: Dize (seçimi: {3}).",
				"VS.Util.JsonInvalidEnumValue": "{0}.{1}: Geçersiz değer. Bulunan: {2}; Beklenenlerden biri: {3}.",
				"VS.Util.NoMetadataForType": "{0} türü için özellik meta verisi bulunamadı.",
				"VS.Util.NoTypeMetadataForProperty": "{0}.{1} için tür meta verisi belirtilmedi.",
				"VS.Util.NoElementTypeMetadataForArrayProperty": "{0}.{1}[] için tür meta verisi belirtilmedi.",
				"VS.Resources.MalformedFormatStringInput": "Hatalı biçimlendirilmiş, '{0}'için kaçış eklemek mi istemiştiniz?",
				"VS.Actions.ActionNotImplemented": "Özel eylem, yürütme yöntemini uygulamıyor.",
				"VS.ActionTrees.JsonNotArray": "ActionTrees JSON verileri bir dizi olmalıdır ({0}).",
				"VS.ActionTrees.JsonDuplicateActionTreeName": "Yinelenen eylem ağacı adı \"{0}\" ({1}).",
				"VS.Animations.InvalidRemove": "Grupta yer alan animasyon örneğinde kaldırma işlemi çağırmayın.",
			};

			var result = strings[resourceId];
			return result ? { value: result } : { value: resourceId, empty: true };
		},

		formatString: function (string) {
			/// <summary>
			/// {n} biçimindeki belirteçleri belirtilen parametrelerle değiştirerek bir dizeyi biçimlendirir. Örneğin,
			/// 'VS.Resources.formatString("{0} parmağım var.", 10)' "10 parmağım var" ifadesini döndürür.
			/// </summary>
			/// <param name="string">
			/// Biçimlendirilecek dize.
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
			return "tanımsız";
		}
		if (value === null) {
			return "null";
		}
		if (typeof value === "object") {
			return JSON.stringify(value);
		}

		return value.toString();
	}

	// Örnek: formatMessage(["state: '{0}', id: {1}", "ON", 23]), "state: 'ON', id: 23" döndürecektir
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
				/// WinJS.UI.processAll veya WinJS.Binding.processAll gibi bir işlevi bildirime dayalı işleme ile
				/// uyumlu olarak işaretler.
				/// </summary>
				/// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
				/// Bildirime dayalı işleme ile uyumlu olarak işaretlenecek işlev.
				/// </param>
				/// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
				/// Giriş işlevi.
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
			/// Belirtilen öğeyle ilişkilendirilmiş veri değerini alır.
			/// </summary>
			/// <param name="element" type="HTMLElement" locid="VS.Util.data_p:element">
			/// Öğe.
			/// </param>
			/// <returns type="Object" locid="VS.Util.data_returnValue">
			/// Öğeyle ilişkili değer.
			/// </returns>

			if (!element[VS.Util._dataKey]) {
				element[VS.Util._dataKey] = {};
			}
			return element[VS.Util._dataKey];
		},

		loadFile: function (file) {
			/// <summary locid="VS.Util.loadFile">
			/// yolu bağımsız değişkende belirtilen dosyanın dize içeriğini döndürür.
			/// </summary>
			/// <param name="file" type="Function" locid="VS.Util.define_p:file">
			/// Dosya yolu
			/// </param>
			/// <returns type="string" locid="VS.Util.define_returnValue">
			/// Dosyanın dize içeriği.
			/// </returns>
			var req = new XMLHttpRequest();
			try {
				req.open("GET", file, false);
			} catch (e) {
				req = null;
				if (document.location.protocol === "file:") {
					// IE'nin XMLHttpRequest nesnesi yerel dosya sistemine erişime izin vermeyecektir, bu nedenle bunun yerine ActiveX denetimini kullanın
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
			/// configBlock'u ayrıştırır ve geçerli örnek geçerse ayrıştırılan değerler 
			/// bu örnekte özellikler olarak ayarlanır.
			/// </summary>
			/// <param name="configBlock" type="Object" locid="VS.Util.parseJson_p:configBlock">
			/// configBlock (JSON) yapısı.
			/// </param>
			/// <param name="instance" type="object" locid="VS.Util.define_parseJson:instance">
			/// Özellikleri configBlock temel alınarak ayarlanan örnek.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Yapılandırma bloğu temel alınarak oluşturulan örnek.
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
			/// Bu, JSON veri yapısının ayrıştırılırken JSON.Parse yöntemi sırasında nihai sonucun her düzeyindeki her anahtar ve değer için çağrılacak bir işlevdir. 
			/// Her değer uyarıcı işlevinin sonucuyla değiştirilecektir. Bu, genel nesneleri sözde sınıf örneklerine yeniden biçimlendirmek için kullanılabilir.
			/// </summary>
			/// <param name="key" type="object" locid="VS.Util.define_p:key">
			/// JSON ayrıştırıcısı tarafından ayrıştırılmakta olan geçerli anahtar.
			/// </param>
			/// <param name="value" type="object" locid="VS.Util.define_p:value">
			/// JSON ayrıştırıcısı tarafından ayrıştırılmakta olan anahtarın geçerli değeri.
			/// </param>
			/// <returns type="object" locid="VS.Util.define_returnValue">
			/// Anahtarın değerini temsil eden gerçek sözde sınıf.
			/// </returns>
			if (value && typeof value === "object") {
				if (value.type) {
					var Type = value.type.split(".").reduce(function (previousValue, currentValue) {
						return previousValue ? previousValue[currentValue] : null;
					}, global);
					// Türün boş olmadığını ve bir işlev olduğunu denetleyin (oluşturucu)
					if (Type && typeof Type === "function") {
						return convertObjectToType(value, Type);
					}
				}
			}
			return value;
		},

		reportError: function (error) {
			/// <summary locid="VS.Util.reportError">
			/// Belirtilen dize kaynağını kullanarak bir hata bildirir (konsola)
			/// bir hata bildirir (şu andaki konsola).
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Benzersiz bir hata tanımlayıcısı. "[ad alanı].[tanımlayıcı]" biçiminde olmalıdır. Görüntülenen
			/// hata iletisi bu tanımlayıcıyı ve dize kaynak tablosunda (böyle bir dize varsa)
			/// aranmasıyla döndürülen dizeyi içerir.
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
			/// Belirtilen dize kaynağını kullanarak bir uyarı bildirir (konsola)
			/// bir hata bildirir (şu andaki konsola).
			/// </summary>
			/// <param name="error" type="String" locid="VS.Util.reportError_p:error">
			/// Benzersiz bir hata tanımlayıcısı. "[ad alanı].[tanımlayıcı]" biçiminde olmalıdır. Görüntülenen
			/// hata iletisi bu tanımlayıcıyı ve dize kaynak tablosunda (böyle bir dize varsa)
			/// aranmasıyla döndürülen dizeyi içerir.
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
			/// Belirtilen dize kaynağını kullanarak bir uyarı bildirir (konsola)
			/// .NET dize biçimlendirmesini uygulayan değişimlerin değişken uzunluğu listesi, ör.
			/// outputDebugMessage("state: '{0}', id: {1}", "ON", 23), "state: 'ON', id: 23"ü izleyecektir.
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
		/// Eylem izlemeyi etkinleştirir veya devre dışı bırakır. Tanılama amaçları içindir.
		/// </summary>
		isTraceEnabled: false,

		trace: function () {
			/// <summary locid="VS.Util.trace">
			/// Eylem bilgisini izler. Bağımsız değişkenler .NET dize biçimlendirmesi gösterimini uygular. Örneğin
			/// VS.Util.trace("Action: '{0}', id: {1}", "set", 23), "Action: 'set', id: 23"ü izleyecektir.
			/// </summary>
			if (VS.Util.isTraceEnabled) {
				VS.Util.outputDebugMessage(arguments);
			}
		}
	});

	function convertObjectToType(genericObject, Type) {
		// Genel bir JavaScript nesnesini belirtilen türe dönüştüren yardımcı işlevi. Tür meta veriler sağlarsa
		// özellikleri doğrular.

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

		// Gerekli tüm özelliklere sahip olduğumuzu doğrulayın
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
				// Tür eşleşiyor, bu nedenle ayarlamanız yeterlidir
				object[propertyName] = validatedValue;
			}
		} else {
			// Hiç meta verimiz yok (bu durumda zaten bir hata görüntüledik),
			// meta verimiz var, ancak bu özelliği tanımlamıyor (bu durumda beklenmedik
			// özellik olarak değerlendiririz) veya özelliğin meta verileri türünü tanımlamıyor (bu durumda
			// meta verileri hatalı biçimlendirilmiş olarak değerlendiririz). Son iki senaryo için uygun hataları görüntüleyin.
			if (metadata) {
				if (propertyMetadata) {
					VS.Util.reportWarning("VS.Util.NoTypeMetadataForProperty", getObjectTypeDescription(object.constructor), propertyName);
				} else {
					VS.Util.reportWarning("VS.Util.JsonUnexpectedProperty", propertyName, getObjectTypeDescription(object.constructor));
				}
			}

			// Ne olursa olsun, özelliği elimizde değere ayarlarız.
			object[propertyName] = propertyValue;
		}
	}

	function validatedPropertyValue(parent, propertyName, propertyValue, requiredPropertyType, requiredElementType) {
		// Özellik değerinin gerekli türden olduğunu doğrular. Gerekli türden değilse, mümkünse dönüştürür. Dönüştüremezse
		// null döndürür.

		if (!propertyValue) {
			return null;
		}

		if (typeof requiredPropertyType === "function") {
			if (!(propertyValue instanceof requiredPropertyType) &&
				(requiredPropertyType !== String || typeof propertyValue !== "string") &&
				(requiredPropertyType !== Number || typeof propertyValue !== "number")) {

				// Mümkünse öğeyi türe zorlayın
				if (typeof requiredPropertyType === "function" && propertyValue.constructor === Object) {
					return convertObjectToType(propertyValue, requiredPropertyType);
				}

				// Mümkün değilse türün dönüştürücüsü olup olmadığını inceleyin
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
			// Gerekli türün numaralandırma olduğunu varsayın

			var keys = Object.keys(requiredPropertyType);

			if (!(typeof propertyValue === "dize")) {
				VS.Util.reportError("VS.Util.JsonEnumValueNotString", getObjectTypeDescription(parent), propertyName, getObjectTypeDescription(propertyValue), keys);
				return null;
			}

			if (keys.indexOf(propertyValue) === -1) {
				VS.Util.reportError("VS.Util.JsonInvalidEnumValue", getObjectTypeDescription(parent), propertyName, propertyValue, keys);
				return null;
			}

			return requiredPropertyType[propertyValue];
		} else {
			throw new Error("Meta verilere karşı doğrulama " + requiredPropertyType + " yapılırken tür işlenmiyor");
		}
	}

	function getObjectTypeDescription(object) {
		// Oluşturucu işlevinden (oluşturucu işlevine ad verilmesini gerektirir)
		// kolay tür açıklamasını görüntüleyen yardımcı işlevi - hata iletileri için kullanılır.

		var type;
		if (typeof object === "function") {
			type = object;
		} else {
			type = object.constructor;
		}

		var result = type.toString().match(/function (.{1,})\(/);
		if (result && result.length > 1) {
			// Okuma kolaylığı için oluşturucu işlevi '_ctor' ile bitiyorsa, bunu kaldırın.
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
		/// VS Eylemleri çalışma zamanı tarafından gerçekleştirilen tüm eylemler için taban sınıfı.
		/// </summary>
		/// <name locid="VS.Actions.ActionBase_name">ActionBase</name>
		ActionBase: VS.Class.define(
			function ActionBase_ctor() {
				/// <summary locid="VS.Actions.ActionBase.constructor">
				/// Bir eylem tanımlayan VS.Actions.ActionBase'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ActionBase.targetSelector">
				/// AddClassAction için hedef özelliği alır veya ayarlar.
				/// </field>
				targetSelector: null,

				getTargetElements: function (targetElements) {
					/// <summary locid="VS.Actions.ActionBase.getTargetElements">
					/// targetSelector yoksa, targetElements'a gidiş dönüş uygulayın, aksi halde querySelectorAll(targetSelector).
					/// Özel eylemler, eylemin uygulanacağı hedef öğelerinin listesini değiştirmek için bu yöntemi kullanabilir.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Bu eylemin üzerinde yürütülmesi gereken öğelerin koleksiyonu. Bu koleksiyon
					/// sahip Davranış nesnesi tarafından oluşturulur. Ekli öğeler ve kaynak seçici gibi Davranış ayrıntılarını
					/// dikkate alır. Eylem hedef seçicisi gibi eyleme özgü ayrıntıları dikkate ALMAZ.
					/// </param>

					if (this.targetSelector && this.targetSelector !== "") {
						return document.querySelectorAll(this.targetSelector);
					} else {
						return targetElements;
					}
				},

				executeAll: function (targetElements, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.executeAll">
					/// Tüm hedef öğeleri için eylemi yürütür.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Actions.ActionBase.executeAll_p:array">
					/// Bu eylemin üzerinde yürütülmesi gereken öğelerin koleksiyonu. Bu koleksiyon
					/// sahip Davranış nesnesi tarafından oluşturulur. Ekli öğeler ve kaynak seçici gibi Davranış ayrıntılarını
					/// dikkate alır. Eylem hedef seçicisi gibi eyleme özgü ayrıntıları dikkate ALMAZ.
					/// ExecuteAll yöntemi Behavior hedef öğelerini kendi hedefleriyle mutabık kılacak ve
					/// mutabık kılınan hedeflerde eylemi yürütecektir.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.executeAll_p:behaviorData">
					/// Davranışlar tarafından sağlanan isteğe bağlı bilgi. Örneğin, EventTriggerBehavior bunu olayı geçirmek için kullanır.
					/// </param>

					try {
						// Gelen listeden farklı olabilecek hedef öğelerinin gerçek listesini alın.
						var actualTargetElements = this.getTargetElements(targetElements) || [];
						behaviorData = behaviorData || null;
						for (var i = 0; i < actualTargetElements.length; i++) {
							this.execute(actualTargetElements[i], behaviorData);
						}
					} catch (e) {}
				},

				execute: function (element, behaviorData) {
					/// <summary locid="VS.Actions.ActionBase.execute">
					/// Bir öğe için eylemi yürütür. Türetilen Eylemlerin bunun üzerine yazması gerekir. 
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ActionBase.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Actions.ActionBase.execute_p:behaviorData">
					/// Davranışlar tarafından sağlanan isteğe bağlı bilgi. Örneğin, EventTriggerBehavior bunu olayı geçirmek için kullanır.
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
		/// elementsToRemove seçici özelliği tarafından başvurulan tüm öğeleri kaldıran RemoveElementsAction'ın sağlam uygulaması
		/// </summary>
		/// <name locid="VS.Actions.RemoveElementsAction">RemoveElementsAction</name>
		RemoveElementsAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveElementsAction_ctor() {
				/// <summary locid="VS.Actions.RemoveElementsAction.constructor">
				/// RemoveElementsAction tanımlayan VS.Actions.RemoveElementsAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveElementsAction.elementsToRemove">
				/// RemoveElementsAction için elementsToRemove özelliğini alır veya ayarlar.
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
					/// DOM'dan öğeyi kaldırır.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveElementsAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveElementsAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.removeNode(true);

					msWriteProfilerMark("VS.Actions.RemoveElementsAction:execute,StopTM");
				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// parentElement seçici özelliği tarafından başvurulan tüm öğelerin alt öğelerini kaldıran RemoveChildrenAction'ın sağlam uygulaması
		/// </summary>
		/// <name locid="VS.Actions.RemoveChildrenAction">RemoveChildrenAction</name>
		RemoveChildrenAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveChildrenAction_ctor() {
				/// <summary locid="VS.Actions.RemoveChildrenAction.constructor">
				/// RemoveChildrenAction tanımlayan VS.Actions.RemoveChildrenAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveChildrenAction.parentElement">
				/// RemoveChildrenAction için parentElement özelliğini alır veya ayarlar.
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
					/// Bir öğeden tüm alt öğeleri kaldırır
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveChildrenAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StartTM");

					VS.Util.trace("VS.Actions.RemoveChildrenAction: <{0} uid={1}>", element.tagName, element.uniqueID);
					element.innerHTML = "";

					msWriteProfilerMark("VS.Actions.RemoveChildrenAction:execute,StopTM");
				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Öğe özelliği tarafından belirtilen öğenin sınıf özniteliğini değiştiren ToggleClassAction'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Actions.ToggleClassAction">ToggleClassAction</name>
		ToggleClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function ToggleClassAction_ctor() {
				/// <summary locid="VS.Actions.ToggleClassAction.constructor">
				/// ToggleClassAction tanımlayan VS.Actions.ToggleClassAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.ToggleClassAction.className">
				/// ToggleClassAction için className özelliğini alır veya ayarlar.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.ToggleClassAction.execute">
					/// Eylem ağacı tetiklendiğinde eylem yürütür.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.ToggleClassAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StartTM");

					var currentClassValue = element.className;
					var className = this.className;
					if (!currentClassValue || currentClassValue.indexOf(className) === -1) {
						// Sınıf bulunamazsa, ekleyin
						if (!currentClassValue) {
							element.className = className;
						} else {
							element.className += " " + className;
						}
					} else {
						// Aksi takdirde, sınıfı kaldırın.
						element.className = element.className.replace(className, "");
					}
					VS.Util.trace("VS.Actions.ToggleClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.ToggleClassAction:execute,StopTM");
				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Öğe özelliği tarafından belirtilen öğenin sınıf özniteliğini değiştiren AddClassAction'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Actions.AddClassAction">AddClassAction</name>
		AddClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function AddClassAction_ctor() {
				/// <summary locid="VS.Actions.AddClassAction.constructor">
				/// AddClassAction tanımlayan VS.Actions.AddClassAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.AddClassAction.className">
				/// AddClassAction için className özelliğini alır veya ayarlar.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.AddClassAction.execute">
					/// Eylem ağacı tetiklendiğinde eylem yürütür.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.AddClassAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
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
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Öğe özelliği tarafından belirtilen öğenin sınıf özniteliğini değiştiren RemoveClassAction'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Actions.RemoveClassAction">RemoveClassAction</name>
		RemoveClassAction: VS.Class.derive(VS.Actions.ActionBase,
			function RemoveClassAction_ctor() {
				/// <summary locid="VS.Actions.RemoveClassAction.constructor">
				/// RemoveClassAction tanımlayan VS.Actions.RemoveClassAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.RemoveClassAction.className">
				/// RemoveClassAction için className özelliğini alır veya ayarlar.
				/// </field>
				className: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.RemoveClassAction.execute">
					/// Öğenin sınıf adlarından sınıf adını kaldırır.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.RemoveClassAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StartTM");

					var classAttribute = element.className;
					var classToRemove = this.className;
					var classes = classAttribute.split(" ");

					// Sınıf özniteliği dönüşü yoksa
					if (classes.length === 0) {
						VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='' uid={1}>", element.tagName, element.uniqueID);
						return;
					}

					var newClasses = [];

					for (var i = 0; i < classes.length; i++) {
						if (classes[i] === classToRemove) {
							// Bu öğe gerekli sınıfa sahip, bu nedenle onu yeni newClasses koleksiyonumuza eklemeyin
							continue;
						}
						newClasses.push(classes[i]);
					}

					var newClassAttribute = "";
					if (newClasses.length > 0) {
						if (newClasses.length === 1) {
							newClassAttribute = newClasses[0];
						} else {
							newClassAttribute = newClasses.join(" "); /* Boşluğu ayırıcı olarak kullanarak dizi içeriklerini birleştirin */
						}
					}

					element.className = newClassAttribute;
					VS.Util.trace("VS.Actions.RemoveClassAction: <{0} class='{1}' uid={2}>", element.tagName, element.className, element.uniqueID);

					msWriteProfilerMark("VS.Actions.RemoveClassAction:execute,StopTM");

				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Özniteliği targetSelector özelliği tarafından başvurulan öğelerdeki öznitelik değerine ayarlayan SetHTMLAttributeAction'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Actions.SetHTMLAttributeAction">SetHTMLAttributeAction</name>
		SetHTMLAttributeAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetHTMLAttributeAction_ctor() {
				/// <summary locid="VS.Actions.SetHTMLAttributeAction.constructor">
				/// SetHTMLAttributeAction tanımlayan VS.Actions.SetHTMLAttributeAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetHTMLAttributeAction.attribute">
				/// SetHTMLAttributeAction için öznitelik özelliğini alır veya ayarlar.
				/// </field>
				attribute: "",

				/// <field type="VS.Actions.SetHTMLAttributeAction.attributeValue">
				/// SetHTMLAttributeAction için attributeValue özelliğini alır veya ayarlar.
				/// </field>
				attributeValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetHTMLAttributeAction.execute">
					/// HTML öznitelik değerini ayarlar.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetHTMLAttributeAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StartTM");

					element.setAttribute(this.attribute, this.attributeValue);
					VS.Util.trace("VS.Actions.SetHTMLAttributeAction: <{0} {1}='{2}' uid={3}>", element.tagName, this.attribute, this.attributeValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetHTMLAttributeAction:execute,StopTM");

				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// styleProperty'yi targetSelector özelliği tarafından başvurulan öğelerdeki styleValue'ya ayarlayan SetStyleAction'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Actions.SetStyleAction">SetStyleAction</name>
		SetStyleAction: VS.Class.derive(VS.Actions.ActionBase,
			function SetStyleAction_ctor() {
				/// <summary locid="VS.Actions.SetStyleAction.constructor">
				/// SetStyleAction tanımlayan VS.Actions.SetStyleAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.SetStyleAction.styleProperty">
				/// SetStyleAction için styleProperty özelliğini alır veya ayarlar.
				/// </field>
				styleProperty: "",

				/// <field type="VS.Actions.SetStyleAction.styleValue">
				/// SetStyleAction için styleValue özelliğini alır veya ayarlar.
				/// </field>
				styleValue: "",

				execute: function (element) {
					/// <summary locid="VS.Actions.SetStyleAction.execute">
					/// Satır içi CSS özelliği değerini ayarlar.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.SetStyleAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StartTM");

					element.style[this.styleProperty] = this.styleValue;
					VS.Util.trace("VS.Actions.SetStyleAction: <{0} style='{1}:{2}' uid={3}>", element.tagName, this.styleProperty, this.styleValue, element.uniqueID);

					msWriteProfilerMark("VS.Actions.SetStyleAction:execute,StopTM");
				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Sayfayı yükleyen ve targetSelector özelliği tarafından gösterilen öğeye ekleyen LoadPageAction'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Actions.LoadPageAction">LoadPageAction</name>
		LoadPageAction: VS.Class.derive(VS.Actions.ActionBase,
			function LoadPageAction_ctor() {
				/// <summary locid="VS.Actions.LoadPageAction.constructor">
				/// LoadPageAction tanımlayan VS.Actions.LoadPageAction'ın yeni bir örneğini başlatır.
				/// </summary>
			},
			{
				/// <field type="VS.Actions.LoadPageAction.page">
				/// LoadPageAction için sayfa özelliğini alır veya ayarlar.
				/// </field>
				page: "",

				/// <field type="VS.Actions.LoadPageAction.pageLoaded">
				/// Sayfa yüklendiğinde harekete geçirilecek eylemlerin listesi.
				/// </field>
				pageLoaded: "",


				execute: function (element) {
					/// <summary locid="VS.Actions.LoadPageAction.execute">
					/// Sayfanın içeriğini bir öğeye yükler.
					/// </summary>
					/// <param name="element" type="Object" domElement="true" locid="VS.Actions.LoadPageAction.execute_p:element">
					/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
					/// </param>
					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StartTM");

					element.innerHTML = "";

					var originalElement = element;
					var originalAction = this;

					var winJs = window.WinJS;
					if (winJs && winJs.UI && winJs.UI.Fragments) {
						WinJS.UI.Fragments.render(originalAction.page, element).done(
							function () {
								// Yeni yüklenen sayfa için davranışları işlemek üzere WinJS.UI.processAll'ı çağırın.
								WinJS.UI.processAll(originalElement);

								// Dizideki her eylemde yürütmeyi çağırın ve hedef öğelerinin boş bir dizisini geçirin.
								// Eylemler targetSelector belirtmiyorsa, hiçbir eylem yürütülmeyecektir. Belirtiyorsa,
								// eylemler targetSelector öğelerine karşı yürütülecektir.
								if (originalAction.pageLoaded) {
									originalAction.pageLoaded.forEach(function (pageLoadedAction) {
										pageLoadedAction.executeAll([], null);
									});
								}
							},
							function (error) {
								// Hatayı giderin
							}
						);
					}

					msWriteProfilerMark("VS.Actions.LoadPageAction:execute,StopTM");
				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Tüm davranışlar için taban sınıfı.
		/// </summary>
		/// <name locid="VS.Behaviors.BehaviorBase_name">BehaviorBase</name>
		BehaviorBase: VS.Class.define(
			function BehaviorBase_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.BehaviorBase.constructor">
				/// Davranış tanımlayan VS.Behaviors.BehaviorBase'in yeni bir örneğini başlatır.
				/// </summary>
				/// <param name="configBlock" type="string" locid="VS.Behaviors.BehaviorBase.constructor_p:configBlock">
				/// Yapılandırma bloğunu temel alan nesne özellikleri oluşturun.
				/// </param>
				/// <param name="element" type="object" locid="VS.Behaviors.BehaviorBase.constructor_p:element">
				/// Davranışın eki.
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
				// Anahtarları element.uniqueID olan ekli öğelerin eşlemesi.
				_attachedElementsMap: "",
				_attachedElementsCount: 0,

				getAattachedElements: function () {
					// Öğeleri eşlemeden ayıkla
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
				/// Olay tetiklendiğinde harekete geçirilecek eylemlerin listesi
				/// </field>
				triggeredActions: "",

				attach: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.attach">
					/// Eylemi öğeyle birlikte (genellikle kaynak) ekler
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.attach_p:element">
					/// Davranışın eklendiği öğe.
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
					/// Davranışı ayırır
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.detach_p:element">
					/// Davranışın çıkarılacağı öğe.
					/// </param>
					if (element) {
						// Öğeyi VS.Behaviors._behaviorInstances'tan kaldır
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
					/// Davranışa bir öğe eklendiğinde çağrılır. Bu yöntem,
					/// öğe zaten bu davranışa eklenmişse ÇAĞRILMAYACAKTIR. Türetilen sınıflar
					/// belirli ek görevlerini gerçekleştirmek için bu yöntemi geçersiz kılar.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementAttached_p:element">
					/// Eklenen bir öğe.
					/// </param>
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.BehaviorBase.onElementDetached">
					/// Öğe davranıştan çıkarılmak üzereyken çağrılır. Bu yöntem,
					/// öğe zaten çıkarılmışsa ÇAĞRILMAYACAKTIR. Türetilen sınıflar belirli çıkarma görevlerini gerçekleştirmek için
					/// bu yöntemi geçersiz kılacaktır.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.BehaviorBase.onElementDetached_p:element">
					/// Çıkarılmak üzere olan bir öğe.
					/// </param>
				},

				executeActions: function (targetElements, behaviorData) {
					/// <summary locid="VS.Behaviors.BehaviorBase.executeActions">
					/// Tüm hedef öğeleri için eylemi yürütür.
					/// </summary>
					/// <param name="targetElements" type="Array" locid="VS.Behaviors.BehaviorBase.executeActions_p:array">
					/// Eylemlerin üzerinde yürütülmesi gereken öğeler koleksiyonu.
					/// </param>
					/// <param name="behaviorData" type="Object" locid="VS.Behaviors.BehaviorBase.executeActions_p:behaviorData">
					/// Davranışlar tarafından sağlanan isteğe bağlı bilgi. Örneğin, EventTriggerBehavior bunu olayı geçirmek için kullanır.
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
		/// Seçicilere sahip tüm davranışlar için taban sınıfı.
		/// </summary>
		/// <name locid="VS.SelectorSourcedBehavior_name">SelectorSourcedBehavior</name>
		SelectorSourcedBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function SelectorSourcedBehavior_ctor(configBlock, element) {
				// Temel sınıf oluşturucusunu çağırmadan önce kaynakları başlatın.
				this._sources = {};
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				// sourceSelector tarafından tanımlanan öğeler.
				_sources: null,
				_sourceSelector: "",

				sourceSelector: {
					get: function () {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.get">
						/// SelectorSourcedBehaviorBase'de sourceSelector özelliğini döndürür
						/// </summary>
						/// <returns type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector_returnValue">sourceSelector özelliğinin değeri.</returns>

						return this._sourceSelector;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector">
						/// sourceSelector özelliğinin değerini ayarlar. Bu, belirtilen sourceSelector'a sahip tüm öğeleri bulacak ve Davranışı bu öğelere uygulayacaktır.
						/// </summary>
						/// <param name="value" type="string" locid="VS.Behaviors.SelectorSourcedBehavior.sourceSelector.set_p:value">
						/// sourceSelector özelliğinin değeri.
						/// </param>
						this._sourceSelector = value || "";

						// Yeni kaynak seçicisi değeri eskisiyle aynı olsa bile, kaynakları yenileriz
						this._refreshSources();
					}
				},

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached">
					/// SelectorSourcedBehavior'ı öğeyle ekler
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementAttached_p:element">
					/// Davranışın eklendiği öğe. Davranışta belirtilen kaynak yoksa, ekli öğe davranışın kaynağıdır
					/// </param>

					// selectorSource yoksa, bu öğeyi kaynak olarak kullanmamız gerekir.
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
					/// SelectorSourcedBehavior'ı çıkarır
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.onElementDetached_p:element">
					/// Davranışın çıkarıldığı öğe.
					/// </param>
					if (element) {
						if (this._sourceSelector === "") {
							var sourceInfo = this.getSourceElementInfo(element);
							if (sourceInfo) {
								this.onSourceElementRemoved(element);
								delete this._sources[element.uniqueID];
							}
						} else {
							// Kaynakları yenileyin. Çıkarılan öğe, eklenen öğelerde sayılmaya devam eder.
							// Ekli öğelerin geçerli sayısını sağlamamız gerekiyor - 1.
							var count = this.getAttachedElementsCount() - 1;
							this._refreshSources(count);
						}
					}
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementRemoved">
					/// Bir kaynak bu davranıştan kaldırıldığında çağrılır. Türetilen sınıflar belirli görevleri gerçekleştirmek için bu yöntemi geçersiz kılabilir.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Kaynak öğesi.
					/// </param>
				},

				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.onSourceElementAdded">
					/// Bu davranışa yeni bir kaynak öğesi eklendiğinde çağrılır. Türetilen sınıflar belirli görevleri gerçekleştirmek için bu yöntemi geçersiz kılabilir.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Kaynak öğesi.
					/// </param>
				},

				getSourceElementInfo: function (element) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo">
					/// Kaynak öğesiyle ilgili bilgiler içeren nesneyi döndürür. Türetilen sınıflar
					/// her kaynak öğesinin bilgilerini depolamak için bunu kullanabilir.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElementInfo_p:element">
					/// Kaynak öğesi.
					/// </param>
					return (element ? this._sources[element.uniqueID] || null : null);
				},

				getSourceElements: function () {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getSourceElements">
					/// Kaynak öğelerinin koleksiyonunu döndürür.
					/// </summary>
					var elements = [];
					for (var key in this._sources) {
						elements.push(this._sources[key].element);
					}
					return elements;
				},

				getTargetElementsForEventSourceElement: function (eventSourceElement) {
					/// <summary locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement">
					/// Eylemlerin tetikleneceği hedef öğelerinin koleksiyonunu döndürür. Kaynak öğesi
					/// ekli öğelerden biriyse, eylemlerin tetikleneceği tek öğe olur. Değilse,
					/// eylemlerin tüm ekli öğelerde tetiklenmesi gerekir.
					/// </summary>
					/// <param name="eventSourceElement" type="object" domElement="true" locid="VS.Behaviors.SelectorSourcedBehavior.getTargetElementsForEventSourceElement_p:eventSourceElement">
					/// Kaynak öğesi.
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

					// Yalnızca en az bir ekli öğe varsa yeni kaynaklar oluştur
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
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Zamanlayıcının çalışmasını dinleyen ve belirtilirse eylem harekete geçiren TimerBehavior'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Behaviors.TimerBehavior">TimerBehavior</name>
		TimerBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function TimerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.TimerBehavior.constructor">
				/// VS.Behaviors.TimerBehavior'ın yeni örneğini başlatır ve zamanlayıcı çalıştığında eylem harekete geçirir.
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				totalTicks: 10,
				millisecondsPerTick: 1000,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementAttached">
					/// TimerBehavior'ı öğeyle birlikte ekler ve ayarlanmış _sourceselector kümesi yoksa kaynağı ayarlar
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementAttached_p:element">
					/// Davranışın eklendiği öğe. Davranışta belirtilen kaynak yoksa, ekli öğe davranışın kaynağıdır
					/// </param>

					// Tüm eylemleri öğeye ekleyin, bu işlem, henüz ayarlanmışsa eylemler üzerindeki hedefi ayarlayacaktır.
					var that = this;
					var elementInfo = this.getAttachedElementInfo(element);
					elementInfo._count = 0;
					elementInfo._timerId = window.setInterval(function () { that._tickHandler(element); }, this.millisecondsPerTick);
					VS.Util.trace("VS.Behaviors.TimerBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.TimerBehavior.onElementDetached">
					/// TimerBehavior'ı ayırır
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.TimerBehavior.onElementDetached_p:element">
					/// Davranışın çıkarıldığı öğe.
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
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Kaynak öğedeki olayı dinleyen ve belirtilirse eylem harekete geçiren EventTriggerBehavior'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Behaviors.EventTriggerBehavior">EventTriggerBehavior</name>
		EventTriggerBehavior: VS.Class.derive(VS.Behaviors.SelectorSourcedBehavior,
			function EventTriggerBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.EventTriggerBehavior.constructor">
				/// Bir olay tanımlayan ve olay tetiklendiğinde eylemler harekete geçiren VS.Behaviors.EventTriggerBehavior'ın yeni örneğini başlatır.
				/// </summary>
				VS.Behaviors.SelectorSourcedBehavior.call(this, configBlock, element);
			},
			{
				onSourceElementAdded: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded">
					/// öğeyle EventTriggerBehavior'ı ekler (genellikle öğe)
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementAdded_p:element">
					/// Kaynak öğesi.
					/// </param>

					// Olay "yükleme" olayıysa, davranışlarımızın çalışma zamanını yükleme sırasında (daha önce harekete geçirilmiştir) başlattığımız için olayı şimdi harekete geçirin
					if (this.event === "load") {
						// Bağımsız değişkenlerin benzetimini yapın ve el ile harekete geçirdiğimiz eyleme geçirin.
						// VS.Behaviors.processAll, sayfanın yaşam döngüsü süresince birçok kez çağırılabilir.
						// Şu anda "load" eylemlerini yalnızca bir kez çalıştırmak istiyoruz. Özel bir işaretçi kullanacağız.
						if (!element._VSBehaviorsLoadExecuted) {
							element._VSBehaviorsLoadExecuted = true;
							this._executeEventActions(element, null);
						}
						return;
					}

					// Bir öğe için yeni bir dinleyici oluştur ve bunu hatırla
					var sourceInfo = this.getSourceElementInfo(element);
					var that = this;
					sourceInfo._eventListener = function (event) {
						that._executeEventActions(event.currentTarget, event);
					};

					// Gerçek bir olay adı varsa olayı bir öğeye ekle
					if (this.event !== "") {
						element.addEventListener(this.event, sourceInfo._eventListener, false);
					}

					VS.Util.trace("VS.Behaviors.EventTriggerBehavior: ++ <{0} on{1} uid={2}>", element.tagName, this.event, element.uniqueID);
				},

				onSourceElementRemoved: function (element) {
					/// <summary locid="VS.Behaviors.EventTriggerBehavior._removeSourceImpl">
					/// Taşınan öğe için olay dinleyicisini kaldırır.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.EventTriggerBehavior.onSourceElementRemoved_p:element">
					/// Davranışın öğesi.
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
						/// EventTriggerBehavior'da olay özelliğini döndürür
						/// </summary>
						/// <returns type="Object" locid="VS.Behaviors.EventTriggerBehavior.event_returnValue">Olay özelliğinin değeri.</returns>
						return this._event;
					},
					set: function (value) {
						/// <summary locid="VS.Behaviors.EventTriggerBehavior.event.set">
						/// Olay özelliğinin değerini ayarlar.
						/// </summary>
						/// <param name="value" type="Object" locid="VS.Behaviors.EventTriggerBehavior.event.set_p:value">
						/// Olay özelliğinin değeri.
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
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
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
		/// Zamanlayıcının çalışmasını dinleyin ve belirtilirse eylem harekete geçiren RequestAnimationFrameBehavior'ın sağlam uygulaması.
		/// </summary>
		/// <name locid="VS.Behaviors.RequestAnimationFrameBehavior">RequestAnimationFrameBehavior</name>
		RequestAnimationFrameBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function RequestAnimationFrameBehavior_ctor(configBlock, element) {
				/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.constructor">
				/// VS.Behaviors.RequestAnimationFrameBehavior'ın yeni bir örneğini başlatır
				/// </summary>
				VS.Behaviors.BehaviorBase.call(this, configBlock, element);
			},
			{
				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached">
					/// RequestAnimationFrameBehavior'ı öğeyle birlikte ekler
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementAttached_p:element">
					/// Davranışın eklendiği öğe. Davranışta belirtilen kaynak yoksa, ekli öğe davranışın kaynağıdır
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
					/// RequestAnimationFrameBehavior'ı ayırır
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.RequestAnimationFrameBehavior.onElementDetached_p:element">
					/// Davranışın çıkarıldığı öğe.
					/// </param>
					if (element) {
						VS.Util.trace("VS.Behaviors.RequestAnimationFrameBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
						var elementInfo = this.getAttachedElementInfo(element);
						window.cancelAnimationFrame(elementInfo._requestId);
						elementInfo._callback = null;
					}
				},

				_frameCallBack: function (element) {
					// Eylemleri çağırın
					var elementInfo = this.getAttachedElementInfo(element);
					if (elementInfo) {
						this.executeActions([element]);

						// Animasyon karesi/saniyede requestAnimationFrame'i çağırın.
						elementInfo._requestId = window.requestAnimationFrame(elementInfo._callback);
					}
				}
			},
			{ /* statik üyeler boş */ },
			{
				// Özellik Meta Verileri (JSON ayrıştırma için)
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase }
			}
		)
	});
})(VS);

//js\Behaviors\Behaviors.js
// VS için ActionTree çalışma zamanı

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";
	var _behaviorInstances = {};
	var _elementsWithBehaviors = [];

	function loadActions() {
		if (VS.ActionTree.actionTrees) {
			// Zaten yüklü olan eylemler.
			return;
		}

		msWriteProfilerMark("VS.Behaviors:loadActions,StartTM");
		loadActionsImpl();
		msWriteProfilerMark("VS.Behaviors:loadActions,StopTM");
	}

	// Bu işlev ActionTree'yi ve [data-vs-interactivity] özniteliğini işleyecektir
	function loadActionsImpl() {
		/*sabit kodlanmış eylem dosyası json dosyası*/
		try {
			var actionTreeList = loadActionsFromFile();
			registerActions(actionTreeList);
		} catch (e) {
			// actionList dosyasının var olması bizim için gerekli değildir, bu nedenle burada bir hata oluşturmuyoruz.
		}
	}

	function loadActionsFromFile(actionListFileName) {
		try {
			if (!actionListFileName) {
				/*varsayılan actionlist json dosyası*/
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

				// Meta veriler JSON ayrıştırma sırasında ad özelliğinin var olmasını zorlar (animasyon
				// adı yoksa oluşturulmayacaktır). Yinelemeler olduğunda, sonraki sürüm önceki sürümü
				// geçersiz kılar.
				var actionTreeName = actionTree.name;
				// Her actionTree'yi adı anahtar olacak şekilde sözlüğe ekleyin.
				VS.ActionTree.actionTrees[actionTreeName] = actionTree;
			}
		} catch (e) {
			// actionList dosyasının var olması bizim için gerekli değildir, bu nedenle burada bir hata oluşturmuyoruz.
		}
	}

	function resetImpl() {
		try {
			var elementsToReset = _elementsWithBehaviors.slice();
			var actionTrees = VS.ActionTree.actionTrees;

			// Eylemleri öğelerden çıkar
			for (var i = 0; i < elementsToReset.length; i++) {
				detach(elementsToReset[i]);
			}

			// Mevcut eylemleri sil
			VS.ActionTree.actionTrees = null;
			for (var name in actionTrees) {
				VS.ActionTree.unregisterActionTree(name);
			}
			_elementsWithBehaviors = [];
		} catch (e) {
			// actionList dosyasının var olması bizim için gerekli değildir, bu nedenle burada bir hata oluşturmuyoruz.
		}

	}

	// Bu, parçalar içinde tanımlanan davranışların parça yüklenmeden önce başlatılmasını sağlar.
	function behaviorsProcessAll(rootElement) {
		var promise = originalProcessAll.call(this, rootElement);
		promise.then(
			function () { VS.Behaviors.processAll(rootElement); },
			null
		);

		return promise;
	}

	// Verilen öğe için davranışları ve eylemleri ekleme
	function attach(element) {
		msWriteProfilerMark("VS.Behaviors:attach,StartTM");
		var behaviorAttribute = element.getAttribute("data-vs-interactivity");
		if (behaviorAttribute) {
			if (VS.ActionTree.actionTrees) {
				var behaviors = VS.ActionTree.actionTrees[behaviorAttribute];
				if (!behaviors) {
					behaviors = VS.Util.parseJson(behaviorAttribute);
				}
				// Geçerli davranışlar nesnesi alırsak, bunu ayrıştırın.
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

	// Varolan davranışı öğeden ayırın
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

	// Gerçek olan Davranışlar için tüm uygulamaları işler, bu durum data-vs-interactivity
	// özniteliği olan verilerden devam eder ve her öğe oluşturma işlemi çağırır.
	function processAllImpl(rootElement) {
		msWriteProfilerMark("VS.Behaviors:processAll,StartTM");

		// Varsa önce eylemleri yükle
		loadActions();

		// [data-vs-interactivity] özniteliğini işleyin.
		rootElement = rootElement || document;
		var selector = "[data-vs-interactivity]";
		// Yukarıdaki özniteliğe sahip öğeleri bulun ve ilişkili davranışı ekleyin.
		Array.prototype.forEach.call(rootElement.querySelectorAll(selector), function (element) {
			processElementImpl(element);
		});

		msWriteProfilerMark("VS.Behaviors:processAll,StopTM");
	}

	function processElementImpl(element) {
		// Önce varolan davranışı ayırın
		detach(element);
		// Şimdi yeni davranışı ekleyin
		attach(element);
	}

	function refreshBehaviorsImpl() {
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StartTM");

		// Yeni eylemleri yüklemeyi deneyin. 
		var actionTreeList = loadActionsFromFile();
		if (!actionTreeList) {
			// Büyük olasılıkla eylemler *.json geçersizdir.
			return; 
		}

		// Yenilenecek öğelerin kopyasını alın.
		var elementsToRefresh = _elementsWithBehaviors.slice();

		// Geçerli eylemlerin kaydını iptal edin ve yeni eylemler kaydedin.
		resetImpl();
		registerActions(actionTreeList);

		// Üzerinde değişiklik yaptığımız, öğeler üzerindeki ekli davranışlar.
		for (var i = 0; i < elementsToRefresh.length; i++) {
			var element = elementsToRefresh[i];
			attach(element);
		}
		msWriteProfilerMark("VS.Behaviors:refreshBehaviors,StopTM");
	}

	// "VS.Behaviors" ad alanının üyelerini oluşturun
	VS.Namespace.defineWithParent(VS, "Behaviors", {
		processAll: function (rootElement) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Belirtilen kök öğesinden başlayarak tüm öğelere bildirime dayalı davranış bağlaması uygular.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// data-vs-interactivity özniteliğinin işlenmeye başlayacağı öğe
			/// Bu parametre belirtilmemişse, bağlama belgenin tamamına uygulanır.
			/// </param>
			processAllImpl(rootElement);
		},

		processElement: function (element) {
			/// <summary locid="VS.Behaviors.processAll">
			/// Bir öğeye bildirime dayalı davranış bağlaması uygular.
			/// </summary>
			/// <param name="rootElement" type="Object" domElement="true" locid="VS.Behaviors.processAll_p:rootElement">
			/// data-vs-interactivity özniteliğinin işlenmeye başlayacağı öğe
			/// Bu parametre belirtilmemişse, bağlama belgenin tamamına uygulanır.
			/// </param>

			// Bu işlenecek ilk öğeyse, eylemleri yüklememiz gerekir
			loadActions();
			processElementImpl(element);
		},

		reset: function () {
			/// <summary locid="VS.Behaviors.reset">
			/// Eylemleri öğelerden çıkarır ve yüklü tüm eylemleri kaldırır.
			/// </summary>
			resetImpl();
		},

		refreshBehaviors: function () {
			/// <summary locid="VS.Behaviors.refreshBehaviors">
			/// processAll tarafından işlenmiş öğelerdeki davranışları yeniler.
			/// </summary>
			refreshBehaviorsImpl();
		},

		getBehaviorInstances: function (element) {
			/// <summary locid="VS.Behaviors.getBehaviorInstances">
			/// verilen öğeye ekli behaviorInstances dizisini döndürür.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.getBehaviorInstances_p:element">
			/// Davranış örneklerinin elde edildiği öğe.
			/// </param>
			/// <returns type="Array" locid="VS.Behaviors.getBehaviorInstances_returnValue">Öğeye ekli davranış örneklerinin dizisi.</returns>

			if (_behaviorInstances && element) {
				return _behaviorInstances[element.uniqueID];
			}
		},

		addBehaviorInstance: function (element, behaviorInstance) {
			/// <summary locid="VS.Behaviors.addBehaviorInstance">
			/// davranış örneği dizisini öğeye ayarlar.
			/// </summary>
			/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.addBehaviorInstance_p:element">
			/// Davranış örneğinin ayarlandığı öğe.
			/// </param>
			/// <param name="behaviorInstance" type="object" locid="VS.Behaviors.addBehaviorInstance_p:behaviorInstance">
			/// Verilen öğe için eklenecek geçerli davranış örneği
			/// </param>

			var currentBehaviors = VS.Behaviors.getBehaviorInstances(element) || (_behaviorInstances[element.uniqueID] = []);
			currentBehaviors.push(behaviorInstance);
		}
	});

	// Normalde, belge yüklendiğinde processAll uygularız. Ancak, bu betik belge
	// yüklendikten sonra eklenmişse (örneğin WinJS gezintisinin sonucu olarak veya
	// başka bir JS eklemişse), hemen processAll uygulamamız gerekir.
	if (document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { VS.Behaviors.processAll(document); }, false);
	} else if (VS.designModeEnabled){
		VS.Behaviors.processAll(document);
	}
})(_VSGlobal.VS, _VSGlobal);



//js\Behaviors\WinJsBehaviorInstrumentation.js
// VS için ActionTree çalışma zamanı

/// <reference path="../VS.js" />
/// <reference path="../Util.js" />
(function (VS, global) {
	"use strict";

	var _isWinJsInstrumented = false;

	function instrumentWinJsOnDemand() {
		if (_isWinJsInstrumented) {
			return;
		}

		// Tüm parçalarını denetleyerek WinJs'nin olup olmadığını denetleyin.
		var winJs = window.WinJS;
		if (!winJs || !winJs.Namespace ||
			!winJs.Binding || !winJs.Binding.Template ||
			!winJs.UI || !winJs.UI.Fragments) {
			return;
		}

		_isWinJsInstrumented = true;

		try {
			// WinJS şablon oluşturmayı işaretleyin.
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

			// WinJS.UI'yı işaretleyin.
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

			// WinJS.UI.Fragments'ı işaretleyin.
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

	// Bu betik genellikle WinJS betiklerinin arkasına yerleştirilir. Bu nedenle, "şu an" WinJS'yi işaretlemek için ideal bir zamandır.
	instrumentWinJsOnDemand();

	// WinJS işaretlenmezse, bu betik WinJS'den önce gelir veya WinJS yoktur. Belge
	// yüklendiğinde WinJS'yi işaretlemeye çalışacağız (bu betik belge yüklendikten sonra eklenmemişse).
	if (!_isWinJsInstrumented && document.readyState !== "complete") {
		global.document.addEventListener("DOMContentLoaded", function () { instrumentWinJsOnDemand(); }, false);
	}

})(_VSGlobal.VS, _VSGlobal);


