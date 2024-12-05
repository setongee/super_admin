import { Xmark } from 'iconoir-react';
import React, {useState, useEffect} from 'react'
import { changePassword, getSingleUser } from '../../api/auth/user';

export default function Profile() {

    const [modal, setModal] = useState(false);
    const [userDetails, setUserDetails] = useState({ email : "", firstname : "", lastname : "", role : "" })
    const [id, setId] = useState("")

    const [passwords, setPasswords] = useState( { oldPassword : "", newPassword : "", confirmNewPassword : "" } );

    const handleSubmit = () => {

        if(passwords.newPassword !== passwords.confirmNewPassword) {
            alert("Confirm New Password must match New Password")
        } else {

            changePassword(id, passwords.oldPassword, passwords.newPassword)
            .then(res => {

                if ( res.status === "bad" ) {
                    alert(res.message);
                }
                else{

                    setModal(false);
                    alert(res.message);
                    handleSignOut();

                }

            })

        }

    }

    const handleSignOut = () => {

        window.localStorage.removeItem('lasg_token');
        window.location.reload();

    }

    useEffect(() => {

        const user = window.localStorage.getItem('lasg_token');
        const parser = JSON.parse(user);

        getSingleUser(parser.id)
        .then( res => setUserDetails( { firstname : res.firstname, lastname : res.lastname, email : res.email, role : res.role } ) )

        setId(parser.id)
 
        
    }, []);


    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setPasswords( (data) => {
            return {
                ...data,
                [name] : value
            }
        } )

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
                    <input type="text" placeholder='Enter firstname' value = {userDetails.firstname} disabled />
                </div>

                <div>
                    <label> Lastname </label>
                    <input type="text" placeholder='Enter lastname' value = {userDetails.lastname} disabled />
                </div>
                
            </div>

            <div className="formInputs">

                <label> Email Address </label>
                <input type="text" placeholder='Enter email address' value = {userDetails.email} disabled />
                
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
                            <input name = "oldPassword" type="text" placeholder='Enter old password' onChange = { (e) => handleChange(e) } value={passwords.oldPassword} />
                            
                        </div>

                        <div className="formInputs">

                            <label> New Password </label>
                            <input type="text" name = "newPassword" placeholder='Enter new password' onChange = { (e) => handleChange(e) } value={passwords.newPassword} />
                            
                        </div>

                        <div className="formInputs">

                            <label> Confirm New Password </label>
                            <input type="text" name = "confirmNewPassword" placeholder='Confirm new password' onChange = { (e) => handleChange(e) } value={passwords.confirmNewPassword} />
                            
                        </div>

                        <div className="formInputs">

                            <div className="button_auth submit" onClick={ () => handleSubmit() } > Change Password </div>
                            
                        </div>

                    </form>

                </div>

            </div> 

            : null

        }

    </div>

  )

}
