const { body, validationResult } = require("express-validator");
const Studio = require("../models/studio");
const Game = require("../models/game");
const { DateTime } = require("luxon");
const asyncHandler = require("express-async-handler");

//* Read
// Display list of all Studios.
exports.studio_list = asyncHandler(async (req, res, next) => {
  const allStudios = await Studio.find().sort({ studio_name: 1 }).exec();
  res.render("studio_list", {
    title: "Studio List",
    studio_list: allStudios,
  });
});

// Display detail page for a specific Studio.
exports.studio_detail = asyncHandler(async (req, res, next) => {
  // Get details of studio and all their games (in parallel)
  const [studio, allGamesByStudio] = await Promise.all([
    Studio.findById(req.params.id).exec(),
    Game.find({ studio: req.params.id }, "title summary release_date").exec(),
  ]);

  if (studio === null) {
    // No results.
    const err = new Error("Studio not found");
    err.status = 404;
    return next(err);
  }

  res.render("studio_detail", {
    title: "Studio Detail",
    studio: studio,
    studio_games: allGamesByStudio,
});});

//* Create
// Display Studio create form on GET.
exports.studio_create_get = asyncHandler(async (req, res, next) => {
  res.render("studio_form", { title: "Create Studio" });
});

// Handle Studio create on POST.
exports.studio_create_post = [
  // Validate and sanitize fields.
  body("studio_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Studio Name must be specified."),
  body("staff_count")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("Input must be numerical"),
  body("location")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Location must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("website")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Website must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const studio = new Studio({
      studio_name: req.body.studio_name,
      staff_count: req.body.staff_count,
      location: req.body.location,
      website: req.body.website,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("studio_form", {
        title: "Create Studio",
        studio: studio,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save studio.
      await studio.save();
      // Redirect to new studio record.
      res.redirect(studio.url);
    }
  }),
];

//* Delete
// Display Studio delete form on GET.
exports.studio_delete_get = asyncHandler(async (req, res, next) => {
  // Get details of studio and all their games (in parallel)
  const [studio, allGamesByStudio] = await Promise.all([
    Studio.findById(req.params.id).exec(),
    Game.find({ studio: req.params.id }, "title summary release_date").exec(),
  ]);

  if (studio === null) {
    // No results.
    res.redirect("/catalog/studios");
  }

  res.render("studio_delete", {
    title: "Delete Studio",
    studio: studio,
    studio_games: allGamesByStudio,
  });
});

// Handle Studio delete on POST.
exports.studio_delete_post = asyncHandler(async (req, res, next) => {
  // Get details of studio and all their games (in parallel)
  const [studio, allGamesByStudio] = await Promise.all([
    Studio.findById(req.params.id).exec(),
    Game.find({ studio: req.params.id }, "title summary release_date").exec(),
  ]);

  if (allGamesByStudio.length > 0) {
    // Studio has games. Render in same way as for GET route.
    res.render("studio_delete", {
      title: "Delete Studio",
      studio: studio,
      studio_games: allGamesByStudio,
    });
    return;
  } else {
    // Author has no games. Delete object and redirect to the list of studio.
    await Studio.findByIdAndRemove(req.body.studioid);
    res.redirect("/catalog/studios");
  }
});

//* Update
// Display Studio update form on GET.
exports.studio_update_get = asyncHandler(async (req, res, next) => {
  // Get form for studio
  const studio = await Studio.findById(req.params.id).exec();
  if (err) {
    return next(err);
  }

  if (studio === null) {
    // No results.
    var err = new Error("Studio not found");
    err.status = 404;
    return next(err);
  }

  res.render("studio_form", {
    title: "Update Studio Details",
    studio: studio
  });
});

// Handle Studio update on POST.
exports.studio_update_post = [
  // Validate and sanitize fields.
  body("studio_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Studio Name must be specified."),
  body("staff_count")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("Input must be numerical"),
  body("location")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Location must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("website")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Website must be specified."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const studio = new Studio({
      studio_name: req.body.studio_name,
      staff_count: req.body.staff_count,
      location: req.body.location,
      website: req.body.website,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("studio_form", {
        title: "Create Studio",
        studio: studio,
        errors: errors.array(),
      });
      return;
    } else {
      //Update Studio with valid data
      const thestudio = await Studio.findByIdAndUpdate(req.params.id, studio, {});
      // Redirect to the studio record.
      res.redirect(thestudio.url);
    }
  }),
];