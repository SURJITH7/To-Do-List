import React, { useState } from "react";

const TodoItem = ({
  todo,
  onDelete,
  onToggle,
  onUpdate
}) => {

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(todo.title);

  const [description, setDescription] = useState(
    todo.description
  );

  const [priority, setPriority] = useState(
    todo.priority || "medium"
  );


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
      completed: todo.completed
    });

    setIsEditing(false);
  };


  return (

    <div
      className={`todo-item ${
        todo.completed ? "completed" : ""
      }`}
    >

      {isEditing ? (

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

            <button onClick={handleUpdate}>
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

        <>

          <div className="todo-content">

            <div className="todo-title-row">

              <h3>
                {todo.title}
              </h3>

              <span
                className={`priority-badge ${todo.priority}`}
              >
                {todo.priority || "medium"}
              </span>

            </div>


            <p>
              {todo.description}
            </p>


            <span>
              {todo.completed
                ? "Completed"
                : "Active"}
            </span>

          </div>


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

        </>

      )}

    </div>

  );
};

export default TodoItem;