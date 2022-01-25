const { Schema, model } = require('mongoose');
const moment = require('moment');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            typw: string,
            unique: true,
            required: true,
            match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
        },
        thoughts: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            { 
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            //getters: true
        },
        id: false
    }
);
// Create User model
const User = model('User', UserSchema);

UserSchema.virtuals('friendCount').get(function() {
    return this.friend.length;
})

module.exports = User;