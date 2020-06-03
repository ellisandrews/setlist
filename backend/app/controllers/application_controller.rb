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
        # A filter for checking that a valid user is logged in before an action
        render json: { error: 'Unauthorized', messages: ['Unauthorized. Please Log In.'] }, status: :unauthorized unless logged_in?
    end

    def authorized_user
        # A filter that prevents the special read-only preview user from editing data.
        if !@user || @user.email == 'johndoe@fake.com'
            render json: { error: 'Unauthorized', messages: ["Preview mode is read-only!"]}, status: :unauthorized
        end
    end

end
