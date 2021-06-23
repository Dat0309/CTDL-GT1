(function () {
    "use strict";

    var nav = WinJS.Navigation;

    WinJS.Namespace.define("Application", {
        PageControlNavigator: WinJS.Class.define(
            // PageControlNavigator のコンストラクター関数を定義します。
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

                // これは、現在読み込まれているページ オブジェクトです。
                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },

                // これは現在のページのルート要素です。
                pageElement: {
                    get: function () { return this._element.firstElementChild; }
                },

                // この関数はページ ナビゲーターとそのコンテンツを破棄します。
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

                // 読み込まれる新しいページのコンテナーを作成します。
                _createPageElement: function () {
                    var element = document.createElement("div");
                    element.setAttribute("dir", window.getComputedStyle(this._element, null).direction);
                    element.style.position = "absolute";
                    element.style.visibility = "hidden";
                    element.style.width = "100%";
                    element.style.height = "100%";
                    return element;
                },

                // 現在のページにあるアニメーション要素の一覧を取得します。
                // ページで一覧が定義されていない場合は、ページ全体をアニメーション化します。
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

                // 新しいページを DOM に追加してナビゲーションに対応します。
                _navigating: function (args) {
                    var newElement = this._createPageElement();
                    this._element.appendChild(newElement);

                    this._lastNavigationPromise.cancel();

                    var that = this;

                    function cleanup() {
                        if (that._element.childElementCount > 1) {
                            var oldElement = that._element.firstElementChild;
                            // 前の要素をクリーンアップして削除します
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

                // サイズ変更イベントに対応し、現在読み込まれているページに対して updateLayout 関数を
                // 呼び出します。
                _resized: function (args) {
                    if (this.pageControl && this.pageControl.updateLayout) {
                        this.pageControl.updateLayout.call(this.pageControl, this.pageElement);
                    }
                },
            }
        )
    });
})();
