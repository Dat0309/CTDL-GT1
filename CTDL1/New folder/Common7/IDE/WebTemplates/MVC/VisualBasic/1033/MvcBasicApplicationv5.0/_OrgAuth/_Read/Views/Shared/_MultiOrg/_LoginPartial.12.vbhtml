@If Request.IsAuthenticated
    @<text>
         <ul class="nav navbar-nav navbar-right">
            <li>
                @Html.ActionLink(User.Identity.Name, "UserProfile", "Home", routeValues := Nothing, htmlAttributes := Nothing)
            </li>
            <li>
                @Html.ActionLink("Sign out", "SignOut", "Account")
            </li>
        </ul>
    </text>
Else
    @<ul class="nav navbar-nav navbar-right">
        <li>@Html.ActionLink("Sign up for this application", "Index", "Tenant", routeValues := Nothing, htmlAttributes := New With { .id = "registerLink" })</li>
        <li>@Html.ActionLink("Sign in", "SignIn", "Account", routeValues := Nothing, htmlAttributes := New With { .id = "signLink" })</li>
    </ul>
End If