class SpotifyTrackSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :spotify_id, :artwork_url
end
