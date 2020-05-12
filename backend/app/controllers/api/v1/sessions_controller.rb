class Api::V1::SessionsController < ApplicationController

    def create
        user = User.find_by(email: session_params[:email])
        if user && user.authenticate(session_params[:password])
            render json: user, status: :created
        else
            render json: { error: 'Failed to log in', messages: ['Invalid email or password'] }, status: :forbidden
        end
    end
  
    private
  
    def session_params
      params.require(:user).permit(:email, :password)
    end
  
end
