import authService from "../../services/authService.js";
import furnitureService from "../../services/furnitureService.js";
import { allMyFurnituresTemplate } from './myFurnitureTemplate.js';


async function getView(context) {
    let userId = authService.getUserId();
    let myFurnitures = await furnitureService.getAllMyItems(userId);
    let templateResult = allMyFurnituresTemplate(myFurnitures);
    context.renderView(templateResult);
}

export default {
    getView,
};