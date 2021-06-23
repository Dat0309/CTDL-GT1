Imports System.Web.Mvc
Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports $testprojectnamespace$

<TestClass()> Public Class HomeControllerTest
    <TestMethod()> Public Sub Index()
        'Arrange
        Dim controller As New HomeController()

        'Act
        Dim result As ViewResult = DirectCast(controller.Index(), ViewResult)

        'Assert
        Assert.IsNotNull(result)
        Dim viewData As ViewDataDictionary = result.ViewData
        Assert.AreEqual("Home Page", viewData("Title"))
    End Sub
End Class
