@Code
    ViewBag.Title = "Sign Up"
End Code

<h2>@ViewBag.Title.</h2>

@Using Html.BeginForm("SignUp", "Tenant", FormMethod.Post, New With {.class = "form-horizontal", .role = "form"})
    @<text>
    <h4>Start using this application in your organization.</h4>
    <hr />
    @Html.ValidationSummary(True, "", New With {.class = "text-danger"})
    <p>
        Sign up as an administrator to enable your organization's users to use this application.
        Click Sign Up to log into the Windows Azure portal and grant consent for the application to access your organization's directory.
    </p>
    <input type="submit" name="submit" value="Sign Up" class="btn btn-default" />
    </text>
End Using
