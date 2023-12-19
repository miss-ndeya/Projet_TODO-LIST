import { Button } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoListe, setTodoListe] = useState([]);
  const [todoIsEdit, setTodoIsEdit] = useState("");

  const addTodo = (e) => {
    e.preventDefault();

    if (todoIsEdit) {
      setTodoListe((prev) =>
        prev.map((item) =>
          item.id === todoIsEdit ? { ...item, value: todo } : item
        )
      );
      setTodoIsEdit("");
    } else {
      const newTodo = {
        id: Math.floor(Math.random() * 1000),
        value: todo,
      };

      setTodoListe((prev) => [...prev, newTodo]);
    }
    setTodo("");
  };

  const deleteTodo = (todoId) => {
    const newtodos = todoListe.filter((todo) => todo.id !== todoId);

    setTodoListe(newtodos);
  };

  const editTodo = (todoId) => {
    const todoEdit = todoListe.find((todo) => todo.id === todoId);
    setTodo(todoEdit.value);
    setTodoIsEdit(todoId);
    console.log(todoId);
  };

  return (
    <div className="w-50 mx-auto py-5">
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <div className="mb-3">
          <label className="form-label">Todo</label>
          <input
            type="text"
            className="form-control"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {todoIsEdit !== "" ? "modifier" : "Submit"}
        </button>
      </form>
      <h1 className="mt-5">Liste des taches a faire</h1>
      <ol>
        {todoListe.length ? (
          todoListe.map((todo) => {
            return (
              <div
                className="d-flex justify-content-between gap-2 mb-3"
                key={todo.id}
              >
                <li>{todo.value}</li>
                <div>
                  <button
                    className="me-3 btn btn-primary"
                    onClick={() => editTodo(todo.id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <span className="text-danger">Pas encore de todo</span>
        )}
      </ol>
    </div>
  );
}

export default App;
