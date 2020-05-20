class Song < ApplicationRecord
    # Associations
    belongs_to :user
    belongs_to :spotify_track
    has_many :sections, dependent: :destroy 

    accepts_nested_attributes_for :sections 

    # Validations
    validates :spotify_track, uniqueness: { scope: :user, message: "already has a song created by this user"  }
    
end
