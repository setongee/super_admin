import React, { useState, useEffect } from 'react'
import { Filter, NavArrowDown, Plus } from 'iconoir-react'
import '../../components/table/table.scss'
import axios from 'axios'
import CategoryTableData from './CategoryTableData'

export default function Table({open, table__data, setNew, handleEdit}) {

    // const [table__data, setTableData] = useState();
      
  return (

    <div className="table__view">

        {/* Table Heading Area */}
       
        <div className="table__actions__area flex flex_align_center flex_justify_space_between">

            <div className="table__title thick"> Categories ({table__data.length}) </div>
            
            <div className="table__actions flex flex_align_center">

                <div className="action action__filter flex flex_align_center table__btn__outline btn__main">

                    <p>Filter</p>
                    <div className="icon down"> <NavArrowDown/> </div>

                </div>

                <div className="addMda flex flex_align_center table__btn__solid btn__main" onClick = { () => open() } > 

                    <div className="icon"> <Plus/> </div> 
                    <p>Add Category</p>
                    
                </div>

            </div>

        </div>

        {/* Table Heading */}

        <div className="table__heading">

            <div className="table__data head__data">

                <div className="table__heading_title">#Category Name</div>
                <div className="table__heading_title xtraW2">Short Desc.</div>
                <div className="table__heading_title">Last Updated</div>
                <div className="table__heading_title xtraW8">Status</div>
                <div className="table__heading_title xtraW5">Action</div>

            </div>

            {
                table__data.length ? table__data.map( (res, index) => {

                    return <CategoryTableData data = {res} key = {index} setNew = {setNew} handleEdit = {handleEdit} />

                } ) : <p className='empty'> Sorry no news created yet! </p>
            }

        </div>

    </div>

  )

}

