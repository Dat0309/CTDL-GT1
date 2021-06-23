Option Strict Off
Option Explicit On

Partial Class $safeitemrootname$
    Inherits Microsoft.Office.Tools.Outlook.ImportedFormRegionBase

$importedcontrolsdeclaration$
    Public Sub New(ByVal formRegion As Microsoft.Office.Interop.Outlook.FormRegion)
        MyBase.New(Globals.Factory, formRegion)
    End Sub

    <System.Diagnostics.DebuggerStepThrough()> _
    Protected Overrides Sub InitializeControls()
$importedcontrolsinitialization_v4$
    End Sub

    Partial Public Class $safeitemrootname$Factory
        Implements Microsoft.Office.Tools.Outlook.IFormRegionFactory

        Public Event FormRegionInitializing As Microsoft.Office.Tools.Outlook.FormRegionInitializingEventHandler

        Private _Manifest As Microsoft.Office.Tools.Outlook.FormRegionManifest

        <System.Diagnostics.DebuggerNonUserCodeAttribute()> _
        Public Sub New()
            Me._Manifest = Globals.Factory.CreateFormRegionManifest()
            Me.InitializeManifest()
        End Sub

        <System.Diagnostics.DebuggerNonUserCodeAttribute()> _
        ReadOnly Property Manifest() As Microsoft.Office.Tools.Outlook.FormRegionManifest Implements Microsoft.Office.Tools.Outlook.IFormRegionFactory.Manifest
            Get
                Return Me._Manifest
            End Get
        End Property

        <System.Diagnostics.DebuggerNonUserCodeAttribute()> _
        Function CreateFormRegion(ByVal formRegion As Microsoft.Office.Interop.Outlook.FormRegion) As Microsoft.Office.Tools.Outlook.IFormRegion Implements Microsoft.Office.Tools.Outlook.IFormRegionFactory.CreateFormRegion
            Dim form as $safeitemrootname$ = New $safeitemrootname$(formRegion)
            form.Factory = Me
            Return form
        End Function

        <System.Diagnostics.DebuggerNonUserCodeAttribute()> _
        Function GetFormRegionStorage(ByVal outlookItem As Object, ByVal formRegionMode As Microsoft.Office.Interop.Outlook.OlFormRegionMode, ByVal formRegionSize As Microsoft.Office.Interop.Outlook.OlFormRegionSize) As Byte() Implements Microsoft.Office.Tools.Outlook.IFormRegionFactory.GetFormRegionStorage
            Dim resources As System.Resources.ResourceManager = New System.Resources.ResourceManager(GetType($safeitemrootname$))
            Return CType(resources.GetObject($ofsresourcename$), Byte())
        End Function

        <System.Diagnostics.DebuggerNonUserCodeAttribute()> _
        Function IsDisplayedForItem(ByVal outlookItem As Object, ByVal formRegionMode As Microsoft.Office.Interop.Outlook.OlFormRegionMode, ByVal formRegionSize As Microsoft.Office.Interop.Outlook.OlFormRegionSize) As Boolean Implements Microsoft.Office.Tools.Outlook.IFormRegionFactory.IsDisplayedForItem
            Dim cancelArgs As Microsoft.Office.Tools.Outlook.FormRegionInitializingEventArgs = Globals.Factory.CreateFormRegionInitializingEventArgs(outlookItem, formRegionMode, formRegionSize, False)
            cancelArgs.Cancel = False
            RaiseEvent FormRegionInitializing(Me, cancelArgs)
            Return Not cancelArgs.Cancel
        End Function

        <System.Diagnostics.DebuggerNonUserCodeAttribute()> _
        ReadOnly Property Kind() As Microsoft.Office.Tools.Outlook.FormRegionKindConstants Implements Microsoft.Office.Tools.Outlook.IFormRegionFactory.Kind
            Get
                Return Microsoft.Office.Tools.Outlook.FormRegionKindConstants.Ofs
            End Get
        End Property
    End Class

End Class

Partial Class WindowFormRegionCollection

    Friend ReadOnly Property $safeitemrootname$() As $safeitemrootname$
        Get
            For Each Item As Object In Me
                If (TypeOf (Item) Is $safeitemrootname$) Then
                    Return Item
                End If
            Next
            Return Nothing
        End Get
    End Property
End Class