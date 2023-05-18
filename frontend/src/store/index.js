import { configureStore } from '@reduxjs/toolkit'
import isLogged from './slices/isLogged.slice'
import username from './slices/username.slice'

export default configureStore({
  reducer: {
    isLogged,
    username
    }
}) 