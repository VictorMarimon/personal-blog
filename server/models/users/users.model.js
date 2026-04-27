import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

usersSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate();

    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }
});

usersSchema.pre('findOne', function () {
    // we only return the user that is not deleted (deletedAt is null)
    this.where({ deletedAt: null });
});

usersSchema.pre('find', function () {
    this.where({ deletedAt: null });
});

usersSchema.post('save', function (user) {
    // we remove the password from the response for security reasons
    user.password = undefined;
    user.deletedAt = undefined;
});

usersSchema.post('find', function (users) {
    if (!users) return;
    
    const rows = Array.isArray(users) ? users : [users];

    rows.forEach((user) => {
        // we remove the password from the response for security reasons
        user.password = undefined;
        user.deletedAt = undefined;
    });
});

export default mongoose.model('User', usersSchema);
