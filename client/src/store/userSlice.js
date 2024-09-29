import { createSlice } from '@reduxjs/toolkit'

const userInfo = {
    token: '',
    user: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState: userInfo,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const userAction = userSlice.actions;

export default userSlice.reducer;