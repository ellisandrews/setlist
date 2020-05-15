Rails.application.routes.draw do

  # Namespace endpoints to /api/v1
  namespace :api do
    namespace :v1 do

      # See link for reason for this structure: https://guides.rubyonrails.org/routing.html#shallow-nesting
      resources :users, only: [:index, :create, :show] do
        resources :songs, only: [:index, :create]
      end

      resources :songs, only: [:show, :update, :destroy] do
        resources :sections, only: [:index, :create]
      end

      post '/signup', to: 'users#create'
      post '/login', to: 'sessions#create'
      get '/current_user', to: 'sessions#show'
      
      get '/search/tracks', to: 'search#tracks'
    
    end
  end

end
