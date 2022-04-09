require "test_helper"

class SheltersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @shelter = shelters(:valid_shelter)
  end

  # test where guest user isnt granted access
  test "should not get index without authorization" do
    # Find the way to skip setup so this passes
    get shelters_url, as: :json
    assert_response :unauthorized
    assert_equal "{\"message\":\"Please log in\"}", @response.body
  end
  
  test "should get index for valid token" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.pkpZiFQGzpWIq4AFuHJ9HwcKGv_DR9nnZaSYoXSXBuM"
    get shelters_url, as: :json, headers: { "Authorization": valid_token }
    assert_response :success
  end

  test "should not get index for invalid token" do
    # The token doesnt have user_id in the payload
    invalid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSJ9.3fe45Qhz7rzT8P4wWtRN78Mjmvwk6VgpReXo-QexTmA"   
    get shelters_url, as: :json, headers: { "Authorization": invalid_token }
    assert_response :unauthorized
    assert_equal "{\"message\":\"Please log in\"}", @response.body
  end

  test "should create shelter for valid token" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.pkpZiFQGzpWIq4AFuHJ9HwcKGv_DR9nnZaSYoXSXBuM"
    assert_difference('Shelter.count') do
      post shelters_url, params: { shelter: { address: @shelter.address, 
                                              description: @shelter.description, 
                                              email: @shelter.email, name: @shelter.name, 
                                              phone_number: @shelter.phone_number } }, as: :json, 
                                              headers: { "Authorization": valid_token }
    end
    assert_response 201
  end

  test "should show shelter" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.pkpZiFQGzpWIq4AFuHJ9HwcKGv_DR9nnZaSYoXSXBuM"
    get shelter_url(@shelter), as: :json, headers: { "Authorization": valid_token }
    assert_response :success
  end

  test "should update shelter" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.pkpZiFQGzpWIq4AFuHJ9HwcKGv_DR9nnZaSYoXSXBuM"

    patch shelter_url(@shelter), params: { shelter: { address: @shelter.address, 
                                                      description: @shelter.description, 
                                                      email: @shelter.email, 
                                                      name: @shelter.name, 
                                                      phone_number: @shelter.phone_number } }, as: :json, 
                                                      headers: { "Authorization": valid_token }
    assert_response 200
  end

  test "should destroy shelter" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.pkpZiFQGzpWIq4AFuHJ9HwcKGv_DR9nnZaSYoXSXBuM"
    assert_difference('Shelter.count', -1) do
      delete shelter_url(@shelter), as: :json, headers: { "Authorization": valid_token }
    end
    assert_response 204
  end
end
