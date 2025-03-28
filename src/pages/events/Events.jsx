import React,{useState, useEffect} from 'react'

import UIHolder from '../../components/holder/ui__holder'

import { getAllNews, getSingleNews } from '../../api/news.req'
import { getAllCategory } from '../../api/category.req'
import { useParams } from 'react-router-dom'

import Pagination from '../../components/pagination/pagination'
import Loader from '../../components/loader/loader'
import AddEvents from './addEvents'
import EditEvents from './EditEvents'
import EventsTable from './EventTable'
import { getAllEvents, getSingleEvents } from '../../api/events.req'

export default function Events() {

  const [openModal, setOpenModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);
  const [singleNews, setSingleNews] = useState([]);
  const [newData, setNewData] = useState([]);
  const [category, setCategory] = useState([]);
  const [news, setNews] = useState([]);
  const [size, setSize] = useState( { length : 0, pageCount : 0 } );
  const [loading, setLoading] = useState(false);
  
  const {topic, page} = useParams();
  
  
  useEffect(() => {

    setLoading(true);
    
    getAllCategory().then( e => setCategory(e.data) );
    
    getAllEvents(topic, page).then( e => { 

      setTimeout(() => {

        setNews(e.data);
        
        setSize({
          length : e.length,
          pageCount : parseInt(e.length / 20) + 1
        });

        setLoading(false)
        
      }, 500);

     } );
    
  }, [newData, topic, page]);

  
  const addService = () =>{

    setOpenModal(true);

  }

  const closeModal = () => {

    setOpenModal(false);

  }

  const editService = (id) =>{

    getSingleEvents(id).then( e => {

      setSingleNews(e.data);
      setOpenEditServiceModal(true);
      
    } );

  }

  const closeEdeitServiceModal = () => {

    setOpenEditServiceModal(false);

  }

  // useEffect(() => {
    
  //   if(openModal) {
  //       document.body.style.overflow = "hidden"
  //   } else{
  //     document.body.style.overflow = "visible"
  //   }

  // }, [openModal]);

  return (

    <div className="services">

        { openModal ? <AddEvents setNew = {setNewData} category = {category} close = {closeModal} /> : null }

        { openEditServiceModal ? <EditEvents setNew = {setNewData} category = {category} close = {closeEdeitServiceModal} inData = {singleNews} /> : null }

        <UIHolder>

            { loading ? <Loader/> : null }
            
            <EventsTable open = {addService} table__data = {news} setNew = {setNewData} handleEdit = {editService} size = {size.length} loading = {loading} />

            <Pagination size = {size} page = {page} topic = {topic} />

        </UIHolder>

    </div>

  )

}
