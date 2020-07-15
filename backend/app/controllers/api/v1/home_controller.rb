class Api::V1::HomeController < ApplicationController
    
    skip_before_action :authorized, only: [:ping]

    def ping
        # Respond to a server ping to make sure it's up and running
        render json: { status: 'ok' }
    end

end
