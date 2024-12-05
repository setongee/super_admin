import React,{useEffect, useState} from 'react'
import './sidebar.scss'
import logo from  '../../assets/lasg__logo.png'
import { AppleShortcuts, BookStack, Building, Dashboard, LayoutLeft, Menu, Reports, SelectiveTool, Settings, SquareCursor, Tv, IconoirProvider, Cellar, WebWindowSolid, Internet, WebWindow, Edit, NetworkSolid, CardLock, ReportColumns } from 'iconoir-react'
import dash from '../../assets/dash.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import Admin from './admin'
import Comms from './comms'

export default function Sidebar() {

  const [role, setRole] = useState("");

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
      getElement?.classList.add('active');

    }
    
  }, [path]);
  
  useEffect(() => {
   
    const holders = document.querySelector('.holding')
    const header = document.querySelector('.header__main')

  }, []);

  useEffect(() => {

    const user = window.localStorage.getItem('lasg_token');
    const parser = JSON.parse(user);

    setRole(parser.role);

    
}, []);

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

              {
                role === "admin" ? <Admin/> : <Comms/>
              }

          </div>
        
        </IconoirProvider>

    </div>


  )
}
