import React from 'react'
import './ui__holder.scss'

export default function UIHolder(props) {
  
    return (

    <div className="holding">
        
        {props.children}

    </div>

  )

}
