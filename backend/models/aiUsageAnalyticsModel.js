const mongoose = require('mongoose');

const aiUsageAnalyticsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true, // One analytics record per user
        index: true
    },
    totalSummariesGenerated: {
        type: Number,
        default: 0
    },
    totalAIRequests: {
        type: Number,
        default: 0
    },
    lastUsedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const AIUsageAnalytics = mongoose.model('AIUsageAnalytics', aiUsageAnalyticsSchema);

module.exports = AIUsageAnalytics;
