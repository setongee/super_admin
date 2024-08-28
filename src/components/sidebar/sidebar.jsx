import React,{useEffect, useState} from 'react'
import './sidebar.scss'
import logo from  '../../assets/lasg__logo.png'
import { AppleShortcuts, BookStack, Building, Dashboard, LayoutLeft, Menu, Reports, SelectiveTool, Settings, SquareCursor, Tv, IconoirProvider, Cellar, WebWindowSolid, Internet, WebWindow, Edit, NetworkSolid, CardLock, ReportColumns } from 'iconoir-react'
import dash from '../../assets/dash.svg'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Sidebar() {

  let url = useLocation();
  let navigate = useNavigate();

  const [path, setPath] = useState(url.pathname);

  useEffect(() => {

    if(path === '/') {

      return navigate('/dashboard')

    }

    const active = document.querySelector('.active');

    if (active !== null) {

      active.classList.remove('active')

      let pathname = path.split('/')[1];
      const getElement = document.querySelector(`.${pathname}`);
      getElement.classList.add('active');

    }
    
    
    
  }, [path]);

  return (

    <div className="sidebar">

      <IconoirProvider

          iconProps={{
            strokeWidth: 2
          }}

        >

          <div className="mainMenu">

              <div className="menu__heading">

                <div className="menu__controller"> <Menu/> </div>

              </div>

              {/* Menu Links */}

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

                  <a href='/category' className="link category"> 

                    <div className="icon"><ReportColumns /></div> 
                    <div className="text">Categories</div>
                  
                  </a>

                  <a href='/services' className="link services"> 

                    <div className="icon"><AppleShortcuts /></div> 
                    <div className="text">Services</div>
                  
                  </a>

                  <a href='/news' className="link news"> 

                    <div className="icon"><Internet/></div> 
                    <div className="text"> Newsroom </div>
                  
                  </a>

                  <a href='/events' className="link events"> 

                    <div className="icon"><Tv/></div> 
                    <div className="text"> Events </div>
                  
                  </a>

                  <a href='/subscribers' className="link subscribers"> 

                    <div className="icon"><SquareCursor/></div> 
                    <div className="text">Subscribers</div>
                  
                  </a>

                  {/* <a href='/reports' className="link reports"> 

                    <div className="icon"><Reports/></div> 
                    <div className="text">Reports</div>
                  
                  </a> */}

                  <a href='/settings/profile' className="link settings"> 

                    <div className="icon"><Settings /></div> 
                    <div className="text">Settings</div>
                  
                  </a>

              </div>

          </div>
        
        </IconoirProvider>

    </div>


  )
}