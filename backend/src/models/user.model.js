const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            requiered: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'customer'],
            default: 'customer',
        }
    },
    {
        timestamps: true
    }
)
;
const User = mongoose.model('User', userSchema);

module.exports = User;
