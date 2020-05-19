const initialState = []


const songsReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_SONGS':
      return action.songs
            
    case 'ADD_SONG':
      return [...state, action.song]
        
    case 'UPDATE_SONG':
      // Update an existing song (by replacement)
      return state.map(song => song.id === action.songId ? action.updatedSong : song ) 
    
    case 'DELETE_SONG':
      // Remove a song by ID
      return state.filter(song => song.id !== action.songId)

    case 'LOG_OUT_USER':
      return initialState

    default:
      return state
  }
}


export default songsReducer
