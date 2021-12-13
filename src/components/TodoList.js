import React from "react";
import Todos from "./Todos";

const TodoList = ({ itemList, setItemList }) => {
  return (
    <div>
      {itemList.map((item) => {
        return (
          <Todos itemList={itemList} setItemList={setItemList} item={item} />
        );
      })}
    </div>
  );
};

export default TodoList;
