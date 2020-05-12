Rails.application.routes.draw do

  # Namespace endpoints to /api/v1
  namespace :api do
    namespace :v1 do

      post '/login', to: 'sessions#create'
      get '/current_user', to: 'sessions#show'

      resources :sections
      resources :songs
      resources :users
    end
  end

end
