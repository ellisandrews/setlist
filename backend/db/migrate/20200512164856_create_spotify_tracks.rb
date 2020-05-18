class CreateSpotifyTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :spotify_tracks do |t|
      t.string :title, null: false
      t.string :artist, null: false
      t.string :spotify_id, null: false
      t.string :artwork_url

      t.timestamps
    end

    # Unique on spotify_id
    add_index :spotify_tracks, :spotify_id, unique: true
  end
end
