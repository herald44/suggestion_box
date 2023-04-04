import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./modal.css";
import { Plus } from "react-feather";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

function ModalDiv({ showModal, setShowModal, suggestionChange }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleCreate = () => {
    const savedData = JSON.parse(localStorage.getItem("mySuggestions")) || []; // retrieve data from local storage

    if (!title || !content) {
      return alert("Title and content is required");
    }

    let newData = {
      id: Date.now(),
      title,
      content,
      priority,
      date: new Date().toLocaleDateString(),
      likes: [],
    };

    savedData.push(newData);
    addDoc(collection(db, "mySuggestions"), newData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      })
      .catch((error) => console.log(error));
    localStorage.setItem("mySuggestions", JSON.stringify(savedData)); // save to local storage

    setTitle("");
    setContent("");
    setPriority("normal");
    setShowModal(false);
    // window.location.reload();
    suggestionChange(true);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setPriority("normal");
    setShowModal("false");
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Suggestion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control mb-3"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Priority</label>
          <select
            className="form-control mb-3"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <textarea
            className="form-control"
            style={{ height: "180px" }}
            placeholder="Enter content....."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {/* for theme selection */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            <Plus /> create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDiv;
