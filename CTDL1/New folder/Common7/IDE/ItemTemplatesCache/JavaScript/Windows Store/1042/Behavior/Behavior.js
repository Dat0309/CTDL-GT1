/*!
  Behavior 작성에 대한 자세한 내용은 다음 문서를 참조하십시오.
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>빈 동작입니다.</description>
		///
		///		<!-- 필수 속성입니다. -->
		///		<property name="type" datatype="String" required="true">
		///			동작의 형식입니다.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			이 동작 실행 시 함께 실행될 작업 컬렉션을 지정합니다.
		///		</property>
		///		<!-- 필수 속성입니다. -->
		///
		///		<!-- 이 줄 아래에 새 속성을 추가합니다. -->
		///
		///		<!-- myProperty의 예 -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			샘플 설명
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// 여기에 초기화 코드를 추가합니다.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// 요소가 동작에 연결될 때 호출됩니다. 요소가 이미 이 동작에 연결된 경우
					/// 이 메서드는 호출되지 않습니다. 파생된 클래스는
					/// 이 메서드를 재정의하여 특정 연결 작업을 수행합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// 연결된 요소입니다.
					/// </param>

					// 진단 메시지를 추적합니다. 필요하지 않으면 제거합니다.
					// 추적을 설정하려면 다음 스크립트를 HTML 페이지에 추가합니다.
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// 바로 작업을 실행합니다.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// 동작에서 요소가 분리되기 전에 호출됩니다. 요소가 이미 분리된 경우
					/// 이 메서드는 호출되지 않습니다. 파생된 클래스는 이 메서드를 재정의하여
					/// 특정 분리 작업을 수행합니다.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// 분리될 요소입니다.
					/// </param>

					// 진단 메시지를 추적합니다. 필요하지 않으면 제거합니다.
					// 추적을 설정하려면 다음 스크립트를 HTML 페이지에 추가합니다.
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: 구현을 추가합니다.

					// 동작 관련 behaviorData 개체를 생성합니다. 필요하지 않으면 behaviorData를 제거합니다.
					var behaviorData = { data: this.myProperty };

					// 연결된 모든 요소를 가져옵니다.
					var targetElements = this.getAattachedElements();

					// 대상 요소의 이 동작에 연결된 모든 작업을 실행합니다.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* 정적 멤버 비어 있음*/ },
			{
				// 필수 속성 메타데이터입니다.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// <signature>/<property>로 추가되는 모든 새 속성에 대해 해당 메타데이터를 여기에 추가합니다.
				//
				// 예:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);