import React,{useState, useEffect} from 'react'
import './subscribers.scss'
import { formatDate } from '../../middleware/middleware';
import { truncateText } from '../../components/truncateText.jsx/truncateText';


export default function SubscribersTableData({data, uid}) {

  return (
    
    <div className="table__data body__area">

        <div className="table__heading_title table__heading_title_2 flex__column mixin">

            <div className="d">
                <div className='main'>{uid}. { truncateText(data.fullname, 70 ) } </div>
            </div>

        </div>

        <div className="table__heading_title table__heading_title_2 date-f"> { data.email }</div>

        <div className="table__heading_title table__heading_title_2 tab_flex"> { data.interests[0] } <p className='hoverPop' style={{color : 'green'}}>{data.interests.length > 1 ? `and ${data.interests.length - 1} More` : null}</p> { data.interests.length > 1 ? <div className="moreInfoCategory"> {data.interests.map( e => <p>{e}</p> ) } </div> : null } </div>

        <div className="table__heading_title table__heading_title_2 date-f"> { formatDate(data.createdAt) }</div>

    </div>

  )
}
