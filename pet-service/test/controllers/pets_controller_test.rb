require "test_helper"

class PetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pet = pets(:valid_pet)
  end

  test "should not get index without authorization"
    get pets_url, as: :json
    assert_response :unauthorized
    asset_equal "{\"message\":\"Please log in\"}", @response.body
  end

  # tests involving validating shelter_id before any pet changes are made - if shelter_id token is valid then accesss is granted
  test "should get index for valid token" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaGVsdGVyX2lkIjoiMSJ9.w5YTcNC6lQhCqT1b5x7KSCs8CxUuSquxak7I0X9V57o"
    get pets_url, as: :json, headers: { "Authorization": valid_token }
    assert_response :success
  end

  # tests invalid token for pet relation (not valid shelter_id)
  test "should not get index for invalid token" do
    # The token doesnt have shelter_id in the payload
    invalid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZhbGlkIjoiMSJ9.vn0Zx6SoIRzZmDmrZNb52A1y3TQlrNy6zaC3IMcw9YM"   
    get pets_url, as: :json, headers: { "Authorization": invalid_token }
    assert_response :unauthorized
    assert_equal "{\"message\":\"Please log in\"}", @response.body
  end

  test "should create pet for valid token" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaGVsdGVyX2lkIjoiMSJ9.w5YTcNC6lQhCqT1b5x7KSCs8CxUuSquxak7I0X9V57o"
    assert_difference('Pet.count') do
      post pet_url, params: { pet: {  name: @pet.name,
                                      description: @pet.description,
                                      age: @pet.age,
                                      troubling_history: @pet.troubling_history,
                                      animal_type: @pet.animal_type,
                                      male_only: @pet.male_only,
                                      female_only: @pet.female_only,
                                      shelter_id: @pet.shelter_id } }, as: :json
                                      headers: { "Authorization": valid_token }
    end
    assert_response 201
  end

  test "should show pet for valid token" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaGVsdGVyX2lkIjoiMSJ9.w5YTcNC6lQhCqT1b5x7KSCs8CxUuSquxak7I0X9V57o"
    get pet_url(@pet), as: :json, headers: { "Authorization": valid_token }
    assert_response :success
  end

  test "should update pet for valid token" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaGVsdGVyX2lkIjoiMSJ9.w5YTcNC6lQhCqT1b5x7KSCs8CxUuSquxak7I0X9V57o"

    patch pet_url(@pet), params: { pet: { name: @pet.name,
                                          description: @pet.description,
                                          age: @pet.age,
                                          troubling_history: @pet.troubling_history,
                                          animal_type: @pet.animal_type,
                                          male_only: @pet.male_only,
                                          female_only: @pet.female_only,
                                          shelter_id: @pet.shelter_id } }, as: :json
                                          headers: { "Authorization": valid_token }
    assert_response 200
  end

  test "should destroy pet for valid token" do
    valid_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaGVsdGVyX2lkIjoiMSJ9.w5YTcNC6lQhCqT1b5x7KSCs8CxUuSquxak7I0X9V57o"
    assert_difference('Pet.count', -1) do
      delete pet_url(@pet), as: :json, headers: { "Authorization": valid_token }
    end
    assert_response 204
  end

  # test "should get index" do
  #   get shelters_url, as: :json
  #   assert_response :success
  # end

    # test "should create pet" do
  #   assert_difference('Pet.count') do
  #     post pets_url, params: { pet: { age: @pet.age, animal_category: @pet.animal_category, animal_type: @pet.animal_type, description: @pet.description, female_only: @pet.female_only, inspection_required: @pet.inspection_required, male_only: @pet.male_only, name: @pet.name, shelter_id: @pet.shelter_id, troubling_history: @pet.troubling_history } }, as: :json
  #   end

  #   assert_response 201
  # end

  # test "should show pet" do
  #   get pet_url(@pet), as: :json
  #   assert_response :success
  # end

  # test "should update pet" do
  #   patch pet_url(@pet), params: { pet: { age: @pet.age, animal_category: @pet.animal_category, animal_type: @pet.animal_type, description: @pet.description, female_only: @pet.female_only, inspection_required: @pet.inspection_required, male_only: @pet.male_only, name: @pet.name, shelter_id: @pet.shelter_id, troubling_history: @pet.troubling_history } }, as: :json
  #   assert_response 200
  # end

  # test "should destroy pet" do
  #   assert_difference('Pet.count', -1) do
  #     delete pet_url(@pet), as: :json
  #   end

  #   assert_response 204
  # end

end
