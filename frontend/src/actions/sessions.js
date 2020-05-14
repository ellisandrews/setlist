export const login = (username, password, callback) => {
    return dispatch => {
      console.log('Login action creator called')  
    }
}

export const signup = (username, password, password_confirmation, callback) => {
  return dispatch => {
    console.log('signup action creator called')  
  }
}
