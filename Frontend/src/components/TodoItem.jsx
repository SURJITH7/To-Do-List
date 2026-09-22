import React, { useState } from "react";

const TodoItem = ({
  todo,
  onDelete,
  onToggle,
  onUpdate,
  onMove
}) => {

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(
    todo.title
  );

  const [description, setDescription] = useState(
    todo.description || ""
  );

  const [priority, setPriority] = useState(
    todo.priority || "medium"
  );


  // DRAG START
  const handleDragStart = (e) => {

    e.dataTransfer.setData(
      "todoId",
      todo._id
    );

    e.dataTransfer.effectAllowed = "move";

    e.currentTarget.classList.add(
      "dragging"
    );
  };


  // DRAG END
  const handleDragEnd = (e) => {

    e.currentTarget.classList.remove(
      "dragging"
    );
  };


  // DROP ON ANOTHER TASK
  const handleDrop = (e) => {

    e.preventDefault();

    e.stopPropagation();

    const draggedId =
      e.dataTransfer.getData("todoId");

    if (!draggedId) return;

    if (draggedId === todo._id) return;

    const status =
      todo.status || "todo";

    onMove(
      draggedId,
      todo._id,
      status
    );
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };


  // SAVE EDIT
  const handleUpdate = () => {

    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    onUpdate(todo._id, {
      title,
      description,
      priority,
      completed: todo.completed,
      status: todo.status || "todo",
      order: todo.order || 0
    });

    setIsEditing(false);
  };


  return (

    <div
      className={`kanban-task ${
        todo.completed
          ? "completed"
          : ""
      }`}
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >

      {isEditing ? (

        /* EDIT MODE */

        <div className="edit-form">

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >

            <option value="low">
              Low Priority
            </option>

            <option value="medium">
              Medium Priority
            </option>

            <option value="high">
              High Priority
            </option>

          </select>


          <div className="todo-actions">

            <button
              onClick={handleUpdate}
            >
              Save
            </button>

            <button
              onClick={() =>
                setIsEditing(false)
              }
            >
              Cancel
            </button>

          </div>

        </div>

      ) : (

        /* NORMAL MODE */

        <>

          <div className="task-top">

            <div>

              <h3>
                {todo.title}
              </h3>

              <p>
                {todo.description}
              </p>

            </div>


            {/* DRAG HANDLE */}

            <span className="drag-handle">
              ⠿
            </span>

          </div>


          <div className="task-bottom">

            <span
              className={`priority-badge ${
                todo.priority || "medium"
              }`}
            >
              {todo.priority || "medium"}
            </span>


            <div className="todo-actions">

              <button
                onClick={() =>
                  onToggle(todo)
                }
              >
                {todo.completed
                  ? "Undo"
                  : "Complete"}
              </button>

              <button
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(todo._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        </>

      )}

    </div>

  );
};

export default TodoItem;