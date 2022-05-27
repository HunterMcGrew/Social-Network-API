const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
} = require("../../controllers/user-Controller");


router.route("/").get(getUsers)
// .post(createUser);

module.exports = router;