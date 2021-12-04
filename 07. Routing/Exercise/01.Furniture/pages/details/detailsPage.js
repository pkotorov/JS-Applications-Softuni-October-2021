import authService from "../../services/authService.js";
import furnitureService from "../../services/furnitureService.js";
import { detailsTemplate } from "./detailsTemplate.js";

async function deleteItem(context) {
    let confirmed = confirm('Are you sure you want to delete that item?');
    if (confirmed) {
        let id = context.params.id;
        let deleteResponse = await furnitureService.deleteItem(id);

        context.page.redirect('/dashboard');
    }
}

async function getView(context) {
    let id = context.params.id;
    let furniture = await furnitureService.get(id);
    let userId = authService.getUserId();
    furniture.isOwner = userId === furniture._ownerId;

    let boundDeleteHandler = deleteItem.bind(null, context);
    furniture.delete = boundDeleteHandler;
    let templateResult = detailsTemplate(furniture);
    context.renderView(templateResult);
}

export default {
    getView,
}