import React from "react";

const Dialog = ({ onConfirm, title }) => {
  return (
    <dialog open className="modal">
      <div>{title}</div>
      <div>
        <span className="button" onClick={onConfirm}>
          知道了
        </span>
      </div>
    </dialog>
  );
};

export default Dialog;
