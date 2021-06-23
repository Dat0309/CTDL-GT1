Imports Microsoft.Azure.WebJobs

' To learn more about Microsoft Azure WebJobs SDK, please see http://go.microsoft.com/fwlink/?LinkID=320976
Module $safeitemname$

    ' Please set the following connection strings in app.config for this WebJob to run:
    ' AzureWebJobsDashboard and AzureWebJobsStorage
    Sub Main()
        Dim host As New JobHost()
        ' The following code will invoke a function called ManualTrigger and 
        ' pass in data (value in this case) to the function
        host.Call(GetType(Functions).GetMethod("ManualTrigger"), New With {
            .value = 20
        })
    End Sub

End Module
