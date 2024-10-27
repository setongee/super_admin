import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Check, Plus, Xmark } from 'iconoir-react';
import './addServiceModal.scss'
import Services__category from './services__category';
import Fuse from 'fuse.js';
import CMS_Editor from '../../components/textEditor/CMS_Editor';
import LASGEditor from '../../components/textEditor/lasg_custom_editor';

export default function AddService({setNew, close, category}) {

    const [data, setData] = useState({name : '', content : '', keywords : [], tags : [], url : '', cta : '', short : '', isOffline : false });
    const [addtagModal, setaddtagModal] = useState(false)
    const [tags, setTags] = useState([]);
    const [keyw, setKeyw] = useState("");
    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState(category);

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
                "categories" : tags
            }
        }) 

    }, [tags]);

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

    const closeShow = () => {

        close();
        setData({})

    }

    const handleSubmit = async () => {

        if(data.name === '' || data.content === '' || !data.categories.length || !data.keywords.length  || data.url === '' || data.cta === '' || data.short === '' ) {

            alert("All fields are required before adding. Try again!")


        } else {

            const response = await axios.post('http://localhost:8000/api/v2/services/add/single', data);
        
            if (response.status === 200){


                setNew(response.data);
                closeShow();
            

            }

        }

    }


    const refineKeywords = (e) => {

        const val = e.target.value
        setKeyw(val);

        const trans = val.split(",")

        const ready = trans.map(res => {
            return {
                key : res.trim()
            }
        })

        setData({...data, keywords : ready})

    }

  return (
    
    <div className="form__body service__point">

        <div className="main__form">

            <div className="closeIcon" onClick={()=>close()}> <Xmark/> </div>

            <div className="form__title"> 

                <div className="heading"> Add new service </div>
                <p>Kindly input all valid informations below</p>
                
            </div>

            <div className="form__contain">

                <div className="form">

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

                    {/*Keywords */}
                    
                    <div className="form__holder">

                        <label> Keywords (Use comma (,) to seperate keywords) </label>
                        <input type="text" name = 'key' value = { keyw } placeholder='Enter here...' onChange={refineKeywords} />

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

                    {/* Url */}
                    
                    <div className="form__holder">

                        <label> URL link </label>
                        <input type="text" name = 'url' value = {data.url} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>

                    {/* CTA */}
                    
                    <div className="form__holder">

                        <label> CTA (Call To Action) </label>
                        <input type="text" name = 'cta' value = {data.cta} placeholder='Enter here...' onChange={(handleChange)} />

                    </div>


                    <div className="ssbmit__button" onClick={handleSubmit} > Proceed </div>


                </div>

                <div className="editor">

                    <LASGEditor value = {'<p>Start typing your text here...</p>'} readOnly = {false} submittableText = {getText} />

                </div>

            </div>

        </div>

    </div>

  )
}
