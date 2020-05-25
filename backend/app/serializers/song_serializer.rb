class SongSerializer < ActiveModel::Serializer
    attributes :id, :guitar_type, :capo, :strumming, :notes, :youtube_url, :user_id
    belongs_to :spotify_track
    has_many :sections
end
