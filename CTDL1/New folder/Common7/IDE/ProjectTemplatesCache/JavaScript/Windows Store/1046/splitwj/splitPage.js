(function () {
    "use strict";

    var binding = WinJS.Binding;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    ui.Pages.define("/pages/split/split.html", {

        _group: null,
        /// <field type="WinJS.Binding.List" />
        _items: null,
        _itemSelectionIndex: -1,
        _wasSingleColumn: false,

        // Esta função é chamada para inicializar a página.
        init: function (element, options) {
            // Armazenar informações sobre o grupo e a seleção que esta página irá
            // exibir.
            this._group = Data.resolveGroupReference(options.groupKey);
            this._items = Data.getItemsFromGroup(this._group);
            this._itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;
            this.itemDataSource = this._items.dataSource;
            this.selectionChanged = ui.eventHandler(this._selectionChanged.bind(this));
        },

        // Esta função é chamada sempre que um usuário navega para esta página.
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._group.title;

            this._updateVisibility(element);
            if (this._isSingleColumn()) {
                this._wasSingleColumn = true;
                if (this._itemSelectionIndex >= 0) {
                    // Para vizualização de detalhe de coluna única, carregue o artigo.
                    binding.processAll(element.querySelector(".articlesection"), this._items.getAt(this._itemSelectionIndex));
                }
            } else {
                // Se esta página possui um selectionIndex, faça a seleção
                // aparecer no ListView.
                var listView = element.querySelector(".itemlist").winControl;
                listView.selection.set(Math.max(this._itemSelectionIndex, 0));
            }
        },

        unload: function () {
            this._items.dispose();
        },

        updateLayout: function (element) {
            var isSingleColumn = this._isSingleColumn();
            if (this._wasSingleColumn === isSingleColumn) {
                return;
            }

            var listView = element.querySelector(".itemlist").winControl;
            var firstVisible = listView.indexOfFirstVisible;
            this._updateVisibility(element);

            var handler = function (e) {
                listView.removeEventListener("contentanimating", handler, false);
                e.preventDefault();
            }

            if (isSingleColumn) {
                listView.selection.clear();
                if (this._itemSelectionIndex >= 0) {
                    // Se o aplicativo tiver aderido a um modo de exibição de detalhes de coluna única,
                    // adicione o modo de exibição de lista de coluna única para o backstack.
                    nav.history.current.state = {
                        groupKey: this._group.key,
                        selectedIndex: this._itemSelectionIndex
                    };
                    nav.history.backStack.push({
                        location: "/pages/split/split.html",
                        state: { groupKey: this._group.key }
                    });
                    element.querySelector(".articlesection").focus();
                } else {
                    listView.addEventListener("contentanimating", handler, false);
                    if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                        listView.indexOfFirstVisible = firstVisible;
                    }
                    listView.forceLayout();
                }
            } else {
                // Se o aplicativo tiver desencaixado no modo de exibição de duas colunas, remova qualquer
                // instância de splitPage que foi adicionada ao backstack.
                if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/split/split.html") {
                    nav.history.backStack.pop();
                }

                listView.addEventListener("contentanimating", handler, false);
                if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                    listView.indexOfFirstVisible = firstVisible;
                }
                listView.forceLayout();
                listView.selection.set(this._itemSelectionIndex >= 0 ? this._itemSelectionIndex : Math.max(firstVisible, 0));
            }

            this._wasSingleColumn = isSingleColumn;
        },

        // Essa função verifica se a lista e as colunas de detalhes devem ser exibidas
        // em páginas separadas em vez de lado a lado.
        _isSingleColumn: function () {
            return document.documentElement.offsetWidth <= 767;
        },

        _selectionChanged: function (args) {
            var listView = args.currentTarget.winControl;
            var details;
            // Por padrão, a seleção é restrita a único item.
            listView.selection.getItems().done(function updateDetails(items) {
                if (items.length > 0) {
                    this._itemSelectionIndex = items[0].index;
                    if (this._isSingleColumn()) {
                        // Se encaixado ou retrato, navegue até uma nova página contendo os
                        // detalhes do item selecionado.
                        setImmediate(function () {
                            nav.navigate("/pages/split/split.html", { groupKey: this._group.key, selectedIndex: this._itemSelectionIndex });
                        }.bind(this));
                    } else {
                        // Se sm tela inteira ou preenchida, atualizar a coluna de detalhes com novos dados.
                        details = document.querySelector(".articlesection");
                        binding.processAll(details, items[0].data);
                        details.scrollTop = 0;
                    }
                }
            }.bind(this));
        },

        // Essa função alterna a visibilidade das duas colunas com base no atual
        // estado de exibição e seleção de item.
        _updateVisibility: function (element) {
            var splitPage = element.querySelector(".splitpage");
            if (this._isSingleColumn()) {
                if (this._itemSelectionIndex >= 0) {
                    utils.addClass(splitPage, "itemdetail");
                    element.querySelector(".articlesection").focus();
                } else {
                    utils.addClass(splitPage, "groupdetail");
                    element.querySelector(".itemlist").focus();
                }
            } else {
                utils.removeClass(splitPage, "groupdetail");
                utils.removeClass(splitPage, "itemdetail");
                element.querySelector(".itemlist").focus();
            }
        }
    });
})();
