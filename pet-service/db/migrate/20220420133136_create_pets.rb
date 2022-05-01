class CreatePets < ActiveRecord::Migration[6.1]
  def change
    create_table :pets do |t|
      t.string :name
      t.text :description
      t.integer :age
      t.boolean :troubling_history
      t.string :animal_type
      t.string :animal_category
      t.boolean :male_only
      t.boolean :female_only
      t.boolean :inspection_required
      t.integer :shelter_id

      t.timestamps
    end
  end
end
