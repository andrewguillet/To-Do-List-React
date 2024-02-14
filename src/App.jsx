import { useState } from "react";
import { nanoid } from "nanoid";
import ListItem from "./Components/ListItem";

function App() {
  const [todoList, setTodoList] = useState([
    { id: nanoid(3), content: "item 1" },
    { id: nanoid(3), content: "item 2" },
    { id: nanoid(3), content: "item 3" },
  ]);

  const [todo, setTodo] = useState("");

  const [showValidation, setShowValidation] = useState(false);

  // Retourne un tableau avec tout les objets qui ont un id différent que celui donné
  function deleteTodo(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // evite de creer si vide
    if (todo === "") {
      setShowValidation(true);
      return;
    }

    // on fait un nouveau tableau avec nouvelle el todo
    setTodoList([...todoList, { id: nanoid(3), content: todo }]);
    // reset valeur de todo
    setTodo("");
    setShowValidation(false);
  }

  return (
    <div className="h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <h1 className="text-3xl text-slate-100 mb-4">La To-Do Liste</h1>

        <form onSubmit={handleSubmit} className="mb-10">
          <label htmlFor="todo-item" className="text-slate-50">
            Ajouter une chose à faire
          </label>
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="mt-1 block w-full rounded"
            id="todo-item"
          />
          {showValidation && (
            <p className="text-red-400 mt-1">
              Ajoutez d'abord du contenu à votre tâche
            </p>
          )}
          <button className=" mt-4 py-2 px-2 bg-slate-50 rounded min-w-[115px]">
            Ajouter
          </button>
        </form>

        <ul>
          {todoList.length === 0 && (
            <li className="text-slate-50 text-md">Pas d'items à afficher</li>
          )}
          {todoList.length > 0 &&
            todoList.map((item) => (
              <ListItem key={item.id} itemData={item} deleteTodo={deleteTodo} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
