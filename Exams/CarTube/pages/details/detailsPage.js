import { detailsTemplate } from "./detailsTemplate.js";

let _render = undefined;
let _carsService = undefined;
let _authService = undefined;

function initialize(render, carsService, authService) {
    _render = render;
    _carsService = carsService;
    _authService = authService;
}

async function deleteGame(ctx, carId) {
    let confirmed = confirm("Are you sure you want to delete the car?");

    if (confirmed) {
        let deleteRes = await _carsService.deleteCar(carId);

        ctx.page.redirect("/all-listings");
    }
}

async function getView(ctx) {
    let carId = ctx.params.id;

    let car = await _carsService.getOne(carId);

    let isOwner = _authService.getUserId() === car._ownerId;

    let boundDeleteClickHandler = deleteGame.bind(null, ctx, carId);

    let templateResult = detailsTemplate(car, isOwner, boundDeleteClickHandler);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}