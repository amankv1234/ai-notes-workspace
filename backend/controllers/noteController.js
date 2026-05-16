const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');
const AIUsageAnalytics = require('../models/aiUsageAnalyticsModel');
const { generateFullAIInsights } = require('../services/aiService');

// @desc    Fetch all notes with advanced filtering, search, and sorting
const getNotes = asyncHandler(async (req, res) => {
    const { search, category, sort, archived } = req.query;
    let query = { userId: req.user._id };
    query.archived = archived === 'true';

    if (category && category !== 'All') {
        query.category = category;
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } }
        ];
    }

    let sortOptions = { updatedAt: -1 };
    if (sort === 'oldest') sortOptions = { updatedAt: 1 };
    if (sort === 'alphabetical') sortOptions = { title: 1 };

    const notes = await Note.find(query).sort(sortOptions);
    res.json(notes);
});

// @desc    Create a new note
const createNote = asyncHandler(async (req, res) => {
    const note = new Note({
        userId: req.user._id,
        title: 'New Note',
        content: '',
        category: 'General',
        tags: []
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
});

// @desc    Get note by ID
const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.userId.toString() === req.user._id.toString()) {
        res.json(note);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc    Update a note (PATCH)
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.userId.toString() === req.user._id.toString()) {
        const fieldsToUpdate = ['title', 'content', 'tags', 'category', 'shared'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                note[field] = req.body[field];
            }
        });

        if (req.body.shared && !note.shareId) {
            note.shareId = Math.random().toString(36).substring(2, 15);
        }

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc    Archive or Restore a note
const archiveNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.userId.toString() === req.user._id.toString()) {
        note.archived = !note.archived;
        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc    Delete a note
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.userId.toString() === req.user._id.toString()) {
        await Note.deleteOne({ _id: note._id });
        res.json({ message: 'Note permanently removed' });
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc    Get advanced dashboard statistics
const getDashboardStats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // 1. Basic Counts
    const totalNotes = await Note.countDocuments({ userId });
    const archivedNotes = await Note.countDocuments({ userId, archived: true });
    
    // 2. Tag Distribution (Aggregation)
    const tagStats = await Note.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ]);

    // 3. Weekly Activity (Notes created in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const weeklyActivity = await Note.aggregate([
        { 
            $match: { 
                userId: new mongoose.Types.ObjectId(userId),
                createdAt: { $gte: sevenDaysAgo }
            } 
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    // 4. AI Usage (From Analytics Model)
    const aiStats = await AIUsageAnalytics.findOne({ user: userId }) || { totalAIRequests: 0, totalSummariesGenerated: 0 };

    // 5. Recent Notes
    const recentNotes = await Note.find({ userId, archived: false })
        .sort({ updatedAt: -1 })
        .limit(5);

    res.json({
        totalNotes,
        archivedNotes,
        tagStats,
        weeklyActivity,
        aiStats,
        recentNotes
    });
});

// @desc    Generate full AI insights
const generateNoteAI = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note && note.userId.toString() === req.user._id.toString()) {
        if (!note.content || note.content.length < 10) {
            res.status(400);
            throw new Error('Not enough content to generate AI insights');
        }

        const insights = await generateFullAIInsights(note.content);

        note.title = (note.title === 'New Note' || note.title === 'Untitled Note') ? (insights.suggested_title || note.title) : note.title;
        note.aiGeneratedSummary = insights.summary;
        note.aiActionItems = insights.action_items;

        // Update Analytics
        await AIUsageAnalytics.findOneAndUpdate(
            { user: req.user._id },
            { 
                $inc: { totalAIRequests: 1, totalSummariesGenerated: 1 },
                $set: { lastUsedAt: Date.now() }
            },
            { upsert: true, returnDocument: 'after' }
        );

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error('Note not found');
    }
});

// @desc    Get a public shared note
const getPublicNote = asyncHandler(async (req, res) => {
    const note = await Note.findOne({ shareId: req.params.shareId, shared: true });

    if (note) {
        res.json(note);
    } else {
        res.status(404);
        throw new Error('Public note not found or sharing disabled');
    }
});

module.exports = {
    getNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
    archiveNote,
    generateNoteAI,
    getPublicNote,
    getDashboardStats
};
