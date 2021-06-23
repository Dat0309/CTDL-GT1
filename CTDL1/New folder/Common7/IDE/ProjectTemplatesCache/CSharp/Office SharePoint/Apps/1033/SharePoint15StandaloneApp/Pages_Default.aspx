<%-- $loc_pages_default_aspx_comment1$ --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=$ServerReferenceVersion$.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=$ServerReferenceVersion$.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=$ServerReferenceVersion$.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=$ServerReferenceVersion$.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- $loc_pages_default_aspx_comment2$ --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../$JQueryMinJsPath$"></script>
    <script type="text/javascript" src="/$VersionedLayoutsPath$sp.runtime.js"></script>
    <script type="text/javascript" src="/$VersionedLayoutsPath$sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- $loc_pages_default_aspx_comment3$ -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- $loc_pages_default_aspx_comment4$ -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- $loc_pages_default_aspx_comment5$ --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- $loc_pages_default_aspx_comment7$ --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- $loc_pages_default_aspx_comment8$ -->
            initializing...
        </p>
    </div>

</asp:Content>
