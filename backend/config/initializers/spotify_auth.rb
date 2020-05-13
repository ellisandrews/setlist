# Authenticate for spotify API requests
client_id = ENV['CLIENT_ID']
client_secret = ENV['CLIENT_SECRET']

if !client_id || !client_secret
    puts 'ERROR: Must set Spotify `CLIENT_ID` and `CLIENT_SECRET` environment variables!'
end

RSpotify.authenticate(client_id, client_secret)
