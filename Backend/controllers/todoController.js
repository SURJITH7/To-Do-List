const Todo = require("../models/Todo");

// CREATE TODO
const createTodo = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const todo = await Todo.create({
      title,
      description,
      priority,
      status
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create todo",
      error: error.message
    });
  }
};


// GET ALL TODOS
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get todos",
      error: error.message
    });
  }
};


// GET SINGLE TODO
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    res.status(200).json({
      success: true,
      todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get todo",
      error: error.message
    });
  }
};


// UPDATE TODO
const updateTodo = async (req, res) => {
  try {
    const { title, description,priority, completed, status, order } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        priority,
        completed,
        status,
        order
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update todo",
      error: error.message
    });
  }
};


// DELETE TODO
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete todo",
      error: error.message
    });
  }
};


module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
};