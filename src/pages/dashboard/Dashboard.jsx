import React,{useEffect, useState} from 'react'
import './dashboard.scss'

import { ArrowDown, ArrowUp } from 'iconoir-react'
import Table__body from '../../components/dashboard/table__body'
import Charts from '../../components/charts/charts'
import Table__body__more from '../../components/dashboard/table__body__more'
import UIHolder from '../../components/holder/ui__holder'
import { reports__data } from '../../api/reports.req';
import Loader from '../../components/loader/loader'


export default function Dashboard() {
    
    const [loading, setLoading] = useState(false);
    const [ reports, setReports ] = useState( 
    { 
        services : {
            data : [],
            lastUpdated : "0 days ago",
            message : "No subscribers yet!"
        }, 

        subscribers : {
            data : [],
            lastUpdated : "0 days ago",
            message : "No subscribers yet!"
        },
        
        mda : {
            data : [],
            lastUpdated : "0 days ago",
            message : "No subscribers yet!"
        }, 
        
    } );

    useEffect(() => {

        setLoading(true);
        
        reports__data()
        .then( e => {
            setReports(e);
            setLoading(false)
        } )
        .catch( err => console.log(err) )  

    }, []);

  return (

    <UIHolder>
    
        <div className="overview">

            <div className="page__identity">

                Overview

            </div>

            <div className="statistics">

                <div className="mda__stat">

                    <div className="index__stat">
                        
                        <div className="sub__title"> Total LASG Visits </div>
                        
                        <div className="sub__result"> 438 </div>
                        
                        <div className="trend flex flex_align_center">

                            <div className="stat__res flex increase__body "> 
                                
                                <div className="direction increase"><ArrowUp width={15} height={15} strokeWidth={3} /></div>

                                <div className="res increase thick"> 25.3% </div> 

                            </div>

                            <div className="compare__trend">
                                vs last week
                            </div>

                        </div>

                    </div>

                </div>

                <div className="mda__stat">

                    <div className="index__stat">
                        
                        <div className="sub__title"> Total Subscribers </div>
                        <div className="sub__result"> {reports.subscribers.data.length} </div>

                        <div className="trend flex flex_align_center">

                            <div className="stat__res flex default__body"> 

                                <div className="res default thick">Last Updated</div> 

                            </div>

                            <div className="compare__trend">
                                {reports.subscribers.lastUpdated}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="mda__stat">

                    <div className="index__stat">
                        
                        <div className="sub__title"> Total MDAs </div>
                        <div className="sub__result"> {reports.mda.data.length} </div>

                        <div className="trend flex flex_align_center">

                            <div className="stat__res flex default__body"> 

                                <div className="res default thick">Last Updated</div> 

                            </div>

                            <div className="compare__trend">
                                {reports.mda.lastUpdated}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="mda__stat">

                    <div className="index__stat">
                        
                        <div className="sub__title"> Total Services </div>
                        <div className="sub__result"> {reports.services.data.length} </div>

                        <div className="trend flex flex_align_center">

                            <div className="stat__res flex default__body"> 

                                <div className="res default thick">Last Updated</div> 

                            </div>

                            <div className="compare__trend">
                                {reports.services.lastUpdated}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="charts__data">
                <Charts/>
            </div>

            <div className="flex flex_justify_space_between">

                {/* Stat Tables */}

                <div className="stat__table size__60 radius__10" style={{position : "relative"}}>

                    {/* Title */}
                    <div className="table__title"> Recently Added Services </div>

                    {/* header */}

                    <div className="headingTabs flex">
                        <div className="index__1"> # Service Name</div>
                        <div className="index__2"> Last Updated </div>
                    </div>


                   <div className="bodyPally" style={{position : "relative"}}>
                    
                    { loading ? <Loader bg = "white" /> : null }

                     {/* Body */}
                     {
                        reports.services.data.length 
                        ?
                        reports.services.data.map( (res, index) => {

                            if ( index < 5 ) {
                                return (
                                    <Table__body type = "1" data = {res} key = {res._id} uid = {index + 1} loading = {loading} />
                                )
                            }

                        } ) : <p className='empty'> Sorry no services added yet! </p>
                    }
                   </div>

                </div>

                {/* Stat Tables */}

                <div className="stat__table size__40 radius__10">

                    {/* Title */}
                    <div className="table__title"> Ministries, Departments & Agencies </div>

                    {/* header */}

                    <div className="headingTabs flex">
                        <div className="index__1"> # Site Name</div>
                        <div className="index__2"> Last Updated </div>
                    </div>


                    {/* Body */}
                    {
                        reports.mda.data.length 
                        ?
                        reports.mda.data.map( (res, index) => {

                            if ( index < 5 ) {
                                return (
                                    <Table__body type = "9" data = {res} key = {res._id} uid = {index + 1} />
                                )
                            }

                        }) : <p className='empty'> Sorry no MDAs added yet! </p>
                    }

                </div>

            </div>

            {/* Stat Tables */}
            <div className="stat__table size__100 radius__10">

                {/* Title */}
                <div className="table__title"> Recent Subscribers </div>

                {/* header */}
                <div className="headingTabs flex headingTabs__more">

                    <div className="index__4"> # Subscriber's Fullname </div>
                    <div className="index__4in"> Email </div>
                    <div className="index__5"> Interests </div>
                    <div className="index__6"> Date Subscribed </div>

                </div>


                {/* Body */}
                {
                    reports.subscribers.data.length 
                    ?
                    reports.subscribers.data.map( (res, index) => <Table__body__more data = {res} key = {index} uid = {index+1} /> )
                    : <p className='empty'> Sorry no subscribers yet! </p>
                }

            </div>

        </div>
    
    </UIHolder>

  )

}
