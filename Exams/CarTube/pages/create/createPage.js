import { createTemplate } from "./createTemplate.js";

let _render = undefined;
let _carsService = undefined;

function initialize(render, carsService) {
    _render = render;
    _carsService = carsService;
}

async function getView(ctx) {
    async function submitHandler(e) {
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
            && description.trim() !== ''
            && imageUrl.trim() !== ''
            && year > 0
            && price > 0) {
                let newCar = {
                    brand: brand,
                    model: model,
                    description: description,
                    imageUrl: imageUrl,
                    year: year,
                    price: price,
                };

                let createRes = await _carsService.create(newCar);

                ctx.page.redirect("/all-listings");
            }
    }

    let form = {
        submitHandler: submitHandler
    };

    let templateResult = createTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}