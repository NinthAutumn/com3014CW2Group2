class Pet < ApplicationRecord
    # validation to check animal attributes are there
    validates :name, :description, :age, :shelter_id, :image_url, presence: true
    # length validation
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 500}  # 500 chosen as in line with normal matching service (Tinder) amount
    #
end
