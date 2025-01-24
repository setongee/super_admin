import React, { useState, useEffect } from 'react'
import { Filter, NavArrowDown, Plus } from 'iconoir-react'
import '../../components/table/table.scss'
import ServiceTableData from './EventTableData'
import axios from 'axios'
import NewsTableData from './EventTableData'
import EventsTableData from './EventTableData'
import ViewAttendees from './viewAttendees'

export default function EventsTable( { open, table__data, setNew, handleEdit, size, loading } ) {

    const [rsvp, setRsvp] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const showRsvp = (data) => {
        
        setRsvp(data);
        setIsOpen(true);

    }

    const closeRsvp = () => {
        
        setRsvp({});
        setIsOpen(false);

    }
      
  return (

    <div className="table__view">

        {/* Table Heading Area */}
       
        <div className="table__actions__area flex flex_align_center flex_justify_space_between">

            <div className="table__title thick"> All Lagos State Events </div>
            
            <div className="table__actions flex flex_align_center">

                <div className="addMda flex flex_align_center table__btn__solid btn__main" onClick = { () => open() } > 

                    <div className="icon"> <Plus/> </div> 
                    <p> Create Events </p>
                    
                </div>

            </div>

        </div>

        {/* Table Heading */}

        <div className="table__heading">

            <div className="table__data head__data">

                <div className="table__heading_title">#Event Name</div>
                <div className="table__heading_title">Tags</div>
                <div className="table__heading_title">Date Created</div>
                <div className="table__heading_title">Event Date</div>
                <div className="table__heading_title xtraW5">Action</div>

            </div>

            <div className="txtpo">
            
            { isOpen ? <ViewAttendees data = {rsvp} closeRsvp = {closeRsvp} /> : null }

            {
                table__data.length ? table__data.map( (res, index) => {

                    return <EventsTableData data = {res} key = {index} setNew = {setNew} handleEdit = {handleEdit} index = {index} showRsvp = {showRsvp} />

                } ) : <p className='empty'> Sorry no upcoming events yet! </p>
            }
            </div>

        </div>

    </div>

  )

}

