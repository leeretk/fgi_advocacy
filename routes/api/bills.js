const router = require("express").Router();
const billController = require("../../controllers/billController");


// Matches with "/api/workouts"
router.route("/")
    .get(billController.findAll)

router.route("/:name")
    .post(billController.create)

// Matches with "/api/workouts/:id"
router
    .route("/:id")
    .get(billController.findById)
    .put(billController.submitScore)
    .delete(billController.remove);

router.route("/:createdBy/:date")
    .get(billController.getWOD)





module.exports = router;
