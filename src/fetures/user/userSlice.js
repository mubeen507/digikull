import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
        userLogged: false,
        userData: {}
    }

const loadState = () => {
    let state
    try{
        const serialisedState = window.localStorage.getItem('hri_local_user')
        if (!serialisedState){
            state = defaultState
            const serialisedState2 = JSON.stringify(state)
            window.localStorage.setItem('hri_local_user', serialisedState2)
        }else{
            state = JSON.parse(serialisedState)
        } 
    }catch (err){
            console.log("error")
        }
        return state
}


const initialState = loadState()

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeLoginStatus: (state) => {
            state.userLogged = !state.userLogged
        },
        setUserData: (state, action) =>{
            const userData = action.payload
            state.userData = userData
        }
    }
})

export const {changeLoginStatus, setUserData} = userSlice.actions

export default userSlice.reducer