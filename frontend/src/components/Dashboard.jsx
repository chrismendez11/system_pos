import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboard.css'
import data from '../data'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { setUsername } from '../store/slices/username.slice'

const Dashboard = () => {

  const username = useSelector(state => state.username)
  const navigate = useNavigate()

  const handleOption = (category) => {
    navigate(`/${category.link}`)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/users/1', getConfig())
    .then(res => {
        dispatch(setUsername(res.data.username))
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <main className='dashboard__main'>
      <div className='title__container'>
        <h1>DASHBOARD</h1>
        <p>Bienvenido {username}</p>
      </div>
      <div className='categories__container'>
        {data.map(category => (
          <article key={category.id} onClick={() => handleOption(category)}>
            <header className='img__container'>
              <img src={category.img} alt="" />
            </header>
            <main className='categories__info'>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </main>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Dashboard