class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    # Create the table
    create_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false

      t.timestamps
    end

    # Unique on email
    add_index :users, :email, unique: true
  end
end
