desc "Dump Preview-Mode User data from the DB to a JSON file that can be loaded when seeding."

# The `=> :environment` part is so that models can be used
task :dump_user_data => :environment do

    # Grab the user for which we will be collecting and serializing data
    user = User.where(email: 'johndoe@fake.com')

    # Grab the SpotifyTracks for which the User has a Song
    spotify_tracks = SpotifyTrack.joins(:songs).where(songs: { user: user })

    # Initialize a collection for aggregating the user's serialized data
    user_songs = []

    # Iterate over the SpotifyTracks for which the User has Songs
    spotify_tracks.each do |spotify_track|

        # Initialize a new container for the song data
        user_song = {}

        # Store the relevant spotify_track data
        user_song[:spotify_track] = {
            title: spotify_track.title,
            artist: spotify_track.artist,
            artwork_url: spotify_track.artwork_url,
            spotify_id: spotify_track.spotify_id
        }

        # Grab the Song. There can only be one per user.
        song = spotify_track.songs.where(user: user).first
        
        # Store the relevant song data
        user_song[:song] = {
            guitar_type: song.guitar_type,
            capo: song.capo,
            strumming: song.strumming,
            youtube_id: song.youtube_id,
            notes: song.notes,
            sections_attributes: []
        }
        
        # Store the relevant sections data
        song.sections.each do |section|
            user_song[:song][:sections_attributes] << {
                name: section.name,
                chords: section.chords,
                display_order: section.display_order
            }
        end

        # Shovel the serialized user_song into the collection
        user_songs << user_song

    end

    # Dump the aggregated and serialized user data to a JSON file (pretty-formatted)
    File.open("db/seed_data.json", "w") do |f|
        f.write(JSON.pretty_generate(user_songs))
    end

end
