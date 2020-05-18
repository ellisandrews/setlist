# Clean out the database of all data
DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

# Create a fake user
user = User.create!(first_name: 'John', last_name: 'Doe', email: 'johndoe@fake.com', password: 'password')

# Create a SpotifyTrack
spotify_track = SpotifyTrack.create!(
    title: "Gravity",
    artist: "John Mayer",
    artwork_url: "https://i.scdn.co/image/ab67616d0000b2737af5fdc5ef048a68db62b85f",
    spotify_id: "3SktMqZmo3M9zbB7oKMIF7"
)

# Create a song
songData = {
    guitar_type: "Electric",
    capo: nil,
    notes: "Put a little reverb on it. I'll post links to videos soon!",
    user: user,
    spotify_track: spotify_track,
    sections_attributes: [
        {
            name: "Intro/Chorus",
            chords: "G C",
            strumming: "D D DUD UDUDU",
            display_order: 1
        },
        {
            name: "Verse",
            chords: "Am7 D7 Gm/Bb Ebmaj7 D7",
            strumming: "",
            display_order: 2,
        }
    ]
}

song = Song.create!(songData)
