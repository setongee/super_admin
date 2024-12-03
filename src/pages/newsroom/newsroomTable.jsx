import React, { useState, useEffect } from 'react'
import { Filter, NavArrowDown, Plus } from 'iconoir-react'
import '../../components/table/table.scss'
import ServiceTableData from './newsTableData'
import axios from 'axios'
import NewsTableData from './newsTableData'

export default function 
NewsroomTable( { open, table__data, setNew, handleEdit, size, loading } ) {
      
  return (

    <div className="table__view">

        {/* Table Heading Area */}
       
        <div className="table__actions__area flex flex_align_center flex_justify_space_between">

            <div className="table__title thick"> Newsroom ({size}) </div>
            
            <div className="table__actions flex flex_align_center">

                {/* <div className="action action__filter flex flex_align_center table__btn__outline btn__main">

                    <p>Filter</p>
                    <div className="icon down"> <NavArrowDown/> </div>

                </div> */}

                <div className="addMda flex flex_align_center table__btn__solid btn__main" onClick = { () => open() } > 

                    <div className="icon"> <Plus/> </div> 
                    <p> Create News </p>
                    
                </div>

            </div>

        </div>

        {/* Table Heading */}

        <div className="table__heading">

            <div className="table__data head__data">

                <div className="table__heading_title">#Title</div>
                <div className="table__heading_title">Tags</div>
                <div className="table__heading_title">Date Created</div>
                <div className="table__heading_title">Date Updated</div>
                <div className="table__heading_title xtraW5">Action</div>

            </div>

            <div className="txtpo">
            {
                table__data.length ? table__data.map( (res, index) => {

                    return <NewsTableData data = {res} key = {index} setNew = {setNew} handleEdit = {handleEdit} index = {index} />

                } ) : <p className='empty'> Sorry no news created yet! </p>
            }
            </div>

        </div>

    </div>

  )

}

