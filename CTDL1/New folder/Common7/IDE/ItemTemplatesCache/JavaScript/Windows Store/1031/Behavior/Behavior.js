/*!
  Weitere Informationen darüber, wie Sie das Verhalten schreiben, finden Sie in der folgenden Dokumentation:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Ein leeres Verhalten.</description>
		///
		///		<!-- Erforderliche Eigenschaften. -->
		///		<property name="type" datatype="String" required="true">
		///			Der Typ des Verhaltens.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Gibt die Auflistung der Aktionen an, die bei Ausführung dieses Verhaltens ausgeführt werden.
		///		</property>
		///		<!-- Erforderliche Eigenschaften. -->
		///
		///		<!-- Fügen Sie neue Eigenschaften unter dieser Zeile ein. -->
		///
		///		<!-- Beispiel für myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Eine Beispielbeschreibung
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Hier Code zur Initialisierung einfügen.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Wird aufgerufen, wenn ein Element an ein Verhalten angefügt wird. Diese Methode wird NICHT aufgerufen,
					/// wenn das Element bereits an dieses Verhalten angefügt wurde. Abgeleitete Klassen
					/// überschreiben diese Methode, um bestimmte Aufgaben zum Anfügen auszuführen.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Ein Element, das angefügt wurde.
					/// </param>

					// Ablaufverfolgung der Diagnosemeldung. Entfernen, wenn nicht benötigt.
					// Zum Aktivieren der Ablaufverfolgungen fügen Sie der HTML-Seite das folgende Skript hinzu:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Aktionen sofort ausführen.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Wird aufgerufen, bevor das Element von einem Verhalten gelöst wird. Diese Methode wird NICHT aufgerufen,
					/// wenn das Element bereits gelöst wurde. Abgeleitete Klassen überschreiben diese Methode, um bestimmte
					/// Aufgaben zum Lösen auszuführen.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Ein Element, das gelöst werden soll.
					/// </param>

					// Ablaufverfolgung der Diagnosemeldung. Entfernen, wenn nicht benötigt.
					// Zum Aktivieren der Ablaufverfolgungen fügen Sie der HTML-Seite das folgende Skript hinzu:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: Implementierung hinzufügen.

					// Ein verhaltensspezifisches behaviorData-Objekt erstellen. Wenn nicht benötigt, behaviorData entfernen.
					var behaviorData = { data: this.myProperty };

					// Alle angefügten Elemente abrufen.
					var targetElements = this.getAattachedElements();

					// Alle an dieses Verhalten angefügten Aktionen für Zielelemente ausführen.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* Statische Member leer */ },
			{
				// Erforderliche Eigenschaftenmetadaten.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// Fügen Sie für jede als <signature>/<property> hinzugefügte Eigenschaft hier die Metadaten ein.
				//
				// Beispiel:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);