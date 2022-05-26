const { User } = require("../models");

module.exports = {

    getUsers(req, res) {
        User.find()
        // .populate({
        //     path: "thoughts",
        //     select: "-__v"
        // })
        // .populate({
        //     path: "friends",
        //     select: "-__v"
        // })
        .select("-__v")
        .sort({ _id: -1 })
        .then(userData => res.json(userData))
        .catch(err => {
            if (err) throw err;
            res.status(500).json(err);
        })
        
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .select("-__v")

}