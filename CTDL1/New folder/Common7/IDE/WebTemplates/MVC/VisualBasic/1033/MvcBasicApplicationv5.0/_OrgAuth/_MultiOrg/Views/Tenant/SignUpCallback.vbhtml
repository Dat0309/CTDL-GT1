@Code
    ViewBag.Title = "Welcome"
End Code

<h2>@ViewBag.Title.</h2>

@Using Html.BeginForm("SignIn", "Account", FormMethod.Post, New With {.class = "form-horizontal", .role = "form"})
    @<text>
    <h4>Sign up successful.</h4>
    <hr />
    @Html.ValidationSummary(True, "", New With {.class = "text-danger"})
    <p>
        This application is now provisioned in your Windows Azure Active Directory tenant.
        The users of your Active Directory can sign in with their directory accounts. Please sign in to use this application.
    </p>
    <p>
        You can revoke access to this app at any time, by accessing your Windows Azure Active Directory tenant in the Windows Azure portal.
    </p>
    <input type="submit" name="submit" value="Sign In" class="btn btn-default" />
    </text>
End Using
