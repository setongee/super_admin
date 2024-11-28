import React,{useState, useEffect} from 'react'
import TableComponent from '../../components/table/table.component'
import Form from '../../components/forms/Form'
import UIHolder from '../../components/holder/ui__holder'
import ServiceTable from './serviceTable'
import axios from 'axios'
import AddService from './addService'
import { getServices, getSingleService, updateSingleService } from '../../api/services.req'
import EditService from './EditService'
import { getAllCategory } from '../../api/category.req'
import Loader from '../../components/loader/loader'

export default function Services() {

  const [openModal, setOpenModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [singleService, setSingleService] = useState([]);
  const [newData, setNewData] = useState([]);
  const [category, setCategory] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    getAllCategory().then( e => setCategory(e.data) );
    getServices().then( e => {

      setServices(e.data)
      setLoading(false)
      
    } );
    
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

  const updateAll = async () => {

    // const red = services.filter(e => !e.keywordsTrim)
    // console.log(red)

      // services.map( async(res, index) => {

      //   const uid = res._id;

      //   await getSingleService(uid)
      //   .then( async (e) => {

      //     const response = e.data.keywordsGroup;
      //     const arr = Object.entries(response).map(res => res[1]);
      //     const newArray = [].concat(...arr);

      //     const newData = {...e.data, keywordsTrim : newArray}
          
      //     await updateSingleService(uid, newData).then( () => console.log("updated") );

      //     console.log("updated" + " " + index );

      //   } )

      // })

  }

  return (

    <div className="services">

        {/* <div className="buttonReload" onClick={()=>updateAll()} style={ { position : "fixed", top : "50px", cursor : "pointer", borderRadius : "8px", left : "50%", padding : "20px 30px", backgroundColor : "orange", color : "#fff", zIndex : 9999999 } } > RefreshServices </div> */}

        { openModal ? <AddService setNew = {setNewData} category = {category} close = {closeModal} /> : null }

        { openEditServiceModal ? <EditService setNew = {setNewData} category = {category} close = {closeEdeitServiceModal} inData = {singleService} /> : null }

        <UIHolder>

            { loading ? <Loader/> : null }
            <ServiceTable open = {addService} table__data = {services} setNew = {setNewData} handleEdit = {editService} loading = {loading} />

        </UIHolder>

    </div>

  )

}
