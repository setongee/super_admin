import React, {useState, useEffect} from 'react'
import UIHolder from '../../components/holder/ui__holder'
import { Plus } from 'iconoir-react'
import { truncateText } from '../../components/truncateText.jsx/truncateText'
import { addSingleUser, deleteSingleUser, getAllUsers } from '../../api/auth/user';
import { formatDate2 } from '../../middleware/middleware';
import { Xmark } from 'iconoir-react';
import { addSingleMda } from '../../api/mda.req';

export default function Team() {

    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("");
    const [uid, setUid] = useState("");
    const [action, setAction] = useState(null);

    const [modal, setModal] = useState(false);
    const [userRef, setUserRef] = useState({ email : "", firstname : "", lastname : "", role : "", password : "" })

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setUserRef( (data) => {
            return {
                ...data,
                [name] : value
            }
        } )

    }

    const handleSubmit = () => {

       if ( userRef.email === "" || userRef.firstname === "" || userRef.lastname === "" || userRef.role === "" || userRef.password === "" ){

            alert("All fields are required to add a team member")

       } else{

        addSingleUser(userRef)
        .then(res => {

            if (res.status === "ok"){

                alert(res.message);
                setModal(false);
                setAction(userRef)

            }

            else{

                alert(res.message);

            }

        } )

       }

    }

    useEffect(() => {
        
        getAllUsers()
        .then(res => {
            
            if(res.status === "ok"){
                setUsers(res.data)
            }
        })
        
    }, [action]);

    useEffect(() => {

        const user = window.localStorage.getItem('lasg_token');
        const parser = JSON.parse(user);
        
        setRole(parser.role);
        setUid(parser.id);
        
    }, []);

    useEffect(() => {
        
        if (!modal){
            setUserRef({ email : "", firstname : "", lastname : "", role : "", password : "" });
        }
        
    }, [modal]);

    const deleteUser = (firstname, lastname, id) => {

        const confirm = window.confirm(`Are you sure you want to delete ${firstname} ${lastname}?`);

        if (confirm) {

            deleteSingleUser(id)
            .then(res =>{
                if (res.status === "ok"){

                    setAction(id);

                }
            });

        }

    }

  return (

    <div className="team">

        <div className="settings__holder">

            <div className="team__heading flex flex_justify_space_between">

                {/* section title */}
                <div className="section__title"> Team members - 4 </div>

                {/* section title */}
                <div className="button_auth green flex flex_align_center" onClick={() => setModal(true)} > <Plus/> Add Team Member </div>

            </div>

            {/* table area */}
            <div className="table__area__settings__team">

                <div className="tableHeaders__team flex">

                    <div className="team__table__th">Name</div>
                    <div className="team__table__th emil">Email Address</div>
                    <div className="team__table__th emp">Role</div>
                    <div className="team__table__th">Last Login</div>
                    <div className="team__table__th">Date Added</div>
                    <div className="team__table__th"> Actions </div>

                </div>

                {
                    users.length ? users?.map( data => (
                        
                        <div className="tableBody__team flex" key = {data._id}>

                            <div className="team__table__td sty"> {truncateText(`${data.firstname} ${data.lastname}`, 20)} </div>
                            <div className="team__table__td emil">{data.email}</div>
                            <div className="team__table__td sty emp"> {data.role} </div>
                            <div className="team__table__td sty"> { data.lastLogin === "" ? "Not Logged in yet" : data.lastLogin } </div>
                            <div className="team__table__td sty"> { formatDate2(data.createdAt) } </div>

                            { role === "admin" ? uid !== data._id ? <div className="team__table__td" onClick={ () => deleteUser(data.firstname, data.lastname, data._id) } > Delete Member </div> : <div className="team__table__td disabled"> Delete Member </div> : <div className="team__table__td disabled"> Delete Member </div> }

                        </div>

                    ) ): null
                }

            </div>

        </div>

        <div>

        {
            modal 

            ?

            <div className="modalAdmin">
            
                <div className="modal__container">

                    <div className="section__title flex flex_align_center flex_justify_space_between line_dw"> Add New User <div className="close"  onClick={()=>setModal(false)}><Xmark color = '#131313' /></div> </div>

                    <form >

                        <div className="formInputs">

                            <label> Firstname </label>
                            <input type="text" name = "firstname" placeholder='Enter Firstname' onChange = { (e) => handleChange(e) } value={userRef.firstname} />
                            
                        </div>

                        <div className="formInputs">

                            <label> Lastname </label>
                            <input type="text" name = "lastname" placeholder='Enter Lastname' onChange = { (e) => handleChange(e) } value={userRef.lastname} />
                            
                        </div>
                        
                        <div className="formInputs">

                            <label> Email Address </label>
                            <input name = "email" type="text" placeholder='Enter Email' onChange = { (e) => handleChange(e) } value={userRef.email} />
                            
                        </div>

                        <div className="formInputs">

                            <label> Password </label>
                            <input type="text" name = "password" placeholder='Enter Password' onChange = { (e) => handleChange(e) } value={userRef.password} />
                            
                        </div>

                        <div className="formInputs">

                            <label> Role </label>

                            <select name="role" value={userRef.role} onChange = { (e) => handleChange(e) } >
                                <option value=""> ----------------------- Select Role -----------------------  </option>
                                <option value="admin"> Admin ( Has access to all parts of the admin ) </option>
                                <option value="comms"> Comms ( Has access to MDAs, Newsroom & Executive Council ) </option>
                            </select>
                            
                        </div>


                        <div className="formInputs">

                            <div className="button_auth submit" onClick={ () => handleSubmit() } > Create User </div>
                            
                        </div>

                    </form>

                </div>

            </div> 

            : null

        }

    </div>

    </div>

  )

}
