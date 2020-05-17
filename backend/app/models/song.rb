class Song < ApplicationRecord
    # Associations
    belongs_to :user
    has_many :sections

    accepts_nested_attributes_for :sections

    # Validations
    validates :title, :artist, :spotify_id, presence: true 
end
