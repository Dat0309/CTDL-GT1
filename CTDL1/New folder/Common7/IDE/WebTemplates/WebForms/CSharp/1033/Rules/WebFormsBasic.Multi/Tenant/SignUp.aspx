<%@ Page Title="Sign Up" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SignUp.aspx.cs" Inherits="$safeprojectname$.Tenant.SignUp" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <div>
        <h4>Start using this application in your organization.</h4>
        <hr />
        <p>
            Sign up as an administrator to enable your organization's users to use this application.
            Click Sign Up to log into the Windows Azure portal and grant consent for the application to access your organization's directory.
        </p>
        <asp:Button runat="server" name="submit" value="Sign Up" Text="Sign Up" class="btn btn-default" OnClick="SignUp_Click" />
    </div>
</asp:Content>
