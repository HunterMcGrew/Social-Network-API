const { isEmail } = require("validator");
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
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "thought"
    }],
    // needs to be an ARRAY with the OBJECT inside
    friends: [{
        
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;

// module.exports = mongoose.model("User", userSchema);