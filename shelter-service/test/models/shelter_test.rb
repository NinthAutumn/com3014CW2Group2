require "test_helper"

class ShelterTest < ActiveSupport::TestCase
  fixtures :shelters

  test "Shelter attributes must not be empty" do
    # Creating an shlter with no attributes
    shelter = Shelter.new
    assert shelter.invalid?
    assert shelter.errors[:name].any?
    assert shelter.errors[:description].any?
    assert shelter.errors[:email].any?
    assert shelter.errors[:phone_number].any?
    assert shelter.errors[:address].any?
  end

  test 'Shelter should be valid' do
    # Using valid_shelter details from shelters.yml fixture
    shelter = shelters(:valid_shelter)
    assert shelter.valid?
  end

  test 'Shelter should not be valid' do
    # Using invalid_shelter details from shelters.yml fixture
    shelter = shelters(:invalid_shelter)
    # Invalid shelters phone and email attributes are invalid
    assert_not shelter.valid?
  end

end
