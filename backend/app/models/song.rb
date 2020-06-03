class Song < ApplicationRecord
    # Associations
    belongs_to :user
    belongs_to :spotify_track
    has_many :sections, dependent: :destroy 

    accepts_nested_attributes_for :sections, allow_destroy: true

    # Validations
    validates :spotify_track, uniqueness: { scope: :user, message: "already has a song created by this user"  }
    validate :must_have_at_least_one_section
 
    def sections_count_valid?
        # Enforce that there is at least one section. This takes into account those sections that are marked for destruction.
        # See: https://www.homeonrails.com/2012/10/validating-nested-associations-in-rails
        sections.reject(&:marked_for_destruction?).count >= 1
    end

    def must_have_at_least_one_section
        unless ( sections && sections_count_valid? )
            errors.add(:sections, "must have at least one section")
        end
    end

end
