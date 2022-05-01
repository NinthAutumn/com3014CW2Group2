class Pet < ApplicationRecord
    # validation to check animal attributes are there
    validates :name, :description, :age, :animal_type, :shelter_id, :imageUrl, presence: true
    validates :troubling_history, :male_only, :female_only, :inspection_required, inclusion: { in: [true, false]}
    # length validation
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 500}  # 500 chosen as in line with normal matching service (Tinder) amount
    #
end
