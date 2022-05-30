const router = require("express").Router();

// import thought-controller functions
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-Controller");

// api/thoughts
router.route("/").get(getThoughts);

// api/thoughts/:id
router.route("/:id")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/:userId
router.route("/:userId/").post(createThought);

// api/thoughts/:THOUGHTid/reactions
router.route("/:id/reactions").post(addReaction);

// api/thoughts/:THOUGHTid/:reactionId
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;