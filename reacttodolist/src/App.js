import React, { useState, useEffect } from "react";
import './App.css';
//importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Heading from "./components/Heading";

function App() {
  
  //states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


  //useEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [status, todos]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  //functions
  const filterHandler = () => {
    switch(status) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

//save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));  
  };

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <div className="glassTop">
        <header className="project-name">Todo List</header>
        <Heading className="filter-head" setStatus={setStatus}/>
      </div>
    
      <Form todos={todos} inputText={inputText} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;