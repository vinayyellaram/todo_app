import React, { useState } from "react";
import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const Todos = ({ itemList, setItemList, item }) => {
  useState(() => {
    const date = new Date();
    if (date === item.date && item.time) {
      console.log("done");
    }
  }, []);

  const handleDelete = () => {
    const newtodo = itemList.filter((e) => e.id !== item.id);
    setItemList(newtodo);
  };

  const handleUpdate = () => {
    setItemList(
      itemList.map((element) => {
        if (element.id === item.id) {
          return {
            ...element,
            completed: !element.completed,
          };
        }
        return element;
      })
    );
  };

  return (
    <div>
      <ListGroup.Item
        as="li"
        variant={`${item.completed ? "danger" : "primary"}`}
        className={`d-flex justify-content-between align-items-start ${
          item.completed ? "" : "text-decoration-line-through"
        }`}
      >
        <div>{item.text}</div>
        <div>
          {item.dueDate}
          <br />
          {item.dueTime}
        </div>
        <div>
          <Button onClick={handleDelete} className="m-2">
            <BsTrash />
          </Button>
          <Button onClick={handleUpdate}>
            {item.completed ? <BsCheckLg /> : <ImCross />}
          </Button>
        </div>
      </ListGroup.Item>
    </div>
  );
};

export default Todos;
