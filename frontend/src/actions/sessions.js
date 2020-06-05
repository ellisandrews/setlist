import { backendURL, handleResponse, setAuthToken, removeAuthToken, genericAPIFailure } from '../utils'
import { setSongs } from './songs'


export const signup = (bodyData, redirect, handleFailure = genericAPIFailure ) => {
  return dispatch => {
    sessionRequest('signup', bodyData, redirect, handleFailure, dispatch)
  }
}

export const login = (bodyData, redirect, handleFailure = genericAPIFailure ) => {
  return dispatch => {
    sessionRequest('login', bodyData, redirect, handleFailure, dispatch)
  }
}

export const logout = () => {
  removeAuthToken()
  return { type: 'LOG_OUT_USER' }
}

export const setLoggedInUser = user => {
  return { type: 'LOG_IN_USER', user }
}

const sessionRequest = (endpoint, bodyData, redirect, handleFailure, dispatch) => {

  const req = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      user: bodyData
    })
  }

  const success = userData => {
    dispatch(setLoggedInUser(userData.user))  // Store user's data in redux
    dispatch(setSongs(userData.songs))        // Store the user's songs in redux
    setAuthToken(userData.token)              // Save the user's auth token in localStorage
    if (!!redirect) { redirect() }            // Exexcute the redirect callback if applicable
  }

  // Fall back on the generic API failure of `handleResponse`
  fetch(`${backendURL}/${endpoint}`, req)
    .then(resp => handleResponse(resp, success, handleFailure))
    .catch(err => {
      window.alert(`Unknown Error: ${err}`)
    })
}
