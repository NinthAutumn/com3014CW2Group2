class ApplicationController < ActionController::API
    # Authorize every request
    before_action :authorized

    # Ask users to logged in to access the page
    def authorized
        render json: {message: 'Please log in'}, status: :unauthorized unless user_logged_in
    end

    # Checks the header for Authorization
    def get_auth_header
        return request.headers['Authorization'] 
    end

    # Decoded token method if the method is called without a token as parameter
    def get_decoded_token
        headers = get_auth_header
        if headers.present?
            # Authorization would be in the form {Bearer asd.21x.aq24}
            # So spliting it and saving the second value as the token
            token = headers.split(' ')[1]
            begin   
                # Returns the decoded token
                return JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    # Finds the user_id from the decoded token and saves it as current_user_id global variable
    def user_logged_in
        # Gets the decoded token into payload variable
        payload = get_decoded_token
        if payload.present?
            # Saves the user_id in the payload as the current_user_id
            @current_user_id = payload[0]['user_id']
        end
    end
end
