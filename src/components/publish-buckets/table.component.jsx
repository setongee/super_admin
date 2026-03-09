import React, { useState, useEffect } from "react";
import { Filter, NavArrowDown, Plus } from "iconoir-react";
import "./table.scss";
import TableDataComponent from "./table.data.component";
import Fuse from "fuse.js";

export default function TableComponent({
  open,
  table__data,
  setNew,
  handleEdit,
}) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // desc or asc
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    setQueryResults(table__data);
  }, [table__data]);

  useEffect(() => {
    const fuseOptions = {
      includeScore: true,
      keys: ["name", "slug", "fullname"],
    };

    const fuse = new Fuse(table__data, fuseOptions);
    const results = fuse.search(query);
    let queriedRes = query ? results.map((res) => res.item) : table__data;

    // Sort by updatedAt
    queriedRes = [...queriedRes].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setQueryResults(queriedRes);
  }, [query, sortOrder, table__data]);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown !== null) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  const toggleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div className="table__view">
      {/* Table Heading Area */}

      <div className="table__actions__area flex flex_align_center flex_justify_space_between">
        <div className="table__title thick">
          {" "}
          Web Pages Publishing ({queryResults.length}){" "}
        </div>

        <div className="table__actions flex flex_align_center">
          <div className="searchComp">
            <input
              placeholder="Search MDAs table..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table Heading */}

      <div className="table__heading">
        <div className="table__data head__data">
          <div className="table__heading_title">#Draft Id</div>
          <div className="table__heading_title">#MDA Name</div>
          <div
            className="table__heading_title sortable"
            onClick={toggleSort}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            Last Updated
            <NavArrowDown
              style={{
                transform:
                  sortOrder === "asc" ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </div>
          <div className="table__heading_title">Status</div>
          <div className="table__heading_title"></div>
        </div>

        {queryResults.length ? (
          queryResults.map((res, index) => {
            return (
              <TableDataComponent
                data={res}
                key={res._id || index}
                setNew={setNew}
                handleEdit={handleEdit}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            );
          })
        ) : (
          <p className="empty"> Sorry no MDA has been created yet! </p>
        )}
      </div>
    </div>
  );
}
