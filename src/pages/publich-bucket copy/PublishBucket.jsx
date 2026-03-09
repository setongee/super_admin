import React, { useState, useEffect } from "react";
import UIHolder from "../../components/holder/ui__holder";
import Loader from "../../components/loader/loader";
import { Filter, NavArrowDown } from "iconoir-react";
import Fuse from "fuse.js";
import { getAllPublishedPages } from "../../api/publish";
import "./publish-bucket.scss";

export default function PublishBucket() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllPublishedPages()
      .then((res) => {
        setTableData(res?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching published pages:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fuseOptions = {
      includeScore: true,
      keys: ["draftId", "mda", "status"],
    };

    const fuse = new Fuse(tableData, fuseOptions);
    const results = fuse.search(query);
    let queriedRes = query ? results.map((res) => res.item) : tableData;

    // Sort by date last updated
    queriedRes = [...queriedRes].sort((a, b) => {
      const dateA = new Date(a.dateLastUpdated);
      const dateB = new Date(b.dateLastUpdated);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setQueryResults(queriedRes);
  }, [query, sortOrder, tableData]);

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

  const getStatusTheme = (status) => {
    switch (status) {
      case "pending":
        return "pending";
      case "content-approved":
        return "content-approved";
      case "published":
        return "published";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "content-approved":
        return "Content Approved";
      case "published":
        return "Published";
      default:
        return status;
    }
  };

  const handleApprove = (draftId) => {
    console.log("Approve draft:", draftId);
    // TODO: Implement approve functionality
  };

  const handleDecline = (draftId) => {
    console.log("Decline draft:", draftId);
    // TODO: Implement decline functionality
  };

  const handlePublish = (draftId) => {
    console.log("Publish draft:", draftId);
    // TODO: Implement publish functionality
  };

  return (
    <div className="publish-bucket">
      <UIHolder>
        {loading ? <Loader /> : null}

        <div className="table__view">
          {/* Table Heading Area */}
          <div className="table__actions__area flex flex_align_center flex_justify_space_between">
            <div className="table__title thick">Publish Bucket</div>

            <div className="table__actions flex flex_align_center">
              <div className="table__search flex flex_align_center">
                <div className="icon">
                  <Filter />
                </div>
                <input
                  placeholder="Search drafts..."
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
              <div className="table__heading_title">Draft ID</div>
              <div className="table__heading_title">MDA</div>
              <div className="table__heading_title">Status</div>
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
                Date Last Updated
                <NavArrowDown
                  style={{
                    transform:
                      sortOrder === "asc" ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </div>
              <div className="table__heading_title"></div>
            </div>
          </div>

          {/* Table Data */}
          <div className="table__body">
            {queryResults.map((item, index) => (
              <div key={item.draftId || index} className="table__data">
                <div className="table__heading_title">{item.draftId}</div>
                <div className="table__heading_title">{item.mda}</div>
                <div className="table__heading_title">
                  <div className={`status ${getStatusTheme(item.status)}`}>
                    <p>{getStatusText(item.status)}</p>
                  </div>
                </div>
                <div className="table__heading_title">
                  {item.dateLastUpdated
                    ? item.dateLastUpdated.split("T")[0]
                    : "N/A"}
                </div>
                <div
                  className="table__heading_title action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(
                      activeDropdown === item.draftId ? null : item.draftId,
                    );
                  }}
                >
                  Action <NavArrowDown />
                </div>

                {activeDropdown === item.draftId && (
                  <div className="more" id="more">
                    {item.status === "pending" && (
                      <>
                        <p
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(item.draftId);
                            setActiveDropdown(null);
                          }}
                        >
                          Approve Draft
                        </p>
                        <p
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecline(item.draftId);
                            setActiveDropdown(null);
                          }}
                        >
                          Decline Draft
                        </p>
                      </>
                    )}
                    {item.status === "content-approved" && (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePublish(item.draftId);
                          setActiveDropdown(null);
                        }}
                      >
                        Publish Draft
                      </p>
                    )}
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(null);
                      }}
                    >
                      View Details
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </UIHolder>
    </div>
  );
}
