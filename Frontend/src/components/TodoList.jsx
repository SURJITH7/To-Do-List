import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  onDelete,
  onToggle,
  onUpdate,
  onMove
}) => {

  const columns = [
    {
      id: "todo",
      title: "To Do",
      color: "blue"
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "orange"
    },
    {
      id: "done",
      title: "Done",
      color: "green"
    }
  ];


  // DRAG OVER
  const handleDragOver = (e) => {
    e.preventDefault();
  };


  // DROP ON EMPTY COLUMN
  const handleColumnDrop = (e, status) => {

    e.preventDefault();

    const todoId = e.dataTransfer.getData("todoId");

    if (!todoId) return;

    onMove(todoId, null, status);
  };


  return (

    <div className="kanban-board">

      {columns.map((column) => {

        const columnTodos = todos
          .filter((todo) => {

            const todoStatus =
              todo.status || "todo";

            return todoStatus === column.id;

          })
          .sort(
            (a, b) =>
              (a.order || 0) -
              (b.order || 0)
          );


        return (

          <div
            className="kanban-column"
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={(e) =>
              handleColumnDrop(e, column.id)
            }
          >

            {/* COLUMN HEADER */}

            <div className="kanban-column-header">

              <div className="column-title">

                <span
                  className={`column-dot ${column.color}`}
                ></span>

                <h3>
                  {column.title}
                </h3>

              </div>

              <span className="task-count">
                {columnTodos.length}
              </span>

            </div>


            {/* TASK AREA */}

            <div className="kanban-tasks">

              {columnTodos.length === 0 ? (

                <div className="drop-zone">

                  <span className="drop-icon">
                    ↓
                  </span>

                  <span>
                    Drop here
                  </span>

                </div>

              ) : (

                columnTodos.map((todo) => (

                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onMove={onMove}
                  />

                ))

              )}

            </div>

          </div>

        );

      })}

    </div>

  );
};

export default TodoList;