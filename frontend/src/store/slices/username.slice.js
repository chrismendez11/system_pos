import { createSlice } from '@reduxjs/toolkit';

export const username = createSlice({
    name: 'username',
    initialState: '',
    reducers: {
        setUsername: (state, action) => action.payload
    }
})

export const { setUsername } = username.actions;

export default username.reducer;