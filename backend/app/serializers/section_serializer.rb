class SectionSerializer < ActiveModel::Serializer
    attributes :id, :name, :chords, :strumming, :display_order
end
