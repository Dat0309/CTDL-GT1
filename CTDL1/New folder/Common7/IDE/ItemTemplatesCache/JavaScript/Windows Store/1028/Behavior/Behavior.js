/*!
  若要進一步了解如何撰寫您的行為，請參閱下列文件:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>空的行為。</description>
		///
		///		<!-- 強制參數。 -->
		///		<property name="type" datatype="String" required="true">
		///			行為的類型。
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			指定執行這個行為時將會執行的動作集合。
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
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// 在此加入初始化程式碼。
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// 當元素附加至行為時呼叫。如果元素已經附加至這個行為，
					/// 就不會呼叫此方法。衍生類別將會
					/// 覆寫此方法以執行特定附加工作。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// 已經附加的元素。
					/// </param>

					// 追蹤診斷訊息。如果不需要，請移除。
					// 若要開啟追蹤，請將下列指令碼加入至您的 HTML 網頁:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// 立即執行動作。
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// 在元素即將從行為中斷連結之前呼叫。如果元素已經中斷連結，
					/// 就不會呼叫此方法。衍生類別將會覆寫此方法以執行
					/// 特定中斷連結工作。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// 即將中斷連結的元素。
					/// </param>

					// 追蹤診斷訊息。如果不需要，請移除。
					// 若要開啟追蹤，請將下列指令碼加入至您的 HTML 網頁:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: 加入實作。

					// 建構行為特定的 behaviorData 物件。如果不需要，請移除 behaviorData。
					var behaviorData = { data: this.myProperty };

					// 取得所有附加的元素。
					var targetElements = this.getAattachedElements();

					// 針對目標元素執行附加至這個行為的所有動作。
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* 靜態成員空白 */ },
			{
				// 強制參數中繼資料。
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// 針對每個以 <signature>/<property> 方式加入的新屬性，在此加入它的中繼資料。
				//
				// 範例:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);