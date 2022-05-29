const { ObjectId } = require("mongoose").Types;
const User = require("../models/User");
const Thought = require("../models/Thought");

// exports functions to routes/api
module.exports = {
    // get all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userData = {
                users,
            };
            return res.json(userData);
        })
        .catch((err) => {
            if (err) throw err;
            return res.status(500).json(err);
        })
    },
    // get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .then((userData) => !userData ? 
        res.status(404).json({ message: "No user with that ID"}) 
        : res.json({ userData })
        )
        .catch((err) => {
            if (err) throw err;
            return res.status(500).json(err);
        })
    },
    // create new user
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => {
            if (err) throw err;
            return res.status(500).json(err);
        })
    },
    // delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.id })
        .then((userData) => 
        !userData ? res.status(404).json({ message: "That user doesn't exist" })
        : res.status(200).json(userData))
        .catch((err) => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    // update user patch not put? so it ONLY updates new info?
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id })
        .then((userData) =>
        !userData ? res.status(404).json({ message: "That user doesn't exist"})
        : res.status(200).json(userData))
        .catch((err) => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    // add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            // find user by user id
            { _id: params.id },
            // push the array of "friends" 
            { $push: { friends: params.friendId }},
            // runValidators makes sure required fields ARE there 
            { new: true, runValidators: true }
        )
        .populate({
            path: "friends",
            select: ("-__v")
        })
        .select("-__v")
        .then(userData => !userData ? res.status(404).json({ message: "That user doesn't exist"})
        : res.json(userData))
        .catch((err) => {
            if (err) throw err;
            res.statu(500).json(err);
        })
    },
    // delete friend
    deleteFriend(req, res) {
        User.findOneAndDelete(
            // find user by ID
            { _id: params.id },
            // pull removes itmes from an array
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .populate({
            path: "friends",
            select: ("-__v")
        })
        .then(userData => !userData ? res.status(404).json({ message: "That user doesn't exist"})
        : res.json(userData))
        .catch((err) => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },

};
