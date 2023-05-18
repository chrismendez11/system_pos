import React, { useState } from 'react'
import LoginForm from './Login/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Login = () => {

  const initialLogged = localStorage.getItem('token')

  const isLogged = useSelector(state => state.isLogged)

  return (
    <main className='login'>
      {initialLogged || isLogged ? <Navigate to='/'/> : <LoginForm />}
    </main>
  )
}

export default Login