const { Schema, model, Types } = require('mongoose');
// const ReactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxLength: 280
    },
    username: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        get:(CreatedAtVal) => dateFormat(CreatedAtVal)
    }
}, 
{
    toJSON: {
        getters: true
    },
    id: false
}
);

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String, 
        required: 'Please enter your thoughts here!',
        // min and max lengths
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String, 
        required: true
    },
    // array of nested docs
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true, 
        getters: true
    },
    id: false
}
);


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;