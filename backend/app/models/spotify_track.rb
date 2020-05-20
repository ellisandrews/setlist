class SpotifyTrack < ApplicationRecord
    # Associations
    has_many :songs, dependent: :destroy

    accepts_nested_attributes_for :songs

    # Validations
    validates :spotify_id, :title, :artist, :artwork_url, presence: true
end
