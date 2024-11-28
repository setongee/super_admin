import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Check, Plus, Xmark } from 'iconoir-react';
import './category.scss'
import wrench from '../../assets/wrench.png'
import { addCategory } from '../../api/category.req';
import { formatCategoryName } from '../../middleware/middleware';

export default function AddCategory({setNew, close, category}) {

    const [data, setData] = useState({name : '', short : '', keywords : '', isOffline : false, icon : {} } );

    const [file, setFile] = useState([]);
    const [icon, setIcon] = useState(wrench);
    const [keys, setKeys] = useState("");

    const refineKeys = (e) => {

        setKeys(e.target.value);
        const trans = e.target.value.split(",")
        
        const ready = trans.map(res => {

            return {
                key : res.trim()
            }

        })

        setData({...data, keywords : ready});

    }

    console.log(data)

    const handleChange = (e) => {

        const {name, value} = e.target;

        setData(res => {

            return {
                ...res,
                [name] : value
            }
        })  

    }

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

    const closeShow = () => {

        close();
        setData({})

    }

    const handleSubmit = async () => {

        if(data.name === '' || data.keywords === '' || data.short === '' || !file.length ) {

            alert("All fields are required before adding. Try again!");

        } 
        else {

            const fileData = file[0];
            let uniqueName = formatCategoryName(data.name);

            const reader = new FileReader();
            reader.readAsDataURL(fileData);

            reader.onloadend = () => { 
        
                try {
        
                    addCategory({...data, icon : {

                        temp : uniqueName,
                        data : reader.result
            
                    }})
                    .then( response => {
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

                <div className="heading"> Add category </div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form__contain">

                <div className="form">

                    {/* icon uploader */}

                    <div className="iconPhoto" onClick={() => handleClick()} > <img src={icon} alt="icon" /> </div>

                    <input type="file" onChange = {handleFile} name='icon' id='file__icon' hidden />

                    {/* Name */}

                    <div className="form__holder">

                        <label> Category name </label>
                        <input type="text" name = 'name' value = {data.name} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>

                    {/* Short description */}
                    
                    <div className="form__holder">

                        <label> Short description of category (max 100 characters) </label>
                        <input type="text" name = 'short' value = {data.short} placeholder='Enter here...' onChange={(handleChange)} maxLength="100" />

                    </div>

                    <div className="form__holder">

                        <label> Keywords (associated with the category) </label>
                        <input type="text" name = 'keywords' value = {keys} placeholder='Enter here...' onChange={(refineKeys)} />

                    </div>

                    <div className="ssbmit__button" onClick={handleSubmit} > Proceed </div>

                </div>

            </div>

        </div>

    </div>

  )
}
