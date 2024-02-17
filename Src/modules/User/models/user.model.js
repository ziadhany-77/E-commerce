import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
        trim: true
    },
    password: {
        type: String,
        // minLength: 8,
        // maxLength: 50,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
        required: true
    },
    isEmailVarified: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    },
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
    },
	{ timestamps: true }
)

userSchema.pre(/find/, function (next) {
    this.populate('wishList'),
    next()
})
const userModel = mongoose.model('User', userSchema)

export default userModel
