import { html } from "../../node_modules/lit-html/lit-html.js";

let commentTemplate = (comment) => html`
<!-- list all comments for current game (If any) -->
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>
`

export let detailsTemplate = (game, userInfo, deleteClickHandler, comments, commentSubmitHandler) => html`
<!--Details Page-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="${game.imageUrl}" />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
            ${game.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length !== 0
            ? html`
                <ul>
                    ${comments.map(c => commentTemplate(c))}
                </ul>`
            : html`
                <!-- Display paragraph: If there are no games in the database -->
                <p class="no-comment">No comments.</p>`}
        </div>

        ${userInfo.isOwner 
        ? html`
        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a href="javascript:void(0)" class="button" @click=${deleteClickHandler}>Delete</a>
        </div>`
        : ''}
        
    </div>
    
    ${!userInfo.isOwner && userInfo.isLoggedIn
    ? html`
        <!-- Bonus -->
        <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
        <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${commentSubmitHandler}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`
    : ''}
</section>
`