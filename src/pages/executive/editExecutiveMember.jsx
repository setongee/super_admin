import React, {useState, useEffect} from 'react'

import { ArrowRight, Refresh, Xmark } from 'iconoir-react';
import LASGEditor from '../../components/textEditor/lasg_custom_editor';
import { formatCategoryName } from '../../middleware/middleware';
import { addCouncilMember, updateMember } from '../../api/executives.req';

export default function EditCouncilMember({setNew, close, inData}) {

    const [data, setData] = useState(inData);

    const [file, setFile] = useState([]);
    const [photo, setPhoto] = useState(inData.photo);

    const getText = (text) => {

        setData(e => {

            return {
                ...e,
                "content" : text
            }
        })  
        
    }

    const handleRefresh = () => {

        setPhoto(inData.photo);
        setData(inData);

    }

    const handleRefreshPhoto = () => {

        setPhoto(inData.photo);

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

        if ( data.fullname === '' || data.position === '' || data.content === '' || data.phone === '' || data.email === '' || data.photo === '' ) {

            alert("All fields are required before adding. Try again!");
            
        } 

        else {

            if (file.length) {

                const fileData = file[0];
                let uniqueName = formatCategoryName(data.fullname);

                const reader = new FileReader();
                reader.readAsDataURL(fileData);

                reader.onloadend = () => { 
            
                    try {
            
                        updateMember( data._id, {...data, photo : {

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

            else {

                try {
            
                    updateMember( data._id, data )
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

                <div className="heading"> Edit & Update Council Member </div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form__contain">

                <div className="form form__long">

                    {/* Image */}

                    <div className="form__holder">

                        <label className='flex flex_justify_space_between imagery'> Member Photos  <div className="refreshPhoto" style={{fontSize : '11px', cursor : 'pointer'}} onClick={ () => handleRefreshPhoto() }> <Refresh strokeWidth={2.4} /> </div> </label>

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


                    <div className="ssbmit__button sumUp" onClick={handleSubmit} > Update Member <ArrowRight color='#fff'/> </div>

                    <div className="ssbmit__button sumUp reset" onClick={handleRefresh} > Reset Member Details </div>


                </div>

                <div className="editor edit_news">

                    <LASGEditor value = {data.content} readOnly = {false} submittableText = {getText} />

                </div>

            </div>

        </div>

    </div>

  )
}
