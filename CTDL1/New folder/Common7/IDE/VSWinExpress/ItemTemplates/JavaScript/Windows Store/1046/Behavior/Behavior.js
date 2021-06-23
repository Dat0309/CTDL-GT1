/*!
  Para saber mais sobre como escrever seu Comportamento, consulte a seguinte documentação:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Um comportamento vazio.</description>
		///
		///		<!-- Propriedades obrigatórias. -->
		///		<property name="type" datatype="String" required="true">
		///			O tipo do comportamento.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Especifica a coleção de ações que serão executadas quando esse comportamento for executado.
		///		</property>
		///		<!-- Propriedades obrigatórias. -->
		///
		///		<!-- Adicionar novas propriedades abaixo desta linha. -->
		///
		///		<!-- Exemplo de myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Um exemplo de descrição
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Adicione código de inicialização aqui.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Chamado quando um elemento é anexado a um comportamento. Este método NÃO será chamado
					/// se o elemento já estiver anexado a esse comportamento. As classes derivadas substituirão
					/// esse método para realizar tarefas de anexo específicas.
					/// </resumo>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Um elemento que foi anexado.
					/// </param>

					// Mensagem de diagnóstico de rastreamento. Remova se não for necessária.
					// Para ativar rastreamentos, adicione o seguinte script à sua página HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Executa as ações imediatamente.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Chamado antes que o elemento esteja prestes a ser desanexado de um comportamento. Esse método NÃO será chamado
					/// se o elemento já tiver sido desanexado. As classes derivadas substituirão esse método para realizar
					/// tarefas de desanexação específicas.
					/// </resumo>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Um elemento que está prestes a ser desanexado.
					/// </param>

					// Mensagem de diagnóstico de rastreamento. Remova se não for necessária.
					// Para ativar rastreamentos, adicione o seguinte script à sua página HTML:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: adicionar implementação.

					// Constrói objeto de comportamento behaviorData específico. Se não for necessário, remove behaviorData.
					var behaviorData = { data: this.myProperty };

					// Obtém todos os elementos anexados.
					var targetElements = this.getAattachedElements();

					// Executa todas as ações anexadas a esse comportamento nos elementos de destino.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* membros estáticos vazios */ },
			{
				// Metadados de propriedade obrigatória.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// Para cada nova propriedade adicionada como <signature>/<property>, adicione seus metadados aqui.
				//
				// Exemplo:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);