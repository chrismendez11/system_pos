import React, { useEffect } from 'react'
import './LoginForm.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { setLoggedIn } from '../../store/slices/isLogged.slice'
import { setUsername } from '../../store/slices/username.slice'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

const FormLogin = () => {

    const {register, handleSubmit, reset } = useForm()

    const dispatch = useDispatch()

    const submit = data => {
        axios.post('http://localhost:3000/api/v1/auth/login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                dispatch(setLoggedIn())
                dispatch(setUsername(res.data.user.username))
            })
            .catch(err => console.log(err))
        // reset({
        //     email: '',
        //     password: ''
        // })
    }

  return (
    <form onSubmit={handleSubmit(submit)} className='login__form'>
        <div>
        <h2>Welcome!</h2>
        <p>Type your email and password to continue</p>
        </div>
        <div className='credentials-cont'>
            <h3>Test Data</h3>
            <p>Email: <span>admin@gmail.com</span></p>
            <p>Password: <span>pass12345</span></p>
        </div>
        <div className='login-cont login__email'>
            <label htmlFor="email">Email</label>
            <input {...register('email')} type="email" id="email" />
        </div>
        <div className='login-cont login__password'>
            <label htmlFor="password">Password</label>
            <input {...register('password')} type="password" id="password" />
        </div>
        <button className='login__btn'>Login</button>
    </form>
  )
}

export default FormLogin