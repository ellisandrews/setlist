class Song < ApplicationRecord
    # Associations
    belongs_to :user
    has_many :sections

    # Validations
    validates :title, :artist, :spotify_id, presence: true 
end
