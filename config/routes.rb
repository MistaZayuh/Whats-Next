Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :users do
      resources :invitations
    end
    get "all_user_events", to: "users#all_user_events"
    get "specific_user_events", to: "users#specific_user_events"
    get "accepted_user_events", to: "users#accepted_user_events"
    
  end
  
  namespace :api do
    resources :events do
      resources :comments
      resources :invitations
    end
    get "specific_event_users", to: "events#specific_event_users"
    get "specific_event_comments", to: "events#specific_event_comments"
    get "explore_events", to: "events#explore_events"
  end
  

end
