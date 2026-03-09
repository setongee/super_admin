import React, { useState, useEffect } from "react";
import { Edit, Eye } from "iconoir-react";
import { formatDate2 } from "../../middleware/middleware";
import Loader from "../../components/loader/loader";
import Form from "../../components/forms-publish/Form";
import FormEditZone from "../../components/forms-publish/FormEditZone";
import { getAllPublishedPages, updateDraft } from "../../api/publish";
import "./PublishBucket.css";
import { getSingleUser } from "../../api/auth/user";

const MdaPages = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [actionItem, setActionItem] = useState(null);
  const [actionNotes, setActionNotes] = useState("");
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("admin"); // This should come from auth context

  useEffect(() => {
    const user = window.localStorage.getItem("lasg_token");
    const parser = JSON.parse(user);
    getSingleUser(parser.id).then((res) =>
      setUser({
        firstname: res.firstname,
        lastname: res.lastname,
        role: res.role,
      }),
    );
    setUserRole(parser.role);
  }, []);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllPublishedPages();
        setPages(response);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPages();
  }, []);

  const openShow = () => {
    setShow(true);
  };

  const closeShow = () => {
    setShow(false);
  };

  const closeShowEdit = () => {
    setShowEdit(false);
  };

  const handleEdit = (item) => {
    setShowEdit(true);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleApprove = (item) => {
    setActionItem(item);
    setActionNotes("");
    setShowApproveModal(true);
    setActiveDropdown(null);
  };

  const handlePublish = (item) => {
    setActionItem(item);
    setActionNotes("");
    setShowPublishModal(true);
    setActiveDropdown(null);
  };

  const handleReject = (item) => {
    setActionItem(item);
    setActionNotes("");
    setShowRejectModal(true);
    setActiveDropdown(null);
  };

  const confirmApprove = async () => {
    try {
      const updateData = {
        status: userRole === "comms" ? "content approved" : "published",
        notes: actionNotes,
        approvedBy: `${user?.firstname} ${user?.lastname}`,
      };

      const response = await updateDraft(actionItem._id, updateData);

      if (response.status === 200) {
        // Success notification
        const message =
          userRole === "comms"
            ? "Content approved successfully!"
            : "Draft published successfully!";

        // Create success notification
        const notification = document.createElement("div");
        notification.className = "success-notification";
        notification.textContent = message;
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 10000;
          font-weight: 500;
          transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);

        console.log("Draft approved/published successfully");
        refreshPages();
      }
    } catch (err) {
      console.error("Error approving/publishing draft:", err);
    } finally {
      setShowApproveModal(false);
      setActionItem(null);
      setActionNotes("");
    }
  };

  const confirmPublish = async () => {
    try {
      const updateData = {
        status: "published",
        notes: actionNotes,
        approvedBy: `${user?.firstname} ${user?.lastname}`,
      };

      const response = await updateDraft(actionItem._id, updateData);

      if (response.status === 200) {
        // Success notification
        const message = "Draft published successfully!";

        // Create success notification
        const notification = document.createElement("div");
        notification.className = "success-notification";
        notification.textContent = message;
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 10000;
          font-weight: 500;
          transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);

        console.log("Draft published successfully");
        refreshPages();
      }
    } catch (err) {
      console.error("Error publishing draft:", err);
    } finally {
      setShowPublishModal(false);
      setActionItem(null);
      setActionNotes("");
    }
  };

  const refreshPages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAllPublishedPages();
      setPages(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmReject = async () => {
    try {
      const updateData = {
        status: "rejected",
        reasonForRejection: actionNotes,
        rejectedBy: `${user?.firstname} ${user?.lastname}`,
      };

      const response = await updateDraft(actionItem._id, updateData);

      if (response.status === 200) {
        // Success notification
        const message = "Draft rejected successfully!";

        // Create success notification
        const notification = document.createElement("div");
        notification.className = "success-notification";
        notification.textContent = message;
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #ef4444;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 10000;
          font-weight: 500;
          transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
          notification.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 300);
        }, 3000);

        console.log("Draft rejected successfully");
        refreshPages();
      }
    } catch (err) {
      console.error("Error rejecting draft:", err);
    } finally {
      setShowRejectModal(false);
      setActionItem(null);
      setActionNotes("");
    }
  };

  const toggleDropdown = (pageId, event) => {
    event.stopPropagation();
    if (activeDropdown !== null) {
      setActiveDropdown(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setActiveDropdown({
        id: pageId,
        x: rect.right,
        y: rect.bottom,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown !== null) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-title">Error loading published pages</p>
          <p className="error-description">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading || !pages) {
    return <Loader />;
  }

  const filteredPages =
    pages?.data?.filter((page) => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        page.name?.toLowerCase().includes(searchLower) ||
        page.mdaName?.toLowerCase().includes(searchLower) ||
        page.slug?.toLowerCase().includes(searchLower)
      );
    }) || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "content approved":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  if (!filteredPages.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 40 40"
            height="40"
            width="40"
          >
            <desc>Document Streamline Icon: https://streamlinehq.com</desc>
            <g id="Document--Streamline-Solar">
              <path
                id="Vector"
                fill="#374151"
                d="M8.333333333333334 3.3333333333333335c-2.301166666666667 0 -4.166666666666667 1.8655 -4.166666666666667 4.166666666666667v25c0 2.3011666666666668 1.8655 4.166666666666667 4.166666666666667 4.166666666666667h23.333333333333336c2.3011666666666668 0 4.166666666666667 -1.8655 4.166666666666667 -4.166666666666667v-18.333333333333332c0 -2.3011666666666668 -1.8655 -4.166666666666667 -4.166666666666667 -4.166666666666667h-23.333333333333336Z"
                strokeWidth="1.6667"
              ></path>
              <path
                id="Vector_2"
                fill="#ffffff"
                d="M10 10h20c0.9200000000000002 0 1.6666666666666667 0.7466666666666667 1.6666666666666667 1.6666666666666667s-0.7466666666666667 1.6666666666666667 -1.6666666666666667 1.6666666666666667h-20c-0.9200000000000002 0 -1.6666666666666667 -0.7466666666666667 -1.6666666666666667 -1.6666666666666667s0.7466666666666667 -1.6666666666666667 1.6666666666666667 -1.6666666666666667Z"
                strokeWidth="1.6667"
              ></path>
              <path
                id="Vector_3"
                fill="#ffffff"
                d="M10 16.666666666666668h13.333333333333334c0.9200000000000002 0 1.6666666666666667 0.7466666666666667 1.6666666666666667 1.6666666666666667s-0.7466666666666667 1.6666666666666667 -1.6666666666666667 1.6666666666666667h-13.333333333333334c-0.9200000000000002 0 -1.6666666666666667 -0.7466666666666667 -1.6666666666666667 -1.6666666666666667s0.7466666666666667 -1.6666666666666667 1.6666666666666667 -1.6666666666666667Z"
                strokeWidth="1.6667"
              ></path>
            </g>
          </svg>
        </div>
        <div className="empty-state-content">
          <h1 className="empty-state-title">No Published Pages Yet</h1>
          <p className="empty-state-description">
            You don't have any published pages yet. Create your first page to
            get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="publish-bucket-container">
      <h1 className="table-title">Published Pages</h1>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="publish-table">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th>Draft Id</th>
                <th>MDA</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPages.map((page, index) => (
                <tr key={page._id || index}>
                  <td>
                    <span className="text-gray-600">{page.draftId}</span>
                  </td>
                  <td>
                    <span className="text-gray-600 font-mono">/{page.mda}</span>
                  </td>
                  <td>
                    <span className="text-gray-600">
                      {formatDate2(page.updatedAt)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge status-${(page.status || "draft").toLowerCase().replace(" ", "-")}`}
                    >
                      {(page.status || "draft").charAt(0).toUpperCase() +
                        (page.status || "draft").slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td>
                    <div className="action-dropdown">
                      <button
                        className="action-button dropdown-toggle"
                        onClick={(e) => {
                          toggleDropdown(page._id || index, e);
                        }}
                      >
                        Actions
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`dropdown-arrow ${activeDropdown && activeDropdown.id === (page._id || index) ? "open" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      {activeDropdown &&
                        activeDropdown.id === (page._id || index) && (
                          <div
                            className="dropdown-menu"
                            style={{
                              left: `${activeDropdown.x - 120}px`,
                              top: `${activeDropdown.y}px`,
                            }}
                          >
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                window.open(
                                  `https://lagosstate.gov.ng/${page.mda}/draft/${page.draftId}`,
                                  "_blank",
                                );
                                setActiveDropdown(null);
                              }}
                            >
                              Preview Draft
                            </button>
                            <button
                              className="dropdown-item"
                              disabled={
                                userRole === "admin" &&
                                page.status === "pending"
                              }
                              style={{
                                opacity:
                                  userRole === "admin" &&
                                  page.status === "pending"
                                    ? 0.5
                                    : 1,
                                cursor:
                                  userRole === "admin" &&
                                  page.status === "pending"
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                              onClick={() => {
                                if (userRole === "comms") {
                                  handleApprove(page);
                                } else if (
                                  userRole === "admin" &&
                                  page.status === "pending"
                                ) {
                                  // Show tooltip for pending drafts
                                  return;
                                } else {
                                  handlePublish(page);
                                }
                              }}
                              title={
                                userRole === "admin" &&
                                page.status === "pending"
                                  ? "You can't publish this draft yet until content is approved"
                                  : ""
                              }
                            >
                              {userRole === "comms"
                                ? "Approve Content"
                                : "Publish Page"}
                            </button>
                            <button
                              className="dropdown-item delete"
                              disabled={
                                userRole === "admin" &&
                                page.status !== "content approved"
                              }
                              style={{
                                opacity:
                                  userRole === "admin" &&
                                  page.status !== "content approved"
                                    ? 0.5
                                    : 1,
                                cursor:
                                  userRole === "admin" &&
                                  page.status !== "content approved"
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                              onClick={() => {
                                if (userRole === "comms") {
                                  handleReject(page);
                                  setActiveDropdown(null);
                                } else if (
                                  userRole === "admin" &&
                                  page.status !== "content approved"
                                ) {
                                  // Admin can't reject until content is approved
                                  return;
                                } else {
                                  handleReject(page);
                                  setActiveDropdown(null);
                                }
                              }}
                              title={
                                userRole === "admin" &&
                                page.status !== "content approved"
                                  ? "You can't reject this draft until content is approved"
                                  : ""
                              }
                            >
                              Reject Changes
                            </button>
                          </div>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPages.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 40 40"
                height="40"
                width="40"
              >
                <desc>Document Streamline Icon: https://streamlinehq.com</desc>
                <g id="Document--Streamline-Solar">
                  <path
                    id="Vector"
                    fill="#374151"
                    d="M8.333333333333334 3.3333333333333335c-2.301166666666667 0 -4.166666666666667 1.8655 -4.166666666666667 4.166666666666667v25c0 2.3011666666666668 1.8655 4.166666666666667 4.166666666666667 4.166666666666667h23.333333333333336c2.3011666666666668 0 4.166666666666667 -1.8655 4.166666666666667 -4.166666666666667v-18.333333333333332c0 -2.3011666666666668 -1.8655 -4.166666666666667 -4.166666666666667 -4.166666666666667h-23.333333333333336Z"
                    strokeWidth="1.6667"
                  ></path>
                  <path
                    id="Vector_2"
                    fill="#ffffff"
                    d="M10 10h20c0.9200000000000002 0 1.6666666666666667 0.7466666666666667 1.6666666666666667 1.6666666666666667s-0.7466666666666667 1.6666666666666667 -1.6666666666666667 1.6666666666666667h-20c-0.9200000000000002 0 -1.6666666666666667 -0.7466666666666667 -1.6666666666666667 -1.6666666666666667s0.7466666666666667 -1.6666666666666667 1.6666666666666667 -1.6666666666666667Z"
                    strokeWidth="1.6667"
                  ></path>
                  <path
                    id="Vector_3"
                    fill="#ffffff"
                    d="M10 16.666666666666668h13.333333333333334c0.9200000000000002 0 1.6666666666666667 0.7466666666666667 1.6666666666666667 1.6666666666666667s-0.7466666666666667 1.6666666666666667 -1.6666666666666667 1.6666666666666667h-13.333333333333334c-0.9200000000000002 0 -1.6666666666666667 -0.7466666666666667 -1.6666666666666667 -1.6666666666666667s0.7466666666666667 -1.6666666666666667 1.6666666666666667 -1.6666666666666667Z"
                    strokeWidth="1.6667"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="empty-state-content">
              <h1 className="empty-state-title">No Published Pages Yet</h1>
              <p className="empty-state-description">
                You don't have any published pages yet.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="table-footer">
        <div>
          Showing {filteredPages.length} of {pages?.data?.length || 0} pages
        </div>
        {filteredPages.length > 0 && (
          <div className="last-updated">
            Last updated:{" "}
            {formatDate2(pages?.data?.[0]?.updatedAt || new Date())}
          </div>
        )}
      </div>

      {/* Edit Form Modal */}
      {showEdit && (
        <FormEditZone
          close={closeShowEdit}
          setNew={refreshPages}
          dataOnload={{}}
          isEdit={true}
        />
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1 className="modal-title">
              Are you sure you want to publish{" "}
              <strong>"{actionItem?.name || actionItem?.draftId}"</strong>?
            </h1>
            <p className="modal-description">
              This action will publish the draft and make it live on the
              website.
            </p>
            <div className="form-group">
              <label htmlFor="publish-notes" className="form-label">
                Notes (Optional)
              </label>
              <textarea
                id="publish-notes"
                className="form-textarea"
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Add any notes about this publication..."
                rows="4"
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowPublishModal(false)}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button onClick={confirmPublish} className="modal-button approve">
                Publish Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1 className="modal-title">
              Are you sure you want to approve{" "}
              <strong>"{actionItem?.name || actionItem?.draftId}"</strong>?
            </h1>
            <p className="modal-description">
              {userRole === "comms"
                ? "This action will approve the content and make it ready for publishing."
                : "This action will approve the draft and make it ready for publishing."}
            </p>
            <div className="form-group">
              <label htmlFor="approve-notes" className="form-label">
                Notes (Optional)
              </label>
              <textarea
                id="approve-notes"
                className="form-textarea"
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder={
                  userRole === "comms"
                    ? "Add any notes about this content approval..."
                    : "Add any notes about this approval..."
                }
                rows="4"
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowApproveModal(false)}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button onClick={confirmApprove} className="modal-button approve">
                {userRole === "comms" ? "Approve Content" : "Approve Draft"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1 className="modal-title">
              Are you sure you want to reject{" "}
              <strong>"{actionItem?.name || actionItem?.draftId}"</strong>?
            </h1>
            <p className="modal-description">
              This action will reject the draft changes and send it back for
              revision.
            </p>
            <div className="form-group">
              <label htmlFor="reject-notes" className="form-label">
                Notes (Required)
              </label>
              <textarea
                id="reject-notes"
                className="form-textarea"
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Please provide reasons for rejecting this draft..."
                rows="4"
                required
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowRejectModal(false)}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="modal-button delete"
                disabled={!actionNotes.trim()}
              >
                Reject Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1 className="modal-title">
              Are you sure you want to delete{" "}
              <strong>"{itemToDelete?.name}"</strong>?
            </h1>
            <p className="modal-description">
              This action cannot be undone. Once deleted, the page will be
              permanently removed.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="modal-button cancel"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="modal-button delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MdaPages;
