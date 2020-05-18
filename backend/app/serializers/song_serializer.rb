class SongSerializer < ActiveModel::Serializer
    attributes :title, :artist, :guitar_type, :capo, :notes, :spotify_id, :artwork_url, :user_id
end
