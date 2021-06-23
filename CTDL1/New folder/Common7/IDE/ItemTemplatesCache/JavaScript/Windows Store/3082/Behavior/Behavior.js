/*!
  Para obtener más información sobre cómo escribir el comportamiento, consulte la siguiente documentación:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Un comportamiento vacío.</description>
		///
		///		<!-- Propiedades obligatorias. -->
		///		<property name="type" datatype="String" required="true">
		///			Tipo del comportamiento.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Especifica la colección de acciones que se ejecutará al ejecutar este comportamiento.
		///		</property>
		///		<!-- Propiedades obligatorias. -->
		///
		///		<!-- Agregar nuevas propiedades bajo esta línea. -->
		///
		///		<!-- Ejemplo para myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Descripción de ejemplo
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Agregar aquí código de inicialización.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Se llama cuando hay un elemento asociado a un comportamiento. NO se llamará a este método
					/// si el elemento se ha asociado ya a este comportamiento. Las clases derivadas
					/// invalidarán este método para realizar tareas de asociación específicas.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Elemento que se ha asociado.
					/// </param>

					// Mensaje de diagnóstico de seguimiento. Quítelo si no es necesario.
					// Para activar los seguimientos, agregue el siguiente script a la página HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Ejecutar las acciones de inmediato.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Se llama cuando el elemento está a punto de desasociarse de un comportamiento. NO se llamará a este método
					/// si el elemento ya se ha desasociado. Las clases derivadas invalidarán este método para realizar
					/// tareas de desasociación específicas.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Elemento que se va a desasociar.
					/// </param>

					// Mensaje de diagnóstico de seguimiento. Quítelo si no es necesario.
					// Para activar los seguimientos, agregue el siguiente script a la página HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: agregar implementación.

					// Construir un objeto behaviorData específico de un comportamiento. Si no es necesario, quitar behaviorData.
					var behaviorData = { data: this.myProperty };

					// Obtener todos los elementos asociados.
					var targetElements = this.getAattachedElements();

					// Ejecutar todas las acciones asociadas a este comportamiento en los elementos de destino.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* miembros estáticos vacíos */ },
			{
				// Metadatos de propiedad obligatorios.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// Para cada nueva propiedad agregada como <signature>/<property>, agregue aquí sus metadatos.
				//
				// Ejemplo:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);