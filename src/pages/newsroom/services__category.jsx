import { Check } from 'iconoir-react'
import React, {useEffect} from 'react'

export default function Services__category({name, tags, tagsZone}) {

  return (
  
    <div className="checkbox"> 

        <div className="box"> 

            {
                tagsZone.includes(name) ? <input type="checkbox" onChange={e => tags(e, name)} checked /> : <input type="checkbox" onChange={e => tags(e, name)} /> 

            }
            
            <div className="checkIn">

                <Check strokeWidth={2.4}/>

            </div> 

        </div> 
        
        <div className="category"> {name} </div> 

    </div>
    
  )
}
