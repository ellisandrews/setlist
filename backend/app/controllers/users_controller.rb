class UsersController < ApplicationController
    
    def create
        user = User.new(user_params)
        if user.save
            render json: user, status: :created
        else
            render json: { error: 'Failed to create user', messages: user.errors.full_messages }, status: :bad_request
        end
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password)
    end

end
