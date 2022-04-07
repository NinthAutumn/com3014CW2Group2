Rails.application.routes.draw do
  # Stops users from accessing the root page, localhost:3000
  # root to: ->(_) { [400, {}, ['']] }
  resources :shelters
end
