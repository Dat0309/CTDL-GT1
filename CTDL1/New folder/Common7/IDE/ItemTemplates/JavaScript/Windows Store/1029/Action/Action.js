/*!
  Další informace, jak vytvářet vaše akce, naleznete v následující dokumentaci:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Prázdná akce</description>
		///
		///		<!-- Povinné vlastnosti -->
		///		<property name="type" datatype="String" required="true">
		///			Typ akce
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
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Sem přidejte inicializační kód.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Provede akci pro jeden element. Odvozené objekty Action musejí tuto metodu přepsat. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Element, pro který se má tato akce provést
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Volitelné informace, které poskytují objekty Behavior. Objekt EventTriggerBehavior například pomocí nich předává události.
						/// </param>

						// Trasovací diagnostická zpráva. Odeberte ji, pokud není zapotřebí.
						// Pokud chcete zapnout trasování, přidejte do své stránky HTML následující skript:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Specifické objekty Behavior mohou poskytovat další informace prostřednictvím parametru behaviorData.
						// Pokud je vlastníkem této akce objekt EventTriggerBehavior, který je
						// aktivován při kliknutí, můžete pak k této události přistupovat následovně:
						//   var event = behaviorData.event;
						// Pokud si nejste jisti, že tuto akci vyvolal objekt EventTriggerBehavior,
						// můžete postupovat opatrně a přistupovat k objektu události takto:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: Provést nějakou akci
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Toto je vaše šance upravit kolekci cílových elementů, pro které se má akce provést.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Kolekce elementů, pro které se má tato akce provést. Tuto kolekci vytváří
						/// vlastnící objekt Behavior. Bere v úvahu takové podrobnosti objektu Behavior, jako jsou připojené elementy
						/// a selektor zdroje. NEBERE v úvahu podrobnosti specifické pro akci, jako je například selektor cíle akce.
						/// </param>

						// TODO: Upravit cílové elementy nebo odebrat tuto metodu
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* statičtí členové jsou prázdní */ },

				{
					// Metadata povinných vlastností
					type: { type: String },

					// Sem přidejte metadata pro každou novou vlastnost přidanou jako <signature>/<property>.
					//
					// Příklad:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);