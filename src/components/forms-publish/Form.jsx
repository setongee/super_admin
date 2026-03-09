import React, { useState, useEffect } from "react";
import "./forms.scss";
import { Xmark } from "iconoir-react";
import axios from "axios";
import { addSingleMda } from "../../api/mda.req";
import { createMda } from "../../api/create-mda";

export default function Form({ close, setNew }) {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow alphabets for slug field
    const filteredValue =
      name === "proposedSlug" ? value.replace(/[^a-zA-Z]/g, "") : value;

    setData((res) => {
      return {
        ...res,
        [name]: filteredValue,
      };
    });
  };

  const closeShow = () => {
    close();
    setData({});
  };

  const handleSubmit = async () => {
    if (
      data.type === "" ||
      data.mdaFullname === "" ||
      data.proposedSlug === "" ||
      data.firstname === "" ||
      data.lastname === "" ||
      data.email === ""
    ) {
      alert("All fields are required before adding. Try again!");
    } else {
      createMda({ ...data, password: "SecurePass123!", role: "admin" }).then(
        (res) => {
          setNew(res);
          closeShow();
        },
      );
    }
  };

  return (
    <div className="form__body">
      <div className="main__form">
        <div className="closeIcon" onClick={() => closeShow()}>
          {" "}
          <Xmark />{" "}
        </div>

        <div className="form__title">
          <div className="heading">Add new MDA</div>
          <p>Kindly input all valid informations below to create a new site</p>
        </div>

        <div className="form">
          {/* Fullname */}

          <div className="form__holder">
            <label> Fullname of site </label>
            <input
              type="text"
              name="mdaFullname"
              value={data.mdaFullname || ""}
              placeholder="Enter here..."
              onChange={handleChange}
            />
          </div>

          {/* slug */}

          <div className="form__holder">
            <label> Preferred Slug</label>
            <div className="chain">
              <input
                type="text"
                name="proposedSlug"
                value={data.proposedSlug?.toLowerCase() || ""}
                placeholder="Enter preferred page directory"
                onChange={handleChange}
              />
              <strong>
                <p>{`https://lagosstate.gov.ng/${data.proposedSlug?.toLowerCase() || ""}`}</p>
              </strong>
            </div>
          </div>

          {/* Type */}

          <div className="form__holder">
            <label>
              Select type (Full Web Application or Service Application){" "}
            </label>
            <select name="type" onChange={handleChange} value={data.type}>
              <option value=""> --- Select --- </option>
              <option value="full">Full Web Application</option>
              <option value="service">Service Only Application</option>
            </select>
          </div>

          {/* Agent_name */}

          <div className="form__holder">
            <label> Agent's Firstname </label>
            <input
              type="text"
              name="firstname"
              value={data.firstname}
              placeholder="Enter agents firstname..."
              onChange={handleChange}
            />
          </div>

          {/* Agent_lastname */}

          <div className="form__holder">
            <label> Agent's Lastname </label>
            <input
              type="text"
              name="lastname"
              value={data.lastname}
              placeholder="Enter agents lastname..."
              onChange={handleChange}
            />
          </div>

          {/* MDA Email */}

          <div className="form__holder">
            <label> Key Agent Email </label>
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="Enter agents email address..."
              onChange={handleChange}
            />
          </div>

          <div className="ssbmit__button" onClick={handleSubmit}>
            {" "}
            Proceed{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
