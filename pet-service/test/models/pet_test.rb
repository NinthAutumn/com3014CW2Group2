require "test_helper"

class PetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  fixtures :pets

  test "Pet attributes must not be empty" do
    # create empty pet
    pet = Pet.new
    assert ped.invalid?
    asset pet.errors[:name].any?
    asset pet.errors[:description].any?
    asset pet.errors[:age].any?
    asset pet.errors[:troubling_history].any?
    asset pet.errors[:animal_type].any?
    asset pet.errors[:male_only].any?
    asset pet.errors[:female_only].any?
    asset pet.errors[:shelter_id].any?
end

test "Pet should be valid" do
  # use valid_pet details from pets.yml
  pet = pets(:valid_pet)
  assert pet.valid?
end

test "Pet should not be valid" do
  # use invalid_pet details
  pet = pets(:invalid_pet)
  assert_not pet.valid?
end