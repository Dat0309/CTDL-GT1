Imports Owin

Public Partial Class Startup
    Public Sub Configuration(app As IAppBuilder)
        ConfigureAuth(app)
    End Sub
End Class
