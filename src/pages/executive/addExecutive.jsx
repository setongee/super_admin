import React, {useState, useEffect} from 'react'

import { ArrowRight, Xmark } from 'iconoir-react';
import LASGEditor from '../../components/textEditor/lasg_custom_editor';
import { formatCategoryName } from '../../middleware/middleware';
import { addCouncilMember } from '../../api/executives.req';

export default function AddCouncilMember({setNew, close}) {

    const [data, setData] = useState( { fullname : '', positions : '', content : '', photo : {}, phone : '', email : '' } );

    const [file, setFile] = useState([]);
    const [photo, setPhoto] = useState('');

    const getText = (text) => {

        setData(e => {

            return {
                ...e,
                "content" : text
            }
        })  
        
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

    const handleFile = e => {

        if (e.target.files.length) {

            setFile(e.target.files);
            const min = window.URL.createObjectURL(e.target.files[0]);
            setPhoto(min);

        }

    }

    const handleClick = () => {

        document.getElementById('file').click()

    }

    const handleSubmit = async () => {

        if ( data.fullname === '' || data.position === '' || data.content === '' || data.phone === '' || data.email === '' || !file.length ) {

            alert("All fields are required before adding. Try again!");
            
        } 

        else {

            const fileData = file[0];
            let uniqueName = formatCategoryName(data.fullname);

            const reader = new FileReader();
            reader.readAsDataURL(fileData);

            reader.onloadend = () => { 
        
                try {
        
                    addCouncilMember({...data, photo : {

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
    
    <div className="form__body service__point">

        <div className="main__form">

            <div className="closeIcon" onClick={()=>close()}> <Xmark/> </div>

            <div className="form__title"> 

                <div className="heading"> Add Council Member </div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form__contain">

                <div className="form form__long">

                    {/* Image */}

                    <div className="form__holder">

                        <label> Member Photo </label>

                        <div className="news__image imagery" onClick={ () => handleClick() } >

                            <img src={photo} alt="" />
                            <div className="tapTo">Tap to edit</div>

                        </div>
                        
                        <input type="file" id='file' accept="image/*" name = 'file' onChange={(e) => handleFile(e) } hidden />

                    </div>

                    {/* Name */}

                    <div className="form__holder">

                        <label> Member Fullname </label>
                        <input type="text" name = 'fullname' value = {data.fullname} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>

                     <div className="form__holder">

                        <label> Position / Role </label>
                        <input type="text" name = 'position' value = {data.position} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>

                    <div className="form__holder">

                        <label> Member Phone Number </label>
                        <input type="tel" name = 'phone' value = {data.phone} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>

                    <div className="form__holder">

                        <label> Member Email Address </label>
                        <input type="email" name = 'email' value = {data.email} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>


                    <div className="ssbmit__button sumUp" onClick={handleSubmit} > Create Member <ArrowRight color='#fff'/> </div>


                </div>

                <div className="editor edit_news">

                    <LASGEditor value = {'<p>Start typing <strong> member profile </strong> here...</p>'} readOnly = {false} submittableText = {getText} />

                </div>

            </div>

        </div>

    </div>

  )
}
