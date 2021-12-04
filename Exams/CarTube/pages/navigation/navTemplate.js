import { html } from "../../node_modules/lit-html/lit-html.js";

export let navTemplate = (userInfo) => html`
<!-- Navigation -->
<header>
    <nav>
        <a class="active" href="/">Home</a>
        <a href="/all-listings">All Listings</a>
        <a href="/all-listings-by-year">By Year</a>
        ${!userInfo.isLoggedIn
        ? html`
            <!-- Guest users -->
            <div id="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`
        : html`
            <!-- Logged users -->
            <div id="profile">
                <a>Welcome ${userInfo.username}</a>
                <a href="/my-listings">My Listings</a>
                <a href="/create">Create Listing</a>
                <a href="/logout">Logout</a>
            </div>`}
    </nav>
</header>
`