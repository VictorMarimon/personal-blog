import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Article', articleSchema);
