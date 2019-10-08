Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :users do
      resources :invitations
    end
    get "all_user_events", to: "users#all_user_events"
    get "specific_user_events", to: "users#specific_user_events"
    
  end
  
  namespace :api do
    resources :events, only: :update do
      resources :invitations
    end
  end
  

end
