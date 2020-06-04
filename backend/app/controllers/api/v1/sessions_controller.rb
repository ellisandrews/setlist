class Api::V1::SessionsController < ApplicationController
    
    skip_before_action :authorized, only: [:create]

    def create
        user = User.find_by(email: session_params[:email])
        if user && user.authenticate(session_params[:password])
            token = encode_token(user_id: user.id)  # Create a JWT encoded with the user_id
            render json: {
                user: UserSerializer.new(user),
                songs: ActiveModelSerializers::SerializableResource.new(user.songs),
                token: token
            }, status: :created
        else
            render json: { error: 'Failed to log in', message: 'Invalid email or password' }, status: :forbidden
        end
    end

    def show
        # The `authorized` action will return an error before we get to this line if applicable
        render json: {
            user: UserSerializer.new(@user),
            songs: ActiveModelSerializers::SerializableResource.new(@user.songs)
        }
    end

    private
  
    def session_params
      params.require(:user).permit(:email, :password)
    end

end
