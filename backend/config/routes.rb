Rails.application.routes.draw do

  # Namespace endpoints to /api/v1
  namespace :api do
    namespace :v1 do

      post '/signup', to: 'users#create'
      post '/login', to: 'sessions#create'
      get '/current_user', to: 'sessions#show'
      
      get '/search/tracks', to: 'search#tracks'
    
    end
  end

end
