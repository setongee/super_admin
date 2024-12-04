import React, { useState, useEffect } from 'react'
import { Filter, NavArrowDown, Plus } from 'iconoir-react'
import '../../components/table/table.scss'
import axios from 'axios'
import CategoryTableData from './CategoryTableData'
import Fuse from 'fuse.js';

export default function Table({open, table__data, setNew, handleEdit, loading}) {

const [query, setQuery] = useState("");
const [queryResults, setQueryResults] = useState([]);

useEffect(() => {
    
    setQueryResults(table__data)

}, [table__data]);

useEffect(() => {

    const fuseOptions = {

    includeScore : true,
    
        keys: ["name"]
    
    };
    
    const fuse = new Fuse(table__data, fuseOptions);
    const results = fuse.search(query);
    const queriedRes =  query ? results.map(res => res.item) : table__data;
    setQueryResults(queriedRes);
    
}, [query]);
      
  return (

    <div className="table__view">

        {/* Table Heading Area */}
       
        <div className="table__actions__area flex flex_align_center flex_justify_space_between">

            <div className="table__title thick"> Categories ({queryResults.length}) </div>
            
            <div className="table__actions flex flex_align_center">

                <div className="searchComp">
                    <input placeholder='Search Category table...' type="text" value={query} onChange={ (e) => setQuery(e.target.value) } />
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
                queryResults.length ? queryResults.map( (res, index) => {

                    return <CategoryTableData data = {res} key = {index} setNew = {setNew} handleEdit = {handleEdit} />

                } ) : <p className='empty'> Sorry no Category has been created yet! </p>
            }

        </div>

    </div>

  )

}

