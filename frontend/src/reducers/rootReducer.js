  
import { combineReducers } from 'redux'
import songsReducer from './songsReducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
  loggedInUser: userReducer, 
  songs: songsReducer
})


export default rootReducer
