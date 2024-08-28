import React,{useState, useEffect} from 'react'
import { Check, DotArrowDown, MoreVertCircle, NavArrowDown } from 'iconoir-react'
import { formatDate } from '../../middleware/middleware';
import { deleteNews } from '../../api/news.req';
import { truncateText } from '../../components/truncateText.jsx/truncateText';
import { deleteMember } from '../../api/executives.req';


export default function ExecutileTableData({data, setNew, handleEdit}) {

  const [showMore, setShowMore] = useState(false);
  
  document.addEventListener('click', e => {

    if (e.target.id !== 'petals' ){
      handleCloseMore()
    }

  })

  const handleOpenMore = () => {

    const more = document.getElementById('more');

    setShowMore(true);

  }

  const handleCloseMore = () => {

    setShowMore(false);

  }

  const handleDelete = async () => {

   const response = window.confirm(`Are you sure you want to delete the record for '${data.fullname}'?`);
   
    if (response) {

      await deleteMember(data._id).then( e => setNew(e.message) );

    }
   
  }

  return (
    
    <div className="table__data body__area">

        <div className="table__heading_title flex__column">

            <div className="logo newsImageHere"> <img src={data.photo} alt="Council member photo" /> </div>

            {/* <div className="d">
                <div className='main'> { truncateText(data.title, 70) } </div>
            </div> */}

            <div className="mda__name">
                <div className='main'>{data.fullname}</div>
                <div className='sub'> Hon. Commissioner for Agriculture and Food Systems </div>
            </div>

        </div>

        <div className="table__heading_title xtraW -phone_area"> 

          <p> {truncateText(data.phone, 30)} </p> 
          
        </div>

        <div className="table__heading_title date-f"> setongee@gmail.com </div>

        <div className="table__heading_title date-f"> { formatDate(data.updatedAt) }</div>
        
        <div className="table__heading_title more__more xtraW5" id = 'petals' onClick={ () => handleOpenMore() }>  
          
          <MoreVertCircle id = 'petals'/> 
        
        </div>

        {
            showMore ? (

              <div className="more" id = 'more'>

                <p onClick={() => window.open(data.url) }> Visit Member URL </p>
                <p onClick={() => handleEdit(data._id)}>Edit Member Details</p>
                <p className='del' onClick={handleDelete}>Delete Member</p>

              </div>

            ) : null
          }

    </div>

  )
}
