require "test_helper"

class PetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pet = pets(:one)
  end

  test "should get index" do
    get pets_url, as: :json
    assert_response :success
  end

  test "should create pet" do
    assert_difference('Pet.count') do
      post pets_url, params: { pet: { age: @pet.age, animal_category: @pet.animal_category, animal_type: @pet.animal_type, description: @pet.description, female_only: @pet.female_only, inspection_required: @pet.inspection_required, male_only: @pet.male_only, name: @pet.name, shelter_id: @pet.shelter_id, troubling_history: @pet.troubling_history } }, as: :json
    end

    assert_response 201
  end

  test "should show pet" do
    get pet_url(@pet), as: :json
    assert_response :success
  end

  test "should update pet" do
    patch pet_url(@pet), params: { pet: { age: @pet.age, animal_category: @pet.animal_category, animal_type: @pet.animal_type, description: @pet.description, female_only: @pet.female_only, inspection_required: @pet.inspection_required, male_only: @pet.male_only, name: @pet.name, shelter_id: @pet.shelter_id, troubling_history: @pet.troubling_history } }, as: :json
    assert_response 200
  end

  test "should destroy pet" do
    assert_difference('Pet.count', -1) do
      delete pet_url(@pet), as: :json
    end

    assert_response 204
  end
end
