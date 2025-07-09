const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g. Instagram, TikTok
  action: { type: String, required: true },   // e.g. like, follow
  link: { type: String, required: true },     // Link to perform the task
  instructions: { type: String },             // Guidelines
});

module.exports = mongoose.model("Task", TaskSchema);
