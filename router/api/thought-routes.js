const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  createReactions,
  deleteReactions,
} = require("../../controllers/thought-controller");

//GET/POST /api/thoughts

router.route("/").get(getAllThoughts).post(createThoughts);
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThoughts)
  .delete(deleteThoughts);

router.route("/:thoughtId/reactions").post(createReactions);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReactions);
module.exports = router;
