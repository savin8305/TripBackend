import { handleTripDataPost, getData} from "./controllers/tripController.js";

export function setupRoutes(app) {
    app.post("/tripData", handleTripDataPost);
    app.get("/getdata", getData);
}
