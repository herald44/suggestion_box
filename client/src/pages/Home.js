import React, { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import Nav from "../components/navbar/Nav";
import ModalDiv from "../components/navbar/modal/Modal";
import { Frown } from "react-feather";
import SingleSuggestion from "../components/singleSuggestion/SingleSuggestion";
import { getUuid, setUuid, hasLiked } from "../utils";
import { Check, ThumbsUp, Eye } from "react-feather";
import Modal from "react-bootstrap/Modal";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!getUuid()) {
      const userID = uuidV4();
      setUuid(userID);
      addDoc(collection(db, "users"), {
        userId: userID,
      })
        .then((docRef) => docRef.id)
        .catch((error) => console.log(error));
    }
    getDocs(collection(db, "mySuggestions"))
      .then((querySnapshot) => {
        // querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const newData = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        console.log("newData: ", newData);
        setData(newData);
        // });
      })
      .catch((error) => console.log(error));
    // setData(JSON.parse(localStorage.getItem("mySuggestions")) || []);
    console.log("FIREBASE_DATA: ", data);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [hasSuggestionChange, setSuggestionChange] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState("");
  const [anotherDetail, setAnotherDetail] = useState("");

  useEffect(() => {
    getDocs(collection(db, "mySuggestions"))
      .then((querySnapshot) => {
        // querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const newData = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        console.log("newData: ", newData);
        setData(newData);
        // });
      })
      .catch((error) => console.log(error));
    setSuggestionChange(false);
  }, [hasSuggestionChange]);

  const getPriorityBg = (priority) => {
    switch (priority) {
      case "high":
        return { borderLeft: "5px solid red", color: "#000" };
      case "normal":
        return {
          borderLeft: "5px solid #00ff00",
          backgroundColor: "#eee",
          color: "#000",
        };
    }
  };

  const handleShowModal = (id) => {
    const selectedItem = data?.find((item) => item?.id === id);
    if (selectedItem) {
      setShowDetail(true);
      setDetail(selectedItem?.content);
      setAnotherDetail(selectedItem?.title);
    }
  };

  const handleHideModal = (id) => {
    const selectedItem = data?.find((item) => item?.id === id);
    if (selectedItem) {
      setShowDetail(false);
      setDetail("");
    }
  };

  const handleLikes = (id) => {
    const suggestionsRef = doc(db, "mySuggestions", id);
    const suggestionDb = data.find((x) => x.id === id);
    const findDb = data?.likes?.find((like) => like === getUuid());
    console.log({ findDb });
    if (findDb) return;

    let likes = [...suggestionDb.likes, getUuid()];
    updateDoc(suggestionsRef, {
      likes,
    })
      .then((res) => {
        console.log({ res });
        return res;
      })
      .catch((err) => console.log(err));
    setSuggestionChange(true);
  };

  return (
    <>
      <Nav setShowModal={setShowModal} data={data} setData={setData} />
      <ModalDiv
        showModal={showModal}
        setShowModal={setShowModal}
        suggestionChange={() => setSuggestionChange(!hasSuggestionChange)}
      />

      {/* for suggestion */}
      <div className="container">
        <div className="list-group my-4">
          {data?.length < 0
            ? "Not found"
            : data?.map((item) => (
                <div
                  className="list-group-item my-2 shadow-sm"
                  style={getPriorityBg(item?.priority)}
                >
                  <div className="d-flex justify-content-between items-center">
                    <div>
                      <h5>{item?.title}</h5>
                    </div>
                    <div className="d-flex items-center">
                      <button
                        className="btn d-flex items-center btn-outline-info me-2"
                        onClick={() => handleShowModal(item?.id)}
                      >
                        <Eye className="me-2" />
                        View
                      </button>
                      {hasLiked(item.likes, getUuid()) ? (
                        <button className="btn d-flex items-center">
                          <Check className="text-success me-2" />
                          You liked
                        </button>
                      ) : (
                        <button
                          className="btn d-flex items-center btn-outline-success me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            // setIncrement(true);
                            handleLikes(item.id);
                          }}
                        >
                          <ThumbsUp className="me-2" />
                          Like
                        </button>
                      )}
                      <div
                        className={`${
                          item?.likes?.length > 0
                            ? "bg-success"
                            : "bg-secondary"
                        } py-2 px-4 text-white`}
                      >
                        {item?.likes?.length}
                      </div>
                    </div>
                    <Modal
                      show={showDetail}
                      onHide={() => handleHideModal(item?.id)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Topic: {anotherDetail}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{detail}</Modal.Body>
                    </Modal>
                  </div>
                </div>
              ))}
        </div>
        {/* {JSON.stringify(data)} */}
      </div>
      {/* <div className="row justify-content-between mx-0 p-5">
        {!data?.length ? (
          <h1 className="text-center display-1 fw-light text-secondary my-5">
            <Frown size={100} /> No Suggestion. Create new one.
          </h1>
        ) : (
          data?.map((item, i) => {
            return (
              <SingleSuggestion
                key={item.id}
                item={item}
                handleChange={(data) => setSuggestionChange(data)}
              />
            );
          })
        )}
      </div> */}
    </>
  );
};

export default Home;
