import { createSlice ,configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState ={
    login:'Out',
}
const persistConfig ={
    key:'primary',
    storage
}
const LoginSlice = createSlice({
    name: 'Login',
    initialState,
    reducers:{
        HYDRATE:(state,action)=>{
            return {...state,...action.payload}
        },
        clientloggedin:(state)=>{
            console.log('Client Logged in')
            state.login ='Client'
        },
        userLoggedin:(state)=>{
            state.login='User'
        },
        loggedOut:(state)=>{
            state.login='Out'
        }
    }
})
const persistedReducer = persistReducer(persistConfig,LoginSlice.reducer)
export const {clientloggedin,userLoggedin,loggedOut}=LoginSlice.actions
const makeStore =  () => configureStore({
    reducer:{
        login:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})


export const wrapper = createWrapper(makeStore)