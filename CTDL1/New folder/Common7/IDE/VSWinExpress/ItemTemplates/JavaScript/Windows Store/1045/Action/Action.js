/*!
  Aby dowiedzieć się więcej o tworzeniu akcji, zobacz następującą dokumentację:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Pusta akcja.</description>
		///
		///		<!-- Obowiązkowe właściwości. -->
		///		<property name="type" datatype="String" required="true">
		///			Typ akcji.
		///		</property>
		///		<!-- Obowiązkowe właściwości. -->
		///
		///		<!-- Poniżej tego wiersza dodaj nową właściwość. -->
		///
		///		<!-- Przykład dla myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Przykładowy opis
		///		</property>
		///	</signature>
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// W tym miejscu dodaj kod inicjowania.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Wykonuje działanie dla jednego elementu. Derived Actions musi to zastąpić. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Element dla którego należy wykonać to działanie.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Informacje opcjonalne udostępnione przez Behaviors. Na przykład EventTriggerBehavior używa ich do przekazania zdarzenia.
						/// </param>

						// Śledzenie komunikatu diagnostycznego. Usunąć jeżeli niepotrzebny.
						// Włączenie śledzenia dla dodawania następujących skryptów do strony HTML:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Specific Behaviors może udostępnić dodatkowe informacje za pośrednictwem parametru 'behaviorData'.
						// Jeżeli to działanie należy do EventTriggerBehavior, który jest uruchamiany
						// przez kliknięcie, wówczas możesz uzyskać dostęp do następującego zdarzenia:
						//   var event = behaviorData.event;
						// Jeżeli nie masz pewności, czy to działanie zostało wywołane przez EventTriggerBehavior
						// wówczas możesz postąpić ostrożnie i uzyskać dostęp do następującego obiektu zdarzenia:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: wykonać jakieś działanie.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Oto możliwość zmodyfikowania kolekcji elementów docelowych, aby wykonać działanie.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Kolekcja elementów, dla której należy wykonać to działanie. Ta kolekcja jest konstruowana
						/// przez obiekt właściciela Behavior. Uwzględnia takie informacje szczegółowe Behavior jak załączone elementy i
						/// selektor źródła. NIE uwzględnia konkretnych informacji szczegółowych takich jak selektro celu działania.
						/// </param>

						// TODO: zmodyfikowanie elementów docelowych lub usunięcie tej metody.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* puste statyczne elementy członkowskie */ },

				{
					// Obowiązkowe metadane właściwości.
					type: { type: String },

					// W tym miejscu należy dodać metadane każdej nowej właściwości dodanej jako <signature>/<property>.
					//
					// Przykład:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);