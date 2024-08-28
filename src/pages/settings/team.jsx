import React from 'react'
import UIHolder from '../../components/holder/ui__holder'
import { Plus } from 'iconoir-react'
import { truncateText } from '../../components/truncateText.jsx/truncateText'

export default function Team() {

  return (

    <div className="team">

        <div className="settings__holder">

            <div className="team__heading flex flex_justify_space_between">

                {/* section title */}
                <div className="section__title"> Team members - 4 </div>

                {/* section title */}
                <div className="button_auth green flex flex_align_center"> <Plus/> Invite Member </div>

            </div>

            {/* table area */}
            <div className="table__area__settings__team">

                <div className="tableHeaders__team flex">

                    <div className="team__table__th">Name</div>
                    <div className="team__table__th">Email Address</div>
                    <div className="team__table__th">Role</div>
                    <div className="team__table__th">Last Login</div>
                    <div className="team__table__th">Date Added</div>
                    <div className="team__table__th"> Actions </div>

                </div>

                <div className="tableBody__team flex">

                    <div className="team__table__td"> {truncateText('Oluwatobiloba Obasa', 20)} </div>
                    <div className="team__table__td">tobi@davtonlean.com</div>
                    <div className="team__table__td">Super Admin</div>
                    <div className="team__table__td">24th Aug. 2024, 8:34 AM</div>
                    <div className="team__table__td">10 Jul. 2024, 10:58 PM</div>
                    <div className="team__table__td"> Delete Member </div>

                </div>

            </div>

        </div>

    </div>

  )

}
