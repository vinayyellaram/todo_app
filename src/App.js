import { Button, InputGroup, FormControl } from "react-bootstrap";

import React, { useState, useEffect } from "react";

import React, { useState, useEffect, useCallback } from "react";

import TodoList from "./components/TodoList";
import Time from "./components/Time";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const [text, setText] = useState("");
  const [itemList, setItemList] = useState([]);
  const [setDate, setSelectedDate] = useState(null);
  const [setTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const getLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let Localitems = JSON.parse(localStorage.getItem("todos"));
        setItemList(Localitems);
      }
    };

    getLocalTodos();
  }, []);

  useEffect(() => {
    const saveLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        localStorage.setItem("todos", JSON.stringify(itemList));
      }
    };

    saveLocalTodos();
  }, [itemList]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("Add Todo");
      return;
    }

    const newList = [
      ...itemList,
      {
        text: text,
        id: Math.random(),
        completed: false,
        dueDate: setDate,
        dueTime: setTime,
      },
    ];
    setItemList(newList);
    setText("");
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      {/* Accepting Text input */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
        <FormControl
          placeholder="Todo"
          aria-label="Todo"
          aria-describedby="basic-addon1"
          onChange={handleChange}
          value={text}
        />
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </InputGroup>
      {/*To Seletect Due Time  */}
      <Time
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
      />
      {/* Making Todos And Displaying */}
      <TodoList itemList={itemList} setItemList={setItemList} />
    </div>
  );
};

export default App;
