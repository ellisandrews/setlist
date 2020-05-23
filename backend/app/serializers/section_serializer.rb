class SectionSerializer < ActiveModel::Serializer
    attributes :id, :name, :chords, :display_order
end
