// Set the backend API URL based on the environment
export const backendURL = process.env.NODE_ENV === 'production' ? 'http://setlist-backend.herokuapp.com' : 'http://localhost:3000/api/v1'

export const genericAPIFailure = errorData => {
  const errorMessage = errorData.status >= 500 ? errorData.error : errorData.messages.join(', ')
  window.alert(errorMessage)
}

export const handleResponse = (resp, success, failure = genericAPIFailure) => {
  // This function handles a fetch response object with appropriate callback functions.
  // The `success` and `failure` functions will be passed the JSON data returned from the server.
  
  // Grab the JSON returned by the server (either the requested data or error information)
  const respJSON = resp.json()  // Note that `respJSON` is a promise

  // IMO 4xx codes are failures when communicating with the backend.
  // Fetch doesn't error on status >= 400, so have to check resp.ok
  resp.ok ? respJSON.then(success) : respJSON.then(failure)
}

export const mapUserToProps = state => {
  return {
    user: state.loggedInUser
  }
}

export const mapSongsToProps = state => {
  return {
    songs: state.songs
  }
}

const authTokenName = 'auth_token'

export const getAuthToken = () => localStorage.getItem(authTokenName)

export const setAuthToken = token => { localStorage.setItem(authTokenName, token) }

export const removeAuthToken = () => { localStorage.removeItem(authTokenName) }

export const getAuthTokenHeader = () => ({'Authorization': `Bearer ${getAuthToken()}`})

