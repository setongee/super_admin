import React,{useState, useEffect} from 'react'
import { Check, DotArrowDown, MoreVertCircle, NavArrowDown } from 'iconoir-react'
import axios from 'axios'
import serviceIcon from '../../assets/MDA/department.svg'
import { deleteSingleService } from '../../api/services.req';
import { deleteCategory } from '../../api/category.req';


export default function CategoryTableData({data, setNew, handleEdit}) {

  const [showMore, setShowMore] = useState(false);
  const [truncatedText, setTruncatedText] = useState('');
  
  document.addEventListener('click', e => {

    if (e.target.id !== 'petals' ){
      handleCloseMore()
    }

  })

  const handleOpenMore = () => {

    setShowMore(true);

  }

  const handleCloseMore = () => {

    setShowMore(false);

  }

  const handleDelete = async () => {

   const response = window.confirm(`Are you sure you want to delete the record for '${data.name}'?`);
   
    if (response) {

      await deleteCategory(data._id).then( e => setNew(e.message) );

    }
   
  }

  useEffect(() => {

    const maxLength = 70

    if (data.short.length > maxLength) {

        const newText = data.short.substring(0, maxLength) + '...';
        setTruncatedText(newText);
        
    }
    else{
        setTruncatedText(data.short)
    }
    
  }, [data]);

  return (
    
    <div className="table__data body__area">

        <div className="table__heading_title flex__column">

            <div className="custom__icon"> <img src={data.icon} alt="service icon" /> </div>

            <div className="mda__name">
                <div className='main'>{data.name}</div>
            </div>

        </div>
        <div className="table__heading_title lh__16 xtraW2"> {truncatedText}</div>

        {/* <div className="table__heading_title xtraW"> { data.categories[0] } <p className='hoverPop' style={{color : 'green'}}>{data.categories.length > 1 ? `and ${data.categories.length - 1} More` : null}</p> { data.categories.length > 1 ? <div className="moreInfoCategory"> {data.categories.map( e => <p>{e}</p> ) } </div> : null } </div> */}

        <div className="table__heading_title"> { data.updatedAt.split("T")[0]}</div>

        <div className="table__heading_title xtraW8">{ data.disabled ? <div className="decrease__body status">Offline</div> : <div className="increase__body status"><p>Active</p></div> }</div>
        
        <div className="table__heading_title more__more xtraW5" id = 'petals' onClick={ () => handleOpenMore() }>  
          
          <MoreVertCircle id = 'petals'/> 
        
        </div>

        {
            showMore ? (

              <div className="more" id = 'more'>

                <p onClick={() => handleEdit(data._id)}>Edit Category Details</p>
                <p className='del' onClick={handleDelete}>Delete Category</p>

              </div>

            ) : null
          }

    </div>

  )
}
