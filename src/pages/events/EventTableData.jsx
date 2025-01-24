import React,{useState, useEffect} from 'react'
import { Check, DotArrowDown, DownloadCircle, MoreVertCircle, NavArrowDown } from 'iconoir-react'
import { formatDate } from '../../middleware/middleware';
import { truncateText } from '../../components/truncateText.jsx/truncateText';
import { isPast } from 'date-fns/isPast';
import { deleteEvents } from '../../api/events.req';


export default function EventsTableData({data, setNew, handleEdit, index, showRsvp}) {

  const [showMore, setShowMore] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  const [dateStatus, setDateStatus] = useState("");

  useEffect(() => {

    const checkDate = () => {

      const status = isPast(data.date);
      setDateStatus(status)

      // if(!status){

      //   const result = formatDistanceToNow(data.date);
      //   // setDateStatus("Upcoming in " + result);
      //   setDateStatus("Active");

      // } 
      // else{
      //   // setDateStatus("Event Expired");
      //   setDateStatus("Expired");
      // }

    }


    checkDate();
    
  }, []);

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

      await deleteEvents(data._id).then( e => setNew(e.message) );

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
                <div className='main'> 
                  <div>{truncateText(data.title, 70)} </div>
                  {
                    dateStatus ? <div className="mail" id='isPast'> Expired Event </div> : <div className="mail" id='active'> Active </div>
                  }
                </div>
            </div>

        </div>

        <div className="table__heading_title xtraW"> { data.categories[0] } <p className='hoverPop' style={{color : 'green'}}>{data.categories.length > 1 ? `and ${data.categories.length - 1} More` : null}</p> { data.categories.length > 1 ? <div className="moreInfoCategory"> {data.categories.map( e => <p>{e}</p> ) } </div> : null } </div>

        <div className="table__heading_title date-f"> { formatDate(data.updatedAt) }</div>
       
        <div className="table__heading_title date-f"> { formatDate(data.date) }</div>
        
        <div className="table__heading_title more__more xtraW5" id = 'petals' onClick={ () => handleOpenMore() }>  
          
          <MoreVertCircle id = 'petals'/> 
        
        </div>

        {
            showMore ? (

              <div className="more" id = 'more'>

                <p onClick={() => showRsvp(data) }>View Event Registrations</p>
                <p onClick={() => handleEdit(data._id)}>Edit Event Details</p>
                <p className='del' onClick={handleDelete}>Delete Event</p>

              </div>

            ) : null
          }

    </div>

  )
}
