Rails.application.routes.draw do
  # stops users from accessing root page, localhost:3000
  get "/pets/health", to: "pets#health"
  get "/pets/:shelter_id/list",to:"pets#shelter_pets"

  resources :pets
end
