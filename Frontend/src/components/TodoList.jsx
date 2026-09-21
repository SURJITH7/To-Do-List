import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  onDelete,
  onToggle,
  onUpdate
}) => {

  if (todos.length === 0) {
    return (
      <p className="empty-message">
        No todos found.
      </p>
    );
  }

  return (
    <div className="todo-list">

      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}

    </div>
  );
};

export default TodoList;