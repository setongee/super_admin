import React, { useState } from "react";
import "./forms.scss";
import { Xmark } from "iconoir-react";
import { updateMda } from "../../api/create-mda";

export default function FormEditZone({ close, setNew, dataOnload, isEdit }) {
  const [data, setData] = useState({
    fullname: dataOnload?.fullname || "",
    slug: dataOnload?.slug || "",
    type: dataOnload?.type || "",
    firstname: dataOnload?.adminUser?.firstname || "",
    lastname: dataOnload?.adminUser?.lastname || "",
    email: dataOnload?.adminUser?.email || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const getChangedFields = (currentData, originalData) => {
    const changed = {};

    if (currentData.fullname !== originalData?.fullname) {
      changed.fullname = currentData.fullname;
    }

    if (currentData.slug !== originalData?.slug) {
      changed.slug = currentData.slug;
    }

    if (currentData.type !== originalData?.type) {
      changed.type = currentData.type;
    }

    const adminChanges = {};

    if (currentData.firstname !== originalData?.adminUser?.firstname) {
      adminChanges.firstname = currentData.firstname;
    }

    if (currentData.lastname !== originalData?.adminUser?.lastname) {
      adminChanges.lastname = currentData.lastname;
    }

    if (currentData.email !== originalData?.adminUser?.email) {
      adminChanges.email = currentData.email;
    }

    if (Object.keys(adminChanges).length > 0) {
      changed.adminUser = adminChanges;
    }

    return changed;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const filteredValue =
      name === "slug" ? value.replace(/[^a-zA-Z]/g, "") : value;

    setData((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
  };

  const closeShow = () => {
    close();

    setData({
      fullname: "",
      slug: "",
      type: "",
      firstname: "",
      lastname: "",
      email: "",
    });
  };

  const getLandingPageUpdate = (data, dataOnload) => {
    if (data.type === "service") {
      if (dataOnload?.landingPage?.enabledSections) {
        const updated = Object.keys(
          dataOnload.landingPage.enabledSections,
        ).reduce((acc, key) => {
          acc[key] = key === "services";
          return acc;
        }, {});

        console.log("updated", updated);

        return { enabledSections: updated };
      } else {
        return {
          enabledSections: {
            services: true,
          },
        };
      }
    } else if (data.type === "full") {
      if (dataOnload?.landingPage?.enabledSections) {
        const updated = Object.keys(
          dataOnload.landingPage.enabledSections,
        ).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {});

        console.log("updated all sections to true:", updated);

        return { enabledSections: updated };
      }
    }

    return {};
  };

  const handleSubmit = async () => {
    const changedFields = getChangedFields(data, dataOnload);

    const landingPageUpdate = getLandingPageUpdate(data, dataOnload);

    const finalPayload = {
      ...changedFields,
      ...landingPageUpdate,
    };

    if (Object.keys(finalPayload).length === 0) {
      alert("No changes detected!");
      return;
    }

    try {
      await updateMda(dataOnload?._id, finalPayload).then(() => {
        setNew(finalPayload);
        closeShow();
      });
    } catch (error) {
      console.error("Error updating MDA:", error);
      alert("Failed to update MDA. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form__body">
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="main__form">
        <div className="closeIcon" onClick={closeShow}>
          <Xmark />
        </div>

        <div className="form__title">
          <div className="heading">Edit MDA</div>
          <p>Kindly input all valid informations below to create a new site</p>
        </div>

        <div className="form">
          <div className="form__holder">
            <label>Fullname of site</label>
            <input
              type="text"
              name="fullname"
              value={data.fullname}
              placeholder="Enter here..."
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="form__holder">
            <label>Preferred Slug</label>

            <div className="chain">
              <input
                type="text"
                name="slug"
                value={data.slug}
                placeholder="Enter preferred page directory"
                onChange={handleChange}
                disabled={isLoading}
              />

              <strong>
                <p>{`https://lagosstate.gov.ng/${data.slug}`}</p>
              </strong>
            </div>
          </div>

          <div className="form__holder">
            <label>
              Select type (Full Web Application or Service Application)
            </label>

            <select
              name="type"
              onChange={handleChange}
              value={data.type}
              disabled={isLoading}
            >
              <option value=""> --- Select --- </option>
              <option value="full">Full Web Application</option>
              <option value="service">Service Only Application</option>
            </select>
          </div>

          <div className="form__holder">
            <label>Agent's Firstname</label>

            <input
              type="text"
              name="firstname"
              value={data.firstname}
              placeholder="Enter agents firstname..."
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="form__holder">
            <label>Agent's Lastname</label>

            <input
              type="text"
              name="lastname"
              value={data.lastname}
              placeholder="Enter agents lastname..."
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="form__holder">
            <label>Key Agent Email</label>

            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="Enter agents email address..."
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div
            className="ssbmit__button"
            onClick={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading && (
              <div
                className="loading-spinner"
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px",
                  border: "2px solid #f3f3f3",
                  borderTop: "2px solid #000",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginRight: "8px",
                }}
              ></div>
            )}

            {isLoading ? "Updating..." : "Update Information"}
          </div>
        </div>
      </div>
    </div>
  );
}
