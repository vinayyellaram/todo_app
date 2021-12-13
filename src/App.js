import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import Time from "./components/Time";
function App() {
  var [text, setText] = useState("");
  var [itemList, setItemList] = useState([]);
  const [setDate, setSelectedDate] = useState(null);
  const [setTime, setSelectedTime] = useState(null);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
  }, [itemList]);

  const saveLocalTodos = useCallback(() => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      localStorage.setItem("todos", JSON.stringify(itemList));
    }
  });

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let Localitems = JSON.parse(localStorage.getItem("todos"));
      setItemList(Localitems);
    }
  };

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

      <Time
        setSelectedDate={setSelectedDate}
        setSelectedTime={setSelectedTime}
      />

      <TodoList itemList={itemList} setItemList={setItemList} />
    </div>
  );
}

export default App;
