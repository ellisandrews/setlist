class Song < ApplicationRecord
    # Associations
    belongs_to :user
    belongs_to :spotify_track
    has_many :sections

    accepts_nested_attributes_for :sections 
end
