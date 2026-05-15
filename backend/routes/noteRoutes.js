const express = require('express');
const router = express.Router();
const {
    getNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote,
    archiveNote,
    generateNoteAI,
    getPublicNote,
    getDashboardStats
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

// PUBLIC ROUTE (No Auth Required)
router.get('/shared/:shareId', getPublicNote);

// PROTECTED ROUTES
router.use(protect);

router.route('/')
    .get(getNotes)
    .post(createNote);

// Dashboard stats MUST come before /:id route
router.get('/dashboard', getDashboardStats);

router.patch('/archive/:id', archiveNote);
router.post('/:id/generate-ai', generateNoteAI);

router.route('/:id')
    .get(getNoteById)
    .patch(updateNote)
    .delete(deleteNote);

module.exports = router;
