class User < ApplicationRecord
    # Associations
    has_many :songs
    
    # Bcrypt secure password
    has_secure_password

    # Validations
    validates :first_name, :last_name, :email, :password_digest, presence: true 
    validates :email, uniqueness: true

    # ActiveRecord callbacks
    before_save :downcase_name

    def downcase_name
        self.first_name = self.first_name.downcase
        self.last_name = self.last_name.downcase
    end

    def titleize_first_name
        self.first_name.titleize
    end

    def titleize_last_name
        self.last_name.titleize
    end

    def full_name
        "#{titleize_first_name} #{titleize_last_name}"
    end

end
