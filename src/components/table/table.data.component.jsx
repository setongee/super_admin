import { Check, DotArrowDown, MoreVertCircle, NavArrowDown } from 'iconoir-react'
import React,{useState, useEffect} from 'react'
import axios from 'axios'

// icons

import LogoMinistry from '../../assets/MDA/ministry.svg'
import LogoDepartment from '../../assets/MDA/department.svg'
import LogoAgency from '../../assets/MDA/agency.svg'
import { truncateText } from '../truncateText.jsx/truncateText'
import { deleteSingleMda } from '../../api/mda.req'

export default function TableDataComponent({data, setNew, handleEdit}) {

  const [showMore, setShowMore] = useState(false)
  
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

  const handleDelete = () => {

   const response = window.confirm(`Are you sure you want to delete the record for '${data.name}'?`);
   
    if (response) {
      deleteSingleMda(data._id)
      .then( res => setNew(res) )
    }
   
  }

  return (
    
    <div className="table__data body__area">

        <div className="table__heading_title flex__column">

            <div className="logo"> <img src={data.type.toLowerCase() === 'ministry' ? LogoMinistry : data.type.toLowerCase() === 'department' ? LogoDepartment : LogoAgency} alt="Lagos State Ministries, Departments & Agencies" /> </div>

            <div className="mda__name">
                <div className='main'>{data.name}</div>
                <div className='sub lowercase'> {data.subdomain}.lagosstate.gov.ng</div>
            </div>

        </div>
        <div className="table__heading_title">{data.agent_name}</div>
        <div className="table__heading_title">{ truncateText(data.email, 25) }</div>
        <div className="table__heading_title"> { data.updatedAt.split("T")[0]}</div>
        <div className="table__heading_title">{ data.isOffline ? <div className="decrease__body status">Offline</div> : <div className="increase__body status"><p>Active</p></div> }</div>
        
        <div className="table__heading_title more__more" id = 'petals' onClick={ () => handleOpenMore() }>  
          
          <MoreVertCircle id = 'petals'/> 
        
        </div>

        {
            showMore ? (

              <div className="more" id = 'more'>

                <p onClick={() => window.open( `https://${data.subdomain}.lagosstate.gov.ng` ) }> Visit MDA Site </p>
                <p onClick={() => handleEdit(data._id)}>Edit MDA Details</p>
                <p>Reset Agent Password</p>
                <p>Revoke Agent Access</p>
                <p className='del' onClick={handleDelete}>Delete MDA</p>

              </div>

            ) : null
          }

    </div>

  )
}
