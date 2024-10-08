import React,{useState, useEffect} from 'react'
import TableComponent from '../../components/table/table.component'
import Form from '../../components/forms/Form'
import UIHolder from '../../components/holder/ui__holder'
import ServiceTable from './serviceTable'
import axios from 'axios'
import AddService from './addService'
import { getServices, getSingleService } from '../../api/services.req'
import EditService from './EditService'
import { getAllCategory } from '../../api/category.req'

export default function Services() {

  const [openModal, setOpenModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [singleService, setSingleService] = useState([]);
  const [newData, setNewData] = useState([]);
  const [category, setCategory] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {

    getAllCategory().then( e => setCategory(e.data) );
    getServices().then( e => setServices(e.data) );
    
  }, [newData]);

  const addService = () =>{

    setOpenModal(true);

  }

  const closeModal = () => {

    setOpenModal(false);

  }

  const editService = (id) =>{

    getSingleService(id).then( e => {

      setSingleService(e.data);
      setOpenEditServiceModal(true);
      
    } );

  }

  const closeEdeitServiceModal = () => {

    setOpenEditServiceModal(false);

  }

  return (

    <div className="services">

        { openModal ? <AddService setNew = {setNewData} category = {category} close = {closeModal} /> : null }

        { openEditServiceModal ? <EditService setNew = {setNewData} category = {category} close = {closeEdeitServiceModal} inData = {singleService} /> : null }

        <UIHolder>
            
            <ServiceTable open = {addService} table__data = {services} setNew = {setNewData} handleEdit = {editService} />

        </UIHolder>

    </div>

  )

}
