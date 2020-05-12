class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    # Create the table
    create_table :songs do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.string :type
      t.integer :capo
      t.text :notes
      t.string :spotify_id, null: false
      t.string :artwork_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    # Unique on (user_id, spotify_id)
    add_index :songs, [:user, :spotify_id], unique: true
  end
end
