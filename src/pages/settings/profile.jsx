import { Xmark } from 'iconoir-react';
import React, {useState} from 'react'

export default function Profile() {

    const [modal, setModal] = useState(false);

    const handleSubmit = () => {

    }
    
  return (

    <div className="settings__section">

        {/* section title */}
        <div className="section__title"> Personal Information </div>
        
        {/* section body form */}
        <form action="onSubmit">

            <div className="formInputs --formfix">

                <div>
                    <label> Firstname </label>
                    <input type="text" placeholder='Enter firstname' value = {"Oluwatobiloba"} />
                </div>

                <div>
                    <label> Lastname </label>
                    <input type="text" placeholder='Enter lastname' value = {"Obasa"} />
                </div>
                
            </div>

            <div className="formInputs">

                <label> Email Address </label>
                <input type="text" placeholder='Enter email address' value = {"tobi.obasa@davtonlearn.com"} />
                
            </div>

            <div className="formInputs">

                <label> Phone Number </label>
                <input type="text" placeholder='Enter phone number' value = {"08133211658"} />
                
            </div>

        </form>

        {/* section title */}
        <div className="section__title top_20"> Security & Authentication </div>

        <div className="button_auth changePassword" onClick={()=>setModal(true)}> Change Password </div>

        {
            modal 

            ?

            <div className="modalAdmin">
            
                <div className="modal__container">

                    <div className="section__title flex flex_align_center flex_justify_space_between line_dw"> Change Password <div className="close"  onClick={()=>setModal(false)}><Xmark color = '#131313' /></div> </div>

                    <form >

                        <div className="formInputs">

                            <label> Old Password </label>
                            <input type="text" placeholder='Enter old password' />
                            
                        </div>

                        <div className="formInputs">

                            <label> New Password </label>
                            <input type="text" placeholder='Enter new password' />
                            
                        </div>

                        <div className="formInputs">

                            <div className="button_auth submit"> Change Password </div>
                            
                        </div>

                    </form>

                </div>

            </div> 

            : null

        }

    </div>

  )

}
