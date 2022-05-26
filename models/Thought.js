const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

function formatDate () {

    oldDate = this.createdAt;
    newDate = oldDate.toString();
    return newDate;
}

const Thought = model("thought", thoughtSchema);

module.exports = User;