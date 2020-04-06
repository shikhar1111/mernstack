const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        minlength: 1
    },
    last_name: {
        type: String,
        trim: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    user_info: {
        type: String,
        trim: true
    },
    encrypted_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
},{timestamps:true});

userSchema.virtual("password")

    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encrypted_password = this.securePassword(password);
    })

    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plain_password) {
        return this.securePassword(plain_password) === this.encrypted_password
    },
    securePassword: function (plain_password) {
        if (!plain_password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plain_password)
                .digest('hex');

        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
