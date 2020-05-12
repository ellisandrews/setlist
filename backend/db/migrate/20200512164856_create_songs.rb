class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :type
      t.integer :capo
      t.text :notes
      t.string :spotify_id
      t.string :artwork_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
