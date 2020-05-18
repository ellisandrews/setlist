export const setSongs = songs => {
  return { type: 'SET_SONGS', songs }
}

export const addSong = song => {
  return { type: 'ADD_SONG', song}
}
