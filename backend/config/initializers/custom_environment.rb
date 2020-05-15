# Authenticate for spotify API requests
client_id = ENV['CLIENT_ID']
client_secret = ENV['CLIENT_SECRET']

unless client_id && client_secret
    raise 'Must set Spotify `CLIENT_ID` and `CLIENT_SECRET` environment variables!'
end

RSpotify.authenticate(client_id, client_secret)


# Make sure the JWT secret is set to avoid a cryptic error later on
unless ENV['JWT_SECRET']
    raise 'Must set `JWT_SECRET` environment variable!'
end
