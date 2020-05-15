class Api::V1::SessionsController < ApplicationController
    
    skip_before_action :authorized, only: [:create]

    def create
        user = User.find_by(email: session_params[:email])
        if user && user.authenticate(session_params[:password])
            token = encode_token(user_id: user.id)  # Create a JWT encoded with the user_id
            render json: { user: user, token: token }, status: :created
        else
            render json: { error: 'Failed to log in', messages: ['Invalid email or password'] }, status: :forbidden
        end
    end

    private
  
    def session_params
      params.require(:user).permit(:email, :password)
    end
  
end
