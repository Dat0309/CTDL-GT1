/*!
  To learn more about how to write your Behavior, see the following documentation:
  http://go.microsoft.com/fwlink/?LinkId=313673
*/
(function (VS) {
	"use strict";

	VS.Namespace.defineWithParent(VS, "Behaviors", {
		///	<signature type="Behavior" name="CustomBehavior">
		///		<description>An empty behavior.</description>
		///
		///		<!-- Mandatory properties. -->
		///		<property name="type" datatype="String" required="true">
		///			The type of the behavior.
		///		</property>
		///		<property name="triggeredActions" datatype="ActionCollection" required="false">
		///			Specifies the collection of actions that will execute when this behavior is executed.
		///		</property>
		///		<!-- Mandatory properties. -->
		///
		///		<!-- Add new properties below this line. -->
		///
		///		<!-- Example for myProperty -->
		///		<property name="myProperty" datatype="Number" isInteger="true" defaultValue="10" minimum="0" maximum="100" required="true">
		///			A sample description
		///		</property>
		///	</signature>
		CustomBehavior: VS.Class.derive(VS.Behaviors.BehaviorBase,
			function CustomBehavior_ctor(configBlock, attachment) {
				// Add initialization code here.
			},
			{
				myProperty: 10,

				onElementAttached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementAttached">
					/// Called when an element is attached to a behavior. This method will NOT be called
					/// if element has already been attached to this behavior. Derived classes will
					/// override this method to perform specific attachment tasks.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementAttached_p:element">
					/// An element which has been attached.
					/// </param>

					// Trace diagnostic message. Remove if not needed.
					// To turn traces on add following script to your HTML page:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: ++ <{0} uid={1}>", element.tagName, element.uniqueID);

					// Execute actions rigth away.
					this._execute();
				},

				onElementDetached: function (element) {
					/// <summary locid="VS.Behaviors.CustomBehavior.onElementDetached">
					/// Called before element is about to be detached from a behavior. This method will NOT be called
					/// if element has already been detached. Derived classes will override this method to perform
					/// specific detachment tasks.
					/// </summary>
					/// <param name="element" type="object" domElement="true" locid="VS.Behaviors.CustomBehavior.onElementDetached_p:element">
					/// An element which is about to be detached.
					/// </param>

					// Trace diagnostic message. Remove if not needed.
					// To turn traces on add following script to your HTML page:
					//   <script> VS.Util.isTraceEnabled = true; </script>
					VS.Util.trace("VS.Behaviors.CustomBehavior: -- <{0} uid={1}>", element.tagName, element.uniqueID);
				},

				_execute: function () {
					// TODO: add implementation.

					// Construct behavior specific behaviorData object. If not needed then remove behaviorData.
					var behaviorData = { data: this.myProperty };

					// Get all attached elements.
					var targetElements = this.getAattachedElements();

					// Execute all actions attached to this behavior on target elements.
					this.executeActions(targetElements, behaviorData);
				}
			},
			{ /* static members empty */ },
			{
				// Mandatory property metadata.
				type: { type: String },
				triggeredActions: { type: Array, elementType: VS.Actions.ActionBase },

				// For every new property added as <signature>/<property>, add its metadata here.
				//
				// Example:
				// -----------------
				myProperty: { type: Number }
			}
		)
	});
})(VS);