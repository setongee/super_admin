import React,{useState, useEffect} from 'react'

import UIHolder from '../../components/holder/ui__holder'
import AddNews from './addNews'

import { getAllNews, getSingleNews } from '../../api/news.req'

import NewsroomTable from './newsroomTable'
import EditNews from './EditNews'
import { getAllCategory } from '../../api/category.req'

export default function Newsroom() {

  const [openModal, setOpenModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [singleNews, setSingleNews] = useState([]);
  const [newData, setNewData] = useState([]);
  const [category, setCategory] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {

    getAllCategory().then( e => setCategory(e.data) );
    getAllNews().then( e => setNews(e.data) );
    
  }, [newData]);

  const addService = () =>{

    setOpenModal(true);

  }

  const closeModal = () => {

    setOpenModal(false);

  }

  const editService = (id) =>{

    getSingleNews(id).then( e => {

      setSingleNews(e.data);
      setOpenEditServiceModal(true);
      
    } );

  }

  const closeEdeitServiceModal = () => {

    setOpenEditServiceModal(false);

  }

  return (

    <div className="services">

        { openModal ? <AddNews setNew = {setNewData} category = {category} close = {closeModal} /> : null }

        { openEditServiceModal ? <EditNews setNew = {setNewData} category = {category} close = {closeEdeitServiceModal} inData = {singleNews} /> : null }

        <UIHolder>
            
            <NewsroomTable open = {addService} table__data = {news} setNew = {setNewData} handleEdit = {editService} />

        </UIHolder>

    </div>

  )

}
