/*!
  Pour en savoir plus sur la façon d'écrire votre comportement, consultez la documentation suivante :
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Comportement vide.</description>
		///
		///		<!-- Propriétés obligatoires. -->
		///		<property name="type" datatype="String" required="true">
		///			Type du comportement.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Spécifie la collection d'actions exécutées lors de l'exécution de ce comportement.
		///		</property>
		///		<!-- Propriétés obligatoires. -->
		///
		///		<!-- Ajouter de nouvelles propriétés sous cette ligne. -->
		///
		///		<!-- Exemple pour myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Exemple de description
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Ajoutez ici le code d'initialisation.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Cette méthode est appelée lorsqu'un élément est joint à un comportement. Elle n'est PAS appelée
					/// si l'élément a déjà été joint à ce comportement. Les classes dérivées
					/// substituent cette méthode pour effectuer des tâches de jonction spécifiques.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Élément qui a été joint.
					/// </param>

					// Message de diagnostic de suivi. Le supprimer s'il n'est pas nécessaire.
					// Pour activer les traces, ajoutez le script suivant à votre page HTML :
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Exécuter des actions immédiatement.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Cette méthode est appelée avant qu'un élément soit sur le point d'être détaché d'un comportement. Elle n'est PAS appelée
					/// si l'élément a déjà été détaché.  Les classes dérivées substituent cette méthode pour effectuer
					/// des tâches de détachement spécifiques.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Élément sur le point d'être détaché.
					/// </param>

					// Message de diagnostic de suivi. Le supprimer s'il n'est pas nécessaire.
					// Pour activer les traces, ajoutez le script suivant à votre page HTML :
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: ajouter une implémentation.

					// Objet behaviorData spécifique au comportement de construction. S'il n'est pas nécessaire, supprimez behaviorData.
					var behaviorData = { data: this.myProperty };

					// Obtenir tous les éléments joints.
					var targetElements = this.getAattachedElements();

					// Exécuter toutes les actions jointes à ce comportement sur les éléments cibles.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* membres statiques vides */ },
			{
				// Métadonnées des propriétés obligatoires.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// Pour chaque nouvelle propriété ajoutée en tant que <signature>/<property>, ajoutez ici ses métadonnées.
				//
				// Exemple :
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);