const express = require("express");
const router = express.Router();

// Require controller modules.
const game_controller = require("../controllers/gameController");
const studio_controller = require("../controllers/studioController");

///* GAME ROUTES ///

// GET catalog home page.
router.get("/", game_controller.index);

// GET request for creating a Game. NOTE This must come before routes that display Game (uses id).
router.get("/game/create", game_controller.game_create_get);

// POST request for creating Game.
router.post("/game/create", game_controller.game_create_post);

// GET request to delete Game.
router.get("/game/:id/delete", game_controller.game_delete_get);

// POST request to delete Game.
router.post("/game/:id/delete", game_controller.game_delete_post);

// GET request to update Game.
router.get("/game/:id/update", game_controller.game_update_get);

// POST request to update Game.
router.post("/game/:id/update", game_controller.game_update_post);

// GET request for one Game.
router.get("/game/:id", game_controller.game_detail);

// GET request for list of all Game items.
router.get("/games", game_controller.game_list);

///* STUDIO ROUTES ///

// GET request for creating Studio. NOTE This must come before route for id (i.e. display).
router.get("/studio/create", studio_controller.studio_create_get);

// POST request for creating Studio.
router.post("/studio/create", studio_controller.studio_create_post);

// GET request to delete Studio.
router.get("/studio/:id/delete", studio_controller.studio_delete_get);

// POST request to delete Studio.
router.post("/studio/:id/delete", studio_controller.studio_delete_post);

// GET request to update Studio.
router.get("/studio/:id/update", studio_controller.studio_update_get);

// POST request to update Studio.
router.post("/studio/:id/update", studio_controller.studio_update_post);

// GET request for one Studio.
router.get("/studio/:id", studio_controller.studio_detail);

// GET request for list of all Studios.
router.get("/studios", studio_controller.studio_list);

module.exports = router;