const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    group: { type: String, required: true, trim: true },
    productId: { type: String, required: true, trim: true },
    color: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        hexcode: {
            type: String,
            trim: true
        }
    },
    size: { type: String, required: true, trim: true },
    logoUrl: {
        type: String, trim: true, default: null
    },
    logoPosition: {
        type: String, trim: true, default: null
    }
});

const cartItemSchema = new mongoose.Schema({
    group: { type: String, required: true, trim: true },
    productId: { type: String, required: true, trim: true },
    color: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        hexcode: {
            type: String,
            trim: true
        }
    },
    size: { type: String, required: true, trim: true },
    quantityRequired: { type: Number, required: true, min: 1 },
    logoUrl: {
        type: String, trim: true, default: null
    },
    logoPosition: {
        type: String, trim: true, default: null
    }
});

const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'address name is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'city is required'],
        trim: true
    },
    pinCode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true
    },
    state: {
        type: String,
        trim: true,
        required: [true, 'state is required'],
    },
    country: {
        type: String,
        required: [true, 'country is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    markAsDefault: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['MALE', 'FEMALE', 'OTHER']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    addresses: [addressSchema],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    quotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' }],
    cart: [cartItemSchema], // Adding the cart as an array of cartItemSchema
    wishlist: [wishlistItemSchema]
});

module.exports = mongoose.model("User", userSchema);



