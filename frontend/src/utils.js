export const backendURL = 'http://localhost:3000/api/v1'

export const handleResponse = (resp, success, failure) => {
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
