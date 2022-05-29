const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require("../../controllers/user-Controller");

// "/api/users/"
router.route("/")
.get(getUsers)
.post(createUser);

// "/api/users/:id"
router.route("/:id")
.get(getSingleUser)
.delete(deleteUser)
.patch(updateUser);

// "/api/users/:id/:friendId"
router.route("/:id/friends/:friendId")
.put(addFriend)
.delete(deleteFriend);

module.exports = router;