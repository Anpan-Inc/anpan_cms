class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :image
      t.string :name
      t.string :email, null: false
      t.string :description
      t.string :bank_account

      t.timestamps
    end
  end
end
