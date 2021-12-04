import { html } from "../../node_modules/lit-html/lit-html.js";

export let navTemplate = (userInfo) => html`
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/dashboard">Dashboard</a>
        ${userInfo.isLoggedIn 
        ? html`
            <!-- Logged-in users -->
            <div id="user">
                <span>Welcome, ${userInfo.userEmail}</span>
                <a class="button" href="/my-books">My Books</a>
                <a class="button" href="/add-book">Add Book</a>
                <a class="button" href="/logout">Logout</a>
            </div>`
        : html`
            <!-- Guest users -->
            <div id="guest">
                <a class="button" href="/login">Login</a>
                <a class="button" href="/register">Register</a>
            </div>`}
    </section>
</nav>
`;