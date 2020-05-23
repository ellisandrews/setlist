class Api::V1::SongsController < ApplicationController

    def create
        # Note: SpotifyTrack is a parent object of Song. Normally, a parent object would accept_nested_attributes_for 
        #       the child object to create the dependent child. However, due to the fact that we do not want to create a 
        #       SpotifyTrack unless there are indeed Song objects linked to it for space and practical reasons, we will
        #       either find or create the parent SpotifyTrack here before creating the Song.

        # Strong params
        song_params, spotify_track_params = create_params

        # Find the existing SpotifyTrack with the given ID, or initialize a new one (not yet persisted).
        spotify_track = SpotifyTrack.find_or_initialize_by(spotify_id: spotify_track_params[:spotify_id]) do |st|
            st.title = spotify_track_params[:title]
            st.artist = spotify_track_params[:artist]
            st.artwork_url = spotify_track_params[:artwork_url]
        end

        # Make sure the spotify track is valid before proceeding. Don't persist yet due to the fact that we don't know if the Song is valid.
        if !spotify_track.valid?
            render json: { error: 'Failed to create song', messages: spotify_track.errors.full_messages }, status: :bad_request
        end

        # Create the Song and associate it with the SpotifyTrack and User
        song = Song.new(song_params)
        song.spotify_track = spotify_track
        song.user = @user
        
        if song.save
            render json: song, status: :created
        else
            render json: { error: 'Failed to create song', messages: song.errors.full_messages }, status: :bad_request
        end
    end
    
    def update
        song = Song.find(params[:id])
        song.assign_attributes(update_params)
        if song.save
            render json: song, status: :created
        else
            render json: { error: 'Failed to update song', messages: song.errors.full_messages }, status: :bad_request
        end
    end

    def destroy
        song = Song.find(params[:id])
        begin
            song.destroy!
            render json: { messages: ['Song successfully deleted'] }
        rescue ActiveRecord::RecordNotDestroyed => invalid
            render json: { error: 'Failed to delete song', message: invalid.record.errors.full_messages }, status: :internal_server_error
        end
    end

    private

    def create_params
        # Require both `:song` and `:spotify_track` top-level keys
        song_params, spotify_track_params = params.require([:song, :spotify_track])
        
        # Permit fields of each top-level key
        permitted_song_params = permit_song_params(song_params)
        permitted_spotify_track_params = permit_spotify_track_params(spotify_track_params)

        # Return the permitted params
        return permitted_song_params, permitted_spotify_track_params
    end

    def update_params
        song_params = params.require(:song)
        permit_song_params(song_params)
    end

    def permit_song_params(raw_song_params)
        raw_song_params.permit(
            :guitar_type, :capo, :strumming, :notes,  # User generated data
            sections_attributes: [:id, :name, :chords, :display_order, :_destroy]  # Associations data
        )
    end

    def permit_spotify_track_params(raw_spotify_track_params)
        raw_spotify_track_params.permit(:title, :artist, :spotify_id, :artwork_url)
    end
end
