import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate();

    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }
});

userSchema.pre('find', function () {
    // we only return the users that are not deleted (deletedAt is null)
    this.where({ deletedAt: null });
});

userSchema.post('save', function (doc) {
    // we remove the password from the response for security reasons
    doc.password = undefined;
    doc.deletedAt = undefined;
});

userSchema.post('find', function (docs) {
    if (!docs) return;
    
    const rows = Array.isArray(docs) ? docs : [docs];

    rows.forEach(doc => {
        // we remove the password from the response for security reasons
        doc.password = undefined;
        doc.deletedAt = undefined;
    });
});

export default mongoose.model('User', userSchema);
