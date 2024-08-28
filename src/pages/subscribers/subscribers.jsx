import React,{useState, useEffect} from 'react'

import UIHolder from '../../components/holder/ui__holder'
import NewsroomTable from './subscribersTable'
import { getAllSubscribers } from '../../api/subscribers.req';

export default function Subscribers() {

  const [subscribers, setSubscribers] = useState({ data : [], lastUpdated : '', message : "" })

  useEffect(() => {

    getAllSubscribers().then( e => setSubscribers(e) );
    
  }, []);


  return (

    <div className="services">

        <UIHolder>
            
            <NewsroomTable table__data = {subscribers} />

        </UIHolder>

    </div>

  )

}
