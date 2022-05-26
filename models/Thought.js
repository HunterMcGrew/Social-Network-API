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
        get: (createdAtVal) => Date.prototype.toLocaleTimeString("en-GB", {timeZone: "UTC"})
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
}
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
})

// thoughtSchema.virtual("")
// function formatDate () {

//     oldDate = this.createdAt;
//     newDate = oldDate.toString();
//     return newDate;
// }

const Thought = model("thought", thoughtSchema);

module.exports = User;