import React, { useState, useEffect } from "react";
import UIHolder from "../../components/holder/ui__holder";
import axios from "axios";
import { getAllMdas, getMdasDirectory, getSingleMda } from "../../api/mda.req";
import Loader from "../../components/loader/loader";
import TableComponent from "../../components/mda-pages-table/table.component";
import Form from "../../components/forms-web-pages/Form";
import FormEditZone from "../../components/forms-web-pages/FormEditZone";

export default function MdaPages() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [table__data, setTableData] = useState([]);
  const [newMda, setNewMda] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [loading, setLoading] = useState(false);

  const openShow = () => {
    setShow(true);
  };

  const closeShow = () => {
    setShow(false);
  };

  const closeShowEdit = () => {
    setShowEdit(false);
  };

  const handleEdit = async (item) => {
    setDataEdit(item);
    setShowEdit(true);
  };

  useEffect(() => {
    setLoading(true);
    getMdasDirectory().then((res) => {
      setTableData(res?.data || []);
      setLoading(false);
    });
  }, [newMda]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [show]);

  const dataTable = {
    type: "",
    name: "",
    slug: "",
    email: "",
    firstname: "",
    lastname: "",
  };

  console.log(dataEdit);

  return (
    <div className="mdas">
      <UIHolder>
        {loading ? <Loader /> : null}

        <TableComponent
          open={openShow}
          table__data={table__data}
          setNew={setNewMda}
          handleEdit={handleEdit}
        />

        {show ? (
          <Form close={closeShow} setNew={setNewMda} dataOnload={dataTable} />
        ) : null}

        {showEdit ? (
          <FormEditZone
            close={closeShowEdit}
            setNew={setNewMda}
            dataOnload={dataEdit}
            isEdit={true}
          />
        ) : null}
      </UIHolder>
    </div>
  );
}
