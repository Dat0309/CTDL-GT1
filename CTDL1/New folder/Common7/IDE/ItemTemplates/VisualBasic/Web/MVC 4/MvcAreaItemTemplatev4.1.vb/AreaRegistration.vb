Namespace Areas.$AreaName$
    Public Class $AreaName$AreaRegistration
        Inherits AreaRegistration

        Public Overrides ReadOnly Property AreaName() As String
            Get
                Return "$AreaName$"
            End Get
        End Property

        Public Overrides Sub RegisterArea(ByVal context As System.Web.Mvc.AreaRegistrationContext)
            context.MapRoute( _
                "$AreaName$_default", _
               "$AreaName$/{controller}/{action}/{id}", _
                New With {.action = "Index", .id = UrlParameter.Optional} _
            )
        End Sub
    End Class
End Namespace

