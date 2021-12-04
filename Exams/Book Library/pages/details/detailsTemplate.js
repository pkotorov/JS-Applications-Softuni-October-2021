import { html } from "../../node_modules/lit-html/lit-html.js";

export let detailsTemplate = (book, isOwner, deleteBookHandler, isLoggedIn, likesCount, likeHandler, userLike) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    ${isOwner 
                    ? html`
                        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                        <a class="button" href="/edit/${book._id}">Edit</a>
                        <a class="button" @click=${deleteBookHandler} href="javascript:void(0)">Delete</a>`
                    : ''}
                    ${isLoggedIn && !isOwner
                    ? html`
                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    ${userLike === 0 
                    ? html`<a class="button" @click=${likeHandler} href="#">Like</a>`
                    : ''}
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likesCount}</span>
                    </div>`
                    : html`
                    <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likesCount}</span>
                    </div>
                    <!-- Bonus -->`}
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
</section>
`;