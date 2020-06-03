import { backendURL, getAuthTokenHeader, handleResponse, genericAPIFailure } from '../utils'


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

export const addSongAsync = (formData, spotifyTrack, redirectToSong, failure = genericAPIFailure) => {
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

    fetch(`${backendURL}/songs`, req)
      .then(resp => handleResponse(resp, success, failure))
      .catch(genericAPIFailure)
  }
}

export const updateSongAsync = (songId, formData, redirectToSong, failure = genericAPIFailure) => {
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
    
    fetch(`${backendURL}/songs/${songId}`, req)
      .then(resp => handleResponse(resp, success, failure))
      .catch(genericAPIFailure)
  }
}

export const deleteSongAsync = (songId, redirect, failure = genericAPIFailure) => {
  return dispatch => {    

    const req = {
      method: 'DELETE',
      headers: getAuthTokenHeader()
    }

    const success = () => {
      redirect()                    // Redirect first, because we know the song was successfully deleted in the backend.
      dispatch(deleteSong(songId))  // Dispatch the synchronus action to remove the deleted song from redux store state
    }

    fetch(`${backendURL}/songs/${songId}`, req)
      .then(resp => handleResponse(resp, success, failure))
      .catch(genericAPIFailure)
  }
}


// Helper functions

const formatSongData = formData => {
  // Create new object to hold the formatted data
  const songData = {}

  // Rename `sections` to `sections_attributes` which is what the server expects.
  delete Object.assign(songData, formData, { sections_attributes: formData.sections }).sections

  // Add/update the `display_order` attribute for each *non-destroyed* section. Use the order of the array.
  let displayOrder = 1
  songData.sections_attributes = songData.sections_attributes.map( section => {
      
      let updatedSection

      // Display order will only be adjusted for non-destroyed sections
      if ( section._destroy ) {
        updatedSection = section
      } else {
        updatedSection = { ...section, display_order: displayOrder }
        displayOrder++
      }

      return updatedSection
    }
  )

  // Return the formatted data that is ready to be sent to the server.
  return songData
}
