import React, {useState, useEffect} from 'react'

import UIHolder from '../../components/holder/ui__holder'
import './settings.scss'
import { useParams } from 'react-router-dom';
import Profile from './profile';
import Team from './team';

export default function Settings() {

    let params = useParams();
   
    useEffect(() => {

        if(params.type === 'profile'){

            document.querySelector('.profile').classList.add('current')

        }
        else{
            document.querySelector('.team').classList.add('current')
        }

    }, [params]);

  return (
   
    <UIHolder>

        <div className="settings__menu">

            <div className="tab__section profile" onClick={()=>window.location.href = '/settings/profile'} > Profile </div>

            <div className="tab__section team" onClick={()=>window.location.href = '/settings/team'} > Team </div>

        </div>

        {
            params.type === 'profile' ? <Profile/> : <Team/>
        }

    </UIHolder>

  )

}
