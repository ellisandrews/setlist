class SpotifyTrack < ApplicationRecord
    # Associations
    has_many :songs

    # Validations
    validates :spotify_id, :title, :artist, :artwork_url, presence: true
end
