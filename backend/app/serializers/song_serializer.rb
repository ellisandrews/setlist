class SongSerializer < ActiveModel::Serializer
    attributes :id, :spotify_id, :title, :artist, :artwork_url, :guitar_type, :capo, :notes, :user_id
    has_many :sections
end
