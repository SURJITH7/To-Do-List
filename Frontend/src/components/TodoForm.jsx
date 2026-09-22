import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ fetchTodos }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {

      await axios.post(`${import.meta.env.VITE_API_URL}/api/todos`,
        {
          title,
          description,
          priority
        }
      );

      setTitle("");
      setDescription("");
      setPriority("medium");

      fetchTodos();

    } catch (error) {

      console.log("Error creating todo:", error);

    }
  };


  return (

    <form className="todo-form" onSubmit={handleSubmit}>

      <div className="input-group">

        <label>
          Task title
        </label>

        <input
          type="text"
          placeholder="Enter Your Task..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Description
        </label>

        <input
          type="text"
          placeholder="Add some details..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

      </div>


      <div className="input-group">

        <label>
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >

          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>

        </select>

      </div>


      <button
        type="submit"
        className="add-button"
      >

        <span>
          +
        </span>

        Add Task

      </button>

    </form>

  );
};

export default TodoForm;