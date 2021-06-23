/*!
  Weitere Informationen darüber, wie Sie die Aktion schreiben, finden Sie in der folgenden Dokumentation:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Eine leere Aktion.</description>
		///
		///		<!-- Erforderliche Eigenschaften. -->
		///		<property name="type" datatype="String" required="true">
		///			Der Typ der Aktion.
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
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Hier Code zur Initialisierung einfügen.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Führt die Aktion für ein Element aus. Abgeleitete Aktionen müssen dies überschreiben. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Ein Element, für das diese Aktion ausgeführt werden soll.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Optionale von den Verhalten bereitgestellte Informationen. Wird beispielsweise von EventTriggerBehavior zum Übergeben von Ereignissen verwendet.
						/// </param>

						// Ablaufverfolgung der Diagnosemeldung. Entfernen, wenn nicht benötigt.
						// Zum Aktivieren der Ablaufverfolgungen fügen Sie der HTML-Seite das folgende Skript hinzu:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Mit spezifischen Verhaltensweisen können über den 'behaviorData'-Parameter zusätzliche Informationen bereitgestellt werden.
						// Wenn diese Aktion im Besitz eines EventTriggerBehavior ist, das
						// durch Klicken ausgelöst wird, rufen Sie folgendermaßen das Ereignis auf:
						//   var event = behaviorData.event;
						// Wenn Sie nicht sicher sind, ob diese Aktion durch EventTriggerBehavior aufgerufen wurde,
						// können Sie etwas vorsichtiger vorgehen, indem Sie das Objekt wie folgt aufrufen:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: Eine Aktion ausführen.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Bietet die Möglichkeit, die Auflistung der Zielelemente zu bearbeiten, für die eine Aktion ausgeführt werden soll.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Eine Auflistung von Elementen, für die diese Aktion ausgeführt werden sollte. Diese Auflistung wird vom
						/// Behavior-Besitzerobjekt erstellt. Es werden Verhaltensdetails wie angefügte Elemente und
						/// Quellauswahl berücksichtigt. NICHT berücksichtigt werden aktionsspezifische Details wie die Aktionszielauswahl.
						/// </param>

						// TODO: Zielelemente bearbeiten oder diese Methode entfernen.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* Statische Member leer */ },

				{
					// Erforderliche Eigenschaftenmetadaten.
					type: { type: String },

					// Fügen Sie für jede als <signature>/<property> hinzugefügte Eigenschaft hier die Metadaten ein.
					//
					// Beispiel:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);