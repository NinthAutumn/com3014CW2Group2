class ApplicationController < ActionController::API

    # Authorize every request
    before_action :authorize

    def authorized
        render json: {message 'Please log in'}, status: :unauthorized unless logged_in?
    end

    # checking the header in order for authorization
    def auth_header
        request.headers['Authorization']
    end
    
    # decode called if method is called with token as the parameter - method decodes token to find the user_id and checks if user exists
    def decode_token(token)
        # payload = JWT.decode(token, asdf, true, algorithm: 'HS256')
        payload = JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')
        if payload
            @user = User.find_by(id: payload[0]['user_id'])
        end
    end
    
    # decode called if method is called without token
    def decoded_token
        if auth_header
        #   token = auth_header.split(' ')[1] # need to change
        token = auth_header
          begin
            # payload = JWT.decode(token, asdf, true, algorithm: 'HS256')
            payload = JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')
          rescue JWT::DecodeError
            nil
          end
        end
    end

    # check user
    def logged_in_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            # comment out following line when testing if JWT passes
            @user = User.find_by(id: user_id)
            @user = 1
        end
    end

    # converts the method into boolean
    def logged_in?
        !! logged_in_user
    end
            
end
