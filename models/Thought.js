// Define schema, model and type in mongoose object
const { Schema, model, Types } = require('mongoose');
//momentJs for time
const moment = require('moment');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: string,
            required: true,
            maxlenght: 280
        },
        username: {
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('YYYY-MM-DD')
        }

    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }

);


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlenght: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('YYYY-MM-DD')
        },
        username: {
            type: String,
            required: true
        },
        reactionId: [ReactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);