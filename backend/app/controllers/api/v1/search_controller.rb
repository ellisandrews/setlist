class Api::V1::SearchController < ApplicationController

    def new
        RSpotify.authenticate(ENV['CLIENT_ID'], ENV['CLIENT_SECRET'])
        render json: RSpotify::Track.search(search_params)
    end

    private

    def search_params
        params.require(:search).permit(:query, :limit)
    end

end
