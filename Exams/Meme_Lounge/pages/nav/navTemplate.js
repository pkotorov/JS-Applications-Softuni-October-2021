import { html } from "../../node_modules/lit-html/lit-html.js";
import { ifDefined } from '../../node_modules/lit-html/directives/if-defined.js';

export let navTemplate = (userInfo, currentPath) => html`
  <a href="/all-memes" class=${ifDefined(currentPath === '/all-memes' ? 'active' : undefined)}>All Memes</a>
  
  ${userInfo.isLoggedIn
    ? html`
        <!-- Logged users -->
        <div class="user">
          <a href="/create" class=${ifDefined(currentPath === '/create' ? 'active' : undefined)}>Create Meme</a>
          <div class="profile">
            <span>Welcome, ${userInfo.email}</span>
            <a href="/my-profile" class=${ifDefined(currentPath === '/my-profile' ? 'active' : undefined)}>My Profile</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      `
    : html`
        <!-- Guest users -->
        <div class="guest">
          <div class="profile">
            <a href="/login" class=${ifDefined(currentPath === '/login' ? 'active' : undefined)}>Login</a>
            <a href="/register" class=${ifDefined(currentPath === '/register' ? 'active' : undefined)}>Register</a>
          </div>
          <a href="/" class=${ifDefined(currentPath === '/' ? 'active' : undefined)}>Home Page</a>
        </div>
      `}
`;
