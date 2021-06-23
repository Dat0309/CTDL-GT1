/*!
  動作の記述方法の詳細については、次のドキュメントを参照してください:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>空の動作です。</description>
		///
		///		<!-- 必須のプロパティ。 -->
		///		<property name="type" datatype="String" required="true">
		///			動作の種類です。
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			この動作の実行時に実行されるアクションのコレクションを指定します。
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
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// ここに初期化コードを追加してください。
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// 要素が動作にアタッチされるときに呼び出されます。このメソッドは、要素が
					/// この動作に既にアタッチされている場合には呼び出されません。派生クラス
					/// ではこのメソッドをオーバーライドして、特定のアタッチ タスクを実行します。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// アタッチされている要素。
					/// </param>

					// トレース診断メッセージ。不要であれば削除します。
					// トレースを有効にするには、次のスクリプトを HTML ページに追加します:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// 直ちにアクションを実行します。
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// 要素が動作からデタッチされる直前に呼び出されます。このメソッドは、要素が既に
					/// デタッチされている場合には呼び出されません。派生クラスではこのメソッドをオーバーライドして、
					/// 特定のデタッチ タスクを実行します。
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// デタッチされる要素。
					/// </param>

					// トレース診断メッセージ。不要であれば削除します。
					// トレースを有効にするには、次のスクリプトを HTML ページに追加します:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: 実装を追加します。

					// 動作固有の behaviorData オブジェクトを構築します。不要であれば、behaviorData を削除します。
					var behaviorData = { data: this.myProperty };

					// アタッチされている要素をすべて取得します。
					var targetElements = this.getAattachedElements();

					// ターゲット要素に対して、この動作にアタッチされているアクションをすべて実行します。
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* 静的メンバーが空です */ },
			{
				// 必須のプロパティ メタデータ。
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// <signature>/<property> として追加された新しいプロパティごとに、そのメタデータをここに追加してください。
				//
				// 例:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);