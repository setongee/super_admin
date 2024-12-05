import React from 'react'
import { AppleShortcuts, BookStack, Building, Dashboard, LayoutLeft, Menu, Reports, SelectiveTool, Settings, SquareCursor, Tv, IconoirProvider, Cellar, WebWindowSolid, Internet, WebWindow, Edit, NetworkSolid, CardLock, ReportColumns } from 'iconoir-react'

export default function Comms() {

  return (

    <div className="menu__links">

        <a href='/dashboard' className="link dashboard active" > 

        <div className="icon"><LayoutLeft/></div> 
        <div className="text">Dashboard</div>
        
        </a>

        <a href='/mda' className="link mda"> 

        <div className="icon"><Cellar/></div> 
        <div className="text">MDAs Zone</div>
        
        </a>

        <a href='/executive_council' className="link executive_council"> 

        <div className="icon"><Edit /></div> 
        <div className="text">Executive Council</div>
        
        </a>

        <a href='/news/all/1' className="link news"> 

        <div className="icon"><Internet/></div> 
        <div className="text"> Newsroom </div>
        
        </a>
{/* 
        <a href='/subscribers' className="link subscribers"> 

        <div className="icon"><SquareCursor/></div> 
        <div className="text">Subscribers</div>
        
        </a> */}

        <a href='/settings/profile' className="link settings"> 

        <div className="icon"><Settings /></div> 
        <div className="text">Settings</div>
        
        </a>

    </div>
    
  )

}
