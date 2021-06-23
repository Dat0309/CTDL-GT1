/*!
  Para saber mais sobre como escrever sua Ação, consulte a seguinte documentação:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Uma ação vazia.</description>
		///
		///		<!-- Propriedades obrigatórias. -->
		///		<property name="type" datatype="String" required="true">
		///			O tipo da ação.
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
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Adicione código de inicialização aqui.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Executa ação para um elemento. As Ações Derivadas devem substituir isso. 
						/// </resumo>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Um elemento no qual essa ação deve ser executada.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Informação opcional fornecida por Comportamentos. Por exemplo, EventTriggerBehavior a utiliza para passar eventos.
						/// </param>

						// Mensagem de diagnóstico de rastreamento. Remova se não for necessária.
						// Para ativar rastreamentos, adicione o seguinte script à sua página HTML:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Comportamentos Específicos podem fornecer informações adicionais por meio do parâmetro 'behaviorData'.
						// Se a ação for de propriedade de um EventTriggerBehavior que é acionado
						// com um clique, você pode acessar esse evento da seguinte forma:
						//   var event = behaviorData.event;
						// Se você não tem certeza de que essa ação foi invocada por EventTriggerBehavior
						// pode acessar o objeto de evento com cuidado da seguinte forma:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: realizar alguma ação.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Esta é a sua chance de modificar a coleção de elementos de destino nos quais uma ação é executada.
						/// </resumo>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Uma coleção de elementos na qual essa ação deve ser executada. Essa coleção é construída
						/// pelo objeto Comportamento proprietário. Ela considera detalhes de Comportamento como elementos anexados e
						/// seletor de origem. Ela NÃO considera detalhes específicos da ação, como o seletor de destino da ação.
						/// </param>

						// TODO: modificar elementos de destino ou remover este método.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* membros estáticos vazios */ },

				{
					// Metadados de propriedade obrigatória.
					type: { type: String },

					// Para cada nova propriedade adicionada como <signature>/<property>, adicione seus metadados aqui.
					//
					// Exemplo:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);