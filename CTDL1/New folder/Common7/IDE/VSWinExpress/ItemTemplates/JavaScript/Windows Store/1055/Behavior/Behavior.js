/*!
  Davranışınızı yazma hakkında daha fazla bilgi için aşağıdaki belgelere bakın:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Boş bir davranış.</description>
		///
		///		<!-- Zorunlu özellikler. -->
		///		<property name="type" datatype="String" required="true">
		///			Davranışın türü.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Bu davranış yürütüldüğünde yürütülecek eylemler koleksiyonunu belirtir.
		///		</property>
		///		<!-- Zorunlu özellikler. -->
		///
		///		<!-- Bu satırın altına yeni özellikler ekleyin. -->
		///
		///		<!-- myProperty örneği -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Örnek açıklaması
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Buraya başlatma kodunu ekleyin.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Davranışa bir öğe eklendiğinde çağrılır. Bu yöntem,
					/// öğe zaten bu davranışa eklenmişse ÇAĞRILMAYACAKTIR. Türetilen sınıflar
					/// belirli ek görevlerini gerçekleştirmek için bu yöntemi geçersiz kılar.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Eklenen bir öğe.
					/// </param>

					// Tanılama iletisini izleyin. Gerekmiyorsa kaldırın.
					// İzlemeleri açmak için aşağıdaki betiği HTML sayfanıza ekleyin:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Eylemleri hemen yürütür.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Öğe davranıştan çıkarılmak üzereyken çağrılır. Bu yöntem,
					/// öğe zaten çıkarılmışsa ÇAĞRILMAYACAKTIR. Türetilen sınıflar belirli çıkarma görevlerini gerçekleştirmek için
					/// bu yöntemi geçersiz kılacaktır.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Çıkarılmak üzere olan bir öğe.
					/// </param>

					// Tanılama iletisini izleyin. Gerekmiyorsa kaldırın.
					// İzlemeleri açmak için aşağıdaki betiği HTML sayfanıza ekleyin:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: uygulama ekleyin.

					// Davranışa özgü behaviorData nesnesi oluşturun. Gerekmiyorsa behaviorData'yı kaldırın.
					var behaviorData = { data: this.myProperty };

					// Ekli tüm öğeleri alın.
					var targetElements = this.getAattachedElements();

					// Hedef öğelerde bu davranışa eklenen tüm eylemleri yürütün.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* statik üyeler boş */ },
			{
				// Zorunlu özellik meta verileri.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// <signature>/<property> olarak eklenen her yeni özellik için meta verilerini buraya ekleyin.
				//
				// Örnek:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);