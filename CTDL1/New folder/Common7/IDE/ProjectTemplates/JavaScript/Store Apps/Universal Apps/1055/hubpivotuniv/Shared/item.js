(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // Kullanıcının bu sayfaya her gidişinde bu işlev çağrılır. İşlev
        // sayfa öğelerini uygulamanın verileri ile doldurur.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;
			if (WinJS.Utilities.isPhone)
			{
				document.getElementById("backButton").style.display = "none";
            }
			// TODO: Sayfayı burada başlat.
        }
    });
})();
