import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'

import { LeftSidebar } from '../LeftSidebar/LeftSidebar'
import { Avatar } from '../Avatar/Avatar'
import { getAllUsers, updateUser } from '../../actions/userActions'
import '../../pages/Users/Users.css'

export const UserProfile = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.user)
  const token = JSON.parse(localStorage.getItem("Token")).token
  const userToken = token !== null ? `Bearer ${token}` : null
  const users = useSelector(state => state.userReducer.users)
  const userProfile = users.filter(user => user.userId.toString() === id)[0]

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const sendEmail = (message) => {
    emailjs.send('service_asp5u2x', 'template_lysv80n', { message }, 'BRPYZY3FzXeqCSkTL')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const handleBanUser = () => {
    userProfile.banned = !userProfile.banned
    var message = "Your account has been "
    message += userProfile.banned ? "banned\n" : "unbanned\n"
    message += "username: " + userProfile.username + "\n"
    message += "email: " + userProfile.email + "\n"
    console.log("Uncomment method to send an email")
    sendEmail(message)
    dispatch(updateUser(userProfile, userToken))
  }

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className='home-container-2'>
        <section>
          <div className='user-details-container'>
            <div className='user-details'>
              <Avatar
                backgroundColor="green"
                color="black"
                fontSize='50px'
                px='40px'
                py='40px'
              >
                {userProfile?.username.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <h1>{userProfile?.username}</h1>
                <h1>{userProfile?.role}</h1>
                <h1>{userProfile?.score}</h1>
                {
                  user?.role === "MODERATOR" &&
                  <h1>Banned: {userProfile?.banned.toString()}</h1>
                }
              </div>
              {
                user?.role === "MODERATOR" &&
                  userProfile?.banned ?
                  <button onClick={handleBanUser}>Unban user</button>
                  :
                  <button onClick={handleBanUser}>Ban user</button>
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
