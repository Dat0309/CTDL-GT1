var document = { };
(function () {
	var _eventManager = _$createEventManager(
	function getEventObject(type, attach, obj, ignoreCase) {
		function _eventTypeToObject(type, attach) {
			if(attach) return MSEventObj;
			switch (type) {
				case 'animationend':
				case 'animationiteration':
				case 'animationstart':
					return AnimationEvent;
				case 'beforeunload':
					return BeforeUnloadEvent;
				case 'close':
					return CloseEvent;
				case 'compositionend':
				case 'compositionstart':
				case 'compositionupdate':
					return CompositionEvent;
				case 'beforecopy':
				case 'beforecut':
				case 'beforepaste':
				case 'copy':
				case 'cut':
				case 'drag':
				case 'dragend':
				case 'dragenter':
				case 'dragleave':
				case 'dragover':
				case 'dragstart':
				case 'drop':
				case 'paste':
					return DragEvent;
				case 'error':
					return ErrorEvent;
				case 'afterprint':
				case 'beforeprint':
				case 'blocked':
				case 'bounce':
				case 'cached':
				case 'canplay':
				case 'canplaythrough':
				case 'change':
				case 'checking':
				case 'complete':
				case 'cuechange':
				case 'DOMContentLoaded':
				case 'downloading':
				case 'durationchange':
				case 'emptied':
				case 'ended':
				case 'enter':
				case 'error':
				case 'exit':
				case 'finish':
				case 'hashchange':
				case 'help':
				case 'input':
				case 'invalid':
				case 'load':
				case 'loadeddata':
				case 'loadedmetadata':
				case 'loadstart':
				case 'MSRegionUpdate':
				case 'noupdate':
				case 'obsolete':
				case 'offline':
				case 'online':
				case 'open':
				case 'pause':
				case 'play':
				case 'playing':
				case 'ratechange':
				case 'readystatechange':
				case 'reset':
				case 'seeked':
				case 'seeking':
				case 'selectionchange':
				case 'selectstart':
				case 'stalled':
				case 'start':
				case 'stop':
				case 'submit':
				case 'success':
				case 'suspend':
				case 'SVGAbort':
				case 'SVGError':
				case 'SVGLoad':
				case 'SVGResize':
				case 'SVGScroll':
				case 'SVGUnload':
				case 'timeout':
				case 'timeupdate':
				case 'unload':
				case 'updateready':
				case 'visibilitychange':
				case 'volumechange':
				case 'waiting':
					return Event;
				case 'blur':
				case 'focus':
				case 'focusin':
				case 'focusout':
					return FocusEvent;
				case 'upgradeneeded':
					return IDBVersionChangeEvent;
				case 'keydown':
				case 'keypress':
				case 'keyup':
					return KeyboardEvent;
				case 'message':
					return MessageEvent;
				case 'click':
				case 'contextmenu':
				case 'dblclick':
				case 'mousedown':
				case 'mouseenter':
				case 'mouseleave':
				case 'mousemove':
				case 'mouseout':
				case 'mouseover':
				case 'mouseup':
				case 'MSHoldVisual':
					return MouseEvent;
				case 'mousewheel':
					return MouseWheelEvent;
				case 'MSGestureChange':
				case 'MSGestureDoubleTap':
				case 'MSGestureEnd':
				case 'MSGestureHold':
				case 'MSGestureStart':
				case 'MSGestureTap':
				case 'MSInertiaStart':
					return MSGestureEvent;
				case 'MSManipulationStateChanged':
					return MSManipulationEvent;
				case 'MSGotPointerCapture':
				case 'MSLostPointerCapture':
				case 'MSPointerCancel':
				case 'MSPointerDown':
				case 'MSPointerHover':
				case 'MSPointerMove':
				case 'MSPointerOut':
				case 'MSPointerOver':
				case 'MSPointerUp':
					return MSPointerEvent;
				case 'mssitemodejumplistitemremoved':
				case 'msthumbnailclick':
					return MSSiteModeEvent;
				case 'DOMAttrModified':
				case 'DOMCharacterDataModified':
				case 'DOMNodeInserted':
				case 'DOMNodeRemoved':
				case 'DOMSubtreeModified':
					return MutationEvent;
				case 'popstate':
					return PopStateEvent;
				case 'loadend':
				case 'progress':
					return ProgressEvent;
				case 'storage':
				case 'storagecommit':
					return StorageEvent;
				case 'SVGZoom':
					return SVGZoomEvent;
				case 'textInput':
					return TextEvent;
				case 'addtrack':
					return TrackEvent;
				case 'transitionend':
				case 'transitionstart':
					return TransitionEvent;
				case 'abort':
				case 'activate':
				case 'beforeactivate':
				case 'beforedeactivate':
				case 'deactivate':
				case 'MSContentZoom':
				case 'resize':
				case 'scroll':
				case 'select':
					return UIEvent;
				case 'wheel':
					return WheelEvent;
			};
			return MSEventObj;
		}
		function _eventTypeToObjectIgnoreCase(type, attach) {
			if(attach) return MSEventObj;
			type = type.toLowerCase();
			switch (type) {
				case 'animationend':
				case 'animationiteration':
				case 'animationstart':
					return AnimationEvent;
				case 'beforeunload':
					return BeforeUnloadEvent;
				case 'close':
					return CloseEvent;
				case 'compositionend':
				case 'compositionstart':
				case 'compositionupdate':
					return CompositionEvent;
				case 'beforecopy':
				case 'beforecut':
				case 'beforepaste':
				case 'copy':
				case 'cut':
				case 'drag':
				case 'dragend':
				case 'dragenter':
				case 'dragleave':
				case 'dragover':
				case 'dragstart':
				case 'drop':
				case 'paste':
					return DragEvent;
				case 'error':
					return ErrorEvent;
				case 'afterprint':
				case 'beforeprint':
				case 'blocked':
				case 'bounce':
				case 'cached':
				case 'canplay':
				case 'canplaythrough':
				case 'change':
				case 'checking':
				case 'complete':
				case 'cuechange':
				case 'domcontentloaded':
				case 'downloading':
				case 'durationchange':
				case 'emptied':
				case 'ended':
				case 'enter':
				case 'error':
				case 'exit':
				case 'finish':
				case 'hashchange':
				case 'help':
				case 'input':
				case 'invalid':
				case 'load':
				case 'loadeddata':
				case 'loadedmetadata':
				case 'loadstart':
				case 'msregionupdate':
				case 'noupdate':
				case 'obsolete':
				case 'offline':
				case 'online':
				case 'open':
				case 'pause':
				case 'play':
				case 'playing':
				case 'ratechange':
				case 'readystatechange':
				case 'reset':
				case 'seeked':
				case 'seeking':
				case 'selectionchange':
				case 'selectstart':
				case 'stalled':
				case 'start':
				case 'stop':
				case 'submit':
				case 'success':
				case 'suspend':
				case 'svgabort':
				case 'svgerror':
				case 'svgload':
				case 'svgresize':
				case 'svgscroll':
				case 'svgunload':
				case 'timeout':
				case 'timeupdate':
				case 'unload':
				case 'updateready':
				case 'visibilitychange':
				case 'volumechange':
				case 'waiting':
					return Event;
				case 'blur':
				case 'focus':
				case 'focusin':
				case 'focusout':
					return FocusEvent;
				case 'upgradeneeded':
					return IDBVersionChangeEvent;
				case 'keydown':
				case 'keypress':
				case 'keyup':
					return KeyboardEvent;
				case 'message':
					return MessageEvent;
				case 'click':
				case 'contextmenu':
				case 'dblclick':
				case 'mousedown':
				case 'mouseenter':
				case 'mouseleave':
				case 'mousemove':
				case 'mouseout':
				case 'mouseover':
				case 'mouseup':
				case 'msholdvisual':
					return MouseEvent;
				case 'mousewheel':
					return MouseWheelEvent;
				case 'msgesturechange':
				case 'msgesturedoubletap':
				case 'msgestureend':
				case 'msgesturehold':
				case 'msgesturestart':
				case 'msgesturetap':
				case 'msinertiastart':
					return MSGestureEvent;
				case 'msmanipulationstatechanged':
					return MSManipulationEvent;
				case 'msgotpointercapture':
				case 'mslostpointercapture':
				case 'mspointercancel':
				case 'mspointerdown':
				case 'mspointerhover':
				case 'mspointermove':
				case 'mspointerout':
				case 'mspointerover':
				case 'mspointerup':
					return MSPointerEvent;
				case 'mssitemodejumplistitemremoved':
				case 'msthumbnailclick':
					return MSSiteModeEvent;
				case 'domattrmodified':
				case 'domcharacterdatamodified':
				case 'domnodeinserted':
				case 'domnoderemoved':
				case 'domsubtreemodified':
					return MutationEvent;
				case 'popstate':
					return PopStateEvent;
				case 'loadend':
				case 'progress':
					return ProgressEvent;
				case 'storage':
				case 'storagecommit':
					return StorageEvent;
				case 'svgzoom':
					return SVGZoomEvent;
				case 'textinput':
					return TextEvent;
				case 'addtrack':
					return TrackEvent;
				case 'transitionend':
				case 'transitionstart':
					return TransitionEvent;
				case 'abort':
				case 'activate':
				case 'beforeactivate':
				case 'beforedeactivate':
				case 'deactivate':
				case 'mscontentzoom':
				case 'resize':
				case 'scroll':
				case 'select':
					return UIEvent;
				case 'wheel':
					return WheelEvent;
			};
			return MSEventObj;
		}
		var e = ignoreCase ? _eventTypeToObjectIgnoreCase(type, attach) : _eventTypeToObject(type, attach);
		var eventObject = Object.create(e);
		eventObject.target = obj;
		eventObject.currentTarget = obj;
		eventObject.type = type;
		if (eventObject.relatedTarget)
			eventObject.relatedTarget = obj;
		return eventObject;
	});
	var _events = _eventManager.createEventProperties;

	function _createEvent(eventType) {
		function _eventTypeToObject(eventType) {
			if (eventType && typeof eventType === 'string') {
				switch(eventType.toLowerCase()) {
					case 'compositionevent': return CompositionEvent;
					case 'customevent': return CustomEvent;
					case 'dragevent': return DragEvent;
					case 'event':
					case 'events': return Event;
					case 'focusevent': return FocusEvent;
					case 'keyboardevent': return KeyboardEvent;
					case 'messageevent': return MessageEvent;
					case 'mouseevent':
					case 'mouseevents': return MouseEvent;
					case 'mousewheelevent': return MouseWheelEvent;
					case 'mutationevent':
					case 'mutationevents': return MutationEvent;
					case 'storageevent': return StorageEvent;
					case 'svgzoomevents': return SVGZoomEvent;
					case 'textevent': return TextEvent;
					case 'uievent': 
					case 'uievents': return UIEvent;
					case 'wheelevent': return WheelEvent;
					case 'errorevent': return ErrorEvent;
					case 'animationevent': return AnimationEvent;
					case 'msgestureevent': return MSGestureEvent;
					case 'mspointerevent': return MSPointerEvent;
					case 'transitionevent': return TransitionEvent;
					case 'progressevent': return ProgressEvent;
				}
			}
		};
		var e = _eventTypeToObject(eventType);
		if(!e) e = Event;
		return Object.create(e);
	}

	function _getElementByTagName(tagName) {
		if (typeof tagName !== 'string') return;
		switch (tagName.toLowerCase()) {
			case 'a' : return HTMLAnchorElement;
			case 'abbr' : return HTMLPhraseElement;
			case 'acronym' : return HTMLPhraseElement;
			case 'address' : return HTMLBlockElement;
			case 'applet' : return HTMLAppletElement;
			case 'area' : return HTMLAreaElement;
			case 'audio' : return HTMLAudioElement;
			case 'b' : return HTMLPhraseElement;
			case 'base' : return HTMLBaseElement;
			case 'basefont' : return HTMLBaseFontElement;
			case 'bdo' : return HTMLPhraseElement;
			case 'bgsound' : return HTMLBGSoundElement;
			case 'big' : return HTMLPhraseElement;
			case 'blockquote' : return HTMLBlockElement;
			case 'body' : return HTMLBodyElement;
			case 'br' : return HTMLBRElement;
			case 'button' : return HTMLButtonElement;
			case 'canvas' : return HTMLCanvasElement;
			case 'caption' : return HTMLTableCaptionElement;
			case 'center' : return HTMLBlockElement;
			case 'circle' : return SVGCircleElement;
			case 'cite' : return HTMLPhraseElement;
			case 'clippath' : return SVGClipPathElement;
			case 'code' : return HTMLPhraseElement;
			case 'col' : return HTMLTableColElement;
			case 'colgroup' : return HTMLTableColElement;
			case 'datalist' : return HTMLDataListElement;
			case 'dd' : return HTMLDDElement;
			case 'defs' : return SVGDefsElement;
			case 'del' : return HTMLModElement;
			case 'desc' : return SVGDescElement;
			case 'dfn' : return HTMLPhraseElement;
			case 'dir' : return HTMLDirectoryElement;
			case 'div' : return HTMLDivElement;
			case 'dl' : return HTMLDListElement;
			case 'dt' : return HTMLDTElement;
			case 'ellipse' : return SVGEllipseElement;
			case 'em' : return HTMLPhraseElement;
			case 'embed' : return HTMLEmbedElement;
			case 'feblend' : return SVGFEBlendElement;
			case 'fecolormatrix' : return SVGFEColorMatrixElement;
			case 'fecomponenttransfer' : return SVGFEComponentTransferElement;
			case 'fecomposite' : return SVGFECompositeElement;
			case 'feconvolvematrix' : return SVGFEConvolveMatrixElement;
			case 'fediffuselighting' : return SVGFEDiffuseLightingElement;
			case 'fedisplacementmap' : return SVGFEDisplacementMapElement;
			case 'fedistantlight' : return SVGFEDistantLightElement;
			case 'feflood' : return SVGFEFloodElement;
			case 'fefunca' : return SVGFEFuncAElement;
			case 'fefuncb' : return SVGFEFuncBElement;
			case 'fefuncg' : return SVGFEFuncGElement;
			case 'fefuncr' : return SVGFEFuncRElement;
			case 'fegaussianblur' : return SVGFEGaussianBlurElement;
			case 'feimage' : return SVGFEImageElement;
			case 'femerge' : return SVGFEMergeElement;
			case 'femergenode' : return SVGFEMergeNodeElement;
			case 'femorphology' : return SVGFEMorphologyElement;
			case 'feoffset' : return SVGFEOffsetElement;
			case 'fepointlight' : return SVGFEPointLightElement;
			case 'fespecularlighting' : return SVGFESpecularLightingElement;
			case 'fespotlight' : return SVGFESpotLightElement;
			case 'fetile' : return SVGFETileElement;
			case 'feturbulence' : return SVGFETurbulenceElement;
			case 'fieldset' : return HTMLFieldSetElement;
			case 'filter' : return SVGFilterElement;
			case 'font' : return HTMLFontElement;
			case 'form' : return HTMLFormElement;
			case 'formdata' : return FormData;
			case 'frame' : return HTMLFrameElement;
			case 'frameset' : return HTMLFrameSetElement;
			case 'g' : return SVGGElement;
			case 'h1' : return HTMLHeadingElement;
			case 'h2' : return HTMLHeadingElement;
			case 'h3' : return HTMLHeadingElement;
			case 'h4' : return HTMLHeadingElement;
			case 'h5' : return HTMLHeadingElement;
			case 'h6' : return HTMLHeadingElement;
			case 'head' : return HTMLHeadElement;
			case 'hr' : return HTMLHRElement;
			case 'html' : return HTMLHtmlElement;
			case 'i' : return HTMLPhraseElement;
			case 'iframe' : return HTMLIFrameElement;
			case 'image' : return SVGImageElement;
			case 'img' : return HTMLImageElement;
			case 'input' : return HTMLInputElement;
			case 'ins' : return HTMLModElement;
			case 'isindex' : return HTMLIsIndexElement;
			case 'kbd' : return HTMLPhraseElement;
			case 'keygen' : return HTMLBlockElement;
			case 'label' : return HTMLLabelElement;
			case 'legend' : return HTMLLegendElement;
			case 'li' : return HTMLLIElement;
			case 'line' : return SVGLineElement;
			case 'lineargradient' : return SVGLinearGradientElement;
			case 'link' : return HTMLLinkElement;
			case 'listing' : return HTMLBlockElement;
			case 'map' : return HTMLMapElement;
			case 'marker' : return SVGMarkerElement;
			case 'marquee' : return HTMLMarqueeElement;
			case 'mask' : return SVGMaskElement;
			case 'menu' : return HTMLMenuElement;
			case 'meta' : return HTMLMetaElement;
			case 'metadata' : return SVGMetadataElement;
			case 'nextid' : return HTMLNextIdElement;
			case 'nobr' : return HTMLPhraseElement;
			case 'object' : return HTMLObjectElement;
			case 'ol' : return HTMLOListElement;
			case 'optgroup' : return HTMLOptGroupElement;
			case 'option' : return HTMLOptionElement;
			case 'p' : return HTMLParagraphElement;
			case 'param' : return HTMLParamElement;
			case 'path' : return SVGPathElement;
			case 'pattern' : return SVGPatternElement;
			case 'plaintext' : return HTMLBlockElement;
			case 'polygon' : return SVGPolygonElement;
			case 'polyline' : return SVGPolylineElement;
			case 'pre' : return HTMLPreElement;
			case 'progress' : return HTMLProgressElement;
			case 'q' : return HTMLQuoteElement;
			case 'radialgradient' : return SVGRadialGradientElement;
			case 'rect' : return SVGRectElement;
			case 'rt' : return HTMLPhraseElement;
			case 'ruby' : return HTMLPhraseElement;
			case 's' : return HTMLPhraseElement;
			case 'samp' : return HTMLPhraseElement;
			case 'script' : return HTMLScriptElement;
			case 'select' : return HTMLSelectElement;
			case 'small' : return HTMLPhraseElement;
			case 'source' : return HTMLSourceElement;
			case 'span' : return HTMLSpanElement;
			case 'stop' : return SVGStopElement;
			case 'strike' : return HTMLPhraseElement;
			case 'strong' : return HTMLPhraseElement;
			case 'style' : return HTMLStyleElement;
			case 'sub' : return HTMLPhraseElement;
			case 'sup' : return HTMLPhraseElement;
			case 'svg' : return SVGSVGElement;
			case 'switch' : return SVGSwitchElement;
			case 'symbol' : return SVGSymbolElement;
			case 'table' : return HTMLTableElement;
			case 'tbody' : return HTMLTableSectionElement;
			case 'td' : return HTMLTableDataCellElement;
			case 'text' : return SVGTextElement;
			case 'textarea' : return HTMLTextAreaElement;
			case 'textpath' : return SVGTextPathElement;
			case 'tfoot' : return HTMLTableSectionElement;
			case 'th' : return HTMLTableHeaderCellElement;
			case 'thead' : return HTMLTableSectionElement;
			case 'title' : return HTMLTitleElement;
			case 'tr' : return HTMLTableRowElement;
			case 'track' : return HTMLTrackElement;
			case 'tspan' : return SVGTSpanElement;
			case 'tt' : return HTMLPhraseElement;
			case 'u' : return HTMLPhraseElement;
			case 'ul' : return HTMLUListElement;
			case 'unknown' : return HTMLUnknownElement;
			case 'use' : return SVGUseElement;
			case 'var' : return HTMLPhraseElement;
			case 'video' : return HTMLVideoElement;
			case 'view' : return SVGViewElement;
			case 'xmp' : return HTMLBlockElement;
			default: return HTMLElement;
		};
	}

	function _getNewElementByTagName(tagName) {
		if (typeof tagName !== 'string') return;
		var element = Object.create(_getElementByTagName(tagName));
		element.localName = tagName;
		element.tagName = element.nodeName = tagName.toUpperCase(); 
		return element;
	}

	function _createDomObject(name) {
		return Window[name] && Window[name].prototype && Object.create(Window[name].prototype);
	};

	function _isAsyncScript(object) {
		return object && HTMLScriptElement.isPrototypeOf(object);
	}

	function _createElementByTagName(tagName) {
		if (typeof tagName !== 'string') return;
		var element = _getNewElementByTagName(tagName);
		element._$searchable = true;
		return element;
	}

	function _wrapInList(list, resultListType, missingValueType, outputList) {
		var nodeList = typeof outputList !== 'undefined' ? outputList : Object.create(resultListType);
		var originalOutputListLength = typeof outputList !== 'undefined' ? outputList.length : 0;
		if (list) {
			for (var i = 0; i< list.length; i++) {
				nodeList[i] = list[i];
			}
			// clear any remaining items in outputList
			for (var i = list.length; i< originalOutputListLength; i++) {
				nodeList[i] = undefined;
			}
			nodeList.length = list.length;
		}
		if (missingValueType && nodeList.length == 0)
			nodeList[0] = _$getTrackingUndefined(missingValueType);
		return nodeList;
	}

	function _createHTMLCollection(elementType) {
		var result = Object.create(HTMLCollection);
		result[0] = _$getTrackingNull(_createElementByTagName(elementType));
		return result;
	}

	var _defaultScripts = [];

	function _scriptInDefaultList(scriptElement) {
		var found = false;
		if (scriptElement && scriptElement.src && _defaultScripts && _defaultScripts.length > 0) {
			_defaultScripts.forEach(function (entry) {
				if (scriptElement.src == entry.src)
					found = true;
			});
		}
		return found;
	}

	function _getElementsByTagName(source, tagName) {
		var result = [];
		if (typeof tagName === 'string') {
			tagName = tagName.toLowerCase();
			if (source && source._$searchable)
				return _findElementsByTagName(source, tagName);
			else if (tagName === 'script') {
				if (_defaultScripts.length > 0)
					result = _$asyncRequests.getItems().length == 1 ? _defaultScripts : _defaultScripts.concat(_$asyncRequests.getItems());
				else
					result = _$asyncRequests.getItems();
			}
			else
				result = [ _getNewElementByTagName(tagName) ];
		}
		return _wrapInList(result, NodeList, _getNewElementByTagName(tagName));
	}

	function _findElementsByTagName(source, tagName, outputList) {
		var elements = [];
		_visitChildNodes(source, function(e) { 
			if (_isElement(e) && ('*' == tagName || e.tagName.toLowerCase() == tagName)) elements.push(e);		
		});
		var result = _wrapInList(elements, NodeList, _getNewElementByTagName(tagName), outputList);
		if (typeof outputList === 'undefined') {
			if (typeof source._$queries === 'undefined')
				source._$queries = [];
			source._$queries.push({queryString: tagName, result: result});
		}
		return result;
	}

	function _visitChildNodes(start, callback) {
		if (_isNode(start) && _hasChildNodes(start)) {
				var q = [];
				q = q.concat(_childNodeList(start));
				var c = 0;
				while (q.length > 0 && c++ < 1000) {
						var e = q.shift();
						if (_isNode(e)) { 
							callback(e);
							if(_hasChildNodes(e)) q = q.concat(_childNodeList(e));
						}
				}
		}
	}

	function _refreshQueries(node){
		if (_isNode(node)){
			if (node._$queries)
				for(var i =0; i < node._$queries.length; i++)
					_findElementsByTagName(node, node._$queries[i].queryString, node._$queries[i].result) 
				// referesh the parent queries
				_refreshQueries(node.parentNode);
		}
	}

	function _embedAsyncRequest(originalObject, asyncRequest) {
		if (originalObject) {
			var newObject = Object.create(originalObject);
			_$defineProperty(newObject, '_$asyncRequest', asyncRequest);
			return newObject;
		}
		return originalObject;
	}

	function _getEmbeddedAsyncRequest(obj) {
		return (obj && obj._$asyncRequest) ? obj._$asyncRequest : obj;
	}

	function _isNode(n) {
		return typeof n !== 'undefined' && n && Node.isPrototypeOf(n);
	}

	function _isElement(e) {
		return typeof e !== 'undefined' && e && Element.isPrototypeOf(e);
	}

	function _getMatchingNull(obj) {
		return _$getTrackingNull(Object.create(_isElement(obj) ? HTMLElement : Node));
	}

	function _isParentOf(parent, obj) {
		if (obj) {
			var cur = obj.parentNode;
			while (cur) {
				if (cur == parent) 
					return true;
				cur = cur.parentNode;
			}
		}
		return false;
	}

	function _childNodes(obj, resultListType) {
		if (typeof obj._$children === 'undefined')
			obj._$children = Object.create(resultListType);
		return obj._$children;
	}

	function _childNodeList(obj) {
		return typeof obj._$children !== 'undefined'? Array.prototype.slice.call(obj._$children) : [];
	}

	function _hasChildNodes(obj) {
		return typeof obj._$children !== 'undefined' && obj._$children.length > 0;
	}

	function _firstChild(obj, defaultObj) {
		return _hasChildNodes(obj) ? obj._$children[0] : _$getTrackingNull(Object.create(_isElement(obj) ? HTMLElement : defaultObj));
	}

	function _lastChild(obj, defaultObj) {
		return _hasChildNodes(obj) ? obj._$children[obj._$children.length - 1] : _$getTrackingNull(Object.create(_isElement(obj) ? HTMLElement : defaultObj));
	}

	function _clearElement(obj) {
		if (_hasChildNodes(obj)) {
			for (var i = 0; i < obj._$children.length; i++)
				obj._$children[i].parentNode = obj._$children[i].nextSibling = obj._$children[i].previousSibling = _getMatchingNull(obj._$children[i]);
			obj._$children = undefined;
			_refreshQueries(obj);
		}
	}

	function _removeChild(obj, oldChild) {
		if (_isNode(oldChild) && _hasChildNodes(obj)) {
			for (var i = 0; i < obj._$children.length; i++) {
				if (oldChild == obj._$children[i]) {
					if (oldChild.previousSibling) {
						oldChild.previousSibling.nextSibling = oldChild.nextSibling;
					}
					if (oldChild.nextSibling) {
						oldChild.nextSibling.previousSibling = oldChild.previousSibling;
					}
					Array.prototype.splice.call(obj._$children, i, 1);
					oldChild.parentNode = oldChild.nextSibling = oldChild.previousSibling = _getMatchingNull(obj);
					_refreshQueries(obj);
					break;
				}
			}
		}
		return oldChild;
	}

	function _appendChildInternal(obj, newChild) {
		if (_isNode(newChild) && obj != newChild && !_isParentOf(newChild, obj)) {
			if (newChild.parentNode)
				_removeChild(newChild.parentNode, newChild);
			if (typeof obj._$children === 'undefined')
				obj._$children = Object.create(NodeList);
			var previousSibling = obj._$children.length >= 1 ? obj._$children[obj._$children.length - 1] : null;
			Array.prototype.push.call(obj._$children, newChild);
			newChild.parentNode = obj;
			if (previousSibling) {
				newChild.previousSibling = previousSibling;
				previousSibling.nextSibling = newChild;
			}
			_refreshQueries(obj);
		}
		return newChild;
	}

	function _appendChild(obj, newChild) {
		if (_isAsyncScript(newChild) && !_scriptInDefaultList(newChild))
			_$asyncRequests.add(newChild);
		return _appendChildInternal(obj, newChild);
	}

	function _insertBefore(obj, newChild, refChild) {
		if (_isNode(newChild) && obj != newChild && !_isParentOf(newChild, obj)) {
			if (newChild.parentNode)
				_removeChild(newChild.parentNode, newChild);
			if (typeof obj._$children === 'undefined')
				obj._$children = Object.create(NodeList);
			var index = 0;
			var nextSibling = null;
			var previousSibling = null;
			for (index = 0; index < obj._$children.length; index++) {
				if (refChild == obj._$children[index]) {
					nextSibling = refChild;
					break;
				}
				previousSibling = obj._$children[index];
			}
			Array.prototype.splice.call(obj._$children, index, 0, newChild);
			newChild.parentNode = obj;
			if (nextSibling) {
				newChild.nextSibling = nextSibling;
				nextSibling.previousSibling = newChild;
			}
			if (previousSibling) {
				newChild.previousSibling = previousSibling;
				previousSibling.nextSibling = newChild;
			}
			_refreshQueries(obj);
		}
		if (_isAsyncScript(newChild) && !_scriptInDefaultList(newChild))
			_$asyncRequests.insertBefore(newChild, _getEmbeddedAsyncRequest(refChild));
		return newChild;
	}

	function _replaceChild(obj, newChild, oldChild) {
		if (_isNode(newChild) && obj != newChild && !_isParentOf(newChild, obj) && _isNode(oldChild) && _hasChildNodes(obj)) {
			for (var i = 0; i < obj._$children.length; i++) {
				if (oldChild == obj._$children[i]) {
					if (newChild.parentNode)
						_removeChild(newChild.parentNode, newChild);
					newChild.previousSibling = oldChild.previousSibling;
					newChild.nextSibling = oldChild.nextSibling;
					if (oldChild.previousSibling) {
						oldChild.previousSibling.nextSibling = newChild;
					}
					if (oldChild.nextSibling) {
						oldChild.nextSibling.previousSibling = newChild;
					}
					newChild.parentNode = obj;
					obj._$children[i] = newChild;
					oldChild.parentNode =	oldChild.nextSibling = oldChild.previousSibling = _getMatchingNull(obj);
					_refreshQueries(obj);
					break;
				}
			}
		}
		if (_isAsyncScript(newChild) && !_scriptInDefaultList(newChild))
			_$asyncRequests.replace(newChild, _getEmbeddedAsyncRequest(oldChild));
		return oldChild;
	}

	function _firstElementChild(obj) {
		if (_isNode(obj)) {
			var cur = _firstChild(obj);
			do {
				if (_isElement(cur))
					return cur;
				cur = cur.nextSibling;
			} while (cur);
		}
		return _$getTrackingNull(Object.create(HTMLElement));
	}

	function _lastElementChild(obj) {
		if (_isNode(obj)) {
			var cur = _lastChild(obj);
			do {
				if (_isElement(cur))
					return cur;
				cur = cur.previousSibling;
			} while (cur);
		}
		return _$getTrackingNull(Object.create(HTMLElement));
	}

	function _nextElementSibling(obj) {
		if (_isNode(obj)) {
			var cur = obj.nextSibling;
			do {
				if (_isElement(cur))
					return cur;
				cur = cur.nextSibling;
			} while (cur);
		}
		return _$getTrackingNull(Object.create(HTMLElement));
	}

	function _previousElementSibling(obj) {
		if (_isNode(obj)) {
			var cur = obj.previousSibling;
			do {
				if (_isElement(cur))
					return cur;
				cur = cur.previousSibling;
			} while (cur);
		}
		return _$getTrackingNull(Object.create(HTMLElement));
	}

	function _parentElement(obj) {
		if (_isNode(obj)) {
			var cur = obj.parentNode;
			do {
				if (_isElement(cur))
					return cur;
				cur = cur.parentNode;
			} while (cur);
		}
		return _$getTrackingNull(Object.create(HTMLElement));
	}

	function _childElementCount(obj) {
		var count = 0;
		if (_isNode(obj)) {
			var cur = _firstChild(obj);
			do {
				if (_isElement(cur))
					count ++;
				cur = cur.nextSibling;
			} while (cur);
		}
		return count;
	}

	function _applyElement(obj, apply, where) {
		if(!obj || !apply) return;
		if(where == undefined || where == "outside") {
			if(!obj.parentNode) return;
			_replaceChild(obj.parentNode, apply, obj);
			_appendChild(apply, obj);
		} 
		else if(where == 'inside') {
			var children = obj._$children != undefined ? Array.prototype.slice.call(obj._$children) : [];
			for(var i=0; i<children.length; i++) {
				_removeChild(obj, children[i]);
			}
			_appendChild(obj, apply);
			for(var i=0; i<children.length; i++) {
				_appendChild(apply, children[i]);
			}
		}
	}

	function _hasAttribute(object, name) {
		if (object)
			return object.hasOwnProperty(name);
		else
			return false;
	}

	function _setAttribute(object, name, value) {
		if (object)
			object[name] = value;
	}

	function _getAttribute(object, name) {
		if (_hasAttribute(object, name))
			return object[name];
		else 
			return null;
	}

	function _recordElementId(id, e) {
		if (typeof document._$documentElements != 'object')
			document._$documentElements = {};
		document._$documentElements[id] = e;
	}

	function _lookupElement(id) {
		return (document._$documentElements && document._$documentElements[id]);
	}

	function _getElementById(elementId) {
		var element = _lookupElement(elementId) || Object.create(HTMLElement);
		element.id = elementId;
		return element;
	}

	var scriptTagRegEx = /<[\s]*script[^>]*src[\s]*=[\s]*['"]([^'">]+)['"]/gim;
	function _setInnerHTML(source, content) {
			// since we are not parsing the inner html, mark the node as unsearchable
			source._$searchable = false;
			var scriptTag = null;
			while (scriptTag = scriptTagRegEx.exec(content)) {
					var scriptElement = Object.create(HTMLScriptElement);
					scriptElement.src = scriptTag[1];
					if (!_scriptInDefaultList(scriptElement))
						_$asyncRequests.add(scriptElement);
			}
	}

	function _formElements(form) {
		var elements = [];
		_visitChildNodes(form, function(node) {
			if(_isElement(node)) {
				var tagName = node.tagName.toLowerCase();
				if(tagName == 'input' || tagName == 'select' || tagName == 'button' || tagName == 'textarea' || tagName == 'fieldset') elements.push(node);
			}
		});
		return _wrapInList(elements, HTMLCollection, Object.create(HTMLElement));
	}

	function _selectOptions(select) {
		var options = [];
		_visitChildNodes(select, function(node) {
			var tagName = node.tagName.toLowerCase();
			if(tagName == 'option') options.push(node); 
			else if(tagName != 'optgroup') return false; 
		});
		return _wrapInList(options, HTMLCollection, _createElementByTagName('option'));
	}

	var queryIdSelectorRegEx = /^\s*#([^<>\s]+)\s*$/;
	function _queryIdSelector(selectors, returnFirstElementOnly) {
		var results = [];
		if (typeof selectors === 'string') {
			var parts = selectors.split(',');
			for (var i = 0; i < parts.length; i++) {
				var m = queryIdSelectorRegEx.exec(parts[i]);
				if (m && m[1]) {
					var e = _lookupElement(m[1]);
					if (e) {
						if (returnFirstElementOnly) return e;
						results.push(e);
					}
				}
			}
		}
		if (!returnFirstElementOnly)
			return results;
	}

	function _querySelectorAll(obj, selectors) {
		var results = _queryIdSelector(selectors);
		if (results.length == 0)
			results = [Object.create(HTMLElement)];
		return _wrapInList(results, NodeList);
	}

	function _querySelector(obj, selectors) {
		var results = _queryIdSelector(selectors, true);
		if (!result)
			result = _$getTrackingNull(Object.create(HTMLElement));
		return results;
	}

	function _extend(obj, original, filter) {
		if (obj && original) {
			var propertyNames = Object.getOwnPropertyNames(original);
			if (propertyNames && propertyNames.length > 0) {
				for (var p in propertyNames) {
					var name = propertyNames[p];
					if (typeof name != 'string' || (filter && name.match(filter))) continue;
					Object.defineProperty(obj, name, Object.getOwnPropertyDescriptor(original, name));
				}
			}
		}
	}

	function _recordChildren(parent, elementDefinitions, parentForm) {
		if (_isElement(parent) && elementDefinitions && elementDefinitions.length > 0) {
			for (var i = 0 ; i < elementDefinitions.length; i++) {
				var e = elementDefinitions[i];
				if (e) {
					var element = _createElementByTagName(e.$tag);

					// Insert in global lists
					if (typeof e.id == 'string') {
						_recordElementId(e.id, element);
						// Simulate IE behaviour by exposing the element on the parent using its id
						if (parentForm && e.$formElement)
							parentForm[e.id] = element;
						else 
							window[e.id] = element;
					}

					if (_isAsyncScript(element))
						_defaultScripts.push(element);

					// Initialize children
					if (e.$children)
						_recordChildren(element, e.$children, e.$tag.toLowerCase() == 'form' ? element : parentForm);

					// Copy properties
					_extend(element, e, /(^[\$].+)|(^_\$fieldDoc\$\$.+)/);

					if (e.$object) {
						_extend(element, e.$object);
					}

					_appendChildInternal(parent, element);
				}
			}
		}
	}

	function _recordDomStructure(elementDefinitions) {
		if (elementDefinitions && elementDefinitions.length > 0) {
			_clearElement(document.body);
			_clearElement(document.head);
			_defaultScripts = [];

			for (var i = 0 ; i < elementDefinitions.length; i++) {
				var e = elementDefinitions[i];
				if (e && e.$tag && e.$children) {
					if (e.$tag == 'body')
						_recordChildren(document.body, e.$children);
					else if (e.$tag == 'head')
						_recordChildren(document.head, e.$children);
				}
			}
		}
	}

	function _createIDBRequest(requestType, source, result){
		var request = Object.create(requestType);
		request.source = source;
		request.result = result;
		return request; 
	}


	var SVGElementEventHandlers = {};
	var EventTarget = {};
	var SVGExternalResourcesRequired = {};
	var NodeSelector = {};
	var ElementTraversal = {};
	var MSElementExtensions = {};
	var SVGLangSpace = {};
	var SVGStylable = {};
	var Node = {};
	var Element = _$inherit(Node);
	var SVGElement = _$inherit(Element);
	var SVGTests = {};
	var SVGUnitTypes = {};
	var SVGMaskElement = _$inherit(SVGElement);
	var MSCSSMatrix = {};
	var MSCSSMatrixCtor = function() { return Object.create(MSCSSMatrix); };
	var DOML2DeprecatedAlignmentStyle_HTMLTableCellElement = {};
	var ClientRectList = {};
	var MSXMLHttpRequestExtensions = {};
	var MSNodeExtensions = {};
	var MSHTMLElementRangeExtensions = {};
	var MSElementCSSInlineStyleExtensions = {};
	var ElementCSSInlineStyle = {};
	var MSHTMLElementExtensions = {};
	var MSEventAttachmentTarget = {};
	var HTMLElement = _$inherit(Element);
	var HTMLTrackElement = _$inherit(HTMLElement);
	var CSSRuleList = {};
	var MSDataBindingRecordSetExtensions = {};
	var PositionCallback = {};
	var SVGStopElement = _$inherit(SVGElement);
	var HTMLDataListElement = _$inherit(HTMLElement);
	var PerformanceNavigation = {};
	var MSHTMLMediaElementExtensions = {};
	var MSAttrExtensions = {};
	var Attr = _$inherit(Node);
	var SVGPreserveAspectRatio = {};
	var SVGLocatable = {};
	var SVGTransformable = _$inherit(SVGLocatable);
	var SVGSwitchElement = _$inherit(SVGElement);
	var MSHTMLIsIndexElementExtensions = {};
	var MSCompatibleInfoCollection = {};
	var MSHTMLDocumentSelection = {};
	var SVGPathSeg = {};
	var SVGPathSegLinetoRel = _$inherit(SVGPathSeg);
	var HTMLIsIndexElement = _$inherit(HTMLElement);
	var CSSTextProperties = {};
	var MSHTMLOptGroupElementExtensions = {};
	var MSDataBindingExtensions = {};
	var HTMLOptGroupElement = _$inherit(HTMLElement);
	var DOML2DeprecatedAlignmentStyle_HTMLTableSectionElement = {};
	var CharacterData = _$inherit(Node);
	var DocumentView = {};
	var MSHTMLMenuElementExtensions = {};
	var PositionOptions = {};
	var MSHTMLFrameSetElementExtensions = {};
	var HTMLHRElementDOML2Deprecated = {};
	var DOML2DeprecatedWidthStyle_HTMLHRElement = {};
	var DOML2DeprecatedAlignmentStyle_HTMLHRElement = {};
	var DOML2DeprecatedColorProperty = {};
	var MSHTMLHRElementExtensions = {};
	var DOML2DeprecatedSizeProperty = {};
	var HTMLHRElement = _$inherit(HTMLElement);
	var CanvasPattern = {};
	var PerformanceEntry = {};
	var PerformanceResourceTiming = _$inherit(PerformanceEntry);
	var MSCommentExtensions = {};
	var Comment = _$inherit(CharacterData);
	var MSMediaErrorExtensions = {};
	var MediaError = {};
	var DOML2DeprecatedAlignmentStyle_HTMLFieldSetElement = {};
	var MSHTMLFieldSetElementExtensions = {};
	var HTMLFieldSetElement = _$inherit(HTMLElement);
	var MSFileSaver = {};
	var DOML2DeprecatedBackgroundColorStyle = {};
	var MSHTMLTableSectionElementExtensions = {};
	var DOML2DeprecatedMarginStyle_HTMLInputElement = {};
	var CSSGridProperties = {};
	var MSBorderColorStyle_HTMLFrameElement = {};
	var NodeFilter = {};
	var DOML2DeprecatedTextFlowControl_HTMLBlockElement = {};
	var MSHTMLParagraphElementExtensions = {};
	var DOML2DeprecatedTextFlowControl_HTMLBRElement = {};
	var MSEventExtensions = {};
	var Event = {};
	var PopStateEvent = _$inherit(Event);
	var FrameRequestCallback = {};
	var MSHTMLTableRowElementExtensions = {};
	var DOML2DeprecatedWordWrapSuppression_HTMLDDElement = {};
	var Blob = {};
	var BlobCtor = function() { return Object.create(Blob); };
	var DOML2DeprecatedWordWrapSuppression_HTMLDTElement = {};
	var HTMLDTElement = _$inherit(HTMLElement);
	var DOMParser = {};
	var DOMParserCtor = function() { return Object.create(DOMParser); };
	var MSHTMLFormElementExtensions = {};
	var MSHTMLCollectionExtensions = {};
	var HTMLFormElement = _$inherit(HTMLElement);
	var DOML2DeprecatedAlignmentStyle_HTMLHeadingElement = {};
	var MSHTMLHeadingElementExtensions = {};
	var HTMLHeadingElement = _$inherit(HTMLElement);
	var SVGFilterPrimitiveStandardAttributes = _$inherit(SVGStylable);
	var SVGFEOffsetElement = _$inherit(SVGElement);
	var MSHTMLSpanElementExtensions = {};
	var HTMLSpanElement = _$inherit(HTMLElement);
	var WindowBase64 = {};
	var DOML2DeprecatedWidthStyle = {};
	var SVGAnimatedPoints = {};
	var SVGPolylineElement = _$inherit(SVGElement);
	var UIEvent = _$inherit(Event);
	var TextEvent = _$inherit(UIEvent);
	var CSSRule = {};
	var CSSFontFaceRule = _$inherit(CSSRule);
	var ProcessingInstruction = _$inherit(Node);
	var MSWindowExtensions = {};
	var SVGLengthList = {};
	var SVGPathSegCurvetoQuadraticSmoothAbs = _$inherit(SVGPathSeg);
	var NamedNodeMap = {};
	var IDBKeyRange = {};
	var DOML2DeprecatedBorderStyle = {};
	var SVGRectElement = _$inherit(SVGElement);
	var SVGURIReference = {};
	var SVGGradientElement = _$inherit(SVGElement);
	var SVGLinearGradientElement = _$inherit(SVGGradientElement);
	var SVGMatrix = {};
	var MSPopupWindow = {};
	var BeforeUnloadEvent = _$inherit(Event);
	var MSMouseEventExtensions = {};
	var SVGPathSegLinetoAbs = _$inherit(SVGPathSeg);
	var SVGFEDisplacementMapElement = _$inherit(SVGElement);
	var WindowTimersExtension = {};
	var MSHTMLSelectElementExtensions = {};
	var SVGComponentTransferFunctionElement = _$inherit(SVGElement);
	var SVGFEFuncRElement = _$inherit(SVGComponentTransferFunctionElement);
	var SVGPathSegCurvetoCubicAbs = _$inherit(SVGPathSeg);
	var DocumentStyle = {};
	var MSHTMLMarqueeElementExtensions = {};
	var DOML2DeprecatedMarginStyle_HTMLMarqueeElement = {};
	var HTMLMarqueeElement = _$inherit(HTMLElement);
	var Geolocation = {};
	var CSSImportRule = _$inherit(CSSRule);
	var DOML2DeprecatedSizeProperty_HTMLBaseFontElement = {};
	var HTMLBaseFontElement = _$inherit(HTMLElement);
	var SVGCircleElement = _$inherit(SVGElement);
	var MSBorderColorHighlightStyle_HTMLTableRowElement = {};
	var HTMLMediaElement = _$inherit(HTMLElement);
	var HTMLAudioElement = _$inherit(HTMLMediaElement);
	var IDBCursor = {};
	var CSSAnimationsProperties = {};
	var SVGPathSegList = {};
	var MSHTMLDocumentEventExtensions = {};
	var SVGAnimatedPathData = {};
	var SVGPathElement = _$inherit(SVGElement);
	var MouseEvent = _$inherit(UIEvent);
	var WheelEvent = _$inherit(MouseEvent);
	var ViewCSS_SVGSVGElement = {};
	var SVGFEGaussianBlurElement = _$inherit(SVGElement);
	var Location = {};
	var MSHTMLLIElementExtensions = {};
	var SVGTextContentElement = _$inherit(SVGElement);
	var WebSocket = {};
	var WebSocketCtor = function() { return Object.create(WebSocket); };
	var HTMLPhraseElement = _$inherit(HTMLElement);
	var MSHTMLAreaElementExtensions = {};
	var SVGPolygonElement = _$inherit(SVGElement);
	var SVGPathSegMovetoAbs = _$inherit(SVGPathSeg);
	var SVGMetadataElement = _$inherit(SVGElement);
	var WindowLocalStorage = {};
	var DOMHTMLImplementation = {};
	var MSBorderColorHighlightStyle_HTMLTableCellElement = {};
	var DOMTokenList = {};
	var MSHTMLPreElementExtensions = {};
	var HTMLPreElement = _$inherit(HTMLElement);
	var DOML2DeprecatedAlignmentStyle_HTMLInputElement = {};
	var SVGAnimatedNumber = {};
	var MSCSSScrollTranslationProperties = {};
	var HTMLParamElement = _$inherit(HTMLElement);
	var DOML2DeprecatedBorderStyle_HTMLInputElement = {};
	var MSHTMLInputElementExtensions = {};
	var MSImageResourceExtensions_HTMLInputElement = {};
	var HTMLInputElement = _$inherit(HTMLElement);
	var MSHTMLAnchorElementExtensions = {};
	var HTMLAnchorElement = _$inherit(HTMLElement);
	var HTMLTableAlignment = {};
	var HTMLTableSectionElement = _$inherit(HTMLElement);
	var DOML2DeprecatedListNumberingAndBulletStyle = {};
	var MSGestureEvent = _$inherit(UIEvent);
	var SVGRadialGradientElement = _$inherit(SVGGradientElement);
	var DocumentType = _$inherit(Node);
	var TextRangeCollection = {};
	var HTMLTableHeaderCellScope = {};
	var AbstractWorker = {};
	var Worker = {};
	var WorkerCtor = function() { return Object.create(Worker); };
	var DocumentTraversal = {};
	var MSApp = {};
	var DOML2DeprecatedWordWrapSuppression_HTMLDivElement = {};
	var SVGStyleElement = _$inherit(SVGElement);
	var ViewCSS = {};
	var SVGFEImageElement = _$inherit(SVGElement);
	var SVGPathSegLinetoVerticalAbs = _$inherit(SVGPathSeg);
	var HTMLLIElement = _$inherit(HTMLElement);
	var SVGTextPositioningElement = _$inherit(SVGTextContentElement);
	var SVGTSpanElement = _$inherit(SVGTextPositioningElement);
	var SVGAnimatedInteger = {};
	var NavigatorAbilities = {};
	var DOML2DeprecatedListSpaceReduction = {};
	var MSHTMLDirectoryElementExtensions = {};
	var HTMLDirectoryElement = _$inherit(HTMLElement);
	var MSHTMLLegendElementExtensions = {};
	var DOML2DeprecatedAlignmentStyle_HTMLLegendElement = {};
	var HTMLLegendElement = _$inherit(HTMLElement);
	var DOML2DeprecatedAlignmentStyle_HTMLIFrameElement = {};
	var MSResourceMetadata = {};
	var MSHTMLLabelElementExtensions = {};
	var HTMLLabelElement = _$inherit(HTMLElement);
	var SVGSVGElementEventHandlers = {};
	var SVGZoomAndPan = {};
	var SVGFitToViewBox = {};
	var DocumentEvent = {};
	var SVGSVGElement = _$inherit(SVGElement);
	var MSHTMLFontElementExtensions = {};
	var MSPointerEvent = _$inherit(MouseEvent);
	var SVGPoint = {};
	var MSRangeExtensions = {};
	var Range = {};
	var DOMSettableTokenList = _$inherit(DOMTokenList);
	var FocusEvent = _$inherit(UIEvent);
	var Coordinates = {};
	var MSScreenExtensions = {};
	var Screen = {};
	var MSBorderColorStyle_HTMLFrameSetElement = {};
	var HTMLFrameSetElement = _$inherit(HTMLElement);
	var MSHTMLTableCellElementExtensions = {};
	var SVGAElement = _$inherit(SVGElement);
	var MSHTMLDListElementExtensions = {};
	var HTMLDListElement = _$inherit(HTMLElement);
	var DOML2DeprecatedBackgroundStyle = {};
	var MSBorderColorStyle_HTMLTableCellElement = {};
	var DOML2DeprecatedTableCellHeight = {};
	var DOML2DeprecatedWordWrapSuppression = {};
	var DOML2DeprecatedWidthStyle_HTMLTableCellElement = {};
	var HTMLTableCellElement = _$inherit(HTMLElement);
	var HTMLTableHeaderCellElement = _$inherit(HTMLTableCellElement);
	var XMLHttpRequest = {};
	var XMLHttpRequestCtor = function() { return Object.create(XMLHttpRequest); };
	var MSHTMLButtonElementExtensions = {};
	var ApplicationCache = {};
	var SVGDefsElement = _$inherit(SVGElement);
	var MSHTMLQuoteElementExtensions = {};
	var HTMLQuoteElement = _$inherit(HTMLElement);
	var SVGAnimatedLength = {};
	var DOML2DeprecatedMarginStyle_MSHTMLIFrameElementExtensions = {};
	var SVGPathSegClosePath = _$inherit(SVGPathSeg);
	var SVGTransformList = {};
	var HTMLHtmlElementDOML2Deprecated = {};
	var HTMLHtmlElement = _$inherit(HTMLElement);
	var SVGPathSegArcAbs = _$inherit(SVGPathSeg);
	var SVGPathSegLinetoHorizontalAbs = _$inherit(SVGPathSeg);
	var CanvasRenderingContext2D = {};
	var MSCSSRuleList = {};
	var DOML2DeprecatedWordWrapSuppression_HTMLBodyElement = {};
	var MSHTMLBodyElementExtensions = {};
	var KeyboardEventExtensions = {};
	var KeyboardEvent = _$inherit(UIEvent);
	var HTMLSourceElement = _$inherit(HTMLElement);
	var MSLaunchUriCallback = {};
	var IDBRequest = {};
	var IDBOpenDBRequest = _$inherit(IDBRequest);
	var HTMLButtonElement = _$inherit(HTMLElement);
	var DOMStringList = {};
	var SVGAngle = {};
	var IDBDatabase = {};
	var HTMLAreaElement = _$inherit(HTMLElement);
	var HTMLCollection = {};
	var MSCSSTouchManipulationProperties = {};
	var MSCSSRegionProperties = {};
	var MSCSSStyleDeclarationExtensions = {};
	var CSS2DTransformsProperties = {};
	var SVG1_1Properties = {};
	var CSSTransitionsProperties = {};
	var MSCSSSelectionBoundaryProperties = {};
	var CSSFontsProperties = {};
	var CSSFlexibleBoxProperties = {};
	var MSCSSHighContrastProperties = {};
	var CSS3DTransformsProperties = {};
	var CSSMultiColumnProperties = {};
	var MSCSSPositionedFloatsProperties = {};
	var MSCSSContentZoomProperties = {};
	var CSS3Properties = {};
	var CSS2Properties = {};
	var CSSStyleDeclaration = {};
	var MSCSSProperties = _$inherit(CSSStyleDeclaration);
	var MSSiteModeEvent = _$inherit(Event);
	var SVGFEFuncGElement = _$inherit(SVGComponentTransferFunctionElement);
	var TextTrackList = {};
	var CSSKeyframesRule = _$inherit(CSSRule);
	var AudioTrack = {};
	var SVGFEConvolveMatrixElement = _$inherit(SVGElement);
	var SVGAnimatedTransformList = {};
	var MSHTMLTableCaptionElementExtensions = {};
	var DOML2DeprecatedAlignmentStyle_HTMLTableCaptionElement = {};
	var HTMLTableCaptionElement = _$inherit(HTMLElement);
	var WindowSessionStorage = {};
	var WindowConsole = {};
	var MSHTMLFrameElementExtensions = {};
	var DOML2DeprecatedAlignmentStyle_HTMLImageElement = {};
	var SVGTitleElement = _$inherit(SVGElement);
	var MSHTMLTableElementExtensions = {};
	var SVGFEDistantLightElement = _$inherit(SVGElement);
	var DOML2DeprecatedBorderStyle_HTMLObjectElement = {};
	var MSHTMLAppletElementExtensions = {};
	var MSCSSStyleRuleExtensions = {};
	var CSSStyleRule = _$inherit(CSSRule);
	var NodeIterator = {};
	var SVGScriptElement = _$inherit(SVGElement);
	var SVGAnimatedAngle = {};
	var Selection = {};
	var MSHTMLMetaElementExtensions = {};
	var HTMLMetaElement = _$inherit(HTMLElement);
	var MSSelection = {};
	var MSCSSStyleSheetExtensions = {};
	var StyleSheet = {};
	var CSSStyleSheet = _$inherit(StyleSheet);
	var HTMLSelectElement = _$inherit(HTMLElement);
	var MSBaseReader = {};
	var Text = _$inherit(CharacterData);
	var CDATASection = _$inherit(Text);
	var SVGPathSegLinetoVerticalRel = _$inherit(SVGPathSeg);
	var SVGAnimatedString = {};
	var TextMetrics = {};
	var DOML2DeprecatedMarginStyle_HTMLObjectElement = {};
	var DOML2DeprecatedWidthStyle_HTMLAppletElement = {};
	var DOML2DeprecatedAlignmentStyle_HTMLObjectElement = {};
	var HTMLAppletElement = _$inherit(HTMLElement);
	var IDBCursorWithValue = _$inherit(IDBCursor);
	var DOML2DeprecatedAlignmentStyle_HTMLTableElement = {};
	var SVGClipPathElement = _$inherit(SVGElement);
	var MSHTMLObjectElementExtensions = {};
	var SVGDescElement = _$inherit(SVGElement);
	var SVGFESpecularLightingElement = _$inherit(SVGElement);
	var SVGPathSegMovetoRel = _$inherit(SVGPathSeg);
	var HTMLNextIdElement = _$inherit(HTMLElement);
	var IDBVersionChangeEvent = _$inherit(Event);
	var MSHTMLEmbedElementExtensions = {};
	var MSHTMLDocumentExtensions = {};
	var DocumentRange = {};
	var DOML2DeprecatedWidthStyle_HTMLBlockElement = {};
	var IDBObjectStore = {};
	var MSHTMLTableDataCellElementExtensions = {};
	var HTMLTableDataCellElement = _$inherit(HTMLTableCellElement);
	var TransitionEvent = _$inherit(Event);
	var SVGPathSegCurvetoCubicSmoothAbs = _$inherit(SVGPathSeg);
	var SVGFEMergeElement = _$inherit(SVGElement);
	var MSStyleCSSProperties = _$inherit(MSCSSProperties);
	var SVGMarkerElement = _$inherit(SVGElement);
	var WindowTimers = {};
	var CompositionEvent = _$inherit(UIEvent);
	var MSDataBindingTableExtensions = {};
	var Performance = {};
	var SVGPathSegCurvetoQuadraticRel = _$inherit(SVGPathSeg);
	var GetSVGDocument = {};
	var MSGesture = {};
	var MSGestureCtor = function() { return Object.create(MSGesture); };
	var SVGFEFloodElement = _$inherit(SVGElement);
	var SVGFEMergeNodeElement = _$inherit(SVGElement);
	var TrackEvent = _$inherit(Event);
	var SVGFEComponentTransferElement = _$inherit(SVGElement);
	var SVGFEDiffuseLightingElement = _$inherit(SVGElement);
	var MSHTMLVideoElementExtensions = {};
	var HTMLVideoElement = _$inherit(HTMLMediaElement);
	var LinkStyle = {};
	var MSHTMLTableColElementExtensions = {};
	var SVGSymbolElement = _$inherit(SVGElement);
	var SVGElementInstanceList = {};
	var SVGFECompositeElement = _$inherit(SVGElement);
	var HTMLBodyElementDOML2Deprecated = {};
	var MSBorderColorStyle_HTMLTableRowElement = {};
	var DOML2DeprecatedBorderStyle_MSHTMLIFrameElementExtensions = {};
	var MSHTMLIFrameElementExtensions = {};
	var FormData = {};
	var FormDataCtor = function() { return Object.create(FormData); };
	var MSManipulationEvent = _$inherit(UIEvent);
	var SVGAnimatedBoolean = {};
	var DOMException = {};
	var StorageEvent = _$inherit(Event);
	var HTMLEmbedElement = _$inherit(HTMLElement);
	var HTMLObjectElement = _$inherit(HTMLElement);
	var HTMLBGSoundElement = _$inherit(HTMLElement);
	var SVGNumberList = {};
	var MSStream = {};
	var AbstractView = {};
	var ScreenView = _$inherit(AbstractView);
	var MSHTMLOListElementExtensions = {};
	var CSSKeyframeRule = _$inherit(CSSRule);
	var StyleSheetPage = {};
	var PerformanceMeasure = _$inherit(PerformanceEntry);
	var XMLSerializer = {};
	var XMLSerializerCtor = function() { return Object.create(XMLSerializer); };
	var NodeList = {};
	var SVGTextPathElement = _$inherit(SVGTextContentElement);
	var FileReader = {};
	var FileReaderCtor = function() { return Object.create(FileReader); };
	var MessagePort = {};
	var DOML2DeprecatedBorderStyle_HTMLTableElement = {};
	var MSMimeTypesCollection = {};
	var MSUnsafeFunctionCallback = {};
	var NodeFilterCallback = {};
	var HTMLHeadElement = _$inherit(HTMLElement);
	var HTMLProgressElement = _$inherit(HTMLElement);
	var MSHTMLDivElementExtensions = {};
	var HTMLBRElement = _$inherit(HTMLElement);
	var DocumentVisibility = {};
	var CSSPageRule = _$inherit(CSSRule);
	var WindowPerformance = {};
	var PerformanceMark = _$inherit(PerformanceEntry);
	var SVGFEColorMatrixElement = _$inherit(SVGElement);
	var BookmarkCollection = {};
	var Position = {};
	var DocumentFragment = _$inherit(Node);
	var MSBehaviorUrnsCollection = {};
	var SVGPathSegCurvetoCubicSmoothRel = _$inherit(SVGPathSeg);
	var MediaList = {};
	var DOML2DeprecatedAlignmentStyle_HTMLDivElement = {};
	var HTMLDivElement = _$inherit(HTMLElement);
	var NavigatorDoNotTrack = {};
	var MSHTMLUListElementExtensions = {};
	var HTMLUListElement = _$inherit(HTMLElement);
	var SVGFEFuncBElement = _$inherit(SVGComponentTransferFunctionElement);
	var SVGAnimatedEnumeration = {};
	var MSHTMLDocumentViewExtensions = {};
	var HTMLDocument = {};
	var SVGException = {};
	var DOML2DeprecatedAlignmentStyle_HTMLTableColElement = {};
	var HTMLTableColElement = _$inherit(HTMLElement);
	var MSRangeCollection = {};
	var ImageData = {};
	var SVGUseElement = _$inherit(SVGElement);
	var MSHTMLModElementExtensions = {};
	var HTMLModElement = _$inherit(HTMLElement);
	var TimeRanges = {};
	var SVGPathSegCurvetoQuadraticAbs = _$inherit(SVGPathSeg);
	var History = {};
	var SVGRect = {};
	var MSWindowModeless = {};
	var DOML2DeprecatedMarginStyle = {};
	var MSHTMLTextAreaElementExtensions = {};
	var HTMLTextAreaElement = _$inherit(HTMLElement);
	var CustomEvent = _$inherit(Event);
	var StyleSheetList = {};
	var SVGElementInstance = {};
	var BrowserPublic = {};
	var PositionError = {};
	var MSImageResourceExtensions = {};
	var MSDataBindingRecordSetReadonlyExtensions = {};
	var MSHTMLUnknownElementExtensions = {};
	var HTMLUnknownElement = _$inherit(HTMLElement);
	var CSSNamespaceRule = _$inherit(CSSRule);
	var SVGAnimatedRect = {};
	var MSCompatibleInfo = {};
	var SVGNumber = {};
	var IDBIndex = {};
	var MSCSSFilter = {};
	var SVGTransform = {};
	var MSBorderColorHighlightStyle = {};
	var MSLinkStyleExtensions = {};
	var HTMLStyleElement = _$inherit(HTMLElement);
	var HTMLTitleElement = _$inherit(HTMLElement);
	var HTMLCanvasElement = _$inherit(HTMLElement);
	var MSEventObj = {};
	var SVGPathSegCurvetoCubicRel = _$inherit(SVGPathSeg);
	var DOMError = {};
	var SVGLength = {};
	var XDomainRequest = {};
	var XDomainRequestCtor = function() { return Object.create(XDomainRequest); };
	var SVGStringList = {};
	var SVGPathSegArcRel = _$inherit(SVGPathSeg);
	var NavigatorOnLine = {};
	var EventException = {};
	var PerformanceTiming = {};
	var MSStreamReader = {};
	var MSStreamReaderCtor = function() { return Object.create(MSStreamReader); };
	var SVGImageElement = _$inherit(SVGElement);
	var SVGFilterElement = _$inherit(SVGElement);
	var ErrorEvent = _$inherit(Event);
	var DragEvent = _$inherit(MouseEvent);
	var MutationEvent = _$inherit(Event);
	var HTMLBodyElement = _$inherit(HTMLElement);
	var MSNavigatorAbilities = {};
	var HTMLIFrameElement = _$inherit(HTMLElement);
	var MSStorageExtensions = {};
	var Storage = {};
	var ValidityState = {};
	var MSCurrentStyleCSSProperties = _$inherit(MSCSSProperties);
	var SVGTextElement = _$inherit(SVGTextPositioningElement);
	var MSHTMLImageElementExtensions = {};
	var MSPluginsCollection = {};
	var SVGAnimatedNumberList = {};
	var IDBFactory = {};
	var DataTransfer = {};
	var EventListener = {};
	var MSBlobBuilder = {};
	var MSBlobBuilderCtor = function() { return Object.create(MSBlobBuilder); };
	var NavigatorGeolocation = {};
	var SVGEllipseElement = _$inherit(SVGElement);
	var SVGPathSegLinetoHorizontalRel = _$inherit(SVGPathSeg);
	var WindowModal = {};
	var CSSMediaRule = _$inherit(CSSRule);
	var HTMLFrameElement = _$inherit(HTMLElement);
	var MSBorderColorStyle = {};
	var DOML2DeprecatedAlignmentStyle_HTMLTableRowElement = {};
	var HTMLTableRowElement = _$inherit(HTMLElement);
	var MediaQueryListListener = {};
	var TextTrack = {};
	var HTMLScriptElement = _$inherit(HTMLElement);
	var MessageEvent = _$inherit(Event);
	var SVGDocument = {};
	var Document = _$inherit(Node);
	var CanvasGradient = {};
	var HTMLImageElement = _$inherit(HTMLElement);
	var SVGFESpotLightElement = _$inherit(SVGElement);
	var StyleSheetPageList = {};
	var Console = {};
	var WindowAnimationTiming = {};
	var SVGAnimatedPreserveAspectRatio = {};
	var SVGFETurbulenceElement = _$inherit(SVGElement);
	var IDBEnvironment = {};
	var Window = this;
	var SVGAnimatedLengthList = {};
	var TextTrackCueList = {};
	var SVGPointList = {};
	var MouseWheelEvent = _$inherit(MouseEvent);
	var IDBTransaction = {};
	var HTMLMenuElement = _$inherit(HTMLElement);
	var HTMLMapElement = _$inherit(HTMLElement);
	var HTMLOptionElement = _$inherit(HTMLElement);
	var ControlRangeCollection = {};
	var HTMLFontElement = _$inherit(HTMLElement);
	var HTMLLinkElement = _$inherit(HTMLElement);
	var SVGViewElement = _$inherit(SVGElement);
	var HTMLDDElement = _$inherit(HTMLElement);
	var AnimationEvent = _$inherit(Event);
	var SVGPatternElement = _$inherit(SVGElement);
	var HTMLBlockElement = _$inherit(HTMLElement);
	var TextRange = {};
	var SVGFEMorphologyElement = _$inherit(SVGElement);
	var StyleMedia = {};
	var HTMLOListElement = _$inherit(HTMLElement);
	var AudioTrackList = {};
	var XMLHttpRequestEventTarget = {};
	var RangeException = {};
	var MSScriptHost = {};
	var URL = {};
	var SVGPathSegCurvetoQuadraticSmoothRel = _$inherit(SVGPathSeg);
	var File = _$inherit(Blob);
	var HTMLAreasCollection = _$inherit(HTMLCollection);
	var ErrorFunction = {};
	var DOML2DeprecatedAlignmentStyle_HTMLParagraphElement = {};
	var HTMLParagraphElement = _$inherit(HTMLElement);
	var SVGLineElement = _$inherit(SVGElement);
	var FileList = {};
	var ObjectURLOptions = {};
	var DOMImplementation = {};
	var PositionErrorCallback = {};
	var ClientRect = {};
	var HTMLBaseElement = _$inherit(HTMLElement);
	var SVGZoomEvent = _$inherit(UIEvent);
	var ProgressEvent = _$inherit(Event);
	var CloseEvent = _$inherit(Event);
	var SVGFEPointLightElement = _$inherit(SVGElement);
	var MediaQueryList = {};
	var NavigatorID = {};
	var Navigator = {};
	var MessageChannel = {};
	var MessageChannelCtor = function() { return Object.create(MessageChannel); };
	var SVGGElement = _$inherit(SVGElement);
	var SVGFEBlendElement = _$inherit(SVGElement);
	var SVGFETileElement = _$inherit(SVGElement);
	var SVGFEFuncAElement = _$inherit(SVGComponentTransferFunctionElement);
	var CanvasPixelArray = {};
	var TextTrackCue = {};
	var TreeWalker = {};
	var HTMLTableElement = _$inherit(HTMLElement);

	/* -- type: SVGElementEventHandlers -- */

	_events(SVGElementEventHandlers, "onmouseover", "onmouseout", "onmousemove", "ondblclick", "onfocusout", "onfocusin", "onmousedown", "onload", "onmouseup", "onclick");


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


	/* -- type: SVGExternalResourcesRequired -- */

	SVGExternalResourcesRequired.externalResourcesRequired = SVGAnimatedBoolean;


	/* -- type: NodeSelector -- */

	NodeSelector.querySelectorAll = function(selectors) { 
		/// <signature>
		/// <param name='selectors' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return _querySelectorAll(this, selectors);
	};
	NodeSelector.querySelector = function(selectors) { 
		/// <signature>
		/// <param name='selectors' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return _querySelector(this, selectors);
	};


	/* -- type: ElementTraversal -- */

	Object.defineProperty(ElementTraversal,"previousElementSibling", { get: function () { return _previousElementSibling(this, HTMLElement); } });
	Object.defineProperty(ElementTraversal,"childElementCount", { get: function () { return _childElementCount(this); } });
	Object.defineProperty(ElementTraversal,"nextElementSibling", { get: function () { return _nextElementSibling(this, HTMLElement); } });
	Object.defineProperty(ElementTraversal,"lastElementChild", { get: function () { return _lastElementChild(this, HTMLElement); } });
	Object.defineProperty(ElementTraversal,"firstElementChild", { get: function () { return _firstElementChild(this, HTMLElement); } });


	/* -- type: MSElementExtensions -- */

	MSElementExtensions.msRegionOverflow = '';
	MSElementExtensions.msContentZoomFactor = 0;
	MSElementExtensions.msGetRegionContent = function() { 
		/// <signature>
		/// <returns type='MSRangeCollection'/>
		/// </signature>
		return MSRangeCollection; 
	};
	MSElementExtensions.msReleasePointerCapture = function(pointerId) { 
		/// <signature>
		/// <param name='pointerId' type='Number' />
		/// </signature>
	};
	MSElementExtensions.msMatchesSelector = function(selectors) { 
		/// <signature>
		/// <param name='selectors' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return true;
	};
	MSElementExtensions.fireEvent = function(eventName, eventObj) { 
		/// <signature>
		/// <param name='eventName' type='String' />
		/// <param name='eventObj' type='Object' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSElementExtensions.msSetPointerCapture = function(pointerId) { 
		/// <signature>
		/// <param name='pointerId' type='Number' />
		/// </signature>
	};
	_events(MSElementExtensions, "onmspointerdown", "onmsgotpointercapture", "onmsgesturedoubletap", "onmspointerhover", "onmspointermove", "onmsgesturehold", "onmsgesturechange", "onmsgesturestart", "onmspointercancel", "onmsgestureend", "onmsgesturetap", "onmspointerout", "onmsinertiastart", "onmslostpointercapture", "onmspointerover", "onmspointerup");


	/* -- type: SVGLangSpace -- */

	SVGLangSpace.xmllang = '';
	SVGLangSpace.xmlspace = '';


	/* -- type: SVGStylable -- */

	SVGStylable.className = SVGAnimatedString;
	SVGStylable.style = CSSStyleDeclaration;


	/* -- type: Node -- */
	_$implement(Node, EventTarget);

	Node.nodeType = 1;
	Node.localName = '';
	Node.previousSibling = _$getTrackingNull(Object.create(Node));
	Node.textContent = '';
	Node.namespaceURI = '';
	Node.parentNode = _$getTrackingNull(Object.create(Node));
	Object.defineProperty(Node,"lastChild", { get: function () { return _lastChild(this, Node); } });
	Node.nextSibling = _$getTrackingNull(Object.create(Node));
	Node.nodeValue = '';
	Object.defineProperty(Node,"childNodes", { get: function () { return _childNodes(this, NodeList); } });
	Node.ownerDocument = document;
	Node.nodeName = '';
	Node.attributes = NamedNodeMap;
	Node.prefix = '';
	Object.defineProperty(Node,"firstChild", { get: function () { return _firstChild(this, Node); } });
	Node.ENTITY_REFERENCE_NODE = 5;
	Node.ATTRIBUTE_NODE = 2;
	Node.DOCUMENT_FRAGMENT_NODE = 11;
	Node.TEXT_NODE = 3;
	Node.ELEMENT_NODE = 1;
	Node.COMMENT_NODE = 8;
	Node.DOCUMENT_POSITION_DISCONNECTED = 0x01;
	Node.DOCUMENT_POSITION_CONTAINED_BY = 0x10;
	Node.DOCUMENT_POSITION_CONTAINS = 0x08;
	Node.DOCUMENT_TYPE_NODE = 10;
	Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;
	Node.DOCUMENT_NODE = 9;
	Node.ENTITY_NODE = 6;
	Node.PROCESSING_INSTRUCTION_NODE = 7;
	Node.CDATA_SECTION_NODE = 4;
	Node.NOTATION_NODE = 12;
	Node.DOCUMENT_POSITION_PRECEDING = 0x02;
	Node.DOCUMENT_POSITION_FOLLOWING = 0x04;
	Node.removeChild = function(oldChild) { 
		/// <signature>
		/// <param name='oldChild' type='Node' />
		/// <returns type='Node'/>
		/// </signature>
		return _removeChild(this, oldChild);
	};
	Node.appendChild = function(newChild) { 
		/// <signature>
		/// <param name='newChild' type='Node' />
		/// <returns type='Node'/>
		/// </signature>
		return _appendChild(this, newChild);
	};
	Node.isSupported = function(feature, version) { 
		/// <signature>
		/// <param name='feature' type='String' />
		/// <param name='version' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Node.isEqualNode = function(arg) { 
		/// <signature>
		/// <param name='arg' type='Node' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Node.lookupPrefix = function(namespaceURI) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Node.isDefaultNamespace = function(namespaceURI) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Node.compareDocumentPosition = function(other) { 
		/// <signature>
		/// <param name='other' type='Node' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	Node.isSameNode = function(other) { 
		/// <signature>
		/// <param name='other' type='Node' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Node.normalize = function() { };
	Node.lookupNamespaceURI = function(prefix) { 
		/// <signature>
		/// <param name='prefix' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Node.hasAttributes = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Node.hasChildNodes = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return _hasChildNodes(this);
	};
	Node.cloneNode = function(deep) { 
		/// <signature>
		/// <param name='deep' type='Boolean' optional='true' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	Node.replaceChild = function(newChild, oldChild) { 
		/// <signature>
		/// <param name='newChild' type='Node' />
		/// <param name='oldChild' type='Node' />
		/// <returns type='Node'/>
		/// </signature>
		return _replaceChild(this, newChild, oldChild);
	};
	Node.insertBefore = function(newChild, refChild) { 
		/// <signature>
		/// <param name='newChild' type='Node' />
		/// <param name='refChild' type='Node' optional='true' />
		/// <returns type='Node'/>
		/// </signature>
		return _insertBefore(this, newChild, refChild);
	};


	/* -- type: Element -- */
	_$implement(Element, NodeSelector);
	_$implement(Element, ElementTraversal);
	_$implement(Element, MSElementExtensions);

	Element.scrollTop = 0;
	Element.clientLeft = 0;
	Element.scrollLeft = 0;
	Element.clientWidth = 0;
	Element.tagName = '';
	Element.scrollWidth = 0;
	Element.clientHeight = 0;
	Element.clientTop = 0;
	Element.scrollHeight = 0;
	Element.getAttribute = function(name) { 
		/// <signature>
		/// <param name='name' type='String' optional='true' />
		/// <returns type='String'/>
		/// </signature>
		return _getAttribute(this, name);
	};
	Element.hasAttributeNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Element.getElementsByTagNameNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	Element.getBoundingClientRect = function() { 
		/// <signature>
		/// <returns type='ClientRect'/>
		/// </signature>
		return ClientRect; 
	};
	Element.getAttributeNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Element.getAttributeNodeNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Element.setAttributeNodeNS = function(newAttr) { 
		/// <signature>
		/// <param name='newAttr' type='Attr' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Element.hasAttribute = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return _hasAttribute(this, name);
	};
	Element.removeAttribute = function(name) { 
		/// <signature>
		/// <param name='name' type='String' optional='true' />
		/// </signature>
	};
	Element.setAttributeNS = function(namespaceURI, qualifiedName, value) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='qualifiedName' type='String' />
		/// <param name='value' type='String' />
		/// </signature>
	};
	Element.getAttributeNode = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Element.getElementsByTagName = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return _getElementsByTagName(this, name);
	};
	Element.setAttributeNode = function(newAttr) { 
		/// <signature>
		/// <param name='newAttr' type='Attr' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Element.getClientRects = function() { 
		/// <signature>
		/// <returns type='ClientRectList'/>
		/// </signature>
		return ClientRectList; 
	};
	Element.removeAttributeNode = function(oldAttr) { 
		/// <signature>
		/// <param name='oldAttr' type='Attr' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Element.setAttribute = function(name, value) { 
		/// <signature>
		/// <param name='name' type='String' optional='true' />
		/// <param name='value' type='String' optional='true' />
		/// </signature>
		_setAttribute(this, name, value);
	};
	Element.removeAttributeNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// </signature>
	};


	/* -- type: SVGElement -- */
	_$implement(SVGElement, SVGElementEventHandlers);

	SVGElement.viewportElement = _$getTrackingNull(Object.create(SVGElement));
	SVGElement.xmlbase = '';
	SVGElement.ownerSVGElement = _$getTrackingNull(Object.create(SVGSVGElement));
	SVGElement.id = '';


	/* -- type: SVGTests -- */

	SVGTests.requiredExtensions = SVGStringList;
	SVGTests.requiredFeatures = SVGStringList;
	SVGTests.systemLanguage = SVGStringList;
	SVGTests.hasExtension = function(extension) { 
		/// <signature>
		/// <param name='extension' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: SVGUnitTypes -- */

	SVGUnitTypes.SVG_UNIT_TYPE_OBJECTBOUNDINGBOX = 2;
	SVGUnitTypes.SVG_UNIT_TYPE_UNKNOWN = 0;
	SVGUnitTypes.SVG_UNIT_TYPE_USERSPACEONUSE = 1;


	/* -- type: SVGMaskElement -- */
	_$implement(SVGMaskElement, SVGStylable);
	_$implement(SVGMaskElement, SVGUnitTypes);
	_$implement(SVGMaskElement, SVGLangSpace);
	_$implement(SVGMaskElement, SVGTests);
	_$implement(SVGMaskElement, SVGExternalResourcesRequired);

	SVGMaskElement.width = SVGAnimatedLength;
	SVGMaskElement.y = SVGAnimatedLength;
	SVGMaskElement.maskUnits = SVGAnimatedEnumeration;
	SVGMaskElement.maskContentUnits = SVGAnimatedEnumeration;
	SVGMaskElement.x = SVGAnimatedLength;
	SVGMaskElement.height = SVGAnimatedLength;
	SVGMaskElement.nodeName = SVGMaskElement.tagName = 'MASK';
	SVGMaskElement.localName = 'mask';


	/* -- type: MSCSSMatrix -- */

	MSCSSMatrix.m24 = 0;
	MSCSSMatrix.m34 = 0;
	MSCSSMatrix.a = 0;
	MSCSSMatrix.d = 0;
	MSCSSMatrix.m32 = 0;
	MSCSSMatrix.m41 = 0;
	MSCSSMatrix.m11 = 0;
	MSCSSMatrix.f = 0;
	MSCSSMatrix.e = 0;
	MSCSSMatrix.m23 = 0;
	MSCSSMatrix.m14 = 0;
	MSCSSMatrix.m33 = 0;
	MSCSSMatrix.m22 = 0;
	MSCSSMatrix.m21 = 0;
	MSCSSMatrix.c = 0;
	MSCSSMatrix.m12 = 0;
	MSCSSMatrix.b = 0;
	MSCSSMatrix.m42 = 0;
	MSCSSMatrix.m31 = 0;
	MSCSSMatrix.m43 = 0;
	MSCSSMatrix.m13 = 0;
	MSCSSMatrix.m44 = 0;
	MSCSSMatrix.multiply = function(secondMatrix) { 
		/// <signature>
		/// <param name='secondMatrix' type='MSCSSMatrix' />
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};
	MSCSSMatrix.skewY = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};
	MSCSSMatrix.setMatrixValue = function(value) { 
		/// <signature>
		/// <param name='value' type='String' />
		/// </signature>
	};
	MSCSSMatrix.inverse = function() { 
		/// <signature>
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};
	MSCSSMatrix.rotateAxisAngle = function(x, y, z, angle) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' />
		/// <param name='angle' type='Number' />
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};
	MSCSSMatrix.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	MSCSSMatrix.rotate = function(angleX, angleY, angleZ) { 
		/// <signature>
		/// <param name='angleX' type='Number' />
		/// <param name='angleY' type='Number' optional='true' />
		/// <param name='angleZ' type='Number' optional='true' />
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};
	MSCSSMatrix.translate = function(x, y, z) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' optional='true' />
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};
	MSCSSMatrix.scale = function(scaleX, scaleY, scaleZ) { 
		/// <signature>
		/// <param name='scaleX' type='Number' />
		/// <param name='scaleY' type='Number' optional='true' />
		/// <param name='scaleZ' type='Number' optional='true' />
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};
	MSCSSMatrix.skewX = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// <returns type='MSCSSMatrix'/>
		/// </signature>
		return MSCSSMatrix; 
	};


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLTableCellElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLTableCellElement.align = '';


	/* -- type: ClientRectList -- */

	ClientRectList.length = 0;
	ClientRectList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='ClientRect'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(ClientRect)); 
	};
	/* Add a single array element */
	ClientRectList[0] = _$getTrackingNull(Object.create(ClientRect));


	/* -- type: MSXMLHttpRequestExtensions -- */

	MSXMLHttpRequestExtensions.response = new Object();
	MSXMLHttpRequestExtensions.responseType = '';
	MSXMLHttpRequestExtensions.timeout = 0;
	MSXMLHttpRequestExtensions.upload = XMLHttpRequestEventTarget;
	_events(MSXMLHttpRequestExtensions, "onprogress", "ontimeout", "onabort", "onloadend", "onerror", "onloadstart");


	/* -- type: MSNodeExtensions -- */

	MSNodeExtensions.swapNode = function(otherNode) { 
		/// <signature>
		/// <param name='otherNode' type='HTMLElement' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='otherNode' type='HTMLDocument' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='otherNode' type='Attr' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='otherNode' type='Text' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	MSNodeExtensions.removeNode = function(deep) { 
		/// <signature>
		/// <param name='deep' type='Boolean' optional='true' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	MSNodeExtensions.replaceNode = function(replacement) { 
		/// <signature>
		/// <param name='replacement' type='HTMLElement' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='replacement' type='HTMLDocument' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='replacement' type='Attr' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='replacement' type='Text' />
		/// <returns type='Node'/>
		/// </signature>
		return _replaceChild(this, replacement, this);
	};


	/* -- type: MSHTMLElementRangeExtensions -- */

	MSHTMLElementRangeExtensions.createControlRange = function() { 
		/// <signature>
		/// <returns type='ControlRangeCollection'/>
		/// </signature>
		return ControlRangeCollection; 
	};


	/* -- type: MSElementCSSInlineStyleExtensions -- */

	MSElementCSSInlineStyleExtensions.doScroll = function(component) { 
		/// <signature>
		/// <param name='component' type='Object' optional='true' />
		/// </signature>
	};
	MSElementCSSInlineStyleExtensions.componentFromPoint = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: ElementCSSInlineStyle -- */
	_$implement(ElementCSSInlineStyle, MSElementCSSInlineStyleExtensions);

	ElementCSSInlineStyle.runtimeStyle = MSStyleCSSProperties;
	ElementCSSInlineStyle.currentStyle = MSCurrentStyleCSSProperties;


	/* -- type: MSHTMLElementExtensions -- */

	MSHTMLElementExtensions.children = HTMLCollection;
	MSHTMLElementExtensions.uniqueNumber = 0;
	MSHTMLElementExtensions.recordNumber = new Object();
	MSHTMLElementExtensions.parentTextEdit = HTMLElement;
	MSHTMLElementExtensions.isDisabled = false;
	MSHTMLElementExtensions.isTextEdit = false;
	MSHTMLElementExtensions.all = HTMLCollection;
	MSHTMLElementExtensions.canHaveHTML = false;
	MSHTMLElementExtensions.language = '';
	MSHTMLElementExtensions.sourceIndex = 0;
	MSHTMLElementExtensions.uniqueID = '';
	MSHTMLElementExtensions.isMultiLine = false;
	MSHTMLElementExtensions.hideFocus = false;
	MSHTMLElementExtensions.outerText = '';
	MSHTMLElementExtensions.readyState = '';
	MSHTMLElementExtensions.innerText = '';
	Object.defineProperty(MSHTMLElementExtensions,"parentElement", { get: function () { return _parentElement(this, HTMLElement); } });
	MSHTMLElementExtensions.canHaveChildren = false;
	MSHTMLElementExtensions.dragDrop = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSHTMLElementExtensions.setCapture = function(containerCapture) { 
		/// <signature>
		/// <param name='containerCapture' type='Boolean' optional='true' />
		/// </signature>
	};
	MSHTMLElementExtensions.releaseCapture = function() { };
	MSHTMLElementExtensions.contains = function(child) { 
		/// <signature>
		/// <param name='child' type='HTMLElement' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSHTMLElementExtensions.getAdjacentText = function(where) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	MSHTMLElementExtensions.insertAdjacentText = function(where, text) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <param name='text' type='String' />
		/// </signature>
	};
	MSHTMLElementExtensions.insertAdjacentElement = function(position, insertedElement) { 
		/// <signature>
		/// <param name='position' type='String' />
		/// <param name='insertedElement' type='Element' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};
	MSHTMLElementExtensions.mergeAttributes = function(source, preserveIdentity) { 
		/// <signature>
		/// <param name='source' type='HTMLElement' />
		/// <param name='preserveIdentity' type='Boolean' optional='true' />
		/// </signature>
	};
	MSHTMLElementExtensions.applyElement = function(apply, where) { 
		/// <signature>
		/// <param name='apply' type='Element' />
		/// <param name='where' type='String' optional='true' />
		/// <returns type='Element'/>
		/// </signature>
		return _applyElement(this, apply, where);
	};
	MSHTMLElementExtensions.replaceAdjacentText = function(where, newText) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <param name='newText' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	MSHTMLElementExtensions.setActive = function() { };
	MSHTMLElementExtensions.clearAttributes = function() { };
	_events(MSHTMLElementExtensions, "onrowexit", "onrowsinserted", "onmouseleave", "onpropertychange", "onbeforecut", "onbeforepaste", "onmove", "onbeforecopy", "onhelp", "onfocusin", "onresizestart", "onmscontentzoom", "onpaste", "ondeactivate", "onmoveend", "ondatasetchanged", "onrowsdelete", "onbeforeeditfocus", "onlosecapture", "oncontrolselect", "onafterupdate", "onlayoutcomplete", "onresizeend", "onbeforeactivate", "onfocusout", "ondataavailable", "onbeforeupdate", "onfilterchange", "ondatasetcomplete", "onbeforedeactivate", "onactivate", "onmsmanipulationstatechanged", "onmouseenter", "onmovestart", "onselectstart", "onerrorupdate", "oncut", "onresize", "oncopy", "onrowenter", "oncellchange");


	/* -- type: MSEventAttachmentTarget -- */

	MSEventAttachmentTarget.attachEvent = function(event, listener) { 
		/// <signature>
		/// <param name='event' type='String' />
		/// <param name='listener' type='EventListener' />
		/// <returns type='Boolean'/>
		/// </signature>
		_eventManager.add(this, event, listener, true); return false;
	};
	MSEventAttachmentTarget.detachEvent = function(event, listener) { 
		/// <signature>
		/// <param name='event' type='String' />
		/// <param name='listener' type='EventListener' />
		/// </signature>
	};


	/* -- type: HTMLElement -- */
	_$implement(HTMLElement, MSHTMLElementRangeExtensions);
	_$implement(HTMLElement, MSEventAttachmentTarget);
	_$implement(HTMLElement, ElementCSSInlineStyle);
	_$implement(HTMLElement, MSHTMLElementExtensions);
	_$implement(HTMLElement, MSNodeExtensions);

	HTMLElement.offsetTop = 0;
	Object.defineProperty(HTMLElement,"innerHTML", { get: function () { return ''; }, set: function (v) { _setInnerHTML(this, v); } });
	HTMLElement.lang = '';
	HTMLElement.className = '';
	HTMLElement.title = '';
	HTMLElement.outerHTML = '';
	HTMLElement.offsetLeft = 0;
	HTMLElement.offsetHeight = 0;
	HTMLElement.dir = '';
	HTMLElement.style = MSStyleCSSProperties;
	HTMLElement.isContentEditable = false;
	HTMLElement.contentEditable = '';
	HTMLElement.tabIndex = 0;
	HTMLElement.classList = DOMTokenList;
	HTMLElement.id = '';
	HTMLElement.offsetParent = _$getTrackingNull(Object.create(HTMLElement));
	HTMLElement.disabled = false;
	HTMLElement.spellcheck = false;
	HTMLElement.accessKey = '';
	HTMLElement.offsetWidth = 0;
	HTMLElement.draggable = false;
	HTMLElement.click = function() { };
	HTMLElement.scrollIntoView = function(top) { 
		/// <signature>
		/// <param name='top' type='Boolean' optional='true' />
		/// </signature>
	};
	HTMLElement.getElementsByClassName = function(classNames) { 
		/// <signature>
		/// <param name='classNames' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	HTMLElement.blur = function() { };
	HTMLElement.focus = function() { };
	HTMLElement.insertAdjacentHTML = function(where, html) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <param name='html' type='String' />
		/// </signature>
		_setInnerHTML(this, html);
	};
	HTMLElement.nodeName = HTMLElement.tagName = 'FIGURE';
	HTMLElement.localName = 'figure';
	_events(HTMLElement, "ondragend", "onkeydown", "ondragover", "onkeyup", "onreset", "onmouseup", "ondragstart", "ondrag", "onmouseover", "ondragleave", "onpause", "onseeked", "onmousedown", "onclick", "onwaiting", "ondurationchange", "onblur", "onemptied", "onseeking", "oncanplay", "onstalled", "onmousemove", "onratechange", "onloadstart", "ondragenter", "onsubmit", "onprogress", "ondblclick", "oncontextmenu", "onchange", "onloadedmetadata", "onerror", "onplay", "onplaying", "oncanplaythrough", "onabort", "oncuechange", "onreadystatechange", "onkeypress", "onloadeddata", "onsuspend", "onfocus", "ontimeupdate", "onselect", "ondrop", "onmouseout", "onended", "onscroll", "onmousewheel", "onload", "onvolumechange", "oninput");


	/* -- type: HTMLTrackElement -- */

	HTMLTrackElement.kind = '';
	HTMLTrackElement.src = '';
	HTMLTrackElement.srclang = '';
	HTMLTrackElement.track = TextTrack;
	HTMLTrackElement.label = '';
	HTMLTrackElement.default = false;
	HTMLTrackElement.nodeName = HTMLTrackElement.tagName = 'TRACK';
	HTMLTrackElement.localName = 'track';


	/* -- type: CSSRuleList -- */

	CSSRuleList.length = 0;
	CSSRuleList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='CSSRule'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(CSSRule)); 
	};
	/* Add a single array element */
	CSSRuleList[0] = _$getTrackingNull(Object.create(CSSRule));


	/* -- type: MSDataBindingRecordSetExtensions -- */

	MSDataBindingRecordSetExtensions.recordset = new Object();
	MSDataBindingRecordSetExtensions.namedRecordset = function(dataMember, hierarchy) { 
		/// <signature>
		/// <param name='dataMember' type='String' />
		/// <param name='hierarchy' type='Object' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};


	/* -- type: PositionCallback -- */

	PositionCallback.handleEvent = function(position) { 
		/// <signature>
		/// <param name='position' type='Position' />
		/// </signature>
	};


	/* -- type: SVGStopElement -- */
	_$implement(SVGStopElement, SVGStylable);

	SVGStopElement.offset = SVGAnimatedNumber;
	SVGStopElement.nodeName = SVGStopElement.tagName = 'STOP';
	SVGStopElement.localName = 'stop';


	/* -- type: HTMLDataListElement -- */

	HTMLDataListElement.options = HTMLCollection;
	HTMLDataListElement.nodeName = HTMLDataListElement.tagName = 'DATALIST';
	HTMLDataListElement.localName = 'datalist';


	/* -- type: PerformanceNavigation -- */

	PerformanceNavigation.redirectCount = 0;
	PerformanceNavigation.type = 0;
	PerformanceNavigation.TYPE_RELOAD = 1;
	PerformanceNavigation.TYPE_RESERVED = 255;
	PerformanceNavigation.TYPE_BACK_FORWARD = 2;
	PerformanceNavigation.TYPE_NAVIGATE = 0;
	PerformanceNavigation.toJSON = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};


	/* -- type: MSHTMLMediaElementExtensions -- */

	MSHTMLMediaElementExtensions.msAudioCategory = '';
	MSHTMLMediaElementExtensions.msRealTime = false;
	MSHTMLMediaElementExtensions.msPlayToPrimary = false;
	MSHTMLMediaElementExtensions.msPlayToDisabled = false;
	MSHTMLMediaElementExtensions.msPlayToSource = new Object();
	MSHTMLMediaElementExtensions.msAudioDeviceType = '';
	MSHTMLMediaElementExtensions.msClearEffects = function() { };
	MSHTMLMediaElementExtensions.msSetMediaProtectionManager = function(mediaProtectionManager) { 
		/// <signature>
		/// <param name='mediaProtectionManager' type='Object' optional='true' />
		/// </signature>
	};
	MSHTMLMediaElementExtensions.msInsertAudioEffect = function(activatableClassId, effectRequired, config) { 
		/// <signature>
		/// <param name='activatableClassId' type='String' />
		/// <param name='effectRequired' type='Boolean' />
		/// <param name='config' type='Object' optional='true' />
		/// </signature>
	};


	/* -- type: MSAttrExtensions -- */

	MSAttrExtensions.expando = false;


	/* -- type: Attr -- */
	_$implement(Attr, MSAttrExtensions);

	Attr.ownerElement = HTMLElement;
	Attr.specified = false;
	Attr.value = '';
	Attr.name = '';


	/* -- type: SVGPreserveAspectRatio -- */

	SVGPreserveAspectRatio.align = 0;
	SVGPreserveAspectRatio.meetOrSlice = 0;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMID = 5;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_NONE = 1;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMIN = 4;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMAX = 10;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMAX = 8;
	SVGPreserveAspectRatio.SVG_MEETORSLICE_UNKNOWN = 0;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMIN = 2;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMAXYMID = 7;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMAX = 9;
	SVGPreserveAspectRatio.SVG_MEETORSLICE_MEET = 1;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMIN = 3;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMIDYMID = 6;
	SVGPreserveAspectRatio.SVG_MEETORSLICE_SLICE = 2;
	SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_UNKNOWN = 0;


	/* -- type: SVGLocatable -- */

	SVGLocatable.farthestViewportElement = SVGElement;
	SVGLocatable.nearestViewportElement = SVGElement;
	SVGLocatable.getBBox = function() { 
		/// <signature>
		/// <returns type='SVGRect'/>
		/// </signature>
		return SVGRect; 
	};
	SVGLocatable.getTransformToElement = function(element) { 
		/// <signature>
		/// <param name='element' type='SVGElement' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGLocatable.getScreenCTM = function() { 
		/// <signature>
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGLocatable.getCTM = function() { 
		/// <signature>
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};


	/* -- type: SVGTransformable -- */

	SVGTransformable.transform = SVGAnimatedTransformList;


	/* -- type: SVGSwitchElement -- */
	_$implement(SVGSwitchElement, SVGStylable);
	_$implement(SVGSwitchElement, SVGTransformable);
	_$implement(SVGSwitchElement, SVGLangSpace);
	_$implement(SVGSwitchElement, SVGTests);
	_$implement(SVGSwitchElement, SVGExternalResourcesRequired);

	SVGSwitchElement.nodeName = SVGSwitchElement.tagName = 'SWITCH';
	SVGSwitchElement.localName = 'switch';


	/* -- type: MSHTMLIsIndexElementExtensions -- */

	MSHTMLIsIndexElementExtensions.action = '';


	/* -- type: MSCompatibleInfoCollection -- */

	MSCompatibleInfoCollection.length = 0;
	MSCompatibleInfoCollection.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='MSCompatibleInfo'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(MSCompatibleInfo)); 
	};
	/* Add a single array element */
	MSCompatibleInfoCollection[0] = _$getTrackingNull(Object.create(MSCompatibleInfo));


	/* -- type: MSHTMLDocumentSelection -- */

	MSHTMLDocumentSelection.selection = MSSelection;


	/* -- type: SVGPathSeg -- */

	SVGPathSeg.pathSegType = 0;
	SVGPathSeg.pathSegTypeAsLetter = '';
	SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS = 16;
	SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL = 15;
	SVGPathSeg.PATHSEG_MOVETO_REL = 3;
	SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL = 9;
	SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS = 6;
	SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS = 12;
	SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS = 8;
	SVGPathSeg.PATHSEG_LINETO_ABS = 4;
	SVGPathSeg.PATHSEG_CLOSEPATH = 1;
	SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL = 13;
	SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL = 17;
	SVGPathSeg.PATHSEG_LINETO_REL = 5;
	SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS = 18;
	SVGPathSeg.PATHSEG_ARC_REL = 11;
	SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL = 7;
	SVGPathSeg.PATHSEG_UNKNOWN = 0;
	SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS = 14;
	SVGPathSeg.PATHSEG_ARC_ABS = 10;
	SVGPathSeg.PATHSEG_MOVETO_ABS = 2;
	SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL = 19;


	/* -- type: SVGPathSegLinetoRel -- */

	SVGPathSegLinetoRel.y = 0;
	SVGPathSegLinetoRel.x = 0;


	/* -- type: HTMLIsIndexElement -- */
	_$implement(HTMLIsIndexElement, MSHTMLIsIndexElementExtensions);

	HTMLIsIndexElement.form = HTMLFormElement;
	HTMLIsIndexElement.prompt = '';
	HTMLIsIndexElement.nodeName = HTMLIsIndexElement.tagName = 'ISINDEX';
	HTMLIsIndexElement.localName = 'isindex';


	/* -- type: CSSTextProperties -- */

	CSSTextProperties.textShadow = '';
	CSSTextProperties.msHyphenateLimitLines = new Object();
	CSSTextProperties.msHyphens = '';
	CSSTextProperties.msHyphenateLimitChars = '';
	CSSTextProperties.msHyphenateLimitZone = new Object();


	/* -- type: MSHTMLOptGroupElementExtensions -- */

	MSHTMLOptGroupElementExtensions.index = 0;
	MSHTMLOptGroupElementExtensions.value = '';
	MSHTMLOptGroupElementExtensions.text = '';
	MSHTMLOptGroupElementExtensions.defaultSelected = false;
	MSHTMLOptGroupElementExtensions.form = HTMLFormElement;
	MSHTMLOptGroupElementExtensions.selected = false;


	/* -- type: MSDataBindingExtensions -- */

	MSDataBindingExtensions.dataSrc = '';
	MSDataBindingExtensions.dataFormatAs = '';
	MSDataBindingExtensions.dataFld = '';


	/* -- type: HTMLOptGroupElement -- */
	_$implement(HTMLOptGroupElement, MSDataBindingExtensions);
	_$implement(HTMLOptGroupElement, MSHTMLOptGroupElementExtensions);

	HTMLOptGroupElement.label = '';
	HTMLOptGroupElement.nodeName = HTMLOptGroupElement.tagName = 'OPTGROUP';
	HTMLOptGroupElement.localName = 'optgroup';


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLTableSectionElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLTableSectionElement.align = '';


	/* -- type: CharacterData -- */

	CharacterData.length = 0;
	CharacterData.data = '';
	CharacterData.replaceData = function(offset, count, arg) { 
		/// <signature>
		/// <param name='offset' type='Number' />
		/// <param name='count' type='Number' />
		/// <param name='arg' type='String' />
		/// </signature>
	};
	CharacterData.deleteData = function(offset, count) { 
		/// <signature>
		/// <param name='offset' type='Number' />
		/// <param name='count' type='Number' />
		/// </signature>
	};
	CharacterData.appendData = function(arg) { 
		/// <signature>
		/// <param name='arg' type='String' />
		/// </signature>
	};
	CharacterData.insertData = function(offset, arg) { 
		/// <signature>
		/// <param name='offset' type='Number' />
		/// <param name='arg' type='String' />
		/// </signature>
	};
	CharacterData.substringData = function(offset, count) { 
		/// <signature>
		/// <param name='offset' type='Number' />
		/// <param name='count' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: DocumentView -- */

	DocumentView.defaultView = AbstractView;
	DocumentView.elementFromPoint = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};


	/* -- type: MSHTMLMenuElementExtensions -- */



	/* -- type: PositionOptions -- */

	PositionOptions.enableHighAccuracy = false;
	PositionOptions.timeout = 0;
	PositionOptions.maximumAge = 0;


	/* -- type: MSHTMLFrameSetElementExtensions -- */

	MSHTMLFrameSetElementExtensions.name = '';
	MSHTMLFrameSetElementExtensions.frameBorder = '';
	MSHTMLFrameSetElementExtensions.frameSpacing = new Object();
	MSHTMLFrameSetElementExtensions.border = '';


	/* -- type: HTMLHRElementDOML2Deprecated -- */

	HTMLHRElementDOML2Deprecated.noShade = false;


	/* -- type: DOML2DeprecatedWidthStyle_HTMLHRElement -- */

	DOML2DeprecatedWidthStyle_HTMLHRElement.width = 0;


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLHRElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLHRElement.align = '';


	/* -- type: DOML2DeprecatedColorProperty -- */

	DOML2DeprecatedColorProperty.color = '';


	/* -- type: MSHTMLHRElementExtensions -- */
	_$implement(MSHTMLHRElementExtensions, DOML2DeprecatedColorProperty);



	/* -- type: DOML2DeprecatedSizeProperty -- */

	DOML2DeprecatedSizeProperty.size = 0;


	/* -- type: HTMLHRElement -- */
	_$implement(HTMLHRElement, DOML2DeprecatedWidthStyle_HTMLHRElement);
	_$implement(HTMLHRElement, MSHTMLHRElementExtensions);
	_$implement(HTMLHRElement, HTMLHRElementDOML2Deprecated);
	_$implement(HTMLHRElement, DOML2DeprecatedSizeProperty);
	_$implement(HTMLHRElement, DOML2DeprecatedAlignmentStyle_HTMLHRElement);

	HTMLHRElement.nodeName = HTMLHRElement.tagName = 'HR';
	HTMLHRElement.localName = 'hr';


	/* -- type: CanvasPattern -- */



	/* -- type: PerformanceEntry -- */

	PerformanceEntry.name = '';
	PerformanceEntry.duration = 0;
	PerformanceEntry.startTime = 0;
	PerformanceEntry.entryType = '';


	/* -- type: PerformanceResourceTiming -- */

	PerformanceResourceTiming.responseStart = 0;
	PerformanceResourceTiming.domainLookupEnd = 0;
	PerformanceResourceTiming.redirectEnd = 0;
	PerformanceResourceTiming.redirectStart = 0;
	PerformanceResourceTiming.domainLookupStart = 0;
	PerformanceResourceTiming.requestStart = 0;
	PerformanceResourceTiming.fetchStart = 0;
	PerformanceResourceTiming.connectEnd = 0;
	PerformanceResourceTiming.initiatorType = '';
	PerformanceResourceTiming.connectStart = 0;
	PerformanceResourceTiming.responseEnd = 0;


	/* -- type: MSCommentExtensions -- */

	MSCommentExtensions.text = '';


	/* -- type: Comment -- */
	_$implement(Comment, MSCommentExtensions);

	Comment.nodeType = Node.COMMENT_NODE;
	Comment.nodeName = '#comment';


	/* -- type: MSMediaErrorExtensions -- */

	MSMediaErrorExtensions.msExtendedCode = 0;


	/* -- type: MediaError -- */
	_$implement(MediaError, MSMediaErrorExtensions);

	MediaError.code = 0;
	MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
	MediaError.MEDIA_ERR_NETWORK = 2;
	MediaError.MEDIA_ERR_ABORTED = 1;
	MediaError.MEDIA_ERR_DECODE = 3;


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLFieldSetElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLFieldSetElement.align = '';


	/* -- type: MSHTMLFieldSetElementExtensions -- */
	_$implement(MSHTMLFieldSetElementExtensions, DOML2DeprecatedAlignmentStyle_HTMLFieldSetElement);



	/* -- type: HTMLFieldSetElement -- */
	_$implement(HTMLFieldSetElement, MSHTMLFieldSetElementExtensions);

	HTMLFieldSetElement.validationMessage = '';
	HTMLFieldSetElement.validity = ValidityState;
	HTMLFieldSetElement.form = HTMLFormElement;
	HTMLFieldSetElement.willValidate = false;
	HTMLFieldSetElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLFieldSetElement.setCustomValidity = function(error) { 
		/// <signature>
		/// <param name='error' type='String' />
		/// </signature>
	};
	HTMLFieldSetElement.nodeName = HTMLFieldSetElement.tagName = 'FIELDSET';
	HTMLFieldSetElement.localName = 'fieldset';


	/* -- type: MSFileSaver -- */



	/* -- type: DOML2DeprecatedBackgroundColorStyle -- */

	DOML2DeprecatedBackgroundColorStyle.bgColor = new Object();


	/* -- type: MSHTMLTableSectionElementExtensions -- */
	_$implement(MSHTMLTableSectionElementExtensions, DOML2DeprecatedBackgroundColorStyle);

	MSHTMLTableSectionElementExtensions.moveRow = function(indexFrom, indexTo) { 
		/// <signature>
		/// <param name='indexFrom' type='Number' optional='true' />
		/// <param name='indexTo' type='Number' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};


	/* -- type: DOML2DeprecatedMarginStyle_HTMLInputElement -- */

	DOML2DeprecatedMarginStyle_HTMLInputElement.vspace = 0;
	DOML2DeprecatedMarginStyle_HTMLInputElement.hspace = 0;


	/* -- type: CSSGridProperties -- */

	CSSGridProperties.msGridRows = '';
	CSSGridProperties.msGridColumnSpan = new Object();
	CSSGridProperties.msGridRow = new Object();
	CSSGridProperties.msGridRowSpan = new Object();
	CSSGridProperties.msGridColumns = '';
	CSSGridProperties.msGridColumnAlign = '';
	CSSGridProperties.msGridRowAlign = '';
	CSSGridProperties.msGridColumn = new Object();


	/* -- type: MSBorderColorStyle_HTMLFrameElement -- */

	MSBorderColorStyle_HTMLFrameElement.borderColor = new Object();


	/* -- type: NodeFilter -- */

	NodeFilter.SHOW_NOTATION = 0x00000800;
	NodeFilter.SHOW_ENTITY_REFERENCE = 0x00000010;
	NodeFilter.SHOW_DOCUMENT = 0x00000100;
	NodeFilter.SHOW_ENTITY = 0x00000020;
	NodeFilter.SHOW_PROCESSING_INSTRUCTION = 0x00000040;
	NodeFilter.FILTER_REJECT = 2;
	NodeFilter.SHOW_CDATA_SECTION = 0x00000008;
	NodeFilter.SHOW_DOCUMENT_TYPE = 0x00000200;
	NodeFilter.SHOW_ALL = 0xFFFFFFFF;
	NodeFilter.FILTER_ACCEPT = 1;
	NodeFilter.SHOW_TEXT = 0x00000004;
	NodeFilter.SHOW_ELEMENT = 0x00000001;
	NodeFilter.SHOW_COMMENT = 0x00000080;
	NodeFilter.SHOW_ATTRIBUTE = 0x00000002;
	NodeFilter.FILTER_SKIP = 3;
	NodeFilter.SHOW_DOCUMENT_FRAGMENT = 0x00000400;
	NodeFilter.acceptNode = function(n) { 
		/// <signature>
		/// <param name='n' type='Node' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};


	/* -- type: DOML2DeprecatedTextFlowControl_HTMLBlockElement -- */

	DOML2DeprecatedTextFlowControl_HTMLBlockElement.clear = '';


	/* -- type: MSHTMLParagraphElementExtensions -- */
	_$implement(MSHTMLParagraphElementExtensions, DOML2DeprecatedTextFlowControl_HTMLBlockElement);



	/* -- type: DOML2DeprecatedTextFlowControl_HTMLBRElement -- */

	DOML2DeprecatedTextFlowControl_HTMLBRElement.clear = '';


	/* -- type: MSEventExtensions -- */

	MSEventExtensions.cancelBubble = false;
	MSEventExtensions.srcElement = HTMLElement;


	/* -- type: Event -- */
	_$implement(Event, MSEventExtensions);

	Event.timeStamp = 0;
	Event.isTrusted = false;
	Event.defaultPrevented = false;
	Event.currentTarget = EventTarget;
	Event.target = EventTarget;
	Event.eventPhase = 0;
	Event.type = '';
	Event.cancelable = false;
	Event.bubbles = false;
	Event.AT_TARGET = 2;
	Event.CAPTURING_PHASE = 1;
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


	/* -- type: PopStateEvent -- */

	PopStateEvent.state = new Object();
	PopStateEvent.initPopStateEvent = function(typeArg, canBubbleArg, cancelableArg, stateArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='stateArg' type='Object' />
		/// </signature>
	};


	/* -- type: FrameRequestCallback -- */

	FrameRequestCallback.sample = function(time) { 
		/// <signature>
		/// <param name='time' type='Number' />
		/// </signature>
	};


	/* -- type: MSHTMLTableRowElementExtensions -- */

	MSHTMLTableRowElementExtensions.height = new Object();


	/* -- type: DOML2DeprecatedWordWrapSuppression_HTMLDDElement -- */

	DOML2DeprecatedWordWrapSuppression_HTMLDDElement.noWrap = false;


	/* -- type: Blob -- */

	Blob.type = '';
	Blob.size = 0;
	Blob.msDetachStream = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Blob.slice = function(start, end, contentType) { 
		/// <signature>
		/// <param name='start' type='Number' optional='true' />
		/// <param name='end' type='Number' optional='true' />
		/// <param name='contentType' type='String' optional='true' />
		/// <returns type='Blob'/>
		/// </signature>
		return Blob; 
	};
	Blob.msClose = function() { };


	/* -- type: DOML2DeprecatedWordWrapSuppression_HTMLDTElement -- */

	DOML2DeprecatedWordWrapSuppression_HTMLDTElement.noWrap = false;


	/* -- type: HTMLDTElement -- */
	_$implement(HTMLDTElement, DOML2DeprecatedWordWrapSuppression_HTMLDTElement);

	HTMLDTElement.nodeName = HTMLDTElement.tagName = 'DT';
	HTMLDTElement.localName = 'dt';


	/* -- type: DOMParser -- */

	DOMParser.parseFromString = function(source, mimeType) { 
		/// <signature>
		/// <param name='source' type='String' />
		/// <param name='mimeType' type='String' />
		/// <returns type='Document'/>
		/// </signature>
		return Document; 
	};


	/* -- type: MSHTMLFormElementExtensions -- */

	MSHTMLFormElementExtensions.encoding = '';


	/* -- type: MSHTMLCollectionExtensions -- */



	/* -- type: HTMLFormElement -- */
	_$implement(HTMLFormElement, MSHTMLFormElementExtensions);
	_$implement(HTMLFormElement, MSHTMLCollectionExtensions);

	HTMLFormElement.acceptCharset = '';
	HTMLFormElement.autocomplete = '';
	Object.defineProperty(HTMLFormElement,"elements", { get: function () { return _formElements(this); } });
	HTMLFormElement.enctype = '';
	HTMLFormElement.name = '';
	HTMLFormElement.noValidate = false;
	HTMLFormElement.length = 0;
	HTMLFormElement.target = '';
	HTMLFormElement.action = '';
	HTMLFormElement.method = '';
	HTMLFormElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLFormElement.reset = function() { };
	HTMLFormElement.submit = function() { };
	HTMLFormElement.item = function(name, index) { 
		/// <signature>
		/// <param name='name' type='Object' optional='true' />
		/// <param name='index' type='Object' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	HTMLFormElement.namedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	HTMLFormElement.nodeName = HTMLFormElement.tagName = 'FORM';
	HTMLFormElement.localName = 'form';


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLHeadingElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLHeadingElement.align = '';


	/* -- type: MSHTMLHeadingElementExtensions -- */
	_$implement(MSHTMLHeadingElementExtensions, DOML2DeprecatedTextFlowControl_HTMLBlockElement);



	/* -- type: HTMLHeadingElement -- */
	_$implement(HTMLHeadingElement, DOML2DeprecatedAlignmentStyle_HTMLHeadingElement);
	_$implement(HTMLHeadingElement, MSHTMLHeadingElementExtensions);

	HTMLHeadingElement.nodeName = HTMLHeadingElement.tagName = 'H1';
	HTMLHeadingElement.localName = 'h1';


	/* -- type: SVGFilterPrimitiveStandardAttributes -- */

	SVGFilterPrimitiveStandardAttributes.y = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.width = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.x = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.height = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.result = SVGAnimatedString;


	/* -- type: SVGFEOffsetElement -- */
	_$implement(SVGFEOffsetElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEOffsetElement.dy = SVGAnimatedNumber;
	SVGFEOffsetElement.in1 = SVGAnimatedString;
	SVGFEOffsetElement.dx = SVGAnimatedNumber;
	SVGFEOffsetElement.nodeName = SVGFEOffsetElement.tagName = 'FEOFFSET';
	SVGFEOffsetElement.localName = 'feoffset';


	/* -- type: MSHTMLSpanElementExtensions -- */



	/* -- type: HTMLSpanElement -- */
	_$implement(HTMLSpanElement, MSHTMLSpanElementExtensions);
	_$implement(HTMLSpanElement, MSDataBindingExtensions);

	HTMLSpanElement.nodeName = HTMLSpanElement.tagName = 'SPAN';
	HTMLSpanElement.localName = 'span';


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


	/* -- type: DOML2DeprecatedWidthStyle -- */

	DOML2DeprecatedWidthStyle.width = 0;


	/* -- type: SVGAnimatedPoints -- */

	SVGAnimatedPoints.animatedPoints = SVGPointList;
	SVGAnimatedPoints.points = SVGPointList;


	/* -- type: SVGPolylineElement -- */
	_$implement(SVGPolylineElement, SVGStylable);
	_$implement(SVGPolylineElement, SVGTransformable);
	_$implement(SVGPolylineElement, SVGLangSpace);
	_$implement(SVGPolylineElement, SVGAnimatedPoints);
	_$implement(SVGPolylineElement, SVGTests);
	_$implement(SVGPolylineElement, SVGExternalResourcesRequired);

	SVGPolylineElement.nodeName = SVGPolylineElement.tagName = 'POLYLINE';
	SVGPolylineElement.localName = 'polyline';


	/* -- type: UIEvent -- */

	UIEvent.detail = 0;
	UIEvent.view = AbstractView;
	UIEvent.initUIEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// </signature>
	};


	/* -- type: TextEvent -- */

	TextEvent.inputMethod = 0;
	TextEvent.locale = '';
	TextEvent.data = '';
	TextEvent.DOM_INPUT_METHOD_DROP = 0x03;
	TextEvent.DOM_INPUT_METHOD_KEYBOARD = 0x01;
	TextEvent.DOM_INPUT_METHOD_IME = 0x04;
	TextEvent.DOM_INPUT_METHOD_SCRIPT = 0x09;
	TextEvent.DOM_INPUT_METHOD_VOICE = 0x07;
	TextEvent.DOM_INPUT_METHOD_UNKNOWN = 0x00;
	TextEvent.DOM_INPUT_METHOD_PASTE = 0x02;
	TextEvent.DOM_INPUT_METHOD_HANDWRITING = 0x06;
	TextEvent.DOM_INPUT_METHOD_OPTION = 0x05;
	TextEvent.DOM_INPUT_METHOD_MULTIMODAL = 0x08;
	TextEvent.initTextEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, dataArg, inputMethod, locale) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='dataArg' type='String' />
		/// <param name='inputMethod' type='Number' />
		/// <param name='locale' type='String' />
		/// </signature>
	};


	/* -- type: CSSRule -- */

	CSSRule.cssText = '';
	CSSRule.parentStyleSheet = CSSStyleSheet;
	CSSRule.parentRule = _$getTrackingNull(Object.create(CSSRule));
	CSSRule.type = 0;
	CSSRule.VIEWPORT_RULE = 15;
	CSSRule.KEYFRAME_RULE = 8;
	CSSRule.FONT_FACE_RULE = 5;
	CSSRule.IMPORT_RULE = 3;
	CSSRule.MEDIA_RULE = 4;
	CSSRule.STYLE_RULE = 1;
	CSSRule.KEYFRAMES_RULE = 7;
	CSSRule.NAMESPACE_RULE = 10;
	CSSRule.PAGE_RULE = 6;
	CSSRule.UNKNOWN_RULE = 0;
	CSSRule.CHARSET_RULE = 2;


	/* -- type: CSSFontFaceRule -- */

	CSSFontFaceRule.style = CSSStyleDeclaration;


	/* -- type: ProcessingInstruction -- */

	ProcessingInstruction.target = '';
	ProcessingInstruction.data = '';
	ProcessingInstruction.nodeType = Node.PROCESSING_INSTRUCTION_NODE;


	/* -- type: MSWindowExtensions -- */

	MSWindowExtensions.status = '';
	MSWindowExtensions.screenLeft = 0;
	MSWindowExtensions.offscreenBuffering = new Object();
	MSWindowExtensions.maxConnectionsPerServer = 0;
	MSWindowExtensions.clipboardData = DataTransfer;
	MSWindowExtensions.defaultStatus = '';
	MSWindowExtensions.clientInformation = Navigator;
	MSWindowExtensions.closed = false;
	MSWindowExtensions.external = BrowserPublic;
	MSWindowExtensions.event = MSEventObj;
	MSWindowExtensions.screenTop = 0;
	MSWindowExtensions.navigate = function(url) { 
		/// <signature>
		/// <param name='url' type='String' />
		/// </signature>
	};
	MSWindowExtensions.msIsStaticHTML = function(html) { 
		/// <signature>
		/// <param name='html' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSWindowExtensions.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		/// <signature>
		/// <param name='index' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	MSWindowExtensions.toStaticHTML = function(html) { 
		/// <signature>
		/// <param name='html' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	MSWindowExtensions.msWriteProfilerMark = function(profilerMarkName) { 
		/// <signature>
		/// <param name='profilerMarkName' type='String' />
		/// </signature>
	};
	MSWindowExtensions.execScript = function(code, language) { 
		/// <signature>
		/// <param name='code' type='String' />
		/// <param name='language' type='String' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	_events(MSWindowExtensions, "onmspointerdown", "onmsgesturedoubletap", "onmouseleave", "onmspointerhover", "onmouseenter", "onmspointermove", "onmsgesturehold", "onmsgesturechange", "onmsgesturestart", "onmspointercancel", "onmsgesturetap", "onmsgestureend", "onmspointerout", "onfocusout", "onmsinertiastart", "onfocusin", "onmspointerover", "onmspointerup");


	/* -- type: SVGLengthList -- */

	SVGLengthList.numberOfItems = 0;
	SVGLengthList.replaceItem = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGLength' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGLength'/>
		/// </signature>
		return SVGLength; 
	};
	SVGLengthList.getItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGLength'/>
		/// </signature>
		return SVGLength; 
	};
	SVGLengthList.appendItem = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGLength' />
		/// <returns type='SVGLength'/>
		/// </signature>
		return SVGLength; 
	};
	SVGLengthList.clear = function() { };
	SVGLengthList.removeItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGLength'/>
		/// </signature>
		return SVGLength; 
	};
	SVGLengthList.initialize = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGLength' />
		/// <returns type='SVGLength'/>
		/// </signature>
		return SVGLength; 
	};
	SVGLengthList.insertItemBefore = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGLength' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGLength'/>
		/// </signature>
		return SVGLength; 
	};


	/* -- type: SVGPathSegCurvetoQuadraticSmoothAbs -- */

	SVGPathSegCurvetoQuadraticSmoothAbs.y = 0;
	SVGPathSegCurvetoQuadraticSmoothAbs.x = 0;


	/* -- type: NamedNodeMap -- */

	NamedNodeMap.length = 0;
	NamedNodeMap.removeNamedItemNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	NamedNodeMap.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	NamedNodeMap.removeNamedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	NamedNodeMap.getNamedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	NamedNodeMap.setNamedItemNS = function(arg) { 
		/// <signature>
		/// <param name='arg' type='Attr' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	NamedNodeMap.getNamedItemNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	NamedNodeMap.setNamedItem = function(arg) { 
		/// <signature>
		/// <param name='arg' type='Attr' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};


	/* -- type: IDBKeyRange -- */

	IDBKeyRange.upper = new Object();
	IDBKeyRange.upperOpen = false;
	IDBKeyRange.lower = new Object();
	IDBKeyRange.lowerOpen = false;
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
	IDBKeyRange.lowerBound = function(bound, open) { 
		/// <signature>
		/// <param name='bound' type='Object' />
		/// <param name='open' type='Boolean' optional='true' />
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


	/* -- type: DOML2DeprecatedBorderStyle -- */

	DOML2DeprecatedBorderStyle.border = '';


	/* -- type: SVGRectElement -- */
	_$implement(SVGRectElement, SVGStylable);
	_$implement(SVGRectElement, SVGTransformable);
	_$implement(SVGRectElement, SVGLangSpace);
	_$implement(SVGRectElement, SVGTests);
	_$implement(SVGRectElement, SVGExternalResourcesRequired);

	SVGRectElement.ry = SVGAnimatedLength;
	SVGRectElement.width = SVGAnimatedLength;
	SVGRectElement.y = SVGAnimatedLength;
	SVGRectElement.rx = SVGAnimatedLength;
	SVGRectElement.x = SVGAnimatedLength;
	SVGRectElement.height = SVGAnimatedLength;
	SVGRectElement.nodeName = SVGRectElement.tagName = 'RECT';
	SVGRectElement.localName = 'rect';


	/* -- type: SVGURIReference -- */

	SVGURIReference.href = SVGAnimatedString;


	/* -- type: SVGGradientElement -- */
	_$implement(SVGGradientElement, SVGStylable);
	_$implement(SVGGradientElement, SVGUnitTypes);
	_$implement(SVGGradientElement, SVGURIReference);
	_$implement(SVGGradientElement, SVGExternalResourcesRequired);

	SVGGradientElement.spreadMethod = SVGAnimatedEnumeration;
	SVGGradientElement.gradientTransform = SVGAnimatedTransformList;
	SVGGradientElement.gradientUnits = SVGAnimatedEnumeration;
	SVGGradientElement.SVG_SPREADMETHOD_REFLECT = 2;
	SVGGradientElement.SVG_SPREADMETHOD_PAD = 1;
	SVGGradientElement.SVG_SPREADMETHOD_UNKNOWN = 0;
	SVGGradientElement.SVG_SPREADMETHOD_REPEAT = 3;


	/* -- type: SVGLinearGradientElement -- */

	SVGLinearGradientElement.y1 = SVGAnimatedLength;
	SVGLinearGradientElement.x2 = SVGAnimatedLength;
	SVGLinearGradientElement.y2 = SVGAnimatedLength;
	SVGLinearGradientElement.x1 = SVGAnimatedLength;
	SVGLinearGradientElement.nodeName = SVGLinearGradientElement.tagName = 'LINEARGRADIENT';
	SVGLinearGradientElement.localName = 'lineargradient';


	/* -- type: SVGMatrix -- */

	SVGMatrix.e = 0;
	SVGMatrix.c = 0;
	SVGMatrix.a = 0;
	SVGMatrix.b = 0;
	SVGMatrix.d = 0;
	SVGMatrix.f = 0;
	SVGMatrix.skewY = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.flipY = function() { 
		/// <signature>
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.multiply = function(secondMatrix) { 
		/// <signature>
		/// <param name='secondMatrix' type='SVGMatrix' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.inverse = function() { 
		/// <signature>
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.scaleNonUniform = function(scaleFactorX, scaleFactorY) { 
		/// <signature>
		/// <param name='scaleFactorX' type='Number' />
		/// <param name='scaleFactorY' type='Number' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.rotate = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.flipX = function() { 
		/// <signature>
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.translate = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.scale = function(scaleFactor) { 
		/// <signature>
		/// <param name='scaleFactor' type='Number' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.rotateFromVector = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGMatrix.skewX = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};


	/* -- type: MSPopupWindow -- */

	MSPopupWindow.document = HTMLDocument;
	MSPopupWindow.isOpen = false;
	MSPopupWindow.show = function(x, y, w, h, element) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='w' type='Number' />
		/// <param name='h' type='Number' />
		/// <param name='element' type='Object' optional='true' />
		/// </signature>
	};
	MSPopupWindow.hide = function() { };


	/* -- type: BeforeUnloadEvent -- */

	BeforeUnloadEvent.returnValue = '';


	/* -- type: MSMouseEventExtensions -- */

	MSMouseEventExtensions.toElement = HTMLElement;
	MSMouseEventExtensions.which = 0;
	MSMouseEventExtensions.fromElement = HTMLElement;
	MSMouseEventExtensions.layerY = 0;
	MSMouseEventExtensions.layerX = 0;


	/* -- type: SVGPathSegLinetoAbs -- */

	SVGPathSegLinetoAbs.y = 0;
	SVGPathSegLinetoAbs.x = 0;


	/* -- type: SVGFEDisplacementMapElement -- */
	_$implement(SVGFEDisplacementMapElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEDisplacementMapElement.in2 = SVGAnimatedString;
	SVGFEDisplacementMapElement.xChannelSelector = SVGAnimatedEnumeration;
	SVGFEDisplacementMapElement.yChannelSelector = SVGAnimatedEnumeration;
	SVGFEDisplacementMapElement.scale = SVGAnimatedNumber;
	SVGFEDisplacementMapElement.in1 = SVGAnimatedString;
	SVGFEDisplacementMapElement.SVG_CHANNEL_B = 3;
	SVGFEDisplacementMapElement.SVG_CHANNEL_R = 1;
	SVGFEDisplacementMapElement.SVG_CHANNEL_G = 2;
	SVGFEDisplacementMapElement.SVG_CHANNEL_UNKNOWN = 0;
	SVGFEDisplacementMapElement.SVG_CHANNEL_A = 4;
	SVGFEDisplacementMapElement.nodeName = SVGFEDisplacementMapElement.tagName = 'FEDISPLACEMENTMAP';
	SVGFEDisplacementMapElement.localName = 'fedisplacementmap';


	/* -- type: WindowTimersExtension -- */

	WindowTimersExtension.msSetImmediate = function(expression, args) { 
		/// <signature>
		/// <param name='expression' type='Object' />
		/// <param name='args' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	WindowTimersExtension.clearImmediate = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
	};
	WindowTimersExtension.msClearImmediate = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
	};
	WindowTimersExtension.setImmediate = function(expression, args) { 
		/// <signature>
		/// <param name='expression' type='Object' />
		/// <param name='args' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};


	/* -- type: MSHTMLSelectElementExtensions -- */



	/* -- type: SVGComponentTransferFunctionElement -- */

	SVGComponentTransferFunctionElement.tableValues = SVGAnimatedNumberList;
	SVGComponentTransferFunctionElement.slope = SVGAnimatedNumber;
	SVGComponentTransferFunctionElement.type = SVGAnimatedEnumeration;
	SVGComponentTransferFunctionElement.exponent = SVGAnimatedNumber;
	SVGComponentTransferFunctionElement.amplitude = SVGAnimatedNumber;
	SVGComponentTransferFunctionElement.intercept = SVGAnimatedNumber;
	SVGComponentTransferFunctionElement.offset = SVGAnimatedNumber;
	SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN = 0;
	SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_TABLE = 2;
	SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY = 1;
	SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_GAMMA = 5;
	SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE = 3;
	SVGComponentTransferFunctionElement.SVG_FECOMPONENTTRANSFER_TYPE_LINEAR = 4;


	/* -- type: SVGFEFuncRElement -- */

	SVGFEFuncRElement.nodeName = SVGFEFuncRElement.tagName = 'FEFUNCR';
	SVGFEFuncRElement.localName = 'fefuncr';


	/* -- type: SVGPathSegCurvetoCubicAbs -- */

	SVGPathSegCurvetoCubicAbs.y1 = 0;
	SVGPathSegCurvetoCubicAbs.y = 0;
	SVGPathSegCurvetoCubicAbs.x2 = 0;
	SVGPathSegCurvetoCubicAbs.x = 0;
	SVGPathSegCurvetoCubicAbs.y2 = 0;
	SVGPathSegCurvetoCubicAbs.x1 = 0;


	/* -- type: DocumentStyle -- */

	DocumentStyle.styleSheets = StyleSheetList;


	/* -- type: MSHTMLMarqueeElementExtensions -- */



	/* -- type: DOML2DeprecatedMarginStyle_HTMLMarqueeElement -- */

	DOML2DeprecatedMarginStyle_HTMLMarqueeElement.vspace = 0;
	DOML2DeprecatedMarginStyle_HTMLMarqueeElement.hspace = 0;


	/* -- type: HTMLMarqueeElement -- */
	_$implement(HTMLMarqueeElement, DOML2DeprecatedMarginStyle_HTMLMarqueeElement);
	_$implement(HTMLMarqueeElement, MSDataBindingExtensions);
	_$implement(HTMLMarqueeElement, MSHTMLMarqueeElementExtensions);
	_$implement(HTMLMarqueeElement, DOML2DeprecatedBackgroundColorStyle);

	HTMLMarqueeElement.width = '';
	HTMLMarqueeElement.trueSpeed = false;
	HTMLMarqueeElement.scrollDelay = 0;
	HTMLMarqueeElement.scrollAmount = 0;
	HTMLMarqueeElement.height = '';
	HTMLMarqueeElement.behavior = '';
	HTMLMarqueeElement.loop = 0;
	HTMLMarqueeElement.direction = '';
	HTMLMarqueeElement.stop = function() { };
	HTMLMarqueeElement.start = function() { };
	HTMLMarqueeElement.nodeName = HTMLMarqueeElement.tagName = 'MARQUEE';
	HTMLMarqueeElement.localName = 'marquee';
	_events(HTMLMarqueeElement, "onbounce", "onstart", "onfinish");


	/* -- type: Geolocation -- */

	Geolocation.clearWatch = function(watchId) { 
		/// <signature>
		/// <param name='watchId' type='Number' />
		/// </signature>
	};
	Geolocation.getCurrentPosition = function(successCallback, errorCallback, options) { 
		/// <signature>
		/// <param name='successCallback' type='PositionCallback' />
		/// <param name='errorCallback' type='PositionErrorCallback' optional='true' />
		/// <param name='options' type='PositionOptions' optional='true' />
		/// </signature>
	};
	Geolocation.watchPosition = function(successCallback, errorCallback, options) { 
		/// <signature>
		/// <param name='successCallback' type='PositionCallback' />
		/// <param name='errorCallback' type='PositionErrorCallback' optional='true' />
		/// <param name='options' type='PositionOptions' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};


	/* -- type: CSSImportRule -- */

	CSSImportRule.styleSheet = CSSStyleSheet;
	CSSImportRule.media = MediaList;
	CSSImportRule.href = '';


	/* -- type: DOML2DeprecatedSizeProperty_HTMLBaseFontElement -- */

	DOML2DeprecatedSizeProperty_HTMLBaseFontElement.size = 0;


	/* -- type: HTMLBaseFontElement -- */
	_$implement(HTMLBaseFontElement, DOML2DeprecatedSizeProperty_HTMLBaseFontElement);
	_$implement(HTMLBaseFontElement, DOML2DeprecatedColorProperty);

	HTMLBaseFontElement.face = '';
	HTMLBaseFontElement.nodeName = HTMLBaseFontElement.tagName = 'BASEFONT';
	HTMLBaseFontElement.localName = 'basefont';


	/* -- type: SVGCircleElement -- */
	_$implement(SVGCircleElement, SVGStylable);
	_$implement(SVGCircleElement, SVGTransformable);
	_$implement(SVGCircleElement, SVGLangSpace);
	_$implement(SVGCircleElement, SVGTests);
	_$implement(SVGCircleElement, SVGExternalResourcesRequired);

	SVGCircleElement.cx = SVGAnimatedLength;
	SVGCircleElement.r = SVGAnimatedLength;
	SVGCircleElement.cy = SVGAnimatedLength;
	SVGCircleElement.nodeName = SVGCircleElement.tagName = 'CIRCLE';
	SVGCircleElement.localName = 'circle';


	/* -- type: MSBorderColorHighlightStyle_HTMLTableRowElement -- */

	MSBorderColorHighlightStyle_HTMLTableRowElement.borderColorLight = new Object();
	MSBorderColorHighlightStyle_HTMLTableRowElement.borderColorDark = new Object();


	/* -- type: HTMLMediaElement -- */
	_$implement(HTMLMediaElement, MSHTMLMediaElementExtensions);

	HTMLMediaElement.played = TimeRanges;
	HTMLMediaElement.initialTime = 0;
	HTMLMediaElement.currentSrc = '';
	HTMLMediaElement.readyState = new Object();
	HTMLMediaElement.loop = false;
	HTMLMediaElement.autobuffer = false;
	HTMLMediaElement.ended = false;
	HTMLMediaElement.textTracks = TextTrackList;
	HTMLMediaElement.error = MediaError;
	HTMLMediaElement.buffered = TimeRanges;
	HTMLMediaElement.controls = false;
	HTMLMediaElement.autoplay = false;
	HTMLMediaElement.seekable = TimeRanges;
	HTMLMediaElement.volume = 0;
	HTMLMediaElement.src = '';
	HTMLMediaElement.playbackRate = 0;
	HTMLMediaElement.muted = false;
	HTMLMediaElement.duration = 0;
	HTMLMediaElement.audioTracks = AudioTrackList;
	HTMLMediaElement.paused = false;
	HTMLMediaElement.defaultPlaybackRate = 0;
	HTMLMediaElement.seeking = false;
	HTMLMediaElement.currentTime = 0;
	HTMLMediaElement.preload = '';
	HTMLMediaElement.networkState = 0;
	HTMLMediaElement.HAVE_CURRENT_DATA = 2;
	HTMLMediaElement.HAVE_METADATA = 1;
	HTMLMediaElement.HAVE_NOTHING = 0;
	HTMLMediaElement.NETWORK_NO_SOURCE = 3;
	HTMLMediaElement.HAVE_ENOUGH_DATA = 4;
	HTMLMediaElement.NETWORK_EMPTY = 0;
	HTMLMediaElement.NETWORK_LOADING = 2;
	HTMLMediaElement.NETWORK_IDLE = 1;
	HTMLMediaElement.HAVE_FUTURE_DATA = 3;
	HTMLMediaElement.pause = function() { };
	HTMLMediaElement.play = function() { };
	HTMLMediaElement.canPlayType = function(type) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLMediaElement.load = function() { };


	/* -- type: HTMLAudioElement -- */

	HTMLAudioElement.nodeName = HTMLAudioElement.tagName = 'AUDIO';
	HTMLAudioElement.localName = 'audio';


	/* -- type: IDBCursor -- */

	IDBCursor.source = new Object();
	IDBCursor.direction = '';
	IDBCursor.key = new Object();
	IDBCursor.primaryKey = new Object();
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


	/* -- type: CSSAnimationsProperties -- */

	CSSAnimationsProperties.animationFillMode = '';
	CSSAnimationsProperties.msAnimationDirection = '';
	CSSAnimationsProperties.msAnimationDelay = '';
	CSSAnimationsProperties.msAnimationFillMode = '';
	CSSAnimationsProperties.animationIterationCount = '';
	CSSAnimationsProperties.msAnimationPlayState = '';
	CSSAnimationsProperties.msAnimationIterationCount = '';
	CSSAnimationsProperties.animationDelay = '';
	CSSAnimationsProperties.animationTimingFunction = '';
	CSSAnimationsProperties.msAnimation = '';
	CSSAnimationsProperties.animation = '';
	CSSAnimationsProperties.animationDirection = '';
	CSSAnimationsProperties.animationDuration = '';
	CSSAnimationsProperties.animationName = '';
	CSSAnimationsProperties.animationPlayState = '';
	CSSAnimationsProperties.msAnimationTimingFunction = '';
	CSSAnimationsProperties.msAnimationName = '';
	CSSAnimationsProperties.msAnimationDuration = '';


	/* -- type: SVGPathSegList -- */

	SVGPathSegList.numberOfItems = 0;
	SVGPathSegList.replaceItem = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGPathSeg' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGPathSeg'/>
		/// </signature>
		return SVGPathSeg; 
	};
	SVGPathSegList.getItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGPathSeg'/>
		/// </signature>
		return SVGPathSeg; 
	};
	SVGPathSegList.appendItem = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGPathSeg' />
		/// <returns type='SVGPathSeg'/>
		/// </signature>
		return SVGPathSeg; 
	};
	SVGPathSegList.clear = function() { };
	SVGPathSegList.removeItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGPathSeg'/>
		/// </signature>
		return SVGPathSeg; 
	};
	SVGPathSegList.initialize = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGPathSeg' />
		/// <returns type='SVGPathSeg'/>
		/// </signature>
		return SVGPathSeg; 
	};
	SVGPathSegList.insertItemBefore = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGPathSeg' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGPathSeg'/>
		/// </signature>
		return SVGPathSeg; 
	};


	/* -- type: MSHTMLDocumentEventExtensions -- */

	MSHTMLDocumentEventExtensions.fireEvent = function(eventName, eventObj) { 
		/// <signature>
		/// <param name='eventName' type='String' />
		/// <param name='eventObj' type='Object' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSHTMLDocumentEventExtensions.createEventObject = function(eventObj) { 
		/// <signature>
		/// <param name='eventObj' type='Object' optional='true' />
		/// <returns type='MSEventObj'/>
		/// </signature>
		return MSEventObj; 
	};


	/* -- type: SVGAnimatedPathData -- */

	SVGAnimatedPathData.pathSegList = SVGPathSegList;


	/* -- type: SVGPathElement -- */
	_$implement(SVGPathElement, SVGAnimatedPathData);
	_$implement(SVGPathElement, SVGStylable);
	_$implement(SVGPathElement, SVGTransformable);
	_$implement(SVGPathElement, SVGLangSpace);
	_$implement(SVGPathElement, SVGTests);
	_$implement(SVGPathElement, SVGExternalResourcesRequired);

	SVGPathElement.getPathSegAtLength = function(distance) { 
		/// <signature>
		/// <param name='distance' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGPathElement.createSVGPathSegCurvetoQuadraticAbs = function(x, y, x1, y1) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='x1' type='Number' />
		/// <param name='y1' type='Number' />
		/// <returns type='SVGPathSegCurvetoQuadraticAbs'/>
		/// </signature>
		return SVGPathSegCurvetoQuadraticAbs; 
	};
	SVGPathElement.getPointAtLength = function(distance) { 
		/// <signature>
		/// <param name='distance' type='Number' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGPathElement.createSVGPathSegLinetoRel = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegLinetoRel'/>
		/// </signature>
		return SVGPathSegLinetoRel; 
	};
	SVGPathElement.createSVGPathSegCurvetoQuadraticRel = function(x, y, x1, y1) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='x1' type='Number' />
		/// <param name='y1' type='Number' />
		/// <returns type='SVGPathSegCurvetoQuadraticRel'/>
		/// </signature>
		return SVGPathSegCurvetoQuadraticRel; 
	};
	SVGPathElement.createSVGPathSegCurvetoCubicAbs = function(x, y, x1, y1, x2, y2) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='x1' type='Number' />
		/// <param name='y1' type='Number' />
		/// <param name='x2' type='Number' />
		/// <param name='y2' type='Number' />
		/// <returns type='SVGPathSegCurvetoCubicAbs'/>
		/// </signature>
		return SVGPathSegCurvetoCubicAbs; 
	};
	SVGPathElement.createSVGPathSegLinetoAbs = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegLinetoAbs'/>
		/// </signature>
		return SVGPathSegLinetoAbs; 
	};
	SVGPathElement.createSVGPathSegClosePath = function() { 
		/// <signature>
		/// <returns type='SVGPathSegClosePath'/>
		/// </signature>
		return SVGPathSegClosePath; 
	};
	SVGPathElement.createSVGPathSegCurvetoCubicRel = function(x, y, x1, y1, x2, y2) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='x1' type='Number' />
		/// <param name='y1' type='Number' />
		/// <param name='x2' type='Number' />
		/// <param name='y2' type='Number' />
		/// <returns type='SVGPathSegCurvetoCubicRel'/>
		/// </signature>
		return SVGPathSegCurvetoCubicRel; 
	};
	SVGPathElement.createSVGPathSegCurvetoQuadraticSmoothRel = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegCurvetoQuadraticSmoothRel'/>
		/// </signature>
		return SVGPathSegCurvetoQuadraticSmoothRel; 
	};
	SVGPathElement.createSVGPathSegMovetoRel = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegMovetoRel'/>
		/// </signature>
		return SVGPathSegMovetoRel; 
	};
	SVGPathElement.createSVGPathSegCurvetoCubicSmoothAbs = function(x, y, x2, y2) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='x2' type='Number' />
		/// <param name='y2' type='Number' />
		/// <returns type='SVGPathSegCurvetoCubicSmoothAbs'/>
		/// </signature>
		return SVGPathSegCurvetoCubicSmoothAbs; 
	};
	SVGPathElement.createSVGPathSegMovetoAbs = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegMovetoAbs'/>
		/// </signature>
		return SVGPathSegMovetoAbs; 
	};
	SVGPathElement.createSVGPathSegLinetoVerticalRel = function(y) { 
		/// <signature>
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegLinetoVerticalRel'/>
		/// </signature>
		return SVGPathSegLinetoVerticalRel; 
	};
	SVGPathElement.createSVGPathSegArcRel = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='r1' type='Number' />
		/// <param name='r2' type='Number' />
		/// <param name='angle' type='Number' />
		/// <param name='largeArcFlag' type='Boolean' />
		/// <param name='sweepFlag' type='Boolean' />
		/// <returns type='SVGPathSegArcRel'/>
		/// </signature>
		return SVGPathSegArcRel; 
	};
	SVGPathElement.createSVGPathSegCurvetoQuadraticSmoothAbs = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegCurvetoQuadraticSmoothAbs'/>
		/// </signature>
		return SVGPathSegCurvetoQuadraticSmoothAbs; 
	};
	SVGPathElement.getTotalLength = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGPathElement.createSVGPathSegLinetoHorizontalRel = function(x) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <returns type='SVGPathSegLinetoHorizontalRel'/>
		/// </signature>
		return SVGPathSegLinetoHorizontalRel; 
	};
	SVGPathElement.createSVGPathSegCurvetoCubicSmoothRel = function(x, y, x2, y2) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='x2' type='Number' />
		/// <param name='y2' type='Number' />
		/// <returns type='SVGPathSegCurvetoCubicSmoothRel'/>
		/// </signature>
		return SVGPathSegCurvetoCubicSmoothRel; 
	};
	SVGPathElement.createSVGPathSegLinetoVerticalAbs = function(y) { 
		/// <signature>
		/// <param name='y' type='Number' />
		/// <returns type='SVGPathSegLinetoVerticalAbs'/>
		/// </signature>
		return SVGPathSegLinetoVerticalAbs; 
	};
	SVGPathElement.createSVGPathSegLinetoHorizontalAbs = function(x) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <returns type='SVGPathSegLinetoHorizontalAbs'/>
		/// </signature>
		return SVGPathSegLinetoHorizontalAbs; 
	};
	SVGPathElement.createSVGPathSegArcAbs = function(x, y, r1, r2, angle, largeArcFlag, sweepFlag) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='r1' type='Number' />
		/// <param name='r2' type='Number' />
		/// <param name='angle' type='Number' />
		/// <param name='largeArcFlag' type='Boolean' />
		/// <param name='sweepFlag' type='Boolean' />
		/// <returns type='SVGPathSegArcAbs'/>
		/// </signature>
		return SVGPathSegArcAbs; 
	};
	SVGPathElement.nodeName = SVGPathElement.tagName = 'PATH';
	SVGPathElement.localName = 'path';


	/* -- type: MouseEvent -- */
	_$implement(MouseEvent, MSMouseEventExtensions);

	MouseEvent.pageX = 0;
	MouseEvent.offsetY = 0;
	MouseEvent.x = 0;
	MouseEvent.y = 0;
	MouseEvent.altKey = false;
	MouseEvent.metaKey = false;
	MouseEvent.ctrlKey = false;
	MouseEvent.offsetX = 0;
	MouseEvent.screenX = 0;
	MouseEvent.clientY = 0;
	MouseEvent.shiftKey = false;
	MouseEvent.screenY = 0;
	MouseEvent.relatedTarget = EventTarget;
	MouseEvent.button = 0;
	MouseEvent.pageY = 0;
	MouseEvent.clientX = 0;
	MouseEvent.buttons = 0;
	MouseEvent.getModifierState = function(keyArg) { 
		/// <signature>
		/// <param name='keyArg' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MouseEvent.initMouseEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='screenXArg' type='Number' />
		/// <param name='screenYArg' type='Number' />
		/// <param name='clientXArg' type='Number' />
		/// <param name='clientYArg' type='Number' />
		/// <param name='ctrlKeyArg' type='Boolean' />
		/// <param name='altKeyArg' type='Boolean' />
		/// <param name='shiftKeyArg' type='Boolean' />
		/// <param name='metaKeyArg' type='Boolean' />
		/// <param name='buttonArg' type='Number' />
		/// <param name='relatedTargetArg' type='EventTarget' />
		/// </signature>
	};


	/* -- type: WheelEvent -- */

	WheelEvent.deltaZ = 0;
	WheelEvent.deltaX = 0;
	WheelEvent.deltaMode = 0;
	WheelEvent.deltaY = 0;
	WheelEvent.DOM_DELTA_PIXEL = 0x00;
	WheelEvent.DOM_DELTA_LINE = 0x01;
	WheelEvent.DOM_DELTA_PAGE = 0x02;
	WheelEvent.initWheelEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, buttonArg, relatedTargetArg, modifiersListArg, deltaXArg, deltaYArg, deltaZArg, deltaMode) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='screenXArg' type='Number' />
		/// <param name='screenYArg' type='Number' />
		/// <param name='clientXArg' type='Number' />
		/// <param name='clientYArg' type='Number' />
		/// <param name='buttonArg' type='Number' />
		/// <param name='relatedTargetArg' type='EventTarget' />
		/// <param name='modifiersListArg' type='String' />
		/// <param name='deltaXArg' type='Number' />
		/// <param name='deltaYArg' type='Number' />
		/// <param name='deltaZArg' type='Number' />
		/// <param name='deltaMode' type='Number' />
		/// </signature>
	};


	/* -- type: ViewCSS_SVGSVGElement -- */

	ViewCSS_SVGSVGElement.getComputedStyle = function(elt, pseudoElt) { 
		/// <signature>
		/// <param name='elt' type='Element' />
		/// <param name='pseudoElt' type='String' optional='true' />
		/// <returns type='CSSStyleDeclaration'/>
		/// </signature>
		return CSSStyleDeclaration; 
	};


	/* -- type: SVGFEGaussianBlurElement -- */
	_$implement(SVGFEGaussianBlurElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEGaussianBlurElement.stdDeviationX = SVGAnimatedNumber;
	SVGFEGaussianBlurElement.in1 = SVGAnimatedString;
	SVGFEGaussianBlurElement.stdDeviationY = SVGAnimatedNumber;
	SVGFEGaussianBlurElement.setStdDeviation = function(stdDeviationX, stdDeviationY) { 
		/// <signature>
		/// <param name='stdDeviationX' type='Number' />
		/// <param name='stdDeviationY' type='Number' />
		/// </signature>
	};
	SVGFEGaussianBlurElement.nodeName = SVGFEGaussianBlurElement.tagName = 'FEGAUSSIANBLUR';
	SVGFEGaussianBlurElement.localName = 'fegaussianblur';


	/* -- type: Location -- */

	Location.protocol = '';
	Location.hash = '';
	Location.search = '';
	Location.href = '';
	Location.hostname = '';
	Location.pathname = '';
	Location.port = '';
	Location.host = '';
	Location.reload = function(flag) { 
		/// <signature>
		/// <param name='flag' type='Boolean' optional='true' />
		/// </signature>
	};
	Location.replace = function(url) { 
		/// <signature>
		/// <param name='url' type='String' />
		/// </signature>
	};
	Location.assign = function(url) { 
		/// <signature>
		/// <param name='url' type='String' />
		/// </signature>
	};
	Location.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: MSHTMLLIElementExtensions -- */



	/* -- type: SVGTextContentElement -- */
	_$implement(SVGTextContentElement, SVGStylable);
	_$implement(SVGTextContentElement, SVGLangSpace);
	_$implement(SVGTextContentElement, SVGTests);
	_$implement(SVGTextContentElement, SVGExternalResourcesRequired);

	SVGTextContentElement.textLength = SVGAnimatedLength;
	SVGTextContentElement.lengthAdjust = SVGAnimatedEnumeration;
	SVGTextContentElement.LENGTHADJUST_SPACING = 1;
	SVGTextContentElement.LENGTHADJUST_SPACINGANDGLYPHS = 2;
	SVGTextContentElement.LENGTHADJUST_UNKNOWN = 0;
	SVGTextContentElement.getCharNumAtPosition = function(point) { 
		/// <signature>
		/// <param name='point' type='SVGPoint' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGTextContentElement.getStartPositionOfChar = function(charnum) { 
		/// <signature>
		/// <param name='charnum' type='Number' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGTextContentElement.getExtentOfChar = function(charnum) { 
		/// <signature>
		/// <param name='charnum' type='Number' />
		/// <returns type='SVGRect'/>
		/// </signature>
		return SVGRect; 
	};
	SVGTextContentElement.selectSubString = function(charnum, nchars) { 
		/// <signature>
		/// <param name='charnum' type='Number' />
		/// <param name='nchars' type='Number' />
		/// </signature>
	};
	SVGTextContentElement.getSubStringLength = function(charnum, nchars) { 
		/// <signature>
		/// <param name='charnum' type='Number' />
		/// <param name='nchars' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGTextContentElement.getComputedTextLength = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGTextContentElement.getNumberOfChars = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGTextContentElement.getRotationOfChar = function(charnum) { 
		/// <signature>
		/// <param name='charnum' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGTextContentElement.getEndPositionOfChar = function(charnum) { 
		/// <signature>
		/// <param name='charnum' type='Number' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};


	/* -- type: WebSocket -- */
	_$implement(WebSocket, EventTarget);

	WebSocketCtor.OPEN = 1;
	WebSocketCtor.CLOSING = 2;
	WebSocketCtor.CONNECTING = 0;
	WebSocketCtor.CLOSED = 3;
	WebSocket.protocol = '';
	WebSocket.readyState = 0;
	WebSocket.bufferedAmount = 0;
	WebSocket.extensions = '';
	WebSocket.binaryType = '';
	WebSocket.url = '';
	WebSocket.OPEN = 1;
	WebSocket.CLOSING = 2;
	WebSocket.CONNECTING = 0;
	WebSocket.CLOSED = 3;
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


	/* -- type: HTMLPhraseElement -- */

	HTMLPhraseElement.dateTime = '';
	HTMLPhraseElement.cite = '';
	HTMLPhraseElement.nodeName = HTMLPhraseElement.tagName = 'SMALL';
	HTMLPhraseElement.localName = 'small';


	/* -- type: MSHTMLAreaElementExtensions -- */



	/* -- type: SVGPolygonElement -- */
	_$implement(SVGPolygonElement, SVGStylable);
	_$implement(SVGPolygonElement, SVGTransformable);
	_$implement(SVGPolygonElement, SVGLangSpace);
	_$implement(SVGPolygonElement, SVGAnimatedPoints);
	_$implement(SVGPolygonElement, SVGTests);
	_$implement(SVGPolygonElement, SVGExternalResourcesRequired);

	SVGPolygonElement.nodeName = SVGPolygonElement.tagName = 'POLYGON';
	SVGPolygonElement.localName = 'polygon';


	/* -- type: SVGPathSegMovetoAbs -- */

	SVGPathSegMovetoAbs.y = 0;
	SVGPathSegMovetoAbs.x = 0;


	/* -- type: SVGMetadataElement -- */

	SVGMetadataElement.nodeName = SVGMetadataElement.tagName = 'METADATA';
	SVGMetadataElement.localName = 'metadata';


	/* -- type: WindowLocalStorage -- */

	WindowLocalStorage.localStorage = Storage;


	/* -- type: DOMHTMLImplementation -- */

	DOMHTMLImplementation.createHTMLDocument = function(title) { 
		/// <signature>
		/// <param name='title' type='String' />
		/// <returns type='Document'/>
		/// </signature>
		return Document; 
	};


	/* -- type: MSBorderColorHighlightStyle_HTMLTableCellElement -- */

	MSBorderColorHighlightStyle_HTMLTableCellElement.borderColorLight = new Object();
	MSBorderColorHighlightStyle_HTMLTableCellElement.borderColorDark = new Object();


	/* -- type: DOMTokenList -- */

	DOMTokenList.length = 0;
	DOMTokenList.contains = function(token) { 
		/// <signature>
		/// <param name='token' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	DOMTokenList.remove = function(token) { 
		/// <signature>
		/// <param name='token' type='String' />
		/// </signature>
	};
	DOMTokenList.toggle = function(token) { 
		/// <signature>
		/// <param name='token' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	DOMTokenList.add = function(token) { 
		/// <signature>
		/// <param name='token' type='String' />
		/// </signature>
	};
	DOMTokenList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return this[index] || _$getTrackingNull(''); 
	};
	DOMTokenList.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	/* Add a single array element */
	DOMTokenList[0] = _$getTrackingNull('');


	/* -- type: MSHTMLPreElementExtensions -- */
	_$implement(MSHTMLPreElementExtensions, DOML2DeprecatedTextFlowControl_HTMLBlockElement);

	MSHTMLPreElementExtensions.cite = '';


	/* -- type: HTMLPreElement -- */
	_$implement(HTMLPreElement, DOML2DeprecatedWidthStyle);
	_$implement(HTMLPreElement, MSHTMLPreElementExtensions);

	HTMLPreElement.nodeName = HTMLPreElement.tagName = 'PRE';
	HTMLPreElement.localName = 'pre';


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLInputElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLInputElement.align = '';


	/* -- type: SVGAnimatedNumber -- */

	SVGAnimatedNumber.animVal = 0;
	SVGAnimatedNumber.baseVal = 0;


	/* -- type: MSCSSScrollTranslationProperties -- */

	MSCSSScrollTranslationProperties.msScrollTranslation = '';


	/* -- type: HTMLParamElement -- */

	HTMLParamElement.value = '';
	HTMLParamElement.name = '';
	HTMLParamElement.type = '';
	HTMLParamElement.valueType = '';
	HTMLParamElement.nodeName = HTMLParamElement.tagName = 'PARAM';
	HTMLParamElement.localName = 'param';


	/* -- type: DOML2DeprecatedBorderStyle_HTMLInputElement -- */

	DOML2DeprecatedBorderStyle_HTMLInputElement.border = '';


	/* -- type: MSHTMLInputElementExtensions -- */
	_$implement(MSHTMLInputElementExtensions, DOML2DeprecatedBorderStyle_HTMLInputElement);
	_$implement(MSHTMLInputElementExtensions, DOML2DeprecatedMarginStyle_HTMLInputElement);

	MSHTMLInputElementExtensions.status = false;
	MSHTMLInputElementExtensions.complete = false;
	MSHTMLInputElementExtensions.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};


	/* -- type: MSImageResourceExtensions_HTMLInputElement -- */

	MSImageResourceExtensions_HTMLInputElement.dynsrc = '';
	MSImageResourceExtensions_HTMLInputElement.vrml = '';
	MSImageResourceExtensions_HTMLInputElement.loop = 0;
	MSImageResourceExtensions_HTMLInputElement.start = '';
	MSImageResourceExtensions_HTMLInputElement.lowsrc = '';


	/* -- type: HTMLInputElement -- */
	_$implement(HTMLInputElement, MSImageResourceExtensions_HTMLInputElement);
	_$implement(HTMLInputElement, DOML2DeprecatedAlignmentStyle_HTMLInputElement);
	_$implement(HTMLInputElement, MSHTMLInputElementExtensions);
	_$implement(HTMLInputElement, MSDataBindingExtensions);

	HTMLInputElement.validationMessage = '';
	HTMLInputElement.files = FileList;
	HTMLInputElement.max = '';
	HTMLInputElement.formTarget = '';
	HTMLInputElement.form = HTMLFormElement;
	HTMLInputElement.selectionStart = 0;
	HTMLInputElement.willValidate = false;
	HTMLInputElement.readOnly = false;
	HTMLInputElement.step = '';
	HTMLInputElement.required = false;
	HTMLInputElement.list = HTMLElement;
	HTMLInputElement.autocomplete = '';
	HTMLInputElement.value = '';
	HTMLInputElement.src = '';
	HTMLInputElement.useMap = '';
	HTMLInputElement.name = '';
	HTMLInputElement.formAction = '';
	HTMLInputElement.checked = false;
	HTMLInputElement.validity = ValidityState;
	HTMLInputElement.type = '';
	HTMLInputElement.defaultValue = '';
	HTMLInputElement.width = '';
	HTMLInputElement.indeterminate = false;
	HTMLInputElement.size = 0;
	HTMLInputElement.autofocus = false;
	HTMLInputElement.selectionEnd = 0;
	HTMLInputElement.formEnctype = '';
	HTMLInputElement.valueAsNumber = 0;
	HTMLInputElement.placeholder = '';
	HTMLInputElement.formMethod = '';
	HTMLInputElement.accept = '';
	HTMLInputElement.alt = '';
	HTMLInputElement.defaultChecked = false;
	HTMLInputElement.min = '';
	HTMLInputElement.height = '';
	HTMLInputElement.pattern = '';
	HTMLInputElement.maxLength = 0;
	HTMLInputElement.formNoValidate = '';
	HTMLInputElement.multiple = false;
	HTMLInputElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLInputElement.stepDown = function(n) { 
		/// <signature>
		/// <param name='n' type='Number' optional='true' />
		/// </signature>
	};
	HTMLInputElement.stepUp = function(n) { 
		/// <signature>
		/// <param name='n' type='Number' optional='true' />
		/// </signature>
	};
	HTMLInputElement.setCustomValidity = function(error) { 
		/// <signature>
		/// <param name='error' type='String' />
		/// </signature>
	};
	HTMLInputElement.setSelectionRange = function(start, end) { 
		/// <signature>
		/// <param name='start' type='Number' />
		/// <param name='end' type='Number' />
		/// </signature>
	};
	HTMLInputElement.select = function() { };
	HTMLInputElement.nodeName = HTMLInputElement.tagName = 'INPUT';
	HTMLInputElement.localName = 'input';


	/* -- type: MSHTMLAnchorElementExtensions -- */

	MSHTMLAnchorElementExtensions.protocolLong = '';
	MSHTMLAnchorElementExtensions.nameProp = '';
	MSHTMLAnchorElementExtensions.mimeType = '';
	MSHTMLAnchorElementExtensions.Methods = '';


	/* -- type: HTMLAnchorElement -- */
	_$implement(HTMLAnchorElement, MSDataBindingExtensions);
	_$implement(HTMLAnchorElement, MSHTMLAnchorElementExtensions);

	HTMLAnchorElement.protocol = '';
	HTMLAnchorElement.rel = '';
	HTMLAnchorElement.search = '';
	HTMLAnchorElement.coords = '';
	HTMLAnchorElement.hostname = '';
	HTMLAnchorElement.pathname = '';
	HTMLAnchorElement.target = '';
	HTMLAnchorElement.text = '';
	HTMLAnchorElement.href = '';
	HTMLAnchorElement.name = '';
	HTMLAnchorElement.charset = '';
	HTMLAnchorElement.hreflang = '';
	HTMLAnchorElement.port = '';
	HTMLAnchorElement.host = '';
	HTMLAnchorElement.hash = '';
	HTMLAnchorElement.rev = '';
	HTMLAnchorElement.type = '';
	HTMLAnchorElement.shape = '';
	HTMLAnchorElement.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLAnchorElement.nodeName = HTMLAnchorElement.tagName = 'A';
	HTMLAnchorElement.localName = 'a';


	/* -- type: HTMLTableAlignment -- */

	HTMLTableAlignment.ch = '';
	HTMLTableAlignment.vAlign = '';
	HTMLTableAlignment.chOff = '';


	/* -- type: HTMLTableSectionElement -- */
	_$implement(HTMLTableSectionElement, MSHTMLTableSectionElementExtensions);
	_$implement(HTMLTableSectionElement, HTMLTableAlignment);
	_$implement(HTMLTableSectionElement, DOML2DeprecatedAlignmentStyle_HTMLTableSectionElement);

	HTMLTableSectionElement.rows = _createHTMLCollection('tr');
	HTMLTableSectionElement.deleteRow = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};
	HTMLTableSectionElement.insertRow = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='HTMLElement'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLTableSectionElement.nodeName = HTMLTableSectionElement.tagName = 'THEAD';
	HTMLTableSectionElement.localName = 'thead';


	/* -- type: DOML2DeprecatedListNumberingAndBulletStyle -- */

	DOML2DeprecatedListNumberingAndBulletStyle.type = '';


	/* -- type: MSGestureEvent -- */

	MSGestureEvent.offsetY = 0;
	MSGestureEvent.translationY = 0;
	MSGestureEvent.velocityExpansion = 0;
	MSGestureEvent.velocityY = 0;
	MSGestureEvent.velocityAngular = 0;
	MSGestureEvent.translationX = 0;
	MSGestureEvent.velocityX = 0;
	MSGestureEvent.hwTimestamp = 0;
	MSGestureEvent.offsetX = 0;
	MSGestureEvent.screenX = 0;
	MSGestureEvent.rotation = 0;
	MSGestureEvent.expansion = 0;
	MSGestureEvent.clientY = 0;
	MSGestureEvent.screenY = 0;
	MSGestureEvent.scale = 0;
	MSGestureEvent.gestureObject = new Object();
	MSGestureEvent.clientX = 0;
	MSGestureEvent.MSGESTURE_FLAG_BEGIN = 0x00000001;
	MSGestureEvent.MSGESTURE_FLAG_END = 0x00000002;
	MSGestureEvent.MSGESTURE_FLAG_CANCEL = 0x00000004;
	MSGestureEvent.MSGESTURE_FLAG_INERTIA = 0x00000008;
	MSGestureEvent.MSGESTURE_FLAG_NONE = 0x00000000;
	MSGestureEvent.initGestureEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, offsetXArg, offsetYArg, translationXArg, translationYArg, scaleArg, expansionArg, rotationArg, velocityXArg, velocityYArg, velocityExpansionArg, velocityAngularArg, hwTimestampArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='screenXArg' type='Number' />
		/// <param name='screenYArg' type='Number' />
		/// <param name='clientXArg' type='Number' />
		/// <param name='clientYArg' type='Number' />
		/// <param name='offsetXArg' type='Number' />
		/// <param name='offsetYArg' type='Number' />
		/// <param name='translationXArg' type='Number' />
		/// <param name='translationYArg' type='Number' />
		/// <param name='scaleArg' type='Number' />
		/// <param name='expansionArg' type='Number' />
		/// <param name='rotationArg' type='Number' />
		/// <param name='velocityXArg' type='Number' />
		/// <param name='velocityYArg' type='Number' />
		/// <param name='velocityExpansionArg' type='Number' />
		/// <param name='velocityAngularArg' type='Number' />
		/// <param name='hwTimestampArg' type='Number' />
		/// </signature>
	};


	/* -- type: SVGRadialGradientElement -- */

	SVGRadialGradientElement.cx = SVGAnimatedLength;
	SVGRadialGradientElement.r = SVGAnimatedLength;
	SVGRadialGradientElement.fx = SVGAnimatedLength;
	SVGRadialGradientElement.cy = SVGAnimatedLength;
	SVGRadialGradientElement.fy = SVGAnimatedLength;
	SVGRadialGradientElement.nodeName = SVGRadialGradientElement.tagName = 'RADIALGRADIENT';
	SVGRadialGradientElement.localName = 'radialgradient';


	/* -- type: DocumentType -- */

	DocumentType.name = '';
	DocumentType.internalSubset = '';
	DocumentType.systemId = '';
	DocumentType.notations = NamedNodeMap;
	DocumentType.publicId = '';
	DocumentType.entities = NamedNodeMap;
	DocumentType.nodeType = Node.DOCUMENT_TYPE_NODE;
	DocumentType.nodeName = 'html';


	/* -- type: TextRangeCollection -- */

	TextRangeCollection.length = 0;
	TextRangeCollection.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='TextRange'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(TextRange)); 
	};
	/* Add a single array element */
	TextRangeCollection[0] = _$getTrackingNull(Object.create(TextRange));


	/* -- type: HTMLTableHeaderCellScope -- */

	HTMLTableHeaderCellScope.scope = '';


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


	/* -- type: DocumentTraversal -- */

	DocumentTraversal.createNodeIterator = function(root, whatToShow, filter, entityReferenceExpansion) { 
		/// <signature>
		/// <param name='root' type='Node' />
		/// <param name='whatToShow' type='Number' />
		/// <param name='filter' type='NodeFilterCallback' />
		/// <param name='entityReferenceExpansion' type='Boolean' />
		/// <returns type='NodeIterator'/>
		/// </signature>
		return NodeIterator; 
	};
	DocumentTraversal.createTreeWalker = function(root, whatToShow, filter, entityReferenceExpansion) { 
		/// <signature>
		/// <param name='root' type='Node' />
		/// <param name='whatToShow' type='Number' />
		/// <param name='filter' type='NodeFilterCallback' />
		/// <param name='entityReferenceExpansion' type='Boolean' />
		/// <returns type='TreeWalker'/>
		/// </signature>
		return TreeWalker; 
	};


	/* -- type: MSApp -- */

	MSApp.createFileFromStorageFile = function(storageFile) { 
		/// <signature>
		/// <param name='storageFile' type='Object' />
		/// <returns type='File'/>
		/// </signature>
		return File; 
	};
	MSApp.createBlobFromRandomAccessStream = function(type, seeker) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='seeker' type='Object' />
		/// <returns type='Blob'/>
		/// </signature>
		return Blob; 
	};
	MSApp.createStreamFromInputStream = function(type, inputStream) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='inputStream' type='Object' />
		/// <returns type='MSStream'/>
		/// </signature>
		return MSStream; 
	};
	MSApp.terminateApp = function(exceptionObject) { 
		/// <signature>
		/// <param name='exceptionObject' type='Object' />
		/// </signature>
	};
	MSApp.createDataPackage = function(object) { 
		/// <signature>
		/// <param name='object' type='Object' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	MSApp.execUnsafeLocalFunction = function(unsafeFunction) { 
		/// <signature>
		/// <param name='unsafeFunction' type='MSUnsafeFunctionCallback' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	MSApp.getHtmlPrintDocumentSource = function(htmlDoc, printTemplate) { 
		/// <signature>
		/// <param name='htmlDoc' type='Object' />
		/// <param name='printTemplate' type='String' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	MSApp.addPublicLocalApplicationUri = function(uri) { 
		/// <signature>
		/// <param name='uri' type='String' />
		/// </signature>
	};
	MSApp.createDataPackageFromSelection = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};


	/* -- type: DOML2DeprecatedWordWrapSuppression_HTMLDivElement -- */

	DOML2DeprecatedWordWrapSuppression_HTMLDivElement.noWrap = false;


	/* -- type: SVGStyleElement -- */
	_$implement(SVGStyleElement, SVGLangSpace);

	SVGStyleElement.media = '';
	SVGStyleElement.title = '';
	SVGStyleElement.type = '';
	SVGStyleElement.nodeName = SVGStyleElement.tagName = 'STYLE';
	SVGStyleElement.localName = 'style';


	/* -- type: ViewCSS -- */

	ViewCSS.getComputedStyle = function(elt, pseudoElt) { 
		/// <signature>
		/// <param name='elt' type='Element' />
		/// <param name='pseudoElt' type='String' optional='true' />
		/// <returns type='CSSStyleDeclaration'/>
		/// </signature>
		return CSSStyleDeclaration; 
	};


	/* -- type: SVGFEImageElement -- */
	_$implement(SVGFEImageElement, SVGLangSpace);
	_$implement(SVGFEImageElement, SVGFilterPrimitiveStandardAttributes);
	_$implement(SVGFEImageElement, SVGURIReference);
	_$implement(SVGFEImageElement, SVGExternalResourcesRequired);

	SVGFEImageElement.preserveAspectRatio = SVGAnimatedPreserveAspectRatio;
	SVGFEImageElement.nodeName = SVGFEImageElement.tagName = 'FEIMAGE';
	SVGFEImageElement.localName = 'feimage';


	/* -- type: SVGPathSegLinetoVerticalAbs -- */

	SVGPathSegLinetoVerticalAbs.y = 0;


	/* -- type: HTMLLIElement -- */
	_$implement(HTMLLIElement, DOML2DeprecatedListNumberingAndBulletStyle);
	_$implement(HTMLLIElement, MSHTMLLIElementExtensions);

	HTMLLIElement.value = 0;
	HTMLLIElement.nodeName = HTMLLIElement.tagName = 'LI';
	HTMLLIElement.localName = 'li';


	/* -- type: SVGTextPositioningElement -- */

	SVGTextPositioningElement.y = SVGAnimatedLengthList;
	SVGTextPositioningElement.rotate = SVGAnimatedNumberList;
	SVGTextPositioningElement.dy = SVGAnimatedLengthList;
	SVGTextPositioningElement.dx = SVGAnimatedLengthList;
	SVGTextPositioningElement.x = SVGAnimatedLengthList;


	/* -- type: SVGTSpanElement -- */

	SVGTSpanElement.nodeName = SVGTSpanElement.tagName = 'TSPAN';
	SVGTSpanElement.localName = 'tspan';


	/* -- type: SVGAnimatedInteger -- */

	SVGAnimatedInteger.animVal = 0;
	SVGAnimatedInteger.baseVal = 0;


	/* -- type: NavigatorAbilities -- */



	/* -- type: DOML2DeprecatedListSpaceReduction -- */

	DOML2DeprecatedListSpaceReduction.compact = false;


	/* -- type: MSHTMLDirectoryElementExtensions -- */
	_$implement(MSHTMLDirectoryElementExtensions, DOML2DeprecatedListNumberingAndBulletStyle);



	/* -- type: HTMLDirectoryElement -- */
	_$implement(HTMLDirectoryElement, DOML2DeprecatedListSpaceReduction);
	_$implement(HTMLDirectoryElement, MSHTMLDirectoryElementExtensions);

	HTMLDirectoryElement.nodeName = HTMLDirectoryElement.tagName = 'DIR';
	HTMLDirectoryElement.localName = 'dir';


	/* -- type: MSHTMLLegendElementExtensions -- */



	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLLegendElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLLegendElement.align = '';


	/* -- type: HTMLLegendElement -- */
	_$implement(HTMLLegendElement, DOML2DeprecatedAlignmentStyle_HTMLLegendElement);
	_$implement(HTMLLegendElement, MSDataBindingExtensions);
	_$implement(HTMLLegendElement, MSHTMLLegendElementExtensions);

	HTMLLegendElement.form = HTMLFormElement;
	HTMLLegendElement.nodeName = HTMLLegendElement.tagName = 'LEGEND';
	HTMLLegendElement.localName = 'legend';


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLIFrameElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLIFrameElement.align = '';


	/* -- type: MSResourceMetadata -- */



	/* -- type: MSHTMLLabelElementExtensions -- */



	/* -- type: HTMLLabelElement -- */
	_$implement(HTMLLabelElement, MSDataBindingExtensions);
	_$implement(HTMLLabelElement, MSHTMLLabelElementExtensions);

	HTMLLabelElement.htmlFor = '';
	HTMLLabelElement.form = HTMLFormElement;
	HTMLLabelElement.nodeName = HTMLLabelElement.tagName = 'LABEL';
	HTMLLabelElement.localName = 'label';


	/* -- type: SVGSVGElementEventHandlers -- */

	_events(SVGSVGElementEventHandlers, "onresize", "onunload", "onscroll", "onerror", "onzoom", "onabort");


	/* -- type: SVGZoomAndPan -- */

	SVGZoomAndPan.zoomAndPan = 0;
	SVGZoomAndPan.SVG_ZOOMANDPAN_MAGNIFY = 2;
	SVGZoomAndPan.SVG_ZOOMANDPAN_DISABLE = 1;
	SVGZoomAndPan.SVG_ZOOMANDPAN_UNKNOWN = 0;


	/* -- type: SVGFitToViewBox -- */

	SVGFitToViewBox.viewBox = SVGAnimatedRect;
	SVGFitToViewBox.preserveAspectRatio = SVGAnimatedPreserveAspectRatio;


	/* -- type: DocumentEvent -- */

	DocumentEvent.createEvent = function(eventInterface) { 
		/// <signature>
		/// <param name='eventInterface' type='String' />
		/// <returns type='Event'/>
		/// </signature>
		return _createEvent(eventInterface);
	};


	/* -- type: SVGSVGElement -- */
	_$implement(SVGSVGElement, SVGZoomAndPan);
	_$implement(SVGSVGElement, SVGLangSpace);
	_$implement(SVGSVGElement, SVGFitToViewBox);
	_$implement(SVGSVGElement, SVGTests);
	_$implement(SVGSVGElement, SVGLocatable);
	_$implement(SVGSVGElement, SVGExternalResourcesRequired);
	_$implement(SVGSVGElement, SVGSVGElementEventHandlers);
	_$implement(SVGSVGElement, SVGStylable);
	_$implement(SVGSVGElement, DocumentEvent);
	_$implement(SVGSVGElement, ViewCSS_SVGSVGElement);

	SVGSVGElement.width = SVGAnimatedLength;
	SVGSVGElement.screenPixelToMillimeterY = 0;
	SVGSVGElement.contentStyleType = '';
	SVGSVGElement.x = SVGAnimatedLength;
	SVGSVGElement.height = SVGAnimatedLength;
	SVGSVGElement.contentScriptType = '';
	SVGSVGElement.y = SVGAnimatedLength;
	SVGSVGElement.pixelUnitToMillimeterX = 0;
	SVGSVGElement.currentTranslate = SVGPoint;
	SVGSVGElement.viewport = SVGRect;
	SVGSVGElement.currentScale = 0;
	SVGSVGElement.screenPixelToMillimeterX = 0;
	SVGSVGElement.pixelUnitToMillimeterY = 0;
	SVGSVGElement.createSVGLength = function() { 
		/// <signature>
		/// <returns type='SVGLength'/>
		/// </signature>
		return SVGLength; 
	};
	SVGSVGElement.setCurrentTime = function(seconds) { 
		/// <signature>
		/// <param name='seconds' type='Number' />
		/// </signature>
	};
	SVGSVGElement.getIntersectionList = function(rect, referenceElement) { 
		/// <signature>
		/// <param name='rect' type='SVGRect' />
		/// <param name='referenceElement' type='SVGElement' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	SVGSVGElement.unpauseAnimations = function() { };
	SVGSVGElement.createSVGRect = function() { 
		/// <signature>
		/// <returns type='SVGRect'/>
		/// </signature>
		return SVGRect; 
	};
	SVGSVGElement.checkIntersection = function(element, rect) { 
		/// <signature>
		/// <param name='element' type='SVGElement' />
		/// <param name='rect' type='SVGRect' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	SVGSVGElement.unsuspendRedrawAll = function() { };
	SVGSVGElement.pauseAnimations = function() { };
	SVGSVGElement.deselectAll = function() { };
	SVGSVGElement.suspendRedraw = function(maxWaitMilliseconds) { 
		/// <signature>
		/// <param name='maxWaitMilliseconds' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGSVGElement.createSVGAngle = function() { 
		/// <signature>
		/// <returns type='SVGAngle'/>
		/// </signature>
		return SVGAngle; 
	};
	SVGSVGElement.getEnclosureList = function(rect, referenceElement) { 
		/// <signature>
		/// <param name='rect' type='SVGRect' />
		/// <param name='referenceElement' type='SVGElement' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	SVGSVGElement.createSVGTransform = function() { 
		/// <signature>
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGSVGElement.unsuspendRedraw = function(suspendHandleID) { 
		/// <signature>
		/// <param name='suspendHandleID' type='Number' />
		/// </signature>
	};
	SVGSVGElement.forceRedraw = function() { };
	SVGSVGElement.getCurrentTime = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	SVGSVGElement.checkEnclosure = function(element, rect) { 
		/// <signature>
		/// <param name='element' type='SVGElement' />
		/// <param name='rect' type='SVGRect' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	SVGSVGElement.createSVGMatrix = function() { 
		/// <signature>
		/// <returns type='SVGMatrix'/>
		/// </signature>
		return SVGMatrix; 
	};
	SVGSVGElement.createSVGPoint = function() { 
		/// <signature>
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGSVGElement.createSVGNumber = function() { 
		/// <signature>
		/// <returns type='SVGNumber'/>
		/// </signature>
		return SVGNumber; 
	};
	SVGSVGElement.createSVGTransformFromMatrix = function(matrix) { 
		/// <signature>
		/// <param name='matrix' type='SVGMatrix' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGSVGElement.getElementById = function(elementId) { 
		/// <signature>
		/// <param name='elementId' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return _getElementById(elementId);
	};
	SVGSVGElement.nodeName = SVGSVGElement.tagName = 'SVG';
	SVGSVGElement.localName = 'svg';


	/* -- type: MSHTMLFontElementExtensions -- */



	/* -- type: MSPointerEvent -- */

	MSPointerEvent.width = 0;
	MSPointerEvent.rotation = 0;
	MSPointerEvent.pressure = 0;
	MSPointerEvent.pointerType = 0;
	MSPointerEvent.isPrimary = false;
	MSPointerEvent.tiltY = 0;
	MSPointerEvent.height = 0;
	MSPointerEvent.intermediatePoints = new Object();
	MSPointerEvent.currentPoint = new Object();
	MSPointerEvent.tiltX = 0;
	MSPointerEvent.hwTimestamp = 0;
	MSPointerEvent.pointerId = 0;
	MSPointerEvent.MSPOINTER_TYPE_PEN = 0x00000003;
	MSPointerEvent.MSPOINTER_TYPE_MOUSE = 0x00000004;
	MSPointerEvent.MSPOINTER_TYPE_TOUCH = 0x00000002;
	MSPointerEvent.initPointerEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg, offsetXArg, offsetYArg, widthArg, heightArg, pressure, rotation, tiltX, tiltY, pointerIdArg, pointerType, hwTimestampArg, isPrimary) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='screenXArg' type='Number' />
		/// <param name='screenYArg' type='Number' />
		/// <param name='clientXArg' type='Number' />
		/// <param name='clientYArg' type='Number' />
		/// <param name='ctrlKeyArg' type='Boolean' />
		/// <param name='altKeyArg' type='Boolean' />
		/// <param name='shiftKeyArg' type='Boolean' />
		/// <param name='metaKeyArg' type='Boolean' />
		/// <param name='buttonArg' type='Number' />
		/// <param name='relatedTargetArg' type='EventTarget' />
		/// <param name='offsetXArg' type='Number' />
		/// <param name='offsetYArg' type='Number' />
		/// <param name='widthArg' type='Number' />
		/// <param name='heightArg' type='Number' />
		/// <param name='pressure' type='Number' />
		/// <param name='rotation' type='Number' />
		/// <param name='tiltX' type='Number' />
		/// <param name='tiltY' type='Number' />
		/// <param name='pointerIdArg' type='Number' />
		/// <param name='pointerType' type='Number' />
		/// <param name='hwTimestampArg' type='Number' />
		/// <param name='isPrimary' type='Boolean' />
		/// </signature>
	};
	MSPointerEvent.getCurrentPoint = function(element) { 
		/// <signature>
		/// <param name='element' type='Element' />
		/// </signature>
	};
	MSPointerEvent.getIntermediatePoints = function(element) { 
		/// <signature>
		/// <param name='element' type='Element' />
		/// </signature>
	};


	/* -- type: SVGPoint -- */

	SVGPoint.y = 0;
	SVGPoint.x = 0;
	SVGPoint.matrixTransform = function(matrix) { 
		/// <signature>
		/// <param name='matrix' type='SVGMatrix' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};


	/* -- type: MSRangeExtensions -- */

	MSRangeExtensions.createContextualFragment = function(fragment) { 
		/// <signature>
		/// <param name='fragment' type='String' />
		/// <returns type='DocumentFragment'/>
		/// </signature>
		return DocumentFragment; 
	};


	/* -- type: Range -- */
	_$implement(Range, MSRangeExtensions);

	Range.collapsed = false;
	Range.startOffset = 0;
	Range.endOffset = 0;
	Range.startContainer = Node;
	Range.commonAncestorContainer = Node;
	Range.endContainer = Node;
	Range.END_TO_END = 2;
	Range.END_TO_START = 3;
	Range.START_TO_END = 1;
	Range.START_TO_START = 0;
	Range.setEndBefore = function(refNode) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// </signature>
	};
	Range.setStart = function(refNode, offset) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// <param name='offset' type='Number' />
		/// </signature>
	};
	Range.setStartBefore = function(refNode) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// </signature>
	};
	Range.detach = function() { };
	Range.selectNode = function(refNode) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// </signature>
	};
	Range.getBoundingClientRect = function() { 
		/// <signature>
		/// <returns type='ClientRect'/>
		/// </signature>
		return ClientRect; 
	};
	Range.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Range.compareBoundaryPoints = function(how, sourceRange) { 
		/// <signature>
		/// <param name='how' type='Number' />
		/// <param name='sourceRange' type='Range' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	Range.insertNode = function(newNode) { 
		/// <signature>
		/// <param name='newNode' type='Node' />
		/// </signature>
	};
	Range.collapse = function(toStart) { 
		/// <signature>
		/// <param name='toStart' type='Boolean' />
		/// </signature>
	};
	Range.selectNodeContents = function(refNode) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// </signature>
	};
	Range.cloneContents = function() { 
		/// <signature>
		/// <returns type='DocumentFragment'/>
		/// </signature>
		return DocumentFragment; 
	};
	Range.setEnd = function(refNode, offset) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// <param name='offset' type='Number' />
		/// </signature>
	};
	Range.cloneRange = function() { 
		/// <signature>
		/// <returns type='Range'/>
		/// </signature>
		return Range; 
	};
	Range.getClientRects = function() { 
		/// <signature>
		/// <returns type='ClientRectList'/>
		/// </signature>
		return ClientRectList; 
	};
	Range.surroundContents = function(newParent) { 
		/// <signature>
		/// <param name='newParent' type='Node' />
		/// </signature>
	};
	Range.setStartAfter = function(refNode) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// </signature>
	};
	Range.deleteContents = function() { };
	Range.extractContents = function() { 
		/// <signature>
		/// <returns type='DocumentFragment'/>
		/// </signature>
		return DocumentFragment; 
	};
	Range.setEndAfter = function(refNode) { 
		/// <signature>
		/// <param name='refNode' type='Node' />
		/// </signature>
	};


	/* -- type: DOMSettableTokenList -- */

	DOMSettableTokenList.value = '';


	/* -- type: FocusEvent -- */

	FocusEvent.relatedTarget = EventTarget;
	FocusEvent.initFocusEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, relatedTargetArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='relatedTargetArg' type='EventTarget' />
		/// </signature>
	};


	/* -- type: Coordinates -- */

	Coordinates.altitudeAccuracy = 0;
	Coordinates.longitude = 0;
	Coordinates.speed = 0;
	Coordinates.latitude = 0;
	Coordinates.heading = 0;
	Coordinates.accuracy = 0;
	Coordinates.altitude = 0;


	/* -- type: MSScreenExtensions -- */

	MSScreenExtensions.fontSmoothingEnabled = false;
	MSScreenExtensions.deviceXDPI = 0;
	MSScreenExtensions.bufferDepth = 0;
	MSScreenExtensions.systemXDPI = 0;
	MSScreenExtensions.logicalXDPI = 0;
	MSScreenExtensions.updateInterval = 0;
	MSScreenExtensions.systemYDPI = 0;
	MSScreenExtensions.logicalYDPI = 0;
	MSScreenExtensions.deviceYDPI = 0;


	/* -- type: Screen -- */
	_$implement(Screen, MSScreenExtensions);

	Screen.colorDepth = 0;
	Screen.width = 0;
	Screen.availWidth = 0;
	Screen.pixelDepth = 0;
	Screen.height = 0;
	Screen.availHeight = 0;


	/* -- type: MSBorderColorStyle_HTMLFrameSetElement -- */

	MSBorderColorStyle_HTMLFrameSetElement.borderColor = new Object();


	/* -- type: HTMLFrameSetElement -- */
	_$implement(HTMLFrameSetElement, MSHTMLFrameSetElementExtensions);
	_$implement(HTMLFrameSetElement, MSBorderColorStyle_HTMLFrameSetElement);

	HTMLFrameSetElement.rows = '';
	HTMLFrameSetElement.cols = '';
	HTMLFrameSetElement.nodeName = HTMLFrameSetElement.tagName = 'FRAMESET';
	HTMLFrameSetElement.localName = 'frameset';
	_events(HTMLFrameSetElement, "onresize", "ononline", "onafterprint", "onbeforeprint", "onoffline", "onblur", "onfocus", "onhashchange", "onunload", "onmessage", "onerror", "onload", "onbeforeunload", "onstorage");


	/* -- type: MSHTMLTableCellElementExtensions -- */



	/* -- type: SVGAElement -- */
	_$implement(SVGAElement, SVGStylable);
	_$implement(SVGAElement, SVGTransformable);
	_$implement(SVGAElement, SVGLangSpace);
	_$implement(SVGAElement, SVGTests);
	_$implement(SVGAElement, SVGURIReference);
	_$implement(SVGAElement, SVGExternalResourcesRequired);

	SVGAElement.target = SVGAnimatedString;
	SVGAElement.nodeName = SVGAElement.tagName = 'A';
	SVGAElement.localName = 'a';


	/* -- type: MSHTMLDListElementExtensions -- */



	/* -- type: HTMLDListElement -- */
	_$implement(HTMLDListElement, DOML2DeprecatedListSpaceReduction);
	_$implement(HTMLDListElement, MSHTMLDListElementExtensions);

	HTMLDListElement.nodeName = HTMLDListElement.tagName = 'DL';
	HTMLDListElement.localName = 'dl';


	/* -- type: DOML2DeprecatedBackgroundStyle -- */

	DOML2DeprecatedBackgroundStyle.background = '';


	/* -- type: MSBorderColorStyle_HTMLTableCellElement -- */

	MSBorderColorStyle_HTMLTableCellElement.borderColor = new Object();


	/* -- type: DOML2DeprecatedTableCellHeight -- */

	DOML2DeprecatedTableCellHeight.height = new Object();


	/* -- type: DOML2DeprecatedWordWrapSuppression -- */

	DOML2DeprecatedWordWrapSuppression.noWrap = false;


	/* -- type: DOML2DeprecatedWidthStyle_HTMLTableCellElement -- */

	DOML2DeprecatedWidthStyle_HTMLTableCellElement.width = 0;


	/* -- type: HTMLTableCellElement -- */
	_$implement(HTMLTableCellElement, DOML2DeprecatedTableCellHeight);
	_$implement(HTMLTableCellElement, MSBorderColorHighlightStyle_HTMLTableCellElement);
	_$implement(HTMLTableCellElement, HTMLTableAlignment);
	_$implement(HTMLTableCellElement, MSBorderColorStyle_HTMLTableCellElement);
	_$implement(HTMLTableCellElement, DOML2DeprecatedBackgroundStyle);
	_$implement(HTMLTableCellElement, DOML2DeprecatedWidthStyle_HTMLTableCellElement);
	_$implement(HTMLTableCellElement, MSHTMLTableCellElementExtensions);
	_$implement(HTMLTableCellElement, DOML2DeprecatedAlignmentStyle_HTMLTableCellElement);
	_$implement(HTMLTableCellElement, HTMLTableHeaderCellScope);
	_$implement(HTMLTableCellElement, DOML2DeprecatedWordWrapSuppression);
	_$implement(HTMLTableCellElement, DOML2DeprecatedBackgroundColorStyle);

	HTMLTableCellElement.abbr = '';
	HTMLTableCellElement.headers = '';
	HTMLTableCellElement.cellIndex = 0;
	HTMLTableCellElement.rowSpan = 0;
	HTMLTableCellElement.colSpan = 0;
	HTMLTableCellElement.axis = '';


	/* -- type: HTMLTableHeaderCellElement -- */
	_$implement(HTMLTableHeaderCellElement, HTMLTableHeaderCellScope);

	HTMLTableHeaderCellElement.nodeName = HTMLTableHeaderCellElement.tagName = 'TH';
	HTMLTableHeaderCellElement.localName = 'th';


	/* -- type: XMLHttpRequest -- */
	_$implement(XMLHttpRequest, MSXMLHttpRequestExtensions);
	_$implement(XMLHttpRequest, EventTarget);

	XMLHttpRequestCtor.LOADING = 3;
	XMLHttpRequestCtor.DONE = 4;
	XMLHttpRequestCtor.HEADERS_RECEIVED = 2;
	XMLHttpRequestCtor.OPENED = 1;
	XMLHttpRequestCtor.UNSENT = 0;
	XMLHttpRequest.status = 0;
	XMLHttpRequest.withCredentials = false;
	XMLHttpRequest.responseXML = new Object();
	XMLHttpRequest.responseText = '';
	XMLHttpRequest.readyState = 0;
	XMLHttpRequest.statusText = '';
	XMLHttpRequest.LOADING = 3;
	XMLHttpRequest.DONE = 4;
	XMLHttpRequest.HEADERS_RECEIVED = 2;
	XMLHttpRequest.OPENED = 1;
	XMLHttpRequest.UNSENT = 0;
	XMLHttpRequest.open = function(method, url, async, user, password) { 
		/// <signature>
		/// <param name='method' type='String' />
		/// <param name='url' type='String' />
		/// <param name='async' type='Boolean' optional='true' />
		/// <param name='user' type='String' optional='true' />
		/// <param name='password' type='String' optional='true' />
		/// </signature>
	};
	XMLHttpRequest.abort = function() { };
	XMLHttpRequest.send = function(data) { 
		/// <signature>
		/// <param name='data' type='Document' optional='true' />
		/// </signature>
		/// <signature>
		/// <param name='data' type='String' optional='true' />
		/// </signature>
		this.status = 200; this.readyState = XMLHttpRequest.DONE; this.status = 4; this.statusText = "OK";
	};
	XMLHttpRequest.getAllResponseHeaders = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	XMLHttpRequest.getResponseHeader = function(header) { 
		/// <signature>
		/// <param name='header' type='String' />
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
	_events(XMLHttpRequest, "onreadystatechange", "onload");


	/* -- type: MSHTMLButtonElementExtensions -- */

	MSHTMLButtonElementExtensions.status = new Object();
	MSHTMLButtonElementExtensions.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};


	/* -- type: ApplicationCache -- */
	_$implement(ApplicationCache, EventTarget);

	ApplicationCache.status = 0;
	ApplicationCache.CHECKING = 2;
	ApplicationCache.UNCACHED = 0;
	ApplicationCache.UPDATEREADY = 4;
	ApplicationCache.DOWNLOADING = 3;
	ApplicationCache.IDLE = 1;
	ApplicationCache.OBSOLETE = 5;
	ApplicationCache.swapCache = function() { };
	ApplicationCache.abort = function() { };
	ApplicationCache.update = function() { };
	_events(ApplicationCache, "ondownloading", "onprogress", "onupdateready", "oncached", "onobsolete", "onerror", "onchecking", "onnoupdate");


	/* -- type: SVGDefsElement -- */
	_$implement(SVGDefsElement, SVGStylable);
	_$implement(SVGDefsElement, SVGTransformable);
	_$implement(SVGDefsElement, SVGLangSpace);
	_$implement(SVGDefsElement, SVGTests);
	_$implement(SVGDefsElement, SVGExternalResourcesRequired);

	SVGDefsElement.nodeName = SVGDefsElement.tagName = 'DEFS';
	SVGDefsElement.localName = 'defs';


	/* -- type: MSHTMLQuoteElementExtensions -- */

	MSHTMLQuoteElementExtensions.dateTime = '';


	/* -- type: HTMLQuoteElement -- */
	_$implement(HTMLQuoteElement, MSHTMLQuoteElementExtensions);

	HTMLQuoteElement.cite = '';
	HTMLQuoteElement.nodeName = HTMLQuoteElement.tagName = 'Q';
	HTMLQuoteElement.localName = 'q';


	/* -- type: SVGAnimatedLength -- */

	SVGAnimatedLength.animVal = SVGLength;
	SVGAnimatedLength.baseVal = SVGLength;


	/* -- type: DOML2DeprecatedMarginStyle_MSHTMLIFrameElementExtensions -- */

	DOML2DeprecatedMarginStyle_MSHTMLIFrameElementExtensions.vspace = 0;
	DOML2DeprecatedMarginStyle_MSHTMLIFrameElementExtensions.hspace = 0;


	/* -- type: SVGPathSegClosePath -- */



	/* -- type: SVGTransformList -- */

	SVGTransformList.numberOfItems = 0;
	SVGTransformList.getItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGTransformList.consolidate = function() { 
		/// <signature>
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGTransformList.appendItem = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGTransform' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGTransformList.clear = function() { };
	SVGTransformList.removeItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGTransformList.initialize = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGTransform' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGTransformList.insertItemBefore = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGTransform' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGTransformList.replaceItem = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGTransform' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};
	SVGTransformList.createSVGTransformFromMatrix = function(matrix) { 
		/// <signature>
		/// <param name='matrix' type='SVGMatrix' />
		/// <returns type='SVGTransform'/>
		/// </signature>
		return SVGTransform; 
	};


	/* -- type: HTMLHtmlElementDOML2Deprecated -- */

	HTMLHtmlElementDOML2Deprecated.version = '';


	/* -- type: HTMLHtmlElement -- */
	_$implement(HTMLHtmlElement, HTMLHtmlElementDOML2Deprecated);

	HTMLHtmlElement.nodeName = HTMLHtmlElement.tagName = 'HTML';
	HTMLHtmlElement.localName = 'html';


	/* -- type: SVGPathSegArcAbs -- */

	SVGPathSegArcAbs.y = 0;
	SVGPathSegArcAbs.sweepFlag = false;
	SVGPathSegArcAbs.r2 = 0;
	SVGPathSegArcAbs.angle = 0;
	SVGPathSegArcAbs.x = 0;
	SVGPathSegArcAbs.largeArcFlag = false;
	SVGPathSegArcAbs.r1 = 0;


	/* -- type: SVGPathSegLinetoHorizontalAbs -- */

	SVGPathSegLinetoHorizontalAbs.x = 0;


	/* -- type: CanvasRenderingContext2D -- */

	CanvasRenderingContext2D.shadowOffsetX = 0;
	CanvasRenderingContext2D.miterLimit = 0;
	CanvasRenderingContext2D.lineWidth = 0;
	CanvasRenderingContext2D.font = '';
	CanvasRenderingContext2D.strokeStyle = new Object();
	CanvasRenderingContext2D.canvas = HTMLCanvasElement;
	CanvasRenderingContext2D.shadowOffsetY = 0;
	CanvasRenderingContext2D.globalCompositeOperation = '';
	CanvasRenderingContext2D.globalAlpha = 0;
	CanvasRenderingContext2D.fillStyle = new Object();
	CanvasRenderingContext2D.textAlign = '';
	CanvasRenderingContext2D.shadowBlur = 0;
	CanvasRenderingContext2D.lineCap = '';
	CanvasRenderingContext2D.textBaseline = '';
	CanvasRenderingContext2D.shadowColor = '';
	CanvasRenderingContext2D.lineJoin = '';
	CanvasRenderingContext2D.restore = function() { };
	CanvasRenderingContext2D.setTransform = function(m11, m12, m21, m22, dx, dy) { 
		/// <signature>
		/// <param name='m11' type='Number' />
		/// <param name='m12' type='Number' />
		/// <param name='m21' type='Number' />
		/// <param name='m22' type='Number' />
		/// <param name='dx' type='Number' />
		/// <param name='dy' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.save = function() { };
	CanvasRenderingContext2D.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='radius' type='Number' />
		/// <param name='startAngle' type='Number' />
		/// <param name='endAngle' type='Number' />
		/// <param name='anticlockwise' type='Boolean' optional='true' />
		/// </signature>
	};
	CanvasRenderingContext2D.measureText = function(text) { 
		/// <signature>
		/// <param name='text' type='String' />
		/// <returns type='TextMetrics'/>
		/// </signature>
		return TextMetrics; 
	};
	CanvasRenderingContext2D.isPointInPath = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	CanvasRenderingContext2D.quadraticCurveTo = function(cpx, cpy, x, y) { 
		/// <signature>
		/// <param name='cpx' type='Number' />
		/// <param name='cpy' type='Number' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.putImageData = function(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) { 
		/// <signature>
		/// <param name='imagedata' type='ImageData' />
		/// <param name='dx' type='Number' />
		/// <param name='dy' type='Number' />
		/// <param name='dirtyX' type='Number' optional='true' />
		/// <param name='dirtyY' type='Number' optional='true' />
		/// <param name='dirtyWidth' type='Number' optional='true' />
		/// <param name='dirtyHeight' type='Number' optional='true' />
		/// </signature>
	};
	CanvasRenderingContext2D.rotate = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.fillText = function(text, x, y, maxWidth) { 
		/// <signature>
		/// <param name='text' type='String' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='maxWidth' type='Number' optional='true' />
		/// </signature>
	};
	CanvasRenderingContext2D.translate = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.scale = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.createRadialGradient = function(x0, y0, r0, x1, y1, r1) { 
		/// <signature>
		/// <param name='x0' type='Number' />
		/// <param name='y0' type='Number' />
		/// <param name='r0' type='Number' />
		/// <param name='x1' type='Number' />
		/// <param name='y1' type='Number' />
		/// <param name='r1' type='Number' />
		/// <returns type='CanvasGradient'/>
		/// </signature>
		return CanvasGradient; 
	};
	CanvasRenderingContext2D.lineTo = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.fill = function() { };
	CanvasRenderingContext2D.createPattern = function(image, repetition) { 
		/// <signature>
		/// <param name='image' type='HTMLCanvasElement' />
		/// <param name='repetition' type='String' />
		/// <returns type='CanvasPattern'/>
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLImageElement' />
		/// <param name='repetition' type='String' />
		/// <returns type='CanvasPattern'/>
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLVideoElement' />
		/// <param name='repetition' type='String' />
		/// <returns type='CanvasPattern'/>
		/// </signature>
		return CanvasPattern; 
	};
	CanvasRenderingContext2D.closePath = function() { };
	CanvasRenderingContext2D.rect = function(x, y, w, h) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='w' type='Number' />
		/// <param name='h' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.clip = function() { };
	CanvasRenderingContext2D.createImageData = function(imageDataOrSw, sh) { 
		/// <signature>
		/// <param name='imageData' type='ImageData' />
		/// <returns type='ImageData'/>
		/// </signature>
		/// <signature>
		/// <param name='sw' type='Number' />
		/// <param name='sh' type='Number' />
		/// <returns type='ImageData'/>
		/// </signature>
		return ImageData; 
	};
	CanvasRenderingContext2D.clearRect = function(x, y, w, h) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='w' type='Number' />
		/// <param name='h' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.moveTo = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.getImageData = function(sx, sy, sw, sh) { 
		/// <signature>
		/// <param name='sx' type='Number' />
		/// <param name='sy' type='Number' />
		/// <param name='sw' type='Number' />
		/// <param name='sh' type='Number' />
		/// <returns type='ImageData'/>
		/// </signature>
		return ImageData; 
	};
	CanvasRenderingContext2D.fillRect = function(x, y, w, h) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='w' type='Number' />
		/// <param name='h' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) { 
		/// <signature>
		/// <param name='cp1x' type='Number' />
		/// <param name='cp1y' type='Number' />
		/// <param name='cp2x' type='Number' />
		/// <param name='cp2y' type='Number' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.drawImage = function(image, offsetX, offsetY, width, height, canvasOffsetX, canvasOffsetY, canvasImageWidth, canvasImageHeight) { 
		/// <signature>
		/// <param name='image' type='HTMLImageElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLImageElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLImageElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <param name='canvasOffsetX' type='Number' />
		/// <param name='canvasOffsetY' type='Number' />
		/// <param name='canvasImageWidth' type='Number' />
		/// <param name='canvasImageHeight' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLCanvasElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLCanvasElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLCanvasElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <param name='canvasOffsetX' type='Number' />
		/// <param name='canvasOffsetY' type='Number' />
		/// <param name='canvasImageWidth' type='Number' />
		/// <param name='canvasImageHeight' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLVideoElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLVideoElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLVideoElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <param name='canvasOffsetX' type='Number' />
		/// <param name='canvasOffsetY' type='Number' />
		/// <param name='canvasImageWidth' type='Number' />
		/// <param name='canvasImageHeight' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.transform = function(m11, m12, m21, m22, dx, dy) { 
		/// <signature>
		/// <param name='m11' type='Number' />
		/// <param name='m12' type='Number' />
		/// <param name='m21' type='Number' />
		/// <param name='m22' type='Number' />
		/// <param name='dx' type='Number' />
		/// <param name='dy' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.stroke = function() { };
	CanvasRenderingContext2D.strokeRect = function(x, y, w, h) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='w' type='Number' />
		/// <param name='h' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.strokeText = function(text, x, y, maxWidth) { 
		/// <signature>
		/// <param name='text' type='String' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='maxWidth' type='Number' optional='true' />
		/// </signature>
	};
	CanvasRenderingContext2D.beginPath = function() { };
	CanvasRenderingContext2D.arcTo = function(x1, y1, x2, y2, radius) { 
		/// <signature>
		/// <param name='x1' type='Number' />
		/// <param name='y1' type='Number' />
		/// <param name='x2' type='Number' />
		/// <param name='y2' type='Number' />
		/// <param name='radius' type='Number' />
		/// </signature>
	};
	CanvasRenderingContext2D.createLinearGradient = function(x0, y0, x1, y1) { 
		/// <signature>
		/// <param name='x0' type='Number' />
		/// <param name='y0' type='Number' />
		/// <param name='x1' type='Number' />
		/// <param name='y1' type='Number' />
		/// <returns type='CanvasGradient'/>
		/// </signature>
		return CanvasGradient; 
	};


	/* -- type: MSCSSRuleList -- */

	MSCSSRuleList.length = 0;
	MSCSSRuleList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='CSSStyleRule'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(CSSStyleRule)); 
	};
	/* Add a single array element */
	MSCSSRuleList[0] = _$getTrackingNull(Object.create(CSSStyleRule));


	/* -- type: DOML2DeprecatedWordWrapSuppression_HTMLBodyElement -- */

	DOML2DeprecatedWordWrapSuppression_HTMLBodyElement.noWrap = false;


	/* -- type: MSHTMLBodyElementExtensions -- */
	_$implement(MSHTMLBodyElementExtensions, DOML2DeprecatedWordWrapSuppression_HTMLBodyElement);

	MSHTMLBodyElementExtensions.scroll = '';
	MSHTMLBodyElementExtensions.bottomMargin = new Object();
	MSHTMLBodyElementExtensions.topMargin = new Object();
	MSHTMLBodyElementExtensions.rightMargin = new Object();
	MSHTMLBodyElementExtensions.leftMargin = new Object();
	MSHTMLBodyElementExtensions.bgProperties = '';
	MSHTMLBodyElementExtensions.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};


	/* -- type: KeyboardEventExtensions -- */

	KeyboardEventExtensions.keyCode = 0;
	KeyboardEventExtensions.which = 0;
	KeyboardEventExtensions.charCode = 0;


	/* -- type: KeyboardEvent -- */
	_$implement(KeyboardEvent, KeyboardEventExtensions);

	KeyboardEvent.location = 0;
	KeyboardEvent.shiftKey = false;
	KeyboardEvent.locale = '';
	KeyboardEvent.key = '';
	KeyboardEvent.altKey = false;
	KeyboardEvent.metaKey = false;
	KeyboardEvent.char = '';
	KeyboardEvent.ctrlKey = false;
	KeyboardEvent.repeat = false;
	KeyboardEvent.DOM_KEY_LOCATION_RIGHT = 0x02;
	KeyboardEvent.DOM_KEY_LOCATION_LEFT = 0x01;
	KeyboardEvent.DOM_KEY_LOCATION_STANDARD = 0x00;
	KeyboardEvent.DOM_KEY_LOCATION_NUMPAD = 0x03;
	KeyboardEvent.DOM_KEY_LOCATION_JOYSTICK = 0x05;
	KeyboardEvent.DOM_KEY_LOCATION_MOBILE = 0x04;
	KeyboardEvent.getModifierState = function(keyArg) { 
		/// <signature>
		/// <param name='keyArg' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	KeyboardEvent.initKeyboardEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, keyArg, locationArg, modifiersListArg, repeat, locale) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='keyArg' type='String' />
		/// <param name='locationArg' type='Number' />
		/// <param name='modifiersListArg' type='String' />
		/// <param name='repeat' type='Boolean' />
		/// <param name='locale' type='String' />
		/// </signature>
	};


	/* -- type: HTMLSourceElement -- */

	HTMLSourceElement.media = '';
	HTMLSourceElement.src = '';
	HTMLSourceElement.type = '';
	HTMLSourceElement.nodeName = HTMLSourceElement.tagName = 'SOURCE';
	HTMLSourceElement.localName = 'source';


	/* -- type: MSLaunchUriCallback -- */

	MSLaunchUriCallback.callback = function() { };


	/* -- type: IDBRequest -- */
	_$implement(IDBRequest, EventTarget);

	IDBRequest.source = new Object();
	IDBRequest.error = DOMError;
	IDBRequest.transaction = IDBTransaction;
	IDBRequest.readyState = '';
	IDBRequest.result = new Object();
	_events(IDBRequest, "onsuccess", "onerror");


	/* -- type: IDBOpenDBRequest -- */

	_events(IDBOpenDBRequest, "onupgradeneeded", "onblocked");


	/* -- type: HTMLButtonElement -- */
	_$implement(HTMLButtonElement, MSDataBindingExtensions);
	_$implement(HTMLButtonElement, MSHTMLButtonElementExtensions);

	HTMLButtonElement.validationMessage = '';
	HTMLButtonElement.value = '';
	HTMLButtonElement.formTarget = '';
	HTMLButtonElement.name = '';
	HTMLButtonElement.form = HTMLFormElement;
	HTMLButtonElement.willValidate = false;
	HTMLButtonElement.formAction = '';
	HTMLButtonElement.autofocus = false;
	HTMLButtonElement.validity = ValidityState;
	HTMLButtonElement.formNoValidate = '';
	HTMLButtonElement.formEnctype = '';
	HTMLButtonElement.type = '';
	HTMLButtonElement.formMethod = '';
	HTMLButtonElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLButtonElement.setCustomValidity = function(error) { 
		/// <signature>
		/// <param name='error' type='String' />
		/// </signature>
	};
	HTMLButtonElement.nodeName = HTMLButtonElement.tagName = 'BUTTON';
	HTMLButtonElement.localName = 'button';


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


	/* -- type: SVGAngle -- */

	SVGAngle.valueAsString = '';
	SVGAngle.valueInSpecifiedUnits = 0;
	SVGAngle.value = 0;
	SVGAngle.unitType = 0;
	SVGAngle.SVG_ANGLETYPE_RAD = 3;
	SVGAngle.SVG_ANGLETYPE_UNSPECIFIED = 1;
	SVGAngle.SVG_ANGLETYPE_UNKNOWN = 0;
	SVGAngle.SVG_ANGLETYPE_GRAD = 4;
	SVGAngle.SVG_ANGLETYPE_DEG = 2;
	SVGAngle.newValueSpecifiedUnits = function(unitType, valueInSpecifiedUnits) { 
		/// <signature>
		/// <param name='unitType' type='Number' />
		/// <param name='valueInSpecifiedUnits' type='Number' />
		/// </signature>
	};
	SVGAngle.convertToSpecifiedUnits = function(unitType) { 
		/// <signature>
		/// <param name='unitType' type='Number' />
		/// </signature>
	};


	/* -- type: IDBDatabase -- */
	_$implement(IDBDatabase, EventTarget);

	IDBDatabase.version = '';
	IDBDatabase.name = '';
	IDBDatabase.objectStoreNames = DOMStringList;
	IDBDatabase.createObjectStore = function(name, optionalParameters) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <param name='optionalParameters' type='Object' optional='true' />
		/// <returns type='IDBObjectStore'/>
		/// </signature>
		return IDBObjectStore; 
	};
	IDBDatabase.close = function() { };
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


	/* -- type: HTMLAreaElement -- */
	_$implement(HTMLAreaElement, MSHTMLAreaElementExtensions);

	HTMLAreaElement.protocol = '';
	HTMLAreaElement.search = '';
	HTMLAreaElement.alt = '';
	HTMLAreaElement.coords = '';
	HTMLAreaElement.hostname = '';
	HTMLAreaElement.pathname = '';
	HTMLAreaElement.port = '';
	HTMLAreaElement.host = '';
	HTMLAreaElement.hash = '';
	HTMLAreaElement.target = '';
	HTMLAreaElement.noHref = false;
	HTMLAreaElement.href = '';
	HTMLAreaElement.shape = '';
	HTMLAreaElement.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLAreaElement.nodeName = HTMLAreaElement.tagName = 'AREA';
	HTMLAreaElement.localName = 'area';


	/* -- type: HTMLCollection -- */
	_$implement(HTMLCollection, MSHTMLCollectionExtensions);

	HTMLCollection.length = 0;
	HTMLCollection.item = function(nameOrIndex, optionalIndex) { 
		/// <signature>
		/// <param name='nameOrIndex' type='Object' optional='true' />
		/// <param name='optionalIndex' type='Object' optional='true' />
		/// <returns type='Element'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(HTMLElement)); 
	};
	HTMLCollection.namedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};
	/* Add a single array element */
	HTMLCollection[0] = _$getTrackingNull(Object.create(HTMLElement));


	/* -- type: MSCSSTouchManipulationProperties -- */

	MSCSSTouchManipulationProperties.msScrollSnapPointsY = '';
	MSCSSTouchManipulationProperties.msOverflowStyle = '';
	MSCSSTouchManipulationProperties.msScrollLimitXMax = new Object();
	MSCSSTouchManipulationProperties.msScrollSnapType = '';
	MSCSSTouchManipulationProperties.msScrollSnapPointsX = '';
	MSCSSTouchManipulationProperties.msScrollLimitYMax = new Object();
	MSCSSTouchManipulationProperties.msScrollSnapY = '';
	MSCSSTouchManipulationProperties.msScrollLimitXMin = new Object();
	MSCSSTouchManipulationProperties.msScrollLimitYMin = new Object();
	MSCSSTouchManipulationProperties.msScrollChaining = '';
	MSCSSTouchManipulationProperties.msTouchAction = '';
	MSCSSTouchManipulationProperties.msScrollSnapX = '';
	MSCSSTouchManipulationProperties.msScrollLimit = '';
	MSCSSTouchManipulationProperties.msScrollRails = '';
	MSCSSTouchManipulationProperties.msTouchSelect = '';


	/* -- type: MSCSSRegionProperties -- */

	MSCSSRegionProperties.msFlowFrom = '';
	MSCSSRegionProperties.msFlowInto = '';
	MSCSSRegionProperties.msWrapThrough = '';


	/* -- type: MSCSSStyleDeclarationExtensions -- */

	MSCSSStyleDeclarationExtensions.setAttribute = function(attributeName, AttributeValue, flags) { 
		/// <signature>
		/// <param name='attributeName' type='String' />
		/// <param name='AttributeValue' type='Object' />
		/// <param name='flags' type='Number' optional='true' />
		/// </signature>
		_setAttribute(this, attributeName, AttributeValue);
	};
	MSCSSStyleDeclarationExtensions.getAttribute = function(attributeName, flags) { 
		/// <signature>
		/// <param name='attributeName' type='String' />
		/// <param name='flags' type='Number' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return _getAttribute(this, attributeName);
	};
	MSCSSStyleDeclarationExtensions.removeAttribute = function(attributeName, flags) { 
		/// <signature>
		/// <param name='attributeName' type='String' />
		/// <param name='flags' type='Number' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: CSS2DTransformsProperties -- */

	CSS2DTransformsProperties.transform = '';
	CSS2DTransformsProperties.transformOrigin = '';


	/* -- type: SVG1_1Properties -- */

	SVG1_1Properties.strokeLinecap = '';
	SVG1_1Properties.floodColor = '';
	SVG1_1Properties.glyphOrientationHorizontal = '';
	SVG1_1Properties.textAnchor = '';
	SVG1_1Properties.fillOpacity = '';
	SVG1_1Properties.strokeDasharray = '';
	SVG1_1Properties.pointerEvents = '';
	SVG1_1Properties.markerEnd = '';
	SVG1_1Properties.lightingColor = '';
	SVG1_1Properties.strokeWidth = '';
	SVG1_1Properties.fillRule = '';
	SVG1_1Properties.floodOpacity = '';
	SVG1_1Properties.stopColor = '';
	SVG1_1Properties.enableBackground = '';
	SVG1_1Properties.dominantBaseline = '';
	SVG1_1Properties.alignmentBaseline = '';
	SVG1_1Properties.kerning = '';
	SVG1_1Properties.strokeMiterlimit = '';
	SVG1_1Properties.fill = '';
	SVG1_1Properties.marker = '';
	SVG1_1Properties.glyphOrientationVertical = '';
	SVG1_1Properties.markerMid = '';
	SVG1_1Properties.mask = '';
	SVG1_1Properties.stopOpacity = '';
	SVG1_1Properties.stroke = '';
	SVG1_1Properties.strokeDashoffset = '';
	SVG1_1Properties.filter = '';
	SVG1_1Properties.strokeOpacity = '';
	SVG1_1Properties.markerStart = '';
	SVG1_1Properties.colorInterpolationFilters = '';
	SVG1_1Properties.baselineShift = '';
	SVG1_1Properties.clipRule = '';
	SVG1_1Properties.strokeLinejoin = '';
	SVG1_1Properties.clipPath = '';


	/* -- type: CSSTransitionsProperties -- */

	CSSTransitionsProperties.transition = '';
	CSSTransitionsProperties.transitionDelay = '';
	CSSTransitionsProperties.transitionDuration = '';
	CSSTransitionsProperties.msTransitionTimingFunction = '';
	CSSTransitionsProperties.msTransition = '';
	CSSTransitionsProperties.msTransitionDuration = '';
	CSSTransitionsProperties.transitionTimingFunction = '';
	CSSTransitionsProperties.msTransitionDelay = '';
	CSSTransitionsProperties.transitionProperty = '';
	CSSTransitionsProperties.msTransitionProperty = '';


	/* -- type: MSCSSSelectionBoundaryProperties -- */

	MSCSSSelectionBoundaryProperties.msUserSelect = '';


	/* -- type: CSSFontsProperties -- */

	CSSFontsProperties.msFontFeatureSettings = '';
	CSSFontsProperties.fontFeatureSettings = '';


	/* -- type: CSSFlexibleBoxProperties -- */

	CSSFlexibleBoxProperties.msFlex = '';
	CSSFlexibleBoxProperties.msFlexDirection = '';
	CSSFlexibleBoxProperties.msFlexNegative = '';
	CSSFlexibleBoxProperties.msFlexPack = '';
	CSSFlexibleBoxProperties.msFlexWrap = '';
	CSSFlexibleBoxProperties.msFlexPositive = '';
	CSSFlexibleBoxProperties.msFlexAlign = '';
	CSSFlexibleBoxProperties.msFlexItemAlign = '';
	CSSFlexibleBoxProperties.msFlexOrder = '';
	CSSFlexibleBoxProperties.msFlexFlow = '';
	CSSFlexibleBoxProperties.msFlexPreferredSize = '';
	CSSFlexibleBoxProperties.msFlexLinePack = '';


	/* -- type: MSCSSHighContrastProperties -- */

	MSCSSHighContrastProperties.msHighContrastAdjust = '';


	/* -- type: CSS3DTransformsProperties -- */

	CSS3DTransformsProperties.perspective = '';
	CSS3DTransformsProperties.msBackfaceVisibility = '';
	CSS3DTransformsProperties.perspectiveOrigin = '';
	CSS3DTransformsProperties.transformStyle = '';
	CSS3DTransformsProperties.backfaceVisibility = '';
	CSS3DTransformsProperties.msPerspectiveOrigin = '';
	CSS3DTransformsProperties.msTransformStyle = '';
	CSS3DTransformsProperties.msPerspective = '';


	/* -- type: CSSMultiColumnProperties -- */

	CSSMultiColumnProperties.breakAfter = '';
	CSSMultiColumnProperties.columnSpan = '';
	CSSMultiColumnProperties.columnRule = '';
	CSSMultiColumnProperties.columnFill = '';
	CSSMultiColumnProperties.columnRuleStyle = '';
	CSSMultiColumnProperties.breakBefore = '';
	CSSMultiColumnProperties.columnCount = new Object();
	CSSMultiColumnProperties.breakInside = '';
	CSSMultiColumnProperties.columnWidth = new Object();
	CSSMultiColumnProperties.columns = '';
	CSSMultiColumnProperties.columnRuleColor = new Object();
	CSSMultiColumnProperties.columnGap = new Object();
	CSSMultiColumnProperties.columnRuleWidth = new Object();


	/* -- type: MSCSSPositionedFloatsProperties -- */

	MSCSSPositionedFloatsProperties.msWrapMargin = new Object();
	MSCSSPositionedFloatsProperties.msWrapFlow = '';


	/* -- type: MSCSSContentZoomProperties -- */

	MSCSSContentZoomProperties.msContentZoomLimit = '';
	MSCSSContentZoomProperties.msContentZooming = '';
	MSCSSContentZoomProperties.msContentZoomSnapType = '';
	MSCSSContentZoomProperties.msContentZoomLimitMax = new Object();
	MSCSSContentZoomProperties.msContentZoomSnapPoints = '';
	MSCSSContentZoomProperties.msContentZoomSnap = '';
	MSCSSContentZoomProperties.msContentZoomLimitMin = new Object();
	MSCSSContentZoomProperties.msContentZoomChaining = '';


	/* -- type: CSS3Properties -- */

	CSS3Properties.textAlignLast = '';
	CSS3Properties.textUnderlinePosition = '';
	CSS3Properties.borderTopLeftRadius = '';
	CSS3Properties.wordWrap = '';
	CSS3Properties.backgroundClip = '';
	CSS3Properties.msTransformOrigin = '';
	CSS3Properties.opacity = '';
	CSS3Properties.overflowY = '';
	CSS3Properties.boxShadow = '';
	CSS3Properties.backgroundSize = '';
	CSS3Properties.wordBreak = '';
	CSS3Properties.boxSizing = '';
	CSS3Properties.rubyOverhang = '';
	CSS3Properties.rubyAlign = '';
	CSS3Properties.textJustify = '';
	CSS3Properties.borderRadius = '';
	CSS3Properties.msTransform = '';
	CSS3Properties.borderTopRightRadius = '';
	CSS3Properties.overflowX = '';
	CSS3Properties.borderBottomLeftRadius = '';
	CSS3Properties.borderBottomRightRadius = '';
	CSS3Properties.rubyPosition = '';
	CSS3Properties.textOverflow = '';
	CSS3Properties.backgroundOrigin = '';


	/* -- type: CSS2Properties -- */

	CSS2Properties.visibility = '';
	CSS2Properties.backgroundAttachment = '';
	CSS2Properties.fontFamily = '';
	CSS2Properties.borderRightStyle = '';
	CSS2Properties.content = '';
	CSS2Properties.clear = '';
	CSS2Properties.orphans = '';
	CSS2Properties.counterIncrement = '';
	CSS2Properties.marginBottom = '';
	CSS2Properties.counterReset = '';
	CSS2Properties.borderStyle = '';
	CSS2Properties.outlineWidth = '';
	CSS2Properties.marginRight = '';
	CSS2Properties.paddingLeft = '';
	CSS2Properties.borderBottom = '';
	CSS2Properties.marginTop = '';
	CSS2Properties.borderTopColor = '';
	CSS2Properties.top = '';
	CSS2Properties.fontWeight = '';
	CSS2Properties.textIndent = '';
	CSS2Properties.borderRight = '';
	CSS2Properties.width = '';
	CSS2Properties.listStyleImage = '';
	CSS2Properties.cursor = '';
	CSS2Properties.listStylePosition = '';
	CSS2Properties.borderTopStyle = '';
	CSS2Properties.direction = '';
	CSS2Properties.maxWidth = '';
	CSS2Properties.color = '';
	CSS2Properties.clip = '';
	CSS2Properties.borderRightWidth = '';
	CSS2Properties.verticalAlign = '';
	CSS2Properties.pageBreakAfter = '';
	CSS2Properties.overflow = '';
	CSS2Properties.fontStretch = '';
	CSS2Properties.borderLeftStyle = '';
	CSS2Properties.borderBottomStyle = '';
	CSS2Properties.emptyCells = '';
	CSS2Properties.padding = '';
	CSS2Properties.paddingRight = '';
	CSS2Properties.background = '';
	CSS2Properties.height = '';
	CSS2Properties.bottom = '';
	CSS2Properties.paddingTop = '';
	CSS2Properties.right = '';
	CSS2Properties.borderLeft = '';
	CSS2Properties.borderLeftWidth = '';
	CSS2Properties.backgroundPosition = '';
	CSS2Properties.widows = '';
	CSS2Properties.backgroundColor = '';
	CSS2Properties.pageBreakInside = '';
	CSS2Properties.lineHeight = '';
	CSS2Properties.borderTopWidth = '';
	CSS2Properties.left = '';
	CSS2Properties.outlineStyle = '';
	CSS2Properties.borderTop = '';
	CSS2Properties.paddingBottom = '';
	CSS2Properties.outlineColor = '';
	CSS2Properties.wordSpacing = '';
	CSS2Properties.outline = '';
	CSS2Properties.font = '';
	CSS2Properties.marginLeft = '';
	CSS2Properties.display = '';
	CSS2Properties.maxHeight = '';
	CSS2Properties.cssFloat = '';
	CSS2Properties.letterSpacing = '';
	CSS2Properties.borderSpacing = '';
	CSS2Properties.backgroundRepeat = '';
	CSS2Properties.fontSizeAdjust = '';
	CSS2Properties.borderLeftColor = '';
	CSS2Properties.borderWidth = '';
	CSS2Properties.backgroundImage = '';
	CSS2Properties.whiteSpace = '';
	CSS2Properties.listStyleType = '';
	CSS2Properties.fontStyle = '';
	CSS2Properties.minWidth = '';
	CSS2Properties.borderBottomColor = '';
	CSS2Properties.zIndex = '';
	CSS2Properties.position = '';
	CSS2Properties.borderColor = '';
	CSS2Properties.listStyle = '';
	CSS2Properties.captionSide = '';
	CSS2Properties.borderCollapse = '';
	CSS2Properties.tableLayout = '';
	CSS2Properties.quotes = '';
	CSS2Properties.fontVariant = '';
	CSS2Properties.unicodeBidi = '';
	CSS2Properties.minHeight = '';
	CSS2Properties.borderBottomWidth = '';
	CSS2Properties.textDecoration = '';
	CSS2Properties.fontSize = '';
	CSS2Properties.pageBreakBefore = '';
	CSS2Properties.border = '';
	CSS2Properties.textAlign = '';
	CSS2Properties.textTransform = '';
	CSS2Properties.margin = '';
	CSS2Properties.borderRightColor = '';


	/* -- type: CSSStyleDeclaration -- */
	_$implement(CSSStyleDeclaration, CSS2DTransformsProperties);
	_$implement(CSSStyleDeclaration, CSSTransitionsProperties);
	_$implement(CSSStyleDeclaration, CSSFontsProperties);
	_$implement(CSSStyleDeclaration, MSCSSHighContrastProperties);
	_$implement(CSSStyleDeclaration, CSSAnimationsProperties);
	_$implement(CSSStyleDeclaration, CSSGridProperties);
	_$implement(CSSStyleDeclaration, MSCSSContentZoomProperties);
	_$implement(CSSStyleDeclaration, MSCSSTouchManipulationProperties);
	_$implement(CSSStyleDeclaration, MSCSSScrollTranslationProperties);
	_$implement(CSSStyleDeclaration, CSSFlexibleBoxProperties);
	_$implement(CSSStyleDeclaration, CSS3Properties);
	_$implement(CSSStyleDeclaration, MSCSSPositionedFloatsProperties);
	_$implement(CSSStyleDeclaration, MSCSSRegionProperties);
	_$implement(CSSStyleDeclaration, CSS2Properties);
	_$implement(CSSStyleDeclaration, MSCSSSelectionBoundaryProperties);
	_$implement(CSSStyleDeclaration, CSSMultiColumnProperties);
	_$implement(CSSStyleDeclaration, SVG1_1Properties);
	_$implement(CSSStyleDeclaration, CSS3DTransformsProperties);
	_$implement(CSSStyleDeclaration, CSSTextProperties);

	CSSStyleDeclaration.length = 0;
	CSSStyleDeclaration.cssText = '';
	CSSStyleDeclaration.parentRule = CSSRule;
	CSSStyleDeclaration.getPropertyPriority = function(propertyName) { 
		/// <signature>
		/// <param name='propertyName' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	CSSStyleDeclaration.removeProperty = function(propertyName) { 
		/// <signature>
		/// <param name='propertyName' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	CSSStyleDeclaration.getPropertyValue = function(propertyName) { 
		/// <signature>
		/// <param name='propertyName' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	CSSStyleDeclaration.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	CSSStyleDeclaration.setProperty = function(propertyName, value, priority) { 
		/// <signature>
		/// <param name='propertyName' type='String' />
		/// <param name='value' type='String' />
		/// <param name='priority' type='String' optional='true' />
		/// </signature>
	};


	/* -- type: MSCSSProperties -- */
	_$implement(MSCSSProperties, MSCSSStyleDeclarationExtensions);

	MSCSSProperties.scrollbarShadowColor = '';
	MSCSSProperties.scrollbarHighlightColor = '';
	MSCSSProperties.layoutGridChar = '';
	MSCSSProperties.layoutGridType = '';
	MSCSSProperties.textKashidaSpace = '';
	MSCSSProperties.textAutospace = '';
	MSCSSProperties.writingMode = '';
	MSCSSProperties.scrollbarFaceColor = '';
	MSCSSProperties.backgroundPositionY = '';
	MSCSSProperties.lineBreak = '';
	MSCSSProperties.msBlockProgression = '';
	MSCSSProperties.imeMode = '';
	MSCSSProperties.scrollbarBaseColor = '';
	MSCSSProperties.layoutGridLine = '';
	MSCSSProperties.layoutFlow = '';
	MSCSSProperties.layoutGrid = '';
	MSCSSProperties.textKashida = '';
	MSCSSProperties.zoom = '';
	MSCSSProperties.scrollbarArrowColor = '';
	MSCSSProperties.accelerator = '';
	MSCSSProperties.backgroundPositionX = '';
	MSCSSProperties.textJustifyTrim = '';
	MSCSSProperties.layoutGridMode = '';
	MSCSSProperties.scrollbar3dLightColor = '';
	MSCSSProperties.msInterpolationMode = '';
	MSCSSProperties.scrollbarTrackColor = '';
	MSCSSProperties.styleFloat = '';
	MSCSSProperties.scrollbarDarkShadowColor = '';


	/* -- type: MSSiteModeEvent -- */

	MSSiteModeEvent.buttonID = 0;
	MSSiteModeEvent.actionURL = '';


	/* -- type: SVGFEFuncGElement -- */

	SVGFEFuncGElement.nodeName = SVGFEFuncGElement.tagName = 'FEFUNCG';
	SVGFEFuncGElement.localName = 'fefuncg';


	/* -- type: TextTrackList -- */

	TextTrackList.length = 0;
	TextTrackList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='TextTrack'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(TextTrack)); 
	};
	/* Add a single array element */
	TextTrackList[0] = _$getTrackingNull(Object.create(TextTrack));


	/* -- type: CSSKeyframesRule -- */

	CSSKeyframesRule.name = '';
	CSSKeyframesRule.cssRules = CSSRuleList;
	CSSKeyframesRule.findRule = function(rule) { 
		/// <signature>
		/// <param name='rule' type='String' />
		/// <returns type='CSSKeyframeRule'/>
		/// </signature>
		return CSSKeyframeRule; 
	};
	CSSKeyframesRule.deleteRule = function(rule) { 
		/// <signature>
		/// <param name='rule' type='String' />
		/// </signature>
	};
	CSSKeyframesRule.appendRule = function(rule) { 
		/// <signature>
		/// <param name='rule' type='String' />
		/// </signature>
	};


	/* -- type: AudioTrack -- */

	AudioTrack.kind = '';
	AudioTrack.language = '';
	AudioTrack.id = '';
	AudioTrack.label = '';
	AudioTrack.enabled = false;


	/* -- type: SVGFEConvolveMatrixElement -- */
	_$implement(SVGFEConvolveMatrixElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEConvolveMatrixElement.orderY = SVGAnimatedInteger;
	SVGFEConvolveMatrixElement.kernelUnitLengthY = SVGAnimatedNumber;
	SVGFEConvolveMatrixElement.orderX = SVGAnimatedInteger;
	SVGFEConvolveMatrixElement.preserveAlpha = SVGAnimatedBoolean;
	SVGFEConvolveMatrixElement.kernelMatrix = SVGAnimatedNumberList;
	SVGFEConvolveMatrixElement.edgeMode = SVGAnimatedEnumeration;
	SVGFEConvolveMatrixElement.kernelUnitLengthX = SVGAnimatedNumber;
	SVGFEConvolveMatrixElement.bias = SVGAnimatedNumber;
	SVGFEConvolveMatrixElement.targetX = SVGAnimatedInteger;
	SVGFEConvolveMatrixElement.targetY = SVGAnimatedInteger;
	SVGFEConvolveMatrixElement.divisor = SVGAnimatedNumber;
	SVGFEConvolveMatrixElement.in1 = SVGAnimatedString;
	SVGFEConvolveMatrixElement.SVG_EDGEMODE_WRAP = 2;
	SVGFEConvolveMatrixElement.SVG_EDGEMODE_DUPLICATE = 1;
	SVGFEConvolveMatrixElement.SVG_EDGEMODE_UNKNOWN = 0;
	SVGFEConvolveMatrixElement.SVG_EDGEMODE_NONE = 3;
	SVGFEConvolveMatrixElement.nodeName = SVGFEConvolveMatrixElement.tagName = 'FECONVOLVEMATRIX';
	SVGFEConvolveMatrixElement.localName = 'feconvolvematrix';


	/* -- type: SVGAnimatedTransformList -- */

	SVGAnimatedTransformList.animVal = SVGTransformList;
	SVGAnimatedTransformList.baseVal = SVGTransformList;


	/* -- type: MSHTMLTableCaptionElementExtensions -- */

	MSHTMLTableCaptionElementExtensions.vAlign = '';


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLTableCaptionElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLTableCaptionElement.align = '';


	/* -- type: HTMLTableCaptionElement -- */
	_$implement(HTMLTableCaptionElement, MSHTMLTableCaptionElementExtensions);
	_$implement(HTMLTableCaptionElement, DOML2DeprecatedAlignmentStyle_HTMLTableCaptionElement);

	HTMLTableCaptionElement.nodeName = HTMLTableCaptionElement.tagName = 'CAPTION';
	HTMLTableCaptionElement.localName = 'caption';


	/* -- type: WindowSessionStorage -- */

	WindowSessionStorage.sessionStorage = Storage;


	/* -- type: WindowConsole -- */

	WindowConsole.console = Console;


	/* -- type: MSHTMLFrameElementExtensions -- */

	MSHTMLFrameElementExtensions.width = new Object();
	MSHTMLFrameElementExtensions.contentWindow = Window;
	MSHTMLFrameElementExtensions.height = new Object();
	MSHTMLFrameElementExtensions.frameSpacing = new Object();
	MSHTMLFrameElementExtensions.border = '';
	MSHTMLFrameElementExtensions.security = new Object();
	MSHTMLFrameElementExtensions.frameBorder = '';
	_events(MSHTMLFrameElementExtensions, "onload");


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLImageElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLImageElement.align = '';


	/* -- type: SVGTitleElement -- */
	_$implement(SVGTitleElement, SVGStylable);
	_$implement(SVGTitleElement, SVGLangSpace);

	SVGTitleElement.nodeName = SVGTitleElement.tagName = 'TITLE';
	SVGTitleElement.localName = 'title';


	/* -- type: MSHTMLTableElementExtensions -- */

	MSHTMLTableElementExtensions.cells = HTMLCollection;
	MSHTMLTableElementExtensions.height = new Object();
	MSHTMLTableElementExtensions.cols = 0;
	MSHTMLTableElementExtensions.moveRow = function(indexFrom, indexTo) { 
		/// <signature>
		/// <param name='indexFrom' type='Number' optional='true' />
		/// <param name='indexTo' type='Number' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};


	/* -- type: SVGFEDistantLightElement -- */

	SVGFEDistantLightElement.azimuth = SVGAnimatedNumber;
	SVGFEDistantLightElement.elevation = SVGAnimatedNumber;
	SVGFEDistantLightElement.nodeName = SVGFEDistantLightElement.tagName = 'FEDISTANTLIGHT';
	SVGFEDistantLightElement.localName = 'fedistantlight';


	/* -- type: DOML2DeprecatedBorderStyle_HTMLObjectElement -- */

	DOML2DeprecatedBorderStyle_HTMLObjectElement.border = '';


	/* -- type: MSHTMLAppletElementExtensions -- */
	_$implement(MSHTMLAppletElementExtensions, DOML2DeprecatedBorderStyle_HTMLObjectElement);

	MSHTMLAppletElementExtensions.codeType = '';
	MSHTMLAppletElementExtensions.standby = '';
	MSHTMLAppletElementExtensions.classid = '';
	MSHTMLAppletElementExtensions.form = HTMLFormElement;
	MSHTMLAppletElementExtensions.useMap = '';
	MSHTMLAppletElementExtensions.data = '';
	MSHTMLAppletElementExtensions.altHtml = '';
	MSHTMLAppletElementExtensions.contentDocument = document;
	MSHTMLAppletElementExtensions.declare = false;
	MSHTMLAppletElementExtensions.type = '';
	MSHTMLAppletElementExtensions.BaseHref = '';


	/* -- type: MSCSSStyleRuleExtensions -- */

	MSCSSStyleRuleExtensions.readOnly = false;


	/* -- type: CSSStyleRule -- */
	_$implement(CSSStyleRule, MSCSSStyleRuleExtensions);

	CSSStyleRule.selectorText = '';
	CSSStyleRule.style = MSStyleCSSProperties;


	/* -- type: NodeIterator -- */

	NodeIterator.whatToShow = 0;
	NodeIterator.filter = NodeFilterCallback;
	NodeIterator.root = Node;
	NodeIterator.expandEntityReferences = false;
	NodeIterator.nextNode = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	NodeIterator.detach = function() { };
	NodeIterator.previousNode = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};


	/* -- type: SVGScriptElement -- */
	_$implement(SVGScriptElement, SVGURIReference);
	_$implement(SVGScriptElement, SVGExternalResourcesRequired);

	SVGScriptElement.type = '';
	SVGScriptElement.nodeName = SVGScriptElement.tagName = 'SCRIPT';
	SVGScriptElement.localName = 'script';


	/* -- type: SVGAnimatedAngle -- */

	SVGAnimatedAngle.animVal = SVGAngle;
	SVGAnimatedAngle.baseVal = SVGAngle;


	/* -- type: Selection -- */

	Selection.isCollapsed = false;
	Selection.anchorNode = Node;
	Selection.focusNode = Node;
	Selection.focusOffset = 0;
	Selection.anchorOffset = 0;
	Selection.rangeCount = 0;
	Selection.addRange = function(range) { 
		/// <signature>
		/// <param name='range' type='Range' />
		/// </signature>
	};
	Selection.collapseToEnd = function() { };
	Selection.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Selection.selectAllChildren = function(parentNode) { 
		/// <signature>
		/// <param name='parentNode' type='Node' />
		/// </signature>
	};
	Selection.getRangeAt = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Range'/>
		/// </signature>
		return Range; 
	};
	Selection.collapse = function(parentNode, offset) { 
		/// <signature>
		/// <param name='parentNode' type='Node' />
		/// <param name='offset' type='Number' />
		/// </signature>
	};
	Selection.removeAllRanges = function() { };
	Selection.collapseToStart = function() { };
	Selection.deleteFromDocument = function() { };
	Selection.removeRange = function(range) { 
		/// <signature>
		/// <param name='range' type='Range' />
		/// </signature>
	};


	/* -- type: MSHTMLMetaElementExtensions -- */

	MSHTMLMetaElementExtensions.url = '';
	MSHTMLMetaElementExtensions.charset = '';


	/* -- type: HTMLMetaElement -- */
	_$implement(HTMLMetaElement, MSHTMLMetaElementExtensions);

	HTMLMetaElement.httpEquiv = '';
	HTMLMetaElement.content = '';
	HTMLMetaElement.name = '';
	HTMLMetaElement.scheme = '';
	HTMLMetaElement.nodeName = HTMLMetaElement.tagName = 'META';
	HTMLMetaElement.localName = 'meta';


	/* -- type: MSSelection -- */

	MSSelection.type = '';
	MSSelection.typeDetail = '';
	MSSelection.createRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};
	MSSelection.clear = function() { };
	MSSelection.empty = function() { };
	MSSelection.createRangeCollection = function() { 
		/// <signature>
		/// <returns type='TextRangeCollection'/>
		/// </signature>
		return TextRangeCollection; 
	};


	/* -- type: MSCSSStyleSheetExtensions -- */

	MSCSSStyleSheetExtensions.owningElement = HTMLElement;
	MSCSSStyleSheetExtensions.imports = StyleSheetList;
	MSCSSStyleSheetExtensions.rules = MSCSSRuleList;
	MSCSSStyleSheetExtensions.isAlternate = false;
	MSCSSStyleSheetExtensions.readOnly = false;
	MSCSSStyleSheetExtensions.isPrefAlternate = false;
	MSCSSStyleSheetExtensions.cssText = '';
	MSCSSStyleSheetExtensions.href = '';
	MSCSSStyleSheetExtensions.id = '';
	MSCSSStyleSheetExtensions.pages = StyleSheetPageList;
	MSCSSStyleSheetExtensions.addPageRule = function(bstrSelector, bstrStyle, lIndex) { 
		/// <signature>
		/// <param name='bstrSelector' type='String' />
		/// <param name='bstrStyle' type='String' />
		/// <param name='lIndex' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	MSCSSStyleSheetExtensions.addImport = function(bstrURL, lIndex) { 
		/// <signature>
		/// <param name='bstrURL' type='String' />
		/// <param name='lIndex' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	MSCSSStyleSheetExtensions.removeRule = function(lIndex) { 
		/// <signature>
		/// <param name='lIndex' type='Number' />
		/// </signature>
	};
	MSCSSStyleSheetExtensions.removeImport = function(lIndex) { 
		/// <signature>
		/// <param name='lIndex' type='Number' />
		/// </signature>
	};
	MSCSSStyleSheetExtensions.addRule = function(bstrSelector, bstrStyle, lIndex) { 
		/// <signature>
		/// <param name='bstrSelector' type='String' />
		/// <param name='bstrStyle' type='String' optional='true' />
		/// <param name='lIndex' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};


	/* -- type: StyleSheet -- */

	StyleSheet.disabled = false;
	StyleSheet.ownerNode = Node;
	StyleSheet.media = MediaList;
	StyleSheet.href = '';
	StyleSheet.parentStyleSheet = _$getTrackingNull(Object.create(StyleSheet));
	StyleSheet.title = '';
	StyleSheet.type = '';


	/* -- type: CSSStyleSheet -- */
	_$implement(CSSStyleSheet, MSCSSStyleSheetExtensions);

	CSSStyleSheet.ownerRule = CSSRule;
	CSSStyleSheet.cssRules = CSSRuleList;
	CSSStyleSheet.insertRule = function(rule, index) { 
		/// <signature>
		/// <param name='rule' type='String' />
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	CSSStyleSheet.deleteRule = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};


	/* -- type: HTMLSelectElement -- */
	_$implement(HTMLSelectElement, MSDataBindingExtensions);
	_$implement(HTMLSelectElement, MSHTMLCollectionExtensions);
	_$implement(HTMLSelectElement, MSHTMLSelectElementExtensions);

	HTMLSelectElement.validationMessage = '';
	Object.defineProperty(HTMLSelectElement,"options", { get: function () { return _selectOptions(this); } });
	HTMLSelectElement.value = '';
	HTMLSelectElement.name = '';
	HTMLSelectElement.form = HTMLFormElement;
	HTMLSelectElement.willValidate = false;
	HTMLSelectElement.size = 0;
	HTMLSelectElement.autofocus = false;
	HTMLSelectElement.length = 0;
	HTMLSelectElement.selectedIndex = 0;
	HTMLSelectElement.validity = ValidityState;
	HTMLSelectElement.required = false;
	HTMLSelectElement.multiple = false;
	HTMLSelectElement.type = '';
	HTMLSelectElement.remove = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};
	HTMLSelectElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLSelectElement.add = function(element, before) { 
		/// <signature>
		/// <param name='element' type='HTMLElement' />
		/// <param name='before' type='HTMLElement' optional='true' />
		/// </signature>
		/// <signature>
		/// <param name='element' type='HTMLElement' />
		/// <param name='before' type='Number' optional='true' />
		/// </signature>
	};
	HTMLSelectElement.item = function(name, index) { 
		/// <signature>
		/// <param name='name' type='Object' optional='true' />
		/// <param name='index' type='Object' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	HTMLSelectElement.setCustomValidity = function(error) { 
		/// <signature>
		/// <param name='error' type='String' />
		/// </signature>
	};
	HTMLSelectElement.namedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	HTMLSelectElement.nodeName = HTMLSelectElement.tagName = 'SELECT';
	HTMLSelectElement.localName = 'select';


	/* -- type: MSBaseReader -- */
	_$implement(MSBaseReader, EventTarget);

	MSBaseReader.readyState = 0;
	MSBaseReader.result = new Object();
	MSBaseReader.LOADING = 1;
	MSBaseReader.EMPTY = 0;
	MSBaseReader.DONE = 2;
	MSBaseReader.abort = function() { };
	_events(MSBaseReader, "onprogress", "onabort", "onloadend", "onerror", "onload", "onloadstart");


	/* -- type: Text -- */
	_$implement(Text, MSNodeExtensions);

	Text.wholeText = '';
	Text.splitText = function(offset) { 
		/// <signature>
		/// <param name='offset' type='Number' />
		/// <returns type='Text'/>
		/// </signature>
		return Text; 
	};
	Text.replaceWholeText = function(content) { 
		/// <signature>
		/// <param name='content' type='String' />
		/// <returns type='Text'/>
		/// </signature>
		return Text; 
	};
	Text.nodeType = Node.TEXT_NODE;
	Text.nodeName = '#text';


	/* -- type: CDATASection -- */

	CDATASection.nodeType = Node.CDATA_SECTION_NODE;
	CDATASection.nodeName = '#cdata-section';


	/* -- type: SVGPathSegLinetoVerticalRel -- */

	SVGPathSegLinetoVerticalRel.y = 0;


	/* -- type: SVGAnimatedString -- */

	SVGAnimatedString.animVal = '';
	SVGAnimatedString.baseVal = '';


	/* -- type: TextMetrics -- */

	TextMetrics.width = 0;


	/* -- type: DOML2DeprecatedMarginStyle_HTMLObjectElement -- */

	DOML2DeprecatedMarginStyle_HTMLObjectElement.vspace = 0;
	DOML2DeprecatedMarginStyle_HTMLObjectElement.hspace = 0;


	/* -- type: DOML2DeprecatedWidthStyle_HTMLAppletElement -- */

	DOML2DeprecatedWidthStyle_HTMLAppletElement.width = 0;


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLObjectElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLObjectElement.align = '';


	/* -- type: HTMLAppletElement -- */
	_$implement(HTMLAppletElement, MSHTMLAppletElementExtensions);
	_$implement(HTMLAppletElement, DOML2DeprecatedMarginStyle_HTMLObjectElement);
	_$implement(HTMLAppletElement, DOML2DeprecatedWidthStyle_HTMLAppletElement);
	_$implement(HTMLAppletElement, MSDataBindingRecordSetExtensions);
	_$implement(HTMLAppletElement, MSDataBindingExtensions);
	_$implement(HTMLAppletElement, DOML2DeprecatedAlignmentStyle_HTMLObjectElement);

	HTMLAppletElement.object = '';
	HTMLAppletElement.alt = '';
	HTMLAppletElement.codeBase = '';
	HTMLAppletElement.archive = '';
	HTMLAppletElement.name = '';
	HTMLAppletElement.height = '';
	HTMLAppletElement.code = '';
	HTMLAppletElement.nodeName = HTMLAppletElement.tagName = 'APPLET';
	HTMLAppletElement.localName = 'applet';


	/* -- type: IDBCursorWithValue -- */

	IDBCursorWithValue.value = new Object();


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLTableElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLTableElement.align = '';


	/* -- type: SVGClipPathElement -- */
	_$implement(SVGClipPathElement, SVGStylable);
	_$implement(SVGClipPathElement, SVGUnitTypes);
	_$implement(SVGClipPathElement, SVGTransformable);
	_$implement(SVGClipPathElement, SVGLangSpace);
	_$implement(SVGClipPathElement, SVGTests);
	_$implement(SVGClipPathElement, SVGExternalResourcesRequired);

	SVGClipPathElement.clipPathUnits = SVGAnimatedEnumeration;
	SVGClipPathElement.nodeName = SVGClipPathElement.tagName = 'CLIPPATH';
	SVGClipPathElement.localName = 'clippath';


	/* -- type: MSHTMLObjectElementExtensions -- */

	MSHTMLObjectElementExtensions.object = new Object();
	MSHTMLObjectElementExtensions.alt = '';
	MSHTMLObjectElementExtensions.classid = '';
	MSHTMLObjectElementExtensions.BaseHref = '';
	MSHTMLObjectElementExtensions.altHtml = '';


	/* -- type: SVGDescElement -- */
	_$implement(SVGDescElement, SVGStylable);
	_$implement(SVGDescElement, SVGLangSpace);

	SVGDescElement.nodeName = SVGDescElement.tagName = 'DESC';
	SVGDescElement.localName = 'desc';


	/* -- type: SVGFESpecularLightingElement -- */
	_$implement(SVGFESpecularLightingElement, SVGFilterPrimitiveStandardAttributes);

	SVGFESpecularLightingElement.kernelUnitLengthY = SVGAnimatedNumber;
	SVGFESpecularLightingElement.surfaceScale = SVGAnimatedNumber;
	SVGFESpecularLightingElement.specularExponent = SVGAnimatedNumber;
	SVGFESpecularLightingElement.in1 = SVGAnimatedString;
	SVGFESpecularLightingElement.kernelUnitLengthX = SVGAnimatedNumber;
	SVGFESpecularLightingElement.specularConstant = SVGAnimatedNumber;
	SVGFESpecularLightingElement.nodeName = SVGFESpecularLightingElement.tagName = 'FESPECULARLIGHTING';
	SVGFESpecularLightingElement.localName = 'fespecularlighting';


	/* -- type: SVGPathSegMovetoRel -- */

	SVGPathSegMovetoRel.y = 0;
	SVGPathSegMovetoRel.x = 0;


	/* -- type: HTMLNextIdElement -- */

	HTMLNextIdElement.n = '';
	HTMLNextIdElement.nodeName = HTMLNextIdElement.tagName = 'NEXTID';
	HTMLNextIdElement.localName = 'nextid';


	/* -- type: IDBVersionChangeEvent -- */

	IDBVersionChangeEvent.newVersion = 0;
	IDBVersionChangeEvent.oldVersion = 0;


	/* -- type: MSHTMLEmbedElementExtensions -- */

	MSHTMLEmbedElementExtensions.palette = '';
	MSHTMLEmbedElementExtensions.pluginspage = '';
	MSHTMLEmbedElementExtensions.hidden = '';
	MSHTMLEmbedElementExtensions.units = '';


	/* -- type: MSHTMLDocumentExtensions -- */

	MSHTMLDocumentExtensions.compatible = MSCompatibleInfoCollection;
	MSHTMLDocumentExtensions.msCapsLockWarningOff = false;
	MSHTMLDocumentExtensions.media = '';
	MSHTMLDocumentExtensions.uniqueID = '';
	MSHTMLDocumentExtensions.documentMode = 0;
	MSHTMLDocumentExtensions.security = '';
	MSHTMLDocumentExtensions.frames = Window;
	MSHTMLDocumentExtensions.parentWindow = Window;
	MSHTMLDocumentExtensions.URLUnencoded = '';
	MSHTMLDocumentExtensions.updateSettings = function() { };
	MSHTMLDocumentExtensions.execCommandShowHelp = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSHTMLDocumentExtensions.releaseCapture = function() { };
	MSHTMLDocumentExtensions.focus = function() { };
	_events(MSHTMLDocumentExtensions, "onmspointerdown", "onrowexit", "onrowsinserted", "oncontrolselect", "onmsgesturedoubletap", "onpropertychange", "onmspointermove", "onmsgesturehold", "onmsgesturechange", "onafterupdate", "onmsgesturestart", "onhelp", "onmspointercancel", "onbeforeactivate", "onmsgestureend", "onstoragecommit", "onselectionchange", "onfocusout", "ondataavailable", "onbeforeupdate", "onfocusin", "onmspointerup", "ondatasetcomplete", "onbeforedeactivate", "onstop", "onactivate", "onmssitemodejumplistitemremoved", "onmsmanipulationstatechanged", "onmspointerhover", "onmscontentzoom", "onselectstart", "onerrorupdate", "ondeactivate", "ondatasetchanged", "onmsgesturetap", "onmspointerout", "onrowsdelete", "onmsthumbnailclick", "onmsinertiastart", "onmspointerover", "onrowenter", "onbeforeeditfocus", "oncellchange");


	/* -- type: DocumentRange -- */

	DocumentRange.createRange = function() { 
		/// <signature>
		/// <returns type='Range'/>
		/// </signature>
		return Range; 
	};


	/* -- type: DOML2DeprecatedWidthStyle_HTMLBlockElement -- */

	DOML2DeprecatedWidthStyle_HTMLBlockElement.width = 0;


	/* -- type: IDBObjectStore -- */

	IDBObjectStore.indexNames = DOMStringList;
	IDBObjectStore.name = '';
	IDBObjectStore.transaction = IDBTransaction;
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
	IDBObjectStore.clear = function() { 
		/// <signature>
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, undefined);
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
	IDBObjectStore.put = function(value, key) { 
		/// <signature>
		/// <param name='value' type='Object' />
		/// <param name='key' type='Object' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, key);
	};
	IDBObjectStore.openCursor = function(range, direction) { 
		/// <signature>
		/// <param name='range' type='Object' optional='true' />
		/// <param name='direction' type='String' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		var cursor = Object.create(IDBCursorWithValue); cursor.source = this; return _createIDBRequest(IDBRequest, this, cursor);
	};
	IDBObjectStore.deleteIndex = function(indexName) { 
		/// <signature>
		/// <param name='indexName' type='String' />
		/// </signature>
	};
	IDBObjectStore.index = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='IDBIndex'/>
		/// </signature>
		return IDBIndex; 
	};
	IDBObjectStore.get = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, new Object());
	};
	IDBObjectStore.delete = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, undefined);
	};


	/* -- type: MSHTMLTableDataCellElementExtensions -- */



	/* -- type: HTMLTableDataCellElement -- */
	_$implement(HTMLTableDataCellElement, MSHTMLTableDataCellElementExtensions);

	HTMLTableDataCellElement.nodeName = HTMLTableDataCellElement.tagName = 'TD';
	HTMLTableDataCellElement.localName = 'td';


	/* -- type: TransitionEvent -- */

	TransitionEvent.propertyName = '';
	TransitionEvent.elapsedTime = 0;
	TransitionEvent.initTransitionEvent = function(typeArg, canBubbleArg, cancelableArg, propertyNameArg, elapsedTimeArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='propertyNameArg' type='String' />
		/// <param name='elapsedTimeArg' type='Number' />
		/// </signature>
	};


	/* -- type: SVGPathSegCurvetoCubicSmoothAbs -- */

	SVGPathSegCurvetoCubicSmoothAbs.y = 0;
	SVGPathSegCurvetoCubicSmoothAbs.x2 = 0;
	SVGPathSegCurvetoCubicSmoothAbs.x = 0;
	SVGPathSegCurvetoCubicSmoothAbs.y2 = 0;


	/* -- type: SVGFEMergeElement -- */
	_$implement(SVGFEMergeElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEMergeElement.nodeName = SVGFEMergeElement.tagName = 'FEMERGE';
	SVGFEMergeElement.localName = 'femerge';


	/* -- type: MSStyleCSSProperties -- */

	MSStyleCSSProperties.posHeight = 0;
	MSStyleCSSProperties.pixelWidth = 0;
	MSStyleCSSProperties.textDecorationNone = false;
	MSStyleCSSProperties.pixelBottom = 0;
	MSStyleCSSProperties.pixelLeft = 0;
	MSStyleCSSProperties.textDecorationOverline = false;
	MSStyleCSSProperties.posWidth = 0;
	MSStyleCSSProperties.textDecorationLineThrough = false;
	MSStyleCSSProperties.pixelHeight = 0;
	MSStyleCSSProperties.textDecorationBlink = false;
	MSStyleCSSProperties.textDecorationUnderline = false;
	MSStyleCSSProperties.pixelRight = 0;
	MSStyleCSSProperties.posLeft = 0;
	MSStyleCSSProperties.pixelTop = 0;
	MSStyleCSSProperties.posTop = 0;
	MSStyleCSSProperties.posBottom = 0;
	MSStyleCSSProperties.posRight = 0;


	/* -- type: SVGMarkerElement -- */
	_$implement(SVGMarkerElement, SVGStylable);
	_$implement(SVGMarkerElement, SVGLangSpace);
	_$implement(SVGMarkerElement, SVGFitToViewBox);
	_$implement(SVGMarkerElement, SVGExternalResourcesRequired);

	SVGMarkerElement.orientType = SVGAnimatedEnumeration;
	SVGMarkerElement.markerUnits = SVGAnimatedEnumeration;
	SVGMarkerElement.orientAngle = SVGAnimatedAngle;
	SVGMarkerElement.markerHeight = SVGAnimatedLength;
	SVGMarkerElement.markerWidth = SVGAnimatedLength;
	SVGMarkerElement.refY = SVGAnimatedLength;
	SVGMarkerElement.refX = SVGAnimatedLength;
	SVGMarkerElement.SVG_MARKER_ORIENT_ANGLE = 2;
	SVGMarkerElement.SVG_MARKER_ORIENT_UNKNOWN = 0;
	SVGMarkerElement.SVG_MARKERUNITS_STROKEWIDTH = 2;
	SVGMarkerElement.SVG_MARKERUNITS_UNKNOWN = 0;
	SVGMarkerElement.SVG_MARKER_ORIENT_AUTO = 1;
	SVGMarkerElement.SVG_MARKERUNITS_USERSPACEONUSE = 1;
	SVGMarkerElement.setOrientToAngle = function(angle) { 
		/// <signature>
		/// <param name='angle' type='SVGAngle' />
		/// </signature>
	};
	SVGMarkerElement.setOrientToAuto = function() { };
	SVGMarkerElement.nodeName = SVGMarkerElement.tagName = 'MARKER';
	SVGMarkerElement.localName = 'marker';


	/* -- type: WindowTimers -- */
	_$implement(WindowTimers, WindowTimersExtension);

	WindowTimers.clearTimeout = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
		_$clearTimeout(handle);
	};
	WindowTimers.setTimeout = function(handler, timeout, args) { 
		/// <signature>
		/// <param name='handler' type='Object' />
		/// <param name='timeout' type='Object' optional='true' />
		/// <param name='args' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return _$setTimeout(handler, timeout, args);
	};
	WindowTimers.clearInterval = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
		_$clearTimeout(handle);
	};
	WindowTimers.setInterval = function(handler, timeout, args) { 
		/// <signature>
		/// <param name='handler' type='Object' />
		/// <param name='timeout' type='Object' optional='true' />
		/// <param name='args' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return _$setTimeout(handler, timeout, args);
	};


	/* -- type: CompositionEvent -- */

	CompositionEvent.locale = '';
	CompositionEvent.data = '';
	CompositionEvent.initCompositionEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, dataArg, locale) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='dataArg' type='String' />
		/// <param name='locale' type='String' />
		/// </signature>
	};


	/* -- type: MSDataBindingTableExtensions -- */

	MSDataBindingTableExtensions.dataPageSize = 0;
	MSDataBindingTableExtensions.nextPage = function() { };
	MSDataBindingTableExtensions.refresh = function() { };
	MSDataBindingTableExtensions.firstPage = function() { };
	MSDataBindingTableExtensions.previousPage = function() { };
	MSDataBindingTableExtensions.lastPage = function() { };


	/* -- type: Performance -- */

	Performance.navigation = PerformanceNavigation;
	Performance.timing = PerformanceTiming;
	Performance.getEntriesByType = function(entryType) { 
		/// <signature>
		/// <param name='entryType' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Performance.toJSON = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Performance.clearMarks = function(markName) { 
		/// <signature>
		/// <param name='markName' type='String' optional='true' />
		/// </signature>
	};
	Performance.getMeasures = function(measureName) { 
		/// <signature>
		/// <param name='measureName' type='String' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Performance.getMarks = function(markName) { 
		/// <signature>
		/// <param name='markName' type='String' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Performance.clearResourceTimings = function() { };
	Performance.mark = function(markName) { 
		/// <signature>
		/// <param name='markName' type='String' />
		/// </signature>
	};
	Performance.now = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	Performance.measure = function(measureName, startMarkName, endMarkName) { 
		/// <signature>
		/// <param name='measureName' type='String' />
		/// <param name='startMarkName' type='String' optional='true' />
		/// <param name='endMarkName' type='String' optional='true' />
		/// </signature>
	};
	Performance.clearMeasures = function(measureName) { 
		/// <signature>
		/// <param name='measureName' type='String' optional='true' />
		/// </signature>
	};
	Performance.getEntries = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Performance.getEntriesByName = function(name, entryType) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <param name='entryType' type='String' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Performance.setResourceTimingBufferSize = function(maxSize) { 
		/// <signature>
		/// <param name='maxSize' type='Number' />
		/// </signature>
	};


	/* -- type: SVGPathSegCurvetoQuadraticRel -- */

	SVGPathSegCurvetoQuadraticRel.y1 = 0;
	SVGPathSegCurvetoQuadraticRel.y = 0;
	SVGPathSegCurvetoQuadraticRel.x = 0;
	SVGPathSegCurvetoQuadraticRel.x1 = 0;


	/* -- type: GetSVGDocument -- */

	GetSVGDocument.getSVGDocument = function() { 
		/// <signature>
		/// <returns type='SVGDocument'/>
		/// </signature>
		return SVGDocument; 
	};


	/* -- type: MSGesture -- */

	MSGesture.target = HTMLElement;
	MSGesture.addPointer = function(pointerId) { 
		/// <signature>
		/// <param name='pointerId' type='Number' />
		/// </signature>
	};
	MSGesture.stop = function() { };


	/* -- type: SVGFEFloodElement -- */
	_$implement(SVGFEFloodElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEFloodElement.nodeName = SVGFEFloodElement.tagName = 'FEFLOOD';
	SVGFEFloodElement.localName = 'feflood';


	/* -- type: SVGFEMergeNodeElement -- */

	SVGFEMergeNodeElement.in1 = SVGAnimatedString;
	SVGFEMergeNodeElement.nodeName = SVGFEMergeNodeElement.tagName = 'FEMERGENODE';
	SVGFEMergeNodeElement.localName = 'femergenode';


	/* -- type: TrackEvent -- */

	TrackEvent.track = new Object();


	/* -- type: SVGFEComponentTransferElement -- */
	_$implement(SVGFEComponentTransferElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEComponentTransferElement.in1 = SVGAnimatedString;
	SVGFEComponentTransferElement.nodeName = SVGFEComponentTransferElement.tagName = 'FECOMPONENTTRANSFER';
	SVGFEComponentTransferElement.localName = 'fecomponenttransfer';


	/* -- type: SVGFEDiffuseLightingElement -- */
	_$implement(SVGFEDiffuseLightingElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEDiffuseLightingElement.kernelUnitLengthY = SVGAnimatedNumber;
	SVGFEDiffuseLightingElement.surfaceScale = SVGAnimatedNumber;
	SVGFEDiffuseLightingElement.in1 = SVGAnimatedString;
	SVGFEDiffuseLightingElement.kernelUnitLengthX = SVGAnimatedNumber;
	SVGFEDiffuseLightingElement.diffuseConstant = SVGAnimatedNumber;
	SVGFEDiffuseLightingElement.nodeName = SVGFEDiffuseLightingElement.tagName = 'FEDIFFUSELIGHTING';
	SVGFEDiffuseLightingElement.localName = 'fediffuselighting';


	/* -- type: MSHTMLVideoElementExtensions -- */

	MSHTMLVideoElementExtensions.msIsStereo3D = false;
	MSHTMLVideoElementExtensions.msStereo3DPackingMode = '';
	MSHTMLVideoElementExtensions.msStereo3DRenderMode = '';
	MSHTMLVideoElementExtensions.msIsLayoutOptimalForPlayback = false;
	MSHTMLVideoElementExtensions.msHorizontalMirror = false;
	MSHTMLVideoElementExtensions.msZoom = false;
	MSHTMLVideoElementExtensions.msInsertVideoEffect = function(activatableClassId, effectRequired, config) { 
		/// <signature>
		/// <param name='activatableClassId' type='String' />
		/// <param name='effectRequired' type='Boolean' />
		/// <param name='config' type='Object' optional='true' />
		/// </signature>
	};
	MSHTMLVideoElementExtensions.msSetVideoRectangle = function(left, top, right, bottom) { 
		/// <signature>
		/// <param name='left' type='Number' />
		/// <param name='top' type='Number' />
		/// <param name='right' type='Number' />
		/// <param name='bottom' type='Number' />
		/// </signature>
	};
	MSHTMLVideoElementExtensions.msFrameStep = function(forward) { 
		/// <signature>
		/// <param name='forward' type='Boolean' />
		/// </signature>
	};
	_events(MSHTMLVideoElementExtensions, "onMSVideoOptimalLayoutChanged", "onMSVideoFrameStepCompleted", "onMSVideoFormatChanged");


	/* -- type: HTMLVideoElement -- */
	_$implement(HTMLVideoElement, MSHTMLVideoElementExtensions);

	HTMLVideoElement.videoWidth = 0;
	HTMLVideoElement.width = 0;
	HTMLVideoElement.videoHeight = 0;
	HTMLVideoElement.height = 0;
	HTMLVideoElement.poster = '';
	HTMLVideoElement.nodeName = HTMLVideoElement.tagName = 'VIDEO';
	HTMLVideoElement.localName = 'video';


	/* -- type: LinkStyle -- */

	LinkStyle.sheet = StyleSheet;


	/* -- type: MSHTMLTableColElementExtensions -- */



	/* -- type: SVGSymbolElement -- */
	_$implement(SVGSymbolElement, SVGStylable);
	_$implement(SVGSymbolElement, SVGLangSpace);
	_$implement(SVGSymbolElement, SVGFitToViewBox);
	_$implement(SVGSymbolElement, SVGExternalResourcesRequired);

	SVGSymbolElement.nodeName = SVGSymbolElement.tagName = 'SYMBOL';
	SVGSymbolElement.localName = 'symbol';


	/* -- type: SVGElementInstanceList -- */

	SVGElementInstanceList.length = 0;
	SVGElementInstanceList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGElementInstance'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(SVGElementInstance)); 
	};
	/* Add a single array element */
	SVGElementInstanceList[0] = _$getTrackingNull(Object.create(SVGElementInstance));


	/* -- type: SVGFECompositeElement -- */
	_$implement(SVGFECompositeElement, SVGFilterPrimitiveStandardAttributes);

	SVGFECompositeElement.operator = SVGAnimatedEnumeration;
	SVGFECompositeElement.in2 = SVGAnimatedString;
	SVGFECompositeElement.k2 = SVGAnimatedNumber;
	SVGFECompositeElement.k1 = SVGAnimatedNumber;
	SVGFECompositeElement.k3 = SVGAnimatedNumber;
	SVGFECompositeElement.in1 = SVGAnimatedString;
	SVGFECompositeElement.k4 = SVGAnimatedNumber;
	SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_OUT = 3;
	SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_OVER = 1;
	SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_XOR = 5;
	SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_ARITHMETIC = 6;
	SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_UNKNOWN = 0;
	SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_IN = 2;
	SVGFECompositeElement.SVG_FECOMPOSITE_OPERATOR_ATOP = 4;
	SVGFECompositeElement.nodeName = SVGFECompositeElement.tagName = 'FECOMPOSITE';
	SVGFECompositeElement.localName = 'fecomposite';


	/* -- type: HTMLBodyElementDOML2Deprecated -- */

	HTMLBodyElementDOML2Deprecated.link = new Object();
	HTMLBodyElementDOML2Deprecated.aLink = new Object();
	HTMLBodyElementDOML2Deprecated.text = new Object();
	HTMLBodyElementDOML2Deprecated.vLink = new Object();


	/* -- type: MSBorderColorStyle_HTMLTableRowElement -- */

	MSBorderColorStyle_HTMLTableRowElement.borderColor = new Object();


	/* -- type: DOML2DeprecatedBorderStyle_MSHTMLIFrameElementExtensions -- */

	DOML2DeprecatedBorderStyle_MSHTMLIFrameElementExtensions.border = '';


	/* -- type: MSHTMLIFrameElementExtensions -- */
	_$implement(MSHTMLIFrameElementExtensions, DOML2DeprecatedBorderStyle_MSHTMLIFrameElementExtensions);
	_$implement(MSHTMLIFrameElementExtensions, DOML2DeprecatedMarginStyle_MSHTMLIFrameElementExtensions);

	MSHTMLIFrameElementExtensions.security = new Object();
	MSHTMLIFrameElementExtensions.noResize = false;
	MSHTMLIFrameElementExtensions.frameSpacing = new Object();
	_events(MSHTMLIFrameElementExtensions, "onload");


	/* -- type: FormData -- */

	FormData.append = function(name, value, blobName) { 
		/// <signature>
		/// <param name='name' type='Object' />
		/// <param name='value' type='Object' />
		/// <param name='blobName' type='String' optional='true' />
		/// </signature>
	};
	FormData.nodeName = FormData.tagName = 'FORMDATA';
	FormData.localName = 'formdata';


	/* -- type: MSManipulationEvent -- */

	MSManipulationEvent.lastState = 0;
	MSManipulationEvent.currentState = 0;
	MSManipulationEvent.MS_MANIPULATION_STATE_STOPPED = 0;
	MSManipulationEvent.MS_MANIPULATION_STATE_ACTIVE = 1;
	MSManipulationEvent.MS_MANIPULATION_STATE_INERTIA = 2;
	MSManipulationEvent.initMSManipulationEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, lastState, currentState) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='lastState' type='Number' />
		/// <param name='currentState' type='Number' />
		/// </signature>
	};


	/* -- type: SVGAnimatedBoolean -- */

	SVGAnimatedBoolean.animVal = false;
	SVGAnimatedBoolean.baseVal = false;


	/* -- type: DOMException -- */

	DOMException.name = '';
	DOMException.message = '';
	DOMException.code = 0;
	DOMException.NO_MODIFICATION_ALLOWED_ERR = 7;
	DOMException.HIERARCHY_REQUEST_ERR = 3;
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
	DOMException.DOMSTRING_SIZE_ERR = 2;
	DOMException.SYNTAX_ERR = 12;
	DOMException.SERIALIZE_ERR = 82;
	DOMException.NOT_FOUND_ERR = 8;
	DOMException.VALIDATION_ERR = 16;
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


	/* -- type: StorageEvent -- */

	StorageEvent.newValue = new Object();
	StorageEvent.oldValue = new Object();
	StorageEvent.url = '';
	StorageEvent.storageArea = Storage;
	StorageEvent.key = '';
	StorageEvent.initStorageEvent = function(typeArg, canBubbleArg, cancelableArg, keyArg, oldValueArg, newValueArg, urlArg, storageAreaArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='keyArg' type='String' />
		/// <param name='oldValueArg' type='Object' />
		/// <param name='newValueArg' type='Object' />
		/// <param name='urlArg' type='String' />
		/// <param name='storageAreaArg' type='Storage' />
		/// </signature>
	};


	/* -- type: HTMLEmbedElement -- */
	_$implement(HTMLEmbedElement, GetSVGDocument);
	_$implement(HTMLEmbedElement, MSHTMLEmbedElementExtensions);

	HTMLEmbedElement.width = '';
	HTMLEmbedElement.src = '';
	HTMLEmbedElement.name = '';
	HTMLEmbedElement.height = '';
	HTMLEmbedElement.nodeName = HTMLEmbedElement.tagName = 'EMBED';
	HTMLEmbedElement.localName = 'embed';


	/* -- type: HTMLObjectElement -- */
	_$implement(HTMLObjectElement, GetSVGDocument);
	_$implement(HTMLObjectElement, MSHTMLObjectElementExtensions);
	_$implement(HTMLObjectElement, DOML2DeprecatedMarginStyle_HTMLObjectElement);
	_$implement(HTMLObjectElement, MSDataBindingRecordSetExtensions);
	_$implement(HTMLObjectElement, MSDataBindingExtensions);
	_$implement(HTMLObjectElement, DOML2DeprecatedBorderStyle_HTMLObjectElement);
	_$implement(HTMLObjectElement, DOML2DeprecatedAlignmentStyle_HTMLObjectElement);

	HTMLObjectElement.validationMessage = '';
	HTMLObjectElement.codeType = '';
	HTMLObjectElement.width = '';
	HTMLObjectElement.form = HTMLFormElement;
	HTMLObjectElement.willValidate = false;
	HTMLObjectElement.code = '';
	HTMLObjectElement.archive = '';
	HTMLObjectElement.standby = '';
	HTMLObjectElement.name = '';
	HTMLObjectElement.useMap = '';
	HTMLObjectElement.data = '';
	HTMLObjectElement.height = '';
	HTMLObjectElement.contentDocument = document;
	HTMLObjectElement.codeBase = '';
	HTMLObjectElement.declare = false;
	HTMLObjectElement.validity = ValidityState;
	HTMLObjectElement.type = '';
	HTMLObjectElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLObjectElement.setCustomValidity = function(error) { 
		/// <signature>
		/// <param name='error' type='String' />
		/// </signature>
	};
	HTMLObjectElement.nodeName = HTMLObjectElement.tagName = 'OBJECT';
	HTMLObjectElement.localName = 'object';


	/* -- type: HTMLBGSoundElement -- */

	HTMLBGSoundElement.volume = new Object();
	HTMLBGSoundElement.balance = new Object();
	HTMLBGSoundElement.src = '';
	HTMLBGSoundElement.loop = 0;
	HTMLBGSoundElement.nodeName = HTMLBGSoundElement.tagName = 'BGSOUND';
	HTMLBGSoundElement.localName = 'bgsound';


	/* -- type: SVGNumberList -- */

	SVGNumberList.numberOfItems = 0;
	SVGNumberList.replaceItem = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGNumber' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGNumber'/>
		/// </signature>
		return SVGNumber; 
	};
	SVGNumberList.getItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGNumber'/>
		/// </signature>
		return SVGNumber; 
	};
	SVGNumberList.appendItem = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGNumber' />
		/// <returns type='SVGNumber'/>
		/// </signature>
		return SVGNumber; 
	};
	SVGNumberList.clear = function() { };
	SVGNumberList.removeItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGNumber'/>
		/// </signature>
		return SVGNumber; 
	};
	SVGNumberList.initialize = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGNumber' />
		/// <returns type='SVGNumber'/>
		/// </signature>
		return SVGNumber; 
	};
	SVGNumberList.insertItemBefore = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGNumber' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGNumber'/>
		/// </signature>
		return SVGNumber; 
	};


	/* -- type: MSStream -- */

	MSStream.type = '';
	MSStream.msDetachStream = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	MSStream.msClose = function() { };


	/* -- type: AbstractView -- */

	AbstractView.styleMedia = StyleMedia;
	AbstractView.document = DocumentView;


	/* -- type: ScreenView -- */

	ScreenView.outerWidth = 0;
	ScreenView.pageXOffset = 0;
	ScreenView.innerWidth = 0;
	ScreenView.pageYOffset = 0;
	ScreenView.screenY = 0;
	ScreenView.outerHeight = 0;
	ScreenView.screen = Screen;
	ScreenView.innerHeight = 0;
	ScreenView.screenX = 0;
	ScreenView.scrollBy = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	ScreenView.scroll = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	ScreenView.scrollTo = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};


	/* -- type: MSHTMLOListElementExtensions -- */



	/* -- type: CSSKeyframeRule -- */

	CSSKeyframeRule.keyText = '';
	CSSKeyframeRule.style = CSSStyleDeclaration;


	/* -- type: StyleSheetPage -- */

	StyleSheetPage.pseudoClass = '';
	StyleSheetPage.selector = '';


	/* -- type: PerformanceMeasure -- */



	/* -- type: XMLSerializer -- */

	XMLSerializer.serializeToString = function(target) { 
		/// <signature>
		/// <param name='target' type='Node' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: NodeList -- */

	NodeList.length = 0;
	NodeList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Node'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(Node)); 
	};
	/* Add a single array element */
	NodeList[0] = _$getTrackingNull(Object.create(Node));


	/* -- type: SVGTextPathElement -- */
	_$implement(SVGTextPathElement, SVGURIReference);

	SVGTextPathElement.startOffset = SVGAnimatedLength;
	SVGTextPathElement.method = SVGAnimatedEnumeration;
	SVGTextPathElement.spacing = SVGAnimatedEnumeration;
	SVGTextPathElement.TEXTPATH_SPACINGTYPE_EXACT = 2;
	SVGTextPathElement.TEXTPATH_SPACINGTYPE_AUTO = 1;
	SVGTextPathElement.TEXTPATH_METHODTYPE_STRETCH = 2;
	SVGTextPathElement.TEXTPATH_SPACINGTYPE_UNKNOWN = 0;
	SVGTextPathElement.TEXTPATH_METHODTYPE_ALIGN = 1;
	SVGTextPathElement.TEXTPATH_METHODTYPE_UNKNOWN = 0;
	SVGTextPathElement.nodeName = SVGTextPathElement.tagName = 'TEXTPATH';
	SVGTextPathElement.localName = 'textpath';


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


	/* -- type: MessagePort -- */
	_$implement(MessagePort, EventTarget);

	MessagePort.close = function() { };
	MessagePort.postMessage = function(message, ports) { 
		/// <signature>
		/// <param name='message' type='Object' />
		/// <param name='ports' type='Object' optional='true' />
		/// </signature>
	};
	MessagePort.start = function() { };
	_events(MessagePort, "onmessage");


	/* -- type: DOML2DeprecatedBorderStyle_HTMLTableElement -- */

	DOML2DeprecatedBorderStyle_HTMLTableElement.border = '';


	/* -- type: MSMimeTypesCollection -- */

	MSMimeTypesCollection.length = 0;


	/* -- type: MSUnsafeFunctionCallback -- */

	MSUnsafeFunctionCallback.callback = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};


	/* -- type: NodeFilterCallback -- */



	/* -- type: HTMLHeadElement -- */

	HTMLHeadElement.profile = '';
	HTMLHeadElement.nodeName = HTMLHeadElement.tagName = 'HEAD';
	HTMLHeadElement.localName = 'head';


	/* -- type: HTMLProgressElement -- */

	HTMLProgressElement.value = 0;
	HTMLProgressElement.max = 0;
	HTMLProgressElement.position = 0;
	HTMLProgressElement.form = HTMLFormElement;
	HTMLProgressElement.nodeName = HTMLProgressElement.tagName = 'PROGRESS';
	HTMLProgressElement.localName = 'progress';


	/* -- type: MSHTMLDivElementExtensions -- */
	_$implement(MSHTMLDivElementExtensions, DOML2DeprecatedWordWrapSuppression_HTMLDivElement);



	/* -- type: HTMLBRElement -- */
	_$implement(HTMLBRElement, DOML2DeprecatedTextFlowControl_HTMLBRElement);

	HTMLBRElement.nodeName = HTMLBRElement.tagName = 'BR';
	HTMLBRElement.localName = 'br';


	/* -- type: DocumentVisibility -- */

	DocumentVisibility.msHidden = false;
	DocumentVisibility.msVisibilityState = '';
	DocumentVisibility.visibilityState = '';
	DocumentVisibility.hidden = false;


	/* -- type: CSSPageRule -- */
	_$implement(CSSPageRule, StyleSheetPage);

	CSSPageRule.selectorText = '';
	CSSPageRule.style = CSSStyleDeclaration;


	/* -- type: WindowPerformance -- */

	WindowPerformance.performance = new Object();


	/* -- type: PerformanceMark -- */



	/* -- type: SVGFEColorMatrixElement -- */
	_$implement(SVGFEColorMatrixElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEColorMatrixElement.in1 = SVGAnimatedString;
	SVGFEColorMatrixElement.type = SVGAnimatedEnumeration;
	SVGFEColorMatrixElement.values = SVGAnimatedNumberList;
	SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE = 2;
	SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_UNKNOWN = 0;
	SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_MATRIX = 1;
	SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_HUEROTATE = 3;
	SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA = 4;
	SVGFEColorMatrixElement.nodeName = SVGFEColorMatrixElement.tagName = 'FECOLORMATRIX';
	SVGFEColorMatrixElement.localName = 'fecolormatrix';


	/* -- type: BookmarkCollection -- */

	BookmarkCollection.length = 0;
	BookmarkCollection.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return this[index] || _$getTrackingNull(new Object()); 
	};
	/* Add a single array element */
	BookmarkCollection[0] = _$getTrackingNull(new Object());


	/* -- type: Position -- */

	Position.timestamp = 0;
	Position.coords = Coordinates;


	/* -- type: DocumentFragment -- */
	_$implement(DocumentFragment, NodeSelector);
	_$implement(DocumentFragment, MSEventAttachmentTarget);
	_$implement(DocumentFragment, MSNodeExtensions);

	DocumentFragment.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
	DocumentFragment.nodeName = '#document-fragment';


	/* -- type: MSBehaviorUrnsCollection -- */

	MSBehaviorUrnsCollection.length = 0;
	MSBehaviorUrnsCollection.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return this[index] || _$getTrackingNull(''); 
	};
	/* Add a single array element */
	MSBehaviorUrnsCollection[0] = _$getTrackingNull('');


	/* -- type: SVGPathSegCurvetoCubicSmoothRel -- */

	SVGPathSegCurvetoCubicSmoothRel.y = 0;
	SVGPathSegCurvetoCubicSmoothRel.x2 = 0;
	SVGPathSegCurvetoCubicSmoothRel.x = 0;
	SVGPathSegCurvetoCubicSmoothRel.y2 = 0;


	/* -- type: MediaList -- */

	MediaList.length = 0;
	MediaList.mediaText = '';
	MediaList.deleteMedium = function(oldMedium) { 
		/// <signature>
		/// <param name='oldMedium' type='String' />
		/// </signature>
	};
	MediaList.appendMedium = function(newMedium) { 
		/// <signature>
		/// <param name='newMedium' type='String' />
		/// </signature>
	};
	MediaList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return this[index] || _$getTrackingNull(''); 
	};
	MediaList.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	/* Add a single array element */
	MediaList[0] = _$getTrackingNull('');


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLDivElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLDivElement.align = '';


	/* -- type: HTMLDivElement -- */
	_$implement(HTMLDivElement, DOML2DeprecatedAlignmentStyle_HTMLDivElement);
	_$implement(HTMLDivElement, MSHTMLDivElementExtensions);
	_$implement(HTMLDivElement, MSDataBindingExtensions);

	HTMLDivElement.nodeName = HTMLDivElement.tagName = 'DIV';
	HTMLDivElement.localName = 'div';


	/* -- type: NavigatorDoNotTrack -- */

	NavigatorDoNotTrack.msDoNotTrack = '';


	/* -- type: MSHTMLUListElementExtensions -- */



	/* -- type: HTMLUListElement -- */
	_$implement(HTMLUListElement, DOML2DeprecatedListNumberingAndBulletStyle);
	_$implement(HTMLUListElement, DOML2DeprecatedListSpaceReduction);
	_$implement(HTMLUListElement, MSHTMLUListElementExtensions);

	HTMLUListElement.nodeName = HTMLUListElement.tagName = 'UL';
	HTMLUListElement.localName = 'ul';


	/* -- type: SVGFEFuncBElement -- */

	SVGFEFuncBElement.nodeName = SVGFEFuncBElement.tagName = 'FEFUNCB';
	SVGFEFuncBElement.localName = 'fefuncb';


	/* -- type: SVGAnimatedEnumeration -- */

	SVGAnimatedEnumeration.animVal = 0;
	SVGAnimatedEnumeration.baseVal = 0;


	/* -- type: MSHTMLDocumentViewExtensions -- */

	MSHTMLDocumentViewExtensions.msCSSOMElementFloatMetrics = false;
	MSHTMLDocumentViewExtensions.msElementsFromPoint = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='NodeList'/>
		/// </signature>
		return _wrapInList([Object.create(HTMLElement)], NodeList);
	};
	MSHTMLDocumentViewExtensions.msElementsFromRect = function(left, top, width, height) { 
		/// <signature>
		/// <param name='left' type='Number' />
		/// <param name='top' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <returns type='NodeList'/>
		/// </signature>
		return _wrapInList([Object.create(HTMLElement)], NodeList);
	};
	MSHTMLDocumentViewExtensions.createStyleSheet = function(href, index) { 
		/// <signature>
		/// <param name='href' type='String' optional='true' />
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='CSSStyleSheet'/>
		/// </signature>
		return CSSStyleSheet; 
	};


	/* -- type: HTMLDocument -- */
	_$implement(HTMLDocument, MSEventAttachmentTarget);
	_$implement(HTMLDocument, MSHTMLDocumentSelection);
	_$implement(HTMLDocument, MSHTMLDocumentViewExtensions);
	_$implement(HTMLDocument, MSHTMLDocumentEventExtensions);
	_$implement(HTMLDocument, MSResourceMetadata);
	_$implement(HTMLDocument, MSNodeExtensions);
	_$implement(HTMLDocument, MSHTMLDocumentExtensions);

	HTMLDocument.bgColor = '';
	HTMLDocument.scripts = _createHTMLCollection('script');
	HTMLDocument.linkColor = '';
	HTMLDocument.charset = '';
	HTMLDocument.vlinkColor = '';
	HTMLDocument.title = '';
	HTMLDocument.defaultCharset = '';
	HTMLDocument.embeds = _createHTMLCollection('embed');
	HTMLDocument.all = HTMLCollection;
	HTMLDocument.applets = _createHTMLCollection('applet');
	HTMLDocument.forms = _createHTMLCollection('form');
	HTMLDocument.dir = '';
	HTMLDocument.body = HTMLElement;
	HTMLDocument.domain = '';
	HTMLDocument.designMode = '';
	HTMLDocument.ownerDocument = document;
	HTMLDocument.parentNode = _$getTrackingNull(HTMLDocument);
	HTMLDocument.activeElement = HTMLElement;
	HTMLDocument.links = _createHTMLCollection('a');
	HTMLDocument.URL = '';
	HTMLDocument.images = _createHTMLCollection('img');
	HTMLDocument.head = HTMLHeadElement;
	HTMLDocument.location = Location;
	HTMLDocument.cookie = '';
	HTMLDocument.characterSet = '';
	HTMLDocument.anchors = _createHTMLCollection('a');
	HTMLDocument.lastModified = '';
	HTMLDocument.plugins = HTMLCollection;
	HTMLDocument.readyState = '';
	HTMLDocument.referrer = '';
	HTMLDocument.alinkColor = '';
	HTMLDocument.fgColor = '';
	HTMLDocument.compatMode = '';
	HTMLDocument.queryCommandValue = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLDocument.queryCommandIndeterm = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLDocument.execCommand = function(commandId, showUI, value) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <param name='showUI' type='Boolean' optional='true' />
		/// <param name='value' type='Object' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLDocument.writeln = function(content) { 
		/// <signature>
		/// <param name='content' type='String' />
		/// </signature>
		_setInnerHTML(this, content);
	};
	HTMLDocument.getElementsByName = function(elementName) { 
		/// <signature>
		/// <param name='elementName' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	HTMLDocument.open = function(url, name, features, replace) { 
		/// <signature>
		/// <param name='url' type='String' optional='true' />
		/// <param name='name' type='String' optional='true' />
		/// <param name='features' type='String' optional='true' />
		/// <param name='replace' type='Boolean' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	HTMLDocument.queryCommandState = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLDocument.close = function() { };
	HTMLDocument.getElementsByClassName = function(classNames) { 
		/// <signature>
		/// <param name='classNames' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	HTMLDocument.hasFocus = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLDocument.queryCommandSupported = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLDocument.getSelection = function() { 
		/// <signature>
		/// <returns type='Selection'/>
		/// </signature>
		return Selection; 
	};
	HTMLDocument.queryCommandEnabled = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLDocument.queryCommandText = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLDocument.write = function(content) { 
		/// <signature>
		/// <param name='content' type='String' />
		/// </signature>
		_setInnerHTML(this, content);
	};
	_events(HTMLDocument, "ondragend", "ondragover", "onkeydown", "onkeyup", "onreset", "onmouseup", "ondragstart", "ondrag", "ondragleave", "onmouseover", "onpause", "onseeked", "onmousedown", "onclick", "onwaiting", "ondurationchange", "onblur", "onemptied", "onseeking", "oncanplay", "onstalled", "onmousemove", "onratechange", "onloadstart", "ondragenter", "onsubmit", "onprogress", "ondblclick", "oncontextmenu", "onchange", "onloadedmetadata", "onerror", "onplay", "onplaying", "oncanplaythrough", "onabort", "onreadystatechange", "onkeypress", "onloadeddata", "onsuspend", "onfocus", "ontimeupdate", "onselect", "ondrop", "onmouseout", "onended", "onscroll", "onmousewheel", "onvolumechange", "onload", "oninput");


	/* -- type: SVGException -- */

	SVGException.name = '';
	SVGException.message = '';
	SVGException.code = 0;
	SVGException.SVG_MATRIX_NOT_INVERTABLE = 2;
	SVGException.SVG_WRONG_TYPE_ERR = 0;
	SVGException.SVG_INVALID_VALUE_ERR = 1;
	SVGException.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLTableColElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLTableColElement.align = '';


	/* -- type: HTMLTableColElement -- */
	_$implement(HTMLTableColElement, MSHTMLTableColElementExtensions);
	_$implement(HTMLTableColElement, HTMLTableAlignment);
	_$implement(HTMLTableColElement, DOML2DeprecatedAlignmentStyle_HTMLTableColElement);

	HTMLTableColElement.width = new Object();
	HTMLTableColElement.span = 0;
	HTMLTableColElement.nodeName = HTMLTableColElement.tagName = 'COL';
	HTMLTableColElement.localName = 'col';


	/* -- type: MSRangeCollection -- */

	MSRangeCollection.length = 0;
	MSRangeCollection.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Range'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(Range)); 
	};
	/* Add a single array element */
	MSRangeCollection[0] = _$getTrackingNull(Object.create(Range));


	/* -- type: ImageData -- */

	ImageData.width = 0;
	ImageData.data = CanvasPixelArray;
	ImageData.height = 0;


	/* -- type: SVGUseElement -- */
	_$implement(SVGUseElement, SVGStylable);
	_$implement(SVGUseElement, SVGTransformable);
	_$implement(SVGUseElement, SVGLangSpace);
	_$implement(SVGUseElement, SVGTests);
	_$implement(SVGUseElement, SVGURIReference);
	_$implement(SVGUseElement, SVGExternalResourcesRequired);

	SVGUseElement.width = SVGAnimatedLength;
	SVGUseElement.y = SVGAnimatedLength;
	SVGUseElement.animatedInstanceRoot = SVGElementInstance;
	SVGUseElement.instanceRoot = SVGElementInstance;
	SVGUseElement.x = SVGAnimatedLength;
	SVGUseElement.height = SVGAnimatedLength;
	SVGUseElement.nodeName = SVGUseElement.tagName = 'USE';
	SVGUseElement.localName = 'use';


	/* -- type: MSHTMLModElementExtensions -- */



	/* -- type: HTMLModElement -- */
	_$implement(HTMLModElement, MSHTMLModElementExtensions);

	HTMLModElement.dateTime = '';
	HTMLModElement.cite = '';
	HTMLModElement.nodeName = HTMLModElement.tagName = 'INS';
	HTMLModElement.localName = 'ins';


	/* -- type: TimeRanges -- */

	TimeRanges.length = 0;
	TimeRanges.end = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	TimeRanges.start = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};


	/* -- type: SVGPathSegCurvetoQuadraticAbs -- */

	SVGPathSegCurvetoQuadraticAbs.y1 = 0;
	SVGPathSegCurvetoQuadraticAbs.y = 0;
	SVGPathSegCurvetoQuadraticAbs.x = 0;
	SVGPathSegCurvetoQuadraticAbs.x1 = 0;


	/* -- type: History -- */

	History.length = 0;
	History.state = new Object();
	History.replaceState = function(statedata, title, url) { 
		/// <signature>
		/// <param name='statedata' type='Object' />
		/// <param name='title' type='String' />
		/// <param name='url' type='String' optional='true' />
		/// </signature>
	};
	History.forward = function(distance) { 
		/// <signature>
		/// <param name='distance' type='Object' optional='true' />
		/// </signature>
	};
	History.back = function(distance) { 
		/// <signature>
		/// <param name='distance' type='Object' optional='true' />
		/// </signature>
	};
	History.pushState = function(statedata, title, url) { 
		/// <signature>
		/// <param name='statedata' type='Object' />
		/// <param name='title' type='String' />
		/// <param name='url' type='String' optional='true' />
		/// </signature>
	};
	History.go = function(delta) { 
		/// <signature>
		/// <param name='delta' type='Object' optional='true' />
		/// </signature>
	};


	/* -- type: SVGRect -- */

	SVGRect.width = 0;
	SVGRect.y = 0;
	SVGRect.x = 0;
	SVGRect.height = 0;


	/* -- type: MSWindowModeless -- */



	/* -- type: DOML2DeprecatedMarginStyle -- */

	DOML2DeprecatedMarginStyle.vspace = 0;
	DOML2DeprecatedMarginStyle.hspace = 0;


	/* -- type: MSHTMLTextAreaElementExtensions -- */

	MSHTMLTextAreaElementExtensions.status = new Object();
	MSHTMLTextAreaElementExtensions.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};


	/* -- type: HTMLTextAreaElement -- */
	_$implement(HTMLTextAreaElement, MSDataBindingExtensions);
	_$implement(HTMLTextAreaElement, MSHTMLTextAreaElementExtensions);

	HTMLTextAreaElement.validationMessage = '';
	HTMLTextAreaElement.form = HTMLFormElement;
	HTMLTextAreaElement.selectionStart = 0;
	HTMLTextAreaElement.willValidate = false;
	HTMLTextAreaElement.rows = 0;
	HTMLTextAreaElement.readOnly = false;
	HTMLTextAreaElement.cols = 0;
	HTMLTextAreaElement.autofocus = false;
	HTMLTextAreaElement.required = false;
	HTMLTextAreaElement.selectionEnd = 0;
	HTMLTextAreaElement.wrap = '';
	HTMLTextAreaElement.placeholder = '';
	HTMLTextAreaElement.value = '';
	HTMLTextAreaElement.name = '';
	HTMLTextAreaElement.validity = ValidityState;
	HTMLTextAreaElement.maxLength = 0;
	HTMLTextAreaElement.type = '';
	HTMLTextAreaElement.defaultValue = '';
	HTMLTextAreaElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLTextAreaElement.setCustomValidity = function(error) { 
		/// <signature>
		/// <param name='error' type='String' />
		/// </signature>
	};
	HTMLTextAreaElement.setSelectionRange = function(start, end) { 
		/// <signature>
		/// <param name='start' type='Number' />
		/// <param name='end' type='Number' />
		/// </signature>
	};
	HTMLTextAreaElement.select = function() { };
	HTMLTextAreaElement.nodeName = HTMLTextAreaElement.tagName = 'TEXTAREA';
	HTMLTextAreaElement.localName = 'textarea';


	/* -- type: CustomEvent -- */

	CustomEvent.detail = new Object();
	CustomEvent.initCustomEvent = function(typeArg, canBubbleArg, cancelableArg, detailArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='detailArg' type='Object' />
		/// </signature>
	};


	/* -- type: StyleSheetList -- */

	StyleSheetList.length = 0;
	StyleSheetList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='StyleSheet'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(StyleSheet)); 
	};
	/* Add a single array element */
	StyleSheetList[0] = _$getTrackingNull(Object.create(StyleSheet));


	/* -- type: SVGElementInstance -- */
	_$implement(SVGElementInstance, EventTarget);

	SVGElementInstance.previousSibling = _$getTrackingNull(Object.create(SVGElementInstance));
	SVGElementInstance.parentNode = _$getTrackingNull(Object.create(SVGElementInstance));
	Object.defineProperty(SVGElementInstance,"lastChild", { get: function () { return _lastChild(this, SVGElementInstance); } });
	SVGElementInstance.nextSibling = _$getTrackingNull(Object.create(SVGElementInstance));
	Object.defineProperty(SVGElementInstance,"childNodes", { get: function () { return _childNodes(this, SVGElementInstanceList); } });
	SVGElementInstance.correspondingUseElement = SVGUseElement;
	SVGElementInstance.correspondingElement = SVGElement;
	Object.defineProperty(SVGElementInstance,"firstChild", { get: function () { return _firstChild(this, SVGElementInstance); } });


	/* -- type: BrowserPublic -- */



	/* -- type: PositionError -- */

	PositionError.message = '';
	PositionError.code = 0;
	PositionError.POSITION_UNAVAILABLE = 2;
	PositionError.TIMEOUT = 3;
	PositionError.PERMISSION_DENIED = 1;
	PositionError.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: MSImageResourceExtensions -- */

	MSImageResourceExtensions.dynsrc = '';
	MSImageResourceExtensions.vrml = '';
	MSImageResourceExtensions.loop = 0;
	MSImageResourceExtensions.start = '';
	MSImageResourceExtensions.lowsrc = '';


	/* -- type: MSDataBindingRecordSetReadonlyExtensions -- */

	MSDataBindingRecordSetReadonlyExtensions.recordset = new Object();
	MSDataBindingRecordSetReadonlyExtensions.namedRecordset = function(dataMember, hierarchy) { 
		/// <signature>
		/// <param name='dataMember' type='String' />
		/// <param name='hierarchy' type='Object' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};


	/* -- type: MSHTMLUnknownElementExtensions -- */



	/* -- type: HTMLUnknownElement -- */
	_$implement(HTMLUnknownElement, MSDataBindingRecordSetReadonlyExtensions);
	_$implement(HTMLUnknownElement, MSHTMLUnknownElementExtensions);



	/* -- type: CSSNamespaceRule -- */

	CSSNamespaceRule.namespaceURI = '';
	CSSNamespaceRule.prefix = '';


	/* -- type: SVGAnimatedRect -- */

	SVGAnimatedRect.animVal = SVGRect;
	SVGAnimatedRect.baseVal = SVGRect;


	/* -- type: MSCompatibleInfo -- */

	MSCompatibleInfo.version = '';
	MSCompatibleInfo.userAgent = '';


	/* -- type: SVGNumber -- */

	SVGNumber.value = 0;


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
		return _createIDBRequest(IDBRequest, this.objectStore, new Object());
	};
	IDBIndex.openKeyCursor = function(range, direction) { 
		/// <signature>
		/// <param name='range' type='IDBKeyRange' optional='true' />
		/// <param name='direction' type='String' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		var cursor = Object.create(IDBCursor); cursor.source = this; return _createIDBRequest(IDBRequest, this.objectStore, cursor);
	};
	IDBIndex.get = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this.objectStore, new Object());
	};
	IDBIndex.openCursor = function(range, direction) { 
		/// <signature>
		/// <param name='range' type='IDBKeyRange' optional='true' />
		/// <param name='direction' type='String' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		var cursor = Object.create(IDBCursorWithValue); cursor.source = this; return _createIDBRequest(IDBRequest, this, cursor);
	};


	/* -- type: MSCSSFilter -- */

	MSCSSFilter.Percent = 0;
	MSCSSFilter.Enabled = false;
	MSCSSFilter.Duration = 0;
	MSCSSFilter.Play = function(Duration) { 
		/// <signature>
		/// <param name='Duration' type='Number' />
		/// </signature>
	};
	MSCSSFilter.Apply = function() { };
	MSCSSFilter.Stop = function() { };


	/* -- type: SVGTransform -- */

	SVGTransform.angle = 0;
	SVGTransform.type = 0;
	SVGTransform.matrix = SVGMatrix;
	SVGTransform.SVG_TRANSFORM_SKEWX = 5;
	SVGTransform.SVG_TRANSFORM_SCALE = 3;
	SVGTransform.SVG_TRANSFORM_UNKNOWN = 0;
	SVGTransform.SVG_TRANSFORM_TRANSLATE = 2;
	SVGTransform.SVG_TRANSFORM_MATRIX = 1;
	SVGTransform.SVG_TRANSFORM_ROTATE = 4;
	SVGTransform.SVG_TRANSFORM_SKEWY = 6;
	SVGTransform.setScale = function(sx, sy) { 
		/// <signature>
		/// <param name='sx' type='Number' />
		/// <param name='sy' type='Number' />
		/// </signature>
	};
	SVGTransform.setTranslate = function(tx, ty) { 
		/// <signature>
		/// <param name='tx' type='Number' />
		/// <param name='ty' type='Number' />
		/// </signature>
	};
	SVGTransform.setMatrix = function(matrix) { 
		/// <signature>
		/// <param name='matrix' type='SVGMatrix' />
		/// </signature>
	};
	SVGTransform.setSkewY = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// </signature>
	};
	SVGTransform.setRotate = function(angle, cx, cy) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// <param name='cx' type='Number' />
		/// <param name='cy' type='Number' />
		/// </signature>
	};
	SVGTransform.setSkewX = function(angle) { 
		/// <signature>
		/// <param name='angle' type='Number' />
		/// </signature>
	};


	/* -- type: MSBorderColorHighlightStyle -- */

	MSBorderColorHighlightStyle.borderColorLight = new Object();
	MSBorderColorHighlightStyle.borderColorDark = new Object();


	/* -- type: MSLinkStyleExtensions -- */

	MSLinkStyleExtensions.styleSheet = StyleSheet;


	/* -- type: HTMLStyleElement -- */
	_$implement(HTMLStyleElement, MSLinkStyleExtensions);
	_$implement(HTMLStyleElement, LinkStyle);

	HTMLStyleElement.media = '';
	HTMLStyleElement.type = '';
	HTMLStyleElement.nodeName = HTMLStyleElement.tagName = 'STYLE';
	HTMLStyleElement.localName = 'style';


	/* -- type: HTMLTitleElement -- */

	HTMLTitleElement.text = '';
	HTMLTitleElement.nodeName = HTMLTitleElement.tagName = 'TITLE';
	HTMLTitleElement.localName = 'title';


	/* -- type: HTMLCanvasElement -- */

	HTMLCanvasElement.width = 0;
	HTMLCanvasElement.height = 0;
	HTMLCanvasElement.toDataURL = function(type, args) { 
		/// <signature>
		/// <param name='type' type='String' optional='true' />
		/// <param name='args' type='Object' optional='true' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLCanvasElement.msToBlob = function() { 
		/// <signature>
		/// <returns type='Blob'/>
		/// </signature>
		return Blob; 
	};
	HTMLCanvasElement.getContext = function(contextId) { 
		/// <signature>
		/// <param name='contextId' type='String' />
		/// <returns type='CanvasRenderingContext2D'/>
		/// </signature>
		return CanvasRenderingContext2D; 
	};
	HTMLCanvasElement.nodeName = HTMLCanvasElement.tagName = 'CANVAS';
	HTMLCanvasElement.localName = 'canvas';


	/* -- type: MSEventObj -- */

	MSEventObj.nextPage = '';
	MSEventObj.toElement = HTMLElement;
	MSEventObj.keyCode = 0;
	MSEventObj.returnValue = new Object();
	MSEventObj.dataFld = '';
	MSEventObj.y = 0;
	MSEventObj.dataTransfer = DataTransfer;
	MSEventObj.propertyName = '';
	MSEventObj.url = '';
	MSEventObj.recordset = new Object();
	MSEventObj.offsetX = 0;
	MSEventObj.screenX = 0;
	MSEventObj.buttonID = 0;
	MSEventObj.wheelDelta = 0;
	MSEventObj.reason = 0;
	MSEventObj.origin = '';
	MSEventObj.srcFilter = new Object();
	MSEventObj.data = '';
	MSEventObj.boundElements = HTMLCollection;
	MSEventObj.cancelBubble = false;
	MSEventObj.behaviorCookie = 0;
	MSEventObj.altLeft = false;
	MSEventObj.bookmarks = BookmarkCollection;
	MSEventObj.srcElement = HTMLElement;
	MSEventObj.repeat = false;
	MSEventObj.type = '';
	MSEventObj.source = Window;
	MSEventObj.fromElement = HTMLElement;
	MSEventObj.offsetY = 0;
	MSEventObj.x = 0;
	MSEventObj.behaviorPart = 0;
	MSEventObj.qualifier = '';
	MSEventObj.altKey = false;
	MSEventObj.ctrlKey = false;
	MSEventObj.clientY = 0;
	MSEventObj.shiftKey = false;
	MSEventObj.shiftLeft = false;
	MSEventObj.contentOverflow = false;
	MSEventObj.screenY = 0;
	MSEventObj.ctrlLeft = false;
	MSEventObj.button = 0;
	MSEventObj.srcUrn = '';
	MSEventObj.actionURL = '';
	MSEventObj.clientX = 0;
	MSEventObj.setAttribute = function(strAttributeName, AttributeValue, lFlags) { 
		/// <signature>
		/// <param name='strAttributeName' type='String' />
		/// <param name='AttributeValue' type='Object' />
		/// <param name='lFlags' type='Number' optional='true' />
		/// </signature>
		_setAttribute(this, strAttributeName, AttributeValue);
	};
	MSEventObj.getAttribute = function(strAttributeName, lFlags) { 
		/// <signature>
		/// <param name='strAttributeName' type='String' />
		/// <param name='lFlags' type='Number' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return _getAttribute(this, strAttributeName);
	};
	MSEventObj.removeAttribute = function(strAttributeName, lFlags) { 
		/// <signature>
		/// <param name='strAttributeName' type='String' />
		/// <param name='lFlags' type='Number' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: SVGPathSegCurvetoCubicRel -- */

	SVGPathSegCurvetoCubicRel.y1 = 0;
	SVGPathSegCurvetoCubicRel.y = 0;
	SVGPathSegCurvetoCubicRel.x2 = 0;
	SVGPathSegCurvetoCubicRel.x = 0;
	SVGPathSegCurvetoCubicRel.y2 = 0;
	SVGPathSegCurvetoCubicRel.x1 = 0;


	/* -- type: DOMError -- */

	DOMError.name = '';
	DOMError.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: SVGLength -- */

	SVGLength.valueAsString = '';
	SVGLength.valueInSpecifiedUnits = 0;
	SVGLength.value = 0;
	SVGLength.unitType = 0;
	SVGLength.SVG_LENGTHTYPE_NUMBER = 1;
	SVGLength.SVG_LENGTHTYPE_PC = 10;
	SVGLength.SVG_LENGTHTYPE_CM = 6;
	SVGLength.SVG_LENGTHTYPE_PERCENTAGE = 2;
	SVGLength.SVG_LENGTHTYPE_MM = 7;
	SVGLength.SVG_LENGTHTYPE_PT = 9;
	SVGLength.SVG_LENGTHTYPE_IN = 8;
	SVGLength.SVG_LENGTHTYPE_EMS = 3;
	SVGLength.SVG_LENGTHTYPE_UNKNOWN = 0;
	SVGLength.SVG_LENGTHTYPE_PX = 5;
	SVGLength.SVG_LENGTHTYPE_EXS = 4;
	SVGLength.newValueSpecifiedUnits = function(unitType, valueInSpecifiedUnits) { 
		/// <signature>
		/// <param name='unitType' type='Number' />
		/// <param name='valueInSpecifiedUnits' type='Number' />
		/// </signature>
	};
	SVGLength.convertToSpecifiedUnits = function(unitType) { 
		/// <signature>
		/// <param name='unitType' type='Number' />
		/// </signature>
	};


	/* -- type: XDomainRequest -- */

	XDomainRequest.timeout = 0;
	XDomainRequest.responseText = '';
	XDomainRequest.contentType = '';
	XDomainRequest.open = function(method, url) { 
		/// <signature>
		/// <param name='method' type='String' />
		/// <param name='url' type='String' />
		/// </signature>
	};
	XDomainRequest.send = function(data) { 
		/// <signature>
		/// <param name='data' type='Object' optional='true' />
		/// </signature>
	};
	XDomainRequest.abort = function() { };
	_events(XDomainRequest, "onprogress", "onload", "onerror", "ontimeout");


	/* -- type: SVGStringList -- */

	SVGStringList.numberOfItems = 0;
	SVGStringList.replaceItem = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='String' />
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	SVGStringList.getItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	SVGStringList.appendItem = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	SVGStringList.clear = function() { };
	SVGStringList.removeItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	SVGStringList.initialize = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	SVGStringList.insertItemBefore = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='String' />
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: SVGPathSegArcRel -- */

	SVGPathSegArcRel.y = 0;
	SVGPathSegArcRel.sweepFlag = false;
	SVGPathSegArcRel.r2 = 0;
	SVGPathSegArcRel.angle = 0;
	SVGPathSegArcRel.x = 0;
	SVGPathSegArcRel.largeArcFlag = false;
	SVGPathSegArcRel.r1 = 0;


	/* -- type: NavigatorOnLine -- */

	NavigatorOnLine.onLine = false;


	/* -- type: EventException -- */

	EventException.name = '';
	EventException.message = '';
	EventException.code = 0;
	EventException.DISPATCH_REQUEST_ERR = 1;
	EventException.UNSPECIFIED_EVENT_TYPE_ERR = 0;
	EventException.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: PerformanceTiming -- */

	PerformanceTiming.responseStart = 0;
	PerformanceTiming.domainLookupEnd = 0;
	PerformanceTiming.redirectStart = 0;
	PerformanceTiming.domComplete = 0;
	PerformanceTiming.msFirstPaint = 0;
	PerformanceTiming.loadEventStart = 0;
	PerformanceTiming.domainLookupStart = 0;
	PerformanceTiming.domInteractive = 0;
	PerformanceTiming.requestStart = 0;
	PerformanceTiming.fetchStart = 0;
	PerformanceTiming.unloadEventEnd = 0;
	PerformanceTiming.navigationStart = 0;
	PerformanceTiming.loadEventEnd = 0;
	PerformanceTiming.connectEnd = 0;
	PerformanceTiming.connectStart = 0;
	PerformanceTiming.domLoading = 0;
	PerformanceTiming.responseEnd = 0;
	PerformanceTiming.redirectEnd = 0;
	PerformanceTiming.unloadEventStart = 0;
	PerformanceTiming.domContentLoadedEventEnd = 0;
	PerformanceTiming.domContentLoadedEventStart = 0;
	PerformanceTiming.toJSON = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
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


	/* -- type: SVGImageElement -- */
	_$implement(SVGImageElement, SVGStylable);
	_$implement(SVGImageElement, SVGTransformable);
	_$implement(SVGImageElement, SVGLangSpace);
	_$implement(SVGImageElement, SVGTests);
	_$implement(SVGImageElement, SVGURIReference);
	_$implement(SVGImageElement, SVGExternalResourcesRequired);

	SVGImageElement.width = SVGAnimatedLength;
	SVGImageElement.y = SVGAnimatedLength;
	SVGImageElement.preserveAspectRatio = SVGAnimatedPreserveAspectRatio;
	SVGImageElement.x = SVGAnimatedLength;
	SVGImageElement.height = SVGAnimatedLength;
	SVGImageElement.nodeName = SVGImageElement.tagName = 'IMAGE';
	SVGImageElement.localName = 'image';


	/* -- type: SVGFilterElement -- */
	_$implement(SVGFilterElement, SVGUnitTypes);
	_$implement(SVGFilterElement, SVGStylable);
	_$implement(SVGFilterElement, SVGLangSpace);
	_$implement(SVGFilterElement, SVGURIReference);
	_$implement(SVGFilterElement, SVGExternalResourcesRequired);

	SVGFilterElement.y = SVGAnimatedLength;
	SVGFilterElement.width = SVGAnimatedLength;
	SVGFilterElement.filterResX = SVGAnimatedInteger;
	SVGFilterElement.filterUnits = SVGAnimatedEnumeration;
	SVGFilterElement.primitiveUnits = SVGAnimatedEnumeration;
	SVGFilterElement.x = SVGAnimatedLength;
	SVGFilterElement.height = SVGAnimatedLength;
	SVGFilterElement.filterResY = SVGAnimatedInteger;
	SVGFilterElement.setFilterRes = function(filterResX, filterResY) { 
		/// <signature>
		/// <param name='filterResX' type='Number' />
		/// <param name='filterResY' type='Number' />
		/// </signature>
	};
	SVGFilterElement.nodeName = SVGFilterElement.tagName = 'FILTER';
	SVGFilterElement.localName = 'filter';


	/* -- type: ErrorEvent -- */

	ErrorEvent.colno = 0;
	ErrorEvent.filename = '';
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


	/* -- type: DragEvent -- */

	DragEvent.dataTransfer = DataTransfer;
	DragEvent.initDragEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg, dataTransferArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='screenXArg' type='Number' />
		/// <param name='screenYArg' type='Number' />
		/// <param name='clientXArg' type='Number' />
		/// <param name='clientYArg' type='Number' />
		/// <param name='ctrlKeyArg' type='Boolean' />
		/// <param name='altKeyArg' type='Boolean' />
		/// <param name='shiftKeyArg' type='Boolean' />
		/// <param name='metaKeyArg' type='Boolean' />
		/// <param name='buttonArg' type='Number' />
		/// <param name='relatedTargetArg' type='EventTarget' />
		/// <param name='dataTransferArg' type='DataTransfer' />
		/// </signature>
	};


	/* -- type: MutationEvent -- */

	MutationEvent.attrChange = 0;
	MutationEvent.newValue = '';
	MutationEvent.attrName = '';
	MutationEvent.prevValue = '';
	MutationEvent.relatedNode = Node;
	MutationEvent.MODIFICATION = 1;
	MutationEvent.REMOVAL = 3;
	MutationEvent.ADDITION = 2;
	MutationEvent.initMutationEvent = function(typeArg, canBubbleArg, cancelableArg, relatedNodeArg, prevValueArg, newValueArg, attrNameArg, attrChangeArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='relatedNodeArg' type='Node' />
		/// <param name='prevValueArg' type='String' />
		/// <param name='newValueArg' type='String' />
		/// <param name='attrNameArg' type='String' />
		/// <param name='attrChangeArg' type='Number' />
		/// </signature>
	};


	/* -- type: HTMLBodyElement -- */
	_$implement(HTMLBodyElement, MSHTMLBodyElementExtensions);
	_$implement(HTMLBodyElement, HTMLBodyElementDOML2Deprecated);
	_$implement(HTMLBodyElement, DOML2DeprecatedBackgroundColorStyle);
	_$implement(HTMLBodyElement, DOML2DeprecatedBackgroundStyle);

	HTMLBodyElement.nodeName = HTMLBodyElement.tagName = 'BODY';
	HTMLBodyElement.localName = 'body';
	_events(HTMLBodyElement, "onresize", "ononline", "onafterprint", "onbeforeprint", "onoffline", "onblur", "onfocus", "onhashchange", "onunload", "onmessage", "onerror", "onload", "onbeforeunload", "onpopstate", "onstorage");


	/* -- type: MSNavigatorAbilities -- */

	MSNavigatorAbilities.userLanguage = '';
	MSNavigatorAbilities.cookieEnabled = false;
	MSNavigatorAbilities.cpuClass = '';
	MSNavigatorAbilities.msMaxTouchPoints = 0;
	MSNavigatorAbilities.msPointerEnabled = false;
	MSNavigatorAbilities.msManipulationViewsEnabled = false;
	MSNavigatorAbilities.appMinorVersion = '';
	MSNavigatorAbilities.connectionSpeed = 0;
	MSNavigatorAbilities.browserLanguage = '';
	MSNavigatorAbilities.product = '';
	MSNavigatorAbilities.systemLanguage = '';
	MSNavigatorAbilities.javaEnabled = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSNavigatorAbilities.taintEnabled = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: HTMLIFrameElement -- */
	_$implement(HTMLIFrameElement, GetSVGDocument);
	_$implement(HTMLIFrameElement, MSHTMLIFrameElementExtensions);
	_$implement(HTMLIFrameElement, MSDataBindingExtensions);
	_$implement(HTMLIFrameElement, DOML2DeprecatedAlignmentStyle_HTMLIFrameElement);

	HTMLIFrameElement.width = '';
	HTMLIFrameElement.scrolling = '';
	HTMLIFrameElement.contentWindow = Window;
	HTMLIFrameElement.marginHeight = '';
	HTMLIFrameElement.src = '';
	HTMLIFrameElement.name = '';
	HTMLIFrameElement.marginWidth = '';
	HTMLIFrameElement.height = '';
	HTMLIFrameElement.contentDocument = document;
	HTMLIFrameElement.longDesc = '';
	HTMLIFrameElement.sandbox = DOMSettableTokenList;
	HTMLIFrameElement.frameBorder = '';
	HTMLIFrameElement.nodeName = HTMLIFrameElement.tagName = 'IFRAME';
	HTMLIFrameElement.localName = 'iframe';


	/* -- type: MSStorageExtensions -- */



	/* -- type: Storage -- */
	_$implement(Storage, MSStorageExtensions);

	Storage.length = 0;
	Storage.getItem = function(key) { 
		/// <signature>
		/// <param name='key' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	Storage.setItem = function(key, data) { 
		/// <signature>
		/// <param name='key' type='String' />
		/// <param name='data' type='String' />
		/// </signature>
	};
	Storage.clear = function() { };
	Storage.removeItem = function(key) { 
		/// <signature>
		/// <param name='key' type='String' />
		/// </signature>
	};
	Storage.key = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: ValidityState -- */

	ValidityState.customError = false;
	ValidityState.valueMissing = false;
	ValidityState.stepMismatch = false;
	ValidityState.rangeUnderflow = false;
	ValidityState.rangeOverflow = false;
	ValidityState.typeMismatch = false;
	ValidityState.patternMismatch = false;
	ValidityState.tooLong = false;
	ValidityState.valid = false;


	/* -- type: MSCurrentStyleCSSProperties -- */

	MSCurrentStyleCSSProperties.blockDirection = '';
	MSCurrentStyleCSSProperties.clipBottom = '';
	MSCurrentStyleCSSProperties.clipTop = '';
	MSCurrentStyleCSSProperties.clipRight = '';
	MSCurrentStyleCSSProperties.clipLeft = '';
	MSCurrentStyleCSSProperties.hasLayout = '';


	/* -- type: SVGTextElement -- */
	_$implement(SVGTextElement, SVGTransformable);

	SVGTextElement.nodeName = SVGTextElement.tagName = 'TEXT';
	SVGTextElement.localName = 'text';


	/* -- type: MSHTMLImageElementExtensions -- */

	MSHTMLImageElementExtensions.msPlayToPrimary = false;
	MSHTMLImageElementExtensions.href = '';
	MSHTMLImageElementExtensions.msPlayToDisabled = false;
	MSHTMLImageElementExtensions.msPlayToSource = new Object();


	/* -- type: MSPluginsCollection -- */

	MSPluginsCollection.length = 0;
	MSPluginsCollection.refresh = function(reload) { 
		/// <signature>
		/// <param name='reload' type='Boolean' optional='true' />
		/// </signature>
	};


	/* -- type: SVGAnimatedNumberList -- */

	SVGAnimatedNumberList.animVal = SVGNumberList;
	SVGAnimatedNumberList.baseVal = SVGNumberList;


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


	/* -- type: DataTransfer -- */

	DataTransfer.types = DOMStringList;
	DataTransfer.effectAllowed = '';
	DataTransfer.files = FileList;
	DataTransfer.dropEffect = '';
	DataTransfer.clearData = function(format) { 
		/// <signature>
		/// <param name='format' type='String' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	DataTransfer.getData = function(format) { 
		/// <signature>
		/// <param name='format' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	DataTransfer.setData = function(format, data) { 
		/// <signature>
		/// <param name='format' type='String' />
		/// <param name='data' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
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


	/* -- type: NavigatorGeolocation -- */

	NavigatorGeolocation.geolocation = Geolocation;


	/* -- type: SVGEllipseElement -- */
	_$implement(SVGEllipseElement, SVGStylable);
	_$implement(SVGEllipseElement, SVGTransformable);
	_$implement(SVGEllipseElement, SVGLangSpace);
	_$implement(SVGEllipseElement, SVGTests);
	_$implement(SVGEllipseElement, SVGExternalResourcesRequired);

	SVGEllipseElement.ry = SVGAnimatedLength;
	SVGEllipseElement.cx = SVGAnimatedLength;
	SVGEllipseElement.rx = SVGAnimatedLength;
	SVGEllipseElement.cy = SVGAnimatedLength;
	SVGEllipseElement.nodeName = SVGEllipseElement.tagName = 'ELLIPSE';
	SVGEllipseElement.localName = 'ellipse';


	/* -- type: SVGPathSegLinetoHorizontalRel -- */

	SVGPathSegLinetoHorizontalRel.x = 0;


	/* -- type: WindowModal -- */



	/* -- type: CSSMediaRule -- */

	CSSMediaRule.media = MediaList;
	CSSMediaRule.cssRules = CSSRuleList;
	CSSMediaRule.insertRule = function(rule, index) { 
		/// <signature>
		/// <param name='rule' type='String' />
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	CSSMediaRule.deleteRule = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};


	/* -- type: HTMLFrameElement -- */
	_$implement(HTMLFrameElement, GetSVGDocument);
	_$implement(HTMLFrameElement, MSHTMLFrameElementExtensions);
	_$implement(HTMLFrameElement, MSBorderColorStyle_HTMLFrameElement);
	_$implement(HTMLFrameElement, MSDataBindingExtensions);

	HTMLFrameElement.scrolling = '';
	HTMLFrameElement.src = '';
	HTMLFrameElement.marginHeight = '';
	HTMLFrameElement.name = '';
	HTMLFrameElement.marginWidth = '';
	HTMLFrameElement.contentDocument = document;
	HTMLFrameElement.longDesc = '';
	HTMLFrameElement.noResize = false;
	HTMLFrameElement.nodeName = HTMLFrameElement.tagName = 'FRAME';
	HTMLFrameElement.localName = 'frame';


	/* -- type: MSBorderColorStyle -- */

	MSBorderColorStyle.borderColor = new Object();


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLTableRowElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLTableRowElement.align = '';


	/* -- type: HTMLTableRowElement -- */
	_$implement(HTMLTableRowElement, MSBorderColorHighlightStyle_HTMLTableRowElement);
	_$implement(HTMLTableRowElement, MSBorderColorStyle_HTMLTableRowElement);
	_$implement(HTMLTableRowElement, HTMLTableAlignment);
	_$implement(HTMLTableRowElement, MSHTMLTableRowElementExtensions);
	_$implement(HTMLTableRowElement, DOML2DeprecatedBackgroundColorStyle);
	_$implement(HTMLTableRowElement, DOML2DeprecatedAlignmentStyle_HTMLTableRowElement);

	HTMLTableRowElement.rowIndex = 0;
	HTMLTableRowElement.cells = _createHTMLCollection('td');
	HTMLTableRowElement.sectionRowIndex = 0;
	HTMLTableRowElement.deleteCell = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};
	HTMLTableRowElement.insertCell = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='HTMLElement'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLTableRowElement.nodeName = HTMLTableRowElement.tagName = 'TR';
	HTMLTableRowElement.localName = 'tr';


	/* -- type: MediaQueryListListener -- */

	MediaQueryListListener.handleChange = function(mql) { 
		/// <signature>
		/// <param name='mql' type='MediaQueryList' />
		/// </signature>
	};


	/* -- type: TextTrack -- */
	_$implement(TextTrack, EventTarget);

	TextTrack.language = '';
	TextTrack.mode = 0;
	TextTrack.readyState = 0;
	TextTrack.activeCues = TextTrackCueList;
	TextTrack.cues = TextTrackCueList;
	TextTrack.kind = '';
	TextTrack.label = '';
	TextTrack.ERROR = 3;
	TextTrack.SHOWING = 2;
	TextTrack.LOADING = 1;
	TextTrack.LOADED = 2;
	TextTrack.NONE = 0;
	TextTrack.HIDDEN = 1;
	TextTrack.DISABLED = 0;
	_events(TextTrack, "oncuechange", "onload", "onerror");


	/* -- type: HTMLScriptElement -- */

	HTMLScriptElement.async = false;
	HTMLScriptElement.src = '';
	HTMLScriptElement.charset = '';
	HTMLScriptElement.event = '';
	HTMLScriptElement.defer = false;
	HTMLScriptElement.text = '';
	HTMLScriptElement.htmlFor = '';
	HTMLScriptElement.type = '';
	HTMLScriptElement.nodeName = HTMLScriptElement.tagName = 'SCRIPT';
	HTMLScriptElement.localName = 'script';


	/* -- type: MessageEvent -- */

	MessageEvent.source = Window;
	MessageEvent.ports = new Object();
	MessageEvent.origin = '';
	MessageEvent.data = new Object();
	MessageEvent.initMessageEvent = function(typeArg, canBubbleArg, cancelableArg, dataArg, originArg, lastEventIdArg, sourceArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='dataArg' type='Object' />
		/// <param name='originArg' type='String' />
		/// <param name='lastEventIdArg' type='String' />
		/// <param name='sourceArg' type='Window' />
		/// </signature>
	};


	/* -- type: SVGDocument -- */

	SVGDocument.rootElement = SVGSVGElement;


	/* -- type: Document -- */
	_$implement(Document, DocumentStyle);
	_$implement(Document, DocumentRange);
	_$implement(Document, HTMLDocument);
	_$implement(Document, DocumentVisibility);
	_$implement(Document, NodeSelector);
	_$implement(Document, DocumentEvent);
	_$implement(Document, DocumentTraversal);
	_$implement(Document, DocumentView);
	_$implement(Document, SVGDocument);

	Document.doctype = DocumentType;
	Document.xmlVersion = '';
	Document.implementation = DOMImplementation;
	Document.xmlStandalone = false;
	Document.xmlEncoding = '';
	Document.documentElement = HTMLElement;
	Document.inputEncoding = '';
	Document.adoptNode = function(source) { 
		/// <signature>
		/// <param name='source' type='Node' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	Document.createElement = function(tagName) { 
		/// <signature>
		/// <param name='tagName' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return _createElementByTagName(tagName);
	};
	Document.createComment = function(data) { 
		/// <signature>
		/// <param name='data' type='String' />
		/// <returns type='Comment'/>
		/// </signature>
		return Comment; 
	};
	Document.getElementsByTagNameNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	Document.getElementsByTagName = function(tagname) { 
		/// <signature>
		/// <param name='tagname' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return _getElementsByTagName(this, tagname);
	};
	Document.createDocumentFragment = function() { 
		/// <signature>
		/// <returns type='DocumentFragment'/>
		/// </signature>
		return DocumentFragment; 
	};
	Document.createProcessingInstruction = function(target, data) { 
		/// <signature>
		/// <param name='target' type='String' />
		/// <param name='data' type='String' />
		/// <returns type='ProcessingInstruction'/>
		/// </signature>
		return ProcessingInstruction; 
	};
	Document.createElementNS = function(namespaceURI, qualifiedName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='qualifiedName' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};
	Document.createAttribute = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Document.createTextNode = function(data) { 
		/// <signature>
		/// <param name='data' type='String' />
		/// <returns type='Text'/>
		/// </signature>
		return Text; 
	};
	Document.importNode = function(importedNode, deep) { 
		/// <signature>
		/// <param name='importedNode' type='Node' />
		/// <param name='deep' type='Boolean' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	Document.createAttributeNS = function(namespaceURI, qualifiedName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='qualifiedName' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Document.createCDATASection = function(data) { 
		/// <signature>
		/// <param name='data' type='String' />
		/// <returns type='CDATASection'/>
		/// </signature>
		return CDATASection; 
	};
	Document.getElementById = function(elementId) { 
		/// <signature>
		/// <param name='elementId' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return _getElementById(elementId);
	};


	/* -- type: CanvasGradient -- */

	CanvasGradient.addColorStop = function(offset, color) { 
		/// <signature>
		/// <param name='offset' type='Number' />
		/// <param name='color' type='String' />
		/// </signature>
	};


	/* -- type: HTMLImageElement -- */
	_$implement(HTMLImageElement, DOML2DeprecatedMarginStyle);
	_$implement(HTMLImageElement, DOML2DeprecatedBorderStyle);
	_$implement(HTMLImageElement, MSHTMLImageElementExtensions);
	_$implement(HTMLImageElement, MSImageResourceExtensions);
	_$implement(HTMLImageElement, DOML2DeprecatedAlignmentStyle_HTMLImageElement);
	_$implement(HTMLImageElement, MSDataBindingExtensions);
	_$implement(HTMLImageElement, MSResourceMetadata);

	HTMLImageElement.width = 0;
	HTMLImageElement.naturalHeight = 0;
	HTMLImageElement.alt = '';
	HTMLImageElement.src = '';
	HTMLImageElement.name = '';
	HTMLImageElement.naturalWidth = 0;
	HTMLImageElement.useMap = '';
	HTMLImageElement.height = 0;
	HTMLImageElement.longDesc = '';
	HTMLImageElement.isMap = false;
	HTMLImageElement.complete = false;
	HTMLImageElement.nodeName = HTMLImageElement.tagName = 'IMG';
	HTMLImageElement.localName = 'img';


	/* -- type: SVGFESpotLightElement -- */

	SVGFESpotLightElement.pointsAtY = SVGAnimatedNumber;
	SVGFESpotLightElement.y = SVGAnimatedNumber;
	SVGFESpotLightElement.limitingConeAngle = SVGAnimatedNumber;
	SVGFESpotLightElement.specularExponent = SVGAnimatedNumber;
	SVGFESpotLightElement.x = SVGAnimatedNumber;
	SVGFESpotLightElement.pointsAtZ = SVGAnimatedNumber;
	SVGFESpotLightElement.z = SVGAnimatedNumber;
	SVGFESpotLightElement.pointsAtX = SVGAnimatedNumber;
	SVGFESpotLightElement.nodeName = SVGFESpotLightElement.tagName = 'FESPOTLIGHT';
	SVGFESpotLightElement.localName = 'fespotlight';


	/* -- type: StyleSheetPageList -- */

	StyleSheetPageList.length = 0;
	StyleSheetPageList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='StyleSheetPage'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(StyleSheetPage)); 
	};
	/* Add a single array element */
	StyleSheetPageList[0] = _$getTrackingNull(Object.create(StyleSheetPage));


	/* -- type: Console -- */

	Console.info = function(message, optionalParams) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.profile = function(reportName) { 
		/// <signature>
		/// <param name='reportName' type='String' optional='true' />
		/// </signature>
	};
	Console.assert = function(test, message, optionalParams) { 
		/// <signature>
		/// <param name='test' type='Boolean' optional='true' />
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.msIsIndependentlyComposed = function(element) { 
		/// <signature>
		/// <param name='element' type='Element' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Console.clear = function() { };
	Console.dir = function(value, optionalParams) { 
		/// <signature>
		/// <param name='value' type='Object' optional='true' />
		/// <param name='optionalParams' type='Object' />
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
	Console.log = function(message, optionalParams) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='optionalParams' type='Object' />
		/// </signature>
	};
	Console.profileEnd = function() { };


	/* -- type: WindowAnimationTiming -- */

	WindowAnimationTiming.animationStartTime = 0;
	WindowAnimationTiming.msAnimationStartTime = 0;
	WindowAnimationTiming.msCancelRequestAnimationFrame = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
	};
	WindowAnimationTiming.cancelAnimationFrame = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
	};
	WindowAnimationTiming.requestAnimationFrame = function(callback) { 
		/// <signature>
		/// <param name='callback' type='FrameRequestCallback' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	WindowAnimationTiming.msRequestAnimationFrame = function(callback) { 
		/// <signature>
		/// <param name='callback' type='FrameRequestCallback' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};


	/* -- type: SVGAnimatedPreserveAspectRatio -- */

	SVGAnimatedPreserveAspectRatio.animVal = SVGPreserveAspectRatio;
	SVGAnimatedPreserveAspectRatio.baseVal = SVGPreserveAspectRatio;


	/* -- type: SVGFETurbulenceElement -- */
	_$implement(SVGFETurbulenceElement, SVGFilterPrimitiveStandardAttributes);

	SVGFETurbulenceElement.baseFrequencyX = SVGAnimatedNumber;
	SVGFETurbulenceElement.numOctaves = SVGAnimatedInteger;
	SVGFETurbulenceElement.type = SVGAnimatedEnumeration;
	SVGFETurbulenceElement.baseFrequencyY = SVGAnimatedNumber;
	SVGFETurbulenceElement.stitchTiles = SVGAnimatedEnumeration;
	SVGFETurbulenceElement.seed = SVGAnimatedNumber;
	SVGFETurbulenceElement.SVG_STITCHTYPE_UNKNOWN = 0;
	SVGFETurbulenceElement.SVG_STITCHTYPE_NOSTITCH = 2;
	SVGFETurbulenceElement.SVG_TURBULENCE_TYPE_UNKNOWN = 0;
	SVGFETurbulenceElement.SVG_TURBULENCE_TYPE_TURBULENCE = 2;
	SVGFETurbulenceElement.SVG_TURBULENCE_TYPE_FRACTALNOISE = 1;
	SVGFETurbulenceElement.SVG_STITCHTYPE_STITCH = 1;
	SVGFETurbulenceElement.nodeName = SVGFETurbulenceElement.tagName = 'FETURBULENCE';
	SVGFETurbulenceElement.localName = 'feturbulence';


	/* -- type: IDBEnvironment -- */

	IDBEnvironment.msIndexedDB = IDBFactory;
	IDBEnvironment.indexedDB = IDBFactory;


	/* -- type: Window -- */
	_$implement(Window, ViewCSS);
	_$implement(Window, WindowAnimationTiming);
	_$implement(Window, MSEventAttachmentTarget);
	_$implement(Window, MSWindowExtensions);
	_$implement(Window, WindowPerformance);
	_$implement(Window, WindowBase64);
	_$implement(Window, ScreenView);
	_$implement(Window, EventTarget);
	_$implement(Window, IDBEnvironment);
	_$implement(Window, WindowLocalStorage);
	_$implement(Window, WindowConsole);
	_$implement(Window, WindowSessionStorage);
	_$implement(Window, WindowTimers);

	Window.history = History;
	Window.name = '';
	Window.top = _$getTrackingNull(Object.create(Window));
	Window.opener = _$getTrackingNull(Object.create(Window));
	Window.frames = _$getTrackingNull(Object.create(Window));
	Window.length = 0;
	Window.self = _$getTrackingNull(Object.create(Window));
	Window.onerror = ErrorFunction;
	Window.parent = _$getTrackingNull(Object.create(Window));
	Window.location = Location;
	Window.frameElement = HTMLElement;
	Window.window = _$getTrackingNull(Object.create(Window));
	Window.navigator = Navigator;
	Window.applicationCache = ApplicationCache;
	Window.focus = function() { };
	Window.print = function() { };
	Window.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Window.open = function(url, target, features, replace) { 
		/// <signature>
		/// <param name='url' type='String' optional='true' />
		/// <param name='target' type='String' optional='true' />
		/// <param name='features' type='String' optional='true' />
		/// <param name='replace' type='Boolean' optional='true' />
		/// <returns type='Window'/>
		/// </signature>
		return Window; 
	};
	Window.close = function() { };
	Window.matchMedia = function(mediaQuery) { 
		/// <signature>
		/// <param name='mediaQuery' type='String' />
		/// <returns type='MediaQueryList'/>
		/// </signature>
		return MediaQueryList; 
	};
	Window.postMessage = function(message, targetOrigin, ports) { 
		/// <signature>
		/// <param name='message' type='Object' />
		/// <param name='targetOrigin' type='String' />
		/// <param name='ports' type='Object' optional='true' />
		/// </signature>
	};
	Window.msMatchMedia = function(mediaQuery) { 
		/// <signature>
		/// <param name='mediaQuery' type='String' />
		/// <returns type='MediaQueryList'/>
		/// </signature>
		return MediaQueryList; 
	};
	Window.getSelection = function() { 
		/// <signature>
		/// <returns type='Selection'/>
		/// </signature>
		return Selection; 
	};
	Window.blur = function() { };
	_events(Window, "ondragend", "onkeydown", "ondragover", "onkeyup", "onreset", "onmouseup", "ondragstart", "ondrag", "onmouseover", "ondragleave", "onafterprint", "onpause", "onbeforeprint", "onseeked", "onmousedown", "onclick", "onwaiting", "ononline", "ondurationchange", "onblur", "onemptied", "onseeking", "oncanplay", "onstalled", "onmousemove", "onoffline", "onbeforeunload", "onpopstate", "onstorage", "onratechange", "onloadstart", "ondragenter", "onsubmit", "onprogress", "ondblclick", "oncontextmenu", "onchange", "onloadedmetadata", "onplay", "onplaying", "oncanplaythrough", "onabort", "onreadystatechange", "onkeypress", "onloadeddata", "onsuspend", "onfocus", "onmessage", "ontimeupdate", "onresize", "onselect", "ondrop", "onmouseout", "onended", "onunload", "onhashchange", "onscroll", "onmousewheel", "onvolumechange", "onload", "oninput");


	/* -- type: SVGAnimatedLengthList -- */

	SVGAnimatedLengthList.animVal = SVGLengthList;
	SVGAnimatedLengthList.baseVal = SVGLengthList;


	/* -- type: TextTrackCueList -- */

	TextTrackCueList.length = 0;
	TextTrackCueList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='TextTrackCue'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(TextTrackCue)); 
	};
	TextTrackCueList.getCueById = function(id) { 
		/// <signature>
		/// <param name='id' type='String' />
		/// <returns type='TextTrackCue'/>
		/// </signature>
		return TextTrackCue; 
	};
	/* Add a single array element */
	TextTrackCueList[0] = _$getTrackingNull(Object.create(TextTrackCue));


	/* -- type: SVGPointList -- */

	SVGPointList.numberOfItems = 0;
	SVGPointList.replaceItem = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGPoint' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGPointList.getItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGPointList.appendItem = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGPoint' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGPointList.clear = function() { };
	SVGPointList.removeItem = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGPointList.initialize = function(newItem) { 
		/// <signature>
		/// <param name='newItem' type='SVGPoint' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};
	SVGPointList.insertItemBefore = function(newItem, index) { 
		/// <signature>
		/// <param name='newItem' type='SVGPoint' />
		/// <param name='index' type='Number' />
		/// <returns type='SVGPoint'/>
		/// </signature>
		return SVGPoint; 
	};


	/* -- type: MouseWheelEvent -- */

	MouseWheelEvent.wheelDelta = 0;
	MouseWheelEvent.initMouseWheelEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, buttonArg, relatedTargetArg, modifiersListArg, wheelDeltaArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='AbstractView' />
		/// <param name='detailArg' type='Number' />
		/// <param name='screenXArg' type='Number' />
		/// <param name='screenYArg' type='Number' />
		/// <param name='clientXArg' type='Number' />
		/// <param name='clientYArg' type='Number' />
		/// <param name='buttonArg' type='Number' />
		/// <param name='relatedTargetArg' type='EventTarget' />
		/// <param name='modifiersListArg' type='String' />
		/// <param name='wheelDeltaArg' type='Number' />
		/// </signature>
	};


	/* -- type: IDBTransaction -- */
	_$implement(IDBTransaction, EventTarget);

	IDBTransaction.db = IDBDatabase;
	IDBTransaction.mode = '';
	IDBTransaction.error = DOMError;
	IDBTransaction.abort = function() { };
	IDBTransaction.objectStore = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='IDBObjectStore'/>
		/// </signature>
		return IDBObjectStore; 
	};
	_events(IDBTransaction, "oncomplete", "onerror", "onabort");


	/* -- type: HTMLMenuElement -- */
	_$implement(HTMLMenuElement, DOML2DeprecatedListSpaceReduction);
	_$implement(HTMLMenuElement, MSHTMLMenuElementExtensions);

	HTMLMenuElement.type = '';
	HTMLMenuElement.nodeName = HTMLMenuElement.tagName = 'MENU';
	HTMLMenuElement.localName = 'menu';


	/* -- type: HTMLMapElement -- */

	HTMLMapElement.name = '';
	HTMLMapElement.areas = HTMLAreasCollection;
	HTMLMapElement.nodeName = HTMLMapElement.tagName = 'MAP';
	HTMLMapElement.localName = 'map';


	/* -- type: HTMLOptionElement -- */
	_$implement(HTMLOptionElement, MSDataBindingExtensions);

	HTMLOptionElement.index = 0;
	HTMLOptionElement.text = '';
	HTMLOptionElement.value = '';
	HTMLOptionElement.defaultSelected = false;
	HTMLOptionElement.form = HTMLFormElement;
	HTMLOptionElement.label = '';
	HTMLOptionElement.selected = false;
	HTMLOptionElement.nodeName = HTMLOptionElement.tagName = 'OPTION';
	HTMLOptionElement.localName = 'option';


	/* -- type: ControlRangeCollection -- */

	ControlRangeCollection.length = 0;
	ControlRangeCollection.queryCommandValue = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	ControlRangeCollection.remove = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// </signature>
	};
	ControlRangeCollection.scrollIntoView = function(varargStart) { 
		/// <signature>
		/// <param name='varargStart' type='Object' optional='true' />
		/// </signature>
	};
	ControlRangeCollection.queryCommandIndeterm = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	ControlRangeCollection.add = function(item) { 
		/// <signature>
		/// <param name='item' type='Element' />
		/// </signature>
	};
	ControlRangeCollection.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Element'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(HTMLElement)); 
	};
	ControlRangeCollection.execCommand = function(cmdID, showUI, value) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <param name='showUI' type='Boolean' optional='true' />
		/// <param name='value' type='Object' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	ControlRangeCollection.addElement = function(item) { 
		/// <signature>
		/// <param name='item' type='Element' />
		/// </signature>
	};
	ControlRangeCollection.queryCommandState = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	ControlRangeCollection.queryCommandSupported = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	ControlRangeCollection.queryCommandEnabled = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	ControlRangeCollection.select = function() { };
	ControlRangeCollection.queryCommandText = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	/* Add a single array element */
	ControlRangeCollection[0] = _$getTrackingNull(Object.create(HTMLElement));


	/* -- type: HTMLFontElement -- */
	_$implement(HTMLFontElement, DOML2DeprecatedColorProperty);
	_$implement(HTMLFontElement, MSHTMLFontElementExtensions);
	_$implement(HTMLFontElement, DOML2DeprecatedSizeProperty);

	HTMLFontElement.face = '';
	HTMLFontElement.nodeName = HTMLFontElement.tagName = 'FONT';
	HTMLFontElement.localName = 'font';


	/* -- type: HTMLLinkElement -- */
	_$implement(HTMLLinkElement, MSLinkStyleExtensions);
	_$implement(HTMLLinkElement, LinkStyle);

	HTMLLinkElement.rel = '';
	HTMLLinkElement.target = '';
	HTMLLinkElement.media = '';
	HTMLLinkElement.href = '';
	HTMLLinkElement.rev = '';
	HTMLLinkElement.charset = '';
	HTMLLinkElement.type = '';
	HTMLLinkElement.hreflang = '';
	HTMLLinkElement.nodeName = HTMLLinkElement.tagName = 'LINK';
	HTMLLinkElement.localName = 'link';


	/* -- type: SVGViewElement -- */
	_$implement(SVGViewElement, SVGZoomAndPan);
	_$implement(SVGViewElement, SVGFitToViewBox);
	_$implement(SVGViewElement, SVGExternalResourcesRequired);

	SVGViewElement.viewTarget = SVGStringList;
	SVGViewElement.nodeName = SVGViewElement.tagName = 'VIEW';
	SVGViewElement.localName = 'view';


	/* -- type: HTMLDDElement -- */
	_$implement(HTMLDDElement, DOML2DeprecatedWordWrapSuppression_HTMLDDElement);

	HTMLDDElement.nodeName = HTMLDDElement.tagName = 'DD';
	HTMLDDElement.localName = 'dd';


	/* -- type: AnimationEvent -- */

	AnimationEvent.animationName = '';
	AnimationEvent.elapsedTime = 0;
	AnimationEvent.initAnimationEvent = function(typeArg, canBubbleArg, cancelableArg, animationNameArg, elapsedTimeArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='animationNameArg' type='String' />
		/// <param name='elapsedTimeArg' type='Number' />
		/// </signature>
	};


	/* -- type: SVGPatternElement -- */
	_$implement(SVGPatternElement, SVGStylable);
	_$implement(SVGPatternElement, SVGUnitTypes);
	_$implement(SVGPatternElement, SVGLangSpace);
	_$implement(SVGPatternElement, SVGFitToViewBox);
	_$implement(SVGPatternElement, SVGTests);
	_$implement(SVGPatternElement, SVGURIReference);
	_$implement(SVGPatternElement, SVGExternalResourcesRequired);

	SVGPatternElement.width = SVGAnimatedLength;
	SVGPatternElement.y = SVGAnimatedLength;
	SVGPatternElement.patternUnits = SVGAnimatedEnumeration;
	SVGPatternElement.x = SVGAnimatedLength;
	SVGPatternElement.height = SVGAnimatedLength;
	SVGPatternElement.patternTransform = SVGAnimatedTransformList;
	SVGPatternElement.patternContentUnits = SVGAnimatedEnumeration;
	SVGPatternElement.nodeName = SVGPatternElement.tagName = 'PATTERN';
	SVGPatternElement.localName = 'pattern';


	/* -- type: HTMLBlockElement -- */
	_$implement(HTMLBlockElement, DOML2DeprecatedTextFlowControl_HTMLBlockElement);
	_$implement(HTMLBlockElement, DOML2DeprecatedWidthStyle_HTMLBlockElement);

	HTMLBlockElement.cite = '';
	HTMLBlockElement.nodeName = HTMLBlockElement.tagName = 'XMP';
	HTMLBlockElement.localName = 'xmp';


	/* -- type: TextRange -- */

	TextRange.boundingLeft = 0;
	TextRange.offsetLeft = 0;
	TextRange.htmlText = '';
	TextRange.boundingWidth = 0;
	TextRange.boundingHeight = 0;
	TextRange.boundingTop = 0;
	TextRange.text = '';
	TextRange.offsetTop = 0;
	TextRange.queryCommandValue = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return new Object(); 
	};
	TextRange.moveToPoint = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	TextRange.scrollIntoView = function(fStart) { 
		/// <signature>
		/// <param name='fStart' type='Boolean' optional='true' />
		/// </signature>
	};
	TextRange.queryCommandIndeterm = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.move = function(Unit, Count) { 
		/// <signature>
		/// <param name='Unit' type='String' />
		/// <param name='Count' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	TextRange.getBookmark = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	TextRange.findText = function(string, count, flags) { 
		/// <signature>
		/// <param name='string' type='String' />
		/// <param name='count' type='Number' optional='true' />
		/// <param name='flags' type='Number' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.execCommand = function(cmdID, showUI, value) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <param name='showUI' type='Boolean' optional='true' />
		/// <param name='value' type='Object' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.moveToBookmark = function(Bookmark) { 
		/// <signature>
		/// <param name='Bookmark' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.getBoundingClientRect = function() { 
		/// <signature>
		/// <returns type='ClientRect'/>
		/// </signature>
		return ClientRect; 
	};
	TextRange.isEqual = function(range) { 
		/// <signature>
		/// <param name='range' type='TextRange' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.duplicate = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};
	TextRange.collapse = function(Start) { 
		/// <signature>
		/// <param name='Start' type='Boolean' optional='true' />
		/// </signature>
	};
	TextRange.select = function() { };
	TextRange.queryCommandText = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	TextRange.pasteHTML = function(html) { 
		/// <signature>
		/// <param name='html' type='String' />
		/// </signature>
	};
	TextRange.inRange = function(range) { 
		/// <signature>
		/// <param name='range' type='TextRange' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.moveEnd = function(Unit, Count) { 
		/// <signature>
		/// <param name='Unit' type='String' />
		/// <param name='Count' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	TextRange.getClientRects = function() { 
		/// <signature>
		/// <returns type='ClientRectList'/>
		/// </signature>
		return ClientRectList; 
	};
	TextRange.queryCommandState = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.parentElement = function() { 
		/// <signature>
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};
	TextRange.moveStart = function(Unit, Count) { 
		/// <signature>
		/// <param name='Unit' type='String' />
		/// <param name='Count' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	TextRange.moveToElementText = function(element) { 
		/// <signature>
		/// <param name='element' type='Element' />
		/// </signature>
	};
	TextRange.execCommandShowHelp = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.compareEndPoints = function(how, sourceRange) { 
		/// <signature>
		/// <param name='how' type='String' />
		/// <param name='sourceRange' type='TextRange' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	TextRange.expand = function(Unit) { 
		/// <signature>
		/// <param name='Unit' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.queryCommandSupported = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	TextRange.setEndPoint = function(how, SourceRange) { 
		/// <signature>
		/// <param name='how' type='String' />
		/// <param name='SourceRange' type='TextRange' />
		/// </signature>
	};
	TextRange.queryCommandEnabled = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: SVGFEMorphologyElement -- */
	_$implement(SVGFEMorphologyElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEMorphologyElement.operator = SVGAnimatedEnumeration;
	SVGFEMorphologyElement.radiusX = SVGAnimatedNumber;
	SVGFEMorphologyElement.radiusY = SVGAnimatedNumber;
	SVGFEMorphologyElement.in1 = SVGAnimatedString;
	SVGFEMorphologyElement.SVG_MORPHOLOGY_OPERATOR_UNKNOWN = 0;
	SVGFEMorphologyElement.SVG_MORPHOLOGY_OPERATOR_ERODE = 1;
	SVGFEMorphologyElement.SVG_MORPHOLOGY_OPERATOR_DILATE = 2;
	SVGFEMorphologyElement.nodeName = SVGFEMorphologyElement.tagName = 'FEMORPHOLOGY';
	SVGFEMorphologyElement.localName = 'femorphology';


	/* -- type: StyleMedia -- */

	StyleMedia.type = '';
	StyleMedia.matchMedium = function(mediaquery) { 
		/// <signature>
		/// <param name='mediaquery' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: HTMLOListElement -- */
	_$implement(HTMLOListElement, DOML2DeprecatedListSpaceReduction);
	_$implement(HTMLOListElement, DOML2DeprecatedListNumberingAndBulletStyle);
	_$implement(HTMLOListElement, MSHTMLOListElementExtensions);

	HTMLOListElement.start = 0;
	HTMLOListElement.nodeName = HTMLOListElement.tagName = 'OL';
	HTMLOListElement.localName = 'ol';


	/* -- type: AudioTrackList -- */
	_$implement(AudioTrackList, EventTarget);

	AudioTrackList.length = 0;
	AudioTrackList.getTrackById = function(id) { 
		/// <signature>
		/// <param name='id' type='String' />
		/// <returns type='AudioTrack'/>
		/// </signature>
		return AudioTrack; 
	};
	AudioTrackList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='AudioTrack'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(AudioTrack)); 
	};
	_events(AudioTrackList, "onchange", "onaddtrack");
	/* Add a single array element */
	AudioTrackList[0] = _$getTrackingNull(Object.create(AudioTrack));


	/* -- type: XMLHttpRequestEventTarget -- */
	_$implement(XMLHttpRequestEventTarget, EventTarget);

	_events(XMLHttpRequestEventTarget, "onprogress", "onerror", "onload", "ontimeout", "onabort", "onloadstart", "onloadend");


	/* -- type: RangeException -- */

	RangeException.name = '';
	RangeException.message = '';
	RangeException.code = 0;
	RangeException.INVALID_NODE_TYPE_ERR = 2;
	RangeException.BAD_BOUNDARYPOINTS_ERR = 1;
	RangeException.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: MSScriptHost -- */



	/* -- type: URL -- */

	URL.revokeObjectURL = function(url) { 
		/// <signature>
		/// <param name='url' type='String' />
		/// </signature>
	};
	URL.createObjectURL = function(object, options) { 
		/// <signature>
		/// <param name='object' type='Object' />
		/// <param name='options' type='ObjectURLOptions' optional='true' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: SVGPathSegCurvetoQuadraticSmoothRel -- */

	SVGPathSegCurvetoQuadraticSmoothRel.y = 0;
	SVGPathSegCurvetoQuadraticSmoothRel.x = 0;


	/* -- type: File -- */

	File.lastModifiedDate = new Object();
	File.name = '';


	/* -- type: HTMLAreasCollection -- */

	HTMLAreasCollection.remove = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};
	HTMLAreasCollection.add = function(element, before) { 
		/// <signature>
		/// <param name='element' type='HTMLElement' />
		/// <param name='before' type='HTMLElement' optional='true' />
		/// </signature>
		/// <signature>
		/// <param name='element' type='HTMLElement' />
		/// <param name='before' type='Number' optional='true' />
		/// </signature>
	};


	/* -- type: ErrorFunction -- */

	ErrorFunction.handleWindowError = function(event, source, fileno, columnNumber) { 
		/// <signature>
		/// <param name='event' type='Event' />
		/// <param name='source' type='String' />
		/// <param name='fileno' type='Number' />
		/// <param name='columnNumber' type='Number' />
		/// </signature>
	};


	/* -- type: DOML2DeprecatedAlignmentStyle_HTMLParagraphElement -- */

	DOML2DeprecatedAlignmentStyle_HTMLParagraphElement.align = '';


	/* -- type: HTMLParagraphElement -- */
	_$implement(HTMLParagraphElement, DOML2DeprecatedAlignmentStyle_HTMLParagraphElement);
	_$implement(HTMLParagraphElement, MSHTMLParagraphElementExtensions);

	HTMLParagraphElement.nodeName = HTMLParagraphElement.tagName = 'P';
	HTMLParagraphElement.localName = 'p';


	/* -- type: SVGLineElement -- */
	_$implement(SVGLineElement, SVGStylable);
	_$implement(SVGLineElement, SVGTransformable);
	_$implement(SVGLineElement, SVGLangSpace);
	_$implement(SVGLineElement, SVGTests);
	_$implement(SVGLineElement, SVGExternalResourcesRequired);

	SVGLineElement.y1 = SVGAnimatedLength;
	SVGLineElement.x2 = SVGAnimatedLength;
	SVGLineElement.y2 = SVGAnimatedLength;
	SVGLineElement.x1 = SVGAnimatedLength;
	SVGLineElement.nodeName = SVGLineElement.tagName = 'LINE';
	SVGLineElement.localName = 'line';


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


	/* -- type: ObjectURLOptions -- */

	ObjectURLOptions.oneTimeOnly = false;


	/* -- type: DOMImplementation -- */
	_$implement(DOMImplementation, DOMHTMLImplementation);

	DOMImplementation.createDocumentType = function(qualifiedName, publicId, systemId) { 
		/// <signature>
		/// <param name='qualifiedName' type='String' />
		/// <param name='publicId' type='String' />
		/// <param name='systemId' type='String' />
		/// <returns type='DocumentType'/>
		/// </signature>
		return DocumentType; 
	};
	DOMImplementation.createDocument = function(namespaceURI, qualifiedName, doctype) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='qualifiedName' type='String' />
		/// <param name='doctype' type='DocumentType' />
		/// <returns type='Document'/>
		/// </signature>
		return Document; 
	};
	DOMImplementation.hasFeature = function(feature, version) { 
		/// <signature>
		/// <param name='feature' type='String' />
		/// <param name='version' type='String' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: PositionErrorCallback -- */

	PositionErrorCallback.handleEvent = function(error) { 
		/// <signature>
		/// <param name='error' type='PositionError' />
		/// </signature>
	};


	/* -- type: ClientRect -- */

	ClientRect.width = 0;
	ClientRect.left = 0;
	ClientRect.right = 0;
	ClientRect.top = 0;
	ClientRect.height = 0;
	ClientRect.bottom = 0;


	/* -- type: HTMLBaseElement -- */

	HTMLBaseElement.target = '';
	HTMLBaseElement.href = '';
	HTMLBaseElement.nodeName = HTMLBaseElement.tagName = 'BASE';
	HTMLBaseElement.localName = 'base';


	/* -- type: SVGZoomEvent -- */

	SVGZoomEvent.zoomRectScreen = SVGRect;
	SVGZoomEvent.previousScale = 0;
	SVGZoomEvent.newScale = 0;
	SVGZoomEvent.newTranslate = SVGPoint;
	SVGZoomEvent.previousTranslate = SVGPoint;


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


	/* -- type: SVGFEPointLightElement -- */

	SVGFEPointLightElement.y = SVGAnimatedNumber;
	SVGFEPointLightElement.x = SVGAnimatedNumber;
	SVGFEPointLightElement.z = SVGAnimatedNumber;
	SVGFEPointLightElement.nodeName = SVGFEPointLightElement.tagName = 'FEPOINTLIGHT';
	SVGFEPointLightElement.localName = 'fepointlight';


	/* -- type: MediaQueryList -- */

	MediaQueryList.matches = false;
	MediaQueryList.media = '';
	MediaQueryList.addListener = function(listener) { 
		/// <signature>
		/// <param name='listener' type='MediaQueryListListener' />
		/// </signature>
	};
	MediaQueryList.removeListener = function(listener) { 
		/// <signature>
		/// <param name='listener' type='MediaQueryListListener' />
		/// </signature>
	};


	/* -- type: NavigatorID -- */

	NavigatorID.appVersion = '';
	NavigatorID.appName = '';
	NavigatorID.userAgent = '';
	NavigatorID.platform = '';


	/* -- type: Navigator -- */
	_$implement(Navigator, NavigatorOnLine);
	_$implement(Navigator, NavigatorID);
	_$implement(Navigator, NavigatorDoNotTrack);
	_$implement(Navigator, MSFileSaver);
	_$implement(Navigator, NavigatorAbilities);
	_$implement(Navigator, NavigatorGeolocation);
	_$implement(Navigator, MSNavigatorAbilities);



	/* -- type: MessageChannel -- */

	MessageChannel.port2 = MessagePort;
	MessageChannel.port1 = MessagePort;


	/* -- type: SVGGElement -- */
	_$implement(SVGGElement, SVGStylable);
	_$implement(SVGGElement, SVGTransformable);
	_$implement(SVGGElement, SVGLangSpace);
	_$implement(SVGGElement, SVGTests);
	_$implement(SVGGElement, SVGExternalResourcesRequired);

	SVGGElement.nodeName = SVGGElement.tagName = 'G';
	SVGGElement.localName = 'g';


	/* -- type: SVGFEBlendElement -- */
	_$implement(SVGFEBlendElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEBlendElement.in2 = SVGAnimatedString;
	SVGFEBlendElement.mode = SVGAnimatedEnumeration;
	SVGFEBlendElement.in1 = SVGAnimatedString;
	SVGFEBlendElement.SVG_FEBLEND_MODE_DARKEN = 4;
	SVGFEBlendElement.SVG_FEBLEND_MODE_UNKNOWN = 0;
	SVGFEBlendElement.SVG_FEBLEND_MODE_MULTIPLY = 2;
	SVGFEBlendElement.SVG_FEBLEND_MODE_NORMAL = 1;
	SVGFEBlendElement.SVG_FEBLEND_MODE_SCREEN = 3;
	SVGFEBlendElement.SVG_FEBLEND_MODE_LIGHTEN = 5;
	SVGFEBlendElement.nodeName = SVGFEBlendElement.tagName = 'FEBLEND';
	SVGFEBlendElement.localName = 'feblend';


	/* -- type: SVGFETileElement -- */
	_$implement(SVGFETileElement, SVGFilterPrimitiveStandardAttributes);

	SVGFETileElement.in1 = SVGAnimatedString;
	SVGFETileElement.nodeName = SVGFETileElement.tagName = 'FETILE';
	SVGFETileElement.localName = 'fetile';


	/* -- type: SVGFEFuncAElement -- */

	SVGFEFuncAElement.nodeName = SVGFEFuncAElement.tagName = 'FEFUNCA';
	SVGFEFuncAElement.localName = 'fefunca';


	/* -- type: CanvasPixelArray -- */

	CanvasPixelArray.length = 0;


	/* -- type: TextTrackCue -- */
	_$implement(TextTrackCue, EventTarget);

	TextTrackCue.track = TextTrack;
	TextTrackCue.endTime = 0;
	TextTrackCue.text = '';
	TextTrackCue.pauseOnExit = false;
	TextTrackCue.id = '';
	TextTrackCue.startTime = 0;
	TextTrackCue.getCueAsHTML = function() { 
		/// <signature>
		/// <returns type='DocumentFragment'/>
		/// </signature>
		return DocumentFragment; 
	};
	_events(TextTrackCue, "onenter", "onexit");


	/* -- type: TreeWalker -- */

	TreeWalker.whatToShow = 0;
	TreeWalker.filter = NodeFilterCallback;
	TreeWalker.currentNode = Node;
	TreeWalker.root = Node;
	TreeWalker.expandEntityReferences = false;
	TreeWalker.previousSibling = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	TreeWalker.nextSibling = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	TreeWalker.lastChild = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	TreeWalker.nextNode = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	TreeWalker.previousNode = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	TreeWalker.firstChild = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	TreeWalker.parentNode = function() { 
		/// <signature>
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};


	/* -- type: HTMLTableElement -- */
	_$implement(HTMLTableElement, DOML2DeprecatedBorderStyle_HTMLTableElement);
	_$implement(HTMLTableElement, DOML2DeprecatedAlignmentStyle_HTMLTableElement);
	_$implement(HTMLTableElement, MSDataBindingExtensions);
	_$implement(HTMLTableElement, MSBorderColorStyle);
	_$implement(HTMLTableElement, MSHTMLTableElementExtensions);
	_$implement(HTMLTableElement, MSBorderColorHighlightStyle);
	_$implement(HTMLTableElement, DOML2DeprecatedBackgroundStyle);
	_$implement(HTMLTableElement, MSDataBindingTableExtensions);
	_$implement(HTMLTableElement, DOML2DeprecatedBackgroundColorStyle);

	HTMLTableElement.width = '';
	HTMLTableElement.tBodies = HTMLCollection;
	HTMLTableElement.tHead = HTMLTableSectionElement;
	HTMLTableElement.cellSpacing = '';
	HTMLTableElement.frame = '';
	HTMLTableElement.tFoot = HTMLTableSectionElement;
	HTMLTableElement.rules = '';
	HTMLTableElement.rows = _createHTMLCollection('tr');
	HTMLTableElement.cellPadding = '';
	HTMLTableElement.caption = HTMLTableCaptionElement;
	HTMLTableElement.summary = '';
	HTMLTableElement.deleteRow = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};
	HTMLTableElement.createTBody = function() { 
		/// <signature>
		/// <returns type='HTMLElement'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLTableElement.insertRow = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// <returns type='HTMLElement'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLTableElement.deleteCaption = function() { };
	HTMLTableElement.deleteTFoot = function() { };
	HTMLTableElement.createTHead = function() { 
		/// <signature>
		/// <returns type='HTMLElement'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLTableElement.deleteTHead = function() { };
	HTMLTableElement.createCaption = function() { 
		/// <signature>
		/// <returns type='HTMLElement'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLTableElement.createTFoot = function() { 
		/// <signature>
		/// <returns type='HTMLElement'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLTableElement.nodeName = HTMLTableElement.tagName = 'TABLE';
	HTMLTableElement.localName = 'table';



	// Assign variables to emulate browser host
	Document._$createDomObject = _createDomObject;
	Document._$recordDomStructure = _recordDomStructure;
	this.window = Window;
	_$nonRemovable(this.window);
	document = Document;
	_publicObject('document', Document);
	document.nodeName = '#document';
	document.localName = _$getTrackingNull('');
	document.nodeType = Node.DOCUMENT_NODE;
	document.documentMode = document.DOCUMENT_NODE;
	document.ownerDocument = _$getTrackingNull(document);
	document.parentNode = _$getTrackingNull(document);
	document.parentWindow = window;
	document.previousSibling = _$getTrackingNull(document);
	document.nextSibling = _$getTrackingNull(document);
	document.nodeValue = _$getTrackingNull('');
	document.defaultView = window;

	document.head = _createElementByTagName('head');
	document.body = document.activeElement = _createElementByTagName('body');
	document.documentElement = _createElementByTagName('html');
	_appendChildInternal(document.documentElement, document.head);
	_appendChildInternal(document.documentElement, document.body);
	_appendChildInternal(document, document.documentElement);
	_appendChildInternal(document.head, _createElementByTagName('title'));
	_appendChildInternal(document.head, _createElementByTagName('script'));

	window.navigator.userAgent = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; MS-RTC LM 8; InfoPath.3; Override:IE9_DEFAULT_20091014';
	window.location.href = 'about:blank';
	window.location.pathname = '/blank';
	window.location.protocol = 'about:';
	window.location.toString = function() { return this.href; }

	/* Wire all elements to have the body as their parent node */
	Node.parentNode = document.body;
	Node.ownerDocument = document;

	function _publicInterface(name, interface, interfacePrototype) {
		_$nonRemovable(interface);
		Window[name] = interface;
		Window[name].prototype = interfacePrototype;
	}

	function _publicObject(name, obj) {
		_$nonRemovable(obj);
		Window[name] = obj;
	}
	
	_publicInterface('HTMLTableElement', {}, HTMLTableElement);
	_publicInterface('TreeWalker', {}, TreeWalker);
	_publicInterface('TextTrackCue', {}, TextTrackCue);
	_publicInterface('CanvasPixelArray', {}, CanvasPixelArray);
	_publicInterface('SVGFEFuncAElement', {}, SVGFEFuncAElement);
	_publicInterface('SVGFETileElement', {}, SVGFETileElement);
	_publicInterface('SVGFEBlendElement', {
		'SVG_FEBLEND_MODE_DARKEN' : 4,
		'SVG_FEBLEND_MODE_UNKNOWN' : 0,
		'SVG_FEBLEND_MODE_MULTIPLY' : 2,
		'SVG_FEBLEND_MODE_NORMAL' : 1,
		'SVG_FEBLEND_MODE_SCREEN' : 3,
		'SVG_FEBLEND_MODE_LIGHTEN' : 5
	}, SVGFEBlendElement);
	_publicInterface('CSSStyleDeclaration', {}, CSSStyleDeclaration);
	_publicInterface('SVGGElement', {}, SVGGElement);
	_publicInterface('Navigator', {}, Navigator);
	_publicInterface('MediaQueryList', {}, MediaQueryList);
	_publicInterface('SVGFEPointLightElement', {}, SVGFEPointLightElement);
	_publicInterface('CloseEvent', {}, CloseEvent);
	_publicInterface('ProgressEvent', {}, ProgressEvent);
	_publicInterface('SVGZoomEvent', {}, SVGZoomEvent);
	_publicInterface('HTMLBaseElement', {}, HTMLBaseElement);
	_publicInterface('ClientRect', {}, ClientRect);
	_publicInterface('DOMImplementation', {}, DOMImplementation);
	_publicObject('SVGUnitTypes', SVGUnitTypes);
	_publicInterface('Element', {}, Element);
	_publicInterface('FileList', {}, FileList);
	_publicInterface('SVGLineElement', {}, SVGLineElement);
	_publicInterface('HTMLParagraphElement', {}, HTMLParagraphElement);
	_publicInterface('HTMLAreasCollection', {}, HTMLAreasCollection);
	_publicInterface('File', {}, File);
	_publicInterface('Node', {
		'ENTITY_REFERENCE_NODE' : 5,
		'ATTRIBUTE_NODE' : 2,
		'DOCUMENT_FRAGMENT_NODE' : 11,
		'TEXT_NODE' : 3,
		'ELEMENT_NODE' : 1,
		'COMMENT_NODE' : 8,
		'DOCUMENT_POSITION_DISCONNECTED' : 0x01,
		'DOCUMENT_POSITION_CONTAINED_BY' : 0x10,
		'DOCUMENT_POSITION_CONTAINS' : 0x08,
		'DOCUMENT_TYPE_NODE' : 10,
		'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC' : 0x20,
		'DOCUMENT_NODE' : 9,
		'ENTITY_NODE' : 6,
		'PROCESSING_INSTRUCTION_NODE' : 7,
		'CDATA_SECTION_NODE' : 4,
		'NOTATION_NODE' : 12,
		'DOCUMENT_POSITION_PRECEDING' : 0x02,
		'DOCUMENT_POSITION_FOLLOWING' : 0x04
	}, Node);
	_publicInterface('SVGPathSegCurvetoQuadraticSmoothRel', {}, SVGPathSegCurvetoQuadraticSmoothRel);
	_publicObject('URL', URL);
	_publicInterface('MouseEvent', {}, MouseEvent);
	_publicInterface('RangeException', {
		'INVALID_NODE_TYPE_ERR' : 2,
		'BAD_BOUNDARYPOINTS_ERR' : 1
	}, RangeException);
	_publicInterface('SVGTextPositioningElement', {}, SVGTextPositioningElement);
	_publicInterface('XMLHttpRequestEventTarget', {}, XMLHttpRequestEventTarget);
	_publicInterface('AudioTrackList', {}, AudioTrackList);
	_publicInterface('HTMLOListElement', {}, HTMLOListElement);
	_publicInterface('StyleMedia', {}, StyleMedia);
	_publicInterface('SVGFEMorphologyElement', {
		'SVG_MORPHOLOGY_OPERATOR_UNKNOWN' : 0,
		'SVG_MORPHOLOGY_OPERATOR_ERODE' : 1,
		'SVG_MORPHOLOGY_OPERATOR_DILATE' : 2
	}, SVGFEMorphologyElement);
	_publicInterface('TextRange', {}, TextRange);
	_publicInterface('HTMLBlockElement', {}, HTMLBlockElement);
	_publicInterface('SVGPatternElement', {}, SVGPatternElement);
	_publicInterface('AnimationEvent', {}, AnimationEvent);
	_publicInterface('HTMLDDElement', {}, HTMLDDElement);
	_publicInterface('SVGComponentTransferFunctionElement', {
		'SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN' : 0,
		'SVG_FECOMPONENTTRANSFER_TYPE_TABLE' : 2,
		'SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY' : 1,
		'SVG_FECOMPONENTTRANSFER_TYPE_GAMMA' : 5,
		'SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE' : 3,
		'SVG_FECOMPONENTTRANSFER_TYPE_LINEAR' : 4
	}, SVGComponentTransferFunctionElement);
	_publicInterface('SVGViewElement', {}, SVGViewElement);
	_publicInterface('HTMLLinkElement', {}, HTMLLinkElement);
	_publicInterface('HTMLFontElement', {}, HTMLFontElement);
	_publicInterface('ControlRangeCollection', {}, ControlRangeCollection);
	_publicInterface('HTMLOptionElement', {}, HTMLOptionElement);
	_publicInterface('HTMLMapElement', {}, HTMLMapElement);
	_publicInterface('HTMLMenuElement', {}, HTMLMenuElement);
	_publicInterface('IDBTransaction', {}, IDBTransaction);
	_publicInterface('MouseWheelEvent', {}, MouseWheelEvent);
	_publicInterface('SVGPointList', {}, SVGPointList);
	_publicInterface('TextTrackCueList', {}, TextTrackCueList);
	_publicInterface('SVGAnimatedLengthList', {}, SVGAnimatedLengthList);
	_publicInterface('Window', {}, Window);
	_publicInterface('SVGFETurbulenceElement', {
		'SVG_STITCHTYPE_UNKNOWN' : 0,
		'SVG_STITCHTYPE_NOSTITCH' : 2,
		'SVG_TURBULENCE_TYPE_UNKNOWN' : 0,
		'SVG_TURBULENCE_TYPE_TURBULENCE' : 2,
		'SVG_TURBULENCE_TYPE_FRACTALNOISE' : 1,
		'SVG_STITCHTYPE_STITCH' : 1
	}, SVGFETurbulenceElement);
	_publicInterface('SVGAnimatedPreserveAspectRatio', {}, SVGAnimatedPreserveAspectRatio);
	_publicInterface('Console', {}, Console);
	_publicInterface('StyleSheetPageList', {}, StyleSheetPageList);
	_publicInterface('SVGFESpotLightElement', {}, SVGFESpotLightElement);
	_publicInterface('HTMLImageElement', {}, HTMLImageElement);
	_publicInterface('CanvasGradient', {}, CanvasGradient);
	_publicInterface('Document', {}, Document);
	_publicInterface('MessageEvent', {}, MessageEvent);
	_publicInterface('SVGElement', {}, SVGElement);
	_publicInterface('HTMLScriptElement', {}, HTMLScriptElement);
	_publicInterface('TextTrack', {
		'ERROR' : 3,
		'SHOWING' : 2,
		'LOADING' : 1,
		'LOADED' : 2,
		'NONE' : 0,
		'HIDDEN' : 1,
		'DISABLED' : 0
	}, TextTrack);
	_publicInterface('HTMLTableRowElement', {}, HTMLTableRowElement);
	_publicInterface('IDBRequest', {}, IDBRequest);
	_publicInterface('HTMLFrameElement', {}, HTMLFrameElement);
	_publicInterface('CSSMediaRule', {}, CSSMediaRule);
	_publicInterface('SVGPathSegLinetoHorizontalRel', {}, SVGPathSegLinetoHorizontalRel);
	_publicInterface('SVGEllipseElement', {}, SVGEllipseElement);
	_publicInterface('DataTransfer', {}, DataTransfer);
	_publicInterface('IDBFactory', {}, IDBFactory);
	_publicInterface('SVGAnimatedNumberList', {}, SVGAnimatedNumberList);
	_publicInterface('MSPluginsCollection', {}, MSPluginsCollection);
	_publicInterface('SVGTextElement', {}, SVGTextElement);
	_publicInterface('MSCurrentStyleCSSProperties', {}, MSCurrentStyleCSSProperties);
	_publicInterface('ValidityState', {}, ValidityState);
	_publicInterface('Storage', {}, Storage);
	_publicInterface('HTMLIFrameElement', {}, HTMLIFrameElement);
	_publicInterface('HTMLBodyElement', {}, HTMLBodyElement);
	_publicInterface('MutationEvent', {
		'MODIFICATION' : 1,
		'REMOVAL' : 3,
		'ADDITION' : 2
	}, MutationEvent);
	_publicInterface('DragEvent', {}, DragEvent);
	_publicInterface('ErrorEvent', {}, ErrorEvent);
	_publicInterface('SVGFilterElement', {}, SVGFilterElement);
	_publicInterface('SVGImageElement', {}, SVGImageElement);
	_publicInterface('PerformanceTiming', {}, PerformanceTiming);
	_publicInterface('EventException', {
		'DISPATCH_REQUEST_ERR' : 1,
		'UNSPECIFIED_EVENT_TYPE_ERR' : 0
	}, EventException);
	_publicInterface('SVGPathSegArcRel', {}, SVGPathSegArcRel);
	_publicInterface('SVGStringList', {}, SVGStringList);
	_publicInterface('SVGLength', {
		'SVG_LENGTHTYPE_NUMBER' : 1,
		'SVG_LENGTHTYPE_PC' : 10,
		'SVG_LENGTHTYPE_CM' : 6,
		'SVG_LENGTHTYPE_PERCENTAGE' : 2,
		'SVG_LENGTHTYPE_MM' : 7,
		'SVG_LENGTHTYPE_PT' : 9,
		'SVG_LENGTHTYPE_IN' : 8,
		'SVG_LENGTHTYPE_EMS' : 3,
		'SVG_LENGTHTYPE_UNKNOWN' : 0,
		'SVG_LENGTHTYPE_PX' : 5,
		'SVG_LENGTHTYPE_EXS' : 4
	}, SVGLength);
	_publicInterface('DOMError', {}, DOMError);
	_publicInterface('SVGPathSegCurvetoCubicRel', {}, SVGPathSegCurvetoCubicRel);
	_publicInterface('MSEventObj', {}, MSEventObj);
	_publicInterface('HTMLCanvasElement', {}, HTMLCanvasElement);
	_publicInterface('HTMLTitleElement', {}, HTMLTitleElement);
	_publicInterface('HTMLStyleElement', {}, HTMLStyleElement);
	_publicInterface('SVGTransform', {
		'SVG_TRANSFORM_SKEWX' : 5,
		'SVG_TRANSFORM_SCALE' : 3,
		'SVG_TRANSFORM_UNKNOWN' : 0,
		'SVG_TRANSFORM_TRANSLATE' : 2,
		'SVG_TRANSFORM_MATRIX' : 1,
		'SVG_TRANSFORM_ROTATE' : 4,
		'SVG_TRANSFORM_SKEWY' : 6
	}, SVGTransform);
	_publicInterface('UIEvent', {}, UIEvent);
	_publicInterface('IDBIndex', {}, IDBIndex);
	_publicInterface('SVGPathSeg', {
		'PATHSEG_CURVETO_CUBIC_SMOOTH_ABS' : 16,
		'PATHSEG_LINETO_VERTICAL_REL' : 15,
		'PATHSEG_MOVETO_REL' : 3,
		'PATHSEG_CURVETO_QUADRATIC_REL' : 9,
		'PATHSEG_CURVETO_CUBIC_ABS' : 6,
		'PATHSEG_LINETO_HORIZONTAL_ABS' : 12,
		'PATHSEG_CURVETO_QUADRATIC_ABS' : 8,
		'PATHSEG_LINETO_ABS' : 4,
		'PATHSEG_CLOSEPATH' : 1,
		'PATHSEG_LINETO_HORIZONTAL_REL' : 13,
		'PATHSEG_CURVETO_CUBIC_SMOOTH_REL' : 17,
		'PATHSEG_LINETO_REL' : 5,
		'PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS' : 18,
		'PATHSEG_ARC_REL' : 11,
		'PATHSEG_CURVETO_CUBIC_REL' : 7,
		'PATHSEG_UNKNOWN' : 0,
		'PATHSEG_LINETO_VERTICAL_ABS' : 14,
		'PATHSEG_ARC_ABS' : 10,
		'PATHSEG_MOVETO_ABS' : 2,
		'PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL' : 19
	}, SVGPathSeg);
	_publicInterface('SVGNumber', {}, SVGNumber);
	_publicInterface('MSCompatibleInfo', {}, MSCompatibleInfo);
	_publicInterface('SVGAnimatedRect', {}, SVGAnimatedRect);
	_publicInterface('Text', {}, Text);
	_publicInterface('CSSNamespaceRule', {}, CSSNamespaceRule);
	_publicInterface('HTMLUnknownElement', {}, HTMLUnknownElement);
	_publicInterface('PositionError', {
		'POSITION_UNAVAILABLE' : 2,
		'TIMEOUT' : 3,
		'PERMISSION_DENIED' : 1
	}, PositionError);
	_publicInterface('HTMLTableCellElement', {}, HTMLTableCellElement);
	_publicInterface('SVGElementInstance', {}, SVGElementInstance);
	_publicInterface('StyleSheetList', {}, StyleSheetList);
	_publicInterface('CustomEvent', {}, CustomEvent);
	_publicInterface('HTMLTextAreaElement', {}, HTMLTextAreaElement);
	_publicInterface('SVGRect', {}, SVGRect);
	_publicInterface('History', {}, History);
	_publicInterface('SVGPathSegCurvetoQuadraticAbs', {}, SVGPathSegCurvetoQuadraticAbs);
	_publicInterface('TimeRanges', {}, TimeRanges);
	_publicInterface('HTMLModElement', {}, HTMLModElement);
	_publicInterface('SVGUseElement', {}, SVGUseElement);
	_publicInterface('ImageData', {}, ImageData);
	_publicInterface('Event', {
		'AT_TARGET' : 2,
		'CAPTURING_PHASE' : 1,
		'BUBBLING_PHASE' : 3
	}, Event);
	_publicInterface('MSRangeCollection', {}, MSRangeCollection);
	_publicInterface('HTMLTableColElement', {}, HTMLTableColElement);
	_publicInterface('SVGException', {
		'SVG_MATRIX_NOT_INVERTABLE' : 2,
		'SVG_WRONG_TYPE_ERR' : 0,
		'SVG_INVALID_VALUE_ERR' : 1
	}, SVGException);
	_publicInterface('SVGAnimatedEnumeration', {}, SVGAnimatedEnumeration);
	_publicInterface('SVGFEFuncBElement', {}, SVGFEFuncBElement);
	_publicInterface('HTMLUListElement', {}, HTMLUListElement);
	_publicInterface('HTMLDivElement', {}, HTMLDivElement);
	_publicInterface('MediaList', {}, MediaList);
	_publicInterface('SVGPathSegCurvetoCubicSmoothRel', {}, SVGPathSegCurvetoCubicSmoothRel);
	_publicInterface('MSBehaviorUrnsCollection', {}, MSBehaviorUrnsCollection);
	_publicInterface('DocumentFragment', {}, DocumentFragment);
	_publicInterface('Position', {}, Position);
	_publicInterface('BookmarkCollection', {}, BookmarkCollection);
	_publicInterface('SVGFEColorMatrixElement', {
		'SVG_FECOLORMATRIX_TYPE_SATURATE' : 2,
		'SVG_FECOLORMATRIX_TYPE_UNKNOWN' : 0,
		'SVG_FECOLORMATRIX_TYPE_MATRIX' : 1,
		'SVG_FECOLORMATRIX_TYPE_HUEROTATE' : 3,
		'SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA' : 4
	}, SVGFEColorMatrixElement);
	_publicInterface('PerformanceMark', {}, PerformanceMark);
	_publicInterface('CSSPageRule', {}, CSSPageRule);
	_publicInterface('HTMLBRElement', {}, HTMLBRElement);
	_publicInterface('HTMLProgressElement', {}, HTMLProgressElement);
	_publicInterface('HTMLHeadElement', {}, HTMLHeadElement);
	_publicObject('SVGZoomAndPan', SVGZoomAndPan);
	_publicInterface('HTMLMediaElement', {
		'HAVE_CURRENT_DATA' : 2,
		'HAVE_METADATA' : 1,
		'HAVE_NOTHING' : 0,
		'NETWORK_NO_SOURCE' : 3,
		'HAVE_ENOUGH_DATA' : 4,
		'NETWORK_EMPTY' : 0,
		'NETWORK_LOADING' : 2,
		'NETWORK_IDLE' : 1,
		'HAVE_FUTURE_DATA' : 3
	}, HTMLMediaElement);
	_publicInterface('MSMimeTypesCollection', {}, MSMimeTypesCollection);
	_publicInterface('StyleSheet', {}, StyleSheet);
	_publicInterface('MessagePort', {}, MessagePort);
	_publicInterface('SVGTextPathElement', {
		'TEXTPATH_SPACINGTYPE_EXACT' : 2,
		'TEXTPATH_SPACINGTYPE_AUTO' : 1,
		'TEXTPATH_METHODTYPE_STRETCH' : 2,
		'TEXTPATH_SPACINGTYPE_UNKNOWN' : 0,
		'TEXTPATH_METHODTYPE_ALIGN' : 1,
		'TEXTPATH_METHODTYPE_UNKNOWN' : 0
	}, SVGTextPathElement);
	_publicInterface('NodeList', {}, NodeList);
	_publicInterface('PerformanceMeasure', {}, PerformanceMeasure);
	_publicInterface('SVGGradientElement', {
		'SVG_SPREADMETHOD_REFLECT' : 2,
		'SVG_SPREADMETHOD_PAD' : 1,
		'SVG_SPREADMETHOD_UNKNOWN' : 0,
		'SVG_SPREADMETHOD_REPEAT' : 3
	}, SVGGradientElement);
	_publicInterface('CSSKeyframeRule', {}, CSSKeyframeRule);
	_publicInterface('MSStream', {}, MSStream);
	_publicInterface('SVGNumberList', {}, SVGNumberList);
	_publicInterface('HTMLBGSoundElement', {}, HTMLBGSoundElement);
	_publicInterface('HTMLObjectElement', {}, HTMLObjectElement);
	_publicInterface('HTMLEmbedElement', {}, HTMLEmbedElement);
	_publicInterface('StorageEvent', {}, StorageEvent);
	_publicInterface('DOMException', {
		'NO_MODIFICATION_ALLOWED_ERR' : 7,
		'HIERARCHY_REQUEST_ERR' : 3,
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
		'DOMSTRING_SIZE_ERR' : 2,
		'SYNTAX_ERR' : 12,
		'SERIALIZE_ERR' : 82,
		'NOT_FOUND_ERR' : 8,
		'VALIDATION_ERR' : 16,
		'URL_MISMATCH_ERR' : 21,
		'PARSE_ERR' : 81,
		'NO_DATA_ALLOWED_ERR' : 6,
		'NOT_SUPPORTED_ERR' : 9,
		'TIMEOUT_ERR' : 23,
		'INVALID_ACCESS_ERR' : 15,
		'INUSE_ATTRIBUTE_ERR' : 10
	}, DOMException);
	_publicInterface('SVGAnimatedBoolean', {}, SVGAnimatedBoolean);
	_publicInterface('MSManipulationEvent', {
		'MS_MANIPULATION_STATE_STOPPED' : 0,
		'MS_MANIPULATION_STATE_ACTIVE' : 1,
		'MS_MANIPULATION_STATE_INERTIA' : 2
	}, MSManipulationEvent);
	_publicInterface('SVGFECompositeElement', {
		'SVG_FECOMPOSITE_OPERATOR_OUT' : 3,
		'SVG_FECOMPOSITE_OPERATOR_OVER' : 1,
		'SVG_FECOMPOSITE_OPERATOR_XOR' : 5,
		'SVG_FECOMPOSITE_OPERATOR_ARITHMETIC' : 6,
		'SVG_FECOMPOSITE_OPERATOR_UNKNOWN' : 0,
		'SVG_FECOMPOSITE_OPERATOR_IN' : 2,
		'SVG_FECOMPOSITE_OPERATOR_ATOP' : 4
	}, SVGFECompositeElement);
	_publicInterface('SVGElementInstanceList', {}, SVGElementInstanceList);
	_publicInterface('SVGSymbolElement', {}, SVGSymbolElement);
	_publicInterface('HTMLVideoElement', {}, HTMLVideoElement);
	_publicInterface('SVGFEDiffuseLightingElement', {}, SVGFEDiffuseLightingElement);
	_publicInterface('SVGFEComponentTransferElement', {}, SVGFEComponentTransferElement);
	_publicInterface('TrackEvent', {}, TrackEvent);
	_publicInterface('SVGFEMergeNodeElement', {}, SVGFEMergeNodeElement);
	_publicInterface('SVGFEFloodElement', {}, SVGFEFloodElement);
	_publicInterface('SVGPathSegCurvetoQuadraticRel', {}, SVGPathSegCurvetoQuadraticRel);
	_publicInterface('Performance', {}, Performance);
	_publicInterface('CompositionEvent', {}, CompositionEvent);
	_publicInterface('SVGMarkerElement', {
		'SVG_MARKER_ORIENT_ANGLE' : 2,
		'SVG_MARKER_ORIENT_UNKNOWN' : 0,
		'SVG_MARKERUNITS_STROKEWIDTH' : 2,
		'SVG_MARKERUNITS_UNKNOWN' : 0,
		'SVG_MARKER_ORIENT_AUTO' : 1,
		'SVG_MARKERUNITS_USERSPACEONUSE' : 1
	}, SVGMarkerElement);
	_publicInterface('MSStyleCSSProperties', {}, MSStyleCSSProperties);
	_publicInterface('SVGFEMergeElement', {}, SVGFEMergeElement);
	_publicInterface('SVGPathSegCurvetoCubicSmoothAbs', {}, SVGPathSegCurvetoCubicSmoothAbs);
	_publicInterface('TransitionEvent', {}, TransitionEvent);
	_publicInterface('HTMLTableDataCellElement', {}, HTMLTableDataCellElement);
	_publicInterface('IDBObjectStore', {}, IDBObjectStore);
	_publicInterface('IDBVersionChangeEvent', {}, IDBVersionChangeEvent);
	_publicInterface('HTMLNextIdElement', {}, HTMLNextIdElement);
	_publicInterface('SVGPathSegMovetoRel', {}, SVGPathSegMovetoRel);
	_publicInterface('SVGFESpecularLightingElement', {}, SVGFESpecularLightingElement);
	_publicInterface('SVGDescElement', {}, SVGDescElement);
	_publicInterface('SVGClipPathElement', {}, SVGClipPathElement);
	_publicInterface('IDBCursorWithValue', {}, IDBCursorWithValue);
	_publicInterface('HTMLAppletElement', {}, HTMLAppletElement);
	_publicInterface('TextMetrics', {}, TextMetrics);
	_publicInterface('SVGAnimatedString', {}, SVGAnimatedString);
	_publicInterface('SVGPathSegLinetoVerticalRel', {}, SVGPathSegLinetoVerticalRel);
	_publicInterface('CDATASection', {}, CDATASection);
	_publicInterface('HTMLSelectElement', {}, HTMLSelectElement);
	_publicInterface('CSSStyleSheet', {}, CSSStyleSheet);
	_publicInterface('MSSelection', {}, MSSelection);
	_publicInterface('HTMLMetaElement', {}, HTMLMetaElement);
	_publicInterface('Selection', {}, Selection);
	_publicInterface('SVGAnimatedAngle', {}, SVGAnimatedAngle);
	_publicInterface('SVGScriptElement', {}, SVGScriptElement);
	_publicInterface('NodeIterator', {}, NodeIterator);
	_publicInterface('CSSStyleRule', {}, CSSStyleRule);
	_publicInterface('SVGFEDistantLightElement', {}, SVGFEDistantLightElement);
	_publicInterface('SVGTitleElement', {}, SVGTitleElement);
	_publicInterface('HTMLTableCaptionElement', {}, HTMLTableCaptionElement);
	_publicInterface('SVGAnimatedTransformList', {}, SVGAnimatedTransformList);
	_publicInterface('SVGFEConvolveMatrixElement', {
		'SVG_EDGEMODE_WRAP' : 2,
		'SVG_EDGEMODE_DUPLICATE' : 1,
		'SVG_EDGEMODE_UNKNOWN' : 0,
		'SVG_EDGEMODE_NONE' : 3
	}, SVGFEConvolveMatrixElement);
	_publicInterface('AudioTrack', {}, AudioTrack);
	_publicInterface('CSSKeyframesRule', {}, CSSKeyframesRule);
	_publicInterface('TextTrackList', {}, TextTrackList);
	_publicInterface('SVGFEFuncGElement', {}, SVGFEFuncGElement);
	_publicInterface('MSSiteModeEvent', {}, MSSiteModeEvent);
	_publicInterface('MSCSSProperties', {}, MSCSSProperties);
	_publicInterface('HTMLCollection', {}, HTMLCollection);
	_publicInterface('HTMLAreaElement', {}, HTMLAreaElement);
	_publicInterface('IDBDatabase', {}, IDBDatabase);
	_publicInterface('SVGAngle', {
		'SVG_ANGLETYPE_RAD' : 3,
		'SVG_ANGLETYPE_UNSPECIFIED' : 1,
		'SVG_ANGLETYPE_UNKNOWN' : 0,
		'SVG_ANGLETYPE_GRAD' : 4,
		'SVG_ANGLETYPE_DEG' : 2
	}, SVGAngle);
	_publicInterface('DOMStringList', {}, DOMStringList);
	_publicInterface('HTMLButtonElement', {}, HTMLButtonElement);
	_publicInterface('IDBOpenDBRequest', {}, IDBOpenDBRequest);
	_publicInterface('HTMLSourceElement', {}, HTMLSourceElement);
	_publicInterface('KeyboardEvent', {
		'DOM_KEY_LOCATION_RIGHT' : 0x02,
		'DOM_KEY_LOCATION_LEFT' : 0x01,
		'DOM_KEY_LOCATION_STANDARD' : 0x00,
		'DOM_KEY_LOCATION_NUMPAD' : 0x03,
		'DOM_KEY_LOCATION_JOYSTICK' : 0x05,
		'DOM_KEY_LOCATION_MOBILE' : 0x04
	}, KeyboardEvent);
	_publicInterface('MSCSSRuleList', {}, MSCSSRuleList);
	_publicInterface('CanvasRenderingContext2D', {}, CanvasRenderingContext2D);
	_publicInterface('SVGPathSegLinetoHorizontalAbs', {}, SVGPathSegLinetoHorizontalAbs);
	_publicInterface('SVGPathSegArcAbs', {}, SVGPathSegArcAbs);
	_publicInterface('HTMLHtmlElement', {}, HTMLHtmlElement);
	_publicInterface('SVGTransformList', {}, SVGTransformList);
	_publicInterface('SVGPathSegClosePath', {}, SVGPathSegClosePath);
	_publicInterface('SVGAnimatedLength', {}, SVGAnimatedLength);
	_publicInterface('HTMLQuoteElement', {}, HTMLQuoteElement);
	_publicInterface('SVGDefsElement', {}, SVGDefsElement);
	_publicInterface('ApplicationCache', {
		'CHECKING' : 2,
		'UNCACHED' : 0,
		'UPDATEREADY' : 4,
		'DOWNLOADING' : 3,
		'IDLE' : 1,
		'OBSOLETE' : 5
	}, ApplicationCache);
	_publicInterface('HTMLTableHeaderCellElement', {}, HTMLTableHeaderCellElement);
	_publicInterface('HTMLDListElement', {}, HTMLDListElement);
	_publicInterface('SVGAElement', {}, SVGAElement);
	_publicInterface('HTMLFrameSetElement', {}, HTMLFrameSetElement);
	_publicInterface('Screen', {}, Screen);
	_publicInterface('Coordinates', {}, Coordinates);
	_publicInterface('FocusEvent', {}, FocusEvent);
	_publicInterface('DOMSettableTokenList', {}, DOMSettableTokenList);
	_publicInterface('Range', {
		'END_TO_END' : 2,
		'END_TO_START' : 3,
		'START_TO_END' : 1,
		'START_TO_START' : 0
	}, Range);
	_publicInterface('SVGPoint', {}, SVGPoint);
	_publicInterface('MSPointerEvent', {
		'MSPOINTER_TYPE_PEN' : 0x00000003,
		'MSPOINTER_TYPE_MOUSE' : 0x00000004,
		'MSPOINTER_TYPE_TOUCH' : 0x00000002
	}, MSPointerEvent);
	_publicInterface('SVGSVGElement', {}, SVGSVGElement);
	_publicInterface('HTMLLabelElement', {}, HTMLLabelElement);
	_publicInterface('HTMLLegendElement', {}, HTMLLegendElement);
	_publicInterface('HTMLDirectoryElement', {}, HTMLDirectoryElement);
	_publicInterface('SVGAnimatedInteger', {}, SVGAnimatedInteger);
	_publicInterface('SVGTSpanElement', {}, SVGTSpanElement);
	_publicInterface('HTMLLIElement', {}, HTMLLIElement);
	_publicInterface('SVGPathSegLinetoVerticalAbs', {}, SVGPathSegLinetoVerticalAbs);
	_publicInterface('SVGFEImageElement', {}, SVGFEImageElement);
	_publicInterface('SVGStyleElement', {}, SVGStyleElement);
	_publicObject('MSApp', MSApp);
	_publicInterface('TextRangeCollection', {}, TextRangeCollection);
	_publicInterface('DocumentType', {}, DocumentType);
	_publicInterface('SVGRadialGradientElement', {}, SVGRadialGradientElement);
	_publicInterface('MSGestureEvent', {
		'MSGESTURE_FLAG_BEGIN' : 0x00000001,
		'MSGESTURE_FLAG_END' : 0x00000002,
		'MSGESTURE_FLAG_CANCEL' : 0x00000004,
		'MSGESTURE_FLAG_INERTIA' : 0x00000008,
		'MSGESTURE_FLAG_NONE' : 0x00000000
	}, MSGestureEvent);
	_publicInterface('HTMLTableSectionElement', {}, HTMLTableSectionElement);
	_publicInterface('HTMLAnchorElement', {}, HTMLAnchorElement);
	_publicInterface('HTMLInputElement', {}, HTMLInputElement);
	_publicInterface('HTMLParamElement', {}, HTMLParamElement);
	_publicInterface('SVGAnimatedNumber', {}, SVGAnimatedNumber);
	_publicInterface('HTMLPreElement', {}, HTMLPreElement);
	_publicInterface('DOMTokenList', {}, DOMTokenList);
	_publicInterface('SVGMetadataElement', {}, SVGMetadataElement);
	_publicInterface('SVGPathSegMovetoAbs', {}, SVGPathSegMovetoAbs);
	_publicInterface('SVGPolygonElement', {}, SVGPolygonElement);
	_publicInterface('HTMLPhraseElement', {}, HTMLPhraseElement);
	_publicInterface('SVGTextContentElement', {
		'LENGTHADJUST_SPACING' : 1,
		'LENGTHADJUST_SPACINGANDGLYPHS' : 2,
		'LENGTHADJUST_UNKNOWN' : 0
	}, SVGTextContentElement);
	_publicInterface('Location', {}, Location);
	_publicInterface('SVGFEGaussianBlurElement', {}, SVGFEGaussianBlurElement);
	_publicInterface('PerformanceEntry', {}, PerformanceEntry);
	_publicInterface('WheelEvent', {
		'DOM_DELTA_PIXEL' : 0x00,
		'DOM_DELTA_LINE' : 0x01,
		'DOM_DELTA_PAGE' : 0x02
	}, WheelEvent);
	_publicInterface('SVGPathElement', {}, SVGPathElement);
	_publicInterface('SVGPathSegList', {}, SVGPathSegList);
	_publicInterface('IDBCursor', {}, IDBCursor);
	_publicInterface('HTMLAudioElement', {}, HTMLAudioElement);
	_publicInterface('SVGCircleElement', {}, SVGCircleElement);
	_publicInterface('HTMLBaseFontElement', {}, HTMLBaseFontElement);
	_publicInterface('CSSImportRule', {}, CSSImportRule);
	_publicInterface('Geolocation', {}, Geolocation);
	_publicInterface('HTMLMarqueeElement', {}, HTMLMarqueeElement);
	_publicInterface('SVGPathSegCurvetoCubicAbs', {}, SVGPathSegCurvetoCubicAbs);
	_publicInterface('SVGFEFuncRElement', {}, SVGFEFuncRElement);
	_publicInterface('CSSRule', {
		'VIEWPORT_RULE' : 15,
		'KEYFRAME_RULE' : 8,
		'FONT_FACE_RULE' : 5,
		'IMPORT_RULE' : 3,
		'MEDIA_RULE' : 4,
		'STYLE_RULE' : 1,
		'KEYFRAMES_RULE' : 7,
		'NAMESPACE_RULE' : 10,
		'PAGE_RULE' : 6,
		'UNKNOWN_RULE' : 0,
		'CHARSET_RULE' : 2
	}, CSSRule);
	_publicInterface('SVGFEDisplacementMapElement', {
		'SVG_CHANNEL_B' : 3,
		'SVG_CHANNEL_R' : 1,
		'SVG_CHANNEL_G' : 2,
		'SVG_CHANNEL_UNKNOWN' : 0,
		'SVG_CHANNEL_A' : 4
	}, SVGFEDisplacementMapElement);
	_publicInterface('SVGPathSegLinetoAbs', {}, SVGPathSegLinetoAbs);
	_publicInterface('BeforeUnloadEvent', {}, BeforeUnloadEvent);
	_publicInterface('MSPopupWindow', {}, MSPopupWindow);
	_publicInterface('SVGMatrix', {}, SVGMatrix);
	_publicInterface('SVGLinearGradientElement', {}, SVGLinearGradientElement);
	_publicInterface('SVGRectElement', {}, SVGRectElement);
	_publicInterface('IDBKeyRange', {
		'bound' : IDBKeyRange ['bound'],
		'only' : IDBKeyRange ['only'],
		'lowerBound' : IDBKeyRange ['lowerBound'],
		'upperBound' : IDBKeyRange ['upperBound']
	}, IDBKeyRange);
	_publicInterface('NamedNodeMap', {}, NamedNodeMap);
	_publicInterface('SVGPathSegCurvetoQuadraticSmoothAbs', {}, SVGPathSegCurvetoQuadraticSmoothAbs);
	_publicInterface('SVGLengthList', {}, SVGLengthList);
	_publicInterface('ProcessingInstruction', {}, ProcessingInstruction);
	_publicInterface('CSSFontFaceRule', {}, CSSFontFaceRule);
	_publicInterface('TextEvent', {
		'DOM_INPUT_METHOD_DROP' : 0x03,
		'DOM_INPUT_METHOD_KEYBOARD' : 0x01,
		'DOM_INPUT_METHOD_IME' : 0x04,
		'DOM_INPUT_METHOD_SCRIPT' : 0x09,
		'DOM_INPUT_METHOD_VOICE' : 0x07,
		'DOM_INPUT_METHOD_UNKNOWN' : 0x00,
		'DOM_INPUT_METHOD_PASTE' : 0x02,
		'DOM_INPUT_METHOD_HANDWRITING' : 0x06,
		'DOM_INPUT_METHOD_OPTION' : 0x05,
		'DOM_INPUT_METHOD_MULTIMODAL' : 0x08
	}, TextEvent);
	_publicInterface('SVGPolylineElement', {}, SVGPolylineElement);
	_publicInterface('HTMLSpanElement', {}, HTMLSpanElement);
	_publicInterface('SVGFEOffsetElement', {}, SVGFEOffsetElement);
	_publicInterface('HTMLHeadingElement', {}, HTMLHeadingElement);
	_publicInterface('HTMLFormElement', {}, HTMLFormElement);
	_publicInterface('HTMLDTElement', {}, HTMLDTElement);
	_publicInterface('PopStateEvent', {}, PopStateEvent);
	_publicObject('NodeFilter', NodeFilter);
	_publicInterface('HTMLFieldSetElement', {}, HTMLFieldSetElement);
	_publicInterface('MediaError', {
		'MEDIA_ERR_SRC_NOT_SUPPORTED' : 4,
		'MEDIA_ERR_NETWORK' : 2,
		'MEDIA_ERR_ABORTED' : 1,
		'MEDIA_ERR_DECODE' : 3
	}, MediaError);
	_publicInterface('HTMLElement', {}, HTMLElement);
	_publicInterface('Comment', {}, Comment);
	_publicInterface('PerformanceResourceTiming', {}, PerformanceResourceTiming);
	_publicInterface('CanvasPattern', {}, CanvasPattern);
	_publicInterface('HTMLHRElement', {}, HTMLHRElement);
	_publicInterface('CharacterData', {}, CharacterData);
	_publicInterface('HTMLOptGroupElement', {}, HTMLOptGroupElement);
	_publicInterface('HTMLIsIndexElement', {}, HTMLIsIndexElement);
	_publicInterface('SVGPathSegLinetoRel', {}, SVGPathSegLinetoRel);
	_publicInterface('MSCompatibleInfoCollection', {}, MSCompatibleInfoCollection);
	_publicInterface('SVGSwitchElement', {}, SVGSwitchElement);
	_publicInterface('SVGPreserveAspectRatio', {
		'SVG_PRESERVEASPECTRATIO_XMINYMID' : 5,
		'SVG_PRESERVEASPECTRATIO_NONE' : 1,
		'SVG_PRESERVEASPECTRATIO_XMAXYMIN' : 4,
		'SVG_PRESERVEASPECTRATIO_XMAXYMAX' : 10,
		'SVG_PRESERVEASPECTRATIO_XMINYMAX' : 8,
		'SVG_MEETORSLICE_UNKNOWN' : 0,
		'SVG_PRESERVEASPECTRATIO_XMINYMIN' : 2,
		'SVG_PRESERVEASPECTRATIO_XMAXYMID' : 7,
		'SVG_PRESERVEASPECTRATIO_XMIDYMAX' : 9,
		'SVG_MEETORSLICE_MEET' : 1,
		'SVG_PRESERVEASPECTRATIO_XMIDYMIN' : 3,
		'SVG_PRESERVEASPECTRATIO_XMIDYMID' : 6,
		'SVG_MEETORSLICE_SLICE' : 2,
		'SVG_PRESERVEASPECTRATIO_UNKNOWN' : 0
	}, SVGPreserveAspectRatio);
	_publicInterface('Attr', {}, Attr);
	_publicInterface('PerformanceNavigation', {
		'TYPE_RELOAD' : 1,
		'TYPE_RESERVED' : 255,
		'TYPE_BACK_FORWARD' : 2,
		'TYPE_NAVIGATE' : 0
	}, PerformanceNavigation);
	_publicInterface('HTMLDataListElement', {}, HTMLDataListElement);
	_publicInterface('SVGStopElement', {}, SVGStopElement);
	_publicInterface('CSSRuleList', {}, CSSRuleList);
	_publicInterface('HTMLTrackElement', {}, HTMLTrackElement);
	_publicInterface('ClientRectList', {}, ClientRectList);
	_publicInterface('SVGMaskElement', {}, SVGMaskElement);

	_publicInterface('MessageChannel', MessageChannelCtor , MessageChannel);
	_publicInterface('MSBlobBuilder', MSBlobBuilderCtor , MSBlobBuilder);
	_publicInterface('MSStreamReader', MSStreamReaderCtor , MSStreamReader);
	_publicInterface('XDomainRequest', XDomainRequestCtor , XDomainRequest);
	_publicInterface('FileReader', FileReaderCtor , FileReader);
	_publicInterface('XMLSerializer', XMLSerializerCtor , XMLSerializer);
	_publicInterface('FormData', FormDataCtor , FormData);
	_publicInterface('MSGesture', MSGestureCtor , MSGesture);
	_publicInterface('XMLHttpRequest', XMLHttpRequestCtor , XMLHttpRequest);
	_publicInterface('Worker', WorkerCtor , Worker);
	_publicInterface('WebSocket', WebSocketCtor , WebSocket);
	_publicInterface('DOMParser', DOMParserCtor , DOMParser);
	_publicInterface('Blob', BlobCtor , Blob);
	_publicInterface('MSCSSMatrix', MSCSSMatrixCtor , MSCSSMatrix);


	function HTMLOptionElementFactory (text, value, defaultSelected, selected) {
		/// <signature>
		/// <param name='text' type='String' optional='true' />
		/// <param name='value' type='String' optional='true' />
		/// <param name='defaultSelected' type='Boolean' optional='true' />
		/// <param name='selected' type='Boolean' optional='true' />
		/// </signature>
		return Object.create(HTMLOptionElement);
	}

	function HTMLImageElementFactory(width, height) {
		/// <signature>
		/// <param name='width' type='Number' optional='true' />
		/// <param name='height' type='Number' optional='true' />
		/// </signature>
		return Object.create(HTMLImageElement);
	}

	function HTMLAudioElementFactory(src) {
		/// <signature>
		/// <param name='src' type='String' optional='true' />
		/// </signature>
		return Object.create(HTMLAudioElement);
	}
	
	_publicInterface('Option', HTMLOptionElementFactory, HTMLOptionElement);
	_publicInterface('Image', HTMLImageElementFactory, HTMLImageElement);
	_publicInterface('Audio', HTMLAudioElementFactory, HTMLAudioElement);
	
	intellisense.annotate(window, {
		Worker: function() {
			/// <signature>
			/// <param name='stringUrl' type='String' />
			/// </signature>
		},
		MSCSSMatrix: function () {
			/// <signature>
			/// <param name='text' type='String' optional='true' />
			/// </signature>
		},
		WebSocket: function() {
			/// <signature>
			/// <param name='url' type='String' />
			/// <param name='protocols' type='String' optional='true' />
			/// </signature>
			/// <signature>
			/// <param name='url' type='String' />
			/// <param name='protocols' type='Array' elementType='String' optional='true' />
			/// </signature>
		}
	});	

	window['Option'].create = window['Option'];
	window['Image'].create = window['Image'];
	window['XDomainRequest'].create = window['XDomainRequest'];
	window['XMLHttpRequest'].create = window['XMLHttpRequest'];

})();

function _$getActiveXObject(className, location) {
	if ((/XMLHTTP/i).test(className))
		return new window.XMLHttpRequest();
}

// SIG // Begin signature block
// SIG // MIIaqwYJKoZIhvcNAQcCoIIanDCCGpgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFAmRenD2vX2Z
// SIG // TI4IpK00TMEVqm9zoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAArOTJIwbLJSPMAAAAAACswDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEyMDkwNDIx
// SIG // MTIzNFoXDTEzMTIwNDIxMTIzNFowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpDMEY0LTMwODYtREVGODEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAKa2MA4DZa5QWoZrhZ9IoR7JwO5eSQeF4HCWfL65
// SIG // X2JfBibTizm7GCKlLpKt2EuIOhqvm4OuyF45jMIyexZ4
// SIG // 7Tc4OvFi+2iCAmjs67tAirH+oSw2YmBwOWBiDvvGGDhv
// SIG // sJLWQA2Apg14izZrhoomFxj/sOtNurspE+ZcSI5wRjYm
// SIG // /jQ1qzTh99rYXOqZfTG3TR9X63zWlQ1mDB4OMhc+LNWA
// SIG // oc7r95iRAtzBX/04gPg5f11kyjdcO1FbXYVfzh4c+zS+
// SIG // X+UoVXBUnLjsfABVRlsomChWTOHxugkZloFIKjDI9zMg
// SIG // bOdpw7PUw07PMB431JhS1KkjRbKuXEFJT7RiaJMCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBSlGDNTP5VgoUMW747G
// SIG // r9Irup5Y0DAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQB+zLB75S++
// SIG // 51a1z3PbqlLRFjnGtM361/4eZbXnSPObRogFZmomhl7+
// SIG // h1jcxmOOOID0CEZ8K3OxDr9BqsvHqpSkN/BkOeHF1fnO
// SIG // B86r5CXwaa7URuL+ZjI815fFMiH67holoF4MQiwRMzqC
// SIG // g/3tHbO+zpGkkSVxuatysJ6v5M8AYolwqbhKUIzuLyJk
// SIG // pajmTWuVLBx57KejMdqQYJCkbv6TAg0/LCQNxmomgVGD
// SIG // ShC7dWNEqmkIxgPr4s8L7VY67O9ypwoM9ADTIrivInKz
// SIG // 58ScCyiggMrj4dc5ZjDnRhcY5/qC+lkLeryoDf4c/wOL
// SIG // Y7JNEgIjTy2zhYQ74qFH6M8VMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAALARrwqL0Duf3QABAAAAsDANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xMzAx
// SIG // MjQyMjMzMzlaFw0xNDA0MjQyMjMzMzlaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDor1yiIA34
// SIG // KHy8BXt/re7rdqwoUz8620B9s44z5lc/pVEVNFSlz7SL
// SIG // qT+oN+EtUO01Fk7vTXrbE3aIsCzwWVyp6+HXKXXkG4Un
// SIG // m/P4LZ5BNisLQPu+O7q5XHWTFlJLyjPFN7Dz636o9UEV
// SIG // XAhlHSE38Cy6IgsQsRCddyKFhHxPuRuQsPWj/ov0DJpO
// SIG // oPXJCiHiquMBNkf9L4JqgQP1qTXclFed+0vUDoLbOI8S
// SIG // /uPWenSIZOFixCUuKq6dGB8OHrbCryS0DlC83hyTXEmm
// SIG // ebW22875cHsoAYS4KinPv6kFBeHgD3FN/a1cI4Mp68fF
// SIG // SsjoJ4TTfsZDC5UABbFPZXHFAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUWXGm
// SIG // WjNN2pgHgP+EHr6H+XIyQfIwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1KzRm
// SIG // YWYwYjcxLWFkMzctNGFhMy1hNjcxLTc2YmMwNTIzNDRh
// SIG // ZDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAMdduKhJXM4HVncbr+TrURE0Inu5e32pbt3nPApy8
// SIG // dmiekKGcC8N/oozxTbqVOfsN4OGb9F0kDxuNiBU6fNut
// SIG // zrPJbLo5LEV9JBFUJjANDf9H6gMH5eRmXSx7nR2pEPoc
// SIG // sHTyT2lrnqkkhNrtlqDfc6TvahqsS2Ke8XzAFH9IzU2y
// SIG // RPnwPJNtQtjofOYXoJtoaAko+QKX7xEDumdSrcHps3Om
// SIG // 0mPNSuI+5PNO/f+h4LsCEztdIN5VP6OukEAxOHUoXgSp
// SIG // Rm3m9Xp5QL0fzehF1a7iXT71dcfmZmNgzNWahIeNJDD3
// SIG // 7zTQYx2xQmdKDku/Og7vtpU6pzjkJZIIpohmgjCCBbww
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
// SIG // L54/LlUWa8kTo/0xggSVMIIEkQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAALARrwqL0Duf3QAB
// SIG // AAAAsDAJBgUrDgMCGgUAoIGuMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSaVtxTPfqD
// SIG // okHudGCKqXmjHRtDlTBOBgorBgEEAYI3AgEMMUAwPqAk
// SIG // gCIAZABvAG0AVwBpAG4AZABvAHcAcwBfADgALgAwAC4A
// SIG // agBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29tMA0GCSqG
// SIG // SIb3DQEBAQUABIIBAClcheobrLq16BCGc0GjbZ0zXKHn
// SIG // mr39bVl7Q1Zh11uTWVe3Zw35hxPuaoqR8FJgbSsN+ek6
// SIG // 73OMHbj614wOblMjo5BKI/E6bz63jTgSPTei8gdk2EPx
// SIG // 4HTtDCqhKMOReCBzFYD2yXcBVplP7poyIqhFBbunu30y
// SIG // 5gP+hHImfO6qxt9n1PyGQuLMf9WIqUl8JayYc758IWmk
// SIG // /ASgiwbPINutVKkuvVQipHpfp4pFydxU3z4amkBJSAYk
// SIG // YLCQwihtUo5ew0oO8jurMWdfsrCFNkl+ni7mc+IqgWcV
// SIG // +yEnGExQVFO7q64WVpJL1IS1iyfQK0YzQCOGObG539Jq
// SIG // 5P5qmpyhggIoMIICJAYJKoZIhvcNAQkGMYICFTCCAhEC
// SIG // AQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UE
// SIG // AxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBAhMzAAAA
// SIG // KzkySMGyyUjzAAAAAAArMAkGBSsOAwIaBQCgXTAYBgkq
// SIG // hkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJ
// SIG // BTEPFw0xMzEwMDUwODUxMTRaMCMGCSqGSIb3DQEJBDEW
// SIG // BBQHCExHsk0yudcGriRf5Bg++3cYHzANBgkqhkiG9w0B
// SIG // AQUFAASCAQAb48tybzPgBTqMOFtK6p8q9qxH6MMGk2VL
// SIG // 7VBVynzNPZ+cYiuN10aChhucI154y5NTAiM9xs8fNhlr
// SIG // xsoCOVBwJ9n6QwNO06eieJAjZ3SUxvmvyTd1GW8UQNMc
// SIG // TfLDMTKapzi/cAMG5xYgpaboxtI0nuDSKxJtASYY2/iz
// SIG // yvb87arJ3q1jhbmOb1pUOgkLewD6JTeACI9a+QLOlqYQ
// SIG // Pul0RwCo7/UHBXd5lk1nryk/QJdO/5Fql3GwV6rPonBU
// SIG // sDfJKmvO42yW5V5uYruIaFa7lDr+Filzc9UG44r0dSy8
// SIG // EqJZjO+fJdtV0/W2+g/K3Y5QofU2bXXRS79yhZpdXWbx
// SIG // End signature block
