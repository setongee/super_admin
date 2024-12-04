import React, { useState, useEffect } from 'react'
import { Filter, NavArrowDown, Plus } from 'iconoir-react'
import './table.scss'
import TableDataComponent from './table.data.component'
import Fuse from 'fuse.js';

export default function TableComponent({open, table__data, setNew, handleEdit}) {

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

            <div className="table__title thick"> LASG Ministries, Departments & Agencies ({queryResults.length}) </div>
            
            <div className="table__actions flex flex_align_center">

                <div className="searchComp">
                    <input placeholder='Search MDAs table...' type="text" value={query} onChange={ (e) => setQuery(e.target.value) } />
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
                queryResults.length ? queryResults.map( (res, index) => {

                    return <TableDataComponent data = {res} key = {index} setNew = {setNew} handleEdit = {handleEdit} />

                } ) : <p className='empty'> Sorry no MDA has been created yet! </p>
            }

        </div>

    </div>

  )

}
