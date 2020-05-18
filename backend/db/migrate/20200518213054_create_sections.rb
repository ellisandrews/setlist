class CreateSections < ActiveRecord::Migration[6.0]
  def change
    # Create the table
    create_table :sections do |t|
      t.string :name, null: false
      t.string :chords, null: false
      t.string :strumming
      t.integer :display_order
      t.references :song, null: false, foreign_key: true

      t.timestamps
    end

    # Unique on (song_id, display_order)
    add_index :sections, [:song_id, :display_order], unique: true
  end
end


# Original: 20200512165059
