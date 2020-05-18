class SongSerializer < ActiveModel::Serializer
    attributes :id, :guitar_type, :capo, :notes, :user_id
    has_many :sections
    has_one :spotify_track
end
