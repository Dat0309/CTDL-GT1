/*!
  Подробнее о создании собственного поведения см. в следующей документации:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>Пустое поведение.</description>
		///
		///		<!-- Обязательные свойства. -->
		///		<property name="type" datatype="String" required="true">
		///			Тип поведения.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Задает коллекцию действий, выполняемых при выполнении этого поведения.
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
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Добавьте сюда код инициализации.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Вызывается при присоединении элемента к поведению. Этот метод НЕ вызывается,
					/// если к данному поведению уже присоединен элемент. Производные классы
					/// переопределяют этот метод для выполнения конкретных задач присоединения.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// Элемент, который был присоединен.
					/// </param>

					// Диагностическое сообщение трассировки. Удалите, если оно не нужно.
					// Для включения трассировок добавьте на свою HTML-страницу следующий скрипт:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Немедленное выполнение действий.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Вызывается перед тем, как элемент будет отсоединен от поведения. Этот метод НЕ вызывается,
					/// если элемент уже отсоединен. Производные классы переопределяют этот метод для выполнения
					/// конкретных задач отсоединения.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// Элемент, предназначенный для отсоединения.
					/// </param>

					// Диагностическое сообщение трассировки. Удалите, если оно не нужно.
					// Для включения трассировок добавьте на свою HTML-страницу следующий скрипт:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: добавление реализации.

					// Создание объекта behaviorData, относящегося к поведению. Если объект behaviorData не нужен, удалите его.
					var behaviorData = { data: this.myProperty };

					// Получение всех присоединенных элементов.
					var targetElements = this.getAattachedElements();

					// Выполнение всех действий, присоединенных к данному поведению, для целевых элементов.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* статические члены пусты */ },
			{
				// Обязательные метаданные свойств.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// Для каждого нового свойства, добавленного как <signature>/<property>, добавьте сюда его метаданные.
				//
				// Пример.
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);