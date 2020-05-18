class SpotifyTrack < ApplicationRecord
    # Associations
    has_many :songs

    # Validations
    validates :title, :artist, :spotify_id, presence: true
end
