const initialState = null


const userReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'LOG_IN_SUCCESS':
      return action.user
    default:
      return state
  }
}


export default userReducer
