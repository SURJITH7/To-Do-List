const express = require("express");

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require("../controllers/todoController");

const router = express.Router();

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new Todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn React
 *               description:
 *                 type: string
 *                 example: Practice React Hooks
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createTodo);


/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all Todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of all Todos
 *       500:
 *         description: Server error
 */
router.get("/", getTodos);


/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a Todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Todo ID
 *     responses:
 *       200:
 *         description: Todo found successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getTodoById);


/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a Todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Node.js
 *               description:
 *                 type: string
 *                 example: Practice Express
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateTodo);


/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a Todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteTodo);

module.exports = router;