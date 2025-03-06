import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User{
    userId:string;
    email:string;
}

const initialState={
    user:{
        userId:"",
        email:""
    }
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        updateUser:(state,action:PayloadAction<User>)=>{
            state.user=action.payload
        },
    }
})

export const {updateUser}=userSlice.actions

export default userSlice.reducer