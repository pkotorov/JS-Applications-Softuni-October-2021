import { editTemplate } from "./editTemplate.js";


let _render = undefined;
let _carsService = undefined;

function initialize(render, carsService) {
    _render = render;
    _carsService = carsService;
}

async function formSubmit(carId, ctx, e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let brand = form.get("brand");
    let model = form.get("model");
    let description = form.get("description");
    let imageUrl = form.get("imageUrl");
    let year = Number(form.get("year"));
    let price = Number(form.get("price"));

    if (brand.trim() !== ''
        && model.trim() !== ''
        && imageUrl.trim() !== ''
        && description.trim() !== ''
        && year > 0
        && price > 0) {
            let editCar = {
                brand: brand,
                model: model,
                description: description,
                imageUrl: imageUrl,
                year: year,
                price: price
            };

            let editRes = await _carsService.edit(carId, editCar);

            ctx.page.redirect("/details/" + carId);
        }
}

async function getView(ctx) {
    let carId = ctx.params.id;

    let car = await _carsService.getOne(carId);

    let boundEditHandler = formSubmit.bind(null, carId, ctx);

    let form = {
        submitHandler: boundEditHandler,
        values: {
            brand: car.brand,
            model: car.model,
            description: car.description,
            imageUrl: car.imageUrl,
            year: car.year,
            price: car.price,
        }
    };

    let templateResult = editTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}