/*!
  Подробнее о создании собственных действий см. в следующей документации:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>Пустое действие.</description>
		///
		///		<!-- Обязательные свойства. -->
		///		<property name="type" datatype="String" required="true">
		///			Тип действия.
		///		</property>
		///		<!-- Обязательные свойства. -->
		///
		///		<!-- Добавьте новые свойства под этой строкой. -->
		///
		///		<!-- Пример для myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			Пример описания
		///		</property>
		///	</signature>
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// Добавьте сюда код инициализации.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// Выполнение действия для одного элемента. Производный объект Actions должен его переопределять. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// Элемент, для которого должно быть выполнено данное действие.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// Опциональные данные, предоставляемые объектом Behaviors. Например, EventTriggerBehavior использует эти данные для передачи события.
						/// </param>

						// Диагностическое сообщение трассировки. Удалите, если оно не нужно.
						// Для включения трассировок добавьте на свою HTML-страницу следующий скрипт:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// Конкретный объект Behaviors может предоставлять дополнительные данные через параметр "behaviorData".
						// Поскольку, если владельцем этого действия является объект EventTriggerBehavior, который инициирует
						// действия нажатия, вы можете получить доступ к данному событию следующим образом:
						//   var event = behaviorData.event;
						// Если вы не уверены, что данное действие было вызвано объектом EventTriggerBehavior,
						// то, соблюдая некоторую осторожность, можно получить доступ к объекту события следующим образом:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: выполнение некоторого действия.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// Здесь у вас появляется возможность изменить коллекцию целевых элементов, к которым применяется действие.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// Коллекция элементов, к которым должно быть применено данное действие. Эта коллекция создается
						/// объектом-владельцем Behavior. Он учитывает такие данные объекта Behavior, как присоединенные элементы и
						/// селектор исходного элемента. Он НЕ учитывает конкретные данные действия, такие как селектор целевого элемента действия.
						/// </param>

						// TODO: изменение целевых элементов или удаление данного метода.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* статические члены пусты */ },

				{
					// Обязательные метаданные свойств.
					type: { type: String },

					// Для каждого нового свойства, добавленного как <signature>/<property>, добавьте сюда его метаданные.
					//
					// Пример.
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);