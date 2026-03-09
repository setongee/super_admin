import {
  Check,
  DotArrowDown,
  MoreVertCircle,
  NavArrowDown,
} from "iconoir-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

// icons

import LogoMinistry from "../../assets/MDA/ministry.svg";
import LogoDepartment from "../../assets/MDA/department.svg";
import LogoAgency from "../../assets/MDA/agency.svg";
import { truncateText } from "../truncateText.jsx/truncateText";
import { deleteSingleMda } from "../../api/create-mda";

export default function TableDataComponent({
  data,
  setNew,
  handleEdit,
  activeDropdown,
  setActiveDropdown,
}) {
  const showMore = activeDropdown === data._id;

  const handleOpenMore = (e) => {
    e.stopPropagation();
    setActiveDropdown(showMore ? null : data._id);
  };

  const handleDelete = () => {
    const response = window.confirm(
      `Are you sure you want to delete the record for '${data.fullname}'?`,
    );

    if (response) {
      deleteSingleMda(data._id)
        .then((res) => {
          setNew(res);
          setActiveDropdown(null);
        })
        .catch((err) => {
          console.error("Error deleting MDA:", err);
          setActiveDropdown(null);
        });
    }
  };

  const handleViewLiveURL = () => {
    const url = `https://lagosstate.gov.ng/${data.slug}`;
    window.open(url, "_blank");
    setActiveDropdown(null);
  };

  const handleEditApp = () => {
    handleEdit(data);
    setActiveDropdown(null);
  };

  return (
    <div className="table__data body__area">
      <div className="table__heading_title flex__column">
        <div className="logo">
          {" "}
          <img
            src={LogoMinistry}
            alt="Lagos State Ministries, Departments & Agencies"
          />{" "}
        </div>

        <div className="mda__name">
          <div className="main">{data.fullname}</div>
          <a
            href={`https://lagosstate.gov.ng/${data.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sub lowercase"
          >
            {`https://lagosstate.gov.ng/${data.slug}`}
          </a>
        </div>
      </div>
      <div className="table__heading_title">
        {data.adminUser?.firstname} {data.adminUser?.lastname}
      </div>
      <div className="table__heading_title">
        {truncateText(data.adminUser?.email, 25)}
      </div>
      <div className="table__heading_title">
        {" "}
        {data.updatedAt.split("T")[0]}
      </div>
      <div className="table__heading_title">
        {data.isOffline ? (
          <div className="status offline">
            <p>OFFLINE</p>
          </div>
        ) : (
          <div className="status">
            <p>ACTIVE</p>
          </div>
        )}
      </div>

      <div className="table__heading_title action-btn" onClick={handleOpenMore}>
        Action <NavArrowDown />
      </div>

      {showMore ? (
        <div className="more" id="more">
          <p
            className={data.isOffline ? "disabled" : ""}
            onClick={(e) => {
              e.stopPropagation();
              !data.isOffline && handleViewLiveURL();
            }}
            style={{
              opacity: data.isOffline ? 0.5 : 1,
              cursor: data.isOffline ? "not-allowed" : "pointer",
            }}
          >
            View Live URL
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleEditApp();
            }}
          >
            Edit App
          </p>
          <p
            className="del"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            style={{ color: "red" }}
          >
            Delete App
          </p>
        </div>
      ) : null}
    </div>
  );
}
