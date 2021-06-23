/*!
  Eyleminizi yazma hakkında daha fazla bilgi için aşağıdaki belgelere bakın:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Boş bir eylem.</description>
		///
		///		<!-- Zorunlu özellikler. -->
		///		<property name="type" datatype="String" required="true">
		///			Eylemin türü.
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
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Buraya başlatma kodunu ekleyin.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Bir öğe için eylemi yürütür. Türetilen Eylemlerin bunun üzerine yazması gerekir. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Bu eylemin üzerinde yürütülmesi gereken bir öğe.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Davranışlar tarafından sağlanan isteğe bağlı bilgi. Örneğin, EventTriggerBehavior bunu olayı geçirmek için kullanır.
						/// </param>

						// Tanılama iletisini izleyin. Gerekmiyorsa kaldırın.
						// İzlemeleri açmak için aşağıdaki betiği HTML sayfanıza ekleyin:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Belirli Davranışlar, 'behaviorData' parametresiyle ek bilgi sağlayabilir.
						// Bu eylemin sahibi tıklanınca tetiklenen EventTriggerBehavior ise
						// şunun gibi bir olaya erişebilirsiniz:
						//   var event = behaviorData.event;
						// Bu eylemin EventTriggerBehavior tarafından çağrılıp çağrılmadığından emin değilseniz
						// dikkatli olup şunun gibi bir olay nesnesine erişebilirsiniz:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: bir eylem gerçekleştirin.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Bu, bir eylemin gerçekleştirileceği hedef öğeler koleksiyonunu değiştirme fırsatınızdır.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Bu eylemin üzerinde yürütülmesi gereken öğeler koleksiyonu. Bu koleksiyon,
						/// sahip Davranış nesnesi tarafından oluşturulur. Ekli öğeler ve kaynak seçici gibi Davranış ayrıntılarını
						/// dikkate alır. Eylem hedef seçicisi gibi eyleme özgü ayrıntıları dikkate ALMAZ.
						/// </param>

						// TODO: hedef öğeleri değiştirin veya bu yöntemi kaldırın.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* statik üyeler boş */ },

				{
					// Zorunlu özellik meta verileri.
					type: { type: String },

					// <signature>/<property> olarak eklenen her yeni özellik için meta verilerini buraya ekleyin.
					//
					// Örnek:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);