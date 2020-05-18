const initialState = []


const songsReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_SONGS':
      return action.songs
            
    case 'ADD_SONG':
      return [...state, action.song]
        
    case 'LOG_OUT_USER':
      return initialState

    default:
      return state
  }
}


export default songsReducer
