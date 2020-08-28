const router = require("express").Router();
const userRoutes = require("./users");
const billRoutes = require("./bill");
const blogRoutes = require("./blog");
const surveyRoutes = require("./survey")


router.use("/users", userRoutes);
router.use("/bill",billRoutes);
router.use("/blog",blogRoutes);
router.use("/survey",surveyRoutes)

module.exports = router;
