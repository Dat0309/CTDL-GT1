/*!
  Aby dowiedzieć się więcej o tworzeniu zachowań, zobacz następującą dokumentację:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Puste zachowanie.</description>
		///
		///		<!-- Obowiązkowe właściwości. -->
		///		<property name="type" datatype="String" required="true">
		///			Typ zachowania.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Określa kolekcję akcji, które będą wykonywane, po wykonaniu tego zachowania.
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
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// W tym miejscu dodaj kod inicjowania.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Wywoływane, gdy element zostaje dołączony do zachowania. Ta metoda NIE będzie wywoływana
					/// jeżeli element został już dołączony do zachowania. Klasy pochodne
					/// zastąpią tę metodę, aby wykonać konkretne zadania dołączenia.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Element, który został dołączony.
					/// </param>

					// Śledzenie komunikatu diagnostycznego. Usunąć jeżeli niepotrzebny.
					// Włączenie śledzenia dla dodawania następujących skryptów do strony HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Wykonaj działania od razu.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Wywoływane przed odłączeniem elementu od zachowania. Ta metoda NIE będzie wywoływana
					/// jeżeli element został już odłączony. Klasy pochodne zastąpią tę metodę, aby wykonać
					/// konkretne zadania odłączania.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Element, który ma zostać odłączony.
					/// </param>

					// Śledzenie komunikatu diagnostycznego. Usunąć jeżeli niepotrzebny.
					// Włączenie śledzenia dla dodawania następujących skryptów do strony HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: dodanie wdrożenia.

					// Skonstruuj obiekt behaviorData specyficzny dla zachowania. Jeżeli nie jest potrzebny, usuń behaviorData.
					var behaviorData = { data: this.myProperty };

					// Pobierz wszystkie załączone elementy.
					var targetElements = this.getAattachedElements();

					// Wykonaj wszystkie działania dołączone do tego zachowania na elementach docelowych.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* puste statyczne elementy członkowskie */ },
			{
				// Obowiązkowe metadane właściwości.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// W tym miejscu należy dodać metadane każdej nowej właściwości dodanej jako <signature>/<property>.
				//
				// Przykład:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);