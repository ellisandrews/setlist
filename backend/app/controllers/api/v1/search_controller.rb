class Api::V1::SearchController < ApplicationController

    def tracks
        query = params[:query]
        if query
            render json: RSpotify::Track.search(query).to_json
        else
            render json: { error: 'Invalid request' , messages: ["Parameter 'query' is required."] }, status: :bad_request
        end
    end

end
