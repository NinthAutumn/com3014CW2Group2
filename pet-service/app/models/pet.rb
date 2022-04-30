class Pet < ApplicationRecord
    # validation to check animal attributes are there
    validates :name, :description, :age, :troubling_history, :animal_type, :male_only, :female_only, :inspection_required, :shelter_id, presence: true
    # length validation
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 500}  # 500 chosen as in line with normal matching service (Tinder) amount
    #
end
