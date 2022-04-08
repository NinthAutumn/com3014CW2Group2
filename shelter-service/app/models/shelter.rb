class Shelter < ApplicationRecord
    # Presence validation for all Shelter attributes
    validates :name, :description, :email, :phone_number, :address_id, presence: true
    # Length validation for both name, email, description
    validates :name, :email, length: { maximum: 64 }
    validates :description, length: { maximum: 512 }
    # Phone validation so all are numbers and the length is appropriate 
    validates :phone_number, numericality: true, length: { in: 10..15 }
    # Email validation using Ruby's built in method
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
end

