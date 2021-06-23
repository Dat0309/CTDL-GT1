@ModelType UserProfile

@Code
    ViewBag.Title = "User Profile"
End Code

<h2>@ViewBag.Title.</h2>

<table class="table table-bordered table-striped">
    <tr>
        <td>Display Name</td>
        <td>@Model.DisplayName</td>
    </tr>
    <tr>
        <td>First Name</td>
        <td>@Model.GivenName</td>
    </tr>
    <tr>
        <td>Last Name</td>
        <td>@Model.Surname</td>
    </tr>
</table>