import React, { useState, useEffect } from 'react'
import { Filter, NavArrowDown, Plus } from 'iconoir-react'
import '../../components/table/table.scss'
import ExecutileTableData from './executiveTableData'

export default function ExecutiveTable( { open, table__data, setNew, handleEdit } ) {
      
  return (

    <div className="table__view">

        {/* Table Heading Area */}
       
        <div className="table__actions__area flex flex_align_center flex_justify_space_between">

            <div className="table__title thick"> The Executive Council ({table__data.length}) </div>
            
            <div className="table__actions flex flex_align_center">

                <div className="action action__filter flex flex_align_center table__btn__outline btn__main">

                    <p>Filter</p>
                    <div className="icon down"> <NavArrowDown/> </div>

                </div>

                <div className="addMda flex flex_align_center table__btn__solid btn__main" onClick = { () => open() } > 

                    <div className="icon"> <Plus/> </div> 
                    <p> Add Council Member </p>
                    
                </div>

            </div>

        </div>

        {/* Table Heading */}

        <div className="table__heading">

            <div className="table__data head__data">

                <div className="table__heading_title">#Member Name</div>
                <div className="table__heading_title">Telephone</div>
                <div className="table__heading_title">Email</div>
                <div className="table__heading_title">Date Updated</div>
                <div className="table__heading_title xtraW5">Action</div>

            </div>

            {
                table__data.length ? table__data.map( (res, index) => {

                    return <ExecutileTableData data = {res} key = {index} setNew = {setNew} handleEdit = {handleEdit} />

                } ) : <p className='empty'> Sorry no Council Member added yet! </p>
            }

        </div>

    </div>

  )

}

