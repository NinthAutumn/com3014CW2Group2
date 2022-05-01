Rails.application.routes.draw do
  # Stops users from accessing the root page, localhost:3000
  # root to: ->(_) { [400, {}, ['']] }
  get "/shelters/health", to: "shelters#health"
  get "/shelters/user", to:"shelters#user_shelter"
  resources :shelters
end
