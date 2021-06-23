/*!
  Para obtener más información sobre cómo escribir la acción, consulte la siguiente documentación:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Una acción vacía.</description>
		///
		///		<!-- Propiedades obligatorias. -->
		///		<property name="type" datatype="String" required="true">
		///			Tipo de la acción.
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
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Agregar aquí código de inicialización.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Ejecuta la acción para un elemento. Las acciones derivadas deben invalidar esta. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Elemento en el que debe ejecutarse esta acción.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Información opcional proporcionada por los comportamientos. Por ejemplo, EventTriggerBehavior lo usa para pasar el evento.
						/// </param>

						// Mensaje de diagnóstico de seguimiento. Quítelo si no es necesario.
						// Para activar los seguimientos, agregue el siguiente script a la página HTML:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Comportamientos específicos pueden proporcionar información adicional con el parámetro 'behaviorData'.
						// Si esta acción pertenece a un EventTriggerBehavior que se activa
						// al hacer clic, puede obtener acceso a ese evento de este modo:
						//   var event = behaviorData.event;
						// Si no está seguro de si EventTriggerBehavior invocó esta acción,
						// puede obtener acceso con cuidado al objeto de evento del siguiente modo:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: realizar alguna acción.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Esta es su oportunidad para modificar la colección de elementos de destino en los que ejecutar una acción.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Colección de elementos en la que debe ejecutarse esta acción. Esta colección la construye
						/// el objeto propietario Behavior. Tiene en cuenta detalles de Behavior como elementos asociados y
						/// selector de origen. NO tiene en cuenta detalles específicos de la acción como el selector de destino de la acción.
						/// </param>

						// TODO: modificar elementos de destino o quitar este método.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* miembros estáticos vacíos */ },

				{
					// Metadatos de propiedad obligatorios.
					type: { type: String },

					// Para cada nueva propiedad agregada como <signature>/<property>, agregue aquí sus metadatos.
					//
					// Ejemplo:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);