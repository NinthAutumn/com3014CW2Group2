require "test_helper"

class PetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  fixtures :pets

  test "Pet attributes must not be empty" do
    # create empty pet
    pet = Pet.new
    assert pet.invalid?
    assert pet.errors[:name].any?
    assert pet.errors[:description].any?
    assert pet.errors[:age].any?
    assert pet.errors[:troubling_history].any?
    assert pet.errors[:animal_type].any?
    assert pet.errors[:male_only].any?
    assert pet.errors[:female_only].any?
    assert pet.errors[:inspection_required].any?
    assert pet.errors[:shelter_id].any?
    assert pet.errors[:imageUrl].any?
  end

  test "Pet should be valid" do
    # use valid_pet details from pets.yml
    pet = pets(:valid_pet)
    assert pet.valid?
  end

  test "Pet should not be valid" do
    # use invalid_pet details - age is set to old and not int
    pet = pets(:invalid_pet)
    assert_not pet.valid?
  end
end