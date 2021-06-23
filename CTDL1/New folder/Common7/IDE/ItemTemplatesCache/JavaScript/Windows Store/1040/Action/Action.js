/*!
  Per ulteriori informazioni sulla scrittura dell'azione, vedere la documentazione seguente:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Azione vuota.</description>
		///
		///		<!-- Proprietà obbligatorie. -->
		///		<property name="type" datatype="String" required="true">
		///			Tipo dell'azione.
		///		</property>
		///		<!-- Proprietà obbligatorie. -->
		///
		///		<!-- Aggiungere nuove proprietà sotto questa linea. -->
		///
		///		<!-- Esempio per myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Descrizione di esempio
		///		</property>
		///	</signature>
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Aggiungere qui il codice di inizializzazione.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Esegue l'azione per un elemento. Le azioni derivate devono ignorare l'operazione. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Elemento su cui deve essere eseguita questa azione.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Le informazioni facoltative fornite da Behaviors. Vengono utilizzate ad esempio da EventTriggerBehavior per passare l'evento.
						/// </param>

						// Messaggi di diagnostica traccia. Rimuovere se non necessario.
						// Per attivare le tracce aggiungere il seguente script alla pagina HTML:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Comportamenti specifici possono fornire informazioni aggiuntive tramite il parametro 'behaviorData'.
						// Se l'azione è di proprietà di un elemento EventTriggerBehavior che viene attivato
						// tramite clic, è possibile accedere all'evento come segue:
						//   var event = behaviorData.event;
						// Se non si è sicuri se l'azione è stata richiamata da EventTriggerBehavior
						// è possibile prestare attenzione e accedere all'oggetto evento come segue:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: eseguire un'azione.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Costituisce l'opportunità per modificare la raccolta degli elementi di destinazione su cui eseguire l'azione.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Raccolta di elementi su cui deve essere eseguita questa azione. La raccolta è costruita
						/// dall'oggetto Behavior del proprietario. Tiene in considerazione i dettagli di Behavior quali gli elementi collegati e
						/// il selettore origine. NON tiene in considerazione i dettagli specifici dell'azione quale il selettore destinazione dell'azione.
						/// </param>

						// TODO: modificare gli elementi di destinazione o rimuovere questo metodo.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* membri statici vuoti */ },

				{
					// Metadati proprietà obbligatorie.
					type: { type: String },

					// Per ogni nuova proprietà aggiunta come <signature>/<property>, aggiungere qui i metadati.
					//
					// Esempio:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);