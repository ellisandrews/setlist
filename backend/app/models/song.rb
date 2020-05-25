class Song < ApplicationRecord
    # Associations
    belongs_to :user
    belongs_to :spotify_track
    has_many :sections, dependent: :destroy 

    accepts_nested_attributes_for :sections 

    # Validations
    validates :spotify_track, uniqueness: { scope: :user, message: "already has a song created by this user"  }
    validate :must_have_at_least_one_section
 
    def must_have_at_least_one_section
        if !sections || sections.length < 1 
            errors.add(:sections, "must have at least one section")
        end
    end

end
