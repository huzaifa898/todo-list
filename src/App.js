import { useState, useEffect } from "react";
import TodoInput from "./Components/TodoInput";  // Add missing import
import TodoList from "./Components/TodoList";  // Remove duplicate import

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  // Function to persist todos to localStorage
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify(newList));
  }

  // Function to add a new todo
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // Function to delete a todo
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // Function to edit a todo
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  // Load todos from localStorage on component mount
  useEffect(() => {
    const localTodos = localStorage.getItem('todos');
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  return (
    <>
      <TodoInput 
        todoValue={todoValue} 
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos} 
      />
      <TodoList 
        handleEditTodo={handleEditTodo} 
        handleDeleteTodo={handleDeleteTodo} 
        todos={todos} 
      />
    </>
  );
}

export default App;
