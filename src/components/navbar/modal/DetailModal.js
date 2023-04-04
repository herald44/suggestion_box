import React from "react";

function DetailModal({ content }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">{content?.title}</div>
        <div className="body">{content?.body}</div>
      </div>
    </div>
  );
}

export default DetailModal;
