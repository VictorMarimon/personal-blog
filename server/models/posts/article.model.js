import mongoose from 'mongoose';

const articlesSchema = new mongoose.Schema({
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
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

articlesSchema.pre('findOne', function () {
    this.where({ deletedAt: null });
});

articlesSchema.pre('find', function () {
    this.where({ deletedAt: null });
});

articlesSchema.post('save', function (article) {
    article.deletedAt = undefined;
});

articlesSchema.post('find', function (articles) {
    if (!articles) return;
    
    const rows = Array.isArray(articles) ? articles : [articles];

    rows.forEach((article) => {
        article.deletedAt = undefined;
    });
});

articlesSchema.post('findOne', function (article) {
    article.deletedAt = undefined;
});

export default mongoose.model('Article', articlesSchema);
