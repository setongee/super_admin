import React,{useState, useEffect} from 'react'
import { ArrowDown, ArrowDownLeft, ArrowUp, ArrowUpRight } from 'iconoir-react'
import { formatDate } from '../../middleware/middleware';

export default function Table__body({data, type, uid}) {

    const [stat, setStat] = useState(0);

    useEffect(() => {
       
        // if (data.searches){

        //     const newRes = data.searches.new;
        //     const formerRes = data.searches.former;

        //     const diff = (newRes - formerRes) / formerRes
        //     const percentile = diff * 100
        //     const fixed = parseFloat(percentile).toFixed(1);

        //     setStat(fixed);
            
        // }  

        console.log(data)
       
    }, []);

  return (

    <div className="table__body flex_align_centers">

        <div className={`body__name flex ${type === "2" ? 'widee__90' : '' }`}> <div className="index thick">{ uid }.</div> {data.name } </div>

        {
            type === "1" ? (

                <div className="body__stat flex flex_align_center">

                    <div className="body__info thick"> { formatDate(data.updatedAt) } </div>

                    {/* <div className={`direction ${stat > 0 ? 'increase' : 'decrease'}`}> { stat > 0 ? <ArrowUpRight width={15} height={15} strokeWidth={3} /> : <ArrowDownLeft width={15} height={15} strokeWidth={3} /> } </div> */}

                </div>

            ) : null
        }

{
            type === "9" ? (

                <div className="body__stat flex flex_align_center">

                    <div className="body__info thick"> <a href={`https://${data.subdomain}.lagosstate.gov.ng`} target='_blank'> {`${data.subdomain}.lagosstate.gov.ng`} </a> </div>

                    {/* <div className={`direction ${stat > 0 ? 'increase' : 'decrease'}`}> { stat > 0 ? <ArrowUpRight width={15} height={15} strokeWidth={3} /> : <ArrowDownLeft width={15} height={15} strokeWidth={3} /> } </div> */}

                </div>

            ) : null
        }

    </div>

  )
}
