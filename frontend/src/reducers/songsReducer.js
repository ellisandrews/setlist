const initialState = []


const songsReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_USER_SONGS':
      return action.songs

    case 'LOG_OUT_USER':
      return initialState

    case 'ADD_SONG':
      return [...state, action.song]
      
    default:
      return state
  }
}


export default songsReducer
