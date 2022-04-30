class AddImageUrlToPets < ActiveRecord::Migration[6.1]
  def change
    add_column :pets, :imageUrl, :string
  end
end
