(function () {
    var _eventManager = _$createEventManager(
    function getEventObject(type, attach, obj, ignoreCase) {
        function _eventTypeToObject(type, attach) {
            if(attach) return Event;
			switch (type) {
				case 'close':
					return CloseEvent;
				case 'error':
					return ErrorEvent;
				case 'upgradeneeded':
					return IDBVersionChangeEvent;
				case 'message':
					return MessageEvent;
				case 'loadend':
				case 'progress':
					return ProgressEvent;
			};
            return Event;
        }
        var e = _eventTypeToObject(type, attach);
        var eventObject = Object.create(e);
        eventObject.target = obj;
        eventObject.currentTarget = obj;
        eventObject.type = type;
        if (eventObject.relatedTarget)
            eventObject.relatedTarget = obj;
        return eventObject;
    });
    var _events = _eventManager.createEventProperties;

	var WindowBase64 = {};
	var WorkerUtils = {};
	var Event = {};
	var IDBVersionChangeEvent = _$inherit(Event);
	var EventTarget = {};
	var AbstractWorker = {};
	var Worker = {};
	var WorkerCtor = function() { return Object.create(Worker); };
	var WindowConsole = {};
	var IDBKeyRange = {};
	var Blob = {};
	var BlobCtor = function() { return Object.create(Blob); };
	var MSApp = {};
	var MSBaseReader = {};
	var FileReader = {};
	var FileReaderCtor = function() { return Object.create(FileReader); };
	var ImageData = {};
	var MessagePort = {};
	var IDBRequest = {};
	var MSAppView = {};
	var IDBObjectStore = {};
	var WorkerLocation = {};
	var ProgressEvent = _$inherit(Event);
	var CloseEvent = _$inherit(Event);
	var WebSocket = {};
	var WebSocketCtor = function() { return Object.create(WebSocket); };
	var DOMError = {};
	var MessageEvent = _$inherit(Event);
	var DOMException = {};
	var FileReaderSync = {};
	var FileReaderSyncCtor = function() { return Object.create(FileReaderSync); };
	var MSUnsafeFunctionCallback = {};
	var MessageChannel = {};
	var MessageChannelCtor = function() { return Object.create(MessageChannel); };
	var DedicatedWorkerGlobalScope = {};
	var WorkerGlobalScope = this;
	var IDBOpenDBRequest = _$inherit(IDBRequest);
	var XMLHttpRequestEventTarget = {};
	var DOMStringList = {};
	var IDBDatabase = {};
	var IDBFactory = {};
	var NavigatorOnLine = {};
	var CanvasPixelArray = {};
	var IDBCursor = {};
	var IDBCursorWithValue = _$inherit(IDBCursor);
	var EventException = {};
	var Console = {};
	var EventListener = {};
	var MSBlobBuilder = {};
	var MSBlobBuilderCtor = function() { return Object.create(MSBlobBuilder); };
	var MSStreamReader = {};
	var MSStreamReaderCtor = function() { return Object.create(MSStreamReader); };
	var File = _$inherit(Blob);
	var MSStream = {};
	var ErrorEvent = _$inherit(Event);
	var NavigatorID = {};
	var WorkerNavigator = {};
	var IDBTransaction = {};
	var FileList = {};
	var MSExecAtPriorityFunctionCallback = {};
	var IDBIndex = {};
	var XMLHttpRequest = {};
	var XMLHttpRequestCtor = function() { return Object.create(XMLHttpRequest); };

	/* -- type: WindowBase64 -- */

	WindowBase64.btoa = function(rawString) { 
		/// <signature>
		/// <param name='rawString' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	WindowBase64.atob = function(encodedString) { 
		/// <signature>
		/// <param name='encodedString' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: WorkerUtils -- */
	_$implement(WorkerUtils, WindowBase64);

	WorkerUtils.navigator = WorkerNavigator;
	WorkerUtils.msIndexedDB = IDBFactory;
	WorkerUtils.indexedDB = IDBFactory;
	WorkerUtils.clearImmediate = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
		_$clearTimeout(handle);
	};
	WorkerUtils.importScripts = function(urls) { 
		/// <signature>
		/// <param name='urls' type='String' />
		/// </signature>
		for (var i = 0; i < arguments.length; i++) _$asyncRequests.add({ src: arguments[i] });
	};
	WorkerUtils.clearTimeout = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
		_$clearTimeout(handle);
	};
	WorkerUtils.setImmediate = function(handler, args) { 
		/// <signature>
		/// <param name='handler' type='Object' />
		/// <param name='args' type='Object' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return _$setTimeout(handler, 0, args);
	};
	WorkerUtils.setTimeout = function(handler, timeout, args) { 
		/// <signature>
		/// <param name='handler' type='Object' />
		/// <param name='timeout' type='Object' optional='true' />
		/// <param name='args' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return _$setTimeout(handler, timeout, args);
	};
	WorkerUtils.clearInterval = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
		_$clearTimeout(handle);
	};
	WorkerUtils.setInterval = function(handler, timeout, args) { 
		/// <signature>
		/// <param name='handler' type='Object' />
		/// <param name='timeout' type='Object' optional='true' />
		/// <param name='args' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return _$setTimeout(handler, timeout, args);
	};


	/* -- type: Event -- */

	Event.timeStamp = 0;
	Event.defaultPrevented = false;
	Event.isTrusted = false;
	Event.currentTarget = EventTarget;
	Event.cancelBubble = false;
	Event.target = EventTarget;
	Event.eventPhase = 0;
	Event.cancelable = false;
	Event.type = '';
	Event.srcElement = {};
	Event.bubbles = false;
	Event.CAPTURING_PHASE = 1;
	Event.AT_TARGET = 2;
	Event.BUBBLING_PHASE = 3;
	Event.initEvent = function(eventTypeArg, canBubbleArg, cancelableArg) { 
		/// <signature>
		/// <param name='eventTypeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// </signature>
	};
	Event.stopPropagation = function() { };
	Event.stopImmediatePropagation = function() { };
	Event.preventDefault = function() { };


	/* -- type: IDBVersionChangeEvent -- */

	IDBVersionChangeEvent.newVersion = 0;
	IDBVersionChangeEvent.oldVersion = 0;


	/* -- type: EventTarget -- */

	EventTarget.removeEventListener = function(type, listener, useCapture) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='listener' type='EventListener' />
		/// <param name='useCapture' type='Boolean' optional='true' />
		/// </signature>
	};
	EventTarget.addEventListener = function(type, listener, useCapture) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='listener' type='EventListener' />
		/// <param name='useCapture' type='Boolean' optional='true' />
		/// </signature>
		_eventManager.add(this, type, listener);
	};
	EventTarget.dispatchEvent = function(evt) { 
		/// <signature>
		/// <param name='evt' type='Event' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: AbstractWorker -- */
	_$implement(AbstractWorker, EventTarget);

	_events(AbstractWorker, "onerror");


	/* -- type: Worker -- */
	_$implement(Worker, AbstractWorker);

	Worker.postMessage = function(message, ports) { 
		/// <signature>
		/// <param name='message' type='Object' />
		/// <param name='ports' type='Object' optional='true' />
		/// </signature>
	};
	Worker.terminate = function() { };
	_events(Worker, "onmessage");


	/* -- type: WindowConsole -- */

	WindowConsole.console = Console;


	/* -- type: IDBKeyRange -- */

	IDBKeyRange.upperOpen = false;
	IDBKeyRange.upper = {};
	IDBKeyRange.lowerOpen = false;
	IDBKeyRange.lower = {};
	IDBKeyRange.bound = function(lower, upper, lowerOpen, upperOpen) { 
		/// <signature>
		/// <param name='lower' type='Object' />
		/// <param name='upper' type='Object' />
		/// <param name='lowerOpen' type='Boolean' optional='true' />
		/// <param name='upperOpen' type='Boolean' optional='true' />
		/// <returns type='IDBKeyRange'/>
		/// </signature>
		return IDBKeyRange; 
	};
	IDBKeyRange.only = function(value) { 
		/// <signature>
		/// <param name='value' type='Object' />
		/// <returns type='IDBKeyRange'/>
		/// </signature>
		return IDBKeyRange; 
	};
	IDBKeyRange.upperBound = function(bound, open) { 
		/// <signature>
		/// <param name='bound' type='Object' />
		/// <param name='open' type='Boolean' optional='true' />
		/// <returns type='IDBKeyRange'/>
		/// </signature>
		return IDBKeyRange; 
	};
	IDBKeyRange.lowerBound = function(bound, open) { 
		/// <signature>
		/// <param name='bound' type='Object' />
		/// <param name='open' type='Boolean' optional='true' />
		/// <returns type='IDBKeyRange'/>
		/// </signature>
		return IDBKeyRange; 
	};


	/* -- type: Blob -- */

	Blob.type = '';
	Blob.size = 0;
	Blob.msDetachStream = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	Blob.msClose = function() { };
	Blob.slice = function(start, end, contentType) { 
		/// <signature>
		/// <param name='start' type='Number' optional='true' />
		/// <param name='end' type='Number' optional='true' />
		/// <param name='contentType' type='String' optional='true' />
		/// <returns type='Blob'/>
		/// </signature>
		return Blob; 
	};


	/* -- type: MSApp -- */

	MSApp.NORMAL = "normal";
	MSApp.HIGH = "high";
	MSApp.IDLE = "idle";
	MSApp.CURRENT = "current";
	MSApp.createFileFromStorageFile = function(storageFile) { 
		/// <signature>
		/// <param name='storageFile' type='Object' />
		/// <returns type='File'/>
		/// </signature>
		return File; 
	};
	MSApp.createDataPackage = function(object) { 
		/// <signature>
		/// <param name='object' type='Object' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	MSApp.terminateApp = function(exceptionObject) { 
		/// <signature>
		/// <param name='exceptionObject' type='Object' />
		/// </signature>
	};
	MSApp.createStreamFromInputStream = function(type, inputStream) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='inputStream' type='Object' />
		/// <returns type='MSStream'/>
		/// </signature>
		return MSStream; 
	};
	MSApp.createBlobFromRandomAccessStream = function(type, seeker) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='seeker' type='Object' />
		/// <returns type='Blob'/>
		/// </signature>
		return Blob; 
	};
	MSApp.addPublicLocalApplicationUri = function(uri) { 
		/// <signature>
		/// <param name='uri' type='String' />
		/// </signature>
	};
	MSApp.execAsyncAtPriority = function(asynchronousCallback, priority, args) { 
		/// <signature>
		/// <param name='asynchronousCallback' type='MSExecAtPriorityFunctionCallback' />
		/// <param name='priority' type='String' />
		/// <param name='args' type='Object' />
		/// </signature>
	};
	MSApp.isTaskScheduledAtPriorityOrHigher = function(priority) { 
		/// <signature>
		/// <param name='priority' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSApp.execUnsafeLocalFunction = function(unsafeFunction) { 
		/// <signature>
		/// <param name='unsafeFunction' type='MSUnsafeFunctionCallback' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	MSApp.getHtmlPrintDocumentSource = function(htmlDoc) { 
		/// <signature>
		/// <param name='htmlDoc' type='Object' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	MSApp.getViewOpener = function() { 
		/// <signature>
		/// <returns type='MSAppView'/>
		/// </signature>
		return MSAppView; 
	};
	MSApp.suppressSubdownloadCredentialPrompts = function(suppress) { 
		/// <signature>
		/// <param name='suppress' type='Boolean' />
		/// </signature>
	};
	MSApp.execAtPriority = function(synchronousCallback, priority, args) { 
		/// <signature>
		/// <param name='synchronousCallback' type='MSExecAtPriorityFunctionCallback' />
		/// <param name='priority' type='String' />
		/// <param name='args' type='Object' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	MSApp.createDataPackageFromSelection = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	MSApp.createNewView = function(uri) { 
		/// <signature>
		/// <param name='uri' type='String' />
		/// <returns type='MSAppView'/>
		/// </signature>
		return MSAppView; 
	};
	MSApp.getCurrentPriority = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: MSBaseReader -- */
	_$implement(MSBaseReader, EventTarget);

	MSBaseReader.readyState = 0;
	MSBaseReader.result = {};
	MSBaseReader.LOADING = 1;
	MSBaseReader.DONE = 2;
	MSBaseReader.EMPTY = 0;
	MSBaseReader.abort = function() { };
	_events(MSBaseReader, "onprogress", "onabort", "onloadend", "onerror", "onload", "onloadstart");


	/* -- type: FileReader -- */
	_$implement(FileReader, MSBaseReader);

	FileReader.error = DOMError;
	FileReader.readAsArrayBuffer = function(blob) { 
		/// <signature>
		/// <param name='blob' type='Blob' />
		/// </signature>
	};
	FileReader.readAsDataURL = function(blob) { 
		/// <signature>
		/// <param name='blob' type='Blob' />
		/// </signature>
	};
	FileReader.readAsText = function(blob, encoding) { 
		/// <signature>
		/// <param name='blob' type='Blob' />
		/// <param name='encoding' type='String' optional='true' />
		/// </signature>
	};


	/* -- type: ImageData -- */

	ImageData.width = 0;
	ImageData.data = CanvasPixelArray;
	ImageData.height = 0;


	/* -- type: MessagePort -- */
	_$implement(MessagePort, EventTarget);

	MessagePort.close = function() { };
	MessagePort.postMessage = function(message, ports) { 
		/// <signature>
		/// <param name='message' type='Object' optional='true' />
		/// <param name='ports' type='Object' optional='true' />
		/// </signature>
	};
	MessagePort.start = function() { };
	_events(MessagePort, "onmessage");


	/* -- type: IDBRequest -- */
	_$implement(IDBRequest, EventTarget);

	IDBRequest.source = {};
	IDBRequest.transaction = IDBTransaction;
	IDBRequest.error = DOMError;
	IDBRequest.readyState = '';
	IDBRequest.result = {};
	_events(IDBRequest, "onsuccess", "onerror");


	/* -- type: MSAppView -- */

	MSAppView.viewId = 0;
	MSAppView.close = function() { };
	MSAppView.postMessage = function(message, targetOrigin, ports) { 
		/// <signature>
		/// <param name='message' type='Object' />
		/// <param name='targetOrigin' type='String' />
		/// <param name='ports' type='Object' optional='true' />
		/// </signature>
	};


	/* -- type: IDBObjectStore -- */

	IDBObjectStore.indexNames = DOMStringList;
	IDBObjectStore.transaction = IDBTransaction;
	IDBObjectStore.name = '';
	IDBObjectStore.keyPath = '';
	IDBObjectStore.count = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, 0);
	};
	IDBObjectStore.add = function(value, key) { 
		/// <signature>
		/// <param name='value' type='Object' />
		/// <param name='key' type='Object' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, key);
	};
	IDBObjectStore.createIndex = function(name, keyPath, optionalParameters) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <param name='keyPath' type='String' />
		/// <param name='optionalParameters' type='Object' optional='true' />
		/// <returns type='IDBIndex'/>
		/// </signature>
		return IDBIndex; 
	};
	IDBObjectStore.clear = function() { 
		/// <signature>
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, undefined);
	};
	IDBObjectStore.put = function(value, key) { 
		/// <signature>
		/// <param name='value' type='Object' />
		/// <param name='key' type='Object' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, key);
	};
	IDBObjectStore.deleteIndex = function(indexName) { 
		/// <signature>
		/// <param name='indexName' type='String' />
		/// </signature>
	};
	IDBObjectStore.openCursor = function(range, direction) { 
		/// <signature>
		/// <param name='range' type='Object' optional='true' />
		/// <param name='direction' type='String' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		var cursor = Object.create(IDBCursorWithValue); cursor.source = this; return _createIDBRequest(IDBRequest, this, cursor);
	};
	IDBObjectStore.index = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='IDBIndex'/>
		/// </signature>
		return IDBIndex; 
	};
	IDBObjectStore.delete = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, undefined);
	};
	IDBObjectStore.get = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, {});
	};


	/* -- type: WorkerLocation -- */

	WorkerLocation.protocol = '';
	WorkerLocation.hash = '';
	WorkerLocation.search = '';
	WorkerLocation.href = '';
	WorkerLocation.hostname = '';
	WorkerLocation.pathname = '';
	WorkerLocation.port = '';
	WorkerLocation.host = '';
	WorkerLocation.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: ProgressEvent -- */

	ProgressEvent.loaded = 0;
	ProgressEvent.lengthComputable = false;
	ProgressEvent.total = 0;
	ProgressEvent.initProgressEvent = function(typeArg, canBubbleArg, cancelableArg, lengthComputableArg, loadedArg, totalArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='lengthComputableArg' type='Boolean' />
		/// <param name='loadedArg' type='Number' />
		/// <param name='totalArg' type='Number' />
		/// </signature>
	};


	/* -- type: CloseEvent -- */

	CloseEvent.wasClean = false;
	CloseEvent.reason = '';
	CloseEvent.code = 0;
	CloseEvent.initCloseEvent = function(typeArg, canBubbleArg, cancelableArg, wasCleanArg, codeArg, reasonArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='wasCleanArg' type='Boolean' />
		/// <param name='codeArg' type='Number' />
		/// <param name='reasonArg' type='String' />
		/// </signature>
	};


	/* -- type: WebSocket -- */
	_$implement(WebSocket, EventTarget);

	WebSocketCtor.CLOSING = 2;
	WebSocketCtor.OPEN = 1;
	WebSocketCtor.CLOSED = 3;
	WebSocketCtor.CONNECTING = 0;
	WebSocket.protocol = '';
	WebSocket.bufferedAmount = 0;
	WebSocket.readyState = 0;
	WebSocket.extensions = '';
	WebSocket.binaryType = '';
	WebSocket.url = '';
	WebSocket.CLOSING = 2;
	WebSocket.OPEN = 1;
	WebSocket.CLOSED = 3;
	WebSocket.CONNECTING = 0;
	WebSocket.close = function(code, reason) { 
		/// <signature>
		/// <param name='code' type='Number' optional='true' />
		/// <param name='reason' type='String' optional='true' />
		/// </signature>
	};
	WebSocket.send = function(data) { 
		/// <signature>
		/// <param name='data' type='Object' />
		/// </signature>
	};
	_events(WebSocket, "onopen", "onmessage", "onclose", "onerror");


	/* -- type: DOMError -- */

	DOMError.name = '';
	DOMError.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: MessageEvent -- */

	MessageEvent.source = {};
	MessageEvent.ports = {};
	MessageEvent.origin = '';
	MessageEvent.data = {};
	MessageEvent.initMessageEvent = function(typeArg, canBubbleArg, cancelableArg, dataArg, originArg, lastEventIdArg, sourceArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='dataArg' type='Object' />
		/// <param name='originArg' type='String' />
		/// <param name='lastEventIdArg' type='String' />
		/// <param name='sourceArg' type='Object' />
		/// </signature>
	};


	/* -- type: DOMException -- */

	DOMException.name = '';
	DOMException.code = 0;
	DOMException.message = '';
	DOMException.HIERARCHY_REQUEST_ERR = 3;
	DOMException.NO_MODIFICATION_ALLOWED_ERR = 7;
	DOMException.DATA_CLONE_ERR = 25;
	DOMException.INVALID_MODIFICATION_ERR = 13;
	DOMException.NAMESPACE_ERR = 14;
	DOMException.INVALID_CHARACTER_ERR = 5;
	DOMException.TYPE_MISMATCH_ERR = 17;
	DOMException.ABORT_ERR = 20;
	DOMException.INVALID_STATE_ERR = 11;
	DOMException.SECURITY_ERR = 18;
	DOMException.NETWORK_ERR = 19;
	DOMException.WRONG_DOCUMENT_ERR = 4;
	DOMException.INVALID_NODE_TYPE_ERR = 24;
	DOMException.QUOTA_EXCEEDED_ERR = 22;
	DOMException.INDEX_SIZE_ERR = 1;
	DOMException.SYNTAX_ERR = 12;
	DOMException.DOMSTRING_SIZE_ERR = 2;
	DOMException.SERIALIZE_ERR = 82;
	DOMException.VALIDATION_ERR = 16;
	DOMException.NOT_FOUND_ERR = 8;
	DOMException.URL_MISMATCH_ERR = 21;
	DOMException.PARSE_ERR = 81;
	DOMException.NO_DATA_ALLOWED_ERR = 6;
	DOMException.NOT_SUPPORTED_ERR = 9;
	DOMException.TIMEOUT_ERR = 23;
	DOMException.INVALID_ACCESS_ERR = 15;
	DOMException.INUSE_ATTRIBUTE_ERR = 10;
	DOMException.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: FileReaderSync -- */

	FileReaderSync.readAsArrayBuffer = function(blob) { 
		/// <signature>
		/// <param name='blob' type='Blob' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	FileReaderSync.readAsDataURL = function(blob) { 
		/// <signature>
		/// <param name='blob' type='Blob' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	FileReaderSync.readAsText = function(blob, encoding) { 
		/// <signature>
		/// <param name='blob' type='Blob' />
		/// <param name='encoding' type='String' optional='true' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: MSUnsafeFunctionCallback -- */

	MSUnsafeFunctionCallback.callback = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};


	/* -- type: MessageChannel -- */

	MessageChannel.port2 = MessagePort;
	MessageChannel.port1 = MessagePort;


	/* -- type: DedicatedWorkerGlobalScope -- */

	DedicatedWorkerGlobalScope.onmessage = function() {};
	DedicatedWorkerGlobalScope.postMessage = function(data) { 
		/// <signature>
		/// <param name='data' type='Object' />
		/// </signature>
	};


	/* -- type: WorkerGlobalScope -- */
	_$implement(WorkerGlobalScope, EventTarget);
	_$implement(WorkerGlobalScope, WindowConsole);
	_$implement(WorkerGlobalScope, DedicatedWorkerGlobalScope);
	_$implement(WorkerGlobalScope, WorkerUtils);

	WorkerGlobalScope.location = WorkerLocation;
	WorkerGlobalScope.onerror = function() {};
	WorkerGlobalScope.self = _$getTrackingNull(Object.create(WorkerGlobalScope));
	WorkerGlobalScope.msWriteProfilerMark = function(profilerMarkName) { 
		/// <signature>
		/// <param name='profilerMarkName' type='String' />
		/// </signature>
	};
	WorkerGlobalScope.close = function() { };
	WorkerGlobalScope.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: IDBOpenDBRequest -- */

	_events(IDBOpenDBRequest, "onupgradeneeded", "onblocked");


	/* -- type: XMLHttpRequestEventTarget -- */
	_$implement(XMLHttpRequestEventTarget, EventTarget);

	_events(XMLHttpRequestEventTarget, "onload", "onerror", "onprogress", "ontimeout", "onabort", "onloadend", "onloadstart");


	/* -- type: DOMStringList -- */

	DOMStringList.length = 0;
	DOMStringList.contains = function(str) { 
		/// <signature>
		/// <param name='str' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	DOMStringList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return this[index] || _$getTrackingNull(''); 
	};
	/* Add a single array element */
	DOMStringList[0] = _$getTrackingNull('');


	/* -- type: IDBDatabase -- */
	_$implement(IDBDatabase, EventTarget);

	IDBDatabase.version = '';
	IDBDatabase.objectStoreNames = DOMStringList;
	IDBDatabase.name = '';
	IDBDatabase.close = function() { };
	IDBDatabase.createObjectStore = function(name, optionalParameters) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <param name='optionalParameters' type='Object' optional='true' />
		/// <returns type='IDBObjectStore'/>
		/// </signature>
		return IDBObjectStore; 
	};
	IDBDatabase.transaction = function(storeNames, mode) { 
		/// <signature>
		/// <param name='storeNames' type='Object' />
		/// <param name='mode' type='String' optional='true' />
		/// <returns type='IDBTransaction'/>
		/// </signature>
		return IDBTransaction; 
	};
	IDBDatabase.deleteObjectStore = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// </signature>
	};
	_events(IDBDatabase, "onerror", "onabort");


	/* -- type: IDBFactory -- */

	IDBFactory.open = function(name, version) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <param name='version' type='Number' optional='true' />
		/// <returns type='IDBOpenDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBOpenDBRequest, null, Object.create(IDBDatabase));
	};
	IDBFactory.cmp = function(first, second) { 
		/// <signature>
		/// <param name='first' type='Object' />
		/// <param name='second' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	IDBFactory.deleteDatabase = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='IDBOpenDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBOpenDBRequest, null, null);
	};


	/* -- type: NavigatorOnLine -- */

	NavigatorOnLine.onLine = false;


	/* -- type: CanvasPixelArray -- */

	CanvasPixelArray.length = 0;


	/* -- type: IDBCursor -- */

	IDBCursor.direction = '';
	IDBCursor.source = {};
	IDBCursor.primaryKey = {};
	IDBCursor.key = {};
	IDBCursor.PREV = "prev";
	IDBCursor.PREV_NO_DUPLICATE = "prevunique";
	IDBCursor.NEXT = "next";
	IDBCursor.NEXT_NO_DUPLICATE = "nextunique";
	IDBCursor.advance = function(count) { 
		/// <signature>
		/// <param name='count' type='Number' />
		/// </signature>
	};
	IDBCursor.delete = function() { 
		/// <signature>
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, undefined);
	};
	IDBCursor.continue = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' optional='true' />
		/// </signature>
	};
	IDBCursor.update = function(value) { 
		/// <signature>
		/// <param name='value' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, value);
	};


	/* -- type: IDBCursorWithValue -- */

	IDBCursorWithValue.value = {};


	/* -- type: EventException -- */

	EventException.name = '';
	EventException.code = 0;
	EventException.message = '';
	EventException.DISPATCH_REQUEST_ERR = 1;
	EventException.UNSPECIFIED_EVENT_TYPE_ERR = 0;
	EventException.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: Console -- */

	Console.profile = function(reportName) { 
		/// <signature>
		/// <param name='reportName' type='String' optional='true' />
		/// </signature>
	};
	Console.groupEnd = function() { };
	Console.assert = function(test, message, optionalParams) { 
		/// <signature>
		/// <param name='test' type='Boolean' optional='true' />
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.time = function(timerName) { 
		/// <signature>
		/// <param name='timerName' type='String' optional='true' />
		/// </signature>
	};
	Console.timeEnd = function(timerName) { 
		/// <signature>
		/// <param name='timerName' type='String' optional='true' />
		/// </signature>
	};
	Console.clear = function() { };
	Console.dir = function(value, optionalParams) { 
		/// <signature>
		/// <param name='value' type='Object' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.trace = function() { };
	Console.group = function(groupTitle) { 
		/// <signature>
		/// <param name='groupTitle' type='String' optional='true' />
		/// </signature>
	};
	Console.warn = function(message, optionalParams) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.error = function(message, optionalParams) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.debug = function(message, optionalParams) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.dirxml = function(value) { 
		/// <signature>
		/// <param name='value' type='Object' />
		/// </signature>
	};
	Console.log = function(message, optionalParams) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.profileEnd = function() { };
	Console.select = function(element) { 
		/// <signature>
		/// <param name='element' type='Object' />
		/// </signature>
	};
	Console.info = function(message, optionalParams) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.count = function(countTitle) { 
		/// <signature>
		/// <param name='countTitle' type='String' optional='true' />
		/// </signature>
	};
	Console.msIsIndependentlyComposed = function(element) { 
		/// <signature>
		/// <param name='element' type='Object' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Console.groupCollapsed = function(groupTitle) { 
		/// <signature>
		/// <param name='groupTitle' type='String' optional='true' />
		/// </signature>
	};


	/* -- type: EventListener -- */

	EventListener.handleEvent = function(evt) { 
		/// <signature>
		/// <param name='evt' type='Event' />
		/// </signature>
	};


	/* -- type: MSBlobBuilder -- */

	MSBlobBuilder.append = function(data, endings) { 
		/// <signature>
		/// <param name='data' type='Object' />
		/// <param name='endings' type='String' optional='true' />
		/// </signature>
	};
	MSBlobBuilder.getBlob = function(contentType) { 
		/// <signature>
		/// <param name='contentType' type='String' optional='true' />
		/// <returns type='Blob'/>
		/// </signature>
		return Blob; 
	};


	/* -- type: MSStreamReader -- */
	_$implement(MSStreamReader, MSBaseReader);

	MSStreamReader.error = DOMError;
	MSStreamReader.readAsArrayBuffer = function(stream, size) { 
		/// <signature>
		/// <param name='stream' type='MSStream' />
		/// <param name='size' type='Number' optional='true' />
		/// </signature>
	};
	MSStreamReader.readAsBlob = function(stream, size) { 
		/// <signature>
		/// <param name='stream' type='MSStream' />
		/// <param name='size' type='Number' optional='true' />
		/// </signature>
	};
	MSStreamReader.readAsDataURL = function(stream, size) { 
		/// <signature>
		/// <param name='stream' type='MSStream' />
		/// <param name='size' type='Number' optional='true' />
		/// </signature>
	};
	MSStreamReader.readAsText = function(stream, encoding, size) { 
		/// <signature>
		/// <param name='stream' type='MSStream' />
		/// <param name='encoding' type='String' optional='true' />
		/// <param name='size' type='Number' optional='true' />
		/// </signature>
	};


	/* -- type: File -- */

	File.lastModifiedDate = {};
	File.name = '';


	/* -- type: MSStream -- */

	MSStream.type = '';
	MSStream.msDetachStream = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	MSStream.msClose = function() { };


	/* -- type: ErrorEvent -- */

	ErrorEvent.colno = 0;
	ErrorEvent.filename = '';
	ErrorEvent.error = {};
	ErrorEvent.lineno = 0;
	ErrorEvent.message = '';
	ErrorEvent.initErrorEvent = function(typeArg, canBubbleArg, cancelableArg, messageArg, filenameArg, linenoArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='messageArg' type='String' />
		/// <param name='filenameArg' type='String' />
		/// <param name='linenoArg' type='Number' />
		/// </signature>
	};


	/* -- type: NavigatorID -- */

	NavigatorID.appVersion = '';
	NavigatorID.appName = '';
	NavigatorID.userAgent = '';
	NavigatorID.platform = '';
	NavigatorID.product = '';
	NavigatorID.vendor = '';


	/* -- type: WorkerNavigator -- */
	_$implement(WorkerNavigator, NavigatorOnLine);
	_$implement(WorkerNavigator, NavigatorID);



	/* -- type: IDBTransaction -- */
	_$implement(IDBTransaction, EventTarget);

	IDBTransaction.db = IDBDatabase;
	IDBTransaction.mode = '';
	IDBTransaction.error = DOMError;
	IDBTransaction.READ_ONLY = "readonly";
	IDBTransaction.VERSION_CHANGE = "versionchange";
	IDBTransaction.READ_WRITE = "readwrite";
	IDBTransaction.abort = function() { };
	IDBTransaction.objectStore = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='IDBObjectStore'/>
		/// </signature>
		return IDBObjectStore; 
	};
	_events(IDBTransaction, "oncomplete", "onerror", "onabort");


	/* -- type: FileList -- */

	FileList.length = 0;
	FileList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='File'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(File)); 
	};
	/* Add a single array element */
	FileList[0] = _$getTrackingNull(Object.create(File));


	/* -- type: MSExecAtPriorityFunctionCallback -- */

	MSExecAtPriorityFunctionCallback.callback = function(args) { 
		/// <signature>
		/// <param name='args' type='Object' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};


	/* -- type: IDBIndex -- */

	IDBIndex.unique = false;
	IDBIndex.name = '';
	IDBIndex.keyPath = '';
	IDBIndex.objectStore = IDBObjectStore;
	IDBIndex.count = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, 0);
	};
	IDBIndex.getKey = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this.objectStore, {});
	};
	IDBIndex.get = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this.objectStore, {});
	};
	IDBIndex.openKeyCursor = function(range, direction) { 
		/// <signature>
		/// <param name='range' type='IDBKeyRange' optional='true' />
		/// <param name='direction' type='String' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		var cursor = Object.create(IDBCursor); cursor.source = this; return _createIDBRequest(IDBRequest, this.objectStore, cursor);
	};
	IDBIndex.openCursor = function(range, direction) { 
		/// <signature>
		/// <param name='range' type='IDBKeyRange' optional='true' />
		/// <param name='direction' type='String' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		var cursor = Object.create(IDBCursorWithValue); cursor.source = this; return _createIDBRequest(IDBRequest, this, cursor);
	};


	/* -- type: XMLHttpRequest -- */
	_$implement(XMLHttpRequest, EventTarget);

	XMLHttpRequestCtor.LOADING = 3;
	XMLHttpRequestCtor.DONE = 4;
	XMLHttpRequestCtor.UNSENT = 0;
	XMLHttpRequestCtor.OPENED = 1;
	XMLHttpRequestCtor.HEADERS_RECEIVED = 2;
	XMLHttpRequest.status = 0;
	XMLHttpRequest.msCaching = '';
	XMLHttpRequest.readyState = 0;
	XMLHttpRequest.responseXML = {};
	XMLHttpRequest.responseType = '';
	XMLHttpRequest.timeout = 0;
	XMLHttpRequest.upload = XMLHttpRequestEventTarget;
	XMLHttpRequest.responseBody = {};
	XMLHttpRequest.response = {};
	XMLHttpRequest.withCredentials = false;
	XMLHttpRequest.responseText = '';
	XMLHttpRequest.statusText = '';
	XMLHttpRequest.LOADING = 3;
	XMLHttpRequest.DONE = 4;
	XMLHttpRequest.UNSENT = 0;
	XMLHttpRequest.OPENED = 1;
	XMLHttpRequest.HEADERS_RECEIVED = 2;
	XMLHttpRequest.create = function() { 
		/// <signature>
		/// <returns type='XMLHttpRequest'/>
		/// </signature>
		return XMLHttpRequest; 
	};
	XMLHttpRequest.msCachingEnabled = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	XMLHttpRequest.send = function(data) { 
		/// <signature>
		/// <param name='data' type='Object' optional='true' />
		/// </signature>
		/// <signature>
		/// <param name='data' type='String' optional='true' />
		/// </signature>
		this.status = 200; this.readyState = XMLHttpRequest.DONE; this.status = 4; this.statusText = "OK";
	};
	XMLHttpRequest.abort = function() { };
	XMLHttpRequest.getAllResponseHeaders = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	XMLHttpRequest.setRequestHeader = function(header, value) { 
		/// <signature>
		/// <param name='header' type='String' />
		/// <param name='value' type='String' />
		/// </signature>
	};
	XMLHttpRequest.getResponseHeader = function(header) { 
		/// <signature>
		/// <param name='header' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	XMLHttpRequest.open = function(method, url, async, user, password) { 
		/// <signature>
		/// <param name='method' type='String' />
		/// <param name='url' type='String' />
		/// <param name='async' type='Boolean' optional='true' />
		/// <param name='user' type='String' optional='true' />
		/// <param name='password' type='String' optional='true' />
		/// </signature>
	};
	XMLHttpRequest.overrideMimeType = function(mime) { 
		/// <signature>
		/// <param name='mime' type='String' />
		/// </signature>
	};
	_events(XMLHttpRequest, "onprogress", "onloadend", "onerror", "ontimeout", "onabort", "onreadystatechange", "onload", "onloadstart");



    function _publicInterface(name, interface, interfacePrototype) {
        _$nonRemovable(interface);
        WorkerGlobalScope[name] = interface;
        WorkerGlobalScope[name].prototype = interfacePrototype;
    }

    function _publicObject(name, obj) {
        _$nonRemovable(obj);
        WorkerGlobalScope[name] = obj;
    }
    
	_publicInterface('IDBIndex', {}, IDBIndex);
	_publicInterface('FileList', {}, FileList);
	_publicInterface('IDBTransaction', {
		'READ_ONLY' : "readonly",
		'VERSION_CHANGE' : "versionchange",
		'READ_WRITE' : "readwrite"
	}, IDBTransaction);
	_publicInterface('WorkerNavigator', {}, WorkerNavigator);
	_publicInterface('IDBCursor', {
		'PREV' : "prev",
		'PREV_NO_DUPLICATE' : "prevunique",
		'NEXT' : "next",
		'NEXT_NO_DUPLICATE' : "nextunique"
	}, IDBCursor);
	_publicInterface('ErrorEvent', {}, ErrorEvent);
	_publicInterface('MSStream', {}, MSStream);
	_publicInterface('File', {}, File);
	_publicInterface('Console', {}, Console);
	_publicInterface('EventException', {
		'DISPATCH_REQUEST_ERR' : 1,
		'UNSPECIFIED_EVENT_TYPE_ERR' : 0
	}, EventException);
	_publicInterface('IDBCursorWithValue', {}, IDBCursorWithValue);
	_publicInterface('CanvasPixelArray', {}, CanvasPixelArray);
	_publicInterface('IDBFactory', {}, IDBFactory);
	_publicInterface('IDBDatabase', {}, IDBDatabase);
	_publicInterface('DOMStringList', {}, DOMStringList);
	_publicInterface('XMLHttpRequestEventTarget', {}, XMLHttpRequestEventTarget);
	_publicInterface('IDBOpenDBRequest', {}, IDBOpenDBRequest);
	_publicInterface('WorkerGlobalScope', {}, WorkerGlobalScope);
	_publicInterface('DOMException', {
		'HIERARCHY_REQUEST_ERR' : 3,
		'NO_MODIFICATION_ALLOWED_ERR' : 7,
		'DATA_CLONE_ERR' : 25,
		'INVALID_MODIFICATION_ERR' : 13,
		'NAMESPACE_ERR' : 14,
		'INVALID_CHARACTER_ERR' : 5,
		'TYPE_MISMATCH_ERR' : 17,
		'ABORT_ERR' : 20,
		'INVALID_STATE_ERR' : 11,
		'SECURITY_ERR' : 18,
		'NETWORK_ERR' : 19,
		'WRONG_DOCUMENT_ERR' : 4,
		'INVALID_NODE_TYPE_ERR' : 24,
		'QUOTA_EXCEEDED_ERR' : 22,
		'INDEX_SIZE_ERR' : 1,
		'SYNTAX_ERR' : 12,
		'DOMSTRING_SIZE_ERR' : 2,
		'SERIALIZE_ERR' : 82,
		'VALIDATION_ERR' : 16,
		'NOT_FOUND_ERR' : 8,
		'URL_MISMATCH_ERR' : 21,
		'PARSE_ERR' : 81,
		'NO_DATA_ALLOWED_ERR' : 6,
		'NOT_SUPPORTED_ERR' : 9,
		'TIMEOUT_ERR' : 23,
		'INVALID_ACCESS_ERR' : 15,
		'INUSE_ATTRIBUTE_ERR' : 10
	}, DOMException);
	_publicInterface('MessageEvent', {}, MessageEvent);
	_publicInterface('DOMError', {}, DOMError);
	_publicInterface('CloseEvent', {}, CloseEvent);
	_publicInterface('ProgressEvent', {}, ProgressEvent);
	_publicInterface('WorkerLocation', {}, WorkerLocation);
	_publicInterface('IDBObjectStore', {}, IDBObjectStore);
	_publicInterface('MSAppView', {}, MSAppView);
	_publicInterface('IDBRequest', {}, IDBRequest);
	_publicInterface('MessagePort', {}, MessagePort);
	_publicInterface('Event', {
		'CAPTURING_PHASE' : 1,
		'AT_TARGET' : 2,
		'BUBBLING_PHASE' : 3
	}, Event);
	_publicInterface('ImageData', {}, ImageData);
	_publicObject('MSApp', MSApp);
	_publicInterface('IDBKeyRange', {
		'bound' : IDBKeyRange ['bound'],
		'only' : IDBKeyRange ['only'],
		'upperBound' : IDBKeyRange ['upperBound'],
		'lowerBound' : IDBKeyRange ['lowerBound']
	}, IDBKeyRange);
	_publicInterface('IDBVersionChangeEvent', {}, IDBVersionChangeEvent);

	_publicInterface('XMLHttpRequest', XMLHttpRequestCtor , XMLHttpRequest);
	_publicInterface('MSStreamReader', MSStreamReaderCtor , MSStreamReader);
	_publicInterface('MSBlobBuilder', MSBlobBuilderCtor , MSBlobBuilder);
	_publicInterface('MessageChannel', MessageChannelCtor , MessageChannel);
	_publicInterface('FileReaderSync', FileReaderSyncCtor , FileReaderSync);
	_publicInterface('WebSocket', WebSocketCtor , WebSocket);
	_publicInterface('FileReader', FileReaderCtor , FileReader);
	_publicInterface('Blob', BlobCtor , Blob);
	_publicInterface('Worker', WorkerCtor , Worker);

    this['XMLHttpRequest'].create = this['XMLHttpRequest'];
})();

function _$getActiveXObject(className, location) {
    if ((/XMLHTTP/i).test(className))
        return new window.XMLHttpRequest();
}

// SIG // Begin signature block
// SIG // MIIarQYJKoZIhvcNAQcCoIIanjCCGpoCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFLi8OmF3mzHr
// SIG // DqDiDxJ/DYBSbJ1loIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAA0JDFAyaDBeY0AAAAAADQwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMDMyNzIw
// SIG // MDgyNVoXDTE0MDYyNzIwMDgyNVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpCOEVDLTMwQTQtNzE0NDEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAOUaB60KlizUtjRkyzQg8rwEWIKLtQncUtRwn+Jc
// SIG // LOf1aqT1ti6xgYZZAexJbCkEHvU4i1cY9cAyDe00kOzG
// SIG // ReW7igolqu+he4fY8XBnSs1q3OavBZE97QVw60HPq7El
// SIG // ZrurorcY+XgTeHXNizNcfe1nxO0D/SisWGDBe72AjTOT
// SIG // YWIIsY9REmWPQX7E1SXpLWZB00M0+peB+PyHoe05Uh/4
// SIG // 6T7/XoDJBjYH29u5asc3z4a1GktK1CXyx8iNr2FnitpT
// SIG // L/NMHoMsY8qgEFIRuoFYc0KE4zSy7uqTvkyC0H2WC09/
// SIG // L88QXRpFZqsC8V8kAEbBwVXSg3JCIoY6pL6TUAECAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBRfS0LeDLk4oNRmNo1W
// SIG // +3RZSWaBKzAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAPQlCg1R6t
// SIG // Fz8fCqYrN4pnWC2xME8778JXaexl00zFUHLycyX25IQC
// SIG // xXUccVhDq/HJqo7fym9YPInnL816Nexm19Veuo6fV4aU
// SIG // EKDrUTetV/YneyNPGdjgbXYEJTBhEq2ljqMmtkjlU/JF
// SIG // TsW4iScQnanjzyPpeWyuk2g6GvMTxBS2ejqeQdqZVp7Q
// SIG // 0+AWlpByTK8B9yQG+xkrmLJVzHqf6JI6azF7gPMOnleL
// SIG // t+YFtjklmpeCKTaLOK6uixqs7ufsLr9LLqUHNYHzEyDq
// SIG // tEqTnr+cg1Z/rRUvXClxC5RnOPwwv2Xn9Tne6iLth4yr
// SIG // sju1AcKt4PyOJRUMIr6fDO0dMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAAMps1TISNcThVQABAAAAyjANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xNDA0
// SIG // MjIxNzM5MDBaFw0xNTA3MjIxNzM5MDBaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCWcV3tBkb6
// SIG // hMudW7dGx7DhtBE5A62xFXNgnOuntm4aPD//ZeM08aal
// SIG // IV5WmWxY5JKhClzC09xSLwxlmiBhQFMxnGyPIX26+f4T
// SIG // UFJglTpbuVildGFBqZTgrSZOTKGXcEknXnxnyk8ecYRG
// SIG // vB1LtuIPxcYnyQfmegqlFwAZTHBFOC2BtFCqxWfR+nm8
// SIG // xcyhcpv0JTSY+FTfEjk4Ei+ka6Wafsdi0dzP7T00+Lnf
// SIG // NTC67HkyqeGprFVNTH9MVsMTC3bxB/nMR6z7iNVSpR4o
// SIG // +j0tz8+EmIZxZRHPhckJRIbhb+ex/KxARKWpiyM/gkmd
// SIG // 1ZZZUBNZGHP/QwytK9R/MEBnAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUH17i
// SIG // XVCNVoa+SjzPBOinh7XLv4MwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1K2I0
// SIG // MjE4ZjEzLTZmY2EtNDkwZi05YzQ3LTNmYzU1N2RmYzQ0
// SIG // MDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAd1zr15E9zb17g9mFqbBDnXN8F8kP7Tbbx7UsG177
// SIG // VAU6g3FAgQmit3EmXtZ9tmw7yapfXQMYKh0nfgfpxWUf
// SIG // tc8Nt1THKDhaiOd7wRm2VjK64szLk9uvbg9dRPXUsO8b
// SIG // 1U7Brw7vIJvy4f4nXejF/2H2GdIoCiKd381wgp4Yctgj
// SIG // zHosQ+7/6sDg5h2qnpczAFJvB7jTiGzepAY1p8JThmUR
// SIG // dwmPNVm52IaoAP74MX0s9IwFncDB1XdybOlNWSaD8cKy
// SIG // iFeTNQB8UCu8Wfz+HCk4gtPeUpdFKRhOlludul8bo/En
// SIG // UOoHlehtNA04V9w3KDWVOjic1O1qhV0OIhFeezCCBbww
// SIG // ggOkoAMCAQICCmEzJhoAAAAAADEwDQYJKoZIhvcNAQEF
// SIG // BQAwXzETMBEGCgmSJomT8ixkARkWA2NvbTEZMBcGCgmS
// SIG // JomT8ixkARkWCW1pY3Jvc29mdDEtMCsGA1UEAxMkTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // MB4XDTEwMDgzMTIyMTkzMloXDTIwMDgzMTIyMjkzMlow
// SIG // eTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWlj
// SIG // cm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EwggEiMA0GCSqG
// SIG // SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCycllcGTBkvx2a
// SIG // YCAgQpl2U2w+G9ZvzMvx6mv+lxYQ4N86dIMaty+gMuz/
// SIG // 3sJCTiPVcgDbNVcKicquIEn08GisTUuNpb15S3GbRwfa
// SIG // /SXfnXWIz6pzRH/XgdvzvfI2pMlcRdyvrT3gKGiXGqel
// SIG // cnNW8ReU5P01lHKg1nZfHndFg4U4FtBzWwW6Z1KNpbJp
// SIG // L9oZC/6SdCnidi9U3RQwWfjSjWL9y8lfRjFQuScT5EAw
// SIG // z3IpECgixzdOPaAyPZDNoTgGhVxOVoIoKgUyt0vXT2Pn
// SIG // 0i1i8UU956wIAPZGoZ7RW4wmU+h6qkryRs83PDietHdc
// SIG // pReejcsRj1Y8wawJXwPTAgMBAAGjggFeMIIBWjAPBgNV
// SIG // HRMBAf8EBTADAQH/MB0GA1UdDgQWBBTLEejK0rQWWAHJ
// SIG // Ny4zFha5TJoKHzALBgNVHQ8EBAMCAYYwEgYJKwYBBAGC
// SIG // NxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQU/dExTtMm
// SIG // ipXhmGA7qDFvpjy82C0wGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwHwYDVR0jBBgwFoAUDqyCYEBWJ5flJRP8
// SIG // KuEKU5VZ5KQwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwDQYJKoZIhvcNAQEFBQADggIBAFk5
// SIG // Pn8mRq/rb0CxMrVq6w4vbqhJ9+tfde1MOy3XQ60L/svp
// SIG // LTGjI8x8UJiAIV2sPS9MuqKoVpzjcLu4tPh5tUly9z7q
// SIG // QX/K4QwXaculnCAt+gtQxFbNLeNK0rxw56gNogOlVuC4
// SIG // iktX8pVCnPHz7+7jhh80PLhWmvBTI4UqpIIck+KUBx3y
// SIG // 4k74jKHK6BOlkU7IG9KPcpUqcW2bGvgc8FPWZ8wi/1wd
// SIG // zaKMvSeyeWNWRKJRzfnpo1hW3ZsCRUQvX/TartSCMm78
// SIG // pJUT5Otp56miLL7IKxAOZY6Z2/Wi+hImCWU4lPF6H0q7
// SIG // 0eFW6NB4lhhcyTUWX92THUmOLb6tNEQc7hAVGgBd3TVb
// SIG // Ic6YxwnuhQ6MT20OE049fClInHLR82zKwexwo1eSV32U
// SIG // jaAbSANa98+jZwp0pTbtLS8XyOZyNxL0b7E8Z4L5UrKN
// SIG // MxZlHg6K3RDeZPRvzkbU0xfpecQEtNP7LN8fip6sCvsT
// SIG // J0Ct5PnhqX9GuwdgR2VgQE6wQuxO7bN2edgKNAltHIAx
// SIG // H+IOVN3lofvlRxCtZJj/UBYufL8FIXrilUEnacOTj5XJ
// SIG // jdibIa4NXJzwoq6GaIMMai27dmsAHZat8hZ79haDJLmI
// SIG // z2qoRzEvmtzjcT3XAH5iR9HOiMm4GPoOco3Boz2vAkBq
// SIG // /2mbluIQqBC0N1AI1sM9MIIGBzCCA++gAwIBAgIKYRZo
// SIG // NAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJbWlj
// SIG // cm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1
// SIG // MzA5WhcNMjEwNDAzMTMwMzA5WjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7d
// SIG // GE4kD+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr
// SIG // 6Hu97IkHD/cOBJjwicwfyzMkh53y9GccLPx754gd6udO
// SIG // o6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
// SIG // KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd+
// SIG // +NIT8wi3U21StEWQn0gASkdmEScpZqiX5NMGgUqi+YSn
// SIG // EUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68e
// SIG // eEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiAL
// SIG // AgMBAAGjggGrMIIBpzAPBgNVHRMBAf8EBTADAQH/MB0G
// SIG // A1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWzDzALBgNV
// SIG // HQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1Ud
// SIG // IwSBkDCBjYAUDqyCYEBWJ5flJRP8KuEKU5VZ5KShY6Rh
// SIG // MF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJ
// SIG // k/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQ
// SIG // ea0WoUqgpa1Mc1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BB
// SIG // hj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmww
// SIG // VAYIKwYBBQUHAQEESDBGMEQGCCsGAQUFBzAChjhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDANBgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wD
// SIG // RDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQSooxt
// SIG // YrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB
// SIG // 7uK+jwoFyI1I4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mR
// SIG // KiQicPv2/OR4mS4N9wficLwYTp2OawpylbihOZxnLcVR
// SIG // DupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPf
// SIG // wgphjvDXuBfrTot/xTUrXqO/67x9C0J71FNyIe4wyrt4
// SIG // ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGys
// SIG // OUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89D
// SIG // s+X57H2146SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BN
// SIG // Z8ifQv+AeSGAnhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU
// SIG // 2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LB
// SIG // J1S2sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJ
// SIG // Zr2dHYcSZAI9La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCl
// SIG // eKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
// SIG // mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6
// SIG // L54/LlUWa8kTo/0xggSXMIIEkwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGwMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTuCb0W9hki
// SIG // FxhJuFpCLqg7PEC9RDBQBgorBgEEAYI3AgEMMUIwQKAm
// SIG // gCQAZABlAGQAaQBjAGEAdABlAGQAdwBvAHIAawBlAHIA
// SIG // LgBqAHOhFoAUaHR0cDovL21pY3Jvc29mdC5jb20wDQYJ
// SIG // KoZIhvcNAQEBBQAEggEAQCgxbHzbgnXGkAHskozqjXX9
// SIG // 4cxDuRDD1howtOZlBjL/KwVVHCYv0bZOeZoJb56bxuYB
// SIG // 9oPos0zlMVTvd8wfgHwioqRjCo4Ot8UwRK9DGTXpbSPQ
// SIG // GOYkAuw8Ji9pe/3/8l9xB410zF6FiUDfKw5UoMV9ZD/9
// SIG // 7LBm02HC1/U4B8Ua8m6i0aN08+wHTiT/RcZv6mhq7XVS
// SIG // ircsdnbNmFfMEdpD15EK0RSdx4p2q8Np5y9fcANhbCnZ
// SIG // CpiFY2lx/VitOd19TKXX3FW+trDrKE/Te7bJnWP2t5wY
// SIG // aMIZAgJ1olBJW1gVszEvVHLiVt44pOO3zxrq0Xhtt5cw
// SIG // /sndh3yt/qGCAigwggIkBgkqhkiG9w0BCQYxggIVMIIC
// SIG // EQIBATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYD
// SIG // VQQDExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMA
// SIG // AAA0JDFAyaDBeY0AAAAAADQwCQYFKw4DAhoFAKBdMBgG
// SIG // CSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcN
// SIG // AQkFMQ8XDTE0MDUwMTA3NTIwOFowIwYJKoZIhvcNAQkE
// SIG // MRYEFJQuDn6UcqSS6c4s87eAW1e+h0ZrMA0GCSqGSIb3
// SIG // DQEBBQUABIIBAG+mcpyJBQfaK2moJ63GWBRXCn/1yzOZ
// SIG // qZebo/uohjP/QrHg8HTLCxCVrZVNZePbgv1owKnopk5C
// SIG // tULp84k/rfG+VhFA3pIMn3P6+LYj4vpiS5fBQ5lChtP2
// SIG // ljNuV9Xqgu5xnDm4+vih6Hhj2WqPqILV51LlPzTFr1Eh
// SIG // lB+Vvc/RZKXcIkqpjG9kzXLDypQTaTlRuP298S+oJaMO
// SIG // D/vZSmrx8SIMXEXtK3raZIwovYc6BCt/1WD4FD942VN7
// SIG // g8itcjU/0KlFYg82jHY8FRBWRb2d40+l4tqTpB7FyEf/
// SIG // iVa1iNxE9+Fltt3DsNXLEtfKYGZkB5Mf3b/QwCp2Hjz8FiM=
// SIG // End signature block
