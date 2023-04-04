import React, { useState } from "react";
import { RefreshCcw, Search } from "react-feather";
import { Plus } from "react-feather";
import img from "../../images/maviance.jpeg";
import "./Nav.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Nav = ({ setShowModal, data, setData }) => {
  const [searchValue, setSearchValue] = useState("");

  const sorter = (value) => {
    if (value === "latest") {
      data.sort((a, b) => b.date - a.date);
      console.log("clicked");
    }
    if (value === "oldest") {
      data.sort((a, b) => a.date - b.date);
      console.log("clicked");
    }
    if (value === "high") {
      data.sort((a, b) => a.priority.localeCompare(b.priority));
    }
    if (value === "normal") {
      data.sort((a, b) => b.priority.localeCompare(a.priority));
    }
    setData([...data]);
  };

  const search = (e) => {
    e.preventDefault();
    let newData;
    if (searchValue) {
      newData = data.filter((x) =>
        x.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setData([...newData]);
    }
  };

  const refresh = () => {
    // setData(JSON.parse(localStorage.getItem("mySuggestions")));
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
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  sort By:
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => sorter("latest")}
                    >
                      Latest First
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => sorter("oldest")}
                    >
                      Oldest first
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => sorter("high")}>
                      Priority high
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => sorter("normal")}
                    >
                      Priority normal
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="hero">
        <div className="d-flex justify-content-between items-end py-4">
          <div className="d-flex items-center">
            <div style={{ height: "100px", width: "70px" }}>
              <img
                src={img}
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
              />
            </div>
            <h1 className="ps-4 pt-4">{"Suggestion Box"}</h1>
          </div>
          <div>
            <li className="nav-item mx-2">
              <button
                className="nav-link btn btn-sm btn-primary text-light px-2 my-3"
                onClick={() => {
                  setShowModal(true);
                  console.log("clicked");
                }}
              >
                <Plus /> Add New Issue
              </button>
            </li>
          </div>
        </div>
        <form className="d-flex" onSubmit={search}>
          <input
            className="form-control px-3"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="btn btn-secondary">{"Search"}</button>
          <button
            className="btn btn-outline-success ms-2"
            onClick={refresh}
            type="button"
          >
            <RefreshCcw />
          </button>
        </form>
      </div>
    </>
  );
};

export default Nav;
