class RenameAddressidToAddressAndTyoe < ActiveRecord::Migration[6.1]
  def change
    rename_column :shelters, :address_id, :address
    change_column :shelters, :address, :string
  end
end
