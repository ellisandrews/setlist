# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_18_213054) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "sections", force: :cascade do |t|
    t.string "name", null: false
    t.string "chords", null: false
    t.string "strumming"
    t.integer "display_order"
    t.bigint "song_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["song_id", "display_order"], name: "index_sections_on_song_id_and_display_order", unique: true
    t.index ["song_id"], name: "index_sections_on_song_id"
  end

  create_table "songs", force: :cascade do |t|
    t.string "guitar_type"
    t.integer "capo"
    t.text "notes"
    t.bigint "user_id", null: false
    t.bigint "spotify_track_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["spotify_track_id"], name: "index_songs_on_spotify_track_id"
    t.index ["user_id", "spotify_track_id"], name: "index_songs_on_user_id_and_spotify_track_id", unique: true
    t.index ["user_id"], name: "index_songs_on_user_id"
  end

  create_table "spotify_tracks", force: :cascade do |t|
    t.string "title", null: false
    t.string "artist", null: false
    t.string "spotify_id", null: false
    t.string "artwork_url", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["spotify_id"], name: "index_spotify_tracks_on_spotify_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "sections", "songs"
  add_foreign_key "songs", "spotify_tracks"
  add_foreign_key "songs", "users"
end
