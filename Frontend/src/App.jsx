import React, { useEffect, useState } from "react";
import axios from "axios";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import "./App.css";

const App = () => {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");



  const fetchTodos = async () => {

    try {

      const response = await axios.get("http://localhost:7200/api/todos");
      setTodos(response.data.todos);
    
    } catch (error) {
      console.log(
        "Error fetching todos:", error);
    }
  };

  
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:7200/api/todos/${id}`);
      fetchTodos();

    } catch (error) {

      console.log(
        "Error deleting todo:", error);
    }

  };



  const toggleTodo = async (todo) => {
    try {
      const currentStatus = todo.status || "todo";
      let newStatus;
      if (todo.completed) {
        newStatus = "todo";
      } else {
        newStatus = "done";
      }
      await axios.put(`http://localhost:7200/api/todos/${todo._id}`,
        {
          title: todo.title,
          description: todo.description,
          priority: todo.priority || "medium",
          completed: !todo.completed,
          status: newStatus,
          order: todo.order || 0
        }
      );

      fetchTodos();

    } catch (error) {

      console.log("Error updating todo:",error);

    }

  };

  const updateTodo = async (
    id,
    updatedData
  ) => {


    try {

      await axios.put(
        `http://localhost:7200/api/todos/${id}`,
        updatedData
      );

      fetchTodos();

    } catch (error) {

      console.log(
        "Error updating todo:",
        error
      );

    }

  };


  const moveTodo = async (
    draggedId,
    targetId,
    targetStatus
  ) => {

    try {

      const draggedTodo =
        todos.find(
          (todo) =>
            todo._id === draggedId
        );

      if (!draggedTodo) return;


      const currentStatus =
        draggedTodo.status || "todo";



      let targetTodos = todos
        .filter(
          (todo) =>
            (todo.status || "todo") ===
            targetStatus
        )
        .sort(
          (a, b) =>
            (a.order || 0) -
            (b.order || 0)
        );



      targetTodos =
        targetTodos.filter(
          (todo) =>
            todo._id !== draggedId
        );



      let targetIndex =
        targetTodos.length;


      if (targetId) {

        const index =
          targetTodos.findIndex(
            (todo) =>
              todo._id === targetId
          );

        if (index !== -1) {
          targetIndex = index;
        }

      }



      targetTodos.splice(
        targetIndex,
        0,
        {
          ...draggedTodo,
          status: targetStatus
        }
      );



      const otherTodos =
        todos.filter(
          (todo) =>
            todo._id !== draggedId &&
            (todo.status || "todo") !==
              targetStatus
        );


      const updatedTargetTodos =
        targetTodos.map(
          (todo, index) => ({
            ...todo,
            status: targetStatus,
            order: index
          })
        );


      setTodos([
        ...otherTodos,
        ...updatedTargetTodos
      ]);


      // SAVE TO DATABASE

      for (
        const todo of updatedTargetTodos
      ) {

        await axios.put(
          `http://localhost:7200/api/todos/${todo._id}`,
          {
            title: todo.title,
            description:
              todo.description,
            priority:
              todo.priority || "medium",
            completed:
              todo.status === "done",
            status: todo.status,
            order: todo.order
          }
        );

      }

    } catch (error) {

      console.log(
        "Error moving todo:",
        error
      );

      fetchTodos();

    }

  };


  const filteredTodos =
    todos.filter((todo) => {

      if (filter === "active") {
        return !todo.completed;
      }

      if (filter === "completed") {
        return todo.completed;
      }

      return true;

    });

    

  const totalTodos = todos.length;

  const completedTodos =
    todos.filter(
      (todo) => todo.completed
    ).length;


  const activeTodos =
    todos.filter(
      (todo) => !todo.completed
    ).length;


  useEffect(() => {

    fetchTodos();

  }, []);


  return (

    <div className="app">



      <header className="app-header">

        <div className="brand">

          <div className="brand-icon">
            ✓
          </div>

          <div>

            <h1>
              My To-Do's
            </h1>

            <p>
              Organize your day,
              one task at a time!
            </p>

          </div>

        </div>


        <div className="task-summary">

          <strong>
            {activeTodos}
          </strong>

          <span>
            active tasks
          </span>

        </div>

      </header>


      <main>



        <section className="add-section">

          <div className="section-heading">

            

            <div>

              <h2>
                Add a new task
              </h2>

              <p>
                What's something you
                want to accomplish?
              </p>

            </div>

          </div>


          <TodoForm
            fetchTodos={fetchTodos}
          />

        </section>



        <section className="tasks-section">


          <div className="tasks-header">

            <div className="section-heading small">

              

              <div>

                <h2>
                  Your tasks
                </h2>

                <p>
                   total {totalTodos} Tasks   |    {"  "}
                   Completed {completedTodos} Tasks
                </p>

              </div>

            </div>


            {/* FILTERS */}

            <div className="filter-buttons">

              <button className={filter === "all"
                    ? "active-filter"
                    : ""
                }
                onClick={() => setFilter("all")}> All
              </button>

              <button className={filter === "active"
                    ? "active-filter"
                    : ""
                }
                onClick={() => setFilter("active")}> Active
              </button>

              <button className={filter === "completed"
                    ? "active-filter"
                    : ""
                }
                onClick={() => setFilter("completed")}> Completed
              </button>

            </div>

          </div>


          {/* KANBAN BOARD */}

          <TodoList
            todos={filteredTodos}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onMove={moveTodo}
          />

        </section>

      </main>


      {/* FOOTER */}

      <footer className="app-footer">

        <span>
          &copy; 2026, To-Do
        </span>

        <span>
          Stay focused. Get things done.
        </span>

      </footer>

    </div>

  );

};

export default App;