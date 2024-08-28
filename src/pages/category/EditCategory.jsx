import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Xmark } from 'iconoir-react';
import { updateCategory } from '../../api/category.req';
import { formatCategoryName } from '../../middleware/middleware';

export default function EditCategory({setNew, close, inData}) {

    const [data, setData] = useState(inData);
    const [file, setFile] = useState([]);
    const [icon, setIcon] = useState(inData.icon);

    console.log(data)

    const handleFile = e => {

        if (e.target.files.length) {

            setFile(e.target.files);
            const min = window.URL.createObjectURL(e.target.files[0]);
            setIcon(min);

        }
        

    }

    const handleClick = () => {

        document.getElementById('file__icon').click()

    }

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

        if(data.name === '' || data.short === '' ) {

            alert("All fields are required before adding. Try again!");

        } 
        else {

            if (file.length) {

                const fileData = file[0];
                let uniqueName = formatCategoryName(data.name);

                const reader = new FileReader();
                reader.readAsDataURL(fileData);

                reader.onloadend = () => { 
            
                    try {
            
                        updateCategory(inData._id, {...data, icon : {

                            temp : uniqueName,
                            data : reader.result
                
                        }})
                        .then( response => {
                            console.log(response);
                            setNew(response.data);
                            closeShow();
                        })
                        
                    } catch (error) {
            
                        console.log(error.message);
                        
                    }

                }
            }

            else {

                try {
            
                    updateCategory(inData._id, data)
                    .then( response => {
                        console.log(response);
                        setNew(response.data);
                        closeShow();
                    })
                    
                } catch (error) {
        
                    console.log(error.message);
                    
                }

            }

        }

    }

  return (
    
    <div className="form__body">

        <div className="main__form">

            <div className="closeIcon" onClick={()=>close()}> <Xmark/> </div>

            <div className="form__title"> 

                <div className="heading"> Edit Category </div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form__contain">

                <div className="form">

                    <div className="iconPhoto" onClick={() => handleClick()} > <img src={icon} alt="icon" /> </div>
                    <input type="file" onChange = {handleFile} name='icon' id='file__icon' hidden />


                    {/* Name */}

                    <div className="form__holder">

                        <label> Service title </label>
                        <input type="text" name = 'name' value = {data.name} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>

                    {/* Short description */}
                    
                    <div className="form__holder">

                        <label> Short description of service (max 100 characters) </label>
                        <input type="text" name = 'short' value = {data.short} placeholder='Enter here...' onChange={(handleChange)} maxLength="100" />

                    </div>

                    <div className="ssbmit__button" onClick={handleSubmit} > Proceed </div>

                </div>

            </div>

        </div>

    </div>

  )
}
