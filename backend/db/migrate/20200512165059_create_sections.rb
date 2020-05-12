class CreateSections < ActiveRecord::Migration[6.0]
  def change
    create_table :sections do |t|
      t.string :name
      t.string :chords
      t.string :strumming
      t.integer :display_order
      t.references :song, null: false, foreign_key: true

      t.timestamps
    end
  end
end
