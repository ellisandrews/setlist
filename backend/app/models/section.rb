class Section < ApplicationRecord
    # Associations
    belongs_to :song

    # Validations
    validates :name, :chords, :display_order, presence: true 
end
