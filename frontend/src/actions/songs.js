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

export const addSongAsync = (formData, spotifyTrack, redirectToSong) => {
  return dispatch => {

    const req = {
      method: 'POST',
      headers:{
        ...getAuthTokenHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song: formatSongData(formData),
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

export const updateSongAsync = (songId, formData, redirectToSong) => {
  return dispatch => {    

    const req = {
      method: 'PATCH',
      headers: {
        ...getAuthTokenHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song: formatSongData(formData)
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
      redirect()                    // Redirect first, because we know the song was successfully deleted in the backend.
      dispatch(deleteSong(songId))  // Dispatch the synchronus action to remove the deleted song from redux store state
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


// Helper functions

const formatSongData = formData => {
  // Create new object to hold the formatted data
  const songData = {}

  // Rename `sections` to `sections_attributes` which is what the server expects.
  delete Object.assign(songData, formData, { sections_attributes: formData.sections }).sections

  // Add/updated the `display_order` attribute for each section. Use the order of the array.
  songData.sections_attributes = songData.sections_attributes.map((section, index) => ({...section, display_order: index + 1}))

  // Return the formatted data that is ready to be sent to the server.
  return songData
}
