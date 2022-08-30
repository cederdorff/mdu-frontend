// === IMPORTS === //
import Controller from "./controllers/controller.js";
import Model from "./models/model.js";
import View from "./views/view.js";

// === INITIALIZE APP === //
function initApp() {
    const model = new Model();
    const controller = new Controller();
    const view = new View(controller);
    controller.initialize(model, view);
}

initApp();
