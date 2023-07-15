import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStoreData = createAsyncThunk('getShope', (shopId)=>{
    // const url = "https://backend.digistall.in/shop"
    const url = "http://localhost:5000/shop"
    const body = {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'shopId': shopId})
    }
    return fetch(url, body)
    .then((resp) => resp.json())
    .catch((err) => console.log(err))
})

const defaultState = {
        storeData: {},
        loadingStatus: 'LOADING'
        }

const loadState = () => {
    let state
    try{
        const serialisedState = window.localStorage.getItem('hri_local_store')
        if (!serialisedState){
            state = defaultState
            const serialisedState2 = JSON.stringify(state)
            serialisedState.loadState = "SUCCESS"
            window.localStorage.setItem('hri_local_store', serialisedState2)
        }else{
            state = JSON.parse(serialisedState)
        } 
    }catch (err){
            console.log("error")
        }
        return state
}


const initialState = loadState()

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setStoreData: (state, action) => {
            state.storeData = action.payload
        }
    },
   extraReducers: {
    [getStoreData.pending]: (state) => {
        if (initialState.loadingStatus !== "SUCCESS"){
            state.loadingStatus = 'SUCCESS';
        }
    },
    [getStoreData.fulfilled]: (state, action) => {
        state.loadingStatus = 'SUCCESS';
        state.storeData = action.payload.response;
    },
    [getStoreData.rejected]: (state) => {
        state.loadingStatus = 'FAILED';
    }
  }
})

export const {setStoreData} = storeSlice.actions

export default storeSlice.reducer