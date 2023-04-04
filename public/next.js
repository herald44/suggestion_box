import React, { useState, useEffect } from "react";
import Nav from "../components/navbar/Nav";
import ModalDiv from "../components/navbar/modal/Modal";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("mySuggestions")) || []);
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Nav setShowModal={setShowModal} />
      <div className="container shadow p-4">
        {[...Array(3)]?.map((item, i) => (
          <a href="http://" key={i} className="card mb-2 p-4">
            <h5>Title</h5>
            <p>{`Description goes here.`}</p>
          </a>
        ))}
      </div>
      <ModalDiv showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
