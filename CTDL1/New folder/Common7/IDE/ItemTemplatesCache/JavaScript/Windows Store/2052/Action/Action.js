/*!
  若要了解如何编写操作的详细信息，请参见以下文档:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>空操作。</description>
		///
		///		<!-- 强制属性。 -->
		///		<property name="type" datatype="String" required="true">
		///			操作的类型。
		///		</property>
		///		<!-- 强制属性。 -->
		///
		///		<!-- 在此行下添加新属性。 -->
		///
		///		<!-- myProperty 的示例 -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			示例说明
		///		</property>
		///	</signature>
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					//在此添加初始化代码。
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// 对一个元素执行操作。派生的操作必须覆盖此操作。 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// 应该对其执行此操作的元素。
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// 行为提供的可选信息。例如，EventTriggerBehavior 使用它来传递事件。
						/// </param>

						// 跟踪诊断消息。如不需要则删除。
						// 要启用跟踪，请向您的 HTML 页面添加以下脚本:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// 特定行为可以通过“behaviorData”参数提供附加信息。
						// 如果此操作由在单击时引发的 EventTriggerBehavior 所有，
						// 则您可以像下面这样访问此事件:
						//   var event = behaviorData.event;
						// 如果您不确定此操作是否由 EventTriggerBehavior 调用，
						// 则应小心谨慎并像下面这样访问事件对象:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: 执行某项操作。
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// 这是您修改要对其执行操作的目标元素集合的机会。
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// 应对其执行此操作的元素集合。此集合
						/// 由所有者行为对象构造。它会考虑附加元素和
						/// 源选择器等行为详细信息。但不会考虑操作目标选择器等操作特定的详细信息。
						/// </param>

						// TODO: 修改目标元素或删除此方法。
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /*静态成员空*/ },

				{
					//强制属性元数据。
					type: { type: String },

					//对于每个作为 <signature>/<property> 添加的新属性，在此添加其元数据。
					//
					//示例:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);