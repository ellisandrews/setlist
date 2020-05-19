import { backendURL, getAuthTokenHeader, handleResponse } from '../utils'


// Synchronus action creators 

export const setSongs = songs => {
  return { type: 'SET_SONGS', songs }
}

export const addSong = song => {
  return { type: 'ADD_SONG', song}
}

export const updateSong = (songId, updatedSong) => {
  return { type: 'UPDATE_SONG', songId, updatedSong }
}

export const deleteSong = songId => {
  return { type: 'DELETE_SONG', songId }
}


// Asynchronus action creators (redux thunk)

export const addSongAsync = (songData, spotifyTrack, redirectToSong) => {
  return dispatch => {

    const req = {
      method: 'POST',
      headers:{
        ...getAuthTokenHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song: songData,
        spotify_track: spotifyTrack
      })
    }
    
    const success = song => {
      dispatch(addSong(song))  // Dispatch the synchronus action to add the song from redux store state
      redirectToSong(song.id)  // Redirect to the song's show page
    }

    const failure = error => {
      window.alert(error.messages.join(', '))
    }

    fetch(`${backendURL}/songs`, req)
      .then(resp => handleResponse(resp, success, failure))
      .catch(err => {
        window.alert(`Unknown Error: ${err}`)
      })
  }
}

export const updateSongAsync = (songId, songData, redirectToSong) => {
  return dispatch => {    

    const req = {
      method: 'PATCH',
      headers: {
        ...getAuthTokenHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song: songData
      })
    }

    const success = song => {
      dispatch(updateSong(songId, song))
      redirectToSong(song.id)
    }

    const failure = error => {
      window.alert(error.messages.join(', '))
    }
    
    fetch(`${backendURL}/songs/${songId}`, req)
      .then(resp => handleResponse(resp, success, failure))
      .catch(err => {
        window.alert(`Unknown Error: ${err}`)
      })
  }
}

export const deleteSongAsync = (songId, redirect) => {
  return dispatch => {    

    const req = {
      method: 'DELETE',
      headers: getAuthTokenHeader()
    }

    const success = () => {
      dispatch(deleteSong(songId))  // Dispatch the synchronus action to remove the song from redux store state
      redirect()                    // Redirect callback to send the user to a new page
    }

    const failure = error => {
      window.alert(error.messages.join(', '))
    }

    fetch(`${backendURL}/songs/${songId}`, req)
      .then(resp => handleResponse(resp, success, failure))
      .catch(err => {
        window.alert(`Unknown Error: ${err}`)
      })
  }
}
