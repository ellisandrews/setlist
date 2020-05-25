class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    # Create the table
    create_table :songs do |t|
      t.string :guitar_type
      t.integer :capo
      t.text :strumming
      t.text :notes
      t.string :youtube_id
      t.references :user, null: false, foreign_key: true
      t.references :spotify_track, null: false, foreign_key: true

      t.timestamps
    end

    # Unique on (user_id, spotify_track_id)
    add_index :songs, [:user_id, :spotify_track_id], unique: true
  end
end
