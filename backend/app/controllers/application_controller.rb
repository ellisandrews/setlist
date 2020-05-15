class ApplicationController < ActionController::API

    # By default, actions need to be authorized. Manually override this if necessary.
    before_action :authorized

    def encode_token(payload)
        JWT.encode(payload, ENV['JWT_SECRET'])
    end
    
    def auth_header
        request.headers['Authorization']
    end
    
    def decoded_token
        if auth_header
            # Grab the token (from "Bearer `token`" structured string)
            token = auth_header.split(' ')[1]
            
            # Return the decoded data from the token (or `nil` if error)
            begin
                JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end
    
    def current_user
        if decoded_token
            # Grab the user_id from the decoded data and use it to find the User
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end
    
    def logged_in?
        !!current_user
    end

    def authorized
        render json: { error: 'Unauthorized', messages: ['Please Log In.'] }, status: :unauthorized unless logged_in?
    end

end
