Rails.application.routes.draw do
  # stops users from accessing root page, localhost:3000
  resources :pets
end
