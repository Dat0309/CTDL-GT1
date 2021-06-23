var __vwd = {
    callStack: [], // Currently recorded callstack array.
    stackCount: 0,
    nextUniqueKey: 0, // Next unique key to assign to newly mapped elements.
    vwdJsKeyAttr: "vwd-js-key",
    jsCallStackExpando: "vwd-js-callstack",
    nextSid: 0, // Next id representing a function scope instance.

    pu: function (scope, fileName, funcName, start, length) {
        /// <summary>
        ///     Pushes a frame onto the recorded callstack array.
        /// </summary>

        __vwd.callStack[__vwd.stackCount++] = { _scope: scope, _fileName: fileName, _funcName: funcName, _start: start, _length: length };
    },
    po: function () {
        /// <summary>
        ///     Pops the last frame from the recorded callstack array.
        /// </summary>

        if (__vwd.stackCount > 0) {
            delete __vwd.callStack[__vwd.stackCount--];
        }
    },
    sid: function () {
        return ++__vwd.nextSid;
    },
    cloneCallStack: function (callStack, stackCount) {

        if (stackCount > 0) {
            var newCallStack = [];
            for (var i = 0; i < stackCount; i++) {
                var frame = callStack[i];
                var frameClone = { _scope: frame._scope, _fileName: frame._fileName, _funcName: frame._funcName, _start: frame._start, _length: frame._length };

                if (newCallStack.length == 0 || frame._scope != newCallStack[newCallStack.length - 1]._scope) {
                    newCallStack.push(frameClone);
                }
                else {
                    newCallStack[newCallStack.length - 1] = frameClone;
                }
            }

            return newCallStack;
        }
        else {
            // No running callstack is available.
            return null;
        }
    },
    getCallStackOfAncestor: function (elem) {

        for (var parent = elem.parentElement; parent != null; parent = parent.parentElement) {

            if (__vwd.isNodeDynamic(elem)) {
                return __vwd.getCallStackOfNode(elem);
            }
        }

        // Should never be hit.
        return null;
    },

    mapNode: function (elem) {
        /// <summary>
        ///     Associates a DOM element to the currently recorded callstack.
        /// </summary>

        __vwd.markNodeAsDynamic(elem);

        var elemCallStack = __vwd.cloneCallStack(__vwd.callStack, __vwd.stackCount);

        if (elemCallStack == null) {
            // This node was a descendent of a dynamic node, use the ancestors callstack.
            elemCallStack = __vwd.getCallStackOfAncestor(elem);
        }

        elem[__vwd.jsCallStackExpando] = elemCallStack;
    },
    unmapNode: function (elem) {
        /// <summary>
        ///     Disassociates a DOM element from it's recorded callstack.
        /// </summary>

        elem[__vwd.jsCallStackExpando] = null;
    },
    markNodeAsDynamic: function (elem) {
        /// <summary>
        ///     Marks a DOM element as dynamically generated.
        /// </summary>

        elem.setAttribute(__vwd.vwdJsKeyAttr, 0);
    },
    isNodeDynamic: function (elem) {
        if (elem.getAttribute && 
            elem.getAttribute(__vwd.vwdJsKeyAttr) != null) {
            return true;
        }

        return false;
    },
    getCallStackOfNode: function (elem) {
        /// <summary>
        ///     Returns the recorded callstack associated with the given DOM element.
        /// </summary>

        return elem[__vwd.jsCallStackExpando];
    },
    selectTopofStack: function() {

        var elem = window.RADJJScriptObject.BrowserSelectedElem;

        if (elem != null) {
            var callStack = __vwd.getCallStackOfNode(elem);

            if (callStack != null) {
                for (var i = callStack.length - 1; i >= 0; i--) {

                    var frame = callStack[i];

                    if (frame != null) {
                        if (!window.RADJJScriptObject.IsJScriptLibrary(frame._fileName)) {

                            var href = frame._fileName;
                            var start = frame._start;
                            var length = frame._length;

                            var sourceRange = window.RADJJScriptObject.FindSourceRangeFromFetched(frame._start, frame._length, frame._fileName);

                            if (sourceRange != null) {
                                var list = sourceRange.split("|");

                                start = parseInt(list[0]);
                                length = parseInt(list[1]);
                                href = list[2];
                            }

                            window.RADJJScriptObject.SelectScript(href, start, length);

                            return;
                        }
                    }
                }
            }
        }
    },
    onDomNodeInserted: function (e) {
        if (__vwd.isMutationEventMappable(e)) {
            __vwd.mapNode(e.target);
        }
    },
    onDomNodeRemoved: function (e) {

        if (__vwd.isMutationEventMappable(e)) {
            __vwd.unmapNode(e.target);
        }
    },
    isMutationEventMappable: function (e) {
        if (e.target && e.target.nodeName && e.target.nodeName[0] != '#') {
            // We only support DOM elements.
            return true;
        }

        return false;
    },
    setupEvents: function () {
        if (document.addEventListener) {
            document.addEventListener("DOMNodeInserted", __vwd.onDomNodeInserted, false);
            document.addEventListener("DOMNodeRemoved", __vwd.onDomNodeRemoved, false);
        }
    },
    intialize: function () {
        __vwd.setupEvents();
    }
}
__vwd.intialize();
