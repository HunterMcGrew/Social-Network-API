const { ObjectId } = require("mongoose").Types;
const User = require("../models/User");
const Thought = require("../models/Thought");

// exports functions to routes/api
module.exports = {

    // get ALL thoughts
    getThoughts(req, res) {
        Thought.find()
        .then(data => res.json(data))
        .catch(err => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    // get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .select("-__v")
        .then(data => !data ? 
        res.status(404).json({ message: "No thought associated witht his id"}) :
        res.json(data))
        .catch(err => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    // create thought
    createThought(req, res) { 
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            );
        })
        .then(thoughtData =>  !thoughtData ? res.status(404).json({ message: "Problem while creating thought"}) :
        res.json(thoughtData)
        )
        .catch(err => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id }, 
            req.body, 
            { new: true, runValidators: true })
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .then(data => !data ? res.status(404).json({ message: "Thought not found"}) :
            res.json(data))
        .catch(err => {
            if (err) throw err; 
            res.status(500).json(err);
        })
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })    
        .then(data => !data ? res.status(404).json({ message: "Thought not found"}) :
        res.json(data))
        .catch(err => {
            if (err) throw err; 
            res.status(500).json(err);
        })
    },
    // add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            // pushes reactions array 
            { $push: { reactions: req.body }},
            { new: true, runValidators: true }
        )
        .populate({
            path: "reactions",
            select: "-__v"
        })
        .then(data => !data ? res.status(404).json({ message: "Thought not found"}) :
        res.json(data))
        .catch(err => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            // removes reactions array
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true }
        )
        .then(data => !data ? res.status(404).json({ message: "Not found with this ID"}) :
        res.json(data))
        .catch(err => {
            if (err) throw err;
            res.status(500).json(err);
        })
    },
    
};