import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedOut } from '../store/slices/isLogged.slice'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const username = useSelector(state => state.username)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    dispatch(setLoggedOut())
    navigate(`/login`)
    displayLogOut()
  }

  const [display, setDisplay] = useState(false)

  const displayLogOut = () => {
    if (display) {
      const logOutBtn = document.getElementById('logOut-btn')
      logOutBtn.style.display = 'none'
      setDisplay(false)
    } else {
      const logOutBtn = document.getElementById('logOut-btn')
      logOutBtn.style.display = 'flex'
      setDisplay(true)
    }
  }

  return (
    <>
      <nav className='nav-bar'>
        <div className='nav-bar__options-container'>
          <h2>SYSTEM-POS</h2>
          <div>
            <span>{username}</span>
            <i onClick={displayLogOut} className="fa-solid fa-sort-down arrow-icon"></i>
          </div>
        </div>
      </nav>
      <div onClick={handleLogOut} id='logOut-btn' className='log-out-btn__container'>
        <span>Log out</span>
      </div>
    </>
  )
}

export default Nav