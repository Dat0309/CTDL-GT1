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
				case 'devicemotion':
					return DeviceMotionEvent;
				case 'deviceorientation':
					return DeviceOrientationEvent;
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
				case 'mselementresize':
				case 'MSOrientationChange':
				case 'MSRegionUpdate':
				case 'mssitepinned':
				case 'MSWebViewUnsafeContentWarningDisplaying':
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
				case 'mskeymessage':
					return MSMediaKeyMessageEvent;
				case 'msneedkey':
					return MSMediaKeyNeededEvent;
				case 'MSGotPointerCapture':
				case 'MSLostPointerCapture':
				case 'MSPointerCancel':
				case 'MSPointerDown':
				case 'MSPointerEnter':
				case 'MSPointerHover':
				case 'MSPointerLeave':
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
				case 'pagehide':
				case 'pageshow':
					return PageTransitionEvent;
				case 'removetrack':
					return PluginArray;
				case 'gotpointercapture':
				case 'lostpointercapture':
				case 'pointercancel':
				case 'pointerdown':
				case 'pointerenter':
				case 'pointerleave':
				case 'pointermove':
				case 'pointerout':
				case 'pointerover':
				case 'pointerup':
					return PointerEvent;
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
				case 'devicemotion':
					return DeviceMotionEvent;
				case 'deviceorientation':
					return DeviceOrientationEvent;
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
				case 'mselementresize':
				case 'msorientationchange':
				case 'msregionupdate':
				case 'mssitepinned':
				case 'mswebviewunsafecontentwarningdisplaying':
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
				case 'mskeymessage':
					return MSMediaKeyMessageEvent;
				case 'msneedkey':
					return MSMediaKeyNeededEvent;
				case 'msgotpointercapture':
				case 'mslostpointercapture':
				case 'mspointercancel':
				case 'mspointerdown':
				case 'mspointerenter':
				case 'mspointerhover':
				case 'mspointerleave':
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
				case 'pagehide':
				case 'pageshow':
					return PageTransitionEvent;
				case 'removetrack':
					return PluginArray;
				case 'gotpointercapture':
				case 'lostpointercapture':
				case 'pointercancel':
				case 'pointerdown':
				case 'pointerenter':
				case 'pointerleave':
				case 'pointermove':
				case 'pointerout':
				case 'pointerover':
				case 'pointerup':
					return PointerEvent;
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
            results = [Object.create(_getElementByTagName(selectors) || HTMLElement)];
        return _wrapInList(results, NodeList);
    }

    function _querySelector(obj, selectors) {
        var results = _queryIdSelector(selectors, true);
        if (!result)
            result = _$getTrackingNull(Object.create(_getElementByTagName(selectors) || HTMLElement));
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


    function _getConstructorFromString(type) {
        if (!typeof type === "string") {
            return;
        }

        var typeParts = type.split(".");
        var ctor = _$globalObject;
        var i;
        for (i = 0; i < typeParts.length && ctor; i++) {
            ctor = ctor[typeParts[i]];
        }

        if (typeof ctor === "function") {
            return ctor;
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

                    // Add winControl property if there is a data-win-control attribute
                    if (typeof e["data-win-control"] === "string") {
                        var winControlType = e["data-win-control"];
                        element.winControl = _$initVar(undefined, {
                            ctor: _getConstructorFromString(winControlType),
                            type: winControlType,
                            isUnsafeType: true
                        });
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


	var External = {};
	var GlobalEventHandlers = {};
	var ElementTraversal = {};
	var SVGLangSpace = {};
	var SVGStylable = {};
	var EventTarget = {};
	var Node = {};
	var NodeSelector = {};
	var Element = _$inherit(Node);
	var SVGElement = _$inherit(Element);
	var SVGExternalResourcesRequired = {};
	var SVGTests = {};
	var SVGUnitTypes = {};
	var SVGMaskElement = _$inherit(SVGElement);
	var ClientRectList = {};
	var MSCSSMatrix = {};
	var MSCSSMatrixCtor = function() { return Object.create(MSCSSMatrix); };
	var OES_texture_float_linear = {};
	var SVGFilterPrimitiveStandardAttributes = _$inherit(SVGStylable);
	var SVGFEComponentTransferElement = _$inherit(SVGElement);
	var SVGFEDiffuseLightingElement = _$inherit(SVGElement);
	var ElementCSSInlineStyle = {};
	var MSNodeExtensions = {};
	var MSEventAttachmentTarget = {};
	var HTMLElement = _$inherit(Element);
	var HTMLMediaElement = _$inherit(HTMLElement);
	var HTMLVideoElement = _$inherit(HTMLMediaElement);
	var HTMLTrackElement = _$inherit(HTMLElement);
	var MSMediaKeySession = {};
	var LinkStyle = {};
	var CSSRuleList = {};
	var MSDataBindingRecordSetExtensions = {};
	var MutationCallback = {};
	var SVGFitToViewBox = {};
	var SVGSymbolElement = _$inherit(SVGElement);
	var SVGElementInstanceList = {};
	var Event = {};
	var PageTransitionEvent = _$inherit(Event);
	var SVGFECompositeElement = _$inherit(SVGElement);
	var SVGStopElement = _$inherit(SVGElement);
	var PositionCallback = {};
	var HTMLDataListElement = _$inherit(HTMLElement);
	var PerformanceNavigation = {};
	var Attr = _$inherit(Node);
	var SVGPreserveAspectRatio = {};
	var SVGLocatable = {};
	var SVGTransformable = _$inherit(SVGLocatable);
	var SVGSwitchElement = _$inherit(SVGElement);
	var FormData = {};
	var FormDataCtor = function() { return Object.create(FormData); };
	var UIEvent = _$inherit(Event);
	var MSManipulationEvent = _$inherit(UIEvent);
	var SVGAnimatedBoolean = {};
	var MSCompatibleInfoCollection = {};
	var OES_texture_float = {};
	var DOMException = {};
	var HTMLIsIndexElement = _$inherit(HTMLElement);
	var SVGPathSeg = {};
	var SVGPathSegLinetoRel = _$inherit(SVGPathSeg);
	var MSDataBindingExtensions = {};
	var HTMLOptGroupElement = _$inherit(HTMLElement);
	var CharacterData = _$inherit(Node);
	var GetSVGDocument = {};
	var HTMLEmbedElement = _$inherit(HTMLElement);
	var StorageEvent = _$inherit(Event);
	var DeviceAccelerationDict = {};
	var DOML2DeprecatedBorderStyle = {};
	var DOML2DeprecatedAlignmentStyle = {};
	var DOML2DeprecatedMarginStyle = {};
	var HTMLObjectElement = _$inherit(HTMLElement);
	var DOML2DeprecatedSizeProperty = {};
	var DOML2DeprecatedColorProperty = {};
	var HTMLHRElement = _$inherit(HTMLElement);
	var PositionOptions = {};
	var CanvasPattern = {};
	var PerformanceEntry = {};
	var PerformanceResourceTiming = _$inherit(PerformanceEntry);
	var Comment = _$inherit(CharacterData);
	var HTMLBGSoundElement = _$inherit(HTMLElement);
	var DeviceMotionEvent = _$inherit(Event);
	var SVGNumberList = {};
	var MediaError = {};
	var HTMLFieldSetElement = _$inherit(HTMLElement);
	var SourceBufferList = {};
	var MSResourceMetadata = {};
	var MSDocumentExtensions = {};
	var DocumentEvent = {};
	var Document = _$inherit(Node);
	var XMLDocument = _$inherit(Document);
	var WebGLActiveInfo = {};
	var MSStream = {};
	var MSFileSaver = {};
	var NodeFilter = {};
	var CSSRule = {};
	var CSSKeyframeRule = _$inherit(CSSRule);
	var PopStateEvent = _$inherit(Event);
	var SVGURIReference = {};
	var SVGGradientElement = _$inherit(SVGElement);
	var FrameRequestCallback = {};
	var PerformanceMeasure = _$inherit(PerformanceEntry);
	var XMLSerializer = {};
	var XMLSerializerCtor = function() { return Object.create(XMLSerializer); };
	var Blob = {};
	var BlobCtor = function() { return Object.create(Blob); };
	var HTMLDTElement = _$inherit(HTMLElement);
	var NodeList = {};
	var SVGTextContentElement = _$inherit(SVGElement);
	var SVGTextPathElement = _$inherit(SVGTextContentElement);
	var DeviceOrientationEvent = _$inherit(Event);
	var MSBaseReader = {};
	var FileReader = {};
	var FileReaderCtor = function() { return Object.create(FileReader); };
	var MessagePort = {};
	var StyleSheet = {};
	var MSMimeTypesCollection = {};
	var DOMParser = {};
	var DOMParserCtor = function() { return Object.create(DOMParser); };
	var MutationObserverInit = {};
	var MSUnsafeFunctionCallback = {};
	var MimeTypeArray = {};
	var MSHTMLCollectionExtensions = {};
	var HTMLFormElement = _$inherit(HTMLElement);
	var SVGZoomAndPan = {};
	var DOML2DeprecatedTextFlowControl = {};
	var HTMLHeadingElement = _$inherit(HTMLElement);
	var SVGFEOffsetElement = _$inherit(SVGElement);
	var HTMLHeadElement = _$inherit(HTMLElement);
	var MsZoomToOptions = {};
	var HTMLSpanElement = _$inherit(HTMLElement);
	var HTMLProgressElement = _$inherit(HTMLElement);
	var MSNavigatorExtensions = {};
	var WindowBase64 = {};
	var HTMLBRElement = _$inherit(HTMLElement);
	var CSSPageRule = _$inherit(CSSRule);
	var PerformanceMark = _$inherit(PerformanceEntry);
	var SVGFEColorMatrixElement = _$inherit(SVGElement);
	var BookmarkCollection = {};
	var DeviceAcceleration = {};
	var SVGAnimatedPathData = {};
	var Position = {};
	var SVGAnimatedPoints = {};
	var SVGPolylineElement = _$inherit(SVGElement);
	var DocumentFragment = _$inherit(Node);
	var TextEvent = _$inherit(UIEvent);
	var DOML2DeprecatedBackgroundStyle = {};
	var CSSFontFaceRule = _$inherit(CSSRule);
	var MSBehaviorUrnsCollection = {};
	var MSGraphicsTrust = {};
	var MSWindowExtensions = {};
	var ProcessingInstruction = _$inherit(Node);
	var SVGLengthList = {};
	var SVGPathSegCurvetoCubicSmoothRel = _$inherit(SVGPathSeg);
	var SVGPathSegCurvetoQuadraticSmoothAbs = _$inherit(SVGPathSeg);
	var MediaList = {};
	var NamedNodeMap = {};
	var IDBKeyRange = {};
	var HTMLDivElement = _$inherit(HTMLElement);
	var ErrorEventHandler = {};
	var SVGRectElement = _$inherit(SVGElement);
	var DOML2DeprecatedListNumberingAndBulletStyle = {};
	var DOML2DeprecatedListSpaceReduction = {};
	var HTMLUListElement = _$inherit(HTMLElement);
	var SVGComponentTransferFunctionElement = _$inherit(SVGElement);
	var SVGFEFuncBElement = _$inherit(SVGComponentTransferFunctionElement);
	var SVGAnimatedEnumeration = {};
	var HTMLTableAlignment = {};
	var SVGLinearGradientElement = _$inherit(SVGGradientElement);
	var SVGException = {};
	var HTMLDocument = _$inherit(Document);
	var HTMLTableColElement = _$inherit(HTMLElement);
	var MSRangeCollection = {};
	var ImageData = {};
	var SVGUseElement = _$inherit(SVGElement);
	var BeforeUnloadEvent = _$inherit(Event);
	var SVGMatrix = {};
	var WEBGL_compressed_texture_s3tc = {};
	var HTMLModElement = _$inherit(HTMLElement);
	var WebGLUniformLocation = {};
	var SVGPathSegLinetoAbs = _$inherit(SVGPathSeg);
	var SVGFEDisplacementMapElement = _$inherit(SVGElement);
	var WindowTimersExtension = {};
	var SVGFEFuncRElement = _$inherit(SVGComponentTransferFunctionElement);
	var TimeRanges = {};
	var SVGPathSegCurvetoQuadraticAbs = _$inherit(SVGPathSeg);
	var SVGPathSegCurvetoCubicAbs = _$inherit(SVGPathSeg);
	var History = {};
	var EXT_texture_filter_anisotropic = {};
	var SVGRect = {};
	var DOML2DeprecatedBackgroundColorStyle = {};
	var HTMLMarqueeElement = _$inherit(HTMLElement);
	var MSWindowModeless = {};
	var Geolocation = {};
	var HTMLTextAreaElement = _$inherit(HTMLElement);
	var HTMLBaseFontElement = _$inherit(HTMLElement);
	var CustomEvent = _$inherit(Event);
	var CSSImportRule = _$inherit(CSSRule);
	var StyleSheetList = {};
	var ExceptionInformation = {};
	var StoreExceptionsInformation = _$inherit(ExceptionInformation);
	var StoreSiteSpecificExceptionsInformation = _$inherit(StoreExceptionsInformation);
	var SVGCircleElement = _$inherit(SVGElement);
	var SVGElementInstance = {};
	var MimeType = {};
	var MouseEvent = _$inherit(UIEvent);
	var PointerEvent = _$inherit(MouseEvent);
	var HTMLTableCellElement = _$inherit(HTMLElement);
	var DeviceRotationRateDict = {};
	var PositionError = {};
	var MSImageResourceExtensions = {};
	var MediaSource = {};
	var MediaSourceCtor = function() { return Object.create(MediaSource); };
	var HTMLAudioElement = _$inherit(HTMLMediaElement);
	var MSDataBindingRecordSetReadonlyExtensions = {};
	var HTMLUnknownElement = _$inherit(HTMLElement);
	var SVGPathSegList = {};
	var IDBCursor = {};
	var CSSNamespaceRule = _$inherit(CSSRule);
	var SVGAnimatedRect = {};
	var Text = _$inherit(CharacterData);
	var MSCompatibleInfo = {};
	var SVGPathElement = _$inherit(SVGElement);
	var SVGNumber = {};
	var WheelEvent = _$inherit(MouseEvent);
	var IDBIndex = {};
	var WebGLObject = {};
	var WebGLBuffer = _$inherit(WebGLObject);
	var WebGLShader = _$inherit(WebGLObject);
	var SVGTransform = {};
	var MSMediaKeys = {};
	var MSMediaKeysCtor = function() { return Object.create(MSMediaKeys); };
	var ConfirmSiteSpecificExceptionsInformation = _$inherit(ExceptionInformation);
	var HTMLStyleElement = _$inherit(HTMLElement);
	var SVGFEGaussianBlurElement = _$inherit(SVGElement);
	var HTMLTitleElement = _$inherit(HTMLElement);
	var Location = {};
	var HTMLCanvasElement = _$inherit(HTMLElement);
	var MSEventObj = {};
	var SVGPathSegCurvetoCubicRel = _$inherit(SVGPathSeg);
	var NavigatorStorageUtils = {};
	var WebSocket = {};
	var WebSocketCtor = function() { return Object.create(WebSocket); };
	var HTMLPhraseElement = _$inherit(HTMLElement);
	var DOMError = {};
	var SVGPolygonElement = _$inherit(SVGElement);
	var SVGLength = {};
	var MutationRecord = {};
	var SVGStringList = {};
	var SVGPathSegMovetoAbs = _$inherit(SVGPathSeg);
	var SVGPathSegArcRel = _$inherit(SVGPathSeg);
	var SVGMetadataElement = _$inherit(SVGElement);
	var WindowLocalStorage = {};
	var WebGLFramebuffer = _$inherit(WebGLObject);
	var NavigatorOnLine = {};
	var MSNavigatorDoNotTrack = {};
	var EventException = {};
	var DOMTokenList = {};
	var WebGLContextAttributes = {};
	var HTMLPreElement = _$inherit(HTMLElement);
	var PerformanceTiming = {};
	var SVGAnimatedNumber = {};
	var MSStreamReader = {};
	var MSStreamReaderCtor = function() { return Object.create(MSStreamReader); };
	var Key = {};
	var SVGImageElement = _$inherit(SVGElement);
	var HTMLParamElement = _$inherit(HTMLElement);
	var SVGFilterElement = _$inherit(SVGElement);
	var ErrorEvent = _$inherit(Event);
	var HTMLAnchorElement = _$inherit(HTMLElement);
	var HTMLInputElement = _$inherit(HTMLElement);
	var HTMLTableSectionElement = _$inherit(HTMLElement);
	var RandomSource = {};
	var Crypto = {};
	var SubtleCrypto = {};
	var DragEvent = _$inherit(MouseEvent);
	var MSGestureEvent = _$inherit(UIEvent);
	var MutationEvent = _$inherit(Event);
	var SVGRadialGradientElement = _$inherit(SVGGradientElement);
	var DocumentType = _$inherit(Node);
	var MSExecAtPriorityFunctionCallback = {};
	var HTMLBodyElement = _$inherit(HTMLElement);
	var TextRangeCollection = {};
	var HTMLIFrameElement = _$inherit(HTMLElement);
	var MSStorageExtensions = {};
	var Storage = {};
	var AbstractWorker = {};
	var Worker = {};
	var WorkerCtor = function() { return Object.create(Worker); };
	var CryptoOperation = {};
	var ValidityState = {};
	var CSSStyleDeclaration = {};
	var MSCSSProperties = _$inherit(CSSStyleDeclaration);
	var MSCurrentStyleCSSProperties = _$inherit(MSCSSProperties);
	var SVGStyleElement = _$inherit(SVGElement);
	var SVGFEImageElement = _$inherit(SVGElement);
	var PerfWidgetExternal = {};
	var HTMLLIElement = _$inherit(HTMLElement);
	var SVGPathSegLinetoVerticalAbs = _$inherit(SVGPathSeg);
	var SVGTextPositioningElement = _$inherit(SVGTextContentElement);
	var SVGTSpanElement = _$inherit(SVGTextPositioningElement);
	var SVGTextElement = _$inherit(SVGTextPositioningElement);
	var SVGAnimatedInteger = {};
	var WebGLRenderbuffer = _$inherit(WebGLObject);
	var HTMLLegendElement = _$inherit(HTMLElement);
	var HTMLDirectoryElement = _$inherit(HTMLElement);
	var WebGLContextEvent = _$inherit(Event);
	var WebGLContextEventCtor = function() { return Object.create(WebGLContextEvent); };
	var HTMLLabelElement = _$inherit(HTMLElement);
	var SVGSVGElement = _$inherit(SVGElement);
	var MSPluginsCollection = {};
	var SVGAnimatedNumberList = {};
	var MSPointerEvent = _$inherit(MouseEvent);
	var WebGLShaderPrecisionFormat = {};
	var SVGPoint = {};
	var Range = {};
	var IDBFactory = {};
	var DOMSettableTokenList = _$inherit(DOMTokenList);
	var MutationObserver = {};
	var MutationObserverCtor = function() { return Object.create(MutationObserver); };
	var FocusEvent = _$inherit(UIEvent);
	var DataTransfer = {};
	var EventListener = {};
	var NavigatorContentUtils = {};
	var MSBlobBuilder = {};
	var MSBlobBuilderCtor = function() { return Object.create(MSBlobBuilder); };
	var NavigatorGeolocation = {};
	var Coordinates = {};
	var Screen = {};
	var HTMLFrameSetElement = _$inherit(HTMLElement);
	var MSMediaKeyError = {};
	var SVGAElement = _$inherit(SVGElement);
	var SVGEllipseElement = _$inherit(SVGElement);
	var SVGPathSegLinetoHorizontalRel = _$inherit(SVGPathSeg);
	var HTMLDListElement = _$inherit(HTMLElement);
	var DeviceRotationRate = {};
	var HTMLTableHeaderCellElement = _$inherit(HTMLTableCellElement);
	var SourceBuffer = {};
	var XMLHttpRequest = {};
	var XMLHttpRequestCtor = function() { return Object.create(XMLHttpRequest); };
	var WindowModal = {};
	var CSSMediaRule = _$inherit(CSSRule);
	var HTMLQuoteElement = _$inherit(HTMLElement);
	var SVGDefsElement = _$inherit(SVGElement);
	var ApplicationCache = {};
	var SVGAnimatedLength = {};
	var HTMLFrameElement = _$inherit(HTMLElement);
	var MSMediaKeyMessageEvent = _$inherit(Event);
	var OES_standard_derivatives = {};
	var SVGPathSegClosePath = _$inherit(SVGPathSeg);
	var HTMLHtmlElement = _$inherit(HTMLElement);
	var SVGTransformList = {};
	var SVGPathSegArcAbs = _$inherit(SVGPathSeg);
	var IDBRequest = {};
	var SVGPathSegLinetoHorizontalAbs = _$inherit(SVGPathSeg);
	var MSCSSRuleList = {};
	var CanvasRenderingContext2D = {};
	var HTMLTableRowElement = _$inherit(HTMLElement);
	var MediaQueryListListener = {};
	var TextTrack = {};
	var HTMLScriptElement = _$inherit(HTMLElement);
	var MessageEvent = _$inherit(Event);
	var KeyboardEvent = _$inherit(UIEvent);
	var WebGLTexture = _$inherit(WebGLObject);
	var CanvasGradient = {};
	var HTMLSourceElement = _$inherit(HTMLElement);
	var AesGcmEncryptResult = {};
	var MSLaunchUriCallback = {};
	var HTMLButtonElement = _$inherit(HTMLElement);
	var IDBOpenDBRequest = _$inherit(IDBRequest);
	var SVGAngle = {};
	var DOMStringList = {};
	var IDBDatabase = {};
	var HTMLAreaElement = _$inherit(HTMLElement);
	var HTMLImageElement = _$inherit(HTMLElement);
	var HTMLCollection = {};
	var SVGFESpotLightElement = _$inherit(SVGElement);
	var StyleSheetPageList = {};
	var Console = {};
	var MSSiteModeEvent = _$inherit(Event);
	var SVGFEFuncGElement = _$inherit(SVGComponentTransferFunctionElement);
	var SVGAnimatedPreserveAspectRatio = {};
	var TextTrackList = {};
	var SVGFETurbulenceElement = _$inherit(SVGElement);
	var WindowSessionStorage = {};
	var WindowConsole = {};
	var IDBEnvironment = {};
	var WindowTimers = {};
	var Window = this;
	var SVGAnimatedLengthList = {};
	var CSSKeyframesRule = _$inherit(CSSRule);
	var TextTrackCueList = {};
	var VideoPlaybackQuality = {};
	var SVGPointList = {};
	var AudioTrack = {};
	var SVGFEConvolveMatrixElement = _$inherit(SVGElement);
	var MouseWheelEvent = _$inherit(MouseEvent);
	var IDBTransaction = {};
	var HTMLMenuElement = _$inherit(HTMLElement);
	var HTMLMapElement = _$inherit(HTMLElement);
	var HTMLOptionElement = _$inherit(HTMLElement);
	var HTMLTableCaptionElement = _$inherit(HTMLElement);
	var SVGAnimatedTransformList = {};
	var ControlRangeCollection = {};
	var SVGTitleElement = _$inherit(SVGElement);
	var KeyPair = {};
	var WebGLProgram = _$inherit(WebGLObject);
	var HTMLFontElement = _$inherit(HTMLElement);
	var SVGFEDistantLightElement = _$inherit(SVGElement);
	var HTMLLinkElement = _$inherit(HTMLElement);
	var SVGViewElement = _$inherit(SVGElement);
	var NodeIterator = {};
	var CSSStyleRule = _$inherit(CSSRule);
	var Algorithm = {};
	var HTMLDDElement = _$inherit(HTMLElement);
	var AnimationEvent = _$inherit(Event);
	var SVGScriptElement = _$inherit(SVGElement);
	var Selection = {};
	var SVGAnimatedAngle = {};
	var SVGPatternElement = _$inherit(SVGElement);
	var HTMLMetaElement = _$inherit(HTMLElement);
	var CSSStyleSheet = _$inherit(StyleSheet);
	var HTMLBlockElement = _$inherit(HTMLElement);
	var MSMediaKeyNeededEvent = _$inherit(Event);
	var TextRange = {};
	var HTMLSelectElement = _$inherit(HTMLElement);
	var SVGFEMorphologyElement = _$inherit(SVGElement);
	var PerformanceNavigationTiming = _$inherit(PerformanceEntry);
	var StyleMedia = {};
	var CDATASection = _$inherit(Text);
	var SVGAnimatedString = {};
	var SVGPathSegLinetoVerticalRel = _$inherit(SVGPathSeg);
	var HTMLOListElement = _$inherit(HTMLElement);
	var TextMetrics = {};
	var AudioTrackList = {};
	var XMLHttpRequestEventTarget = {};
	var HTMLAppletElement = _$inherit(HTMLElement);
	var IDBCursorWithValue = _$inherit(IDBCursor);
	var RangeException = {};
	var SVGClipPathElement = _$inherit(SVGElement);
	var MSScriptHost = {};
	var URL = {};
	var SVGPathSegCurvetoQuadraticSmoothRel = _$inherit(SVGPathSeg);
	var SVGDescElement = _$inherit(SVGElement);
	var File = _$inherit(Blob);
	var HTMLAreasCollection = _$inherit(HTMLCollection);
	var SVGFESpecularLightingElement = _$inherit(SVGElement);
	var Plugin = {};
	var HTMLParagraphElement = _$inherit(HTMLElement);
	var SVGLineElement = _$inherit(SVGElement);
	var FileList = {};
	var PluginArray = {};
	var SVGPathSegMovetoRel = _$inherit(SVGPathSeg);
	var HTMLNextIdElement = _$inherit(HTMLElement);
	var MSInputMethodContext = {};
	var IDBVersionChangeEvent = _$inherit(Event);
	var DOMStringMap = {};
	var ObjectURLOptions = {};
	var DOMImplementation = {};
	var KeyOperation = {};
	var PositionErrorCallback = {};
	var IDBObjectStore = {};
	var ClientRect = {};
	var HTMLBaseElement = _$inherit(HTMLElement);
	var HTMLTableDataCellElement = _$inherit(HTMLTableCellElement);
	var SVGZoomEvent = _$inherit(UIEvent);
	var ProgressEvent = _$inherit(Event);
	var CloseEvent = _$inherit(Event);
	var SVGFEPointLightElement = _$inherit(SVGElement);
	var MediaQueryList = {};
	var TransitionEvent = _$inherit(Event);
	var SVGPathSegCurvetoCubicSmoothAbs = _$inherit(SVGPathSeg);
	var NavigatorID = {};
	var Navigator = {};
	var SVGFEMergeElement = _$inherit(SVGElement);
	var MessageChannel = {};
	var MessageChannelCtor = function() { return Object.create(MessageChannel); };
	var MSStyleCSSProperties = _$inherit(MSCSSProperties);
	var SVGGElement = _$inherit(SVGElement);
	var SVGMarkerElement = _$inherit(SVGElement);
	var CompositionEvent = _$inherit(UIEvent);
	var SVGFEBlendElement = _$inherit(SVGElement);
	var SVGFETileElement = _$inherit(SVGElement);
	var MSDataBindingTableExtensions = {};
	var HTMLAllCollection = _$inherit(HTMLCollection);
	var Performance = {};
	var SVGFEFuncAElement = _$inherit(SVGComponentTransferFunctionElement);
	var CanvasPixelArray = {};
	var WebGLRenderingContext = {};
	var AlgorithmParameters = {};
	var SVGPathSegCurvetoQuadraticRel = _$inherit(SVGPathSeg);
	var TextTrackCue = {};
	var TextTrackCueCtor = function() { return Object.create(TextTrackCue); };
	var MSGesture = {};
	var MSGestureCtor = function() { return Object.create(MSGesture); };
	var SVGFEFloodElement = _$inherit(SVGElement);
	var SVGFEMergeNodeElement = _$inherit(SVGElement);
	var TrackEvent = _$inherit(Event);
	var TreeWalker = {};
	var HTMLTableElement = _$inherit(HTMLElement);

	/* -- type: External -- */



	/* -- type: GlobalEventHandlers -- */

	_events(GlobalEventHandlers, "onpointerenter", "onpointerout", "onpointerdown", "onpointerup", "onpointercancel", "onpointerover", "onpointermove", "onpointerleave");


	/* -- type: ElementTraversal -- */

	Object.defineProperty(ElementTraversal,"previousElementSibling", { get: function () { return _previousElementSibling(this, HTMLElement); } });
	Object.defineProperty(ElementTraversal,"childElementCount", { get: function () { return _childElementCount(this); } });
	Object.defineProperty(ElementTraversal,"nextElementSibling", { get: function () { return _nextElementSibling(this, HTMLElement); } });
	Object.defineProperty(ElementTraversal,"lastElementChild", { get: function () { return _lastElementChild(this, HTMLElement); } });
	Object.defineProperty(ElementTraversal,"firstElementChild", { get: function () { return _firstElementChild(this, HTMLElement); } });


	/* -- type: SVGLangSpace -- */

	SVGLangSpace.xmllang = '';
	SVGLangSpace.xmlspace = '';


	/* -- type: SVGStylable -- */

	SVGStylable.className = SVGAnimatedString;
	SVGStylable.style = CSSStyleDeclaration;


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


	/* -- type: Element -- */
	_$implement(Element, NodeSelector);
	_$implement(Element, ElementTraversal);
	_$implement(Element, GlobalEventHandlers);

	Element.msRegionOverflow = '';
	Element.scrollTop = 0;
	Element.scrollLeft = 0;
	Element.clientWidth = 0;
	Element.scrollWidth = 0;
	Element.clientTop = 0;
	Element.clientLeft = 0;
	Element.tagName = '';
	Element.clientHeight = 0;
	Element.msContentZoomFactor = 0;
	Element.scrollHeight = 0;
	Element.msGetRegionContent = function() { 
		/// <signature>
		/// <returns type='MSRangeCollection'/>
		/// </signature>
		return MSRangeCollection; 
	};
	Element.setPointerCapture = function(pointerId) { 
		/// <signature>
		/// <param name='pointerId' type='Number' />
		/// </signature>
	};
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
	Element.msMatchesSelector = function(selectors) { 
		/// <signature>
		/// <param name='selectors' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return true;
	};
	Element.releasePointerCapture = function(pointerId) { 
		/// <signature>
		/// <param name='pointerId' type='Number' />
		/// </signature>
	};
	Element.msGetUntransformedBounds = function() { 
		/// <signature>
		/// <returns type='ClientRect'/>
		/// </signature>
		return ClientRect; 
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
	Element.msZoomTo = function(args) { 
		/// <signature>
		/// <param name='args' type='MsZoomToOptions' />
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
	Element.getClientRects = function() { 
		/// <signature>
		/// <returns type='ClientRectList'/>
		/// </signature>
		return ClientRectList; 
	};
	Element.setAttributeNode = function(newAttr) { 
		/// <signature>
		/// <param name='newAttr' type='Attr' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Element.removeAttributeNode = function(oldAttr) { 
		/// <signature>
		/// <param name='oldAttr' type='Attr' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Element.msReleasePointerCapture = function(pointerId) { 
		/// <signature>
		/// <param name='pointerId' type='Number' />
		/// </signature>
	};
	Element.setAttribute = function(name, value) { 
		/// <signature>
		/// <param name='name' type='String' optional='true' />
		/// <param name='value' type='String' optional='true' />
		/// </signature>
		_setAttribute(this, name, value);
	};
	Element.msRequestFullscreen = function() { };
	Element.msSetPointerCapture = function(pointerId) { 
		/// <signature>
		/// <param name='pointerId' type='Number' />
		/// </signature>
	};
	Element.removeAttributeNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// </signature>
	};
	_events(Element, "onmspointerdown", "onmsgotpointercapture", "onmsgesturedoubletap", "onmspointermove", "onmsgesturehold", "onlostpointercapture", "onmsgesturechange", "onmsgesturestart", "onmspointercancel", "onmsgestureend", "onmsgesturetap", "onmspointerout", "onmslostpointercapture", "onmsinertiastart", "onmspointerover", "onmspointerenter", "onmspointerleave", "ongotpointercapture", "onmspointerup");


	/* -- type: SVGElement -- */

	SVGElement.viewportElement = _$getTrackingNull(Object.create(SVGElement));
	SVGElement.xmlbase = '';
	SVGElement.id = '';
	SVGElement.ownerSVGElement = _$getTrackingNull(Object.create(SVGSVGElement));
	_events(SVGElement, "onmouseover", "onmouseout", "onmousemove", "ondblclick", "onfocusout", "onfocusin", "onmousedown", "onmouseup", "onload", "onclick");


	/* -- type: SVGExternalResourcesRequired -- */

	SVGExternalResourcesRequired.externalResourcesRequired = SVGAnimatedBoolean;


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


	/* -- type: OES_texture_float_linear -- */



	/* -- type: SVGFilterPrimitiveStandardAttributes -- */

	SVGFilterPrimitiveStandardAttributes.y = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.width = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.x = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.height = SVGAnimatedLength;
	SVGFilterPrimitiveStandardAttributes.result = SVGAnimatedString;


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


	/* -- type: ElementCSSInlineStyle -- */

	ElementCSSInlineStyle.runtimeStyle = MSStyleCSSProperties;
	ElementCSSInlineStyle.currentStyle = MSCurrentStyleCSSProperties;
	ElementCSSInlineStyle.componentFromPoint = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: MSNodeExtensions -- */

	MSNodeExtensions.swapNode = function(otherNode) { 
		/// <signature>
		/// <param name='otherNode' type='Document' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='otherNode' type='HTMLElement' />
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
		/// <param name='replacement' type='Document' />
		/// <returns type='Node'/>
		/// </signature>
		/// <signature>
		/// <param name='replacement' type='HTMLElement' />
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


	/* -- type: MSEventAttachmentTarget -- */



	/* -- type: HTMLElement -- */
	_$implement(HTMLElement, MSEventAttachmentTarget);
	_$implement(HTMLElement, ElementCSSInlineStyle);
	_$implement(HTMLElement, MSNodeExtensions);

	HTMLElement.className = '';
	HTMLElement.recordNumber = {};
	HTMLElement.title = '';
	HTMLElement.parentTextEdit = _$getTrackingNull(Object.create(HTMLElement));
	HTMLElement.outerHTML = '';
	HTMLElement.offsetHeight = 0;
	HTMLElement.dir = '';
	HTMLElement.sourceIndex = 0;
	HTMLElement.id = '';
	HTMLElement.uniqueID = '';
	HTMLElement.offsetParent = _$getTrackingNull(Object.create(HTMLElement));
	HTMLElement.innerText = '';
	Object.defineProperty(HTMLElement,"parentElement", { get: function () { return _parentElement(this, HTMLElement); } });
	HTMLElement.hidden = false;
	HTMLElement.children = HTMLCollection;
	HTMLElement.offsetTop = 0;
	Object.defineProperty(HTMLElement,"innerHTML", { get: function () { return ''; }, set: function (v) { _setInnerHTML(this, v); } });
	HTMLElement.lang = '';
	HTMLElement.uniqueNumber = 0;
	HTMLElement.offsetLeft = 0;
	HTMLElement.isTextEdit = false;
	HTMLElement.isDisabled = false;
	HTMLElement.canHaveHTML = false;
	HTMLElement.language = '';
	HTMLElement.style = MSStyleCSSProperties;
	HTMLElement.isContentEditable = false;
	HTMLElement.contentEditable = '';
	HTMLElement.tabIndex = 0;
	HTMLElement.classList = DOMTokenList;
	HTMLElement.isMultiLine = false;
	HTMLElement.hideFocus = false;
	HTMLElement.outerText = '';
	HTMLElement.disabled = false;
	HTMLElement.spellcheck = false;
	HTMLElement.accessKey = '';
	HTMLElement.offsetWidth = 0;
	HTMLElement.dataset = DOMStringMap;
	HTMLElement.canHaveChildren = false;
	HTMLElement.draggable = false;
	HTMLElement.dragDrop = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLElement.scrollIntoView = function(top) { 
		/// <signature>
		/// <param name='top' type='Boolean' optional='true' />
		/// </signature>
	};
	HTMLElement.setCapture = function(containerCapture) { 
		/// <signature>
		/// <param name='containerCapture' type='Boolean' optional='true' />
		/// </signature>
	};
	HTMLElement.focus = function() { };
	HTMLElement.msGetInputContext = function() { 
		/// <signature>
		/// <returns type='MSInputMethodContext'/>
		/// </signature>
		return MSInputMethodContext; 
	};
	HTMLElement.getAdjacentText = function(where) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLElement.insertAdjacentText = function(where, text) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <param name='text' type='String' />
		/// </signature>
	};
	HTMLElement.getElementsByClassName = function(classNames) { 
		/// <signature>
		/// <param name='classNames' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	HTMLElement.setActive = function() { };
	HTMLElement.blur = function() { };
	HTMLElement.clearAttributes = function() { };
	HTMLElement.releaseCapture = function() { };
	HTMLElement.createControlRange = function() { 
		/// <signature>
		/// <returns type='ControlRangeCollection'/>
		/// </signature>
		return ControlRangeCollection; 
	};
	HTMLElement.contains = function(child) { 
		/// <signature>
		/// <param name='child' type='HTMLElement' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLElement.click = function() { };
	HTMLElement.applyElement = function(apply, where) { 
		/// <signature>
		/// <param name='apply' type='Element' />
		/// <param name='where' type='String' optional='true' />
		/// <returns type='Element'/>
		/// </signature>
		return _applyElement(this, apply, where);
	};
	HTMLElement.replaceAdjacentText = function(where, newText) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <param name='newText' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLElement.mergeAttributes = function(source, preserveIdentity) { 
		/// <signature>
		/// <param name='source' type='HTMLElement' />
		/// <param name='preserveIdentity' type='Boolean' optional='true' />
		/// </signature>
	};
	HTMLElement.insertAdjacentElement = function(position, insertedElement) { 
		/// <signature>
		/// <param name='position' type='String' />
		/// <param name='insertedElement' type='Element' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};
	HTMLElement.insertAdjacentHTML = function(where, html) { 
		/// <signature>
		/// <param name='where' type='String' />
		/// <param name='html' type='String' />
		/// </signature>
		_setInnerHTML(this, html);
	};
	HTMLElement.nodeName = HTMLElement.tagName = 'FIGURE';
	HTMLElement.localName = 'figure';
	_events(HTMLElement, "onmouseleave", "onbeforecut", "onkeydown", "onkeyup", "onreset", "onhelp", "ondragleave", "onfocusin", "onseeked", "ondurationchange", "onblur", "onmscontentzoom", "onemptied", "onseeking", "oncanplay", "ondeactivate", "onloadstart", "ondragenter", "onsubmit", "onchange", "onbeforeactivate", "oncanplaythrough", "onsuspend", "onmouseenter", "onmouseout", "onmousewheel", "onvolumechange", "ondragend", "onbeforepaste", "ondragover", "onmouseup", "ondragstart", "onbeforecopy", "ondrag", "onmouseover", "onpause", "onmousedown", "onclick", "onwaiting", "onpaste", "onstalled", "onmousemove", "onratechange", "onprogress", "ondblclick", "oncontextmenu", "onloadedmetadata", "onerror", "onplay", "onplaying", "onfocusout", "onabort", "oncuechange", "onkeypress", "onloadeddata", "onbeforedeactivate", "onactivate", "onmsmanipulationstatechanged", "onselectstart", "onfocus", "ontimeupdate", "oncut", "onselect", "ondrop", "oncopy", "onended", "onscroll", "onload", "oninput");


	/* -- type: HTMLMediaElement -- */

	HTMLMediaElement.loop = false;
	HTMLMediaElement.autobuffer = false;
	HTMLMediaElement.textTracks = TextTrackList;
	HTMLMediaElement.buffered = TimeRanges;
	HTMLMediaElement.controls = false;
	HTMLMediaElement.autoplay = false;
	HTMLMediaElement.src = '';
	HTMLMediaElement.playbackRate = 0;
	HTMLMediaElement.muted = false;
	HTMLMediaElement.duration = 0;
	HTMLMediaElement.audioTracks = AudioTrackList;
	HTMLMediaElement.paused = false;
	HTMLMediaElement.msGraphicsTrustStatus = MSGraphicsTrust;
	HTMLMediaElement.seeking = false;
	HTMLMediaElement.preload = '';
	HTMLMediaElement.initialTime = 0;
	HTMLMediaElement.played = TimeRanges;
	HTMLMediaElement.msPlayToPrimary = false;
	HTMLMediaElement.currentSrc = '';
	HTMLMediaElement.readyState = {};
	HTMLMediaElement.msPlayToDisabled = false;
	HTMLMediaElement.ended = false;
	HTMLMediaElement.error = MediaError;
	HTMLMediaElement.seekable = TimeRanges;
	HTMLMediaElement.msKeys = MSMediaKeys;
	HTMLMediaElement.msPlayToPreferredSourceUri = '';
	HTMLMediaElement.volume = 0;
	HTMLMediaElement.defaultPlaybackRate = 0;
	HTMLMediaElement.currentTime = 0;
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
	HTMLMediaElement.play = function() { };
	HTMLMediaElement.canPlayType = function(type) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	HTMLMediaElement.pause = function() { };
	HTMLMediaElement.msSetMediaKeys = function(mediaKeys) { 
		/// <signature>
		/// <param name='mediaKeys' type='MSMediaKeys' />
		/// </signature>
	};
	HTMLMediaElement.addTextTrack = function(kind, label, language) { 
		/// <signature>
		/// <param name='kind' type='String' />
		/// <param name='label' type='String' optional='true' />
		/// <param name='language' type='String' optional='true' />
		/// <returns type='TextTrack'/>
		/// </signature>
		return TextTrack; 
	};
	HTMLMediaElement.load = function() { };
	_events(HTMLMediaElement, "onmsneedkey");


	/* -- type: HTMLVideoElement -- */

	HTMLVideoElement.videoWidth = 0;
	HTMLVideoElement.width = 0;
	HTMLVideoElement.height = 0;
	HTMLVideoElement.msZoom = false;
	HTMLVideoElement.videoHeight = 0;
	HTMLVideoElement.poster = '';
	HTMLVideoElement.getVideoPlaybackQuality = function() { 
		/// <signature>
		/// <returns type='VideoPlaybackQuality'/>
		/// </signature>
		return VideoPlaybackQuality; 
	};
	HTMLVideoElement.nodeName = HTMLVideoElement.tagName = 'VIDEO';
	HTMLVideoElement.localName = 'video';


	/* -- type: HTMLTrackElement -- */

	HTMLTrackElement.kind = '';
	HTMLTrackElement.src = '';
	HTMLTrackElement.srclang = '';
	HTMLTrackElement.track = TextTrack;
	HTMLTrackElement.readyState = 0;
	HTMLTrackElement.label = '';
	HTMLTrackElement.default = false;
	HTMLTrackElement.ERROR = 3;
	HTMLTrackElement.LOADING = 1;
	HTMLTrackElement.LOADED = 2;
	HTMLTrackElement.NONE = 0;
	HTMLTrackElement.nodeName = HTMLTrackElement.tagName = 'TRACK';
	HTMLTrackElement.localName = 'track';


	/* -- type: MSMediaKeySession -- */
	_$implement(MSMediaKeySession, EventTarget);

	MSMediaKeySession.sessionId = '';
	MSMediaKeySession.error = MSMediaKeyError;
	MSMediaKeySession.keySystem = '';
	MSMediaKeySession.close = function() { };
	MSMediaKeySession.update = function(key) { 
		/// <signature>
		/// <param name='key' type='Uint8Array' />
		/// </signature>
	};


	/* -- type: LinkStyle -- */

	LinkStyle.sheet = StyleSheet;


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

	MSDataBindingRecordSetExtensions.recordset = {};
	MSDataBindingRecordSetExtensions.namedRecordset = function(dataMember, hierarchy) { 
		/// <signature>
		/// <param name='dataMember' type='String' />
		/// <param name='hierarchy' type='Object' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};


	/* -- type: MutationCallback -- */

	MutationCallback.callback = function(mutations, observer) { 
		/// <signature>
		/// <param name='mutations' type='Array' elementType='MutationRecord' />
		/// <param name='observer' type='MutationObserver' />
		/// </signature>
	};


	/* -- type: SVGFitToViewBox -- */

	SVGFitToViewBox.viewBox = SVGAnimatedRect;
	SVGFitToViewBox.preserveAspectRatio = SVGAnimatedPreserveAspectRatio;


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


	/* -- type: Event -- */

	Event.timeStamp = 0;
	Event.isTrusted = false;
	Event.defaultPrevented = false;
	Event.currentTarget = EventTarget;
	Event.cancelBubble = false;
	Event.target = EventTarget;
	Event.eventPhase = 0;
	Event.srcElement = HTMLElement;
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


	/* -- type: PageTransitionEvent -- */

	PageTransitionEvent.persisted = false;


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


	/* -- type: SVGStopElement -- */
	_$implement(SVGStopElement, SVGStylable);

	SVGStopElement.offset = SVGAnimatedNumber;
	SVGStopElement.nodeName = SVGStopElement.tagName = 'STOP';
	SVGStopElement.localName = 'stop';


	/* -- type: PositionCallback -- */

	PositionCallback.handleEvent = function(position) { 
		/// <signature>
		/// <param name='position' type='Position' />
		/// </signature>
	};


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
		return {}; 
	};


	/* -- type: Attr -- */

	Attr.expando = false;
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


	/* -- type: UIEvent -- */

	UIEvent.detail = 0;
	UIEvent.view = Window;
	UIEvent.initUIEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
		/// <param name='detailArg' type='Number' />
		/// </signature>
	};


	/* -- type: MSManipulationEvent -- */

	MSManipulationEvent.lastState = 0;
	MSManipulationEvent.currentState = 0;
	MSManipulationEvent.MS_MANIPULATION_STATE_DRAGGING = 5;
	MSManipulationEvent.MS_MANIPULATION_STATE_ACTIVE = 1;
	MSManipulationEvent.MS_MANIPULATION_STATE_COMMITTED = 7;
	MSManipulationEvent.MS_MANIPULATION_STATE_SELECTING = 4;
	MSManipulationEvent.MS_MANIPULATION_STATE_PRESELECT = 3;
	MSManipulationEvent.MS_MANIPULATION_STATE_STOPPED = 0;
	MSManipulationEvent.MS_MANIPULATION_STATE_CANCELLED = 6;
	MSManipulationEvent.MS_MANIPULATION_STATE_INERTIA = 2;
	MSManipulationEvent.initMSManipulationEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, lastState, currentState) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
		/// <param name='detailArg' type='Number' />
		/// <param name='lastState' type='Number' />
		/// <param name='currentState' type='Number' />
		/// </signature>
	};


	/* -- type: SVGAnimatedBoolean -- */

	SVGAnimatedBoolean.animVal = false;
	SVGAnimatedBoolean.baseVal = false;


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


	/* -- type: OES_texture_float -- */



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


	/* -- type: HTMLIsIndexElement -- */

	HTMLIsIndexElement.action = '';
	HTMLIsIndexElement.form = HTMLFormElement;
	HTMLIsIndexElement.prompt = '';
	HTMLIsIndexElement.nodeName = HTMLIsIndexElement.tagName = 'ISINDEX';
	HTMLIsIndexElement.localName = 'isindex';


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


	/* -- type: MSDataBindingExtensions -- */



	/* -- type: HTMLOptGroupElement -- */
	_$implement(HTMLOptGroupElement, MSDataBindingExtensions);

	HTMLOptGroupElement.index = 0;
	HTMLOptGroupElement.value = '';
	HTMLOptGroupElement.text = '';
	HTMLOptGroupElement.defaultSelected = false;
	HTMLOptGroupElement.form = HTMLFormElement;
	HTMLOptGroupElement.label = '';
	HTMLOptGroupElement.selected = false;
	HTMLOptGroupElement.nodeName = HTMLOptGroupElement.tagName = 'OPTGROUP';
	HTMLOptGroupElement.localName = 'optgroup';


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


	/* -- type: GetSVGDocument -- */

	GetSVGDocument.getSVGDocument = function() { 
		/// <signature>
		/// <returns type='Document'/>
		/// </signature>
		return Document; 
	};


	/* -- type: HTMLEmbedElement -- */
	_$implement(HTMLEmbedElement, GetSVGDocument);

	HTMLEmbedElement.palette = '';
	HTMLEmbedElement.width = '';
	HTMLEmbedElement.msPlayToPreferredSourceUri = '';
	HTMLEmbedElement.msPlayToPrimary = false;
	HTMLEmbedElement.src = '';
	HTMLEmbedElement.name = '';
	HTMLEmbedElement.readyState = '';
	HTMLEmbedElement.msPlayToDisabled = false;
	HTMLEmbedElement.pluginspage = '';
	HTMLEmbedElement.height = '';
	HTMLEmbedElement.hidden = '';
	HTMLEmbedElement.units = '';
	HTMLEmbedElement.nodeName = HTMLEmbedElement.tagName = 'EMBED';
	HTMLEmbedElement.localName = 'embed';


	/* -- type: StorageEvent -- */

	StorageEvent.newValue = {};
	StorageEvent.oldValue = {};
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


	/* -- type: DeviceAccelerationDict -- */

	DeviceAccelerationDict.y = 0;
	DeviceAccelerationDict.x = 0;
	DeviceAccelerationDict.z = 0;


	/* -- type: DOML2DeprecatedBorderStyle -- */

	DOML2DeprecatedBorderStyle.border = '';


	/* -- type: DOML2DeprecatedAlignmentStyle -- */

	DOML2DeprecatedAlignmentStyle.align = '';


	/* -- type: DOML2DeprecatedMarginStyle -- */

	DOML2DeprecatedMarginStyle.vspace = 0;
	DOML2DeprecatedMarginStyle.hspace = 0;


	/* -- type: HTMLObjectElement -- */
	_$implement(HTMLObjectElement, GetSVGDocument);
	_$implement(HTMLObjectElement, DOML2DeprecatedMarginStyle);
	_$implement(HTMLObjectElement, DOML2DeprecatedBorderStyle);
	_$implement(HTMLObjectElement, DOML2DeprecatedAlignmentStyle);
	_$implement(HTMLObjectElement, MSDataBindingRecordSetExtensions);
	_$implement(HTMLObjectElement, MSDataBindingExtensions);

	HTMLObjectElement.validationMessage = '';
	HTMLObjectElement.codeType = '';
	HTMLObjectElement.width = '';
	HTMLObjectElement.object = {};
	HTMLObjectElement.msPlayToPrimary = false;
	HTMLObjectElement.form = HTMLFormElement;
	HTMLObjectElement.readyState = 0;
	HTMLObjectElement.msPlayToDisabled = false;
	HTMLObjectElement.willValidate = false;
	HTMLObjectElement.code = '';
	HTMLObjectElement.msPlayToPreferredSourceUri = '';
	HTMLObjectElement.archive = '';
	HTMLObjectElement.standby = '';
	HTMLObjectElement.alt = '';
	HTMLObjectElement.classid = '';
	HTMLObjectElement.name = '';
	HTMLObjectElement.useMap = '';
	HTMLObjectElement.data = '';
	HTMLObjectElement.height = '';
	HTMLObjectElement.contentDocument = document;
	HTMLObjectElement.altHtml = '';
	HTMLObjectElement.validity = ValidityState;
	HTMLObjectElement.codeBase = '';
	HTMLObjectElement.declare = false;
	HTMLObjectElement.type = '';
	HTMLObjectElement.BaseHref = '';
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


	/* -- type: DOML2DeprecatedSizeProperty -- */

	DOML2DeprecatedSizeProperty.size = 0;


	/* -- type: DOML2DeprecatedColorProperty -- */

	DOML2DeprecatedColorProperty.color = '';


	/* -- type: HTMLHRElement -- */
	_$implement(HTMLHRElement, DOML2DeprecatedColorProperty);
	_$implement(HTMLHRElement, DOML2DeprecatedSizeProperty);

	HTMLHRElement.width = 0;
	HTMLHRElement.align = '';
	HTMLHRElement.noShade = false;
	HTMLHRElement.nodeName = HTMLHRElement.tagName = 'HR';
	HTMLHRElement.localName = 'hr';


	/* -- type: PositionOptions -- */

	PositionOptions.enableHighAccuracy = false;
	PositionOptions.timeout = 0;
	PositionOptions.maximumAge = 0;


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


	/* -- type: Comment -- */

	Comment.text = '';
	Comment.nodeType = Node.COMMENT_NODE;
	Comment.nodeName = '#comment';


	/* -- type: HTMLBGSoundElement -- */

	HTMLBGSoundElement.volume = {};
	HTMLBGSoundElement.balance = {};
	HTMLBGSoundElement.src = '';
	HTMLBGSoundElement.loop = 0;
	HTMLBGSoundElement.nodeName = HTMLBGSoundElement.tagName = 'BGSOUND';
	HTMLBGSoundElement.localName = 'bgsound';


	/* -- type: DeviceMotionEvent -- */

	DeviceMotionEvent.rotationRate = DeviceRotationRate;
	DeviceMotionEvent.acceleration = DeviceAcceleration;
	DeviceMotionEvent.interval = 0;
	DeviceMotionEvent.accelerationIncludingGravity = DeviceAcceleration;
	DeviceMotionEvent.initDeviceMotionEvent = function(type, bubbles, cancelable, acceleration, accelerationIncludingGravity, rotationRate, interval) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='bubbles' type='Boolean' />
		/// <param name='cancelable' type='Boolean' />
		/// <param name='acceleration' type='DeviceAccelerationDict' />
		/// <param name='accelerationIncludingGravity' type='DeviceAccelerationDict' />
		/// <param name='rotationRate' type='DeviceRotationRateDict' />
		/// <param name='interval' type='Number' />
		/// </signature>
	};


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


	/* -- type: MediaError -- */

	MediaError.msExtendedCode = 0;
	MediaError.code = 0;
	MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
	MediaError.MEDIA_ERR_NETWORK = 2;
	MediaError.MEDIA_ERR_ABORTED = 1;
	MediaError.MS_MEDIA_ERR_ENCRYPTED = 5;
	MediaError.MEDIA_ERR_DECODE = 3;


	/* -- type: HTMLFieldSetElement -- */

	HTMLFieldSetElement.validationMessage = '';
	HTMLFieldSetElement.validity = ValidityState;
	HTMLFieldSetElement.align = '';
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


	/* -- type: SourceBufferList -- */
	_$implement(SourceBufferList, EventTarget);

	SourceBufferList.length = 0;
	SourceBufferList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='SourceBuffer'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(SourceBuffer)); 
	};
	/* Add a single array element */
	SourceBufferList[0] = _$getTrackingNull(Object.create(SourceBuffer));


	/* -- type: MSResourceMetadata -- */



	/* -- type: MSDocumentExtensions -- */

	MSDocumentExtensions.captureEvents = function() { };
	MSDocumentExtensions.releaseEvents = function() { };


	/* -- type: DocumentEvent -- */

	DocumentEvent.createEvent = function(eventInterface) { 
		/// <signature>
		/// <param name='eventInterface' type='String' />
		/// <returns type='Event'/>
		/// </signature>
		return _createEvent(eventInterface);
	};


	/* -- type: Document -- */
	_$implement(Document, NodeSelector);
	_$implement(Document, MSEventAttachmentTarget);
	_$implement(Document, MSDocumentExtensions);
	_$implement(Document, DocumentEvent);
	_$implement(Document, GlobalEventHandlers);
	_$implement(Document, MSNodeExtensions);
	_$implement(Document, MSResourceMetadata);

	Document.compatible = MSCompatibleInfoCollection;
	Document.implementation = DOMImplementation;
	Document.scripts = _createHTMLCollection('script');
	Document.charset = '';
	Document.vlinkColor = '';
	Document.security = '';
	Document.title = '';
	Document.defaultCharset = '';
	Document.embeds = _createHTMLCollection('embed');
	Document.styleSheets = StyleSheetList;
	Document.frames = Window;
	Document.all = HTMLCollection;
	Document.forms = _createHTMLCollection('form');
	Document.dir = '';
	Document.designMode = '';
	Document.ownerDocument = document;
	Document.msFullscreenElement = HTMLElement;
	Document.URLUnencoded = '';
	Document.defaultView = Window;
	Document.msVisibilityState = '';
	Document.inputEncoding = '';
	Document.activeElement = HTMLElement;
	Document.links = _createHTMLCollection('a');
	Document.uniqueID = '';
	Document.URL = '';
	Document.head = HTMLHeadElement;
	Document.cookie = '';
	Document.xmlEncoding = '';
	Document.documentMode = 0;
	Document.characterSet = '';
	Document.anchors = _createHTMLCollection('a');
	Document.plugins = HTMLCollection;
	Document.rootElement = SVGSVGElement;
	Document.readyState = '';
	Document.referrer = '';
	Document.alinkColor = '';
	Document.parentWindow = Window;
	Document.hidden = false;
	Document.msHidden = false;
	Document.xmlVersion = '';
	Document.msCapsLockWarningOff = false;
	Document.doctype = DocumentType;
	Document.bgColor = '';
	Document.linkColor = '';
	Document.applets = _createHTMLCollection('applet');
	Document.body = HTMLElement;
	Document.domain = '';
	Document.xmlStandalone = false;
	Document.documentElement = HTMLElement;
	Document.visibilityState = '';
	Document.parentNode = _$getTrackingNull(HTMLDocument);
	Document.media = '';
	Document.images = _createHTMLCollection('img');
	Document.location = Location;
	Document.msCSSOMElementFloatMetrics = false;
	Document.lastModified = '';
	Document.msFullscreenEnabled = false;
	Document.fgColor = '';
	Document.compatMode = '';
	Document.queryCommandValue = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Document.queryCommandIndeterm = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Document.adoptNode = function(source) { 
		/// <signature>
		/// <param name='source' type='Node' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	Document.clear = function() { };
	Document.getElementsByTagNameNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	Document.execCommand = function(commandId, showUI, value) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <param name='showUI' type='Boolean' optional='true' />
		/// <param name='value' type='Object' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Document.createProcessingInstruction = function(target, data) { 
		/// <signature>
		/// <param name='target' type='String' />
		/// <param name='data' type='String' />
		/// <returns type='ProcessingInstruction'/>
		/// </signature>
		return ProcessingInstruction; 
	};
	Document.elementFromPoint = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};
	Document.createCDATASection = function(data) { 
		/// <signature>
		/// <param name='data' type='String' />
		/// <returns type='CDATASection'/>
		/// </signature>
		return CDATASection; 
	};
	Document.queryCommandText = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Document.write = function(content) { 
		/// <signature>
		/// <param name='content' type='String' />
		/// </signature>
		_setInnerHTML(this, content);
	};
	Document.updateSettings = function() { };
	Document.createElement = function(tagName) { 
		/// <signature>
		/// <param name='tagName' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return _createElementByTagName(tagName);
	};
	Document.releaseCapture = function() { };
	Document.writeln = function(content) { 
		/// <signature>
		/// <param name='content' type='String' />
		/// </signature>
		_setInnerHTML(this, content);
	};
	Document.createElementNS = function(namespaceURI, qualifiedName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='qualifiedName' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};
	Document.open = function(url, name, features, replace) { 
		/// <signature>
		/// <param name='url' type='String' optional='true' />
		/// <param name='name' type='String' optional='true' />
		/// <param name='features' type='String' optional='true' />
		/// <param name='replace' type='Boolean' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	Document.queryCommandSupported = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Document.createTreeWalker = function(root, whatToShow, filter, entityReferenceExpansion) { 
		/// <signature>
		/// <param name='root' type='Node' />
		/// <param name='whatToShow' type='Number' />
		/// <param name='filter' type='NodeFilter' />
		/// <param name='entityReferenceExpansion' type='Boolean' />
		/// <returns type='TreeWalker'/>
		/// </signature>
		return TreeWalker; 
	};
	Document.queryCommandEnabled = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Document.createAttributeNS = function(namespaceURI, qualifiedName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='qualifiedName' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Document.msElementsFromPoint = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <returns type='NodeList'/>
		/// </signature>
		return _wrapInList([Object.create(HTMLElement)], NodeList);
	};
	Document.msElementsFromRect = function(left, top, width, height) { 
		/// <signature>
		/// <param name='left' type='Number' />
		/// <param name='top' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <returns type='NodeList'/>
		/// </signature>
		return _wrapInList([Object.create(HTMLElement)], NodeList);
	};
	Document.msExitFullscreen = function() { };
	Document.focus = function() { };
	Document.close = function() { };
	Document.getElementsByClassName = function(classNames) { 
		/// <signature>
		/// <param name='classNames' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	Document.importNode = function(importedNode, deep) { 
		/// <signature>
		/// <param name='importedNode' type='Node' />
		/// <param name='deep' type='Boolean' />
		/// <returns type='Node'/>
		/// </signature>
		return Node; 
	};
	Document.createRange = function() { 
		/// <signature>
		/// <returns type='Range'/>
		/// </signature>
		return Range; 
	};
	Document.createComment = function(data) { 
		/// <signature>
		/// <param name='data' type='String' />
		/// <returns type='Comment'/>
		/// </signature>
		return Comment; 
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
	Document.getElementsByName = function(elementName) { 
		/// <signature>
		/// <param name='elementName' type='String' />
		/// <returns type='NodeList'/>
		/// </signature>
		return NodeList; 
	};
	Document.queryCommandState = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Document.createAttribute = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	Document.hasFocus = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Document.execCommandShowHelp = function(commandId) { 
		/// <signature>
		/// <param name='commandId' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Document.createNodeIterator = function(root, whatToShow, filter, entityReferenceExpansion) { 
		/// <signature>
		/// <param name='root' type='Node' />
		/// <param name='whatToShow' type='Number' />
		/// <param name='filter' type='NodeFilter' />
		/// <param name='entityReferenceExpansion' type='Boolean' />
		/// <returns type='NodeIterator'/>
		/// </signature>
		return NodeIterator; 
	};
	Document.createTextNode = function(data) { 
		/// <signature>
		/// <param name='data' type='String' />
		/// <returns type='Text'/>
		/// </signature>
		return Text; 
	};
	Document.getSelection = function() { 
		/// <signature>
		/// <returns type='Selection'/>
		/// </signature>
		return Selection; 
	};
	Document.getElementById = function(elementId) { 
		/// <signature>
		/// <param name='elementId' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return _getElementById(elementId);
	};
	_events(Document, "onmsgesturedoubletap", "onkeydown", "onkeyup", "onreset", "onmsgesturestart", "onhelp", "ondragleave", "onfocusin", "onseeked", "onmsfullscreenerror", "ondurationchange", "onblur", "onmscontentzoom", "onemptied", "onseeking", "ondeactivate", "oncanplay", "onmspointerout", "onmspointerover", "onloadstart", "onmspointerdown", "ondragenter", "onsubmit", "onchange", "onmsgesturehold", "onmspointercancel", "onbeforeactivate", "oncanplaythrough", "onsuspend", "onmsgesturetap", "onmouseout", "onmsthumbnailclick", "onmsfullscreenchange", "onmousewheel", "onvolumechange", "ondragend", "ondragover", "onmsgesturechange", "ondragstart", "onmouseup", "ondrag", "onmouseover", "onpause", "onmousedown", "onclick", "onwaiting", "onstop", "onmssitemodejumplistitemremoved", "onstalled", "onmousemove", "onmsinertiastart", "onmspointerenter", "onratechange", "onmspointerleave", "onprogress", "ondblclick", "oncontextmenu", "onloadedmetadata", "onmspointermove", "onerror", "onplay", "onplaying", "onmsgestureend", "onabort", "onfocusout", "onselectionchange", "onstoragecommit", "onreadystatechange", "onkeypress", "onmspointerup", "onloadeddata", "onbeforedeactivate", "onactivate", "onmsmanipulationstatechanged", "onselectstart", "onfocus", "ontimeupdate", "onselect", "ondrop", "onended", "onscroll", "onload", "oninput");


	/* -- type: XMLDocument -- */



	/* -- type: WebGLActiveInfo -- */

	WebGLActiveInfo.name = '';
	WebGLActiveInfo.type = 0;
	WebGLActiveInfo.size = 0;


	/* -- type: MSStream -- */

	MSStream.type = '';
	MSStream.msClose = function() { };


	/* -- type: MSFileSaver -- */

	MSFileSaver.msSaveBlob = function(blob, defaultName) { 
		/// <signature>
		/// <param name='blob' type='Object' />
		/// <param name='defaultName' type='String' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSFileSaver.msSaveOrOpenBlob = function(blob, defaultName) { 
		/// <signature>
		/// <param name='blob' type='Object' />
		/// <param name='defaultName' type='String' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


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


	/* -- type: CSSKeyframeRule -- */

	CSSKeyframeRule.keyText = '';
	CSSKeyframeRule.style = CSSStyleDeclaration;


	/* -- type: PopStateEvent -- */

	PopStateEvent.state = {};
	PopStateEvent.initPopStateEvent = function(typeArg, canBubbleArg, cancelableArg, stateArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='stateArg' type='Object' />
		/// </signature>
	};


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


	/* -- type: FrameRequestCallback -- */

	FrameRequestCallback.sample = function(time) { 
		/// <signature>
		/// <param name='time' type='Number' />
		/// </signature>
	};


	/* -- type: PerformanceMeasure -- */



	/* -- type: XMLSerializer -- */

	XMLSerializer.serializeToString = function(target) { 
		/// <signature>
		/// <param name='target' type='Node' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: Blob -- */

	Blob.type = '';
	Blob.size = 0;
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


	/* -- type: HTMLDTElement -- */

	HTMLDTElement.noWrap = false;
	HTMLDTElement.nodeName = HTMLDTElement.tagName = 'DT';
	HTMLDTElement.localName = 'dt';


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


	/* -- type: DeviceOrientationEvent -- */

	DeviceOrientationEvent.gamma = 0;
	DeviceOrientationEvent.alpha = 0;
	DeviceOrientationEvent.absolute = false;
	DeviceOrientationEvent.beta = 0;
	DeviceOrientationEvent.initDeviceOrientationEvent = function(type, bubbles, cancelable, alpha, beta, gamma, absolute) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='bubbles' type='Boolean' />
		/// <param name='cancelable' type='Boolean' />
		/// <param name='alpha' type='Number' />
		/// <param name='beta' type='Number' />
		/// <param name='gamma' type='Number' />
		/// <param name='absolute' type='Boolean' />
		/// </signature>
	};


	/* -- type: MSBaseReader -- */
	_$implement(MSBaseReader, EventTarget);

	MSBaseReader.readyState = 0;
	MSBaseReader.result = {};
	MSBaseReader.LOADING = 1;
	MSBaseReader.EMPTY = 0;
	MSBaseReader.DONE = 2;
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


	/* -- type: StyleSheet -- */

	StyleSheet.disabled = false;
	StyleSheet.ownerNode = Node;
	StyleSheet.media = MediaList;
	StyleSheet.href = '';
	StyleSheet.parentStyleSheet = _$getTrackingNull(Object.create(StyleSheet));
	StyleSheet.title = '';
	StyleSheet.type = '';


	/* -- type: MSMimeTypesCollection -- */

	MSMimeTypesCollection.length = 0;


	/* -- type: DOMParser -- */

	DOMParser.parseFromString = function(source, mimeType) { 
		/// <signature>
		/// <param name='source' type='String' />
		/// <param name='mimeType' type='String' />
		/// <returns type='Document'/>
		/// </signature>
		return Document; 
	};


	/* -- type: MutationObserverInit -- */

	MutationObserverInit.characterDataOldValue = false;
	MutationObserverInit.characterData = false;
	MutationObserverInit.attributeOldValue = false;
	MutationObserverInit.subtree = false;
	MutationObserverInit.childList = false;
	MutationObserverInit.attributes = false;
	MutationObserverInit.attributeFilter = new Array();


	/* -- type: MSUnsafeFunctionCallback -- */

	MSUnsafeFunctionCallback.callback = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};


	/* -- type: MimeTypeArray -- */

	MimeTypeArray.length = 0;
	MimeTypeArray.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Plugin'/>
		/// </signature>
		return Plugin; 
	};
	MimeTypeArray.namedItem = function(type) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <returns type='Plugin'/>
		/// </signature>
		return Plugin; 
	};


	/* -- type: MSHTMLCollectionExtensions -- */



	/* -- type: HTMLFormElement -- */
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
	HTMLFormElement.encoding = '';
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
		return {}; 
	};
	HTMLFormElement.namedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	HTMLFormElement.nodeName = HTMLFormElement.tagName = 'FORM';
	HTMLFormElement.localName = 'form';


	/* -- type: SVGZoomAndPan -- */

	SVGZoomAndPan.zoomAndPan = 0;
	SVGZoomAndPan.SVG_ZOOMANDPAN_MAGNIFY = 2;
	SVGZoomAndPan.SVG_ZOOMANDPAN_DISABLE = 1;
	SVGZoomAndPan.SVG_ZOOMANDPAN_UNKNOWN = 0;


	/* -- type: DOML2DeprecatedTextFlowControl -- */

	DOML2DeprecatedTextFlowControl.clear = '';


	/* -- type: HTMLHeadingElement -- */
	_$implement(HTMLHeadingElement, DOML2DeprecatedTextFlowControl);

	HTMLHeadingElement.align = '';
	HTMLHeadingElement.nodeName = HTMLHeadingElement.tagName = 'H1';
	HTMLHeadingElement.localName = 'h1';


	/* -- type: SVGFEOffsetElement -- */
	_$implement(SVGFEOffsetElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEOffsetElement.dy = SVGAnimatedNumber;
	SVGFEOffsetElement.in1 = SVGAnimatedString;
	SVGFEOffsetElement.dx = SVGAnimatedNumber;
	SVGFEOffsetElement.nodeName = SVGFEOffsetElement.tagName = 'FEOFFSET';
	SVGFEOffsetElement.localName = 'feoffset';


	/* -- type: HTMLHeadElement -- */

	HTMLHeadElement.profile = '';
	HTMLHeadElement.nodeName = HTMLHeadElement.tagName = 'HEAD';
	HTMLHeadElement.localName = 'head';


	/* -- type: MsZoomToOptions -- */

	MsZoomToOptions.viewportY = '';
	MsZoomToOptions.contentX = 0;
	MsZoomToOptions.animate = '';
	MsZoomToOptions.scaleFactor = 0;
	MsZoomToOptions.viewportX = '';
	MsZoomToOptions.contentY = 0;


	/* -- type: HTMLSpanElement -- */
	_$implement(HTMLSpanElement, MSDataBindingExtensions);

	HTMLSpanElement.nodeName = HTMLSpanElement.tagName = 'SPAN';
	HTMLSpanElement.localName = 'span';


	/* -- type: HTMLProgressElement -- */

	HTMLProgressElement.value = 0;
	HTMLProgressElement.max = 0;
	HTMLProgressElement.position = 0;
	HTMLProgressElement.form = HTMLFormElement;
	HTMLProgressElement.nodeName = HTMLProgressElement.tagName = 'PROGRESS';
	HTMLProgressElement.localName = 'progress';


	/* -- type: MSNavigatorExtensions -- */

	MSNavigatorExtensions.userLanguage = '';
	MSNavigatorExtensions.cookieEnabled = false;
	MSNavigatorExtensions.plugins = MSPluginsCollection;
	MSNavigatorExtensions.language = '';
	MSNavigatorExtensions.cpuClass = '';
	MSNavigatorExtensions.appCodeName = '';
	MSNavigatorExtensions.appMinorVersion = '';
	MSNavigatorExtensions.connectionSpeed = 0;
	MSNavigatorExtensions.browserLanguage = '';
	MSNavigatorExtensions.mimeTypes = MSMimeTypesCollection;
	MSNavigatorExtensions.systemLanguage = '';
	MSNavigatorExtensions.javaEnabled = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSNavigatorExtensions.taintEnabled = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


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


	/* -- type: HTMLBRElement -- */

	HTMLBRElement.clear = '';
	HTMLBRElement.nodeName = HTMLBRElement.tagName = 'BR';
	HTMLBRElement.localName = 'br';


	/* -- type: CSSPageRule -- */

	CSSPageRule.pseudoClass = '';
	CSSPageRule.selector = '';
	CSSPageRule.selectorText = '';
	CSSPageRule.style = CSSStyleDeclaration;


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
		return this[index] || _$getTrackingNull({}); 
	};
	/* Add a single array element */
	BookmarkCollection[0] = _$getTrackingNull({});


	/* -- type: DeviceAcceleration -- */

	DeviceAcceleration.y = 0;
	DeviceAcceleration.x = 0;
	DeviceAcceleration.z = 0;


	/* -- type: SVGAnimatedPathData -- */

	SVGAnimatedPathData.pathSegList = SVGPathSegList;


	/* -- type: Position -- */

	Position.timestamp = 0;
	Position.coords = Coordinates;


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


	/* -- type: DocumentFragment -- */
	_$implement(DocumentFragment, NodeSelector);
	_$implement(DocumentFragment, MSEventAttachmentTarget);
	_$implement(DocumentFragment, MSNodeExtensions);

	DocumentFragment.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
	DocumentFragment.nodeName = '#document-fragment';


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
		/// <param name='viewArg' type='Window' />
		/// <param name='dataArg' type='String' />
		/// <param name='inputMethod' type='Number' />
		/// <param name='locale' type='String' />
		/// </signature>
	};


	/* -- type: DOML2DeprecatedBackgroundStyle -- */

	DOML2DeprecatedBackgroundStyle.background = '';


	/* -- type: CSSFontFaceRule -- */

	CSSFontFaceRule.style = CSSStyleDeclaration;


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


	/* -- type: MSGraphicsTrust -- */

	MSGraphicsTrust.status = '';
	MSGraphicsTrust.constrictionActive = false;


	/* -- type: MSWindowExtensions -- */

	MSWindowExtensions.status = '';
	MSWindowExtensions.screenLeft = 0;
	MSWindowExtensions.offscreenBuffering = {};
	MSWindowExtensions.maxConnectionsPerServer = 0;
	MSWindowExtensions.clipboardData = DataTransfer;
	MSWindowExtensions.defaultStatus = '';
	MSWindowExtensions.clientInformation = Navigator;
	MSWindowExtensions.closed = false;
	MSWindowExtensions.external = External;
	MSWindowExtensions.event = MSEventObj;
	MSWindowExtensions.screenTop = 0;
	MSWindowExtensions.showModelessDialog = function(url, argument, options) { 
		/// <signature>
		/// <param name='url' type='String' optional='true' />
		/// <param name='argument' type='Object' optional='true' />
		/// <param name='options' type='Object' optional='true' />
		/// <returns type='Window'/>
		/// </signature>
		return Window; 
	};
	MSWindowExtensions.resizeBy = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	MSWindowExtensions.navigate = function(url) { 
		/// <signature>
		/// <param name='url' type='String' />
		/// </signature>
	};
	MSWindowExtensions.captureEvents = function() { };
	MSWindowExtensions.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		/// <signature>
		/// <param name='index' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	MSWindowExtensions.releaseEvents = function() { };
	MSWindowExtensions.resizeTo = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
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
	MSWindowExtensions.moveTo = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	MSWindowExtensions.showHelp = function(url, helpArg, features) { 
		/// <signature>
		/// <param name='url' type='String' />
		/// <param name='helpArg' type='Number' optional='true' />
		/// <param name='features' type='String' optional='true' />
		/// </signature>
		/// <signature>
		/// <param name='url' type='String' />
		/// <param name='helpArg' type='String' optional='true' />
		/// <param name='features' type='String' optional='true' />
		/// </signature>
	};
	MSWindowExtensions.moveBy = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	_events(MSWindowExtensions, "onmouseleave", "onmouseenter", "onhelp", "onfocusout", "onfocusin");


	/* -- type: ProcessingInstruction -- */

	ProcessingInstruction.target = '';
	ProcessingInstruction.data = '';
	ProcessingInstruction.nodeType = Node.PROCESSING_INSTRUCTION_NODE;


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


	/* -- type: SVGPathSegCurvetoCubicSmoothRel -- */

	SVGPathSegCurvetoCubicSmoothRel.y = 0;
	SVGPathSegCurvetoCubicSmoothRel.x2 = 0;
	SVGPathSegCurvetoCubicSmoothRel.x = 0;
	SVGPathSegCurvetoCubicSmoothRel.y2 = 0;


	/* -- type: SVGPathSegCurvetoQuadraticSmoothAbs -- */

	SVGPathSegCurvetoQuadraticSmoothAbs.y = 0;
	SVGPathSegCurvetoQuadraticSmoothAbs.x = 0;


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


	/* -- type: NamedNodeMap -- */

	NamedNodeMap.length = 0;
	NamedNodeMap.removeNamedItemNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	NamedNodeMap.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	NamedNodeMap.removeNamedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	NamedNodeMap.getNamedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	NamedNodeMap.setNamedItemNS = function(arg) { 
		/// <signature>
		/// <param name='arg' type='Attr' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	NamedNodeMap.getNamedItemNS = function(namespaceURI, localName) { 
		/// <signature>
		/// <param name='namespaceURI' type='String' />
		/// <param name='localName' type='String' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};
	NamedNodeMap.setNamedItem = function(arg) { 
		/// <signature>
		/// <param name='arg' type='Attr' />
		/// <returns type='Attr'/>
		/// </signature>
		return Attr; 
	};


	/* -- type: IDBKeyRange -- */

	IDBKeyRange.upper = {};
	IDBKeyRange.upperOpen = false;
	IDBKeyRange.lower = {};
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


	/* -- type: HTMLDivElement -- */
	_$implement(HTMLDivElement, MSDataBindingExtensions);

	HTMLDivElement.align = '';
	HTMLDivElement.noWrap = false;
	HTMLDivElement.nodeName = HTMLDivElement.tagName = 'DIV';
	HTMLDivElement.localName = 'div';


	/* -- type: ErrorEventHandler -- */

	ErrorEventHandler.handleWindowError = function(event, source, fileno, columnNumber) { 
		/// <signature>
		/// <param name='event' type='Event' />
		/// <param name='source' type='String' />
		/// <param name='fileno' type='Number' />
		/// <param name='columnNumber' type='Number' />
		/// </signature>
	};


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


	/* -- type: DOML2DeprecatedListNumberingAndBulletStyle -- */

	DOML2DeprecatedListNumberingAndBulletStyle.type = '';


	/* -- type: DOML2DeprecatedListSpaceReduction -- */

	DOML2DeprecatedListSpaceReduction.compact = false;


	/* -- type: HTMLUListElement -- */
	_$implement(HTMLUListElement, DOML2DeprecatedListNumberingAndBulletStyle);
	_$implement(HTMLUListElement, DOML2DeprecatedListSpaceReduction);

	HTMLUListElement.nodeName = HTMLUListElement.tagName = 'UL';
	HTMLUListElement.localName = 'ul';


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


	/* -- type: SVGFEFuncBElement -- */

	SVGFEFuncBElement.nodeName = SVGFEFuncBElement.tagName = 'FEFUNCB';
	SVGFEFuncBElement.localName = 'fefuncb';


	/* -- type: SVGAnimatedEnumeration -- */

	SVGAnimatedEnumeration.animVal = 0;
	SVGAnimatedEnumeration.baseVal = 0;


	/* -- type: HTMLTableAlignment -- */

	HTMLTableAlignment.ch = '';
	HTMLTableAlignment.vAlign = '';
	HTMLTableAlignment.chOff = '';


	/* -- type: SVGLinearGradientElement -- */

	SVGLinearGradientElement.y1 = SVGAnimatedLength;
	SVGLinearGradientElement.x2 = SVGAnimatedLength;
	SVGLinearGradientElement.y2 = SVGAnimatedLength;
	SVGLinearGradientElement.x1 = SVGAnimatedLength;
	SVGLinearGradientElement.nodeName = SVGLinearGradientElement.tagName = 'LINEARGRADIENT';
	SVGLinearGradientElement.localName = 'lineargradient';


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


	/* -- type: HTMLDocument -- */



	/* -- type: HTMLTableColElement -- */
	_$implement(HTMLTableColElement, HTMLTableAlignment);

	HTMLTableColElement.width = {};
	HTMLTableColElement.align = '';
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


	/* -- type: BeforeUnloadEvent -- */

	BeforeUnloadEvent.returnValue = '';


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


	/* -- type: WEBGL_compressed_texture_s3tc -- */

	WEBGL_compressed_texture_s3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
	WEBGL_compressed_texture_s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;
	WEBGL_compressed_texture_s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
	WEBGL_compressed_texture_s3tc.COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;


	/* -- type: HTMLModElement -- */

	HTMLModElement.dateTime = '';
	HTMLModElement.cite = '';
	HTMLModElement.nodeName = HTMLModElement.tagName = 'INS';
	HTMLModElement.localName = 'ins';


	/* -- type: WebGLUniformLocation -- */



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
		return _$setTimeout(expression, null, args);
	};
	WindowTimersExtension.clearImmediate = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
		_$clearTimeout(handle);
	};
	WindowTimersExtension.msClearImmediate = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
		_$clearTimeout(handle);
	};
	WindowTimersExtension.setImmediate = function(expression, args) { 
		/// <signature>
		/// <param name='expression' type='Object' />
		/// <param name='args' type='Object' />
		/// <returns type='Number'/>
		/// </signature>
		return _$setTimeout(expression, null, args);
	};


	/* -- type: SVGFEFuncRElement -- */

	SVGFEFuncRElement.nodeName = SVGFEFuncRElement.tagName = 'FEFUNCR';
	SVGFEFuncRElement.localName = 'fefuncr';


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


	/* -- type: SVGPathSegCurvetoCubicAbs -- */

	SVGPathSegCurvetoCubicAbs.y1 = 0;
	SVGPathSegCurvetoCubicAbs.y = 0;
	SVGPathSegCurvetoCubicAbs.x2 = 0;
	SVGPathSegCurvetoCubicAbs.x = 0;
	SVGPathSegCurvetoCubicAbs.y2 = 0;
	SVGPathSegCurvetoCubicAbs.x1 = 0;


	/* -- type: History -- */

	History.length = 0;
	History.state = {};
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


	/* -- type: EXT_texture_filter_anisotropic -- */

	EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE;
	EXT_texture_filter_anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;


	/* -- type: SVGRect -- */

	SVGRect.width = 0;
	SVGRect.y = 0;
	SVGRect.x = 0;
	SVGRect.height = 0;


	/* -- type: DOML2DeprecatedBackgroundColorStyle -- */

	DOML2DeprecatedBackgroundColorStyle.bgColor = {};


	/* -- type: HTMLMarqueeElement -- */
	_$implement(HTMLMarqueeElement, MSDataBindingExtensions);
	_$implement(HTMLMarqueeElement, DOML2DeprecatedBackgroundColorStyle);

	HTMLMarqueeElement.vspace = 0;
	HTMLMarqueeElement.width = '';
	HTMLMarqueeElement.trueSpeed = false;
	HTMLMarqueeElement.scrollDelay = 0;
	HTMLMarqueeElement.scrollAmount = 0;
	HTMLMarqueeElement.height = '';
	HTMLMarqueeElement.behavior = '';
	HTMLMarqueeElement.loop = 0;
	HTMLMarqueeElement.direction = '';
	HTMLMarqueeElement.hspace = 0;
	HTMLMarqueeElement.stop = function() { };
	HTMLMarqueeElement.start = function() { };
	HTMLMarqueeElement.nodeName = HTMLMarqueeElement.tagName = 'MARQUEE';
	HTMLMarqueeElement.localName = 'marquee';
	_events(HTMLMarqueeElement, "onbounce", "onstart", "onfinish");


	/* -- type: MSWindowModeless -- */

	MSWindowModeless.dialogTop = {};
	MSWindowModeless.dialogLeft = {};
	MSWindowModeless.dialogWidth = {};
	MSWindowModeless.dialogHeight = {};
	MSWindowModeless.menuArguments = {};


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


	/* -- type: HTMLTextAreaElement -- */
	_$implement(HTMLTextAreaElement, MSDataBindingExtensions);

	HTMLTextAreaElement.validationMessage = '';
	HTMLTextAreaElement.status = {};
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
	HTMLTextAreaElement.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
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


	/* -- type: HTMLBaseFontElement -- */
	_$implement(HTMLBaseFontElement, DOML2DeprecatedColorProperty);

	HTMLBaseFontElement.face = '';
	HTMLBaseFontElement.size = 0;
	HTMLBaseFontElement.nodeName = HTMLBaseFontElement.tagName = 'BASEFONT';
	HTMLBaseFontElement.localName = 'basefont';


	/* -- type: CustomEvent -- */

	CustomEvent.detail = {};
	CustomEvent.initCustomEvent = function(typeArg, canBubbleArg, cancelableArg, detailArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='detailArg' type='Object' />
		/// </signature>
	};


	/* -- type: CSSImportRule -- */

	CSSImportRule.styleSheet = CSSStyleSheet;
	CSSImportRule.media = MediaList;
	CSSImportRule.href = '';


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


	/* -- type: ExceptionInformation -- */

	ExceptionInformation.domain = '';


	/* -- type: StoreExceptionsInformation -- */

	StoreExceptionsInformation.detailURI = '';
	StoreExceptionsInformation.siteName = '';
	StoreExceptionsInformation.explanationString = '';


	/* -- type: StoreSiteSpecificExceptionsInformation -- */

	StoreSiteSpecificExceptionsInformation.arrayOfDomainStrings = new Array();


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


	/* -- type: MimeType -- */

	MimeType.enabledPlugin = Plugin;
	MimeType.suffixes = '';
	MimeType.type = '';
	MimeType.description = '';


	/* -- type: MouseEvent -- */

	MouseEvent.toElement = HTMLElement;
	MouseEvent.pageX = 0;
	MouseEvent.which = 0;
	MouseEvent.fromElement = HTMLElement;
	MouseEvent.layerY = 0;
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
	MouseEvent.layerX = 0;
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
		/// <param name='viewArg' type='Window' />
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


	/* -- type: PointerEvent -- */

	PointerEvent.width = 0;
	PointerEvent.rotation = 0;
	PointerEvent.pressure = 0;
	PointerEvent.pointerType = {};
	PointerEvent.isPrimary = false;
	PointerEvent.tiltY = 0;
	PointerEvent.height = 0;
	PointerEvent.tiltX = 0;
	PointerEvent.hwTimestamp = 0;
	PointerEvent.pointerId = 0;
	PointerEvent.initPointerEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg, offsetXArg, offsetYArg, widthArg, heightArg, pressure, rotation, tiltX, tiltY, pointerIdArg, pointerType, hwTimestampArg, isPrimary) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
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
		/// <param name='pointerType' type='Object' />
		/// <param name='hwTimestampArg' type='Number' />
		/// <param name='isPrimary' type='Boolean' />
		/// </signature>
	};


	/* -- type: HTMLTableCellElement -- */
	_$implement(HTMLTableCellElement, HTMLTableAlignment);
	_$implement(HTMLTableCellElement, DOML2DeprecatedBackgroundColorStyle);
	_$implement(HTMLTableCellElement, DOML2DeprecatedBackgroundStyle);

	HTMLTableCellElement.width = 0;
	HTMLTableCellElement.headers = '';
	HTMLTableCellElement.align = '';
	HTMLTableCellElement.cellIndex = 0;
	HTMLTableCellElement.borderColorLight = {};
	HTMLTableCellElement.borderColor = {};
	HTMLTableCellElement.colSpan = 0;
	HTMLTableCellElement.height = {};
	HTMLTableCellElement.axis = '';
	HTMLTableCellElement.noWrap = false;
	HTMLTableCellElement.abbr = '';
	HTMLTableCellElement.rowSpan = 0;
	HTMLTableCellElement.borderColorDark = {};
	HTMLTableCellElement.scope = '';


	/* -- type: DeviceRotationRateDict -- */

	DeviceRotationRateDict.gamma = 0;
	DeviceRotationRateDict.alpha = 0;
	DeviceRotationRateDict.beta = 0;


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


	/* -- type: MediaSource -- */
	_$implement(MediaSource, EventTarget);

	MediaSource.sourceBuffers = SourceBufferList;
	MediaSource.duration = 0;
	MediaSource.readyState = 0;
	MediaSource.activeSourceBuffers = SourceBufferList;
	MediaSource.addSourceBuffer = function(type) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <returns type='SourceBuffer'/>
		/// </signature>
		return SourceBuffer; 
	};
	MediaSource.endOfStream = function(error) { 
		/// <signature>
		/// <param name='error' type='Number' optional='true' />
		/// </signature>
	};
	MediaSource.isTypeSupported = function(type) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MediaSource.removeSourceBuffer = function(sourceBuffer) { 
		/// <signature>
		/// <param name='sourceBuffer' type='SourceBuffer' />
		/// </signature>
	};


	/* -- type: HTMLAudioElement -- */

	HTMLAudioElement.nodeName = HTMLAudioElement.tagName = 'AUDIO';
	HTMLAudioElement.localName = 'audio';


	/* -- type: MSDataBindingRecordSetReadonlyExtensions -- */

	MSDataBindingRecordSetReadonlyExtensions.recordset = {};
	MSDataBindingRecordSetReadonlyExtensions.namedRecordset = function(dataMember, hierarchy) { 
		/// <signature>
		/// <param name='dataMember' type='String' />
		/// <param name='hierarchy' type='Object' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};


	/* -- type: HTMLUnknownElement -- */
	_$implement(HTMLUnknownElement, MSDataBindingRecordSetReadonlyExtensions);



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


	/* -- type: IDBCursor -- */

	IDBCursor.source = {};
	IDBCursor.direction = '';
	IDBCursor.key = {};
	IDBCursor.primaryKey = {};
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


	/* -- type: CSSNamespaceRule -- */

	CSSNamespaceRule.namespaceURI = '';
	CSSNamespaceRule.prefix = '';


	/* -- type: SVGAnimatedRect -- */

	SVGAnimatedRect.animVal = SVGRect;
	SVGAnimatedRect.baseVal = SVGRect;


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


	/* -- type: MSCompatibleInfo -- */

	MSCompatibleInfo.version = '';
	MSCompatibleInfo.userAgent = '';


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


	/* -- type: SVGNumber -- */

	SVGNumber.value = 0;


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
		/// <param name='viewArg' type='Window' />
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
		return _createIDBRequest(IDBRequest, this.objectStore, {});
	};
	IDBIndex.openCursor = function(range, direction) { 
		/// <signature>
		/// <param name='range' type='IDBKeyRange' optional='true' />
		/// <param name='direction' type='String' optional='true' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		var cursor = Object.create(IDBCursorWithValue); cursor.source = this; return _createIDBRequest(IDBRequest, this, cursor);
	};


	/* -- type: WebGLObject -- */



	/* -- type: WebGLBuffer -- */



	/* -- type: WebGLShader -- */



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


	/* -- type: MSMediaKeys -- */

	MSMediaKeys.keySystem = '';
	MSMediaKeys.createSession = function(type, initData, cdmData) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <param name='initData' type='Uint8Array' />
		/// <param name='cdmData' type='Uint8Array' optional='true' />
		/// <returns type='MSMediaKeySession'/>
		/// </signature>
		return MSMediaKeySession; 
	};
	MSMediaKeys.isTypeSupported = function(keySystem, type) { 
		/// <signature>
		/// <param name='keySystem' type='String' />
		/// <param name='type' type='String' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: ConfirmSiteSpecificExceptionsInformation -- */

	ConfirmSiteSpecificExceptionsInformation.arrayOfDomainStrings = new Array();


	/* -- type: HTMLStyleElement -- */
	_$implement(HTMLStyleElement, LinkStyle);

	HTMLStyleElement.media = '';
	HTMLStyleElement.type = '';
	HTMLStyleElement.nodeName = HTMLStyleElement.tagName = 'STYLE';
	HTMLStyleElement.localName = 'style';


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


	/* -- type: HTMLTitleElement -- */

	HTMLTitleElement.text = '';
	HTMLTitleElement.nodeName = HTMLTitleElement.tagName = 'TITLE';
	HTMLTitleElement.localName = 'title';


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


	/* -- type: HTMLCanvasElement -- */

	HTMLCanvasElement.width = 0;
	HTMLCanvasElement.height = 0;
	HTMLCanvasElement.toDataURL = function(type, args) { 
		/// <signature>
		/// <param name='type' type='String' optional='true' />
		/// <param name='args' type='Object' />
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
	HTMLCanvasElement.getContext = function(contextId, args) { 
		/// <signature>
		/// <param name='contextId' type='String' />
		/// <param name='args' type='Object' />
		/// <returns type='Object'/>
		/// </signature>
		switch (contextId) { case "2d": return CanvasRenderingContext2D; case "experimental-webgl": return WebGLRenderingContext; default: return null; }
	};
	HTMLCanvasElement.nodeName = HTMLCanvasElement.tagName = 'CANVAS';
	HTMLCanvasElement.localName = 'canvas';


	/* -- type: MSEventObj -- */

	MSEventObj.nextPage = '';
	MSEventObj.toElement = HTMLElement;
	MSEventObj.keyCode = 0;
	MSEventObj.returnValue = {};
	MSEventObj.dataFld = '';
	MSEventObj.y = 0;
	MSEventObj.dataTransfer = DataTransfer;
	MSEventObj.propertyName = '';
	MSEventObj.url = '';
	MSEventObj.recordset = {};
	MSEventObj.offsetX = 0;
	MSEventObj.screenX = 0;
	MSEventObj.buttonID = 0;
	MSEventObj.wheelDelta = 0;
	MSEventObj.reason = 0;
	MSEventObj.origin = '';
	MSEventObj.srcFilter = {};
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


	/* -- type: NavigatorStorageUtils -- */



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


	/* -- type: DOMError -- */

	DOMError.name = '';
	DOMError.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};


	/* -- type: SVGPolygonElement -- */
	_$implement(SVGPolygonElement, SVGStylable);
	_$implement(SVGPolygonElement, SVGTransformable);
	_$implement(SVGPolygonElement, SVGLangSpace);
	_$implement(SVGPolygonElement, SVGAnimatedPoints);
	_$implement(SVGPolygonElement, SVGTests);
	_$implement(SVGPolygonElement, SVGExternalResourcesRequired);

	SVGPolygonElement.nodeName = SVGPolygonElement.tagName = 'POLYGON';
	SVGPolygonElement.localName = 'polygon';


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


	/* -- type: MutationRecord -- */

	MutationRecord.oldValue = '';
	MutationRecord.previousSibling = Node;
	MutationRecord.addedNodes = NodeList;
	MutationRecord.attributeName = '';
	MutationRecord.removedNodes = NodeList;
	MutationRecord.target = Node;
	MutationRecord.nextSibling = Node;
	MutationRecord.attributeNamespace = '';
	MutationRecord.type = '';


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


	/* -- type: SVGPathSegMovetoAbs -- */

	SVGPathSegMovetoAbs.y = 0;
	SVGPathSegMovetoAbs.x = 0;


	/* -- type: SVGPathSegArcRel -- */

	SVGPathSegArcRel.y = 0;
	SVGPathSegArcRel.sweepFlag = false;
	SVGPathSegArcRel.r2 = 0;
	SVGPathSegArcRel.angle = 0;
	SVGPathSegArcRel.x = 0;
	SVGPathSegArcRel.largeArcFlag = false;
	SVGPathSegArcRel.r1 = 0;


	/* -- type: SVGMetadataElement -- */

	SVGMetadataElement.nodeName = SVGMetadataElement.tagName = 'METADATA';
	SVGMetadataElement.localName = 'metadata';


	/* -- type: WindowLocalStorage -- */

	WindowLocalStorage.localStorage = Storage;


	/* -- type: WebGLFramebuffer -- */



	/* -- type: NavigatorOnLine -- */

	NavigatorOnLine.onLine = false;


	/* -- type: MSNavigatorDoNotTrack -- */

	MSNavigatorDoNotTrack.removeWebWideTrackingException = function(args) { 
		/// <signature>
		/// <param name='args' type='ExceptionInformation' />
		/// </signature>
	};
	MSNavigatorDoNotTrack.removeSiteSpecificTrackingException = function(args) { 
		/// <signature>
		/// <param name='args' type='ExceptionInformation' />
		/// </signature>
	};
	MSNavigatorDoNotTrack.storeWebWideTrackingException = function(args) { 
		/// <signature>
		/// <param name='args' type='StoreExceptionsInformation' />
		/// </signature>
	};
	MSNavigatorDoNotTrack.storeSiteSpecificTrackingException = function(args) { 
		/// <signature>
		/// <param name='args' type='StoreSiteSpecificExceptionsInformation' />
		/// </signature>
	};
	MSNavigatorDoNotTrack.confirmWebWideTrackingException = function(args) { 
		/// <signature>
		/// <param name='args' type='ExceptionInformation' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSNavigatorDoNotTrack.confirmSiteSpecificTrackingException = function(args) { 
		/// <signature>
		/// <param name='args' type='ConfirmSiteSpecificExceptionsInformation' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


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


	/* -- type: WebGLContextAttributes -- */

	WebGLContextAttributes.alpha = false;
	WebGLContextAttributes.premultipliedAlpha = false;
	WebGLContextAttributes.antialias = false;
	WebGLContextAttributes.stencil = false;
	WebGLContextAttributes.depth = false;
	WebGLContextAttributes.preserveDrawingBuffer = false;


	/* -- type: HTMLPreElement -- */
	_$implement(HTMLPreElement, DOML2DeprecatedTextFlowControl);

	HTMLPreElement.width = 0;
	HTMLPreElement.cite = '';
	HTMLPreElement.nodeName = HTMLPreElement.tagName = 'PRE';
	HTMLPreElement.localName = 'pre';


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
		return {}; 
	};


	/* -- type: SVGAnimatedNumber -- */

	SVGAnimatedNumber.animVal = 0;
	SVGAnimatedNumber.baseVal = 0;


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


	/* -- type: Key -- */

	Key.algorithm = Algorithm;
	Key.type = '';
	Key.extractable = false;
	Key.keyUsage = new Array();


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


	/* -- type: HTMLParamElement -- */

	HTMLParamElement.value = '';
	HTMLParamElement.name = '';
	HTMLParamElement.type = '';
	HTMLParamElement.valueType = '';
	HTMLParamElement.nodeName = HTMLParamElement.tagName = 'PARAM';
	HTMLParamElement.localName = 'param';


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


	/* -- type: HTMLAnchorElement -- */
	_$implement(HTMLAnchorElement, MSDataBindingExtensions);

	HTMLAnchorElement.protocol = '';
	HTMLAnchorElement.rel = '';
	HTMLAnchorElement.search = '';
	HTMLAnchorElement.coords = '';
	HTMLAnchorElement.hostname = '';
	HTMLAnchorElement.Methods = '';
	HTMLAnchorElement.pathname = '';
	HTMLAnchorElement.target = '';
	HTMLAnchorElement.protocolLong = '';
	HTMLAnchorElement.text = '';
	HTMLAnchorElement.href = '';
	HTMLAnchorElement.name = '';
	HTMLAnchorElement.charset = '';
	HTMLAnchorElement.hreflang = '';
	HTMLAnchorElement.port = '';
	HTMLAnchorElement.host = '';
	HTMLAnchorElement.hash = '';
	HTMLAnchorElement.urn = '';
	HTMLAnchorElement.nameProp = '';
	HTMLAnchorElement.rev = '';
	HTMLAnchorElement.mimeType = '';
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


	/* -- type: HTMLInputElement -- */
	_$implement(HTMLInputElement, MSDataBindingExtensions);

	HTMLInputElement.validationMessage = '';
	HTMLInputElement.files = FileList;
	HTMLInputElement.max = '';
	HTMLInputElement.formTarget = '';
	HTMLInputElement.form = HTMLFormElement;
	HTMLInputElement.selectionStart = 0;
	HTMLInputElement.willValidate = false;
	HTMLInputElement.loop = 0;
	HTMLInputElement.readOnly = false;
	HTMLInputElement.step = '';
	HTMLInputElement.required = false;
	HTMLInputElement.list = HTMLElement;
	HTMLInputElement.autocomplete = '';
	HTMLInputElement.align = '';
	HTMLInputElement.src = '';
	HTMLInputElement.value = '';
	HTMLInputElement.useMap = '';
	HTMLInputElement.name = '';
	HTMLInputElement.formAction = '';
	HTMLInputElement.checked = false;
	HTMLInputElement.validity = ValidityState;
	HTMLInputElement.type = '';
	HTMLInputElement.defaultValue = '';
	HTMLInputElement.start = '';
	HTMLInputElement.width = '';
	HTMLInputElement.status = false;
	HTMLInputElement.indeterminate = false;
	HTMLInputElement.size = 0;
	HTMLInputElement.autofocus = false;
	HTMLInputElement.formEnctype = '';
	HTMLInputElement.selectionEnd = 0;
	HTMLInputElement.valueAsNumber = 0;
	HTMLInputElement.placeholder = '';
	HTMLInputElement.vrml = '';
	HTMLInputElement.formMethod = '';
	HTMLInputElement.lowsrc = '';
	HTMLInputElement.vspace = 0;
	HTMLInputElement.defaultChecked = false;
	HTMLInputElement.alt = '';
	HTMLInputElement.accept = '';
	HTMLInputElement.min = '';
	HTMLInputElement.height = '';
	HTMLInputElement.border = '';
	HTMLInputElement.dynsrc = '';
	HTMLInputElement.pattern = '';
	HTMLInputElement.hspace = 0;
	HTMLInputElement.formNoValidate = '';
	HTMLInputElement.maxLength = 0;
	HTMLInputElement.multiple = false;
	HTMLInputElement.complete = false;
	HTMLInputElement.checkValidity = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	HTMLInputElement.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
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


	/* -- type: HTMLTableSectionElement -- */
	_$implement(HTMLTableSectionElement, HTMLTableAlignment);
	_$implement(HTMLTableSectionElement, DOML2DeprecatedBackgroundColorStyle);

	HTMLTableSectionElement.align = '';
	HTMLTableSectionElement.rows = _createHTMLCollection('tr');
	HTMLTableSectionElement.deleteRow = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' optional='true' />
		/// </signature>
	};
	HTMLTableSectionElement.moveRow = function(indexFrom, indexTo) { 
		/// <signature>
		/// <param name='indexFrom' type='Number' optional='true' />
		/// <param name='indexTo' type='Number' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
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


	/* -- type: RandomSource -- */

	RandomSource.getRandomValues = function(array) { 
		/// <signature>
		/// <param name='array' type='Uint8Array' />
		/// <returns type='Uint8Array'/>
		/// </signature>
		return new Uint8Array(); 
	};


	/* -- type: Crypto -- */
	_$implement(Crypto, RandomSource);

	Crypto.subtle = SubtleCrypto;


	/* -- type: SubtleCrypto -- */

	SubtleCrypto.unwrapKey = function(wrappedKey, keyAlgorithm, keyEncryptionKey, extractable, keyUsages) { 
		/// <signature>
		/// <param name='wrappedKey' type='Uint8Array' />
		/// <param name='keyAlgorithm' type='String' />
		/// <param name='keyEncryptionKey' type='Key' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='wrappedKey' type='Uint8Array' />
		/// <param name='keyAlgorithm' type='Algorithm' />
		/// <param name='keyEncryptionKey' type='Key' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		return KeyOperation; 
	};
	SubtleCrypto.encrypt = function(algorithm, key, buffer) { 
		/// <signature>
		/// <param name='algorithm' type='String' />
		/// <param name='key' type='Key' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='key' type='Key' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		return CryptoOperation; 
	};
	SubtleCrypto.importKey = function(format, keyData, algorithm, extractable, keyUsages) { 
		/// <signature>
		/// <param name='format' type='String' />
		/// <param name='keyData' type='Uint8Array' />
		/// <param name='algorithm' type='String' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='format' type='String' />
		/// <param name='keyData' type='Uint8Array' />
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		return KeyOperation; 
	};
	SubtleCrypto.wrapKey = function(key, keyEncryptionKey, keyWrappingAlgorithm) { 
		/// <signature>
		/// <param name='key' type='Key' />
		/// <param name='keyEncryptionKey' type='Key' />
		/// <param name='keyWrappingAlgorithm' type='String' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='key' type='Key' />
		/// <param name='keyEncryptionKey' type='Key' />
		/// <param name='keyWrappingAlgorithm' type='Algorithm' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		return KeyOperation; 
	};
	SubtleCrypto.verify = function(algorithm, key, signature, buffer) { 
		/// <signature>
		/// <param name='algorithm' type='String' />
		/// <param name='key' type='Key' />
		/// <param name='signature' type='Uint8Array' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='key' type='Key' />
		/// <param name='signature' type='Uint8Array' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		return CryptoOperation; 
	};
	SubtleCrypto.deriveKey = function(algorithm, baseKey, derivedKeyType, extractable, keyUsages) { 
		/// <signature>
		/// <param name='algorithm' type='String' />
		/// <param name='baseKey' type='Key' />
		/// <param name='derivedKeyType' type='String' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='baseKey' type='Key' />
		/// <param name='derivedKeyType' type='Algorithm' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		return KeyOperation; 
	};
	SubtleCrypto.digest = function(algorithm, buffer) { 
		/// <signature>
		/// <param name='algorithm' type='String' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		return CryptoOperation; 
	};
	SubtleCrypto.exportKey = function(format, key) { 
		/// <signature>
		/// <param name='format' type='String' />
		/// <param name='key' type='Key' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		return KeyOperation; 
	};
	SubtleCrypto.generateKey = function(algorithm, extractable, keyUsages) { 
		/// <signature>
		/// <param name='algorithm' type='String' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='extractable' type='Boolean' optional='true' />
		/// <param name='keyUsages' type='Array' elementType='String' optional='true' />
		/// <returns type='KeyOperation'/>
		/// </signature>
		return KeyOperation; 
	};
	SubtleCrypto.sign = function(algorithm, key, buffer) { 
		/// <signature>
		/// <param name='algorithm' type='String' />
		/// <param name='key' type='Key' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='key' type='Key' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		return CryptoOperation; 
	};
	SubtleCrypto.decrypt = function(algorithm, key, buffer) { 
		/// <signature>
		/// <param name='algorithm' type='String' />
		/// <param name='key' type='Key' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		/// <signature>
		/// <param name='algorithm' type='Algorithm' />
		/// <param name='key' type='Key' />
		/// <param name='buffer' type='Uint8Array' optional='true' />
		/// <returns type='CryptoOperation'/>
		/// </signature>
		return CryptoOperation; 
	};


	/* -- type: DragEvent -- */

	DragEvent.dataTransfer = DataTransfer;
	DragEvent.initDragEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg, dataTransferArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
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
	DragEvent.msConvertURL = function(file, targetType, targetURL) { 
		/// <signature>
		/// <param name='file' type='File' />
		/// <param name='targetType' type='String' />
		/// <param name='targetURL' type='String' optional='true' />
		/// </signature>
	};


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
	MSGestureEvent.gestureObject = {};
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
		/// <param name='viewArg' type='Window' />
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


	/* -- type: MSExecAtPriorityFunctionCallback -- */

	MSExecAtPriorityFunctionCallback.callback = function(args) { 
		/// <signature>
		/// <param name='args' type='Object' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};


	/* -- type: HTMLBodyElement -- */
	_$implement(HTMLBodyElement, DOML2DeprecatedBackgroundColorStyle);
	_$implement(HTMLBodyElement, DOML2DeprecatedBackgroundStyle);

	HTMLBodyElement.scroll = '';
	HTMLBodyElement.noWrap = false;
	HTMLBodyElement.text = {};
	HTMLBodyElement.bgProperties = '';
	HTMLBodyElement.link = {};
	HTMLBodyElement.aLink = {};
	HTMLBodyElement.bottomMargin = {};
	HTMLBodyElement.topMargin = {};
	HTMLBodyElement.vLink = {};
	HTMLBodyElement.rightMargin = {};
	HTMLBodyElement.leftMargin = {};
	HTMLBodyElement.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};
	HTMLBodyElement.nodeName = HTMLBodyElement.tagName = 'BODY';
	HTMLBodyElement.localName = 'body';
	_events(HTMLBodyElement, "ononline", "onpageshow", "onblur", "onfocus", "onmessage", "onerror", "onpagehide", "onresize", "onafterprint", "onbeforeprint", "onoffline", "onhashchange", "onunload", "onload", "onbeforeunload", "onpopstate", "onstorage");


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


	/* -- type: HTMLIFrameElement -- */
	_$implement(HTMLIFrameElement, GetSVGDocument);
	_$implement(HTMLIFrameElement, MSDataBindingExtensions);

	HTMLIFrameElement.width = '';
	HTMLIFrameElement.scrolling = '';
	HTMLIFrameElement.marginHeight = '';
	HTMLIFrameElement.marginWidth = '';
	HTMLIFrameElement.frameSpacing = {};
	HTMLIFrameElement.sandbox = DOMSettableTokenList;
	HTMLIFrameElement.frameBorder = '';
	HTMLIFrameElement.noResize = false;
	HTMLIFrameElement.vspace = 0;
	HTMLIFrameElement.contentWindow = Window;
	HTMLIFrameElement.align = '';
	HTMLIFrameElement.src = '';
	HTMLIFrameElement.name = '';
	HTMLIFrameElement.height = '';
	HTMLIFrameElement.border = '';
	HTMLIFrameElement.contentDocument = document;
	HTMLIFrameElement.hspace = 0;
	HTMLIFrameElement.longDesc = '';
	HTMLIFrameElement.security = {};
	HTMLIFrameElement.nodeName = HTMLIFrameElement.tagName = 'IFRAME';
	HTMLIFrameElement.localName = 'iframe';
	_events(HTMLIFrameElement, "onload");


	/* -- type: MSStorageExtensions -- */



	/* -- type: Storage -- */
	_$implement(Storage, MSStorageExtensions);

	Storage.length = 0;
	Storage.getItem = function(key) { 
		/// <signature>
		/// <param name='key' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
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


	/* -- type: CryptoOperation -- */
	_$implement(CryptoOperation, EventTarget);

	CryptoOperation.algorithm = Algorithm;
	CryptoOperation.key = Key;
	CryptoOperation.result = {};
	CryptoOperation.abort = function() { };
	CryptoOperation.finish = function() { };
	CryptoOperation.process = function(buffer) { 
		/// <signature>
		/// <param name='buffer' type='Uint8Array' />
		/// </signature>
	};
	_events(CryptoOperation, "oncomplete", "onerror", "onprogress", "onabort");


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


	/* -- type: CSSStyleDeclaration -- */

	CSSStyleDeclaration.textAlignLast = '';
	CSSStyleDeclaration.backgroundAttachment = '';
	CSSStyleDeclaration.animationIterationCount = '';
	CSSStyleDeclaration.animationDelay = '';
	CSSStyleDeclaration.orphans = '';
	CSSStyleDeclaration.counterIncrement = '';
	CSSStyleDeclaration.cssText = '';
	CSSStyleDeclaration.columnRuleWidth = {};
	CSSStyleDeclaration.pointerEvents = '';
	CSSStyleDeclaration.msAnimationName = '';
	CSSStyleDeclaration.msGridRowAlign = '';
	CSSStyleDeclaration.msGridColumn = {};
	CSSStyleDeclaration.msAnimationDelay = '';
	CSSStyleDeclaration.cursor = '';
	CSSStyleDeclaration.listStylePosition = '';
	CSSStyleDeclaration.wordWrap = '';
	CSSStyleDeclaration.borderImageWidth = '';
	CSSStyleDeclaration.msAnimation = '';
	CSSStyleDeclaration.alignmentBaseline = '';
	CSSStyleDeclaration.direction = '';
	CSSStyleDeclaration.strokeMiterlimit = '';
	CSSStyleDeclaration.msScrollSnapY = '';
	CSSStyleDeclaration.msImeAlign = '';
	CSSStyleDeclaration.verticalAlign = '';
	CSSStyleDeclaration.flexShrink = '';
	CSSStyleDeclaration.overflow = '';
	CSSStyleDeclaration.borderLeftStyle = '';
	CSSStyleDeclaration.emptyCells = '';
	CSSStyleDeclaration.stopOpacity = '';
	CSSStyleDeclaration.paddingRight = '';
	CSSStyleDeclaration.background = '';
	CSSStyleDeclaration.animationPlayState = '';
	CSSStyleDeclaration.transformOrigin = '';
	CSSStyleDeclaration.left = '';
	CSSStyleDeclaration.glyphOrientationHorizontal = '';
	CSSStyleDeclaration.msTransitionDuration = '';
	CSSStyleDeclaration.breakBefore = '';
	CSSStyleDeclaration.display = '';
	CSSStyleDeclaration.order = '';
	CSSStyleDeclaration.cssFloat = '';
	CSSStyleDeclaration.strokeDasharray = '';
	CSSStyleDeclaration.animationDuration = '';
	CSSStyleDeclaration.animationDirection = '';
	CSSStyleDeclaration.msTransitionTimingFunction = '';
	CSSStyleDeclaration.rubyAlign = '';
	CSSStyleDeclaration.fontSizeAdjust = '';
	CSSStyleDeclaration.borderLeftColor = '';
	CSSStyleDeclaration.msGridRow = {};
	CSSStyleDeclaration.msFlexPositive = '';
	CSSStyleDeclaration.borderImage = '';
	CSSStyleDeclaration.msTextCombineHorizontal = '';
	CSSStyleDeclaration.textOverflow = '';
	CSSStyleDeclaration.columnSpan = '';
	CSSStyleDeclaration.msContentZooming = '';
	CSSStyleDeclaration.msScrollSnapPointsX = '';
	CSSStyleDeclaration.listStyle = '';
	CSSStyleDeclaration.dominantBaseline = '';
	CSSStyleDeclaration.overflowY = '';
	CSSStyleDeclaration.captionSide = '';
	CSSStyleDeclaration.boxShadow = '';
	CSSStyleDeclaration.borderCollapse = '';
	CSSStyleDeclaration.msFlexLinePack = '';
	CSSStyleDeclaration.backgroundSize = '';
	CSSStyleDeclaration.transitionDuration = '';
	CSSStyleDeclaration.strokeDashoffset = '';
	CSSStyleDeclaration.textDecoration = '';
	CSSStyleDeclaration.msTransition = '';
	CSSStyleDeclaration.pageBreakBefore = '';
	CSSStyleDeclaration.border = '';
	CSSStyleDeclaration.borderTopRightRadius = '';
	CSSStyleDeclaration.borderBottomLeftRadius = '';
	CSSStyleDeclaration.alignSelf = '';
	CSSStyleDeclaration.fontFamily = '';
	CSSStyleDeclaration.content = '';
	CSSStyleDeclaration.backgroundClip = '';
	CSSStyleDeclaration.counterReset = '';
	CSSStyleDeclaration.alignContent = '';
	CSSStyleDeclaration.msScrollSnapX = '';
	CSSStyleDeclaration.columnRuleColor = {};
	CSSStyleDeclaration.outlineWidth = '';
	CSSStyleDeclaration.marginRight = '';
	CSSStyleDeclaration.transitionDelay = '';
	CSSStyleDeclaration.msFlowFrom = '';
	CSSStyleDeclaration.wordBreak = '';
	CSSStyleDeclaration.msScrollSnapType = '';
	CSSStyleDeclaration.marginTop = '';
	CSSStyleDeclaration.touchAction = '';
	CSSStyleDeclaration.top = '';
	CSSStyleDeclaration.msScrollRails = '';
	CSSStyleDeclaration.borderRight = '';
	CSSStyleDeclaration.width = '';
	CSSStyleDeclaration.enableBackground = '';
	CSSStyleDeclaration.kerning = '';
	CSSStyleDeclaration.msFlexFlow = '';
	CSSStyleDeclaration.msHyphenateLimitLines = {};
	CSSStyleDeclaration.pageBreakAfter = '';
	CSSStyleDeclaration.msScrollLimit = '';
	CSSStyleDeclaration.animation = '';
	CSSStyleDeclaration.borderBottomStyle = '';
	CSSStyleDeclaration.fontStretch = '';
	CSSStyleDeclaration.strokeOpacity = '';
	CSSStyleDeclaration.bottom = '';
	CSSStyleDeclaration.justifyContent = '';
	CSSStyleDeclaration.msScrollLimitYMin = {};
	CSSStyleDeclaration.borderLeftWidth = '';
	CSSStyleDeclaration.backgroundPosition = '';
	CSSStyleDeclaration.strokeLinecap = '';
	CSSStyleDeclaration.outlineStyle = '';
	CSSStyleDeclaration.borderTop = '';
	CSSStyleDeclaration.outlineColor = '';
	CSSStyleDeclaration.paddingBottom = '';
	CSSStyleDeclaration.flexBasis = '';
	CSSStyleDeclaration.font = '';
	CSSStyleDeclaration.fillOpacity = '';
	CSSStyleDeclaration.letterSpacing = '';
	CSSStyleDeclaration.borderSpacing = '';
	CSSStyleDeclaration.msUserSelect = '';
	CSSStyleDeclaration.borderImageOutset = '';
	CSSStyleDeclaration.animationName = '';
	CSSStyleDeclaration.borderRadius = '';
	CSSStyleDeclaration.msContentZoomLimitMax = {};
	CSSStyleDeclaration.borderWidth = '';
	CSSStyleDeclaration.borderBottomRightRadius = '';
	CSSStyleDeclaration.msScrollChaining = '';
	CSSStyleDeclaration.whiteSpace = '';
	CSSStyleDeclaration.borderImageSource = '';
	CSSStyleDeclaration.borderColor = '';
	CSSStyleDeclaration.borderTopLeftRadius = '';
	CSSStyleDeclaration.msFlexPack = '';
	CSSStyleDeclaration.msGridRowSpan = {};
	CSSStyleDeclaration.msContentZoomSnap = '';
	CSSStyleDeclaration.markerMid = '';
	CSSStyleDeclaration.breakAfter = '';
	CSSStyleDeclaration.flexDirection = '';
	CSSStyleDeclaration.textAlign = '';
	CSSStyleDeclaration.msAnimationTimingFunction = '';
	CSSStyleDeclaration.visibility = '';
	CSSStyleDeclaration.floodColor = '';
	CSSStyleDeclaration.textShadow = '';
	CSSStyleDeclaration.borderRightStyle = '';
	CSSStyleDeclaration.backfaceVisibility = '';
	CSSStyleDeclaration.alignItems = '';
	CSSStyleDeclaration.msAnimationIterationCount = '';
	CSSStyleDeclaration.borderImageRepeat = '';
	CSSStyleDeclaration.borderStyle = '';
	CSSStyleDeclaration.borderTopColor = '';
	CSSStyleDeclaration.markerEnd = '';
	CSSStyleDeclaration.textIndent = '';
	CSSStyleDeclaration.listStyleImage = '';
	CSSStyleDeclaration.borderTopStyle = '';
	CSSStyleDeclaration.msWrapThrough = '';
	CSSStyleDeclaration.columnRuleStyle = '';
	CSSStyleDeclaration.opacity = '';
	CSSStyleDeclaration.color = '';
	CSSStyleDeclaration.maxWidth = '';
	CSSStyleDeclaration.clip = '';
	CSSStyleDeclaration.borderRightWidth = '';
	CSSStyleDeclaration.msTouchAction = '';
	CSSStyleDeclaration.mask = '';
	CSSStyleDeclaration.transform = '';
	CSSStyleDeclaration.parentRule = CSSRule;
	CSSStyleDeclaration.boxSizing = '';
	CSSStyleDeclaration.textJustify = '';
	CSSStyleDeclaration.colorInterpolationFilters = '';
	CSSStyleDeclaration.height = '';
	CSSStyleDeclaration.transitionTimingFunction = '';
	CSSStyleDeclaration.paddingTop = '';
	CSSStyleDeclaration.length = 0;
	CSSStyleDeclaration.right = '';
	CSSStyleDeclaration.baselineShift = '';
	CSSStyleDeclaration.borderLeft = '';
	CSSStyleDeclaration.msContentZoomLimitMin = {};
	CSSStyleDeclaration.msFontFeatureSettings = '';
	CSSStyleDeclaration.widows = '';
	CSSStyleDeclaration.transitionProperty = '';
	CSSStyleDeclaration.lineHeight = '';
	CSSStyleDeclaration.msAnimationDuration = '';
	CSSStyleDeclaration.textUnderlinePosition = '';
	CSSStyleDeclaration.msFlexDirection = '';
	CSSStyleDeclaration.fontFeatureSettings = '';
	CSSStyleDeclaration.msFlexWrap = '';
	CSSStyleDeclaration.msFlowInto = '';
	CSSStyleDeclaration.textAnchor = '';
	CSSStyleDeclaration.msTransformStyle = '';
	CSSStyleDeclaration.msTransitionProperty = '';
	CSSStyleDeclaration.msOverflowStyle = '';
	CSSStyleDeclaration.msScrollSnapPointsY = '';
	CSSStyleDeclaration.msFlex = '';
	CSSStyleDeclaration.msFlexNegative = '';
	CSSStyleDeclaration.msGridColumnSpan = {};
	CSSStyleDeclaration.columnFill = '';
	CSSStyleDeclaration.msFlexItemAlign = '';
	CSSStyleDeclaration.msFlexOrder = '';
	CSSStyleDeclaration.msScrollLimitYMax = {};
	CSSStyleDeclaration.backgroundImage = '';
	CSSStyleDeclaration.msGridColumnAlign = '';
	CSSStyleDeclaration.perspectiveOrigin = '';
	CSSStyleDeclaration.columns = '';
	CSSStyleDeclaration.lightingColor = '';
	CSSStyleDeclaration.listStyleType = '';
	CSSStyleDeclaration.strokeWidth = '';
	CSSStyleDeclaration.msHyphenateLimitChars = '';
	CSSStyleDeclaration.fillRule = '';
	CSSStyleDeclaration.msAnimationDirection = '';
	CSSStyleDeclaration.borderBottomColor = '';
	CSSStyleDeclaration.position = '';
	CSSStyleDeclaration.zIndex = '';
	CSSStyleDeclaration.msTransformOrigin = '';
	CSSStyleDeclaration.msContentZoomSnapPoints = '';
	CSSStyleDeclaration.fill = '';
	CSSStyleDeclaration.msScrollLimitXMin = {};
	CSSStyleDeclaration.flexGrow = '';
	CSSStyleDeclaration.quotes = '';
	CSSStyleDeclaration.tableLayout = '';
	CSSStyleDeclaration.unicodeBidi = '';
	CSSStyleDeclaration.borderBottomWidth = '';
	CSSStyleDeclaration.msHyphens = '';
	CSSStyleDeclaration.fontSize = '';
	CSSStyleDeclaration.msContentZoomLimit = '';
	CSSStyleDeclaration.msScrollLimitXMax = {};
	CSSStyleDeclaration.msWrapMargin = {};
	CSSStyleDeclaration.msTransform = '';
	CSSStyleDeclaration.columnCount = {};
	CSSStyleDeclaration.flexFlow = '';
	CSSStyleDeclaration.transformStyle = '';
	CSSStyleDeclaration.textTransform = '';
	CSSStyleDeclaration.rubyPosition = '';
	CSSStyleDeclaration.msTransitionDelay = '';
	CSSStyleDeclaration.msWrapFlow = '';
	CSSStyleDeclaration.strokeLinejoin = '';
	CSSStyleDeclaration.clipPath = '';
	CSSStyleDeclaration.borderRightColor = '';
	CSSStyleDeclaration.msFlexPreferredSize = '';
	CSSStyleDeclaration.animationFillMode = '';
	CSSStyleDeclaration.clear = '';
	CSSStyleDeclaration.animationTimingFunction = '';
	CSSStyleDeclaration.marginBottom = '';
	CSSStyleDeclaration.columnWidth = {};
	CSSStyleDeclaration.transition = '';
	CSSStyleDeclaration.paddingLeft = '';
	CSSStyleDeclaration.borderBottom = '';
	CSSStyleDeclaration.msContentZoomSnapType = '';
	CSSStyleDeclaration.msGridColumns = '';
	CSSStyleDeclaration.fontWeight = '';
	CSSStyleDeclaration.msContentZoomChaining = '';
	CSSStyleDeclaration.msHyphenateLimitZone = {};
	CSSStyleDeclaration.flex = '';
	CSSStyleDeclaration.flexWrap = '';
	CSSStyleDeclaration.padding = '';
	CSSStyleDeclaration.filter = '';
	CSSStyleDeclaration.markerStart = '';
	CSSStyleDeclaration.msBackfaceVisibility = '';
	CSSStyleDeclaration.clipRule = '';
	CSSStyleDeclaration.backgroundColor = '';
	CSSStyleDeclaration.columnGap = {};
	CSSStyleDeclaration.backgroundOrigin = '';
	CSSStyleDeclaration.pageBreakInside = '';
	CSSStyleDeclaration.borderTopWidth = '';
	CSSStyleDeclaration.msAnimationFillMode = '';
	CSSStyleDeclaration.wordSpacing = '';
	CSSStyleDeclaration.outline = '';
	CSSStyleDeclaration.marginLeft = '';
	CSSStyleDeclaration.perspective = '';
	CSSStyleDeclaration.maxHeight = '';
	CSSStyleDeclaration.msScrollTranslation = '';
	CSSStyleDeclaration.backgroundRepeat = '';
	CSSStyleDeclaration.columnRule = '';
	CSSStyleDeclaration.msTouchSelect = '';
	CSSStyleDeclaration.fontStyle = '';
	CSSStyleDeclaration.floodOpacity = '';
	CSSStyleDeclaration.minWidth = '';
	CSSStyleDeclaration.stopColor = '';
	CSSStyleDeclaration.msAnimationPlayState = '';
	CSSStyleDeclaration.msPerspective = '';
	CSSStyleDeclaration.marker = '';
	CSSStyleDeclaration.glyphOrientationVertical = '';
	CSSStyleDeclaration.breakInside = '';
	CSSStyleDeclaration.msHighContrastAdjust = '';
	CSSStyleDeclaration.borderImageSlice = '';
	CSSStyleDeclaration.fontVariant = '';
	CSSStyleDeclaration.minHeight = '';
	CSSStyleDeclaration.msGridRows = '';
	CSSStyleDeclaration.stroke = '';
	CSSStyleDeclaration.rubyOverhang = '';
	CSSStyleDeclaration.msPerspectiveOrigin = '';
	CSSStyleDeclaration.msFlexAlign = '';
	CSSStyleDeclaration.overflowX = '';
	CSSStyleDeclaration.margin = '';
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
	MSCSSProperties.setAttribute = function(attributeName, AttributeValue, flags) { 
		/// <signature>
		/// <param name='attributeName' type='String' />
		/// <param name='AttributeValue' type='Object' />
		/// <param name='flags' type='Number' optional='true' />
		/// </signature>
		_setAttribute(this, attributeName, AttributeValue);
	};
	MSCSSProperties.getAttribute = function(attributeName, flags) { 
		/// <signature>
		/// <param name='attributeName' type='String' />
		/// <param name='flags' type='Number' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return _getAttribute(this, attributeName);
	};
	MSCSSProperties.removeAttribute = function(attributeName, flags) { 
		/// <signature>
		/// <param name='attributeName' type='String' />
		/// <param name='flags' type='Number' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: MSCurrentStyleCSSProperties -- */

	MSCurrentStyleCSSProperties.blockDirection = '';
	MSCurrentStyleCSSProperties.clipBottom = '';
	MSCurrentStyleCSSProperties.clipTop = '';
	MSCurrentStyleCSSProperties.clipRight = '';
	MSCurrentStyleCSSProperties.clipLeft = '';
	MSCurrentStyleCSSProperties.hasLayout = '';


	/* -- type: SVGStyleElement -- */
	_$implement(SVGStyleElement, SVGLangSpace);

	SVGStyleElement.media = '';
	SVGStyleElement.title = '';
	SVGStyleElement.type = '';
	SVGStyleElement.nodeName = SVGStyleElement.tagName = 'STYLE';
	SVGStyleElement.localName = 'style';


	/* -- type: SVGFEImageElement -- */
	_$implement(SVGFEImageElement, SVGLangSpace);
	_$implement(SVGFEImageElement, SVGFilterPrimitiveStandardAttributes);
	_$implement(SVGFEImageElement, SVGURIReference);
	_$implement(SVGFEImageElement, SVGExternalResourcesRequired);

	SVGFEImageElement.preserveAspectRatio = SVGAnimatedPreserveAspectRatio;
	SVGFEImageElement.nodeName = SVGFEImageElement.tagName = 'FEIMAGE';
	SVGFEImageElement.localName = 'feimage';


	/* -- type: PerfWidgetExternal -- */

	PerfWidgetExternal.maxCpuSpeed = 0;
	PerfWidgetExternal.independentRenderingEnabled = false;
	PerfWidgetExternal.irDisablingContentString = '';
	PerfWidgetExternal.irStatusAvailable = false;
	PerfWidgetExternal.performanceCounter = 0;
	PerfWidgetExternal.averagePaintTime = 0;
	PerfWidgetExternal.activeNetworkRequestCount = 0;
	PerfWidgetExternal.paintRequestsPerSecond = 0;
	PerfWidgetExternal.extraInformationEnabled = false;
	PerfWidgetExternal.performanceCounterFrequency = 0;
	PerfWidgetExternal.averageFrameTime = 0;
	PerfWidgetExternal.repositionWindow = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	PerfWidgetExternal.getRecentMemoryUsage = function(last) { 
		/// <signature>
		/// <param name='last' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	PerfWidgetExternal.getMemoryUsage = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	PerfWidgetExternal.resizeWindow = function(width, height) { 
		/// <signature>
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
	};
	PerfWidgetExternal.getProcessCpuUsage = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	PerfWidgetExternal.removeEventListener = function(eventType, callback) { 
		/// <signature>
		/// <param name='eventType' type='String' />
		/// <param name='callback' type='Function' />
		/// </signature>
	};
	PerfWidgetExternal.getRecentCpuUsage = function(last) { 
		/// <signature>
		/// <param name='last' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	PerfWidgetExternal.addEventListener = function(eventType, callback) { 
		/// <signature>
		/// <param name='eventType' type='String' />
		/// <param name='callback' type='Function' />
		/// </signature>
	};
	PerfWidgetExternal.getRecentFrames = function(last) { 
		/// <signature>
		/// <param name='last' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	PerfWidgetExternal.getRecentPaintRequests = function(last) { 
		/// <signature>
		/// <param name='last' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};


	/* -- type: HTMLLIElement -- */
	_$implement(HTMLLIElement, DOML2DeprecatedListNumberingAndBulletStyle);

	HTMLLIElement.value = 0;
	HTMLLIElement.nodeName = HTMLLIElement.tagName = 'LI';
	HTMLLIElement.localName = 'li';


	/* -- type: SVGPathSegLinetoVerticalAbs -- */

	SVGPathSegLinetoVerticalAbs.y = 0;


	/* -- type: SVGTextPositioningElement -- */

	SVGTextPositioningElement.y = SVGAnimatedLengthList;
	SVGTextPositioningElement.rotate = SVGAnimatedNumberList;
	SVGTextPositioningElement.dy = SVGAnimatedLengthList;
	SVGTextPositioningElement.dx = SVGAnimatedLengthList;
	SVGTextPositioningElement.x = SVGAnimatedLengthList;


	/* -- type: SVGTSpanElement -- */

	SVGTSpanElement.nodeName = SVGTSpanElement.tagName = 'TSPAN';
	SVGTSpanElement.localName = 'tspan';


	/* -- type: SVGTextElement -- */
	_$implement(SVGTextElement, SVGTransformable);

	SVGTextElement.nodeName = SVGTextElement.tagName = 'TEXT';
	SVGTextElement.localName = 'text';


	/* -- type: SVGAnimatedInteger -- */

	SVGAnimatedInteger.animVal = 0;
	SVGAnimatedInteger.baseVal = 0;


	/* -- type: WebGLRenderbuffer -- */



	/* -- type: HTMLLegendElement -- */
	_$implement(HTMLLegendElement, MSDataBindingExtensions);

	HTMLLegendElement.align = '';
	HTMLLegendElement.form = HTMLFormElement;
	HTMLLegendElement.nodeName = HTMLLegendElement.tagName = 'LEGEND';
	HTMLLegendElement.localName = 'legend';


	/* -- type: HTMLDirectoryElement -- */
	_$implement(HTMLDirectoryElement, DOML2DeprecatedListNumberingAndBulletStyle);
	_$implement(HTMLDirectoryElement, DOML2DeprecatedListSpaceReduction);

	HTMLDirectoryElement.nodeName = HTMLDirectoryElement.tagName = 'DIR';
	HTMLDirectoryElement.localName = 'dir';


	/* -- type: WebGLContextEvent -- */

	WebGLContextEvent.statusMessage = '';


	/* -- type: HTMLLabelElement -- */
	_$implement(HTMLLabelElement, MSDataBindingExtensions);

	HTMLLabelElement.htmlFor = '';
	HTMLLabelElement.form = HTMLFormElement;
	HTMLLabelElement.nodeName = HTMLLabelElement.tagName = 'LABEL';
	HTMLLabelElement.localName = 'label';


	/* -- type: SVGSVGElement -- */
	_$implement(SVGSVGElement, SVGStylable);
	_$implement(SVGSVGElement, SVGZoomAndPan);
	_$implement(SVGSVGElement, SVGLangSpace);
	_$implement(SVGSVGElement, DocumentEvent);
	_$implement(SVGSVGElement, SVGFitToViewBox);
	_$implement(SVGSVGElement, SVGTests);
	_$implement(SVGSVGElement, SVGLocatable);
	_$implement(SVGSVGElement, SVGExternalResourcesRequired);

	SVGSVGElement.width = SVGAnimatedLength;
	SVGSVGElement.contentStyleType = '';
	SVGSVGElement.x = SVGAnimatedLength;
	SVGSVGElement.y = SVGAnimatedLength;
	SVGSVGElement.viewport = SVGRect;
	SVGSVGElement.pixelUnitToMillimeterY = 0;
	SVGSVGElement.screenPixelToMillimeterY = 0;
	SVGSVGElement.height = SVGAnimatedLength;
	SVGSVGElement.contentScriptType = '';
	SVGSVGElement.pixelUnitToMillimeterX = 0;
	SVGSVGElement.currentTranslate = SVGPoint;
	SVGSVGElement.currentScale = 0;
	SVGSVGElement.screenPixelToMillimeterX = 0;
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
	SVGSVGElement.getComputedStyle = function(elt, pseudoElt) { 
		/// <signature>
		/// <param name='elt' type='Element' />
		/// <param name='pseudoElt' type='String' optional='true' />
		/// <returns type='CSSStyleDeclaration'/>
		/// </signature>
		return CSSStyleDeclaration; 
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
	_events(SVGSVGElement, "onzoom", "onerror", "onresize", "onabort", "onunload", "onscroll");


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


	/* -- type: MSPointerEvent -- */

	MSPointerEvent.width = 0;
	MSPointerEvent.rotation = 0;
	MSPointerEvent.pressure = 0;
	MSPointerEvent.pointerType = {};
	MSPointerEvent.isPrimary = false;
	MSPointerEvent.tiltY = 0;
	MSPointerEvent.height = 0;
	MSPointerEvent.tiltX = 0;
	MSPointerEvent.hwTimestamp = 0;
	MSPointerEvent.pointerId = 0;
	MSPointerEvent.initPointerEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, buttonArg, relatedTargetArg, offsetXArg, offsetYArg, widthArg, heightArg, pressure, rotation, tiltX, tiltY, pointerIdArg, pointerType, hwTimestampArg, isPrimary) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
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
		/// <param name='pointerType' type='Object' />
		/// <param name='hwTimestampArg' type='Number' />
		/// <param name='isPrimary' type='Boolean' />
		/// </signature>
	};


	/* -- type: WebGLShaderPrecisionFormat -- */

	WebGLShaderPrecisionFormat.rangeMin = 0;
	WebGLShaderPrecisionFormat.rangeMax = 0;
	WebGLShaderPrecisionFormat.precision = 0;


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


	/* -- type: Range -- */

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
	Range.createContextualFragment = function(fragment) { 
		/// <signature>
		/// <param name='fragment' type='String' />
		/// <returns type='DocumentFragment'/>
		/// </signature>
		return DocumentFragment; 
	};
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


	/* -- type: DOMSettableTokenList -- */

	DOMSettableTokenList.value = '';


	/* -- type: MutationObserver -- */

	MutationObserver.observe = function(target, options) { 
		/// <signature>
		/// <param name='target' type='Node' />
		/// <param name='options' type='MutationObserverInit' />
		/// </signature>
	};
	MutationObserver.takeRecords = function() { 
		/// <signature>
		/// <returns type='Array' elementType='MutationRecord'/>
		/// </signature>
		return new Array(); 
	};
	MutationObserver.disconnect = function() { };


	/* -- type: FocusEvent -- */

	FocusEvent.relatedTarget = EventTarget;
	FocusEvent.initFocusEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, relatedTargetArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
		/// <param name='detailArg' type='Number' />
		/// <param name='relatedTargetArg' type='EventTarget' />
		/// </signature>
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


	/* -- type: NavigatorContentUtils -- */



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


	/* -- type: Coordinates -- */

	Coordinates.altitudeAccuracy = 0;
	Coordinates.longitude = 0;
	Coordinates.speed = 0;
	Coordinates.latitude = 0;
	Coordinates.heading = 0;
	Coordinates.accuracy = 0;
	Coordinates.altitude = 0;


	/* -- type: Screen -- */
	_$implement(Screen, EventTarget);

	Screen.deviceXDPI = 0;
	Screen.width = 0;
	Screen.bufferDepth = 0;
	Screen.logicalXDPI = 0;
	Screen.logicalYDPI = 0;
	Screen.deviceYDPI = 0;
	Screen.pixelDepth = 0;
	Screen.fontSmoothingEnabled = false;
	Screen.msOrientation = '';
	Screen.systemXDPI = 0;
	Screen.availHeight = 0;
	Screen.height = 0;
	Screen.systemYDPI = 0;
	Screen.colorDepth = 0;
	Screen.availWidth = 0;
	Screen.msUnlockOrientation = function() { };
	Screen.msLockOrientation = function(orientations) { 
		/// <signature>
		/// <param name='orientations' type='Array' elementType='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	_events(Screen, "onmsorientationchange");


	/* -- type: HTMLFrameSetElement -- */

	HTMLFrameSetElement.borderColor = {};
	HTMLFrameSetElement.rows = '';
	HTMLFrameSetElement.frameSpacing = {};
	HTMLFrameSetElement.cols = '';
	HTMLFrameSetElement.frameBorder = '';
	HTMLFrameSetElement.name = '';
	HTMLFrameSetElement.border = '';
	HTMLFrameSetElement.nodeName = HTMLFrameSetElement.tagName = 'FRAMESET';
	HTMLFrameSetElement.localName = 'frameset';
	_events(HTMLFrameSetElement, "ononline", "onpageshow", "onblur", "onfocus", "onmessage", "onerror", "onpagehide", "onresize", "onafterprint", "onbeforeprint", "onoffline", "onhashchange", "onunload", "onload", "onbeforeunload", "onstorage");


	/* -- type: MSMediaKeyError -- */

	MSMediaKeyError.systemCode = 0;
	MSMediaKeyError.code = 0;
	MSMediaKeyError.MS_MEDIA_KEYERR_SERVICE = 3;
	MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE = 5;
	MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT = 4;
	MSMediaKeyError.MS_MEDIA_KEYERR_DOMAIN = 6;
	MSMediaKeyError.MS_MEDIA_KEYERR_UNKNOWN = 1;
	MSMediaKeyError.MS_MEDIA_KEYERR_CLIENT = 2;


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


	/* -- type: HTMLDListElement -- */
	_$implement(HTMLDListElement, DOML2DeprecatedListSpaceReduction);

	HTMLDListElement.nodeName = HTMLDListElement.tagName = 'DL';
	HTMLDListElement.localName = 'dl';


	/* -- type: DeviceRotationRate -- */

	DeviceRotationRate.gamma = 0;
	DeviceRotationRate.alpha = 0;
	DeviceRotationRate.beta = 0;


	/* -- type: HTMLTableHeaderCellElement -- */

	HTMLTableHeaderCellElement.scope = '';
	HTMLTableHeaderCellElement.nodeName = HTMLTableHeaderCellElement.tagName = 'TH';
	HTMLTableHeaderCellElement.localName = 'th';


	/* -- type: SourceBuffer -- */
	_$implement(SourceBuffer, EventTarget);

	SourceBuffer.updating = false;
	SourceBuffer.appendWindowStart = 0;
	SourceBuffer.appendWindowEnd = 0;
	SourceBuffer.buffered = TimeRanges;
	SourceBuffer.timestampOffset = 0;
	SourceBuffer.audioTracks = AudioTrackList;
	SourceBuffer.appendBuffer = function(data) { 
		/// <signature>
		/// <param name='data' type='ArrayBuffer' />
		/// </signature>
	};
	SourceBuffer.remove = function(start, end) { 
		/// <signature>
		/// <param name='start' type='Number' />
		/// <param name='end' type='Number' />
		/// </signature>
	};
	SourceBuffer.abort = function() { };
	SourceBuffer.appendStream = function(stream, maxSize) { 
		/// <signature>
		/// <param name='stream' type='MSStream' />
		/// <param name='maxSize' type='Number' optional='true' />
		/// </signature>
	};


	/* -- type: XMLHttpRequest -- */
	_$implement(XMLHttpRequest, EventTarget);

	XMLHttpRequestCtor.LOADING = 3;
	XMLHttpRequestCtor.DONE = 4;
	XMLHttpRequestCtor.HEADERS_RECEIVED = 2;
	XMLHttpRequestCtor.OPENED = 1;
	XMLHttpRequestCtor.UNSENT = 0;
	XMLHttpRequest.msCaching = '';
	XMLHttpRequest.status = 0;
	XMLHttpRequest.responseXML = {};
	XMLHttpRequest.readyState = 0;
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
	XMLHttpRequest.HEADERS_RECEIVED = 2;
	XMLHttpRequest.OPENED = 1;
	XMLHttpRequest.UNSENT = 0;
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


	/* -- type: WindowModal -- */

	WindowModal.dialogArguments = {};
	WindowModal.returnValue = {};


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


	/* -- type: HTMLQuoteElement -- */

	HTMLQuoteElement.dateTime = '';
	HTMLQuoteElement.cite = '';
	HTMLQuoteElement.nodeName = HTMLQuoteElement.tagName = 'Q';
	HTMLQuoteElement.localName = 'q';


	/* -- type: SVGDefsElement -- */
	_$implement(SVGDefsElement, SVGStylable);
	_$implement(SVGDefsElement, SVGTransformable);
	_$implement(SVGDefsElement, SVGLangSpace);
	_$implement(SVGDefsElement, SVGTests);
	_$implement(SVGDefsElement, SVGExternalResourcesRequired);

	SVGDefsElement.nodeName = SVGDefsElement.tagName = 'DEFS';
	SVGDefsElement.localName = 'defs';


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


	/* -- type: SVGAnimatedLength -- */

	SVGAnimatedLength.animVal = SVGLength;
	SVGAnimatedLength.baseVal = SVGLength;


	/* -- type: HTMLFrameElement -- */
	_$implement(HTMLFrameElement, GetSVGDocument);
	_$implement(HTMLFrameElement, MSDataBindingExtensions);

	HTMLFrameElement.width = {};
	HTMLFrameElement.scrolling = '';
	HTMLFrameElement.marginHeight = '';
	HTMLFrameElement.borderColor = {};
	HTMLFrameElement.marginWidth = '';
	HTMLFrameElement.frameSpacing = {};
	HTMLFrameElement.frameBorder = '';
	HTMLFrameElement.noResize = false;
	HTMLFrameElement.contentWindow = Window;
	HTMLFrameElement.src = '';
	HTMLFrameElement.name = '';
	HTMLFrameElement.height = {};
	HTMLFrameElement.contentDocument = document;
	HTMLFrameElement.border = '';
	HTMLFrameElement.longDesc = '';
	HTMLFrameElement.security = {};
	HTMLFrameElement.nodeName = HTMLFrameElement.tagName = 'FRAME';
	HTMLFrameElement.localName = 'frame';
	_events(HTMLFrameElement, "onload");


	/* -- type: MSMediaKeyMessageEvent -- */

	MSMediaKeyMessageEvent.destinationURL = '';
	MSMediaKeyMessageEvent.message = new Uint8Array();


	/* -- type: OES_standard_derivatives -- */

	OES_standard_derivatives.FRAGMENT_SHADER_DERIVATIVE_HINT_OES = 0x8B8B;


	/* -- type: SVGPathSegClosePath -- */



	/* -- type: HTMLHtmlElement -- */

	HTMLHtmlElement.version = '';
	HTMLHtmlElement.nodeName = HTMLHtmlElement.tagName = 'HTML';
	HTMLHtmlElement.localName = 'html';


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


	/* -- type: SVGPathSegArcAbs -- */

	SVGPathSegArcAbs.y = 0;
	SVGPathSegArcAbs.sweepFlag = false;
	SVGPathSegArcAbs.r2 = 0;
	SVGPathSegArcAbs.angle = 0;
	SVGPathSegArcAbs.x = 0;
	SVGPathSegArcAbs.largeArcFlag = false;
	SVGPathSegArcAbs.r1 = 0;


	/* -- type: IDBRequest -- */
	_$implement(IDBRequest, EventTarget);

	IDBRequest.source = {};
	IDBRequest.error = DOMError;
	IDBRequest.transaction = IDBTransaction;
	IDBRequest.readyState = '';
	IDBRequest.result = {};
	_events(IDBRequest, "onsuccess", "onerror");


	/* -- type: SVGPathSegLinetoHorizontalAbs -- */

	SVGPathSegLinetoHorizontalAbs.x = 0;


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


	/* -- type: CanvasRenderingContext2D -- */

	CanvasRenderingContext2D.miterLimit = 0;
	CanvasRenderingContext2D.font = '';
	CanvasRenderingContext2D.globalCompositeOperation = '';
	CanvasRenderingContext2D.msFillRule = '';
	CanvasRenderingContext2D.lineCap = '';
	CanvasRenderingContext2D.msImageSmoothingEnabled = false;
	CanvasRenderingContext2D.lineDashOffset = 0;
	CanvasRenderingContext2D.shadowColor = '';
	CanvasRenderingContext2D.lineJoin = '';
	CanvasRenderingContext2D.shadowOffsetX = 0;
	CanvasRenderingContext2D.lineWidth = 0;
	CanvasRenderingContext2D.canvas = HTMLCanvasElement;
	CanvasRenderingContext2D.strokeStyle = {};
	CanvasRenderingContext2D.globalAlpha = 0;
	CanvasRenderingContext2D.shadowOffsetY = 0;
	CanvasRenderingContext2D.fillStyle = {};
	CanvasRenderingContext2D.textAlign = '';
	CanvasRenderingContext2D.shadowBlur = 0;
	CanvasRenderingContext2D.textBaseline = '';
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
	CanvasRenderingContext2D.isPointInPath = function(x, y, fillRule) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='fillRule' type='String' optional='true' />
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
	CanvasRenderingContext2D.getLineDash = function() { 
		/// <signature>
		/// <returns type='Array' elementType='Number'/>
		/// </signature>
		return new Array(); 
	};
	CanvasRenderingContext2D.fill = function(fillRule) { 
		/// <signature>
		/// <param name='fillRule' type='String' optional='true' />
		/// </signature>
	};
	CanvasRenderingContext2D.createImageData = function(imageDataOrSw, sh) { 
		/// <signature>
		/// <param name='imageDataOrSw' type='Number' />
		/// <param name='sh' type='Number' optional='true' />
		/// <returns type='ImageData'/>
		/// </signature>
		/// <signature>
		/// <param name='imageDataOrSw' type='ImageData' />
		/// <param name='sh' type='Number' optional='true' />
		/// <returns type='ImageData'/>
		/// </signature>
		return ImageData; 
	};
	CanvasRenderingContext2D.createPattern = function(image, repetition) { 
		/// <signature>
		/// <param name='image' type='HTMLVideoElement' />
		/// <param name='repetition' type='String' />
		/// <returns type='CanvasPattern'/>
		/// </signature>
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
	CanvasRenderingContext2D.clip = function(fillRule) { 
		/// <signature>
		/// <param name='fillRule' type='String' optional='true' />
		/// </signature>
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
		/// <param name='image' type='HTMLVideoElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' optional='true' />
		/// <param name='height' type='Number' optional='true' />
		/// <param name='canvasOffsetX' type='Number' optional='true' />
		/// <param name='canvasOffsetY' type='Number' optional='true' />
		/// <param name='canvasImageWidth' type='Number' optional='true' />
		/// <param name='canvasImageHeight' type='Number' optional='true' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLCanvasElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' optional='true' />
		/// <param name='height' type='Number' optional='true' />
		/// <param name='canvasOffsetX' type='Number' optional='true' />
		/// <param name='canvasOffsetY' type='Number' optional='true' />
		/// <param name='canvasImageWidth' type='Number' optional='true' />
		/// <param name='canvasImageHeight' type='Number' optional='true' />
		/// </signature>
		/// <signature>
		/// <param name='image' type='HTMLImageElement' />
		/// <param name='offsetX' type='Number' />
		/// <param name='offsetY' type='Number' />
		/// <param name='width' type='Number' optional='true' />
		/// <param name='height' type='Number' optional='true' />
		/// <param name='canvasOffsetX' type='Number' optional='true' />
		/// <param name='canvasOffsetY' type='Number' optional='true' />
		/// <param name='canvasImageWidth' type='Number' optional='true' />
		/// <param name='canvasImageHeight' type='Number' optional='true' />
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
	CanvasRenderingContext2D.setLineDash = function(segments) { 
		/// <signature>
		/// <param name='segments' type='Array' elementType='Number' />
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


	/* -- type: HTMLTableRowElement -- */
	_$implement(HTMLTableRowElement, HTMLTableAlignment);
	_$implement(HTMLTableRowElement, DOML2DeprecatedBackgroundColorStyle);

	HTMLTableRowElement.rowIndex = 0;
	HTMLTableRowElement.align = '';
	HTMLTableRowElement.cells = _createHTMLCollection('td');
	HTMLTableRowElement.borderColorLight = {};
	HTMLTableRowElement.sectionRowIndex = 0;
	HTMLTableRowElement.borderColor = {};
	HTMLTableRowElement.height = {};
	HTMLTableRowElement.borderColorDark = {};
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
	TextTrack.mode = {};
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
	TextTrack.addCue = function(cue) { 
		/// <signature>
		/// <param name='cue' type='TextTrackCue' />
		/// </signature>
	};
	TextTrack.removeCue = function(cue) { 
		/// <signature>
		/// <param name='cue' type='TextTrackCue' />
		/// </signature>
	};
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
		/// <param name='sourceArg' type='Window' />
		/// </signature>
	};


	/* -- type: KeyboardEvent -- */

	KeyboardEvent.keyCode = 0;
	KeyboardEvent.location = 0;
	KeyboardEvent.which = 0;
	KeyboardEvent.shiftKey = false;
	KeyboardEvent.locale = '';
	KeyboardEvent.key = '';
	KeyboardEvent.altKey = false;
	KeyboardEvent.metaKey = false;
	KeyboardEvent.char = '';
	KeyboardEvent.ctrlKey = false;
	KeyboardEvent.charCode = 0;
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
		/// <param name='viewArg' type='Window' />
		/// <param name='keyArg' type='String' />
		/// <param name='locationArg' type='Number' />
		/// <param name='modifiersListArg' type='String' />
		/// <param name='repeat' type='Boolean' />
		/// <param name='locale' type='String' />
		/// </signature>
	};


	/* -- type: WebGLTexture -- */



	/* -- type: CanvasGradient -- */

	CanvasGradient.addColorStop = function(offset, color) { 
		/// <signature>
		/// <param name='offset' type='Number' />
		/// <param name='color' type='String' />
		/// </signature>
	};


	/* -- type: HTMLSourceElement -- */

	HTMLSourceElement.media = '';
	HTMLSourceElement.src = '';
	HTMLSourceElement.type = '';
	HTMLSourceElement.msKeySystem = '';
	HTMLSourceElement.nodeName = HTMLSourceElement.tagName = 'SOURCE';
	HTMLSourceElement.localName = 'source';


	/* -- type: AesGcmEncryptResult -- */

	AesGcmEncryptResult.ciphertext = new ArrayBuffer();
	AesGcmEncryptResult.tag = new ArrayBuffer();


	/* -- type: MSLaunchUriCallback -- */

	MSLaunchUriCallback.callback = function() { };


	/* -- type: HTMLButtonElement -- */
	_$implement(HTMLButtonElement, MSDataBindingExtensions);

	HTMLButtonElement.validationMessage = '';
	HTMLButtonElement.status = {};
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
	HTMLButtonElement.createTextRange = function() { 
		/// <signature>
		/// <returns type='TextRange'/>
		/// </signature>
		return TextRange; 
	};
	HTMLButtonElement.setCustomValidity = function(error) { 
		/// <signature>
		/// <param name='error' type='String' />
		/// </signature>
	};
	HTMLButtonElement.nodeName = HTMLButtonElement.tagName = 'BUTTON';
	HTMLButtonElement.localName = 'button';


	/* -- type: IDBOpenDBRequest -- */

	_events(IDBOpenDBRequest, "onupgradeneeded", "onblocked");


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


	/* -- type: HTMLImageElement -- */
	_$implement(HTMLImageElement, MSImageResourceExtensions);
	_$implement(HTMLImageElement, MSDataBindingExtensions);
	_$implement(HTMLImageElement, MSResourceMetadata);

	HTMLImageElement.width = 0;
	HTMLImageElement.msPlayToPrimary = false;
	HTMLImageElement.msPlayToDisabled = false;
	HTMLImageElement.href = '';
	HTMLImageElement.vspace = 0;
	HTMLImageElement.msPlayToPreferredSourceUri = '';
	HTMLImageElement.naturalHeight = 0;
	HTMLImageElement.alt = '';
	HTMLImageElement.align = '';
	HTMLImageElement.src = '';
	HTMLImageElement.useMap = '';
	HTMLImageElement.naturalWidth = 0;
	HTMLImageElement.name = '';
	HTMLImageElement.height = 0;
	HTMLImageElement.border = '';
	HTMLImageElement.crossOrigin = '';
	HTMLImageElement.hspace = 0;
	HTMLImageElement.longDesc = '';
	HTMLImageElement.isMap = false;
	HTMLImageElement.complete = false;
	HTMLImageElement.create = function() { 
		/// <signature>
		/// <returns type='HTMLImageElement'/>
		/// </signature>
		return HTMLImageElement; 
	};
	HTMLImageElement.nodeName = HTMLImageElement.tagName = 'IMG';
	HTMLImageElement.localName = 'img';


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
		/// <returns type='CSSPageRule'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(CSSPageRule)); 
	};
	/* Add a single array element */
	StyleSheetPageList[0] = _$getTrackingNull(Object.create(CSSPageRule));


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
	Console.timeEnd = function(timerName) { 
		/// <signature>
		/// <param name='timerName' type='String' optional='true' />
		/// </signature>
	};
	Console.time = function(timerName) { 
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
	Console.dirxml = function(value) { 
		/// <signature>
		/// <param name='value' type='Object' />
		/// </signature>
	};
	Console.debug = function(message, optionalParams) { 
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
	Console.select = function(element) { 
		/// <signature>
		/// <param name='element' type='Element' />
		/// </signature>
	};
	Console.profileEnd = function() { };
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
		/// <param name='element' type='Element' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Console.groupCollapsed = function(groupTitle) { 
		/// <signature>
		/// <param name='groupTitle' type='String' optional='true' />
		/// </signature>
	};


	/* -- type: MSSiteModeEvent -- */

	MSSiteModeEvent.buttonID = 0;
	MSSiteModeEvent.actionURL = '';


	/* -- type: SVGFEFuncGElement -- */

	SVGFEFuncGElement.nodeName = SVGFEFuncGElement.tagName = 'FEFUNCG';
	SVGFEFuncGElement.localName = 'fefuncg';


	/* -- type: SVGAnimatedPreserveAspectRatio -- */

	SVGAnimatedPreserveAspectRatio.animVal = SVGPreserveAspectRatio;
	SVGAnimatedPreserveAspectRatio.baseVal = SVGPreserveAspectRatio;


	/* -- type: TextTrackList -- */
	_$implement(TextTrackList, EventTarget);

	TextTrackList.length = 0;
	TextTrackList.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='TextTrack'/>
		/// </signature>
		return this[index] || _$getTrackingNull(Object.create(TextTrack)); 
	};
	_events(TextTrackList, "onaddtrack");
	/* Add a single array element */
	TextTrackList[0] = _$getTrackingNull(Object.create(TextTrack));


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


	/* -- type: WindowSessionStorage -- */

	WindowSessionStorage.sessionStorage = Storage;


	/* -- type: WindowConsole -- */

	WindowConsole.console = Console;


	/* -- type: IDBEnvironment -- */

	IDBEnvironment.msIndexedDB = IDBFactory;
	IDBEnvironment.indexedDB = IDBFactory;


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


	/* -- type: Window -- */
	_$implement(Window, MSEventAttachmentTarget);
	_$implement(Window, MSWindowExtensions);
	_$implement(Window, EventTarget);
	_$implement(Window, WindowBase64);
	_$implement(Window, WindowLocalStorage);
	_$implement(Window, IDBEnvironment);
	_$implement(Window, WindowConsole);
	_$implement(Window, GlobalEventHandlers);
	_$implement(Window, WindowSessionStorage);
	_$implement(Window, WindowTimers);

	Window.devicePixelRatio = 0;
	Window.screenX = 0;
	Window.history = History;
	Window.pageXOffset = 0;
	Window.name = '';
	Window.top = _$getTrackingNull(Object.create(Window));
	Window.opener = _$getTrackingNull(Object.create(Window));
	Window.innerHeight = 0;
	Window.frames = _$getTrackingNull(Object.create(Window));
	Window.outerWidth = 0;
	Window.innerWidth = 0;
	Window.msCrypto = Crypto;
	Window.length = 0;
	Window.screen = Screen;
	Window.self = _$getTrackingNull(Object.create(Window));
	Window.document = Document;
	Window.pageYOffset = 0;
	Window.onerror = ErrorEventHandler;
	Window.parent = _$getTrackingNull(Object.create(Window));
	Window.location = Location;
	Window.outerHeight = 0;
	Window.frameElement = HTMLElement;
	Window.animationStartTime = 0;
	Window.window = _$getTrackingNull(Object.create(Window));
	Window.doNotTrack = '';
	Window.styleMedia = StyleMedia;
	Window.navigator = Navigator;
	Window.msAnimationStartTime = 0;
	Window.applicationCache = ApplicationCache;
	Window.screenY = 0;
	Window.performance = Performance;
	Window.scroll = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	Window.msIsStaticHTML = function(html) { 
		/// <signature>
		/// <param name='html' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Window.scrollTo = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	Window.focus = function() { };
	Window.print = function() { };
	Window.msRequestAnimationFrame = function(callback) { 
		/// <signature>
		/// <param name='callback' type='FrameRequestCallback' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	Window.toString = function() { 
		/// <signature>
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Window.scrollBy = function(x, y) { 
		/// <signature>
		/// <param name='x' type='Number' optional='true' />
		/// <param name='y' type='Number' optional='true' />
		/// </signature>
	};
	Window.close = function() { };
	Window.confirm = function(message) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	Window.matchMedia = function(mediaQuery) { 
		/// <signature>
		/// <param name='mediaQuery' type='String' />
		/// <returns type='MediaQueryList'/>
		/// </signature>
		return MediaQueryList; 
	};
	Window.cancelAnimationFrame = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
	};
	Window.showModalDialog = function(url, argument, options) { 
		/// <signature>
		/// <param name='url' type='String' optional='true' />
		/// <param name='argument' type='Object' optional='true' />
		/// <param name='options' type='Object' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	Window.msMatchMedia = function(mediaQuery) { 
		/// <signature>
		/// <param name='mediaQuery' type='String' />
		/// <returns type='MediaQueryList'/>
		/// </signature>
		return MediaQueryList; 
	};
	Window.blur = function() { };
	Window.alert = function(message) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// </signature>
	};
	Window.requestAnimationFrame = function(callback) { 
		/// <signature>
		/// <param name='callback' type='FrameRequestCallback' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	Window.prompt = function(message, defaultValue) { 
		/// <signature>
		/// <param name='message' type='String' optional='true' />
		/// <param name='defaultValue' type='String' optional='true' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	Window.msCancelRequestAnimationFrame = function(handle) { 
		/// <signature>
		/// <param name='handle' type='Number' />
		/// </signature>
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
	Window.postMessage = function(message, targetOrigin, ports) { 
		/// <signature>
		/// <param name='message' type='Object' />
		/// <param name='targetOrigin' type='String' />
		/// <param name='ports' type='Object' optional='true' />
		/// </signature>
	};
	Window.getSelection = function() { 
		/// <signature>
		/// <returns type='Selection'/>
		/// </signature>
		return Selection; 
	};
	Window.getComputedStyle = function(elt, pseudoElt) { 
		/// <signature>
		/// <param name='elt' type='Element' />
		/// <param name='pseudoElt' type='String' optional='true' />
		/// <returns type='CSSStyleDeclaration'/>
		/// </signature>
		return CSSStyleDeclaration; 
	};
	_events(Window, "onmsgesturedoubletap", "ondragend", "onkeydown", "ondragover", "onkeyup", "onmsgesturechange", "onreset", "onmouseup", "ondragstart", "ondrag", "onpagehide", "onmsgesturestart", "onmouseover", "ondragleave", "onafterprint", "onpause", "onbeforeprint", "ondeviceorientation", "onseeked", "onmousedown", "onclick", "onwaiting", "ononline", "onpageshow", "ondevicemotion", "ondurationchange", "onblur", "onemptied", "onseeking", "oncanplay", "onstalled", "onmousemove", "onmspointerout", "onoffline", "onmsinertiastart", "onmspointerover", "onmspointerenter", "onbeforeunload", "onpopstate", "onstorage", "onratechange", "onmspointerleave", "onloadstart", "onmspointerdown", "ondragenter", "onsubmit", "onprogress", "ondblclick", "oncontextmenu", "onchange", "onloadedmetadata", "onmspointermove", "onmsgesturehold", "onplay", "onplaying", "onmspointercancel", "onmsgestureend", "oncanplaythrough", "onabort", "onreadystatechange", "onkeypress", "onmspointerup", "onloadeddata", "onsuspend", "onfocus", "onmessage", "ontimeupdate", "onresize", "onselect", "ondrop", "onmsgesturetap", "onmouseout", "onended", "onunload", "onhashchange", "onscroll", "onmousewheel", "onvolumechange", "onload", "oninput");


	/* -- type: SVGAnimatedLengthList -- */

	SVGAnimatedLengthList.animVal = SVGLengthList;
	SVGAnimatedLengthList.baseVal = SVGLengthList;


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


	/* -- type: VideoPlaybackQuality -- */

	VideoPlaybackQuality.totalFrameDelay = 0;
	VideoPlaybackQuality.creationTime = 0;
	VideoPlaybackQuality.totalVideoFrames = 0;
	VideoPlaybackQuality.droppedVideoFrames = 0;


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


	/* -- type: AudioTrack -- */

	AudioTrack.kind = '';
	AudioTrack.language = '';
	AudioTrack.sourceBuffer = SourceBuffer;
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


	/* -- type: MouseWheelEvent -- */

	MouseWheelEvent.wheelDelta = 0;
	MouseWheelEvent.initMouseWheelEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, detailArg, screenXArg, screenYArg, clientXArg, clientYArg, buttonArg, relatedTargetArg, modifiersListArg, wheelDeltaArg) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
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


	/* -- type: HTMLMenuElement -- */
	_$implement(HTMLMenuElement, DOML2DeprecatedListSpaceReduction);

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
	HTMLOptionElement.create = function() { 
		/// <signature>
		/// <returns type='HTMLOptionElement'/>
		/// </signature>
		return HTMLOptionElement; 
	};
	HTMLOptionElement.nodeName = HTMLOptionElement.tagName = 'OPTION';
	HTMLOptionElement.localName = 'option';


	/* -- type: HTMLTableCaptionElement -- */

	HTMLTableCaptionElement.align = '';
	HTMLTableCaptionElement.vAlign = '';
	HTMLTableCaptionElement.nodeName = HTMLTableCaptionElement.tagName = 'CAPTION';
	HTMLTableCaptionElement.localName = 'caption';


	/* -- type: SVGAnimatedTransformList -- */

	SVGAnimatedTransformList.animVal = SVGTransformList;
	SVGAnimatedTransformList.baseVal = SVGTransformList;


	/* -- type: ControlRangeCollection -- */

	ControlRangeCollection.length = 0;
	ControlRangeCollection.queryCommandValue = function(cmdID) { 
		/// <signature>
		/// <param name='cmdID' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
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


	/* -- type: SVGTitleElement -- */
	_$implement(SVGTitleElement, SVGStylable);
	_$implement(SVGTitleElement, SVGLangSpace);

	SVGTitleElement.nodeName = SVGTitleElement.tagName = 'TITLE';
	SVGTitleElement.localName = 'title';


	/* -- type: KeyPair -- */

	KeyPair.privateKey = Key;
	KeyPair.publicKey = Key;


	/* -- type: WebGLProgram -- */



	/* -- type: HTMLFontElement -- */
	_$implement(HTMLFontElement, DOML2DeprecatedColorProperty);
	_$implement(HTMLFontElement, DOML2DeprecatedSizeProperty);

	HTMLFontElement.face = '';
	HTMLFontElement.nodeName = HTMLFontElement.tagName = 'FONT';
	HTMLFontElement.localName = 'font';


	/* -- type: SVGFEDistantLightElement -- */

	SVGFEDistantLightElement.azimuth = SVGAnimatedNumber;
	SVGFEDistantLightElement.elevation = SVGAnimatedNumber;
	SVGFEDistantLightElement.nodeName = SVGFEDistantLightElement.tagName = 'FEDISTANTLIGHT';
	SVGFEDistantLightElement.localName = 'fedistantlight';


	/* -- type: HTMLLinkElement -- */
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


	/* -- type: NodeIterator -- */

	NodeIterator.whatToShow = 0;
	NodeIterator.filter = NodeFilter;
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


	/* -- type: CSSStyleRule -- */

	CSSStyleRule.selectorText = '';
	CSSStyleRule.style = MSStyleCSSProperties;
	CSSStyleRule.readOnly = false;


	/* -- type: Algorithm -- */

	Algorithm.params = AlgorithmParameters;
	Algorithm.name = '';


	/* -- type: HTMLDDElement -- */

	HTMLDDElement.noWrap = false;
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


	/* -- type: SVGScriptElement -- */
	_$implement(SVGScriptElement, SVGURIReference);
	_$implement(SVGScriptElement, SVGExternalResourcesRequired);

	SVGScriptElement.type = '';
	SVGScriptElement.nodeName = SVGScriptElement.tagName = 'SCRIPT';
	SVGScriptElement.localName = 'script';


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


	/* -- type: SVGAnimatedAngle -- */

	SVGAnimatedAngle.animVal = SVGAngle;
	SVGAnimatedAngle.baseVal = SVGAngle;


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


	/* -- type: HTMLMetaElement -- */

	HTMLMetaElement.httpEquiv = '';
	HTMLMetaElement.url = '';
	HTMLMetaElement.content = '';
	HTMLMetaElement.name = '';
	HTMLMetaElement.charset = '';
	HTMLMetaElement.scheme = '';
	HTMLMetaElement.nodeName = HTMLMetaElement.tagName = 'META';
	HTMLMetaElement.localName = 'meta';


	/* -- type: CSSStyleSheet -- */

	CSSStyleSheet.owningElement = HTMLElement;
	CSSStyleSheet.imports = StyleSheetList;
	CSSStyleSheet.rules = MSCSSRuleList;
	CSSStyleSheet.isAlternate = false;
	CSSStyleSheet.readOnly = false;
	CSSStyleSheet.isPrefAlternate = false;
	CSSStyleSheet.cssText = '';
	CSSStyleSheet.ownerRule = CSSRule;
	CSSStyleSheet.href = '';
	CSSStyleSheet.cssRules = CSSRuleList;
	CSSStyleSheet.id = '';
	CSSStyleSheet.pages = StyleSheetPageList;
	CSSStyleSheet.addPageRule = function(bstrSelector, bstrStyle, lIndex) { 
		/// <signature>
		/// <param name='bstrSelector' type='String' />
		/// <param name='bstrStyle' type='String' />
		/// <param name='lIndex' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	CSSStyleSheet.addImport = function(bstrURL, lIndex) { 
		/// <signature>
		/// <param name='bstrURL' type='String' />
		/// <param name='lIndex' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	CSSStyleSheet.removeRule = function(lIndex) { 
		/// <signature>
		/// <param name='lIndex' type='Number' />
		/// </signature>
	};
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
	CSSStyleSheet.removeImport = function(lIndex) { 
		/// <signature>
		/// <param name='lIndex' type='Number' />
		/// </signature>
	};
	CSSStyleSheet.addRule = function(bstrSelector, bstrStyle, lIndex) { 
		/// <signature>
		/// <param name='bstrSelector' type='String' />
		/// <param name='bstrStyle' type='String' optional='true' />
		/// <param name='lIndex' type='Number' optional='true' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};


	/* -- type: HTMLBlockElement -- */
	_$implement(HTMLBlockElement, DOML2DeprecatedTextFlowControl);

	HTMLBlockElement.width = 0;
	HTMLBlockElement.cite = '';
	HTMLBlockElement.nodeName = HTMLBlockElement.tagName = 'XMP';
	HTMLBlockElement.localName = 'xmp';


	/* -- type: MSMediaKeyNeededEvent -- */

	MSMediaKeyNeededEvent.initData = new Uint8Array();


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
		return {}; 
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
	TextRange.move = function(unit, count) { 
		/// <signature>
		/// <param name='unit' type='String' />
		/// <param name='count' type='Number' optional='true' />
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
	TextRange.moveToBookmark = function(bookmark) { 
		/// <signature>
		/// <param name='bookmark' type='String' />
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
	TextRange.collapse = function(start) { 
		/// <signature>
		/// <param name='start' type='Boolean' optional='true' />
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
	TextRange.moveEnd = function(unit, count) { 
		/// <signature>
		/// <param name='unit' type='String' />
		/// <param name='count' type='Number' optional='true' />
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
	TextRange.moveStart = function(unit, count) { 
		/// <signature>
		/// <param name='unit' type='String' />
		/// <param name='count' type='Number' optional='true' />
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


	/* -- type: HTMLSelectElement -- */
	_$implement(HTMLSelectElement, MSDataBindingExtensions);
	_$implement(HTMLSelectElement, MSHTMLCollectionExtensions);

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
		return {}; 
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
		return {}; 
	};
	HTMLSelectElement.nodeName = HTMLSelectElement.tagName = 'SELECT';
	HTMLSelectElement.localName = 'select';


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


	/* -- type: PerformanceNavigationTiming -- */

	PerformanceNavigationTiming.redirectStart = 0;
	PerformanceNavigationTiming.domainLookupEnd = 0;
	PerformanceNavigationTiming.responseStart = 0;
	PerformanceNavigationTiming.domComplete = 0;
	PerformanceNavigationTiming.domainLookupStart = 0;
	PerformanceNavigationTiming.loadEventStart = 0;
	PerformanceNavigationTiming.unloadEventEnd = 0;
	PerformanceNavigationTiming.fetchStart = 0;
	PerformanceNavigationTiming.requestStart = 0;
	PerformanceNavigationTiming.domInteractive = 0;
	PerformanceNavigationTiming.navigationStart = 0;
	PerformanceNavigationTiming.connectEnd = 0;
	PerformanceNavigationTiming.loadEventEnd = 0;
	PerformanceNavigationTiming.connectStart = 0;
	PerformanceNavigationTiming.responseEnd = 0;
	PerformanceNavigationTiming.domLoading = 0;
	PerformanceNavigationTiming.redirectEnd = 0;
	PerformanceNavigationTiming.redirectCount = 0;
	PerformanceNavigationTiming.unloadEventStart = 0;
	PerformanceNavigationTiming.domContentLoadedEventStart = 0;
	PerformanceNavigationTiming.domContentLoadedEventEnd = 0;
	PerformanceNavigationTiming.type = '';


	/* -- type: StyleMedia -- */

	StyleMedia.type = '';
	StyleMedia.matchMedium = function(mediaquery) { 
		/// <signature>
		/// <param name='mediaquery' type='String' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};


	/* -- type: CDATASection -- */

	CDATASection.nodeType = Node.CDATA_SECTION_NODE;
	CDATASection.nodeName = '#cdata-section';


	/* -- type: SVGAnimatedString -- */

	SVGAnimatedString.animVal = '';
	SVGAnimatedString.baseVal = '';


	/* -- type: SVGPathSegLinetoVerticalRel -- */

	SVGPathSegLinetoVerticalRel.y = 0;


	/* -- type: HTMLOListElement -- */
	_$implement(HTMLOListElement, DOML2DeprecatedListNumberingAndBulletStyle);
	_$implement(HTMLOListElement, DOML2DeprecatedListSpaceReduction);

	HTMLOListElement.start = 0;
	HTMLOListElement.nodeName = HTMLOListElement.tagName = 'OL';
	HTMLOListElement.localName = 'ol';


	/* -- type: TextMetrics -- */

	TextMetrics.width = 0;


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
	_events(AudioTrackList, "onremovetrack", "onchange", "onaddtrack");
	/* Add a single array element */
	AudioTrackList[0] = _$getTrackingNull(Object.create(AudioTrack));


	/* -- type: XMLHttpRequestEventTarget -- */
	_$implement(XMLHttpRequestEventTarget, EventTarget);

	_events(XMLHttpRequestEventTarget, "onprogress", "onerror", "onload", "ontimeout", "onabort", "onloadstart", "onloadend");


	/* -- type: HTMLAppletElement -- */
	_$implement(HTMLAppletElement, DOML2DeprecatedMarginStyle);
	_$implement(HTMLAppletElement, DOML2DeprecatedBorderStyle);
	_$implement(HTMLAppletElement, DOML2DeprecatedAlignmentStyle);
	_$implement(HTMLAppletElement, MSDataBindingRecordSetExtensions);
	_$implement(HTMLAppletElement, MSDataBindingExtensions);

	HTMLAppletElement.codeType = '';
	HTMLAppletElement.width = 0;
	HTMLAppletElement.object = '';
	HTMLAppletElement.form = HTMLFormElement;
	HTMLAppletElement.code = '';
	HTMLAppletElement.archive = '';
	HTMLAppletElement.alt = '';
	HTMLAppletElement.standby = '';
	HTMLAppletElement.classid = '';
	HTMLAppletElement.name = '';
	HTMLAppletElement.useMap = '';
	HTMLAppletElement.data = '';
	HTMLAppletElement.height = '';
	HTMLAppletElement.altHtml = '';
	HTMLAppletElement.contentDocument = document;
	HTMLAppletElement.codeBase = '';
	HTMLAppletElement.declare = false;
	HTMLAppletElement.type = '';
	HTMLAppletElement.BaseHref = '';
	HTMLAppletElement.nodeName = HTMLAppletElement.tagName = 'APPLET';
	HTMLAppletElement.localName = 'applet';


	/* -- type: IDBCursorWithValue -- */

	IDBCursorWithValue.value = {};


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


	/* -- type: SVGDescElement -- */
	_$implement(SVGDescElement, SVGStylable);
	_$implement(SVGDescElement, SVGLangSpace);

	SVGDescElement.nodeName = SVGDescElement.tagName = 'DESC';
	SVGDescElement.localName = 'desc';


	/* -- type: File -- */

	File.lastModifiedDate = {};
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


	/* -- type: Plugin -- */

	Plugin.length = 0;
	Plugin.filename = '';
	Plugin.version = '';
	Plugin.name = '';
	Plugin.description = '';
	Plugin.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='MimeType'/>
		/// </signature>
		return MimeType; 
	};
	Plugin.namedItem = function(type) { 
		/// <signature>
		/// <param name='type' type='String' />
		/// <returns type='MimeType'/>
		/// </signature>
		return MimeType; 
	};


	/* -- type: HTMLParagraphElement -- */
	_$implement(HTMLParagraphElement, DOML2DeprecatedTextFlowControl);

	HTMLParagraphElement.align = '';
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


	/* -- type: PluginArray -- */

	PluginArray.length = 0;
	PluginArray.refresh = function(reload) { 
		/// <signature>
		/// <param name='reload' type='Boolean' optional='true' />
		/// </signature>
	};
	PluginArray.item = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <returns type='Plugin'/>
		/// </signature>
		return Plugin; 
	};
	PluginArray.namedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Plugin'/>
		/// </signature>
		return Plugin; 
	};


	/* -- type: SVGPathSegMovetoRel -- */

	SVGPathSegMovetoRel.y = 0;
	SVGPathSegMovetoRel.x = 0;


	/* -- type: HTMLNextIdElement -- */

	HTMLNextIdElement.n = '';
	HTMLNextIdElement.nodeName = HTMLNextIdElement.tagName = 'NEXTID';
	HTMLNextIdElement.localName = 'nextid';


	/* -- type: MSInputMethodContext -- */
	_$implement(MSInputMethodContext, EventTarget);

	MSInputMethodContext.target = HTMLElement;
	MSInputMethodContext.compositionStartOffset = 0;
	MSInputMethodContext.compositionEndOffset = 0;
	MSInputMethodContext.getCompositionAlternatives = function() { 
		/// <signature>
		/// <returns type='Array' elementType='String'/>
		/// </signature>
		return new Array(); 
	};
	MSInputMethodContext.getCandidateWindowClientRect = function() { 
		/// <signature>
		/// <returns type='ClientRect'/>
		/// </signature>
		return ClientRect; 
	};
	MSInputMethodContext.hasComposition = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	MSInputMethodContext.isCandidateWindowVisible = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	_events(MSInputMethodContext, "oncandidatewindowshow", "oncandidatewindowhide", "oncandidatewindowupdate");


	/* -- type: IDBVersionChangeEvent -- */

	IDBVersionChangeEvent.newVersion = 0;
	IDBVersionChangeEvent.oldVersion = 0;


	/* -- type: DOMStringMap -- */



	/* -- type: ObjectURLOptions -- */

	ObjectURLOptions.oneTimeOnly = false;


	/* -- type: DOMImplementation -- */

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
	DOMImplementation.createHTMLDocument = function(title) { 
		/// <signature>
		/// <param name='title' type='String' />
		/// <returns type='Document'/>
		/// </signature>
		return Document; 
	};


	/* -- type: KeyOperation -- */
	_$implement(KeyOperation, EventTarget);

	KeyOperation.result = {};
	_events(KeyOperation, "oncomplete", "onerror");


	/* -- type: PositionErrorCallback -- */

	PositionErrorCallback.handleEvent = function(error) { 
		/// <signature>
		/// <param name='error' type='PositionError' />
		/// </signature>
	};


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
		return _createIDBRequest(IDBRequest, this, {});
	};
	IDBObjectStore.delete = function(key) { 
		/// <signature>
		/// <param name='key' type='Object' />
		/// <returns type='IDBRequest'/>
		/// </signature>
		return _createIDBRequest(IDBRequest, this, undefined);
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


	/* -- type: HTMLTableDataCellElement -- */

	HTMLTableDataCellElement.nodeName = HTMLTableDataCellElement.tagName = 'TD';
	HTMLTableDataCellElement.localName = 'td';


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


	/* -- type: NavigatorID -- */

	NavigatorID.appVersion = '';
	NavigatorID.appName = '';
	NavigatorID.userAgent = '';
	NavigatorID.product = '';
	NavigatorID.platform = '';
	NavigatorID.vendor = '';


	/* -- type: Navigator -- */
	_$implement(Navigator, NavigatorOnLine);
	_$implement(Navigator, NavigatorID);
	_$implement(Navigator, NavigatorContentUtils);
	_$implement(Navigator, MSNavigatorExtensions);
	_$implement(Navigator, MSFileSaver);
	_$implement(Navigator, MSNavigatorDoNotTrack);
	_$implement(Navigator, NavigatorGeolocation);
	_$implement(Navigator, NavigatorStorageUtils);

	Navigator.pointerEnabled = false;
	Navigator.maxTouchPoints = 0;
	Navigator.msMaxTouchPoints = 0;
	Navigator.msPointerEnabled = false;
	Navigator.msManipulationViewsEnabled = false;
	Navigator.msLaunchUri = function(uri, successCallback, noHandlerCallback) { 
		/// <signature>
		/// <param name='uri' type='String' />
		/// <param name='successCallback' type='MSLaunchUriCallback' optional='true' />
		/// <param name='noHandlerCallback' type='MSLaunchUriCallback' optional='true' />
		/// </signature>
	};


	/* -- type: SVGFEMergeElement -- */
	_$implement(SVGFEMergeElement, SVGFilterPrimitiveStandardAttributes);

	SVGFEMergeElement.nodeName = SVGFEMergeElement.tagName = 'FEMERGE';
	SVGFEMergeElement.localName = 'femerge';


	/* -- type: MessageChannel -- */

	MessageChannel.port2 = MessagePort;
	MessageChannel.port1 = MessagePort;


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


	/* -- type: SVGGElement -- */
	_$implement(SVGGElement, SVGStylable);
	_$implement(SVGGElement, SVGTransformable);
	_$implement(SVGGElement, SVGLangSpace);
	_$implement(SVGGElement, SVGTests);
	_$implement(SVGGElement, SVGExternalResourcesRequired);

	SVGGElement.nodeName = SVGGElement.tagName = 'G';
	SVGGElement.localName = 'g';


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


	/* -- type: CompositionEvent -- */

	CompositionEvent.locale = '';
	CompositionEvent.data = '';
	CompositionEvent.initCompositionEvent = function(typeArg, canBubbleArg, cancelableArg, viewArg, dataArg, locale) { 
		/// <signature>
		/// <param name='typeArg' type='String' />
		/// <param name='canBubbleArg' type='Boolean' />
		/// <param name='cancelableArg' type='Boolean' />
		/// <param name='viewArg' type='Window' />
		/// <param name='dataArg' type='String' />
		/// <param name='locale' type='String' />
		/// </signature>
	};


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


	/* -- type: MSDataBindingTableExtensions -- */



	/* -- type: HTMLAllCollection -- */

	HTMLAllCollection.namedItem = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Element'/>
		/// </signature>
		return HTMLElement; 
	};


	/* -- type: Performance -- */

	Performance.navigation = PerformanceNavigation;
	Performance.timing = PerformanceTiming;
	Performance.getEntriesByType = function(entryType) { 
		/// <signature>
		/// <param name='entryType' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	Performance.toJSON = function() { 
		/// <signature>
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
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
		return {}; 
	};
	Performance.getMarks = function(markName) { 
		/// <signature>
		/// <param name='markName' type='String' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
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
		return {}; 
	};
	Performance.getEntriesByName = function(name, entryType) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <param name='entryType' type='String' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	Performance.setResourceTimingBufferSize = function(maxSize) { 
		/// <signature>
		/// <param name='maxSize' type='Number' />
		/// </signature>
	};


	/* -- type: SVGFEFuncAElement -- */

	SVGFEFuncAElement.nodeName = SVGFEFuncAElement.tagName = 'FEFUNCA';
	SVGFEFuncAElement.localName = 'fefunca';


	/* -- type: CanvasPixelArray -- */

	CanvasPixelArray.length = 0;


	/* -- type: WebGLRenderingContext -- */

	WebGLRenderingContext.drawingBufferWidth = 0;
	WebGLRenderingContext.drawingBufferHeight = 0;
	WebGLRenderingContext.canvas = HTMLCanvasElement;
	WebGLRenderingContext.DEPTH_FUNC = 0x0B74;
	WebGLRenderingContext.DEPTH_COMPONENT16 = 0x81A5;
	WebGLRenderingContext.REPLACE = 0x1E01;
	WebGLRenderingContext.REPEAT = 0x2901;
	WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622;
	WebGLRenderingContext.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9;
	WebGLRenderingContext.RENDERER = 0x1F01;
	WebGLRenderingContext.STENCIL_BACK_REF = 0x8CA3;
	WebGLRenderingContext.STENCIL_BUFFER_BIT = 0x00000400;
	WebGLRenderingContext.TEXTURE26 = 0x84DA;
	WebGLRenderingContext.RGB565 = 0x8D62;
	WebGLRenderingContext.DITHER = 0x0BD0;
	WebGLRenderingContext.CONSTANT_COLOR = 0x8001;
	WebGLRenderingContext.GENERATE_MIPMAP_HINT = 0x8192;
	WebGLRenderingContext.POINTS = 0x0000;
	WebGLRenderingContext.INT_VEC3 = 0x8B54;
	WebGLRenderingContext.TEXTURE28 = 0x84DC;
	WebGLRenderingContext.DECR = 0x1E03;
	WebGLRenderingContext.ONE_MINUS_CONSTANT_ALPHA = 0x8004;
	WebGLRenderingContext.BACK = 0x0405;
	WebGLRenderingContext.RENDERBUFFER_STENCIL_SIZE = 0x8D55;
	WebGLRenderingContext.UNPACK_FLIP_Y_WEBGL = 0x9240;
	WebGLRenderingContext.BLEND = 0x0BE2;
	WebGLRenderingContext.TEXTURE9 = 0x84C9;
	WebGLRenderingContext.ARRAY_BUFFER_BINDING = 0x8894;
	WebGLRenderingContext.MAX_VIEWPORT_DIMS = 0x0D3A;
	WebGLRenderingContext.INVALID_FRAMEBUFFER_OPERATION = 0x0506;
	WebGLRenderingContext.TEXTURE = 0x1702;
	WebGLRenderingContext.TEXTURE0 = 0x84C0;
	WebGLRenderingContext.TEXTURE31 = 0x84DF;
	WebGLRenderingContext.TEXTURE24 = 0x84D8;
	WebGLRenderingContext.HIGH_INT = 0x8DF5;
	WebGLRenderingContext.RENDERBUFFER_BINDING = 0x8CA7;
	WebGLRenderingContext.BLEND_COLOR = 0x8005;
	WebGLRenderingContext.FASTEST = 0x1101;
	WebGLRenderingContext.STENCIL_WRITEMASK = 0x0B98;
	WebGLRenderingContext.ALIASED_POINT_SIZE_RANGE = 0x846D;
	WebGLRenderingContext.TEXTURE12 = 0x84CC;
	WebGLRenderingContext.DST_ALPHA = 0x0304;
	WebGLRenderingContext.BLEND_EQUATION_RGB = 0x8009;
	WebGLRenderingContext.FRAMEBUFFER_COMPLETE = 0x8CD5;
	WebGLRenderingContext.NEAREST_MIPMAP_NEAREST = 0x2700;
	WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_SIZE = 0x8623;
	WebGLRenderingContext.TEXTURE3 = 0x84C3;
	WebGLRenderingContext.DEPTH_WRITEMASK = 0x0B72;
	WebGLRenderingContext.CONTEXT_LOST_WEBGL = 0x9242;
	WebGLRenderingContext.INVALID_VALUE = 0x0501;
	WebGLRenderingContext.TEXTURE_MAG_FILTER = 0x2800;
	WebGLRenderingContext.ONE_MINUS_CONSTANT_COLOR = 0x8002;
	WebGLRenderingContext.ONE_MINUS_SRC_ALPHA = 0x0303;
	WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
	WebGLRenderingContext.NOTEQUAL = 0x0205;
	WebGLRenderingContext.ALPHA = 0x1906;
	WebGLRenderingContext.DEPTH_STENCIL = 0x84F9;
	WebGLRenderingContext.MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;
	WebGLRenderingContext.DEPTH_COMPONENT = 0x1902;
	WebGLRenderingContext.RENDERBUFFER_RED_SIZE = 0x8D50;
	WebGLRenderingContext.TEXTURE20 = 0x84D4;
	WebGLRenderingContext.RED_BITS = 0x0D52;
	WebGLRenderingContext.RENDERBUFFER_BLUE_SIZE = 0x8D52;
	WebGLRenderingContext.SCISSOR_BOX = 0x0C10;
	WebGLRenderingContext.VENDOR = 0x1F00;
	WebGLRenderingContext.FRONT_AND_BACK = 0x0408;
	WebGLRenderingContext.CONSTANT_ALPHA = 0x8003;
	WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F;
	WebGLRenderingContext.NEAREST = 0x2600;
	WebGLRenderingContext.CULL_FACE = 0x0B44;
	WebGLRenderingContext.ALIASED_LINE_WIDTH_RANGE = 0x846E;
	WebGLRenderingContext.TEXTURE19 = 0x84D3;
	WebGLRenderingContext.FRONT = 0x0404;
	WebGLRenderingContext.DEPTH_CLEAR_VALUE = 0x0B73;
	WebGLRenderingContext.GREEN_BITS = 0x0D53;
	WebGLRenderingContext.TEXTURE29 = 0x84DD;
	WebGLRenderingContext.TEXTURE23 = 0x84D7;
	WebGLRenderingContext.MAX_RENDERBUFFER_SIZE = 0x84E8;
	WebGLRenderingContext.STENCIL_ATTACHMENT = 0x8D20;
	WebGLRenderingContext.TEXTURE27 = 0x84DB;
	WebGLRenderingContext.BOOL_VEC2 = 0x8B57;
	WebGLRenderingContext.OUT_OF_MEMORY = 0x0505;
	WebGLRenderingContext.MIRRORED_REPEAT = 0x8370;
	WebGLRenderingContext.POLYGON_OFFSET_UNITS = 0x2A00;
	WebGLRenderingContext.TEXTURE_MIN_FILTER = 0x2801;
	WebGLRenderingContext.STENCIL_BACK_PASS_DEPTH_PASS = 0x8803;
	WebGLRenderingContext.LINE_LOOP = 0x0002;
	WebGLRenderingContext.FLOAT_MAT3 = 0x8B5B;
	WebGLRenderingContext.TEXTURE14 = 0x84CE;
	WebGLRenderingContext.LINEAR = 0x2601;
	WebGLRenderingContext.RGB5_A1 = 0x8057;
	WebGLRenderingContext.ONE_MINUS_SRC_COLOR = 0x0301;
	WebGLRenderingContext.SAMPLE_COVERAGE_INVERT = 0x80AB;
	WebGLRenderingContext.DONT_CARE = 0x1100;
	WebGLRenderingContext.FRAMEBUFFER_BINDING = 0x8CA6;
	WebGLRenderingContext.RENDERBUFFER_ALPHA_SIZE = 0x8D53;
	WebGLRenderingContext.STENCIL_REF = 0x0B97;
	WebGLRenderingContext.ZERO = 0;
	WebGLRenderingContext.DECR_WRAP = 0x8508;
	WebGLRenderingContext.SAMPLE_COVERAGE = 0x80A0;
	WebGLRenderingContext.STENCIL_BACK_FUNC = 0x8800;
	WebGLRenderingContext.TEXTURE30 = 0x84DE;
	WebGLRenderingContext.VIEWPORT = 0x0BA2;
	WebGLRenderingContext.STENCIL_BITS = 0x0D57;
	WebGLRenderingContext.FLOAT = 0x1406;
	WebGLRenderingContext.COLOR_WRITEMASK = 0x0C23;
	WebGLRenderingContext.SAMPLE_COVERAGE_VALUE = 0x80AA;
	WebGLRenderingContext.TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
	WebGLRenderingContext.STENCIL_BACK_FAIL = 0x8801;
	WebGLRenderingContext.FLOAT_MAT4 = 0x8B5C;
	WebGLRenderingContext.UNSIGNED_SHORT_4_4_4_4 = 0x8033;
	WebGLRenderingContext.TEXTURE6 = 0x84C6;
	WebGLRenderingContext.RENDERBUFFER_WIDTH = 0x8D42;
	WebGLRenderingContext.RGBA4 = 0x8056;
	WebGLRenderingContext.ALWAYS = 0x0207;
	WebGLRenderingContext.BLEND_EQUATION_ALPHA = 0x883D;
	WebGLRenderingContext.COLOR_BUFFER_BIT = 0x00004000;
	WebGLRenderingContext.TEXTURE_CUBE_MAP = 0x8513;
	WebGLRenderingContext.DEPTH_BUFFER_BIT = 0x00000100;
	WebGLRenderingContext.STENCIL_CLEAR_VALUE = 0x0B91;
	WebGLRenderingContext.BLEND_EQUATION = 0x8009;
	WebGLRenderingContext.RENDERBUFFER_GREEN_SIZE = 0x8D51;
	WebGLRenderingContext.NEAREST_MIPMAP_LINEAR = 0x2702;
	WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_TYPE = 0x8625;
	WebGLRenderingContext.INCR_WRAP = 0x8507;
	WebGLRenderingContext.ONE_MINUS_DST_COLOR = 0x0307;
	WebGLRenderingContext.HIGH_FLOAT = 0x8DF2;
	WebGLRenderingContext.BYTE = 0x1400;
	WebGLRenderingContext.FRONT_FACE = 0x0B46;
	WebGLRenderingContext.SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
	WebGLRenderingContext.TEXTURE13 = 0x84CD;
	WebGLRenderingContext.MAX_VERTEX_ATTRIBS = 0x8869;
	WebGLRenderingContext.CCW = 0x0901;
	WebGLRenderingContext.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
	WebGLRenderingContext.TEXTURE_WRAP_T = 0x2803;
	WebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
	WebGLRenderingContext.FLOAT_VEC2 = 0x8B50;
	WebGLRenderingContext.LUMINANCE = 0x1909;
	WebGLRenderingContext.GREATER = 0x0204;
	WebGLRenderingContext.INT_VEC2 = 0x8B53;
	WebGLRenderingContext.VALIDATE_STATUS = 0x8B83;
	WebGLRenderingContext.FRAMEBUFFER = 0x8D40;
	WebGLRenderingContext.FRAMEBUFFER_UNSUPPORTED = 0x8CDD;
	WebGLRenderingContext.TEXTURE5 = 0x84C5;
	WebGLRenderingContext.FUNC_SUBTRACT = 0x800A;
	WebGLRenderingContext.BLEND_DST_ALPHA = 0x80CA;
	WebGLRenderingContext.SAMPLER_CUBE = 0x8B60;
	WebGLRenderingContext.ONE_MINUS_DST_ALPHA = 0x0305;
	WebGLRenderingContext.LESS = 0x0201;
	WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
	WebGLRenderingContext.BLUE_BITS = 0x0D54;
	WebGLRenderingContext.DEPTH_TEST = 0x0B71;
	WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624;
	WebGLRenderingContext.DELETE_STATUS = 0x8B80;
	WebGLRenderingContext.TEXTURE18 = 0x84D2;
	WebGLRenderingContext.POLYGON_OFFSET_FACTOR = 0x8038;
	WebGLRenderingContext.UNSIGNED_INT = 0x1405;
	WebGLRenderingContext.TEXTURE_2D = 0x0DE1;
	WebGLRenderingContext.DST_COLOR = 0x0306;
	WebGLRenderingContext.FLOAT_MAT2 = 0x8B5A;
	WebGLRenderingContext.COMPRESSED_TEXTURE_FORMATS = 0x86A3;
	WebGLRenderingContext.MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;
	WebGLRenderingContext.DEPTH_STENCIL_ATTACHMENT = 0x821A;
	WebGLRenderingContext.LUMINANCE_ALPHA = 0x190A;
	WebGLRenderingContext.CW = 0x0900;
	WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A;
	WebGLRenderingContext.TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
	WebGLRenderingContext.LINEAR_MIPMAP_LINEAR = 0x2703;
	WebGLRenderingContext.BUFFER_SIZE = 0x8764;
	WebGLRenderingContext.SAMPLE_BUFFERS = 0x80A8;
	WebGLRenderingContext.TEXTURE15 = 0x84CF;
	WebGLRenderingContext.ACTIVE_TEXTURE = 0x84E0;
	WebGLRenderingContext.VERTEX_SHADER = 0x8B31;
	WebGLRenderingContext.TEXTURE22 = 0x84D6;
	WebGLRenderingContext.VERTEX_ATTRIB_ARRAY_POINTER = 0x8645;
	WebGLRenderingContext.INCR = 0x1E02;
	WebGLRenderingContext.COMPILE_STATUS = 0x8B81;
	WebGLRenderingContext.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
	WebGLRenderingContext.TEXTURE7 = 0x84C7;
	WebGLRenderingContext.UNSIGNED_SHORT_5_5_5_1 = 0x8034;
	WebGLRenderingContext.DEPTH_BITS = 0x0D56;
	WebGLRenderingContext.RGBA = 0x1908;
	WebGLRenderingContext.TRIANGLE_STRIP = 0x0005;
	WebGLRenderingContext.COLOR_CLEAR_VALUE = 0x0C22;
	WebGLRenderingContext.BROWSER_DEFAULT_WEBGL = 0x9244;
	WebGLRenderingContext.INVALID_ENUM = 0x0500;
	WebGLRenderingContext.SCISSOR_TEST = 0x0C11;
	WebGLRenderingContext.LINE_STRIP = 0x0003;
	WebGLRenderingContext.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6;
	WebGLRenderingContext.STENCIL_FUNC = 0x0B92;
	WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1;
	WebGLRenderingContext.RENDERBUFFER_HEIGHT = 0x8D43;
	WebGLRenderingContext.TEXTURE8 = 0x84C8;
	WebGLRenderingContext.TRIANGLES = 0x0004;
	WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0;
	WebGLRenderingContext.STENCIL_BACK_VALUE_MASK = 0x8CA4;
	WebGLRenderingContext.TEXTURE25 = 0x84D9;
	WebGLRenderingContext.RENDERBUFFER = 0x8D41;
	WebGLRenderingContext.LEQUAL = 0x0203;
	WebGLRenderingContext.TEXTURE1 = 0x84C1;
	WebGLRenderingContext.STENCIL_INDEX8 = 0x8D48;
	WebGLRenderingContext.FUNC_ADD = 0x8006;
	WebGLRenderingContext.STENCIL_FAIL = 0x0B94;
	WebGLRenderingContext.BLEND_SRC_ALPHA = 0x80CB;
	WebGLRenderingContext.BOOL = 0x8B56;
	WebGLRenderingContext.ALPHA_BITS = 0x0D55;
	WebGLRenderingContext.LOW_INT = 0x8DF3;
	WebGLRenderingContext.TEXTURE10 = 0x84CA;
	WebGLRenderingContext.SRC_COLOR = 0x0300;
	WebGLRenderingContext.MAX_VARYING_VECTORS = 0x8DFC;
	WebGLRenderingContext.BLEND_DST_RGB = 0x80C8;
	WebGLRenderingContext.TEXTURE_BINDING_CUBE_MAP = 0x8514;
	WebGLRenderingContext.STENCIL_INDEX = 0x1901;
	WebGLRenderingContext.TEXTURE_BINDING_2D = 0x8069;
	WebGLRenderingContext.MEDIUM_INT = 0x8DF4;
	WebGLRenderingContext.SHADER_TYPE = 0x8B4F;
	WebGLRenderingContext.POLYGON_OFFSET_FILL = 0x8037;
	WebGLRenderingContext.DYNAMIC_DRAW = 0x88E8;
	WebGLRenderingContext.TEXTURE4 = 0x84C4;
	WebGLRenderingContext.STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802;
	WebGLRenderingContext.STREAM_DRAW = 0x88E0;
	WebGLRenderingContext.MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
	WebGLRenderingContext.TEXTURE17 = 0x84D1;
	WebGLRenderingContext.TRIANGLE_FAN = 0x0006;
	WebGLRenderingContext.UNPACK_ALIGNMENT = 0x0CF5;
	WebGLRenderingContext.CURRENT_PROGRAM = 0x8B8D;
	WebGLRenderingContext.LINES = 0x0001;
	WebGLRenderingContext.INVALID_OPERATION = 0x0502;
	WebGLRenderingContext.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
	WebGLRenderingContext.LINEAR_MIPMAP_NEAREST = 0x2701;
	WebGLRenderingContext.CLAMP_TO_EDGE = 0x812F;
	WebGLRenderingContext.RENDERBUFFER_DEPTH_SIZE = 0x8D54;
	WebGLRenderingContext.TEXTURE_WRAP_S = 0x2802;
	WebGLRenderingContext.ELEMENT_ARRAY_BUFFER = 0x8893;
	WebGLRenderingContext.UNSIGNED_SHORT_5_6_5 = 0x8363;
	WebGLRenderingContext.ACTIVE_UNIFORMS = 0x8B86;
	WebGLRenderingContext.FLOAT_VEC3 = 0x8B51;
	WebGLRenderingContext.NO_ERROR = 0;
	WebGLRenderingContext.ATTACHED_SHADERS = 0x8B85;
	WebGLRenderingContext.DEPTH_ATTACHMENT = 0x8D00;
	WebGLRenderingContext.TEXTURE11 = 0x84CB;
	WebGLRenderingContext.STENCIL_TEST = 0x0B90;
	WebGLRenderingContext.ONE = 1;
	WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3;
	WebGLRenderingContext.STATIC_DRAW = 0x88E4;
	WebGLRenderingContext.GEQUAL = 0x0206;
	WebGLRenderingContext.BOOL_VEC4 = 0x8B59;
	WebGLRenderingContext.COLOR_ATTACHMENT0 = 0x8CE0;
	WebGLRenderingContext.PACK_ALIGNMENT = 0x0D05;
	WebGLRenderingContext.MAX_TEXTURE_SIZE = 0x0D33;
	WebGLRenderingContext.STENCIL_PASS_DEPTH_FAIL = 0x0B95;
	WebGLRenderingContext.CULL_FACE_MODE = 0x0B45;
	WebGLRenderingContext.TEXTURE16 = 0x84D0;
	WebGLRenderingContext.STENCIL_BACK_WRITEMASK = 0x8CA5;
	WebGLRenderingContext.SRC_ALPHA = 0x0302;
	WebGLRenderingContext.UNSIGNED_SHORT = 0x1403;
	WebGLRenderingContext.TEXTURE21 = 0x84D5;
	WebGLRenderingContext.FUNC_REVERSE_SUBTRACT = 0x800B;
	WebGLRenderingContext.SHADING_LANGUAGE_VERSION = 0x8B8C;
	WebGLRenderingContext.EQUAL = 0x0202;
	WebGLRenderingContext.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2;
	WebGLRenderingContext.BOOL_VEC3 = 0x8B58;
	WebGLRenderingContext.SAMPLER_2D = 0x8B5E;
	WebGLRenderingContext.TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
	WebGLRenderingContext.MAX_TEXTURE_IMAGE_UNITS = 0x8872;
	WebGLRenderingContext.TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
	WebGLRenderingContext.RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;
	WebGLRenderingContext.STENCIL_VALUE_MASK = 0x0B93;
	WebGLRenderingContext.ELEMENT_ARRAY_BUFFER_BINDING = 0x8895;
	WebGLRenderingContext.ARRAY_BUFFER = 0x8892;
	WebGLRenderingContext.DEPTH_RANGE = 0x0B70;
	WebGLRenderingContext.NICEST = 0x1102;
	WebGLRenderingContext.ACTIVE_ATTRIBUTES = 0x8B89;
	WebGLRenderingContext.NEVER = 0x0200;
	WebGLRenderingContext.FLOAT_VEC4 = 0x8B52;
	WebGLRenderingContext.CURRENT_VERTEX_ATTRIB = 0x8626;
	WebGLRenderingContext.STENCIL_PASS_DEPTH_PASS = 0x0B96;
	WebGLRenderingContext.INVERT = 0x150A;
	WebGLRenderingContext.LINK_STATUS = 0x8B82;
	WebGLRenderingContext.RGB = 0x1907;
	WebGLRenderingContext.INT_VEC4 = 0x8B55;
	WebGLRenderingContext.TEXTURE2 = 0x84C2;
	WebGLRenderingContext.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
	WebGLRenderingContext.MEDIUM_FLOAT = 0x8DF1;
	WebGLRenderingContext.SRC_ALPHA_SATURATE = 0x0308;
	WebGLRenderingContext.BUFFER_USAGE = 0x8765;
	WebGLRenderingContext.SHORT = 0x1402;
	WebGLRenderingContext.NONE = 0;
	WebGLRenderingContext.UNSIGNED_BYTE = 0x1401;
	WebGLRenderingContext.INT = 0x1404;
	WebGLRenderingContext.SUBPIXEL_BITS = 0x0D50;
	WebGLRenderingContext.KEEP = 0x1E00;
	WebGLRenderingContext.SAMPLES = 0x80A9;
	WebGLRenderingContext.FRAGMENT_SHADER = 0x8B30;
	WebGLRenderingContext.LINE_WIDTH = 0x0B21;
	WebGLRenderingContext.BLEND_SRC_RGB = 0x80C9;
	WebGLRenderingContext.LOW_FLOAT = 0x8DF0;
	WebGLRenderingContext.VERSION = 0x1F02;
	WebGLRenderingContext.getUniformLocation = function(program, name) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='name' type='String' />
		/// <returns type='WebGLUniformLocation'/>
		/// </signature>
		return WebGLUniformLocation; 
	};
	WebGLRenderingContext.bindTexture = function(target, texture) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='texture' type='WebGLTexture' />
		/// </signature>
	};
	WebGLRenderingContext.bufferData = function(target, size, usage) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='size' type='Number' />
		/// <param name='usage' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.depthMask = function(flag) { 
		/// <signature>
		/// <param name='flag' type='Boolean' />
		/// </signature>
	};
	WebGLRenderingContext.getUniform = function(program, location) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='location' type='WebGLUniformLocation' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.vertexAttrib3fv = function(indx, values) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='values' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.linkProgram = function(program) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// </signature>
	};
	WebGLRenderingContext.getSupportedExtensions = function() { 
		/// <signature>
		/// <returns type='Array' elementType='String'/>
		/// </signature>
		return new Array(); 
	};
	WebGLRenderingContext.bufferSubData = function(target, offset, data) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='offset' type='Number' />
		/// <param name='data' type='Uint8Array' />
		/// </signature>
	};
	WebGLRenderingContext.vertexAttribPointer = function(indx, size, type, normalized, stride, offset) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='size' type='Number' />
		/// <param name='type' type='Number' />
		/// <param name='normalized' type='Boolean' />
		/// <param name='stride' type='Number' />
		/// <param name='offset' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.polygonOffset = function(factor, units) { 
		/// <signature>
		/// <param name='factor' type='Number' />
		/// <param name='units' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.blendColor = function(red, green, blue, alpha) { 
		/// <signature>
		/// <param name='red' type='Number' />
		/// <param name='green' type='Number' />
		/// <param name='blue' type='Number' />
		/// <param name='alpha' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.createTexture = function() { 
		/// <signature>
		/// <returns type='WebGLTexture'/>
		/// </signature>
		return WebGLTexture; 
	};
	WebGLRenderingContext.hint = function(target, mode) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='mode' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getVertexAttrib = function(index, pname) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.enableVertexAttribArray = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.depthRange = function(zNear, zFar) { 
		/// <signature>
		/// <param name='zNear' type='Number' />
		/// <param name='zFar' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.cullFace = function(mode) { 
		/// <signature>
		/// <param name='mode' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.createFramebuffer = function() { 
		/// <signature>
		/// <returns type='WebGLFramebuffer'/>
		/// </signature>
		return WebGLFramebuffer; 
	};
	WebGLRenderingContext.uniformMatrix4fv = function(location, transpose, value) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='transpose' type='Boolean' />
		/// <param name='value' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.framebufferTexture2D = function(target, attachment, textarget, texture, level) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='attachment' type='Number' />
		/// <param name='textarget' type='Number' />
		/// <param name='texture' type='WebGLTexture' />
		/// <param name='level' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.deleteFramebuffer = function(framebuffer) { 
		/// <signature>
		/// <param name='framebuffer' type='WebGLFramebuffer' />
		/// </signature>
	};
	WebGLRenderingContext.colorMask = function(red, green, blue, alpha) { 
		/// <signature>
		/// <param name='red' type='Boolean' />
		/// <param name='green' type='Boolean' />
		/// <param name='blue' type='Boolean' />
		/// <param name='alpha' type='Boolean' />
		/// </signature>
	};
	WebGLRenderingContext.compressedTexImage2D = function(target, level, internalformat, width, height, border, data) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='level' type='Number' />
		/// <param name='internalformat' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <param name='border' type='Number' />
		/// <param name='data' type='Uint8Array' />
		/// </signature>
	};
	WebGLRenderingContext.uniformMatrix2fv = function(location, transpose, value) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='transpose' type='Boolean' />
		/// <param name='value' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.getExtension = function(name) { 
		/// <signature>
		/// <param name='name' type='String' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.createProgram = function() { 
		/// <signature>
		/// <returns type='WebGLProgram'/>
		/// </signature>
		return WebGLProgram; 
	};
	WebGLRenderingContext.deleteShader = function(shader) { 
		/// <signature>
		/// <param name='shader' type='WebGLShader' />
		/// </signature>
	};
	WebGLRenderingContext.getAttachedShaders = function(program) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <returns type='Array' elementType='WebGLShader'/>
		/// </signature>
		return new Array(); 
	};
	WebGLRenderingContext.enable = function(cap) { 
		/// <signature>
		/// <param name='cap' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.blendEquation = function(mode) { 
		/// <signature>
		/// <param name='mode' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.texImage2D = function(target, level, internalformat, format, type, pixels) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='level' type='Number' />
		/// <param name='internalformat' type='Number' />
		/// <param name='format' type='Number' />
		/// <param name='type' type='Number' />
		/// <param name='pixels' type='ImageData' />
		/// </signature>
	};
	WebGLRenderingContext.createBuffer = function() { 
		/// <signature>
		/// <returns type='WebGLBuffer'/>
		/// </signature>
		return WebGLBuffer; 
	};
	WebGLRenderingContext.deleteTexture = function(texture) { 
		/// <signature>
		/// <param name='texture' type='WebGLTexture' />
		/// </signature>
	};
	WebGLRenderingContext.useProgram = function(program) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// </signature>
	};
	WebGLRenderingContext.vertexAttrib2fv = function(indx, values) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='values' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.checkFramebufferStatus = function(target) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	WebGLRenderingContext.frontFace = function(mode) { 
		/// <signature>
		/// <param name='mode' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getBufferParameter = function(target, pname) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.texSubImage2D = function(target, level, xoffset, yoffset, format, type, pixels) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='level' type='Number' />
		/// <param name='xoffset' type='Number' />
		/// <param name='yoffset' type='Number' />
		/// <param name='format' type='Number' />
		/// <param name='type' type='Number' />
		/// <param name='pixels' type='ImageData' />
		/// </signature>
	};
	WebGLRenderingContext.copyTexImage2D = function(target, level, internalformat, x, y, width, height, border) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='level' type='Number' />
		/// <param name='internalformat' type='Number' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <param name='border' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getVertexAttribOffset = function(index, pname) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// <param name='pname' type='Number' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	WebGLRenderingContext.disableVertexAttribArray = function(index) { 
		/// <signature>
		/// <param name='index' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.blendFunc = function(sfactor, dfactor) { 
		/// <signature>
		/// <param name='sfactor' type='Number' />
		/// <param name='dfactor' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.drawElements = function(mode, count, type, offset) { 
		/// <signature>
		/// <param name='mode' type='Number' />
		/// <param name='count' type='Number' />
		/// <param name='type' type='Number' />
		/// <param name='offset' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.isFramebuffer = function(framebuffer) { 
		/// <signature>
		/// <param name='framebuffer' type='WebGLFramebuffer' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.uniform3iv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Int32Array' />
		/// </signature>
	};
	WebGLRenderingContext.lineWidth = function(width) { 
		/// <signature>
		/// <param name='width' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getShaderInfoLog = function(shader) { 
		/// <signature>
		/// <param name='shader' type='WebGLShader' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	WebGLRenderingContext.getTexParameter = function(target, pname) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.getParameter = function(pname) { 
		/// <signature>
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.getShaderPrecisionFormat = function(shadertype, precisiontype) { 
		/// <signature>
		/// <param name='shadertype' type='Number' />
		/// <param name='precisiontype' type='Number' />
		/// <returns type='WebGLShaderPrecisionFormat'/>
		/// </signature>
		return WebGLShaderPrecisionFormat; 
	};
	WebGLRenderingContext.getContextAttributes = function() { 
		/// <signature>
		/// <returns type='WebGLContextAttributes'/>
		/// </signature>
		return WebGLContextAttributes; 
	};
	WebGLRenderingContext.vertexAttrib1f = function(indx, x) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='x' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.bindFramebuffer = function(target, framebuffer) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='framebuffer' type='WebGLFramebuffer' />
		/// </signature>
	};
	WebGLRenderingContext.compressedTexSubImage2D = function(target, level, xoffset, yoffset, width, height, format, data) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='level' type='Number' />
		/// <param name='xoffset' type='Number' />
		/// <param name='yoffset' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <param name='format' type='Number' />
		/// <param name='data' type='Uint8Array' />
		/// </signature>
	};
	WebGLRenderingContext.isContextLost = function() { 
		/// <signature>
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.uniform1iv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Int32Array' />
		/// </signature>
	};
	WebGLRenderingContext.getRenderbufferParameter = function(target, pname) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.uniform2fv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.isTexture = function(texture) { 
		/// <signature>
		/// <param name='texture' type='WebGLTexture' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.getError = function() { 
		/// <signature>
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	WebGLRenderingContext.shaderSource = function(shader, source) { 
		/// <signature>
		/// <param name='shader' type='WebGLShader' />
		/// <param name='source' type='String' />
		/// </signature>
	};
	WebGLRenderingContext.deleteRenderbuffer = function(renderbuffer) { 
		/// <signature>
		/// <param name='renderbuffer' type='WebGLRenderbuffer' />
		/// </signature>
	};
	WebGLRenderingContext.stencilMask = function(mask) { 
		/// <signature>
		/// <param name='mask' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.bindBuffer = function(target, buffer) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='buffer' type='WebGLBuffer' />
		/// </signature>
	};
	WebGLRenderingContext.getAttribLocation = function(program, name) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='name' type='String' />
		/// <returns type='Number'/>
		/// </signature>
		return 0; 
	};
	WebGLRenderingContext.uniform3i = function(location, x, y, z) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.blendEquationSeparate = function(modeRGB, modeAlpha) { 
		/// <signature>
		/// <param name='modeRGB' type='Number' />
		/// <param name='modeAlpha' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.clear = function(mask) { 
		/// <signature>
		/// <param name='mask' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.blendFuncSeparate = function(srcRGB, dstRGB, srcAlpha, dstAlpha) { 
		/// <signature>
		/// <param name='srcRGB' type='Number' />
		/// <param name='dstRGB' type='Number' />
		/// <param name='srcAlpha' type='Number' />
		/// <param name='dstAlpha' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.stencilFuncSeparate = function(face, func, ref, mask) { 
		/// <signature>
		/// <param name='face' type='Number' />
		/// <param name='func' type='Number' />
		/// <param name='ref' type='Number' />
		/// <param name='mask' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.readPixels = function(x, y, width, height, format, type, pixels) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// <param name='format' type='Number' />
		/// <param name='type' type='Number' />
		/// <param name='pixels' type='Uint8Array' />
		/// </signature>
	};
	WebGLRenderingContext.scissor = function(x, y, width, height) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.uniform2i = function(location, x, y) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getActiveAttrib = function(program, index) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='index' type='Number' />
		/// <returns type='WebGLActiveInfo'/>
		/// </signature>
		return WebGLActiveInfo; 
	};
	WebGLRenderingContext.getShaderSource = function(shader) { 
		/// <signature>
		/// <param name='shader' type='WebGLShader' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	WebGLRenderingContext.generateMipmap = function(target) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.bindAttribLocation = function(program, index, name) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='index' type='Number' />
		/// <param name='name' type='String' />
		/// </signature>
	};
	WebGLRenderingContext.uniform1fv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.uniform2iv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Int32Array' />
		/// </signature>
	};
	WebGLRenderingContext.stencilOp = function(fail, zfail, zpass) { 
		/// <signature>
		/// <param name='fail' type='Number' />
		/// <param name='zfail' type='Number' />
		/// <param name='zpass' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.uniform4fv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.vertexAttrib1fv = function(indx, values) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='values' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.flush = function() { };
	WebGLRenderingContext.uniform4f = function(location, x, y, z, w) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' />
		/// <param name='w' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.deleteProgram = function(program) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// </signature>
	};
	WebGLRenderingContext.isRenderbuffer = function(renderbuffer) { 
		/// <signature>
		/// <param name='renderbuffer' type='WebGLRenderbuffer' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.uniform1i = function(location, x) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getProgramParameter = function(program, pname) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.getActiveUniform = function(program, index) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='index' type='Number' />
		/// <returns type='WebGLActiveInfo'/>
		/// </signature>
		return WebGLActiveInfo; 
	};
	WebGLRenderingContext.stencilFunc = function(func, ref, mask) { 
		/// <signature>
		/// <param name='func' type='Number' />
		/// <param name='ref' type='Number' />
		/// <param name='mask' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.pixelStorei = function(pname, param) { 
		/// <signature>
		/// <param name='pname' type='Number' />
		/// <param name='param' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.disable = function(cap) { 
		/// <signature>
		/// <param name='cap' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.vertexAttrib4fv = function(indx, values) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='values' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.createRenderbuffer = function() { 
		/// <signature>
		/// <returns type='WebGLRenderbuffer'/>
		/// </signature>
		return WebGLRenderbuffer; 
	};
	WebGLRenderingContext.isBuffer = function(buffer) { 
		/// <signature>
		/// <param name='buffer' type='WebGLBuffer' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.stencilOpSeparate = function(face, fail, zfail, zpass) { 
		/// <signature>
		/// <param name='face' type='Number' />
		/// <param name='fail' type='Number' />
		/// <param name='zfail' type='Number' />
		/// <param name='zpass' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getFramebufferAttachmentParameter = function(target, attachment, pname) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='attachment' type='Number' />
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.uniform4i = function(location, x, y, z, w) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' />
		/// <param name='w' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.sampleCoverage = function(value, invert) { 
		/// <signature>
		/// <param name='value' type='Number' />
		/// <param name='invert' type='Boolean' />
		/// </signature>
	};
	WebGLRenderingContext.depthFunc = function(func) { 
		/// <signature>
		/// <param name='func' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.texParameterf = function(target, pname, param) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='pname' type='Number' />
		/// <param name='param' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.vertexAttrib3f = function(indx, x, y, z) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.drawArrays = function(mode, first, count) { 
		/// <signature>
		/// <param name='mode' type='Number' />
		/// <param name='first' type='Number' />
		/// <param name='count' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.texParameteri = function(target, pname, param) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='pname' type='Number' />
		/// <param name='param' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.vertexAttrib4f = function(indx, x, y, z, w) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' />
		/// <param name='w' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getShaderParameter = function(shader, pname) { 
		/// <signature>
		/// <param name='shader' type='WebGLShader' />
		/// <param name='pname' type='Number' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
	WebGLRenderingContext.clearDepth = function(depth) { 
		/// <signature>
		/// <param name='depth' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.activeTexture = function(texture) { 
		/// <signature>
		/// <param name='texture' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.viewport = function(x, y, width, height) { 
		/// <signature>
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.detachShader = function(program, shader) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='shader' type='WebGLShader' />
		/// </signature>
	};
	WebGLRenderingContext.uniform1f = function(location, x) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.uniformMatrix3fv = function(location, transpose, value) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='transpose' type='Boolean' />
		/// <param name='value' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.deleteBuffer = function(buffer) { 
		/// <signature>
		/// <param name='buffer' type='WebGLBuffer' />
		/// </signature>
	};
	WebGLRenderingContext.copyTexSubImage2D = function(target, level, xoffset, yoffset, x, y, width, height) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='level' type='Number' />
		/// <param name='xoffset' type='Number' />
		/// <param name='yoffset' type='Number' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.uniform3fv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Float32Array' />
		/// </signature>
	};
	WebGLRenderingContext.stencilMaskSeparate = function(face, mask) { 
		/// <signature>
		/// <param name='face' type='Number' />
		/// <param name='mask' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.attachShader = function(program, shader) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <param name='shader' type='WebGLShader' />
		/// </signature>
	};
	WebGLRenderingContext.compileShader = function(shader) { 
		/// <signature>
		/// <param name='shader' type='WebGLShader' />
		/// </signature>
	};
	WebGLRenderingContext.clearColor = function(red, green, blue, alpha) { 
		/// <signature>
		/// <param name='red' type='Number' />
		/// <param name='green' type='Number' />
		/// <param name='blue' type='Number' />
		/// <param name='alpha' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.isShader = function(shader) { 
		/// <signature>
		/// <param name='shader' type='WebGLShader' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.clearStencil = function(s) { 
		/// <signature>
		/// <param name='s' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.framebufferRenderbuffer = function(target, attachment, renderbuffertarget, renderbuffer) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='attachment' type='Number' />
		/// <param name='renderbuffertarget' type='Number' />
		/// <param name='renderbuffer' type='WebGLRenderbuffer' />
		/// </signature>
	};
	WebGLRenderingContext.finish = function() { };
	WebGLRenderingContext.uniform2f = function(location, x, y) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.renderbufferStorage = function(target, internalformat, width, height) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='internalformat' type='Number' />
		/// <param name='width' type='Number' />
		/// <param name='height' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.uniform3f = function(location, x, y, z) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// <param name='z' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.getProgramInfoLog = function(program) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <returns type='String'/>
		/// </signature>
		return ''; 
	};
	WebGLRenderingContext.validateProgram = function(program) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// </signature>
	};
	WebGLRenderingContext.isEnabled = function(cap) { 
		/// <signature>
		/// <param name='cap' type='Number' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.vertexAttrib2f = function(indx, x, y) { 
		/// <signature>
		/// <param name='indx' type='Number' />
		/// <param name='x' type='Number' />
		/// <param name='y' type='Number' />
		/// </signature>
	};
	WebGLRenderingContext.isProgram = function(program) { 
		/// <signature>
		/// <param name='program' type='WebGLProgram' />
		/// <returns type='Boolean'/>
		/// </signature>
		return false; 
	};
	WebGLRenderingContext.createShader = function(type) { 
		/// <signature>
		/// <param name='type' type='Number' />
		/// <returns type='WebGLShader'/>
		/// </signature>
		return WebGLShader; 
	};
	WebGLRenderingContext.bindRenderbuffer = function(target, renderbuffer) { 
		/// <signature>
		/// <param name='target' type='Number' />
		/// <param name='renderbuffer' type='WebGLRenderbuffer' />
		/// </signature>
	};
	WebGLRenderingContext.uniform4iv = function(location, v) { 
		/// <signature>
		/// <param name='location' type='WebGLUniformLocation' />
		/// <param name='v' type='Int32Array' />
		/// </signature>
	};


	/* -- type: AlgorithmParameters -- */



	/* -- type: SVGPathSegCurvetoQuadraticRel -- */

	SVGPathSegCurvetoQuadraticRel.y1 = 0;
	SVGPathSegCurvetoQuadraticRel.y = 0;
	SVGPathSegCurvetoQuadraticRel.x = 0;
	SVGPathSegCurvetoQuadraticRel.x1 = 0;


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

	TrackEvent.track = {};


	/* -- type: TreeWalker -- */

	TreeWalker.whatToShow = 0;
	TreeWalker.filter = NodeFilter;
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
	_$implement(HTMLTableElement, MSDataBindingTableExtensions);
	_$implement(HTMLTableElement, MSDataBindingExtensions);
	_$implement(HTMLTableElement, DOML2DeprecatedBackgroundColorStyle);
	_$implement(HTMLTableElement, DOML2DeprecatedBackgroundStyle);

	HTMLTableElement.width = '';
	HTMLTableElement.borderColorLight = {};
	HTMLTableElement.cellSpacing = '';
	HTMLTableElement.borderColor = {};
	HTMLTableElement.frame = '';
	HTMLTableElement.tFoot = HTMLTableSectionElement;
	HTMLTableElement.rules = '';
	HTMLTableElement.rows = _createHTMLCollection('tr');
	HTMLTableElement.cols = 0;
	HTMLTableElement.caption = HTMLTableCaptionElement;
	HTMLTableElement.summary = '';
	HTMLTableElement.tBodies = HTMLCollection;
	HTMLTableElement.tHead = HTMLTableSectionElement;
	HTMLTableElement.align = '';
	HTMLTableElement.cells = HTMLCollection;
	HTMLTableElement.height = {};
	HTMLTableElement.border = '';
	HTMLTableElement.cellPadding = '';
	HTMLTableElement.borderColorDark = {};
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
	HTMLTableElement.moveRow = function(indexFrom, indexTo) { 
		/// <signature>
		/// <param name='indexFrom' type='Number' optional='true' />
		/// <param name='indexTo' type='Number' optional='true' />
		/// <returns type='Object'/>
		/// </signature>
		return {}; 
	};
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
	_publicInterface('TrackEvent', {}, TrackEvent);
	_publicInterface('SVGFEMergeNodeElement', {}, SVGFEMergeNodeElement);
	_publicInterface('SVGFEFloodElement', {}, SVGFEFloodElement);
	_publicInterface('SVGPathSegCurvetoQuadraticRel', {}, SVGPathSegCurvetoQuadraticRel);
	_publicInterface('AlgorithmParameters', {}, AlgorithmParameters);
	_publicInterface('WebGLRenderingContext', {
		'DEPTH_FUNC' : 0x0B74,
		'DEPTH_COMPONENT16' : 0x81A5,
		'REPLACE' : 0x1E01,
		'REPEAT' : 0x2901,
		'VERTEX_ATTRIB_ARRAY_ENABLED' : 0x8622,
		'FRAMEBUFFER_INCOMPLETE_DIMENSIONS' : 0x8CD9,
		'RENDERER' : 0x1F01,
		'STENCIL_BACK_REF' : 0x8CA3,
		'STENCIL_BUFFER_BIT' : 0x00000400,
		'TEXTURE26' : 0x84DA,
		'RGB565' : 0x8D62,
		'DITHER' : 0x0BD0,
		'CONSTANT_COLOR' : 0x8001,
		'GENERATE_MIPMAP_HINT' : 0x8192,
		'POINTS' : 0x0000,
		'INT_VEC3' : 0x8B54,
		'TEXTURE28' : 0x84DC,
		'DECR' : 0x1E03,
		'ONE_MINUS_CONSTANT_ALPHA' : 0x8004,
		'BACK' : 0x0405,
		'RENDERBUFFER_STENCIL_SIZE' : 0x8D55,
		'UNPACK_FLIP_Y_WEBGL' : 0x9240,
		'BLEND' : 0x0BE2,
		'TEXTURE9' : 0x84C9,
		'ARRAY_BUFFER_BINDING' : 0x8894,
		'MAX_VIEWPORT_DIMS' : 0x0D3A,
		'INVALID_FRAMEBUFFER_OPERATION' : 0x0506,
		'TEXTURE' : 0x1702,
		'TEXTURE0' : 0x84C0,
		'TEXTURE31' : 0x84DF,
		'TEXTURE24' : 0x84D8,
		'HIGH_INT' : 0x8DF5,
		'RENDERBUFFER_BINDING' : 0x8CA7,
		'BLEND_COLOR' : 0x8005,
		'FASTEST' : 0x1101,
		'STENCIL_WRITEMASK' : 0x0B98,
		'ALIASED_POINT_SIZE_RANGE' : 0x846D,
		'TEXTURE12' : 0x84CC,
		'DST_ALPHA' : 0x0304,
		'BLEND_EQUATION_RGB' : 0x8009,
		'FRAMEBUFFER_COMPLETE' : 0x8CD5,
		'NEAREST_MIPMAP_NEAREST' : 0x2700,
		'VERTEX_ATTRIB_ARRAY_SIZE' : 0x8623,
		'TEXTURE3' : 0x84C3,
		'DEPTH_WRITEMASK' : 0x0B72,
		'CONTEXT_LOST_WEBGL' : 0x9242,
		'INVALID_VALUE' : 0x0501,
		'TEXTURE_MAG_FILTER' : 0x2800,
		'ONE_MINUS_CONSTANT_COLOR' : 0x8002,
		'ONE_MINUS_SRC_ALPHA' : 0x0303,
		'TEXTURE_CUBE_MAP_POSITIVE_Z' : 0x8519,
		'NOTEQUAL' : 0x0205,
		'ALPHA' : 0x1906,
		'DEPTH_STENCIL' : 0x84F9,
		'MAX_VERTEX_UNIFORM_VECTORS' : 0x8DFB,
		'DEPTH_COMPONENT' : 0x1902,
		'RENDERBUFFER_RED_SIZE' : 0x8D50,
		'TEXTURE20' : 0x84D4,
		'RED_BITS' : 0x0D52,
		'RENDERBUFFER_BLUE_SIZE' : 0x8D52,
		'SCISSOR_BOX' : 0x0C10,
		'VENDOR' : 0x1F00,
		'FRONT_AND_BACK' : 0x0408,
		'CONSTANT_ALPHA' : 0x8003,
		'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING' : 0x889F,
		'NEAREST' : 0x2600,
		'CULL_FACE' : 0x0B44,
		'ALIASED_LINE_WIDTH_RANGE' : 0x846E,
		'TEXTURE19' : 0x84D3,
		'FRONT' : 0x0404,
		'DEPTH_CLEAR_VALUE' : 0x0B73,
		'GREEN_BITS' : 0x0D53,
		'TEXTURE29' : 0x84DD,
		'TEXTURE23' : 0x84D7,
		'MAX_RENDERBUFFER_SIZE' : 0x84E8,
		'STENCIL_ATTACHMENT' : 0x8D20,
		'TEXTURE27' : 0x84DB,
		'BOOL_VEC2' : 0x8B57,
		'OUT_OF_MEMORY' : 0x0505,
		'MIRRORED_REPEAT' : 0x8370,
		'POLYGON_OFFSET_UNITS' : 0x2A00,
		'TEXTURE_MIN_FILTER' : 0x2801,
		'STENCIL_BACK_PASS_DEPTH_PASS' : 0x8803,
		'LINE_LOOP' : 0x0002,
		'FLOAT_MAT3' : 0x8B5B,
		'TEXTURE14' : 0x84CE,
		'LINEAR' : 0x2601,
		'RGB5_A1' : 0x8057,
		'ONE_MINUS_SRC_COLOR' : 0x0301,
		'SAMPLE_COVERAGE_INVERT' : 0x80AB,
		'DONT_CARE' : 0x1100,
		'FRAMEBUFFER_BINDING' : 0x8CA6,
		'RENDERBUFFER_ALPHA_SIZE' : 0x8D53,
		'STENCIL_REF' : 0x0B97,
		'ZERO' : 0,
		'DECR_WRAP' : 0x8508,
		'SAMPLE_COVERAGE' : 0x80A0,
		'STENCIL_BACK_FUNC' : 0x8800,
		'TEXTURE30' : 0x84DE,
		'VIEWPORT' : 0x0BA2,
		'STENCIL_BITS' : 0x0D57,
		'FLOAT' : 0x1406,
		'COLOR_WRITEMASK' : 0x0C23,
		'SAMPLE_COVERAGE_VALUE' : 0x80AA,
		'TEXTURE_CUBE_MAP_NEGATIVE_Y' : 0x8518,
		'STENCIL_BACK_FAIL' : 0x8801,
		'FLOAT_MAT4' : 0x8B5C,
		'UNSIGNED_SHORT_4_4_4_4' : 0x8033,
		'TEXTURE6' : 0x84C6,
		'RENDERBUFFER_WIDTH' : 0x8D42,
		'RGBA4' : 0x8056,
		'ALWAYS' : 0x0207,
		'BLEND_EQUATION_ALPHA' : 0x883D,
		'COLOR_BUFFER_BIT' : 0x00004000,
		'TEXTURE_CUBE_MAP' : 0x8513,
		'DEPTH_BUFFER_BIT' : 0x00000100,
		'STENCIL_CLEAR_VALUE' : 0x0B91,
		'BLEND_EQUATION' : 0x8009,
		'RENDERBUFFER_GREEN_SIZE' : 0x8D51,
		'NEAREST_MIPMAP_LINEAR' : 0x2702,
		'VERTEX_ATTRIB_ARRAY_TYPE' : 0x8625,
		'INCR_WRAP' : 0x8507,
		'ONE_MINUS_DST_COLOR' : 0x0307,
		'HIGH_FLOAT' : 0x8DF2,
		'BYTE' : 0x1400,
		'FRONT_FACE' : 0x0B46,
		'SAMPLE_ALPHA_TO_COVERAGE' : 0x809E,
		'TEXTURE13' : 0x84CD,
		'MAX_VERTEX_ATTRIBS' : 0x8869,
		'CCW' : 0x0901,
		'MAX_VERTEX_TEXTURE_IMAGE_UNITS' : 0x8B4C,
		'TEXTURE_WRAP_T' : 0x2803,
		'UNPACK_PREMULTIPLY_ALPHA_WEBGL' : 0x9241,
		'FLOAT_VEC2' : 0x8B50,
		'LUMINANCE' : 0x1909,
		'GREATER' : 0x0204,
		'INT_VEC2' : 0x8B53,
		'VALIDATE_STATUS' : 0x8B83,
		'FRAMEBUFFER' : 0x8D40,
		'FRAMEBUFFER_UNSUPPORTED' : 0x8CDD,
		'TEXTURE5' : 0x84C5,
		'FUNC_SUBTRACT' : 0x800A,
		'BLEND_DST_ALPHA' : 0x80CA,
		'SAMPLER_CUBE' : 0x8B60,
		'ONE_MINUS_DST_ALPHA' : 0x0305,
		'LESS' : 0x0201,
		'TEXTURE_CUBE_MAP_POSITIVE_X' : 0x8515,
		'BLUE_BITS' : 0x0D54,
		'DEPTH_TEST' : 0x0B71,
		'VERTEX_ATTRIB_ARRAY_STRIDE' : 0x8624,
		'DELETE_STATUS' : 0x8B80,
		'TEXTURE18' : 0x84D2,
		'POLYGON_OFFSET_FACTOR' : 0x8038,
		'UNSIGNED_INT' : 0x1405,
		'TEXTURE_2D' : 0x0DE1,
		'DST_COLOR' : 0x0306,
		'FLOAT_MAT2' : 0x8B5A,
		'COMPRESSED_TEXTURE_FORMATS' : 0x86A3,
		'MAX_FRAGMENT_UNIFORM_VECTORS' : 0x8DFD,
		'DEPTH_STENCIL_ATTACHMENT' : 0x821A,
		'LUMINANCE_ALPHA' : 0x190A,
		'CW' : 0x0900,
		'VERTEX_ATTRIB_ARRAY_NORMALIZED' : 0x886A,
		'TEXTURE_CUBE_MAP_NEGATIVE_Z' : 0x851A,
		'LINEAR_MIPMAP_LINEAR' : 0x2703,
		'BUFFER_SIZE' : 0x8764,
		'SAMPLE_BUFFERS' : 0x80A8,
		'TEXTURE15' : 0x84CF,
		'ACTIVE_TEXTURE' : 0x84E0,
		'VERTEX_SHADER' : 0x8B31,
		'TEXTURE22' : 0x84D6,
		'VERTEX_ATTRIB_ARRAY_POINTER' : 0x8645,
		'INCR' : 0x1E02,
		'COMPILE_STATUS' : 0x8B81,
		'MAX_COMBINED_TEXTURE_IMAGE_UNITS' : 0x8B4D,
		'TEXTURE7' : 0x84C7,
		'UNSIGNED_SHORT_5_5_5_1' : 0x8034,
		'DEPTH_BITS' : 0x0D56,
		'RGBA' : 0x1908,
		'TRIANGLE_STRIP' : 0x0005,
		'COLOR_CLEAR_VALUE' : 0x0C22,
		'BROWSER_DEFAULT_WEBGL' : 0x9244,
		'INVALID_ENUM' : 0x0500,
		'SCISSOR_TEST' : 0x0C11,
		'LINE_STRIP' : 0x0003,
		'FRAMEBUFFER_INCOMPLETE_ATTACHMENT' : 0x8CD6,
		'STENCIL_FUNC' : 0x0B92,
		'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME' : 0x8CD1,
		'RENDERBUFFER_HEIGHT' : 0x8D43,
		'TEXTURE8' : 0x84C8,
		'TRIANGLES' : 0x0004,
		'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE' : 0x8CD0,
		'STENCIL_BACK_VALUE_MASK' : 0x8CA4,
		'TEXTURE25' : 0x84D9,
		'RENDERBUFFER' : 0x8D41,
		'LEQUAL' : 0x0203,
		'TEXTURE1' : 0x84C1,
		'STENCIL_INDEX8' : 0x8D48,
		'FUNC_ADD' : 0x8006,
		'STENCIL_FAIL' : 0x0B94,
		'BLEND_SRC_ALPHA' : 0x80CB,
		'BOOL' : 0x8B56,
		'ALPHA_BITS' : 0x0D55,
		'LOW_INT' : 0x8DF3,
		'TEXTURE10' : 0x84CA,
		'SRC_COLOR' : 0x0300,
		'MAX_VARYING_VECTORS' : 0x8DFC,
		'BLEND_DST_RGB' : 0x80C8,
		'TEXTURE_BINDING_CUBE_MAP' : 0x8514,
		'STENCIL_INDEX' : 0x1901,
		'TEXTURE_BINDING_2D' : 0x8069,
		'MEDIUM_INT' : 0x8DF4,
		'SHADER_TYPE' : 0x8B4F,
		'POLYGON_OFFSET_FILL' : 0x8037,
		'DYNAMIC_DRAW' : 0x88E8,
		'TEXTURE4' : 0x84C4,
		'STENCIL_BACK_PASS_DEPTH_FAIL' : 0x8802,
		'STREAM_DRAW' : 0x88E0,
		'MAX_CUBE_MAP_TEXTURE_SIZE' : 0x851C,
		'TEXTURE17' : 0x84D1,
		'TRIANGLE_FAN' : 0x0006,
		'UNPACK_ALIGNMENT' : 0x0CF5,
		'CURRENT_PROGRAM' : 0x8B8D,
		'LINES' : 0x0001,
		'INVALID_OPERATION' : 0x0502,
		'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT' : 0x8CD7,
		'LINEAR_MIPMAP_NEAREST' : 0x2701,
		'CLAMP_TO_EDGE' : 0x812F,
		'RENDERBUFFER_DEPTH_SIZE' : 0x8D54,
		'TEXTURE_WRAP_S' : 0x2802,
		'ELEMENT_ARRAY_BUFFER' : 0x8893,
		'UNSIGNED_SHORT_5_6_5' : 0x8363,
		'ACTIVE_UNIFORMS' : 0x8B86,
		'FLOAT_VEC3' : 0x8B51,
		'NO_ERROR' : 0,
		'ATTACHED_SHADERS' : 0x8B85,
		'DEPTH_ATTACHMENT' : 0x8D00,
		'TEXTURE11' : 0x84CB,
		'STENCIL_TEST' : 0x0B90,
		'ONE' : 1,
		'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE' : 0x8CD3,
		'STATIC_DRAW' : 0x88E4,
		'GEQUAL' : 0x0206,
		'BOOL_VEC4' : 0x8B59,
		'COLOR_ATTACHMENT0' : 0x8CE0,
		'PACK_ALIGNMENT' : 0x0D05,
		'MAX_TEXTURE_SIZE' : 0x0D33,
		'STENCIL_PASS_DEPTH_FAIL' : 0x0B95,
		'CULL_FACE_MODE' : 0x0B45,
		'TEXTURE16' : 0x84D0,
		'STENCIL_BACK_WRITEMASK' : 0x8CA5,
		'SRC_ALPHA' : 0x0302,
		'UNSIGNED_SHORT' : 0x1403,
		'TEXTURE21' : 0x84D5,
		'FUNC_REVERSE_SUBTRACT' : 0x800B,
		'SHADING_LANGUAGE_VERSION' : 0x8B8C,
		'EQUAL' : 0x0202,
		'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL' : 0x8CD2,
		'BOOL_VEC3' : 0x8B58,
		'SAMPLER_2D' : 0x8B5E,
		'TEXTURE_CUBE_MAP_NEGATIVE_X' : 0x8516,
		'MAX_TEXTURE_IMAGE_UNITS' : 0x8872,
		'TEXTURE_CUBE_MAP_POSITIVE_Y' : 0x8517,
		'RENDERBUFFER_INTERNAL_FORMAT' : 0x8D44,
		'STENCIL_VALUE_MASK' : 0x0B93,
		'ELEMENT_ARRAY_BUFFER_BINDING' : 0x8895,
		'ARRAY_BUFFER' : 0x8892,
		'DEPTH_RANGE' : 0x0B70,
		'NICEST' : 0x1102,
		'ACTIVE_ATTRIBUTES' : 0x8B89,
		'NEVER' : 0x0200,
		'FLOAT_VEC4' : 0x8B52,
		'CURRENT_VERTEX_ATTRIB' : 0x8626,
		'STENCIL_PASS_DEPTH_PASS' : 0x0B96,
		'INVERT' : 0x150A,
		'LINK_STATUS' : 0x8B82,
		'RGB' : 0x1907,
		'INT_VEC4' : 0x8B55,
		'TEXTURE2' : 0x84C2,
		'UNPACK_COLORSPACE_CONVERSION_WEBGL' : 0x9243,
		'MEDIUM_FLOAT' : 0x8DF1,
		'SRC_ALPHA_SATURATE' : 0x0308,
		'BUFFER_USAGE' : 0x8765,
		'SHORT' : 0x1402,
		'NONE' : 0,
		'UNSIGNED_BYTE' : 0x1401,
		'INT' : 0x1404,
		'SUBPIXEL_BITS' : 0x0D50,
		'KEEP' : 0x1E00,
		'SAMPLES' : 0x80A9,
		'FRAGMENT_SHADER' : 0x8B30,
		'LINE_WIDTH' : 0x0B21,
		'BLEND_SRC_RGB' : 0x80C9,
		'LOW_FLOAT' : 0x8DF0,
		'VERSION' : 0x1F02
	}, WebGLRenderingContext);
	_publicInterface('CanvasPixelArray', {}, CanvasPixelArray);
	_publicInterface('SVGFEFuncAElement', {}, SVGFEFuncAElement);
	_publicInterface('Performance', {}, Performance);
	_publicInterface('HTMLAllCollection', {}, HTMLAllCollection);
	_publicInterface('SVGFETileElement', {}, SVGFETileElement);
	_publicInterface('SVGFEBlendElement', {
		'SVG_FEBLEND_MODE_DARKEN' : 4,
		'SVG_FEBLEND_MODE_UNKNOWN' : 0,
		'SVG_FEBLEND_MODE_MULTIPLY' : 2,
		'SVG_FEBLEND_MODE_NORMAL' : 1,
		'SVG_FEBLEND_MODE_SCREEN' : 3,
		'SVG_FEBLEND_MODE_LIGHTEN' : 5
	}, SVGFEBlendElement);
	_publicInterface('CompositionEvent', {}, CompositionEvent);
	_publicInterface('SVGMarkerElement', {
		'SVG_MARKER_ORIENT_ANGLE' : 2,
		'SVG_MARKER_ORIENT_UNKNOWN' : 0,
		'SVG_MARKERUNITS_STROKEWIDTH' : 2,
		'SVG_MARKERUNITS_UNKNOWN' : 0,
		'SVG_MARKER_ORIENT_AUTO' : 1,
		'SVG_MARKERUNITS_USERSPACEONUSE' : 1
	}, SVGMarkerElement);
	_publicInterface('CSSStyleDeclaration', {}, CSSStyleDeclaration);
	_publicInterface('SVGGElement', {}, SVGGElement);
	_publicInterface('MSStyleCSSProperties', {}, MSStyleCSSProperties);
	_publicInterface('SVGFEMergeElement', {}, SVGFEMergeElement);
	_publicInterface('Navigator', {}, Navigator);
	_publicInterface('SVGPathSegCurvetoCubicSmoothAbs', {}, SVGPathSegCurvetoCubicSmoothAbs);
	_publicInterface('TransitionEvent', {}, TransitionEvent);
	_publicInterface('MediaQueryList', {}, MediaQueryList);
	_publicInterface('SVGFEPointLightElement', {}, SVGFEPointLightElement);
	_publicInterface('CloseEvent', {}, CloseEvent);
	_publicInterface('ProgressEvent', {}, ProgressEvent);
	_publicInterface('SVGZoomEvent', {}, SVGZoomEvent);
	_publicInterface('HTMLTableDataCellElement', {}, HTMLTableDataCellElement);
	_publicInterface('HTMLBaseElement', {}, HTMLBaseElement);
	_publicInterface('ClientRect', {}, ClientRect);
	_publicInterface('IDBObjectStore', {}, IDBObjectStore);
	_publicInterface('KeyOperation', {}, KeyOperation);
	_publicInterface('DOMImplementation', {}, DOMImplementation);
	_publicInterface('ObjectURLOptions', {}, ObjectURLOptions);
	_publicInterface('DOMStringMap', {}, DOMStringMap);
	_publicObject('SVGUnitTypes', SVGUnitTypes);
	_publicInterface('IDBVersionChangeEvent', {}, IDBVersionChangeEvent);
	_publicInterface('Element', {}, Element);
	_publicInterface('MSInputMethodContext', {}, MSInputMethodContext);
	_publicInterface('HTMLNextIdElement', {}, HTMLNextIdElement);
	_publicInterface('SVGPathSegMovetoRel', {}, SVGPathSegMovetoRel);
	_publicInterface('PluginArray', {}, PluginArray);
	_publicInterface('FileList', {}, FileList);
	_publicInterface('SVGLineElement', {}, SVGLineElement);
	_publicInterface('HTMLParagraphElement', {}, HTMLParagraphElement);
	_publicInterface('Plugin', {}, Plugin);
	_publicInterface('SVGFESpecularLightingElement', {}, SVGFESpecularLightingElement);
	_publicInterface('HTMLAreasCollection', {}, HTMLAreasCollection);
	_publicInterface('File', {}, File);
	_publicInterface('SVGDescElement', {}, SVGDescElement);
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
	_publicInterface('SVGClipPathElement', {}, SVGClipPathElement);
	_publicInterface('MouseEvent', {}, MouseEvent);
	_publicInterface('RangeException', {
		'INVALID_NODE_TYPE_ERR' : 2,
		'BAD_BOUNDARYPOINTS_ERR' : 1
	}, RangeException);
	_publicInterface('IDBCursorWithValue', {}, IDBCursorWithValue);
	_publicInterface('SVGTextPositioningElement', {}, SVGTextPositioningElement);
	_publicInterface('HTMLAppletElement', {}, HTMLAppletElement);
	_publicInterface('XMLHttpRequestEventTarget', {}, XMLHttpRequestEventTarget);
	_publicInterface('AudioTrackList', {}, AudioTrackList);
	_publicInterface('TextMetrics', {}, TextMetrics);
	_publicInterface('HTMLOListElement', {}, HTMLOListElement);
	_publicInterface('SVGPathSegLinetoVerticalRel', {}, SVGPathSegLinetoVerticalRel);
	_publicInterface('SVGAnimatedString', {}, SVGAnimatedString);
	_publicInterface('CDATASection', {}, CDATASection);
	_publicInterface('StyleMedia', {}, StyleMedia);
	_publicInterface('StoreExceptionsInformation', {}, StoreExceptionsInformation);
	_publicInterface('PerformanceNavigationTiming', {}, PerformanceNavigationTiming);
	_publicInterface('SVGFEMorphologyElement', {
		'SVG_MORPHOLOGY_OPERATOR_UNKNOWN' : 0,
		'SVG_MORPHOLOGY_OPERATOR_ERODE' : 1,
		'SVG_MORPHOLOGY_OPERATOR_DILATE' : 2
	}, SVGFEMorphologyElement);
	_publicInterface('HTMLSelectElement', {}, HTMLSelectElement);
	_publicInterface('TextRange', {}, TextRange);
	_publicInterface('MSMediaKeyNeededEvent', {}, MSMediaKeyNeededEvent);
	_publicInterface('HTMLBlockElement', {}, HTMLBlockElement);
	_publicInterface('CSSStyleSheet', {}, CSSStyleSheet);
	_publicInterface('HTMLMetaElement', {}, HTMLMetaElement);
	_publicInterface('SVGPatternElement', {}, SVGPatternElement);
	_publicInterface('SVGAnimatedAngle', {}, SVGAnimatedAngle);
	_publicInterface('Selection', {}, Selection);
	_publicInterface('SVGScriptElement', {}, SVGScriptElement);
	_publicInterface('AnimationEvent', {}, AnimationEvent);
	_publicInterface('HTMLDDElement', {}, HTMLDDElement);
	_publicInterface('Algorithm', {}, Algorithm);
	_publicInterface('SVGComponentTransferFunctionElement', {
		'SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN' : 0,
		'SVG_FECOMPONENTTRANSFER_TYPE_TABLE' : 2,
		'SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY' : 1,
		'SVG_FECOMPONENTTRANSFER_TYPE_GAMMA' : 5,
		'SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE' : 3,
		'SVG_FECOMPONENTTRANSFER_TYPE_LINEAR' : 4
	}, SVGComponentTransferFunctionElement);
	_publicInterface('CSSStyleRule', {}, CSSStyleRule);
	_publicInterface('NodeIterator', {}, NodeIterator);
	_publicInterface('SVGViewElement', {}, SVGViewElement);
	_publicInterface('HTMLLinkElement', {}, HTMLLinkElement);
	_publicInterface('SVGFEDistantLightElement', {}, SVGFEDistantLightElement);
	_publicInterface('HTMLFontElement', {}, HTMLFontElement);
	_publicInterface('WebGLProgram', {}, WebGLProgram);
	_publicInterface('KeyPair', {}, KeyPair);
	_publicInterface('SVGTitleElement', {}, SVGTitleElement);
	_publicInterface('ControlRangeCollection', {}, ControlRangeCollection);
	_publicInterface('WebGLObject', {}, WebGLObject);
	_publicInterface('SVGAnimatedTransformList', {}, SVGAnimatedTransformList);
	_publicInterface('HTMLTableCaptionElement', {}, HTMLTableCaptionElement);
	_publicInterface('HTMLOptionElement', {
		'create' : HTMLOptionElement ['create']
	}, HTMLOptionElement);
	_publicInterface('HTMLMapElement', {}, HTMLMapElement);
	_publicInterface('HTMLMenuElement', {}, HTMLMenuElement);
	_publicInterface('IDBTransaction', {
		'READ_ONLY' : "readonly",
		'VERSION_CHANGE' : "versionchange",
		'READ_WRITE' : "readwrite"
	}, IDBTransaction);
	_publicInterface('MouseWheelEvent', {}, MouseWheelEvent);
	_publicInterface('SVGFEConvolveMatrixElement', {
		'SVG_EDGEMODE_WRAP' : 2,
		'SVG_EDGEMODE_DUPLICATE' : 1,
		'SVG_EDGEMODE_UNKNOWN' : 0,
		'SVG_EDGEMODE_NONE' : 3
	}, SVGFEConvolveMatrixElement);
	_publicInterface('AudioTrack', {}, AudioTrack);
	_publicInterface('SVGPointList', {}, SVGPointList);
	_publicInterface('VideoPlaybackQuality', {}, VideoPlaybackQuality);
	_publicInterface('TextTrackCueList', {}, TextTrackCueList);
	_publicInterface('CSSKeyframesRule', {}, CSSKeyframesRule);
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
	_publicInterface('TextTrackList', {}, TextTrackList);
	_publicInterface('SVGAnimatedPreserveAspectRatio', {}, SVGAnimatedPreserveAspectRatio);
	_publicInterface('SVGFEFuncGElement', {}, SVGFEFuncGElement);
	_publicInterface('MSSiteModeEvent', {}, MSSiteModeEvent);
	_publicInterface('Console', {}, Console);
	_publicInterface('StyleSheetPageList', {}, StyleSheetPageList);
	_publicInterface('SVGFESpotLightElement', {}, SVGFESpotLightElement);
	_publicInterface('MSCSSProperties', {}, MSCSSProperties);
	_publicInterface('HTMLCollection', {}, HTMLCollection);
	_publicInterface('HTMLImageElement', {
		'create' : HTMLImageElement ['create']
	}, HTMLImageElement);
	_publicInterface('HTMLAreaElement', {}, HTMLAreaElement);
	_publicInterface('IDBDatabase', {}, IDBDatabase);
	_publicInterface('DOMStringList', {}, DOMStringList);
	_publicInterface('SVGAngle', {
		'SVG_ANGLETYPE_RAD' : 3,
		'SVG_ANGLETYPE_UNSPECIFIED' : 1,
		'SVG_ANGLETYPE_UNKNOWN' : 0,
		'SVG_ANGLETYPE_GRAD' : 4,
		'SVG_ANGLETYPE_DEG' : 2
	}, SVGAngle);
	_publicInterface('IDBOpenDBRequest', {}, IDBOpenDBRequest);
	_publicInterface('HTMLButtonElement', {}, HTMLButtonElement);
	_publicInterface('AesGcmEncryptResult', {}, AesGcmEncryptResult);
	_publicInterface('HTMLSourceElement', {}, HTMLSourceElement);
	_publicInterface('CanvasGradient', {}, CanvasGradient);
	_publicInterface('WebGLTexture', {}, WebGLTexture);
	_publicInterface('KeyboardEvent', {
		'DOM_KEY_LOCATION_RIGHT' : 0x02,
		'DOM_KEY_LOCATION_LEFT' : 0x01,
		'DOM_KEY_LOCATION_STANDARD' : 0x00,
		'DOM_KEY_LOCATION_NUMPAD' : 0x03,
		'DOM_KEY_LOCATION_JOYSTICK' : 0x05,
		'DOM_KEY_LOCATION_MOBILE' : 0x04
	}, KeyboardEvent);
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
	_publicInterface('CanvasRenderingContext2D', {}, CanvasRenderingContext2D);
	_publicInterface('MSCSSRuleList', {}, MSCSSRuleList);
	_publicInterface('SVGPathSegLinetoHorizontalAbs', {}, SVGPathSegLinetoHorizontalAbs);
	_publicInterface('IDBRequest', {}, IDBRequest);
	_publicInterface('SVGPathSegArcAbs', {}, SVGPathSegArcAbs);
	_publicInterface('SVGTransformList', {}, SVGTransformList);
	_publicInterface('HTMLHtmlElement', {}, HTMLHtmlElement);
	_publicInterface('SVGPathSegClosePath', {}, SVGPathSegClosePath);
	_publicInterface('OES_standard_derivatives', {
		'FRAGMENT_SHADER_DERIVATIVE_HINT_OES' : 0x8B8B
	}, OES_standard_derivatives);
	_publicInterface('MSMediaKeyMessageEvent', {}, MSMediaKeyMessageEvent);
	_publicInterface('HTMLFrameElement', {}, HTMLFrameElement);
	_publicInterface('SVGAnimatedLength', {}, SVGAnimatedLength);
	_publicInterface('ApplicationCache', {
		'CHECKING' : 2,
		'UNCACHED' : 0,
		'UPDATEREADY' : 4,
		'DOWNLOADING' : 3,
		'IDLE' : 1,
		'OBSOLETE' : 5
	}, ApplicationCache);
	_publicInterface('SVGDefsElement', {}, SVGDefsElement);
	_publicInterface('HTMLQuoteElement', {}, HTMLQuoteElement);
	_publicInterface('CSSMediaRule', {}, CSSMediaRule);
	_publicInterface('SourceBuffer', {}, SourceBuffer);
	_publicInterface('HTMLTableHeaderCellElement', {}, HTMLTableHeaderCellElement);
	_publicInterface('DeviceRotationRate', {}, DeviceRotationRate);
	_publicInterface('HTMLDListElement', {}, HTMLDListElement);
	_publicInterface('SVGPathSegLinetoHorizontalRel', {}, SVGPathSegLinetoHorizontalRel);
	_publicInterface('SVGEllipseElement', {}, SVGEllipseElement);
	_publicInterface('SVGAElement', {}, SVGAElement);
	_publicInterface('MSMediaKeyError', {
		'MS_MEDIA_KEYERR_SERVICE' : 3,
		'MS_MEDIA_KEYERR_HARDWARECHANGE' : 5,
		'MS_MEDIA_KEYERR_OUTPUT' : 4,
		'MS_MEDIA_KEYERR_DOMAIN' : 6,
		'MS_MEDIA_KEYERR_UNKNOWN' : 1,
		'MS_MEDIA_KEYERR_CLIENT' : 2
	}, MSMediaKeyError);
	_publicInterface('HTMLFrameSetElement', {}, HTMLFrameSetElement);
	_publicInterface('Screen', {}, Screen);
	_publicInterface('Coordinates', {}, Coordinates);
	_publicInterface('DataTransfer', {}, DataTransfer);
	_publicInterface('FocusEvent', {}, FocusEvent);
	_publicInterface('DOMSettableTokenList', {}, DOMSettableTokenList);
	_publicInterface('IDBFactory', {}, IDBFactory);
	_publicInterface('ExceptionInformation', {}, ExceptionInformation);
	_publicInterface('Range', {
		'END_TO_END' : 2,
		'END_TO_START' : 3,
		'START_TO_END' : 1,
		'START_TO_START' : 0
	}, Range);
	_publicInterface('SVGPoint', {}, SVGPoint);
	_publicInterface('WebGLShaderPrecisionFormat', {}, WebGLShaderPrecisionFormat);
	_publicInterface('MSPointerEvent', {}, MSPointerEvent);
	_publicInterface('SVGAnimatedNumberList', {}, SVGAnimatedNumberList);
	_publicInterface('MSPluginsCollection', {}, MSPluginsCollection);
	_publicInterface('SVGSVGElement', {}, SVGSVGElement);
	_publicInterface('HTMLLabelElement', {}, HTMLLabelElement);
	_publicInterface('HTMLDirectoryElement', {}, HTMLDirectoryElement);
	_publicInterface('HTMLLegendElement', {}, HTMLLegendElement);
	_publicInterface('WebGLRenderbuffer', {}, WebGLRenderbuffer);
	_publicInterface('SVGAnimatedInteger', {}, SVGAnimatedInteger);
	_publicInterface('SVGTextElement', {}, SVGTextElement);
	_publicInterface('SVGTSpanElement', {}, SVGTSpanElement);
	_publicInterface('SVGPathSegLinetoVerticalAbs', {}, SVGPathSegLinetoVerticalAbs);
	_publicInterface('HTMLLIElement', {}, HTMLLIElement);
	_publicInterface('PerfWidgetExternal', {}, PerfWidgetExternal);
	_publicInterface('SVGFEImageElement', {}, SVGFEImageElement);
	_publicInterface('SVGStyleElement', {}, SVGStyleElement);
	_publicInterface('MSCurrentStyleCSSProperties', {}, MSCurrentStyleCSSProperties);
	_publicInterface('ValidityState', {}, ValidityState);
	_publicInterface('CryptoOperation', {}, CryptoOperation);
	_publicInterface('Storage', {}, Storage);
	_publicInterface('HTMLIFrameElement', {}, HTMLIFrameElement);
	_publicInterface('TextRangeCollection', {}, TextRangeCollection);
	_publicInterface('HTMLBodyElement', {}, HTMLBodyElement);
	_publicInterface('DocumentType', {}, DocumentType);
	_publicInterface('SVGRadialGradientElement', {}, SVGRadialGradientElement);
	_publicInterface('MutationEvent', {
		'MODIFICATION' : 1,
		'REMOVAL' : 3,
		'ADDITION' : 2
	}, MutationEvent);
	_publicInterface('MSGestureEvent', {
		'MSGESTURE_FLAG_BEGIN' : 0x00000001,
		'MSGESTURE_FLAG_END' : 0x00000002,
		'MSGESTURE_FLAG_CANCEL' : 0x00000004,
		'MSGESTURE_FLAG_INERTIA' : 0x00000008,
		'MSGESTURE_FLAG_NONE' : 0x00000000
	}, MSGestureEvent);
	_publicInterface('DragEvent', {}, DragEvent);
	_publicInterface('SubtleCrypto', {}, SubtleCrypto);
	_publicInterface('Crypto', {}, Crypto);
	_publicInterface('HTMLTableSectionElement', {}, HTMLTableSectionElement);
	_publicInterface('HTMLInputElement', {}, HTMLInputElement);
	_publicInterface('HTMLAnchorElement', {}, HTMLAnchorElement);
	_publicInterface('ErrorEvent', {}, ErrorEvent);
	_publicInterface('SVGFilterElement', {}, SVGFilterElement);
	_publicInterface('HTMLParamElement', {}, HTMLParamElement);
	_publicInterface('SVGImageElement', {}, SVGImageElement);
	_publicInterface('Key', {}, Key);
	_publicInterface('SVGAnimatedNumber', {}, SVGAnimatedNumber);
	_publicInterface('PerformanceTiming', {}, PerformanceTiming);
	_publicInterface('HTMLPreElement', {}, HTMLPreElement);
	_publicInterface('WebGLContextAttributes', {}, WebGLContextAttributes);
	_publicInterface('DOMTokenList', {}, DOMTokenList);
	_publicInterface('EventException', {
		'DISPATCH_REQUEST_ERR' : 1,
		'UNSPECIFIED_EVENT_TYPE_ERR' : 0
	}, EventException);
	_publicInterface('WebGLFramebuffer', {}, WebGLFramebuffer);
	_publicInterface('SVGMetadataElement', {}, SVGMetadataElement);
	_publicInterface('SVGPathSegArcRel', {}, SVGPathSegArcRel);
	_publicInterface('SVGPathSegMovetoAbs', {}, SVGPathSegMovetoAbs);
	_publicInterface('SVGStringList', {}, SVGStringList);
	_publicInterface('MutationRecord', {}, MutationRecord);
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
	_publicInterface('SVGPolygonElement', {}, SVGPolygonElement);
	_publicInterface('DOMError', {}, DOMError);
	_publicInterface('HTMLPhraseElement', {}, HTMLPhraseElement);
	_publicInterface('SVGPathSegCurvetoCubicRel', {}, SVGPathSegCurvetoCubicRel);
	_publicInterface('MSEventObj', {}, MSEventObj);
	_publicInterface('SVGTextContentElement', {
		'LENGTHADJUST_SPACING' : 1,
		'LENGTHADJUST_SPACINGANDGLYPHS' : 2,
		'LENGTHADJUST_UNKNOWN' : 0
	}, SVGTextContentElement);
	_publicInterface('HTMLCanvasElement', {}, HTMLCanvasElement);
	_publicInterface('Location', {}, Location);
	_publicInterface('HTMLTitleElement', {}, HTMLTitleElement);
	_publicInterface('SVGFEGaussianBlurElement', {}, SVGFEGaussianBlurElement);
	_publicInterface('HTMLStyleElement', {}, HTMLStyleElement);
	_publicInterface('ConfirmSiteSpecificExceptionsInformation', {}, ConfirmSiteSpecificExceptionsInformation);
	_publicInterface('PerformanceEntry', {}, PerformanceEntry);
	_publicInterface('SVGTransform', {
		'SVG_TRANSFORM_SKEWX' : 5,
		'SVG_TRANSFORM_SCALE' : 3,
		'SVG_TRANSFORM_UNKNOWN' : 0,
		'SVG_TRANSFORM_TRANSLATE' : 2,
		'SVG_TRANSFORM_MATRIX' : 1,
		'SVG_TRANSFORM_ROTATE' : 4,
		'SVG_TRANSFORM_SKEWY' : 6
	}, SVGTransform);
	_publicInterface('WebGLShader', {}, WebGLShader);
	_publicInterface('UIEvent', {}, UIEvent);
	_publicInterface('WebGLBuffer', {}, WebGLBuffer);
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
	_publicInterface('WheelEvent', {
		'DOM_DELTA_PIXEL' : 0x00,
		'DOM_DELTA_LINE' : 0x01,
		'DOM_DELTA_PAGE' : 0x02
	}, WheelEvent);
	_publicInterface('SVGNumber', {}, SVGNumber);
	_publicInterface('SVGPathElement', {}, SVGPathElement);
	_publicInterface('MSCompatibleInfo', {}, MSCompatibleInfo);
	_publicInterface('Text', {}, Text);
	_publicInterface('SVGAnimatedRect', {}, SVGAnimatedRect);
	_publicInterface('CSSNamespaceRule', {}, CSSNamespaceRule);
	_publicInterface('IDBCursor', {
		'PREV' : "prev",
		'PREV_NO_DUPLICATE' : "prevunique",
		'NEXT' : "next",
		'NEXT_NO_DUPLICATE' : "nextunique"
	}, IDBCursor);
	_publicInterface('SVGPathSegList', {}, SVGPathSegList);
	_publicInterface('HTMLUnknownElement', {}, HTMLUnknownElement);
	_publicInterface('HTMLAudioElement', {}, HTMLAudioElement);
	_publicInterface('PositionError', {
		'POSITION_UNAVAILABLE' : 2,
		'TIMEOUT' : 3,
		'PERMISSION_DENIED' : 1
	}, PositionError);
	_publicInterface('DeviceRotationRateDict', {}, DeviceRotationRateDict);
	_publicInterface('HTMLTableCellElement', {}, HTMLTableCellElement);
	_publicInterface('PointerEvent', {}, PointerEvent);
	_publicInterface('MimeType', {}, MimeType);
	_publicInterface('SVGElementInstance', {}, SVGElementInstance);
	_publicInterface('SVGCircleElement', {}, SVGCircleElement);
	_publicInterface('StoreSiteSpecificExceptionsInformation', {}, StoreSiteSpecificExceptionsInformation);
	_publicInterface('StyleSheetList', {}, StyleSheetList);
	_publicInterface('CSSImportRule', {}, CSSImportRule);
	_publicInterface('CustomEvent', {}, CustomEvent);
	_publicInterface('HTMLBaseFontElement', {}, HTMLBaseFontElement);
	_publicInterface('HTMLTextAreaElement', {}, HTMLTextAreaElement);
	_publicInterface('Geolocation', {}, Geolocation);
	_publicInterface('HTMLMarqueeElement', {}, HTMLMarqueeElement);
	_publicInterface('SVGRect', {}, SVGRect);
	_publicInterface('EXT_texture_filter_anisotropic', {
		'TEXTURE_MAX_ANISOTROPY_EXT' : 0x84FE,
		'MAX_TEXTURE_MAX_ANISOTROPY_EXT' : 0x84FF
	}, EXT_texture_filter_anisotropic);
	_publicInterface('History', {}, History);
	_publicInterface('SVGPathSegCurvetoCubicAbs', {}, SVGPathSegCurvetoCubicAbs);
	_publicInterface('SVGPathSegCurvetoQuadraticAbs', {}, SVGPathSegCurvetoQuadraticAbs);
	_publicInterface('TimeRanges', {}, TimeRanges);
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
	_publicInterface('WebGLUniformLocation', {}, WebGLUniformLocation);
	_publicInterface('HTMLModElement', {}, HTMLModElement);
	_publicInterface('WEBGL_compressed_texture_s3tc', {
		'COMPRESSED_RGBA_S3TC_DXT1_EXT' : 0x83F1,
		'COMPRESSED_RGBA_S3TC_DXT5_EXT' : 0x83F3,
		'COMPRESSED_RGBA_S3TC_DXT3_EXT' : 0x83F2,
		'COMPRESSED_RGB_S3TC_DXT1_EXT' : 0x83F0
	}, WEBGL_compressed_texture_s3tc);
	_publicInterface('SVGMatrix', {}, SVGMatrix);
	_publicInterface('BeforeUnloadEvent', {}, BeforeUnloadEvent);
	_publicInterface('SVGUseElement', {}, SVGUseElement);
	_publicInterface('Event', {
		'AT_TARGET' : 2,
		'CAPTURING_PHASE' : 1,
		'BUBBLING_PHASE' : 3
	}, Event);
	_publicInterface('ImageData', {}, ImageData);
	_publicInterface('MSRangeCollection', {}, MSRangeCollection);
	_publicInterface('HTMLTableColElement', {}, HTMLTableColElement);
	_publicInterface('HTMLDocument', {}, HTMLDocument);
	_publicInterface('SVGException', {
		'SVG_MATRIX_NOT_INVERTABLE' : 2,
		'SVG_WRONG_TYPE_ERR' : 0,
		'SVG_INVALID_VALUE_ERR' : 1
	}, SVGException);
	_publicInterface('SVGLinearGradientElement', {}, SVGLinearGradientElement);
	_publicInterface('SVGAnimatedEnumeration', {}, SVGAnimatedEnumeration);
	_publicInterface('SVGFEFuncBElement', {}, SVGFEFuncBElement);
	_publicInterface('HTMLUListElement', {}, HTMLUListElement);
	_publicInterface('SVGRectElement', {}, SVGRectElement);
	_publicInterface('HTMLDivElement', {}, HTMLDivElement);
	_publicInterface('IDBKeyRange', {
		'bound' : IDBKeyRange ['bound'],
		'only' : IDBKeyRange ['only'],
		'lowerBound' : IDBKeyRange ['lowerBound'],
		'upperBound' : IDBKeyRange ['upperBound']
	}, IDBKeyRange);
	_publicInterface('NamedNodeMap', {}, NamedNodeMap);
	_publicInterface('MediaList', {}, MediaList);
	_publicInterface('SVGPathSegCurvetoQuadraticSmoothAbs', {}, SVGPathSegCurvetoQuadraticSmoothAbs);
	_publicInterface('SVGPathSegCurvetoCubicSmoothRel', {}, SVGPathSegCurvetoCubicSmoothRel);
	_publicInterface('SVGLengthList', {}, SVGLengthList);
	_publicInterface('ProcessingInstruction', {}, ProcessingInstruction);
	_publicInterface('MSGraphicsTrust', {}, MSGraphicsTrust);
	_publicInterface('MSBehaviorUrnsCollection', {}, MSBehaviorUrnsCollection);
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
	_publicInterface('DocumentFragment', {}, DocumentFragment);
	_publicInterface('SVGPolylineElement', {}, SVGPolylineElement);
	_publicInterface('Position', {}, Position);
	_publicInterface('DeviceAcceleration', {}, DeviceAcceleration);
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
	_publicInterface('HTMLSpanElement', {}, HTMLSpanElement);
	_publicInterface('MsZoomToOptions', {}, MsZoomToOptions);
	_publicInterface('HTMLHeadElement', {}, HTMLHeadElement);
	_publicInterface('SVGFEOffsetElement', {}, SVGFEOffsetElement);
	_publicInterface('HTMLHeadingElement', {}, HTMLHeadingElement);
	_publicObject('SVGZoomAndPan', SVGZoomAndPan);
	_publicInterface('HTMLFormElement', {}, HTMLFormElement);
	_publicInterface('MimeTypeArray', {}, MimeTypeArray);
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
	_publicInterface('MutationObserverInit', {}, MutationObserverInit);
	_publicInterface('MSMimeTypesCollection', {}, MSMimeTypesCollection);
	_publicInterface('StyleSheet', {}, StyleSheet);
	_publicInterface('MessagePort', {}, MessagePort);
	_publicInterface('DeviceOrientationEvent', {}, DeviceOrientationEvent);
	_publicInterface('SVGTextPathElement', {
		'TEXTPATH_SPACINGTYPE_EXACT' : 2,
		'TEXTPATH_SPACINGTYPE_AUTO' : 1,
		'TEXTPATH_METHODTYPE_STRETCH' : 2,
		'TEXTPATH_SPACINGTYPE_UNKNOWN' : 0,
		'TEXTPATH_METHODTYPE_ALIGN' : 1,
		'TEXTPATH_METHODTYPE_UNKNOWN' : 0
	}, SVGTextPathElement);
	_publicInterface('NodeList', {}, NodeList);
	_publicInterface('HTMLDTElement', {}, HTMLDTElement);
	_publicInterface('PerformanceMeasure', {}, PerformanceMeasure);
	_publicInterface('SVGGradientElement', {
		'SVG_SPREADMETHOD_REFLECT' : 2,
		'SVG_SPREADMETHOD_PAD' : 1,
		'SVG_SPREADMETHOD_UNKNOWN' : 0,
		'SVG_SPREADMETHOD_REPEAT' : 3
	}, SVGGradientElement);
	_publicInterface('PopStateEvent', {}, PopStateEvent);
	_publicInterface('CSSKeyframeRule', {}, CSSKeyframeRule);
	_publicObject('NodeFilter', NodeFilter);
	_publicInterface('MSStream', {}, MSStream);
	_publicInterface('WebGLActiveInfo', {}, WebGLActiveInfo);
	_publicInterface('XMLDocument', {}, XMLDocument);
	_publicInterface('SourceBufferList', {}, SourceBufferList);
	_publicInterface('HTMLFieldSetElement', {}, HTMLFieldSetElement);
	_publicInterface('MediaError', {
		'MEDIA_ERR_SRC_NOT_SUPPORTED' : 4,
		'MEDIA_ERR_NETWORK' : 2,
		'MEDIA_ERR_ABORTED' : 1,
		'MS_MEDIA_ERR_ENCRYPTED' : 5,
		'MEDIA_ERR_DECODE' : 3
	}, MediaError);
	_publicInterface('SVGNumberList', {}, SVGNumberList);
	_publicInterface('DeviceMotionEvent', {}, DeviceMotionEvent);
	_publicInterface('HTMLBGSoundElement', {}, HTMLBGSoundElement);
	_publicInterface('HTMLElement', {}, HTMLElement);
	_publicInterface('Comment', {}, Comment);
	_publicInterface('PerformanceResourceTiming', {}, PerformanceResourceTiming);
	_publicInterface('CanvasPattern', {}, CanvasPattern);
	_publicInterface('PositionOptions', {}, PositionOptions);
	_publicInterface('HTMLHRElement', {}, HTMLHRElement);
	_publicInterface('HTMLObjectElement', {}, HTMLObjectElement);
	_publicInterface('DeviceAccelerationDict', {}, DeviceAccelerationDict);
	_publicInterface('StorageEvent', {}, StorageEvent);
	_publicInterface('HTMLEmbedElement', {}, HTMLEmbedElement);
	_publicInterface('CharacterData', {}, CharacterData);
	_publicInterface('HTMLOptGroupElement', {}, HTMLOptGroupElement);
	_publicInterface('SVGPathSegLinetoRel', {}, SVGPathSegLinetoRel);
	_publicInterface('HTMLIsIndexElement', {}, HTMLIsIndexElement);
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
	_publicInterface('OES_texture_float', {}, OES_texture_float);
	_publicInterface('MSCompatibleInfoCollection', {}, MSCompatibleInfoCollection);
	_publicInterface('SVGAnimatedBoolean', {}, SVGAnimatedBoolean);
	_publicInterface('MSManipulationEvent', {
		'MS_MANIPULATION_STATE_DRAGGING' : 5,
		'MS_MANIPULATION_STATE_ACTIVE' : 1,
		'MS_MANIPULATION_STATE_COMMITTED' : 7,
		'MS_MANIPULATION_STATE_SELECTING' : 4,
		'MS_MANIPULATION_STATE_PRESELECT' : 3,
		'MS_MANIPULATION_STATE_STOPPED' : 0,
		'MS_MANIPULATION_STATE_CANCELLED' : 6,
		'MS_MANIPULATION_STATE_INERTIA' : 2
	}, MSManipulationEvent);
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
	_publicInterface('SVGFECompositeElement', {
		'SVG_FECOMPOSITE_OPERATOR_OUT' : 3,
		'SVG_FECOMPOSITE_OPERATOR_OVER' : 1,
		'SVG_FECOMPOSITE_OPERATOR_XOR' : 5,
		'SVG_FECOMPOSITE_OPERATOR_ARITHMETIC' : 6,
		'SVG_FECOMPOSITE_OPERATOR_UNKNOWN' : 0,
		'SVG_FECOMPOSITE_OPERATOR_IN' : 2,
		'SVG_FECOMPOSITE_OPERATOR_ATOP' : 4
	}, SVGFECompositeElement);
	_publicInterface('PageTransitionEvent', {}, PageTransitionEvent);
	_publicInterface('SVGElementInstanceList', {}, SVGElementInstanceList);
	_publicInterface('SVGSymbolElement', {}, SVGSymbolElement);
	_publicInterface('CSSRuleList', {}, CSSRuleList);
	_publicInterface('MSMediaKeySession', {}, MSMediaKeySession);
	_publicInterface('HTMLTrackElement', {
		'ERROR' : 3,
		'LOADING' : 1,
		'LOADED' : 2,
		'NONE' : 0
	}, HTMLTrackElement);
	_publicInterface('HTMLVideoElement', {}, HTMLVideoElement);
	_publicInterface('SVGFEDiffuseLightingElement', {}, SVGFEDiffuseLightingElement);
	_publicInterface('SVGFEComponentTransferElement', {}, SVGFEComponentTransferElement);
	_publicInterface('OES_texture_float_linear', {}, OES_texture_float_linear);
	_publicInterface('ClientRectList', {}, ClientRectList);
	_publicInterface('SVGMaskElement', {}, SVGMaskElement);

	_publicInterface('MSGesture', MSGestureCtor , MSGesture);
	_publicInterface('TextTrackCue', TextTrackCueCtor , TextTrackCue);
	_publicInterface('MessageChannel', MessageChannelCtor , MessageChannel);
	_publicInterface('XMLHttpRequest', XMLHttpRequestCtor , XMLHttpRequest);
	_publicInterface('MSBlobBuilder', MSBlobBuilderCtor , MSBlobBuilder);
	_publicInterface('MutationObserver', MutationObserverCtor , MutationObserver);
	_publicInterface('WebGLContextEvent', WebGLContextEventCtor , WebGLContextEvent);
	_publicInterface('Worker', WorkerCtor , Worker);
	_publicInterface('MSStreamReader', MSStreamReaderCtor , MSStreamReader);
	_publicInterface('WebSocket', WebSocketCtor , WebSocket);
	_publicInterface('MSMediaKeys', MSMediaKeysCtor , MSMediaKeys);
	_publicInterface('MediaSource', MediaSourceCtor , MediaSource);
	_publicInterface('DOMParser', DOMParserCtor , DOMParser);
	_publicInterface('FileReader', FileReaderCtor , FileReader);
	_publicInterface('Blob', BlobCtor , Blob);
	_publicInterface('XMLSerializer', XMLSerializerCtor , XMLSerializer);
	_publicInterface('FormData', FormDataCtor , FormData);
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
// SIG // MIIamwYJKoZIhvcNAQcCoIIajDCCGogCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFBVtkgzDKHbY
// SIG // nhpY/scAC45eepJmoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSFMIIEgQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGeMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSmj6znskUB
// SIG // Rb9/L3id0zTP1LeOsjA+BgorBgEEAYI3AgEMMTAwLqAU
// SIG // gBIAZABvAG0AVwBlAGIALgBqAHOhFoAUaHR0cDovL21p
// SIG // Y3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAEggEAV+15
// SIG // PxHgXqjqmOwp8Yk/Ag904RL1ODKci7vXwizL4GKBayME
// SIG // kqisiGBxqe6Fpm6PFE2GO54H2OpxburenuokP3YnXPb5
// SIG // mbxJ6w16M0vCAS/gpnsI+DupQrO0i+KFpRyDFvn0Fv9i
// SIG // Ejhaa8twpYsuVO4fcgl8kyczxfY2vSRfTHck9RYsSg8M
// SIG // msCc87XVZJwMTIv8M6dJxw3k39giG14D9zW/4JSdLH/w
// SIG // hBSPQCiaFV3/OL6NhUz8qJdDtpvge62lPOu4hta9Lx/G
// SIG // GdX5e2mGoQ04YhnlfjB+CWwEcoh7sJc31XblyZKV+vGE
// SIG // Axh0wKNAblAQtlbqR6bpRztBFaziBqGCAigwggIkBgkq
// SIG // hkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBQQ0ECEzMAAAA0JDFAyaDBeY0AAAAAADQw
// SIG // CQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG
// SIG // 9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MDUwMTA3NTIw
// SIG // OVowIwYJKoZIhvcNAQkEMRYEFHatO6mxk8EzQ1ibStNi
// SIG // 6rjWAlROMA0GCSqGSIb3DQEBBQUABIIBAGuN5AoP8JGw
// SIG // Itv8zSuIFs+zyj4djn6f7qnUptO41jVgsDnD89yI1KgU
// SIG // AyS33hCt3UpuRcLrUFCkM3/hzU9ALFxVid4r++q9evOF
// SIG // VNDieORRpoNs7bAOjv8O1fDhC+P52FmGcj9TLP8Cl+sn
// SIG // fp569rabX7CVBVNXOl4cZjopYCibNUIlK2A3F1iNid2G
// SIG // N2E9UAh1PbwWjXrRGRFhe+eK3g56EnGglRntprhl5ze+
// SIG // /gbEkSTIMfcdBwqrwPl+Un0vvIQ/IB2lyQ3X24S/IU0w
// SIG // FNu7cTYDprdsvSmil8ip9IlKtU6xnAtNAWa2LMJ3neDZ
// SIG // wCNdmFLgIc+LOGXnebJElYU=
// SIG // End signature block
