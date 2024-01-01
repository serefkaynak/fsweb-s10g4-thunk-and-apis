import React from "react";

function Item({ data }) {
  return (
    <div className="shadow-md bg-white text-center">
      <img src={data.message} className="text-2xl p-10" />
    </div>
  );
}

export default Item;