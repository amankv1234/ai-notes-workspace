const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        default: 'Untitled Note'
    },
    content: {
        type: String,
        default: ''
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        default: 'General',
        index: true
    },
    archived: {
        type: Boolean,
        default: false,
        index: true
    },
    shared: {
        type: Boolean,
        default: false
    },
    shareId: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    aiGeneratedSummary: {
        type: String,
        trim: true
    },
    aiActionItems: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

noteSchema.index({ userId: 1, archived: 1, updatedAt: -1 });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
