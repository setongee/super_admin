import React, { useState, useEffect } from 'react'
import './header.scss'
import logo from  '../../assets/lasg__logo.png'
import { Bell, Message, NavArrowDown, Search } from 'iconoir-react'
import { getSingleUser } from '../../api/auth/user'

export default function Header() {

    const [userDetails, setUserDetails] = useState({ firstname : "", lastname : "", role : "" })

    useEffect(() => {

        const user = window.localStorage.getItem('lasg_token');
        const parser = JSON.parse(user);

        getSingleUser(parser.id)
        .then( res => setUserDetails({firstname : res.firstname, lastname : res.lastname, role : res.role}) )
 
        
    }, []);

    const handleSignOut = () => {

        window.localStorage.removeItem('lasg_token');
        window.location.reload();

    }

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

                        <div className="account_bubble"> { userDetails.firstname.split("")[0] }{ userDetails.lastname.split("")[0] } </div>

                        <div className="name_agent">

                            <div className="agent"> {userDetails.firstname} {userDetails.lastname} </div>
                            <div className="position"> {userDetails.role} </div>

                        </div>

                        <NavArrowDown />
                            
                    </div>

                </div>

                <div className="hovMan">

                    <div className="dropdown__open">

                        <div className="list__options" onClick={()=>window.location.href = '/settings/profile'} > View Profile <span>Check out your profile and manage it</span> </div>
                        <div className="list__options" onClick={()=>window.location.href = '/settings/profile'} > Go to Settings <span> Setup preferences and security </span> </div>
                        <div className="list__options baseMod thick" onClick={()=>handleSignOut()}> Sign Out </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
  )

}
