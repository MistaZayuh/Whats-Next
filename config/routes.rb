Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :users do
      resources :invitations
    end
    get "events_index", to: "users#events_index"
  end
  
  namespace :api do
    resources :events, only: :update do
      resources :invitations
    end
  end
  

end
