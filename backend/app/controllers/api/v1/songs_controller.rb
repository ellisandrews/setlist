class Api::V1::SongsController < ApplicationController

    def create
        song = Song.new(song_params)
        song.user_id = @user.id
        if song.save
            render json: SongSerializer.new(song), status: :created
        else
            render json: { error: 'Failed to create song', messages: song.errors.full_messages }, status: :bad_request
        end
    end
    
    private

    def song_params
        params.require(:song).permit(
            :spotify_id, :title, :artist, :artwork_url,  # Spotify data
            :guitar_type, :capo, :notes,  # User generated data
            sections_attributes: [:id, :name, :chords, :strumming, :display_order, :_destroy]  # Associations data
        )
    end

end
