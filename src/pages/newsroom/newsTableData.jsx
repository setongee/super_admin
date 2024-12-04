import React,{useState, useEffect} from 'react'
import { Check, DotArrowDown, MoreVertCircle, NavArrowDown } from 'iconoir-react'
import axios from 'axios'
import serviceIcon from '../../assets/MDA/department.svg'
import { deleteSingleService } from '../../api/services.req';
import { formatDate } from '../../middleware/middleware';
import { deleteNews } from '../../api/news.req';
import { truncateText } from '../../components/truncateText.jsx/truncateText';


export default function NewsTableData({data, setNew, handleEdit, index}) {

  const [showMore, setShowMore] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  
  document.addEventListener('click', e => {

    if (e.target.id !== 'petals' ){
      handleCloseMore()
    }

  })

  const handleOpenMore = () => {

    const more = document.getElementById('more');

    if (more){

      console.log(more)

    }

    setShowMore(true);

  }

  const handleCloseMore = () => {

    setShowMore(false);

  }

  const handleDelete = async () => {

   const response = window.confirm(`Are you sure you want to delete the record for '${data.title}'?`);
   
    if (response) {

      await deleteNews(data._id).then( e => setNew(e.message) );

    }
   
  }

  const copyLink = () => {

    navigator.clipboard.writeText(`https://lagosstate.gov.ng/news/all/view/${data._id}`);
    alert("News url copied successfully!")
  }

  return (
    
    <div className="table__data body__area">

        <div className="table__heading_title flex__column">

            <div className="number"> {index + 1}. </div>

            <div className="logo newsImageHere"> <img src={data.photo} alt="news photo" /> </div>

            <div className="d">
                <div className='main'> {truncateText(data.title, 70)} </div>
            </div>

        </div>

        <div className="table__heading_title xtraW"> { data.categories[0] } <p className='hoverPop' style={{color : 'green'}}>{data.categories.length > 1 ? `and ${data.categories.length - 1} More` : null}</p> { data.categories.length > 1 ? <div className="moreInfoCategory"> {data.categories.map( e => <p>{e}</p> ) } </div> : null } </div>

        <div className="table__heading_title date-f"> { formatDate(data.date) }</div>

        <div className="table__heading_title date-f"> { formatDate(data.updatedAt) }</div>
        
        <div className="table__heading_title more__more xtraW5" id = 'petals' onClick={ () => handleOpenMore() }>  
          
          <MoreVertCircle id = 'petals'/> 
        
        </div>

        {
            showMore ? (

              <div className="more" id = 'more'>

                <p onClick={() => copyLink() }> Copy News URL </p>
                <p onClick={() => window.open(`https://lagosstate.gov.ng/news/all/view/${data._id}`) }> Visit News URL </p>
                <p onClick={() => handleEdit(data._id)}>Edit News Details</p>
                <p className='del' onClick={handleDelete}>Delete News</p>

              </div>

            ) : null
          }

    </div>

  )
}
