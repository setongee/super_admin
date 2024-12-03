import React, {useState, useEffect} from 'react'
import { ArrowRight, Check, Plus, Xmark } from 'iconoir-react';
import './newsroom.scss'
import Services__category from './services__category';
import Fuse from 'fuse.js';
import LASGEditor from '../../components/textEditor/lasg_custom_editor';
import DateSelector from '../../components/date/dataSelector';
import { addNews } from '../../api/news.req';
import { formatCategoryName } from '../../middleware/middleware';
import { getAllMdas } from '../../api/mda.req';

export default function AddNews({setNew, close, category}) {

    const [data, setData] = useState({title : '', content : '', categories : [], date : '', mda : '' });
    const [addtagModal, setaddtagModal] = useState(false)
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState(category);
    const [mdas, setMdas] = useState([]);

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
            const queriedRes =  results.filter( item => item.score < 0.5 ).map(res => res.item);
           
            setQueryResults(queriedRes);

          }

          getAllMdas()
          .then(response => setMdas(response) );

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
                "categories" : tags
            }
        }) 

    }, [tags]);

    useEffect(() => {
        
        document.querySelector('.p-inputtext').placeholder = 'Select date'
        
    }, []);

    const addTag = (e, tagName) => {

        let checked = e.target.checked;

        if(checked) {

            setTags([...tags, tagName]);
            
            
        }

        else {

            removeTag(tagName);

        }
        
    }

    const removeTag = (tagName) => {

        const newTagArr = tags.filter( e => e !== tagName );
        setTags(newTagArr); 

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
            setPhoto(min);

        }
        

    }

    const handleClick = () => {

        document.getElementById('file').click()

    }

    const handleSubmit = async () => {

        if ( data.title === '' || data.content === '' || !data.categories.length || data.date === '' || !file.length ) {

            alert("All fields are required before adding. Try again!");
            
        } 

        else {

            const fileData = file[0];
            let uniqueName = formatCategoryName(data.title);

            const reader = new FileReader();
            reader.readAsDataURL(fileData);

            reader.onloadend = () => { 
        
                try {
        
                    addNews({...data, photo : {

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

                <div className="heading"> Create News </div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form__contain">

                <div className="form form__long">

                    {/* Image */}

                    <div className="form__holder">

                        <label> News Image </label>

                        <div className="news__image" onClick={ () => handleClick() } >

                            <img src={photo} alt="" />
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
                        <DateSelector date__add = {handleDateChange} />

                    </div>

                    {/* MDA */}

                    <div className="form__holder">

                        <label> Targeted MDA </label>

                        <select name="mda" placeholder='Enter here...' onChange={(handleChange)} value={data.mda}>

                            <option value="">--- Select a targeted MDA ---</option>

                            {
                                mdas.map( (res, index) => {

                                    return <option value={res.name}>{res.name}</option>

                                } )
                            }

                        </select>
                        

                    </div>


                    {/* Tags */}

                    <div className="form__holder">

                        <label> Categories ( Can select up to 3 ) </label>
                        
                        <div className="tagsZone">
                            
                            <div className="addCategoryTag" onClick={ () => setaddtagModal(!addtagModal)}> <Plus/> Add Tag </div>

                            <div className="tags">
                                
                                {
                                    tags.length ? tags.map((data => (

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

                                    <div className="closeTagsArea flex">
                                        <div className="topicPin"> Select Tags </div>
                                        <div className="closeIn" onClick={ () => setaddtagModal(!addtagModal)} ><Xmark/></div>
                                    </div>

                                    <div className="search"> <input type="text" placeholder='Search tags...' onChange={(e)=>setSearch(e.target.value)} value={search} /> </div>
                                    
                                    <div className="checkboxes">

                                        {
                                            queryResults.length ? queryResults.map( data => <Services__category key = {data._id} name = {data.name} tags = {addTag} tagsZone = {tags} /> ) : <p>Nothing Found</p>
                                        }

                                    </div>

                                </div>

                            ) : null

                        }

                    </div>

                    <div className="ssbmit__button sumUp" onClick={handleSubmit} > Submit News <ArrowRight color='#fff'/> </div>


                </div>

                <div className="editor edit_news ER">

                    <LASGEditor value = {'<p>Start typing your text here...</p>'} readOnly = {false} submittableText = {getText} />

                </div>

            </div>

        </div>

    </div>

  )
}
