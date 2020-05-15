import { backendURL, handleResponse } from '../utils'


const tokenName = 'auth_token'

export const signup = (bodyData, callback) => {
  return dispatch => {
    sessionRequest('users', bodyData, callback, dispatch)
  }
}

export const login = (bodyData, callback) => {
  return dispatch => {
    sessionRequest('login', bodyData, callback, dispatch)
  }
}

export const logout = () => {
  localStorage.removeItem(tokenName)
  return { type: 'LOG_OUT_USER' }
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
    dispatch({ type: 'LOG_IN_USER', user: userData.user })  // Store user's data (including notes!)
    localStorage.setItem(tokenName, userData.token)           // Save the user's token in localStorage
    callback()
  }

  const failure = errorData => {
    const errorMessage = errorData.status >= 500 ? errorData.error : errorData.messages.join(', ')
    window.alert(errorMessage)
  }

  fetch(`${backendURL}/${endpoint}`, req)
    .then(resp => handleResponse(resp, success, failure))
    .catch(err => {
      window.alert(`Unknown Error: ${err}`)
    })
}
