using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.EventReceivers;

namespace $rootnamespace$
{
    public class $safeitemrootname$ : IRemoteEventService
    {
$if$ ("$safeitemrootname$" == "AppEventReceiver")        /// <summary>
        /// $loc_service_comment1$
        /// </summary>
        /// <param name="properties">$loc_service_comment2$</param>
        /// <returns>$loc_service_comment3$</returns>
        public SPRemoteEventResult ProcessEvent(SPRemoteEventProperties properties)
        {
            SPRemoteEventResult result = new SPRemoteEventResult();

            using (ClientContext clientContext = TokenHelper.CreateAppEventClientContext(properties, useAppWeb: false))
            {
                if (clientContext != null)
                {
                    clientContext.Load(clientContext.Web);
                    clientContext.ExecuteQuery();
                }
            }

            return result;
        }

        /// <summary>
        /// $loc_service_comment4$
        /// </summary>
        /// <param name="properties">$loc_service_comment5$</param>
        public void ProcessOneWayEvent(SPRemoteEventProperties properties)
        {
            throw new NotImplementedException();
        }
$else$        /// <summary>
        /// $loc_service_comment6$
        /// </summary>
        /// <param name="properties">$loc_service_comment7$</param>
        /// <returns>$loc_service_comment8$</returns>
        public SPRemoteEventResult ProcessEvent(SPRemoteEventProperties properties)
        {
            SPRemoteEventResult result = new SPRemoteEventResult();

            using (ClientContext clientContext = TokenHelper.CreateRemoteEventReceiverClientContext(properties))
            {
                if (clientContext != null)
                {
                    clientContext.Load(clientContext.Web);
                    clientContext.ExecuteQuery();
                }
            }

            return result;
        }

        /// <summary>
        /// $loc_service_comment9$
        /// </summary>
        /// <param name="properties">$loc_service_comment10$</param>
        public void ProcessOneWayEvent(SPRemoteEventProperties properties)
        {
            using (ClientContext clientContext = TokenHelper.CreateRemoteEventReceiverClientContext(properties))
            {
                if (clientContext != null)
                {
                    clientContext.Load(clientContext.Web);
                    clientContext.ExecuteQuery();
                }
            }
        } $endif$
    }
}
