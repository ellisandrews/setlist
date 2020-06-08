# Clean out the database of all data
DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

# Create the preview mode fake user
user = User.create!(first_name: 'John', last_name: 'Doe', email: 'johndoe@fake.com', password: 'password', password_confirmation: 'password')

# Load the song data from the JSON file
file = File.read('db/seed_data.json')
user_songs = JSON.parse(file, symbolize_names: true)

# Create the songs for the user
user_songs.each do |user_song|

    # Find or create the SpotifyTrack
    spotify_track = SpotifyTrack.find_or_create_by!(user_song[:spotify_track])

    # Link the newly created or found SpotifyTrack to the song to be created, along with the user
    user_song[:song][:spotify_track] = spotify_track
    user_song[:song][:user] = user

    # Create the user's Song
    Song.create!(user_song[:song])
end
