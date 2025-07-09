const mongoose = require("mongoose");

const UserTaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("UserTask", UserTaskSchema);
