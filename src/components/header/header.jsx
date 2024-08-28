import React from 'react'
import './header.scss'
import logo from  '../../assets/lasg__logo.png'
import { Bell, Message, NavArrowDown, Search } from 'iconoir-react'

export default function Header() {

  return (

    <div className="header__main">

        <div className="strip_lines">

            <div className="lineIn lasg_red"></div>
            <div className="lineIn lasg_blue"></div>
            <div className="lineIn lasg_yellow"></div>
            <div className="lineIn lasg_green"></div>

        </div>

        <div className="container flex flex_justify_space_between flex_align_center">

            {/* Search Area */}

            <div className="header__top">

                <div className="lasg__logo flex">

                    <div className="image"> <img src={logo} alt="#" /> </div>
                    <div className="logo__name thick_500"> Lagos State Government Master Portal </div>

                </div>
                
            </div>

            {/* Search & Account User */}
            <div className="aux">

                <div className="quick__header__info">

                    <Message strokeWidth={2}/>
                    <Bell strokeWidth={2}/>

                </div>

                <div className="account">

                    <div className="account__current">

                        <div className="account_bubble"> SA </div>

                        <div className="name_agent">

                            <div className="agent"> Setonji Avoseh </div>
                            <div className="position"> Super Admin </div>

                        </div>

                        <NavArrowDown />
                            
                    </div>

                </div>

                <div className="hovMan">

                    <div className="dropdown__open">

                        <div className="list__options" onClick={()=>window.location.href = '/settings/profile'} > View Profile <span>Check out your profile and manage it</span> </div>
                        <div className="list__options" onClick={()=>window.location.href = '/settings/profile'} > Go to Settings <span> Setup preferences and security </span> </div>
                        <div className="list__options baseMod thick"> Sign Out </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
  )

}
