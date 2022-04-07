require "test_helper"

class SheltersControllerTest < ActionDispatch::IntegrationTest
  # test where guest user isnt granted access
  # test where dedicated user is granted access
  # test where wrong JWT rejects reqeuest

  setup do
    @shelter = shelters(:one)
  end

  test "should get index" do
    get shelters_url, as: :json
    assert_response :success
  end

  test "should create shelter" do
    assert_difference('Shelter.count') do
      post shelters_url, params: { shelter: { address_id: @shelter.address_id, description: @shelter.description, email: @shelter.email, name: @shelter.name, phone_number: @shelter.phone_number } }, as: :json
    end

    assert_response 201
  end

  test "should show shelter" do
    get shelter_url(@shelter), as: :json
    assert_response :success
  end

  test "should update shelter" do
    patch shelter_url(@shelter), params: { shelter: { address_id: @shelter.address_id, description: @shelter.description, email: @shelter.email, name: @shelter.name, phone_number: @shelter.phone_number } }, as: :json
    assert_response 200
  end

  test "should destroy shelter" do
    assert_difference('Shelter.count', -1) do
      delete shelter_url(@shelter), as: :json
    end

    assert_response 204
  end
end
