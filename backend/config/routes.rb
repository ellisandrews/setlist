Rails.application.routes.draw do

  resources :spotify_tracks
  # Namespace endpoints to /api/v1
  namespace :api do
    namespace :v1 do

      # Helpful reading for deeply nested routes (should it become necessary): 
      # https://guides.rubyonrails.org/routing.html#shallow-nesting
      
      resources :users, only: [:create]
      resources :songs, only: [:create]

      post '/signup', to: 'users#create'
      post '/login', to: 'sessions#create'
      get '/current_user', to: 'sessions#show'
      
      get '/search/tracks', to: 'search#tracks'
    
    end
  end

end
