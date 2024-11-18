import React, {useState, useEffect} from 'react'
import TableComponent from '../../components/table/table.component'
import UIHolder from '../../components/holder/ui__holder'
import Form from '../../components/forms/Form'
import axios from 'axios'
import FormEdit from '../../components/forms/FormEdit'
import { getAllMdas, getSingleMda } from '../../api/mda.req'
import Loader from '../../components/loader/loader'

export default function Mda() {

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [table__data, setTableData] = useState([]);
  const [newMda, setNewMda] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [loading, setLoading] = useState(false);

  const openShow = () => {

      setShow(true);

  }

  const closeShow = () => {

    setShow(false);

}

const closeShowEdit = () => {

  setShowEdit(false)

}

const handleEdit = async (id) => {

  getSingleMda(id)
  .then( res => {
    setDataEdit(res);
    setShowEdit(true);
  })

}

useEffect(() => {

  setLoading(true);

  getAllMdas().then( res => {

    setTableData(res);
    setLoading(false)

  } );

}, [newMda]);



  const dataTable = {
      type : '',
      name : '',
      subdomain : '',
      email : '',
      agent_name : ''
  }

  return (

    <div className="mdas">

        <UIHolder>

            { loading ? <Loader/> : null }

            <TableComponent open = {openShow} table__data={table__data} setNew = {setNewMda} handleEdit = {handleEdit} />
            
            {
              show ? <Form close = {closeShow} setNew = {setNewMda} dataOnload = {dataTable} /> : null
            }

            {
              showEdit ? <FormEdit close = {closeShowEdit} setNew = {setNewMda} dataOnload = {dataEdit} /> : null
            }
            

        </UIHolder>

    </div>

  )

}
