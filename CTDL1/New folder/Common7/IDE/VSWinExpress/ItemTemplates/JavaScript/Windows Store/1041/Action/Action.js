/*!
  アクションの記述方法の詳細については、次のドキュメントを参照してください:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>空のアクションです。</description>
		///
		///		<!-- 必須のプロパティ。 -->
		///		<property name="type" datatype="String" required="true">
		///			アクションの種類です。
		///		</property>
		///		<!-- 必須のプロパティ。 -->
		///
		///		<!-- 次の行の下に新しいプロパティを追加します。 -->
		///
		///		<!-- myProperty の例 -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			サンプルの説明
		///		</property>
		///	</signature>
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// ここに初期化コードを追加してください。
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// 1 つの要素に対するアクションを実行します。派生アクションでは、これをオーバーライドする必要があります。
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// アクションを実行する対象の要素。
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// 動作から提供されるオプション情報。たとえば、EventTriggerBehavior ではイベントを渡すために使用されます。
						/// </param>

						// トレース診断メッセージ。不要であれば削除します。
						// トレースを有効にするには、次のスクリプトを HTML ページに追加します:
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// 特定の動作では、'behaviorData' パラメーターを通じて追加情報を提供できます。
						// クリック時に呼び出される EventTriggerBehavior がこのアクションを
						// 所有している場合は、次のように、そのイベントにアクセスできます:
						//   var event = behaviorData.event;
						// このアクションが EventTriggerBehavior によって呼び出されたかどうか確信がない
						// 場合は、なんらかの処置を行い、次のようにイベント オブジェクトにアクセスできます:
						//   var event = null;
						//   if (behaviorData && behaviorData.event) { event = behaviorData.event; }

						// TODO: なんらかのアクションを実行します。
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// アクションの実行対象となるターゲット要素のコレクションを変更できます。
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// このアクションの実行対象となるターゲット要素のコレクション。このコレクションは、所有元である
						/// 動作オブジェクトによって構築されます。アタッチされた要素やソース セレクターなど、動作の
						/// 詳細が考慮されます。アクション ターゲット セレクターなど、アクション固有の詳細は考慮されません。
						/// </param>

						// TODO: ターゲット要素を変更するか、このメソッドを削除します。
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* 静的メンバーが空です */ },

				{
					// 必須のプロパティ メタデータ。
					type: { type: String },

					// <signature>/<property> として追加された新しいプロパティごとに、そのメタデータをここに追加してください。
					//
					// 例:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);