import React, { useState, useEffect } from 'react'
import { Filter, NavArrowDown, Plus } from 'iconoir-react'
import './table.scss'
import TableDataComponent from './table.data.component'
import axios from 'axios'

export default function TableComponent({open, table__data, setNew, handleEdit}) {

    // const [table__data, setTableData] = useState();
      
  return (

    <div className="table__view">

        {/* Table Heading Area */}
       
        <div className="table__actions__area flex flex_align_center flex_justify_space_between">

            <div className="table__title thick"> LASG Ministries, Departments & Agencies </div>
            
            <div className="table__actions flex flex_align_center">

                <div className="action action__filter flex flex_align_center table__btn__outline btn__main">

                    <p>Filter</p>
                    <div className="icon down"> <NavArrowDown/> </div>

                </div>

                <div className="addMda flex flex_align_center table__btn__solid btn__main" onClick={()=>open()}> 

                    <div className="icon"> <Plus/> </div> 
                    <p>Add New MDA</p>
                    
                </div>

            </div>

        </div>

        {/* Table Heading */}

        <div className="table__heading">

            <div className="table__data head__data">

                <div className="table__heading_title">#MDA Name</div>
                <div className="table__heading_title">Key Agent</div>
                <div className="table__heading_title">Agent Email</div>
                <div className="table__heading_title">Last Updated</div>
                <div className="table__heading_title">Status</div>
                <div className="table__heading_title">Action</div>

            </div>

            {
                table__data.length ? table__data.map( (res, index) => {

                    return <TableDataComponent data = {res} key = {index} setNew = {setNew} handleEdit = {handleEdit} />

                } ) : <p className='empty'> Sorry no news created yet! </p>
            }

        </div>

    </div>

  )

}
