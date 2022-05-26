const validator = require("validator");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [ isEmail, "invalid email" ]
    },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: "thought"
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: "friend"
    }
},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;