import React, { useState } from "react";
import "./single.css";
import { Trash, Check, ThumbsUp } from "react-feather";
import { NavItem } from "react-bootstrap";
import { getUuid, hasLiked } from "../../utils";
import img1 from "../../images/download (1).png";
import img2 from "../../images/download.png";

function SingleSuggestion({ item, handleChange }) {
  let savedData = JSON.parse(localStorage.getItem("mySuggestions")) || [];
  const [rating] = useState(item.priority === "high" ? 100 : 0);
  const [increment, setIncrement] = useState(false);
  const [content] = useState(item.content);

  
  const handleIncrement = (e) => {
    let idx = savedData.findIndex((x) => x.id === item.id);
    savedData[idx].content = content;
    localStorage.setItem("mySuggestions", JSON.stringify(savedData));
    setIncrement(false);
    window.location.reload();
  };

  const handleLikes = (id) => {
    const suggestion = savedData.find((x) => x.id === id);
    console.log({ suggestion });
    const find = suggestion?.likes?.find((like) => like === getUuid());
    console.log({ find });
    if (find) return;

    suggestion.likes = [...suggestion.likes, getUuid()];
    const index = savedData.findIndex((item) => item.id === id);
    console.log({ index });
    savedData[index] = suggestion;
    localStorage.setItem("mySuggestions", JSON.stringify(savedData));
    handleChange(true);
  };
  return (
    <div
      className="card shadow px-2"
      style={{ backgroundColor: `${item.background}` }}
    >
      <div className="title-div w-100 text-center">
        <div className="priority text-center text-light shadow">
          <p className="text-light fw-light mb-0">Priority</p>
          {/* <Rating
            ratingValue={rating}
            iconsCount={2}
            transition={true}
            className="star"
          /> */}
          {item.priority === "high" ? (
            <img src={img1} width="30px" height="30px" />
          ) : (
            <img src={img2} width="30px" height="30px" />
          )}
          {rating === 100 ? (
            <p className=" fw-bold text-warning ">High</p>
          ) : (
            <p className="text-info">Normal</p>
          )}
        </div>
        <h1 className="fw-light">{item.title}</h1>
      </div>
      <div className="content">
        <textarea
          className="form-control"
          disable={increment}
          value={content}
          //onChange={(e) => setContent(e.target.value)}
          style={{ backgroundColor: `${item.foreground}` }}
        ></textarea>
      </div>
      <section className="d-flex justify-content-between my-2">
        {!hasLiked(item.likes, getUuid()) && (
          <button
            className="btn btn-outline-warning btn-sm shadow"
            onClick={(e) => {
              e.preventDefault();
              setIncrement(true);
              console
              handleLikes(item.id);
            }}
          >
            <ThumbsUp /> like
          </button>
        )}

        {hasLiked(item.likes, getUuid()) && (
          <button
            className="btn btn-outline-primary btn-sm shadow"
            onClick={handleIncrement}
          >
            <Check />
          </button>
        )}
        
      </section>
    </div>
  );
}

export default SingleSuggestion;
