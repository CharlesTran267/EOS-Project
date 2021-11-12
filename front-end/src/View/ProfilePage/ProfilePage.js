import React ,{useEffect} from 'react'
import { useSelector } from 'react-redux';
function ProfilePage() {
    const user= useSelector(state => state.user)
    return (
        <div>
            <h1> User Id: {user.userData._id}</h1>
            <h1> User Name: {user.userData.name} </h1>
            <h1> User Email: {user.userData.email} </h1>
        </div>
    )
}

export default ProfilePage
