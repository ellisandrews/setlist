const initialState = []


const songsReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_USER_SONGS':
      return action.songs

    case 'LOG_OUT_USER':
      return initialState
        
    default:
      return state
  }
}


export default songsReducer
