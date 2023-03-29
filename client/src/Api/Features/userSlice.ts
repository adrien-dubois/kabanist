import { createSlice } from "@reduxjs/toolkit";
import { ReducerT } from '../../utils/types';

const initialState = { value: {
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    _id: '',
    __v: 0
} };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: ReducerT, action) => {
            state.value = action.payload
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer