//------------------------------------------------------------------------------
// <copyright file="WebDataService.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------
using System;
using System.Data.Services;
using System.Data.Services.Common;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Web;

public class $safeitemname$ : DataService< /* TODO: put your data source class name here */ >
{
    // This method is called only once to initialize service-wide policies.
    public static void InitializeService($dataserviceconfig$ config)
    {
        // TODO: set rules to indicate which entity sets and service operations are visible, updatable, etc.
        // Examples:
        // config.SetEntitySetAccessRule("MyEntityset", EntitySetRights.AllRead);
        // config.SetServiceOperationAccessRule("MyServiceOperation", ServiceOperationRights.All);
        config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V3;
    }
}
