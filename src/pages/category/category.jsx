import React,{useState, useEffect} from 'react'
import UIHolder from '../../components/holder/ui__holder'
import { getAllCategory, getSingleCategory } from '../../api/category.req'
import Table from './Table'
import AddCategory from './addCategory'
import EditCategory from './EditCategory'

export default function Category() {

  const [openModal, setOpenModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [singleCategory, setSingleCategory] = useState([]);
  const [newData, setNewData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {

    getAllCategory().then( e => setCategory(e.data) );
    
  }, [newData]);

  const addService = () =>{

    setOpenModal(true);

  }

  const closeModal = () => {

    setOpenModal(false);

  }

  const editService = (id) =>{

    getSingleCategory(id).then( e => {

      setSingleCategory(e.data)
      setOpenEditServiceModal(true);
      console.log(e.data)
      
    } );

  }

  const closeEdeitServiceModal = () => {

    setOpenEditServiceModal(false);

  }

  return (

    <div className="services">

        { openModal ? <AddCategory setNew = {setNewData} category = {category} close = {closeModal} /> : null }

        { openEditServiceModal ? <EditCategory setNew = {setNewData} category = {category} close = {closeEdeitServiceModal} inData = {singleCategory} /> : null }

        <UIHolder>

            <Table open = {addService} table__data = {category} setNew = {setNewData} handleEdit = {editService} />

        </UIHolder>

    </div>

  )

}
