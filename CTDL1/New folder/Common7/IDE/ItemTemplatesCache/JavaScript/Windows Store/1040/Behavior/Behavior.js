/*!
  Per ulteriori informazioni sulla scrittura del comportamento, vedere la documentazione seguente:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Comportamento vuoto.</description>
		///
		///		<!-- Proprietà obbligatorie. -->
		///		<property name="type" datatype="String" required="true">
		///			Tipo del comportamento.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Specifica la raccolta di azioni che verranno eseguite quando viene eseguito il comportamento.
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
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Aggiungere qui il codice di inizializzazione.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Chiamata eseguita quando un elemento è collegato a un comportamento. Questo metodo NON verrà chiamato
					/// se un elemento è già collegato a questo comportamento. Le classi derivate eseguiranno
					/// l'override del metodo per eseguire specifiche attività di collegamento.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// L'elemento che è stato collegato.
					/// </param>

					// Messaggi di diagnostica traccia. Rimuovere se non necessario.
					// Per attivare le tracce aggiungere il seguente script alla pagina HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Eseguire immediatamente le azioni.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Chiamata eseguita prima che l'elemento viene scollegato da un comportamento. Questo metodo NON verrà chiamato
					/// se un elemento è già stato scollegato. Le classi derivate eseguiranno l'override del metodo per eseguire
					/// specifiche attività di scollegamento.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// L'elemento che sta per essere scollegato.
					/// </param>

					// Messaggi di diagnostica traccia. Rimuovere se non necessario.
					// Per attivare le tracce aggiungere il seguente script alla pagina HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: aggiungere implementazione.

					// Oggetto behaviorData specifico del comportamento del costruttore. Se non necessario, rimuovere behaviorData.
					var behaviorData = { data: this.myProperty };

					// Ottenere tutti gli elementi collegati.
					var targetElements = this.getAattachedElements();

					// Eseguire tutte le azioni collegate al comportamento sugli elementi di destinazione.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* membri statici vuoti */ },
			{
				// Metadati proprietà obbligatorie.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// Per ogni nuova proprietà aggiunta come <signature>/<property>, aggiungere qui i metadati.
				//
				// Esempio:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);