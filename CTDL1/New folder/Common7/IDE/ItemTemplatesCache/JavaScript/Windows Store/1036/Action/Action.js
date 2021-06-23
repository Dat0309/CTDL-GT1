/*!
  Pour en savoir plus sur comment écrire votre action, consultez la documentation suivante :
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Action vide.</description>
		///
		///		<!-- Propriétés obligatoires. -->
		///		<property name="type" datatype="String" required="true">
		///			Type de l'action.
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
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Ajoutez ici le code d'initialisation.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Exécute l'action pour un élément. Les actions dérivées doivent la substituer. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Élément sur lequel cette action doit être exécutée.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Informations facultatives fournies par les objets Behavior. Par exemple, EventTriggerBehavior les utilise pour passer un événement.
						/// </param>

						// Message de diagnostic de suivi. Le supprimer s'il n'est pas nécessaire.
						// Pour activer les traces, ajoutez le script suivant à votre page HTML :
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Des objets Behavior spécifiques peuvent fournir des informations supplémentaires via le paramètre 'behaviorData'.
						// Si cette action est détenue par un EventTriggerBehavior déclenché
						// en cas de clic, vous pouvez accéder à cet événement comme suit :
						//   var event = behaviorData.event;
						// Si vous n'êtes pas certain que cette action a été appelée par EventTriggerBehavior,
						// vous pouvez accéder à l'objet d'événement comme suit :
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: effectuer une action.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Vous avez ici l'opportunité de modifier la collection d'éléments cibles sur lesquels exécuter une action.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Collection d'éléments sur lesquels cette action doit être exécutée. Cette collection est construite
						/// par l'objet Behavior propriétaire. Elle prend en compte des détails de comportement tels que les éléments joints et
						/// le sélecteur de source. Elle ne prend PAS en compte des détails spécifiques à l'action tels que le sélecteur de cible d'action.
						/// </param>

						// TODO: modifier des éléments cibles ou supprimer cette méthode.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* membres statiques vides */ },

				{
					// Métadonnées des propriétés obligatoires.
					type: { type: String },

					// Pour chaque nouvelle propriété ajoutée en tant que <signature>/<property>, ajoutez ici ses métadonnées.
					//
					// Exemple :
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);