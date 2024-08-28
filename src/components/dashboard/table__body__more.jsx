import React,{useState, useEffect} from 'react'
import { ArrowDown, ArrowDownLeft, ArrowUp, ArrowUpRight } from 'iconoir-react'
import { formatDate } from '../../middleware/middleware';

export default function Table__body__more({data, uid}) {

    const [stat, setStat] = useState(0);

  return (

    <div className="table__body flex_align_centers">

        <div className={'body__name flex subscribe__name'}> <div className="index thick">{uid}.</div> { data.fullname } </div>

        <div className={'body__name flex subscribe__name subscribe__name2'}>{ data.email } </div>


        <div className="stat__interests flex flex_align_center subscribe__stat">

            <div className="body__info body__info__interests flex flex_align_center">  
                {
                    data.interests.map( (e, index) => <div className="interests" key = {index} > { index + 1 !== data.interests.length ? e + "," : e } </div> )
                }
            </div>

        </div>

        <div className="body__stat flex flex_align_center subscribe__stat">

            <div className="body__info"> <strong>{ formatDate(data.updatedAt) }</strong> </div>

        </div>

    </div>

  )
}
