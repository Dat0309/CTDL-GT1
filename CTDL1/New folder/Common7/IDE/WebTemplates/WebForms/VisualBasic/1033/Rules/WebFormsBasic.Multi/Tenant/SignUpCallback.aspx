<%@ Page Title="Welcome" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SignUpCallback.aspx.vb" Inherits="$safeprojectname$.Tenant.SignUpCallback" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <div>
        <h4>Sign up successful.</h4>
        <hr />
        <p>
            This application is now provisioned in your Windows Azure Active Directory tenant.
            The users of your organization's Active Directory can sign in with their accounts. Please sign in to use this application.
        </p>
        <p>
            You can revoke access to this app at any time, by accessing your Windows Azure Active Directory tenant in the Windows Azure portal.
        </p>
        <asp:Button ID="Button1" runat="server" name="submit" value="Sign In" Text="Sign In" class="btn btn-default" OnClick="SignIn_Click" />
    </div>
</asp:Content>
