Rails.application.routes.draw do
  # stops users from accessing root page, localhost:3000
  get "/pets/health", to: "pets#health"
  resources :pets
end
