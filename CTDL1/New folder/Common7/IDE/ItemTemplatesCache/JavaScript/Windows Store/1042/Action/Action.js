/*!
  Action 작성에 대한 자세한 내용은 다음 문서를 참조하십시오.
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Actions", {
		///	<signature type="Action" name="CustomAction">
		///		<description>빈 작업입니다.</description>
		///
		///		<!-- 필수 속성입니다. -->
		///		<property name="type" datatype="String" required="true">
		///			작업의 형식입니다.
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
		CustomAction: VS.Class.derive(VS.Actions.ActionBase,
				function CustomAction_ctor() {
					// 여기에 초기화 코드를 추가합니다.
				},
				{
					myProperty: 10,

					execute: function (element, behaviorData) {
						/// <summary locid="VS.Actions.CustomAction.execute">
						/// 하나의 요소에 대한 작업을 실행합니다. 파생된 작업이 이를 재정의해야 합니다. 
						/// </summary>
						/// <param name="element" type="Object" domElement="true" locid="VS.Actions.CustomAction.execute_p:element">
						/// 이 작업을 실행해야 할 요소입니다.
						/// </param>
						/// <param name="behaviorData" type="Object" locid="VS.Actions.CustomAction.execute_p:behaviorData">
						/// 동작에서 제공하는 선택적 정보입니다. 예를 들어 EventTriggerBehavior는 이를 사용하여 이벤트를 전달합니다.
						/// </param>

						// 진단 메시지를 추적합니다. 필요하지 않으면 제거합니다.
						// 추적을 설정하려면 다음 스크립트를 HTML 페이지에 추가합니다.
						//   <script> VS.Util.isTraceEnabled = true; </script>
						VS.Util.trace("VS.Actions.CustomAction: <{0} uid={1}>, myProperty={2}", element.tagName, element.uniqueID, this.myProperty);

						// 특정 동작은 'behaviorData' 매개 변수를 통해 추가 정보를 제공할 수 있습니다.
						// 이 작업을 클릭 시 발생하는 EventTriggerBehavior에서 소유하는 경우
						// 이와 같은 이벤트에 액세스할 수 있습니다.
						//   var event = behaviorData.event;
						// 이 작업이 EventTriggerBehavior에 의해 호출되었는지 확실하지 않는 경우
						// 약간의 주의를 기울여 이와 같이 이벤트 개체에 액세스할 수 있습니다.
						//   var event = null;
						//   (behaviorData && behaviorData.event) { event = behaviorData.event; }인 경우

						// TODO: 일부 작업을 수행합니다.
						console.log("CustomAction not implemented");
						throw new Error("CustomAction not implemented");
					},

					getTargetElements: function (targetElements) {
						/// <summary locid="VS.Actions.CustomAction.getTargetElements">
						/// 이는 작업을 실행할 대상 요소의 컬렉션을 수정할 기회입니다.
						/// </summary>
						/// <param name="targetElements" type="Array" locid="VS.Actions.CustomAction.executeAll_p:array">
						/// 이 작업을 실행해야 할 요소의 컬렉션입니다. 이 컬렉션은
						/// 소유자의 Behavior 개체에 의해 생성됩니다. 이 경우 연결된 요소 및
						/// 소스 선택기와 같은 동작 세부 정보를 고려하고, 작업 대상 선택기와 같은 작업별 세부 정보를 고려하지 않습니다.
						/// </param>

						// TODO: 대상 요소를 수정하거나 이 메서드를 제거합니다.
						return VS.Actions.ActionBase.prototype.getTargetElements.call(this, targetElements);
					},
				},

				{ /* 정적 멤버 비어 있음*/ },

				{
					// 필수 속성 메타데이터입니다.
					type: { type: String },

					// <signature>/<property>로 추가되는 모든 새 속성에 대해 해당 메타데이터를 여기에 추가합니다.
					//
					// 예:
					// -----------------
					myProperty: { type: Number }
				}
		)
	});
})(VS);