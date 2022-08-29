// === IMPORTS === //
import Controller from "./controllers/controller.js";
import Model from "./model/model.js";
import View from "./view/view.js";

// === INITIALIZE APP === //
function initApp() {
    const model = new Model();
    const controller = new Controller();
    const view = new View(controller);
    controller.initialize(model, view);
}

initApp();
