import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const Todos = ({ itemList, setItemList, item }) => {
  const [time, setTime] = useState(item.dueTime);

  const handleDelete = () => {
    const newtodo = itemList.filter((e) => e.id !== item.id);
    setItemList(newtodo);
  };

  const handleUpdate = () => {
    complementingCompletedAttribute();
  };
  let loading = true;
  useEffect(() => {
    if (loading) {
      setTime("--:--:--");

      let interval = setInterval(() => {
        let now = new Date();
        now = Date.parse(now);
        const due = Date.parse(time);
        const diff = due - now;

        if (diff < 0) {
          clearInterval(interval);
          setTime("Time over");
          complementingCompletedAttribute();
        } else {
          let days = Math.floor(diff / (1000 * 60 * 60 * 24));
          let hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTime(days + "d" + hours + "h" + minutes + "m" + seconds + "s");
        }
      }, 1000);
      loading = false;
    }
  }, []);

  const complementingCompletedAttribute = () => {
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
        variant={`${!item.completed ? "danger" : "primary"}`}
        className={`d-flex justify-content-between align-items-start ${
          item.completed ? "" : "text-decoration-line-through"
        }`}
      >
        <div>{item.text}</div>
        {/* Displaying Timer */}
        <div>{time}</div>

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
