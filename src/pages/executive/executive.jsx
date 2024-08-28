import React,{useState, useEffect} from 'react'

import UIHolder from '../../components/holder/ui__holder'
import AddNews from './addExecutive'

import { getCategories } from '../../api/services.req'
import { getAllNews, getSingleNews } from '../../api/news.req'

import EditService from './editExecutiveMember'
import EditNews from './editExecutiveMember'
import ExecutiveTable from './executive_table'

import './executive.scss'
import AddCouncilMember from './addExecutive'
import { getAllMembers, getSingleMember } from '../../api/executives.req'
import EditCouncilMember from './editExecutiveMember'

export default function ExecutiveCouncil() {

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [executiveMember, setExecutiveMember] = useState([]);
  const [newData, setNewData] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {

    getAllMembers().then( e => setNews(e.data) );
    
  }, [newData]);

  const addService = () =>{

    setOpenModal(true);

  }

  const closeModal = () => {

    setOpenModal(false);

  }

  const editItem = (id) =>{

    console.log(id)

    getSingleMember(id).then( e => {

      setExecutiveMember(e.data);
      setOpenEditModal(true);
      
    } );

  }

  const closeEditModal = () => {

    setOpenEditModal(false);

  }

  return (

    <div className="services">

        { openModal ? <AddCouncilMember setNew = {setNewData} close = {closeModal} /> : null }

        { openEditModal ? <EditCouncilMember setNew = {setNewData} close = {closeEditModal} inData = {executiveMember} /> : null }

        <UIHolder>
            
            <ExecutiveTable open = {addService} table__data = {news} setNew = {setNewData} handleEdit = {editItem} />

        </UIHolder>

    </div>

  )

}