import React from 'react'
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

export default function RouterClass() {

  return (

    <Routes>

        <Route path = '/'>

            <Route path = 'dashboard' element = { <Dashboard /> } />
            <Route path = 'mda' element = { <Mda /> } />
            <Route path = 'executive_council' element = { <Executive /> } />
            <Route path = 'category' element = { <Category /> } />
            <Route path = 'services' element = { <Services /> } />
            <Route path = 'news/:topic/:page' element = { <Newsroom /> } />
            <Route path = 'events' element = { <Mda /> } />
            <Route path = 'subscribers' element = { <Subscribers /> } />
            {/* <Route path = 'reports' element = { <Mda /> } /> */}
            <Route path = 'settings/:type' element = { <Settings /> } />

        </Route>

    </Routes>

  )
}
