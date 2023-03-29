import { createSlice } from "@reduxjs/toolkit";
import { BoardsValueT } from '../../utils/types';

const initialState = { value: [
    {
        _id: '',
        user: '',
        icon: '',
        title: '',
        description: '',
        position: 0,
        favourite: false,
        favouritePosition: 0,
        __v: 0,
        id: '',
    }
] };

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoards: (state: BoardsValueT, action) => {
            state.value = action.payload
        }
    }
})

export const { setBoards } = boardSlice.actions;

export default boardSlice.reducer