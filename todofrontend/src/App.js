import { React, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(fetchToDoList, []);

  function fetchToDoList() {
    axios
      .get("http://127.0.0.1:8000/todoapi/todo-list/")
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => setErrors(error.message));
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    axios
      .delete("http://127.0.0.1:8000/todoapi/delete-todo/" + id)
      .catch((error) => setErrors(error.message));
  };

  const addTask = (title) => {
    axios
      .post("http://127.0.0.1:8000/todoapi/add-todo/", {
        id: 1,
        title: title,
        is_complete: false,
      })
      .catch((error) => setErrors(error.message))
      .then(fetchToDoList);
  };

  const toggleComplete = (task) => {
    axios
      .patch("http://127.0.0.1:8000/todoapi/edit-todo/" + task.id + "/", {
        id: task.id,
        title: task.title,
        is_complete: !task.is_complete,
      })
      .catch((error) => setErrors(error.message))
      .then(window.location.reload());
  };

  return (
    <>
      <h1>To Do List</h1>
      <div className="form-container">
        {/* Needs a form to add this dynamically */}
        <button
          className="button"
          onClick={() => addTask("Another Todo" + Math.random())}
        >
          Add Task
        </button>
      </div>
      {errors && <p>{errors}</p>}
      <div className="todolist-container">
        {tasks.map((task, index) => (
          <div key={index}>
            {task.is_complete ? (
              <span>&#x2713; {task.title} </span>
            ) : (
              <span>&#x2717; {task.title}</span>
            )}{" "}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            {task.is_complete ? (
              <button onClick={() => toggleComplete(task)}>
                Mark Incomplete
              </button>
            ) : (
              <button onClick={() => toggleComplete(task)}>
                Mark Complete
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
