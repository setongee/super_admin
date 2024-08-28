import React from 'react'
import '../../components/table/table.scss'

import SubscribersTableData from './subscribersTableData'

export default function SubscribersTable( { table__data } ) {
      
  return (

    <div className="table__view">

        {/* Table Heading Area */}
       
        <div className="table__actions__area flex flex_align_center flex_justify_space_between">

            <div className="table__title thick"> Subscribers ({table__data.data.length}) </div>

        </div>

        {/* Table Heading */}

        <div className="table__heading">

            <div className="table__data head__data">

                <div className="table__heading_title"> # Fullname </div>
                <div className="table__heading_title"> Email </div>
                <div className="table__heading_title"> Interests </div>
                <div className="table__heading_title"> Date Subscribed </div>

            </div>

            {
                table__data.data.length ? table__data.data.map( (res, index) => {

                    return <SubscribersTableData data = {res} key = {index} uid = {index + 1} />

                } ) : <p className='empty'> Sorry no one has subscribed yet! </p>
            }

        </div>

    </div>

  )

}

