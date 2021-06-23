/*!
  若要了解如何编写行为的详细信息，请参见以下文档:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>空行为。</description>
		///
		///		<!-- 强制属性。 -->
		///		<property name="type" datatype="String" required="true">
		///			行为的类型。
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			指定执行此行为时将执行的操作的集合。
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
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				//在此添加初始化代码。
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// 在元素附加到行为时调用。如果元素已附加到此行为，
					/// 则不会调用此方法。派生类将
					/// 重写此方法以执行特定的附加任务。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// 已附加的元素。
					/// </param>

					// 跟踪诊断消息。如不需要则删除。
					// 要启用跟踪，请向您的 HTML 页面添加以下脚本:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// 立即执行操作。
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// 在元素即将与行为分离之前调用。如果元素已分离，
					/// 则不会调用此方法。派生类将重写此方法以执行
					/// 特定的分离任务。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// 即将分离的元素。
					/// </param>

					// 跟踪诊断消息。如不需要则删除。
					// 要启用跟踪，请向您的 HTML 页面添加以下脚本:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: 添加实现。

					// 构造行为特定的 behaviorData 对象。如不需要，则删除 behaviorData。
					var behaviorData = { data: this.myProperty };

					// 获取所有附加的元素。
					var targetElements = this.getAattachedElements();

					// 对目标元素执行所有附加到此行为的操作。
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /*静态成员空*/ },
			{
				//强制属性元数据。
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				//对于每个作为 <signature>/<property> 添加的新属性，在此添加其元数据。
				//
				//示例:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);