import { createSlice } from '@reduxjs/toolkit';

export const isLogged = createSlice({
    name: 'isLogged',
    initialState: false,
    reducers: {
        setLoggedIn: state => true,
        setLoggedOut: state => false
    }
})

export const { setLoggedIn, setLoggedOut } = isLogged.actions;

export default isLogged.reducer;