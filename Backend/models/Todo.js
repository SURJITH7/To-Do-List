const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    completed: {
      type: Boolean,
      default: false
    },

    dueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;