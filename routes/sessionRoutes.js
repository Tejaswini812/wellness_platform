const express = require('express');
const Session = require('../models/Session');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * Public: Get all published sessions
 */
router.get('/count', async (req, res) => {
  try {
    const publishedCount = await Session.countDocuments({ status: 'published' });
    res.json({ success: true, publishedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get session count" });
  }
});

/**
 * Count sessions: total and upcoming
 */
router.get('/count', async (req, res) => {
  try {
    const totalCount = await Session.countDocuments({});
    const upcomingCount = await Session.countDocuments({
      scheduledTime: { $gte: new Date() },
    });

    res.json({ success: true, totalCount, upcomingCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get session count" });
  }
});

/**
 * Private: Get user's sessions (draft + published)
 */
router.get('/my-sessions', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.user }).sort({ updated_at: -1 });
    res.json({ success: true, data: sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch user sessions" });
  }
});

/**
 * Save Draft Session
 */
router.post('/my-sessions/save-draft', auth, async (req, res) => {
  try {
    const {
      sessionId,
      title,
      tags,
      description,
      difficulty,
      duration,
      instructor,
      thumbnailUrl,
      scheduledTime,
      json_file_url
    } = req.body;

    if (!title || !tags || !description) {
      return res.status(400).json({ success: false, message: "Title, tags and description are required" });
    }

    let session;
    if (sessionId) {
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id: req.user },
        {
          title,
          tags,
          description,
          difficulty,
          duration,
          instructor,
          thumbnailUrl,
          scheduledTime,
          json_file_url,
          status: 'draft',
          updated_at: Date.now()
        },
        { new: true }
      );
    } else {
      session = await Session.create({
        user_id: req.user,
        title,
        tags,
        description,
        difficulty,
        duration,
        instructor,
        thumbnailUrl,
        scheduledTime,
        json_file_url,
        status: 'draft'
      });
    }

    res.json({ success: true, data: session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save draft" });
  }
});

/**
 * Publish Session
 */
router.post('/my-sessions/publish', auth, async (req, res) => {
  try {
    const {
      title,
      tags,
      description,
      difficulty,
      duration,
      instructor,
      thumbnailUrl,
      scheduledTime,
      json_file_url
    } = req.body;

    if (!title || !tags || !description) {
      return res.status(400).json({ success: false, message: "Title, tags and description are required" });
    }

    const session = await Session.create({
      user_id: req.user,
      title,
      tags,
      description,
      difficulty,
      duration,
      instructor,
      thumbnailUrl,
      scheduledTime,
      json_file_url,
      status: 'published'
    });

    res.json({ success: true, data: session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to publish session" });
  }
});

module.exports = router;
