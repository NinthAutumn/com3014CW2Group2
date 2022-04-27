class CreateShelters < ActiveRecord::Migration[6.1]
  def change
    create_table :shelters do |t|
      t.string :name
      t.text :description
      t.string :email
      t.string :phone_number
      t.integer :address_id

      t.timestamps
    end
  end
end
