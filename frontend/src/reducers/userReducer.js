const initialState = null


const userReducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case 'LOG_IN_USER':
      return action.user
    
    case 'LOG_OUT_USER':
      return initialState
    
    default:
      return state
  }
}


export default userReducer
