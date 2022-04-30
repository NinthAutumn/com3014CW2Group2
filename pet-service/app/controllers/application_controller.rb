class ApplicationController < ActionController::API

    # Authorize every request
    before_action :authorize

    def authorized
        render json: {message 'Please log in'}, status: :unauthorized unless user_logged_in
    end

    # checking the header in order for authorization
    def get_auth_header
        return request.headers['Authorization']
    end
    
    # decode called if method is called without token
    def get_decoded_token
        headers = get_auth_header
        if headers.present?
            # Authorization would be in the form {Bearer asd.21x.aq24}
            # So spliting it and saving the second value as the token
            token = headers.split(' ')[1]
            begin
                # return decoded
                return JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: 'HS256')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    # find user_id from decoded token and save
    def user_logged_in
        # gets decoded token into payload
        payload = get_decoded_token
        if payload.present?
            # save user_id in payload as current
            @current_shelter_id = payload[0]['shelter_id']
        end
    end
            
end
