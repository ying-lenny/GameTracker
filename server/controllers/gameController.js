const { body, validationResult } = require("express-validator");
const Game = require("../models/game");
const Studio = require("../models/studio");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [
    numGames,
    numAvailableGames,
    numStudios,
  ] = await Promise.all([
    Game.countDocuments({}).exec(),
    Game.countDocuments({ status: "Released" }).exec(),
    Studio.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Game Inventory",
    game_count: numGames,
    game_released_count: numAvailableGames,
    studio_count: numStudios,
  });
});

//* Read
// Display list of all games.
exports.game_list = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find({}, "title studio release_date")
    .sort({ title: 1 })
    .populate("studio")
    .exec();

  res.render("game_list", { title: "Game List", game_list: allGames });
});

// Display detail page for a specific game.
exports.game_detail = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
    const game = await Game.findById(req.params.id)
    .populate("studio")
    .exec();

  if (game === null) {
    // No results.
    const err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }

  res.render("game_detail", {
    title: game.title,
    game: game,
  });
});

//* Create
// Display game create form on GET.
exports.game_create_get = asyncHandler(async (req, res, next) => {
  const allStudios = await Studio.find({}, "studio_name").exec();

  res.render("game_form", { 
    title: "Create Game",
    studio_list: allStudios,
  });
});

// Handle game create on POST.
exports.game_create_post = [
  // Validate and sanitize the name field.
  body("title", "Game Title must not be blank")
    .trim()
    .isLength({ min: 1 }),
  body("studio", "Game Studio must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Game Summary must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("rating", "Game rating must be numerical if used")
    .trim()
    .isNumeric(),
  body("release_date", "Must be an actual date")
    .trim()
    .isISO8601()
    .toDate(),
  body("status").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a game object with escaped and trimmed data.
    const game = new Game({ 
      title: req.body.title,
      studio: req.body.studio,
      summary: req.body.summary,
      rating: req.body.rating,
      release_date: req.body.release_date,
      status: req.body.status,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      const allStudios = await Studio.find({}, "studio_name").exec();
      
      res.render("game_form", {
        title: "Create Game",
        game: game,
        studio_list: allStudios,
        errors: errors.array(),
      });
      return;
    } else {
        await game.save();
        res.redirect(game.url);
    }
  }),
];

//* Delete
// Display game delete form on GET.
exports.game_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of game
  const [ game, studio ] = await Promise.all([
    Game.findById(req.params.id).exec(),
    Studio.countDocuments({}).exec(),
  ]);

  if (game === null) {
    // No results.
    res.redirect("/catalog/games");
  }

  // Successful, so render
  res.render("game_delete", {
    title: "Delete Game",
    game: game,
    studio: studio
  });
});

// Handle game delete on POST.
exports.game_delete_post = asyncHandler(async (req, res, next) => {
  // Delete Game
  await Game.findByIdAndRemove(req.body.gameid);
  res.redirect("/catalog/games");
});

//* Update
// Display game update form on GET.
exports.game_update_get = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances for specific book
  const [ game, allStudios ] = await Promise.all([
    Game.findById(req.params.id).populate("studio").exec(),
    Studio.find().exec(),
  ]);
  if (err) {
    return next(err);
  }

  if (game === null) {
    // No results.
    var err = new Error("Game not found");
    err.status = 404;
    return next(err);
  }

  res.render("game_form", {
    title: "Update Game Details",
    game: game,
    studio_list: allStudios
  });
});

// Handle game update on POST.
exports.game_update_post = [
  // Validate and sanitize the name field.
  body("title", "Game Title must not be blank")
    .trim()
    .isLength({ min: 1 }),
  body("studio", "Game Studio must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Game Summary must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("rating", "Game rating must be numerical if used")
    .trim()
    .optional()
    .isNumeric(),
  body("release_date", "Must be an actual date")
    .trim()
    .isISO8601()
    .toDate(),
  body("status").escape(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a game object with escaped and trimmed data.
    const game = new Game({ 
      title: req.body.title,
      studio: req.body.studio,
      summary: req.body.summary,
      rating: req.body.rating,
      release_date: req.body.release_date,
      status: req.body.status,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      const allStudios = await Studio.find().exec();
      
      res.render("game_form", {
        title: "Update Game",
        game: game,
        studio_list: allStudios,
        errors: errors.array(),
      });
      return;
    } else {
        const thegame = await Game.findByIdAndUpdate(req.params.id, game, {});
        res.redirect(thegame.url);
    }
  }),
];
