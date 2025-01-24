import { DownloadCircle, Xmark } from 'iconoir-react'
import React from 'react'
import { CSVLink } from "react-csv";

const ViewAttendees = ({ data, closeRsvp }) => {

  return (

    <div className="attendees">

        <div className="attend">

            <div className="attend__header">

                <div className="attend__title"> Event Registration </div>
                
                <div className="action">

                    <CSVLink data={ data?.attendees } filename={`${data.title}__registrations`} target="_blank" > <div className="attend__csv">  <DownloadCircle/> Download CSV </div> </CSVLink>

                    <div className="closeShow" onClick={ () => closeRsvp() } > <Xmark/> </div>

                </div>
            
            </div>

            <div className="attend__body">

                <div className="attendees__item attendees__item__th">
                    <div> Fullname </div>
                    <div> Email Address </div>
                </div>

            {
                data?.attendees?.length ? 
                data?.attendees?.map( (attend, index) => {

                return (

                    <div className="attendees__item" key = {index} >
                    <div> {index+1}. {attend.fullname}</div>
                    <div> {attend.email} </div>
                    </div>

                )

                } ) : null
            }

            </div>

        </div>
        
    </div>

  )

}

export default ViewAttendees
