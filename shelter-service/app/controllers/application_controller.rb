class ApplicationController < ActionController::API
    # Authorize every request
    before_action :authorized

    # Ask users to logged in to access the page
    def authorised
        render json: {message: 'Please log in'}, status: :unauthorized unless logged_in?
    end

    # Checks the header for Authorization
    def auth_header
        request.headers['Authorization'] 
    end

    # Decoded token method if the method is called with a token as parameter
    # The method decodes the token to find the user_id and checks if that user exists
    def decoded_token(token)
        payload = JWT.decode(token, ENV['USER_SECRET_KEY'], true, algorithm: 'HS256')
        puts payload[0]['user_id']
        if payload
            @user = User.find_by(id: payload[0]['user_id'])
        end
    end

    # Decoded token method if the method is called without a token as parameter
    def decoded_token
        if auth_header
            token = auth_header.split(' ')[1]
            begin   
                return JWT.decode(token, ENV['USER_SECRET_KEY'], true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    # 
    def logged_in_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id) # comment this line out to test if jwt passes
            # test line to see if a user would gain access
            @user = 1 
        end
    end

    # Converts the method logged_in_user as a boolean
    def logged_in?##
        !! logged_in_user
    end
end
