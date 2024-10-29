import React, {useState, useEffect} from 'react'
import { ArrowRight, Check, Plus, Xmark } from 'iconoir-react';
import './newsroom.scss'
import Services__category from './services__category';
import Fuse from 'fuse.js';
import LASGEditor from '../../components/textEditor/lasg_custom_editor';
import DateSelector from '../../components/date/dataSelector';
import { addNews, updateNews } from '../../api/news.req';
import { formatCategoryName, formatDate2 } from '../../middleware/middleware';

export default function EditNews({setNew, close, category, inData}) {

    const [data, setData] = useState(inData);
    const [addtagModal, setaddtagModal] = useState(false)
    const [categories, setCategories] = useState(inData.categories);
    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState(category);

    console.log(data)

    const [file, setFile] = useState([]);

    const getText = (text) => {

        setData(e => {

            return {
                ...e,
                "content" : text
            }
        })  
        
    }

    useEffect(() => {
        
        const fuseOptions = {

            includeScore : true,
            shouldSort : true,
            keys : [ 
              
              {
                name: 'name'
              }
            ]
          
          };
        
          const fuse = new Fuse(category, fuseOptions);
          const results = fuse.search(search);
          
          if ( search === "" ){
            setQueryResults(category);
          }
          else{
            const queriedRes =  results.filter( item => item.score < 0.1 ).map(res => res.item);
           
            setQueryResults(queriedRes);

          }

    }, [search]);

    useEffect(() => {

        setQueryResults(category)

    }, [category]);

    useEffect(() => {

        if (!addtagModal){
            setSearch("");
        }

    }, [addtagModal]);

    useEffect(() => {

        setData(e => {

            return {
                ...e,
                "categories" : categories
            }
        }) 

    }, [categories]);

    useEffect(() => {
        
        const findIn = document.querySelector('.p-inputtext')
        findIn.placeholder = 'Select date';

        findIn.value = formatDate2(data.date)

    }, []);

    const addTag = (e, tagName) => {

        let checked = e.target.checked;

        if(checked) {

            setCategories([...categories, tagName]);
            
            
        }

        else {

            removeTag(tagName);

        }
        
    }

    const removeTag = (tagName) => {

        const newTagArr = categories.filter( e => e !== tagName );
        setCategories(newTagArr); 

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

    const handleDateChange = (date) => {

        setData( {...data, date : date } ) 

    }

    const closeShow = () => {

        close();
        setData({})

    }

    const handleFile = e => {

        if (e.target.files.length) {

            setFile(e.target.files);
            const min = window.URL.createObjectURL(e.target.files[0]);
            setData({...data, photo : min});

        }
        

    }

    const handleClick = () => {

        document.getElementById('file').click()

    }

    const handleSubmit = async () => {

        if ( data.title === '' || data.content === '' || !data.categories.length || data.date === '' ) {

            alert("All fields are required before adding. Try again!");
            
        } 

        else {

            if(file.length) {

                const fileData = file[0];
                let uniqueName = formatCategoryName(data.title);

                const reader = new FileReader();
                reader.readAsDataURL(fileData);

                reader.onloadend = () => { 
            
                    try {
            
                        updateNews(data._id, {...data, photo : {

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

            else{

                try {
             
                    updateNews(data._id, data )
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
    
    <div className="form__body service__point">

        <div className="main__form">

            <div className="closeIcon" onClick={()=>close()}> <Xmark/> </div>

            <div className="form__title"> 

                <div className="heading"> Create News </div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form__contain">

                <div className="form form__long">

                    {/* Image */}

                    <div className="form__holder">

                        <label> News Image </label>

                        <div className="news__image" onClick={ () => handleClick() } >

                            <img src={data.photo} alt="" />
                            <div className="tapTo">Tap to edit</div>

                        </div>
                        
                        <input type="file" id='file' accept="image/*" name = 'file' onChange={(e) => handleFile(e) } hidden />

                    </div>

                    {/* Name */}

                    <div className="form__holder">

                        <label> News title </label>
                        <input type="text" name = 'title' value = {data.title} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>


                    {/* Date Created */}

                    <div className="form__holder date__bin">

                        <label> Date created </label>
                        <DateSelector date__add = {handleDateChange} dateF = {data.date} />

                    </div>

                    {/* MDA */}

                    <div className="form__holder">

                        <label> Targeted MDA </label>
                        <select name="mda" placeholder='Enter here...' onChange={(handleChange)} value={data.mda} >
                            <option value='mow' >Ministry of Work</option>
                            <option value='moh' >Ministry of Health</option>
                            <option value='mof' >Ministry of Finance</option>
                        </select>

                    </div>


                    {/* Tags */}

                    <div className="form__holder">

                        <label> Categories ( Can select up to 3 ) </label>
                        
                        <div className="tagsZone">
                            
                            <div className="addCategoryTag" onClick={ () => setaddtagModal(!addtagModal)}> <Plus/> Add Tag </div>

                            <div className="tags">
                                
                                {
                                    categories.length ? categories.map((data => (

                                        <div className="tag"> {data} <div className="rm_tag" onClick={ () => removeTag(data) } > <Xmark/> </div> </div>

                                    ))) : null
                                }

                            </div>

                        </div>
                        
                        {
                            addtagModal 
                            ? 
                            (
                                <div className="multipleSelect">
                                    <div className="search"> <input type="text" placeholder='Search tags...' onChange={(e)=>setSearch(e.target.value)} value={search} /> </div>
                                    
                                    <div className="checkboxes">

                                        {
                                            queryResults.length ? queryResults.map( data => <Services__category key = {data._id} name = {data.name} tags = {addTag} tagsZone = {categories} /> ) : <p>Nothing Found</p>
                                        }

                                    </div>

                                </div>

                            ) : null

                        }

                    </div>

                    <div className="ssbmit__button sumUp" onClick={handleSubmit} > Update News <ArrowRight color='#fff'/> </div>


                </div>

                <div className="editor edit_news">

                    <LASGEditor value = {data.content} readOnly = {false} submittableText = {getText} />

                </div>

            </div>

        </div>

    </div>

  )
}
