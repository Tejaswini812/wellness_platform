const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  tags: [String],
  description: String,
  difficulty: { type: String, default: "Beginner" },
  duration: String, // Example: "1h 20m"
  instructor: String,
  thumbnailUrl: String,
  scheduledTime: String,
  json_file_url: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
