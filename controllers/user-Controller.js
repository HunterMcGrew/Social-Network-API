const { ObjectId } = require("mongoose").Types;
const User = require("../models/User");
const Thought = require("../models/Thought");


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
        then(async (userData) => !userData ? 
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
        User.create(req,body)
        then((userData) => res.json(userData))
        .catch((err) => {
            if (err) throw err;
            return res.status(500).json(err);
        })
    },
    // delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((userData) => 
        !userData ? res.status(404).json({ message: "That user doesn't exist" })
        : res.status(200).json(userData))
        .catch((err) => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    // update user patch not put? so it ONLY updates new info?

    // add friend

    // delete friend

    



}



// module.exports = {

//     getUsers(req, res) {
//         User.find()
//         // .populate({
//         //     path: "thoughts",
//         //     select: "-__v"
//         // })
//         // .populate({
//         //     path: "friends",
//         //     select: "-__v"
//         // })
//         .select("-__v")
//         // .sort({ _id: -1 })
//         .then(userData => res.json(userData))
//         .catch(err => {
//             if (err) throw err;
//             res.status(500).json(err);
//         })
        
//     },
//     getSingleUser(req, res) {
//         User.findOne({ _id: req.params.userId })
//         .populate({
//             path: "thoughts",
//             select: "-__v"
//         })
//         .populate({
//             path: "friends",
//             select: "-__v"
//         })
//         .select("-__v")

//     },
// };