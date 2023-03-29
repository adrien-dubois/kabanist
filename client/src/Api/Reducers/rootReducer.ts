import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../Features/userSlice'
import boardReducer from '../Features/boardSlice'
import favouriteReducer from '../Features/favouriteSlice'


const rootReducer = combineReducers({
    user: userReducer,
    boards: boardReducer,
    favourites: favouriteReducer
})

export default rootReducer;