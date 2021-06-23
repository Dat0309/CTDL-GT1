<%@ Page Title="User Info" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="true" Async="true" CodeBehind="UserInfo.aspx.vb" Inherits="$safeprojectname$.UserInfo" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <asp:FormView ID="UserData" runat="server" ItemType="$safeprojectname$.Models.UserProfile" RenderOuterTable="false" DefaultMode="ReadOnly"
        ViewStateMode="Disabled">
        <ItemTemplate>
            <table class="table table-bordered table-striped">                
                <tr>
                    <td>Display Name</td>
                    <td><%#: Item.DisplayName %></td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td><%#: Item.GivenName %></td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td><%#: Item.SurName %></td>
                </tr>
            </table>
        </ItemTemplate>
    </asp:FormView>
</asp:Content>
