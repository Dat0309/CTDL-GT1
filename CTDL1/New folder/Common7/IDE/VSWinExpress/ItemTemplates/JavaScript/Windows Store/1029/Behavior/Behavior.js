/*!
  Další informace, jak vytvářet chování, naleznete v následující dokumentaci:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Prázdné chování</description>
		///
		///		<!-- Povinné vlastnosti -->
		///		<property name="type" datatype="String" required="true">
		///			Typ chování
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Určuje kolekci akcí, které se provedou, když se provádí toto chování.
		///		</property>
		///		<!-- Povinné vlastnosti -->
		///
		///		<!-- Pod tento řádek přidejte nové vlastnosti. -->
		///
		///		<!-- Příklad pro myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Ukázka popisu
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Sem přidejte inicializační kód.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Volána při připojení elementu k chování. Tato metoda NEBUDE volána,
					/// pokud již byl element k tomuto chování připojen. Odvozené třídy
					/// přepíšou tuto metodu za účelem provádění určitých úloh při připojení.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Element, který byl připojen
					/// </param>

					// Trasovací diagnostická zpráva. Odeberte ji, pokud není zapotřebí.
					// Pokud chcete zapnout trasování, přidejte do své stránky HTML následující skript:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Ihned proveďte akce.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Volána předtím, než se element odpojí od chování. Tato metoda NEBUDE volána,
					/// pokud už byl element odpojen. Odvozené třídy přepíšou tuto metodu za účelem provádění
					/// určitých úloh při odpojení.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Element, který bude odpojen
					/// </param>

					// Trasovací diagnostická zpráva. Odeberte ji, pokud není zapotřebí.
					// Pokud chcete zapnout trasování, přidejte do své stránky HTML následující skript:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: Přidat implementaci

					// Vytvořte objekt behaviorData pro specifické chování. Pokud není zapotřebí, objekt behaviorData odeberte.
					var behaviorData = { data: this.myProperty };

					// Získejte všechny připojené elementy.
					var targetElements = this.getAattachedElements();

					// Pro cílové elementy proveďte všechny akce připojené k tomuto chování.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* statičtí členové jsou prázdní */ },
			{
				// Metadata povinných vlastností
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// Sem přidejte metadata pro každou novou vlastnost přidanou jako <signature>/<property>.
				//
				// Příklad:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);