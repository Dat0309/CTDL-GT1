/*!
  若要進一步了解如何撰寫您的動作，請參閱下列文件:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>空的動作。</description>
		///
		///		<!-- 強制參數。 -->
		///		<property name="type" datatype="String" required="true">
		///			動作的類型。
		///		</property>
		///		<!-- 強制參數。 -->
		///
		///		<!-- 在這一行底下加入新屬性。 -->
		///
		///		<!-- myProperty 的範例 -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			範例描述
		///		</property>
		///	</signature>
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// 在此加入初始化程式碼。
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// 針對一個元素執行動作。衍生的動作必須覆寫這個元素。
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// 應該執行此動作的目標元素。
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// 行為所提供的選擇性資訊。例如，EventTriggerBehavior 會使用這項資訊來傳遞事件。
						/// </param>

						// 追蹤診斷訊息。如果不需要，請移除。
						// 若要開啟追蹤，請將下列指令碼加入至您的 HTML 網頁:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// 特定行為可以經由 'behaviorData' 參數提供其他資訊。
						// 如果此動作是由點選時引發的 EventTriggerBehavior 所擁有，
						// 您就可以用類似下面的方式存取該事件:
						//   var event = behaviorData.event;
						// 如果您不確定此動作是否由 EventTriggerBehavior 叫用，
						// 您就可以稍微謹慎地用類似下面的方式存取事件物件:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: 執行某個動作。
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// 這讓您有機會修改要執行動作的目標元素集合。
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// 應該執行此動作的目標元素集合。這個集合是由
						/// 擁有者行為物件所建構。它會將行為詳細資料列入考量，例如附加元素與
						/// 來源選取器。但是，它不會將動作特定的詳細資料列入考量，例如動作目標選取器。
						/// </param>

						// TODO: 修改目標元素或移除此方法。
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* 靜態成員空白 */ },

				{
					// 強制參數中繼資料。
					type: { type: String },

					// 針對每個以 <signature>/<property> 方式加入的新屬性，在此加入它的中繼資料。
					//
					// 範例:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);