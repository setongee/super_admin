import React, {useState, useEffect} from 'react'
import './forms.scss'
import { Xmark } from 'iconoir-react';
import axios from 'axios';
import { updateSingleMda } from '../../api/mda.req';

export default function FormEdit({close, setNew, dataOnload}) {

    const [data, setData] = useState(dataOnload);
    const [show, setShow] = useState(false)

    const handleChange = (e) => {

        const {name, value} = e.target;

        setData(res => {

            return {
                ...res,
                [name] : value
            }
        })  

    }

  const closeShow = () => {

      close();
      setData({})

  }

  const handleSubmit = async () => {

    if(data.type === '' || data.name === '' || data.subdomain === '' || data.description === '' || data.agent_name === '' || data.email === '') {

        alert("All fields are required before adding. Try again!")

    } else {

        updateSingleMda(data._id, data)
        .then( res => { setNew(res); closeShow() } )

    }

  }

  return (

    <div className="form__body">

        <div className="main__form">

            <div className="closeIcon" onClick={()=>closeShow()}> <Xmark/> </div>

            <div className="form__title"> 

                <div className="heading">Add new MDA</div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form">

                {/* Name */}

                <div className="form__holder">

                    <label> Fullname of site </label>
                    <input type="text" name = 'name' value = {data.name} placeholder='Enter here...' onChange={(handleChange)} />

                </div>

                {/* Type */}

                <div className="form__holder">

                    <label>Select type (Ministry, Department or Agency) </label>
                    <select name="type" onChange={handleChange} value={data.type.toLowerCase()}>
                        
                        <option value=""> --- Select --- </option>
                        <option value='ministry'>Ministry</option>
                        <option value='department'>Department</option>
                        <option value='agency'>Agency</option>

                    </select>

                </div>

                {/* Description */}

                <div className="form__holder">

                    <label> Description </label>
                    <input type="text" name = 'description' value = {data.description} placeholder='Enter here...' onChange={(handleChange)} />

                </div>

                {/* subdomain */}
                
                <div className="form__holder">

                    <label> Subdomain </label>
                    <div className="chain">
                        <input type="text" name = 'subdomain' value = {data.subdomain} placeholder='Enter here...' onChange={(handleChange)} />
                        <p>.lagosstate.gov.ng</p>
                    </div>

                </div>

                {/* Agent_name */}
                
                <div className="form__holder">

                    <label> Agent Fullname </label>
                    <input type="text" name = 'agent_name' value = {data.agent_name} placeholder='Enter here...' onChange={(handleChange)} />

                </div>

                {/* Agent_name */}
                
                <div className="form__holder">

                    <label> Agent email </label>
                    <input type="text" name = 'email' value = {data.email} placeholder='Enter here...' onChange={(handleChange)} />

                </div>


                <div className="ssbmit__button" onClick={handleSubmit} > Proceed </div>


            </div>

        </div>

    </div>

  )

}
