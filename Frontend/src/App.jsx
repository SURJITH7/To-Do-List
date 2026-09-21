import React, { useEffect, useState } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";

const App = () => {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");


  // GET ALL TODOS
  const fetchTodos = async () => {
    try {

      const response = await axios.get(
        "http://localhost:7200/api/todos"
      );

      setTodos(response.data.todos);

    } catch (error) {

      console.log("Error fetching todos:", error);

    }
  };


  // DELETE TODO
  const deleteTodo = async (id) => {
    try {

      await axios.delete(
        `http://localhost:7200/api/todos/${id}`
      );

      fetchTodos();

    } catch (error) {

      console.log("Error deleting todo:", error);

    }
  };


  // COMPLETE / UNCOMPLETE TODO
  const toggleTodo = async (todo) => {
    try {

      await axios.put(
        `http://localhost:7200/api/todos/${todo._id}`,
        {
  title: todo.title,
  description: todo.description,
  priority: todo.priority || "medium",
  completed: !todo.completed
}
      );

      fetchTodos();

    } catch (error) {

      console.log("Error updating todo:", error);

    }
  };


  // UPDATE TODO
  const updateTodo = async (id, updatedData) => {
    try {

      await axios.put(
        `http://localhost:7200/api/todos/${id}`,
        updatedData
      );

      fetchTodos();

    } catch (error) {

      console.log("Error updating todo:", error);

    }
  };


  // FILTER TODOS
  const filteredTodos = todos.filter((todo) => {

    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;

  });


  const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3
};

const sortedTodos = [...filteredTodos].sort(
  (a, b) =>
    (priorityOrder[a.priority] || 2) -
    (priorityOrder[b.priority] || 2)
);


  // COUNTS
  const totalTodos = todos.length;

  const activeTodos = todos.filter(
    (todo) => !todo.completed
  ).length;

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;


  // LOAD TODOS
  useEffect(() => {
    fetchTodos();
  }, []);


  return (

    <div className="app">

      {/* HEADER */}

      <header className="app-header">

        <div className="brand">

          <div className="brand-icon">
            ✓
          </div>

          <div>
            <h1>My Tasks</h1>

            <p>
              Organize your day, one task at a time.
            </p>
          </div>

        </div>


        {/* <div className="task-summary">

          <strong>
            {activeTodos}
          </strong>

          <span>
            active tasks
          </span>

        </div> */}

      </header>


      {/* MAIN */}

      <main>


        {/* ADD TODO */}

        <section className="add-section">

          <div className="section-heading">

            <span className="section-number">
              01
            </span>

            <div>

              <h2>
                Add a new task
              </h2>

              <p>
                What's something you want to accomplish?
              </p>

            </div>

          </div>


          <TodoForm
            fetchTodos={fetchTodos}
          />

        </section>


        {/* TASK SECTION */}

        <section className="tasks-section">


          <div className="tasks-header">

            <div>

              <div className="section-heading small">

                <span className="section-number">
                  02
                </span>

                <div>

                  <h2>
                    Your tasks
                  </h2>

                  <p>
                    {totalTodos} total · {completedTodos} completed
                  </p>

                </div>

              </div>

            </div>


            {/* FILTERS */}

            <div className="filter-buttons">

              <button
                className={
                  filter === "all"
                    ? "active-filter"
                    : ""
                }
                onClick={() => setFilter("all")}
              >
                All
              </button>


              <button
                className={
                  filter === "active"
                    ? "active-filter"
                    : ""
                }
                onClick={() => setFilter("active")}
              >
                Active
              </button>


              <button
                className={
                  filter === "completed"
                    ? "active-filter"
                    : ""
                }
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>

            </div>

            

          </div>


          {/* TODO LIST */}

          <TodoList
            todos={sortedTodos}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
          />

        </section>

      </main>


      {/* FOOTER */}

      <footer className="app-footer">

        <span>
          &copy; 2026 ToDo
        </span>

        <span>
          Stay focused. Get things done!
        </span>

      </footer>

    </div>

  );
};

export default App;