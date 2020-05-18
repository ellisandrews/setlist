import { backendURL, handleResponse, setAuthToken, removeAuthToken } from '../utils'


export const signup = (bodyData, callback) => {
  return dispatch => {
    sessionRequest('signup', bodyData, callback, dispatch)
  }
}

export const login = (bodyData, callback) => {
  return dispatch => {
    sessionRequest('login', bodyData, callback, dispatch)
  }
}

export const logout = () => {
  removeAuthToken()
  return { type: 'LOG_OUT_USER' }
}

export const setLoggedInUser = user => {
  return { type: 'LOG_IN_USER', user }
}

const sessionRequest = (endpoint, bodyData, callback, dispatch) => {

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
    console.log('USER', userData)
    dispatch(setLoggedInUser(userData.user))  // Store user's data (including notes!)
    setAuthToken(userData.token)              // Save the user's auth token in localStorage
    callback()
  }

  // Fall back on the generic API failure of `handleResponse`
  fetch(`${backendURL}/${endpoint}`, req)
    .then(resp => handleResponse(resp, success))
    .catch(err => {
      window.alert(`Unknown Error: ${err}`)
    })
}
