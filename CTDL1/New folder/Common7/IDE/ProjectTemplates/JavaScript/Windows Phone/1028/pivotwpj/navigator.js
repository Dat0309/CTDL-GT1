(function () {
    "use strict";

    var nav = WinJS.Navigation;

    WinJS.Namespace.define("Application", {
        PageControlNavigator: WinJS.Class.define(
            // 定義 PageControlNavigator 的建構函式。
            function PageControlNavigator(element, options) {
                this._element = element || document.createElement("div");
                this._element.appendChild(this._createPageElement());

                this.home = options.home;

                this._eventHandlerRemover = [];

                var that = this;
                function addRemovableEventListener(e, eventName, handler, capture) {
                    e.addEventListener(eventName, handler, capture);
                    that._eventHandlerRemover.push(function () {
                        e.removeEventListener(eventName, handler);
                    });
                };

                addRemovableEventListener(nav, 'navigating', this._navigating.bind(this), false);
                addRemovableEventListener(nav, 'navigated', this._navigated.bind(this), false);

                window.onresize = this._resized.bind(this);

                Application.navigator = this;
            }, {
                home: "",
                /// <field domElement="true" />
                _element: null,
                _lastNavigationPromise: WinJS.Promise.as(),
                _lastViewstate: 0,

                // 這是目前載入的 Page 物件。
                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },

                // 這是目前頁面的根項目。
                pageElement: {
                    get: function () { return this._element.firstElementChild; }
                },

                // 此函式會處置頁面導覽器及其內容。
                dispose: function () {
                    if (this._disposed) {
                        return;
                    }

                    this._disposed = true;
                    WinJS.Utilities.disposeSubTree(this._element);
                    for (var i = 0; i < this._eventHandlerRemover.length; i++) {
                        this._eventHandlerRemover[i]();
                    }
                    this._eventHandlerRemover = null;
                },

                // 建立要載入其中之新頁面的容器。
                _createPageElement: function () {
                    var element = document.createElement("div");
                    element.setAttribute("dir", window.getComputedStyle(this._element, null).direction);
                    element.style.position = "absolute";
                    element.style.visibility = "hidden";
                    element.style.width = "100%";
                    element.style.height = "100%";
                    return element;
                },

                // 擷取目前頁面的動畫項目清單。
                // 如果頁面未定義清單，以動畫處理整個頁面。
                _getAnimationElements: function () {
                    if (this.pageControl && this.pageControl.getAnimationElements) {
                        return this.pageControl.getAnimationElements();
                    }
                    return this.pageElement;
                },

                _navigated: function () {
                    this.pageElement.style.visibility = "";
                    WinJS.UI.Animation.enterPage(this._getAnimationElements()).done();
                },

                // 將新頁面加入至 DOM 以回應巡覽。
                _navigating: function (args) {
                    var newElement = this._createPageElement();
                    this._element.appendChild(newElement);

                    this._lastNavigationPromise.cancel();

                    var that = this;

                    function cleanup() {
                        if (that._element.childElementCount > 1) {
                            var oldElement = that._element.firstElementChild;
                            // 清除並移除上一個項目 
                            if (oldElement.winControl) {
                                if (oldElement.winControl.unload) {
                                    oldElement.winControl.unload();
                                }
                                oldElement.winControl.dispose();
                            }
                            oldElement.parentNode.removeChild(oldElement);
                            oldElement.innerText = "";
                        }
                    }

                    this._lastNavigationPromise = WinJS.Promise.as().then(function () {
                        return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state);
                    }).then(cleanup, cleanup);

                    args.detail.setPromise(this._lastNavigationPromise);
                },

                // 在目前載入的頁面上，回應調整大小事件並呼叫
                // updateLayout 函式。
                _resized: function (args) {
                    if (this.pageControl && this.pageControl.updateLayout) {
                        this.pageControl.updateLayout.call(this.pageControl, this.pageElement);
                    }
                },
            }
        )
    });
})();
