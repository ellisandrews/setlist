export const login = (formData, callback) => {
  return dispatch => {
    
    const req = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: formData
      })
    }

    fetch('http://localhost:3000/api/v1/login', req)
      .then(resp => resp.json())
      .then(user => {
        console.log(user)
        dispatch({ type: 'LOG_IN_SUCCESS', user })
        callback()
      })
  }
}


export const signup = (formData, callback) => {
  return dispatch => {

    const req = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: formData
      })
    }

    fetch('http://localhost:3000/api/v1/users', req)
      .then(resp => resp.json())
      .then(user => {
        console.log(user)
        dispatch({ type: 'LOG_IN_SUCCESS', user })
        callback()
      })
  }
}
