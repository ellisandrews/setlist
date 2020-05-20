class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email

    def first_name
        object.titleize_first_name
    end

    def last_name
        object.titleize_last_name
    end

end
