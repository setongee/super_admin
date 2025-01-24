import React, {useState, useEffect} from 'react'
import { Route, Routes, redirect, useLocation } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Mda from './pages/mda/mda'
import Services from './pages/services/services'
import Category from './pages/category/category'
import Newsroom from './pages/newsroom/newsroom'
import Executive from './pages/executive/executive'
import Subscribers from './pages/subscribers/subscribers'
import Settings from './pages/settings/settings'
import { decodeURL } from './middleware/middleware'
import Events from './pages/events/Events'

export default function RouterClass() {

  const [role, setRole] = useState("");

  useEffect(() => {

    const user = window.localStorage.getItem('lasg_token');
    const parser = JSON.parse(user);

    setRole(parser.role);

    
}, []);

  return (

    <Routes>

        {
          role === "admin" ?

          (
            <Route path = '/'>

                <Route path = 'dashboard' element = { <Dashboard /> } />
                <Route path = 'mda' element = { <Mda /> } />
                <Route path = 'executive_council' element = { <Executive /> } />
                <Route path = 'category' element = { <Category /> } />
                <Route path = 'services' element = { <Services /> } />
                <Route path = 'news/:topic/:page' element = { <Newsroom /> } />
                <Route path = 'events/:topic/:page' element = { <Events /> } />
                <Route path = 'subscribers' element = { <Subscribers /> } />
                {/* <Route path = 'reports' element = { <Mda /> } /> */}
                <Route path = 'settings/:type' element = { <Settings /> } />

                {/* 404 Page Not Found */}
                <Route path="*" element = {<h1>Page not found</h1>} />

            </Route>

          ) 
          
          : 
          
          (
            <Route path = '/'>

              <Route path = 'dashboard' element = { <Dashboard /> } />
              <Route path = 'mda' element = { <Mda /> } />
              <Route path = 'executive_council' element = { <Executive /> } />
              <Route path = 'news/:topic/:page' element = { <Newsroom /> } />
              <Route path = 'settings/:type' element = { <Settings /> } />

              {/* 404 Page Not Found */}
              <Route path="*" element = { <div className='pageNotFound'> Page not found </div>  } />

            </Route>

          )

        }

    </Routes>

  )
}
